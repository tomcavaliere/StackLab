---
title: "Prédire les résiliations d'abonnés"
type: ml
brief: |
  Nous vendons un abonnement en ligne et chaque mois, une partie de nos abonnés résilie sans que nous l'ayons vu venir.
  Nous voulons repérer à l'avance ceux qui risquent de partir, pour que l'équipe relation client les contacte avant.
  Nous avons des données sur nos abonnés : leur ancienneté, leur formule, leur usage du service, leurs paiements et leurs échanges avec le support.
  Chaque lundi matin, l'équipe doit recevoir la liste des abonnés à contacter, classés par risque, et nous voulons pouvoir vérifier
  que la prédiction reste fiable dans le temps. L'équipe est petite et nous n'avons pas de matériel spécialisé.
constraints:
  team: "1 data scientist et 1 développeur, sans équipe d'infrastructure"
  budget: "Limité : pas de matériel spécialisé ni de cluster"
  volume: "Quelques centaines de milliers d'abonnés, des données tabulaires (sans texte ni images)"
  latency: "Une liste recalculée chaque semaine, pas de prédiction en temps réel"
  timeToMarket: "Un premier modèle utilisable en 6 semaines"
requiredLayers: [base-operationnelle, traitement-data, ml]
optionalLayers: [stockage-analytique, orchestration, cloud, ci-cd]
verdicts:
  base-operationnelle:
    - { tech: postgresql, verdict: ideal, why: "Contient déjà les abonnés, leurs paiements et leur usage, et reçoit la liste hebdomadaire pour l'équipe relation client." }
    - { tech: mysql, verdict: acceptable, why: "Même rôle que PostgreSQL pour des données d'abonnés relationnelles, sans avantage particulier ici." }
    - { tech: oracle-database, verdict: surdimensionne, why: "Licences et administration lourdes pour quelques centaines de milliers d'abonnés et une équipe de deux personnes au budget limité." }
    - { tech: sql-server, verdict: acceptable, why: "Si les données d'abonnés y sont déjà, on les lit en SQL comme ailleurs ; l'installer pour ce projet n'apporterait rien." }
    - { tech: supabase, verdict: acceptable, why: "PostgreSQL managé qui convient, avec des fonctions (authentification, API) dont ce projet n'a pas besoin." }
    - { tech: sqlite, verdict: acceptable, why: "Peut suffire pour un premier prototype d'analyse sur un poste, pas pour des données partagées par l'équipe." }
    - { tech: mongodb, verdict: acceptable, why: "Peut stocker les données, mais l'historique d'abonnés est naturellement tabulaire et se manipule mieux en SQL." }
    - { tech: dynamodb, verdict: surdimensionne, why: "Pensée pour des accès à très forte échelle par clé : les analyses croisées du ML n'y sont pas à l'aise." }
    - { tech: cassandra, verdict: surdimensionne, why: "Conçue pour de très gros volumes répartis sur de nombreux serveurs : sans rapport avec quelques centaines de milliers d'abonnés." }
    - { tech: elasticsearch, verdict: inadapte, why: "Un moteur de recherche de texte, pas la base d'abonnés ni un outil de préparation de données pour le ML." }
  traitement-data:
    - { tech: pandas, verdict: ideal, why: "Quelques centaines de milliers de lignes tiennent en mémoire sur une machine : nettoyer, assembler et créer les variables du modèle y est direct." }
    - { tech: duckdb, verdict: ideal, why: "Calcule les agrégats (usage sur 30 jours, nombre d'incidents) en SQL sur une machine, sans serveur ; complète bien pandas." }
    - { tech: dbt, verdict: acceptable, why: "Utile pour des variables définies en SQL, testées et partagées ; une couche de plus qu'une équipe de deux personnes n'a pas forcément besoin d'installer." }
    - { tech: spark, verdict: surdimensionne, why: "Un cluster à opérer pour quelques centaines de milliers de lignes qui tiennent sur un poste." }
    - { tech: ray, verdict: surdimensionne, why: "Un cluster de calcul distribué pour quelques centaines de milliers de lignes qui tiennent sur un poste." }
  ml:
    - { tech: scikit-learn, verdict: ideal, why: "Prétraitement, découpage des données, modèles de base et évaluation derrière une même API : le bon point de départ sur des données tabulaires." }
    - { tech: xgboost, verdict: ideal, why: "Le gradient boosting est une référence sur les données tabulaires, s'entraîne sur CPU et se branche dans le pipeline scikit-learn." }
    - { tech: mlflow, verdict: ideal, why: "Garde la trace de chaque essai et du modèle retenu, ce qui permet de comparer et de vérifier la fiabilité dans le temps." }
    - { tech: pytorch, verdict: surdimensionne, why: "Un cadre pour réseaux de neurones, qui n'apporte pas de gain démontré sur des données tabulaires et complique le travail d'une petite équipe." }
    - { tech: tensorflow, verdict: surdimensionne, why: "Un cadre pour réseaux de neurones, qui n'apporte pas de gain démontré sur des données tabulaires et complique le travail d'une petite équipe." }
    - { tech: aws-sagemaker, verdict: surdimensionne, why: "Plateforme complète d'entraînement et de déploiement : trop pour un modèle qui s'entraîne sur un poste et produit une liste par semaine." }
    - { tech: hugging-face, verdict: inadapte, why: "Son Hub est centré sur des modèles de texte, d'image et de son : ce n'est pas l'outil de données tabulaires." }
    - { tech: openai-api, verdict: inadapte, why: "Un modèle de langage ne prédit pas de façon fiable le départ d'un abonné à partir de ses chiffres ; un modèle entraîné sur son historique le fait." }
    - { tech: claude-api, verdict: inadapte, why: "Un modèle de langage ne prédit pas de façon fiable le départ d'un abonné à partir de ses chiffres ; un modèle entraîné sur son historique le fait." }
    - { tech: ollama, verdict: inadapte, why: "Fait tourner un modèle de langage en local : sans rapport avec la prédiction sur données tabulaires." }
    - { tech: vllm, verdict: inadapte, why: "Sert des modèles de langage sur GPU : sans rapport avec la prédiction sur données tabulaires, et il n'y a pas de GPU." }
    - { tech: langchain, verdict: inadapte, why: "Assemble des applications autour de modèles de langage : le besoin est un modèle de prédiction classique." }
    - { tech: pgvector, verdict: inadapte, why: "Recherche par similarité de vecteurs : aucun texte ni embedding à rechercher ici." }
    - { tech: qdrant, verdict: inadapte, why: "Recherche par similarité de vecteurs : aucun texte ni embedding à rechercher ici." }
    - { tech: pinecone, verdict: inadapte, why: "Recherche par similarité de vecteurs : aucun texte ni embedding à rechercher ici." }
    - { tech: ray, verdict: surdimensionne, why: "Entraînement et recherche d'hyperparamètres répartis sur un cluster, alors qu'un modèle sur données tabulaires s'entraîne sur un poste." }
    - { tech: vertex-ai, verdict: surdimensionne, why: "Plateforme complète d'entraînement et de déploiement : trop pour un modèle qui s'entraîne sur un poste et produit une liste par semaine." }
    - { tech: aws-bedrock, verdict: inadapte, why: "Donne accès à des modèles de langage : ils ne prédisent pas de façon fiable le départ d'un abonné à partir de ses chiffres." }
    - { tech: llamaindex, verdict: inadapte, why: "Connecte un modèle de langage à des documents : le besoin est un modèle de prédiction sur données tabulaires." }
    - { tech: chroma, verdict: inadapte, why: "Recherche par similarité de vecteurs : sans rapport avec la prédiction sur données tabulaires." }
    - { tech: weaviate, verdict: inadapte, why: "Recherche par similarité de vecteurs : sans rapport avec la prédiction sur données tabulaires." }
  stockage-analytique:
    - { tech: duckdb, verdict: ideal, why: "Interroge directement des fichiers d'export sur une machine : suffisant pour préparer des données d'entraînement de cette taille." }
    - { tech: aws-s3, verdict: acceptable, why: "Bon endroit pour archiver les exports et les jeux d'entraînement datés, sans moteur de calcul associé." }
    - { tech: bigquery, verdict: acceptable, why: "Fonctionnerait, mais un entrepôt cloud est plus que ce que demandent quelques centaines de milliers de lignes." }
    - { tech: snowflake, verdict: surdimensionne, why: "Un entrepôt pour de nombreux analystes et de gros volumes, alors que les données tiennent sur un poste." }
    - { tech: clickhouse, verdict: surdimensionne, why: "Un serveur analytique à opérer pour un volume qui n'en demande pas." }
  orchestration:
    - { tech: airflow, verdict: acceptable, why: "Planifie la liste du lundi et prévient en cas d'échec, mais l'installer et l'exploiter pèse lourd pour une seule tâche hebdomadaire." }
    - { tech: dagster, verdict: acceptable, why: "Planifie le recalcul hebdomadaire et suit la fraîcheur des données ; un outil de plus à apprendre pour deux personnes." }
  cloud:
    - { tech: aws, verdict: acceptable, why: "Peut héberger le traitement hebdomadaire sans acheter de matériel, mais n'est pas indispensable pour un modèle qui tourne sur CPU." }
    - { tech: aws-s3, verdict: acceptable, why: "Conserve les jeux de données et les modèles versionnés à faible coût." }
    - { tech: aws-lambda, verdict: acceptable, why: "Peut déclencher le calcul hebdomadaire, avec des limites de durée et de mémoire à surveiller." }
    - { tech: heroku, verdict: acceptable, why: "Peut héberger un petit script planifié, sans services de données adaptés au ML." }
    - { tech: vercel, verdict: inadapte, why: "Hébergement de fronts et de fonctions courtes, sans rapport avec l'entraînement ou le calcul planifié." }
  ci-cd:
    - { tech: github-actions, verdict: ideal, why: "Teste le code de préparation des données à chaque modification et peut lancer le recalcul hebdomadaire." }
antiPatterns:
  - { techs: [pytorch, tensorflow], penalty: 10, why: "Deux cadres de réseaux de neurones pour un problème de données tabulaires qui n'en demande aucun." }
  - { techs: [scikit-learn, xgboost, pytorch], penalty: 5, why: "Passer au réseau de neurones avant d'avoir une base de comparaison solide : on ne saura pas s'il apporte quelque chose." }
  - { techs: [spark, pandas], penalty: 5, why: "Deux outils de traitement de données tabulaires pour des données qui tiennent en mémoire : un seul suffit." }
  - { techs: [aws-sagemaker, mlflow], penalty: 5, why: "Deux plateformes pour suivre les modèles : SageMaker inclut déjà son propre suivi, l'un des deux fait doublon." }
  - { techs: [spark, aws-sagemaker], penalty: 10, why: "Un cluster et une plateforme complète pour une petite équipe et un volume qui tient sur un poste." }
referenceStack:
  base-operationnelle: [postgresql]
  traitement-data: [pandas, duckdb]
  ml: [scikit-learn, xgboost, mlflow]
  ci-cd: [github-actions]
---

## Ce qui compte vraiment ici

Les données sont **tabulaires** (des colonnes de chiffres et de catégories sur chaque abonné), l'équipe est de deux personnes et il n'y a pas de matériel spécialisé. C'est le terrain du machine learning classique : peu de matériel, des résultats explicables, et un premier modèle en quelques semaines. Le plus gros du travail est de bien préparer les données et de vérifier que la prédiction reste fiable.

## Le raisonnement

- **Préparer les variables est l'essentiel du travail.** pandas (et DuckDB pour les agrégats SQL) construit, pour chaque abonné, des variables comme l'ancienneté, l'usage récent ou les incidents de paiement. Quelques centaines de milliers de lignes tiennent en mémoire sur un poste.
- **Commencer simple, comparer ensuite.** scikit-learn fournit le prétraitement, l'évaluation et un modèle de base ; XGBoost est une référence sur les données tabulaires et s'entraîne sur CPU. Sans base de comparaison, impossible de savoir si un modèle plus complexe vaut son coût.
- **Garder la trace.** MLflow enregistre chaque essai, ses paramètres et son résultat : c'est ce qui permet de reproduire le modèle retenu et de voir s'il se dégrade avec le temps.
- **Une liste par semaine, pas un service temps réel.** Le résultat est écrit dans la base opérationnelle pour l'équipe relation client. Planifier une tâche hebdomadaire n'exige pas forcément un orchestrateur : c'est un choix acceptable, pas indispensable.

## Les pièges

- **Les réseaux de neurones par réflexe.** PyTorch et TensorFlow brillent sur les images, le texte et le son ; sur des données tabulaires, on n'a pas de raison de penser qu'ils font mieux que le boosting, et ils compliquent le travail.
- **Une plateforme pour un petit modèle.** SageMaker, un cluster Spark ou un entrepôt géant résolvent des problèmes d'échelle que ce projet n'a pas.
- **Un modèle de langage pour prédire des chiffres.** Les API de langage ne remplacent pas un modèle entraîné sur l'historique des départs.
- **Oublier de mesurer.** Une prédiction jamais comparée aux résiliations réelles perd sa valeur sans que personne ne le voie ; c'est le rôle du suivi des modèles.
