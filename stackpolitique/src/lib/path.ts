// Parcours : fonction pure, testée avec Vitest. Plusieurs parcours (tronc commun, partis, comparaisons), chacun un chemin
// où chaque étape validée ouvre la suivante ; un parcours s'ouvre quand ses parcours requis sont terminés.
// Tout est recalculé depuis l'historique brut ; les règles sont décrites dans CLAUDE.md, section « Parcours ».
import { ficheQuizId, isCorrect, type History } from './rewards';

/** Seuils de validation d'une étape. */
export const PASS = { ratio: 0.7, minAnswers: 5 };

/** Une unité telle que décrite dans src/content/parcours/parcours.md, avec des ids en clair. */
export interface Unit {
  id: string;
  title: string;
  intro: string;
  lessons: string[]; // ids de fiche
  themes: string[];
}

export type ParcoursKind = 'tronc' | 'parti' | 'comparaison';

/** Un parcours de src/content/parcours/parcours.md, avec des ids en clair. */
export interface Parcours {
  id: string;
  kind: ParcoursKind;
  title: string;
  intro: string;
  party?: string; // parcours d'un parti : id de la fiche du parti
  requires: string[]; // parcours à terminer avant d'ouvrir celui-ci
  units: Unit[];
}

export type StepKind = 'lesson' | 'theme';
export type Status = 'done' | 'current' | 'locked';

export interface Step {
  kind: StepKind;
  id: string;
  parcours: string;
  unit: string;
  status: Status;
  viewed: boolean; // leçon : fiche consultée (toujours true pour les autres étapes)
}

export interface PathUnit extends Omit<Unit, 'lessons' | 'themes'> {
  steps: Step[];
  done: number;
  status: Status; // done : toutes ses étapes faites ; current : contient l'étape en cours
}

export interface PathParcours extends Omit<Parcours, 'units'> {
  units: PathUnit[];
  unlocked: boolean; // tous ses parcours requis (directement ou non) sont terminés
  waitingFor: string[]; // parcours requis pas encore terminés, les plus proches seulement (pas ceux qu'ils requièrent eux-mêmes)
  current: Step | null; // null : terminé, ou pas encore ouvert
  done: number;
  total: number;
  status: Status;
}

export interface Path {
  parcours: PathParcours[];
  followed: string | null; // parcours suivi, tel qu'enregistré
  next: Step | null; // prochaine étape du parcours suivi (ou de ce qu'il attend) ; null : rien à proposer
}

/** Session de quiz qui valide une étape : assez de réponses, et au moins PASS.ratio de bonnes. */
export const passes = (answers: { chosen: string; correct: string }[]) =>
  answers.length >= PASS.minAnswers && answers.filter(isCorrect).length >= PASS.ratio * answers.length;

export function computePath(parcours: Parcours[], history: History, followed: string | null = null): Path {
  const viewed = new Set(history.viewedFiches);
  const passedQuizzes = new Set(history.quizSessions.filter((s) => passes(s.answers)).map((s) => s.themeId));
  const isDone = (kind: StepKind, id: string) =>
    kind === 'lesson' ? viewed.has(id) && passedQuizzes.has(ficheQuizId(id)) : passedQuizzes.has(id);

  // Une étape faite l'est partout : on calcule d'abord ce qui est fait, puis quels parcours sont ouverts.
  const built = parcours.map((p) =>
    p.units.map((u) => {
      const refs: [StepKind, string][] = [
        ...u.lessons.map((id) => ['lesson', id] as [StepKind, string]),
        ...u.themes.map((id) => ['theme', id] as [StepKind, string]),
      ];
      return refs.map(
        ([kind, id]): Step => ({
          kind,
          id,
          parcours: p.id,
          unit: u.id,
          status: isDone(kind, id) ? 'done' : 'locked',
          viewed: kind !== 'lesson' || viewed.has(id),
        }),
      );
    }),
  );
  const finished = new Map(parcours.map((p, i) => [p.id, built[i].flat().every((s) => s.status === 'done')]));
  const byId = new Map(parcours.map((p) => [p.id, p]));
  const ancestors = (p: Parcours) => {
    const out: string[] = [];
    const todo = [...p.requires];
    while (todo.length) {
      const r = todo.shift()!;
      if (out.includes(r) || !byId.has(r)) continue;
      out.push(r);
      todo.push(...byId.get(r)!.requires);
    }
    return out;
  };

  const blocking = new Map<string, string[]>(); // parcours -> tous ses parcours requis non terminés
  const out = parcours.map((p, i): PathParcours => {
    const unfinished = ancestors(p).filter((a) => !finished.get(a));
    blocking.set(p.id, unfinished);
    const waitingFor = unfinished.filter((a) => !unfinished.some((b) => b !== a && ancestors(byId.get(b)!).includes(a)));
    const unlocked = unfinished.length === 0;
    let current: Step | null = null;
    const units = p.units.map((u, k): PathUnit => {
      const steps = built[i][k];
      if (unlocked && !current) {
        const first = steps.find((s) => s.status !== 'done');
        if (first) current = Object.assign(first, { status: 'current' as const });
      }
      const done = steps.filter((s) => s.status === 'done').length;
      const status: Status = done === steps.length ? 'done' : steps.some((s) => s.status === 'current') ? 'current' : 'locked';
      const { lessons: _l, themes: _t, ...rest } = u;
      return { ...rest, steps, done, status };
    });
    const done = units.reduce((n, u) => n + u.done, 0);
    const total = units.reduce((n, u) => n + u.steps.length, 0);
    const { units: _u, ...rest } = p;
    return { ...rest, units, unlocked, waitingFor, current, done, total, status: done === total ? 'done' : unlocked ? 'current' : 'locked' };
  });

  // Prochaine étape : celle du parcours suivi (le tronc commun par défaut) ; s'il est fermé, celle du parcours qu'il attend.
  const target = out.find((p) => p.id === followed) ?? out.find((p) => p.kind === 'tronc');
  const opener = target && !target.unlocked ? out.find((p) => blocking.get(target.id)!.includes(p.id) && p.unlocked) : target;
  return { parcours: out, followed, next: opener?.current ?? null };
}

/** Toutes les étapes, parcours par parcours (une étape partagée apparaît une fois par parcours). */
export const allSteps = (path: Path) => path.parcours.flatMap((p) => p.units.flatMap((u) => u.steps));

const RANK: Record<Status, number> = { locked: 0, current: 1, done: 2 };

/** L'étape d'une fiche ou d'un thème, fusionnée sur tous les parcours qui la contiennent :
 *  faite si elle l'est, en cours si elle l'est dans au moins un parcours. undefined : dans aucun parcours. */
export const stepOf = (path: Path, kind: StepKind, id: string) =>
  allSteps(path)
    .filter((s) => s.kind === kind && s.id === id)
    .reduce<Step | undefined>((best, s) => (!best || RANK[s.status] > RANK[best.status] ? s : best), undefined);

/** Où se trouve une étape : chaque parcours et unité qui la contient, les parcours ouverts d'abord. */
export const placesOf = (path: Path, kind: StepKind, id: string) =>
  path.parcours
    .flatMap((p) => p.units.filter((u) => u.steps.some((s) => s.kind === kind && s.id === id)).map((unit) => ({ parcours: p, unit })))
    .sort((a, b) => Number(b.parcours.unlocked) - Number(a.parcours.unlocked));

/** Étape ouverte : faite (on peut la rejouer) ou en cours. Le quiz d'une leçon demande en plus d'avoir lu la fiche. */
export const isOpen = (step: Step | undefined) =>
  !!step && step.status !== 'locked' && (step.kind !== 'lesson' || step.viewed);

/** Quiz (ids de session) des étapes faites, sans doublon : ce sont eux qui alimentent les révisions. */
export const doneQuizzes = (path: Path) => [
  ...new Set(
    allSteps(path)
      .filter((s) => s.status === 'done')
      .map((s) => (s.kind === 'lesson' ? ficheQuizId(s.id) : s.id)),
  ),
];
