---
questions:
  - id: documents
    prompt: "Comment MongoDB stocke-t-il les données ?"
    answer: "En documents (BSON, proche de JSON), sans imposer la même structure à tous"
    decoys:
      - "En tables à schéma strict, reliées par des clés étrangères vérifiées par la base"
      - "En paires clé-valeur opaques, comme Memcached"
    why: "Un profil, un article, un événement se stockent tels quels, d'un bloc, dans un document."
  - id: sharding
    prompt: "Quelle répartition des données MongoDB intègre-t-il ?"
    answer: "Le sharding : un partitionnement horizontal sur plusieurs serveurs"
    decoys:
      - "Aucune : il faut un outil externe comme Vitess"
      - "Une simple copie de toute la base sur chaque serveur, sans découpage des données"
    why: "Le sharding est fourni par la base. Vitess ajoute un sharding au-dessus de MySQL."
  - id: replica-sets
    prompt: "Comment MongoDB assure-t-il la réplication ?"
    answer: "Avec des replica sets"
    decoys:
      - "Avec des partitions Kafka"
      - "Il ne réplique pas les données"
    why: "Un replica set est un groupe de serveurs qui portent les mêmes données."
  - id: atomicite
    prompt: "Quelles écritures sont atomiques dans MongoDB, sans transaction ?"
    answer: "Les écritures sur un seul document"
    decoys:
      - "Toutes les écritures d'une même collection"
      - "Aucune écriture n'est atomique"
    why: "Le modèle vise à ce que la plupart des écritures tiennent dans un seul document, atomique."
  - id: transactions
    prompt: "Que dit la documentation officielle des transactions multi-documents ?"
    answer: "Elles existent depuis la 4.0 mais coûtent plus cher, et ne remplacent pas un schéma bien pensé"
    decoys:
      - "Elles n'existent pas, il faut les simuler dans l'application"
      - "Elles sont aussi rapides qu'une écriture simple, et la documentation conseille de les utiliser partout"
    why: "Elles sont possibles, mais un schéma où l'écriture tient dans un document reste la bonne approche."
  - id: donnees-reliees
    prompt: "Des données très reliées, avec beaucoup de jointures et de contraintes d'intégrité. MongoDB convient-il ?"
    answer: "Mal : on finit par réimplémenter le relationnel dans le code"
    decoys:
      - "Très bien : les documents gèrent les clés étrangères comme une base relationnelle"
      - "Très bien : le sharding remplace les jointures"
    why: "Quand tout est relié, une base relationnelle comme PostgreSQL protège la cohérence en base."
  - id: schema-souple
    prompt: "« Schéma souple » veut-il dire « pas de schéma » ?"
    answer: "Non : sans discipline ou validation de schéma, les documents dérivent"
    decoys:
      - "Oui : MongoDB interdit toute validation de schéma"
      - "Oui : tous les documents d'une collection sont forcément identiques"
    why: "MongoDB propose une validation de schéma ; sans elle, le code de lecture doit gérer toutes les variantes."
  - id: licence
    prompt: "Sous quelle licence est le serveur MongoDB depuis fin 2018 ?"
    answer: "La SSPL, non reconnue comme open-source par l'OSI"
    decoys:
      - "Apache 2.0, comme la plupart des projets de la fondation Apache"
      - "AGPLv3, comme Grafana depuis 2021"
    why: "La SSPL pèse surtout si l'on veut proposer MongoDB comme service hébergé à des tiers."
  - id: reporting-sql
    prompt: "Reporting en SQL ad hoc : MongoDB est-il pratique ?"
    answer: "Peu : son langage de requête et son pipeline d'agrégation ne sont pas du SQL"
    decoys:
      - "Très : MongoDB parle le SQL standard"
      - "Très : il génère automatiquement des vues SQL à partir de chaque collection"
    why: "Les analystes qui pratiquent SQL devront apprendre l'agrégation de MongoDB, ou exporter les données."
  - id: usage
    prompt: "Quel cas d'usage correspond bien à MongoDB ?"
    answer: "Un catalogue de produits hétérogènes, lus et écrits comme un bloc"
    decoys:
      - "Une comptabilité avec des contraintes d'intégrité strictes"
      - "Un entrepôt analytique de plusieurs téraoctets"
    why: "Structure variable et accès par bloc : c'est le terrain du modèle document."
  - id: find
    prompt: "Quelle méthode du shell MongoDB interroge les documents d'une collection ?"
    answer: "db.collection.find()"
    decoys:
      - "db.collection.scan()"
      - "db.collection.select()"
    why: "find() prend un filtre sous forme de document et renvoie un curseur. MongoDB n'a ni scan() ni select() : son langage de requête n'est pas du SQL."
  - id: pipeline-agregation
    prompt: "Comment fonctionne le pipeline d'agrégation de MongoDB ?"
    answer: "Une suite d'étapes ($match, $group…), chacune transformant la sortie de la précédente"
    decoys:
      - "Une requête SQL unique, traduite automatiquement en JavaScript par le serveur"
      - "Un job MapReduce lancé sur un cluster Hadoop externe relié à la base"
    why: "Chaque étape filtre, regroupe, projette ou trie les documents qu'elle reçoit. Tout s'exécute dans MongoDB, sans SQL ni cluster externe."
  - id: lookup
    prompt: "Quelle étape du pipeline d'agrégation fait une jointure gauche avec une autre collection ?"
    answer: "$lookup"
    decoys:
      - "$join"
      - "$merge"
    why: "$lookup ajoute à chaque document les documents correspondants d'une autre collection. $join n'existe pas, et $merge écrit le résultat du pipeline dans une collection."
  - id: champ-id
    prompt: "Quel champ chaque document MongoDB possède-t-il obligatoirement ?"
    answer: "_id, unique dans la collection"
    decoys:
      - "uuid, généré par le pilote"
      - "createdAt, rempli par le serveur"
    why: "_id sert de clé primaire ; s'il est absent à l'insertion, un ObjectId est généré. Aucun champ uuid ou createdAt n'est imposé."
  - id: objectid
    prompt: "Que contient un ObjectId généré par défaut dans MongoDB ?"
    answer: "Notamment l'horodatage de sa création, ce qui le rend à peu près croissant"
    decoys:
      - "Un hachage du contenu du document, recalculé à chaque mise à jour"
      - "Le numéro du shard qui stocke le document, suivi d'un compteur local"
    why: "Les premiers octets d'un ObjectId encodent sa date de création. Il ne dépend ni du contenu du document ni de son shard."
  - id: incorporer-ou-referencer
    prompt: "Quand préférer incorporer des sous-documents plutôt que les référencer dans MongoDB ?"
    answer: "Quand ils sont lus avec leur parent et que leur nombre reste borné"
    decoys:
      - "Quand leur nombre peut croître sans limite, comme les commentaires d'un site très actif"
      - "Quand de nombreux documents partagent et modifient les mêmes données à tout moment"
    why: "Incorporer permet de tout lire et écrire en une opération atomique. Une liste sans limite fait grossir le document, et des données partagées seraient dupliquées partout."
  - id: election
    prompt: "Que se passe-t-il si le primaire d'un replica set MongoDB tombe ?"
    answer: "Les membres restants élisent un nouveau primaire"
    decoys:
      - "Un administrateur doit désigner le nouveau primaire à la main"
      - "Le replica set reste en lecture seule jusqu'au retour du même primaire"
    why: "La bascule est automatique : un secondaire est élu primaire et les pilotes s'y reconnectent. C'est l'intérêt d'un replica set."
  - id: write-concern
    prompt: "Que règle le write concern dans MongoDB ?"
    answer: "Le nombre de membres qui doivent confirmer une écriture avant la réponse"
    decoys:
      - "Le nombre maximal de documents qu'une seule écriture peut modifier à la fois"
      - "L'algorithme de compression appliqué aux données au moment de leur écriture"
    why: "Un write concern majority attend la majorité du replica set : l'écriture survit alors à une bascule. Il ne limite pas les documents modifiés et ne touche pas à la compression."
  - id: read-preference
    prompt: "À quoi sert la read preference dans MongoDB ?"
    answer: "À choisir les membres du replica set où lire (primaire, secondaires…)"
    decoys:
      - "À trier les résultats d'une requête par pertinence pour l'utilisateur"
      - "À donner la priorité aux lectures sur les écritures en cas de forte charge"
    why: "Lire sur un secondaire répartit la charge, au risque d'obtenir des données légèrement en retard. Le tri des résultats et la priorité des opérations sont d'autres sujets."
  - id: cle-de-shard
    prompt: "Quel choix est critique au moment de sharder une collection MongoDB ?"
    answer: "La clé de shard, qui décide de la répartition des documents"
    decoys:
      - "Le nombre de collections présentes dans la base de données"
      - "Le langage du pilote utilisé par l'application cliente"
    why: "Une clé de shard mal choisie concentre la charge sur un shard ou oblige à interroger tous les shards. Les collections et le pilote n'y changent rien."
  - id: mongos
    prompt: "Dans un cluster MongoDB shardé, quel composant route les requêtes vers les bons shards ?"
    answer: "mongos"
    decoys:
      - "mongosh"
      - "un arbitre du replica set"
    why: "mongos est le routeur entre l'application et les shards. mongosh est le shell interactif, et un arbitre ne fait que voter aux élections."
  - id: collscan
    prompt: "Que se passe-t-il pour une requête MongoDB qui filtre sur un champ sans index ?"
    answer: "MongoDB parcourt toute la collection (COLLSCAN)"
    decoys:
      - "La requête est refusée tant qu'aucun index n'existe"
      - "MongoDB crée automatiquement un index sur ce champ"
    why: "La requête fonctionne mais lit chaque document, ce qui devient lent sur une grosse collection. Les index se créent explicitement avec createIndex()."
  - id: explain
    prompt: "Quelle méthode montre comment MongoDB exécute une requête (index utilisé, documents lus) ?"
    answer: "explain()"
    decoys:
      - "analyze()"
      - "inspect()"
    why: "explain() renvoie le plan d'exécution, par exemple IXSCAN (index) ou COLLSCAN (parcours complet)."
  - id: change-streams
    prompt: "Comment une application peut-elle s'abonner aux modifications d'une collection MongoDB ?"
    answer: "Avec les change streams"
    decoys:
      - "Avec des triggers SQL déclarés sur la collection"
      - "En relisant la collection chaque seconde, seule option"
    why: "Les change streams fournissent un flux des insertions, mises à jour et suppressions, sans interroger la base en boucle."
  - id: atlas
    prompt: "Qu'est-ce que MongoDB Atlas ?"
    answer: "L'offre de base MongoDB managée dans le cloud"
    decoys:
      - "L'outil graphique local pour explorer les données"
      - "Le moteur de stockage par défaut de MongoDB"
    why: "Atlas héberge et opère les clusters chez les grands fournisseurs cloud. L'outil graphique, c'est Compass ; le moteur de stockage, WiredTiger."
  - id: wiredtiger
    prompt: "Quel est le moteur de stockage par défaut de MongoDB ?"
    answer: "WiredTiger"
    decoys:
      - "InnoDB"
      - "RocksDB"
    why: "WiredTiger est le moteur par défaut depuis la version 3.2. InnoDB est celui de MySQL ; RocksDB est une bibliothèque de stockage issue de Facebook."
  - id: operateur-set
    prompt: "Que fait l'opérateur $set dans un updateOne MongoDB ?"
    answer: "Il modifie seulement les champs indiqués, sans toucher au reste"
    decoys:
      - "Il remplace le document entier par les seuls champs indiqués"
      - "Il crée une nouvelle collection contenant les champs indiqués"
    why: "$set met à jour ou ajoute les champs nommés. Pour remplacer tout le document, on utilise replaceOne."
  - id: upsert
    prompt: "Que fait l'option upsert: true sur une mise à jour MongoDB ?"
    answer: "Elle insère un document si aucun ne correspond au filtre"
    decoys:
      - "Elle met à jour tous les documents correspondants, et pas seulement le premier"
      - "Elle annule la mise à jour si le document a changé depuis sa lecture"
    why: "Upsert = update ou insert. Modifier tous les documents correspondants, c'est updateMany ; MongoDB ne vérifie pas seul qu'un document a changé depuis sa lecture."
  - id: mongoose
    prompt: "Quelle bibliothèque Node.js ajoute des schémas et des modèles au-dessus de MongoDB ?"
    answer: "Mongoose"
    decoys:
      - "Sequelize"
      - "SQLAlchemy"
    why: "Mongoose définit des schémas validés côté application pour les documents. Sequelize est un ORM Node.js pour bases SQL, SQLAlchemy un ORM Python."
  - id: index-ttl
    prompt: "Comment faire supprimer automatiquement des documents MongoDB après un délai ?"
    answer: "Avec un index TTL sur un champ de date"
    decoys:
      - "Avec une option expire passée à insertOne"
      - "Avec une collection plafonnée (capped) datée"
    why: "Un processus en arrière-plan supprime les documents dont la date indexée a dépassé le délai. Une collection plafonnée élimine les plus anciens selon la taille, pas selon une date."
---
