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
---
