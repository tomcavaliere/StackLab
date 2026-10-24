// Vocabulaires contrôlés du contenu : la clé (slug ASCII) s'écrit dans les fichiers Markdown,
// la valeur est le libellé affiché. Ajouter une valeur ici est une modification de code assumée.

export const KINDS = {
  parti: 'Parti',
  personnalite: 'Personnalité',
  courant: 'Courant d’idées',
  notion: 'Notion',
  institution: 'Institution',
  evenement: 'Événement',
} as const;

// Une phrase par type, affichée en tête de chaque groupe de la liste des fiches.
export const KIND_DESCRIPTIONS: Record<keyof typeof KINDS, string> = {
  parti: 'Les partis politiques : leur histoire, leurs idées, leur programme, leurs figures et leur électorat.',
  personnalite: 'Les figures qui dirigent, incarnent ou ont marqué un parti : leur parcours, leurs positions, leur rôle aujourd’hui.',
  courant: 'Les grandes familles d’idées (socialisme, libéralisme, gaullisme, écologie politique…) dont les partis se réclament.',
  notion: 'Les notions à maîtriser pour suivre le débat politique : clivages, principes, mécanismes.',
  institution: 'Les institutions de la Ve République et de l’Union européenne : qui décide quoi, et comment.',
  evenement: 'Les dates et les élections qui ont recomposé la vie politique française.',
};

// Familles politiques, de gauche à droite : regroupent les partis sur l'accueil et leur donnent une couleur.
// Libellés : la nomenclature usuelle (ministère de l'Intérieur, science politique) ; une fiche dit quand un parti la conteste.
export const FAMILIES = {
  'gauche-radicale': 'Gauche radicale',
  ecologie: 'Écologistes',
  gauche: 'Gauche',
  centre: 'Centre',
  droite: 'Droite',
  'extreme-droite': 'Extrême droite',
} as const;

// Types de parcours : le tronc commun ouvre les partis ; une comparaison s'ouvre quand les partis qu'elle compare sont faits.
export const PARCOURS_KINDS = {
  tronc: 'Tronc commun',
  parti: 'Partis',
  comparaison: 'Comparaisons',
} as const;

export const SOURCE_TYPES = {
  programme: 'Programme',
  'site-officiel': 'Site officiel',
  institution: 'Institution',
  presse: 'Presse',
  ouvrage: 'Ouvrage',
  autre: 'Autre',
} as const;

export type Kind = keyof typeof KINDS;
export type Family = keyof typeof FAMILIES;

/** Clés d'un vocabulaire, au format attendu par z.enum(). */
export const ids = <T extends Record<string, string>>(vocab: T) =>
  Object.keys(vocab) as [keyof T & string, ...(keyof T & string)[]];

export const DIFFICULTIES = {
  1: 'Notion de base',
  2: 'Demande un peu de recul',
  3: 'Pour approfondir',
} as const;
