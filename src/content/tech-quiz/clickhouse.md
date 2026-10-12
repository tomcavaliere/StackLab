---
questions:
  - id: colonnes
    prompt: "Comment ClickHouse range-t-il les données ?"
    answer: "Par colonne, compressées, avec un calcul parallélisé"
    decoys:
      - "Par ligne, comme une base transactionnelle"
      - "En documents JSON, indexés en plein texte comme dans Elasticsearch"
    why: "Le stockage par colonne et la compression rendent les agrégations rapides."
  - id: pourquoi-colonnes
    prompt: "Pourquoi le stockage par colonne accélère-t-il une agrégation ?"
    answer: "La requête ne lit que les colonnes dont elle a besoin"
    decoys:
      - "Chaque ligne y est stockée en double"
      - "Les colonnes sont gardées en cache dans le navigateur"
    why: "Une base orientée lignes relit chaque ligne en entier, même pour additionner une seule colonne."
  - id: usage
    prompt: "Quel est un usage typique de ClickHouse ?"
    answer: "Des tableaux de bord en temps réel sur de gros volumes d'événements"
    decoys:
      - "La base transactionnelle d'une application de commandes en ligne, avec paiements"
      - "Le cache des sessions d'un site web"
    why: "Analytique produit, statistiques affichées aux utilisateurs, journaux et métriques : ClickHouse agrège à mesure que les événements arrivent."
  - id: pas-transactionnel
    prompt: "Pourquoi ne pas faire de ClickHouse la base transactionnelle d'une application ?"
    answer: "Mises à jour et suppressions unitaires y sont coûteuses, sans les transactions d'une base comme PostgreSQL"
    decoys:
      - "Il ne comprend pas le SQL : il faut passer par une API propriétaire, plus difficile à apprendre pour une équipe"
      - "Il ne peut stocker que des nombres"
    why: "ClickHouse s'interroge en SQL, mais il est conçu pour lire et agréger, pas pour modifier ligne à ligne."
  - id: ingestion
    prompt: "Comment ingérer des données dans ClickHouse, de préférence ?"
    answer: "En continu, par lots"
    decoys:
      - "Ligne par ligne, une requête par événement"
      - "Uniquement par un export complet chaque nuit"
    why: "Regrouper les insertions est bien plus efficace qu'insérer chaque événement isolément."
  - id: origine
    prompt: "Où ClickHouse a-t-il été développé ?"
    answer: "Chez Yandex, open-source depuis 2016"
    decoys:
      - "Chez Facebook, en même temps que Cassandra"
      - "Au CWI d'Amsterdam, comme DuckDB"
    why: "ClickHouse Inc., créée en 2021, en propose une offre managée."
  - id: sql
    prompt: "Comment interroge-t-on ClickHouse ?"
    answer: "En SQL"
    decoys:
      - "En PromQL"
      - "Avec un pipeline d'agrégation, comme MongoDB"
    why: "ClickHouse s'interroge en SQL, ce qui le rend accessible aux analystes."
  - id: une-machine
    prompt: "Données qui tiennent sur une machine, analyses ponctuelles : que conseille la fiche ?"
    answer: "DuckDB suffit, sans serveur"
    decoys:
      - "Un cluster ClickHouse, pour être prêt à grossir"
      - "Elasticsearch"
    why: "DuckDB est de la même famille colonnaire, mais embarqué : rien à opérer."
  - id: analystes
    prompt: "Une équipe d'analystes veut un entrepôt SQL partagé, sans rien opérer. Que préférer ?"
    answer: "Un entrepôt managé, comme Snowflake ou BigQuery"
    decoys:
      - "ClickHouse auto-hébergé, sur un cluster de trois nœuds"
      - "Prometheus"
    why: "Pour la BI partagée sans exploitation, un entrepôt managé est plus simple ; les jointures complexes demandent aussi plus d'attention dans ClickHouse."
  - id: offre-managee
    prompt: "Quelle offre managée de ClickHouse existe ?"
    answer: "ClickHouse Cloud, de ClickHouse Inc."
    decoys:
      - "Amazon MSK, l'offre managée d'AWS"
      - "Dagster+"
    why: "Amazon MSK est le Kafka managé d'AWS, Dagster+ l'offre hébergée de Dagster."
  - id: mergetree
    prompt: "Quelle famille de moteurs de table est la principale dans ClickHouse ?"
    answer: "MergeTree"
    decoys:
      - "InnoDB"
      - "WiredTiger"
    why: "Les tables ClickHouse reposent surtout sur la famille MergeTree. InnoDB est le moteur de MySQL, WiredTiger celui de MongoDB."
  - id: fusion-parts
    prompt: "Que fait ClickHouse des « parts » créées à chaque insertion dans une table MergeTree ?"
    answer: "Il les fusionne en arrière-plan en parts plus grosses"
    decoys:
      - "Il les garde séparées pour toujours, une par insertion"
      - "Il les rejoue chaque nuit depuis un journal de transactions"
    why: "Chaque insertion écrit une part triée ; des fusions en arrière-plan les regroupent, d'où le nom MergeTree."
  - id: too-many-parts
    prompt: "Quelle erreur typique provoquent des insertions ClickHouse trop petites et trop fréquentes ?"
    answer: "Trop de parts en attente de fusion (« Too many parts »)"
    decoys:
      - "Un verrou exclusif posé sur toute la table pendant chaque insertion"
      - "Un débordement du cache de résultats des requêtes en cours"
    why: "Chaque insertion crée une part : si elles arrivent plus vite que les fusions, ClickHouse finit par refuser les écritures. D'où l'ingestion par lots."
  - id: async-insert
    prompt: "Quel réglage laisse le serveur ClickHouse regrouper lui-même de petites insertions en lots ?"
    answer: "Les insertions asynchrones (async_insert)"
    decoys:
      - "Le niveau d'isolation SERIALIZABLE"
      - "Le moteur de table Memory"
    why: "Avec async_insert, le serveur met les petites insertions en tampon et les écrit ensemble. ClickHouse n'a pas de niveau SERIALIZABLE ; Memory garde la table en RAM."
  - id: order-by
    prompt: "Que définit la clause ORDER BY à la création d'une table MergeTree ?"
    answer: "L'ordre de tri des données sur disque, qui sert de clé primaire par défaut"
    decoys:
      - "L'ordre dans lequel les résultats seront renvoyés à toutes les requêtes"
      - "Une contrainte d'unicité sur les colonnes citées dans la clause"
    why: "ORDER BY fixe le tri physique des parts ; sans PRIMARY KEY explicite, il en tient lieu. Il ne garantit ni l'ordre des résultats, ni l'unicité."
  - id: cle-primaire-unicite
    prompt: "La clé primaire d'une table MergeTree garantit-elle l'unicité des lignes ?"
    answer: "Non : elle sert à l'index clairsemé, les doublons restent possibles"
    decoys:
      - "Oui : une insertion en double est rejetée immédiatement"
      - "Oui, mais seulement sur un cluster d'au moins trois nœuds"
    why: "Dans ClickHouse, la clé primaire sert à retrouver vite les blocs à lire, pas à contraindre les données. Deux lignes peuvent avoir la même clé."
  - id: index-clairseme
    prompt: "Comment fonctionne l'index primaire de ClickHouse ?"
    answer: "Il est clairsemé : une entrée par bloc de lignes (granule), pas par ligne"
    decoys:
      - "C'est un B-tree avec une entrée par ligne, comme dans PostgreSQL"
      - "C'est un index inversé en plein texte, comme dans Elasticsearch"
    why: "Une entrée pour chaque granule de lignes suffit, car les données sont triées : l'index reste petit, tient en mémoire, et indique quels blocs lire."
  - id: replacing-merge-tree
    prompt: "Quel moteur ClickHouse dédoublonne les lignes de même clé de tri lors des fusions ?"
    answer: "ReplacingMergeTree"
    decoys:
      - "SummingMergeTree"
      - "Log"
    why: "ReplacingMergeTree ne garde qu'une ligne par clé de tri à la fusion. SummingMergeTree additionne les valeurs ; Log est un moteur simple, sans fusion."
  - id: dedoublonnage-final
    prompt: "Avec ReplacingMergeTree, quand les doublons disparaissent-ils ?"
    answer: "Lors des fusions, sans moment garanti ; FINAL force le dédoublonnage à la lecture"
    decoys:
      - "Immédiatement à chaque insertion, grâce à un verrou posé sur la clé de tri"
      - "Uniquement au redémarrage du serveur, lors de la reconstruction des index"
    why: "Le dédoublonnage est éventuel : tant que les parts n'ont pas fusionné, les doublons sont visibles. Le mot-clé FINAL dédoublonne à la requête, au prix d'un calcul en plus."
  - id: vue-materialisee
    prompt: "Comment fonctionne une vue matérialisée dans ClickHouse ?"
    answer: "Elle transforme chaque bloc inséré et écrit le résultat dans une table"
    decoys:
      - "Elle recalcule toute la requête sur l'ensemble des données chaque nuit"
      - "Elle garde en cache le résultat de la dernière requête d'un utilisateur"
    why: "Une vue matérialisée ClickHouse agit comme un déclencheur à l'insertion : seules les nouvelles lignes sont traitées, ce qui tient des agrégats à jour en continu."
  - id: aggregating-merge-tree
    prompt: "Quel moteur associe-t-on souvent à une vue matérialisée pour tenir des agrégats à jour ?"
    answer: "AggregatingMergeTree, qui stocke des états d'agrégation"
    decoys:
      - "Memory, qui garde les agrégats en RAM jusqu'au prochain redémarrage"
      - "Log, qui ajoute les agrégats à la suite dans un simple journal"
    why: "AggregatingMergeTree conserve des états intermédiaires (par exemple uniqState) et les combine à la fusion ; on les finalise à la lecture avec les fonctions -Merge."
  - id: mutations
    prompt: "Comment s'exécute un ALTER TABLE … UPDATE dans ClickHouse ?"
    answer: "Comme une mutation asynchrone, qui réécrit les parts concernées"
    decoys:
      - "Comme une mise à jour en place, instantanée et transactionnelle"
      - "Il n'existe pas : il faut recréer toute la base de données"
    why: "Les mutations réécrivent des parts entières en arrière-plan : c'est lourd, d'où le conseil de ne pas modifier ligne à ligne."
  - id: ttl
    prompt: "Comment supprimer automatiquement les événements de plus de 90 jours dans une table ClickHouse ?"
    answer: "Avec une clause TTL sur la table"
    decoys:
      - "Avec un DELETE planifié par cron, seule solution possible"
      - "Avec la commande EXPIRE, comme dans Redis"
    why: "Le TTL de table (ou de colonne) supprime ou déplace les données expirées lors des fusions. EXPIRE est une commande Redis."
  - id: partition-by
    prompt: "Quel est le rôle principal de PARTITION BY dans une table MergeTree ?"
    answer: "Regrouper les données par valeur (souvent le mois) pour les gérer en bloc"
    decoys:
      - "Remplacer l'ORDER BY comme index principal pour accélérer les filtres"
      - "Répartir automatiquement la table entre les nœuds du cluster"
    why: "Les partitions servent surtout à la gestion (supprimer ou déplacer un mois entier). L'accélération des filtres vient de l'ORDER BY ; la répartition entre nœuds, du moteur Distributed."
  - id: distributed
    prompt: "Quel moteur de table permet d'interroger des données réparties sur plusieurs serveurs ClickHouse ?"
    answer: "Distributed"
    decoys:
      - "Buffer"
      - "Memory"
    why: "Une table Distributed ne stocke rien elle-même : elle envoie la requête aux shards et combine les résultats. Buffer tamponne des écritures ; Memory garde une table en RAM."
  - id: keeper
    prompt: "Quel composant coordonne la réplication des tables ReplicatedMergeTree ?"
    answer: "ClickHouse Keeper, ou ZooKeeper"
    decoys:
      - "etcd, le magasin clé-valeur de Kubernetes"
      - "Consul, l'annuaire de services de HashiCorp"
    why: "Les répliques se coordonnent via ClickHouse Keeper, compatible avec le protocole de ZooKeeper, qu'il peut remplacer."
  - id: low-cardinality
    prompt: "À quoi sert le type LowCardinality(String) dans ClickHouse ?"
    answer: "Encoder par dictionnaire une colonne texte aux valeurs peu nombreuses"
    decoys:
      - "Limiter la longueur des chaînes de la colonne à quelques caractères"
      - "Interdire les valeurs en double dans la colonne, comme UNIQUE"
    why: "Les valeurs distinctes sont stockées une fois dans un dictionnaire, les lignes n'en gardent qu'un numéro : moins de place et des filtres plus rapides (pays, statut…)."
  - id: clickhouse-local
    prompt: "Quel outil interroge des fichiers en SQL avec le moteur ClickHouse, sans lancer de serveur ?"
    answer: "clickhouse-local"
    decoys:
      - "clickhouse-keeper"
      - "clickhouse-benchmark"
    why: "clickhouse-local embarque le moteur pour traiter des fichiers en ligne de commande. Keeper coordonne la réplication ; clickhouse-benchmark mesure les performances d'un serveur."
  - id: jointure-droite
    prompt: "À quoi faut-il faire attention en écrivant une jointure dans ClickHouse ?"
    answer: "Par défaut, la table de droite est chargée en mémoire : y mettre la plus petite"
    decoys:
      - "Les jointures sont interdites : il faut tout dénormaliser en amont"
      - "La table de gauche est toujours copiée en entier sur chaque nœud du cluster"
    why: "L'algorithme par défaut construit une table de hachage à partir de la table de droite. Mettre la grosse table à droite peut épuiser la mémoire."
  - id: denormalisation
    prompt: "Quel modèle de données convient souvent le mieux à ClickHouse ?"
    answer: "Des tables larges et dénormalisées, avec peu de jointures"
    decoys:
      - "Un schéma très normalisé, avec une jointure par attribut"
      - "Un document JSON par ligne, sans aucune colonne typée"
    why: "Le stockage par colonne rend les tables larges peu coûteuses (on ne lit que les colonnes utiles), alors que les jointures demandent plus d'attention."
---
