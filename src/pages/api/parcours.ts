import type { APIRoute } from 'astro';
import { z } from 'astro/zod';
import { getDb } from '../../lib/db';
import { loadParcours } from '../../lib/progress';

const Body = z.object({ id: z.string() });

/** Enregistre le parcours suivi : la carte « Continuer » et la suite du bilan de quiz le suivent. Body : { id } */
export const POST: APIRoute = async ({ request }) => {
  const parsed = Body.safeParse(await request.json());
  if (!parsed.success) return new Response(z.prettifyError(parsed.error), { status: 400 });
  if (!(await loadParcours()).some((p) => p.id === parsed.data.id)) {
    return new Response(`parcours inconnu : ${parsed.data.id}`, { status: 400 });
  }

  const db = await getDb();
  await db.execute({
    sql: "INSERT INTO settings (key, value) VALUES ('parcours', ?) ON CONFLICT (key) DO UPDATE SET value = excluded.value",
    args: [parsed.data.id],
  });
  return new Response(null, { status: 204 });
};
