---
questions:
  - id: batteries-incluses
    prompt: "Que veut dire « batteries incluses » pour Django ?"
    answer: "ORM, migrations, authentification et administration sont fournis d'emblée"
    decoys:
      - "Il embarque son propre serveur de base de données"
      - "Il inclut un framework front React prêt à l'emploi, branché sur les vues"
    why: "Django fournit, cohérentes entre elles, les briques que toute application web refait. Il utilise une base externe (PostgreSQL…) et rend ses pages lui-même."
  - id: admin
    prompt: "Quel atout décisif Django offre-t-il à un MVP riche en données métier ?"
    answer: "L'interface d'administration, disponible sans écrire de code"
    decoys:
      - "Une API GraphQL générée automatiquement"
      - "Un hébergement gratuit fourni par la Django Software Foundation"
    why: "Le back-office est généré à partir des modèles : la fiche parle de semaines gagnées."
  - id: drf
    prompt: "Quel paquet est la référence pour exposer une API REST avec Django ?"
    answer: "Django REST Framework"
    decoys:
      - "Django Channels"
      - "Celery"
    why: "Django REST Framework, un paquet tiers, est la référence pour les API REST. Channels gère l'asynchrone (WebSockets), Celery les tâches de fond."
  - id: contrib-auth
    prompt: "Que gère django.contrib.auth ?"
    answer: "Les comptes, les mots de passe hachés, les sessions, les groupes et les permissions"
    decoys:
      - "Le SSO d'entreprise par SAML, activé par défaut"
      - "Le chiffrement de toutes les colonnes de la base, avec rotation automatique des clés"
    why: "L'authentification intégrée couvre comptes, sessions et permissions. Le SSO d'entreprise demande des paquets supplémentaires ou un service comme Auth0."
  - id: rendu-serveur
    prompt: "Comment Django peut-il produire ses pages HTML ?"
    answer: "Par son système de gabarits, côté serveur, sans application front séparée"
    decoys:
      - "Il impose une application React séparée"
      - "Il ne produit que du JSON : l'interface est forcément une application séparée"
    why: "Les gabarits Django rendent les pages côté serveur : pas besoin de maintenir une seconde application front."
  - id: orm
    prompt: "Comment décrit-on le modèle de données dans Django ?"
    answer: "En classes Python ; l'ORM génère les tables et les migrations"
    decoys:
      - "En SQL, dans des migrations écrites entièrement à la main"
      - "En YAML, dans un fichier de schéma central"
    why: "On décrit les modèles en Python, et Django génère tables et migrations à partir de leurs changements."
  - id: websockets
    prompt: "Pourquoi Django n'est-il pas le premier choix pour des WebSockets en masse ?"
    answer: "Il gère l'asynchrone (vues async, Channels), mais ce n'est pas son modèle d'origine"
    decoys:
      - "Il est incapable de gérer une connexion WebSocket, même avec Channels"
      - "Il ne fonctionne qu'avec MySQL, qui ne sait pas gérer les connexions longues en masse"
    why: "Django sait faire de l'asynchrone, mais il a été conçu pour le cycle requête-réponse classique. Pour des charges très concurrentes à connexions longues, d'autres modèles sont plus naturels."
  - id: micro-api
    prompt: "Une micro-API sans base de données ni utilisateurs. Que conseille la fiche ?"
    answer: "FastAPI ou un framework minimal suffit"
    decoys:
      - "Django, pour bénéficier de l'interface d'administration"
      - "Django avec Celery, pour être prêt à grossir"
    why: "Sans base ni utilisateurs, ORM, admin et authentification ne servent à rien : un framework léger suffit."
  - id: taches-lentes
    prompt: "Quelle combinaison classique pour exécuter les tâches lentes d'une application Django ?"
    answer: "Celery, avec Redis ou RabbitMQ comme broker"
    decoys:
      - "Airflow, déclenché à chaque requête"
      - "Spark Structured Streaming"
    why: "Celery, avec un broker, est la combinaison documentée et très répandue pour les tâches de fond de Django."
  - id: base-preferee
    prompt: "Quelle base est la mieux prise en charge par l'ORM de Django ?"
    answer: "PostgreSQL, avec des champs et fonctions dédiés (django.contrib.postgres)"
    decoys:
      - "SQLite, la seule prise en charge en production"
      - "DynamoDB, via un backend officiel intégré à Django depuis la version 4"
    why: "django.contrib.postgres apporte des champs et fonctions propres à PostgreSQL. SQLite est pris en charge mais pas seul, et DynamoDB n'a pas de backend officiel."
---
