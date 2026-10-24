---
name: dbt
kind: framework
layers: [traitement-data]
languages: [sql, python]
tags: [elt, entrepot, open-source]
difficulty: 1
summary: "Outil de transformation dans l'entrepôt : des requêtes SELECT versionnées, testées et documentées, que dbt exécute dans le bon ordre."
integratesWith:
  - tech: airflow
    note: "Airflow peut lancer les exécutions de dbt dans un pipeline plus large."
  - tech: duckdb
    note: "Adaptateur dbt-duckdb pour une plateforme data légère et locale."
  - tech: bigquery
    note: "Adaptateur officiel."
---

## Problème résolu

Dans un entrepôt, les transformations finissent souvent en scripts SQL éparpillés, lancés dans un ordre connu de quelques personnes, sans tests ni documentation. dbt (2016, dbt Labs) structure ce travail : chaque modèle est un fichier contenant une requête `SELECT`, et `ref('autre_modele')` déclare les dépendances. dbt en déduit le graphe, crée tables et vues dans le bon ordre, et compile un SQL enrichi de modèles Jinja.

Des tests (unicité, non-nullité, relations) et une documentation générée accompagnent les modèles. C'est le « T » de l'approche ELT : les données sont d'abord chargées brutes dans l'entrepôt, puis transformées sur place. dbt Core est open-source, et dbt Labs commercialise une offre hébergée.

## Quand l'utiliser

- Transformations analytiques dans un entrepôt (Snowflake, BigQuery, PostgreSQL, DuckDB…).
- Équipe data qui maîtrise le SQL et veut les pratiques du génie logiciel : versionnement, revue de code, tests, CI.

## Quand l'éviter

- Transformations que le SQL exprime mal ou sur des données hors entrepôt : Spark ou du code Python sont plus adaptés.
- Ingestion des données depuis les sources : dbt ne transforme que ce qui est déjà chargé.
- Une ou deux requêtes : la structure du projet dbt est alors un surcoût.

## Pour aller plus loin

- [Documentation officielle](https://docs.getdbt.com/docs/introduction)
- [Bonnes pratiques de structure de projet](https://docs.getdbt.com/best-practices/how-we-structure/1-guide-overview)
