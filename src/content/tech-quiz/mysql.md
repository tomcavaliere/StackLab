---
questions:
  - id: lamp
    prompt: "Dans la pile LAMP, que désigne le M ?"
    answer: "MySQL"
    decoys:
      - "MongoDB"
      - "Memcached"
    why: "Linux, Apache, MySQL, PHP : la pile qui a porté une grande partie du web des années 2000."
  - id: innodb
    prompt: "Quel moteur de stockage par défaut apporte les transactions ACID à MySQL ?"
    answer: "InnoDB"
    decoys:
      - "MyISAM"
      - "RocksDB"
    why: "InnoDB est le moteur par défaut depuis MySQL 5.5. MyISAM, l'ancien moteur par défaut, n'offre pas de transactions."
  - id: innodb-concurrence
    prompt: "Qu'apporte InnoDB en plus des transactions ?"
    answer: "Le verrouillage par ligne et le MVCC"
    decoys:
      - "Le stockage colonnaire des tables"
      - "Le sharding automatique sur plusieurs serveurs"
    why: "Verrouiller une ligne plutôt qu'une table et gérer les versions (MVCC) permettent les accès concurrents."
  - id: proprietaire
    prompt: "À qui appartient MySQL aujourd'hui ?"
    answer: "Oracle, depuis le rachat de Sun en 2010"
    decoys:
      - "Microsoft, depuis le rachat de Sun en 2010"
      - "La fondation Apache, depuis 2008"
    why: "Sun a racheté MySQL en 2008, puis Oracle a racheté Sun."
  - id: mariadb
    prompt: "Quel fork est né du passage de MySQL chez Oracle ?"
    answer: "MariaDB"
    decoys:
      - "PostgreSQL"
      - "SQLite"
    why: "MariaDB est un fork de MySQL. PostgreSQL et SQLite sont des projets indépendants."
  - id: vitess
    prompt: "Comment répartir les données de MySQL sur de nombreux serveurs ?"
    answer: "Avec un outil comme Vitess, né chez YouTube, qui ajoute un sharding"
    decoys:
      - "Avec le sharding automatique intégré à InnoDB depuis la version 5.5"
      - "Avec Kafka, qui partitionne les tables"
    why: "MySQL réplique simplement, mais ne répartit pas seul les écritures : Vitess ajoute ce sharding."
  - id: types-avances
    prompt: "Besoin de types avancés, de SQL analytique riche ou d'extensions (géospatial poussé, vecteurs). Que conseille la fiche ?"
    answer: "PostgreSQL, mieux pourvu"
    decoys:
      - "MySQL, le plus riche en extensions"
      - "MongoDB, seul à gérer le géospatial"
    why: "PostgreSQL a PostGIS, pgvector et un SQL plus riche."
  - id: charge-adaptee
    prompt: "Quelle charge convient bien à MySQL ?"
    answer: "Des lectures simples et répétées, avec des répliques en lecture"
    decoys:
      - "De l'analytique sur des années d'historique"
      - "Des écritures massives réparties sur cent nœuds, sans outil supplémentaire"
    why: "La réplication est simple à mettre en place : les répliques absorbent les lectures. L'analytique demande un moteur colonnaire."
  - id: ecosysteme
    prompt: "Quel écosystème est historiquement lié à MySQL ?"
    answer: "PHP et WordPress"
    decoys:
      - "Spark et Hadoop"
      - "React et Next.js"
    why: "MySQL est le « M » de LAMP, et WordPress l'utilise historiquement."
  - id: gouvernance
    prompt: "Pourquoi certaines organisations préfèrent-elles éviter MySQL ?"
    answer: "Pour ne pas dépendre d'Oracle"
    decoys:
      - "Parce qu'il n'est pas relationnel"
      - "Parce qu'il ne gère pas les transactions"
    why: "MySQL est relationnel et transactionnel (InnoDB). L'argument est la gouvernance : MariaDB ou PostgreSQL ne dépendent pas d'Oracle."
---
