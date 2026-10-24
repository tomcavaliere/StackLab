---
questions:
  - id: role
    prompt: "Que fait Memcached ?"
    answer: "Il garde en mémoire des paires clé-valeur avec une durée de vie, et évince les plus anciennes"
    decoys:
      - "Il stocke des listes, des ensembles triés et des streams"
      - "Il persiste les données sur disque pour les retrouver au redémarrage, et les réplique entre serveurs"
    why: "Memcached fait une seule chose : du clé-valeur en mémoire. Les structures riches et la persistance, c'est Redis."
  - id: repartition
    prompt: "Qui répartit les clés entre plusieurs serveurs Memcached ?"
    answer: "Les clients, qui choisissent le serveur d'une clé par hachage"
    decoys:
      - "Un nœud maître qui coordonne le cluster et attribue les clés"
      - "Les serveurs, qui se répliquent entre eux"
    why: "Les serveurs Memcached ne se parlent pas : pas de réplication, pas de maître. La répartition est côté client."
  - id: redemarrage
    prompt: "Que se passe-t-il au redémarrage d'un serveur Memcached ?"
    answer: "Le cache est vidé"
    decoys:
      - "Il recharge un instantané depuis le disque"
      - "Il récupère les données depuis une réplique"
    why: "Sans persistance ni réplication, tout est perdu : il ne faut y mettre que des données qu'on peut recalculer."
  - id: multithread
    prompt: "Quelle caractéristique du serveur Memcached la fiche relève-t-elle ?"
    answer: "Il est multithreadé"
    decoys:
      - "Il est monothread et n'utilise qu'un seul cœur"
      - "Il s'exécute dans le navigateur"
    why: "Le serveur Memcached est multithreadé, ce qui fait partie de sa simplicité de passage à l'échelle."
  - id: classement
    prompt: "Un classement de joueurs mis à jour en continu : Memcached convient-il ?"
    answer: "Non : Redis fournit des ensembles triés faits pour ça"
    decoys:
      - "Oui : Memcached trie les valeurs automatiquement"
      - "Oui : un compteur par joueur suffit, le tri est gratuit"
    why: "Memcached ne stocke que des valeurs opaques ; trier demanderait de tout relire côté application."
  - id: origine
    prompt: "Pour quel site Memcached a-t-il été créé ?"
    answer: "LiveJournal, en 2003"
    decoys:
      - "Facebook, en 2010"
      - "Twitter, en 2006"
    why: "Brad Fitzpatrick l'a écrit pour LiveJournal. Facebook l'a ensuite exploité à très grande échelle."
  - id: facebook
    prompt: "Qu'a publié Facebook en 2013 à propos de Memcached ?"
    answer: "Un article de recherche sur son exploitation à grande échelle"
    decoys:
      - "Un fork de Memcached doté d'une persistance sur disque et d'une réplication"
      - "L'annonce du rachat du projet"
    why: "« Scaling Memcache at Facebook » (NSDI 2013) décrit comment Facebook l'exploite."
  - id: usage
    prompt: "Quel est l'usage type de Memcached ?"
    answer: "Un cache de lecture devant une base, pour des objets sérialisés"
    decoys:
      - "Une file de tâches pour des workers"
      - "Le stockage principal des comptes utilisateurs, à la place de la base"
    why: "Résultats de requêtes, fragments de pages : on évite de solliciter la base pour des données qu'on peut recalculer."
  - id: trop-tot
    prompt: "Petite application, aucun goulot d'étranglement mesuré. Faut-il ajouter Memcached ?"
    answer: "Pas encore : un cache n'est utile qu'une fois le goulot mesuré"
    decoys:
      - "Oui : toute application doit avoir un cache dès le départ"
      - "Oui, pour pouvoir supprimer la base"
    why: "Un cache ajoute une brique et des problèmes d'invalidation : on l'ajoute quand une mesure le justifie."
  - id: vs-redis
    prompt: "Pourquoi choisir Memcached plutôt que Redis ?"
    answer: "Pour le comportement le plus simple et prévisible possible, sur un très gros cache"
    decoys:
      - "Pour une persistance plus fiable que celle de Redis"
      - "Pour des structures de données plus riches que celles de Redis, comme les ensembles triés"
    why: "Memcached n'a ni persistance ni structures riches : son atout est justement d'en faire moins."
  - id: port
    prompt: "Quel est le port par défaut de Memcached ?"
    answer: "11211"
    decoys:
      - "6379"
      - "5432"
      - "9092"
    why: "Memcached écoute par défaut sur 11211. 6379 est le port de Redis, 5432 celui de PostgreSQL, 9092 celui de Kafka."
  - id: slabs
    prompt: "Comment Memcached organise-t-il sa mémoire ?"
    answer: "En classes de blocs de tailles fixes (slabs)"
    decoys:
      - "En pages chargées depuis un fichier sur disque au démarrage"
      - "En arbre B trié par clé, comme un index de base de données"
    why: "L'allocateur slab range chaque valeur dans une classe de blocs de taille proche, ce qui évite la fragmentation. Memcached n'a pas de fichier sur disque ni d'index trié."
  - id: taille-cle
    prompt: "Quelle est la longueur maximale d'une clé Memcached ?"
    answer: "250 octets"
    decoys:
      - "16 octets"
      - "64 Ko"
      - "1 Mo"
    why: "Une clé Memcached fait au plus 250 octets. 1 Mo est la taille maximale par défaut d'une valeur, pas d'une clé."
  - id: taille-valeur
    prompt: "Quelle est la taille maximale d'une valeur Memcached avec la configuration par défaut ?"
    answer: "1 Mo"
    decoys:
      - "250 octets"
      - "512 Mo"
      - "Aucune limite"
    why: "Par défaut, un élément est limité à 1 Mo (réglable avec l'option -I). 250 octets est la limite des clés."
  - id: commande-add
    prompt: "Quelle commande Memcached stocke une valeur seulement si la clé n'existe pas encore ?"
    answer: "add"
    decoys:
      - "set"
      - "replace"
      - "append"
    why: "add échoue si la clé existe déjà. set écrit toujours, replace seulement si la clé existe, append ajoute à la fin d'une valeur existante."
  - id: cas
    prompt: "À quoi sert la commande cas (check and set) de Memcached ?"
    answer: "Écrire seulement si la valeur n'a pas changé depuis sa lecture"
    decoys:
      - "Vérifier qu'une clé existe sans lire ni rafraîchir sa valeur"
      - "Copier une valeur vers tous les autres serveurs du pool de clients"
    why: "cas compare un jeton obtenu avec gets : si un autre client a modifié la valeur entre-temps, l'écriture est refusée. Memcached ne copie rien entre serveurs."
  - id: incr-decr
    prompt: "Memcached sait-il incrémenter un compteur côté serveur ?"
    answer: "Oui, avec incr et decr sur une valeur numérique"
    decoys:
      - "Non : il faut lire, incrémenter côté client puis réécrire la valeur"
      - "Oui, mais seulement pour une clé créée avec un type entier déclaré"
    why: "incr et decr modifient une valeur numérique stockée sous forme décimale. Il n'existe pas de types déclarés : pour des structures plus riches (classements, listes), il faut Redis."
  - id: expiration-30-jours
    prompt: "Une durée d'expiration supérieure à 30 jours est envoyée à Memcached. Comment est-elle interprétée ?"
    answer: "Comme un horodatage Unix absolu"
    decoys:
      - "Comme 30 jours, la durée maximale autorisée"
      - "Comme une absence d'expiration, la valeur étant jugée invalide"
    why: "Au-delà de 30 jours en secondes, Memcached lit la valeur comme une date Unix. Envoyer par erreur une longue durée relative donne une date passée, et la clé expire aussitôt."
  - id: expiration-zero
    prompt: "Que signifie une durée d'expiration de 0 dans Memcached ?"
    answer: "Pas d'expiration, hors éviction"
    decoys:
      - "Une expiration immédiate"
      - "La durée par défaut du serveur"
    why: "0 veut dire que la clé n'expire jamais d'elle-même ; elle peut toutefois être évincée quand la mémoire est pleine."
  - id: hachage-coherent
    prompt: "Pourquoi les clients Memcached utilisent-ils souvent un hachage cohérent ?"
    answer: "Pour ne déplacer qu'une partie des clés quand le pool change"
    decoys:
      - "Pour écrire chaque clé sur deux serveurs à la fois, en cas de panne de l'un d'eux"
      - "Pour chiffrer les clés avant de les envoyer au serveur choisi"
    why: "Avec un simple modulo, ajouter ou retirer un serveur redistribue presque toutes les clés et vide le cache en pratique. Le hachage cohérent limite ce déplacement ; il ne réplique ni ne chiffre rien."
  - id: serveur-en-panne
    prompt: "Un serveur d'un pool Memcached tombe en panne. Que deviennent les clés qu'il portait ?"
    answer: "Elles sont perdues ; les lectures retombent sur la base"
    decoys:
      - "Une réplique prend le relais avec exactement les mêmes données"
      - "Les autres serveurs les reconstruisent depuis leurs copies locales"
    why: "Sans réplication, les données d'un serveur disparaissent avec lui. Les clients ratent le cache et vont relire la source, qui doit encaisser ce surplus."
  - id: stampede
    prompt: "Une clé très demandée expire et des centaines de requêtes recalculent la même valeur en base en même temps. Comment s'appelle ce problème ?"
    answer: "Une ruée sur le cache (cache stampede)"
    decoys:
      - "Un split-brain du cluster"
      - "Une fragmentation des slabs"
      - "Un interblocage (deadlock)"
    why: "Le cache stampede survient quand beaucoup de requêtes ratent la même clé au même moment. On le limite par un verrou (par exemple via add) ou un recalcul anticipé ; pas de split-brain possible, Memcached n'ayant pas de cluster."
  - id: invalidation
    prompt: "Une donnée change en base. Que faire de sa copie dans Memcached ?"
    answer: "La supprimer (delete) ou la réécrire"
    decoys:
      - "Rien : Memcached détecte seul les changements en base"
      - "Redémarrer le serveur Memcached pour repartir de zéro"
    why: "Memcached ignore tout de la base : c'est à l'application d'invalider ou de mettre à jour la clé. Redémarrer viderait tout le cache pour une seule donnée."
  - id: protocole-texte
    prompt: "Quel protocole les clients utilisent-ils pour parler à Memcached ?"
    answer: "Un protocole texte simple, sur TCP"
    decoys:
      - "Du SQL, via un pilote JDBC ou ODBC"
      - "Une API REST en JSON sur HTTP"
    why: "Memcached parle un protocole texte (get, set, delete…) qu'on peut taper à la main avec telnet. Il n'y a ni SQL ni API REST."
  - id: langage
    prompt: "En quel langage le serveur Memcached est-il écrit ?"
    answer: "C"
    decoys:
      - "Java"
      - "Go"
      - "Erlang"
    why: "Memcached est écrit en C. Kafka tourne sur la JVM et RabbitMQ est écrit en Erlang."
  - id: sessions
    prompt: "Quel risque prend-on en stockant les sessions utilisateur uniquement dans Memcached ?"
    answer: "Déconnecter des utilisateurs au moindre redémarrage ou éviction"
    decoys:
      - "Aucun : Memcached garantit de conserver la clé jusqu'à sa date d'expiration"
      - "Exposer les sessions, que Memcached diffuse à tous les clients connectés"
    why: "Une clé peut disparaître avant son expiration (éviction, redémarrage, panne). Memcached ne diffuse rien, mais il ne garantit pas non plus la conservation."
  - id: exposition-internet
    prompt: "Pourquoi ne jamais exposer un serveur Memcached directement sur Internet ?"
    answer: "Sans authentification par défaut, il a servi à des DDoS par amplification"
    decoys:
      - "Parce qu'il écrit ses données en clair dans un fichier sur le disque du serveur"
      - "Parce qu'il publie la liste de ses clés dans un annuaire public au démarrage"
    why: "Memcached n'exige pas d'authentification par défaut, et des serveurs ouverts en UDP ont été utilisés en 2018 pour des attaques par amplification. Il n'écrit rien sur disque et ne publie rien."
  - id: multi-get
    prompt: "Comment lire plusieurs clés Memcached en un seul aller-retour réseau ?"
    answer: "Un get avec plusieurs clés"
    decoys:
      - "Une jointure entre les clés"
      - "Impossible : une requête par clé"
    why: "get accepte plusieurs clés et renvoie celles qui sont présentes, ce qui économise des allers-retours. Il n'y a pas de jointure dans un cache clé-valeur."
  - id: elasticache
    prompt: "Quel service managé AWS propose Memcached ?"
    answer: "Amazon ElastiCache"
    decoys:
      - "Amazon MSK"
      - "Amazon DynamoDB"
      - "Amazon SQS"
    why: "ElastiCache propose Memcached (ainsi que Redis/Valkey) en service managé. MSK est le Kafka managé, DynamoDB une base NoSQL, SQS une file de messages."
  - id: touch
    prompt: "Quelle commande Memcached prolonge la durée de vie d'une clé sans renvoyer ni modifier sa valeur ?"
    answer: "touch"
    decoys:
      - "replace"
      - "append"
      - "incr"
    why: "touch met à jour l'expiration d'une clé existante. replace réécrit la valeur, append la complète, incr l'incrémente."
---
