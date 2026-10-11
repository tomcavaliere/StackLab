---
title: "Plateforme data : indicateurs fiables pour une chaîne de magasins"
type: plateforme-data
brief: |
  Nous avons environ 200 magasins et un site de vente en ligne. Aujourd'hui, chaque service exporte ses chiffres dans des tableurs,
  et les chiffres ne concordent jamais d'une réunion à l'autre.
  Nous voulons rassembler chaque nuit les ventes des caisses, les commandes du site et les stocks au même endroit,
  avec des indicateurs fiables (chiffre d'affaires, marge, ruptures) que nos analystes pourront interroger librement.
  Nous avons plusieurs années d'historique. Les chiffres de la veille doivent être prêts chaque matin à 8 h,
  et si un chargement échoue, nous voulons le savoir et pouvoir le relancer.
constraints:
  team: "3 data engineers et une équipe d'analystes qui écrivent du SQL"
  budget: "Moyen : éviter de payer un cluster allumé en permanence"
  volume: "Plusieurs années de tickets de caisse, de l'ordre du téraoctet"
  latency: "Données de la veille disponibles chaque matin (traitement quotidien)"
  timeToMarket: "Premiers indicateurs en 3 mois"
requiredLayers: [stockage-analytique, traitement-data, orchestration]
optionalLayers: [cloud, ci-cd, observabilite]
verdicts:
  stockage-analytique:
    - { tech: snowflake, verdict: ideal, why: "Entrepôt SQL managé pour les analystes, calcul démarré à la demande, historique de l'ordre du téraoctet sans difficulté." }
    - { tech: bigquery, verdict: ideal, why: "Serverless, rien à dimensionner, facturé à l'usage : convient bien à un traitement quotidien." }
    - { tech: aws-s3, verdict: acceptable, why: "Bonne zone d'atterrissage des exports bruts, mais les analystes ont besoin d'un moteur SQL par-dessus." }
    - { tech: duckdb, verdict: acceptable, why: "Économique et rapide, mais sans base partagée ni gestion des accès pour toute une équipe d'analystes." }
    - { tech: clickhouse, verdict: acceptable, why: "Très rapide pour agréger de gros volumes, mais un serveur à opérer ou une offre managée de plus ; pour des analystes et un chargement quotidien, un entrepôt managé est plus simple." }
  traitement-data:
    - { tech: dbt, verdict: ideal, why: "Des indicateurs écrits en SQL, testés et documentés dans l'entrepôt : une seule définition du chiffre d'affaires pour tout le monde." }
    - { tech: duckdb, verdict: acceptable, why: "Transformations rapides sur une machine ; il faut organiser soi-même le partage des résultats." }
    - { tech: spark, verdict: surdimensionne, why: "Un cluster à opérer pour des transformations quotidiennes que le SQL de l'entrepôt exprime très bien." }
  orchestration:
    - { tech: airflow, verdict: ideal, why: "Chargement nocturne en plusieurs étapes, avec dépendances, relance des échecs et historique : exactement son rôle." }
    - { tech: dagster, verdict: ideal, why: "Les mêmes garanties, avec en plus la lignée et la fraîcheur de chaque table, et une très bonne intégration à dbt." }
  cloud:
    - { tech: aws, verdict: ideal, why: "Héberge le stockage brut et les services managés autour de l'entrepôt." }
    - { tech: aws-s3, verdict: ideal, why: "Dépôt des exports des caisses et du site avant chargement dans l'entrepôt." }
    - { tech: heroku, verdict: inadapte, why: "PaaS pour applications web, sans services de données adaptés." }
    - { tech: vercel, verdict: inadapte, why: "Hébergement de fronts et de fonctions courtes, sans rapport avec une plateforme data." }
    - { tech: aws-lambda, verdict: acceptable, why: "Peut exécuter de petites étapes d'ingestion à la demande ; l'orchestrateur reste nécessaire pour enchaîner et relancer les étapes." }
  ci-cd:
    - { tech: github-actions, verdict: ideal, why: "Tester les modèles dbt à chaque modification avant qu'un indicateur faux n'arrive en réunion." }
  observabilite:
    - { tech: sentry, verdict: acceptable, why: "Remonte les erreurs des scripts, mais ne dit rien de la fraîcheur ni de la qualité des données : les alertes de l'orchestrateur et les tests dbt sont plus utiles." }
    - { tech: grafana, verdict: acceptable, why: "Peut afficher l'état des chargements, mais ce n'est pas un outil de BI pour les analystes." }
    - { tech: prometheus, verdict: surdimensionne, why: "Une infrastructure de métriques pour un traitement quotidien : les alertes de l'orchestrateur suffisent." }
    - { tech: elasticsearch, verdict: surdimensionne, why: "Un cluster de journaux à opérer pour un traitement quotidien : les alertes de l'orchestrateur suffisent." }
  cache-messaging:
    - { tech: kafka, verdict: surdimensionne, why: "Le besoin est un chargement quotidien : un flux d'événements en continu n'apporte rien et coûte en exploitation." }
antiPatterns:
  - { techs: [snowflake, bigquery], penalty: 10, why: "Deux entrepôts pour les mêmes données : les chiffres divergeront de nouveau, comme dans les tableurs." }
  - { techs: [airflow, dagster], penalty: 10, why: "Deux orchestrateurs : les dépendances entre chargements se retrouvent coupées en deux." }
  - { techs: [spark, kafka], penalty: 10, why: "Du streaming distribué pour un chargement quotidien : beaucoup d'exploitation pour une fraîcheur que personne ne demande." }
referenceStack:
  stockage-analytique: [aws-s3, snowflake]
  traitement-data: [dbt]
  orchestration: [airflow]
  cloud: [aws]
  ci-cd: [github-actions]
---

## Ce qui compte vraiment ici

Le problème du client n'est pas le volume, c'est la **confiance** : des chiffres qui concordent, chaque matin, et des échecs visibles. Les utilisateurs finaux sont des analystes qui écrivent du SQL. Un téraoctet d'historique avec un chargement par jour reste dans la zone de confort d'un entrepôt cloud.

## Le raisonnement

- **Un seul entrepôt, une seule vérité.** Les exports des caisses et du site atterrissent dans S3, puis sont chargés dans un entrepôt (Snowflake ou BigQuery) que tous les analystes interrogent en SQL. Le calcul ne tourne que pendant les requêtes et les chargements.
- **Des indicateurs définis une fois, testés.** Avec dbt, « chiffre d'affaires » et « marge » sont des modèles SQL versionnés, testés (pas de doublon de ticket, pas de magasin inconnu) et documentés. C'est exactement ce qui manquait avec les tableurs.
- **Un orchestrateur pour la nuit.** Airflow ou Dagster enchaîne extraction, chargement, puis transformations dbt. Il relance ce qui échoue, alerte, et garde l'historique de chaque exécution. L'objectif de 8 h devient vérifiable.

## Les pièges

- **Spark par réflexe « big data ».** Un téraoctet d'historique ne justifie pas un cluster quand les transformations s'expriment en SQL dans l'entrepôt.
- **Du temps réel que personne ne demande.** Kafka et le streaming coûtent cher à opérer pour des chiffres attendus une fois par jour.
- **L'entrepôt sur la base de production.** Les bases opérationnelles des caisses et du site sont les sources ; y lancer l'analytique ralentirait les ventes. Un moteur colonnaire est fait pour ces requêtes.
