---
questions:
  - id: probleme
    prompt: "Quel problème Spark résout-il ?"
    answer: "Répartir sur un cluster un traitement de données trop gros pour une machine"
    decoys:
      - "Stocker durablement les données d'une application, avec des transactions"
      - "Planifier des pipelines à heure fixe"
    why: "Spark découpe les données, envoie le travail sur plusieurs nœuds et gère les pannes. La planification relève d'un orchestrateur comme Airflow."
  - id: langages
    prompt: "Dans quels langages écrit-on un traitement Spark ?"
    answer: "Python (PySpark), Scala, Java ou SQL"
    decoys:
      - "Uniquement Scala, le langage de son moteur"
      - "JavaScript ou Ruby"
    why: "Les DataFrames s'utilisent dans plusieurs langages, et Spark SQL permet d'écrire en SQL."
  - id: optimiseur
    prompt: "Que fait l'optimiseur de Spark ?"
    answer: "Il transforme le code (DataFrames, SQL) en plan d'exécution distribué"
    decoys:
      - "Il choisit le fournisseur cloud le moins cher pour chaque exécution"
      - "Il compresse les fichiers Parquet"
    why: "On écrit un code qui ressemble à du traitement local ; l'optimiseur en fait un plan réparti sur le cluster."
  - id: memoire
    prompt: "Où Spark garde-t-il les données intermédiaires autant que possible ?"
    answer: "En mémoire"
    decoys:
      - "Dans une base PostgreSQL"
      - "Dans un topic Kafka"
    why: "Garder les données intermédiaires en mémoire évite des écritures disque entre les étapes."
  - id: modeles
    prompt: "Que couvre le même modèle de programmation de Spark ?"
    answer: "Le batch, le streaming (Structured Streaming) et le machine learning (MLlib)"
    decoys:
      - "Uniquement le batch, le streaming relevant d'un autre moteur"
      - "Le rendu web côté serveur"
    why: "Le même modèle de DataFrames sert à trois usages."
  - id: petit-volume
    prompt: "Quelques millions de lignes à transformer : Spark est-il adapté ?"
    answer: "Non : le coût d'un cluster dépasse le gain ; DuckDB ou pandas suffisent"
    decoys:
      - "Oui : Spark est toujours plus rapide que les autres outils"
      - "Oui : sans Spark, quelques millions de lignes ne tiennent pas en mémoire sur une machine"
    why: "Démarrer et opérer un cluster a un coût fixe. Sur une machine, ces volumes se traitent sans difficulté."
  - id: entrepot
    prompt: "Données déjà dans un entrepôt, transformations exprimables en SQL : que préférer ?"
    answer: "dbt, dans l'entrepôt"
    decoys:
      - "Spark, indispensable pour transformer"
      - "Exporter vers Spark, transformer, puis réimporter"
    why: "Les transformations tournent sans cluster à gérer ; sortir les données de l'entrepôt ajoute du travail."
  - id: databricks
    prompt: "Quelle entreprise a été fondée par les créateurs de Spark ?"
    answer: "Databricks"
    decoys:
      - "Snowflake"
      - "Confluent"
    why: "Confluent a été fondée par les créateurs de Kafka ; Snowflake est indépendante."
  - id: origine
    prompt: "Où Spark est-il né ?"
    answer: "À l'AMPLab de Berkeley, en 2009"
    decoys:
      - "Chez LinkedIn, en 2011"
      - "Au CWI d'Amsterdam, en 2019"
    why: "Kafka est né chez LinkedIn, DuckDB au CWI."
  - id: expertise
    prompt: "Qu'est-ce qui demande de l'expertise avec Spark ?"
    answer: "Le réglage des performances : partitionnement, mémoire, données déséquilibrées"
    decoys:
      - "L'installation de Python sur chacun des postes de l'équipe"
      - "L'écriture de fichiers CSV, que Spark ne sait produire qu'à l'aide d'extensions"
    why: "Un job Spark mal réglé peut être lent ou planter ; la fiche le range dans « Quand l'éviter » pour une équipe sans expérience."
---
