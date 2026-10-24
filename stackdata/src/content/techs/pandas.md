---
name: pandas
kind: framework
layers: [traitement-data]
languages: [python]
tags: [open-source, tabulaire, data]
difficulty: 1
summary: "Bibliothèque Python de manipulation de données tabulaires en mémoire : le DataFrame pour charger, explorer, nettoyer et transformer des données sur une machine."
alternatives:
  - tech: duckdb
    note: "Pour écrire les transformations en SQL et traiter des fichiers plus gros que la mémoire, toujours sur une machine."
  - tech: spark
    note: "Quand les données ou les calculs ne tiennent plus sur une seule machine."
integratesWith:
  - tech: scikit-learn
    note: "Les DataFrames préparés avec pandas alimentent directement les modèles scikit-learn."
---

## Problème résolu

Un fichier CSV, un export Excel ou le résultat d'une requête SQL doivent souvent être explorés, nettoyés et remodelés avant toute analyse : valeurs manquantes, types à corriger, colonnes à calculer, regroupements, jointures entre tables. pandas (créé par Wes McKinney à partir de 2008) apporte à Python le `DataFrame` : un tableau à colonnes typées, avec des opérations de filtre, de regroupement (`groupby`), de jointure (`merge`) et de pivot.

Les données sont chargées en mémoire et les calculs s'exécutent sur une seule machine, ce qui rend pandas immédiat à utiliser dans un notebook ou un script. Il lit et écrit de nombreux formats (CSV, Excel, Parquet, JSON, tables SQL).

## Quand l'utiliser

- Exploration et nettoyage de données dans un notebook ou un script Python.
- Préparation des données avant un modèle de machine learning (scikit-learn, XGBoost).
- Petits traitements ponctuels ou automatisés sur des volumes qui tiennent confortablement en mémoire.

## Quand l'éviter

- Données plus grosses que la mémoire de la machine : pandas les charge entièrement. DuckDB (sur une machine) ou Spark (sur un cluster) prennent le relais.
- Traitements répétés sur de gros volumes, où la vitesse compte : pandas exécute surtout sur un seul cœur et chaque opération s'exécute immédiatement, sans optimiseur de requêtes. Polars, une bibliothèque de DataFrames plus récente, multi-cœur et capable d'exécution paresseuse (le plan est optimisé avant d'être lancé), est une alternative à considérer.
- Transformations dans un entrepôt de données : autant les écrire en SQL là où sont les données (dbt).

## Pour aller plus loin

- [Documentation officielle](https://pandas.pydata.org/docs/)
- [Guide utilisateur](https://pandas.pydata.org/docs/user_guide/index.html)
