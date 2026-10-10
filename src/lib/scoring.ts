// Score d'une partie : fonction pure, indépendante de l'UI et d'Astro (testée avec Vitest).
// Les règles sont décrites dans CLAUDE.md, section « Règles de scoring ».
import { LAYERS, type Layer, type Verdict } from './taxonomy';

export type CardVerdict = Verdict | 'non-evalue';

export const POINTS: Record<Verdict, number> = { ideal: 3, acceptable: 2, surdimensionne: 1, inadapte: 0 };
export const MISSING_LAYER_PENALTY = 20;

/** Données d'un scénario utiles au score, avec des ids de tech en clair. */
export interface ScenarioRules {
  requiredLayers: Layer[];
  optionalLayers: Layer[];
  verdicts: Partial<Record<Layer, { tech: string; verdict: Verdict; why: string }[]>>;
  antiPatterns: { techs: string[]; penalty: number; why: string }[];
}

export interface Card {
  techId: string;
  layer: Layer;
}

export interface CardResult extends Card {
  verdict: CardVerdict;
  why: string;
}

export interface ScoreResult {
  score: number;
  /** Score avant pénalités, arrondi. */
  base: number;
  cards: CardResult[];
  missingLayers: Layer[];
  antiPatterns: ScenarioRules['antiPatterns'];
}

/** Verdict d'une carte posée. techLayers : couches où chaque tech peut se poser (frontmatter `layers`). */
export function judgeCard(scenario: ScenarioRules, techLayers: Record<string, Layer[]>, { techId, layer }: Card) {
  const written = scenario.verdicts[layer]?.find((v) => v.tech === techId);
  if (written) return { verdict: written.verdict as CardVerdict, why: written.why };
  if (!techLayers[techId]?.includes(layer)) {
    return { verdict: 'inadapte' as const, why: `Cette techno ne joue pas le rôle « ${LAYERS[layer]} ».` };
  }
  if (!scenario.requiredLayers.includes(layer) && !scenario.optionalLayers.includes(layer)) {
    return { verdict: 'surdimensionne' as const, why: `Le besoin ne demande pas de couche « ${LAYERS[layer]} ».` };
  }
  return { verdict: 'non-evalue' as const, why: 'Le scénario ne donne pas de verdict pour cette techno dans cette couche.' };
}

export function scoreStack(scenario: ScenarioRules, techLayers: Record<string, Layer[]>, cards: Card[]): ScoreResult {
  const results = cards.map((card) => ({ ...card, ...judgeCard(scenario, techLayers, card) }));
  const evaluated = results.filter((c) => c.verdict !== 'non-evalue');
  const points = evaluated.reduce((sum, c) => sum + POINTS[c.verdict as Verdict], 0);
  const base = evaluated.length ? (100 * points) / (3 * evaluated.length) : 0;

  const missingLayers = scenario.requiredLayers.filter((l) => !cards.some((c) => c.layer === l));
  const present = new Set(cards.map((c) => c.techId));
  const antiPatterns = scenario.antiPatterns.filter((a) => a.techs.every((t) => present.has(t)));
  const penalty =
    MISSING_LAYER_PENALTY * missingLayers.length + antiPatterns.reduce((sum, a) => sum + a.penalty, 0);

  return {
    score: Math.round(Math.min(100, Math.max(0, base - penalty))),
    base: Math.round(base),
    cards: results,
    missingLayers,
    antiPatterns,
  };
}
