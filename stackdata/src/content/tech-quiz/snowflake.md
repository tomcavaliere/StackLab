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
  - id: fondation
    prompt: "En quelle année l'entreprise Snowflake a-t-elle été fondée ?"
    answer: "2012"
    decoys:
      - "2004"
      - "2019"
    why: "Snowflake a été fondée en 2012, comme entrepôt pensé dès le départ pour le cloud."
  - id: credits
    prompt: "En quelle unité la consommation de calcul de Snowflake est-elle comptée ?"
    answer: "En crédits, consommés tant qu'un entrepôt virtuel tourne"
    decoys:
      - "En octets lus par chaque requête, quelle que soit la durée du calcul"
      - "En nombre de lignes renvoyées aux utilisateurs par les requêtes"
    why: "Un entrepôt virtuel allumé consomme des crédits selon sa taille et sa durée de fonctionnement. La facturation à l'octet lu est celle de BigQuery à la demande."
  - id: auto-suspend
    prompt: "Quel réglage évite de payer un entrepôt virtuel Snowflake resté inactif ?"
    answer: "La suspension automatique après un délai d'inactivité (AUTO_SUSPEND)"
    decoys:
      - "La suppression de l'entrepôt après chaque requête, puis sa recréation"
      - "La réduction à zéro jour de la rétention du voyage dans le temps"
    why: "AUTO_SUSPEND arrête l'entrepôt après un délai sans requête, ce qui stoppe la consommation de crédits. La rétention du voyage dans le temps concerne le stockage."
  - id: auto-resume
    prompt: "Une requête arrive sur un entrepôt virtuel suspendu, avec AUTO_RESUME activé. Que se passe-t-il ?"
    answer: "Il redémarre automatiquement pour exécuter la requête"
    decoys:
      - "La requête échoue jusqu'au redémarrage manuel par un administrateur"
      - "La requête est confiée à l'entrepôt d'un autre compte Snowflake"
    why: "Avec AUTO_RESUME, l'entrepôt se rallume à la première requête. Combiné à AUTO_SUSPEND, il ne tourne que lorsqu'on s'en sert."
  - id: taille-entrepot
    prompt: "Une requête lourde est lente sur un petit entrepôt virtuel. Quel levier propre à Snowflake actionner ?"
    answer: "Passer l'entrepôt à une taille supérieure"
    decoys:
      - "Ajouter des index B-tree sur les colonnes filtrées"
      - "Copier les données sur un stockage plus rapide"
    why: "Les entrepôts ont des tailles (X-Small, Small, Medium…) : une taille au-dessus apporte plus de calcul, sans toucher aux données. Snowflake n'a pas d'index B-tree."
  - id: multi-cluster
    prompt: "À quoi sert un entrepôt virtuel multi-cluster ?"
    answer: "Ajouter des clusters quand beaucoup de requêtes simultanées font la queue"
    decoys:
      - "Répartir une seule requête lourde sur AWS, Azure et Google Cloud à la fois"
      - "Garder une copie complète des données dans chaque région, pour la reprise"
    why: "Un entrepôt multi-cluster démarre des clusters supplémentaires quand la concurrence augmente, puis les arrête. Pour accélérer une seule requête, on augmente plutôt la taille."
  - id: micro-partitions
    prompt: "Comment Snowflake découpe-t-il physiquement les tables ?"
    answer: "En micro-partitions, créées automatiquement à l'insertion"
    decoys:
      - "En partitions qu'il faut déclarer à la création de chaque table"
      - "En fichiers CSV, un par jour de données chargées"
    why: "Snowflake range automatiquement les données en micro-partitions colonnaires, sans déclaration de partition par l'utilisateur."
  - id: elagage
    prompt: "Pourquoi un filtre sur une date peut-il accélérer une requête Snowflake, sans index ?"
    answer: "Les métadonnées min/max des micro-partitions permettent d'en ignorer une partie"
    decoys:
      - "Snowflake crée un index B-tree sur chaque colonne de type date"
      - "Le résultat des requêtes filtrées par date est précalculé chaque nuit"
    why: "Snowflake connaît les bornes de chaque colonne par micro-partition : il saute celles qui ne peuvent pas contenir la date filtrée (élagage, ou pruning)."
  - id: cle-clustering
    prompt: "À quoi sert une clé de clustering sur une très grosse table Snowflake ?"
    answer: "Regrouper les lignes proches dans les mêmes micro-partitions, pour mieux les ignorer"
    decoys:
      - "Répartir la table entre plusieurs entrepôts virtuels pour paralléliser l'écriture"
      - "Garantir l'unicité des valeurs, comme une clé primaire contraignante"
    why: "La clé de clustering améliore l'élagage sur les colonnes souvent filtrées. Elle ne garantit aucune unicité et n'a rien à voir avec les entrepôts."
  - id: contraintes
    prompt: "Snowflake fait-il respecter les clés primaires et étrangères des tables standard ?"
    answer: "Non : il les enregistre, mais seule la contrainte NOT NULL est appliquée"
    decoys:
      - "Oui : toute insertion d'un doublon de clé primaire est rejetée"
      - "Oui, mais uniquement sur les tables créées par clonage"
    why: "Sur les tables standard, clés primaires, uniques et étrangères sont déclaratives (utiles aux outils), pas vérifiées. Le dédoublonnage reste à la charge des pipelines."
  - id: copy-into
    prompt: "Quelle commande charge en masse les fichiers d'un stage dans une table Snowflake ?"
    answer: "COPY INTO"
    decoys:
      - "LOAD DATA INFILE"
      - "BULK INSERT"
    why: "COPY INTO <table> FROM @stage charge les fichiers. LOAD DATA INFILE vient de MySQL, BULK INSERT de SQL Server."
  - id: snowpipe
    prompt: "Quel service Snowflake charge automatiquement les fichiers dès leur arrivée dans un stage ?"
    answer: "Snowpipe"
    decoys:
      - "Snowpark"
      - "Time Travel"
    why: "Snowpipe ingère en continu les nouveaux fichiers d'un stage. Snowpark sert à écrire des traitements en code ; Time Travel lit l'état passé des tables."
  - id: snowpark
    prompt: "Que permet Snowpark ?"
    answer: "Écrire des traitements en Python, Java ou Scala exécutés dans Snowflake"
    decoys:
      - "Ingérer automatiquement les fichiers S3 dès qu'ils arrivent dans un stage"
      - "Héberger un outil de BI fourni par Snowflake pour les tableaux de bord"
    why: "Snowpark offre une API DataFrame et des fonctions dans ces langages, exécutées près des données. L'ingestion continue est le rôle de Snowpipe."
  - id: variant
    prompt: "Quel type de colonne Snowflake accueille du JSON semi-structuré ?"
    answer: "VARIANT"
    decoys:
      - "BLOB"
      - "JSONB"
    why: "VARIANT stocke du semi-structuré (JSON, Avro, Parquet…) et s'interroge avec la notation colonne:champ. JSONB est le type JSON de PostgreSQL."
  - id: flatten
    prompt: "Quelle fonction Snowflake éclate un tableau JSON en autant de lignes ?"
    answer: "FLATTEN"
    decoys:
      - "EXPLODE"
      - "PIVOT"
    why: "LATERAL FLATTEN déplie un tableau ou un objet en lignes. EXPLODE est la fonction de Spark ; PIVOT transforme des lignes en colonnes."
  - id: partage-donnees
    prompt: "Que permet le partage de données (Secure Data Sharing) de Snowflake ?"
    answer: "Donner accès à des tables à un autre compte, sans les copier"
    decoys:
      - "Exporter chaque nuit les tables en CSV vers le bucket du destinataire"
      - "Envoyer par e-mail les résultats de requêtes planifiées aux partenaires"
    why: "Le compte destinataire lit directement les données partagées, toujours à jour, avec son propre calcul : rien n'est dupliqué ni exporté."
  - id: fail-safe
    prompt: "Que se passe-t-il pour une table permanente après la fin de sa période de voyage dans le temps ?"
    answer: "Une période de Fail-safe, où seul le support Snowflake peut récupérer les données"
    decoys:
      - "Les données restent lisibles par l'utilisateur avec AT, sans limite de durée"
      - "La table est clonée automatiquement dans un compte de sauvegarde du client"
    why: "Après le voyage dans le temps vient le Fail-safe, une protection de dernier recours qui n'est pas accessible à l'utilisateur : seul Snowflake peut restaurer."
  - id: undrop
    prompt: "Une table Snowflake a été supprimée par erreur. Quelle commande la restaure, pendant la période de rétention ?"
    answer: "UNDROP TABLE"
    decoys:
      - "RESTORE TABLE"
      - "ROLLBACK TABLE"
    why: "UNDROP s'appuie sur le voyage dans le temps pour rétablir une table, un schéma ou une base supprimés, tant que la rétention n'est pas écoulée."
  - id: roles
    prompt: "Comment Snowflake gère-t-il les droits d'accès ?"
    answer: "Par des rôles, qui reçoivent des privilèges et sont attribués aux utilisateurs"
    decoys:
      - "Par des permissions données à chaque utilisateur, sans aucune notion de rôle"
      - "Uniquement par les rôles IAM du cloud sur lequel tourne le compte"
    why: "Snowflake applique un contrôle d'accès par rôles : on accorde des privilèges à un rôle (GRANT), puis le rôle aux utilisateurs."
  - id: cache-resultats
    prompt: "Une requête identique est relancée sur des données inchangées. Que peut faire Snowflake ?"
    answer: "Renvoyer le résultat mis en cache, sans faire tourner d'entrepôt"
    decoys:
      - "Relancer tout le calcul et consommer de nouveau des crédits, sans exception"
      - "Refuser la requête tant qu'aucune table n'a changé depuis la précédente"
    why: "Snowflake conserve les résultats de requêtes : si les données n'ont pas bougé, le résultat est renvoyé directement, sans calcul facturé."
---
