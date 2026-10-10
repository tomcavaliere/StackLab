---
name: Apache Airflow
kind: orchestrateur
layers: [orchestration]
languages: [python]
tags: [open-source, batch, offre-managee]
difficulty: 2
summary: "Orchestrateur de workflows : on décrit en Python des graphes de tâches planifiées, Airflow les déclenche, gère les dépendances, les reprises et l'historique."
alternatives:
  - tech: dagster
    note: "Pensé autour des données produites (assets) plutôt que des tâches, avec un développement local plus confortable."
---

## Problème résolu

Un pipeline de données enchaîne des étapes : extraire, charger, transformer, publier. Avec des tâches cron isolées, personne ne sait quelle étape a échoué, ce qui doit être relancé, ni dans quel ordre. Airflow, créé chez Airbnb en 2014 puis confié à la fondation Apache, décrit chaque pipeline comme un DAG (graphe orienté acyclique) de tâches, en Python.

Le scheduler déclenche les DAG selon un calendrier ou un événement, respecte les dépendances, relance les tâches en échec et garde l'historique de chaque exécution, consultable dans une interface web. Des opérateurs prêts à l'emploi pilotent Spark, dbt, les entrepôts et les services cloud. Airflow 3.0 est sorti en 2025. Des offres managées existent (Astronomer, Amazon MWAA, Google Cloud Composer).

## Quand l'utiliser

- Pipelines batch planifiés avec des dépendances entre étapes et plusieurs systèmes à piloter.
- Équipe data qui veut un standard très répandu, avec beaucoup d'intégrations existantes.

## Quand l'éviter

- Traitement en temps réel ou à faible latence : Airflow planifie des lots, ce n'est pas un moteur de streaming.
- Faire le calcul lourd dans Airflow lui-même : il doit déléguer à Spark, dbt ou à l'entrepôt.
- Deux ou trois tâches simples : un cron ou le planificateur de l'entrepôt suffit, sans scheduler ni base de métadonnées à opérer.

## Pour aller plus loin

- [Documentation officielle](https://airflow.apache.org/docs/apache-airflow/stable/index.html)
- [Concepts fondamentaux](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/index.html)
