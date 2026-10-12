---
questions:
  - id: anneau-sans-maitre
    prompt: "Comment Cassandra répartit-il les données ?"
    answer: "Sur un anneau de nœuds égaux, sans maître, chaque donnée étant répliquée sur plusieurs nœuds"
    decoys:
      - "Sur un nœud maître qui reçoit toutes les écritures, avec des répliques en lecture"
      - "Dans un seul fichier partagé par tous les serveurs du cluster"
    why: "Pas de maître : chaque nœud accepte lectures et écritures. C'est ce qui permet d'absorber des écritures massives et de survivre à la perte de serveurs."
  - id: charge-cible
    prompt: "Pour quel type de charge Cassandra est-il conçu ?"
    answer: "Des écritures massives réparties sur de nombreux serveurs et plusieurs datacenters"
    decoys:
      - "Des requêtes analytiques ad hoc, avec beaucoup de jointures entre de grandes tables normalisées"
      - "Des transactions complexes portant sur plusieurs lignes"
    why: "Messages, événements, flux d'activité : Cassandra vise l'écriture à grande échelle et la disponibilité multi-datacenter, pas les jointures ni les transactions multi-lignes."
  - id: cql
    prompt: "Quelle est la grande différence entre CQL et SQL ?"
    answer: "Pas de jointures : on conçoit une table par requête à servir"
    decoys:
      - "CQL n'a pas de clause WHERE"
      - "CQL s'écrit en JSON plutôt qu'en texte, comme les requêtes de MongoDB"
    why: "CQL ressemble à SQL mais sans jointures. On modélise à partir des requêtes : chaque façon de lire les données a sa table."
  - id: coherence-reglable
    prompt: "Comment se règle la cohérence dans Cassandra ?"
    answer: "Par requête : on choisit combien de répliques doivent répondre"
    decoys:
      - "Une fois pour toutes, à l'installation du cluster, pour toutes les tables"
      - "Elle est toujours forte, comme dans PostgreSQL"
    why: "Chaque requête fixe son niveau de cohérence : attendre plus de répliques donne plus de garanties et plus de latence."
  - id: lsm
    prompt: "Quelle structure de stockage optimise Cassandra pour les écritures ?"
    answer: "Un arbre LSM"
    decoys:
      - "Un index B-tree mis à jour en place"
      - "Des fichiers Parquet colonnaires"
    why: "L'arbre LSM accumule les écritures en mémoire puis les écrit séquentiellement sur disque : c'est ce qui rend les écritures si rapides."
  - id: origine
    prompt: "Où Cassandra a-t-il été créé ?"
    answer: "Chez Facebook, avant d'être confié à la fondation Apache"
    decoys:
      - "Chez Amazon, pour gérer le panier d'achat de son site marchand"
      - "Chez LinkedIn, en même temps que Kafka"
    why: "Cassandra vient de Facebook. Kafka est né chez LinkedIn ; le système Dynamo d'Amazon a inspiré DynamoDB."
  - id: volume-modeste
    prompt: "Une application à volume modeste, sur un seul datacenter. Cassandra est-il un bon choix ?"
    answer: "Non : on paierait la complexité d'un système distribué sans en avoir besoin"
    decoys:
      - "Oui : il est plus simple à opérer que PostgreSQL, même sur un seul petit serveur"
      - "Non : Cassandra ne fonctionne qu'à partir de trois datacenters"
    why: "Cassandra fonctionne sur un seul datacenter, mais un cluster distribué se justifie par le volume. Tant que les données tiennent sur un serveur principal, PostgreSQL est plus simple et plus souple."
  - id: modele-instable
    prompt: "Pourquoi un modèle de données encore instable pose-t-il problème avec Cassandra ?"
    answer: "Chaque nouvelle requête peut imposer une nouvelle table et une migration des données"
    decoys:
      - "Cassandra interdit d'ajouter une colonne après la création d'une table"
      - "Cassandra efface toutes les données existantes à chaque changement du schéma d'une table"
    why: "Comme on conçoit une table par requête, une nouvelle façon de lire les données demande souvent une nouvelle table, à remplir à partir des existantes."
  - id: cas-usage
    prompt: "Quel cas d'usage correspond bien à Cassandra ?"
    answer: "Le fil d'activité de chaque utilisateur, lu par clé connue, à très gros volume"
    decoys:
      - "Le reporting financier mensuel, avec de nombreuses jointures"
      - "Le back-office d'une petite équipe qui gère quelques milliers de clients"
    why: "Accès par clé connue (un utilisateur, une série temporelle) et énormément d'écritures : c'est son terrain."
  - id: alternative-managee
    prompt: "Quelle alternative offre un modèle comparable, sans cluster à opérer ?"
    answer: "DynamoDB, entièrement managé par AWS"
    decoys:
      - "Memcached, un cache distribué sans maître"
      - "DuckDB, une base embarquée"
    why: "DynamoDB partage l'accès par clé et la répartition automatique, géré par AWS, au prix d'une dépendance au fournisseur."
  - id: cle-de-partition
    prompt: "Dans une table Cassandra, quel rôle joue la clé de partition ?"
    answer: "Elle détermine, par hachage, les nœuds qui stockent la ligne"
    decoys:
      - "Elle fixe l'ordre de tri des lignes à l'intérieur d'une partition"
      - "Elle sert seulement d'identifiant unique, sans effet sur le placement"
    why: "Le hachage de la clé de partition donne un jeton qui place la ligne sur l'anneau. L'ordre dans la partition, c'est le rôle des colonnes de clustering."
  - id: colonnes-clustering
    prompt: "À quoi servent les colonnes de clustering dans la clé primaire d'une table Cassandra ?"
    answer: "À trier les lignes à l'intérieur d'une même partition"
    decoys:
      - "À choisir le datacenter dans lequel chaque ligne est répliquée"
      - "À créer automatiquement un index secondaire sur chaque colonne"
    why: "Les colonnes de clustering ordonnent les lignes d'une partition sur disque, ce qui rend efficaces les lectures par plage. Elles ne pilotent ni la réplication ni l'indexation."
  - id: allow-filtering
    prompt: "Que signale une requête CQL qui exige ALLOW FILTERING pour s'exécuter ?"
    answer: "Qu'elle risque de parcourir beaucoup de données, faute de suivre la clé"
    decoys:
      - "Qu'elle sera routée vers un nœud maître dédié aux requêtes filtrées"
      - "Qu'elle profite d'un index optimisé que Cassandra a créé tout seul"
    why: "Cassandra refuse par défaut les requêtes qui ne suivent pas la clé, car elles peuvent lire énormément de partitions. ALLOW FILTERING force l'exécution : c'est souvent le signe qu'il manque une table adaptée."
  - id: tombstones
    prompt: "Que produit une suppression dans Cassandra ?"
    answer: "Un marqueur (tombstone), purgé plus tard lors du compactage"
    decoys:
      - "Un effacement immédiat de la donnée sur toutes les répliques à la fois"
      - "Un verrou global sur la partition, levé à la fin de la suppression"
    why: "Les fichiers sur disque sont immuables : la suppression s'écrit comme une nouvelle donnée, un tombstone. Trop de tombstones ralentissent les lectures, un piège classique des files d'attente modélisées dans Cassandra."
  - id: compactage
    prompt: "Qu'est-ce que le compactage dans Cassandra ?"
    answer: "La fusion des SSTables pour en réduire le nombre et purger l'obsolète"
    decoys:
      - "La compression des requêtes CQL avant leur envoi au cluster par le réseau"
      - "Le déplacement des partitions les plus lues vers les nœuds les plus puissants"
    why: "Les écritures produisent sans cesse de nouveaux fichiers immuables ; le compactage les fusionne, garde la version la plus récente de chaque donnée et élimine les tombstones expirés."
  - id: sstable
    prompt: "Comment s'appellent les fichiers immuables où Cassandra écrit ses données sur disque ?"
    answer: "Des SSTables"
    decoys:
      - "Des pages de B-tree"
      - "Des segments Lucene"
    why: "La memtable est vidée sur disque en SSTables, jamais modifiées ensuite. Les pages de B-tree sont modifiées en place (PostgreSQL), les segments Lucene sont ceux d'Elasticsearch."
  - id: commit-log
    prompt: "Que fait un nœud Cassandra d'une écriture, en plus de l'appliquer à sa memtable en mémoire ?"
    answer: "Il l'ajoute au commit log sur disque, pour ne pas la perdre"
    decoys:
      - "Il la fait d'abord valider par le nœud maître élu pour la partition"
      - "Il attend que toutes les répliques du cluster aient confirmé l'écriture"
    why: "Le commit log, écrit séquentiellement, permet de rejouer les écritures après un crash. Il n'y a pas de maître, et le nombre de répliques attendues dépend du niveau de cohérence."
  - id: quorum
    prompt: "Que signifie le niveau de cohérence QUORUM dans Cassandra ?"
    answer: "Une majorité des répliques doit répondre"
    decoys:
      - "Toutes les répliques, dans tous les datacenters, doivent répondre"
      - "Une seule réplique, la plus proche du client, suffit à répondre"
    why: "QUORUM attend la majorité des répliques. ALL les attend toutes, ONE se contente d'une seule."
  - id: local-quorum
    prompt: "Pourquoi utiliser LOCAL_QUORUM dans un cluster Cassandra réparti sur plusieurs datacenters ?"
    answer: "Pour n'attendre qu'une majorité de répliques du datacenter local"
    decoys:
      - "Pour forcer chaque requête à passer par le datacenter principal du cluster"
      - "Pour ne plus répliquer les écritures locales vers les autres datacenters"
    why: "LOCAL_QUORUM évite d'attendre les allers-retours entre datacenters, tout en gardant une majorité locale. La réplication vers les autres datacenters continue normalement."
  - id: facteur-replication
    prompt: "Que fixe le facteur de réplication d'un keyspace Cassandra ?"
    answer: "Le nombre de copies de chaque donnée"
    decoys:
      - "Le nombre de requêtes simultanées autorisées par nœud"
      - "Le nombre de datacenters nécessaires au démarrage du cluster"
    why: "Le facteur de réplication dit sur combien de nœuds chaque donnée est copiée, éventuellement par datacenter. Il ne limite ni les requêtes ni la topologie minimale."
  - id: keyspace
    prompt: "Qu'est-ce qu'un keyspace dans Cassandra ?"
    answer: "Un conteneur de tables qui porte la stratégie de réplication"
    decoys:
      - "Une plage de jetons de l'anneau attribuée à un seul nœud"
      - "Un index global qui liste toutes les clés de partition du cluster"
    why: "Le keyspace joue à peu près le rôle d'une base en SQL, et c'est à son niveau qu'on déclare la réplication. Les plages de jetons, elles, sont réparties entre les nœuds."
  - id: gossip
    prompt: "Comment les nœuds Cassandra apprennent-ils l'état des autres nœuds du cluster ?"
    answer: "Par un protocole de gossip, en échangeant des informations entre pairs"
    decoys:
      - "En interrogeant un service central de coordination qui tient la topologie"
      - "Par un nœud maître élu qui diffuse régulièrement l'état de tout le cluster"
    why: "Chaque nœud échange périodiquement ce qu'il sait avec quelques autres, et l'information se propage. C'est cohérent avec l'architecture sans maître ni coordinateur central."
  - id: derniere-ecriture-gagne
    prompt: "Comment Cassandra départage-t-il deux écritures concurrentes sur la même colonne ?"
    answer: "La plus récente selon son horodatage l'emporte"
    decoys:
      - "La première arrivée l'emporte, la seconde est rejetée avec une erreur"
      - "Les deux versions sont gardées, et l'application choisit à la lecture"
    why: "Chaque valeur porte un horodatage et la plus récente gagne (last write wins). Pas d'erreur de conflit, et pas de versions multiples à résoudre côté application."
  - id: transaction-legere
    prompt: "Comment obtenir un « insérer seulement si absent » fiable dans Cassandra ?"
    answer: "Avec une transaction légère (IF NOT EXISTS), fondée sur Paxos"
    decoys:
      - "Avec une contrainte UNIQUE déclarée sur la colonne à la création de la table"
      - "Avec un verrou exclusif sur la table, posé par une commande LOCK TABLE"
    why: "Les transactions légères ajoutent une condition à l'écriture, vérifiée par consensus entre répliques, au prix d'une latence plus élevée. CQL n'a ni contrainte UNIQUE ni verrou de table."
  - id: hinted-handoff
    prompt: "Lors d'une écriture, que fait le nœud coordinateur si une réplique cible est temporairement injoignable ?"
    answer: "Il garde un « hint » et le rejoue au retour de la réplique"
    decoys:
      - "Il annule l'écriture sur toutes les répliques et renvoie une erreur au client"
      - "Il retire la réplique de l'anneau et redistribue tout de suite ses données"
    why: "C'est le hinted handoff : l'écriture n'est pas perdue pour la réplique absente. Une panne courte ne modifie pas la topologie de l'anneau."
  - id: nodetool-repair
    prompt: "Pourquoi lancer régulièrement nodetool repair sur un cluster Cassandra ?"
    answer: "Pour resynchroniser les répliques qui ont divergé"
    decoys:
      - "Pour défragmenter la mémoire de la JVM de chaque nœud"
      - "Pour recalculer les statistiques de l'optimiseur de requêtes"
    why: "Malgré les hints, des répliques peuvent manquer des écritures ; le repair compare et réaligne les données. Il est aussi nécessaire pour que les suppressions ne réapparaissent pas."
  - id: cqlsh
    prompt: "Quel client en ligne de commande permet de taper des requêtes CQL ?"
    answer: "cqlsh"
    decoys:
      - "psql"
      - "mongosh"
    why: "cqlsh est le shell fourni avec Cassandra. psql est celui de PostgreSQL, mongosh celui de MongoDB."
  - id: partition-sans-fin
    prompt: "Pourquoi utiliser seul l'identifiant d'un capteur qui émet sans arrêt comme clé de partition pose-t-il problème ?"
    answer: "La partition grossit sans fin ; on ajoute une période à la clé"
    decoys:
      - "Cassandra n'autorise qu'une seule ligne par partition, les suivantes sont refusées"
      - "Les données sont perdues dès que la partition dépasse la mémoire du nœud"
    why: "Une partition vit sur les mêmes nœuds et doit rester de taille raisonnable. Découper par jour ou par mois (capteur + jour) borne chaque partition."
  - id: scylladb
    prompt: "Quelle base réimplémente Cassandra en C++, en restant compatible avec CQL ?"
    answer: "ScyllaDB"
    decoys:
      - "CockroachDB"
      - "Couchbase"
    why: "ScyllaDB reprend le modèle et le protocole de Cassandra. CockroachDB est une base SQL distribuée, Couchbase une base document."
  - id: heritage
    prompt: "De quels systèmes Cassandra combine-t-il les idées ?"
    answer: "La distribution de Dynamo et le modèle de données de Bigtable"
    decoys:
      - "Le stockage de PostgreSQL et la réplication en continu de MySQL"
      - "Le modèle document de MongoDB et le journal distribué de Kafka"
    why: "Cassandra reprend l'anneau sans maître de Dynamo (Amazon) et le modèle en familles de colonnes de Bigtable (Google)."
---
