---
questions:
  - id: embarquee
    prompt: "Qu'est-ce qui caractérise DuckDB ?"
    answer: "Une base analytique embarquée : elle tourne dans le processus qui l'appelle, sans serveur"
    decoys:
      - "Un entrepôt cloud managé, facturé à la requête"
      - "Une base transactionnelle client-serveur, comme PostgreSQL, à installer sur une machine dédiée"
    why: "Pas de serveur à installer : une bibliothèque Python ou un binaire en ligne de commande suffit."
  - id: comme-sqlite
    prompt: "À quelle base DuckDB ressemble-t-il, mais pour l'analytique ?"
    answer: "SQLite"
    decoys:
      - "Cassandra"
      - "Redis"
    why: "Comme SQLite, DuckDB est embarqué dans l'application ; mais son moteur est colonnaire, fait pour agréger."
  - id: fichiers
    prompt: "Quels fichiers DuckDB lit-il directement ?"
    answer: "CSV, JSON et Parquet, en local comme sur S3"
    decoys:
      - "Uniquement ses propres fichiers .duckdb"
      - "Uniquement des tables importées depuis PostgreSQL"
    why: "DuckDB interroge en SQL des fichiers posés sur le disque ou dans S3, sans les importer d'abord."
  - id: moteur
    prompt: "Comment son moteur est-il conçu ?"
    answer: "Colonnaire et vectorisé"
    decoys:
      - "Orienté lignes, optimisé pour les écritures unitaires"
      - "Distribué sur plusieurs nœuds"
    why: "Le stockage colonnaire et l'exécution vectorisée rendent les agrégations rapides, sur une seule machine."
  - id: un-seul-ecrivain
    prompt: "Pourquoi DuckDB ne convient-il pas à plusieurs applications qui écrivent dans la même base ?"
    answer: "Un seul processus peut écrire dans un fichier DuckDB"
    decoys:
      - "Il n'accepte pas les commandes INSERT"
      - "Il efface la base à la fermeture du processus qui l'a ouverte"
    why: "DuckDB est embarqué : un seul processus écrit dans le fichier. Des écritures concurrentes demandent une base client-serveur."
  - id: trop-gros
    prompt: "Les données dépassent largement ce qu'une machine peut traiter. DuckDB convient-il ?"
    answer: "Non : il faut Spark ou un entrepôt cloud"
    decoys:
      - "Oui : DuckDB se répartit automatiquement sur un cluster"
      - "Oui, en ajoutant une réplique en lecture"
    why: "DuckDB tourne sur une machine. Au-delà, il faut répartir le calcul (Spark) ou passer à un entrepôt."
  - id: pandas
    prompt: "Comment DuckDB s'intègre-t-il à pandas et Polars ?"
    answer: "Il interroge leurs données sans copie inutile"
    decoys:
      - "Il les remplace : on ne peut plus les utiliser ensemble"
      - "Il exporte leurs données en CSV puis les recharge"
    why: "DuckDB lit directement les DataFrames : SQL et code Python cohabitent dans le même script."
  - id: bon-usage
    prompt: "Quel usage correspond bien à DuckDB ?"
    answer: "Transformer quelques gigaoctets de Parquet dans une étape de pipeline ou un notebook"
    decoys:
      - "La base principale d'une application web transactionnelle"
      - "Un entrepôt partagé par dix équipes, avec gestion fine des accès et calcul à la demande"
    why: "Volumes qui tiennent sur une machine, sans serveur : c'est son terrain. Un entrepôt partagé relève de Snowflake ou BigQuery."
  - id: origine
    prompt: "Où DuckDB est-il né ?"
    answer: "Au CWI d'Amsterdam"
    decoys:
      - "Chez Google"
      - "À l'AMPLab de Berkeley"
    why: "DuckDB vient du CWI d'Amsterdam ; la version 1.0 date de 2024. Spark est né à l'AMPLab."
  - id: prototyper
    prompt: "Pourquoi utiliser DuckDB avant un entrepôt cloud ?"
    answer: "Pour prototyper des requêtes analytiques en local, sans coût, avant de les porter"
    decoys:
      - "Parce qu'il synchronise automatiquement ses tables avec Snowflake et BigQuery"
      - "Parce que dbt ne fonctionne pas sans lui"
    why: "On écrit et teste ses requêtes en local, gratuitement, puis on les porte sur l'entrepôt."
---
