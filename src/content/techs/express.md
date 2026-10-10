---
name: Express
kind: framework
layers: [backend-api]
languages: [javascript, typescript]
tags: [open-source, api, web]
difficulty: 1
summary: "Framework web minimaliste pour Node.js : routage et middlewares, tout le reste se choisit à la carte."
alternatives:
  - tech: fastapi
    note: "Équivalent côté Python, avec validation et documentation OpenAPI intégrées."
---

## Problème résolu

Le module HTTP de Node.js est bas niveau : il faut analyser soi-même les URL, les corps de requête, les cookies. Express (2010) ajoute une couche fine : un routage par méthode et chemin, et une chaîne de middlewares, c'est-à-dire des fonctions qui traitent la requête l'une après l'autre (journalisation, authentification, analyse du JSON…). La version 5 est sortie en 2024, après une très longue gestation.

C'est volontairement tout. Base de données, validation, authentification : chaque besoin se couvre par un paquet npm choisi par l'équipe.

## Quand l'utiliser

- Petite API ou back-end Node.js où l'on veut garder la main sur chaque brique.
- Apprendre comment fonctionne un serveur web, sans magie.
- Projet existant : Express reste le framework Node.js le plus répandu et le plus documenté.

## Quand l'éviter

- Projet qui grossit avec plusieurs équipes : sans structure imposée, chaque projet Express finit par avoir sa propre architecture. NestJS fournit ce cadre.
- Besoin de validation et de documentation d'API intégrées : Fastify ou FastAPI (en Python) les apportent.
- Application avec beaucoup de pages et de données métier : un framework complet (Django, Rails, Next.js) fait gagner du temps.

## Pour aller plus loin

- [Documentation officielle](https://expressjs.com/fr/)
- [Écrire des middlewares](https://expressjs.com/fr/guide/writing-middleware.html)
