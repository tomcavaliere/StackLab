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
---
