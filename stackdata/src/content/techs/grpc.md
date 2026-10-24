---
name: gRPC
kind: concept
layers: []
tags: [api, open-source, cncf]
difficulty: 2
summary: "Framework d'appels de procédure à distance issu de Google : un contrat .proto, du code généré dans chaque langage, des messages binaires sur HTTP/2."
alternatives:
  - tech: rest
    note: "JSON lisible sur HTTP, appelable depuis n'importe quel client, navigateur compris : préférable pour une API publique."
---

## Problème résolu

Entre microservices écrits dans des langages différents, les appels JSON sur HTTP ont un coût : contrats implicites, sérialisation verbeuse, clients écrits à la main. gRPC (Google, open-source en 2015, aujourd'hui projet de la CNCF) part d'un contrat décrit dans un fichier `.proto` avec Protocol Buffers : à partir de ce fichier, l'outillage génère le client et le serveur dans chaque langage. Appeler un autre service ressemble à appeler une fonction typée.

Les messages sont sérialisés en binaire, plus compacts que du JSON, et transportés sur HTTP/2, qui multiplexe les appels sur une même connexion. gRPC gère le streaming dans les deux sens : un service peut envoyer un flux continu de messages et en recevoir sur le même appel.

## Quand l'utiliser

- Communication interne entre microservices, surtout écrits en plusieurs langages, avec des appels fréquents.
- Contrats stricts et versionnés entre équipes.
- Flux continus entre services (télémétrie, mises à jour en direct), grâce au streaming.

## Quand l'éviter

- Appels depuis le navigateur : il ne parle pas gRPC nativement, il faut gRPC-Web et un proxy.
- API publique pour des partenaires : REST et JSON sont plus accessibles.
- Débogage à la main : les messages binaires ne se lisent pas avec `curl`, il faut des outils dédiés.

## Pour aller plus loin

- [Documentation officielle](https://grpc.io/docs/)
- [Introduction à gRPC](https://grpc.io/docs/what-is-grpc/introduction/)
