import { defineMiddleware } from 'astro:middleware';
import { APP_PASSWORD } from 'astro:env/server';

// Mot de passe unique (Basic Auth), demandé une fois par le navigateur puis mémorisé. Le nom d'utilisateur est ignoré.
// Même realm (« Stacks ») que StackPolitique et le portail : sur la même origine, un seul mot de passe pour les trois.
// Sans APP_PASSWORD (dev local), tout passe.
export const onRequest = defineMiddleware((context, next) => {
  if (!APP_PASSWORD) return next();
  const [scheme, encoded] = (context.request.headers.get('authorization') ?? '').split(' ');
  if (scheme === 'Basic' && encoded) {
    const decoded = new TextDecoder().decode(Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0)));
    if (decoded.slice(decoded.indexOf(':') + 1) === APP_PASSWORD) return next();
  }
  return new Response('Mot de passe requis', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Stacks", charset="UTF-8"' },
  });
});
