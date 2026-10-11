---
questions:
  - id: role
    prompt: "Qu'est-ce que RabbitMQ ?"
    answer: "Un courtier de messages : des files que des consommateurs traitent puis acquittent"
    decoys:
      - "Un journal d'événements conservé et rejouable sur une longue période, lu par chaque consommateur à son rythme"
      - "Un cache clé-valeur en mémoire"
    why: "Les producteurs déposent des messages, les consommateurs les traitent et les acquittent. Le journal rejouable, c'est Kafka."
  - id: acquittement
    prompt: "Quand un message est-il retiré de la file ?"
    answer: "Une fois acquitté par le consommateur"
    decoys:
      - "Dès qu'il est lu"
      - "Jamais : il est conservé selon une durée de rétention"
    why: "Tant qu'il n'est pas acquitté, le message reste à traiter."
  - id: consommateur-plante
    prompt: "Que devient un message si le consommateur plante avant de l'acquitter ?"
    answer: "Il est redistribué"
    decoys:
      - "Il est perdu"
      - "Il est envoyé à tous les consommateurs à la fois"
    why: "Un message non acquitté est remis à disposition : c'est la garantie de livraison de RabbitMQ."
  - id: dead-letter
    prompt: "Où peuvent partir les messages en échec ?"
    answer: "Dans une file dédiée (dead-letter)"
    decoys:
      - "Dans un topic Kafka dédié aux erreurs"
      - "Dans les journaux du système"
    why: "La file dead-letter recueille les messages qui échouent, pour les analyser ou les rejouer."
  - id: routage
    prompt: "Quels modes de routage RabbitMQ propose-t-il ?"
    answer: "Un consommateur par message, diffusion à tous, routage par clé ou par motif"
    decoys:
      - "Uniquement premier arrivé, premier servi"
      - "Uniquement par partition, comme Kafka, avec une position de lecture par consommateur"
    why: "Le routage riche est l'un des atouts de RabbitMQ face à Kafka."
  - id: protocole
    prompt: "Quel est le protocole historique de RabbitMQ ?"
    answer: "AMQP 0-9-1"
    decoys:
      - "HTTP/3"
      - "gRPC"
    why: "RabbitMQ parle historiquement AMQP 0-9-1."
  - id: erlang
    prompt: "En quel langage RabbitMQ est-il écrit ?"
    answer: "Erlang"
    decoys:
      - "Java"
      - "Go"
    why: "RabbitMQ (2007) est écrit en Erlang ; Kafka tourne sur la JVM."
  - id: celery
    prompt: "Quel lien RabbitMQ a-t-il avec Celery ?"
    answer: "C'est le broker historique et recommandé de Celery"
    decoys:
      - "Celery est une interface graphique pour RabbitMQ"
      - "RabbitMQ exécute lui-même le code des tâches Celery"
    why: "RabbitMQ transporte les tâches ; ce sont les workers Celery qui les exécutent."
  - id: gros-flux
    prompt: "Un très gros flux d'événements à conserver et rejouer pour de nombreux consommateurs indépendants. Que choisir ?"
    answer: "Kafka, conçu pour ça"
    decoys:
      - "RabbitMQ, avec une file classique à rétention infinie"
      - "RabbitMQ, car un message acquitté reste disponible pour les autres"
    why: "Dans une file classique, un message acquitté sort de la file. La fiche oriente vers Kafka pour ce besoin."
  - id: streams
    prompt: "Qu'existe-t-il dans RabbitMQ depuis la version 3.9 ?"
    answer: "Des streams rejouables"
    decoys:
      - "Un moteur SQL intégré"
      - "Le mode KRaft"
    why: "Les streams permettent de relire des messages. Le mode KRaft est celui de Kafka 4.0."
---
