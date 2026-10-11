---
name: Nginx
kind: outil-infra
layers: [conteneurs-infra]
tags: [open-source, web]
difficulty: 2
summary: "Serveur web et reverse proxy : il reçoit les requêtes HTTP(S), sert les fichiers statiques et répartit le reste entre les instances de l'application."
---

## Problème résolu

Un serveur d'application (Gunicorn pour Django, Puma pour Rails, un processus Node.js) n'est pas fait pour être exposé seul sur Internet : gérer le chiffrement TLS, beaucoup de connexions lentes, les fichiers statiques et la répartition entre plusieurs instances n'est pas son rôle. Nginx (Igor Sysoev, 2004) se place devant : il termine le HTTPS, sert directement les fichiers statiques, met en cache, limite le débit et transmet les autres requêtes aux instances de l'application (reverse proxy et répartition de charge).

Son architecture événementielle lui permet de tenir de très nombreuses connexions simultanées avec peu de mémoire, là où des serveurs plus anciens consacraient un processus ou un thread à chaque connexion. L'éditeur NGINX Inc. appartient à F5 depuis 2019.

## Quand l'utiliser

- Devant une application déployée sur des machines virtuelles : HTTPS, fichiers statiques, répartition entre instances.
- Servir le build d'une application front (HTML, JavaScript, CSS), sans code serveur.
- Point d'entrée unique qui route vers plusieurs services selon le chemin ou le domaine.

## Quand l'éviter

- PaaS ou serverless (Heroku, Vercel) : la plateforme fournit déjà le routage et le HTTPS.
- Cloud avec un répartiteur de charge managé (comme ceux d'AWS) : il couvre souvent le besoin, sans serveur à maintenir.
- Besoin de certificats HTTPS automatiques et d'une configuration minimale : des alternatives comme Caddy le font par défaut, alors que la configuration de Nginx s'apprend.

## Pour aller plus loin

- [Documentation officielle](https://nginx.org/en/docs/)
- [Guide du débutant](https://nginx.org/en/docs/beginners_guide.html)
