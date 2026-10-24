---
name: Index de base de données
kind: concept
layers: []
languages: [sql]
tags: [relationnel, standard]
difficulty: 2
summary: "Structure annexe qui permet à la base de retrouver des lignes sans lire toute la table : accélère les lectures, au prix d'écritures plus lentes et de place disque."
integratesWith:
  - tech: postgresql
    note: "Index B-tree par défaut, plus des types spécialisés (GIN pour le JSON et la recherche plein texte, index partiels, index sur expression)."
  - tech: mysql
    note: "Avec InnoDB, la table est rangée selon sa clé primaire ; les index secondaires y renvoient."
---

## Problème résolu

Sans index, chercher les commandes du client 42 oblige la base à **lire toute la table** (un *full scan*) et à tester chaque ligne. C'est indolore sur mille lignes, désastreux sur des centaines de millions. Un index fonctionne comme celui d'un livre : une structure triée qui mène directement aux lignes cherchées.

### Comment ça marche

- L'index le plus courant est l'**arbre B** (*B-tree*) : un arbre équilibré, trié, où l'on descend en quelques étapes jusqu'à la valeur cherchée. Il sert pour l'égalité (`=`), les intervalles (`BETWEEN`, `<`, `>`), le tri (`ORDER BY`) et les jointures.
- La **clé primaire** est indexée automatiquement, tout comme une contrainte d'unicité. Un **index unique** empêche aussi les doublons.
- Un **index composite** porte sur plusieurs colonnes, dans un ordre précis. Un index sur `(client_id, date)` sert à `WHERE client_id = 42`, et à `WHERE client_id = 42 AND date > …`, mais pas à `WHERE date > …` seul : il faut partir de la **première colonne** (le préfixe gauche).
- Un **index couvrant** contient toutes les colonnes dont la requête a besoin : la base répond sans lire la table.
- D'autres types existent selon les moteurs : index hash (égalité seulement), index pour le plein texte et le JSON (GIN dans PostgreSQL), index géospatiaux.

```sql
CREATE INDEX idx_commandes_client_date ON commandes (client_id, date);
CREATE UNIQUE INDEX idx_clients_email ON clients (email);

EXPLAIN ANALYZE                      -- PostgreSQL : plan d'exécution réel
SELECT * FROM commandes WHERE client_id = 42 ORDER BY date DESC;
```

### Lire le plan d'exécution

`EXPLAIN` montre comment la base compte exécuter la requête : parcours séquentiel de la table (*Seq Scan*) ou utilisation d'un index (*Index Scan*), ordre des jointures, estimation du nombre de lignes. `EXPLAIN ANALYZE` (PostgreSQL) l'exécute vraiment et donne les temps mesurés. C'est l'outil de base pour comprendre une requête lente, plutôt que d'ajouter des index au hasard.

### Ce qui empêche l'index de servir

- **Une fonction appliquée à la colonne** : `WHERE lower(email) = 'ada@x.fr'` n'utilise pas un index sur `email`. Il faut un index sur l'expression `lower(email)`, ou stocker la valeur déjà normalisée.
- **Un `LIKE` qui commence par un joker** : `LIKE 'dup%'` peut utiliser un B-tree, `LIKE '%dup'` non.
- **Une colonne peu sélective** : sur une colonne booléenne, chaque valeur correspond à la moitié des lignes ; lire la table est souvent plus rapide. La base peut alors ignorer l'index, à raison.

## Quand l'utiliser

- Colonnes souvent filtrées (`WHERE`), jointes (`JOIN`) ou triées (`ORDER BY`) sur des tables volumineuses.
- Clés étrangères utilisées dans les jointures : elles ne sont pas toujours indexées automatiquement (PostgreSQL ne le fait pas).
- Contraintes d'unicité métier : une adresse e-mail par client.
- Après avoir lu le plan d'une requête lente et vu un parcours complet là où peu de lignes sont attendues.

## Quand l'éviter

- **Trop d'index** : chaque `INSERT`, `UPDATE` ou `DELETE` doit aussi mettre à jour chaque index. Sur une table très écrite (journaux, événements), chaque index ralentit les écritures et prend de la place.
- **Petites tables** : la lire en entier est déjà instantané.
- **Index jamais utilisés** : ils coûtent à chaque écriture sans rien apporter. Les bases exposent des statistiques d'usage pour les repérer.
- Requêtes analytiques sur toute une table (sommes sur des années d'historique) : un index n'aide pas à tout lire ; c'est le terrain des moteurs colonnaires.

## Pour aller plus loin

- [Documentation de PostgreSQL : les index](https://www.postgresql.org/docs/current/indexes.html)
- [Documentation de PostgreSQL : EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html)
- [Use The Index, Luke : guide de l'indexation SQL, en français](https://use-the-index-luke.com/fr)
