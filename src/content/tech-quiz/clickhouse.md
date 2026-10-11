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
---
