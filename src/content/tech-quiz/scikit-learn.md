---
questions:
  - id: api-uniforme
    prompt: "Qu'est-ce qui rend les modèles de scikit-learn interchangeables dans le code ?"
    answer: "Une même API : fit pour apprendre, predict pour prédire, transform pour transformer"
    decoys:
      - "Un format de fichier commun dans lequel tous les modèles sont exportés après l'entraînement"
      - "Un serveur central qui choisit automatiquement le meilleur algorithme pour chaque jeu de données"
    why: "Tous les estimateurs exposent fit et predict, les transformateurs exposent transform : remplacer une régression logistique par une forêt aléatoire tient en une ligne. Aucun serveur ne choisit à votre place."
  - id: role-pipeline
    prompt: "À quoi sert un Pipeline dans scikit-learn ?"
    answer: "Enchaîner prétraitement et modèle pour appliquer les mêmes étapes à l'entraînement et à la prédiction"
    decoys:
      - "Répartir l'entraînement d'un modèle sur plusieurs machines d'un cluster"
      - "Planifier l'exécution quotidienne d'un entraînement, comme un orchestrateur"
    why: "Le Pipeline regroupe les transformations et le modèle en un seul estimateur : elles sont apprises sur l'entraînement seulement, ce qui évite les fuites du jeu de test. Ni distribution, ni planification."
  - id: terrain-de-jeu
    prompt: "Sur quel type de problème scikit-learn est-il le plus à sa place ?"
    answer: "Du ML classique sur des données tabulaires qui tiennent en mémoire"
    decoys:
      - "La reconnaissance d'images avec des réseaux de convolution entraînés sur GPU"
      - "L'entraînement de modèles de langage sur des corpus de texte massifs"
    why: "Régression, classification, clustering sur des colonnes bien définies : c'est son terrain. Images et texte bruts relèvent du deep learning (PyTorch, TensorFlow)."
  - id: gpu
    prompt: "scikit-learn est-il fait pour calculer sur GPU ?"
    answer: "Non : il tourne essentiellement sur CPU, le GPU n'est supporté qu'à titre expérimental pour quelques estimateurs"
    decoys:
      - "Oui : tous ses estimateurs basculent automatiquement sur le GPU dès qu'une carte compatible est détectée, sans aucune configuration"
      - "Oui, mais uniquement sur les TPU de Google Cloud"
    why: "scikit-learn est conçu pour le CPU ; un support expérimental via l'Array API concerne quelques estimateurs seulement. Le calcul sur GPU est le terrain de PyTorch ou TensorFlow."
  - id: validation-croisee
    prompt: "Pourquoi utiliser la validation croisée plutôt qu'un seul découpage entraînement / test ?"
    answer: "Pour estimer la performance sur plusieurs découpages et réduire l'effet du hasard"
    decoys:
      - "Pour entraîner le modèle plus vite, en parallèle sur plusieurs sous-ensembles"
      - "Pour supprimer automatiquement les lignes aberrantes du jeu de données"
    why: "La validation croisée entraîne et évalue le modèle sur plusieurs partitions des données : l'estimation de la performance dépend moins d'un découpage chanceux ou malchanceux."
  - id: fuite-de-donnees
    prompt: "Normaliser toutes les données avant de les découper en entraînement et test : quel est le problème ?"
    answer: "Une fuite : le jeu de test influence le prétraitement, l'évaluation devient trop optimiste"
    decoys:
      - "Aucun : la normalisation ne dépend pas des données, l'ordre des étapes n'a pas d'importance"
      - "scikit-learn refuse cette opération et lève une erreur avant l'entraînement"
    why: "Les moyennes et écarts-types calculés incluent alors le jeu de test. Mettre la normalisation dans un Pipeline garantit qu'elle n'est apprise que sur l'entraînement."
  - id: baseline
    prompt: "Pourquoi commencer un projet de ML par un modèle scikit-learn simple ?"
    answer: "Pour avoir une base de comparaison avant d'essayer plus compliqué"
    decoys:
      - "Parce que les modèles simples sont toujours les plus précis"
      - "Parce qu'un modèle complexe ne peut être entraîné qu'après un modèle simple"
    why: "Une baseline (régression logistique, forêt aléatoire) dit si un modèle plus lourd apporte vraiment quelque chose. Elle n'est pas toujours la meilleure, et rien n'impose cet ordre techniquement."
  - id: avec-xgboost
    prompt: "Comment XGBoost s'utilise-t-il avec scikit-learn ?"
    answer: "Ses estimateurs suivent l'API de scikit-learn : ils entrent dans un pipeline ou une validation croisée"
    decoys:
      - "XGBoost est un module interne de scikit-learn, installé avec lui"
      - "Il faut convertir le modèle XGBoost au format ONNX avant de l'évaluer avec scikit-learn"
    why: "XGBClassifier et XGBRegressor implémentent fit et predict : on profite des outils de scikit-learn (pipelines, recherche d'hyperparamètres). XGBoost reste une bibliothèque séparée."
  - id: trop-gros
    prompt: "Les données d'entraînement ne tiennent plus dans la mémoire d'une machine. Que faire ?"
    answer: "Échantillonner, ou passer à un outil distribué comme Spark MLlib"
    decoys:
      - "Activer le mode cluster intégré à scikit-learn"
      - "Rien : scikit-learn lit les données depuis le disque au fur et à mesure"
    why: "scikit-learn travaille sur des données en mémoire, sur une machine, sans mode cluster. Au-delà, on échantillonne ou on passe à un moteur distribué."
  - id: non-supervise
    prompt: "Regrouper des clients en segments sans étiquette connue : que propose scikit-learn ?"
    answer: "Des algorithmes de clustering, comme k-means"
    decoys:
      - "Rien : il ne fait que de l'apprentissage supervisé"
      - "Une régression linéaire appliquée à chaque client séparément"
    why: "scikit-learn couvre aussi le non supervisé : clustering (k-means…), réduction de dimension. La régression demande une valeur cible à prédire, qui manque ici."
---
