---
title: Bases de données
description: "Relationnel, document, clé-valeur, distribué, analytique : laquelle pour quel besoin ?"
questions:
  - id: commandes-et-factures
    prompt: "Stocker clients, commandes et factures reliés entre eux, avec des règles d'intégrité"
    answer: postgresql
    decoy: mongodb
    why: "Des données très reliées, avec jointures et contraintes d'intégrité : c'est le terrain du relationnel. Avec MongoDB, on finit par réimplémenter les jointures dans le code."
  - id: catalogue-heterogene
    prompt: "Un catalogue produits où chaque catégorie a ses propres attributs, lus et écrits d'un bloc"
    answer: mongodb
    decoy: mysql
    why: "Des documents à structure variable, manipulés comme un bloc : le modèle document de MongoDB colle au besoin. (Les colonnes JSONB de PostgreSQL seraient une autre option.)"
  - id: ecritures-multi-datacenter
    prompt: "Absorber des écritures massives réparties sur plusieurs datacenters, sans nœud maître"
    answer: cassandra
    decoy: postgresql
    why: "Cassandra est distribuée sans nœud maître, conçue pour ce cas. La réplication native de PostgreSQL fournit des répliques en lecture, pas de répartition des écritures."
  - id: base-pour-lambda
    prompt: "Une base pour des fonctions AWS Lambda, sans machine ni connexion persistante à gérer"
    answer: dynamodb
    decoy: cassandra
    why: "DynamoDB est entièrement managée par AWS et s'utilise sans connexion persistante, ce qui simplifie le serverless. Cassandra demande d'opérer un cluster ou de prendre une offre managée."
  - id: mvp-front-direct
    prompt: "Un MVP dont le front parle directement à la base, avec l'authentification déjà fournie"
    answer: supabase
    decoy: postgresql
    why: "Supabase ajoute à PostgreSQL une authentification, une API générée et du temps réel prêts à l'emploi. PostgreSQL seul impose d'écrire un back-end."
  - id: sessions-qui-expirent
    prompt: "Stocker des sessions utilisateur qui expirent toutes seules"
    answer: redis
    decoy: postgresql
    why: "Redis associe une durée de vie (TTL) à chaque clé et la supprime à l'échéance, en mémoire. Dans PostgreSQL, il faudrait programmer une purge."
  - id: parquet-dans-un-notebook
    prompt: "Requêtes SQL analytiques sur des fichiers Parquet, dans un notebook, sans serveur"
    answer: duckdb
    decoy: snowflake
    why: "DuckDB est embarqué : il tourne dans le processus Python, sans serveur ni facture de calcul. Snowflake est un entrepôt cloud, surdimensionné pour un usage local."
  - id: historique-des-ventes
    prompt: "Analyser des années d'historique des ventes, pour plusieurs équipes et outils de BI"
    answer: snowflake
    decoy: postgresql
    why: "Un entrepôt colonnaire est conçu pour parcourir de gros historiques. PostgreSQL stocke par lignes et vise le transactionnel."
  - id: entrepot-google-cloud
    prompt: "Un entrepôt de données sur Google Cloud, sans aucun réglage de capacité"
    answer: bigquery
    decoy: snowflake
    why: "BigQuery est serverless et natif de Google Cloud : on écrit du SQL, Google alloue le calcul. Snowflake tourne aussi sur Google Cloud, mais on y dimensionne ses entrepôts virtuels."
  - id: ecritures-unitaires-transactions
    prompt: "La base principale d'une application : beaucoup de petites écritures et des transactions"
    answer: postgresql
    decoy: bigquery
    why: "PostgreSQL garantit des transactions ACID. Un entrepôt comme BigQuery n'est pas un moteur transactionnel."
  - id: reporting-ad-hoc
    prompt: "Laisser les analystes écrire des requêtes SQL ad hoc sur les données de l'application"
    answer: postgresql
    decoy: dynamodb
    why: "DynamoDB impose de connaître ses requêtes avant de modéliser : ni jointures ni reporting ad hoc. PostgreSQL accepte n'importe quelle requête SQL."
  - id: plusieurs-ecrivains
    prompt: "Plusieurs applications écrivent en même temps dans la même base"
    answer: postgresql
    decoy: duckdb
    why: "Un seul processus peut écrire dans un fichier DuckDB. PostgreSQL gère les accès concurrents (MVCC)."
  - id: base-dans-un-fichier
    prompt: "La base locale d'un outil en ligne de commande, dans un simple fichier, sans serveur"
    answer: sqlite
    decoy: postgresql
    why: "SQLite est une bibliothèque embarquée : toute la base tient dans un fichier, sans serveur à installer. PostgreSQL est un serveur à faire tourner à côté."
  - id: donnees-hors-ligne
    prompt: "Garder les données d'une application mobile disponibles hors ligne, sur le téléphone"
    answer: sqlite
    decoy: dynamodb
    why: "SQLite tourne sur le téléphone lui-même : il est intégré à iOS et Android. DynamoDB est un service AWS, inaccessible sans réseau."
  - id: plusieurs-serveurs-web
    prompt: "La base d'une application web déployée sur plusieurs serveurs qui écrivent tous"
    answer: postgresql
    decoy: sqlite
    why: "Un fichier SQLite vit sur une seule machine et n'accepte qu'un écrivain à la fois. PostgreSQL est un serveur auquel toutes les instances se connectent."
  - id: recherche-catalogue
    prompt: "Une recherche dans un gros catalogue, tolérante aux fautes de frappe, triée par pertinence, avec filtres à facettes"
    answer: elasticsearch
    decoy: postgresql
    why: "Elasticsearch est un moteur de recherche : index inversé, score de pertinence, tolérance aux fautes et agrégations pour les facettes. La recherche plein texte de PostgreSQL convient à des besoins plus simples."
  - id: recherche-petit-blog
    prompt: "Une barre de recherche dans les articles d'un petit blog, sans ajouter de système"
    answer: postgresql
    decoy: elasticsearch
    why: "La recherche plein texte intégrée à PostgreSQL évite un second système à opérer et à synchroniser. Elasticsearch se justifie quand la recherche devient le cœur du produit."
  - id: tableaux-de-bord-evenements
    prompt: "Des tableaux de bord interactifs sur un flux massif d'événements, mis à jour en continu"
    answer: clickhouse
    decoy: postgresql
    why: "ClickHouse range les données par colonne et agrège vite de gros volumes d'événements à mesure qu'ils arrivent. PostgreSQL stocke par lignes et vise le transactionnel."
  - id: fragments-de-pages-en-memoire
    prompt: "Garder en mémoire des fragments de pages déjà calculés pour soulager la base, sans besoin de persistance"
    answer: memcached
    decoy: cassandra
    why: "Memcached est un cache clé-valeur en mémoire, avec durée de vie et éviction, fait pour soulager une base. Cassandra est une base distribuée persistante, conçue pour stocker durablement des écritures massives."
  - id: classement-temps-reel
    prompt: "Un classement des meilleurs joueurs, mis à jour à chaque partie"
    answer: redis
    decoy: memcached
    why: "Redis fournit des ensembles triés, avec des opérations atomiques, qui font un classement prêt à l'emploi. Memcached ne stocke que des paires clé-valeur, sans structures de données."
  - id: base-wordpress
    prompt: "La base d'un site WordPress chez un hébergeur classique"
    answer: mysql
    decoy: mongodb
    why: "WordPress s'appuie sur MySQL, que les hébergeurs fournissent depuis l'époque de la pile LAMP. MongoDB est une base de documents, sans SQL."
  - id: geospatial-et-vecteurs
    prompt: "Une base relationnelle enrichie d'extensions : géospatial poussé, recherche vectorielle, types avancés"
    answer: postgresql
    decoy: mysql
    why: "PostgreSQL est très extensible et mieux pourvu en types avancés, SQL analytique et extensions. MySQL vise plutôt l'application web classique."
  - id: modele-encore-instable
    prompt: "Un produit jeune dont les requêtes changent chaque semaine, avec des filtres variés"
    answer: postgresql
    decoy: cassandra
    why: "PostgreSQL accepte n'importe quelle requête SQL sur un schéma qui évolue par migrations. Avec Cassandra, on conçoit une table par requête : chaque nouvelle requête peut imposer une nouvelle table et une migration des données."
  - id: commandes-modifiees-une-a-une
    prompt: "La base transactionnelle d'une boutique PHP, où chaque commande est modifiée individuellement"
    answer: mysql
    decoy: clickhouse
    why: "MySQL (moteur InnoDB) offre transactions ACID et verrouillage par ligne, et accompagne PHP depuis longtemps. Dans ClickHouse, les mises à jour unitaires sont coûteuses et il n'y a pas de transactions comparables."
  - id: analyse-ponctuelle-portable
    prompt: "Une analyse ponctuelle de quelques gigaoctets de journaux exportés, sur son portable"
    answer: duckdb
    decoy: clickhouse
    why: "DuckDB tourne dans le processus qui l'appelle, sans serveur, et suffit pour des données qui tiennent sur une machine. ClickHouse est un serveur à opérer, conçu pour une analytique continue sur de gros volumes."
  - id: entrepot-plusieurs-clouds
    prompt: "Un entrepôt de données qui peut tourner au choix sur AWS, Azure ou Google Cloud"
    answer: snowflake
    decoy: bigquery
    why: "Snowflake est proposé sur les trois grands clouds, ce qui évite de lier l'entrepôt à un seul fournisseur. BigQuery est le service natif de Google Cloud."
  - id: documents-sans-fournisseur
    prompt: "Une base de documents JSON qu'on peut faire tourner chez n'importe quel hébergeur ou sur ses serveurs"
    answer: mongodb
    decoy: dynamodb
    why: "MongoDB s'installe partout, avec une offre managée en option. L'API de DynamoDB est propre à AWS : on dépend du fournisseur."
  - id: sharding-fourni-par-la-base
    prompt: "Répartir des documents sur de nombreux serveurs avec un partitionnement fourni par la base elle-même"
    answer: mongodb
    decoy: mysql
    why: "MongoDB intègre le sharding et la réplication. MySQL réplique simplement, mais répartir ses données sur de nombreux serveurs demande un outil ajouté par-dessus, comme Vitess."
  - id: prototype-relationnel-heberge
    prompt: "Un back-end hébergé pour un prototype mobile, en gardant une vraie base relationnelle"
    answer: supabase
    decoy: dynamodb
    why: "Supabase fournit une base PostgreSQL, l'authentification et une API générée, prêtes à l'emploi. DynamoDB est une base clé-valeur et document : ni relationnelle, ni livrée avec l'authentification."
  - id: application-de-bureau
    prompt: "Les données transactionnelles d'une application de bureau, enregistrées dans un fichier local"
    answer: sqlite
    decoy: duckdb
    why: "SQLite est une base relationnelle embarquée faite pour les données d'une application. DuckDB est aussi embarqué, mais vise l'analytique, pas le transactionnel."
---
