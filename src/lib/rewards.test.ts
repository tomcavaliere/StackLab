import { describe, expect, it } from 'vitest';
import {
  answerXp,
  computeProgress,
  dayStreak,
  levelOf,
  pickQuestions,
  questionStats,
  sessionXp,
  XP,
  type History,
  type QuizAnswer,
  type QuizSession,
} from './rewards';

const right = (questionId: string): QuizAnswer => ({ questionId, chosenTech: 'redis', correctTech: 'redis' });
const wrong = (questionId: string): QuizAnswer => ({ questionId, chosenTech: 'postgresql', correctTech: 'redis' });
// Midi UTC : le même jour local en France métropolitaine, été comme hiver.
const day = (d: string) => `${d}T12:00:00Z`;
const session = (playedAt: string, answers: QuizAnswer[], themeId = 'bdd'): QuizSession => ({ themeId, playedAt, answers });
const empty: History = { quizSessions: [], attempts: [], viewedTechs: [] };

describe('XP du quiz', () => {
  it('le combo augmente le gain puis plafonne', () => {
    expect(answerXp(1)).toBe(XP.correct);
    expect(answerXp(2)).toBe(XP.correct + XP.comboStep);
    expect(answerXp(6)).toBe(XP.correct + XP.comboMax);
    expect(answerXp(20)).toBe(XP.correct + XP.comboMax);
  });

  it('une erreur remet le combo à zéro', () => {
    // 10 + 12, erreur, 10
    expect(sessionXp([right('a'), right('b'), wrong('c'), right('d')])).toBe(32);
  });

  it('bonus sans faute seulement si tout est juste et la session assez longue', () => {
    const five = ['a', 'b', 'c', 'd', 'e'].map(right);
    expect(sessionXp(five)).toBe(10 + 12 + 14 + 16 + 18 + XP.perfect);
    expect(sessionXp(five.slice(0, 4))).toBe(10 + 12 + 14 + 16);
    expect(sessionXp([...five.slice(0, 4), wrong('e')])).toBe(10 + 12 + 14 + 16);
  });
});

describe('maîtrise et choix des questions', () => {
  it('maîtrisée après 2 bonnes réponses d’affilée, une erreur remet à zéro', () => {
    const sessions = [
      session(day('2026-10-01'), [right('a'), right('b')]),
      session(day('2026-10-02'), [right('a'), wrong('b')]),
    ];
    const stats = questionStats(sessions, 'bdd');
    expect(stats.a).toEqual({ seen: 2, streak: 2, lastAt: day('2026-10-02') });
    expect(stats.b.streak).toBe(0);
    expect(questionStats(sessions, 'autre-theme')).toEqual({});
  });

  it('ratées, puis jamais vues, puis en cours, puis maîtrisées', () => {
    const stats = {
      maitrisee: { seen: 2, streak: 2, lastAt: day('2026-10-01') },
      'en-cours': { seen: 1, streak: 1, lastAt: day('2026-10-01') },
      'ratee-recente': { seen: 1, streak: 0, lastAt: day('2026-10-03') },
      'ratee-ancienne': { seen: 1, streak: 0, lastAt: day('2026-10-02') },
    };
    const questions = ['maitrisee', 'en-cours', 'jamais-vue', 'ratee-recente', 'ratee-ancienne'].map((id) => ({ id }));
    expect(pickQuestions(questions, stats, 10).map((q) => q.id)).toEqual([
      'ratee-ancienne',
      'ratee-recente',
      'jamais-vue',
      'en-cours',
      'maitrisee',
    ]);
    expect(pickQuestions(questions, stats, 2)).toHaveLength(2);
  });
});

describe('série de jours', () => {
  const now = new Date(day('2026-10-10'));

  it('compte les jours consécutifs et garde le record', () => {
    const dates = ['2026-10-01', '2026-10-02', '2026-10-03', '2026-10-04', '2026-10-09', '2026-10-10'].map(day);
    expect(dayStreak(dates, now)).toEqual({ current: 2, best: 4, today: true });
  });

  it('une série d’hier reste en vie aujourd’hui', () => {
    expect(dayStreak([day('2026-10-08'), day('2026-10-09')], now)).toEqual({ current: 2, best: 2, today: false });
  });

  it('un trou remet la série à zéro', () => {
    expect(dayStreak([day('2026-10-07'), day('2026-10-08')], now).current).toBe(0);
    expect(dayStreak([], now)).toEqual({ current: 0, best: 0, today: false });
  });
});

describe('progression', () => {
  const themes = [{ id: 'bdd', questionIds: ['a', 'b'] }];
  const now = new Date(day('2026-10-10'));

  it('niveaux par paliers', () => {
    expect(levelOf(0)).toMatchObject({ number: 1, name: 'Stagiaire', next: 150 });
    expect(levelOf(150)).toMatchObject({ number: 2, name: 'Junior', floor: 150 });
    expect(levelOf(99999)).toMatchObject({ name: 'Architecte', next: null });
  });

  it('scénarios : seul le meilleur score compte ; fiches : une fois chacune', () => {
    const p = computeProgress(
      {
        ...empty,
        attempts: [
          { scenarioId: 'mvp', playedAt: day('2026-10-01'), score: 40 },
          { scenarioId: 'mvp', playedAt: day('2026-10-02'), score: 70 },
          { scenarioId: 'api', playedAt: day('2026-10-02'), score: 50 },
        ],
        viewedTechs: ['redis', 'kafka'],
      },
      themes,
      now,
    );
    expect(p.xpBySource).toEqual({ quiz: 0, scenarios: 120, fiches: 2 * XP.fiche });
    expect(p.xp).toBe(120 + 2 * XP.fiche);
  });

  it('maîtrise du thème, confusions et badges', () => {
    const ten = Array.from({ length: 10 }, (_, i) => right(`q${i}`));
    const p = computeProgress(
      {
        ...empty,
        quizSessions: [
          session(day('2026-10-08'), [right('a'), wrong('b')]),
          session(day('2026-10-09'), [right('a'), right('b')]),
          session(day('2026-10-10'), ten),
        ],
      },
      themes,
      now,
    );
    expect(p.themes.bdd).toEqual({ mastered: 1, total: 2, sessions: 3 });
    expect(p.confusions).toEqual([{ techs: ['postgresql', 'redis'], count: 1 }]);
    expect(p.unlocked).toEqual(expect.arrayContaining(['premier-pas', 'en-rythme', 'sans-faute', 'serie-3', 'polyvalent']));
    expect(p.unlocked).not.toContain('specialiste');
    expect(p.unlocked).not.toContain('serie-7');
  });
});
