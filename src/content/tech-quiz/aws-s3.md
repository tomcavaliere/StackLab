---
questions:
  - id: stockage-objet
    prompt: "Quel type de stockage est Amazon S3 ?"
    answer: "Un stockage d'objets : des fichiers rangés dans des buckets, accessibles par une API HTTP"
    decoys:
      - "Un système de fichiers réseau que l'on monte comme un disque partagé sur chacun des serveurs"
      - "Une base clé-valeur avec requêtes, index et transactions"
    why: "S3 stocke des objets dans des buckets, lus et écrits par API. Ce n'est ni un disque partagé ni une base de données : pas de requêtes, pas de transactions sur plusieurs objets."
  - id: data-lake
    prompt: "Quel rôle S3 joue-t-il souvent dans une plateforme data ?"
    answer: "Le data lake : zone d'atterrissage des données brutes et stockage bon marché de gros volumes"
    decoys:
      - "Le moteur qui exécute les transformations SQL directement à l'intérieur des buckets, sans cluster à gérer"
      - "L'orchestrateur qui planifie les pipelines"
    why: "On dépose dans S3 les données brutes et transformées ; des moteurs comme Spark, Snowflake ou DuckDB les lisent directement. S3 stocke, il ne calcule ni n'orchestre."
  - id: format
    prompt: "Sous quel format dépose-t-on typiquement des données analytiques dans S3 ?"
    answer: "Parquet, ou un format de tables comme Apache Iceberg"
    decoys:
      - "Des classeurs Excel, un par table"
      - "Des dumps SQL de la base de production, réimportés à chaque analyse"
    why: "Parquet est un format colonnaire que lisent Spark, Trino, Snowflake ou DuckDB ; Iceberg y ajoute une gestion de tables. Excel ou des dumps SQL ne sont pas interrogeables efficacement."
  - id: remplacement-entier
    prompt: "Pourquoi S3 convient-il mal à des fichiers modifiés partiellement et souvent ?"
    answer: "Un objet se remplace en entier : pas de modification partielle"
    decoys:
      - "Les objets y sont limités à quelques kilo-octets"
      - "Chaque lecture verrouille l'objet pour les autres clients"
    why: "On ne modifie pas quelques octets au milieu d'un objet S3 : on le réécrit. La fiche le range dans « Quand l'éviter » pour un usage de système de fichiers partagé."
  - id: pas-une-base
    prompt: "Peut-on utiliser S3 comme base de données d'une application ?"
    answer: "Non : il n'offre ni requêtes ni transactions sur plusieurs objets"
    decoys:
      - "Oui : chaque bucket se comporte comme une table SQL"
      - "Oui, à condition d'activer le versionnement des objets pour garder l'historique"
    why: "S3 stocke des fichiers. Pour interroger des données ou écrire plusieurs enregistrements de façon atomique, il faut une base."
  - id: facturation
    prompt: "Sur quoi repose la facturation de S3 ?"
    answer: "Le volume stocké, les requêtes et les transferts sortants"
    decoys:
      - "Un forfait mensuel fixe par bucket créé, quel que soit son contenu"
      - "Le nombre d'utilisateurs de l'application"
    why: "S3 se paie à l'usage : gigaoctets stockés, nombre de requêtes et données qui sortent d'AWS."
  - id: archives
    prompt: "Comment réduire le coût de sauvegardes rarement relues ?"
    answer: "Les placer dans une classe de stockage moins chère, prévue pour les données rarement lues"
    decoys:
      - "Les regrouper dans un seul objet géant, pour ne payer qu'une seule requête de lecture par mois"
      - "Les déplacer dans DynamoDB, facturé au volume"
    why: "S3 propose des classes de stockage moins chères pour les archives. Regrouper les fichiers ne change pas le prix au gigaoctet."
  - id: compatible-s3
    prompt: "Que signifie « compatible S3 » pour un autre service de stockage ?"
    answer: "Il reprend l'API de S3, devenue un standard de fait"
    decoys:
      - "Il est hébergé dans les datacenters d'AWS"
      - "Il permet de monter un bucket S3 comme un disque local"
    why: "L'API de S3 est si répandue que d'autres stockages la reprennent : les outils écrits pour S3 fonctionnent avec eux sans modification."
  - id: autre-cloud
    prompt: "Une infrastructure entièrement sur Google Cloud doit stocker des fichiers. Que choisir ?"
    answer: "Google Cloud Storage, l'équivalent du fournisseur"
    decoys:
      - "S3 malgré tout : c'est le seul stockage d'objets du marché"
      - "Une table BigQuery par fichier"
    why: "Chaque cloud a son stockage d'objets (Google Cloud Storage, Azure Blob Storage). Faire transiter les données vers AWS coûte et complique."
  - id: lecture-directe
    prompt: "Quels outils lisent directement des fichiers Parquet déposés dans S3 ?"
    answer: "Spark, DuckDB, Snowflake ou Trino"
    decoys:
      - "Redis et Memcached"
      - "GitHub Actions, Docker et Kubernetes"
    why: "Ces moteurs interrogent les fichiers sur place : c'est ce qui fait de S3 le socle d'un data lake."
---
