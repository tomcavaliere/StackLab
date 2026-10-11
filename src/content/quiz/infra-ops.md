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
---
