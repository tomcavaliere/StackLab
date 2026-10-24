---
name: WebSocket
kind: concept
layers: []
tags: [api, web, standard, temps-reel]
difficulty: 2
summary: "Protocole de connexion persistante et bidirectionnelle entre navigateur et serveur : une fois la connexion ouverte, le serveur peut pousser des messages à tout moment."
alternatives:
  - tech: rest
    note: "Requête-réponse classique : suffit si le client peut se contenter d'interroger le serveur de temps en temps."
integratesWith:
  - tech: redis
    note: "Son pub/sub relaie un message à toutes les instances du serveur, qui le poussent chacune à leurs clients connectés."
---

## Problème résolu

En HTTP classique, seul le client parle en premier : pour savoir si un nouveau message est arrivé, il doit interroger le serveur en boucle, ce qui gaspille des requêtes et ajoute du délai. Le protocole WebSocket (RFC 6455, 2011) transforme une requête HTTP en connexion persistante et bidirectionnelle : une fois ouverte, client et serveur s'envoient des messages quand ils veulent, avec peu de surcoût par message.

La connexion a un état : le serveur garde chaque client connecté en mémoire. Avec plusieurs instances, un message doit être relayé à toutes celles qui ont des destinataires, en général par un pub/sub comme celui de Redis. Pour un flux à sens unique, du serveur vers le navigateur, les événements envoyés par le serveur (Server-Sent Events) sont une alternative plus simple, sur HTTP ordinaire.

## Quand l'utiliser

- Chat, notifications instantanées, édition collaborative, jeux, suivi en direct (position d'un livreur, cours de bourse).
- Tout cas où le serveur doit pousser une information dès qu'elle change.

## Quand l'éviter

- Requêtes ponctuelles du client : une API REST est plus simple et profite du cache HTTP.
- Flux à sens unique du serveur vers le client : les Server-Sent Events suffisent.
- Hébergement par fonctions serverless à durée limitée : une connexion persistante demande un processus de longue durée, ou un service managé dédié.

## Pour aller plus loin

- [API WebSocket (MDN)](https://developer.mozilla.org/fr/docs/Web/API/WebSockets_API)
- [RFC 6455](https://www.rfc-editor.org/rfc/rfc6455)
