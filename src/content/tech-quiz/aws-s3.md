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
  - id: cle-objet
    prompt: "Comment un objet est-il identifié dans un bucket S3 ?"
    answer: "Par sa clé, unique dans le bucket"
    decoys:
      - "Par un numéro d'inode attribué par le disque"
      - "Par son adresse IP dans le réseau d'AWS"
    why: "Un objet S3 est désigné par le couple bucket + clé. Il n'y a pas d'inode comme sur un système de fichiers, et un objet n'a pas d'adresse IP."
  - id: prefixes
    prompt: "Dans un bucket S3 classique (usage général), les « dossiers » affichés par la console sont-ils de vrais répertoires ?"
    answer: "Non : ce sont des préfixes dans les clés des objets, séparés par des « / »"
    decoys:
      - "Oui : S3 range les objets dans une arborescence, comme le système de fichiers d'un disque"
      - "Oui : chaque dossier est un bucket imbriqué, créé à l'intérieur du bucket parent"
    why: "L'espace de noms d'un bucket d'usage général est plat : « photos/2024/a.jpg » est une seule clé, que la console présente comme une arborescence. Les buckets ne s'imbriquent pas."
  - id: coherence
    prompt: "Quel modèle de cohérence S3 offre-t-il aujourd'hui pour une lecture qui suit une écriture ?"
    answer: "Une cohérence forte : une lecture après une écriture réussie voit la nouvelle version"
    decoys:
      - "Une cohérence éventuelle : il faut parfois attendre avant de lire la nouvelle version"
      - "Aucune garantie : chaque lecture peut renvoyer n'importe quelle version passée"
    why: "Depuis fin 2020, S3 garantit la cohérence forte en lecture après écriture, sans surcoût. La cohérence éventuelle décrivait l'ancien comportement de certaines opérations."
  - id: versionnement
    prompt: "À quoi sert le versionnement d'un bucket S3 ?"
    answer: "Conserver les versions précédentes des objets, pour récupérer un écrasement ou une suppression"
    decoys:
      - "Interroger les objets en SQL comme une table, avec l'historique de chaque ligne"
      - "Répliquer automatiquement le bucket dans toutes les régions AWS, version par version"
    why: "Avec le versionnement, écraser ou supprimer un objet garde l'ancienne version, récupérable. Il ne rend pas S3 interrogeable et ne réplique rien vers d'autres régions."
  - id: cycle-de-vie
    prompt: "Comment déplacer automatiquement les objets anciens vers une classe moins chère, ou les supprimer après un délai ?"
    answer: "Avec des règles de cycle de vie sur le bucket"
    decoys:
      - "Avec une fonction Lambda obligatoire pour chaque objet"
      - "En recréant le bucket vide au début de chaque mois"
    why: "Les règles de cycle de vie font changer de classe ou expirer les objets selon leur âge, sans code. Une Lambda par objet ou un bucket recréé seraient du bricolage."
  - id: glacier
    prompt: "Quelle famille de classes de stockage S3 vise l'archivage à long terme ?"
    answer: "S3 Glacier"
    decoys:
      - "S3 Express One Zone"
      - "S3 Standard"
    why: "Les classes Glacier offrent le prix au gigaoctet le plus bas pour les archives. Express One Zone vise la faible latence, Standard les données lues fréquemment."
  - id: compromis-archive
    prompt: "Quel compromis impose une classe d'archive de type Glacier ?"
    answer: "Un stockage moins cher, contre une récupération plus lente ou facturée"
    decoys:
      - "Un stockage plus cher, contre des lectures plus rapides qu'en Standard"
      - "Un stockage gratuit, à condition de n'y déposer que des fichiers texte"
    why: "On paie moins pour stocker, mais relire coûte du temps ou des frais de récupération selon la classe. Les archives ne sont ni plus rapides ni gratuites."
  - id: url-presignee
    prompt: "Comment laisser un utilisateur télécharger un objet privé pendant un temps limité, sans rendre le bucket public ?"
    answer: "Lui fournir une URL présignée qui expire"
    decoys:
      - "Rendre le bucket public, puis le refermer à la main"
      - "Lui transmettre les clés d'accès du compte AWS"
    why: "Une URL présignée porte une autorisation temporaire pour un objet précis. Ouvrir le bucket expose tout, et partager des clés donne bien plus que ce fichier."
  - id: blocage-acces-public
    prompt: "Quel réglage S3 empêche qu'un bucket soit exposé publiquement par erreur ?"
    answer: "Le blocage de l'accès public (Block Public Access)"
    decoys:
      - "Le versionnement des objets du bucket"
      - "La classe de stockage Standard-IA"
    why: "Block Public Access refuse les politiques et ACL qui rendraient les objets publics. Le versionnement et les classes de stockage ne contrôlent pas l'accès."
  - id: politique-bucket
    prompt: "Comment définir, au niveau du bucket lui-même, qui peut y lire ou y écrire ?"
    answer: "Avec une politique de bucket (bucket policy) en JSON"
    decoys:
      - "Avec un fichier .htaccess déposé à la racine du bucket"
      - "Avec une règle de cycle de vie appliquée au bucket"
    why: "La politique de bucket est un document IAM attaché au bucket. S3 n'est pas un serveur Apache, et le cycle de vie gère l'âge des objets, pas les droits."
  - id: chiffrement
    prompt: "Les nouveaux objets déposés dans S3 sont-ils chiffrés au repos ?"
    answer: "Oui : S3 les chiffre côté serveur par défaut"
    decoys:
      - "Non : il faut chiffrer chaque fichier soi-même avant l'envoi"
      - "Seulement s'ils sont placés dans une classe d'archive Glacier"
    why: "Depuis début 2023, S3 applique par défaut un chiffrement côté serveur à tous les nouveaux objets. On peut choisir ses propres clés, mais ce n'est plus nécessaire pour être chiffré."
  - id: envoi-multipart
    prompt: "Comment envoyer efficacement un très gros fichier dans S3 ?"
    answer: "Par un envoi en plusieurs parties (multipart upload), parallélisable et reprenable"
    decoys:
      - "En le découpant entre plusieurs buckets, un morceau par bucket, recollés à la lecture"
      - "En le compressant en ZIP au préalable, car S3 refuse les gros fichiers non compressés"
    why: "Le multipart envoie les parties en parallèle et ne renvoie que celles qui ont échoué ; S3 les assemble en un seul objet. Il n'exige ni plusieurs buckets ni compression."
  - id: site-statique
    prompt: "Quel usage web S3 permet-il, souvent avec CloudFront devant ?"
    answer: "Héberger un site statique : HTML, CSS, JavaScript et images"
    decoys:
      - "Exécuter un back-end PHP qui gère les sessions des utilisateurs"
      - "Héberger une base MySQL accessible directement depuis le navigateur"
    why: "S3 sert des fichiers tels quels, ce qui suffit pour un site statique ; CloudFront ajoute cache et HTTPS. Il n'exécute aucun code serveur et n'héberge pas de base."
  - id: replication
    prompt: "Comment conserver automatiquement une copie des objets d'un bucket dans une autre région ?"
    answer: "Avec la réplication entre régions (Cross-Region Replication)"
    decoys:
      - "Avec une URL présignée qui pointe vers l'autre région"
      - "Avec une règle de cycle de vie qui déplace vers Glacier"
    why: "La réplication copie les nouveaux objets vers un bucket d'une autre région. Une URL présignée donne un accès temporaire, une règle de cycle de vie change de classe dans la même région."
  - id: redondance
    prompt: "Comment S3 assure-t-il la durabilité des objets en classe Standard ?"
    answer: "En stockant chaque objet de façon redondante sur plusieurs zones de disponibilité"
    decoys:
      - "En gardant chaque objet sur une grappe RAID unique, dans un seul datacenter de la région"
      - "En demandant au client de recopier lui-même chaque objet dans un second bucket de secours"
    why: "La classe Standard réplique les données sur plusieurs zones d'une région, sans action du client. Un seul datacenter ne survivrait pas à sa propre panne."
  - id: one-zone
    prompt: "Quel risque accepte-t-on en choisissant la classe S3 One Zone-IA ?"
    answer: "Perdre les données si la zone de disponibilité qui les héberge est détruite"
    decoys:
      - "Ne pouvoir lire les objets que depuis une seule instance EC2 désignée à l'avance"
      - "Voir les objets supprimés automatiquement au bout d'un mois de stockage"
    why: "One Zone-IA coûte moins cher parce qu'elle ne stocke les données que dans une zone. Elle ne restreint pas les lecteurs et n'impose aucune expiration."
  - id: notifications
    prompt: "Quelles cibles une notification d'événement S3 (dépôt d'un objet, par exemple) peut-elle avertir ?"
    answer: "Une fonction Lambda, une file SQS, un sujet SNS ou EventBridge"
    decoys:
      - "Uniquement l'adresse e-mail de l'administrateur du compte"
      - "Uniquement un autre bucket S3, qui reçoit une copie de l'objet"
    why: "S3 publie ses événements vers Lambda, SQS, SNS ou EventBridge, qui déclenchent ensuite les traitements. Copier vers un autre bucket relève de la réplication."
  - id: list-objects
    prompt: "Que fait l'opération ListObjectsV2 de l'API S3 ?"
    answer: "Elle énumère les objets d'un bucket, éventuellement filtrés par préfixe"
    decoys:
      - "Elle renvoie les lignes d'un fichier CSV qui vérifient une condition"
      - "Elle liste les buckets publics de tous les comptes AWS de la région"
    why: "ListObjectsV2 parcourt les clés d'un bucket, page par page, avec un filtre de préfixe optionnel. Elle ne lit pas le contenu des fichiers et reste limitée au bucket visé."
  - id: put-get
    prompt: "Quelles opérations de l'API S3 écrivent puis lisent un objet ?"
    answer: "PutObject et GetObject"
    decoys:
      - "CreateBucket et ListBuckets"
      - "WriteFile et ReadFile"
    why: "PutObject dépose un objet sous une clé, GetObject le relit. CreateBucket et ListBuckets gèrent les buckets eux-mêmes ; WriteFile et ReadFile n'existent pas dans l'API S3."
  - id: minio
    prompt: "Lequel de ces logiciels fournit un stockage d'objets compatible S3 que l'on peut héberger soi-même ?"
    answer: "MinIO"
    decoys:
      - "Redis"
      - "Nginx"
    why: "MinIO reprend l'API de S3, si bien que les outils écrits pour S3 fonctionnent avec lui. Redis est un stockage en mémoire, Nginx un serveur web."
---
