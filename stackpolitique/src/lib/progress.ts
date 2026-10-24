// Progression lue en base (côté serveur) : historique brut -> computeProgress, puis persistance des badges débloqués.
import { getCollection, getEntry } from 'astro:content';
import { getDb } from './db';
import { computePath, doneQuizzes, type Parcours, type Path, type Step } from './path';
import { dueReviews, reviewStates, type ReviewState, type Reviews } from './review';
import { BADGES, computeProgress, ficheQuizId, type History, type Progress, type QuizSession } from './rewards';

/** Historique complet, dans l'ordre chronologique (les ids croissent avec le temps). */
export async function loadHistory(): Promise<History> {
  const db = await getDb();
  const [sessionRows, answerRows, viewRows] = await db.batch(
    [
      'SELECT id, theme_id, played_at FROM quiz_sessions ORDER BY id',
      'SELECT session_id, question_id, chosen, correct FROM quiz_answers ORDER BY session_id, position',
      'SELECT DISTINCT fiche_id FROM fiche_views',
    ],
    'read',
  );
  const sessions = sessionRows.rows as unknown as { id: number; theme_id: string; played_at: string }[];
  const answers = answerRows.rows as unknown as {
    session_id: number;
    question_id: string;
    chosen: string;
    correct: string;
  }[];
  const byId = new Map<number, QuizSession>(
    sessions.map((s) => [s.id, { themeId: s.theme_id, playedAt: s.played_at, answers: [] }]),
  );
  for (const a of answers) {
    byId.get(a.session_id)?.answers.push({ questionId: a.question_id, chosen: a.chosen, correct: a.correct });
  }
  const views = viewRows.rows as unknown as { fiche_id: string }[];

  return { quizSessions: [...byId.values()], viewedFiches: views.map((v) => v.fiche_id) };
}

/** Les parcours, dans l'ordre du fichier, avec des ids en clair. */
export async function loadParcours(): Promise<Parcours[]> {
  const [file] = await getCollection('parcours');
  return file.data.parcours.map((p) => ({
    ...p,
    party: p.party?.id,
    units: p.units.map((u) => ({
      ...u,
      lessons: u.lessons.map((l) => l.id),
      themes: u.themes.map((t) => t.id),
    })),
  }));
}

/** Le parcours suivi (table settings), null s'il n'a jamais été choisi. */
export async function loadFollowed(): Promise<string | null> {
  const db = await getDb();
  const row = (await db.execute("SELECT value FROM settings WHERE key = 'parcours'")).rows[0] as unknown as { value: string } | undefined;
  return row?.value ?? null;
}

/** Tous les quiz (thèmes et fiches) avec leurs questions actuelles, par id de session (« fiche:<id> » pour une fiche). */
export async function loadQuizzes() {
  const [themes, ficheQuizzes] = await Promise.all([getCollection('quiz'), getCollection('ficheQuiz')]);
  return [
    ...themes.map((t) => ({ id: t.id, questionIds: t.data.questions.map((q) => q.id) })),
    ...ficheQuizzes.map((t) => ({ id: ficheQuizId(t.id), questionIds: t.data.questions.map((q) => q.id) })),
  ];
}

/** Parcours (et parcours suivi) et révisions du moment ; states : état de révision de chaque question déjà vue (renforcement). */
export async function loadLearning(
  history?: History,
): Promise<{ history: History; path: Path; reviews: Reviews; states: Map<string, ReviewState> }> {
  history ??= await loadHistory();
  const [parcours, quizzes, followed] = await Promise.all([loadParcours(), loadQuizzes(), loadFollowed()]);
  const path = computePath(parcours, history, followed);
  const done = new Set(doneQuizzes(path));
  const states = reviewStates(history.quizSessions);
  const reviews = dueReviews(states, quizzes.filter((q) => done.has(q.id)), new Date());
  return { history, path, reviews, states };
}

/** Ce que l'étape demande de faire, avec le lien : « Lire la fiche X », « Quiz X »… null : parcours terminé. */
export async function describeStep(step: Step | null) {
  if (!step) return null;
  if (step.kind === 'lesson') {
    const name = (await getEntry('fiches', step.id))?.data.name ?? step.id;
    return step.viewed
      ? { label: `Quiz ${name}`, href: `/quiz/fiche/${step.id}` }
      : { label: `Lire la fiche ${name}`, href: `/fiches/${step.id}` };
  }
  const title = (await getEntry('quiz', step.id))?.data.title ?? step.id;
  return { label: `Quiz du thème ${title}`, href: `/quiz/${step.id}` };
}

export interface ProgressView extends Omit<Progress, 'unlocked'> {
  badges: { id: string; icon: string; label: string; description: string; unlockedAt: string | null }[];
  newBadges: string[]; // ids débloqués par cet appel
  reviewsDue: number; // questions déjà vues arrivées à échéance
  next: { label: string; href: string } | null; // prochaine étape du parcours suivi
}

/** Progression actuelle. Enregistre au passage les badges dont la condition vient d'être remplie. */
export async function getProgress(): Promise<ProgressView> {
  const toTheme = (t: { id: string; data: { questions: { id: string }[] } }) => ({
    id: t.id,
    questionIds: t.data.questions.map((q) => q.id),
  });
  const [themes, ficheQuizzes] = await Promise.all([getCollection('quiz'), getCollection('ficheQuiz')]);
  const { history, path, reviews } = await loadLearning();
  const { unlocked, ...progress } = computeProgress(history, themes.map(toTheme), ficheQuizzes.map(toTheme), new Date());

  const db = await getDb();
  const inserted = unlocked.length
    ? await db.batch(
        unlocked.map((id) => ({ sql: 'INSERT OR IGNORE INTO badges (badge_id) VALUES (?)', args: [id] })),
        'write',
      )
    : [];
  const newBadges = unlocked.filter((_, i) => inserted[i].rowsAffected > 0);
  const badgeRows = (await db.execute('SELECT badge_id, unlocked_at FROM badges')).rows as unknown as {
    badge_id: string;
    unlocked_at: string;
  }[];
  const dates = new Map(badgeRows.map((b) => [b.badge_id, b.unlocked_at]));

  return {
    ...progress,
    badges: BADGES.map(({ test: _, ...b }) => ({ ...b, unlockedAt: dates.get(b.id) ?? null })),
    newBadges,
    reviewsDue: reviews.due,
    next: await describeStep(path.next),
  };
}
