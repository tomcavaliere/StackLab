// Portail (/) : la page qui propose StackData (/data) ou StackPolitique (/politique). Fonction Vercel Node, assemblée par
// scripts/build-vercel.mjs, au même format que les fonctions Astro (export default { fetch }). Même mot de passe et même
// realm que les middlewares des deux apps : sur la même origine, le navigateur ne le demande qu'une fois.
// Sans APP_PASSWORD, tout passe.
import { readFileSync } from 'node:fs';

const page = readFileSync(new URL('./index.html', import.meta.url), 'utf8');

export default {
  async fetch(request) {
    const password = process.env.APP_PASSWORD;
    if (password) {
      const [scheme, encoded] = (request.headers.get('authorization') ?? '').split(' ');
      const decoded = scheme === 'Basic' && encoded ? Buffer.from(encoded, 'base64').toString('utf8') : '';
      if (decoded.slice(decoded.indexOf(':') + 1) !== password) {
        return new Response('Mot de passe requis', {
          status: 401,
          headers: { 'WWW-Authenticate': 'Basic realm="Stacks", charset="UTF-8"' },
        });
      }
    }
    return new Response(page, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
  },
};
