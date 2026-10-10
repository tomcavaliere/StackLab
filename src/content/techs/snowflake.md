---
name: Snowflake
kind: service-cloud
layers: [stockage-analytique]
languages: [sql]
tags: [entrepot, colonnaire, offre-managee]
difficulty: 2
summary: "Entrepôt de données cloud managé qui sépare stockage et calcul : on interroge de gros volumes en SQL sans gérer de serveurs."
alternatives:
  - tech: bigquery
    note: "Équivalent serverless de Google Cloud, facturé à la donnée scannée ou en capacité réservée."
integratesWith:
  - tech: dbt
    note: "Combinaison très répandue : dbt exécute ses transformations SQL dans Snowflake."
  - tech: aws-s3
    note: "Chargement ou lecture directe de fichiers déposés dans S3 (stages externes)."
---

## Problème résolu

Analyser des années d'historique avec une base transactionnelle est lent, et monter un entrepôt de données sur ses propres serveurs demande une équipe dédiée. Snowflake (fondée en 2012) est un entrepôt entièrement managé, qui tourne au choix sur AWS, Azure ou Google Cloud. Les données sont stockées en format colonnaire, et le calcul est assuré par des « entrepôts virtuels » qu'on démarre, arrête et dimensionne indépendamment du stockage.

Plusieurs équipes peuvent donc interroger les mêmes données avec chacune sa puissance de calcul, sans se gêner. S'y ajoutent le voyage dans le temps (lire une table telle qu'elle était), le clonage sans copie et le partage de données entre comptes.

## Quand l'utiliser

- Plateforme data analytique d'entreprise : plusieurs sources, plusieurs équipes, reporting et BI.
- Équipe data qui veut écrire du SQL plutôt qu'opérer une infrastructure.
- Données hébergées sur plusieurs clouds, ou volonté de ne pas lier l'entrepôt à un seul fournisseur cloud.

## Quand l'éviter

- Petit volume ou usage individuel : DuckDB ou PostgreSQL suffisent, sans facture de calcul.
- Base d'une application (transactions, écritures unitaires fréquentes) : ce n'est pas un moteur transactionnel.
- Budget à maîtriser sans discipline : un entrepôt virtuel oublié allumé, ou des requêtes mal écrites, coûtent cher.

## Pour aller plus loin

- [Documentation officielle](https://docs.snowflake.com/)
- [Concepts clés de l'architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts)
