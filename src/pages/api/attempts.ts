import type { APIRoute } from 'astro';
import { z } from 'astro/zod';
import { getDb } from '../../lib/db';

export const prerender = false;

// Le score est calculé côté client par la fonction pure de scoring ; on stocke le résultat tel quel.
// Les valeurs de verdict sont contrôlées par le CHECK de schema.sql.
const Body = z.object({
  scenarioId: z.string(),
  score: z.number().int().min(0).max(100),
  cards: z.array(z.object({ techId: z.string(), layer: z.string(), verdict: z.string() })),
});

/** Meilleur score et nombre de parties par scénario : { [scenarioId]: { best, count } }. */
export const GET: APIRoute = () => {
  const rows = getDb()
    .prepare('SELECT scenario_id, max(score) AS best, count(*) AS n FROM attempts GROUP BY scenario_id')
    .all() as { scenario_id: string; best: number; n: number }[];
  return Response.json(Object.fromEntries(rows.map((r) => [r.scenario_id, { best: r.best, count: r.n }])));
};

/** Enregistre une partie et le verdict de chaque carte. Répond { id } (id de la partie). */
export const POST: APIRoute = async ({ request }) => {
  const parsed = Body.safeParse(await request.json());
  if (!parsed.success) return new Response(z.prettifyError(parsed.error), { status: 400 });
  const { scenarioId, score, cards } = parsed.data;

  const db = getDb();
  const save = db.transaction(() => {
    const { lastInsertRowid } = db
      .prepare('INSERT INTO attempts (scenario_id, score) VALUES (?, ?)')
      .run(scenarioId, score);
    const insertCard = db.prepare('INSERT INTO attempt_cards (attempt_id, tech_id, layer, verdict) VALUES (?, ?, ?, ?)');
    for (const card of cards) insertCard.run(lastInsertRowid, card.techId, card.layer, card.verdict);
    return Number(lastInsertRowid);
  });

  try {
    return Response.json({ id: save() }, { status: 201 });
  } catch (error) {
    return new Response(String(error), { status: 400 });
  }
};
