---
name: Amazon S3
kind: service-cloud
layers: [stockage-analytique, cloud]
tags: [stockage-objet, data-lake, offre-managee]
difficulty: 1
summary: "Stockage d'objets d'AWS : des fichiers de toute taille rangés dans des buckets, accessibles par API ; souvent le socle d'un data lake."
integratesWith:
  - tech: spark
    note: "Spark lit et écrit des fichiers Parquet directement dans S3."
  - tech: duckdb
    note: "DuckDB interroge en SQL des fichiers Parquet ou CSV stockés dans S3."
---

## Problème résolu

Stocker des fichiers (photos d'utilisateurs, exports, sauvegardes, données brutes) sur les disques de ses serveurs pose des problèmes de capacité, de redondance et de partage. S3 (2006) est un stockage d'objets : on dépose des fichiers dans des buckets, on les lit par une API HTTP, AWS se charge de la redondance et de la capacité. La facturation dépend du volume stocké, des requêtes et des transferts sortants.

En data, S3 sert de data lake : on y dépose les données brutes et transformées (souvent en Parquet, ou dans des formats de tables comme Apache Iceberg), que des moteurs comme Spark, Trino, Snowflake ou DuckDB lisent directement. Son API est devenue un standard de fait, reprise par d'autres stockages compatibles.

## Quand l'utiliser

- Fichiers déposés par les utilisateurs ou générés par l'application (images, PDF, exports).
- Data lake : zone d'atterrissage des données brutes et stockage bon marché de gros volumes.
- Sauvegardes et archives, avec des classes de stockage moins chères pour les données rarement lues.

## Quand l'éviter

- Comme base de données : pas de requêtes, pas de transactions sur plusieurs objets.
- Comme système de fichiers partagé avec des modifications partielles fréquentes : un objet se remplace en entier.
- Infrastructure sur un autre cloud : chaque fournisseur a son équivalent (Google Cloud Storage, Azure Blob Storage).

## Pour aller plus loin

- [Documentation officielle](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html)
- [Modèle de cohérence](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html#ConsistencyModel)
