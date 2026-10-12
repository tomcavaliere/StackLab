---
questions:
  - id: dataframe
    prompt: "Quelle structure est au cœur de pandas ?"
    answer: "Le DataFrame, un tableau à colonnes typées"
    decoys:
      - "Le tenseur multidimensionnel calculé sur GPU"
      - "Le RDD, une collection répartie sur plusieurs nœuds d'un cluster"
    why: "pandas manipule des DataFrames : des tables en mémoire, colonne par colonne. Les tenseurs sont ceux de PyTorch, les RDD ceux de Spark."
  - id: limite-memoire
    prompt: "Quelle est la principale limite de pandas ?"
    answer: "Les données doivent tenir dans la mémoire d'une seule machine"
    decoys:
      - "Il ne sait lire que des fichiers CSV, pas de Parquet ni d'Excel"
      - "Il exige un serveur de base de données pour stocker ses tables"
    why: "pandas charge tout en mémoire et calcule sur une machine. Il lit pourtant de nombreux formats (CSV, Excel, Parquet, JSON, SQL) et n'a besoin d'aucun serveur."
  - id: usage-type
    prompt: "Quel est l'usage typique de pandas ?"
    answer: "Explorer et nettoyer des données dans un notebook ou un script Python"
    decoys:
      - "Servir les données d'une application web à des milliers d'utilisateurs simultanés"
      - "Stocker durablement les commandes d'un site e-commerce, avec transactions"
    why: "pandas est un outil d'analyse et de préparation, pas une base de données ni un serveur : il vit dans le processus Python qui l'utilise."
  - id: groupby
    prompt: "Calculer le chiffre d'affaires total par pays dans un DataFrame : quelle opération utiliser ?"
    answer: "Un groupby sur le pays, puis une somme"
    decoys:
      - "Un merge du DataFrame avec lui-même"
      - "Un tri par pays, puis une boucle Python qui additionne ligne à ligne"
    why: "groupby regroupe les lignes par valeur et agrège chaque groupe, comme GROUP BY en SQL. merge sert aux jointures ; une boucle Python serait bien plus lente."
  - id: merge
    prompt: "Associer à chaque commande les informations du client correspondant, dans un autre DataFrame : quelle opération ?"
    answer: "merge, l'équivalent d'une jointure SQL"
    decoys:
      - "groupby, qui regroupe les commandes par client"
      - "pivot, qui transforme les clients en colonnes"
    why: "merge joint deux DataFrames sur une clé commune, comme un JOIN. groupby agrège, pivot réorganise lignes et colonnes."
  - id: plus-gros-que-memoire
    prompt: "Un fichier Parquet plus gros que la mémoire, à analyser en SQL sur un portable : que choisir plutôt que pandas ?"
    answer: "DuckDB"
    decoys:
      - "Spark sur un cluster de plusieurs nœuds"
      - "Une base PostgreSQL dans laquelle on importe d'abord le fichier"
    why: "DuckDB est une base analytique embarquée, sans serveur : elle lit directement le Parquet en SQL et peut traiter plus que la mémoire. Un cluster Spark serait surdimensionné sur une seule machine."
  - id: au-dela-machine
    prompt: "Les données ne tiennent plus sur une seule machine, même grosse. Quel outil prend le relais de pandas ?"
    answer: "Spark, qui répartit le calcul sur un cluster"
    decoys:
      - "pandas lui-même, en ajoutant de la mémoire d'échange (swap)"
      - "scikit-learn, qui distribue les DataFrames"
    why: "Spark découpe le traitement en tâches parallèles sur plusieurs nœuds, avec une API DataFrame proche. Le swap rend pandas très lent, et scikit-learn ne distribue rien."
  - id: polars
    prompt: "Qu'apporte Polars par rapport à pandas ?"
    answer: "Une exécution multi-cœur et un mode paresseux qui optimise le plan avant de le lancer"
    decoys:
      - "La possibilité de répartir un DataFrame sur un cluster de centaines de nœuds"
      - "Une base de données transactionnelle qui conserve les DataFrames entre deux exécutions"
    why: "Polars reste une bibliothèque de DataFrames sur une machine, mais il exploite tous les cœurs et peut optimiser une suite d'opérations avant exécution. pandas exécute chaque opération tout de suite, surtout sur un cœur."
  - id: avant-le-modele
    prompt: "Dans un projet de machine learning, quel est le rôle habituel de pandas ?"
    answer: "Préparer les données avant de les passer au modèle"
    decoys:
      - "Entraîner le modèle de classification lui-même"
      - "Servir les prédictions du modèle derrière une API HTTP"
    why: "pandas charge, nettoie et transforme les données ; un modèle scikit-learn ou XGBoost les reçoit ensuite. pandas n'entraîne aucun modèle et ne sert pas d'API."
  - id: dans-entrepot
    prompt: "Les données sont déjà dans un entrepôt SQL et les transformations tournent chaque nuit. pandas est-il le bon outil ?"
    answer: "Plutôt non : autant écrire les transformations en SQL dans l'entrepôt, avec dbt par exemple"
    decoys:
      - "Oui : il faut toujours rapatrier les données dans pandas avant de les transformer"
      - "Oui : pandas s'installe directement dans l'entrepôt et y remplace le moteur SQL"
    why: "Rapatrier les données dans un processus Python limité par la mémoire n'a pas de sens si l'entrepôt sait déjà calculer. dbt organise ces transformations SQL là où sont les données."
---
