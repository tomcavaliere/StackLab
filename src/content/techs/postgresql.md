---
name: PostgreSQL
kind: base-de-donnees
layers: [base-operationnelle]
languages: [sql]
tags: [open-source, relationnel, transactionnel, offre-managee]
difficulty: 2
summary: "Base de données relationnelle open-source, transactionnelle (ACID) et très extensible : le choix par défaut pour stocker les données d'une application."
alternatives:
  - tech: mongodb
    note: "Modèle document à schéma souple, sharding intégré ; moins naturel dès que les données sont très reliées entre elles."
---

## Problème résolu

Une application doit stocker ses données de façon fiable : pas d'écriture à moitié faite en cas de panne, pas de lecture incohérente quand plusieurs utilisateurs écrivent en même temps. PostgreSQL garantit des transactions ACID et gère les accès concurrents par MVCC (les lectures ne bloquent pas les écritures). Son schéma (tables, types, contraintes, clés étrangères) protège la cohérence des données au niveau de la base, pas seulement dans le code.

Au-delà du relationnel, il couvre des besoins voisins sans ajouter de brique : colonnes `JSONB` pour des données semi-structurées, recherche plein texte, et un système d'extensions (PostGIS pour le géospatial, pgvector pour les vecteurs d'embeddings…).

## Quand l'utiliser

- Base principale d'une application web, d'une API ou d'un SaaS : c'est le choix par défaut raisonnable tant qu'aucune contrainte précise ne pousse ailleurs.
- Données reliées entre elles (utilisateurs, commandes, factures…), avec des jointures et des règles d'intégrité.
- Petite équipe : une base polyvalente évite d'opérer plusieurs systèmes. Les grands clouds proposent des offres managées (par exemple AWS RDS, Google Cloud SQL, Azure Database for PostgreSQL).

## Quand l'éviter

- Requêtes analytiques sur de gros historiques : un moteur orienté colonnes (entrepôt de données, lakehouse) est conçu pour ça, alors que PostgreSQL stocke par lignes et vise le transactionnel. Aucun seuil chiffré fiable n'est donné ici : il dépend du matériel, du schéma et des requêtes.
- Écritures massives à répartir sur de nombreux nœuds : la réplication native fournit des répliques en lecture, pas de répartition automatique des écritures. Il faut alors une extension comme Citus ou un sharding applicatif.
- Cache ou file de messages : c'est faisable, mais des outils dédiés (Redis, Kafka) font ce travail plus simplement.

## Pour aller plus loin

- [Documentation officielle](https://www.postgresql.org/docs/current/)
- [Contrôle de concurrence (MVCC)](https://www.postgresql.org/docs/current/mvcc.html)
