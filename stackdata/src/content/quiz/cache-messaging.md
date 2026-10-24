---
title: Cache & messaging
description: "Cache, file de tâches, courtier de messages ou journal d'événements : ne plus les confondre."
questions:
  - id: cache-minimal
    prompt: "Un très gros cache clé-valeur, le plus simple et prévisible possible, sans persistance"
    answer: memcached
    decoy: redis
    why: "Memcached est volontairement minimal : clé-valeur pur, en mémoire. Redis ferait aussi l'affaire, mais ses structures et sa persistance ne servent pas ici."
  - id: classement-des-joueurs
    prompt: "Un classement des joueurs mis à jour en continu"
    answer: redis
    decoy: memcached
    why: "Redis fournit des ensembles triés, faits pour les classements. Memcached ne stocke que des valeurs opaques."
  - id: evenements-rejouables
    prompt: "Plusieurs services réagissent aux mêmes événements et doivent pouvoir rejouer l'historique"
    answer: kafka
    decoy: rabbitmq
    why: "Kafka conserve un journal durable et rejouable, que chaque consommateur lit à son rythme. Dans RabbitMQ, un message acquitté sort de la file."
  - id: emails-django
    prompt: "Envoyer en arrière-plan les e-mails d'une application Django"
    answer: celery
    decoy: kafka
    why: "Celery est la file de tâches de l'écosystème Python. Kafka est un système distribué lourd pour une simple file de tâches."
  - id: routage-et-acquittements
    prompt: "Router des messages entre services selon des règles variées, avec acquittement de chaque message"
    answer: rabbitmq
    decoy: kafka
    why: "Règles de routage et acquittement par message : c'est le cœur de RabbitMQ. Kafka raisonne en journal partitionné et en positions de lecture."
  - id: limitation-de-debit
    prompt: "Limiter chaque client de l'API à un nombre de requêtes par minute"
    answer: redis
    decoy: postgresql
    why: "Des compteurs atomiques en mémoire, avec expiration : Redis le fait sans toucher la base. Dans PostgreSQL, chaque requête de l'API ajouterait une écriture en base."
  - id: flux-de-clics
    prompt: "Ingérer un flux continu de clics vers la plateforme data"
    answer: kafka
    decoy: celery
    why: "Kafka est conçu pour ingérer des flux d'événements à fort débit. Celery exécute les tâches de fond d'une application Python ; ce n'est pas un bus d'événements."
  - id: taches-node
    prompt: "Une file de tâches d'arrière-plan pour une API Node.js qui utilise déjà Redis"
    answer: redis
    decoy: celery
    why: "Celery est réservé à Python. En Node.js, une file comme BullMQ s'appuie sur le Redis déjà en place."
  - id: workers-java
    prompt: "Répartir des tâches entre plusieurs workers Java, chaque message acquitté une fois traité"
    answer: rabbitmq
    decoy: celery
    why: "RabbitMQ est un courtier indépendant du langage, avec acquittements et répartition entre workers. Celery est une bibliothèque Python."
  - id: pubsub-leger
    prompt: "Notifier en temps réel des clients connectés, dans une application qui a déjà Redis"
    answer: redis
    decoy: kafka
    why: "Redis propose un pub/sub simple. Kafka est un système distribué lourd à opérer pour ce besoin."
  - id: survivre-au-redemarrage
    prompt: "Un cache dont le contenu doit survivre à un redémarrage"
    answer: redis
    decoy: memcached
    why: "Redis peut persister ses données sur disque, selon sa configuration. Un redémarrage vide Memcached. Pour des données métier critiques, une vraie base reste préférable."
  - id: pipeline-avec-dependances
    prompt: "Enchaîner des traitements de données avec dépendances entre étapes, reprises et historique"
    answer: airflow
    decoy: celery
    why: "Celery exécute des tâches isolées. Un orchestrateur comme Airflow gère les dépendances entre étapes, les reprises et l'historique des exécutions."
  - id: relances-taches-python
    prompt: "Relancer automatiquement une tâche Python en échec, avec plusieurs tentatives"
    answer: celery
    decoy: rabbitmq
    why: "Celery déclare les tâches en Python et gère les nouvelles tentatives ; il s'appuie sur un broker (RabbitMQ ou Redis) pour transporter les messages. RabbitMQ seul ne sait pas ce qu'est une tâche Python."
  - id: lectures-repetees
    prompt: "Soulager une base très sollicitée en gardant en mémoire les résultats les plus lus"
    answer: redis
    decoy: kafka
    why: "Un cache en mémoire comme Redis sert les lectures répétées sans toucher la base. Kafka transporte des flux d'événements ; il ne sert pas des lectures par clé."
  - id: sessions-entre-instances
    prompt: "Partager les sessions utilisateur entre plusieurs instances d'une application web, avec expiration automatique"
    answer: redis
    decoy: kafka
    why: "Redis stocke des clés en mémoire avec une durée de vie, lues par toutes les instances : c'est un usage classique. Kafka est un journal d'événements, pas un stockage qu'on lit par clé."
  - id: compteur-atomique
    prompt: "Incrémenter un compteur de vues à chaque affichage d'une page populaire, sans perdre d'incrément entre écritures concurrentes"
    answer: redis
    decoy: rabbitmq
    why: "Redis propose des opérations atomiques en mémoire, comme l'incrément d'un compteur. RabbitMQ transporte des messages ; il ne garde aucune valeur à incrémenter."
  - id: fragments-de-pages
    prompt: "Garder en mémoire des fragments de pages sérialisés, répartis sur plusieurs serveurs de cache par les clients eux-mêmes"
    answer: memcached
    decoy: kafka
    why: "Memcached stocke des valeurs opaques avec une durée de vie, et ce sont les clients qui choisissent le serveur d'une clé par hachage. Kafka conserve des flux d'événements, pas des valeurs relues par clé."
  - id: nettoyage-nocturne-django
    prompt: "Lancer chaque nuit une tâche de nettoyage dans une application Django, sans ajouter d'orchestrateur"
    answer: celery
    decoy: kafka
    why: "Celery Beat planifie des tâches simples à côté de l'application Python. Kafka transporte des événements ; il ne planifie rien."
  - id: photos-fastapi
    prompt: "Redimensionner les photos téléversées dans une API FastAPI, sans faire attendre l'utilisateur"
    answer: celery
    decoy: airflow
    why: "Celery sort les traitements lents du cycle requête-réponse d'une application Python, grâce à des workers. Airflow orchestre des pipelines de données planifiés, pas des tâches déclenchées à chaque requête."
  - id: file-des-echecs
    prompt: "Isoler dans une file dédiée les messages qui échouent à répétition"
    answer: rabbitmq
    decoy: memcached
    why: "RabbitMQ peut router les messages en échec vers une file dédiée (dead-letter). Memcached est un cache clé-valeur : il ne gère ni files ni messages."
  - id: donnees-de-facturation
    prompt: "Stocker les factures des clients, qui ne doivent jamais être perdues"
    answer: postgresql
    decoy: redis
    why: "PostgreSQL garantit des transactions ACID et une écriture durable. Redis garde ses données en mémoire et sa durabilité dépend de la configuration de persistance : ce n'est pas une base principale de données métier."
  - id: reponses-api-tierce
    prompt: "Garder quelques minutes les réponses d'une API tierce lente, pour ne pas la rappeler à chaque affichage"
    answer: memcached
    decoy: celery
    why: "Un cache clé-valeur avec durée de vie comme Memcached sert les réponses déjà obtenues. Celery exécute des tâches en arrière-plan ; il ne garde pas de résultats à relire par clé."
  - id: groupes-de-consommateurs-legers
    prompt: "Une file légère, lue par plusieurs consommateurs, dans une petite application qui utilise déjà Redis"
    answer: redis
    decoy: kafka
    why: "Redis propose des listes et des streams qui suffisent pour une file légère, sans nouvelle brique. Kafka est un système distribué lourd à opérer pour une petite application."
  - id: journaux-de-nombreux-services
    prompt: "Les journaux de dizaines de services, lus séparément par l'entrepôt, la détection de fraude et l'archivage"
    answer: kafka
    decoy: rabbitmq
    why: "Kafka conserve un journal que chaque consommateur lit indépendamment, à sa position. RabbitMQ retire un message de sa file une fois acquitté : de nombreux consommateurs indépendants sur un très gros flux, c'est le terrain de Kafka."
  - id: ordre-par-compte
    prompt: "Traiter dans l'ordre les événements de chaque compte, sur un très gros flux réparti entre plusieurs consommateurs"
    answer: kafka
    decoy: celery
    why: "Kafka garantit l'ordre au sein d'une partition : avec l'identifiant du compte comme clé, tous ses événements vont dans la même partition. Celery répartit des tâches entre workers sans garantir leur ordre."
  - id: accuse-de-traitement
    prompt: "Si un consommateur plante pendant un traitement, le message doit être redonné à un autre"
    answer: rabbitmq
    decoy: redis
    why: "RabbitMQ ne retire un message qu'une fois acquitté, et le redistribue si le consommateur plante. Le pub/sub de Redis envoie le message aux abonnés présents, sans acquittement."
  - id: mvp-sans-cache
    prompt: "Les données d'un MVP à faible trafic, dont les pages s'affichent déjà vite"
    answer: postgresql
    decoy: redis
    why: "Tant qu'aucun goulot n'est mesuré, la base principale suffit. Un cache comme Redis ajoute une brique et des problèmes d'invalidation avant d'en avoir besoin."
  - id: chaine-de-taches-utilisateur
    prompt: "Dans une application Python, enchaîner trois tâches de fond (télécharger, convertir, notifier) à chaque action d'un utilisateur"
    answer: celery
    decoy: airflow
    why: "Celery gère les chaînes de tâches lancées par l'application, à la demande. Airflow orchestre des pipelines de données planifiés ; il n'est pas fait pour une chaîne déclenchée à chaque action d'un utilisateur."
  - id: reagir-a-chaque-paiement
    prompt: "Réagir dès qu'un paiement est publié, dans plusieurs services à la fois"
    answer: kafka
    decoy: airflow
    why: "Les services consomment le topic Kafka en continu et réagissent à chaque événement. Airflow planifie des lots : ce n'est pas un bus d'événements."
  - id: taches-rails
    prompt: "Le broker des tâches de fond d'une application Ruby on Rails qui utilise Sidekiq"
    answer: redis
    decoy: celery
    why: "Sidekiq, la file de tâches courante en Ruby, s'appuie sur Redis. Celery est la file de tâches de Python : il ne sert pas une application Ruby."
---
