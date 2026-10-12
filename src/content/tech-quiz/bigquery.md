---
questions:
  - id: serverless
    prompt: "Qu'est-ce qui distingue BigQuery d'un entrepôt classique ?"
    answer: "Il n'y a ni serveur ni cluster à dimensionner : Google alloue le calcul"
    decoys:
      - "Il stocke les données par lignes, comme une base transactionnelle"
      - "Il faut réserver un nombre fixe de nœuds avant toute requête"
    why: "BigQuery est serverless : on crée des tables, on écrit du SQL, Google répartit l'exécution. Son stockage est colonnaire."
  - id: facturation
    prompt: "Comment BigQuery peut-il être facturé ?"
    answer: "À la quantité de données lues par requête, ou en réservant de la capacité de calcul"
    decoys:
      - "Au nombre de tables et de datasets créés"
      - "Au nombre d'utilisateurs connectés à la console, avec un forfait par siège et par mois"
    why: "Deux modèles : payer les données lues par chaque requête, ou réserver de la capacité. D'où l'importance de limiter ce que lit une requête."
  - id: select-etoile
    prompt: "Pourquoi un SELECT * sur une grosse table non partitionnée est-il risqué ?"
    answer: "En tarification à la donnée lue, il lit toute la table et peut coûter cher"
    decoys:
      - "Il verrouille la table pour tous les autres utilisateurs"
      - "BigQuery refuse d'exécuter un SELECT * dès qu'une table dépasse quelques millions de lignes"
    why: "Le stockage est colonnaire : SELECT * lit toutes les colonnes, et sans partition toutes les lignes. La facture suit."
  - id: partitionnement
    prompt: "Comment limiter les données lues par une requête BigQuery ?"
    answer: "Partitionner et clusteriser les tables"
    decoys:
      - "Ajouter un index B-tree sur chaque colonne filtrée"
      - "Augmenter la taille du cluster avant la requête"
    why: "Partitionnement et clustering permettent de ne lire que les blocs utiles. Il n'y a pas de cluster à dimensionner, et ce ne sont pas des index B-tree."
  - id: stockage
    prompt: "Comment les données de BigQuery sont-elles stockées ?"
    answer: "En format colonnaire, séparé du calcul"
    decoys:
      - "En lignes, sur les disques des machines de calcul"
      - "En documents JSON, comme dans MongoDB"
    why: "Stockage colonnaire et séparé du calcul : une agrégation ne lit que les colonnes nécessaires, et le calcul s'alloue à la demande."
  - id: dremel
    prompt: "De quel système de Google le moteur de BigQuery descend-il ?"
    answer: "Dremel"
    decoys:
      - "Borg"
      - "Bigtable"
    why: "Le moteur descend de Dremel, décrit par Google dans un article de 2010. Borg a inspiré Kubernetes ; Bigtable est une base NoSQL."
  - id: ecosysteme-google
    prompt: "Dans quel cas BigQuery est-il un choix naturel ?"
    answer: "Une plateforme data sur Google Cloud, ou des données déjà dans l'écosystème Google (Analytics, Ads)"
    decoys:
      - "La base principale d'une application transactionnelle qui fait beaucoup d'écritures unitaires par seconde"
      - "L'analyse locale de quelques fichiers CSV sur un ordinateur portable"
    why: "BigQuery s'intègre aux autres services Google Cloud et aux données Google. Ce n'est ni une base transactionnelle, ni un outil d'analyse locale (DuckDB)."
  - id: autre-cloud
    prompt: "L'infrastructure principale est sur AWS. Quel inconvénient à choisir BigQuery ?"
    answer: "Faire transiter les données entre les deux clouds coûte et complique"
    decoys:
      - "BigQuery ne comprend pas le SQL standard"
      - "BigQuery ne peut lire que des données créées dans Google Analytics"
    why: "Les transferts sortants d'un cloud se paient, et chaque flux de données à travers deux clouds est une brique de plus à maintenir."
  - id: petit-volume
    prompt: "Quelques gigaoctets à analyser par un seul analyste. Que conseille la fiche ?"
    answer: "DuckDB ou PostgreSQL suffisent"
    decoys:
      - "BigQuery, parce qu'il n'y a pas de cluster à gérer"
      - "Spark sur un cluster managé"
    why: "Pour un petit volume, un entrepôt cloud est superflu. DuckDB analyse quelques gigaoctets sur une machine, sans service à payer."
  - id: charges-irregulieres
    prompt: "Pourquoi BigQuery convient-il aux charges irrégulières ?"
    answer: "On ne paie pas un cluster qui attend entre deux requêtes"
    decoys:
      - "Il calcule à l'avance le résultat de toutes les requêtes possibles"
      - "Il supprime automatiquement les tables inutilisées"
    why: "Sans cluster permanent, rien ne tourne entre deux requêtes : en tarification à la donnée lue, une période creuse ne coûte presque rien."
  - id: dry-run
    prompt: "Comment savoir combien de données une requête BigQuery va lire, avant de la lancer ?"
    answer: "Avec une exécution à blanc (dry run), qui renvoie les octets à traiter"
    decoys:
      - "En consultant l'historique des requêtes de la veille dans la console"
      - "En regardant le nombre de lignes affiché dans l'onglet Schéma de la table"
    why: "Le dry run valide la requête et estime les octets lus sans l'exécuter ni la facturer. Ni l'historique ni le schéma ne disent ce que lira une nouvelle requête."
  - id: limit-cout
    prompt: "Ajouter LIMIT 10 à un SELECT sur une table BigQuery non clusterisée réduit-il les octets facturés ?"
    answer: "Non : les colonnes demandées sont lues en entier, LIMIT ne réduit que le résultat"
    decoys:
      - "Oui : BigQuery arrête de lire la table dès qu'il a trouvé dix lignes"
      - "Oui, mais seulement si la table a été chargée à partir de fichiers Avro"
    why: "En tarification à la donnée lue, c'est le volume scanné qui compte : LIMIT s'applique après la lecture. Il faut filtrer sur une partition ou choisir moins de colonnes."
  - id: hierarchie
    prompt: "Comment s'organisent les objets dans BigQuery ?"
    answer: "Projet, puis dataset, puis table"
    decoys:
      - "Cluster, puis base, puis schéma, puis table"
      - "Entrepôt virtuel, puis base, puis table"
    why: "Une table appartient à un dataset, lui-même rattaché à un projet Google Cloud. Il n'y a pas de cluster ; l'entrepôt virtuel est une notion de Snowflake."
  - id: bigquery-ml
    prompt: "Que permet BigQuery ML ?"
    answer: "Entraîner et appliquer des modèles de ML avec des requêtes SQL"
    decoys:
      - "Entraîner des modèles uniquement en Python, dans des notebooks hébergés"
      - "Générer automatiquement le schéma des tables à partir des données chargées"
    why: "BigQuery ML expose la création et l'usage de modèles en SQL (CREATE MODEL, ML.PREDICT), sans sortir les données de l'entrepôt."
  - id: type-partition
    prompt: "Sur quoi peut-on partitionner une table BigQuery ?"
    answer: "Une colonne de date ou d'horodatage, l'heure d'ingestion, ou une plage d'entiers"
    decoys:
      - "Uniquement sur le compte de l'utilisateur qui a chargé les données"
      - "Sur n'importe quelle colonne texte, avec une partition par valeur distincte"
    why: "BigQuery propose trois types de partitionnement : par colonne temporelle, par heure d'ingestion et par plage d'entiers. Pour une colonne texte, on utilise le clustering."
  - id: clustering
    prompt: "Que fait le clustering d'une table BigQuery ?"
    answer: "Il trie les données selon des colonnes choisies, pour sauter les blocs inutiles"
    decoys:
      - "Il réplique la table dans plusieurs régions pour résister aux pannes"
      - "Il répartit la table sur un groupe de serveurs que l'on dimensionne soi-même"
    why: "Les données sont rangées selon les colonnes de clustering : un filtre sur ces colonnes lit moins de blocs. Il n'y a aucun serveur à dimensionner."
  - id: donnees-imbriquees
    prompt: "Comment BigQuery représente-t-il des données imbriquées, comme les lignes d'une commande ?"
    answer: "Avec des colonnes STRUCT et ARRAY, dans la même table"
    decoys:
      - "Uniquement en les éclatant dans des tables séparées, reliées par clés étrangères"
      - "En les stockant en texte JSON brut, qu'on ne peut pas interroger en SQL"
    why: "Les types STRUCT et ARRAY (champs RECORD répétés) gardent les données imbriquées dans une ligne, ce qui évite des jointures. BigQuery sait aussi interroger du JSON."
  - id: unnest
    prompt: "Quelle fonction SQL transforme les éléments d'un ARRAY en lignes dans BigQuery ?"
    answer: "UNNEST"
    decoys:
      - "EXPLODE"
      - "SPLIT"
    why: "UNNEST déplie un tableau en lignes, souvent avec CROSS JOIN. EXPLODE est la fonction de Spark ; SPLIT découpe une chaîne en tableau."
  - id: googlesql
    prompt: "Quel dialecte SQL est recommandé pour les requêtes BigQuery ?"
    answer: "GoogleSQL, conforme au SQL standard, plutôt que l'ancien legacy SQL"
    decoys:
      - "Le legacy SQL, qui reste le dialecte conseillé pour les nouvelles requêtes"
      - "PL/pgSQL, repris de PostgreSQL pour la compatibilité des requêtes"
    why: "GoogleSQL (ex-standard SQL) est le dialecte recommandé ; le legacy SQL est l'ancien dialecte, conservé pour la compatibilité. PL/pgSQL est propre à PostgreSQL."
  - id: streaming
    prompt: "Comment écrire des données dans BigQuery au fil de l'eau, sans attendre un chargement par lot ?"
    answer: "Par l'API d'écriture en streaming (Storage Write API)"
    decoys:
      - "C'est impossible : BigQuery n'accepte que des chargements nocturnes"
      - "Uniquement en important des fichiers CSV à la main par la console"
    why: "BigQuery accepte des écritures en continu via la Storage Write API, en plus des chargements par lot. Les données deviennent interrogeables rapidement."
  - id: table-externe
    prompt: "Comment interroger des fichiers Parquet posés dans Cloud Storage sans les charger dans BigQuery ?"
    answer: "Avec une table externe qui pointe vers ces fichiers"
    decoys:
      - "Avec un entrepôt virtuel rattaché au bucket Cloud Storage"
      - "En créant un index secondaire sur le bucket"
    why: "Une table externe décrit des fichiers stockés ailleurs, et BigQuery les lit à la requête. L'entrepôt virtuel est un concept Snowflake, et BigQuery n'a pas d'index sur un bucket."
  - id: filtre-partition-obligatoire
    prompt: "Quelle option d'une table partitionnée BigQuery refuse les requêtes qui ne filtrent pas sur la partition ?"
    answer: "Exiger un filtre de partition (require_partition_filter)"
    decoys:
      - "Activer le cache de résultats sur la table"
      - "Passer le dataset en lecture seule"
    why: "Avec require_partition_filter, une requête sans filtre sur la colonne de partition échoue : on évite les scans complets accidentels. Le cache et la lecture seule n'y changent rien."
  - id: cache-resultats
    prompt: "Une requête identique est relancée sur des tables inchangées. Que fait BigQuery par défaut ?"
    answer: "Il renvoie le résultat mis en cache, sans facturer de lecture"
    decoys:
      - "Il relit toutes les tables et facture de nouveau les octets traités"
      - "Il refuse la requête tant que les tables n'ont pas été modifiées"
    why: "BigQuery garde les résultats en cache : une requête identique sur des données inchangées les reçoit sans être facturée. Le cache est désactivable."
  - id: slots
    prompt: "Comment s'appelle l'unité de capacité de calcul dans BigQuery ?"
    answer: "Le slot"
    decoys:
      - "Le crédit"
      - "Le nœud"
    why: "Les requêtes s'exécutent sur des slots, des unités de calcul virtuelles ; la capacité réservée se compte en slots. Le crédit est l'unité de Snowflake."
  - id: vue-materialisee
    prompt: "Que fait une vue matérialisée dans BigQuery ?"
    answer: "Elle stocke le résultat précalculé d'une requête et le tient à jour"
    decoys:
      - "Elle copie chaque nuit la table source dans un autre projet"
      - "Elle masque des colonnes aux utilisateurs sans stocker aucune donnée"
    why: "La vue matérialisée garde un résultat précalculé, rafraîchi par BigQuery, ce qui accélère et allège les requêtes répétées. Une vue simple, elle, ne stocke rien."
  - id: localisation-dataset
    prompt: "Quel choix faut-il faire avec soin en créant un dataset BigQuery ?"
    answer: "Sa localisation (région ou multirégion), qu'on ne peut plus changer ensuite"
    decoys:
      - "Son nombre de nœuds, qu'on ajuste ensuite à chaud selon la charge"
      - "Son mode de stockage, lignes ou colonnes, selon l'usage prévu"
    why: "La localisation d'un dataset est fixée à sa création ; pour la changer, il faut copier les données. Il n'y a ni nœuds à régler, ni choix entre lignes et colonnes."
  - id: iam
    prompt: "Comment contrôle-t-on l'accès aux datasets BigQuery ?"
    answer: "Avec les rôles IAM de Google Cloud"
    decoys:
      - "Avec un fichier pg_hba.conf"
      - "Avec des comptes créés par CREATE USER dans chaque dataset"
    why: "Les droits se donnent par IAM, sur le projet, le dataset ou la table. pg_hba.conf est la configuration d'accès de PostgreSQL."
  - id: cli-bq
    prompt: "Quel outil en ligne de commande sert à piloter BigQuery ?"
    answer: "bq, fourni avec le Google Cloud SDK"
    decoys:
      - "psql, le client en ligne de commande de PostgreSQL"
      - "snowsql, le client fourni par Snowflake"
    why: "La commande bq lance des requêtes, charge des données et gère datasets et tables. psql et snowsql sont les clients d'autres bases."
  - id: voyage-temps
    prompt: "Comment relire une table BigQuery telle qu'elle était il y a une heure ?"
    answer: "Avec FOR SYSTEM_TIME AS OF, dans la fenêtre de voyage dans le temps"
    decoys:
      - "En restaurant une sauvegarde nocturne qu'il faut configurer soi-même"
      - "C'est impossible : une modification écrase définitivement les données"
    why: "BigQuery conserve l'historique récent des tables : FOR SYSTEM_TIME AS OF lit un état passé dans la fenêtre de voyage dans le temps, sans sauvegarde à gérer."
  - id: dbt
    prompt: "Comment dbt s'articule-t-il avec BigQuery ?"
    answer: "Un adaptateur officiel lui fait exécuter ses modèles SQL dans BigQuery"
    decoys:
      - "dbt remplace BigQuery et stocke lui-même les tables qu'il produit"
      - "dbt ne fonctionne qu'avec des bases installées sur site, pas avec BigQuery"
    why: "dbt ne stocke rien : il compile ses modèles en SQL et les exécute dans l'entrepôt, ici BigQuery, via l'adaptateur officiel."
---
