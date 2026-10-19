---
title: "API à fort trafic : suivi des livraisons en temps réel"
type: api
brief: |
  Nous sommes une plateforme de livraison de repas. Les applications des clients et des livreurs interrogent en permanence
  la position des livreurs et l'état des commandes. Aux heures des repas, le trafic explose et notre système actuel
  ralentit, parfois jusqu'à tomber.
  Il nous faut un service qui encaisse ces pics sans ralentir, qui prévienne nos autres services (facturation, notifications)
  dès qu'une commande change d'état, et qui reste disponible même si une machine tombe.
  Notre équipe technique est expérimentée et nous avons une équipe dédiée à l'infrastructure.
constraints:
  team: "15 développeurs, dont une équipe plateforme"
  budget: "Confortable : une panne coûte plus cher que l'infrastructure"
  volume: "Pics très marqués aux heures des repas, plusieurs centaines de milliers de commandes par jour"
  latency: "Réponses quasi instantanées attendues par les applications mobiles"
  timeToMarket: "6 mois, refonte progressive du système existant"
requiredLayers: [backend-api, base-operationnelle, cache-messaging]
optionalLayers: [conteneurs-infra, cloud, observabilite, ci-cd, auth]
verdicts:
  backend-api:
    - { tech: gin, verdict: ideal, why: "Binaire léger et goroutines : beaucoup de connexions simultanées par instance, et des instances qui démarrent vite pour absorber les pics." }
    - { tech: spring-boot, verdict: ideal, why: "Éprouvé à fort trafic, avec un écosystème complet (Kafka, métriques via l'Actuator) pour une équipe expérimentée." }
    - { tech: nodejs, verdict: acceptable, why: "Bien adapté à une API dominée par les entrées-sorties ; un calcul imprévu dans une requête bloque tout le processus." }
    - { tech: express, verdict: acceptable, why: "Tient la charge pour des entrées-sorties, mais impose peu de structure à 15 développeurs." }
    - { tech: fastapi, verdict: acceptable, why: "Asynchrone et productif ; à fort trafic, Python demande plus d'attention aux performances qu'un langage compilé." }
    - { tech: django, verdict: acceptable, why: "Peut tenir la charge avec un vrai travail d'optimisation, mais ses atouts (admin, gabarits, formulaires) ne servent pas pour une API pure." }
    - { tech: ruby-on-rails, verdict: acceptable, why: "Même remarque que Django : productif, mais ses atouts ne servent pas ici et la montée en charge demande un effort." }
    - { tech: nextjs, verdict: inadapte, why: "Framework orienté interface : ses routes d'API ne sont pas faites pour un service à fort trafic consommé par des applications mobiles." }
    - { tech: supabase, verdict: inadapte, why: "Une API générée sur la base ne donne pas le contrôle nécessaire pour encaisser les pics ni pour publier des événements métier." }
    - { tech: nestjs, verdict: acceptable, why: "Node.js structuré en modules, adapté à 15 développeurs et à une API dominée par les entrées-sorties ; un calcul imprévu bloque toujours le processus." }
    - { tech: laravel, verdict: acceptable, why: "Même remarque que Rails : productif, mais ses atouts (vues, kits de démarrage) ne servent pas pour une API pure, et la montée en charge demande un effort." }
  base-operationnelle:
    - { tech: cassandra, verdict: ideal, why: "Écritures continues des positions, accès par clé (livreur, commande), disponibilité même si un nœud tombe : son cas d'usage type." }
    - { tech: dynamodb, verdict: ideal, why: "Mêmes atouts sans cluster à opérer, si l'on accepte la dépendance à AWS." }
    - { tech: postgresql, verdict: acceptable, why: "Excellent pour les commandes et leurs transactions ; les écritures continues des positions sur un seul serveur principal demanderont un cache ou du partitionnement." }
    - { tech: mysql, verdict: acceptable, why: "Même profil que PostgreSQL : solide pour les commandes, à compléter pour les positions." }
    - { tech: mongodb, verdict: acceptable, why: "Sharding intégré et écritures par document rapides ; le choix de la clé de partition est décisif et difficile à changer ensuite." }
    - { tech: supabase, verdict: acceptable, why: "C'est un PostgreSQL hébergé : mêmes limites que PostgreSQL, et ses API générées ne servent pas ici." }
    - { tech: sqlite, verdict: inadapte, why: "Un fichier sur une seule machine, un seul écrivain à la fois : impossible avec des écritures continues venues de nombreuses instances." }
    - { tech: elasticsearch, verdict: inadapte, why: "Moteur de recherche, pas la base de référence des commandes : pas de transactions, et des écritures visibles après un délai." }
  cache-messaging:
    - { tech: redis, verdict: ideal, why: "Position courante des livreurs et état des commandes en mémoire : les lectures répétées ne touchent plus la base." }
    - { tech: kafka, verdict: ideal, why: "Chaque changement d'état devient un événement que facturation et notifications consomment à leur rythme, et qu'on peut rejouer après une panne." }
    - { tech: rabbitmq, verdict: acceptable, why: "Prévient les autres services de façon fiable, sans le journal rejouable partagé par de nombreux consommateurs." }
    - { tech: memcached, verdict: acceptable, why: "Bon cache de lecture, mais sans les structures (géolocalisation, compteurs) ni le pub/sub utiles pour les positions." }
    - { tech: celery, verdict: inadapte, why: "File de tâches de fond pour une application Python, pas un bus d'événements entre services." }
  conteneurs-infra:
    - { tech: kubernetes, verdict: ideal, why: "Mise à l'échelle automatique aux heures des repas et redémarrage des instances en panne ; l'équipe plateforme peut l'opérer." }
    - { tech: docker, verdict: ideal, why: "Des images identiques du poste à la production, base du déploiement sur Kubernetes." }
    - { tech: terraform, verdict: ideal, why: "Clusters, bases et réseaux décrits en code et revus en pull request : des environnements reproductibles, gérés par l'équipe plateforme." }
    - { tech: nginx, verdict: acceptable, why: "Reverse proxy et répartition de charge devant les instances ; sur Kubernetes, un contrôleur Ingress ou le répartiteur du cloud tient souvent ce rôle." }
  cloud:
    - { tech: aws, verdict: ideal, why: "Bases, Kafka et Kubernetes managés, et plusieurs zones de disponibilité pour résister à la panne d'un datacenter." }
    - { tech: aws-s3, verdict: acceptable, why: "Utile pour archiver l'historique des positions, mais pas au cœur du besoin." }
    - { tech: heroku, verdict: inadapte, why: "Le PaaS limite le contrôle (réseau, placement, services data) et devient coûteux à cette échelle." }
    - { tech: vercel, verdict: inadapte, why: "Pensé pour des fronts et des fonctions courtes, pas pour une API à fort trafic avec des connexions persistantes." }
    - { tech: aws-lambda, verdict: acceptable, why: "Absorbe les pics sans serveur à gérer, mais sans connexions persistantes, avec des démarrages à froid et un coût à surveiller sous trafic soutenu." }
  observabilite:
    - { tech: prometheus, verdict: ideal, why: "Taux d'erreurs et latence de chaque service, avec des alertes avant que les pics ne fassent tomber l'API." }
    - { tech: grafana, verdict: ideal, why: "Les pics visibles en direct pour l'équipe d'astreinte." }
    - { tech: sentry, verdict: acceptable, why: "Utile pour les erreurs applicatives, mais ne montre ni la saturation ni la latence globale." }
    - { tech: elasticsearch, verdict: acceptable, why: "Centralise et fouille les journaux de tous les services ; ne remplace ni les métriques ni les alertes de latence." }
    - { tech: langfuse, verdict: inadapte, why: "Trace les appels à des modèles de langage, alors que cette API n'en fait aucun : ses besoins sont des métriques, des journaux et des erreurs." }
  ci-cd:
    - { tech: github-actions, verdict: ideal, why: "Des déploiements fréquents et automatisés, indispensables à 15 développeurs sur plusieurs services." }
  auth:
    - { tech: keycloak, verdict: acceptable, why: "Fédère les comptes clients, livreurs et internes ; l'équipe plateforme peut l'opérer." }
    - { tech: auth0, verdict: acceptable, why: "Délègue l'identité ; la facture par utilisateur actif est à surveiller à cette échelle." }
    - { tech: django, verdict: acceptable, why: "Seulement si l'API est écrite en Django ; dans une architecture de services, un service d'identité commun est plus naturel." }
    - { tech: ruby-on-rails, verdict: acceptable, why: "Seulement si l'API est écrite en Rails ; sinon un service d'identité commun est plus naturel." }
    - { tech: supabase, verdict: acceptable, why: "Authentification hébergée liée à une base Supabase, peu naturelle dans une architecture de services." }
    - { tech: laravel, verdict: acceptable, why: "Seulement si l'API est écrite en Laravel ; sinon un service d'identité commun est plus naturel." }
antiPatterns:
  - { techs: [kafka, rabbitmq], penalty: 10, why: "Deux systèmes de messagerie pour le même besoin d'événements : double exploitation, aucun gain." }
  - { techs: [redis, memcached], penalty: 5, why: "Deux caches en mémoire : Redis couvre déjà le cache simple." }
  - { techs: [heroku, kubernetes], penalty: 10, why: "Un PaaS et un orchestrateur de conteneurs : deux façons incompatibles d'exécuter les mêmes services." }
referenceStack:
  backend-api: [gin]
  base-operationnelle: [postgresql, cassandra]
  cache-messaging: [redis, kafka]
  conteneurs-infra: [docker, kubernetes]
  cloud: [aws]
  observabilite: [prometheus, grafana]
  ci-cd: [github-actions]
---

## Ce qui compte vraiment ici

Le trafic est **très inégal** : il faut tenir les pics des heures de repas sans payer cette capacité toute la journée, et **ne jamais tomber**. L'équipe est expérimentée et dispose d'une équipe plateforme : la complexité d'exploitation est un coût acceptable, contrairement à un MVP.

## Le raisonnement

- **Séparer les deux natures de données.** Les commandes demandent des transactions (paiement, changement d'état) : PostgreSQL convient. Les positions des livreurs sont un flux d'écritures continu, lu par clé : Cassandra ou DynamoDB sont faits pour ça.
- **Protéger la base avec un cache.** La position courante et l'état des commandes sont relus en permanence par les applications. Les servir depuis Redis évite que chaque rafraîchissement touche la base.
- **Découpler par des événements.** Quand une commande change d'état, l'API publie un événement dans Kafka. Facturation et notifications le consomment à leur rythme. Si l'un d'eux tombe, il reprend là où il en était, sans ralentir l'API.
- **Une API légère et nombreuse.** Un service en Go (Gin) ou sur la JVM (Spring Boot) démarre en conteneurs que Kubernetes multiplie aux heures de pointe. Prometheus et Grafana montrent la saturation avant qu'elle ne devienne une panne.

## Les pièges

- **Tout mettre dans une seule base relationnelle.** C'est très bien pour les commandes, mais les écritures continues des positions finissent par saturer le serveur principal.
- **Un PaaS par habitude.** À cette échelle, il limite le contrôle et coûte cher.
- **Doubler les briques.** Deux systèmes de messagerie ou deux caches doublent l'exploitation sans rien apporter.
