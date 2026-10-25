import type { APIRoute } from 'astro';
import { z } from 'astro/zod';
import { getDb } from '../../lib/db';

const Body = z.object({ ficheId: z.string() });

/** Nombre de consultations par fiche : { [ficheId]: n }. */
export const GET: APIRoute = async () => {
  const db = await getDb();
  const rows = (await db.execute('SELECT fiche_id, count(*) AS n FROM politique_fiche_views GROUP BY fiche_id')).rows as unknown as {
    fiche_id: string;
    n: number;
  }[];
  return Response.json(Object.fromEntries(rows.map((r) => [r.fiche_id, r.n])));
};

/** Enregistre une consultation de fiche. Body : { ficheId } */
export const POST: APIRoute = async ({ request }) => {
  const parsed = Body.safeParse(await request.json());
  if (!parsed.success) return new Response(z.prettifyError(parsed.error), { status: 400 });

  const db = await getDb();
  await db.execute({ sql: 'INSERT INTO politique_fiche_views (fiche_id) VALUES (?)', args: [parsed.data.ficheId] });
  return new Response(null, { status: 204 });
};
