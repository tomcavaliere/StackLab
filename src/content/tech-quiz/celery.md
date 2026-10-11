---
questions:
  - id: role
    prompt: "À quoi sert Celery ?"
    answer: "Exécuter en arrière-plan, dans des workers, les traitements Python lents"
    decoys:
      - "Planifier des pipelines de données, avec lignée des tables et historique des exécutions"
      - "Servir les pages web plus vite grâce à un cache en mémoire"
    why: "Celery sort les traitements lents (e-mails, images, exports) du cycle requête-réponse. Les pipelines avec lignée relèvent d'un orchestrateur, le cache de Redis ou Memcached."
  - id: broker-et-workers
    prompt: "Que se passe-t-il quand l'application appelle une tâche Celery ?"
    answer: "Un message est déposé dans un broker, et un worker séparé l'exécute"
    decoys:
      - "La tâche s'exécute dans un thread du même processus web"
      - "La requête HTTP attend la fin de la tâche avant de répondre"
    why: "L'appel est asynchrone : le message part dans le broker (RabbitMQ ou Redis) et des processus workers le traitent, pendant que la requête répond tout de suite."
  - id: brokers
    prompt: "Quels brokers Celery utilise-t-il couramment ?"
    answer: "RabbitMQ ou Redis"
    decoys:
      - "Memcached ou DuckDB"
      - "Spark ou Airflow"
    why: "RabbitMQ est le broker historique et recommandé, Redis l'autre choix courant (il peut aussi stocker les résultats)."
  - id: beat
    prompt: "Comment Celery exécute-t-il des tâches planifiées ?"
    answer: "Avec Celery Beat"
    decoys:
      - "Avec un DAG Airflow embarqué dans chaque worker"
      - "Avec des triggers de la base de données"
    why: "Celery Beat déclenche des tâches à intervalles réguliers, à côté de l'application."
  - id: pipeline-data
    prompt: "Un pipeline de données en 6 étapes dépendantes, avec reprises et historique. Celery est-il l'outil adapté ?"
    answer: "Non : un orchestrateur comme Airflow ou Dagster est fait pour ça"
    decoys:
      - "Oui : une tâche Celery par étape, enchaînées à la main, suffit largement"
      - "Oui : Celery Beat gère les dépendances et la lignée"
    why: "Celery exécute des tâches ; dépendances entre étapes, reprises et historique sont le métier d'un orchestrateur."
  - id: ruby
    prompt: "Une application Ruby a besoin d'une file de tâches. Peut-elle utiliser Celery ?"
    answer: "Non : Celery est pour Python ; en Ruby, l'équivalent est Sidekiq"
    decoys:
      - "Oui : Celery est indépendant du langage de l'application"
      - "Oui, grâce à son SDK Ruby officiel"
    why: "Celery est une bibliothèque Python. Chaque écosystème a son équivalent : Sidekiq en Ruby, BullMQ en Node.js."
  - id: node
    prompt: "Quel équivalent de Celery utiliser dans une application Node.js ?"
    answer: "BullMQ, qui s'appuie sur Redis"
    decoys:
      - "Celery, via son paquet npm officiel"
      - "Airflow, avec un opérateur Node.js"
    why: "BullMQ est la file de tâches courante en Node.js ; elle s'appuie sur Redis."
  - id: ne-pas-faire-attendre
    prompt: "Pourquoi sortir l'envoi d'un e-mail du traitement de la requête web ?"
    answer: "Pour ne pas faire attendre l'utilisateur pendant un traitement lent"
    decoys:
      - "Parce que Django interdit l'envoi d'e-mails depuis une vue, pour des raisons de sécurité"
      - "Pour que le contenu de l'e-mail soit chiffré"
    why: "L'utilisateur reçoit sa réponse tout de suite ; l'e-mail part en arrière-plan, et peut être retenté en cas d'échec."
  - id: fonctions
    prompt: "Que gère Celery en plus de l'exécution des tâches ?"
    answer: "Les nouvelles tentatives, les délais et les chaînes de tâches"
    decoys:
      - "Le rendu des pages HTML de l'application, en parallèle des requêtes"
      - "La réplication de la base de données"
    why: "Celery relance une tâche en échec, la retarde, ou enchaîne plusieurs tâches."
  - id: taches-rares
    prompt: "Quelques tâches rares dans une petite application. Que dit la fiche ?"
    answer: "Un broker et des workers à opérer peuvent être disproportionnés ; le framework couvre parfois déjà le besoin"
    decoys:
      - "Celery est indispensable dès la première tâche asynchrone de l'application"
      - "Il vaut mieux passer directement à Kafka, qui couvrira tous les besoins futurs sans jamais avoir à migrer plus tard"
    why: "Celery ajoute un broker et des workers à surveiller. Pour un besoin ponctuel, ce coût d'exploitation ne se justifie pas toujours."
---
