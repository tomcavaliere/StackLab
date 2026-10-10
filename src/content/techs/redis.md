---
name: Redis
kind: cache-queue
layers: [cache-messaging]
tags: [en-memoire, cle-valeur, nosql, offre-managee]
difficulty: 1
summary: "Base clé-valeur en mémoire avec des structures de données riches : cache, sessions, compteurs, classements et files légères de beaucoup d'applications."
alternatives:
  - tech: memcached
    note: "Cache pur, plus minimal : pas de structures riches ni de persistance, mais multithreadé et très simple."
---

## Problème résolu

Interroger la base principale pour chaque affichage d'une page populaire est lent et coûteux. Redis (Salvatore Sanfilippo, 2009) garde les données en mémoire : lire ou écrire une clé est très rapide. Au-delà des chaînes, il propose des listes, des ensembles, des ensembles triés (classements), des hashes et des streams, avec des opérations atomiques sur chacun.

Il sert donc de cache, mais aussi de stockage de sessions, de compteur, de limiteur de débit, de file de tâches légère ou de pub/sub. La persistance sur disque est optionnelle (instantanés ou journal). Côté licence : Redis est passé en 2024 sous des licences non reconnues open-source, ce qui a donné le fork Valkey (Linux Foundation) ; depuis Redis 8 (2025), la licence AGPLv3 est proposée en option.

## Quand l'utiliser

- Cache devant une base ou une API lente.
- Sessions, compteurs, classements, limitation de débit.
- File de tâches simple (broker de Celery ou de Sidekiq).

## Quand l'éviter

- Comme base principale de données métier : la mémoire coûte cher et la durabilité dépend de la configuration de persistance.
- Messagerie qui exige un journal durable et rejouable sur longue période, avec de nombreux consommateurs : Kafka est conçu pour ça.
- MVP à faible trafic : un cache ajoute une brique, et des problèmes d'invalidation, souvent avant d'en avoir besoin.

## Pour aller plus loin

- [Documentation officielle](https://redis.io/docs/latest/)
- [Types de données](https://redis.io/docs/latest/develop/data-types/)
