---
title: "Devine la stack : un réseau social de partage de photos"
type: app-mobile
brief: |
  Notre application mobile permet de partager des photos et de suivre ses amis. Elle a explosé dès son lancement,
  et nous comptons aujourd'hui des centaines de millions d'utilisateurs.
  Le fil d'actualité, les profils et les commentaires sont relus en permanence ; les likes et l'activité s'écrivent en masse.
  Notre équipe a démarré toute petite et veut rester productive avec un langage simple, tout en tenant la charge.
  Nous devons aussi fonctionner depuis plusieurs datacenters à la fois.
constraints:
  team: "Une petite équipe au départ, devenue plusieurs centaines d'ingénieurs"
  budget: "Croissance très rapide : l'infrastructure doit suivre"
  volume: "Des centaines de millions d'utilisateurs, lectures massives du fil"
  latency: "Fil et photos quasi instantanés"
  timeToMarket: "Plusieurs mises en production par jour"
requiredLayers: [mobile, backend-api, base-operationnelle, cache-messaging]
optionalLayers: [frontend, cloud, conteneurs-infra, observabilite, ci-cd]
verdicts:
  mobile:
    - { tech: react-native, verdict: acceptable, why: "Pratique pour certains écrans partagés entre iOS et Android ; le cœur de l'application reste natif (pas de carte native dans la pioche)." }
    - { tech: flutter, verdict: acceptable, why: "Une base de code pour iOS et Android ; le cœur d'une application de cette envergure reste en général natif (pas de carte native dans la pioche)." }
  frontend:
    - { tech: react, verdict: ideal, why: "Version web interactive du fil et des profils." }
    - { tech: nextjs, verdict: acceptable, why: "Rendu serveur utile pour les pages publiques ; une brique de plus à côté du back-end principal." }
    - { tech: vue, verdict: acceptable, why: "Convient pour une version web interactive." }
    - { tech: django, verdict: acceptable, why: "Gabarits serveur : possible pour des pages simples, limité pour un web très interactif." }
    - { tech: ruby-on-rails, verdict: acceptable, why: "Vues serveur : même remarque que Django." }
    - { tech: angular, verdict: acceptable, why: "Convient pour une version web interactive ; un cadre lourd pour une équipe qui a démarré toute petite." }
    - { tech: svelte, verdict: acceptable, why: "Convient pour une version web interactive." }
    - { tech: laravel, verdict: acceptable, why: "Vues serveur : même remarque que Django." }
  backend-api:
    - { tech: django, verdict: ideal, why: "Python et Django : la productivité d'une petite équipe, qui monte en charge avec un vrai travail d'optimisation." }
    - { tech: ruby-on-rails, verdict: acceptable, why: "Même productivité ; même effort d'optimisation à prévoir à cette échelle." }
    - { tech: fastapi, verdict: acceptable, why: "API Python asynchrone ; sans l'administration ni l'écosystème complet de Django." }
    - { tech: nodejs, verdict: acceptable, why: "Adapté aux nombreuses entrées-sorties d'un fil d'actualité." }
    - { tech: express, verdict: acceptable, why: "Léger, mais tout est à structurer soi-même." }
    - { tech: spring-boot, verdict: acceptable, why: "Tient très bien la charge ; moins rapide à faire évoluer pour une toute petite équipe au départ." }
    - { tech: gin, verdict: acceptable, why: "Performant ; moins productif qu'un framework complet pour une petite équipe qui itère vite." }
    - { tech: nextjs, verdict: inadapte, why: "Framework orienté interface, pas le back-end d'une application mobile à cette échelle." }
    - { tech: supabase, verdict: inadapte, why: "Back-end hébergé de projet unique, pas conçu pour la logique de fil et de compteurs à cette échelle." }
    - { tech: nestjs, verdict: acceptable, why: "Adapté aux nombreuses entrées-sorties d'un fil d'actualité ; sa structure imposée ralentit une toute petite équipe au départ." }
    - { tech: laravel, verdict: acceptable, why: "Productif pour une petite équipe ; même effort d'optimisation à prévoir que Rails à cette échelle." }
  base-operationnelle:
    - { tech: postgresql, verdict: ideal, why: "Utilisateurs, photos et relations sont des données relationnelles, qu'on partitionne sur de nombreux serveurs." }
    - { tech: cassandra, verdict: ideal, why: "Écritures massives (fil, activité) réparties et répliquées entre plusieurs datacenters." }
    - { tech: mysql, verdict: ideal, why: "Relationnel éprouvé à très grande échelle, même rôle que PostgreSQL." }
    - { tech: mongodb, verdict: acceptable, why: "Possible, mais les relations entre utilisateurs, photos et abonnements sont très structurées." }
    - { tech: dynamodb, verdict: acceptable, why: "Clé-valeur managé qui tient la charge ; modélisation contrainte et dépendance à AWS." }
    - { tech: supabase, verdict: inadapte, why: "Back-end hébergé de projet unique, pas à cette échelle." }
    - { tech: elasticsearch, verdict: acceptable, why: "Recherche d'utilisateurs et de hashtags à côté de la base principale ; pas la base de référence." }
    - { tech: sqlite, verdict: inadapte, why: "Un fichier sur une seule machine, un seul écrivain à la fois : sans rapport avec des centaines de millions d'utilisateurs." }
  cache-messaging:
    - { tech: memcached, verdict: ideal, why: "Cache de lecture massif devant les bases : le fil et les profils sont relus sans cesse." }
    - { tech: redis, verdict: ideal, why: "Cache, compteurs et listes (fil d'activité) en mémoire." }
    - { tech: rabbitmq, verdict: acceptable, why: "Tâches asynchrones (notifications, traitements) sorties de la requête." }
    - { tech: celery, verdict: acceptable, why: "Tâches de fond naturelles pour un back-end Django." }
    - { tech: kafka, verdict: acceptable, why: "Utile pour diffuser les événements d'activité ; lourd si le besoin se limite à des tâches de fond." }
  cloud:
    - { tech: aws-s3, verdict: ideal, why: "Stockage des photos, durable et servi via un CDN." }
    - { tech: aws, verdict: acceptable, why: "Permet une croissance très rapide sans acheter de matériel ; à très grande échelle, certaines entreprises migrent vers leurs propres datacenters." }
    - { tech: heroku, verdict: inadapte, why: "PaaS trop limité et trop coûteux pour des centaines de millions d'utilisateurs." }
    - { tech: vercel, verdict: inadapte, why: "Hébergement de fronts, pas du back-end d'une application mobile." }
    - { tech: aws-lambda, verdict: acceptable, why: "Utile pour des traitements déclenchés par l'envoi d'une photo (miniatures) ; pas pour le back-end principal." }
  conteneurs-infra:
    - { tech: docker, verdict: acceptable, why: "Environnements reproductibles ; pas au cœur du besoin." }
    - { tech: kubernetes, verdict: acceptable, why: "Standardise le déploiement ; les très grandes entreprises ont souvent leur propre plateforme interne." }
    - { tech: terraform, verdict: acceptable, why: "Infrastructure reproductible décrite en code ; utile, mais pas au cœur du besoin." }
    - { tech: nginx, verdict: acceptable, why: "Reverse proxy et répartition de charge devant les serveurs d'application ; une brique utile, pas au cœur du besoin." }
  observabilite:
    - { tech: prometheus, verdict: ideal, why: "Métriques de charge et de latence, indispensables à cette croissance." }
    - { tech: grafana, verdict: ideal, why: "Tableaux de bord de charge pour l'équipe d'astreinte." }
    - { tech: sentry, verdict: acceptable, why: "Erreurs applicatives, mais pas les métriques de charge." }
    - { tech: elasticsearch, verdict: acceptable, why: "Journaux centralisés et interrogeables ; ne remplace pas les métriques de charge." }
  ci-cd:
    - { tech: github-actions, verdict: acceptable, why: "Déploiements fréquents automatisés ; les très grandes entreprises ont souvent une CI interne." }
antiPatterns:
  - { techs: [heroku, kubernetes], penalty: 10, why: "Un PaaS et un orchestrateur de conteneurs : deux façons incompatibles d'exécuter le même back-end." }
  - { techs: [nextjs, supabase], penalty: 10, why: "Une stack de prototype web pour une application mobile de centaines de millions d'utilisateurs." }
referenceStack:
  mobile: [react-native]
  backend-api: [django]
  base-operationnelle: [postgresql, cassandra]
  cache-messaging: [memcached]
  cloud: [aws-s3]
---

## Ce qui compte vraiment ici

Une croissance fulgurante avec une équipe minuscule au départ : il faut **un langage et un framework productifs**, puis **beaucoup de cache et des bases partitionnées** pour tenir des lectures massives. Plus tard s'ajoute la réplication entre datacenters.

## Le raisonnement

- **Un framework productif, optimisé ensuite.** Instagram a choisi Python et Django, et en exploite l'un des plus grands déploiements au monde. Plutôt que de changer de langage, l'entreprise a investi dans l'optimisation de son serveur Python.
- **Deux bases complémentaires.** PostgreSQL pour les données relationnelles, Cassandra pour les écritures massives répliquées entre datacenters.
- **Le cache d'abord.** Le fil et les profils sont relus sans cesse : un cache memcache par région absorbe ces lectures.
- **Le mobile natif, React Native par endroits.** L'application est native, avec React Native adopté progressivement pour certains écrans.

Compare ta stack à la vraie stack d'Instagram ci-dessus : attention, la plupart des sources ont plus de 3 ans.
