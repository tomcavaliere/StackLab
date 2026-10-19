---
title: "MVP SaaS : réservation de cours pour studios de yoga"
type: saas
brief: |
  Je gère trois studios de yoga et je ne trouve aucun outil simple pour que mes élèves réservent leurs cours.
  Je veux un site où les élèves créent un compte, voient le planning de la semaine, réservent ou annulent une place.
  Les professeurs doivent pouvoir modifier leurs cours, et moi gérer les abonnements depuis une page d'administration.
  Si ça marche, je le proposerai à d'autres studios contre un abonnement mensuel.
  Je veux pouvoir le montrer à d'autres studios dans trois mois, avec un budget serré.
constraints:
  team: "2 développeurs full-stack"
  budget: "Serré : quelques dizaines d'euros par mois d'hébergement au début"
  volume: "Quelques centaines d'utilisateurs la première année"
  latency: "Usage confortable, sans contrainte forte"
  timeToMarket: "3 mois pour une première version"
requiredLayers: [frontend, backend-api, base-operationnelle, auth]
optionalLayers: [cloud, ci-cd, observabilite, conteneurs-infra]
verdicts:
  frontend:
    - { tech: django, verdict: ideal, why: "Pages rendues par les gabarits Django : une seule application à développer et à déployer." }
    - { tech: ruby-on-rails, verdict: ideal, why: "Vues Rails et Hotwire : une interface réactive sans application front séparée." }
    - { tech: nextjs, verdict: ideal, why: "Un seul projet pour l'interface et une API légère, simple à déployer." }
    - { tech: react, verdict: acceptable, why: "Interface riche, mais une application front séparée à maintenir en plus de l'API : beaucoup pour 2 développeurs et 3 mois." }
    - { tech: vue, verdict: acceptable, why: "Même remarque que React : une deuxième application à maintenir, sans besoin d'interface très riche." }
    - { tech: laravel, verdict: ideal, why: "Vues Blade rendues côté serveur, ou Livewire pour l'interactivité : une seule application, comme avec Django ou Rails." }
    - { tech: svelte, verdict: acceptable, why: "Léger et vite pris en main, mais une application front séparée à maintenir en plus de l'API." }
    - { tech: angular, verdict: surdimensionne, why: "Cadre complet pensé pour de grosses applications et plusieurs équipes : lourd à apprendre pour 2 développeurs, et une application front séparée en plus." }
  backend-api:
    - { tech: django, verdict: ideal, why: "Admin, authentification et ORM fournis : le back-office des abonnements est presque gratuit." }
    - { tech: ruby-on-rails, verdict: ideal, why: "Conçu pour ce cas : une application CRUD complète livrée vite par une petite équipe." }
    - { tech: nextjs, verdict: acceptable, why: "Les routes d'API suffisent au début, mais l'administration et la logique métier sont à écrire à la main." }
    - { tech: supabase, verdict: acceptable, why: "API générée et très rapide à démarrer ; les règles métier (annulation, quotas d'abonnement) se dispersent entre SQL et fonctions." }
    - { tech: fastapi, verdict: acceptable, why: "Bonne API, mais sans administration ni authentification intégrées : le back-office est à construire." }
    - { tech: express, verdict: acceptable, why: "Tout est à assembler (ORM, authentification, administration) : du temps pris sur le produit." }
    - { tech: nodejs, verdict: acceptable, why: "Environnement d'exécution seul : il faut choisir et assembler un framework par-dessus." }
    - { tech: spring-boot, verdict: surdimensionne, why: "Robuste mais lourd à mettre en place pour 2 développeurs et un MVP à 3 mois." }
    - { tech: gin, verdict: surdimensionne, why: "Des performances inutiles ici, et tout à assembler (administration, authentification, ORM)." }
    - { tech: laravel, verdict: ideal, why: "ORM, migrations, files d'attente et e-mails fournis : une application CRUD complète livrée vite par une petite équipe." }
    - { tech: nestjs, verdict: acceptable, why: "Back-end TypeScript bien structuré, mais sans administration ni rendu de pages : le back-office est à construire, et la structure imposée pèse pour 2 développeurs." }
  base-operationnelle:
    - { tech: postgresql, verdict: ideal, why: "Données très reliées (studios, cours, élèves, réservations, abonnements) : le relationnel s'impose, et c'est la base par défaut des PaaS." }
    - { tech: supabase, verdict: ideal, why: "Un PostgreSQL hébergé avec l'authentification incluse : très rapide à démarrer." }
    - { tech: mysql, verdict: acceptable, why: "Relationnel aussi, il convient tout à fait à ce volume ; PostgreSQL est simplement le choix par défaut le plus courant aujourd'hui." }
    - { tech: mongodb, verdict: acceptable, why: "Fonctionne, mais une réservation relie un élève, un cours et un abonnement : on recode jointures et intégrité dans l'application." }
    - { tech: cassandra, verdict: surdimensionne, why: "Conçue pour des écritures massives réparties sur un cluster ; le planning s'interroge de plusieurs façons, difficiles à modéliser sans jointures." }
    - { tech: dynamodb, verdict: surdimensionne, why: "Modélisation par clés contraignante pour un planning interrogé de plusieurs façons, et dépendance à AWS sans bénéfice à ce volume." }
    - { tech: sqlite, verdict: acceptable, why: "Suffit largement à quelques centaines d'utilisateurs sur un seul serveur ; incompatible avec le disque éphémère d'un PaaS comme Heroku ou avec plusieurs instances." }
    - { tech: elasticsearch, verdict: inadapte, why: "Moteur de recherche, pas une base transactionnelle : réservations et abonnements ont besoin de transactions." }
  auth:
    - { tech: django, verdict: ideal, why: "django.contrib.auth : comptes, mots de passe et permissions (professeurs, administratrice) déjà là." }
    - { tech: ruby-on-rails, verdict: ideal, why: "Générateur d'authentification de Rails 8 ou gem Devise : couvert en quelques heures." }
    - { tech: supabase, verdict: ideal, why: "Authentification hébergée incluse, reliée à la base et à ses règles d'accès." }
    - { tech: auth0, verdict: acceptable, why: "Fiable et rapide à brancher, mais un service payant de plus pour un besoin que le framework couvre déjà." }
    - { tech: keycloak, verdict: surdimensionne, why: "Un serveur d'identité à opérer et à sécuriser pour quelques centaines de comptes." }
    - { tech: laravel, verdict: ideal, why: "Les kits de démarrage fournissent d'emblée inscription, connexion et réinitialisation du mot de passe." }
  cloud:
    - { tech: heroku, verdict: ideal, why: "Un git push et une base PostgreSQL managée : aucune exploitation pour 2 développeurs." }
    - { tech: vercel, verdict: acceptable, why: "Idéal avec Next.js ; pour un back-end Django ou Rails avec base et tâches de fond, un PaaS généraliste convient mieux." }
    - { tech: aws-s3, verdict: acceptable, why: "Utile seulement pour stocker des fichiers (photos, factures PDF) ; rien dans le besoin ne l'exige encore." }
    - { tech: aws, verdict: surdimensionne, why: "Réseau, droits IAM et services à configurer pour une seule application : du temps qu'un PaaS évite." }
    - { tech: aws-lambda, verdict: surdimensionne, why: "Découper l'application en fonctions et configurer déclencheurs et droits IAM, quand un PaaS l'héberge telle quelle." }
  ci-cd:
    - { tech: github-actions, verdict: ideal, why: "Tests à chaque push et déploiement automatique ; le quota gratuit suffit en général au démarrage." }
  observabilite:
    - { tech: sentry, verdict: ideal, why: "Savoir qu'une réservation plante avant qu'une élève n'appelle le studio." }
    - { tech: prometheus, verdict: surdimensionne, why: "Une infrastructure de métriques à opérer pour une seule application à faible trafic." }
    - { tech: grafana, verdict: surdimensionne, why: "Des tableaux de bord d'infrastructure sans infrastructure à surveiller : l'hébergeur fournit déjà l'essentiel." }
    - { tech: elasticsearch, verdict: surdimensionne, why: "Un cluster de journaux à opérer pour une seule application : les journaux de l'hébergeur suffisent." }
    - { tech: langfuse, verdict: inadapte, why: "Trace des appels à des modèles de langage : l'application de réservation n'en fait aucun." }
  conteneurs-infra:
    - { tech: docker, verdict: acceptable, why: "Pratique pour avoir le même environnement partout, mais un PaaS sait construire l'application sans Dockerfile." }
    - { tech: kubernetes, verdict: surdimensionne, why: "Un cluster à opérer pour une seule application et quelques centaines d'utilisateurs." }
    - { tech: terraform, verdict: surdimensionne, why: "Décrire en code une infrastructure qui se résume à une application et sa base sur un PaaS." }
    - { tech: nginx, verdict: surdimensionne, why: "Le PaaS fournit déjà le HTTPS et le routage : un reverse proxy à configurer n'apporte rien ici." }
  cache-messaging:
    - { tech: redis, verdict: surdimensionne, why: "Aucun goulot à soulager à ce volume : un cache ajoute une brique et des bugs d'invalidation." }
    - { tech: kafka, verdict: surdimensionne, why: "Un système de streaming distribué alors qu'il n'y a aucun flux d'événements à faire circuler." }
antiPatterns:
  - { techs: [kafka, kubernetes], penalty: 15, why: "Architecture de grande plateforme pour un MVP : l'équipe passerait ses trois mois sur l'infrastructure au lieu du produit." }
  - { techs: [django, ruby-on-rails], penalty: 10, why: "Deux frameworks complets pour une seule application : deux codes, deux déploiements, aucun gain." }
  - { techs: [react, vue], penalty: 10, why: "Deux frameworks front pour une seule interface." }
  - { techs: [postgresql, mongodb], penalty: 10, why: "Deux bases opérationnelles pour un MVP : double exploitation et données à synchroniser." }
referenceStack:
  frontend: [django]
  backend-api: [django]
  base-operationnelle: [postgresql]
  auth: [django]
  cloud: [heroku]
  ci-cd: [github-actions]
  observabilite: [sentry]
---

## Ce qui compte vraiment ici

Deux développeurs, trois mois, un budget serré : la ressource rare est **le temps de l'équipe**, pas la puissance des machines. Quelques centaines d'utilisateurs, c'est une charge qu'à peu près n'importe quelle stack encaisse. Le bon choix est celui qui livre le plus de fonctionnalités avec le moins de briques à assembler et à opérer.

## Le raisonnement

- **Un framework complet plutôt qu'un assemblage.** Le besoin cache beaucoup de travail générique : comptes, rôles (élève, professeur, administratrice), formulaires, et surtout une page d'administration. Django ou Rails fournissent tout cela. L'admin de Django couvre la gestion des abonnements presque sans code.
- **Une seule application.** Rendre les pages côté serveur (gabarits Django, vues Rails) évite de maintenir un front et une API séparés. Next.js, avec Supabase pour la base et l'authentification, est une autre façon de n'avoir qu'un projet.
- **Des données relationnelles.** Une réservation relie un élève, un cours, un studio et un abonnement. Les jointures et les contraintes d'intégrité (pas deux réservations pour la même place) sont le terrain naturel de PostgreSQL.
- **Zéro exploitation.** Un PaaS (Heroku, ou Vercel pour Next.js) déploie à chaque push avec une base managée. Sentry signale les erreurs dès la mise en production, et une CI lance les tests.

## Les pièges

- **Préparer l'échelle avant d'avoir des utilisateurs.** Kubernetes, Kafka, microservices et bases distribuées résolvent des problèmes que ce produit n'aura peut-être jamais, et coûtent chacun des semaines.
- **Un cache par réflexe.** Redis n'a de sens qu'une fois un goulot mesuré.
- **Un modèle document pour des données reliées.** MongoDB fonctionne, mais on finit par réimplémenter dans le code les relations que la base relationnelle garantit gratuitement.
