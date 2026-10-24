---
questions:
  - id: probleme
    prompt: "Que fait la base, sans index, pour trouver les commandes du client 42 ?"
    answer: "Elle lit toute la table et teste chaque ligne (un full scan)"
    decoys:
      - "Elle demande à l'application de lui indiquer l'emplacement exact de chaque ligne sur le disque"
      - "Elle refuse la requête tant qu'un index n'a pas été créé sur la colonne filtrée"
    why: "Sans index, la seule méthode est le parcours complet : indolore sur mille lignes, désastreux sur des centaines de millions."
  - id: compromis
    prompt: "Quel est le compromis d'un index ?"
    answer: "Des lectures plus rapides, au prix d'écritures plus lentes et de place disque"
    decoys:
      - "Des écritures plus rapides, au prix de lectures plus lentes et d'une base plus fragile"
      - "Aucun compromis : un index accélère tout et ne coûte rien, il faut en mettre partout"
    why: "Chaque INSERT, UPDATE ou DELETE doit aussi mettre à jour chaque index de la table."
  - id: btree
    prompt: "Quel est le type d'index le plus courant dans les bases relationnelles ?"
    answer: "L'arbre B (B-tree), un arbre équilibré et trié"
    decoys:
      - "L'index hash, qui range les valeurs dans des cases sans aucun ordre"
      - "L'index colonnaire, qui stocke chaque colonne dans un fichier à part"
    why: "Le B-tree est l'index par défaut. L'index hash ne sert qu'à l'égalité."
  - id: btree-usages
    prompt: "Pour quelles opérations un index B-tree sert-il ?"
    answer: "Égalité, intervalles, tri et jointures"
    decoys:
      - "Uniquement l'égalité stricte, jamais les intervalles"
      - "Uniquement les recherches de texte au milieu d'un mot"
    why: "Trié, le B-tree sert à =, BETWEEN, <, >, ORDER BY et aux jointures. L'égalité seule, c'est l'index hash."
  - id: hash
    prompt: "Quelle limite a un index hash ?"
    answer: "Il ne sert qu'aux recherches par égalité"
    decoys:
      - "Il ne peut porter que sur une clé primaire"
      - "Il ne fonctionne que sur des colonnes de texte"
    why: "Un hash ne conserve pas l'ordre : il ne peut pas servir à un intervalle ou à un tri."
  - id: cle-primaire
    prompt: "Faut-il créer un index sur la clé primaire ?"
    answer: "Non : elle est indexée automatiquement"
    decoys:
      - "Oui, toujours, sinon la base lit toute la table"
      - "Oui, mais seulement si la table dépasse un million de lignes"
    why: "La clé primaire, comme une contrainte d'unicité, s'accompagne automatiquement d'un index."
  - id: unique
    prompt: "Qu'apporte un index unique en plus de la vitesse ?"
    answer: "Il empêche les doublons sur la colonne"
    decoys:
      - "Il chiffre la colonne pour la protéger"
      - "Il trie physiquement la table sur le disque"
    why: "CREATE UNIQUE INDEX sur l'e-mail garantit une seule adresse par client."
  - id: composite
    prompt: "Un index sur (client_id, date) sert-il à la requête WHERE date > '2026-01-01', sans filtre sur client_id ?"
    answer: "Non : il faut partir de la première colonne de l'index"
    decoys:
      - "Oui : l'ordre des colonnes d'un index composite n'a aucune importance"
      - "Oui, mais seulement si la table compte moins de mille lignes"
    why: "Un index composite sert à un filtre sur son préfixe gauche : client_id, ou client_id puis date."
  - id: composite-oui
    prompt: "Un index sur (client_id, date) sert-il à WHERE client_id = 42 AND date > '2026-01-01' ?"
    answer: "Oui : le filtre part de la première colonne puis utilise la seconde"
    decoys:
      - "Non : un index composite ne sert qu'à des égalités sur toutes ses colonnes"
      - "Non : il faudrait deux index séparés, un sur chaque colonne"
    why: "Le préfixe gauche (client_id) est filtré par égalité, puis l'intervalle sur date s'appuie sur l'ordre de l'index."
  - id: couvrant
    prompt: "Qu'est-ce qu'un index couvrant ?"
    answer: "Un index qui contient toutes les colonnes dont la requête a besoin : la table n'est pas lue"
    decoys:
      - "Un index qui porte sur toutes les colonnes de la table, quelles que soient les requêtes lancées"
      - "Un index qui couvre plusieurs tables à la fois, pour accélérer les jointures entre elles"
    why: "Si l'index contient tout ce que la requête demande, la base répond sans aller lire les lignes de la table."
  - id: explain
    prompt: "À quoi sert EXPLAIN ?"
    answer: "À voir comment la base compte exécuter la requête : parcours de table ou index, ordre des jointures"
    decoys:
      - "À afficher en clair le texte des index créés sur chaque table, avec leur date de création"
      - "À expliquer en langage courant ce que fait une requête SQL, pour la documentation"
    why: "Le plan d'exécution est l'outil de base pour comprendre une requête lente."
  - id: explain-analyze
    prompt: "Que fait EXPLAIN ANALYZE dans PostgreSQL, en plus d'EXPLAIN ?"
    answer: "Il exécute vraiment la requête et donne les temps mesurés"
    decoys:
      - "Il crée automatiquement les index manquants qu'il a repérés"
      - "Il réécrit la requête pour la rendre plus rapide"
    why: "EXPLAIN montre le plan estimé ; EXPLAIN ANALYZE l'exécute et compare les estimations à la réalité."
  - id: seq-scan
    prompt: "Dans un plan PostgreSQL, que signale un Seq Scan sur une grosse table, là où peu de lignes sont attendues ?"
    answer: "Un parcours complet : un index manque peut-être, ou ne peut pas servir"
    decoys:
      - "Une requête parfaitement optimisée, qui utilise l'index le plus rapide disponible"
      - "Une erreur de syntaxe dans la requête, que la base a corrigée seule"
    why: "Seq Scan veut dire lecture séquentielle de toute la table. Index Scan, utilisation d'un index."
  - id: methode
    prompt: "Une requête est lente. Quelle est la bonne démarche ?"
    answer: "Lire son plan d'exécution, puis ajouter l'index qui répond au problème observé"
    decoys:
      - "Créer un index sur chaque colonne de la table, pour être sûr de couvrir tous les cas"
      - "Passer la base au niveau d'isolation le plus strict, pour éviter les conflits"
    why: "Ajouter des index au hasard ralentit les écritures sans garantie. Le plan montre ce qui coûte."
  - id: fonction
    prompt: "Pourquoi WHERE lower(email) = 'ada@x.fr' n'utilise-t-il pas un index sur email ?"
    answer: "Une fonction appliquée à la colonne empêche l'index de servir"
    decoys:
      - "Parce que les index ne fonctionnent jamais sur des colonnes de texte"
      - "Parce que lower() est interdit dans une clause WHERE"
    why: "L'index range les valeurs telles quelles. Il faut un index sur l'expression lower(email), ou stocker la valeur normalisée."
  - id: fonction-solution
    prompt: "Comment rendre rapide la recherche WHERE lower(email) = … ?"
    answer: "Créer un index sur l'expression lower(email), ou stocker l'e-mail déjà normalisé"
    decoys:
      - "Créer un second index sur email, identique au premier, pour doubler la vitesse"
      - "Remplacer lower() par upper(), que les index savent utiliser"
    why: "L'index doit porter sur ce que la requête compare réellement."
  - id: like
    prompt: "Lequel de ces filtres peut utiliser un index B-tree ?"
    answer: "LIKE 'dup%'"
    decoys:
      - "LIKE '%dup'"
      - "LIKE '%dup%'"
    why: "Un préfixe connu permet de descendre dans l'arbre trié. Un joker au début oblige à tout lire."
  - id: selectivite
    prompt: "Pourquoi un index sur une colonne booléenne aide-t-il souvent peu ?"
    answer: "Chaque valeur correspond à une grande part des lignes : lire la table est souvent aussi rapide"
    decoys:
      - "Les colonnes booléennes ne peuvent pas être indexées dans aucune base relationnelle"
      - "Un index booléen se corrompt dès que la table dépasse quelques milliers de lignes"
    why: "Une colonne peu sélective filtre mal. La base peut ignorer l'index, à raison."
  - id: ignore-index
    prompt: "La base n'utilise pas l'index qu'on vient de créer. Est-ce forcément un bug ?"
    answer: "Non : elle peut juger, à raison, que lire la table est plus rapide"
    decoys:
      - "Oui : une base doit toujours utiliser un index quand il existe"
      - "Oui : il faut redémarrer le serveur pour que l'index soit pris en compte"
    why: "Sur une petite table ou un filtre peu sélectif, le parcours complet est souvent moins cher."
  - id: cles-etrangeres
    prompt: "PostgreSQL indexe-t-il automatiquement les clés étrangères ?"
    answer: "Non : il faut souvent les indexer soi-même, car elles servent aux jointures"
    decoys:
      - "Oui, comme la clé primaire, sans rien faire de particulier à la création de la table"
      - "Oui, mais seulement si la table référencée est petite"
    why: "La clé primaire est indexée, pas la colonne qui la référence. Les jointures sur cette colonne en profitent."
  - id: trop-index
    prompt: "Pourquoi éviter de multiplier les index sur une table de journaux très écrite ?"
    answer: "Chaque écriture doit mettre à jour chaque index : les insertions ralentissent et la place disque grandit"
    decoys:
      - "Parce qu'une table ne peut pas avoir plus de deux index, quelle que soit la base utilisée"
      - "Parce que les index empêchent les lectures pendant les écritures, et bloquent la table"
    why: "Sur une table où l'on écrit sans cesse, chaque index a un coût permanent."
  - id: petite-table
    prompt: "Faut-il indexer une table de cinquante lignes ?"
    answer: "Rarement : la lire en entier est déjà instantané"
    decoys:
      - "Toujours, sur chaque colonne, pour préparer la croissance"
      - "Oui, sinon les jointures échouent"
    why: "L'index n'apporte rien quand le parcours complet est déjà négligeable."
  - id: inutilises
    prompt: "Pourquoi supprimer les index jamais utilisés ?"
    answer: "Ils coûtent à chaque écriture sans rien apporter"
    decoys:
      - "Ils ralentissent toutes les lectures de la table, même indexées"
      - "Ils empêchent les sauvegardes"
    why: "Les bases exposent des statistiques d'usage des index pour les repérer."
  - id: analytique
    prompt: "Un index accélère-t-il la somme du chiffre d'affaires sur dix ans d'historique ?"
    answer: "Non : il faut tout lire, c'est le terrain des moteurs colonnaires"
    decoys:
      - "Oui : un index sur le montant rend toute somme instantanée"
      - "Oui, à condition d'indexer chaque année dans un index séparé"
    why: "Un index aide à trouver peu de lignes. Lire tout l'historique relève d'un entrepôt colonnaire."
  - id: quand-colonnes
    prompt: "Quelles colonnes sont de bonnes candidates à un index ?"
    answer: "Celles souvent filtrées, jointes ou triées sur une grosse table"
    decoys:
      - "Celles qui changent le plus souvent, pour accélérer les mises à jour"
      - "Celles qui ne sont jamais interrogées"
    why: "WHERE, JOIN et ORDER BY fréquents sur de gros volumes : c'est là qu'un index paie son coût d'écriture."
  - id: gin
    prompt: "Dans PostgreSQL, quel type d'index sert au JSON et à la recherche plein texte ?"
    answer: "GIN"
    decoys:
      - "B-tree"
      - "Hash"
    why: "GIN indexe le contenu de documents JSON ou de textes. Le B-tree reste le type par défaut."
  - id: innodb
    prompt: "Avec InnoDB (MySQL), comment la table est-elle rangée ?"
    answer: "Selon sa clé primaire ; les index secondaires y renvoient"
    decoys:
      - "Dans l'ordre d'insertion, sans lien avec la clé primaire"
      - "Par ordre alphabétique de la première colonne de texte"
    why: "InnoDB range les lignes dans l'ordre de la clé primaire ; un index secondaire contient la clé primaire pour retrouver la ligne."
  - id: livre
    prompt: "À quoi ressemble un index de base de données ?"
    answer: "À l'index d'un livre : une liste triée qui mène directement aux pages cherchées"
    decoys:
      - "À une copie complète de la table, rangée dans un autre ordre et mise à jour la nuit"
      - "À un cache en mémoire qui garde les dernières requêtes et leurs résultats"
    why: "L'index est une structure triée annexe, tenue à jour à chaque écriture."
  - id: creer
    prompt: "Quelle commande crée un index sur la colonne email de la table clients ?"
    answer: "CREATE INDEX idx_clients_email ON clients (email);"
    decoys:
      - "ALTER TABLE clients ADD SORTED COLUMN email;"
      - "INDEX clients.email = TRUE;"
    why: "CREATE INDEX nom ON table (colonnes). Ajouter UNIQUE interdit en plus les doublons."
  - id: unicite-metier
    prompt: "Comment garantir qu'aucun client n'ait la même adresse e-mail qu'un autre ?"
    answer: "Un index unique (ou une contrainte d'unicité) sur email"
    decoys:
      - "Un index composite sur (email, id), qui combine les deux colonnes"
      - "Un tri de la table par email"
    why: "L'index unique refuse toute insertion d'une valeur déjà présente."
---
