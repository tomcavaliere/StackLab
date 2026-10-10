---
title: "Devine la stack : une place de marché mondiale de locations"
type: app-web
brief: |
  Nous mettons en relation des voyageurs et des hôtes partout dans le monde : recherche d'annonces, réservation, paiement, messagerie.
  Nous avons démarré avec une seule grosse application. Avec des centaines d'équipes qui la modifient en même temps,
  chaque mise en production est devenue lente et risquée : nous voulons la découper en services que chaque équipe déploie seule.
  Nos services doivent se prévenir les uns les autres quand une donnée change.
  Nous analysons aussi énormément de données (recherche, prix, confiance), avec des traitements planifiés chaque jour sur des années d'historique.
constraints:
  team: "Plus d'un millier d'ingénieurs, répartis en nombreuses équipes"
  budget: "Grande entreprise : l'infrastructure est un investissement stratégique"
  volume: "Trafic mondial et très saisonnier, historique de données considérable"
  latency: "Recherche et réservation rapides partout dans le monde"
  timeToMarket: "Migration progressive sur plusieurs années, sans interrompre le produit"
requiredLayers: [frontend, backend-api, base-operationnelle, cache-messaging, conteneurs-infra, stockage-analytique, traitement-data, orchestration]
optionalLayers: [mobile, auth, cloud, ci-cd, observabilite]
verdicts:
  frontend:
    - { tech: react, verdict: ideal, why: "Interface riche en composants, partagée par de nombreuses équipes front." }
    - { tech: nextjs, verdict: acceptable, why: "Rendu serveur utile pour le référencement des annonces ; un choix d'architecture front de plus à imposer à toutes les équipes." }
    - { tech: vue, verdict: acceptable, why: "Convient techniquement ; l'écosystème et le vivier de recrutement de React sont plus larges à cette échelle." }
    - { tech: ruby-on-rails, verdict: acceptable, why: "Les vues serveur d'un monolithe : un bon point de départ, difficile à faire évoluer par des centaines d'équipes." }
    - { tech: django, verdict: acceptable, why: "Même remarque que pour Rails : pratique au départ, peu adapté à un front partagé par de nombreuses équipes." }
  mobile:
    - { tech: react-native, verdict: acceptable, why: "Partage de code entre iOS et Android ; avec de solides équipes natives, l'intégration coûte cher : Airbnb l'a abandonné en 2018." }
  backend-api:
    - { tech: spring-boot, verdict: ideal, why: "Services sur la JVM, typés et multithreadés, adaptés à des centaines d'équipes qui déploient indépendamment." }
    - { tech: gin, verdict: ideal, why: "Services Go légers et rapides à déployer en conteneurs." }
    - { tech: ruby-on-rails, verdict: acceptable, why: "Le monolithe d'origine : très productif, mais un déploiement unique pour toute l'entreprise devient le goulot." }
    - { tech: django, verdict: acceptable, why: "Productif, mais même limite qu'un monolithe Rails à cette échelle d'équipes." }
    - { tech: fastapi, verdict: acceptable, why: "Bon pour des services Python, notamment autour des données et du ML." }
    - { tech: nodejs, verdict: acceptable, why: "Adapté à des services dominés par les entrées-sorties, comme une passerelle ou une couche d'API." }
    - { tech: express, verdict: acceptable, why: "Peu de structure imposée pour des centaines d'équipes." }
    - { tech: nextjs, verdict: inadapte, why: "Framework orienté interface, pas un socle de services back-end pour une plateforme de cette taille." }
    - { tech: supabase, verdict: inadapte, why: "Back-end hébergé pensé pour un projet unique, pas pour des centaines de services." }
  auth:
    - { tech: keycloak, verdict: acceptable, why: "Serveur d'identité à opérer soi-même, cohérent avec une équipe infrastructure dédiée." }
    - { tech: auth0, verdict: acceptable, why: "Délègue l'identité, avec une facture par utilisateur actif considérable à cette échelle." }
    - { tech: ruby-on-rails, verdict: acceptable, why: "Seulement tant que l'authentification vit dans le monolithe." }
    - { tech: django, verdict: acceptable, why: "Seulement si l'application principale est en Django." }
    - { tech: supabase, verdict: inadapte, why: "Authentification liée à un back-end hébergé de projet unique." }
  base-operationnelle:
    - { tech: mysql, verdict: ideal, why: "Relationnel éprouvé à très grande échelle, avec des bases réparties par domaine de service." }
    - { tech: postgresql, verdict: ideal, why: "Même rôle que MySQL : transactions pour les réservations et les paiements." }
    - { tech: cassandra, verdict: acceptable, why: "Pour certains volumes d'écriture massifs ; réservations et paiements demandent des transactions." }
    - { tech: dynamodb, verdict: acceptable, why: "Clé-valeur managé pour certains services ; pas pour les données très reliées." }
    - { tech: mongodb, verdict: acceptable, why: "Possible pour certains services ; les données de réservation sont très relationnelles." }
    - { tech: supabase, verdict: inadapte, why: "Back-end hébergé de projet unique, sans rapport avec une flotte de services." }
  cache-messaging:
    - { tech: kafka, verdict: ideal, why: "Les services publient leurs changements de données comme événements, consommés par les autres services et la plateforme data." }
    - { tech: redis, verdict: ideal, why: "Cache et données chaudes partagées entre services." }
    - { tech: memcached, verdict: acceptable, why: "Bon cache de lecture, sans structures de données ni persistance." }
    - { tech: rabbitmq, verdict: acceptable, why: "Messagerie fiable entre services, sans le journal rejouable utile à la plateforme data." }
    - { tech: celery, verdict: inadapte, why: "File de tâches propre à une application Python, pas un bus d'événements entre des centaines de services." }
  stockage-analytique:
    - { tech: aws-s3, verdict: ideal, why: "Data lake sur stockage objet : bon marché, durable, lisible par plusieurs moteurs." }
    - { tech: snowflake, verdict: acceptable, why: "Entrepôt managé possible ; à cette échelle, certaines entreprises préfèrent opérer leur propre lakehouse sur stockage objet." }
    - { tech: bigquery, verdict: acceptable, why: "Entrepôt serverless, mais lié à Google Cloud alors que le reste de l'infrastructure est ailleurs." }
    - { tech: duckdb, verdict: inadapte, why: "Moteur d'une seule machine, sans rapport avec le volume de données d'une plateforme mondiale." }
  traitement-data:
    - { tech: spark, verdict: ideal, why: "Traitements distribués sur des années d'historique, en SQL comme en Python." }
    - { tech: dbt, verdict: acceptable, why: "Très bien pour les transformations SQL ; une partie des traitements (événements, ML) dépasse le SQL d'entrepôt." }
    - { tech: duckdb, verdict: inadapte, why: "Une seule machine : insuffisant pour ces volumes." }
  orchestration:
    - { tech: airflow, verdict: ideal, why: "Graphes de tâches planifiées avec dépendances et reprises, exactement le besoin des traitements quotidiens." }
    - { tech: dagster, verdict: acceptable, why: "Mêmes garanties, centré sur les assets ; moins répandu, et une migration coûteuse si un orchestrateur existe déjà." }
  conteneurs-infra:
    - { tech: kubernetes, verdict: ideal, why: "Une plateforme commune pour déployer des centaines de services de façon standard." }
    - { tech: docker, verdict: ideal, why: "Images de conteneurs, base du déploiement de chaque service." }
  cloud:
    - { tech: aws, verdict: ideal, why: "Calcul, stockage et services managés à l'échelle mondiale." }
    - { tech: aws-s3, verdict: ideal, why: "Stockage objet pour les données, les fichiers et les instantanés de configuration." }
    - { tech: heroku, verdict: inadapte, why: "PaaS trop limité et trop coûteux pour une plateforme de cette taille." }
    - { tech: vercel, verdict: inadapte, why: "Hébergement de fronts et de fonctions courtes, pas d'une flotte de services." }
  ci-cd:
    - { tech: github-actions, verdict: acceptable, why: "Convient ; à cette échelle, beaucoup d'entreprises opèrent aussi une CI interne pour des milliers de builds." }
  observabilite:
    - { tech: prometheus, verdict: ideal, why: "Métriques et alertes de centaines de services sur Kubernetes." }
    - { tech: grafana, verdict: ideal, why: "Tableaux de bord partagés par les équipes et l'astreinte." }
    - { tech: sentry, verdict: acceptable, why: "Utile pour les erreurs applicatives, mais ne remplace pas les métriques d'infrastructure." }
antiPatterns:
  - { techs: [heroku, kubernetes], penalty: 10, why: "Un PaaS et un orchestrateur de conteneurs : deux façons incompatibles d'exécuter les mêmes services." }
  - { techs: [snowflake, bigquery], penalty: 10, why: "Deux entrepôts pour les mêmes données : deux vérités qui divergent." }
  - { techs: [airflow, dagster], penalty: 10, why: "Deux orchestrateurs : les dépendances entre traitements sont coupées en deux." }
referenceStack:
  frontend: [react]
  backend-api: [spring-boot, ruby-on-rails]
  base-operationnelle: [mysql]
  cache-messaging: [kafka, redis]
  stockage-analytique: [aws-s3]
  traitement-data: [spark]
  orchestration: [airflow]
  conteneurs-infra: [docker, kubernetes]
  cloud: [aws]
  observabilite: [prometheus]
---

## Ce qui compte vraiment ici

Ici, ce qui limite l'entreprise, c'est **l'organisation** plus que la charge technique : des centaines d'équipes qui modifient le même code. La réponse est une architecture de services déployés indépendamment, sur une plateforme commune, avec une plateforme data capable de traiter des années d'historique.

## Le raisonnement

- **Du monolithe aux services.** Un monolithe (comme le « Monorail » en Rails d'Airbnb) est le bon point de départ. Au-delà d'une certaine taille d'équipe, on le découpe en services, ici majoritairement sur la JVM, et chacun possède ses données.
- **Des événements entre services.** Quand un service modifie ses données, il publie un événement (Kafka) que les autres services et la plateforme data consomment.
- **Une plateforme commune.** Kubernetes standardise le déploiement de centaines de services, et Prometheus en surveille les métriques.
- **Un data lake.** Les données atterrissent sur du stockage objet (S3), sont traitées par Spark et orchestrées par Airflow, un outil né chez Airbnb pour ce besoin.

Compare ta stack à la vraie stack d'Airbnb ci-dessus : chaque techno y est accompagnée de sa source.
