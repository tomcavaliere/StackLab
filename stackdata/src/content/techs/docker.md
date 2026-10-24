---
name: Docker
kind: outil-infra
layers: [conteneurs-infra]
tags: [conteneurs, open-source]
difficulty: 1
summary: "Empaquette une application et ses dépendances dans une image de conteneur, exécutable à l'identique sur un poste, un serveur ou un cloud."
integratesWith:
  - tech: kubernetes
    note: "Les images construites avec Docker sont celles que Kubernetes déploie."
  - tech: github-actions
    note: "Construire et publier l'image à chaque push est un workflow CI très courant."
---

## Problème résolu

« Ça marche sur ma machine » : une application dépend d'une version précise du langage, de bibliothèques système et de fichiers de configuration, qui diffèrent d'un poste ou d'un serveur à l'autre. Docker (2013) emballe tout cela dans une image, décrite par un `Dockerfile`. L'image s'exécute en conteneur, un processus isolé qui partage le noyau de l'hôte : c'est bien plus léger qu'une machine virtuelle.

Les images sont versionnées et publiées dans des registres (Docker Hub, registres des clouds). Le format est standardisé par l'OCI, d'où sa portabilité vers Kubernetes et les services de conteneurs managés. Docker Compose décrit plusieurs conteneurs à lancer ensemble, par exemple une application avec sa base et son cache.

## Quand l'utiliser

- Rendre identiques les environnements de développement, de CI et de production.
- Déployer sur une plateforme de conteneurs (Kubernetes, services managés, la plupart des PaaS).
- Lancer localement les dépendances d'un projet (base, cache) sans les installer sur le poste.

## Quand l'éviter

- La plateforme d'hébergement construit et exécute déjà le code sans image (certains PaaS, Vercel) : un Dockerfile n'apporte alors rien.
- Images mal construites : trop lourdes, exécutées en root, jamais mises à jour. Le conteneur n'est pas une frontière de sécurité aussi forte qu'une machine virtuelle.
- Docker Desktop est payant pour les grandes entreprises : vérifier les conditions de licence.

## Pour aller plus loin

- [Documentation officielle](https://docs.docker.com/)
- [Bonnes pratiques pour les Dockerfile](https://docs.docker.com/build/building/best-practices/)
