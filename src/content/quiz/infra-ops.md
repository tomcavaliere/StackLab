---
title: Infra & ops
description: "Conteneurs, hébergement, CI, observabilité, identité : la stack autour du code."
questions:
  - id: environnements-identiques
    prompt: "Exécuter l'application à l'identique sur le poste, en CI et en production"
    answer: docker
    decoy: kubernetes
    why: "Docker empaquette l'application et ses dépendances dans une image. Kubernetes orchestre des conteneurs sur un cluster ; il ne crée pas l'image."
  - id: dizaines-de-services
    prompt: "Placer, redémarrer et mettre à l'échelle des dizaines de services conteneurisés"
    answer: kubernetes
    decoy: heroku
    why: "Kubernetes standardise le déploiement et la mise à l'échelle de nombreux services. À cette échelle, un PaaS limite le contrôle et devient coûteux."
  - id: mvp-sans-ops
    prompt: "Mettre en ligne un MVP Rails avec sa base, dans une équipe sans compétences ops"
    answer: heroku
    decoy: aws
    why: "Avec un PaaS, on pousse le code et la base est un add-on. AWS demande de configurer réseau et droits IAM."
  - id: preversion-par-branche
    prompt: "Héberger une application Next.js avec une préversion pour chaque branche"
    answer: vercel
    decoy: heroku
    why: "Vercel déploie à chaque push et crée une préversion par branche, avec un support natif de Next.js."
  - id: processus-longs
    prompt: "Faire tourner un worker en continu et un serveur WebSocket"
    answer: heroku
    decoy: vercel
    why: "Les fonctions serverless de Vercel ont une durée d'exécution limitée. Un PaaS généraliste exécute des processus de longue durée."
  - id: erreurs-du-front
    prompt: "Voir les exceptions du front avec leur pile d'appels et leur contexte"
    answer: sentry
    decoy: prometheus
    why: "Sentry capture chaque exception, côté front comme côté back, puis la regroupe et la notifie. Prometheus collecte des métriques, pas des erreurs individuelles."
  - id: alerte-latence
    prompt: "Être alerté quand le taux d'erreurs ou la latence d'une API dérive"
    answer: prometheus
    decoy: sentry
    why: "Prometheus collecte les métriques des services et déclenche des alertes. Sentry ne montre ni la saturation ni la latence globale."
  - id: ecran-de-surveillance
    prompt: "Un écran de surveillance commun qui affiche les métriques de tous les services"
    answer: grafana
    decoy: sentry
    why: "Grafana assemble des tableaux de bord sur Prometheus et d'autres sources. Sentry suit les erreurs applicatives."
  - id: tests-sur-pull-request
    prompt: "Lancer les tests à chaque pull request d'un dépôt GitHub"
    answer: github-actions
    decoy: vercel
    why: "GitHub Actions déclenche des workflows sur les événements du dépôt. Vercel déploie à chaque push, mais n'est pas une CI pour lancer des tests."
  - id: sso-saas-b2b
    prompt: "Proposer le SSO d'entreprise aux clients d'un SaaS B2B, sans opérer de serveur d'identité"
    answer: auth0
    decoy: keycloak
    why: "Auth0 est un service hébergé : SSO, MFA et connexion sans rien opérer. Keycloak se déploie et se maintient soi-même."
  - id: identite-en-interne
    prompt: "Garder l'identité en interne pour des raisons réglementaires, avec beaucoup d'utilisateurs"
    answer: keycloak
    decoy: auth0
    why: "Keycloak s'héberge chez soi, sans tarif par utilisateur actif. Auth0 est hébergé par un tiers et sa facture suit le nombre d'utilisateurs."
  - id: fichiers-des-utilisateurs
    prompt: "Stocker les images et PDF déposés par les utilisateurs"
    answer: aws-s3
    decoy: postgresql
    why: "Le stockage objet est fait pour les fichiers de toute taille. En base, on garde seulement leur chemin et leurs métadonnées."
  - id: services-varies-multi-regions
    prompt: "Une infrastructure qui doit grandir : bases managées, files, CDN et plusieurs régions"
    answer: aws
    decoy: heroku
    why: "AWS offre un large choix de services managés et de régions. Un PaaS limite le contrôle sur le réseau et les services data."
  - id: infra-decrite-en-code
    prompt: "Décrire en code les réseaux, bases et clusters d'un compte AWS, et revoir chaque changement en pull request"
    answer: terraform
    decoy: kubernetes
    why: "Terraform décrit les ressources cloud dans des fichiers versionnés, et son plan montre les changements avant de les appliquer. Kubernetes orchestre des conteneurs ; il ne crée ni les réseaux ni les bases du compte."
  - id: https-et-repartition
    prompt: "Recevoir le HTTPS et répartir les requêtes entre plusieurs instances de l'application, sur des machines virtuelles"
    answer: nginx
    decoy: docker
    why: "Nginx sert de reverse proxy : il termine le HTTPS, sert les fichiers statiques et répartit la charge. Docker empaquette l'application ; il ne route pas le trafic."
  - id: miniature-a-l-envoi
    prompt: "Générer une miniature à chaque image déposée dans S3, quelques fois par jour"
    answer: aws-lambda
    decoy: kubernetes
    why: "Lambda s'exécute à la demande sur l'événement S3 et ne coûte rien entre deux déclenchements. Un cluster Kubernetes tourne en permanence."
  - id: worker-permanent
    prompt: "Un worker qui consomme une file de messages en continu, jour et nuit"
    answer: heroku
    decoy: aws-lambda
    why: "Une fonction Lambda s'exécute au plus 15 minutes, puis s'arrête. Un PaaS comme Heroku exécute un processus de longue durée."
  - id: fouiller-les-journaux
    prompt: "Rechercher par mot-clé dans les journaux de tous les services"
    answer: elasticsearch
    decoy: prometheus
    why: "Elasticsearch indexe le texte des journaux et permet de les fouiller (pile ELK). Prometheus collecte des métriques numériques, pas des lignes de journaux."
  - id: dependances-en-local
    prompt: "Lancer en local la base et le cache d'un projet, sans les installer sur le poste"
    answer: docker
    decoy: terraform
    why: "Docker (avec Compose) démarre la base et le cache en conteneurs sur le poste. Terraform crée des ressources dans un cloud ; il ne lance rien en local."
  - id: meme-plateforme-partout
    prompt: "Une même plateforme pour déployer des conteneurs sur plusieurs clouds et sur ses propres serveurs"
    answer: kubernetes
    decoy: aws-lambda
    why: "Kubernetes est devenu une interface standard, proposée par tous les grands clouds et installable chez soi. Lambda est un service propre à AWS, qui exécute des fonctions."
  - id: environnements-cloud-identiques
    prompt: "Garder identiques les réseaux, bases et DNS des environnements de préproduction et de production d'un compte cloud"
    answer: terraform
    decoy: docker
    why: "Terraform décrit les ressources cloud dans des fichiers et recrée chaque environnement à l'identique. Docker rend l'application identique partout, mais ne crée ni réseaux, ni bases managées, ni DNS."
  - id: deploiement-a-la-fusion
    prompt: "Déployer automatiquement à chaque fusion sur la branche principale d'un dépôt GitHub"
    answer: github-actions
    decoy: terraform
    why: "GitHub Actions déclenche des workflows sur les événements du dépôt, fusion comprise. Terraform peut être une étape du déploiement, mais il ne se déclenche pas seul."
  - id: front-sans-configurer-cdn
    prompt: "Mettre en ligne un front moderne avec CDN mondial et HTTPS, sans configurer de build ni de certificats"
    answer: vercel
    decoy: nginx
    why: "Vercel construit à chaque push et sert les pages depuis un réseau mondial, certificats compris. Nginx peut servir un build statique, mais sur une machine qu'on configure et maintient soi-même."
  - id: api-trafic-irregulier
    prompt: "Une petite API au trafic faible et irrégulier, qui ne doit rien coûter quand personne ne l'appelle"
    answer: aws-lambda
    decoy: heroku
    why: "Lambda est facturé au nombre d'appels et à leur durée : sans appel, rien à payer. Sur Heroku, les dynos tournent en permanence et les offres gratuites ont été supprimées fin 2022."
  - id: donnees-brutes-data-lake
    prompt: "Une zone d'atterrissage bon marché pour les fichiers bruts d'une plateforme data, en Parquet"
    answer: aws-s3
    decoy: elasticsearch
    why: "S3 sert de data lake : un stockage bon marché que Spark, Snowflake ou DuckDB lisent directement. Elasticsearch indexe des documents pour la recherche ; ce n'est pas un stockage de fichiers bruts."
  - id: metriques-et-sql-meme-ecran
    prompt: "Afficher sur un même écran les métriques Prometheus et des chiffres tirés d'une base SQL"
    answer: grafana
    decoy: prometheus
    why: "Grafana se connecte à des sources hétérogènes et les assemble en tableaux de bord. Prometheus stocke et interroge ses propres métriques, pas les données d'une base SQL."
  - id: stocker-les-series-temporelles
    prompt: "Collecter et stocker les métriques que chaque service expose sur une URL /metrics"
    answer: prometheus
    decoy: grafana
    why: "Prometheus interroge régulièrement ces URL et stocke des séries temporelles étiquetées. Grafana ne stocke pas les métriques : il interroge des sources comme Prometheus."
  - id: ligne-qui-plante
    prompt: "Savoir quelle ligne de code a fait planter l'application et combien d'utilisateurs sont touchés"
    answer: sentry
    decoy: grafana
    why: "Sentry capture chaque exception avec sa pile d'appels et son contexte, puis regroupe les occurrences. Grafana affiche des métriques et des journaux, pas le détail d'une exception."
  - id: identite-sans-acces-exterieur
    prompt: "Un serveur d'identité déployé dans un réseau interne totalement coupé d'Internet"
    answer: keycloak
    decoy: auth0
    why: "Keycloak est open-source et s'installe sur ses propres serveurs. Auth0 est un service hébergé par un tiers : les applications doivent pouvoir le joindre."
  - id: back-end-appele-a-grandir
    prompt: "Un back-end Java avec base relationnelle managée, cache et files de messages, appelé à grandir"
    answer: aws
    decoy: vercel
    why: "AWS propose bases managées, caches, files et calcul pour un back-end de longue durée. Vercel vise les fronts JavaScript et des fonctions serverless à durée d'exécution limitée."
---
