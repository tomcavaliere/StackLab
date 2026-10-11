---
questions:
  - id: index-inverse
    prompt: "Sur quelle structure repose la recherche d'Elasticsearch ?"
    answer: "Un index inversé : pour chaque mot, la liste des documents qui le contiennent"
    decoys:
      - "Un arbre B qui trie tous les documents par date d'ajout, puis les parcourt un par un"
      - "Un ensemble trié en mémoire, comme dans Redis"
    why: "L'index inversé trouve instantanément les documents qui contiennent un mot."
  - id: lucene
    prompt: "Sur quelle bibliothèque Elasticsearch est-il bâti ?"
    answer: "Apache Lucene"
    decoys:
      - "Apache Spark"
      - "SQLite"
    why: "Lucene fournit l'indexation et la recherche ; Elasticsearch les distribue sur un cluster."
  - id: vs-like
    prompt: "Qu'apporte Elasticsearch par rapport à un LIKE '%…%' en SQL ?"
    answer: "L'analyse de la langue, le classement par pertinence, la tolérance aux fautes et les agrégations"
    decoys:
      - "Uniquement une exécution plus rapide du même LIKE"
      - "Des transactions qui portent sur plusieurs documents, avec un verrouillage plus fin qu'en SQL"
    why: "Racines, accents, synonymes, pertinence, fautes de frappe : un LIKE ne fait rien de tout ça."
  - id: pas-base-principale
    prompt: "Pourquoi ne pas faire d'Elasticsearch la base principale ?"
    answer: "Pas de transactions entre documents, et un document n'est trouvable qu'après un court délai"
    decoys:
      - "Il ne sait pas stocker de JSON : chaque document doit être converti en texte brut avant l'indexation"
      - "Il ne peut pas filtrer les résultats"
    why: "La base de référence reste transactionnelle ; Elasticsearch en est une copie à synchroniser."
  - id: elk
    prompt: "Que désigne le « E » de la pile ELK ?"
    answer: "Elasticsearch, avec Logstash et Kibana"
    decoys:
      - "Express, avec Lambda et Kafka"
      - "Elastic Cloud, avec Lucene et Kibana"
    why: "La pile ELK centralise et fouille les journaux de nombreux services."
  - id: opensearch
    prompt: "Pourquoi AWS a-t-il créé OpenSearch ?"
    answer: "Elastic a quitté la licence Apache en 2021 ; OpenSearch en est un fork"
    decoys:
      - "Pour remplacer DynamoDB"
      - "Parce qu'Elastic a été racheté par Google, qui a fermé le code source"
    why: "Le changement de licence a conduit AWS à forker le projet."
  - id: licence-2024
    prompt: "Quelle licence Elastic a-t-il ajoutée en option en 2024 ?"
    answer: "AGPL"
    decoys:
      - "MIT"
      - "Domaine public"
    why: "Après avoir quitté la licence Apache en 2021, Elastic a ajouté l'AGPL comme option en 2024."
  - id: recherche-simple
    prompt: "Recherche simple sur un volume modeste : que suggère la fiche ?"
    answer: "La recherche plein texte de PostgreSQL, sans second système"
    decoys:
      - "Un cluster Elasticsearch d'au moins trois nœuds, dès le premier jour"
      - "Redis, avec ses ensembles triés"
    why: "Un second système doit être opéré et synchronisé ; pour un besoin simple, PostgreSQL suffit souvent."
  - id: facettes
    prompt: "Comment calcule-t-on les compteurs des filtres à facettes (par marque, par prix) ?"
    answer: "Avec des agrégations"
    decoys:
      - "Avec des jointures"
      - "Avec une tâche planifiée qui recompte chaque nuit"
    why: "Les agrégations calculent ces compteurs à la volée, pour chaque recherche."
  - id: shards
    prompt: "Comment les documents sont-ils répartis sur un cluster Elasticsearch ?"
    answer: "En shards, répliqués"
    decoys:
      - "Dans un seul fichier partagé par tous les nœuds"
      - "Par ordre alphabétique, sur des serveurs dédiés"
    why: "Les shards répartissent la charge, les répliques protègent contre la perte d'un nœud."
  - id: synchronisation
    prompt: "Comment Elasticsearch s'articule-t-il avec la base principale ?"
    answer: "C'est une copie, alimentée à partir d'elle et à synchroniser"
    decoys:
      - "Il la remplace entièrement"
      - "Il en devient la source de vérité, et la base principale le recopie"
    why: "La fiche le présente en complément de la base principale, alimenté à partir d'elle."
---
