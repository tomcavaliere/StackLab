import { describe, expect, it } from 'vitest';
import { computePath, doneQuizzes, isOpen, stepOf, type Parcours } from './path';
import { ficheQuizId, type History, type QuizAnswer, type QuizSession } from './rewards';

const right = (questionId: string): QuizAnswer => ({ questionId, chosen: 'a', correct: 'a' });
const wrong = (questionId: string): QuizAnswer => ({ questionId, chosen: 'b', correct: 'a' });
const ids = (n: number) => Array.from({ length: n }, (_, i) => `q${i}`);
/** Session de 10 réponses dont `good` bonnes. */
const session = (themeId: string, good: number, total = 10): QuizSession => ({
  themeId,
  playedAt: '2026-10-01T12:00:00Z',
  answers: ids(total).map((id, i) => (i < good ? right(id) : wrong(id))),
});
/** Leçon validée : fiche lue et quiz réussi. */
const learnt = (...fiches: string[]): Partial<History> => ({
  viewedFiches: fiches,
  quizSessions: fiches.map((t) => session(ficheQuizId(t), 10)),
});

const unit = (id: string, lessons: string[], themes: string[] = []) => ({ id, title: id, intro: '', lessons, themes });
const parcours = (id: string, kind: Parcours['kind'], requires: string[], units: Parcours['units']): Parcours => ({ id, kind, title: id, intro: '', requires, units });

// Un seul parcours : les règles d'une étape à l'autre.
const single: Parcours[] = [
  parcours('tronc', 'tronc', [], [unit('u1', ['clivage', 've-republique'], ['institutions']), unit('u2', ['laicite'], ['notions'])]),
];
// Le tronc commun ouvre deux partis qui partagent une fiche (union-gauche), et une comparaison qui demande un des partis.
const tree: Parcours[] = [
  parcours('tronc', 'tronc', [], [unit('t', ['clivage'])]),
  parcours('lfi', 'parti', ['tronc'], [unit('l', ['union-gauche', 'melenchon'])]),
  parcours('ps', 'parti', ['tronc'], [unit('p', ['union-gauche', 'faure'])]),
  parcours('cmp', 'comparaison', ['lfi'], [unit('c', ['nupes'])]),
];

const history = (...parts: Partial<History>[]): History =>
  parts.reduce<History>(
    (h, p) => ({
      quizSessions: [...h.quizSessions, ...(p.quizSessions ?? [])],
      viewedFiches: [...h.viewedFiches, ...(p.viewedFiches ?? [])],
    }),
    { quizSessions: [], viewedFiches: [] },
  );
const statuses = (h: History, p = single) =>
  computePath(p, h)
    .parcours.flatMap((c) => c.units.flatMap((u) => u.steps))
    .map((s) => `${s.id}:${s.status}`);

describe('parcours : étapes', () => {
  it('au départ, seule la première leçon est en cours, sans quiz tant que la fiche est non lue', () => {
    const path = computePath(single, history());
    expect(statuses(history())).toEqual(['clivage:current', 've-republique:locked', 'institutions:locked', 'laicite:locked', 'notions:locked']);
    expect(path.next).toMatchObject({ kind: 'lesson', id: 'clivage', viewed: false });
    expect(isOpen(stepOf(path, 'lesson', 'clivage'))).toBe(false);
    expect(isOpen(stepOf(computePath(single, history({ viewedFiches: ['clivage'] })), 'lesson', 'clivage'))).toBe(true);
  });

  it('une leçon demande la fiche lue et une session à 7/10 ou plus', () => {
    expect(statuses(history({ viewedFiches: ['clivage'], quizSessions: [session(ficheQuizId('clivage'), 6)] }))[0]).toBe('clivage:current');
    expect(statuses(history({ quizSessions: [session(ficheQuizId('clivage'), 10)] }))[0]).toBe('clivage:current');
    expect(statuses(history({ viewedFiches: ['clivage'], quizSessions: [session(ficheQuizId('clivage'), 7)] })).slice(0, 2)).toEqual([
      'clivage:done',
      've-republique:current',
    ]);
  });

  it('une session trop courte ne valide rien, même sans faute', () => {
    expect(statuses(history({ viewedFiches: ['clivage'], quizSessions: [session(ficheQuizId('clivage'), 4, 4)] }))[0]).toBe('clivage:current');
  });

  it('le thème vient après les leçons de son unité et demande 7/10', () => {
    const base = history(learnt('clivage', 've-republique'));
    expect(computePath(single, base).next).toMatchObject({ kind: 'theme', id: 'institutions' });
    const failed = history(base, { quizSessions: [session('institutions', 6)] });
    expect(computePath(single, failed).next).toMatchObject({ id: 'institutions' });
    const after = history(base, { quizSessions: [session('institutions', 7)] });
    expect(computePath(single, after).next).toMatchObject({ id: 'laicite' });
    expect(computePath(single, after).parcours[0].units.map((u) => u.status)).toEqual(['done', 'current']);
  });

  it("une étape faite en avance reste faite et ouverte, sans déplacer l'étape en cours", () => {
    const path = computePath(single, history(learnt('laicite')));
    expect(path.next?.id).toBe('clivage');
    expect(stepOf(path, 'lesson', 'laicite')?.status).toBe('done');
    expect(isOpen(stepOf(path, 'lesson', 'laicite'))).toBe(true);
    expect(isOpen(stepOf(path, 'lesson', 've-republique'))).toBe(false);
    expect(doneQuizzes(path)).toEqual([ficheQuizId('laicite')]);
  });

  it('parcours terminé : plus d’étape en cours', () => {
    const all = history(learnt('clivage', 've-republique', 'laicite'), {
      quizSessions: [session('institutions', 10), session('notions', 8)],
    });
    const path = computePath(single, all);
    expect(path.next).toBeNull();
    expect(path.parcours[0]).toMatchObject({ status: 'done', current: null, done: 5, total: 5 });
  });
});

describe('parcours : plusieurs parcours', () => {
  it('les partis restent fermés tant que le tronc commun n’est pas terminé', () => {
    const path = computePath(tree, history());
    expect(path.parcours.map((p) => `${p.id}:${p.status}`)).toEqual(['tronc:current', 'lfi:locked', 'ps:locked', 'cmp:locked']);
    expect(path.parcours[1]).toMatchObject({ unlocked: false, waitingFor: ['tronc'], current: null });
    expect(isOpen(stepOf(path, 'lesson', 'union-gauche'))).toBe(false);
  });

  it('une fois le tronc fait, les partis s’ouvrent en parallèle ; une comparaison attend son parti', () => {
    const path = computePath(tree, history(learnt('clivage')));
    expect(path.parcours.map((p) => `${p.id}:${p.status}`)).toEqual(['tronc:done', 'lfi:current', 'ps:current', 'cmp:locked']);
    expect(path.parcours[1].current?.id).toBe('union-gauche');
    expect(path.parcours[2].current?.id).toBe('union-gauche');
    expect(path.parcours[3].waitingFor).toEqual(['lfi']);
  });

  it('une leçon partagée faite dans un parti est faite dans l’autre', () => {
    const path = computePath(tree, history(learnt('clivage', 'union-gauche')));
    expect(path.parcours[1].current?.id).toBe('melenchon');
    expect(path.parcours[2].current?.id).toBe('faure');
    expect(doneQuizzes(path)).toEqual([ficheQuizId('clivage'), ficheQuizId('union-gauche')]);
  });

  it('stepOf fusionne : en cours dans un parcours ouvert l’emporte sur verrouillé', () => {
    // cmp n'est pas ouvert : nupes y est verrouillé, mais faure est en cours dans ps.
    const path = computePath(tree, history(learnt('clivage', 'union-gauche')));
    expect(stepOf(path, 'lesson', 'faure')).toMatchObject({ status: 'current', parcours: 'ps' });
    expect(stepOf(path, 'lesson', 'nupes')?.status).toBe('locked');
    expect(stepOf(path, 'lesson', 'absent')).toBeUndefined();
  });

  it('un parcours terminé en avance ouvre ce qui le requiert, même si son propre prérequis ne l’est pas', () => {
    // lfi fait (historique d'avant), tronc pas fait : cmp attend toujours tronc, par transitivité.
    const path = computePath(tree, history(learnt('union-gauche', 'melenchon')));
    expect(path.parcours[1].status).toBe('done');
    expect(path.parcours[3]).toMatchObject({ unlocked: false, waitingFor: ['tronc'] });
  });

  it('un parcours fermé n’affiche que ses prérequis les plus proches', () => {
    // cmp attend lfi, qui attend tronc : on affiche lfi seulement, mais la prochaine étape ouvre le tronc.
    const path = computePath(tree, history(), 'cmp');
    expect(path.parcours[3].waitingFor).toEqual(['lfi']);
    expect(path.next).toMatchObject({ parcours: 'tronc', id: 'clivage' });
  });

  it('prochaine étape : le parcours suivi, sinon ce qu’il attend, sinon le tronc commun', () => {
    const h = history(learnt('clivage'));
    expect(computePath(tree, h).next).toBeNull(); // rien de suivi, tronc fini
    expect(computePath(tree, h, 'ps').next).toMatchObject({ parcours: 'ps', id: 'union-gauche' });
    expect(computePath(tree, h, 'cmp').next).toMatchObject({ parcours: 'lfi', id: 'union-gauche' });
    expect(computePath(tree, history(), 'ps').next).toMatchObject({ parcours: 'tronc', id: 'clivage' });
    expect(computePath(tree, history(), 'inconnu').next).toMatchObject({ parcours: 'tronc', id: 'clivage' });
  });
});
