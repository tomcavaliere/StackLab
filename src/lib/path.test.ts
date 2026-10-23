import { describe, expect, it } from 'vitest';
import { companyOpen, computePath, doneQuizzes, isOpen, stepOf, type Unit } from './path';
import { techQuizId, type History, type QuizAnswer, type QuizSession } from './rewards';

const right = (questionId: string): QuizAnswer => ({ questionId, chosenTech: 'a', correctTech: 'a' });
const wrong = (questionId: string): QuizAnswer => ({ questionId, chosenTech: 'b', correctTech: 'a' });
const ids = (n: number) => Array.from({ length: n }, (_, i) => `q${i}`);
/** Session de 10 réponses dont `good` bonnes. */
const session = (themeId: string, good: number, total = 10): QuizSession => ({
  themeId,
  playedAt: '2026-10-01T12:00:00Z',
  answers: ids(total).map((id, i) => (i < good ? right(id) : wrong(id))),
});

const units: Unit[] = [
  { id: 'u1', title: 'U1', intro: '', lessons: ['sql', 'python'], themes: ['langages'], scenarios: [] },
  { id: 'u2', title: 'U2', intro: '', lessons: ['django'], themes: [], scenarios: ['mvp', 'devine-x'] },
];
const history = (h: Partial<History>): History => ({ quizSessions: [], attempts: [], viewedTechs: [], ...h });
const statuses = (h: History) =>
  computePath(units, h)
    .units.flatMap((u) => u.steps)
    .map((s) => `${s.id}:${s.status}`);

describe('parcours', () => {
  it('au départ, seule la première leçon est en cours, sans quiz tant que la fiche est non lue', () => {
    const path = computePath(units, history({}));
    expect(statuses(history({}))).toEqual(['sql:current', 'python:locked', 'langages:locked', 'django:locked', 'mvp:locked', 'devine-x:locked']);
    expect(path.current).toMatchObject({ kind: 'lesson', id: 'sql', viewed: false });
    expect(isOpen(stepOf(path, 'lesson', 'sql'))).toBe(false);
    expect(isOpen(stepOf(computePath(units, history({ viewedTechs: ['sql'] })), 'lesson', 'sql'))).toBe(true);
  });

  it('une leçon demande la fiche lue et une session à 7/10 ou plus', () => {
    expect(statuses(history({ viewedTechs: ['sql'], quizSessions: [session(techQuizId('sql'), 6)] }))[0]).toBe('sql:current');
    expect(statuses(history({ quizSessions: [session(techQuizId('sql'), 10)] }))[0]).toBe('sql:current');
    expect(statuses(history({ viewedTechs: ['sql'], quizSessions: [session(techQuizId('sql'), 7)] })).slice(0, 2)).toEqual([
      'sql:done',
      'python:current',
    ]);
  });

  it('une session trop courte ne valide rien, même sans faute', () => {
    expect(statuses(history({ viewedTechs: ['sql'], quizSessions: [session(techQuizId('sql'), 4, 4)] }))[0]).toBe('sql:current');
  });

  it('le thème vient après les leçons, le scénario demande 60', () => {
    const base = {
      viewedTechs: ['sql', 'python', 'django'],
      quizSessions: [session(techQuizId('sql'), 8), session(techQuizId('python'), 9), session('langages', 7), session(techQuizId('django'), 10)],
    };
    const path = computePath(units, history({ ...base, attempts: [{ scenarioId: 'mvp', playedAt: '', score: 59 }] }));
    expect(path.current).toMatchObject({ kind: 'scenario', id: 'mvp' });
    expect(path.units.map((u) => u.status)).toEqual(['done', 'current']);
    const after = history({ ...base, attempts: [{ scenarioId: 'mvp', playedAt: '', score: 60 }] });
    expect(computePath(units, after).current).toMatchObject({ id: 'devine-x' });
  });

  it("une étape faite en avance reste faite et ouverte, sans déplacer l'étape en cours", () => {
    const path = computePath(units, history({ viewedTechs: ['django'], quizSessions: [session(techQuizId('django'), 10)] }));
    expect(path.current?.id).toBe('sql');
    expect(stepOf(path, 'lesson', 'django')?.status).toBe('done');
    expect(isOpen(stepOf(path, 'lesson', 'django'))).toBe(true);
    expect(isOpen(stepOf(path, 'lesson', 'python'))).toBe(false);
    expect(doneQuizzes(path)).toEqual([techQuizId('django')]);
  });

  it("l'entreprise s'ouvre avec son scénario « devine la stack »", () => {
    const won = computePath(units, history({ attempts: [{ scenarioId: 'devine-x', playedAt: '', score: 75 }] }));
    expect(companyOpen(computePath(units, history({})), 'devine-x')).toBe(false);
    expect(companyOpen(won, 'devine-x')).toBe(true);
    expect(companyOpen(won, undefined)).toBe(true);
  });

  it('parcours terminé : plus d’étape en cours', () => {
    const all = history({
      viewedTechs: ['sql', 'python', 'django'],
      quizSessions: ['sql', 'python', 'django'].map((t) => session(techQuizId(t), 10)).concat(session('langages', 10)),
      attempts: [
        { scenarioId: 'mvp', playedAt: '', score: 80 },
        { scenarioId: 'devine-x', playedAt: '', score: 80 },
      ],
    });
    expect(computePath(units, all).current).toBeNull();
  });
});
