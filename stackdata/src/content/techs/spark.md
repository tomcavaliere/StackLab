---
name: Apache Spark
kind: moteur-traitement
layers: [traitement-data]
languages: [python, sql, java]
tags: [open-source, distribue, batch, streaming]
difficulty: 3
summary: "Moteur de calcul distribué : il découpe un traitement de données en tâches exécutées en parallèle sur un cluster, en batch comme en streaming."
alternatives:
  - tech: dbt
    note: "Si les données sont déjà dans un entrepôt SQL : les transformations y tournent sans cluster à gérer."
integratesWith:
  - tech: airflow
    note: "Airflow déclenche et enchaîne les jobs Spark."
---

## Problème résolu

Quand les données à transformer ne tiennent plus sur une machine, il faut répartir le calcul : découper les données, envoyer le travail sur plusieurs nœuds, gérer les pannes en cours de route. Spark (né à l'AMPLab de Berkeley en 2009, projet Apache depuis) le fait à partir d'un code qui ressemble à du traitement local : DataFrames en Python (PySpark), Scala ou Java, ou SQL (Spark SQL). Un optimiseur transforme ce code en plan d'exécution distribué.

Il garde autant que possible les données intermédiaires en mémoire. Le même modèle sert au batch, au streaming (Structured Streaming) et au machine learning (MLlib). Il tourne sur Kubernetes, YARN, ou via des offres managées comme Databricks (fondée par ses créateurs), Amazon EMR ou Google Dataproc.

## Quand l'utiliser

- Transformations sur de gros volumes, au-delà de ce qu'une machine traite raisonnablement.
- Data lake sur stockage objet (S3) avec des fichiers Parquet ou des tables Iceberg / Delta.
- Traitements que le SQL d'un entrepôt exprime mal (logique complexe en Python, préparation de données pour le ML).

## Quand l'éviter

- Quelques milliers ou millions de lignes : le coût de démarrage et d'exploitation d'un cluster dépasse le gain. DuckDB ou pandas suffisent.
- Données déjà dans un entrepôt où le SQL suffit : dbt dans l'entrepôt est plus simple.
- Équipe sans expérience : le réglage des performances (partitionnement, mémoire, données déséquilibrées) demande de l'expertise.

## Pour aller plus loin

- [Documentation officielle](https://spark.apache.org/docs/latest/)
- [Guide Spark SQL et DataFrames](https://spark.apache.org/docs/latest/sql-programming-guide.html)
