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
---
