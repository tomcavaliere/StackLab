import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// Déployé sur Vercel. Tout est rendu à la demande (output: 'server') : ainsi le middleware (mot de passe) protège
// chaque page ; sur Vercel, les fichiers prérendus seraient servis sans passer par lui.
export default defineConfig({
  integrations: [react()],
  // Servie sous /politique : un seul projet Vercel héberge le portail (/) et les deux apps (scripts/build-vercel.mjs à la racine).
  base: '/politique',
  output: 'server',
  adapter: vercel(),
  // 4322 : StackData garde 4321, les deux serveurs de dev tournent en même temps.
  server: { port: 4322 },
  env: {
    // Lues au runtime (.env en local, réglages du projet sur Vercel). Sans TURSO_DATABASE_URL : fichier local data/stackpolitique.db.
    schema: {
      TURSO_DATABASE_URL: envField.string({ context: 'server', access: 'secret', default: 'file:data/stackpolitique.db' }),
      TURSO_AUTH_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
      // Vide : pas de mot de passe (dev local).
      APP_PASSWORD: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
  vite: {
    // `astro build` (et `astro sync`) optimisent les dépendances en mode production. Avec un cache commun, ils écrasent
    // celui d'un `astro dev` en cours, et les îlots React plantent (« _jsxDEV is not a function »). D'où un cache à part.
    cacheDir: process.argv.includes('dev') ? 'node_modules/.vite' : 'node_modules/.vite-build',
    plugins: [tailwindcss()],
  },
});
