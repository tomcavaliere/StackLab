---
name: Dagster
kind: orchestrateur
layers: [orchestration]
languages: [python]
tags: [open-source, batch, offre-managee]
difficulty: 2
summary: "Orchestrateur de données centré sur les « assets » (tables, fichiers, modèles) : il sait ce qui est produit, à partir de quoi, et quand c'est périmé."
integratesWith:
  - tech: dbt
    note: "Chaque modèle dbt devient un asset Dagster, avec sa lignée et son état."
---

## Problème résolu

Les orchestrateurs classiques décrivent des tâches : « lancer ce script, puis celui-là ». Mais ce qui compte, ce sont les données produites : cette table est-elle à jour, d'où vient-elle, qu'est-ce qui casse si elle change ? Dagster (open-source depuis 2019, Dagster Labs) fait des assets, c'est-à-dire les données produites, l'unité de base. On déclare en Python chaque asset et ses dépendances, et Dagster en déduit le graphe, la lignée et ce qu'il faut recalculer.

Il met l'accent sur le développement local et les tests : un pipeline se lance et se teste sur un poste comme du code ordinaire. Une offre hébergée, Dagster+, existe.

## Quand l'utiliser

- Nouvelle plateforme data, en particulier avec dbt, où l'on veut voir la lignée et la fraîcheur de chaque table.
- Équipe qui veut tester ses pipelines comme du logiciel.

## Quand l'éviter

- Organisation déjà outillée sur Airflow : migrer coûte cher pour un gain parfois limité.
- Besoin d'un très large catalogue d'intégrations ou d'un vivier de recrutement : l'écosystème d'Airflow est plus ancien et plus large.
- Deux ou trois tâches simples : un cron suffit.

## Pour aller plus loin

- [Documentation officielle](https://docs.dagster.io/)
- [Concept d'asset](https://docs.dagster.io/guides/build/assets)
