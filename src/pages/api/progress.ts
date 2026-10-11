import type { APIRoute } from 'astro';
import { getProgress } from '../../lib/progress';

export const prerender = false;

/** XP, niveau, série, maîtrise par thème, badges (avec date de déblocage) et confusions. */
export const GET: APIRoute = async () => Response.json(await getProgress());
