---
questions:
  - id: modele
    prompt: "Qu'est-ce que DynamoDB ?"
    answer: "Une base clé-valeur et document entièrement managée par AWS"
    decoys:
      - "Une base relationnelle managée par AWS, compatible avec PostgreSQL"
      - "Un cache en mémoire placé devant RDS"
    why: "DynamoDB est une base NoSQL où AWS gère réplication, partitionnement et pannes. Le relationnel managé d'AWS, c'est RDS ou Aurora."
  - id: cles
    prompt: "Que choisit-on à la création d'une table DynamoDB ?"
    answer: "Une clé de partition, et éventuellement une clé de tri"
    decoys:
      - "Le nombre de serveurs du cluster"
      - "Le schéma complet de toutes les colonnes, avec leurs types"
    why: "La clé de partition décide où AWS range chaque élément ; la clé de tri ordonne les éléments d'une même partition. Pas de serveurs à dimensionner."
  - id: acces
    prompt: "Comment interroge-t-on efficacement DynamoDB ?"
    answer: "Par clé, ou par plage de clés de tri"
    decoys:
      - "Par des requêtes SQL ad hoc avec jointures"
      - "Par une recherche plein texte sur tous les champs"
    why: "Les accès passent par les clés. Requêtes ad hoc, filtres variés et jointures ne s'y prêtent pas."
  - id: index-secondaire
    prompt: "Comment ajouter un autre chemin d'accès que la clé principale ?"
    answer: "Avec un index secondaire global"
    decoys:
      - "Avec une jointure vers une autre table"
      - "Avec une vue SQL matérialisée"
    why: "Les index secondaires globaux permettent d'interroger les mêmes données par une autre clé."
  - id: partition-chaude
    prompt: "Que risque-t-on si les accès se concentrent sur quelques clés ?"
    answer: "Une partition chaude, qui limite le débit"
    decoys:
      - "La suppression automatique des éléments les plus lus"
      - "Le passage de la table en lecture seule"
    why: "Toute la charge tombe sur la même partition : d'où l'importance du choix de la clé de partition."
  - id: requetes-d-abord
    prompt: "Quel principe de modélisation la fiche souligne-t-elle ?"
    answer: "Connaître ses requêtes avant de modéliser"
    decoys:
      - "Normaliser les données en troisième forme normale"
      - "Ajouter des colonnes au fil des besoins, sans réfléchir aux clés"
    why: "Comme avec Cassandra, la modélisation part des accès : les clés sont choisies pour les requêtes à servir."
  - id: avec-lambda
    prompt: "Pourquoi DynamoDB s'accorde-t-il bien avec Lambda ?"
    answer: "Il n'y a pas de connexion persistante à gérer, ni de machine"
    decoys:
      - "Lambda ne peut se connecter à aucune autre base"
      - "DynamoDB exécute lui-même le code des fonctions, au plus près des données"
    why: "Des fonctions qui démarrent et s'arrêtent sans cesse épuisent les connexions d'une base relationnelle ; DynamoDB s'appelle par API, sans connexion persistante."
  - id: streams
    prompt: "À quoi servent les DynamoDB Streams ?"
    answer: "Fournir un flux des modifications pour déclencher des traitements"
    decoys:
      - "Diffuser des vidéos stockées dans la base vers les navigateurs des utilisateurs"
      - "Répliquer la table vers PostgreSQL"
    why: "Chaque modification produit un événement dans le flux, qui peut déclencher une fonction Lambda par exemple."
  - id: dependance
    prompt: "Quel est l'inconvénient stratégique de DynamoDB ?"
    answer: "Son API est propre à AWS : on dépend du fournisseur"
    decoys:
      - "Il faut gérer soi-même les sauvegardes et les pannes"
      - "Il ne monte pas en charge au-delà d'un serveur"
    why: "L'exploitation est entièrement gérée, et la montée en charge automatique. Le prix est la dépendance à AWS."
  - id: reporting
    prompt: "Une équipe veut faire du reporting avec des filtres variés sur ses commandes. DynamoDB convient-il ?"
    answer: "Mal : requêtes ad hoc et reporting ne s'y prêtent pas"
    decoys:
      - "Très bien : chaque attribut est indexé automatiquement"
      - "Très bien, grâce aux jointures entre tables"
    why: "DynamoDB sert des accès connus à l'avance. Pour du reporting, on exporte vers un entrepôt ou on choisit une base relationnelle."
  - id: inspiration
    prompt: "De quel système DynamoDB s'inspire-t-il ?"
    answer: "Dynamo, décrit par Amazon en 2007"
    decoys:
      - "Bigtable, décrit par Google en 2006"
      - "Borg, le planificateur interne de Google"
    why: "DynamoDB, lancé en 2012, reprend les idées de Dynamo, le système décrit par Amazon en 2007."
  - id: modes-capacite
    prompt: "Quels modes de capacité propose DynamoDB ?"
    answer: "À la demande, ou provisionnée à l'avance"
    decoys:
      - "Des instances à choisir par taille, comme avec RDS"
      - "Un forfait illimité, sans aucune facturation à l'usage"
    why: "On paie soit à la requête (à la demande), soit une capacité réservée. Il n'y a jamais de serveur à dimensionner."
  - id: query-ou-scan
    prompt: "Quelle différence entre les opérations Query et Scan de DynamoDB ?"
    answer: "Query cible une clé de partition, Scan lit toute la table"
    decoys:
      - "Query lit toute la table, Scan cible une seule clé de partition"
      - "Aucune : Scan est simplement l'ancien nom de l'opération Query"
    why: "Query va droit à une partition et filtre éventuellement sur la clé de tri. Scan parcourt tous les éléments : lent et coûteux sur une grosse table."
  - id: index-local
    prompt: "Quelle particularité a un index secondaire local (LSI) dans DynamoDB ?"
    answer: "Même clé de partition, autre clé de tri, défini à la création de la table"
    decoys:
      - "Une autre clé de partition, et il peut être ajouté à tout moment"
      - "Il est stocké dans une autre région pour lire plus près des utilisateurs"
    why: "Le LSI réordonne les éléments d'une même partition et se déclare avec la table. Changer de clé de partition et ajouter l'index plus tard, c'est le GSI."
  - id: coherence-gsi
    prompt: "Quelle cohérence offre une lecture sur un index secondaire global de DynamoDB ?"
    answer: "Éventuelle seulement"
    decoys:
      - "Forte, si on la demande"
      - "Forte, toujours"
    why: "Le GSI est alimenté de façon asynchrone à partir de la table : ses lectures sont éventuellement cohérentes. La lecture fortement cohérente n'existe que sur la table et les LSI."
  - id: lecture-par-defaut
    prompt: "Par défaut, une lecture GetItem sur une table DynamoDB est-elle fortement cohérente ?"
    answer: "Non, sauf si l'on demande ConsistentRead"
    decoys:
      - "Oui : toutes les lectures DynamoDB sont fortement cohérentes"
      - "Non, et aucune option ne permet de lecture fortement cohérente"
    why: "Par défaut, la lecture peut ne pas refléter une écriture toute récente. Le paramètre ConsistentRead demande une lecture fortement cohérente, plus coûteuse."
  - id: ttl
    prompt: "Comment faire expirer automatiquement des éléments dans DynamoDB ?"
    answer: "Avec le TTL : un attribut d'horodatage après lequel l'élément est supprimé"
    decoys:
      - "Avec une contrainte EXPIRES déclarée dans le schéma complet de la table"
      - "Avec un index secondaire global qui purge les vieux éléments chaque nuit"
    why: "On désigne un attribut qui contient une date d'expiration ; DynamoDB supprime ensuite les éléments expirés en arrière-plan, sans consommer de capacité d'écriture."
  - id: ecriture-conditionnelle
    prompt: "Comment éviter d'écraser un élément DynamoDB modifié entre-temps par un autre client ?"
    answer: "Avec une écriture conditionnelle (ConditionExpression)"
    decoys:
      - "Avec un verrou de table posé par une commande LOCK TABLE"
      - "Avec un index secondaire global configuré en mode exclusif"
    why: "La condition (par exemple sur un numéro de version) est vérifiée au moment de l'écriture, qui échoue si elle n'est plus vraie. DynamoDB n'a pas de verrou de table."
  - id: single-table
    prompt: "Que désigne le « single-table design » dans DynamoDB ?"
    answer: "Ranger plusieurs types d'entités dans une même table, avec des clés génériques"
    decoys:
      - "Se limiter à une seule table DynamoDB par compte et par région, une règle d'AWS"
      - "Fusionner tous les attributs de chaque élément en un seul champ JSON opaque"
    why: "En préfixant les clés (USER#…, ORDER#…), on lit un utilisateur et ses commandes en une seule Query, faute de jointures. C'est un choix de modélisation, pas une limite d'AWS."
  - id: dax
    prompt: "Qu'est-ce que DAX, dans l'écosystème DynamoDB ?"
    answer: "Un cache en mémoire managé, placé devant DynamoDB"
    decoys:
      - "Le langage de requête compatible SQL de DynamoDB"
      - "Un outil managé d'export des tables vers S3"
    why: "DynamoDB Accelerator met en cache les lectures avec la même API. Le langage compatible SQL, c'est PartiQL."
  - id: partiql
    prompt: "Quel langage compatible SQL DynamoDB accepte-t-il ?"
    answer: "PartiQL"
    decoys:
      - "CQL"
      - "HiveQL"
    why: "PartiQL permet d'écrire des SELECT, INSERT ou UPDATE, mais les règles d'accès par clé restent les mêmes. CQL est le langage de Cassandra, HiveQL celui de Hive."
  - id: tables-globales
    prompt: "À quoi servent les tables globales (global tables) de DynamoDB ?"
    answer: "À répliquer une table dans plusieurs régions AWS, en écriture partout"
    decoys:
      - "À partager une même table entre plusieurs comptes AWS, sans réplication"
      - "À réunir plusieurs tables en une seule vue interrogeable avec des jointures"
    why: "Chaque région détient une réplique qui accepte lectures et écritures, ce qui rapproche les données des utilisateurs et résiste à la perte d'une région."
  - id: pitr
    prompt: "Quelle fonctionnalité de DynamoDB permet de restaurer une table à un instant passé ?"
    answer: "La restauration à un point dans le temps (PITR)"
    decoys:
      - "Les Streams, en rejouant tous les événements depuis la création"
      - "Le TTL, en annulant les dernières expirations d'éléments"
    why: "Une fois activée, la PITR permet de restaurer la table à n'importe quelle seconde de la période de rétention. Les Streams ne gardent les modifications que peu de temps."
  - id: attributs-libres
    prompt: "Quels attributs faut-il déclarer à la création d'une table DynamoDB ?"
    answer: "Seulement ceux des clés : les autres sont libres, élément par élément"
    decoys:
      - "Tous les attributs, avec leurs types, comme les colonnes d'une table SQL"
      - "Aucun : la table adopte la structure du premier élément qu'on y insère"
    why: "Hors clés de table et d'index, chaque élément porte les attributs qu'il veut. Le premier élément n'impose rien aux suivants."
  - id: transactions
    prompt: "DynamoDB permet-il d'écrire atomiquement sur plusieurs éléments ?"
    answer: "Oui, avec TransactWriteItems"
    decoys:
      - "Non, chaque écriture reste indépendante"
      - "Oui, avec BatchWriteItem"
    why: "TransactWriteItems applique toutes les écritures ou aucune. BatchWriteItem regroupe des écritures sans les rendre atomiques."
  - id: batch-write
    prompt: "Que se passe-t-il si une partie d'un BatchWriteItem échoue ?"
    answer: "Les éléments non traités sont renvoyés et doivent être relancés"
    decoys:
      - "Tout le lot est annulé, comme pour une transaction sur plusieurs éléments"
      - "DynamoDB relance seul les écritures jusqu'à ce que le lot entier réussisse"
    why: "La réponse liste les UnprocessedItems ; c'est à l'application de les renvoyer, idéalement avec un délai croissant. Un lot n'est pas une transaction."
  - id: pagination
    prompt: "Que faire quand une Query DynamoDB renvoie un LastEvaluatedKey ?"
    answer: "Relancer la requête à partir de cette clé pour obtenir la suite"
    decoys:
      - "Rien : il indique seulement la dernière clé de toute la table"
      - "Augmenter la capacité, car il signale une requête rejetée"
    why: "Une Query renvoie ses résultats par pages ; LastEvaluatedKey sert de point de départ (ExclusiveStartKey) pour la page suivante."
  - id: filter-expression
    prompt: "Une FilterExpression ajoutée à une Query DynamoDB réduit-elle les données lues et facturées ?"
    answer: "Non : le filtre s'applique après la lecture des éléments"
    decoys:
      - "Oui : seuls les éléments qui passent le filtre sont lus"
      - "Oui : elle transforme la requête en accès par un index"
    why: "Les éléments sont lus (et facturés), puis filtrés avant d'être renvoyés. Pour lire moins, il faut une meilleure clé ou un index."
  - id: throttling
    prompt: "Que se passe-t-il quand une table DynamoDB en capacité provisionnée dépasse son débit ?"
    answer: "Une partie des requêtes est limitée (throttling) et doit être retentée"
    decoys:
      - "AWS supprime les éléments les plus anciens pour libérer de la capacité"
      - "La table est déplacée sur un serveur plus puissant pendant la nuit"
    why: "Les requêtes au-delà de la capacité reçoivent une erreur de dépassement ; les SDK AWS les retentent avec un délai. Aucune donnée n'est supprimée."
  - id: dynamodb-local
    prompt: "Comment développer et tester sans appeler AWS contre une base compatible DynamoDB ?"
    answer: "Avec DynamoDB local, une version téléchargeable"
    decoys:
      - "Avec PostgreSQL lancé en mode de compatibilité DynamoDB"
      - "C'est impossible : DynamoDB n'existe qu'en service en ligne"
    why: "AWS fournit DynamoDB local (fichier JAR ou image Docker) pour développer hors ligne. PostgreSQL n'a pas de mode de compatibilité DynamoDB."
---
