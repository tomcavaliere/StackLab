---
name: GraphQL
kind: concept
layers: []
tags: [api, web, open-source]
difficulty: 2
summary: "Langage de requête pour API : d'après un schéma typé, le client décrit exactement les données voulues et les reçoit en une seule requête."
alternatives:
  - tech: rest
    note: "Plus simple à mettre en place, à mettre en cache et à sécuriser quand les besoins des clients sont simples et stables."
---

## Problème résolu

Avec une API REST, un écran qui affiche un profil, ses publications et leurs commentaires enchaîne plusieurs appels, et chaque réponse contient des champs inutiles. Sur mobile, ces allers-retours coûtent cher. GraphQL, créé chez Facebook en 2012 et publié en 2015, inverse la logique : le serveur expose un schéma typé de ses données, et le client écrit une requête qui décrit exactement la forme de la réponse voulue, imbrications comprises, en un seul appel.

Les écritures passent par des mutations, et les abonnements (subscriptions) poussent des mises à jour en temps réel. Le schéma sert de contrat et de documentation : l'outillage en génère des types pour le front. La spécification est maintenue par la GraphQL Foundation ; Apollo est l'une des implémentations les plus répandues.

## Quand l'utiliser

- Plusieurs clients (web, mobile, partenaires) aux besoins différents sur les mêmes données.
- Interfaces riches qui assemblent beaucoup de ressources liées.
- Couche d'agrégation devant plusieurs services back-end.

## Quand l'éviter

- API simple ou CRUD consommée par un seul front : REST est plus direct.
- Besoin du cache HTTP : les requêtes passent en général par un seul endpoint en POST, ce qui contourne le cache des navigateurs et des CDN.
- Sans précautions, une requête imbriquée peut déclencher une avalanche de requêtes en base (problème N+1, que résout un regroupement de type DataLoader) ou coûter très cher : il faut limiter profondeur et complexité des requêtes.

## Pour aller plus loin

- [Documentation officielle](https://graphql.org/learn/)
- [Spécification GraphQL](https://spec.graphql.org/)
