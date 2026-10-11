// Progression lue en base (côté serveur) : historique brut -> computeProgress, puis persistance des badges débloqués.
import { getCollection } from 'astro:content';
import { getDb } from './db';
import { BADGES, computeProgress, type History, type Progress, type QuizSession } from './rewards';

/** Historique complet, dans l'ordre chronologique (les ids croissent avec le temps). */
export function loadHistory(): History {
  const db = getDb();
  const sessions = db.prepare('SELECT id, theme_id, played_at FROM quiz_sessions ORDER BY id').all() as {
    id: number;
    theme_id: string;
    played_at: string;
  }[];
  const answers = db
    .prepare('SELECT session_id, question_id, chosen_tech, correct_tech FROM quiz_answers ORDER BY session_id, position')
    .all() as { session_id: number; question_id: string; chosen_tech: string; correct_tech: string }[];
  const byId = new Map<number, QuizSession>(
    sessions.map((s) => [s.id, { themeId: s.theme_id, playedAt: s.played_at, answers: [] }]),
  );
  for (const a of answers) {
    byId.get(a.session_id)?.answers.push({ questionId: a.question_id, chosenTech: a.chosen_tech, correctTech: a.correct_tech });
  }

  const attempts = db.prepare('SELECT scenario_id, played_at, score FROM attempts ORDER BY id').all() as {
    scenario_id: string;
    played_at: string;
    score: number;
  }[];
  const views = db.prepare('SELECT DISTINCT tech_id FROM tech_views').all() as { tech_id: string }[];

  return {
    quizSessions: [...byId.values()],
    attempts: attempts.map((a) => ({ scenarioId: a.scenario_id, playedAt: a.played_at, score: a.score })),
    viewedTechs: views.map((v) => v.tech_id),
  };
}

export interface ProgressView extends Omit<Progress, 'unlocked'> {
  badges: { id: string; icon: string; label: string; description: string; unlockedAt: string | null }[];
  newBadges: string[]; // ids débloqués par cet appel
}

/** Progression actuelle. Enregistre au passage les badges dont la condition vient d'être remplie. */
export async function getProgress(): Promise<ProgressView> {
  const toTheme = (t: { id: string; data: { questions: { id: string }[] } }) => ({
    id: t.id,
    questionIds: t.data.questions.map((q) => q.id),
  });
  const [themes, techQuizzes] = await Promise.all([getCollection('quiz'), getCollection('techQuiz')]);
  const { unlocked, ...progress } = computeProgress(loadHistory(), themes.map(toTheme), techQuizzes.map(toTheme), new Date());

  const db = getDb();
  const insert = db.prepare('INSERT OR IGNORE INTO badges (badge_id) VALUES (?)');
  const newBadges = unlocked.filter((id) => insert.run(id).changes > 0);
  const dates = new Map(
    (db.prepare('SELECT badge_id, unlocked_at FROM badges').all() as { badge_id: string; unlocked_at: string }[]).map((b) => [
      b.badge_id,
      b.unlocked_at,
    ]),
  );

  return {
    ...progress,
    badges: BADGES.map(({ test: _, ...b }) => ({ ...b, unlockedAt: dates.get(b.id) ?? null })),
    newBadges,
  };
}
