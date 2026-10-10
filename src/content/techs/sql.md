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

## Pour aller plus loin

- [Tutoriel SQL de la documentation PostgreSQL](https://www.postgresql.org/docs/current/tutorial-sql.html)
- [Use The Index, Luke](https://use-the-index-luke.com/) : comment les index déterminent la performance des requêtes.
