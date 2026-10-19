---
questions:
  - id: role
    prompt: "Qu'est-ce que pgvector ?"
    answer: "Une extension PostgreSQL qui ajoute un type vecteur et la recherche par similarité"
    decoys:
      - "Une base vectorielle autonome qui réplique automatiquement les tables PostgreSQL"
      - "Un modèle d'embeddings qui transforme les lignes d'une table en vecteurs"
    why: "pgvector s'active par CREATE EXTENSION dans une base PostgreSQL existante. Il stocke et compare des vecteurs, mais ne les calcule pas : c'est le rôle d'un modèle d'embeddings."
  - id: avantage-principal
    prompt: "Quel est le principal avantage de pgvector sur une base vectorielle dédiée ?"
    answer: "Vecteurs et données métier dans la même base, avec filtres et jointures en SQL"
    decoys:
      - "Une recherche plus rapide que n'importe quelle base dédiée, quel que soit le volume"
      - "Le calcul automatique des embeddings à l'insertion de chaque ligne"
    why: "Les vecteurs sont des colonnes comme les autres : on filtre, on joint et on applique les droits en SQL, sans deuxième base à synchroniser. Rien ne garantit qu'il soit plus rapide qu'une base dédiée."
  - id: recherche-sans-index
    prompt: "Sans index vectoriel, comment se comporte une recherche de plus proches voisins avec pgvector ?"
    answer: "Elle est exacte : chaque ligne est comparée au vecteur cherché"
    decoys:
      - "Elle échoue : un index HNSW est obligatoire pour utiliser les opérateurs de distance"
      - "Elle est approximative : PostgreSQL échantillonne une partie de la table"
    why: "Sans index, PostgreSQL parcourt toute la table : rappel parfait, mais lent sur de gros volumes. Les index HNSW et IVFFlat accélèrent en acceptant une recherche approximative."
  - id: types-index
    prompt: "Quels index approximatifs pgvector propose-t-il ?"
    answer: "HNSW et IVFFlat"
    decoys:
      - "B-tree et GIN"
      - "BRIN et GiST"
      - "Hash et SP-GiST"
    why: "HNSW (graphe de voisinage) et IVFFlat (listes regroupées autour de centres) sont les deux index vectoriels de pgvector. Les autres sont des index standard de PostgreSQL, pas faits pour la similarité."
  - id: compromis-approximatif
    prompt: "Que coûte un index approximatif comme HNSW par rapport à une recherche exacte ?"
    answer: "Un peu de rappel : quelques vrais plus proches voisins peuvent manquer"
    decoys:
      - "La cohérence : les écritures récentes n'apparaissent qu'après une reconstruction"
      - "Les filtres : on ne peut plus ajouter de clause WHERE à la requête"
    why: "L'index approximatif gagne en vitesse en ne parcourant qu'une partie des vecteurs : certains vrais voisins peuvent être ratés. Les filtres restent possibles, avec une subtilité sur leur ordre d'application."
  - id: ivfflat-donnees
    prompt: "Quand faut-il créer un index IVFFlat dans pgvector ?"
    answer: "Une fois la table remplie, car il regroupe les vecteurs existants"
    decoys:
      - "Avant toute insertion, car il ne peut pas être ajouté à une table qui a des lignes"
      - "Peu importe : il se recalcule entièrement à chaque insertion de ligne"
    why: "IVFFlat construit ses listes autour de centres calculés sur les données présentes : créé sur une table vide, il regroupe mal. La documentation recommande de le créer une fois des données chargées."
  - id: distances
    prompt: "Laquelle de ces mesures n'est pas un opérateur de distance de pgvector ?"
    answer: "La distance de Levenshtein entre chaînes"
    decoys:
      - "La distance cosinus"
      - "La distance euclidienne (L2)"
      - "Le produit scalaire (négatif)"
    why: "pgvector compare des vecteurs : L2, cosinus, produit scalaire négatif, L1, et Hamming ou Jaccard pour les vecteurs binaires. Levenshtein mesure l'écart entre deux chaînes de caractères."
  - id: filtre-selectif
    prompt: "Avec un index approximatif, quel piège guette une requête vectorielle avec un filtre très sélectif ?"
    answer: "Elle peut renvoyer moins de résultats que demandé"
    decoys:
      - "Elle ignore silencieusement la clause WHERE"
      - "Elle bascule toujours en parcours exact de la table"
    why: "Le filtre s'applique après le parcours de l'index : si peu de voisins trouvés le satisfont, il en reste moins que la limite. Les parcours itératifs (depuis la version 0.8.0), les index partiels ou le partitionnement atténuent le problème."
  - id: quand-choisir
    prompt: "Dans quelle situation pgvector est-il le choix le plus raisonnable ?"
    answer: "Un RAG sur un volume modeste, dans une application qui utilise déjà PostgreSQL"
    decoys:
      - "Une recherche vectorielle massive qu'on veut isoler de la base transactionnelle"
      - "Une équipe sans base de données qui ne veut rien opérer du tout"
    why: "pgvector brille quand PostgreSQL est déjà là : une extension plutôt qu'une brique de plus. Pour isoler une charge vectorielle massive, une base dédiée se dimensionne à part ; pour ne rien opérer, un service managé."
  - id: hybride
    prompt: "Comment faire une recherche hybride (mots-clés + sémantique) avec pgvector ?"
    answer: "En l'assemblant soi-même avec la recherche plein texte de PostgreSQL"
    decoys:
      - "Avec un mode hybride clé en main activé par un paramètre de l'extension"
      - "Impossible : pgvector désactive la recherche plein texte de PostgreSQL"
    why: "pgvector ne fournit pas de recherche hybride prête à l'emploi : on combine soi-même ses résultats avec ceux de la recherche plein texte. Des bases dédiées comme Qdrant l'intègrent."
  - id: activation
    prompt: "Comment active-t-on pgvector ?"
    answer: "Par CREATE EXTENSION vector, dans une base PostgreSQL existante"
    decoys:
      - "En installant un second serveur dédié, branché sur la base par réplication logique"
      - "En important un modèle d'embeddings au format ONNX dans le schéma public de la base"
    why: "pgvector est une extension : une commande dans la base suffit, sans service à côté. Elle ne contient aucun modèle d'embeddings."
  - id: halfvec
    prompt: "À quoi sert le type halfvec de pgvector ?"
    answer: "Stocker des vecteurs en demi-précision, plus compacts qu'un vecteur ordinaire"
    decoys:
      - "Conserver la moitié des dimensions de chaque vecteur, choisies au hasard à l'insertion"
      - "Répartir un vecteur sur deux colonnes qui s'indexent séparément"
    why: "halfvec garde chaque valeur en demi-précision : moins de place, au prix d'un peu de précision. Les autres variantes sont sparsevec (creux) et bit (binaire)."
  - id: sparsevec
    prompt: "Quel type de pgvector convient à des vecteurs creux, issus d'une pondération de mots-clés ?"
    answer: "sparsevec, qui ne retient que les valeurs non nulles"
    decoys:
      - "bit, qui compresse chaque vecteur dense par quantification et perd en précision à chaque lecture"
      - "halfvec, qui supprime les dimensions les moins informatives de chaque vecteur"
    why: "Un vecteur creux est surtout fait de zéros : sparsevec ne garde que les valeurs utiles. halfvec réduit la précision, bit stocke des vecteurs binaires."
  - id: operateur-cosinus
    prompt: "Dans pgvector, quel opérateur calcule la distance cosinus entre deux vecteurs ?"
    answer: "<=>"
    decoys:
      - "<->"
      - "<#>"
    why: "<=> est la distance cosinus, <-> la distance euclidienne (L2), <#> le produit scalaire négatif et <+> la distance L1."
  - id: produit-negatif
    prompt: "Pourquoi l'opérateur de produit scalaire de pgvector renvoie-t-il le produit scalaire négatif ?"
    answer: "Pour que le tri croissant de PostgreSQL place les vecteurs les plus proches en premier"
    decoys:
      - "Pour signaler que les deux vecteurs comparés pointent dans des directions opposées"
      - "Pour compenser une erreur d'arrondi propre aux vecteurs en demi-précision"
    why: "Un produit scalaire élevé signifie des vecteurs proches. En le prenant négatif, un ORDER BY ordinaire suffit à classer du plus proche au plus lointain."
  - id: requete-voisins
    prompt: "Comment écrit-on une requête de plus proches voisins avec pgvector ?"
    answer: "En triant par distance au vecteur cherché avec ORDER BY, puis en limitant avec LIMIT"
    decoys:
      - "En regroupant avec GROUP BY sur la colonne vecteur, puis en filtrant la distance avec HAVING"
      - "En joignant la table à elle-même sur égalité des vecteurs, sans clause de tri"
    why: "C'est du SQL ordinaire : ORDER BY colonne <-> vecteur LIMIT k renvoie les k lignes les plus proches."
  - id: transaction
    prompt: "Un document et son embedding sont écrits dans la même transaction PostgreSQL. Qu'est-ce que cela garantit ?"
    answer: "Les deux restent cohérents : si la transaction échoue, aucun des deux n'est écrit"
    decoys:
      - "L'embedding est recalculé automatiquement à chaque validation de la transaction"
      - "Le vecteur est copié dans un second index, visible avant même la validation"
    why: "Les vecteurs sont des colonnes comme les autres, donc soumis aux transactions. Avec une base dédiée, il faudrait synchroniser deux systèmes."
  - id: sauvegarde
    prompt: "Comment sauvegarde-t-on les vecteurs d'une base utilisant pgvector ?"
    answer: "Avec les outils de sauvegarde de PostgreSQL, comme le reste de la base"
    decoys:
      - "Avec un outil d'export propre à l'extension, car PostgreSQL ignore les colonnes vecteur"
      - "Il faut recalculer tous les embeddings à la restauration, car la sauvegarde ne les contient pas"
    why: "Les vecteurs sont des colonnes sauvegardées avec les données métier : une seule base à sauvegarder, c'est un des intérêts de pgvector."
  - id: principe-hnsw
    prompt: "Comment fonctionne l'index HNSW de pgvector ?"
    answer: "Un graphe de voisinage, parcouru de proche en proche vers le vecteur cherché"
    decoys:
      - "Des listes de vecteurs regroupés autour de centres, dont on ne visite que les plus proches"
      - "Un arbre binaire qui découpe l'espace en deux zones à chaque niveau, de la racine vers une feuille"
    why: "HNSW est un graphe de voisinage. Les listes regroupées autour de centres, c'est IVFFlat."
  - id: principe-ivfflat
    prompt: "Comment fonctionne l'index IVFFlat de pgvector ?"
    answer: "Il regroupe les vecteurs en listes autour de centres, puis ne visite que quelques listes"
    decoys:
      - "Il relie chaque vecteur à ses voisins dans un graphe, parcouru depuis un point d'entrée"
      - "Il calcule un hachage de chaque vecteur et compare seulement ceux qui ont la même empreinte"
    why: "IVFFlat limite la recherche aux listes les plus proches de la requête. D'où la création une fois la table remplie, pour que les centres reflètent les données."
  - id: ef-search
    prompt: "Avec un index HNSW, comment arbitre-t-on entre rappel et vitesse au moment de la requête ?"
    answer: "En réglant un paramètre de session comme hnsw.ef_search, qui élargit l'exploration du graphe"
    decoys:
      - "En recréant l'index avant chaque requête, avec un nombre de voisins par nœud différent"
      - "En changeant le type de la colonne, de vector à halfvec, avant chaque recherche"
    why: "Explorer plus du graphe améliore le rappel mais ralentit. L'équivalent pour IVFFlat est le nombre de listes visitées (ivfflat.probes)."
  - id: recherche-exacte
    prompt: "Dans quel cas une recherche exacte, sans index vectoriel, reste-t-elle raisonnable ?"
    answer: "Sur une petite table, ou quand un filtre ne laisse que peu de lignes à comparer"
    decoys:
      - "Jamais : sans index, PostgreSQL refuse de comparer des vecteurs entre eux"
      - "Uniquement avec le type halfvec, le type vector exigeant toujours un index"
    why: "La recherche exacte compare chaque ligne retenue : peu coûteuse sur peu de lignes, avec un rappel parfait."
  - id: index-partiel
    prompt: "À quoi peut servir un index partiel avec pgvector ?"
    answer: "Indexer seulement un sous-ensemble de lignes, par exemple celles d'un client ou d'une langue"
    decoys:
      - "Indexer seulement les premières dimensions de chaque vecteur, pour gagner de la place"
      - "Reporter la construction de l'index jusqu'à la première requête qui l'utilise"
    why: "Un index partiel réduit le piège des filtres sélectifs : la requête qui filtre sur ce sous-ensemble utilise un index qui n'en contient que les lignes."
  - id: parcours-iteratif
    prompt: "Que changent les parcours itératifs apparus avec pgvector 0.8.0 ?"
    answer: "L'index continue d'être parcouru jusqu'à obtenir assez de résultats après filtrage"
    decoys:
      - "Les index se reconstruisent progressivement en arrière-plan à chaque écriture"
      - "Les requêtes sont découpées en lots exécutés en parallèle sur plusieurs index"
    why: "Ils atténuent le problème des filtres très sélectifs, qui pouvaient renvoyer moins de résultats que demandé."
  - id: supabase
    prompt: "Pourquoi pgvector est-il simple à adopter sur Supabase ?"
    answer: "L'extension est proposée sur ses bases PostgreSQL : aucun service supplémentaire"
    decoys:
      - "Supabase remplace PostgreSQL par un moteur vectoriel propriétaire, sans SQL"
      - "Supabase recopie chaque table vers un service vectoriel externe qu'il synchronise"
    why: "Supabase est bâti sur PostgreSQL et propose l'extension : la recherche vectorielle s'ajoute dans la même base."
  - id: droits-acces
    prompt: "Comment appliquer les droits d'accès d'un utilisateur à une recherche vectorielle avec pgvector ?"
    answer: "Avec les filtres SQL et les mécanismes de PostgreSQL, dans la même requête"
    decoys:
      - "En doublant la recherche d'un contrôle côté application, PostgreSQL ne voyant pas les droits des lignes vecteur"
      - "En créant un index vectoriel distinct pour chaque utilisateur de la base de données"
    why: "On filtre, on joint et on applique les droits en SQL, au même endroit que les données métier."
  - id: dimension-colonne
    prompt: "Qu'indique-t-on en déclarant une colonne de type vector ?"
    answer: "Le nombre de dimensions, qui doit correspondre à celui du modèle d'embeddings"
    decoys:
      - "Le nombre maximal de lignes que la colonne pourra contenir"
      - "La mesure de distance, fixée de façon définitive pour cette colonne"
    why: "La dimension se déclare avec le type, par exemple vector(3). La mesure de distance se choisit à la requête, avec l'opérateur, et à la création de l'index."
  - id: forte-charge
    prompt: "Pourquoi une forte charge de requêtes vectorielles pose-t-elle question avec pgvector ?"
    answer: "La recherche partage les ressources de la base transactionnelle"
    decoys:
      - "pgvector limite chaque table à quelques milliers de vecteurs au maximum"
      - "Chaque requête vectorielle verrouille la table entière et bloque les écritures"
    why: "Une base dédiée se dimensionne à part. La fiche ne donne aucun seuil fiable : il dépend du matériel, de la dimension et des réglages d'index."
  - id: vs-qdrant
    prompt: "Qu'apporte Qdrant que pgvector n'offre pas clé en main ?"
    answer: "Une base dédiée, dimensionnée à part, avec filtrage riche et recherche hybride intégrés"
    decoys:
      - "Des jointures SQL entre les vecteurs et les tables métier, absentes de pgvector"
      - "La compatibilité totale avec les outils de sauvegarde et de supervision de PostgreSQL"
    why: "Qdrant gagne en filtrage et en hybride intégrés, au prix d'une brique de plus à opérer et à synchroniser. Les jointures SQL, c'est l'avantage de pgvector."
  - id: vs-pinecone
    prompt: "Pourquoi choisir Pinecone plutôt que pgvector ?"
    answer: "Pour ne rien opérer, en acceptant un fournisseur de plus et des données hors de sa base"
    decoys:
      - "Pour garder vecteurs et données métier dans une même transaction, filtrés en SQL"
      - "Pour bénéficier d'une licence open-source et de l'auto-hébergement complet"
    why: "Pinecone est entièrement managé : rien à opérer, mais un fournisseur de plus. Les transactions et le SQL sont du côté de pgvector, et Pinecone n'est pas open-source."
---
