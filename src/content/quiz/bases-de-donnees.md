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
---
