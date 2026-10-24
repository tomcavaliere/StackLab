// Révisions espacées (façon Anki, notation automatique par le QCM) : fonctions pures, testées avec Vitest.
// L'état de chaque question est rejoué depuis l'historique brut ; règles dans CLAUDE.md, section « Révisions ».
import { addDays, isCorrect, localDay, type QuizSession } from './rewards';

// Seules les questions déjà vues (dans le parcours ou en renforcement) entrent en révision.
export const REVIEW = { ease: 2.5, easeMin: 1.3, lapse: 0.2, mature: 21, limit: 20 };

export interface ReviewState {
  interval: number; // jours avant la prochaine révision ; 0 = à revoir aujourd'hui
  ease: number;
  dueDay: string; // jour local AAAA-MM-JJ
}

/** Clé d'une question : les ids de question ne sont uniques que dans leur quiz. */
export const reviewKey = (quizId: string, questionId: string) => `${quizId}|${questionId}`;

/** Questions d'un quiz jamais répondues : ce que le renforcement propose. */
export const unseen = (states: Map<string, ReviewState>, quiz: { id: string; questionIds: string[] }) =>
  quiz.questionIds.filter((questionId) => !states.has(reviewKey(quiz.id, questionId)));

const grow = (s: ReviewState) => (s.interval === 0 ? 1 : s.interval === 1 ? 3 : Math.round(s.interval * s.ease));

/**
 * État de révision de chaque question déjà vue. Sessions dans l'ordre chronologique.
 * À échéance (ou après) : juste → l'intervalle grandit (1, 3, 8, 20, 50… jours) ; faux → retour à 0, ease baisse.
 * Avant échéance : juste ne change rien (pas de bachotage) ; faux remet à 0.
 */
export function reviewStates(sessions: QuizSession[]) {
  const states = new Map<string, ReviewState>();
  for (const s of sessions) {
    const day = localDay(new Date(s.playedAt));
    for (const a of s.answers) {
      const key = reviewKey(s.themeId, a.questionId);
      const prev = states.get(key);
      let interval: number;
      let ease = prev?.ease ?? REVIEW.ease;
      if (!prev) interval = isCorrect(a) ? 1 : 0;
      else if (!isCorrect(a)) {
        interval = 0;
        ease = Math.max(REVIEW.easeMin, ease - REVIEW.lapse);
      } else if (day >= prev.dueDay) interval = grow(prev);
      else continue;
      states.set(key, { interval, ease, dueDay: addDays(day, interval) });
    }
  }
  return states;
}

export interface Reviews {
  items: { quizId: string; questionId: string }[]; // la prochaine session de révision, dans l'ordre
  due: number; // questions vues, arrivées à échéance
  fresh: number; // questions jamais vues des quiz faits : à découvrir en renforcement, jamais en révision
  next: string | null; // prochain jour d'échéance après aujourd'hui
  tracked: number; // questions en révision (déjà vues) dans ces quiz
  mature: number; // dont l'intervalle atteint REVIEW.mature jours
}

/**
 * La session de révision : questions déjà vues des quiz faits, arrivées à échéance (la plus en retard d'abord),
 * limit au maximum. Les questions jamais vues n'y entrent pas : elles passent par le renforcement.
 */
export function dueReviews(
  states: Map<string, ReviewState>,
  quizzes: { id: string; questionIds: string[] }[],
  now: Date,
  limit = REVIEW.limit,
): Reviews {
  const today = localDay(now);
  const due: { quizId: string; questionId: string; day: string }[] = [];
  let fresh = 0;
  let next: string | null = null;
  let tracked = 0;
  let mature = 0;
  for (const q of quizzes) {
    fresh += unseen(states, q).length;
    for (const questionId of q.questionIds) {
      const s = states.get(reviewKey(q.id, questionId));
      if (!s) continue;
      tracked++;
      if (s.interval >= REVIEW.mature) mature++;
      if (s.dueDay <= today) due.push({ quizId: q.id, questionId, day: s.dueDay });
      else if (!next || s.dueDay < next) next = s.dueDay;
    }
  }
  due.sort((a, b) => a.day.localeCompare(b.day));
  return {
    items: due.slice(0, limit).map(({ quizId, questionId }) => ({ quizId, questionId })),
    due: due.length,
    fresh,
    next,
    tracked,
    mature,
  };
}
