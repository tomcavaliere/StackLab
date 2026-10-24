import { describe, expect, it } from 'vitest';
import {
  answerXp,
  computeProgress,
  dayStreak,
  levelOf,
  pickQuestions,
  questionStats,
  sessionXp,
  ficheQuizId,
  XP,
  type History,
  type QuizAnswer,
  type QuizSession,
} from './rewards';

const right = (questionId: string): QuizAnswer => ({ questionId, chosen: 'lfi', correct: 'lfi' });
const wrong = (questionId: string): QuizAnswer => ({ questionId, chosen: 'ps', correct: 'lfi' });
// Midi UTC : le même jour local en France métropolitaine, été comme hiver.
const day = (d: string) => `${d}T12:00:00Z`;
const session = (playedAt: string, answers: QuizAnswer[], themeId = 'gauche'): QuizSession => ({ themeId, playedAt, answers });
const empty: History = { quizSessions: [], viewedFiches: [] };

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
    const stats = questionStats(sessions, 'gauche');
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
  const themes = [{ id: 'gauche', questionIds: ['a', 'b'] }];
  const now = new Date(day('2026-10-10'));

  it('niveaux par paliers', () => {
    expect(levelOf(0)).toMatchObject({ number: 1, name: 'Sympathisant', next: 150 });
    expect(levelOf(150)).toMatchObject({ number: 2, name: 'Militant', floor: 150 });
    expect(levelOf(6000)).toMatchObject({ name: 'Ministre', next: 9000 });
    expect(levelOf(99999)).toMatchObject({ name: 'Sage du Conseil constitutionnel', next: null });
  });

  it('fiches : une fois chacune', () => {
    const p = computeProgress({ ...empty, viewedFiches: ['lfi', 'ps'] }, themes, [], now);
    expect(p.xpBySource).toEqual({ quiz: 0, fiches: 2 * XP.fiche });
    expect(p.xp).toBe(2 * XP.fiche);
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
      [],
      now,
    );
    expect(p.themes.gauche).toEqual({ mastered: 1, total: 2, sessions: 3 });
    expect(p.confusions).toEqual([{ fiches: ['lfi', 'ps'], count: 1 }]);
    expect(p.unlocked).toEqual(expect.arrayContaining(['premier-pas', 'en-rythme', 'sans-faute', 'serie-3', 'polyvalent']));
    expect(p.unlocked).not.toContain('specialiste');
    expect(p.unlocked).not.toContain('serie-7');
  });

  it('quiz de fiche : maîtrise par fiche, badges, hors confusions', () => {
    // Réponses en texte : seule l'égalité chosen/correct compte.
    const text = (questionId: string, ok: boolean): QuizAnswer => ({
      questionId,
      chosen: ok ? 'Le Conseil constitutionnel' : 'Le Sénat',
      correct: 'Le Conseil constitutionnel',
    });
    const vrep = (d: string, answers: QuizAnswer[]) => session(day(d), answers, ficheQuizId('ve-republique'));
    const ficheQuizzes = [
      { id: 've-republique', questionIds: ['a', 'b'] },
      { id: 'laicite', questionIds: ['x'] },
    ];
    const history = (sessions: QuizSession[]): History => ({ ...empty, quizSessions: sessions });
    const twoSessions = [vrep('2026-10-09', [text('a', true), text('b', false)]), vrep('2026-10-10', [text('a', true), text('b', true)])];

    const p = computeProgress(history(twoSessions), themes, ficheQuizzes, now);
    expect(p.fiches).toEqual({ 've-republique': { mastered: 1, total: 2, sessions: 2 }, laicite: { mastered: 0, total: 1, sessions: 0 } });
    expect(p.themes.gauche.sessions).toBe(0);
    expect(p.confusions).toEqual([]);
    expect(p.xpBySource.quiz).toBe(sessionXp(twoSessions[0].answers) + sessionXp(twoSessions[1].answers));
    expect(p.unlocked).toContain('premier-pas');
    expect(p.unlocked).not.toContain('expert');

    const after = computeProgress(history([...twoSessions, vrep('2026-10-10', [text('b', true)])]), themes, ficheQuizzes, now);
    expect(after.fiches['ve-republique'].mastered).toBe(2);
    expect(after.unlocked).toContain('expert');
    expect(after.unlocked).not.toContain('encyclopedie');
    expect(after.unlocked).not.toContain('polyvalent');
  });
});
