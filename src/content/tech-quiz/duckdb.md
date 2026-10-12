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
  - id: lire-parquet
    prompt: "Comment lire un fichier Parquet en SQL avec DuckDB ?"
    answer: "SELECT * FROM 'ventes.parquet', ou avec read_parquet('ventes.parquet')"
    decoys:
      - "En l'important d'abord dans une table avec COPY, seule méthode possible"
      - "Avec LOAD DATA INFILE 'ventes.parquet' INTO TABLE ventes, comme dans MySQL"
    why: "DuckDB interroge le fichier directement : on peut le citer comme une table ou passer par read_parquet. LOAD DATA INFILE est une commande MySQL."
  - id: motif-glob
    prompt: "Comment interroger d'un coup tous les fichiers Parquet d'un dossier avec DuckDB ?"
    answer: "Avec un motif glob, par exemple read_parquet('data/*.parquet')"
    decoys:
      - "Avec une boucle Python, car DuckDB ne lit qu'un fichier par requête"
      - "En les fusionnant d'abord en un seul fichier avec un outil externe"
    why: "Les fonctions de lecture acceptent des motifs glob (et des listes de fichiers) : DuckDB lit tous les fichiers comme une seule table."
  - id: httpfs
    prompt: "Quelle extension permet à DuckDB de lire des fichiers sur S3 ou en HTTP ?"
    answer: "httpfs"
    decoys:
      - "spatial"
      - "fts"
    why: "httpfs ajoute la lecture (et l'écriture) sur HTTP et S3. spatial apporte les types géographiques, fts la recherche plein texte."
  - id: en-memoire
    prompt: "Que se passe-t-il quand on ouvre DuckDB sans préciser de fichier de base ?"
    answer: "La base est en mémoire et disparaît à la fermeture"
    decoys:
      - "Il crée automatiquement un fichier duck.db dans le dossier courant"
      - "Il se connecte au serveur DuckDB qui tourne sur la machine locale"
    why: "Sans chemin, DuckDB ouvre une base en mémoire : pratique pour analyser des fichiers, mais rien n'est conservé. Il n'y a pas de serveur DuckDB."
  - id: fichier-unique
    prompt: "Comment une base DuckDB persistante est-elle stockée ?"
    answer: "Dans un seul fichier sur disque"
    decoys:
      - "Dans un dossier géré par un serveur, avec un fichier par table"
      - "Dans un service cloud, obligatoirement"
    why: "Comme SQLite, une base DuckDB tient dans un fichier unique, facile à copier ou à partager."
  - id: copy-to
    prompt: "Comment écrire le résultat d'une requête DuckDB dans un fichier Parquet ?"
    answer: "COPY (SELECT …) TO 'resultat.parquet' (FORMAT parquet)"
    decoys:
      - "EXPORT RESULT (SELECT …) AS PARQUET 'resultat.parquet'"
      - "SELECT … INTO OUTFILE 'resultat.parquet'"
    why: "COPY … TO écrit un résultat en Parquet, CSV ou JSON. INTO OUTFILE est la syntaxe de MySQL ; EXPORT RESULT n'existe pas."
  - id: installation-python
    prompt: "Comment installer DuckDB pour s'en servir dans un script Python ?"
    answer: "pip install duckdb, sans serveur à configurer"
    decoys:
      - "Installer un serveur DuckDB, puis un pilote ODBC pour s'y connecter"
      - "Lancer une image Docker, seule distribution disponible"
    why: "DuckDB est une bibliothèque : le paquet Python contient tout le moteur, qui tourne dans le processus du script."
  - id: dataframe-par-nom
    prompt: "Dans un script Python, comment interroger avec DuckDB un DataFrame pandas nommé df ?"
    answer: "duckdb.sql('SELECT * FROM df') : le DataFrame est trouvé par son nom"
    decoys:
      - "En exportant d'abord df en CSV, puis en lisant ce fichier en SQL"
      - "En appelant df.to_duckdb() pour l'enregistrer avant toute requête"
    why: "DuckDB repère les DataFrames des variables Python par leur nom et les lit directement. Aucun export n'est nécessaire, et to_duckdb() n'existe pas."
  - id: extension-postgres
    prompt: "Comment DuckDB peut-il lire directement les tables d'une base PostgreSQL ?"
    answer: "Avec son extension postgres, en attachant la base par ATTACH"
    decoys:
      - "C'est impossible : il faut d'abord exporter les tables en CSV"
      - "En s'abonnant à la base comme un réplica PostgreSQL en streaming"
    why: "L'extension postgres permet d'attacher une base PostgreSQL et d'en lire les tables en SQL depuis DuckDB, sans export préalable."
  - id: install-load
    prompt: "Comment ajoute-t-on une fonctionnalité optionnelle à DuckDB, comme les types géographiques ?"
    answer: "Avec INSTALL puis LOAD de l'extension correspondante"
    decoys:
      - "En recompilant DuckDB avec l'option de compilation voulue"
      - "En redémarrant le serveur DuckDB avec un plugin en paramètre"
    why: "Les extensions se téléchargent avec INSTALL et s'activent avec LOAD ; certaines se chargent automatiquement à la première utilisation."
  - id: motherduck
    prompt: "Qu'est-ce que MotherDuck ?"
    answer: "Un service cloud bâti sur DuckDB, par une entreprise distincte"
    decoys:
      - "La fondation à but non lucratif qui détient la propriété de DuckDB"
      - "Le format de fichier interne utilisé par DuckDB pour ses bases"
    why: "MotherDuck est une société qui propose DuckDB en service cloud. La propriété intellectuelle de DuckDB est détenue par la DuckDB Foundation."
  - id: licence
    prompt: "Sous quelle licence DuckDB est-il distribué ?"
    answer: "MIT"
    decoys:
      - "GPL v3"
      - "Business Source License"
    why: "DuckDB est open-source sous licence MIT, très permissive : on peut l'embarquer dans un logiciel commercial."
  - id: hors-memoire
    prompt: "Que fait DuckDB quand un tri, une agrégation ou une jointure dépasse la mémoire disponible ?"
    answer: "Il peut déborder sur disque pour terminer la requête"
    decoys:
      - "Il répartit le calcul sur d'autres machines du réseau"
      - "Il tronque les données en silence pour tenir en mémoire"
    why: "Les principaux opérateurs de DuckDB savent écrire des données temporaires sur disque : on peut traiter plus que la RAM, mais toujours sur une seule machine."
  - id: multithread
    prompt: "Comment DuckDB exploite-t-il une machine multicœur ?"
    answer: "Il parallélise une même requête sur plusieurs threads"
    decoys:
      - "Il n'utilise qu'un cœur par requête, pour éviter les verrous"
      - "Il lance un processus serveur par cœur, reliés par le réseau"
    why: "L'exécution de DuckDB est parallèle : une requête utilise par défaut tous les cœurs, dans un seul processus."
  - id: lecture-partielle
    prompt: "Pourquoi une requête DuckDB sur un gros fichier Parquet peut-elle n'en lire qu'une partie ?"
    answer: "Il lit seulement les colonnes utiles et saute les groupes de lignes exclus par le filtre"
    decoys:
      - "Il échantillonne le fichier puis extrapole le résultat de la requête"
      - "Il garde en cache tous les fichiers Parquet ouverts depuis son installation"
    why: "Parquet est colonnaire et stocke des statistiques par groupe de lignes : DuckDB n'en lit que ce qui sert, résultat exact à la clé."
  - id: lecture-seule
    prompt: "Plusieurs processus peuvent-ils lire en même temps le même fichier DuckDB ?"
    answer: "Oui, s'ils l'ouvrent tous en lecture seule"
    decoys:
      - "Non : un seul processus peut ouvrir le fichier, même pour le lire"
      - "Oui, et chacun peut aussi y écrire en même temps"
    why: "Le fichier accepte plusieurs processus en lecture seule, ou un seul processus en lecture-écriture, pas les deux à la fois."
  - id: wasm
    prompt: "Où DuckDB peut-il tourner, en plus de Python et de la ligne de commande ?"
    answer: "Dans un navigateur, compilé en WebAssembly (DuckDB-Wasm)"
    decoys:
      - "Uniquement sur des serveurs Linux dédiés"
      - "Dans Kubernetes, comme service distribué sur plusieurs pods"
    why: "DuckDB-Wasm exécute le moteur dans le navigateur. DuckDB existe aussi pour R, Java, Node.js et d'autres, mais reste un moteur embarqué, non distribué."
  - id: group-by-all
    prompt: "Que fait GROUP BY ALL dans DuckDB ?"
    answer: "Il regroupe par toutes les colonnes non agrégées du SELECT"
    decoys:
      - "Il regroupe toutes les lignes en une seule, quel que soit le SELECT"
      - "Il crée un groupe par ligne, sans rien agréger du tout"
    why: "Ce raccourci du SQL de DuckDB évite de recopier dans le GROUP BY les colonnes déjà listées dans le SELECT."
  - id: dbt-duckdb
    prompt: "Comment utiliser dbt avec DuckDB ?"
    answer: "Avec l'adaptateur dbt-duckdb, qui exécute les modèles en local"
    decoys:
      - "C'est impossible : dbt exige un entrepôt cloud"
      - "En passant par Snowflake, qui relaie les requêtes vers DuckDB"
    why: "Un adaptateur dbt existe pour DuckDB : les transformations tournent sur la machine, sans entrepôt à payer."
  - id: describe
    prompt: "Quelle commande DuckDB affiche les colonnes et les types d'une table ou d'un fichier ?"
    answer: "DESCRIBE"
    decoys:
      - "EXPLAIN"
      - "SHOW INDEXES"
    why: "DESCRIBE liste colonnes et types, y compris pour une requête sur un fichier. EXPLAIN affiche le plan d'exécution."
---
