---
name: REST
kind: concept
layers: []
tags: [api, web, standard]
difficulty: 1
summary: "Style d'API web fondé sur HTTP : des ressources identifiées par des URL, manipulées avec les méthodes GET, POST, PUT et DELETE, le plus souvent en JSON."
---

## Problème résolu

Pour qu'un front, une application mobile ou un partenaire parlent à un serveur, il faut une convention commune. REST, formalisé par Roy Fielding dans sa thèse en 2000, réutilise HTTP lui-même : chaque ressource a son URL (`/commandes/42`), la méthode dit l'action (`GET` lire, `POST` créer, `PUT` ou `PATCH` modifier, `DELETE` supprimer) et le code de statut dit le résultat (`200`, `404`…). Le serveur ne garde pas d'état de session entre deux requêtes.

Comme tout passe par HTTP, l'outillage existe déjà : cache des navigateurs et des CDN, proxys, `curl`, journaux. Le format OpenAPI décrit une API REST et permet d'en générer documentation et clients. Dans la pratique, « API REST » désigne souvent une API JSON sur HTTP qui suit ces conventions, sans en appliquer tous les principes.

## Quand l'utiliser

- Choix par défaut d'une API web : simple à concevoir, à appeler et à déboguer.
- API publique ou destinée à des partenaires : tout langage sait faire une requête HTTP.
- Ressources lues souvent, qu'on veut mettre en cache par HTTP.

## Quand l'éviter

- Écrans qui assemblent beaucoup de ressources différentes : plusieurs allers-retours, ou des réponses trop lourdes. GraphQL laisse le client choisir ses champs.
- Appels internes très fréquents entre services, avec un contrat strict : gRPC est plus compact et génère le code.
- Le serveur doit pousser des informations au client : REST suit un modèle requête-réponse ; il faut une connexion WebSocket ou des événements envoyés par le serveur (Server-Sent Events).

## Pour aller plus loin

- [Thèse de Roy Fielding, chapitre 5 : REST](https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)
- [Spécification OpenAPI](https://spec.openapis.org/oas/latest.html)
