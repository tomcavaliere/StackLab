import type { APIRoute } from 'astro';
import { z } from 'astro/zod';
import { getDb } from '../../lib/db';

export const prerender = false;

const Body = z.object({ techId: z.string() });

/** Nombre de consultations par fiche : { [techId]: n }. */
export const GET: APIRoute = () => {
  const rows = getDb().prepare('SELECT tech_id, count(*) AS n FROM tech_views GROUP BY tech_id').all() as {
    tech_id: string;
    n: number;
  }[];
  return Response.json(Object.fromEntries(rows.map((r) => [r.tech_id, r.n])));
};

/** Enregistre une consultation de fiche. Body : { techId } */
export const POST: APIRoute = async ({ request }) => {
  const parsed = Body.safeParse(await request.json());
  if (!parsed.success) return new Response(z.prettifyError(parsed.error), { status: 400 });

  getDb().prepare('INSERT INTO tech_views (tech_id) VALUES (?)').run(parsed.data.techId);
  return new Response(null, { status: 204 });
};
