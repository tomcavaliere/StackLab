// L'app est servie sous un préfixe (base dans astro.config.mjs : /data) : tout lien interne passe par url(),
// sinon il sort de l'app. url('/fiches/sql') -> '/data/fiches/sql'.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (path: string) => `${BASE}${path}`;
