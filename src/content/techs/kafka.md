---
name: Apache Kafka
kind: cache-queue
layers: [cache-messaging]
languages: [java]
tags: [open-source, streaming, distribue, offre-managee]
difficulty: 3
summary: "Plateforme de streaming d'événements distribuée : un journal partitionné, durable et rejouable, que de nombreux services alimentent et consomment."
alternatives:
  - tech: rabbitmq
    note: "File de messages classique avec routage riche ; plus simple à opérer, sans rejeu de l'historique sur longue période."
integratesWith:
  - tech: spark
    note: "Spark Structured Streaming lit et écrit des topics Kafka."
---

## Problème résolu

Quand des dizaines de services doivent échanger des événements (commandes, clics, changements de données), les brancher deux à deux devient ingérable. Kafka, créé chez LinkedIn et open-source depuis 2011, centralise ces échanges dans des topics : des journaux append-only, découpés en partitions et répliqués. Les producteurs y écrivent, les consommateurs lisent à leur rythme et chacun garde sa position de lecture.

Les messages ne disparaissent pas à la lecture : ils sont conservés selon une durée de rétention, ce qui permet de rejouer l'historique ou d'ajouter un consommateur plus tard. Depuis Kafka 4.0 (2025), le cluster se coordonne seul (mode KRaft), sans ZooKeeper.

## Quand l'utiliser

- Ingestion de flux d'événements à fort débit vers une plateforme data.
- Architecture orientée événements, où plusieurs systèmes réagissent aux mêmes faits.
- Besoin de rejouer l'historique ou de reconstruire un état à partir des événements.

## Quand l'éviter

- MVP ou petite application : c'est un système distribué lourd à opérer pour remplacer quelques appels directs ou une file simple.
- Simple file de tâches (envoyer un e-mail, redimensionner une image) : Redis ou RabbitMQ suffisent.
- Sans équipe pour l'exploiter : préférer une offre managée (Confluent Cloud, Amazon MSK…).

## Pour aller plus loin

- [Documentation officielle](https://kafka.apache.org/documentation/)
- [Introduction à Kafka](https://kafka.apache.org/intro)
