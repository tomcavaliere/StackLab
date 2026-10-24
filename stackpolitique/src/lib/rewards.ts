// Système de récompense : fonctions pures, sans dépendance serveur (l'îlot Quiz les utilise aussi). Testé avec Vitest.
// Les règles sont décrites dans CLAUDE.md, section « Règles de récompense ».

export interface QuizAnswer {
  questionId: string;
  chosen: string;
  correct: string;
}

export interface QuizSession {
  themeId: string;
  playedAt: string; // ISO UTC
  answers: QuizAnswer[]; // dans l'ordre où les questions ont été posées
}

/** Historique lu en base, dans l'ordre chronologique. */
export interface History {
  quizSessions: QuizSession[];
  viewedFiches: string[]; // ids distincts
}

/** Un quiz tel que décrit dans le contenu (thème, ou quiz d'une fiche avec l'id de la fiche) : ses questions actuelles. */
export interface Theme {
  id: string;
  questionIds: string[];
}

// Les sessions du quiz d'une fiche sont enregistrées comme celles d'un thème, avec theme_id = « fiche:<id de la fiche> ».
// Leurs réponses (chosen, correct) sont alors le texte des options ; celles d'un thème sont des ids de fiche.
const FICHE_PREFIX = 'fiche:';
export const ficheQuizId = (ficheId: string) => `${FICHE_PREFIX}${ficheId}`;
/** Id de la fiche si la session est un quiz de fiche, sinon null. */
export const ficheOfQuiz = (themeId: string) => (themeId.startsWith(FICHE_PREFIX) ? themeId.slice(FICHE_PREFIX.length) : null);

export const SESSION_SIZE = 10;
export const MASTERY_STREAK = 2; // avec 2 choix, une seule bonne réponse peut être un coup de chance
export const XP = { correct: 10, comboStep: 2, comboMax: 10, perfect: 30, perfectMin: 5, fiche: 5 };

export const isCorrect = (a: Pick<QuizAnswer, 'chosen' | 'correct'>) => a.chosen === a.correct;

/** XP d'une bonne réponse. combo : bonnes réponses consécutives, celle-ci comprise (≥ 1). */
export const answerXp = (combo: number) => XP.correct + Math.min(XP.comboStep * (combo - 1), XP.comboMax);

/** XP d'une session : chaque bonne réponse selon son combo, plus le bonus sans faute. */
export function sessionXp(answers: QuizAnswer[]) {
  let combo = 0;
  let xp = 0;
  for (const a of answers) {
    combo = isCorrect(a) ? combo + 1 : 0;
    if (combo) xp += answerXp(combo);
  }
  if (answers.length >= XP.perfectMin && answers.every(isCorrect)) xp += XP.perfect;
  return xp;
}

function bestCombo(answers: QuizAnswer[]) {
  let combo = 0;
  let best = 0;
  for (const a of answers) {
    combo = isCorrect(a) ? combo + 1 : 0;
    best = Math.max(best, combo);
  }
  return best;
}

export interface QuestionStat {
  seen: number;
  streak: number; // bonnes réponses consécutives les plus récentes ; 0 si la dernière réponse est fausse
  lastAt: string;
}

/** Statistiques des questions d'un thème, par id de question. Sessions dans l'ordre chronologique. */
export function questionStats(sessions: QuizSession[], themeId: string) {
  const stats: Record<string, QuestionStat> = {};
  for (const s of sessions) {
    if (s.themeId !== themeId) continue;
    for (const a of s.answers) {
      const prev = stats[a.questionId];
      stats[a.questionId] = {
        seen: (prev?.seen ?? 0) + 1,
        streak: isCorrect(a) ? (prev?.streak ?? 0) + 1 : 0,
        lastAt: s.playedAt,
      };
    }
  }
  return stats;
}

export const isMastered = (s: QuestionStat | undefined) => (s?.streak ?? 0) >= MASTERY_STREAK;

/** 0 ratée, 1 jamais vue, 2 en cours, 3 maîtrisée. */
function priority(s: QuestionStat | undefined) {
  if (!s) return 1;
  if (s.streak === 0) return 0;
  return isMastered(s) ? 3 : 2;
}

/**
 * Les n questions à poser : ratées, puis jamais vues, puis en cours, puis maîtrisées ;
 * dans un même groupe, la plus anciennement vue d'abord. Tri stable : à égalité, l'ordre reçu est gardé.
 */
export function pickQuestions<Q extends { id: string }>(questions: Q[], stats: Record<string, QuestionStat>, n: number) {
  return [...questions]
    .sort(
      (a, b) =>
        priority(stats[a.id]) - priority(stats[b.id]) || (stats[a.id]?.lastAt ?? '').localeCompare(stats[b.id]?.lastAt ?? ''),
    )
    .slice(0, n);
}

export const LEVELS = [
  { xp: 0, name: 'Sympathisant' },
  { xp: 150, name: 'Militant' },
  { xp: 400, name: 'Conseiller municipal' },
  { xp: 800, name: 'Maire' },
  { xp: 1500, name: 'Conseiller régional' },
  { xp: 2500, name: 'Député' },
  { xp: 4000, name: 'Sénateur' },
  { xp: 6000, name: 'Ministre' },
  { xp: 9000, name: 'Premier ministre' },
  { xp: 13000, name: 'Président' },
  { xp: 18000, name: 'Sage du Conseil constitutionnel' },
];

export interface Level {
  number: number; // 1 pour le premier palier
  name: string;
  floor: number; // XP du palier atteint
  next: number | null; // XP du palier suivant, null au dernier
}

export function levelOf(xp: number): Level {
  const i = LEVELS.findLastIndex((l) => xp >= l.xp);
  return { number: i + 1, name: LEVELS[i].name, floor: LEVELS[i].xp, next: LEVELS[i + 1]?.xp ?? null };
}

const pad = (n: number) => String(n).padStart(2, '0');
/** Jour local AAAA-MM-JJ. */
export const localDay = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const addDays = (day: string, n: number) => {
  const [y, m, d] = day.split('-').map(Number);
  return localDay(new Date(y, m - 1, d + n));
};

/**
 * Série de jours locaux consécutifs avec au moins une activité.
 * current reste en vie si l'on a joué hier mais pas encore aujourd'hui ; best est le record.
 */
export function dayStreak(dates: string[], now: Date) {
  const days = new Set(dates.map((d) => localDay(new Date(d))));
  let best = 0;
  let run = 0;
  let prev = '';
  for (const day of [...days].sort()) {
    run = prev && addDays(prev, 1) === day ? run + 1 : 1;
    best = Math.max(best, run);
    prev = day;
  }
  const today = localDay(now);
  let cursor = days.has(today) ? today : addDays(today, -1);
  let current = 0;
  while (days.has(cursor)) {
    current++;
    cursor = addDays(cursor, -1);
  }
  return { current, best, today: days.has(today) };
}

/** Statistiques sur lesquelles portent les badges. */
export interface BadgeStats {
  sessions: number;
  correct: number;
  bestCombo: number;
  perfectSessions: number; // sessions d'au moins SESSION_SIZE questions, sans erreur
  bestStreak: number;
  masteredThemes: number;
  playedThemes: number;
  themes: number;
  masteredFiches: number;
  playedFiches: number;
  ficheQuizzes: number;
  fiches: number;
}

export const BADGES: { id: string; icon: string; label: string; description: string; test: (s: BadgeStats) => boolean }[] = [
  { id: 'premier-pas', icon: '👣', label: 'Premier pas', description: 'Terminer une session de quiz', test: (s) => s.sessions >= 1 },
  { id: 'en-rythme', icon: '🎵', label: 'En rythme', description: "5 bonnes réponses d'affilée", test: (s) => s.bestCombo >= 5 },
  {
    id: 'sans-faute',
    icon: '🎯',
    label: 'Sans faute',
    description: `Une session de ${SESSION_SIZE} questions sans erreur`,
    test: (s) => s.perfectSessions >= 1,
  },
  { id: 'serie-3', icon: '🔥', label: 'Trois jours', description: 'Jouer 3 jours de suite', test: (s) => s.bestStreak >= 3 },
  { id: 'serie-7', icon: '📅', label: 'Une semaine', description: 'Jouer 7 jours de suite', test: (s) => s.bestStreak >= 7 },
  {
    id: 'specialiste',
    icon: '🏅',
    label: 'Spécialiste',
    description: "Maîtriser toutes les questions d'un thème",
    test: (s) => s.masteredThemes >= 1,
  },
  {
    id: 'polyvalent',
    icon: '🧭',
    label: 'Polyvalent',
    description: 'Jouer au moins une session dans chaque thème',
    test: (s) => s.themes > 0 && s.playedThemes >= s.themes,
  },
  {
    id: 'expert',
    icon: '🔧',
    label: 'Expert',
    description: "Maîtriser toutes les questions du quiz d'une fiche",
    test: (s) => s.masteredFiches >= 1,
  },
  { id: 'explorateur', icon: '🗺️', label: 'Explorateur', description: 'Jouer le quiz de 10 fiches différentes', test: (s) => s.playedFiches >= 10 },
  { id: 'erudit', icon: '🎓', label: 'Érudit', description: 'Maîtriser 10 fiches', test: (s) => s.masteredFiches >= 10 },
  {
    id: 'encyclopedie',
    icon: '📖',
    label: 'Encyclopédie',
    description: 'Maîtriser le quiz de toutes les fiches',
    test: (s) => s.ficheQuizzes > 0 && s.masteredFiches >= s.ficheQuizzes,
  },
  { id: 'centurion', icon: '💯', label: 'Centurion', description: '100 bonnes réponses au total', test: (s) => s.correct >= 100 },
  { id: 'curieux', icon: '📚', label: 'Curieux', description: 'Lire 20 fiches différentes', test: (s) => s.fiches >= 20 },
];

export interface Mastery {
  mastered: number;
  total: number;
  sessions: number;
}

/** Maîtrise d'un quiz : questions actuelles maîtrisées, et nombre de sessions jouées. */
function mastery(quizId: string, questionIds: string[], sessions: QuizSession[]): Mastery {
  const stats = questionStats(sessions, quizId);
  return {
    mastered: questionIds.filter((id) => isMastered(stats[id])).length,
    total: questionIds.length,
    sessions: sessions.filter((s) => s.themeId === quizId).length,
  };
}

const complete = (m: Mastery) => m.total > 0 && m.mastered === m.total;

export interface Progress {
  xp: number;
  xpBySource: { quiz: number; fiches: number };
  level: Level;
  streak: { current: number; best: number; today: boolean };
  themes: Record<string, Mastery>;
  fiches: Record<string, Mastery>; // quiz de fiche, par id de fiche
  unlocked: string[]; // ids des badges dont la condition est remplie
  confusions: { fiches: [string, string]; count: number }[]; // paires de fiches confondues dans les thèmes, les plus fréquentes d'abord
}

/** themes : les thèmes du quiz ; ficheQuizzes : les quiz de fiche, avec l'id de leur fiche. */
export function computeProgress(history: History, themes: Theme[], ficheQuizzes: Theme[], now: Date): Progress {
  const { quizSessions, viewedFiches } = history;

  const xpBySource = {
    quiz: quizSessions.reduce((sum, s) => sum + sessionXp(s.answers), 0),
    fiches: XP.fiche * viewedFiches.length,
  };
  const xp = xpBySource.quiz + xpBySource.fiches;

  const themeProgress = Object.fromEntries(themes.map((t) => [t.id, mastery(t.id, t.questionIds, quizSessions)]));
  const ficheProgress = Object.fromEntries(
    ficheQuizzes.map((t) => [t.id, mastery(ficheQuizId(t.id), t.questionIds, quizSessions)]),
  );

  const streak = dayStreak(quizSessions.map((s) => s.playedAt), now);
  const answers = quizSessions.flatMap((s) => s.answers);
  const stats: BadgeStats = {
    sessions: quizSessions.length,
    correct: answers.filter(isCorrect).length,
    bestCombo: Math.max(0, ...quizSessions.map((s) => bestCombo(s.answers))),
    perfectSessions: quizSessions.filter((s) => s.answers.length >= SESSION_SIZE && s.answers.every(isCorrect)).length,
    bestStreak: streak.best,
    masteredThemes: Object.values(themeProgress).filter(complete).length,
    playedThemes: Object.values(themeProgress).filter((t) => t.sessions > 0).length,
    themes: themes.length,
    masteredFiches: Object.values(ficheProgress).filter(complete).length,
    playedFiches: Object.values(ficheProgress).filter((t) => t.sessions > 0).length,
    ficheQuizzes: ficheQuizzes.length,
    fiches: viewedFiches.length,
  };

  // Seuls les thèmes opposent deux fiches : les réponses d'un quiz de fiche sont du texte.
  const pairs = new Map<string, number>();
  for (const a of quizSessions.filter((s) => !ficheOfQuiz(s.themeId)).flatMap((s) => s.answers)) {
    if (isCorrect(a)) continue;
    const key = [a.chosen, a.correct].sort().join('|');
    pairs.set(key, (pairs.get(key) ?? 0) + 1);
  }
  const confusions = [...pairs]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([key, count]) => ({ fiches: key.split('|') as [string, string], count }));

  return {
    xp,
    xpBySource,
    level: levelOf(xp),
    streak,
    themes: themeProgress,
    fiches: ficheProgress,
    unlocked: BADGES.filter((b) => b.test(stats)).map((b) => b.id),
    confusions,
  };
}
