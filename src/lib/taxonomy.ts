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

// Une phrase par type, affichée en tête de chaque groupe de la liste des fiches.
export const KIND_DESCRIPTIONS: Record<keyof typeof KINDS, string> = {
  langage: 'Les langages dans lesquels on écrit le code. Ce ne sont pas des cartes du jeu : ils servent de base aux frameworks.',
  framework: 'Des boîtes à outils qui structurent une application ou une bibliothèque : on code avec eux plutôt que de repartir de zéro.',
  'base-de-donnees': 'Là où la donnée est stockée durablement, puis interrogée.',
  'cache-queue': 'Données rapides et éphémères (cache) ou messages échangés entre services (files d’attente).',
  'moteur-traitement': 'Calculent sur de gros volumes de données, souvent en parallèle sur plusieurs machines.',
  orchestrateur: 'Pilotent l’exécution d’autres tâches ou conteneurs : ordre, reprises, planification.',
  plateforme: 'Environnements complets qui hébergent ou exécutent du code et des services.',
  'service-cloud': 'Services managés loués à un fournisseur : on les consomme sans en gérer les serveurs.',
  'outil-infra': 'Outils de l’infrastructure : conteneurs, déploiement, supervision.',
  concept: 'Des idées, protocoles et patterns à comprendre : ce ne sont pas des produits à installer.',
};

// Familles de métiers : regroupent les bulles de la page « Par métier » et leur donnent une couleur.
export const ROLE_FAMILIES = {
  dev: 'Développement',
  data: 'Données',
  ia: 'IA & machine learning',
  infra: 'Infra & exploitation',
} as const;

// Types de parcours : le tronc commun ouvre les métiers et les compétences (src/content/parcours/parcours.md).
export const PARCOURS_KINDS = {
  tronc: 'Tronc commun',
  metier: 'Métiers',
  competence: 'Compétences',
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
  ml: 'ML / IA',
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
  'ia-generative': 'IA générative',
  ml: 'Machine learning',
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
