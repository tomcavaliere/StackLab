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
  - id: ordre
    prompt: "À quel niveau Kafka garantit-il l'ordre des messages ?"
    answer: "Au sein d'une partition"
    decoys:
      - "Sur l'ensemble du topic, toutes partitions confondues"
      - "Entre tous les topics du cluster, par horodatage"
    why: "Chaque partition est un journal ordonné ; entre partitions d'un même topic, aucun ordre global n'est garanti."
  - id: cle-partition
    prompt: "Comment le producteur Kafka choisit-il la partition d'un message qui a une clé ?"
    answer: "Par hachage de la clé"
    decoys:
      - "Au hasard à chaque message, pour équilibrer la charge"
      - "Selon le consommateur le moins chargé au moment de l'envoi"
    why: "Le partitionneur par défaut hache la clé : une même clé va toujours dans la même partition (tant que leur nombre ne change pas). Le producteur ne connaît pas la charge des consommateurs."
  - id: cle-client
    prompt: "Pourquoi utiliser l'identifiant du client comme clé des messages Kafka ?"
    answer: "Ses événements vont dans la même partition, donc restent ordonnés"
    decoys:
      - "Pour chiffrer les messages avec une clé propre à chaque client"
      - "Pour que Kafka crée automatiquement un topic dédié à chaque client"
    why: "Même clé, même partition : tous les événements d'un client sont lus dans l'ordre. La clé de message n'est pas une clé de chiffrement et ne crée pas de topic."
  - id: groupe-consommateurs
    prompt: "Dans un groupe de consommateurs Kafka, comment les partitions d'un topic sont-elles réparties ?"
    answer: "Chaque partition est lue par un seul membre du groupe"
    decoys:
      - "Chaque membre du groupe lit toutes les partitions du topic"
      - "Les messages vont un par un au membre le plus rapide, quelle que soit la partition"
    why: "Le groupe se partage les partitions : c'est ainsi qu'on parallélise la lecture. Deux groupes différents, eux, lisent chacun tout le topic."
  - id: trop-de-consommateurs
    prompt: "Un groupe compte plus de consommateurs que le topic n'a de partitions. Que se passe-t-il ?"
    answer: "Les consommateurs en trop restent inactifs"
    decoys:
      - "Kafka crée automatiquement des partitions supplémentaires"
      - "Les partitions sont découpées entre plusieurs consommateurs"
    why: "Une partition n'est lue que par un membre du groupe : le nombre de partitions plafonne le parallélisme. Kafka n'en ajoute pas tout seul."
  - id: offset
    prompt: "Comment s'appelle la position d'un message dans une partition Kafka ?"
    answer: "L'offset"
    decoys:
      - "L'epoch"
      - "Le timestamp de commit"
      - "Le numéro de segment"
    why: "L'offset est un numéro croissant qui identifie chaque message dans sa partition. Les segments sont les fichiers où la partition est stockée sur disque."
  - id: commit-offsets
    prompt: "Que fait un consommateur Kafka quand il committe ses offsets ?"
    answer: "Il enregistre jusqu'où il a lu, pour reprendre là après un redémarrage"
    decoys:
      - "Il supprime de la partition les messages qu'il a déjà lus"
      - "Il confirme au producteur que le message est traité, ce qui débloque l'envoi du suivant"
    why: "Le commit sauvegarde la position du groupe (dans le topic interne __consumer_offsets). Rien n'est supprimé et le producteur n'attend pas les consommateurs."
  - id: facteur-replication
    prompt: "À quoi sert le facteur de réplication d'un topic Kafka ?"
    answer: "Copier chaque partition sur plusieurs brokers"
    decoys:
      - "Dupliquer chaque message dans plusieurs topics"
      - "Fixer le nombre de consommateurs autorisés par groupe de lecture"
    why: "Avec un facteur de 3, chaque partition existe sur 3 brokers : la perte d'un broker ne fait pas perdre les données. Il ne touche ni aux topics ni aux consommateurs."
  - id: leader
    prompt: "Quel broker reçoit les écritures d'une partition Kafka répliquée ?"
    answer: "Le leader de la partition"
    decoys:
      - "Tous les brokers qui en ont une copie, en même temps"
      - "Le contrôleur du cluster, qui les redistribue ensuite"
    why: "Chaque partition a un leader qui reçoit les écritures ; les répliques suiveuses copient son journal. Le contrôleur gère les métadonnées et l'élection des leaders, pas le trafic des messages."
  - id: acks-all
    prompt: "Avec acks=all, quand le producteur Kafka reçoit-il la confirmation d'un envoi ?"
    answer: "Quand les répliques synchronisées ont reçu le message"
    decoys:
      - "Dès que le leader a reçu le message, sans attendre les répliques"
      - "Quand tous les groupes de consommateurs ont lu le message"
    why: "acks=all attend l'ensemble des répliques synchronisées (ISR), ce qui protège contre la perte d'un broker. Attendre le seul leader, c'est acks=1 ; la lecture par les consommateurs n'entre jamais en jeu."
  - id: compaction
    prompt: "Que fait la compaction d'un topic Kafka (cleanup.policy=compact) ?"
    answer: "Elle garde au moins la dernière valeur de chaque clé"
    decoys:
      - "Elle compresse les messages en gzip pour réduire le disque"
      - "Elle supprime les messages plus anciens que la durée de rétention"
    why: "La compaction efface les anciennes valeurs d'une clé quand une plus récente existe : le topic devient l'état courant par clé. La compression est un autre réglage ; la suppression par âge, c'est la politique delete."
  - id: retention
    prompt: "Comment règle-t-on la durée de conservation des messages d'un topic Kafka ?"
    answer: "Par durée ou par taille (retention.ms, retention.bytes)"
    decoys:
      - "Par nombre de lectures, le message disparaissant après N consommateurs"
      - "Par acquittement de chaque consommateur, comme dans une file classique"
    why: "La rétention est un réglage du topic, en temps ou en volume, indépendant des lectures. C'est ce qui permet de rejouer et d'ajouter des consommateurs plus tard."
  - id: kafka-connect
    prompt: "À quoi sert Kafka Connect ?"
    answer: "Relier Kafka à des bases et des systèmes externes via des connecteurs"
    decoys:
      - "Relier deux clusters Kafka par un tunnel VPN chiffré"
      - "Exposer les topics en API REST publique pour les navigateurs"
    why: "Kafka Connect fait tourner des connecteurs source (vers Kafka) et sink (depuis Kafka), configurés plutôt que codés. Ce n'est ni un VPN ni une API publique."
  - id: kafka-streams
    prompt: "Qu'est-ce que Kafka Streams ?"
    answer: "Une bibliothèque Java pour traiter des flux dans son application"
    decoys:
      - "Un cluster de calcul séparé à déployer, comme Spark"
      - "Un format de fichier pour archiver les topics sur S3"
    why: "Kafka Streams s'embarque dans une application JVM ordinaire : pas de cluster de calcul à part, contrairement à Spark ou Flink."
  - id: debezium
    prompt: "Quel outil capture les changements d'une base de données pour les publier dans Kafka (CDC) ?"
    answer: "Debezium"
    decoys:
      - "Airflow"
      - "dbt"
      - "Prometheus"
    why: "Debezium lit le journal de transactions de la base et publie chaque changement dans Kafka, via Kafka Connect. Airflow orchestre, dbt transforme en SQL, Prometheus collecte des métriques."
  - id: modele-pull
    prompt: "Comment les consommateurs Kafka obtiennent-ils les messages ?"
    answer: "Ils les demandent au broker (pull)"
    decoys:
      - "Le broker les pousse dès leur arrivée (push)"
      - "Ils lisent directement les fichiers du broker sur son disque"
    why: "Le consommateur interroge le broker à son rythme, à partir de son offset : un consommateur lent n'est pas submergé. Il passe toujours par le protocole Kafka, pas par les fichiers."
  - id: reduire-partitions
    prompt: "Peut-on réduire le nombre de partitions d'un topic Kafka existant ?"
    answer: "Non, on peut seulement en ajouter"
    decoys:
      - "Oui, à tout moment, sans effet sur l'ordre des messages"
      - "Oui, mais uniquement depuis le mode KRaft de Kafka 4.0"
    why: "Kafka ne sait pas supprimer de partitions ; on peut en ajouter, mais cela change la partition d'une partie des clés. Il faut donc dimensionner ce nombre dès le départ."
  - id: exactly-once
    prompt: "Quels mécanismes de Kafka permettent un traitement exactly-once ?"
    answer: "Le producteur idempotent et les transactions"
    decoys:
      - "Les files dead-letter et l'acquittement de chaque message"
      - "La réplication à trois copies, qui suffit à elle seule"
    why: "L'idempotence évite les doublons à l'écriture, les transactions rendent atomiques lecture, traitement et écriture. La réplication protège des pannes, pas des doublons ; les dead-letters sont un concept de RabbitMQ."
  - id: schema-registry
    prompt: "À quoi sert un registre de schémas (Schema Registry) avec Kafka ?"
    answer: "Gérer les schémas des messages et leur compatibilité"
    decoys:
      - "Stocker les offsets committés par les groupes de consommateurs"
      - "Répartir automatiquement les partitions entre les brokers du cluster"
    why: "Le registre conserve les schémas (Avro, Protobuf, JSON Schema) et refuse une évolution incompatible. Les offsets vivent dans un topic interne, la répartition relève du contrôleur."
  - id: lag
    prompt: "Que mesure le lag d'un groupe de consommateurs Kafka ?"
    answer: "Son retard sur le dernier message écrit"
    decoys:
      - "Le temps de réponse réseau entre le producteur et le broker"
      - "Le nombre de brokers hors service dans le cluster"
    why: "Le lag est l'écart entre le dernier offset écrit dans une partition et l'offset atteint par le groupe. S'il grandit, les consommateurs ne suivent plus."
---
