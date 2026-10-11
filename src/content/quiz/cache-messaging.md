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
---
