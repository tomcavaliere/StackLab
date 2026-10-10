import { describe, expect, it } from 'vitest';
import { scoreStack, type Card, type ScenarioRules } from './scoring';
import type { Layer } from './taxonomy';

const scenario: ScenarioRules = {
  requiredLayers: ['backend-api', 'base-operationnelle'],
  optionalLayers: ['observabilite'],
  verdicts: {
    'backend-api': [
      { tech: 'django', verdict: 'ideal', why: '' },
      { tech: 'express', verdict: 'acceptable', why: '' },
      { tech: 'spring-boot', verdict: 'surdimensionne', why: '' },
    ],
    'base-operationnelle': [
      { tech: 'postgresql', verdict: 'ideal', why: '' },
      { tech: 'mongodb', verdict: 'acceptable', why: '' },
      { tech: 'cassandra', verdict: 'surdimensionne', why: '' },
    ],
  },
  antiPatterns: [{ techs: ['kafka', 'kubernetes'], penalty: 15, why: '' }],
};

const techLayers: Record<string, Layer[]> = {
  django: ['backend-api', 'auth'],
  express: ['backend-api'],
  'spring-boot': ['backend-api'],
  postgresql: ['base-operationnelle'],
  mongodb: ['base-operationnelle'],
  cassandra: ['base-operationnelle'],
  redis: ['cache-messaging'],
  kafka: ['cache-messaging'],
  kubernetes: ['conteneurs-infra'],
  sentry: ['observabilite'],
};

const stack = (backend: string, db: string, ...extra: Card[]): Card[] => [
  { techId: backend, layer: 'backend-api' },
  { techId: db, layer: 'base-operationnelle' },
  ...extra,
];

describe('scoreStack', () => {
  it('classe une stack idéale > acceptable > surdimensionnée', () => {
    const ideal = scoreStack(scenario, techLayers, stack('django', 'postgresql'));
    const acceptable = scoreStack(scenario, techLayers, stack('express', 'mongodb'));
    const oversized = scoreStack(scenario, techLayers, stack('spring-boot', 'cassandra'));
    expect(ideal.score).toBe(100);
    expect(acceptable.score).toBe(67);
    expect(oversized.score).toBe(33);
  });

  it('pénalise de 20 points chaque couche requise vide', () => {
    const result = scoreStack(scenario, techLayers, [{ techId: 'django', layer: 'backend-api' }]);
    expect(result.missingLayers).toEqual(['base-operationnelle']);
    expect(result.base).toBe(100);
    expect(result.score).toBe(80);
  });

  it('détecte un anti-pattern quand toutes ses techs sont posées, toutes couches confondues', () => {
    const withBoth = stack(
      'django',
      'postgresql',
      { techId: 'kafka', layer: 'cache-messaging' },
      { techId: 'kubernetes', layer: 'conteneurs-infra' },
    );
    const result = scoreStack(scenario, techLayers, withBoth);
    expect(result.antiPatterns).toHaveLength(1);
    // 2 idéales (6) + 2 surdimensionnées hors besoin (2) = 8 / 12 → 66,7, puis −15
    expect(result.score).toBe(52);

    const withOne = scoreStack(scenario, techLayers, stack('django', 'postgresql', { techId: 'kafka', layer: 'cache-messaging' }));
    expect(withOne.antiPatterns).toHaveLength(0);
  });

  it('applique les règles de verdict dans l’ordre', () => {
    const { cards } = scoreStack(scenario, techLayers, [
      { techId: 'django', layer: 'backend-api' }, // 1. verdict écrit
      { techId: 'redis', layer: 'base-operationnelle' }, // 2. couche absente des layers de la tech
      { techId: 'redis', layer: 'cache-messaging' }, // 3. couche hors besoin
      { techId: 'sentry', layer: 'observabilite' }, // 4. couche optionnelle sans verdict écrit
    ]);
    expect(cards.map((c) => c.verdict)).toEqual(['ideal', 'inadapte', 'surdimensionne', 'non-evalue']);
  });

  it('exclut les cartes non évaluées du score', () => {
    const result = scoreStack(scenario, techLayers, stack('django', 'postgresql', { techId: 'sentry', layer: 'observabilite' }));
    expect(result.score).toBe(100);
  });

  it('borne le score à [0, 100]', () => {
    const result = scoreStack(scenario, techLayers, []);
    expect(result.score).toBe(0);
  });
});
