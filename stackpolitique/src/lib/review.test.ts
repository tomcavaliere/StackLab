import { describe, expect, it } from 'vitest';
import { dueReviews, REVIEW, reviewKey, reviewStates, unseen } from './review';
import type { QuizAnswer, QuizSession } from './rewards';

const right = (questionId: string): QuizAnswer => ({ questionId, chosen: 'a', correct: 'a' });
const wrong = (questionId: string): QuizAnswer => ({ questionId, chosen: 'b', correct: 'a' });
// Midi UTC : le même jour local en France métropolitaine, été comme hiver.
const at = (d: string, answers: QuizAnswer[], themeId = 'fiche:laicite'): QuizSession => ({ themeId, playedAt: `${d}T12:00:00Z`, answers });
const state = (sessions: QuizSession[], q = 'q1', quiz = 'fiche:laicite') => reviewStates(sessions).get(reviewKey(quiz, q));

describe('répétition espacée', () => {
  it('chaque bonne réponse à échéance allonge l’intervalle : 1, 3, 8, 20 jours', () => {
    const s = [
      at('2026-10-01', [right('q1')]),
      at('2026-10-02', [right('q1')]),
      at('2026-10-05', [right('q1')]),
      at('2026-10-13', [right('q1')]),
    ];
    expect(state(s.slice(0, 1))).toMatchObject({ interval: 1, dueDay: '2026-10-02' });
    expect(state(s.slice(0, 2))).toMatchObject({ interval: 3, dueDay: '2026-10-05' });
    expect(state(s.slice(0, 3))).toMatchObject({ interval: 8, dueDay: '2026-10-13' });
    expect(state(s)).toMatchObject({ interval: 20, dueDay: '2026-11-02' });
  });

  it('une bonne réponse avant échéance ne change rien', () => {
    const s = [at('2026-10-01', [right('q1')]), at('2026-10-02', [right('q1')]), at('2026-10-03', [right('q1')])];
    expect(state(s)).toMatchObject({ interval: 3, dueDay: '2026-10-05' });
  });

  it('une erreur remet à zéro (à revoir le jour même) et baisse la facilité, avec un plancher', () => {
    const s = [at('2026-10-01', [right('q1')]), at('2026-10-02', [right('q1')]), at('2026-10-03', [wrong('q1')])];
    expect(state(s)).toMatchObject({ interval: 0, dueDay: '2026-10-03', ease: REVIEW.ease - REVIEW.lapse });
    const many = Array.from({ length: 10 }, (_, i) => at(`2026-10-${String(i + 1).padStart(2, '0')}`, [wrong('q1')]));
    expect(state(many)?.ease).toBe(REVIEW.easeMin);
  });

  it('ratée puis réussie le même jour : revient le lendemain (comme « À revoir » d’Anki)', () => {
    expect(state([at('2026-10-01', [wrong('q1'), right('q1')])])).toMatchObject({ interval: 1, dueDay: '2026-10-02' });
  });

  it('les ids de question ne se mélangent pas d’un quiz à l’autre', () => {
    const s = [at('2026-10-01', [right('q1')], 'fiche:laicite'), at('2026-10-01', [wrong('q1')], 'gauche')];
    expect(state(s, 'q1', 'fiche:laicite')?.interval).toBe(1);
    expect(state(s, 'q1', 'gauche')?.interval).toBe(0);
  });
});

describe('session de révision', () => {
  const sessions = [
    at('2026-10-01', [right('q1'), wrong('q2'), right('q3')]),
    at('2026-10-02', [right('q1')]), // q1 : due le 5 ; q3 : due le 2
  ];
  const quizzes = [{ id: 'fiche:laicite', questionIds: ['q1', 'q2', 'q3', 'q4'] }];
  const now = new Date('2026-10-03T12:00:00Z');

  it('les questions dues, la plus en retard en tête ; les jamais vues sont seulement comptées', () => {
    const r = dueReviews(reviewStates(sessions), quizzes, now);
    expect(r.items.map((i) => i.questionId)).toEqual(['q2', 'q3']);
    expect(r).toMatchObject({ due: 2, fresh: 1, tracked: 3, next: '2026-10-05' });
  });

  it('aucune question jamais vue n’entre en révision', () => {
    const big = [{ id: 'fiche:clivage', questionIds: Array.from({ length: 30 }, (_, i) => `n${i}`) }];
    expect(dueReviews(reviewStates([]), big, now)).toMatchObject({ items: [], due: 0, fresh: 30 });
  });

  it('unseen : les questions d’un quiz jamais répondues, renforcement compris', () => {
    const later = [...sessions, at('2026-10-03', [wrong('q4')])];
    expect(unseen(reviewStates(sessions), quizzes[0])).toEqual(['q4']);
    expect(unseen(reviewStates(later), quizzes[0])).toEqual([]);
  });

  it('limite la taille de la session et ignore les quiz non faits', () => {
    expect(dueReviews(reviewStates(sessions), quizzes, now, 2).items).toHaveLength(2);
    expect(dueReviews(reviewStates(sessions), [], now).items).toEqual([]);
  });
});
