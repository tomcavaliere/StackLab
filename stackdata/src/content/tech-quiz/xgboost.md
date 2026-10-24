---
questions:
  - id: principe-boosting
    prompt: "Quel est le principe du gradient boosting utilisé par XGBoost ?"
    answer: "Une suite d'arbres, chacun corrigeant les erreurs des précédents"
    decoys:
      - "Un seul arbre très profond, entraîné jusqu'à ne plus faire aucune erreur"
      - "Des arbres entraînés indépendamment sur des échantillons tirés au hasard, puis moyennés"
    why: "Le boosting est séquentiel : chaque nouvel arbre apprend ce que les précédents ont raté, et les prédictions s'additionnent. Les arbres indépendants moyennés, c'est la forêt aléatoire."
  - id: terrain
    prompt: "Sur quel type de données XGBoost est-il souvent la référence ?"
    answer: "Des données tabulaires structurées"
    decoys:
      - "Des images brutes"
      - "Des enregistrements audio non découpés"
    why: "Clients, transactions, capteurs : des colonnes bien définies. Pour des images ou du son bruts, le deep learning apprend lui-même les représentations."
  - id: images
    prompt: "Classer des photos de produits à partir des pixels : XGBoost est-il adapté ?"
    answer: "Non : c'est le terrain du deep learning (PyTorch, TensorFlow)"
    decoys:
      - "Oui : il suffit de donner chaque pixel comme une colonne, c'est la méthode recommandée"
      - "Oui : XGBoost intègre des couches de convolution depuis sa première version"
    why: "Des pixels ne sont pas des variables bien définies ; les réseaux de convolution apprennent les motifs visuels. XGBoost n'a pas de couches de neurones."
  - id: api-sklearn
    prompt: "Pourquoi XGBClassifier se glisse-t-il dans un pipeline scikit-learn ?"
    answer: "Il suit l'API de scikit-learn (fit, predict)"
    decoys:
      - "Il est livré avec scikit-learn, dont il est un module"
      - "scikit-learn convertit automatiquement tout modèle Python"
    why: "XGBoost fournit des classes compatibles avec l'API de scikit-learn, ce qui donne accès à ses pipelines et à sa validation croisée. Ce sont pourtant deux bibliothèques distinctes."
  - id: valeurs-manquantes
    prompt: "Comment XGBoost traite-t-il les valeurs manquantes ?"
    answer: "Nativement : il apprend de quel côté de chaque séparation les envoyer"
    decoys:
      - "Il refuse l'entraînement tant qu'il reste une valeur manquante"
      - "Il supprime automatiquement toutes les lignes incomplètes"
    why: "XGBoost gère les valeurs manquantes sans imputation préalable : chaque séparation apprend une direction par défaut pour elles."
  - id: sur-apprentissage
    prompt: "Quel risque principal à utiliser XGBoost sans réglage ni validation ?"
    answer: "Le sur-apprentissage"
    decoys:
      - "L'impossibilité de faire des prédictions sur de nouvelles données"
      - "Une consommation de GPU obligatoire, même pour de petits jeux"
    why: "Profondeur des arbres, taux d'apprentissage et nombre d'arbres se règlent par validation croisée ; sans cela, le modèle colle aux données d'entraînement. Le GPU reste optionnel."
  - id: gpu-optionnel
    prompt: "XGBoost a-t-il besoin d'un GPU ?"
    answer: "Non : il s'entraîne sur CPU, le GPU est une option pour accélérer"
    decoys:
      - "Oui : sans GPU, il refuse de démarrer"
      - "Oui, mais seulement pour la prédiction, pas pour l'entraînement"
    why: "XGBoost parallélise le calcul sur CPU et peut aussi utiliser un GPU. Ce n'est pas une obligation."
  - id: concurrents
    prompt: "Quelles bibliothèques jouent le même rôle que XGBoost ?"
    answer: "LightGBM et CatBoost"
    decoys:
      - "pandas et Polars"
      - "Keras et TensorFlow.js"
    why: "LightGBM et CatBoost sont deux autres bibliothèques de gradient boosting d'arbres. pandas et Polars manipulent des données, Keras et TensorFlow.js font du deep learning."
  - id: modele-explicable
    prompt: "Un petit jeu de données et un besoin d'expliquer simplement chaque décision : faut-il XGBoost ?"
    answer: "Pas forcément : une régression linéaire ou un arbre simple peuvent suffire"
    decoys:
      - "Oui : XGBoost est le modèle le plus simple à expliquer, avec un seul arbre lisible"
      - "Oui : sur un petit jeu de données, il faut toujours le modèle le plus complexe"
    why: "XGBoost combine de nombreux arbres, plus difficiles à lire qu'un seul. Sur peu de données, un modèle simple de scikit-learn est souvent suffisant et plus facile à expliquer."
  - id: distribue
    prompt: "Les données d'entraînement sont sur un cluster Spark. Comment entraîner XGBoost ?"
    answer: "Avec son intégration PySpark, qui entraîne sur le cluster"
    decoys:
      - "Impossible : XGBoost ne fonctionne que sur une seule machine"
      - "En exportant d'abord tout le jeu dans un fichier Excel"
    why: "XGBoost s'utilise aussi en distribué, avec Spark ou Dask, en plus de son usage sur une machine."
  - id: origine
    prompt: "Qui a lancé XGBoost, et quand ?"
    answer: "Tianqi Chen, en 2014"
    decoys:
      - "Google Brain, en 2015"
      - "Facebook AI Research, en 2016"
    why: "XGBoost est né en 2014 autour de Tianqi Chen, en open-source. Google (TensorFlow) et Facebook (PyTorch) sont à l'origine d'autres projets."
  - id: taux-apprentissage
    prompt: "Quel effet a un taux d'apprentissage plus bas dans XGBoost ?"
    answer: "Chaque arbre corrige moins : il faut plus d'arbres, mais le modèle généralise souvent mieux"
    decoys:
      - "Chaque arbre corrige davantage, ce qui permet d'en utiliser beaucoup moins pour le même résultat"
      - "Le modèle ignore davantage de colonnes à chaque arbre, ce qui accélère nettement l'entraînement"
    why: "Le taux d'apprentissage réduit la contribution de chaque arbre ; on compense par un plus grand nombre d'arbres, ce qui limite le sur-apprentissage."
  - id: profondeur
    prompt: "Que contrôle le paramètre max_depth dans XGBoost ?"
    answer: "La profondeur maximale de chaque arbre, donc la complexité de ce qu'il peut apprendre"
    decoys:
      - "Le nombre maximal d'arbres construits dans le modèle, tous confondus"
      - "Le nombre maximal de colonnes que chaque arbre a le droit d'utiliser"
    why: "Des arbres plus profonds capturent des interactions plus complexes mais sur-apprennent plus facilement. Le nombre d'arbres est un autre réglage."
  - id: nombre-arbres
    prompt: "Que règle le nombre d'arbres (n_estimators) dans XGBoost ?"
    answer: "Le nombre d'arbres ajoutés successivement au modèle"
    decoys:
      - "Le nombre de machines du cluster sur lesquelles l'entraînement est réparti"
      - "Le nombre de classes que le modèle devra distinguer en sortie"
    why: "Chaque arbre supplémentaire corrige les erreurs des précédents ; trop d'arbres finit par sur-apprendre, d'où la validation croisée."
  - id: arret-precoce
    prompt: "À quoi sert l'arrêt précoce (early stopping) dans XGBoost ?"
    answer: "Arrêter d'ajouter des arbres quand l'erreur sur un jeu de validation cesse de baisser"
    decoys:
      - "Interrompre le calcul dès que le GPU atteint sa température maximale de fonctionnement"
      - "Retirer du modèle les arbres les moins utiles une fois l'entraînement terminé"
    why: "Un jeu de validation indique le moment où de nouveaux arbres n'apportent plus rien : s'arrêter là limite le sur-apprentissage. Ce n'est pas un élagage a posteriori."
  - id: importances
    prompt: "Comment savoir quelles variables comptent le plus pour un modèle XGBoost ?"
    answer: "Avec les importances de variables que la bibliothèque fournit"
    decoys:
      - "En lisant directement les poids de chaque neurone de la première couche du modèle"
      - "Impossible : XGBoost ne permet aucune inspection de ce qu'il a appris"
    why: "XGBoost fournit des importances de variables, utiles pour comprendre le modèle. Elles indiquent ce qu'il utilise, pas une relation de cause. Il n'a pas de neurones."
  - id: regularisation
    prompt: "Qu'apporte la régularisation d'XGBoost ?"
    answer: "Elle pénalise la complexité des arbres pour limiter le sur-apprentissage"
    decoys:
      - "Elle remplit les valeurs manquantes avec la moyenne de chaque colonne avant l'entraînement"
      - "Elle régule le rythme d'envoi des requêtes vers le modèle une fois servi en production"
    why: "XGBoost est une implémentation optimisée et régularisée du gradient boosting : la pénalité sur la complexité retient les arbres de coller aux données. Les valeurs manquantes se gèrent autrement."
  - id: foret-vs-boosting
    prompt: "Quelle différence entre une forêt aléatoire et XGBoost ?"
    answer: "La forêt entraîne ses arbres indépendamment ; XGBoost les entraîne l'un après l'autre"
    decoys:
      - "La forêt entraîne ses arbres l'un après l'autre ; XGBoost les entraîne indépendamment"
      - "La forêt utilise des réseaux de neurones, XGBoost des arbres de décision"
    why: "La forêt moyenne des arbres indépendants ; le boosting enchaîne des arbres qui corrigent les erreurs précédentes. Les deux utilisent des arbres de décision."
  - id: pas-de-normalisation
    prompt: "Faut-il normaliser les colonnes numériques avant d'entraîner XGBoost ?"
    answer: "En général non : les arbres comparent des seuils, l'échelle des colonnes ne change pas leurs séparations"
    decoys:
      - "Oui : sans normalisation, XGBoost refuse de s'entraîner et lève une erreur"
      - "Oui : sans normalisation, le calcul sur GPU n'est tout simplement pas utilisable"
    why: "Un arbre sépare les lignes selon un seuil par colonne : mettre une colonne à une autre échelle ne change pas l'ordre des valeurs. Ce n'est pas le cas des modèles à base de distances."
  - id: resiliation
    prompt: "Prédire quels clients vont résilier d'après leur historique en colonnes : XGBoost est-il un bon candidat ?"
    answer: "Oui : ce sont des données tabulaires structurées, son terrain"
    decoys:
      - "Non : seuls les réseaux de neurones savent faire de la classification"
      - "Non : XGBoost ne fait que de la régression, jamais de la classification"
    why: "XGBClassifier traite ce type de problème, et le gradient boosting est souvent le modèle à battre sur du tabulaire. Il fait aussi bien de la classification que de la régression."
  - id: regression
    prompt: "XGBoost peut-il prédire une valeur numérique, comme un prix ?"
    answer: "Oui : XGBRegressor fait de la régression, XGBClassifier de la classification"
    decoys:
      - "Non : il ne sait que classer des exemples dans des catégories prédéfinies"
      - "Oui, mais seulement en l'associant à un réseau de neurones qui produit le nombre"
    why: "Les deux classes suivent l'API de scikit-learn, l'une pour prédire un nombre, l'autre une classe. Aucun réseau de neurones n'est nécessaire."
  - id: modele-a-battre
    prompt: "Pourquoi présente-t-on souvent XGBoost comme le modèle à battre sur des données tabulaires ?"
    answer: "Il donne souvent d'excellents résultats sans réseau de neurones et reste très présent dans les compétitions"
    decoys:
      - "Il est le seul modèle capable de traiter plusieurs centaines de colonnes sans les réduire d'abord"
      - "Il a été prouvé qu'il bat tous les autres algorithmes sur n'importe quel jeu de données"
    why: "C'est une référence empirique, pas une loi : sur du tabulaire, il est souvent difficile à battre. Aucun algorithme n'est le meilleur partout."
  - id: texte-brut
    prompt: "Faut-il XGBoost pour analyser le sens de phrases libres, sans les transformer au préalable ?"
    answer: "Non : du texte brut n'est pas une table de colonnes bien définies"
    decoys:
      - "Oui : il lit le texte directement et en comprend le sens mieux qu'un grand modèle de langage"
      - "Oui : il convertit lui-même les phrases en arbres de décision qu'il interprète ensuite"
    why: "XGBoost attend des colonnes bien définies. Pour le texte brut, le deep learning, un LLM ou des embeddings sont faits pour ça."
  - id: dask
    prompt: "Outre PySpark, quel moteur de calcul permet d'entraîner XGBoost de façon distribuée ?"
    answer: "Dask"
    decoys:
      - "Airflow, qui exécute les calculs eux-mêmes sur le cluster"
      - "Redis, qui répartit les arbres entre ses nœuds en mémoire"
    why: "XGBoost s'intègre avec Spark et Dask. Airflow orchestre des tâches et Redis stocke des données, ils n'entraînent pas de modèle."
  - id: autres-langages
    prompt: "Depuis quels langages peut-on utiliser XGBoost, en plus de Python ?"
    answer: "R et Java, entre autres"
    decoys:
      - "Uniquement Python : aucune autre interface n'est fournie par le projet"
      - "Seulement JavaScript, dans un navigateur, avec un moteur dédié au web"
    why: "XGBoost s'utilise aussi depuis R ou Java. Il n'est pas limité à Python, ni cantonné au navigateur."
  - id: choix-reglages
    prompt: "Comment choisir la profondeur des arbres, le taux d'apprentissage et le nombre d'arbres ?"
    answer: "En comparant des combinaisons par validation croisée"
    decoys:
      - "En gardant les valeurs par défaut, qui sont optimales pour tout jeu de données"
      - "En prenant toujours les valeurs les plus élevées possibles pour maximiser la précision"
    why: "Ces réglages dépendent des données et se comparent par validation croisée ; des valeurs trop élevées favorisent le sur-apprentissage."
  - id: arbre-seul
    prompt: "Pourquoi un arbre de décision seul est-il souvent insuffisant sur des données tabulaires ?"
    answer: "Il est trop simple ou il sur-apprend vite"
    decoys:
      - "Il ne sait pas traiter les colonnes numériques, seulement des catégories"
      - "Il demande obligatoirement un GPU pour s'entraîner sur un tableau"
    why: "Un arbre unique est soit trop simple, soit trop collé aux données ; le boosting en combine beaucoup pour corriger cela. Un arbre traite très bien les nombres et s'entraîne sur CPU."
  - id: deep-learning-prefere
    prompt: "Dans quel cas préférer le deep learning à XGBoost ?"
    answer: "Quand les entrées sont des images, du texte ou du son bruts"
    decoys:
      - "Quand les données tiennent dans un tableau de quelques colonnes bien définies"
      - "Quand on veut un modèle facile à entraîner et sans aucun réglage à prévoir"
    why: "Le deep learning apprend ses représentations à partir de données brutes. Pour un tableau, XGBoost est souvent aussi bon et plus simple."
  - id: volumes
    prompt: "Sur quels volumes XGBoost s'entraîne-t-il en un temps raisonnable sur CPU ?"
    answer: "Des volumes moyens"
    decoys:
      - "Uniquement des volumes minuscules, de quelques dizaines de lignes au plus"
      - "Tous, quelle que soit leur taille, sur n'importe quelle machine personnelle"
    why: "Il parallélise le calcul et s'entraîne sans GPU sur des volumes moyens ; au-delà, on passe au GPU ou au distribué (Spark, Dask)."
  - id: objectif
    prompt: "Que précise le paramètre objective d'XGBoost ?"
    answer: "La tâche et la fonction de perte à optimiser, comme une régression ou une classification binaire"
    decoys:
      - "Le serveur ou la machine sur laquelle l'entraînement sera lancé ensuite"
      - "La colonne du tableau qui contient la valeur à prédire pour chaque ligne"
    why: "objective fixe ce que le modèle optimise. La colonne cible est fournie séparément, à fit."
---
