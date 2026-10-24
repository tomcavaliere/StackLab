---
name: BigQuery
kind: service-cloud
layers: [stockage-analytique]
languages: [sql]
tags: [entrepot, colonnaire, serverless, offre-managee]
difficulty: 2
summary: "Entrepôt de données serverless de Google Cloud : on charge les données, on écrit du SQL, Google alloue le calcul."
integratesWith:
  - tech: dbt
    note: "Adaptateur officiel : dbt exécute ses modèles SQL dans BigQuery."
---

## Problème résolu

BigQuery supprime la notion même de cluster : il n'y a ni serveur ni entrepôt à dimensionner. On crée des datasets et des tables, on écrit du SQL, et Google répartit l'exécution sur son infrastructure (le moteur descend de Dremel, décrit par Google dans un article de 2010). Le stockage est colonnaire et séparé du calcul.

La facturation se fait soit à la quantité de données lues par chaque requête, soit en réservant de la capacité de calcul. Le partitionnement et le clustering des tables limitent les données lues. Des fonctions de ML en SQL et l'intégration aux autres services Google Cloud complètent l'offre.

## Quand l'utiliser

- Plateforme data sur Google Cloud, ou données déjà dans l'écosystème Google (Analytics, Ads).
- Équipe sans compétences d'infrastructure qui veut un entrepôt sans aucun réglage de capacité.
- Charges irrégulières : on ne paie pas un cluster qui attend.

## Quand l'éviter

- Infrastructure principale sur un autre cloud : faire transiter les données coûte et complique.
- Petit volume : DuckDB ou PostgreSQL suffisent.
- Requêtes non maîtrisées en tarification à la donnée lue : un `SELECT *` sur une grosse table non partitionnée peut coûter cher.

## Pour aller plus loin

- [Documentation officielle](https://cloud.google.com/bigquery/docs)
- [Contrôler les coûts](https://cloud.google.com/bigquery/docs/best-practices-costs)
