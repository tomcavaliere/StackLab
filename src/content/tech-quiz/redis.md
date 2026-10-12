---
questions:
  - id: structures-riches
    prompt: "Qu'est-ce qui distingue Redis d'un simple cache clé-valeur ?"
    answer: "Des structures riches (listes, ensembles triés, hashes, streams) avec des opérations atomiques"
    decoys:
      - "Un moteur SQL capable de faire des jointures entre les clés"
      - "Un stockage sur disque par défaut, la mémoire vive ne servant que de tampon pour les écritures"
    why: "Redis garde les données en mémoire et propose, au-delà des chaînes, des listes, ensembles triés, hashes et streams, avec des opérations atomiques sur chacun. Pas de SQL, et la persistance sur disque est optionnelle."
  - id: classement
    prompt: "Quelle structure Redis utiliser pour un classement de joueurs mis à jour en continu ?"
    answer: "Un ensemble trié (sorted set)"
    decoys:
      - "Une liste"
      - "Un hash"
    why: "L'ensemble trié garde ses membres ordonnés par score : c'est la structure des classements. Une liste suit l'ordre d'insertion, un hash décrit les champs d'un objet."
  - id: persistance-optionnelle
    prompt: "La persistance sur disque est-elle obligatoire avec Redis ?"
    answer: "Non : elle est optionnelle, par instantanés ou par journal"
    decoys:
      - "Oui : chaque écriture est synchronisée sur disque avant de répondre"
      - "Non : Redis ne sait pas écrire sur disque, tout est perdu au redémarrage"
    why: "Redis travaille en mémoire ; on choisit de persister ou non, par instantanés ou par journal. C'est Memcached qui n'a aucune persistance."
  - id: pas-base-principale
    prompt: "Pourquoi éviter Redis comme base principale des données métier ?"
    answer: "La mémoire coûte cher et la durabilité dépend de la configuration de persistance"
    decoys:
      - "Redis ne peut pas stocker plus de quelques milliers de clés par instance"
      - "Redis n'accepte qu'une seule connexion cliente à la fois"
    why: "Tout tient en mémoire, plus chère que le disque, et une panne peut faire perdre les dernières écritures selon la persistance configurée. Une base comme PostgreSQL reste la source de vérité."
  - id: usage-atypique
    prompt: "Lequel de ces usages n'est pas un usage typique de Redis ?"
    answer: "Un entrepôt analytique de plusieurs téraoctets"
    decoys:
      - "La limitation de débit d'une API"
      - "Le stockage de sessions qui expirent seules"
    why: "Compteurs atomiques avec expiration, sessions à durée de vie : c'est le terrain de Redis. Des téraoctets d'analytique demandent un moteur colonnaire, et coûteraient une fortune en mémoire."
  - id: licence-2024
    prompt: "Que s'est-il passé pour la licence de Redis en 2024 ?"
    answer: "Redis est passé sous des licences non reconnues open-source, ce qui a donné le fork Valkey"
    decoys:
      - "Redis a été racheté par AWS et n'est plus disponible qu'en service managé sur son cloud"
      - "Redis est passé sous licence Apache 2.0 pour concurrencer Memcached"
    why: "Le changement de licence de 2024 a provoqué le fork Valkey, hébergé par la Linux Foundation. Depuis Redis 8 (2025), la licence AGPLv3 est proposée en option."
  - id: valkey
    prompt: "Qu'est-ce que Valkey ?"
    answer: "Un fork de Redis hébergé par la Linux Foundation"
    decoys:
      - "Un module de Redis pour la recherche vectorielle"
      - "Le nouveau nom commercial de Redis depuis la version 8"
    why: "Valkey est né du changement de licence de Redis en 2024 et vit à la Linux Foundation. Redis garde son nom."
  - id: broker-de-taches
    prompt: "Quel rôle Redis joue-t-il auprès de Celery ou de Sidekiq ?"
    answer: "Le broker : il transporte les tâches en attente jusqu'aux workers"
    decoys:
      - "Le moteur qui exécute lui-même le code des tâches"
      - "Le planificateur qui déclenche les tâches récurrentes à heure fixe"
    why: "Redis sert de file de tâches légère : l'application y dépose les tâches, des workers séparés les exécutent. Les tâches récurrentes relèvent de Celery Beat, pas de Redis."
  - id: journal-rejouable
    prompt: "Messagerie qui doit conserver un journal durable et rejouable sur une longue période, pour de nombreux consommateurs. Que choisir ?"
    answer: "Kafka, conçu pour ce besoin"
    decoys:
      - "Le pub/sub de Redis, qui conserve l'historique des messages"
      - "Memcached, avec une durée de vie très longue sur les clés"
    why: "Kafka conserve ses messages selon une rétention et chaque consommateur lit à son rythme. Le pub/sub de Redis ne garde rien : un abonné absent rate le message. Memcached n'est qu'un cache."
  - id: mvp-sans-cache
    prompt: "Un MVP à faible trafic doit-il ajouter Redis dès le départ ?"
    answer: "Pas forcément : un cache ajoute une brique et des problèmes d'invalidation, souvent avant d'en avoir besoin"
    decoys:
      - "Oui : sans cache, une base relationnelle ne tient pas la charge d'un MVP, même à faible trafic"
      - "Oui : il est impossible de gérer des sessions utilisateur sans Redis"
    why: "La fiche le range dans « Quand l'éviter » : à faible trafic, la base suffit, et invalider un cache est une vraie source de bugs. Les frameworks savent stocker les sessions en base."
  - id: plutot-memcached
    prompt: "Quand préférer Memcached à Redis ?"
    answer: "Pour un cache pur et minimal, sans besoin de structures de données ni de persistance"
    decoys:
      - "Quand les données doivent survivre à un redémarrage du serveur"
      - "Pour diffuser des notifications en pub/sub aux clients connectés, avec historique"
    why: "Memcached ne fait que du clé-valeur en mémoire, multithreadé et très simple. Persistance et pub/sub sont justement des fonctions de Redis."
  - id: expire
    prompt: "Quelle commande Redis donne une durée de vie à une clé existante, sans modifier sa valeur ?"
    answer: "EXPIRE"
    decoys:
      - "PERSIST"
      - "SETEX"
      - "RENAME"
    why: "EXPIRE fixe un délai d'expiration sur une clé existante. PERSIST fait l'inverse (retire la durée de vie) et SETEX réécrit la valeur en même temps."
  - id: ttl-moins-un
    prompt: "La commande TTL renvoie -1 pour une clé Redis. Qu'est-ce que cela signifie ?"
    answer: "La clé existe mais n'a pas de durée de vie"
    decoys:
      - "La clé n'existe pas, ou a déjà été supprimée"
      - "La clé expire dans moins d'une seconde et sera supprimée au prochain cycle"
    why: "TTL renvoie -1 pour une clé sans expiration et -2 pour une clé absente. Une valeur positive donne les secondes restantes."
  - id: incr-atomique
    prompt: "Pourquoi INCR convient-il à un compteur partagé par plusieurs serveurs d'application ?"
    answer: "L'incrément est atomique côté serveur"
    decoys:
      - "Il verrouille la clé jusqu'à la fin de la transaction SQL du client"
      - "Chaque client garde un compteur local, fusionné régulièrement par Redis"
    why: "INCR lit, incrémente et écrit en une seule opération exécutée par le serveur : deux clients ne peuvent pas perdre une mise à jour. Il n'y a ni transaction SQL ni fusion de compteurs locaux."
  - id: execution-commandes
    prompt: "Comment le serveur Redis exécute-t-il les commandes des clients ?"
    answer: "Une à une, sur un fil d'exécution principal"
    decoys:
      - "En parallèle sur tous les cœurs, avec un verrou par clé"
      - "Dans des transactions isolées par MVCC, comme PostgreSQL, sur plusieurs cœurs"
    why: "Redis exécute les commandes séquentiellement sur un fil principal, ce qui rend chaque commande atomique. Une commande lente bloque donc toutes les autres ; pas de MVCC à la PostgreSQL."
  - id: scan
    prompt: "Quelle commande parcourt les clés Redis par lots, sans bloquer le serveur comme KEYS * ?"
    answer: "SCAN"
    decoys:
      - "MONITOR"
      - "DUMP"
      - "LRANGE"
    why: "SCAN itère par petits lots avec un curseur. KEYS * parcourt tout l'espace de clés d'un coup et bloque le serveur ; MONITOR affiche les commandes, DUMP sérialise une clé, LRANGE lit une liste."
  - id: aof
    prompt: "Comment s'appelle la persistance Redis qui journalise chaque écriture ?"
    answer: "AOF (append-only file)"
    decoys:
      - "RDB (instantanés périodiques)"
      - "WAL (write-ahead log partagé)"
    why: "L'AOF rejoue le journal des écritures au redémarrage. RDB est l'autre mode, par instantanés périodiques ; WAL est le vocabulaire de PostgreSQL."
  - id: maxmemory
    prompt: "Que fait Redis quand la limite maxmemory est atteinte ?"
    answer: "Il applique la politique d'éviction configurée"
    decoys:
      - "Il déplace le surplus sur disque et continue à servir depuis le disque"
      - "Il redémarre et vide toutes les clés pour libérer la mémoire"
    why: "Le paramètre maxmemory-policy décide : évincer des clés (LRU, LFU, aléatoire, parmi celles qui expirent…) ou refuser les écritures. Redis ne bascule pas sur disque."
  - id: noeviction
    prompt: "Avec la politique noeviction, que se passe-t-il quand la mémoire de Redis est pleine ?"
    answer: "Les écritures renvoient une erreur"
    decoys:
      - "Les clés les moins récemment utilisées sont supprimées"
      - "Les clés sans durée de vie sont déplacées dans un fichier d'échange"
    why: "noeviction ne supprime rien : les commandes qui ajoutent des données échouent, les lectures continuent. Supprimer les moins récemment utilisées, c'est allkeys-lru."
  - id: streams-groupes
    prompt: "Quelle structure Redis propose des groupes de consommateurs avec acquittement des messages ?"
    answer: "Les streams"
    decoys:
      - "Le pub/sub"
      - "Les ensembles (sets)"
      - "Les hashes"
    why: "Les streams conservent les messages et gèrent des groupes de consommateurs avec XACK. Le pub/sub ne garde rien et n'a pas d'acquittement."
  - id: profil-hash
    prompt: "Quelle structure Redis choisir pour stocker les champs d'un profil utilisateur sous une seule clé ?"
    answer: "Un hash"
    decoys:
      - "Un ensemble trié"
      - "Une liste"
      - "Un HyperLogLog"
    why: "Un hash associe des champs à des valeurs, qu'on lit ou modifie un par un. L'ensemble trié ordonne par score, la liste par insertion, l'HyperLogLog ne fait qu'estimer des cardinalités."
  - id: hyperloglog
    prompt: "À quoi sert un HyperLogLog dans Redis ?"
    answer: "Estimer un nombre d'éléments distincts"
    decoys:
      - "Trier des membres par score avec une précision exacte"
      - "Stocker un journal d'événements consommé par des groupes"
    why: "L'HyperLogLog estime, avec une petite erreur et très peu de mémoire, combien d'éléments distincts on a vus (visiteurs uniques). Le tri par score, c'est l'ensemble trié ; le journal, le stream."
  - id: blpop
    prompt: "Quelle commande Redis fait attendre le client jusqu'à ce qu'un élément arrive dans une liste ?"
    answer: "BLPOP"
    decoys:
      - "LPUSH"
      - "LRANGE"
      - "SUBSCRIBE"
    why: "BLPOP retire le premier élément d'une liste et bloque s'il n'y en a pas : c'est la base des files de tâches sur Redis. LPUSH ajoute, LRANGE lit sans retirer, SUBSCRIBE écoute un canal pub/sub."
  - id: multi-exec
    prompt: "Que garantit un bloc MULTI / EXEC dans Redis ?"
    answer: "Les commandes passent d'un bloc, sans commande d'un autre client intercalée"
    decoys:
      - "Un retour arrière automatique de tout le bloc si l'une des commandes échoue à l'exécution"
      - "Une écriture synchrone sur disque de toutes les commandes avant de répondre"
    why: "EXEC exécute les commandes en file d'un seul tenant. Redis ne fait pas de rollback si une commande échoue en cours de route, et la durabilité dépend toujours de la persistance configurée."
  - id: set-nx
    prompt: "Quelle option de la commande SET n'écrit la clé que si elle n'existe pas encore ?"
    answer: "NX"
    decoys:
      - "XX"
      - "KEEPTTL"
      - "GET"
    why: "SET ... NX n'écrit que si la clé est absente, ce qui sert notamment aux verrous simples. XX fait l'inverse (seulement si elle existe), KEEPTTL conserve la durée de vie, GET renvoie l'ancienne valeur."
  - id: port
    prompt: "Quel est le port par défaut de Redis ?"
    answer: "6379"
    decoys:
      - "5432"
      - "11211"
      - "27017"
    why: "Redis écoute par défaut sur 6379. 5432 est le port de PostgreSQL, 11211 celui de Memcached, 27017 celui de MongoDB."
  - id: sentinel
    prompt: "À quoi sert Redis Sentinel ?"
    answer: "Surveiller un primaire et promouvoir une réplique s'il tombe"
    decoys:
      - "Répartir les clés entre plusieurs primaires selon des slots de hachage"
      - "Chiffrer les échanges entre les clients et le serveur Redis"
    why: "Sentinel assure la haute disponibilité d'un primaire et de ses répliques par bascule automatique. La répartition par slots, c'est Redis Cluster ; le chiffrement passe par TLS."
  - id: cluster-slots
    prompt: "Comment Redis Cluster répartit-il les clés entre ses nœuds ?"
    answer: "Par 16 384 slots de hachage attribués aux primaires"
    decoys:
      - "Par ordre alphabétique des clés, une plage par nœud"
      - "Par le client seul, sans que les nœuds se connaissent, comme Memcached"
    why: "Chaque clé est hachée vers l'un des 16 384 slots, et chaque primaire en possède une partie. Les nœuds se connaissent et redirigent le client si besoin, contrairement à Memcached."
  - id: createur
    prompt: "Qui a créé Redis, et quand ?"
    answer: "Salvatore Sanfilippo, en 2009"
    decoys:
      - "Brad Fitzpatrick, en 2003"
      - "Jay Kreps, en 2011"
    why: "Salvatore Sanfilippo (antirez) a lancé Redis en 2009. Brad Fitzpatrick a créé Memcached, Jay Kreps a co-créé Kafka chez LinkedIn."
  - id: cache-aside
    prompt: "En cache-aside, que fait l'application quand la clé demandée est absente de Redis ?"
    answer: "Elle lit la base, puis écrit le résultat dans Redis"
    decoys:
      - "Elle attend que Redis aille chercher lui-même la donnée en base"
      - "Elle renvoie une erreur jusqu'au prochain préchargement complet du cache"
    why: "Dans ce schéma, c'est l'application qui gère le cache : en cas d'absence, elle interroge la base et remplit Redis. Redis ne connaît pas la base et ne va rien y chercher."
---
