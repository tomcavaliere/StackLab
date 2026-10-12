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
  - id: auto-increment
    prompt: "Quel attribut de colonne MySQL génère automatiquement un identifiant croissant ?"
    answer: "AUTO_INCREMENT"
    decoys:
      - "SERIAL_KEY"
      - "IDENTITY_SEQUENCE"
    why: "AUTO_INCREMENT attribue la valeur suivante à chaque insertion. Les deux autres mots-clés n'existent pas dans MySQL."
  - id: on-duplicate-key
    prompt: "Quelle syntaxe MySQL insère une ligne, ou la met à jour si la clé existe déjà ?"
    answer: "INSERT ... ON DUPLICATE KEY UPDATE"
    decoys:
      - "INSERT ... ON CONFLICT DO UPDATE"
      - "UPSERT INTO ... WHEN MATCHED UPDATE"
    why: "ON DUPLICATE KEY UPDATE est l'« upsert » de MySQL. ON CONFLICT est la syntaxe de PostgreSQL et de SQLite."
  - id: utf8mb4
    prompt: "Quel jeu de caractères MySQL choisir pour stocker tout Unicode, emojis compris ?"
    answer: "utf8mb4"
    decoys:
      - "utf8 (alias historique de utf8mb3)"
      - "latin1"
    why: "L'ancien « utf8 » de MySQL ne stocke que 3 octets par caractère et ne couvre pas les emojis ; utf8mb4 est le vrai UTF-8, par défaut depuis MySQL 8.0."
  - id: myisam-verrou
    prompt: "Quand MyISAM écrit dans une table, que verrouille-t-il ?"
    answer: "La table entière"
    decoys:
      - "Seulement la ligne modifiée"
      - "Seulement la page de données concernée"
    why: "MyISAM verrouille par table, ce qui bloque les autres écritures ; InnoDB verrouille par ligne."
  - id: binlog
    prompt: "Sur quoi repose la réplication classique de MySQL ?"
    answer: "Le binary log du serveur source, rejoué par les répliques"
    decoys:
      - "Une copie complète du répertoire de données, faite toutes les heures"
      - "Le journal des requêtes lentes, rejoué à l'identique sur chaque réplique"
    why: "Le serveur source écrit ses modifications dans le binary log ; chaque réplique le lit et applique les mêmes changements."
  - id: query-cache
    prompt: "Qu'est-il arrivé au query cache de MySQL avec la version 8.0 ?"
    answer: "Il a été supprimé"
    decoys:
      - "Il est devenu activé par défaut"
      - "Il a été remplacé par un Redis intégré"
    why: "Le query cache passait mal à l'échelle sur les serveurs multicœurs ; il a été retiré de MySQL 8.0. On met en cache côté application ou avec un outil dédié."
  - id: explain
    prompt: "Quelle commande MySQL montre comment une requête sera exécutée (index utilisés, ordre des tables) ?"
    answer: "EXPLAIN"
    decoys:
      - "SHOW QUERY PLAN"
      - "ANALYZE INDEX"
    why: "EXPLAIN devant un SELECT affiche le plan choisi par l'optimiseur. Les deux autres commandes n'existent pas dans MySQL."
  - id: mysqldump
    prompt: "Quel outil fourni avec MySQL produit une sauvegarde logique sous forme de SQL ?"
    answer: "mysqldump"
    decoys:
      - "mysqlexport"
      - "mysql_backup"
    why: "mysqldump écrit les instructions SQL qui recréent les tables et leurs données. Les deux autres noms n'existent pas."
  - id: port
    prompt: "Sur quel port MySQL écoute-t-il par défaut ?"
    answer: "3306"
    decoys:
      - "5432"
      - "1433"
    why: "5432 est le port par défaut de PostgreSQL, 1433 celui de SQL Server."
  - id: backticks
    prompt: "Par défaut, comment MySQL délimite-t-il un identifiant (nom de table ou de colonne) ?"
    answer: "Avec des accents graves : `nom`"
    decoys:
      - "Avec des guillemets doubles : \"nom\""
      - "Avec des crochets : [nom]"
    why: "Les guillemets doubles de la norme SQL ne délimitent un identifiant dans MySQL qu'avec le mode ANSI_QUOTES ; les crochets sont propres à SQL Server."
  - id: mode-strict
    prompt: "Que change le mode SQL strict (STRICT_TRANS_TABLES) de MySQL ?"
    answer: "Une valeur invalide est rejetée au lieu d'être ajustée avec un simple avertissement"
    decoys:
      - "Toute requête qui n'utilise aucun index est refusée par le serveur"
      - "Chaque table doit obligatoirement déclarer une clé primaire explicite"
    why: "Sans mode strict, MySQL tronquait ou convertissait silencieusement une valeur trop longue ou invalide. Le mode strict est actif par défaut depuis MySQL 5.7."
  - id: isolation-defaut
    prompt: "Quel est le niveau d'isolation des transactions par défaut d'InnoDB ?"
    answer: "REPEATABLE READ"
    decoys:
      - "READ COMMITTED"
      - "SERIALIZABLE"
    why: "InnoDB utilise REPEATABLE READ par défaut ; PostgreSQL, lui, utilise READ COMMITTED."
  - id: index-clusterise
    prompt: "Comment InnoDB range-t-il physiquement les lignes d'une table ?"
    answer: "Dans l'ordre de la clé primaire (index clusterisé)"
    decoys:
      - "Dans l'ordre d'insertion, sans lien avec aucun index"
      - "En colonnes, chaque colonne dans un fichier séparé"
    why: "Les lignes sont stockées dans le B-tree de la clé primaire ; les index secondaires pointent vers cette clé. D'où l'intérêt d'une clé primaire courte."
  - id: aurora
    prompt: "Quel service managé d'AWS propose une base compatible MySQL, avec sa propre couche de stockage répartie ?"
    answer: "Amazon Aurora"
    decoys:
      - "Amazon DynamoDB"
      - "Amazon Redshift"
    why: "Aurora existe en versions compatibles MySQL et PostgreSQL. DynamoDB est une base clé-valeur, Redshift un entrepôt analytique."
  - id: widenius
    prompt: "Qui a lancé le fork MariaDB ?"
    answer: "Michael « Monty » Widenius, cofondateur de MySQL"
    decoys:
      - "Larry Ellison, le fondateur d'Oracle Corporation"
      - "Linus Torvalds, le créateur du noyau Linux"
    why: "Monty Widenius a lancé MariaDB en 2009, inquiet du rachat annoncé de Sun, propriétaire de MySQL, par Oracle."
  - id: nom-my
    prompt: "D'où vient le « My » de MySQL ?"
    answer: "Du prénom de la fille de son cofondateur Michael Widenius"
    decoys:
      - "De l'anglais « my », pour « ma propre base de données »"
      - "Des initiales de ses deux fondateurs, Monty et Yann"
    why: "My est le prénom de sa fille aînée ; MariaDB porte celui de sa fille cadette, Maria."
  - id: type-json
    prompt: "MySQL sait-il stocker du JSON ?"
    answer: "Oui : un type JSON natif existe depuis la version 5.7"
    decoys:
      - "Non : il faut le stocker en texte et le parser dans l'application"
      - "Oui, mais uniquement dans les tables du moteur MyISAM"
    why: "Le type JSON valide le document et offre des fonctions pour en extraire des valeurs ; il fonctionne avec InnoDB."
  - id: planetscale
    prompt: "Quel service managé de base compatible MySQL est construit sur Vitess ?"
    answer: "PlanetScale"
    decoys:
      - "Supabase"
      - "Neon"
    why: "PlanetScale a été fondé par des créateurs de Vitess. Supabase et Neon sont des services basés sur PostgreSQL."
  - id: licence-gpl
    prompt: "Sous quelle licence l'édition communautaire de MySQL est-elle distribuée ?"
    answer: "La GPL, avec une licence commerciale vendue par Oracle"
    decoys:
      - "La licence MIT, sans aucune restriction de redistribution"
      - "La SSPL, comme MongoDB, qui encadre les services managés"
    why: "MySQL est sous double licence : GPL pour l'édition communautaire, licence commerciale pour qui ne veut pas des obligations de la GPL."
  - id: slow-query-log
    prompt: "Quel journal de MySQL sert à repérer les requêtes trop longues ?"
    answer: "Le slow query log"
    decoys:
      - "Le binary log"
      - "Le journal des erreurs du serveur"
    why: "Le slow query log enregistre les requêtes qui dépassent un seuil réglable (long_query_time). Le binary log sert à la réplication et à la restauration."
---
