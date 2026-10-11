---
questions:
  - id: modele
    prompt: "Qu'est-ce que SQLite ?"
    answer: "Une bibliothèque liée à l'application, qui stocke une base complète dans un seul fichier"
    decoys:
      - "Un serveur de base de données léger, à installer à part, auquel l'application se connecte"
      - "Une base en mémoire, perdue à l'arrêt du programme"
    why: "Pas de serveur : le processus de l'application lit et écrit le fichier lui-même."
  - id: transactions
    prompt: "SQLite offre-t-il des transactions ?"
    answer: "Oui : du SQL et des transactions ACID, sans configuration"
    decoys:
      - "Non : ce n'est qu'un fichier texte structuré, lu ligne par ligne"
      - "Seulement en lecture"
    why: "SQLite est une vraie base relationnelle transactionnelle."
  - id: un-ecrivain
    prompt: "Quelle limite de concurrence SQLite a-t-il ?"
    answer: "Un seul écrivain à la fois ; en mode WAL, les lectures continuent pendant une écriture"
    decoys:
      - "Une seule lecture à la fois"
      - "Aucune : les écritures parallèles sont illimitées, quel que soit le nombre de processus"
    why: "Les écritures passent une par une : c'est le prix de la simplicité."
  - id: plusieurs-serveurs
    prompt: "Plusieurs serveurs d'application écrivent dans la même base : SQLite convient-il ?"
    answer: "Non : le fichier est local à une machine ; il faut une base client-serveur comme PostgreSQL"
    decoys:
      - "Oui, en partageant le fichier par le réseau"
      - "Oui : SQLite réplique automatiquement le fichier entre les serveurs d'application"
    why: "Dès que l'application tourne sur plusieurs machines, il faut un serveur de base."
  - id: droits
    prompt: "Comment SQLite gère-t-il les utilisateurs et les droits ?"
    answer: "Il n'en a pas : l'accès dépend des permissions du fichier"
    decoys:
      - "Avec des rôles et des privilèges par table, comme PostgreSQL"
      - "Avec un annuaire LDAP intégré"
    why: "Qui peut lire le fichier peut lire la base."
  - id: disque-ephemere
    prompt: "Pourquoi éviter SQLite sur des dynos Heroku ou des conteneurs sans volume ?"
    answer: "Le disque est éphémère : le fichier disparaît au redémarrage"
    decoys:
      - "Heroku interdit aux applications d'écrire des fichiers"
      - "SQLite ne fonctionne pas sous Linux"
    why: "Litestream peut répliquer la base vers un stockage objet, mais c'est une brique de plus."
  - id: partout
    prompt: "Où trouve-t-on SQLite ?"
    answer: "Dans Android, iOS, les navigateurs et d'innombrables logiciels"
    decoys:
      - "Uniquement dans les serveurs web, derrière un ORM"
      - "Uniquement dans les environnements de développement"
    why: "C'est la base locale de très nombreuses applications, mobiles et de bureau."
  - id: rails-8
    prompt: "Que dit Rails 8 de SQLite ?"
    answer: "C'est une option viable en production pour une petite application sur un seul serveur"
    decoys:
      - "Il l'interdit en production"
      - "Il l'impose comme seule base possible, à la place de PostgreSQL et MySQL"
    why: "SQLite n'est plus réservé au développement, tant que l'application tient sur un serveur."
  - id: domaine-public
    prompt: "Sous quel régime le code de SQLite est-il distribué ?"
    answer: "Le domaine public"
    decoys:
      - "La SSPL"
      - "La Business Source License"
    why: "La SSPL est la licence de MongoDB, la Business Source License celle de Terraform."
  - id: litestream
    prompt: "Que fait Litestream ?"
    answer: "Il réplique une base SQLite vers un stockage objet"
    decoys:
      - "Il transforme SQLite en serveur de base de données"
      - "Il convertit une base SQLite en base PostgreSQL"
    why: "Il protège le fichier contre la perte du disque."
  - id: stacklab
    prompt: "Où StackLab enregistre-t-il ta progression ?"
    answer: "Dans un fichier SQLite"
    decoys:
      - "Dans une base PostgreSQL"
      - "Dans le stockage local du navigateur"
    why: "data/stacklab.db : un seul fichier, sans serveur, pour un usage local à un seul utilisateur."
---
