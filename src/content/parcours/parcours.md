---
# Le parcours guidé : un seul chemin, dans l'ordre. Chaque unité enchaîne ses leçons (fiche + quiz de la fiche),
# puis ses quiz de thème, puis ses scénarios. Règles de validation : CLAUDE.md, section « Parcours ».
# Chaque fiche figure exactement une fois ; un thème ne cite que des technos vues dans son unité ou avant (vérifié au build).
units:
  - id: langages
    title: Langages
    intro: "Ce dans quoi on écrit le code. Chaque framework et chaque outil qui suit s'appuie sur l'un d'eux."
    lessons: [sql, python, javascript, typescript, java, go, php, ruby, kotlin, swift, dart, rust]
    themes: [langages]
    scenarios: []

  - id: frameworks
    title: Frameworks web & mobile
    intro: "Les boîtes à outils qui structurent une application : interface web, API, app mobile."
    lessons:
      [nodejs, express, react, vue, svelte, nextjs, angular, fastapi, django, laravel, ruby-on-rails, nestjs, gin, spring-boot, react-native, flutter]
    themes: [frameworks]
    scenarios: []

  - id: bases-de-donnees
    title: Bases de données
    intro: "Où la donnée vit : base relationnelle, documents, clé-valeur, recherche, puis entrepôts analytiques."
    lessons:
      [sqlite, postgresql, mysql, mongodb, supabase, redis, memcached, dynamodb, cassandra, elasticsearch, duckdb, clickhouse, bigquery, snowflake]
    themes: [bases-de-donnees]
    scenarios: []

  - id: deployer-exploiter
    title: Déployer & exploiter
    intro: "Mettre l'application en ligne, la sécuriser et la surveiller : conteneurs, hébergement, CI/CD, auth, cloud, supervision."
    lessons:
      [docker, nginx, vercel, heroku, github-actions, sentry, auth0, keycloak, aws, aws-s3, aws-lambda, terraform, kubernetes, prometheus, grafana]
    themes: [infra-ops]
    scenarios: [mvp-saas-web]

  - id: api-messaging
    title: API & messaging
    intro: "Comment les services se parlent : styles d'API, temps réel, files de messages et tâches de fond."
    lessons: [rest, graphql, websocket, grpc, rabbitmq, kafka, celery, airflow]
    themes: [api-communication, cache-messaging]
    scenarios: [api-fort-trafic, devine-instagram]

  - id: data-analytique
    title: Data & analytique
    intro: "Transformer la donnée brute en indicateurs fiables : modélisation, orchestration, calcul distribué."
    lessons: [dbt, dagster, spark]
    themes: [data-analytique]
    scenarios: [plateforme-data-analytique, devine-airbnb]

  - id: machine-learning
    title: Machine learning
    intro: "Apprendre à partir des données : les grandes familles, les bibliothèques, puis l'industrialisation des modèles."
    lessons:
      [apprentissage-supervise, apprentissage-non-supervise, pandas, scikit-learn, xgboost, deep-learning, pytorch, tensorflow, transformer, llm, hugging-face, mlflow, aws-sagemaker, vertex-ai, ray]
    themes: [machine-learning]
    scenarios: [prediction-resiliation]

  - id: llm-ia-generative
    title: LLM & IA générative
    intro: "Construire avec les grands modèles de langage : API, modèles locaux, recherche vectorielle, RAG, agents, évaluation."
    lessons:
      [prompt-engineering, openai-api, claude-api, aws-bedrock, ollama, vllm, embeddings, pgvector, pinecone, qdrant, chroma, weaviate, rag, langchain, llamaindex, agent-llm, mcp, fine-tuning, evaluation-llm, langfuse]
    themes: [llm-ia-generative]
    scenarios: [assistant-documentaire-rag]
---
