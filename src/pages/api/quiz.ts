import type { APIRoute } from 'astro';
import { z } from 'astro/zod';
import { getDb } from '../../lib/db';
import { getProgress, loadHistory } from '../../lib/progress';
import { questionStats } from '../../lib/rewards';

export const prerender = false;

// La justesse est calculée côté client (chosenTech === correctTech) ; on stocke les réponses telles quelles.
const Body = z.object({
  themeId: z.string(),
  answers: z.array(z.object({ questionId: z.string(), chosenTech: z.string(), correctTech: z.string() })).min(1),
});

/** Statistiques des questions d'un thème : { [questionId]: { seen, streak, lastAt } }. Paramètre : ?theme=<id> */
export const GET: APIRoute = ({ url }) => {
  const theme = url.searchParams.get('theme');
  if (!theme) return new Response('paramètre ?theme= manquant', { status: 400 });
  return Response.json(questionStats(loadHistory().quizSessions, theme));
};

/**
 * Enregistre une session et ses réponses, dans l'ordre.
 * Répond { id, xp, xpGained, level, levelUp, newBadges } : de quoi célébrer la fin de session.
 */
export const POST: APIRoute = async ({ request }) => {
  const parsed = Body.safeParse(await request.json());
  if (!parsed.success) return new Response(z.prettifyError(parsed.error), { status: 400 });
  const { themeId, answers } = parsed.data;

  const before = await getProgress();
  const db = getDb();
  const save = db.transaction(() => {
    const { lastInsertRowid } = db.prepare('INSERT INTO quiz_sessions (theme_id) VALUES (?)').run(themeId);
    const insert = db.prepare(
      'INSERT INTO quiz_answers (session_id, position, question_id, chosen_tech, correct_tech) VALUES (?, ?, ?, ?, ?)',
    );
    answers.forEach((a, i) => insert.run(lastInsertRowid, i, a.questionId, a.chosenTech, a.correctTech));
    return Number(lastInsertRowid);
  });

  let id: number;
  try {
    id = save();
  } catch (error) {
    return new Response(String(error), { status: 400 });
  }
  const after = await getProgress();
  return Response.json(
    {
      id,
      xp: after.xp,
      xpGained: after.xp - before.xp,
      level: after.level,
      levelUp: after.level.number > before.level.number,
      newBadges: after.badges.filter((b) => after.newBadges.includes(b.id)),
    },
    { status: 201 },
  );
};
