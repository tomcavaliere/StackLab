import { describe, expect, it } from 'vitest';
import { companyOpen, computePath, doneQuizzes, isOpen, stepOf, type Parcours } from './path';
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
/** Leçon validée : fiche lue et quiz réussi. */
const learnt = (...techs: string[]): Partial<History> => ({
  viewedTechs: techs,
  quizSessions: techs.map((t) => session(techQuizId(t), 10)),
});

const unit = (id: string, lessons: string[], themes: string[] = [], scenarios: string[] = []) => ({ id, title: id, intro: '', lessons, themes, scenarios });
const parcours = (id: string, kind: Parcours['kind'], requires: string[], units: Parcours['units']): Parcours => ({ id, kind, title: id, intro: '', requires, units });

// Un seul parcours, comme avant la phase 14 : les règles d'une étape à l'autre ne changent pas.
const single: Parcours[] = [
  parcours('tronc', 'tronc', [], [unit('u1', ['sql', 'python'], ['langages']), unit('u2', ['django'], [], ['mvp', 'devine-x'])]),
];
// Le tronc commun ouvre deux métiers qui partagent pandas, et une compétence qui demande un des métiers.
const tree: Parcours[] = [
  parcours('tronc', 'tronc', [], [unit('t', ['sql'])]),
  parcours('ds', 'metier', ['tronc'], [unit('d', ['pandas', 'sklearn'])]),
  parcours('da', 'metier', ['tronc'], [unit('a', ['pandas', 'dbt'])]),
  parcours('ml', 'competence', ['ds'], [unit('m', ['pytorch'])]),
];

const history = (...parts: Partial<History>[]): History =>
  parts.reduce<History>(
    (h, p) => ({
      quizSessions: [...h.quizSessions, ...(p.quizSessions ?? [])],
      attempts: [...h.attempts, ...(p.attempts ?? [])],
      viewedTechs: [...h.viewedTechs, ...(p.viewedTechs ?? [])],
    }),
    { quizSessions: [], attempts: [], viewedTechs: [] },
  );
const statuses = (h: History, p = single) =>
  computePath(p, h)
    .parcours.flatMap((c) => c.units.flatMap((u) => u.steps))
    .map((s) => `${s.id}:${s.status}`);

describe('parcours : étapes', () => {
  it('au départ, seule la première leçon est en cours, sans quiz tant que la fiche est non lue', () => {
    const path = computePath(single, history());
    expect(statuses(history())).toEqual(['sql:current', 'python:locked', 'langages:locked', 'django:locked', 'mvp:locked', 'devine-x:locked']);
    expect(path.next).toMatchObject({ kind: 'lesson', id: 'sql', viewed: false });
    expect(isOpen(stepOf(path, 'lesson', 'sql'))).toBe(false);
    expect(isOpen(stepOf(computePath(single, history({ viewedTechs: ['sql'] })), 'lesson', 'sql'))).toBe(true);
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
    const base = history(learnt('sql', 'python', 'django'), { quizSessions: [session('langages', 7)] });
    const path = computePath(single, history(base, { attempts: [{ scenarioId: 'mvp', playedAt: '', score: 59 }] }));
    expect(path.next).toMatchObject({ kind: 'scenario', id: 'mvp' });
    expect(path.parcours[0].units.map((u) => u.status)).toEqual(['done', 'current']);
    const after = history(base, { attempts: [{ scenarioId: 'mvp', playedAt: '', score: 60 }] });
    expect(computePath(single, after).next).toMatchObject({ id: 'devine-x' });
  });

  it("une étape faite en avance reste faite et ouverte, sans déplacer l'étape en cours", () => {
    const path = computePath(single, history(learnt('django')));
    expect(path.next?.id).toBe('sql');
    expect(stepOf(path, 'lesson', 'django')?.status).toBe('done');
    expect(isOpen(stepOf(path, 'lesson', 'django'))).toBe(true);
    expect(isOpen(stepOf(path, 'lesson', 'python'))).toBe(false);
    expect(doneQuizzes(path)).toEqual([techQuizId('django')]);
  });

  it("l'entreprise s'ouvre avec son scénario « devine la stack »", () => {
    const won = computePath(single, history({ attempts: [{ scenarioId: 'devine-x', playedAt: '', score: 75 }] }));
    expect(companyOpen(computePath(single, history()), 'devine-x')).toBe(false);
    expect(companyOpen(won, 'devine-x')).toBe(true);
    expect(companyOpen(won, undefined)).toBe(true);
  });

  it('parcours terminé : plus d’étape en cours', () => {
    const all = history(learnt('sql', 'python', 'django'), {
      quizSessions: [session('langages', 10)],
      attempts: [
        { scenarioId: 'mvp', playedAt: '', score: 80 },
        { scenarioId: 'devine-x', playedAt: '', score: 80 },
      ],
    });
    const path = computePath(single, all);
    expect(path.next).toBeNull();
    expect(path.parcours[0]).toMatchObject({ status: 'done', current: null, done: 6, total: 6 });
  });
});

describe('parcours : plusieurs parcours', () => {
  it('les métiers restent fermés tant que le tronc commun n’est pas terminé', () => {
    const path = computePath(tree, history());
    expect(path.parcours.map((p) => `${p.id}:${p.status}`)).toEqual(['tronc:current', 'ds:locked', 'da:locked', 'ml:locked']);
    expect(path.parcours[1]).toMatchObject({ unlocked: false, waitingFor: ['tronc'], current: null });
    expect(isOpen(stepOf(path, 'lesson', 'pandas'))).toBe(false);
  });

  it('une fois le tronc fait, les métiers s’ouvrent en parallèle ; une compétence attend son métier', () => {
    const path = computePath(tree, history(learnt('sql')));
    expect(path.parcours.map((p) => `${p.id}:${p.status}`)).toEqual(['tronc:done', 'ds:current', 'da:current', 'ml:locked']);
    expect(path.parcours[1].current?.id).toBe('pandas');
    expect(path.parcours[2].current?.id).toBe('pandas');
    expect(path.parcours[3].waitingFor).toEqual(['ds']);
  });

  it('une leçon partagée faite dans un métier est faite dans l’autre', () => {
    const path = computePath(tree, history(learnt('sql', 'pandas')));
    expect(path.parcours[1].current?.id).toBe('sklearn');
    expect(path.parcours[2].current?.id).toBe('dbt');
    expect(doneQuizzes(path)).toEqual([techQuizId('sql'), techQuizId('pandas')]);
  });

  it('stepOf fusionne : en cours dans un parcours ouvert l’emporte sur verrouillé', () => {
    // ml n'est pas ouvert : pytorch y est verrouillé, mais dbt est en cours dans da.
    const path = computePath(tree, history(learnt('sql', 'pandas')));
    expect(stepOf(path, 'lesson', 'dbt')).toMatchObject({ status: 'current', parcours: 'da' });
    expect(stepOf(path, 'lesson', 'pytorch')?.status).toBe('locked');
    expect(stepOf(path, 'lesson', 'absent')).toBeUndefined();
  });

  it('un parcours terminé en avance ouvre ce qui le requiert, même si son propre prérequis ne l’est pas', () => {
    // ds fait (historique d'avant), tronc pas fait : ml attend toujours tronc, par transitivité.
    const path = computePath(tree, history(learnt('pandas', 'sklearn')));
    expect(path.parcours[1].status).toBe('done');
    expect(path.parcours[3]).toMatchObject({ unlocked: false, waitingFor: ['tronc'] });
  });

  it('un parcours fermé n’affiche que ses prérequis les plus proches', () => {
    // ml attend ds, qui attend tronc : on affiche ds seulement, mais la prochaine étape ouvre le tronc.
    const path = computePath(tree, history(), 'ml');
    expect(path.parcours[3].waitingFor).toEqual(['ds']);
    expect(path.next).toMatchObject({ parcours: 'tronc', id: 'sql' });
  });

  it('prochaine étape : le parcours suivi, sinon ce qu’il attend, sinon le tronc commun', () => {
    const h = history(learnt('sql'));
    expect(computePath(tree, h).next).toBeNull(); // rien de suivi, tronc fini
    expect(computePath(tree, h, 'da').next).toMatchObject({ parcours: 'da', id: 'pandas' });
    expect(computePath(tree, h, 'ml').next).toMatchObject({ parcours: 'ds', id: 'pandas' });
    expect(computePath(tree, history(), 'da').next).toMatchObject({ parcours: 'tronc', id: 'sql' });
    expect(computePath(tree, history(), 'inconnu').next).toMatchObject({ parcours: 'tronc', id: 'sql' });
  });
});
