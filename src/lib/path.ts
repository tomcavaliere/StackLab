// Parcours guidé : fonction pure, testée avec Vitest. Un seul chemin, chaque étape validée ouvre la suivante.
// Tout est recalculé depuis l'historique brut ; les règles sont décrites dans CLAUDE.md, section « Parcours ».
import { isCorrect, techQuizId, type History } from './rewards';

/** Seuils de validation d'une étape. */
export const PASS = { ratio: 0.7, minAnswers: 5, scenario: 60 };

/** Une unité telle que décrite dans src/content/parcours/parcours.md, avec des ids en clair. */
export interface Unit {
  id: string;
  title: string;
  intro: string;
  lessons: string[]; // ids de fiche
  themes: string[];
  scenarios: string[];
}

export type StepKind = 'lesson' | 'theme' | 'scenario';
export type Status = 'done' | 'current' | 'locked';

export interface Step {
  kind: StepKind;
  id: string;
  unit: string;
  status: Status;
  viewed: boolean; // leçon : fiche consultée (toujours true pour les autres étapes)
}

export interface PathUnit extends Omit<Unit, 'lessons' | 'themes' | 'scenarios'> {
  steps: Step[];
  done: number;
  status: Status; // done : toutes ses étapes faites ; current : contient l'étape en cours
}

export interface Path {
  units: PathUnit[];
  current: Step | null; // null : parcours terminé
}

/** Session de quiz qui valide une étape : assez de réponses, et au moins PASS.ratio de bonnes. */
export const passes = (answers: { chosenTech: string; correctTech: string }[]) =>
  answers.length >= PASS.minAnswers && answers.filter(isCorrect).length >= PASS.ratio * answers.length;

export function computePath(units: Unit[], history: History): Path {
  const viewed = new Set(history.viewedTechs);
  const passedQuizzes = new Set(history.quizSessions.filter((s) => passes(s.answers)).map((s) => s.themeId));
  const passedScenarios = new Set(history.attempts.filter((a) => a.score >= PASS.scenario).map((a) => a.scenarioId));
  const isDone = (kind: StepKind, id: string) =>
    kind === 'lesson'
      ? viewed.has(id) && passedQuizzes.has(techQuizId(id))
      : kind === 'theme'
        ? passedQuizzes.has(id)
        : passedScenarios.has(id);

  let current: Step | null = null;
  const out = units.map((u) => {
    const refs: [StepKind, string][] = [
      ...u.lessons.map((id) => ['lesson', id] as [StepKind, string]),
      ...u.themes.map((id) => ['theme', id] as [StepKind, string]),
      ...u.scenarios.map((id) => ['scenario', id] as [StepKind, string]),
    ];
    const steps = refs.map(([kind, id]): Step => {
      const step: Step = { kind, id, unit: u.id, status: 'locked', viewed: kind !== 'lesson' || viewed.has(id) };
      if (isDone(kind, id)) step.status = 'done';
      else if (!current) current = Object.assign(step, { status: 'current' as const });
      return step;
    });
    const done = steps.filter((s) => s.status === 'done').length;
    const status: Status = done === steps.length ? 'done' : steps.some((s) => s.status === 'current') ? 'current' : 'locked';
    const { lessons: _l, themes: _t, scenarios: _s, ...rest } = u;
    return { ...rest, steps, done, status };
  });
  return { units: out, current };
}

/** L'étape d'une fiche, d'un thème ou d'un scénario ; undefined si elle n'est pas dans le parcours. */
export const stepOf = (path: Path, kind: StepKind, id: string) =>
  path.units.flatMap((u) => u.steps).find((s) => s.kind === kind && s.id === id);

/** Étape ouverte : faite (on peut la rejouer) ou en cours. Le quiz d'une leçon demande en plus d'avoir lu la fiche. */
export const isOpen = (step: Step | undefined) =>
  !!step && step.status !== 'locked' && (step.kind !== 'lesson' || step.viewed);

/** Une entreprise s'ouvre quand son scénario « devine la stack » est réussi ; sans scénario, elle est ouverte. */
export const companyOpen = (path: Path, scenarioId: string | undefined) =>
  !scenarioId || stepOf(path, 'scenario', scenarioId)?.status === 'done';

/** Quiz (ids de session) des étapes faites : ce sont eux qui alimentent les révisions. */
export const doneQuizzes = (path: Path) =>
  path.units
    .flatMap((u) => u.steps)
    .filter((s) => s.status === 'done' && s.kind !== 'scenario')
    .map((s) => (s.kind === 'lesson' ? techQuizId(s.id) : s.id));
