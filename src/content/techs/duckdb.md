---
name: DuckDB
kind: base-de-donnees
layers: [stockage-analytique, traitement-data]
languages: [sql, python]
tags: [open-source, colonnaire, embarque]
difficulty: 1
summary: "Base analytique embarquée, sans serveur : du SQL colonnaire rapide sur des fichiers CSV ou Parquet, directement dans un script Python ou en ligne de commande."
alternatives:
  - tech: spark
    note: "Dès que les données ou les calculs ne tiennent plus sur une seule machine."
  - tech: snowflake
    note: "Entrepôt partagé par plusieurs équipes, avec gestion des accès et calcul à la demande."
---

## Problème résolu

Analyser quelques gigaoctets de données ne devrait pas exiger un cluster ni un entrepôt payant. DuckDB (né au CWI d'Amsterdam, version 1.0 en 2024) est une base analytique qui s'exécute dans le processus qui l'appelle, comme SQLite mais pour l'analytique : pas de serveur à installer, une bibliothèque Python, un binaire en ligne de commande.

Son moteur est colonnaire et vectorisé, et il lit directement des fichiers CSV, JSON et Parquet, en local comme sur S3. Il s'intègre à pandas et à Polars sans copie inutile. Il existe un adaptateur dbt pour DuckDB.

## Quand l'utiliser

- Analyse ou transformation de volumes qui tiennent sur une machine : une étape de pipeline, un notebook, un rapport.
- Petite plateforme data à faible coût, avec des fichiers Parquet comme stockage.
- Prototypage de requêtes analytiques avant de les porter sur un entrepôt.

## Quand l'éviter

- Données ou calculs qui dépassent une machine : Spark, ou un entrepôt cloud.
- Plusieurs utilisateurs ou applications qui écrivent en même temps dans la même base : un seul processus peut écrire dans un fichier DuckDB.
- Base transactionnelle d'une application : ce n'est pas son rôle.

## Pour aller plus loin

- [Documentation officielle](https://duckdb.org/docs/stable/)
- [Pourquoi DuckDB](https://duckdb.org/why_duckdb)
