---
name: RabbitMQ
kind: cache-queue
layers: [cache-messaging]
tags: [open-source, file-de-messages]
difficulty: 2
summary: "Courtier de messages open-source : des files où les producteurs déposent des messages que des consommateurs traitent puis acquittent."
integratesWith:
  - tech: celery
    note: "Broker historique et recommandé de Celery."
---

## Problème résolu

Une application qui doit déléguer un travail (envoyer un e-mail, traiter un fichier) ou faire communiquer des services sans les coupler a besoin d'un intermédiaire fiable. RabbitMQ (2007, écrit en Erlang) reçoit des messages et les achemine vers des files selon des règles de routage : un message par consommateur, diffusion à tous, routage par clé ou par motif.

Un message n'est retiré de la file qu'une fois acquitté par le consommateur. Si celui-ci plante, le message est redistribué. Les messages en échec peuvent partir dans une file dédiée (dead-letter). Le protocole historique est AMQP 0-9-1, et des streams rejouables existent depuis la version 3.9.

## Quand l'utiliser

- Files de tâches asynchrones, avec répartition entre plusieurs workers.
- Communication entre services avec des règles de routage variées.
- Besoin de garanties de livraison par message (acquittements, nouvelles tentatives).

## Quand l'éviter

- Très gros flux d'événements à conserver et rejouer, pour de nombreux consommateurs indépendants : Kafka est conçu pour ça.
- Besoin minimal de file dans une application qui utilise déjà Redis : Redis peut suffire.
- Petite équipe sans besoin réel d'asynchrone : une brique de plus à opérer.

## Pour aller plus loin

- [Documentation officielle](https://www.rabbitmq.com/docs)
- [Tutoriels officiels](https://www.rabbitmq.com/tutorials)
