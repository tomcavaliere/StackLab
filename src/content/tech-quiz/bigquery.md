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
---
