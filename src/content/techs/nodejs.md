---
name: Node.js
kind: plateforme
layers: [backend-api]
languages: [javascript, typescript]
tags: [open-source, async, web]
difficulty: 2
summary: "Environnement d'exécution JavaScript côté serveur, bâti sur le moteur V8, avec des entrées-sorties non bloquantes."
integratesWith:
  - tech: express
    note: "Le framework web minimal historique de Node.js."
---

## Problème résolu

Un serveur classique consacre souvent un thread à chaque requête, qui reste bloqué pendant qu'il attend la base ou le réseau. Node.js (Ryan Dahl, 2009) exécute JavaScript hors du navigateur avec le moteur V8 de Chrome, autour d'une boucle d'événements. Les entrées-sorties sont non bloquantes : pendant qu'une requête attend la base, le même processus en traite d'autres.

Il a aussi apporté npm, le registre de paquets JavaScript, et la possibilité d'utiliser un seul langage du front au back. On écrit rarement un serveur Node.js « nu » : un framework comme Express, Fastify ou NestJS, ou un framework full-stack comme Next.js, se place au-dessus.

## Quand l'utiliser

- API et back-ends dominés par les entrées-sorties : appels à des bases et à d'autres services, temps réel, WebSockets.
- Équipe JavaScript ou TypeScript qui veut partager langage, outillage et types entre front et back.
- Outillage de développement front (build, tests), où il est de toute façon incontournable.

## Quand l'éviter

- Calcul intensif dans les requêtes : il bloque la boucle d'événements et toutes les autres requêtes du processus. Les worker threads ou un autre langage sont alors préférables.
- Écosystème npm : beaucoup de petites dépendances, donc une surface d'attaque et une maintenance à surveiller.
- Besoin d'un cadre complet imposé : Node.js laisse tout choisir.

## Pour aller plus loin

- [Documentation officielle](https://nodejs.org/docs/latest/api/)
- [La boucle d'événements expliquée](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)
