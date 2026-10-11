-- Progression et historique de jeu uniquement : le contenu (techs, scénarios, quiz, entreprises) vit dans src/content.
-- tech_id, scenario_id, theme_id et question_id référencent des ids de contenu : pas de clé étrangère possible, c'est assumé.
-- Appliqué par src/lib/db.ts à chaque ouverture : une nouvelle table est créée sans toucher aux autres.
-- Pas de migration : si une table existante change, supprimer data/stacklab.db.

CREATE TABLE IF NOT EXISTS attempts (
  id          INTEGER PRIMARY KEY,
  scenario_id TEXT    NOT NULL,
  played_at   TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  score       INTEGER NOT NULL CHECK (score BETWEEN 0 AND 100)
);

CREATE TABLE IF NOT EXISTS attempt_cards (
  attempt_id INTEGER NOT NULL REFERENCES attempts (id) ON DELETE CASCADE,
  tech_id    TEXT    NOT NULL,
  layer      TEXT    NOT NULL,
  verdict    TEXT    NOT NULL CHECK (verdict IN ('ideal', 'acceptable', 'surdimensionne', 'inadapte', 'non-evalue')),
  PRIMARY KEY (attempt_id, tech_id, layer)
);

CREATE TABLE IF NOT EXISTS tech_views (
  tech_id   TEXT NOT NULL,
  viewed_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

CREATE TABLE IF NOT EXISTS quiz_sessions (
  id        INTEGER PRIMARY KEY,
  theme_id  TEXT NOT NULL,
  played_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

-- Une ligne par question posée, dans l'ordre de la session (position) : le combo en dépend.
-- Bonne réponse <=> chosen_tech = correct_tech.
-- Quiz d'une techno : theme_id = 'tech:<id de la fiche>', chosen_tech et correct_tech contiennent le texte des options.
CREATE TABLE IF NOT EXISTS quiz_answers (
  session_id   INTEGER NOT NULL REFERENCES quiz_sessions (id) ON DELETE CASCADE,
  position     INTEGER NOT NULL,
  question_id  TEXT    NOT NULL,
  chosen_tech  TEXT    NOT NULL,
  correct_tech TEXT    NOT NULL,
  PRIMARY KEY (session_id, position)
);

-- Badges débloqués : calculés depuis l'historique, mais persistés pour ne jamais se reperdre et garder leur date.
CREATE TABLE IF NOT EXISTS badges (
  badge_id    TEXT PRIMARY KEY,
  unlocked_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
