---
# Les parcours. Le tronc commun ouvre les métiers et les compétences ; un parcours s'ouvre quand ses `requires` sont terminés.
# Chaque unité enchaîne ses leçons (fiche + quiz de la fiche), puis ses quiz de thème, puis ses scénarios.
# Règles et contrôles du build : CLAUDE.md, section « Parcours ». En bref : chaque fiche, thème et scénario figure dans au moins
# un parcours ; une fiche ne figure qu'une fois dans un parcours et ses parcours requis ; un thème ne cite que des technos vues
# avant lui (dans le parcours ou ses parcours requis) ; un métier contient les technos `essential` de sa fiche métier.
parcours:
  # ─── Tronc commun ───────────────────────────────────────────────────────────
  - id: tronc-commun
    kind: tronc
    title: Tronc commun
    intro: "Les technos que presque tous les métiers croisent. Une fois terminé, il ouvre les parcours métier et les compétences."
    units:
      - id: ecrire-du-code
        title: Écrire du code
        intro: "Les trois langages qu'on retrouve partout : SQL pour les données, Python pour les scripts et la data, JavaScript pour le web."
        lessons: [sql, python, javascript]
      - id: web-et-donnees
        title: Le web et ses données
        intro: "Comment une application expose ses données (une API REST) et où elle les range (une base relationnelle)."
        lessons: [rest, postgresql]
      - id: livrer
        title: Versionner et livrer
        intro: "Garder l'historique du code et travailler à plusieurs, puis emballer l'application pour qu'elle tourne de la même façon partout."
        lessons: [git, docker]

  # ─── Métiers ────────────────────────────────────────────────────────────────
  - id: data-analyst
    kind: metier
    role: data-analyst
    title: Data analyst
    intro: "Répondre aux questions du métier avec des chiffres fiables : interroger, transformer, visualiser."
    requires: [tronc-commun]
    units:
      - id: interroger
        title: Interroger les données
        intro: "Le notebook pour explorer pas à pas, et du SQL rapide sur des fichiers, sans serveur à installer."
        lessons: [jupyter, duckdb]
      - id: entrepot
        title: Lire dans un entrepôt de données
        intro: "Les données de l'entreprise sont centralisées dans un entrepôt interrogé en SQL."
        lessons: [bigquery, snowflake]
      - id: transformer
        title: Nettoyer et transformer
        intro: "Préparer des tables propres et documentées, en Python ou en SQL versionné."
        lessons: [pandas, dbt]
      - id: visualiser
        title: Décrire, visualiser et partager
        intro: "Résumer honnêtement une variable (moyenne ou médiane, dispersion), puis mettre les indicateurs sous les yeux de ceux qui décident."
        lessons: [statistiques-descriptives, grafana]

  - id: data-scientist
    kind: metier
    role: data-scientist
    title: Data scientist
    intro: "Explorer les données, puis construire et évaluer des modèles qui expliquent ou prédisent."
    requires: [tronc-commun]
    units:
      - id: explorer
        title: Explorer et préparer
        intro: "Avant tout modèle, regarder les données dans un notebook : distributions, valeurs manquantes, anomalies."
        lessons: [jupyter, pandas, duckdb, statistiques-descriptives]
      - id: familles
        title: Les familles d'apprentissage
        intro: "Choisir une méthode commence par savoir si l'on dispose d'exemples déjà étiquetés."
        lessons: [apprentissage-supervise, apprentissage-non-supervise]
      - id: modeliser
        title: Modéliser
        intro: "Partir du modèle le plus simple qui marche, puis passer aux arbres boostés."
        lessons: [scikit-learn, xgboost]
      - id: experiences
        title: Suivre les expériences
        intro: "Garder la trace de chaque essai pour retrouver le bon modèle, puis le mettre à l'épreuve sur un cas réel."
        lessons: [mlflow]
        scenarios: [prediction-resiliation]

  - id: data-engineer
    kind: metier
    role: data-engineer
    title: Data engineer
    intro: "Construire les pipelines qui amènent la donnée brute jusqu'à l'entrepôt, de façon fiable et planifiée."
    requires: [tronc-commun]
    units:
      - id: collecter
        title: Collecter et stocker en brut
        intro: "Transporter les événements en continu et garder les fichiers bruts à bas coût."
        lessons: [kafka, aws-s3]
      - id: transformer
        title: Transformer
        intro: "Du petit volume (pandas, DuckDB) au calcul distribué (Spark), puis la modélisation en SQL (dbt)."
        lessons: [pandas, duckdb, spark, dbt]
      - id: entrepot
        title: Charger l'entrepôt
        intro: "Les entrepôts cloud où les analystes viendront lire."
        lessons: [snowflake, bigquery]
      - id: orchestrer
        title: Orchestrer
        intro: "Planifier les tâches, gérer leurs dépendances et leurs reprises, puis assembler une plateforme complète."
        lessons: [airflow, dagster]
        scenarios: [plateforme-data-analytique]

  - id: statisticien
    kind: metier
    role: statisticien
    title: Statisticien
    intro: "Tirer des conclusions fiables de données incomplètes : décrire, tester, modéliser, et dire avec quelle incertitude."
    requires: [tronc-commun]
    units:
      - id: langage
        title: Le langage R
        intro: "Le langage pensé pour la statistique : vecteurs, valeurs manquantes, tests et modèles intégrés."
        lessons: [r]
      - id: preparer
        title: Préparer les données
        intro: "Ranger les données (une ligne par observation, une colonne par variable) avec la grammaire du tidyverse."
        lessons: [tidyverse]
      - id: decrire
        title: Décrire et visualiser
        intro: "Avant tout test : position, dispersion, forme de la distribution, puis les graphiques qui les montrent."
        lessons: [statistiques-descriptives, ggplot2]
      - id: tester
        title: Tester et expérimenter
        intro: "Distinguer un vrai effet du hasard, puis concevoir des expériences qui permettent de conclure sur une cause."
        lessons: [tests-statistiques, ab-test]
      - id: modeliser
        title: Modéliser
        intro: "Mesurer l'effet de plusieurs facteurs à la fois, puis départager les méthodes dans le quiz du thème."
        lessons: [regression]
        themes: [statistiques]

  - id: devops-sre
    kind: metier
    role: devops-sre
    title: DevOps / SRE
    intro: "Mettre les applications en production, automatiser leur livraison et les garder en bonne santé."
    requires: [tronc-commun]
    units:
      - id: conteneurs
        title: Conteneuriser et router
        intro: "Après Docker : le serveur web qui reçoit le trafic, puis l'orchestrateur qui fait tourner les conteneurs."
        lessons: [nginx, kubernetes]
      - id: infra-code
        title: Décrire l'infrastructure en code
        intro: "Créer et modifier l'infrastructure par des fichiers relus et versionnés, pas à la main."
        lessons: [terraform]
      - id: heberger
        title: Choisir où héberger
        intro: "Le cloud public et ses briques de base : stockage objet, fonctions à la demande."
        lessons: [aws, aws-s3, aws-lambda]
      - id: livrer
        title: Livrer en continu
        intro: "Tester et déployer à chaque modification, automatiquement."
        lessons: [github-actions]
      - id: observer
        title: Observer
        intro: "Métriques, tableaux de bord, erreurs : savoir ce qui se passe avant que les utilisateurs ne le signalent."
        lessons: [prometheus, grafana, sentry]

  - id: backend-dev
    kind: metier
    role: backend-dev
    title: Développeur backend
    intro: "Construire les API et les services : logique métier, stockage, performances, communication entre services."
    requires: [tronc-commun]
    units:
      - id: langage
        title: Choisir un langage et un framework
        intro: "TypeScript côté serveur avec Node.js, ou Python avec FastAPI."
        lessons: [typescript, nodejs, express, fastapi]
      - id: exposer
        title: Exposer l'API
        intro: "Au-delà de REST : requêtes flexibles, temps réel, appels entre services."
        lessons: [graphql, websocket, grpc]
      - id: accelerer
        title: Accélérer et découpler
        intro: "Mettre en cache, puis faire passer le travail par des files de messages pour tenir la charge."
        lessons: [redis, memcached, rabbitmq, kafka]
        themes: [api-communication]
        scenarios: [api-fort-trafic]

  - id: frontend-dev
    kind: metier
    role: frontend-dev
    title: Développeur frontend
    intro: "Construire les interfaces web : composants, rendu, livraison et suivi des erreurs."
    requires: [tronc-commun]
    units:
      - id: langage
        title: Écrire le code du navigateur
        intro: "JavaScript typé : les erreurs sortent à l'écriture du code, pas chez l'utilisateur."
        lessons: [typescript]
      - id: interface
        title: Construire l'interface
        intro: "Une bibliothèque de composants, puis le framework qui l'encadre (routes, rendu serveur)."
        lessons: [react, nextjs]
      - id: livrer
        title: Livrer et surveiller
        intro: "Mettre le site en ligne et voir les erreurs qui arrivent chez les utilisateurs."
        lessons: [vercel, sentry]

  - id: mobile-dev
    kind: metier
    role: mobile-dev
    title: Développeur mobile
    intro: "Construire des apps iOS et Android : en natif, ou avec un seul code pour les deux."
    requires: [tronc-commun]
    units:
      - id: natif
        title: Le natif
        intro: "Les langages officiels de chaque plateforme : Swift pour iOS, Kotlin pour Android."
        lessons: [swift, kotlin]
      - id: multiplateforme
        title: Un seul code pour iOS et Android
        intro: "Flutter (en Dart) ou React Native (en JavaScript), puis deviner la stack d'une vraie app mobile."
        lessons: [dart, flutter, react-native]
        scenarios: [devine-instagram]

  - id: ml-engineer
    kind: metier
    role: ml-engineer
    title: ML engineer
    intro: "Industrialiser les modèles : entraînement reproductible, suivi des versions, service des prédictions."
    requires: [tronc-commun]
    units:
      - id: entrainer
        title: Entraîner les modèles
        intro: "Du machine learning classique au deep learning."
        lessons: [scikit-learn, deep-learning, pytorch]
      - id: tracer
        title: Tracer et versionner
        intro: "Savoir quel modèle tourne, entraîné sur quoi, et réutiliser des modèles préentraînés."
        lessons: [mlflow, hugging-face]
      - id: servir
        title: Servir les prédictions
        intro: "Exposer le modèle derrière une API."
        lessons: [fastapi]

  - id: ai-engineer
    kind: metier
    role: ai-engineer
    title: AI engineer
    intro: "Construire des applications autour des grands modèles de langage : appels d'API, RAG, évaluation."
    requires: [tronc-commun]
    units:
      - id: modele
        title: Comprendre et appeler le modèle
        intro: "Ce qu'est un LLM, comment l'appeler et comment piloter son comportement."
        lessons: [llm, claude-api, prompt-engineering]
      - id: connaissances
        title: Donner accès aux connaissances
        intro: "Représenter les documents en vecteurs, les retrouver, puis les fournir au modèle."
        lessons: [embeddings, pgvector, rag]
      - id: evaluer
        title: Évaluer et observer
        intro: "Mesurer la qualité des réponses et suivre ce que fait l'application, puis construire un assistant complet."
        lessons: [evaluation-llm, langfuse]
        scenarios: [assistant-documentaire-rag]

  # ─── Compétences : tout le catalogue, module par module ─────────────────────
  - id: langages
    kind: competence
    title: Langages
    intro: "Les autres langages : typés, compilés, mobiles, système. À prendre dans l'ordre qui t'intéresse."
    requires: [tronc-commun]
    units:
      - id: langages
        title: Langages
        intro: "Ce dans quoi on écrit le code. Chaque framework et chaque outil s'appuie sur l'un d'eux."
        lessons: [typescript, java, go, php, ruby, kotlin, swift, dart, rust, r]
        themes: [langages]

  - id: frameworks
    kind: competence
    title: Frameworks web & mobile
    intro: "Les boîtes à outils qui structurent une application : interface web, API, app mobile."
    requires: [tronc-commun]
    units:
      - id: frameworks
        title: Frameworks web & mobile
        intro: "Interface web, API et app mobile : un framework par besoin et par langage."
        lessons:
          [nodejs, express, react, vue, svelte, nextjs, angular, fastapi, django, laravel, ruby-on-rails, nestjs, gin, spring-boot, react-native, flutter]
        themes: [frameworks]

  - id: bases-de-donnees
    kind: competence
    title: Bases de données
    intro: "Où la donnée vit : base relationnelle, documents, clé-valeur, recherche, puis entrepôts analytiques."
    requires: [tronc-commun]
    units:
      - id: bases-de-donnees
        title: Bases de données
        intro: "Une famille de base par besoin, du fichier SQLite à l'entrepôt cloud."
        lessons: [sqlite, mysql, mongodb, supabase, redis, memcached, dynamodb, cassandra, elasticsearch, duckdb, clickhouse, bigquery, snowflake]
        themes: [bases-de-donnees]

  - id: deployer-exploiter
    kind: competence
    title: Déployer & exploiter
    intro: "Mettre l'application en ligne, la sécuriser et la surveiller : hébergement, CI/CD, auth, cloud, supervision."
    requires: [tronc-commun, bases-de-donnees]
    units:
      - id: deployer-exploiter
        title: Déployer & exploiter
        intro: "Conteneurs, hébergement, CI/CD, authentification, cloud, supervision."
        lessons: [nginx, vercel, heroku, github-actions, sentry, auth0, keycloak, aws, aws-s3, aws-lambda, terraform, kubernetes, prometheus, grafana]
        themes: [infra-ops]
        scenarios: [mvp-saas-web]

  - id: api-messaging
    kind: competence
    title: API & messaging
    intro: "Comment les services se parlent : styles d'API, temps réel, files de messages et tâches de fond."
    requires: [tronc-commun, bases-de-donnees]
    units:
      - id: api-messaging
        title: API & messaging
        intro: "Styles d'API, temps réel, files de messages et tâches de fond."
        lessons: [graphql, websocket, grpc, rabbitmq, kafka, celery, airflow]
        themes: [api-communication, cache-messaging]
        scenarios: [api-fort-trafic, devine-instagram]

  - id: data-analytique
    kind: competence
    title: Data & analytique
    intro: "Transformer la donnée brute en indicateurs fiables : modélisation, orchestration, calcul distribué."
    requires: [deployer-exploiter, api-messaging]
    units:
      - id: data-analytique
        title: Data & analytique
        intro: "Modélisation en SQL, orchestration, calcul distribué."
        lessons: [dbt, dagster, spark]
        themes: [data-analytique]
        scenarios: [plateforme-data-analytique, devine-airbnb]

  - id: machine-learning
    kind: competence
    title: Machine learning
    intro: "Apprendre à partir des données : les grandes familles, les bibliothèques, puis l'industrialisation des modèles."
    requires: [data-analytique]
    units:
      - id: machine-learning
        title: Machine learning
        intro: "Les familles d'apprentissage, les bibliothèques, puis l'industrialisation."
        lessons:
          [apprentissage-supervise, apprentissage-non-supervise, jupyter, pandas, scikit-learn, xgboost, deep-learning, pytorch, tensorflow, transformer, llm, hugging-face, mlflow, aws-sagemaker, vertex-ai, ray]
        themes: [machine-learning]
        scenarios: [prediction-resiliation]

  - id: llm-ia-generative
    kind: competence
    title: LLM & IA générative
    intro: "Construire avec les grands modèles de langage : API, modèles locaux, recherche vectorielle, RAG, agents, évaluation."
    requires: [machine-learning]
    units:
      - id: llm-ia-generative
        title: LLM & IA générative
        intro: "API, modèles locaux, recherche vectorielle, RAG, agents, évaluation."
        lessons:
          [prompt-engineering, openai-api, claude-api, aws-bedrock, ollama, vllm, embeddings, pgvector, pinecone, qdrant, chroma, weaviate, rag, langchain, llamaindex, agent-llm, mcp, fine-tuning, evaluation-llm, langfuse]
        themes: [llm-ia-generative]
        scenarios: [assistant-documentaire-rag]
---
