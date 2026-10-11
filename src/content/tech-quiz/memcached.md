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
---
