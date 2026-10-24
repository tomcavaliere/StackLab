---
questions:
  - id: probleme
    prompt: "Un virement débite un compte, puis le serveur tombe avant de créditer l'autre. Qu'est-ce qui évite que l'argent disparaisse ?"
    answer: "Une transaction : les deux opérations sont appliquées ensemble, ou pas du tout"
    decoys:
      - "Un index sur la colonne solde, qui garde la trace de chaque modification passée"
      - "Une réplique de la base, qui rejoue l'opération manquante dès le redémarrage"
    why: "La transaction regroupe les opérations en une unité tout-ou-rien. Au redémarrage, une transaction non validée est annulée."
  - id: commit
    prompt: "Que fait COMMIT ?"
    answer: "Valide et enregistre toutes les opérations de la transaction"
    decoys:
      - "Annule toutes les opérations de la transaction en cours"
      - "Ouvre une nouvelle transaction"
    why: "BEGIN ouvre la transaction, COMMIT la valide, ROLLBACK l'annule."
  - id: rollback
    prompt: "Que fait ROLLBACK ?"
    answer: "Annule toutes les opérations de la transaction"
    decoys:
      - "Revient à la dernière sauvegarde complète de la base"
      - "Annule seulement la dernière opération"
    why: "L'atomicité : tout ce que la transaction a fait est défait."
  - id: atomicite
    prompt: "Que garantit l'atomicité ?"
    answer: "Tout ou rien : une erreur annule toutes les opérations de la transaction"
    decoys:
      - "Chaque opération est enregistrée dès qu'elle s'exécute, quoi qu'il arrive aux suivantes"
      - "Une seule transaction peut s'exécuter à la fois dans toute la base de données"
    why: "Le A d'ACID : la transaction est indivisible."
  - id: coherence
    prompt: "Que garantit la cohérence (le C d'ACID) ?"
    answer: "La base passe d'un état valide à un autre, en respectant les contraintes"
    decoys:
      - "Toutes les répliques ont exactement les mêmes données à chaque instant"
      - "Les requêtes renvoient toujours leurs lignes dans le même ordre"
    why: "Clés étrangères, unicité, CHECK : une transaction qui les violerait est refusée."
  - id: isolation
    prompt: "Que garantit l'isolation ?"
    answer: "Des transactions simultanées ne se voient pas à moitié faites"
    decoys:
      - "Chaque transaction s'exécute sur un serveur séparé, sans jamais voir les autres"
      - "Les données d'un client ne sont visibles que par lui"
    why: "Selon le niveau choisi, tout se passe plus ou moins comme si les transactions s'exécutaient l'une après l'autre."
  - id: durabilite
    prompt: "Que garantit la durabilité ?"
    answer: "Une fois le COMMIT confirmé, la modification survit à une panne"
    decoys:
      - "Les données sont conservées indéfiniment, sans jamais pouvoir être supprimées"
      - "La base reste disponible même si le serveur tombe"
    why: "La base écrit d'abord dans son journal avant de confirmer. Rester disponible malgré une panne, c'est le rôle de la réplication."
  - id: wal
    prompt: "Comment PostgreSQL assure-t-il la durabilité d'une transaction validée ?"
    answer: "Il l'écrit d'abord dans son journal (WAL) avant de confirmer"
    decoys:
      - "Il l'envoie à toutes les répliques avant de confirmer"
      - "Il la garde en mémoire vive jusqu'à la sauvegarde complète de la nuit"
    why: "Le write-ahead log permet de rejouer les transactions validées après une panne."
  - id: lecture-sale
    prompt: "Qu'est-ce qu'une lecture sale ?"
    answer: "Lire une donnée écrite par une transaction qui n'a pas encore validé"
    decoys:
      - "Lire une donnée corrompue sur le disque, après une panne du serveur"
      - "Lire une ligne sans passer par un index"
    why: "La transaction pourrait encore annuler : on aurait lu une valeur qui n'a jamais existé."
  - id: non-repetable
    prompt: "Qu'est-ce qu'une lecture non répétable ?"
    answer: "Relire une ligne dans la transaction et trouver une valeur modifiée entre-temps par une autre transaction"
    decoys:
      - "Lire une donnée écrite par une transaction qui n'a pas encore validé, et qui pourrait encore s'annuler"
      - "Relancer une requête et voir apparaître de nouvelles lignes insérées par une autre transaction"
    why: "La lecture sale porte sur des données non validées ; les nouvelles lignes qui apparaissent, ce sont les lectures fantômes."
  - id: fantome
    prompt: "Qu'est-ce qu'une lecture fantôme ?"
    answer: "Relancer la même requête et voir apparaître de nouvelles lignes"
    decoys:
      - "Lire une ligne supprimée depuis longtemps, restée dans un cache"
      - "Une requête qui ne renvoie rien alors que la table est pleine"
    why: "Une autre transaction a inséré des lignes qui correspondent au filtre entre les deux lectures."
  - id: defaut-postgresql
    prompt: "Quel est le niveau d'isolation par défaut de PostgreSQL ?"
    answer: "Read committed"
    decoys:
      - "Serializable"
      - "Read uncommitted"
    why: "Read committed est aussi le défaut de SQL Server et d'Oracle. MySQL avec InnoDB est en repeatable read."
  - id: defaut-mysql
    prompt: "Quel est le niveau d'isolation par défaut de MySQL avec InnoDB ?"
    answer: "Repeatable read"
    decoys:
      - "Read committed"
      - "Serializable"
    why: "C'est une différence notable avec PostgreSQL, SQL Server et Oracle, en read committed."
  - id: read-committed
    prompt: "Quelle anomalie le niveau read committed empêche-t-il ?"
    answer: "Les lectures sales"
    decoys:
      - "Toutes les anomalies, sans exception"
      - "Aucune anomalie"
    why: "On ne lit que des données validées, mais une relecture peut donner une autre valeur."
  - id: serializable
    prompt: "Que garantit le niveau serializable ?"
    answer: "Le résultat est celui d'une exécution des transactions l'une après l'autre"
    decoys:
      - "Les transactions s'exécutent réellement l'une après l'autre, sur un seul cœur du processeur"
      - "Les transactions sont enregistrées dans l'ordre alphabétique de leurs tables"
    why: "Aucune anomalie n'est possible, au prix de transactions plus souvent annulées et à réessayer."
  - id: cout-isolation
    prompt: "Pourquoi ne pas mettre serializable partout par réflexe ?"
    answer: "Plus d'échecs de transactions à réessayer ; le niveau par défaut suffit à la plupart des cas"
    decoys:
      - "Parce que serializable désactive les contraintes de clés étrangères pour aller plus vite"
      - "Parce que serializable n'existe que dans les bases NoSQL, pas en relationnel"
    why: "Plus le niveau est strict, plus la base doit bloquer ou annuler les transactions qui se gênent."
  - id: verrous
    prompt: "Que pose la base pour protéger les lignes modifiées par une transaction ?"
    answer: "Des verrous, en général sur les lignes"
    decoys:
      - "Des index temporaires"
      - "Une copie de la table entière, rendue à la fin"
    why: "Les verrous empêchent deux transactions de modifier la même ligne en même temps."
  - id: mvcc
    prompt: "Qu'apporte le MVCC (contrôle de concurrence multiversion) ?"
    answer: "Chaque transaction lit une photo cohérente : les lectures ne bloquent pas les écritures"
    decoys:
      - "Chaque transaction écrit sur un serveur différent, ce qui supprime tout besoin de verrou"
      - "Les écritures sont regroupées en lots et appliquées une fois par minute"
    why: "PostgreSQL, Oracle et MySQL (InnoDB) gardent plusieurs versions des lignes."
  - id: deadlock
    prompt: "Qu'est-ce qu'un interblocage (deadlock) ?"
    answer: "Deux transactions attendent chacune un verrou tenu par l'autre"
    decoys:
      - "Une transaction qui dure plus d'une heure et finit par être annulée"
      - "Un serveur qui tombe pendant un COMMIT"
    why: "Aucune des deux ne peut avancer ; la base doit trancher."
  - id: deadlock-reaction
    prompt: "Que fait la base face à un interblocage, et que doit faire l'application ?"
    answer: "La base annule l'une des deux transactions ; l'application doit savoir la réessayer"
    decoys:
      - "La base attend indéfiniment ; l'application doit redémarrer le serveur pour débloquer"
      - "La base valide les deux transactions dans un ordre arbitraire ; l'application n'a rien à faire"
    why: "La détection est automatique, mais la reprise est à la charge de l'application."
  - id: longues
    prompt: "Pourquoi éviter une transaction ouverte pendant un appel réseau ou une saisie utilisateur ?"
    answer: "Elle tient des verrous et de vieilles versions : elle bloque les autres et gonfle la base"
    decoys:
      - "Parce qu'une transaction est automatiquement annulée au bout d'une seconde"
      - "Parce qu'une transaction ne peut pas contenir plus de deux requêtes"
    why: "On garde les transactions courtes : on prépare les données avant, puis on écrit d'un coup."
  - id: for-update
    prompt: "Comment éviter de vendre deux fois la dernière place d'un concert ?"
    answer: "Verrouiller la ligne lue (SELECT … FOR UPDATE) ou passer en serializable"
    decoys:
      - "Ajouter un index sur la colonne des places restantes, pour lire plus vite"
      - "Relire la ligne deux fois avant d'écrire"
    why: "La règle métier dépend de ce qu'une autre transaction écrit en même temps : il faut l'empêcher d'intervenir entre la lecture et l'écriture."
  - id: services
    prompt: "Une commande touche la base du service Commandes et celle du service Stock. Une transaction ACID suffit-elle ?"
    answer: "Non : une transaction ne traverse pas un appel réseau vers un autre service"
    decoys:
      - "Oui : BEGIN et COMMIT fonctionnent sur toutes les bases du réseau"
      - "Oui, à condition que les deux bases soient du même éditeur et de la même version"
    why: "On passe alors par d'autres méthodes : événements, compensations."
  - id: nosql
    prompt: "Toutes les bases offrent-elles les mêmes garanties transactionnelles ?"
    answer: "Non : beaucoup de bases NoSQL limitent les transactions, à un document ou une partition"
    decoys:
      - "Oui : ACID est une norme obligatoire pour toute base de données, relationnelle ou non"
      - "Oui, depuis que le SQL est imposé à toutes les bases"
    why: "Il faut vérifier les garanties de chaque moteur avant de compter dessus."
  - id: quand
    prompt: "Dans lequel de ces cas une transaction est-elle indispensable ?"
    answer: "Enregistrer une commande avec ses lignes et la mise à jour du stock"
    decoys:
      - "Lire le nom d'un seul client pour l'afficher"
      - "Compter les visites d'une page pour une statistique approximative"
    why: "Plusieurs écritures qui doivent rester cohérentes entre elles : c'est le cas typique."
  - id: rapport
    prompt: "Pourquoi un rapport financier lit-il ses tables dans une seule transaction ?"
    answer: "Pour voir un état cohérent de toutes les tables au même instant"
    decoys:
      - "Pour bloquer toute écriture sur ces tables pendant que le rapport tourne"
      - "Pour que le rapport soit sauvegardé automatiquement"
    why: "Sinon, des écritures entre deux lectures donneraient des totaux qui ne concordent pas."
  - id: begin
    prompt: "Quelle commande ouvre une transaction en SQL ?"
    answer: "BEGIN"
    decoys:
      - "COMMIT"
      - "OPEN"
    why: "BEGIN ouvre, COMMIT valide, ROLLBACK annule."
  - id: niveaux-ordre
    prompt: "Quel est l'ordre des niveaux d'isolation, du plus permissif au plus strict ?"
    answer: "Read uncommitted, read committed, repeatable read, serializable"
    decoys:
      - "Serializable, repeatable read, read committed, read uncommitted"
      - "Read committed, read uncommitted, serializable, repeatable read"
    why: "Chaque niveau empêche une anomalie de plus que le précédent."
  - id: repeatable-read
    prompt: "Qu'ajoute repeatable read par rapport à read committed ?"
    answer: "Il empêche aussi les lectures non répétables"
    decoys:
      - "Il autorise les lectures sales, pour aller plus vite"
      - "Il supprime tous les verrous de la base"
    why: "Une ligne relue dans la transaction garde la même valeur."
  - id: acid-signification
    prompt: "Que signifie ACID ?"
    answer: "Atomicité, cohérence, isolation, durabilité"
    decoys:
      - "Accès, contrôle, index, données"
      - "Automatisation, cache, intégrité, disponibilité"
    why: "Les quatre garanties d'une transaction."
---
