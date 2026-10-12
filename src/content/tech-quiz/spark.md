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
  - id: driver
    prompt: "Dans une application Spark, quel rôle joue le driver ?"
    answer: "Il planifie le travail et le répartit entre les exécuteurs"
    decoys:
      - "Il stocke durablement les données sur les disques des nœuds du cluster"
      - "Il exécute seul tous les calculs ; les exécuteurs ne font que lire les fichiers"
    why: "Le driver construit le plan et distribue les tâches ; les exécuteurs font le calcul. Spark ne stocke pas durablement les données."
  - id: evaluation-paresseuse
    prompt: "Que se passe-t-il quand on appelle filter() ou select() sur un DataFrame Spark ?"
    answer: "Rien n'est encore calculé : l'opération s'ajoute au plan, exécuté plus tard"
    decoys:
      - "Le calcul démarre aussitôt sur le cluster et le résultat est gardé en mémoire"
      - "Les données sont rapatriées sur le driver pour y être filtrées localement"
    why: "Les transformations sont paresseuses : l'optimiseur attend une action pour optimiser l'ensemble du plan."
  - id: actions
    prompt: "Qu'est-ce qui déclenche réellement un calcul dans Spark ?"
    answer: "Une action, comme count(), collect() ou l'écriture d'un résultat"
    decoys:
      - "Une transformation, comme filter(), select() ou withColumn()"
      - "La création de la SparkSession, qui calcule tous les DataFrames déclarés"
    why: "Tant qu'aucune action n'est appelée, Spark ne fait que construire le plan."
  - id: collect
    prompt: "Quel risque présente collect() sur un très gros DataFrame ?"
    answer: "Il rapatrie toutes les lignes sur le driver, qui peut manquer de mémoire"
    decoys:
      - "Il supprime le DataFrame du cluster dès qu'il a été lu une première fois"
      - "Il réécrit toutes les données sur disque au format CSV, ce qui ralentit le job"
    why: "collect() ramène le résultat dans la mémoire d'une seule machine ; on préfère écrire le résultat ou n'en ramener qu'un extrait (limit, take)."
  - id: shuffle
    prompt: "Qu'est-ce qu'un shuffle dans Spark ?"
    answer: "Une redistribution des données entre les nœuds, par exemple pour un groupBy ou une jointure"
    decoys:
      - "Un mélange aléatoire des lignes, utilisé pour tirer un échantillon d'un DataFrame"
      - "Une réécriture des fichiers Parquet de sortie pour fusionner les petits fichiers"
    why: "Pour regrouper les lignes d'une même clé, Spark doit les envoyer sur le même exécuteur."
  - id: cout-shuffle
    prompt: "Pourquoi cherche-t-on à limiter les shuffles dans un job Spark ?"
    answer: "Ils font transiter les données par le réseau et le disque, ce qui coûte cher"
    decoys:
      - "Ils vident le cache mémoire de tous les DataFrames de la session en cours"
      - "Ils sont interdits en streaming et font échouer le job s'ils apparaissent"
    why: "Le shuffle est souvent l'étape la plus lente d'un job ; les agrégations restent possibles en streaming."
  - id: partitions
    prompt: "Qu'est-ce qu'une partition, dans l'exécution d'un job Spark ?"
    answer: "Un morceau des données, traité par une tâche sur un exécuteur"
    decoys:
      - "Un disque du cluster réservé aux données d'un seul utilisateur"
      - "Un fichier de configuration propre à chaque étape du job"
    why: "Le nombre de partitions fixe le parallélisme : trop peu, le cluster est sous-utilisé ; trop, la gestion des tâches coûte."
  - id: broadcast
    prompt: "Jointure entre une très grosse table et une petite : quelle technique évite de redistribuer la grosse ?"
    answer: "Diffuser (broadcast) la petite table à tous les exécuteurs"
    decoys:
      - "Trier la grosse table sur le driver avant de lancer la jointure"
      - "Convertir les deux tables en CSV pour les joindre ligne à ligne"
    why: "Chaque exécuteur reçoit une copie de la petite table et joint ses partitions sur place, sans shuffle de la grosse."
  - id: desequilibre
    prompt: "Une tâche dure bien plus longtemps que les autres, car une clé concentre la plupart des lignes. Comment s'appelle ce problème ?"
    answer: "Des données déséquilibrées (data skew)"
    decoys:
      - "Une fuite de mémoire du driver"
      - "Une évaluation paresseuse ratée"
      - "Une partition orpheline"
    why: "Toutes les lignes d'une clé arrivent sur la même tâche, qui ralentit tout le job : c'est l'un des réglages qui demandent de l'expertise."
  - id: cache
    prompt: "Que fait df.cache() sur un DataFrame Spark ?"
    answer: "Il le garde en mémoire après son premier calcul, pour le réutiliser"
    decoys:
      - "Il l'écrit dans un fichier Parquet permanent sur le stockage objet"
      - "Il lance immédiatement son calcul sur tous les exécuteurs du cluster"
    why: "cache() est lui aussi paresseux : le DataFrame est mis en mémoire à la première action, et ce n'est pas une sauvegarde durable."
  - id: rdd
    prompt: "Qu'est-ce qu'un RDD dans Spark ?"
    answer: "L'abstraction historique de bas niveau, sur laquelle reposent les DataFrames"
    decoys:
      - "Le format de fichier colonnaire propre à Spark, concurrent direct de Parquet"
      - "Le service managé de Spark proposé par Databricks sur les trois grands clouds"
    why: "Le RDD (Resilient Distributed Dataset) est une collection distribuée d'objets ; les DataFrames ajoutent un schéma par-dessus."
  - id: dataframes-vs-rdd
    prompt: "Pourquoi préfère-t-on aujourd'hui les DataFrames aux RDD ?"
    answer: "L'optimiseur connaît leur schéma et peut réorganiser leurs opérations"
    decoys:
      - "Les RDD ont été retirés de Spark et ne sont plus disponibles dans l'API"
      - "Les DataFrames s'exécutent sur le driver seul, sans passer par le réseau"
    why: "Avec un RDD, Spark voit des fonctions opaques ; avec un DataFrame, il sait quelles colonnes sont lues et peut optimiser. Les RDD existent toujours."
  - id: lignee
    prompt: "Comment Spark reconstitue-t-il une partition perdue quand un nœud tombe ?"
    answer: "Par la lignée : il rejoue les transformations qui l'ont produite"
    decoys:
      - "Il la recharge depuis une réplique gardée sur trois nœuds, comme HDFS"
      - "Il redémarre le job entier depuis le début, sur un nouveau cluster"
    why: "Spark garde la recette de chaque partition plutôt qu'une copie ; il ne recalcule que ce qui manque."
  - id: sparksession
    prompt: "Quel objet sert de point d'entrée à une application Spark moderne (DataFrames, SQL) ?"
    answer: "La SparkSession"
    decoys:
      - "Le metastore Hive"
      - "Un fichier spark-job.yaml"
      - "Le gestionnaire YARN"
    why: "On crée une SparkSession pour lire des données, créer des DataFrames et lancer du SQL. Le metastore et YARN sont des composants externes optionnels."
  - id: gestionnaires-cluster
    prompt: "Sur quoi Spark peut-il s'exécuter ?"
    answer: "Kubernetes, YARN, ou des offres managées (Databricks, EMR, Dataproc)"
    decoys:
      - "Uniquement sur un cluster Hadoop installé sur des serveurs physiques"
      - "Uniquement sur Databricks, seul éditeur autorisé à le distribuer"
    why: "Spark est un projet Apache open source : il tourne sur plusieurs gestionnaires de ressources et chez plusieurs fournisseurs."
  - id: parquet
    prompt: "Quel format de fichier est le choix courant pour les données qu'un job Spark lit dans un data lake ?"
    answer: "Parquet, un format colonnaire"
    decoys:
      - "JSON, un format colonnaire compressé"
      - "CSV, un format binaire indexé"
      - "XML, un format colonnaire typé"
    why: "Parquet stocke les données par colonne : Spark ne lit que les colonnes utiles. JSON, CSV et XML sont des formats texte orientés lignes."
  - id: formats-de-table
    prompt: "Qu'apportent Iceberg ou Delta Lake au-dessus de fichiers Parquet ?"
    answer: "Une couche de table : transactions, schéma et historique des versions"
    decoys:
      - "Un moteur de calcul distribué qui remplace Spark pour les gros volumes"
      - "Un algorithme de compression qui divise la taille des fichiers Parquet"
    why: "Ce sont des formats de table que Spark lit et écrit ; le calcul reste fait par Spark."
  - id: orchestration
    prompt: "Quel outil déclenche et enchaîne couramment les jobs Spark ?"
    answer: "Airflow"
    decoys:
      - "Redis"
      - "pandas"
      - "Kafka"
    why: "Spark exécute un traitement ; la planification et l'enchaînement des jobs relèvent d'un orchestrateur comme Airflow."
  - id: udf-python
    prompt: "Pourquoi une fonction Python définie par l'utilisateur (UDF) peut-elle ralentir un job PySpark ?"
    answer: "Les données passent de la JVM à un processus Python, ce qui coûte cher"
    decoys:
      - "Une UDF Python désactive le cluster et force l'exécution sur le driver seul"
      - "Une UDF Python oblige Spark à relire toutes les données depuis le disque"
    why: "L'optimiseur ne voit pas dans une UDF et chaque ligne doit être sérialisée ; les fonctions intégrées de Spark évitent ce va-et-vient."
  - id: structured-streaming
    prompt: "Comment Structured Streaming traite-t-il un flux de données ?"
    answer: "Comme une table qui grandit, avec les mêmes API que le batch, en micro-lots par défaut"
    decoys:
      - "Événement par événement, avec une API entièrement distincte de celle des DataFrames"
      - "En stockant le flux dans Kafka, puis en relançant un job batch complet chaque nuit"
    why: "On écrit la même requête de DataFrames qu'en batch ; Spark l'applique de façon incrémentale aux nouvelles données."
---
