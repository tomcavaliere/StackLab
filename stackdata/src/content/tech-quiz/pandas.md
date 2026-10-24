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
  - id: lecture-par-morceaux
    prompt: "Un CSV est un peu trop gros pour la mémoire. Quelle astuce pandas permet de le lire sans tout charger d'un coup ?"
    answer: "Le lire par morceaux, avec le paramètre chunksize de read_csv"
    decoys:
      - "L'ouvrir en mode paresseux, qui optimise le plan avant de charger les lignes utiles"
      - "Activer la répartition automatique du fichier sur plusieurs machines du réseau local"
    why: "chunksize renvoie le fichier par morceaux qu'on traite l'un après l'autre. Le mode paresseux est celui de Polars, et pandas ne se répartit pas sur plusieurs machines."
  - id: valeurs-manquantes
    prompt: "Comment remplacer ou supprimer les valeurs manquantes d'un DataFrame ?"
    answer: "fillna remplace les valeurs manquantes, dropna supprime les lignes concernées"
    decoys:
      - "isna remplace les valeurs manquantes, fillna les repère dans chaque colonne"
      - "merge remplace les valeurs manquantes, pivot supprime les lignes concernées"
    why: "fillna et dropna sont les outils de traitement des valeurs manquantes. isna sert à les repérer, merge et pivot à combiner ou remodeler les tableaux."
  - id: dates-en-texte
    prompt: "Une colonne de dates a été lue comme du texte. Que faire avant de calculer des écarts de jours ?"
    answer: "La convertir en vrai type date, avec to_datetime"
    decoys:
      - "Rien : pandas devine le type à chaque calcul et convertit tout seul le texte"
      - "Réécrire le fichier au format Excel, qui impose un type date aux colonnes"
    why: "Des dates stockées en texte ne se soustraient pas. Il faut corriger le type de la colonne avant de calculer."
  - id: vectorisation
    prompt: "Pourquoi préférer une opération sur une colonne entière à une boucle Python ligne par ligne ?"
    answer: "Elle s'exécute en code compilé sur toute la colonne, bien plus vite"
    decoys:
      - "Elle utilise automatiquement tous les cœurs de la machine ainsi que le GPU"
      - "Elle écrit le résultat sur le disque au fur et à mesure, ce qui libère la mémoire"
    why: "Les opérations vectorisées évitent la lenteur d'une boucle Python. pandas exécute surtout sur un seul cœur et garde tout en mémoire."
  - id: loc-iloc
    prompt: "Quelle différence entre loc et iloc pour sélectionner des lignes ?"
    answer: "loc sélectionne par étiquette, iloc par position"
    decoys:
      - "loc sélectionne par position, iloc par étiquette"
      - "loc travaille sur les colonnes uniquement, iloc sur les lignes uniquement"
    why: "loc s'appuie sur les étiquettes de l'index, iloc sur la position (0, 1, 2…). Les deux acceptent lignes et colonnes."
  - id: empiler
    prompt: "Empiler les ventes de janvier et celles de février, deux DataFrames de même structure : quelle opération ?"
    answer: "concat, qui les place l'un à la suite de l'autre"
    decoys:
      - "merge sur la colonne date, qui apparie chaque ligne de janvier à sa jumelle de février"
      - "pivot, qui transforme les mois en colonnes"
    why: "concat empile des tableaux de même structure. merge joint sur une clé commune et pivot remodèle un seul tableau."
  - id: tableau-croise
    prompt: "Obtenir un total par pays et par mois, avec les mois en colonnes : quelle opération ?"
    answer: "pivot_table, un tableau croisé"
    decoys:
      - "groupby sans aucune agrégation sur les colonnes pays et mois"
      - "concat des tableaux de chaque mois, l'un à côté de l'autre"
    why: "pivot_table agrège puis déplie une colonne en colonnes. groupby seul ne dispose pas les mois en colonnes, et concat ne calcule rien."
  - id: lecture-sql
    prompt: "Le résultat d'une requête SQL peut-il être chargé dans pandas ?"
    answer: "Oui : pandas lit aussi les tables SQL, en plus des fichiers"
    decoys:
      - "Non : pandas ne lit que des fichiers CSV ou Excel présents sur le disque"
      - "Non : seul un serveur dédié à pandas peut interroger une base de données"
    why: "pandas lit CSV, Excel, Parquet, JSON et SQL. Il ne demande aucun serveur propre."
  - id: execution-immediate
    prompt: "Que signifie le fait que pandas exécute chaque opération immédiatement ?"
    answer: "Chaque opération est calculée tout de suite, sans optimiseur qui regarde l'enchaînement"
    decoys:
      - "Les opérations sont accumulées puis optimisées avant de s'exécuter sur un cluster"
      - "Chaque ligne est écrite dans une base de données dès qu'elle est modifiée"
    why: "pandas n'a pas de plan de requête à optimiser. L'exécution paresseuse avec optimisation est le propre de Polars ou de Spark."
  - id: createur
    prompt: "Qui a créé pandas, à partir de 2008 ?"
    answer: "Wes McKinney"
    decoys:
      - "Matei Zaharia, au laboratoire AMPLab de Berkeley"
      - "Guido van Rossum, le créateur de Python"
    why: "Wes McKinney a créé pandas pour apporter le DataFrame à Python. Matei Zaharia est à l'origine de Spark."
  - id: jointure-gauche
    prompt: "Conserver toutes les commandes dans un merge, même celles sans client correspondant : quel type de jointure ?"
    answer: "Une jointure à gauche (how=left), avec les commandes à gauche"
    decoys:
      - "Une jointure interne (how=inner), qui garde toutes les lignes des deux tableaux"
      - "Un concat des deux tableaux, qui apparie les lignes par leur clé"
    why: "La jointure à gauche garde toutes les lignes du tableau de gauche. La jointure interne ne garde que les lignes qui ont une correspondance, et concat n'apparie rien."
  - id: immediat-notebook
    prompt: "Pourquoi pandas est-il si pratique dans un notebook ?"
    answer: "Les données sont en mémoire sur une machine : le résultat de chaque opération est visible tout de suite"
    decoys:
      - "Il distribue automatiquement les calculs sur un cluster dès que le notebook devient lent"
      - "Il enregistre chaque DataFrame dans une base de données partagée avec les autres notebooks"
    why: "Pas de serveur ni de cluster : on charge, on regarde et on transforme dans le même processus."
  - id: alimenter-scikit-learn
    prompt: "Quelle bibliothèque reçoit directement les DataFrames préparés avec pandas pour entraîner un modèle ?"
    answer: "scikit-learn"
    decoys:
      - "Kubernetes"
      - "Spark Streaming"
    why: "Les DataFrames nettoyés alimentent scikit-learn ou XGBoost. Kubernetes orchestre des conteneurs et Spark Streaming traite des flux."
  - id: duckdb-difference
    prompt: "Qu'apporte DuckDB que pandas n'offre pas ?"
    answer: "Des transformations écrites en SQL, sur des fichiers plus gros que la mémoire"
    decoys:
      - "La répartition du calcul sur un cluster de plusieurs nœuds en parallèle"
      - "Un serveur transactionnel multi-utilisateur pour les écritures de l'application"
    why: "DuckDB est une base analytique embarquée : SQL, sans serveur, sur une machine. Le cluster est le terrain de Spark, les transactions celui d'une base comme PostgreSQL."
  - id: comptage-valeurs
    prompt: "Compter combien de fois chaque valeur d'une colonne apparaît : quelle méthode ?"
    answer: "value_counts"
    decoys:
      - "describe, qui résume les statistiques de toutes les colonnes numériques"
      - "merge, qui apparie la colonne avec elle-même pour compter"
    why: "value_counts renvoie la fréquence de chaque valeur. describe donne des statistiques générales, merge sert aux jointures."
  - id: premier-coup-d-oeil
    prompt: "Pour découvrir un DataFrame, quelles méthodes donnent les premières lignes, les types et des statistiques ?"
    answer: "head, info et describe"
    decoys:
      - "merge, pivot et concat, qui affichent les données sans jamais les modifier"
      - "groupby et agg, qui exigent de connaître déjà les colonnes du tableau"
    why: "head montre les premières lignes, info les types et les valeurs manquantes, describe des statistiques. merge, pivot, concat et groupby remodèlent ou agrègent."
  - id: colonne-categorie
    prompt: "Une colonne de pays, avec peu de valeurs différentes répétées sur des millions de lignes, pèse lourd en mémoire. Que faire ?"
    answer: "La convertir en type catégoriel (category)"
    decoys:
      - "La convertir en nombres décimaux (float), plus compacts que le texte"
      - "La dupliquer sur le disque, ce qui libère de la mémoire en mémoire vive"
    why: "Le type catégoriel stocke chaque valeur distincte une seule fois. Les décimaux ne s'appliquent pas à du texte, et dupliquer sur disque ne libère rien."
  - id: script-planifie
    prompt: "Un script pandas nettoie chaque nuit un export de volume modeste. Est-ce adapté ?"
    answer: "Oui : le volume tient en mémoire et le traitement est petit et automatisé"
    decoys:
      - "Non : pandas ne fonctionne que dans un notebook, jamais dans un script planifié"
      - "Non : il faut un cluster Spark dès qu'un traitement doit tourner la nuit"
    why: "pandas convient aux petits traitements ponctuels ou automatisés qui tiennent en mémoire. Un cluster ne se justifie que quand les données ne tiennent plus sur une machine."
  - id: index
    prompt: "À quoi sert l'index d'un DataFrame ?"
    answer: "À étiqueter les lignes, pour les sélectionner et aligner deux tableaux"
    decoys:
      - "À accélérer les requêtes en créant un index secondaire persistant dans un fichier"
      - "À numéroter les colonnes pour que merge sache dans quel ordre les joindre"
    why: "L'index identifie les lignes : loc s'en sert pour sélectionner et les opérations entre tableaux s'alignent dessus. Il n'a pas de rôle de stockage persistant."
  - id: persistance
    prompt: "Un DataFrame est-il conservé automatiquement entre deux exécutions du script ?"
    answer: "Non : il vit dans la mémoire du processus, il faut l'écrire dans un fichier ou une table"
    decoys:
      - "Oui : pandas le persiste automatiquement dans un fichier caché à côté du script"
      - "Oui : il est enregistré sur le serveur pandas qui garde les tables entre deux sessions"
    why: "pandas n'est ni une base de données ni un serveur. Pour garder un résultat, on l'écrit en CSV, en Parquet ou dans une table SQL."
---
