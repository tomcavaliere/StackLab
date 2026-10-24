---
questions:
  - id: definition
    prompt: "Qu'est-ce qu'un embedding de texte ?"
    answer: "Un vecteur de nombres qui représente le sens du texte"
    decoys:
      - "Un résumé du texte en quelques mots-clés"
      - "Une version compressée du texte, qu'on peut décompresser à l'identique"
    why: "Un modèle transforme le texte en vecteur de taille fixe ; des sens proches donnent des vecteurs proches. On ne retrouve pas le texte d'origine à partir du vecteur."
  - id: similarite
    prompt: "Quelle mesure utilise-t-on le plus souvent pour comparer deux embeddings ?"
    answer: "La similarité cosinus"
    decoys:
      - "Le nombre de mots communs aux deux textes"
      - "La différence de longueur entre les deux textes"
    why: "La similarité cosinus mesure l'angle entre deux vecteurs. Compter les mots communs, c'est justement ce que les embeddings dépassent."
  - id: meme-modele
    prompt: "On a indexé ses documents avec un modèle d'embeddings A. Avec quoi encoder les questions ?"
    answer: "Le même modèle A"
    decoys:
      - "Le modèle le plus récent disponible, pour gagner en qualité"
      - "N'importe quel modèle qui produit des vecteurs de même dimension"
    why: "Les vecteurs de deux modèles différents ne vivent pas dans le même espace, même à dimension égale. Changer de modèle oblige à recalculer tout l'index."
  - id: changer-de-modele
    prompt: "Que faut-il faire si l'on change de modèle d'embeddings ?"
    answer: "Recalculer les vecteurs de tous les documents"
    decoys:
      - "Rien : les anciens vecteurs restent compatibles avec le nouveau modèle"
      - "Convertir les anciens vecteurs avec une simple règle de trois"
    why: "Chaque modèle définit son propre espace. Les anciens vecteurs ne se comparent pas à ceux du nouveau modèle : on réindexe tout."
  - id: recherche-semantique
    prompt: "Pourquoi une recherche par embeddings trouve-t-elle « mettre fin au contrat » pour la requête « résilier mon abonnement » ?"
    answer: "Les deux formulations ont un sens proche, donc des vecteurs proches"
    decoys:
      - "Elle cherche les mots de la requête dans un dictionnaire de synonymes"
      - "Elle découpe les mots en racines communes avant de les comparer"
    why: "Le modèle place les textes de sens voisin près l'un de l'autre, sans liste de synonymes écrite à la main ni correspondance de racines."
  - id: terme-exact
    prompt: "Quel besoin se prête mal à une recherche par embeddings seule ?"
    answer: "Retrouver une facture par son numéro exact"
    decoys:
      - "Retrouver des tickets de support qui décrivent le même problème"
      - "Proposer des articles similaires à celui qu'on lit"
    why: "Un identifiant exact se cherche par mots-clés ou par une requête classique. Les embeddings servent quand le sens compte plus que les termes."
  - id: deduplication
    prompt: "Comment les embeddings aident-ils à dédoublonner des questions de FAQ ?"
    answer: "Deux questions formulées autrement ont des vecteurs très proches"
    decoys:
      - "Ils détectent les questions qui ont exactement les mêmes mots"
      - "Ils trient les questions par ordre alphabétique pour rapprocher les doublons"
    why: "La proximité des vecteurs repère les quasi-doublons même formulés différemment, ce que la comparaison de texte exacte ne fait pas."
  - id: classification
    prompt: "Comment classer un texte avec des embeddings, sans entraîner de modèle ?"
    answer: "Le comparer aux embeddings de chaque catégorie et prendre la plus proche"
    decoys:
      - "Compter ses mots-clés et choisir la catégorie qui en a le plus"
      - "Demander au modèle d'embeddings de répondre par le nom de la catégorie"
    why: "On calcule l'embedding du texte et celui d'exemples ou de libellés de catégories, puis on retient le plus proche. Un modèle d'embeddings renvoie un vecteur, pas du texte."
  - id: base-vectorielle
    prompt: "Quel est le rôle d'une base vectorielle (pgvector, Qdrant, Pinecone) ?"
    answer: "Retrouver vite les vecteurs les plus proches d'un vecteur donné"
    decoys:
      - "Calculer les embeddings à partir du texte brut"
      - "Générer la réponse finale à partir des documents retrouvés"
    why: "La base stocke les vecteurs et les indexe pour trouver les plus proches sans tout comparer. Le calcul des vecteurs revient au modèle d'embeddings, la réponse au LLM."
  - id: filtre-structure
    prompt: "On veut les produits à moins de 50 € ajoutés ce mois-ci. Les embeddings sont-ils l'outil adapté ?"
    answer: "Non : c'est un filtre structuré, une clause WHERE suffit"
    decoys:
      - "Oui : la similarité cosinus classe naturellement les prix"
      - "Oui, à condition d'utiliser un modèle d'embeddings multilingue"
    why: "Prix et date sont des champs structurés : on les filtre en SQL. Les embeddings mesurent une proximité de sens, pas une comparaison de valeurs."
  - id: dimension-fixe
    prompt: "Un modèle d'embeddings reçoit une phrase de trois mots, puis un paragraphe entier. Que renvoie-t-il ?"
    answer: "Dans les deux cas un vecteur de la même taille, fixée par le modèle"
    decoys:
      - "Un vecteur plus long pour le paragraphe, une dimension par mot du texte"
      - "Un vecteur plus court pour la phrase, car il y a moins de sens à représenter"
    why: "La dimension est une caractéristique du modèle, indépendante de la longueur du texte. C'est ce qui permet de comparer n'importe quels textes entre eux."
  - id: index-approche
    prompt: "Pourquoi une base vectorielle utilise-t-elle des index approchés ?"
    answer: "Éviter de comparer la question à chaque vecteur, au prix d'un résultat parfois approximatif"
    decoys:
      - "Compresser les vecteurs en mots-clés, ce qui permet ensuite une recherche exacte"
      - "Garantir que le premier résultat est toujours le vecteur le plus proche"
    why: "Comparer à tous les vecteurs devient trop lent quand l'index grossit ; un index approché échange un peu de précision contre de la vitesse. Il ne garantit donc pas le plus proche."
  - id: multilingue
    prompt: "Peut-on retrouver un document en anglais à partir d'une question en français avec des embeddings ?"
    answer: "Oui, avec un modèle multilingue qui rapproche les textes de même sens"
    decoys:
      - "Non : les vecteurs d'un texte dépendent de sa langue et ne se comparent qu'à ceux du même idiome"
      - "Oui, avec n'importe quel modèle, car les vecteurs ne contiennent aucune information de langue"
    why: "Un modèle multilingue place des textes de même sens près l'un de l'autre quelle que soit la langue. Un modèle entraîné surtout sur une langue peut donner de mauvais résultats sur d'autres."
  - id: multimodal
    prompt: "Que permet un modèle d'embeddings multimodal ?"
    answer: "Comparer un texte et une image dans un même espace de vecteurs"
    decoys:
      - "Générer une image à partir d'un texte en passant par le vecteur du texte"
      - "Traduire automatiquement le texte d'une image vers plusieurs langues"
    why: "Un tel modèle place textes et images dans le même espace, d'où la recherche d'images par une phrase. Il produit des vecteurs, pas des images ni des traductions."
  - id: modele-vs-llm
    prompt: "Quelle est la différence entre un modèle d'embeddings et un LLM ?"
    answer: "Le premier renvoie un vecteur, le second génère du texte"
    decoys:
      - "Le premier est entraîné sur du texte, le second sur des images et du son"
      - "Le premier comprend la question, le second se contente de la recopier"
    why: "Un modèle d'embeddings sert à comparer et retrouver ; un LLM rédige. Dans un RAG, les deux interviennent à des étapes différentes."
  - id: limite-entree
    prompt: "Un document dépasse la longueur maximale acceptée par le modèle d'embeddings. Que faire ?"
    answer: "Le découper en morceaux et calculer un embedding par morceau"
    decoys:
      - "Garder le début du texte, qui résume en général le reste du document"
      - "Calculer un embedding par mot et en faire la moyenne pour tout le document"
    why: "Chaque modèle limite la taille de ce qu'il encode. Le découpage garde tout le contenu et donne des vecteurs plus précis qu'un texte tronqué."
  - id: cout-calcul
    prompt: "Quand calcule-t-on les embeddings dans une recherche sémantique sur une base documentaire ?"
    answer: "Une fois pour chaque document à l'indexation, puis une fois par question posée"
    decoys:
      - "À chaque question, pour l'ensemble des documents, afin de rester à jour"
      - "Une seule fois pour toute la base, les questions étant comparées sans embedding"
    why: "Les vecteurs des documents sont précalculés et stockés. Il faut seulement encoder la question, avec le même modèle, au moment de la recherche."
  - id: mise-a-jour-document
    prompt: "Un seul document d'une base de 10 000 est modifié. Que recalcule-t-on ?"
    answer: "Les embeddings des morceaux de ce document seulement"
    decoys:
      - "Les embeddings de tous les documents, pour garder des vecteurs cohérents entre eux"
      - "Aucun embedding : le vecteur d'un document suit automatiquement son contenu"
    why: "Chaque vecteur est calculé indépendamment : modifier un document n'invalide pas les autres. Mais il ne se met pas à jour tout seul, il faut le recalculer."
  - id: confidentialite
    prompt: "Quelle question de confidentialité se pose en calculant des embeddings avec une API de fournisseur ?"
    answer: "Les textes à encoder sont envoyés au fournisseur"
    decoys:
      - "Le vecteur renvoyé permet toujours de retrouver le texte original"
      - "Le fournisseur impose de stocker les vecteurs dans sa propre base"
    why: "Encoder via une API revient à envoyer ses textes à un tiers ; un modèle ouvert tourné chez soi évite cela. Le stockage des vecteurs reste libre."
  - id: pgvector
    prompt: "Quel avantage y a-t-il à stocker ses embeddings dans PostgreSQL avec pgvector ?"
    answer: "Les vecteurs vivent à côté des données de l'application, interrogeables en SQL"
    decoys:
      - "Le calcul des embeddings est fait par PostgreSQL, sans modèle externe"
      - "La recherche est exacte et instantanée, quelle que soit la taille de la table"
    why: "pgvector ajoute le stockage et la recherche de vecteurs à PostgreSQL, donc un système de moins à exploiter. Le modèle d'embeddings reste à part, et les index vectoriels sont, eux, approchés."
  - id: filtres-et-vecteurs
    prompt: "On cherche les documents proches d'une question, mais seulement ceux du client 42. Comment procéder ?"
    answer: "Combiner la recherche vectorielle avec un filtre sur une métadonnée"
    decoys:
      - "Calculer un modèle d'embeddings dédié à chaque client, plutôt qu'un filtre"
      - "Chercher les plus proches dans toute la base, puis demander à l'utilisateur de trier"
    why: "Les bases vectorielles associent des métadonnées aux vecteurs et filtrent à la recherche. Le filtrage structuré reste du ressort d'une clause classique, pas de la proximité de sens."
  - id: proche-nest-pas-vrai
    prompt: "Deux phrases opposées (« le paiement est accepté » et « le paiement est refusé ») peuvent avoir des vecteurs proches. Que retenir ?"
    answer: "Une forte similarité indique un sujet voisin, pas une réponse correcte"
    decoys:
      - "Le modèle d'embeddings est défaillant, un bon modèle séparant toujours les contraires"
      - "La similarité cosinus ne mesure que la longueur des phrases, pas leur sens"
    why: "Les embeddings capturent surtout le thème. Une phrase proche n'est pas forcément la bonne, d'où l'intérêt du reclassement et d'un LLM qui lit vraiment les extraits."
  - id: seuil
    prompt: "Peut-on fixer un seuil de similarité universel au-dessus duquel un résultat est « pertinent » ?"
    answer: "Non : l'échelle des scores dépend du modèle et du corpus, il faut le calibrer"
    decoys:
      - "Oui : la similarité cosinus a le même sens quel que soit le modèle utilisé"
      - "Oui, à condition de normaliser d'abord la longueur des textes comparés"
    why: "Les scores d'un modèle ne sont pas comparables à ceux d'un autre. Un seuil se règle sur des cas réels de l'application."
  - id: evaluer-modele
    prompt: "Comment choisir entre deux modèles d'embeddings pour son application ?"
    answer: "Les comparer sur ses propres questions, avec les bons documents connus"
    decoys:
      - "Prendre celui dont les vecteurs ont le plus de dimensions"
      - "Prendre celui qui est cité le plus souvent dans les articles de blog"
    why: "La qualité dépend de la langue, du domaine et du type de textes. Seule une mesure sur des cas représentatifs tranche ; la dimension n'est pas un gage de qualité."
  - id: clustering
    prompt: "Comment regrouper automatiquement des milliers de commentaires clients par thème avec des embeddings ?"
    answer: "Calculer les embeddings puis regrouper les vecteurs proches"
    decoys:
      - "Trier les commentaires par la première lettre pour rapprocher les sujets voisins"
      - "Demander au modèle d'embeddings de nommer chaque thème en une phrase"
    why: "Des commentaires de même sujet ont des vecteurs voisins, que des algorithmes de regroupement rassemblent. Le modèle d'embeddings ne produit pas de texte."
  - id: recommandation
    prompt: "Comment un site de blog propose-t-il « des articles similaires à celui-ci » avec des embeddings ?"
    answer: "En listant les articles dont les vecteurs sont les plus proches de celui lu"
    decoys:
      - "En recommandant les articles que le plus grand nombre de lecteurs ont ouverts"
      - "En cherchant les articles qui partagent le plus de mots avec le titre"
    why: "La proximité de sens suffit, sans historique de lecture. Les deux autres approches reposent sur la popularité ou sur les mots communs."
  - id: explicabilite
    prompt: "Pourquoi est-il difficile d'expliquer à un utilisateur pourquoi un résultat a été retourné par recherche vectorielle ?"
    answer: "Elle ne repose pas sur une correspondance de termes qu'on pourrait montrer"
    decoys:
      - "Les bases vectorielles masquent volontairement le score des résultats retournés"
      - "Le résultat change à chaque exécution, la recherche étant aléatoire"
    why: "Avec des mots-clés, on peut surligner les termes trouvés. Avec des vecteurs, la proximité est globale et ne se décompose pas terme à terme."
  - id: index-inverse
    prompt: "Qu'est-ce qui distingue la recherche par mots-clés d'un Elasticsearch de la recherche par embeddings ?"
    answer: "Elle repose sur les termes exacts du texte, sans modèle à faire tourner"
    decoys:
      - "Elle repose sur un modèle de langage qui évalue le sens des documents"
      - "Elle trouve toujours plus de résultats pertinents, car elle ignore les synonymes"
    why: "Un index inversé associe chaque terme aux documents qui le contiennent : précis sur les termes, mais aveugle aux reformulations. Les embeddings font l'inverse."
  - id: dimension-et-stockage
    prompt: "Quelle conséquence a le choix d'un modèle d'embeddings à très grande dimension ?"
    answer: "Plus de place pour stocker les vecteurs et plus de calcul pour les comparer"
    decoys:
      - "Une recherche toujours plus précise, sans contrepartie sur le coût"
      - "Une incompatibilité avec les bases vectorielles, limitées aux petits vecteurs"
    why: "Chaque vecteur est plus lourd et chaque comparaison plus longue. Le gain de qualité n'est pas garanti : il se vérifie sur ses propres données."
  - id: hybride
    prompt: "Comment tirer parti à la fois des embeddings et des mots-clés dans une même recherche ?"
    answer: "Lancer les deux recherches et fusionner leurs résultats (recherche hybride)"
    decoys:
      - "Remplacer chaque mot-clé de la requête par son vecteur, puis chercher par texte exact"
      - "Utiliser les embeddings pour les termes courts, les mots-clés pour les longues phrases"
    why: "Les mots-clés couvrent les termes exacts, les vecteurs les reformulations. Fusionner les deux listes cumule leurs avantages."
---
