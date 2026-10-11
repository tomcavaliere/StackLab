---
questions:
  - id: separation
    prompt: "Quelle est l'idée centrale de l'architecture de Snowflake ?"
    answer: "Séparer le stockage du calcul"
    decoys:
      - "Stocker les données par lignes, pour les transactions"
      - "Faire tourner l'entrepôt sur les serveurs du client"
    why: "Données en format colonnaire d'un côté, calcul dimensionné à part de l'autre."
  - id: entrepot-virtuel
    prompt: "Qu'est-ce qu'un entrepôt virtuel dans Snowflake ?"
    answer: "Une ressource de calcul qu'on démarre, arrête et dimensionne indépendamment du stockage"
    decoys:
      - "Une copie physique des données, réservée à une équipe et facturée au volume stocké"
      - "Une base de test gratuite, sans facturation"
    why: "Le calcul s'allume quand on en a besoin, à la taille voulue, sans toucher aux données."
  - id: plusieurs-equipes
    prompt: "Pourquoi plusieurs équipes peuvent-elles interroger Snowflake sans se gêner ?"
    answer: "Chacune a sa propre puissance de calcul sur les mêmes données"
    decoys:
      - "Chacune reçoit une copie physique des données"
      - "Les requêtes passent une par une, dans une file d'attente"
    why: "Chaque équipe a son entrepôt virtuel : les requêtes lourdes d'une équipe ne ralentissent pas les autres."
  - id: clouds
    prompt: "Sur quels clouds Snowflake tourne-t-il ?"
    answer: "AWS, Azure ou Google Cloud, au choix"
    decoys:
      - "Uniquement AWS"
      - "Uniquement dans ses propres datacenters"
    why: "Snowflake ne lie pas l'entrepôt à un fournisseur cloud unique."
  - id: voyage-dans-le-temps
    prompt: "Que permet le voyage dans le temps de Snowflake ?"
    answer: "Lire une table telle qu'elle était à un moment passé"
    decoys:
      - "Planifier des requêtes dans le futur"
      - "Revenir à une ancienne version du logiciel Snowflake"
    why: "On peut relire l'état passé d'une table, par exemple après une erreur."
  - id: clonage
    prompt: "Que permet le clonage sans copie ?"
    answer: "Créer un clone d'une table ou d'une base sans dupliquer les données"
    decoys:
      - "Copier une base Snowflake vers PostgreSQL"
      - "Répliquer un entrepôt virtuel dans une autre région, pour la reprise après sinistre"
    why: "Le clone partage le stockage de l'original : un environnement de test se crée en un instant."
  - id: transactionnel
    prompt: "Utiliser Snowflake comme base d'une application, avec des écritures unitaires fréquentes ?"
    answer: "Non : ce n'est pas un moteur transactionnel"
    decoys:
      - "Oui : c'est son usage principal"
      - "Oui, avec un petit entrepôt virtuel dédié"
    why: "Snowflake est fait pour analyser de gros volumes, pas pour les écritures unitaires d'une application."
  - id: cout
    prompt: "Quel piège de coût la fiche signale-t-elle ?"
    answer: "Un entrepôt virtuel oublié allumé, ou des requêtes mal écrites"
    decoys:
      - "Un prix fixe par utilisateur connecté, même inactif"
      - "Des frais de licence par table créée"
    why: "Le calcul se paie quand il tourne : sans discipline, la facture grimpe."
  - id: petit-volume
    prompt: "Petit volume, usage individuel : que conseille la fiche ?"
    answer: "DuckDB ou PostgreSQL suffisent, sans facture de calcul"
    decoys:
      - "Snowflake, obligatoirement, même pour un seul utilisateur"
      - "Un cluster Spark managé"
    why: "Un entrepôt cloud se justifie avec plusieurs sources, plusieurs équipes, de gros volumes."
  - id: s3
    prompt: "Comment Snowflake lit-il des fichiers déposés dans S3 ?"
    answer: "Par des stages externes"
    decoys:
      - "Il ne le peut pas : il faut insérer les données ligne à ligne"
      - "En passant par Memcached"
    why: "Un stage externe pointe vers un emplacement S3, d'où Snowflake charge ou lit les fichiers."
---
