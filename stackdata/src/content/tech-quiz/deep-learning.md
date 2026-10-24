---
questions:
  - id: principe
    prompt: "Qu'est-ce qui définit le deep learning ?"
    answer: "Des réseaux de neurones à nombreuses couches"
    decoys:
      - "Des arbres de décision combinés les uns après les autres"
      - "Des règles écrites par des experts, empilées en couches"
    why: "Le deep learning empile de nombreuses couches de neurones, chacune transformant la sortie de la précédente. Les arbres combinés, c'est le gradient boosting."
  - id: representations
    prompt: "Quel avantage clé le deep learning a-t-il sur des images ou du texte ?"
    answer: "Il apprend lui-même ses représentations à partir des données brutes"
    decoys:
      - "Il n'a besoin que de quelques dizaines d'exemples pour bien apprendre"
      - "Ses décisions s'expliquent facilement, règle par règle"
    why: "Personne ne sait écrire des indicateurs utiles à partir de pixels ; le réseau les apprend, des bords aux objets entiers. En revanche, il demande beaucoup de données et reste opaque."
  - id: donnees-tabulaires
    prompt: "Pour prédire la résiliation à partir d'un petit fichier clients en lignes et colonnes, que privilégier d'abord ?"
    answer: "Un gradient boosting comme XGBoost"
    decoys:
      - "Un réseau de neurones profond entraîné depuis zéro"
      - "Un transformer entraîné sur ce fichier"
    why: "Sur de petites données tabulaires, le gradient boosting est souvent aussi bon ou meilleur, plus simple à entraîner et à expliquer. Un réseau profond surapprendrait."
  - id: gpu
    prompt: "Pourquoi l'entraînement d'un réseau de neurones se fait-il sur GPU ?"
    answer: "Ses calculs se font massivement en parallèle"
    decoys:
      - "Les frameworks de deep learning ne savent pas s'exécuter sur un processeur classique"
      - "Le GPU stocke les données d'entraînement de façon plus durable que le disque"
    why: "Un réseau enchaîne d'énormes calculs matriciels, que les GPU exécutent en parallèle. On peut entraîner sur processeur, mais cela devient vite trop lent."
  - id: transformer
    prompt: "Quelle architecture de réseau de neurones est à la base des LLM actuels ?"
    answer: "Le transformer"
    decoys:
      - "Le réseau convolutif"
      - "Le réseau récurrent"
      - "La forêt aléatoire"
    why: "Le transformer, présenté en 2017 dans l'article « Attention Is All You Need », a remplacé les réseaux récurrents pour le texte. Les réseaux convolutifs servent surtout aux images ; la forêt aléatoire n'est pas un réseau de neurones."
  - id: transfer-learning
    prompt: "On a peu d'images étiquetées pour un contrôle qualité. Quelle approche réduit le besoin de données ?"
    answer: "Partir d'un modèle pré-entraîné et l'adapter"
    decoys:
      - "Entraîner depuis zéro un réseau plus profond pour compenser"
      - "Doubler la taille des images pour donner plus de détails au réseau"
    why: "Le transfer learning (ou fine-tuning) réutilise ce qu'un modèle a appris sur de grands volumes et l'ajuste au cas métier. Un réseau plus profond depuis zéro surapprendrait encore plus."
  - id: couches-image
    prompt: "Sur des images, que détectent typiquement les premières couches d'un réseau entraîné ?"
    answer: "Des bords et des textures"
    decoys:
      - "Des objets entiers, déjà reconnus et nommés"
      - "Les étiquettes des images d'entraînement"
    why: "Les représentations se construisent de couche en couche : bords et textures d'abord, puis formes, puis objets entiers dans les dernières couches."
  - id: donnees-non-structurees
    prompt: "Lequel de ces cas relève le plus naturellement du deep learning ?"
    answer: "Transcrire les appels d'un centre de relation client"
    decoys:
      - "Calculer le chiffre d'affaires mensuel par région à partir des ventes"
      - "Bloquer les paiements au-dessus d'un montant fixé par le service risque"
    why: "L'audio est une donnée non structurée, terrain du deep learning. Une agrégation se fait en SQL, et un seuil fixé par le métier est une simple règle."
  - id: explicabilite
    prompt: "Pourquoi éviter le deep learning pour une décision d'octroi de crédit à justifier client par client ?"
    answer: "Il est difficile d'expliquer pourquoi le réseau a décidé"
    decoys:
      - "Il ne sait traiter que des images, du son et du texte"
      - "Il ne produit que des nombres, jamais des décisions oui ou non"
    why: "Un réseau combine des millions de poids : sa décision ne se lit pas règle par règle. Il sait pourtant traiter des données tabulaires et faire de la classification."
  - id: avant-d-entrainer
    prompt: "Avant d'entraîner un réseau pour classer des textes, que vérifier d'abord ?"
    answer: "Si un LLM ou des embeddings existants suffisent déjà"
    decoys:
      - "Si l'on peut se passer de GPU en réduisant le nombre de couches"
      - "Si l'on peut convertir les textes en tableau de mots pour XGBoost"
    why: "Des modèles pré-entraînés couvrent déjà beaucoup de tâches de texte : les utiliser évite de collecter des données et d'entraîner un réseau."
  - id: poids
    prompt: "Qu'ajuste un réseau de neurones pendant son entraînement ?"
    answer: "Ses poids, pour réduire l'erreur mesurée sur les exemples"
    decoys:
      - "Son nombre de couches, qu'il augmente de lui-même tant que l'erreur baisse"
      - "Les données d'entrée, qu'il corrige pour qu'elles ressemblent mieux à ses prédictions"
    why: "Un réseau a des millions de poids (ou bien plus) qu'il modifie pour réduire son erreur. L'architecture et les données sont fixées par la personne qui l'entraîne."
  - id: retropropagation
    prompt: "Que fait la rétropropagation du gradient ?"
    answer: "Elle calcule la part de chaque poids dans l'erreur, pour savoir comment le corriger"
    decoys:
      - "Elle renvoie les données d'entrée vers la première couche pour une seconde passe de calcul"
      - "Elle supprime à chaque passage les neurones dont la sortie est la plus faible du réseau"
    why: "En partant de l'erreur finale, on remonte couche par couche pour savoir quel poids corriger et dans quel sens. Aucun neurone n'est supprimé, et les données ne sont pas rejouées."
  - id: perte
    prompt: "À quoi sert la fonction de perte d'un réseau de neurones ?"
    answer: "Mesurer l'écart entre les prédictions du réseau et les réponses attendues"
    decoys:
      - "Limiter le nombre de neurones actifs pour économiser du calcul pendant l'entraînement"
      - "Choisir quelles données d'entraînement garder à chaque époque et lesquelles écarter"
    why: "La perte résume l'erreur en un nombre, que l'entraînement cherche à faire baisser. Elle ne sélectionne ni neurones ni données."
  - id: taux-apprentissage
    prompt: "Que règle le taux d'apprentissage d'un réseau de neurones ?"
    answer: "L'ampleur de la correction des poids à chaque mise à jour"
    decoys:
      - "Le nombre d'exemples traités ensemble dans un même lot de données"
      - "La vitesse à laquelle le GPU relit les données depuis le disque pendant l'époque"
    why: "Trop grand, l'entraînement oscille ou diverge ; trop petit, il progresse très lentement. La taille des lots est un autre réglage."
  - id: epoque
    prompt: "Qu'est-ce qu'une époque (epoch) d'entraînement ?"
    answer: "Un passage complet sur l'ensemble des données d'entraînement"
    decoys:
      - "Une mise à jour des poids à partir d'un seul lot d'exemples, quelle que soit sa taille"
      - "Le délai qui sépare deux sauvegardes successives du modèle sur le disque"
    why: "Une époque parcourt tous les exemples une fois, en plusieurs lots. Chaque lot provoque une mise à jour des poids, mais ce n'est pas une époque."
  - id: surapprentissage
    prompt: "Que signifie qu'un réseau surapprend ?"
    answer: "Il mémorise les exemples d'entraînement et généralise mal aux nouvelles données"
    decoys:
      - "Il apprend trop lentement et n'atteint jamais une erreur acceptable sur l'entraînement"
      - "Il reçoit trop de données et finit par oublier les premiers exemples qu'il a vus"
    why: "Le surapprentissage donne une bonne performance sur l'entraînement mais mauvaise sur de nouvelles données ; il guette surtout quand les exemples sont peu nombreux. Ce n'est pas un problème de lenteur."
  - id: validation
    prompt: "Pourquoi garder un jeu de validation séparé du jeu d'entraînement ?"
    answer: "Pour détecter le surapprentissage en mesurant la performance sur des exemples jamais vus"
    decoys:
      - "Pour augmenter le nombre d'exemples disponibles à l'entraînement sans en collecter d'autres"
      - "Pour permettre au réseau de corriger lui-même les étiquettes erronées de ses exemples"
    why: "Une performance mesurée sur les données d'entraînement est trop flatteuse ; les exemples mis de côté disent si le réseau généralise. Ils ne servent pas à entraîner."
  - id: convolutif
    prompt: "Pour quel type de données les réseaux convolutifs sont-ils surtout conçus ?"
    answer: "Les images, dont ils exploitent la structure spatiale"
    decoys:
      - "Les tableaux de transactions, dont ils exploitent les colonnes numériques"
      - "Les fichiers de logs, dont ils exploitent l'ordre chronologique des lignes"
    why: "Les convolutions font glisser de petits filtres sur l'image pour détecter bords, textures puis formes. Les tableaux relèvent plutôt du gradient boosting."
  - id: attention
    prompt: "Quel mécanisme est au cœur de l'architecture transformer ?"
    answer: "L'attention, qui pondère l'importance de chaque élément de la séquence pour les autres"
    decoys:
      - "La convolution, qui fait glisser un petit filtre sur la séquence d'entrée"
      - "La récurrence, qui lit la séquence un élément à la fois en gardant un état"
    why: "Le titre de l'article de 2017, « Attention Is All You Need », le dit : l'attention remplace la récurrence. La convolution est l'outil des images."
  - id: pre-entraine
    prompt: "Qu'appelle-t-on un modèle pré-entraîné ?"
    answer: "Un modèle déjà entraîné sur de grandes données, qu'on peut adapter à son cas"
    decoys:
      - "Un modèle dont l'architecture est choisie avant même que les données soient collectées"
      - "Un modèle testé et validé par un organisme tiers avant sa publication officielle"
    why: "Partir d'un modèle pré-entraîné (transfer learning, fine-tuning) réduit fortement les données et le calcul nécessaires. Le terme ne renvoie à aucune certification."
  - id: ingredients
    prompt: "Quels éléments ont permis au deep learning de percer au début des années 2010 ?"
    answer: "De grands jeux de données, des GPU et de meilleures techniques d'entraînement"
    decoys:
      - "L'arrivée du transformer, de l'ordinateur quantique et des grands modèles de langage"
      - "Des règles métier plus nombreuses, des bases SQL plus rapides et des réseaux plus fiables"
    why: "Données, calcul parallèle sur GPU et améliorations des techniques se sont rencontrés. Le transformer date de 2017, soit plus tard."
  - id: opacite
    prompt: "Que signifie dire qu'un réseau de neurones est opaque ?"
    answer: "Il est difficile d'expliquer pourquoi il a pris une décision donnée"
    decoys:
      - "Ses poids sont chiffrés et ne peuvent pas être lus par l'utilisateur"
      - "Il ne peut s'exécuter que dans un environnement cloisonné, sans accès au réseau"
    why: "Des millions de poids interagissent : on ne lit pas la décision règle par règle. C'est un handicap pour les décisions à justifier ou à auditer."
  - id: echec-silencieux
    prompt: "Pourquoi dit-on qu'un entraînement de réseau peut échouer silencieusement ?"
    answer: "Il peut tourner sans erreur tout en produisant un mauvais modèle, à cause de mauvais réglages"
    decoys:
      - "Le framework masque volontairement les messages d'erreur pendant tout l'entraînement"
      - "Le GPU s'éteint sans prévenir quand sa mémoire est pleine, sans laisser de trace"
    why: "Architecture, taux d'apprentissage, taille des lots : un mauvais choix ne provoque pas d'erreur, seulement un modèle médiocre qu'il faut repérer en suivant les courbes de perte."
  - id: etude-tabulaire
    prompt: "Que montre l'étude de Grinsztajn, Oyallon et Varoquaux (2022) sur les données tabulaires ?"
    answer: "Les modèles à base d'arbres restent souvent meilleurs que le deep learning"
    decoys:
      - "Les réseaux de neurones surpassent systématiquement les arbres dès que le jeu dépasse quelques colonnes"
      - "Les modèles linéaires font mieux que les arbres et les réseaux sur tous les jeux testés"
    why: "Son titre pose la question : pourquoi les modèles à base d'arbres surpassent-ils encore le deep learning sur du tabulaire ? D'où la préférence pour XGBoost sur de petites tables."
  - id: regle-simple
    prompt: "On veut refuser les commandes dont le montant dépasse un plafond fixe. Faut-il du deep learning ?"
    answer: "Non : une règle simple résout déjà le problème"
    decoys:
      - "Oui : un réseau saura toujours mieux placer un seuil qu'une règle écrite à la main"
      - "Oui, mais seulement si l'on dispose d'un GPU pour l'entraînement"
    why: "Quand une règle suffit, entraîner un réseau ajoute du coût, de l'opacité et du réglage pour rien. Le deep learning sert aux problèmes où personne ne sait écrire la règle."
  - id: cout
    prompt: "Qu'est-ce qui rend le deep learning coûteux à mettre en œuvre ?"
    answer: "Les données en volume, le calcul sur GPU, le réglage et la difficulté à expliquer les décisions"
    decoys:
      - "Les licences payantes obligatoires des réseaux de neurones et des frameworks qui les entraînent"
      - "La nécessité d'écrire à la main chaque règle de décision du réseau avant de l'entraîner"
    why: "Les coûts sont les données, le calcul, le réglage et l'opacité. Les frameworks sont open-source, et le réseau apprend ses règles lui-même."
  - id: embeddings
    prompt: "Quel lien entre le deep learning et les embeddings ?"
    answer: "Un embedding est un vecteur appris par un réseau, qui capture le sens d'un texte ou d'une image"
    decoys:
      - "Un embedding est une règle écrite à la main qui associe chaque mot du dictionnaire à un nombre"
      - "Un embedding est le fichier complet des poids d'un réseau, sauvegardé tel quel sur le disque"
    why: "Un embedding est la représentation apprise par un réseau de neurones : deux contenus de sens proche ont des vecteurs proches. Ce n'est ni une règle manuelle ni le fichier de poids."
  - id: lien-llm
    prompt: "Les grands modèles de langage (LLM) relèvent-ils du deep learning ?"
    answer: "Oui : ce sont des réseaux de type transformer entraînés sur d'énormes corpus de texte"
    decoys:
      - "Non : ce sont des systèmes à base de règles grammaticales rédigées par des linguistes"
      - "Non : ce sont des modèles de gradient boosting appliqués à des phrases découpées en colonnes"
    why: "Les LLM sont des réseaux de deep learning de type transformer. Ni règles de grammaire, ni gradient boosting."
  - id: donnees-etiquetees
    prompt: "Pourquoi entraîner un réseau depuis zéro demande-t-il souvent beaucoup d'exemples étiquetés ?"
    answer: "Parce qu'il doit apprendre lui-même ses représentations, avec des millions de poids à ajuster"
    decoys:
      - "Parce que chaque étiquette doit d'abord être validée par un expert avant d'être utilisée"
      - "Parce que le réseau ne peut apprendre qu'un seul exemple à la fois, très lentement"
    why: "Sans indicateurs écrits à la main, le réseau doit tout déduire des exemples ; avec autant de poids, il lui en faut beaucoup, sinon il surapprend. Le pré-entraînement réduit ce besoin."
  - id: hyperparametres
    prompt: "Quelle est la différence entre les poids et les hyperparamètres d'un réseau ?"
    answer: "Les poids sont appris pendant l'entraînement ; les hyperparamètres sont fixés par la personne qui l'entraîne"
    decoys:
      - "Les poids sont fixés par la personne qui entraîne ; les hyperparamètres sont appris par le réseau"
      - "Il n'y en a aucune : ce sont deux noms pour les mêmes valeurs, selon le framework utilisé"
    why: "Les poids évoluent à chaque mise à jour ; le taux d'apprentissage, la taille des lots ou l'architecture sont des choix de départ."
---
