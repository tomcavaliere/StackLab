---
name: SQL
kind: langage
layers: []
tags: [declaratif, standard, relationnel]
difficulty: 1
summary: "Langage déclaratif pour interroger et modifier des données tabulaires : on décrit le résultat voulu, le moteur choisit comment l'obtenir."
---

## Problème résolu

Sans langage de requête, lire des données impose d'écrire à la main le parcours des fichiers ou des structures. SQL sépare le *quoi* (la requête) du *comment* (le plan d'exécution, choisi par l'optimiseur du moteur). Une même requête reste valable quand les volumes ou les index changent.

C'est aussi un langage commun. Son noyau est normalisé (ISO/IEC 9075), donc ce qu'on apprend sur une base se transpose largement aux autres, aux entrepôts analytiques et aux moteurs distribués (Spark SQL, par exemple).

## Quand l'utiliser

- Lire, filtrer, joindre et agréger des données relationnelles, en transactionnel comme en analytique.
- Transformer des données dans un entrepôt : c'est le langage de base de dbt.
- Dès que plusieurs profils (dev, data, analystes) doivent lire les mêmes données : c'est leur dénominateur commun.

## Quand l'éviter

- Logique métier procédurale complexe (règles en cascade, appels externes) : elle est plus lisible et plus testable dans le code applicatif.
- Parcours de graphes profonds : c'est possible (`WITH RECURSIVE`), mais vite illisible ; une base orientée graphe peut être plus adaptée.
- Attention aux dialectes : chaque moteur ajoute ses extensions (types, fonctions, syntaxe). Le SQL réellement portable d'un moteur à l'autre est plus restreint qu'on ne le croit.

## Syntaxe

SQL est né chez IBM dans les années 1970, d'après le modèle relationnel d'Edgar F. Codd. Les exemples ci-dessous sont en SQL standard. Ils marchent tels quels sur SQLite et PostgreSQL, sauf mention contraire. Les instructions se rangent en familles :
- le **DDL** (définition des données : `CREATE`, `ALTER`, `DROP`) ;
- le **DML** (manipulation : `SELECT`, `INSERT`, `UPDATE`, `DELETE`) ;
- le **DCL** (droits : `GRANT`, `REVOKE`).

### Lire : SELECT, WHERE, ORDER BY, LIMIT

```sql
SELECT nom, ville                -- les colonnes voulues (* = toutes)
FROM clients
WHERE ville = 'Lyon' AND age >= 18
ORDER BY nom ASC                 -- DESC pour l'ordre inverse
LIMIT 10;                        -- les 10 premières lignes
```

- Filtres courants : `=`, `<>` (différent), `<`, `>=`, `BETWEEN 1 AND 5`, `IN ('Lyon', 'Paris')`, `LIKE 'Dup%'` (`%` = n'importe quelle suite de caractères).
- `SELECT DISTINCT ville FROM clients` supprime les lignes en double du résultat.
- `AS` renomme une colonne ou une table dans la requête : `SELECT prix * quantite AS total`.

### Valeurs conditionnelles : CASE

`CASE` renvoie une valeur différente selon une condition, comme un `if` à l'intérieur d'une requête :

```sql
SELECT nom,
       CASE WHEN age < 18 THEN 'mineur'
            WHEN age < 65 THEN 'adulte'
            ELSE 'senior'
       END AS tranche
FROM clients;
```

### NULL : l'absence de valeur

`NULL` veut dire « inconnu ». Toute comparaison avec `NULL` donne `NULL`, jamais vrai : `colonne = NULL` ne trouve rien. Il faut écrire `IS NULL` ou `IS NOT NULL`.

```sql
SELECT nom FROM clients WHERE telephone IS NULL;
SELECT nom, COALESCE(telephone, email, 'aucun contact') AS contact FROM clients;
```

`COALESCE(a, b, c)` renvoie la première valeur non NULL parmi `a`, `b` et `c`.

### Agréger : COUNT, SUM, GROUP BY, HAVING

```sql
SELECT ville, COUNT(*) AS nb_clients, AVG(age) AS age_moyen
FROM clients
WHERE age >= 18                  -- filtre les LIGNES, avant le regroupement
GROUP BY ville
HAVING COUNT(*) > 100            -- filtre les GROUPES, après le regroupement
ORDER BY nb_clients DESC;
```

- Agrégats : `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`. `COUNT(*)` compte les lignes, `COUNT(colonne)` ignore celles où la colonne vaut `NULL`.
- Avec `GROUP BY`, chaque colonne du `SELECT` doit être groupée ou agrégée. `SELECT ville, nom, COUNT(*) … GROUP BY ville` est refusé par la norme : un groupe contient plusieurs `nom`, la valeur à afficher serait ambiguë. (SQLite l'accepte et prend le `nom` d'une ligne quelconque du groupe ; PostgreSQL refuse.)
- **Ordre logique d'évaluation**, différent de l'ordre d'écriture : `FROM` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `ORDER BY`. C'est pourquoi `WHERE` ne voit pas les alias du `SELECT`, alors que `ORDER BY` les voit.

### Jointures

Une jointure combine les lignes de plusieurs tables selon une condition, en général une clé étrangère :

```sql
-- INNER JOIN : seulement les clients qui ont au moins une commande
SELECT c.nom, co.montant
FROM clients c
JOIN commandes co ON co.client_id = c.id;

-- LEFT JOIN : TOUS les clients ; colonnes de commandes à NULL quand il n'y en a pas
SELECT c.nom, co.montant
FROM clients c
LEFT JOIN commandes co ON co.client_id = c.id;

-- clients sans aucune commande
SELECT c.nom FROM clients c LEFT JOIN commandes co ON co.client_id = c.id WHERE co.id IS NULL;
```

Il existe aussi `RIGHT JOIN` (l'inverse du LEFT), `FULL OUTER JOIN` (tout des deux côtés) et `CROSS JOIN` (toutes les combinaisons).

### Combiner des résultats : UNION

```sql
SELECT email FROM clients
UNION                 -- supprime les doublons
SELECT email FROM prospects;
```

`UNION ALL` garde les doublons, et c'est plus rapide puisqu'il n'y a pas de dédoublonnage à faire.

### Sous-requêtes et CTE (WITH)

```sql
-- sous-requête : les commandes au-dessus de la moyenne
SELECT * FROM commandes WHERE montant > (SELECT AVG(montant) FROM commandes);

-- CTE : nommer une sous-requête pour la relire et la réutiliser
WITH ca_par_client AS (
  SELECT client_id, SUM(montant) AS ca FROM commandes GROUP BY client_id
)
SELECT c.nom, ca.ca FROM ca_par_client ca JOIN clients c ON c.id = ca.client_id;

-- CTE récursive : parcourir une hiérarchie (manager → équipe → sous-équipe…)
WITH RECURSIVE equipe(id, nom) AS (
  SELECT id, nom FROM employes WHERE id = 1
  UNION ALL
  SELECT e.id, e.nom FROM employes e JOIN equipe ON e.manager_id = equipe.id
)
SELECT nom FROM equipe;
```

`WITH RECURSIVE` permet de parcourir un graphe, mais au-delà de quelques niveaux la requête devient vite illisible.

### Fonctions de fenêtre : OVER (...)

Une fonction de fenêtre calcule sur un ensemble de lignes liées, **sans les fusionner** comme le ferait `GROUP BY` : chaque ligne reste dans le résultat.

```sql
SELECT client_id, date_commande, montant,
       ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY date_commande) AS rang,   -- numéro dans chaque groupe
       SUM(montant) OVER (PARTITION BY client_id) AS total_client
FROM commandes;
```

`PARTITION BY` découpe les groupes et `ORDER BY` ordonne les lignes à l'intérieur. On trouve aussi `RANK()`, `LAG()` (la ligne précédente) et `LEAD()` (la suivante).

### Modifier : INSERT, UPDATE, DELETE

```sql
INSERT INTO clients (nom, ville) VALUES ('Dupont', 'Lyon'), ('Martin', 'Paris');
UPDATE clients SET ville = 'Lyon' WHERE id = 42;   -- sans WHERE : TOUTES les lignes
DELETE FROM commandes WHERE statut = 'annulee';    -- sans WHERE : toutes les lignes supprimées, la table reste
```

`DROP TABLE commandes` supprime la table elle-même, avec sa structure.

### Définir les tables : CREATE TABLE, contraintes

```sql
CREATE TABLE clients (
  id      INTEGER PRIMARY KEY,           -- identifie chaque ligne, unique et non NULL
  email   TEXT NOT NULL UNIQUE,
  ville   TEXT DEFAULT 'inconnue',
  age     INTEGER CHECK (age >= 0)
);
CREATE TABLE commandes (
  id         INTEGER PRIMARY KEY,
  client_id  INTEGER NOT NULL REFERENCES clients(id),   -- clé étrangère
  montant    NUMERIC NOT NULL
);
ALTER TABLE clients ADD COLUMN telephone TEXT;
```

Une **clé étrangère** garantit que la valeur référence une ligne existante de l'autre table : impossible de créer une commande pour un client qui n'existe pas. (Dans SQLite, il faut l'activer avec `PRAGMA foreign_keys = ON`.)

### Index

```sql
CREATE INDEX idx_commandes_client ON commandes (client_id);
```

Un index permet de trouver des lignes sans lire toute la table, comme l'index d'un livre. En contrepartie, chaque écriture coûte plus cher, puisqu'il faut aussi tenir l'index à jour. On indexe donc les colonnes souvent filtrées ou jointes, pas toutes. `EXPLAIN` montre le plan choisi par l'optimiseur : index utilisé ou lecture complète.

### Transactions

```sql
BEGIN;
UPDATE comptes SET solde = solde - 100 WHERE id = 1;
UPDATE comptes SET solde = solde + 100 WHERE id = 2;
COMMIT;      -- tout est validé d'un coup ; ROLLBACK annule tout
```

### Droits : GRANT, REVOKE

```sql
GRANT SELECT, INSERT ON commandes TO analyste;   -- donne des droits
REVOKE INSERT ON commandes FROM analyste;        -- les retire
```

Les droits existent dans les moteurs client-serveur comme PostgreSQL ou MySQL. SQLite, qui est un simple fichier, n'en a pas.

### Injection SQL et requêtes paramétrées

Ne jamais coller une saisie utilisateur dans le texte d'une requête. Avec `"… WHERE nom = '" + saisie + "'"`, la saisie `' OR '1'='1` renvoie toute la table. Les **requêtes paramétrées** envoient les valeurs à part du texte, donc elles ne sont jamais interprétées comme du SQL :

```python
cur.execute("SELECT * FROM clients WHERE nom = ?", (saisie,))   # Python, sqlite3
```

## Exemples concrets

**Top 5 des clients par chiffre d'affaires sur l'année** : jointure, agrégat, filtre de groupe, tri.

```sql
SELECT c.nom, SUM(co.montant) AS ca, COUNT(*) AS nb_commandes
FROM commandes co
JOIN clients c ON c.id = co.client_id
WHERE co.date_commande >= '2026-01-01'
GROUP BY c.id, c.nom
HAVING COUNT(*) >= 2
ORDER BY ca DESC
LIMIT 5;
```

**La dernière commande de chaque client** : fonction de fenêtre et CTE.

```sql
WITH classees AS (
  SELECT co.*, ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY date_commande DESC) AS rang
  FROM commandes co
)
SELECT client_id, date_commande, montant FROM classees WHERE rang = 1;
```

**Évolution mensuelle du chiffre d'affaires** : regroupement par mois (fonction `strftime` de SQLite ; `date_trunc('month', …)` en PostgreSQL) et écart avec le mois précédent grâce à `LAG`.

```sql
WITH mensuel AS (
  SELECT strftime('%Y-%m', date_commande) AS mois, SUM(montant) AS ca
  FROM commandes GROUP BY mois
)
SELECT mois, ca, ca - LAG(ca) OVER (ORDER BY mois) AS ecart
FROM mensuel ORDER BY mois;
```

## Pour aller plus loin

- [Tutoriel SQL de la documentation PostgreSQL](https://www.postgresql.org/docs/current/tutorial-sql.html)
- [Use The Index, Luke](https://use-the-index-luke.com/) : comment les index déterminent la performance des requêtes.
