import type { APIRoute } from 'astro';
import { z } from 'astro/zod';
import { getDb } from '../../lib/db';
import { getProgress, loadHistory } from '../../lib/progress';
import { questionStats } from '../../lib/rewards';

// La justesse est calculée côté client (chosenTech === correctTech) ; on stocke les réponses telles quelles.
// Quiz d'une techno : themeId = « tech:<id de la fiche> », chosenTech et correctTech = texte des options.
// Une révision mélange plusieurs quiz : elle arrive découpée en une session par quiz, écrites ensemble.
const Session = z.object({
  themeId: z.string(),
  answers: z.array(z.object({ questionId: z.string(), chosenTech: z.string(), correctTech: z.string() })).min(1),
});
const Body = z.object({ sessions: z.array(Session).min(1) });

/** Statistiques des questions d'un thème : { [questionId]: { seen, streak, lastAt } }. Paramètre : ?theme=<id> */
export const GET: APIRoute = async ({ url }) => {
  const theme = url.searchParams.get('theme');
  if (!theme) return new Response('paramètre ?theme= manquant', { status: 400 });
  return Response.json(questionStats((await loadHistory()).quizSessions, theme));
};

/**
 * Enregistre une ou plusieurs sessions et leurs réponses, dans l'ordre. Body : { sessions: [{ themeId, answers }] }
 * Répond { xp, xpGained, level, levelUp, newBadges, next } : de quoi célébrer la fin de session et enchaîner.
 */
export const POST: APIRoute = async ({ request }) => {
  const parsed = Body.safeParse(await request.json());
  if (!parsed.success) return new Response(z.prettifyError(parsed.error), { status: 400 });

  const before = await getProgress();
  const tx = await (await getDb()).transaction('write');
  try {
    for (const { themeId, answers } of parsed.data.sessions) {
      const { lastInsertRowid } = await tx.execute({ sql: 'INSERT INTO quiz_sessions (theme_id) VALUES (?)', args: [themeId] });
      for (const [i, a] of answers.entries()) {
        await tx.execute({
          sql: 'INSERT INTO quiz_answers (session_id, position, question_id, chosen_tech, correct_tech) VALUES (?, ?, ?, ?, ?)',
          args: [lastInsertRowid!, i, a.questionId, a.chosenTech, a.correctTech],
        });
      }
    }
    await tx.commit();
  } catch (error) {
    return new Response(String(error), { status: 400 });
  } finally {
    tx.close();
  }
  const after = await getProgress();
  return Response.json(
    {
      xp: after.xp,
      xpGained: after.xp - before.xp,
      level: after.level,
      levelUp: after.level.number > before.level.number,
      newBadges: after.badges.filter((b) => after.newBadges.includes(b.id)),
      next: after.next,
    },
    { status: 201 },
  );
};
