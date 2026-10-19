---
questions:
  - id: mecanisme
    prompt: "Sur quel mécanisme central repose l'architecture transformer ?"
    answer: "L'attention, qui pondère l'influence de chaque token sur les autres"
    decoys:
      - "La récurrence, qui lit le texte mot à mot en gardant un état caché"
      - "La convolution, qui fait glisser un filtre fixe sur le texte"
    why: "Le transformer remplace la récurrence par l'attention : chaque token combine les informations des autres selon des poids calculés."
  - id: article
    prompt: "Quel article a introduit l'architecture transformer ?"
    answer: "Attention Is All You Need (Vaswani et al., 2017)"
    decoys:
      - "Retrieval-Augmented Generation (Lewis et al., 2020)"
      - "ImageNet Classification with Deep CNNs (Krizhevsky et al., 2012)"
    why: "L'article de 2017 propose le transformer pour la traduction ; l'article de 2020 décrit le RAG, celui de 2012 un réseau convolutif pour l'image."
  - id: parallelisme
    prompt: "Quel avantage le transformer a-t-il apporté par rapport aux réseaux récurrents ?"
    answer: "Traiter tous les tokens d'une séquence en parallèle pendant l'entraînement"
    decoys:
      - "Ne plus avoir besoin de données d'entraînement grâce à l'attention"
      - "Fonctionner sans aucun découpage du texte en tokens"
    why: "Sans lecture mot à mot, l'entraînement se parallélise bien, et les dépendances lointaines sont mieux captées."
  - id: position
    prompt: "Pourquoi ajoute-t-on une information de position aux tokens d'un transformer ?"
    answer: "Parce que l'attention seule ignore l'ordre des tokens"
    decoys:
      - "Pour indiquer au modèle la page du document d'où vient chaque mot"
      - "Pour réduire le nombre de tokens envoyés au modèle"
    why: "Sans encodage de position, « le chien mord l'homme » et « l'homme mord le chien » seraient vus pareil."
  - id: encodeur
    prompt: "Pour calculer des embeddings de phrases, quel type de transformer utilise-t-on en général ?"
    answer: "Un encodeur, qui lit tout le texte dans les deux sens"
    decoys:
      - "Un décodeur, qui ne regarde que les tokens précédents"
      - "Un réseau récurrent, plus adapté à la compréhension"
    why: "Les encodeurs (type BERT) produisent des représentations de tout le texte : classification, extraction, embeddings."
  - id: decodeur
    prompt: "La plupart des LLM génératifs actuels sont de quel type ?"
    answer: "Décodeur : ils prédisent le token suivant à partir des précédents"
    decoys:
      - "Encodeur : ils lisent toute la phrase avant de produire un vecteur"
      - "Encodeur-décodeur : ils traduisent la question en réponse"
    why: "Les modèles de type GPT sont des décodeurs : ils génèrent token par token en ne voyant que ce qui précède."
  - id: encodeur-decodeur
    prompt: "Pour quel type de tâche l'architecture encodeur-décodeur a-t-elle été conçue ?"
    answer: "Transformer un texte en un autre, comme la traduction"
    decoys:
      - "Classer des images en catégories"
      - "Prédire une valeur numérique à partir d'un tableau de données"
    why: "L'architecture d'origine (et des modèles comme T5) encode le texte source puis génère le texte cible."
  - id: cout-quadratique
    prompt: "Comment le coût de l'attention évolue-t-il avec la longueur de la séquence ?"
    answer: "Il croît avec le carré de la longueur de la séquence"
    decoys:
      - "Il reste constant, quelle que soit la longueur de la séquence"
      - "Il croît de façon linéaire, un token après l'autre comme une récurrence"
    why: "Cette croissance quadratique explique en partie la limite de la fenêtre de contexte et le coût des longs prompts."
  - id: tabulaire
    prompt: "Données tabulaires (chiffres et catégories par client) : un transformer est-il le choix par défaut ?"
    answer: "Non : le gradient boosting reste en général plus simple et au moins aussi bon"
    decoys:
      - "Oui : le transformer surpasse toujours les autres modèles, quel que soit le type de données"
      - "Oui : c'est la seule architecture capable de lire des colonnes de catégories"
    why: "Le transformer domine le texte ; sur des tableaux, le gradient boosting reste une référence plus simple."
  - id: depuis-zero
    prompt: "On veut un modèle de texte spécialisé. Faut-il entraîner un transformer depuis zéro ?"
    answer: "Rarement : on part d'un modèle pré-entraîné qu'on affine ou qu'on utilise tel quel"
    decoys:
      - "Oui : un modèle pré-entraîné ne peut pas être adapté à un domaine"
      - "Oui : quelques centaines d'exemples suffisent pour entraîner un transformer"
    why: "L'entraînement depuis zéro demande énormément de données et de calcul ; le fine-tuning d'un modèle existant est la voie normale."
  - id: tokens
    prompt: "Que fait-on du texte avant de le donner à un transformer ?"
    answer: "On le découpe en tokens, chacun transformé en vecteur"
    decoys:
      - "On le convertit en image, puis on applique un filtre de convolution"
      - "On le résume en une phrase unique, que le modèle développe ensuite"
    why: "Le texte est découpé en tokens, représentés par des vecteurs auxquels s'ajoute une information de position."
  - id: requete-cle-valeur
    prompt: "De quels vecteurs part-on pour calculer le poids d'attention entre deux tokens ?"
    answer: "Une requête, une clé et une valeur"
    decoys:
      - "Un vecteur d'entrée, un vecteur de sortie et un vecteur d'erreur"
      - "Un vecteur de position, un vecteur de langue et un vecteur de style"
    why: "Chaque token a une requête, une clé et une valeur : les poids viennent de la comparaison requête-clé, puis on combine les valeurs selon ces poids."
  - id: tetes
    prompt: "À quoi servent les têtes d'attention multiples d'une couche ?"
    answer: "Capter en parallèle différents types de relations entre les tokens"
    decoys:
      - "Traiter chacune une langue différente, parmi celles prises en charge par le modèle"
      - "Répartir le calcul sur plusieurs machines, sans effet sur ce que le modèle apprend"
    why: "Plusieurs têtes en parallèle permettent de capter des relations de natures variées dans le texte. Elles sont un choix d'architecture, pas un mécanisme de répartition."
  - id: couches
    prompt: "Comment un transformer obtient-il des représentations riches du texte ?"
    answer: "En empilant de nombreuses couches d'attention"
    decoys:
      - "En relisant le texte une fois par mot, comme un réseau récurrent"
      - "En choisissant une seule couche très large plutôt que plusieurs couches"
    why: "On empile beaucoup de couches, chacune combinant les informations des tokens grâce à l'attention."
  - id: recurrent-dependances
    prompt: "Pourquoi les réseaux récurrents étaient-ils peu doués pour les dépendances lointaines ?"
    answer: "Ils lisent le texte mot à mot, ce qui distancie les mots éloignés"
    decoys:
      - "Ils ne savaient traiter que des phrases de moins de trois mots"
      - "Ils n'utilisaient aucun vecteur pour représenter les mots du texte"
    why: "Dans une lecture séquentielle, l'information d'un mot lointain doit traverser de nombreuses étapes. L'attention relie directement deux tokens, quelle que soit leur distance."
  - id: bert
    prompt: "Pour quelle famille de transformers le modèle BERT est-il l'exemple type ?"
    answer: "Les encodeurs, qui lisent tout le texte dans les deux sens"
    decoys:
      - "Les décodeurs, qui génèrent le texte token par token vers la droite"
      - "Les encodeurs-décodeurs, conçus pour traduire un texte en un autre"
    why: "BERT est un encodeur : il sert à classer, extraire ou produire des embeddings. GPT illustre les décodeurs et T5 les encodeurs-décodeurs."
  - id: gpt
    prompt: "Pourquoi un décodeur de type GPT ne regarde-t-il que les tokens précédents ?"
    answer: "Il prédit le token suivant : il ne doit pas voir ce qu'il doit produire"
    decoys:
      - "Pour réduire la consommation de mémoire, au prix d'une qualité moindre"
      - "Parce que la position du token est ignorée par ce type de modèle"
    why: "Générer revient à prédire le token suivant à partir de ce qui précède. Si le décodeur voyait la suite, la tâche perdrait son sens."
  - id: t5
    prompt: "Parmi ces tâches, laquelle convient naturellement à un modèle encodeur-décodeur ?"
    answer: "Résumer un long article"
    decoys:
      - "Prédire le prochain prix d'un produit à partir d'un tableau de ventes"
      - "Compter les lignes d'un fichier CSV"
    why: "Résumer, comme traduire, transforme un texte en un autre. Un tableau de ventes relève plutôt du gradient boosting."
  - id: embeddings-modeles
    prompt: "Quel type de transformer est en général derrière un modèle d'embeddings de texte ?"
    answer: "Un encodeur"
    decoys:
      - "Un décodeur, comme pour la plupart des LLM génératifs"
      - "Un réseau convolutif entraîné sur des images"
    why: "Les modèles d'embeddings de texte sont en général des encodeurs, qui représentent un texte entier. Les LLM génératifs sont plutôt des décodeurs."
  - id: fenetre-contexte
    prompt: "Quel lien y a-t-il entre l'attention et la limite de la fenêtre de contexte d'un LLM ?"
    answer: "Le coût de l'attention croît avec le carré de la longueur"
    decoys:
      - "La limite vient du nombre de langues apprises par le modèle"
      - "La limite est choisie arbitrairement et n'a aucun rapport avec le coût de calcul"
    why: "Comme chaque token est comparé à tous les autres, le coût explose avec la longueur : c'est une des raisons de la limite de contexte et du prix des longs prompts."
  - id: long-prompt
    prompt: "Pourquoi un très long prompt coûte-t-il cher à traiter ?"
    answer: "L'attention compare chaque token à tous les autres"
    decoys:
      - "Parce que chaque token oblige à recharger les poids du modèle depuis le disque"
      - "Parce que le texte long doit d'abord être traduit dans un format de stockage"
    why: "Le nombre de comparaisons d'attention croît avec le carré de la longueur de la séquence, ce qui renchérit les longs prompts."
  - id: llm-lien
    prompt: "Quel est le lien entre un LLM et un transformer ?"
    answer: "Un LLM est un transformer de très grande taille, le plus souvent décodeur"
    decoys:
      - "Un LLM est une alternative aux transformers, fondée sur la récurrence"
      - "Un transformer est un LLM spécialisé dans la classification de tableaux"
    why: "Les LLM sont des transformers de très grande taille, de type décodeur pour la plupart. L'architecture est antérieure et plus générale."
  - id: choix-modele
    prompt: "Pour classer des avis clients ou faire de la recherche sémantique, quel type de transformer choisir en priorité ?"
    answer: "Un encodeur"
    decoys:
      - "Un décodeur, car c'est le seul à comprendre le texte"
      - "Un encodeur-décodeur, car la tâche transforme un texte en un autre"
    why: "Classer et chercher demandent de représenter un texte entier : c'est le rôle d'un encodeur. Un décodeur sert surtout à générer."
  - id: pytorch
    prompt: "Quel est le cadre le plus courant pour implémenter, entraîner et affiner des transformers ?"
    answer: "PyTorch"
    decoys:
      - "Redis, utilisé comme moteur de calcul en mémoire"
      - "Kubernetes, qui exécute directement les couches d'attention"
    why: "PyTorch est le cadre le plus courant pour les transformers. Kubernetes orchestre des machines mais ne calcule pas les couches."
  - id: hub-modeles
    prompt: "Où trouve-t-on de nombreux transformers pré-entraînés prêts à être utilisés ou affinés ?"
    answer: "Sur le Hub de Hugging Face, avec la bibliothèque transformers"
    decoys:
      - "Dans la documentation de PostgreSQL, qui en fournit des exemples"
      - "Dans le registre de conteneurs d'un cloud public, sous forme d'images exécutables"
    why: "La bibliothèque transformers et le Hub donnent accès à de très nombreux modèles pré-entraînés."
  - id: gradient-boosting
    prompt: "Pour prédire la résiliation de clients à partir de colonnes de chiffres et de catégories, que choisir en premier ?"
    answer: "Un modèle d'arbres comme le gradient boosting"
    decoys:
      - "Un transformer de grande taille entraîné depuis zéro sur ces colonnes"
      - "Un décodeur qui génère la réponse sous forme de texte à partir du tableau"
    why: "Sur des données tabulaires, les modèles d'arbres restent en général plus simples et au moins aussi bons. Les transformers dominent surtout le texte."
  - id: petite-tache
    prompt: "Pour une petite tâche de texte bien définie avec peu de moyens, que faut-il comparer avant de choisir un transformer ?"
    answer: "Un modèle classique sur des caractéristiques simples"
    decoys:
      - "Un transformer entraîné depuis zéro, qui sera forcément meilleur"
      - "Un LLM de grande taille servi sur ses propres GPU, par principe"
    why: "Un modèle classique peut suffire et coûte bien moins cher. Il faut comparer avant de partir sur un transformer."
  - id: ordre-mots
    prompt: "Que se passerait-il si l'on retirait l'information de position d'un transformer ?"
    answer: "Deux phrases aux mêmes mots mais dans un autre ordre seraient vues pareil"
    decoys:
      - "Le modèle ne pourrait plus découper le texte en tokens"
      - "Le modèle lirait le texte de droite à gauche au lieu de gauche à droite"
    why: "L'attention seule ignore l'ordre : sans position, l'ordre des mots est perdu, d'où l'ajout d'une information de position aux tokens."
  - id: parallele-limite
    prompt: "Le parallélisme du transformer joue surtout à quel moment ?"
    answer: "À l'entraînement, où tous les tokens d'une séquence sont traités ensemble"
    decoys:
      - "À la génération, où tous les tokens de la réponse sont produits en même temps"
      - "Au téléchargement, où les poids sont reçus en parallèle depuis le Hub"
    why: "Sans lecture mot à mot, l'entraînement se parallélise bien. Un décodeur génère en revanche token après token."
  - id: attention-seule
    prompt: "Que signifie le titre « Attention Is All You Need » ?"
    answer: "Que l'attention suffit, sans récurrence ni convolution, pour traiter les séquences"
    decoys:
      - "Qu'il suffit de prêter attention à la qualité des données d'entraînement"
      - "Que les réseaux profonds doivent être remplacés par des méthodes statistiques simples"
    why: "L'article de 2017 propose une architecture fondée sur l'attention, qui remplace les réseaux récurrents."
---
