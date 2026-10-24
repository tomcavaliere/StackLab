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
    prompt: "Où StackData enregistre-t-il ta progression ?"
    answer: "Dans un fichier SQLite"
    decoys:
      - "Dans une base PostgreSQL"
      - "Dans le stockage local du navigateur"
    why: "data/stackdata.db : un seul fichier, sans serveur, pour un usage local à un seul utilisateur."
  - id: activer-wal
    prompt: "Quelle commande active le mode WAL sur une base SQLite ?"
    answer: "PRAGMA journal_mode=WAL;"
    decoys:
      - "SET journal_mode = 'WAL';"
      - "ALTER DATABASE SET WAL ON;"
    why: "Les réglages propres à SQLite passent par PRAGMA ; SQLite n'a ni SET ni ALTER DATABASE."
  - id: pragma
    prompt: "À quoi servent les commandes PRAGMA dans SQLite ?"
    answer: "À lire ou régler des paramètres propres à SQLite"
    decoys:
      - "À déclarer des procédures stockées réutilisables"
      - "À donner des droits d'accès aux utilisateurs de la base"
    why: "PRAGMA règle par exemple le mode de journal ou la vérification des clés étrangères. SQLite n'a ni procédures stockées ni utilisateurs."
  - id: affinite-type
    prompt: "Par défaut, comment SQLite traite-t-il le type déclaré d'une colonne ?"
    answer: "Comme une affinité : une colonne INTEGER peut contenir du texte"
    decoys:
      - "Comme une contrainte stricte, qui refuse toute valeur d'un autre type"
      - "Il l'ignore totalement : toutes les valeurs sont stockées en texte"
    why: "SQLite tente de convertir la valeur vers le type déclaré, mais la garde telle quelle si la conversion échoue. Les nombres restent stockés comme des nombres."
  - id: tables-strict
    prompt: "Comment obtenir un typage strict des colonnes dans SQLite ?"
    answer: "En créant la table avec l'option STRICT"
    decoys:
      - "En activant la commande PRAGMA type_check=ON"
      - "C'est impossible : le typage y reste toujours souple"
    why: "Depuis la version 3.37, une table déclarée STRICT refuse une valeur du mauvais type. PRAGMA type_check n'existe pas."
  - id: foreign-keys
    prompt: "Les clés étrangères sont-elles vérifiées par défaut dans SQLite ?"
    answer: "Non : il faut exécuter PRAGMA foreign_keys=ON à chaque connexion"
    decoys:
      - "Oui, toujours, et on ne peut pas désactiver cette vérification"
      - "Non : SQLite ne permet pas du tout de déclarer une clé étrangère"
    why: "SQLite accepte la déclaration des clés étrangères, mais ne les vérifie que si ce réglage est activé, pour chaque connexion. Un piège classique."
  - id: rowid
    prompt: "Qu'est-ce que le rowid dans SQLite ?"
    answer: "Un identifiant entier implicite de chaque ligne d'une table ordinaire"
    decoys:
      - "Un UUID ajouté à chaque ligne pour répliquer la base entre fichiers"
      - "Le numéro de ligne du résultat, recalculé à chaque nouvelle requête"
    why: "Chaque table a un rowid entier qui sert de clé de stockage, sauf les tables déclarées WITHOUT ROWID."
  - id: integer-primary-key
    prompt: "Dans SQLite, que devient une colonne déclarée INTEGER PRIMARY KEY ?"
    answer: "Un alias du rowid"
    decoys:
      - "Un index séparé, distinct du rowid"
      - "Une colonne texte convertie en entier"
    why: "Cette colonne et le rowid sont la même valeur : pas d'index supplémentaire, et un identifiant attribué automatiquement si on n'en fournit pas."
  - id: memory
    prompt: "Que désigne le nom de fichier spécial :memory: dans SQLite ?"
    answer: "Une base en mémoire, perdue à la fermeture de la connexion"
    decoys:
      - "Un cache mémoire placé devant le fichier de la base sur disque"
      - "Le fichier de journal WAL associé à la base principale"
    why: "Pratique pour des tests ou des calculs temporaires : rien n'est écrit sur disque."
  - id: cli-sqlite3
    prompt: "Comment ouvrir une base SQLite depuis un terminal ?"
    answer: "sqlite3 chemin/vers/base.db"
    decoys:
      - "sqlite --connect localhost:5432"
      - "sqlite-server start base.db"
    why: "La CLI sqlite3 ouvre directement le fichier : pas de serveur, pas d'hôte ni de port."
  - id: point-tables
    prompt: "Dans le shell sqlite3, que fait la commande .tables ?"
    answer: "Elle liste les tables de la base ouverte"
    decoys:
      - "Elle crée une table vide à partir d'un fichier CSV"
      - "Elle affiche le CREATE TABLE complet de chaque table"
    why: "Les commandes qui commencent par un point sont propres au shell. Pour voir les CREATE TABLE, c'est .schema."
  - id: attach
    prompt: "Que permet ATTACH DATABASE dans SQLite ?"
    answer: "Interroger plusieurs fichiers SQLite dans une même connexion"
    decoys:
      - "Copier une base SQLite vers un serveur PostgreSQL distant"
      - "Fusionner définitivement deux fichiers SQLite en un seul fichier"
    why: "Un fichier attaché reçoit un nom (alias.table) et peut être joint aux tables de la base principale ; les fichiers restent séparés."
  - id: fts5
    prompt: "Quelle extension intégrée à SQLite fournit la recherche plein texte ?"
    answer: "FTS5"
    decoys:
      - "R*Tree"
      - "JSON1"
    why: "FTS5 crée des tables virtuelles indexées pour la recherche par mots. R*Tree sert aux index spatiaux, JSON1 aux fonctions JSON."
  - id: vacuum
    prompt: "À quoi sert la commande VACUUM dans SQLite ?"
    answer: "Reconstruire le fichier pour récupérer l'espace des données supprimées"
    decoys:
      - "Supprimer toutes les lignes de toutes les tables de la base"
      - "Vérifier l'intégrité du fichier sans jamais le modifier"
    why: "Après des suppressions, le fichier ne rétrécit pas tout seul : VACUUM le réécrit. La vérification d'intégrité, c'est PRAGMA integrity_check."
  - id: sqlite-busy
    prompt: "Que signifie l'erreur SQLITE_BUSY ?"
    answer: "La base est verrouillée par une autre connexion qui écrit"
    decoys:
      - "Le disque est plein et la base ne peut plus grandir"
      - "La requête dépasse la taille maximale autorisée par SQLite"
    why: "C'est la conséquence directe de l'écrivain unique ; régler un délai d'attente (busy_timeout) fait patienter au lieu d'échouer aussitôt."
  - id: createur
    prompt: "Qui a créé SQLite, et quand ?"
    answer: "D. Richard Hipp, en 2000"
    decoys:
      - "Michael Widenius, en 1995"
      - "Michael Stonebraker, en 1986"
    why: "Widenius est le cofondateur de MySQL (1995), Stonebraker a lancé Postgres à Berkeley au milieu des années 1980."
  - id: fichier-portable
    prompt: "Peut-on copier un fichier de base SQLite d'une machine à une autre et l'ouvrir tel quel ?"
    answer: "Oui : le format de fichier est multiplateforme et stable"
    decoys:
      - "Non : le fichier dépend du processeur et du système d'origine"
      - "Seulement après l'avoir exporté en SQL avec un outil dédié"
    why: "Le même fichier s'ouvre sous Windows, Linux, macOS ou sur un téléphone, ce qui en fait aussi un bon format d'échange."
  - id: regrouper-inserts
    prompt: "Pourquoi regrouper de nombreux INSERT dans une seule transaction SQLite ?"
    answer: "Chaque validation attend le disque : une seule pour tout coûte moins"
    decoys:
      - "Sans transaction explicite, SQLite refuse plus d'un INSERT par connexion"
      - "Les INSERT faits hors transaction ne sont jamais écrits dans le fichier"
    why: "Hors transaction explicite, chaque instruction est validée seule, avec une attente de l'écriture sur disque à chaque fois."
  - id: tests-vs-production
    prompt: "Pourquoi tester avec SQLite une application qui tourne sur PostgreSQL en production est-il risqué ?"
    answer: "Dialectes et typage diffèrent : un test peut passer sur SQLite et échouer en production"
    decoys:
      - "SQLite n'a pas de transactions, donc les tests ne peuvent pas être isolés"
      - "SQLite exige un serveur de test séparé, long à démarrer avant chaque test"
    why: "Typage souple, fonctions et syntaxe propres : SQLite ne reproduit pas PostgreSQL. SQLite a pourtant des transactions et ne demande aucun serveur."
  - id: navigateur-wasm
    prompt: "Comment une page web peut-elle embarquer SQLite côté client ?"
    answer: "Avec SQLite compilé en WebAssembly"
    decoys:
      - "Avec un applet Java fourni par le navigateur"
      - "Avec une extension native installée sur chaque poste"
    why: "Le projet SQLite publie une version WebAssembly qui s'exécute dans le navigateur. Les applets Java ne sont plus pris en charge par les navigateurs."
---
