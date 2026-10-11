import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

// Pages prérendues ; seuls les endpoints `prerender = false` (src/pages/api) et /progression tournent côté serveur.
export default defineConfig({
  integrations: [react()],
  adapter: node({ mode: 'standalone' }),
  vite: {
    // `astro build` (et `astro sync`) optimisent les dépendances en mode production. Avec un cache commun, ils écrasent
    // celui d'un `astro dev` en cours, et les îlots React plantent (« _jsxDEV is not a function »). D'où un cache à part.
    cacheDir: process.argv.includes('dev') ? 'node_modules/.vite' : 'node_modules/.vite-build',
    plugins: [tailwindcss()],
  },
});
