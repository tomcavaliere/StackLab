---
title: Data & analytique
description: "Entrepôt, moteur de calcul, transformation, orchestration : qui fait quoi dans une plateforme data ?"
questions:
  - id: transformations-dans-l-entrepot
    prompt: "Transformer en SQL les tables brutes de l'entrepôt, avec tests et versionnement"
    answer: dbt
    decoy: spark
    why: "dbt exécute dans l'entrepôt des SELECT versionnés, testés et documentés. Spark ajoute un cluster quand le SQL de l'entrepôt suffit."
  - id: au-dela-d-une-machine
    prompt: "Transformer des volumes qui dépassent une machine, avec une logique complexe en Python"
    answer: spark
    decoy: dbt
    why: "Spark répartit le calcul sur un cluster et accepte du Python. dbt ne fait que du SQL, sur des données déjà dans l'entrepôt."
  - id: petit-csv-quotidien
    prompt: "Agréger chaque matin un CSV de quelques milliers de lignes"
    answer: duckdb
    decoy: spark
    why: "Démarrer et exploiter un cluster Spark coûte plus que le calcul lui-même. DuckDB fait ce travail en local, sans serveur."
  - id: lots-nocturnes
    prompt: "Planifier chaque nuit des étapes dépendantes qui pilotent plusieurs systèmes, avec reprises"
    answer: airflow
    decoy: dbt
    why: "Airflow orchestre : il déclenche les tâches, gère les dépendances et les reprises. dbt transforme dans l'entrepôt, sans piloter les autres systèmes."
  - id: lignee-et-fraicheur
    prompt: "Voir la lignée et la fraîcheur de chaque table d'une nouvelle plateforme bâtie avec dbt"
    answer: dagster
    decoy: airflow
    why: "Dagster est centré sur les assets : il sait ce qui est produit, à partir de quoi, et quand c'est périmé. Airflow raisonne en tâches."
  - id: zone-d-atterrissage
    prompt: "Une zone d'atterrissage bon marché pour des fichiers bruts de tous formats"
    answer: aws-s3
    decoy: snowflake
    why: "Le stockage objet est le socle classique d'un data lake : on y dépose n'importe quel fichier. Un entrepôt sert à interroger en SQL des données chargées dans ses tables."
  - id: flux-continu
    prompt: "Traiter un flux d'événements en continu, à faible latence"
    answer: spark
    decoy: airflow
    why: "Spark sait traiter des flux (streaming). Airflow planifie des lots ; ce n'est pas un moteur de streaming."
  - id: plusieurs-clouds
    prompt: "Un entrepôt SQL managé, sans lier ses données à un seul fournisseur cloud"
    answer: snowflake
    decoy: bigquery
    why: "Snowflake est proposé sur plusieurs clouds (AWS, Azure, Google Cloud). BigQuery est propre à Google Cloud."
  - id: google-analytics-et-ads
    prompt: "Croiser en SQL des données qui sont déjà dans Google Analytics et Google Ads"
    answer: bigquery
    decoy: duckdb
    why: "BigQuery est natif de l'écosystème Google (Analytics, Ads). DuckDB est un moteur local, pour des volumes qui tiennent sur une machine."
  - id: prototyper-en-local
    prompt: "Prototyper des requêtes analytiques sur son poste avant de les porter sur l'entrepôt"
    answer: duckdb
    decoy: bigquery
    why: "DuckDB tourne en local, sans frais. Sur BigQuery, chaque requête de prototype peut être facturée à la donnée lue."
  - id: orchestrateur-repandu
    prompt: "Un orchestrateur très répandu, avec un large catalogue d'intégrations et un vivier de recrutement"
    answer: airflow
    decoy: dagster
    why: "L'écosystème d'Airflow est plus ancien et plus large. Dagster est plus récent, avec moins d'intégrations existantes."
  - id: ingestion-depuis-une-api
    prompt: "Récupérer chaque jour les données de l'API d'un fournisseur et les charger dans l'entrepôt"
    answer: airflow
    decoy: dbt
    why: "dbt ne transforme que ce qui est déjà chargé. Une tâche Airflow peut appeler l'API et charger les données, puis déclencher dbt."
---
