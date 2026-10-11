import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

// Pages prérendues ; seuls les endpoints `prerender = false` (src/pages/api) et /progression tournent côté serveur.
export default defineConfig({
  integrations: [react()],
  adapter: node({ mode: 'standalone' }),
  vite: { plugins: [tailwindcss()] },
});
