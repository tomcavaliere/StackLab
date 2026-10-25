-- Progression uniquement : le contenu (fiches, quiz, parcours) vit dans src/content.
-- Tables préfixées par politique_ : la base Turso est partagée avec StackData, dont les tables ont les mêmes noms.
-- fiche_id, theme_id et question_id référencent des ids de contenu : pas de clé étrangère possible, c'est assumé.
-- Appliqué par src/lib/db.ts à chaque ouverture : une nouvelle table est créée sans toucher aux autres.
-- Pas de migration : si une table existante change, supprimer data/stackpolitique.db.

CREATE TABLE IF NOT EXISTS politique_fiche_views (
  fiche_id  TEXT NOT NULL,
  viewed_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

CREATE TABLE IF NOT EXISTS politique_quiz_sessions (
  id        INTEGER PRIMARY KEY,
  theme_id  TEXT NOT NULL,
  played_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

-- Une ligne par question posée, dans l'ordre de la session (position) : le combo en dépend.
-- Bonne réponse <=> chosen = correct. Thème : ids de fiche. Quiz d'une fiche : theme_id = 'fiche:<id de la fiche>',
-- chosen et correct contiennent le texte des options.
CREATE TABLE IF NOT EXISTS politique_quiz_answers (
  session_id  INTEGER NOT NULL REFERENCES politique_quiz_sessions (id) ON DELETE CASCADE,
  position    INTEGER NOT NULL,
  question_id TEXT    NOT NULL,
  chosen      TEXT    NOT NULL,
  correct     TEXT    NOT NULL,
  PRIMARY KEY (session_id, position)
);

-- Badges débloqués : calculés depuis l'historique, mais persistés pour ne jamais se reperdre et garder leur date.
CREATE TABLE IF NOT EXISTS politique_badges (
  badge_id    TEXT PRIMARY KEY,
  unlocked_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

-- Réglages de l'utilisateur, en clé-valeur. parcours : id du parcours suivi (src/content/parcours/parcours.md).
CREATE TABLE IF NOT EXISTS politique_settings (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
