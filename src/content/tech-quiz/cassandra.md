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
---
