// Vocabulaires contrôlés du contenu : la clé (slug ASCII) s'écrit dans les fichiers Markdown,
// la valeur est le libellé affiché. Ajouter une valeur ici est une modification de code assumée :
// ces listes structurent le jeu et le diagramme.

export const KINDS = {
  langage: 'Langage',
  framework: 'Framework',
  'base-de-donnees': 'Base de données',
  'cache-queue': 'Cache / queue',
  'moteur-traitement': 'Moteur de traitement',
  orchestrateur: 'Orchestrateur',
  plateforme: 'Plateforme',
  'service-cloud': 'Service cloud',
  'outil-infra': 'Outil infra',
  concept: 'Concept / pattern',
} as const;

export const LAYERS = {
  frontend: 'Frontend',
  mobile: 'Mobile',
  'backend-api': 'Backend / API',
  auth: 'Auth',
  'base-operationnelle': 'Base opérationnelle',
  'cache-messaging': 'Cache / messaging',
  'stockage-analytique': 'Stockage analytique',
  'traitement-data': 'Traitement data',
  orchestration: 'Orchestration',
  ml: 'ML',
  'conteneurs-infra': 'Conteneurs / infra',
  cloud: 'Cloud',
  'ci-cd': 'CI/CD',
  observabilite: 'Observabilité',
} as const;

export const SCENARIO_TYPES = {
  mvp: 'MVP',
  saas: 'SaaS',
  api: 'API',
  'app-web': 'App web',
  'app-mobile': 'App mobile',
  logiciel: 'Logiciel',
  'plateforme-data': 'Plateforme data',
  ml: 'ML',
} as const;

// Verdicts écrits dans les scénarios. Le scoring y ajoute « non-evalue » (carte sans verdict écrit).
export const VERDICTS = {
  ideal: 'Idéal',
  acceptable: 'Acceptable',
  surdimensionne: 'Surdimensionné',
  inadapte: 'Inadapté',
} as const;

export const SOURCE_TYPES = {
  'blog-engineering': 'Blog engineering',
  talk: 'Talk / conférence',
  'offre-emploi': "Offre d'emploi",
  'doc-officielle': 'Doc officielle',
  autre: 'Autre',
} as const;

export const CONFIDENCES = {
  confirme: 'Confirmé',
  probable: 'Probable',
  indice: 'Indice',
} as const;

export type Kind = keyof typeof KINDS;
export type Layer = keyof typeof LAYERS;
export type Verdict = keyof typeof VERDICTS;

/** Clés d'un vocabulaire, au format attendu par z.enum(). */
export const ids = <T extends Record<string, string>>(vocab: T) =>
  Object.keys(vocab) as [keyof T & string, ...(keyof T & string)[]];

export const DIFFICULTIES = {
  1: 'Prise en main rapide',
  2: 'Demande de la pratique',
  3: 'Expertise ou exploitation lourde',
} as const;
