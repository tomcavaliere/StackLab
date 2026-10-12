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
---
