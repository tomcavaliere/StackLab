---
questions:
  - id: structures-riches
    prompt: "Qu'est-ce qui distingue Redis d'un simple cache clé-valeur ?"
    answer: "Des structures riches (listes, ensembles triés, hashes, streams) avec des opérations atomiques"
    decoys:
      - "Un moteur SQL capable de faire des jointures entre les clés"
      - "Un stockage sur disque par défaut, la mémoire vive ne servant que de tampon pour les écritures"
    why: "Redis garde les données en mémoire et propose, au-delà des chaînes, des listes, ensembles triés, hashes et streams, avec des opérations atomiques sur chacun. Pas de SQL, et la persistance sur disque est optionnelle."
  - id: classement
    prompt: "Quelle structure Redis utiliser pour un classement de joueurs mis à jour en continu ?"
    answer: "Un ensemble trié (sorted set)"
    decoys:
      - "Une liste"
      - "Un hash"
    why: "L'ensemble trié garde ses membres ordonnés par score : c'est la structure des classements. Une liste suit l'ordre d'insertion, un hash décrit les champs d'un objet."
  - id: persistance-optionnelle
    prompt: "La persistance sur disque est-elle obligatoire avec Redis ?"
    answer: "Non : elle est optionnelle, par instantanés ou par journal"
    decoys:
      - "Oui : chaque écriture est synchronisée sur disque avant de répondre"
      - "Non : Redis ne sait pas écrire sur disque, tout est perdu au redémarrage"
    why: "Redis travaille en mémoire ; on choisit de persister ou non, par instantanés ou par journal. C'est Memcached qui n'a aucune persistance."
  - id: pas-base-principale
    prompt: "Pourquoi éviter Redis comme base principale des données métier ?"
    answer: "La mémoire coûte cher et la durabilité dépend de la configuration de persistance"
    decoys:
      - "Redis ne peut pas stocker plus de quelques milliers de clés par instance"
      - "Redis n'accepte qu'une seule connexion cliente à la fois"
    why: "Tout tient en mémoire, plus chère que le disque, et une panne peut faire perdre les dernières écritures selon la persistance configurée. Une base comme PostgreSQL reste la source de vérité."
  - id: usage-atypique
    prompt: "Lequel de ces usages n'est pas un usage typique de Redis ?"
    answer: "Un entrepôt analytique de plusieurs téraoctets"
    decoys:
      - "La limitation de débit d'une API"
      - "Le stockage de sessions qui expirent seules"
    why: "Compteurs atomiques avec expiration, sessions à durée de vie : c'est le terrain de Redis. Des téraoctets d'analytique demandent un moteur colonnaire, et coûteraient une fortune en mémoire."
  - id: licence-2024
    prompt: "Que s'est-il passé pour la licence de Redis en 2024 ?"
    answer: "Redis est passé sous des licences non reconnues open-source, ce qui a donné le fork Valkey"
    decoys:
      - "Redis a été racheté par AWS et n'est plus disponible qu'en service managé sur son cloud"
      - "Redis est passé sous licence Apache 2.0 pour concurrencer Memcached"
    why: "Le changement de licence de 2024 a provoqué le fork Valkey, hébergé par la Linux Foundation. Depuis Redis 8 (2025), la licence AGPLv3 est proposée en option."
  - id: valkey
    prompt: "Qu'est-ce que Valkey ?"
    answer: "Un fork de Redis hébergé par la Linux Foundation"
    decoys:
      - "Un module de Redis pour la recherche vectorielle"
      - "Le nouveau nom commercial de Redis depuis la version 8"
    why: "Valkey est né du changement de licence de Redis en 2024 et vit à la Linux Foundation. Redis garde son nom."
  - id: broker-de-taches
    prompt: "Quel rôle Redis joue-t-il auprès de Celery ou de Sidekiq ?"
    answer: "Le broker : il transporte les tâches en attente jusqu'aux workers"
    decoys:
      - "Le moteur qui exécute lui-même le code des tâches"
      - "Le planificateur qui déclenche les tâches récurrentes à heure fixe"
    why: "Redis sert de file de tâches légère : l'application y dépose les tâches, des workers séparés les exécutent. Les tâches récurrentes relèvent de Celery Beat, pas de Redis."
  - id: journal-rejouable
    prompt: "Messagerie qui doit conserver un journal durable et rejouable sur une longue période, pour de nombreux consommateurs. Que choisir ?"
    answer: "Kafka, conçu pour ce besoin"
    decoys:
      - "Le pub/sub de Redis, qui conserve l'historique des messages"
      - "Memcached, avec une durée de vie très longue sur les clés"
    why: "Kafka conserve ses messages selon une rétention et chaque consommateur lit à son rythme. Le pub/sub de Redis ne garde rien : un abonné absent rate le message. Memcached n'est qu'un cache."
  - id: mvp-sans-cache
    prompt: "Un MVP à faible trafic doit-il ajouter Redis dès le départ ?"
    answer: "Pas forcément : un cache ajoute une brique et des problèmes d'invalidation, souvent avant d'en avoir besoin"
    decoys:
      - "Oui : sans cache, une base relationnelle ne tient pas la charge d'un MVP, même à faible trafic"
      - "Oui : il est impossible de gérer des sessions utilisateur sans Redis"
    why: "La fiche le range dans « Quand l'éviter » : à faible trafic, la base suffit, et invalider un cache est une vraie source de bugs. Les frameworks savent stocker les sessions en base."
  - id: plutot-memcached
    prompt: "Quand préférer Memcached à Redis ?"
    answer: "Pour un cache pur et minimal, sans besoin de structures de données ni de persistance"
    decoys:
      - "Quand les données doivent survivre à un redémarrage du serveur"
      - "Pour diffuser des notifications en pub/sub aux clients connectés, avec historique"
    why: "Memcached ne fait que du clé-valeur en mémoire, multithreadé et très simple. Persistance et pub/sub sont justement des fonctions de Redis."
---
