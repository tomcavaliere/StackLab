---
name: NestJS
kind: framework
layers: [backend-api]
languages: [typescript]
tags: [open-source, api, web]
difficulty: 2
summary: "Framework back-end Node.js en TypeScript, qui impose une architecture en modules, contrôleurs et services avec injection de dépendances."
alternatives:
  - tech: spring-boot
    note: "Même architecture à injection de dépendances, décrite par des annotations, sur la JVM."
integratesWith:
  - tech: express
    note: "NestJS s'exécute par défaut au-dessus d'Express ; Fastify est l'autre option intégrée."
---

## Problème résolu

Express laisse chaque équipe inventer sa structure : sur un gros projet ou entre plusieurs équipes, les conventions divergent. NestJS (Kamil Myśliwiec, 2017) apporte un cadre inspiré d'Angular : l'application se découpe en modules, les routes vivent dans des contrôleurs et la logique dans des services fournis par injection de dépendances, le tout décrit avec des décorateurs TypeScript.

Il ne remplace pas le serveur HTTP : il s'appuie sur Express (par défaut) ou Fastify. Des modules officiels couvrent la validation, la configuration, GraphQL, les WebSockets et les microservices (transports Kafka, RabbitMQ, gRPC…). L'ORM reste à choisir (TypeORM, Prisma…).

## Quand l'utiliser

- Back-end TypeScript destiné à grossir, partagé par plusieurs équipes.
- Équipe venue d'Angular, de Spring ou de .NET, habituée à l'injection de dépendances.
- Équipe full-stack TypeScript qui veut un back-end structuré dans le même langage que le front.

## Quand l'éviter

- Petite API ou script : la structure imposée ajoute beaucoup de fichiers et d'abstraction pour peu de routes.
- Calcul intensif dans les requêtes : comme tout serveur Node.js, il bloque la boucle d'événements.
- Application avec back-office et beaucoup de pages : Django, Rails ou Laravel fournissent administration ou rendu de pages, que NestJS laisse à construire.

## Pour aller plus loin

- [Documentation officielle](https://docs.nestjs.com/)
- [Premiers pas](https://docs.nestjs.com/first-steps)
