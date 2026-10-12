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
  - id: statistiques-dans-l-application
    prompt: "Des statistiques en temps réel affichées aux utilisateurs d'une application, sur un très gros flux d'événements"
    answer: clickhouse
    decoy: duckdb
    why: "ClickHouse est un serveur colonnaire conçu pour l'analytique en temps réel derrière des tableaux de bord interrogés en continu. DuckDB est embarqué dans un processus, pour l'analyse locale."
  - id: traitement-a-chaque-fichier
    prompt: "Lancer un petit traitement à chaque fichier déposé dans un bucket S3"
    answer: aws-lambda
    decoy: airflow
    why: "Une fonction Lambda se déclenche sur l'événement S3, sans serveur à opérer. Airflow planifie des graphes de tâches : un déclenchement par fichier y est plus lourd."
  - id: parquet-depuis-un-notebook
    prompt: "Interroger en SQL quelques fichiers Parquet depuis un notebook, sans serveur à installer"
    answer: duckdb
    decoy: clickhouse
    why: "DuckDB s'exécute dans le processus Python et lit directement CSV et Parquet. ClickHouse est un serveur, conçu pour des tableaux de bord interrogés en continu."
  - id: equipes-sans-se-gener
    prompt: "Plusieurs équipes interrogent les mêmes données, chacune avec sa propre puissance de calcul, sans exploitation à leur charge"
    answer: snowflake
    decoy: clickhouse
    why: "Les entrepôts virtuels de Snowflake se démarrent et se dimensionnent séparément du stockage, un par équipe. ClickHouse demande d'être opéré, ou pris en offre managée, et vise surtout l'analytique en temps réel."
  - id: table-telle-qu-hier
    prompt: "Relire une table de l'entrepôt telle qu'elle était hier, après un chargement raté"
    answer: snowflake
    decoy: duckdb
    why: "Snowflake propose le voyage dans le temps : lire une table telle qu'elle était. DuckDB est un moteur local, sans cette fonction de lecture des versions passées."
  - id: aucune-capacite-a-regler
    prompt: "Un entrepôt sans aucune capacité de calcul à dimensionner, pour des charges très irrégulières"
    answer: bigquery
    decoy: snowflake
    why: "Avec BigQuery, il n'y a ni cluster ni entrepôt à dimensionner : Google alloue le calcul. Snowflake demande de choisir la taille des entrepôts virtuels qu'on démarre."
  - id: cle-unique-non-nulle
    prompt: "Vérifier automatiquement qu'une clé reste unique et non nulle dans chaque table transformée de l'entrepôt"
    answer: dbt
    decoy: airflow
    why: "dbt accompagne ses modèles de tests (unicité, non-nullité, relations). Airflow déclenche des tâches et gère leurs dépendances, sans notion de test sur les tables."
  - id: preparer-pour-le-ml
    prompt: "Préparer pour le machine learning des données brutes du data lake, bien trop volumineuses pour une machine"
    answer: spark
    decoy: duckdb
    why: "Spark répartit le calcul sur un cluster, lit les fichiers du data lake et accepte du Python. DuckDB est limité à ce qu'une machine peut traiter."
  - id: journaux-a-garder-longtemps
    prompt: "Conserver longtemps des journaux et des métriques, et les agréger en SQL"
    answer: clickhouse
    decoy: postgresql
    why: "ClickHouse range les données par colonne et les compresse : une agrégation ne lit que les colonnes utiles. PostgreSQL stocke par lignes et vise le transactionnel."
  - id: commandes-une-a-une
    prompt: "Enregistrer les commandes d'une boutique en ligne, une par une, avec transactions"
    answer: postgresql
    decoy: snowflake
    why: "PostgreSQL est une base transactionnelle faite pour les écritures unitaires d'une application. Snowflake est un entrepôt analytique, pas un moteur transactionnel."
  - id: le-t-de-elt
    prompt: "Dans une approche ELT, l'outil qui transforme les données une fois chargées brutes dans l'entrepôt"
    answer: dbt
    decoy: kafka
    why: "dbt est le « T » de l'ELT : il exécute dans l'entrepôt des SELECT versionnés. Kafka transporte des événements jusqu'à la plateforme ; il ne transforme pas les tables de l'entrepôt."
  - id: evenements-vers-la-plateforme
    prompt: "Faire arriver en continu les événements de l'application jusqu'à la plateforme data"
    answer: kafka
    decoy: airflow
    why: "Kafka ingère des flux d'événements à fort débit, que la plateforme consomme. Airflow planifie des lots ; ce n'est pas un moteur de streaming."
  - id: calcul-lourd-du-dag
    prompt: "Exécuter la grosse jointure que déclenche une tâche du pipeline nocturne, sur des volumes qui dépassent une machine"
    answer: spark
    decoy: airflow
    why: "Airflow doit déléguer le calcul lourd : Spark le répartit sur un cluster. Faire ce calcul dans Airflow lui-même est un usage à éviter."
  - id: ecritures-en-parallele
    prompt: "Une base analytique partagée, dans laquelle plusieurs outils de chargement écrivent en même temps"
    answer: snowflake
    decoy: duckdb
    why: "Snowflake est un entrepôt managé, partagé par plusieurs sources et équipes. Un seul processus peut écrire dans un fichier DuckDB."
  - id: plateforme-a-petit-budget
    prompt: "Une petite plateforme data à faible coût, avec des fichiers Parquet comme stockage et un seul analyste"
    answer: duckdb
    decoy: snowflake
    why: "DuckDB tourne en local, sans serveur ni facture de calcul, et lit directement le Parquet. Pour un petit volume et un usage individuel, Snowflake ajoute une facture sans nécessité."
  - id: ml-en-sql
    prompt: "Entraîner un modèle simple directement en SQL dans l'entrepôt, sur Google Cloud"
    answer: bigquery
    decoy: dbt
    why: "BigQuery propose des fonctions de machine learning en SQL. dbt organise des transformations SQL ; il n'entraîne pas de modèle par lui-même."
  - id: tout-sur-aws
    prompt: "Un entrepôt SQL managé pour une entreprise dont toute l'infrastructure est sur AWS"
    answer: snowflake
    decoy: bigquery
    why: "Snowflake est proposé sur AWS, près des données. BigQuery est propre à Google Cloud : faire transiter les données depuis un autre cloud coûte et complique."
  - id: journaux-par-mots-cles
    prompt: "Fouiller des journaux par mots-clés, avec des résultats classés par pertinence et tolérants aux fautes de frappe"
    answer: elasticsearch
    decoy: clickhouse
    why: "Elasticsearch construit un index inversé, classe par pertinence et tolère les fautes. ClickHouse excelle à agréger des colonnes en SQL, pas à la recherche plein texte classée."
---
