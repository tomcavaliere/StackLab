---
questions:
  - id: topic
    prompt: "Qu'est-ce qu'un topic Kafka ?"
    answer: "Un journal append-only, découpé en partitions et répliqué"
    decoys:
      - "Une file dont chaque message disparaît une fois lu"
      - "Une table relationnelle avec des index"
    why: "Les producteurs ajoutent à la fin du journal ; les consommateurs le lisent. Une file dont les messages disparaissent à la lecture, c'est le modèle de RabbitMQ."
  - id: apres-lecture
    prompt: "Que devient un message Kafka après sa lecture par un consommateur ?"
    answer: "Il reste dans le journal jusqu'à la fin de la durée de rétention"
    decoys:
      - "Il est supprimé immédiatement"
      - "Il part dans une file dead-letter, d'où on peut le relire une seule fois"
    why: "Les messages ne disparaissent pas à la lecture : on peut rejouer l'historique ou ajouter un consommateur plus tard."
  - id: position-de-lecture
    prompt: "Comment plusieurs services indépendants lisent-ils le même topic ?"
    answer: "Chacun à son rythme, en gardant sa propre position de lecture"
    decoys:
      - "Ils se partagent les messages : un seul service reçoit chaque message"
      - "Ils lisent tous en même temps, à la vitesse du plus lent"
    why: "Chaque consommateur garde sa position : un service lent ne ralentit pas les autres."
  - id: vs-rabbitmq
    prompt: "Quel besoin justifie Kafka plutôt que RabbitMQ ?"
    answer: "Rejouer l'historique ou ajouter un consommateur plus tard"
    decoys:
      - "Envoyer quelques e-mails en arrière-plan"
      - "Router finement chaque message avec un acquittement individuel"
    why: "La rétention et le rejeu sont la force de Kafka. Le routage riche et l'acquittement par message sont celles de RabbitMQ."
  - id: kraft
    prompt: "Que change Kafka 4.0 (2025) ?"
    answer: "Le cluster se coordonne seul (mode KRaft), sans ZooKeeper"
    decoys:
      - "Les messages sont désormais supprimés à la lecture"
      - "Kafka devient une base relationnelle"
    why: "Kafka dépendait de ZooKeeper pour se coordonner ; depuis la version 4.0, il s'en passe."
  - id: origine
    prompt: "Où Kafka a-t-il été créé ?"
    answer: "Chez LinkedIn"
    decoys:
      - "Chez Airbnb"
      - "Chez SoundCloud"
    why: "Kafka vient de LinkedIn, open-source depuis 2011. Airflow est né chez Airbnb, Prometheus chez SoundCloud."
  - id: mvp
    prompt: "Un MVP qui a besoin de quelques tâches de fond : Kafka est-il adapté ?"
    answer: "Non : c'est un système distribué lourd ; Redis ou RabbitMQ suffisent"
    decoys:
      - "Oui : c'est la file de tâches la plus simple à opérer"
      - "Oui : sans ZooKeeper, il est devenu trivial à exploiter, même pour une petite équipe"
    why: "Même sans ZooKeeper, Kafka reste un système distribué à opérer. Pour une simple file de tâches, c'est surdimensionné."
  - id: sans-equipe
    prompt: "Pas d'équipe pour exploiter Kafka, mais un vrai besoin de streaming. Que faire ?"
    answer: "Prendre une offre managée (Confluent Cloud, Amazon MSK…)"
    decoys:
      - "Le faire tourner sur un seul nœud en production, pour limiter le travail"
      - "Le remplacer par Memcached"
    why: "Une offre managée garde le modèle de Kafka sans la charge d'exploitation."
  - id: avec-spark
    prompt: "Comment Spark lit-il un topic Kafka ?"
    answer: "Avec Structured Streaming, qui lit et écrit des topics"
    decoys:
      - "Avec un export CSV quotidien du topic vers S3, que Spark relit"
      - "Il ne le peut pas"
    why: "Spark Structured Streaming consomme et produit directement des topics Kafka."
  - id: usage
    prompt: "Quel est un cas d'usage typique de Kafka ?"
    answer: "Ingérer un flux d'événements à fort débit vers une plateforme data"
    decoys:
      - "Stocker des sessions utilisateur qui expirent"
      - "Servir de base principale à une application CRUD, avec des requêtes par clé"
    why: "Clics, commandes, changements de données : Kafka centralise les flux d'événements de nombreux services."
---
