-- Progression et historique de jeu uniquement : le contenu (techs, scénarios, entreprises) vit dans src/content.
-- tech_id et scenario_id référencent des ids de contenu : pas de clé étrangère possible, c'est assumé.
-- Appliqué par src/lib/db.ts à la création de la base. Pas de migration : en cas de changement, supprimer data/stacklab.db.

CREATE TABLE attempts (
  id          INTEGER PRIMARY KEY,
  scenario_id TEXT    NOT NULL,
  played_at   TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  score       INTEGER NOT NULL CHECK (score BETWEEN 0 AND 100)
);

CREATE TABLE attempt_cards (
  attempt_id INTEGER NOT NULL REFERENCES attempts (id) ON DELETE CASCADE,
  tech_id    TEXT    NOT NULL,
  layer      TEXT    NOT NULL,
  verdict    TEXT    NOT NULL CHECK (verdict IN ('ideal', 'acceptable', 'surdimensionne', 'inadapte', 'non-evalue')),
  PRIMARY KEY (attempt_id, tech_id, layer)
);

CREATE TABLE tech_views (
  tech_id   TEXT NOT NULL,
  viewed_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
