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
  - id: train-test-split
    prompt: "À quoi sert la fonction train_test_split de scikit-learn ?"
    answer: "Séparer les données en un jeu d'entraînement et un jeu de test"
    decoys:
      - "Répartir les données entre plusieurs machines pour accélérer l'apprentissage"
      - "Retirer des données les lignes dont une ou plusieurs valeurs sont manquantes"
    why: "Le jeu de test, mis de côté, sert à évaluer le modèle sur des exemples qu'il n'a jamais vus. La fonction ne distribue rien et ne nettoie rien."
  - id: standard-scaler
    prompt: "Que fait StandardScaler ?"
    answer: "Il centre et réduit chaque colonne : moyenne nulle, écart-type de 1"
    decoys:
      - "Il convertit les colonnes de texte en nombres, une colonne par valeur possible"
      - "Il supprime les colonnes qui n'apportent aucune information au modèle"
    why: "StandardScaler met toutes les colonnes numériques à la même échelle, ce qui compte pour de nombreux modèles. La conversion du texte, c'est le rôle d'un encodeur."
  - id: one-hot
    prompt: "Quel transformateur convertit une colonne de catégories en colonnes de 0 et de 1 ?"
    answer: "OneHotEncoder"
    decoys:
      - "StandardScaler, qui met les valeurs à la même échelle"
      - "SimpleImputer, qui remplace les valeurs manquantes par une valeur de substitution"
    why: "OneHotEncoder crée une colonne par catégorie, valant 1 quand la ligne appartient à cette catégorie. Les deux autres traitent l'échelle et les valeurs manquantes."
  - id: imputation
    prompt: "Comment traiter des valeurs manquantes avant d'entraîner un modèle scikit-learn classique ?"
    answer: "Les remplacer, par exemple avec SimpleImputer, au sein du pipeline"
    decoys:
      - "Rien à faire : tous les estimateurs apprennent normalement avec des valeurs manquantes"
      - "Supprimer toutes les colonnes concernées, c'est la seule option prévue par la bibliothèque"
    why: "Beaucoup d'estimateurs refusent les valeurs manquantes ; SimpleImputer les remplace, et le placer dans un Pipeline évite toute fuite vers le jeu de test."
  - id: column-transformer
    prompt: "À quoi sert ColumnTransformer ?"
    answer: "Appliquer des prétraitements différents selon les colonnes, par exemple numériques et catégorielles"
    decoys:
      - "Transformer un modèle entraîné en un tableau de colonnes lisible par pandas"
      - "Fusionner plusieurs colonnes en une seule en calculant leur moyenne automatiquement"
    why: "Un tableau mélange souvent des colonnes numériques et des catégories qui demandent des traitements différents ; ColumnTransformer les oriente chacune vers le bon."
  - id: grid-search
    prompt: "Que fait GridSearchCV ?"
    answer: "Il essaie des combinaisons d'hyperparamètres et les évalue par validation croisée"
    decoys:
      - "Il cherche dans les données les colonnes qui contiennent des doublons"
      - "Il parcourt toute la bibliothèque pour trouver seul l'algorithme le mieux adapté, sans qu'on lui en liste"
    why: "On fournit les valeurs à tester ; GridSearchCV entraîne et évalue chaque combinaison par validation croisée. Il ne choisit pas l'algorithme de lui-même."
  - id: desequilibre
    prompt: "Une classe (la fraude) ne représente qu'une petite part des exemples. Pourquoi l'exactitude (accuracy) peut-elle tromper ?"
    answer: "Un modèle qui prédit toujours la classe majoritaire obtient une exactitude élevée sans rien détecter"
    decoys:
      - "L'exactitude ne peut se calculer que sur des classes parfaitement équilibrées entre elles"
      - "L'exactitude mesure la vitesse de prédiction du modèle plutôt que la qualité de ses réponses"
    why: "Avec peu de cas positifs, répondre toujours « non » donne un bon pourcentage de bonnes réponses. Précision, rappel ou matrice de confusion renseignent mieux."
  - id: rappel
    prompt: "Qu'indique un rappel (recall) élevé pour un classifieur ?"
    answer: "Le modèle retrouve une grande part des cas positifs réels"
    decoys:
      - "La plupart des prédictions positives du modèle sont correctes"
      - "Le modèle donne la même réponse quand on relance l'entraînement sur les mêmes données"
    why: "Le rappel mesure la part des vrais positifs retrouvés ; la part de prédictions positives justes, c'est la précision. Les deux se lisent ensemble."
  - id: metrique-regression
    prompt: "Quelle famille de métriques pour évaluer une régression, comme la prédiction d'un prix ?"
    answer: "Une erreur moyenne entre valeurs prédites et réelles, comme l'erreur absolue moyenne"
    decoys:
      - "La matrice de confusion, qui compte les bonnes et les mauvaises classes prédites"
      - "Le score de silhouette, qui mesure la qualité des groupes formés par un clustering"
    why: "Une régression prédit un nombre : on mesure l'écart avec la valeur réelle. La matrice de confusion vaut pour la classification, la silhouette pour le clustering."
  - id: foret-aleatoire
    prompt: "Dans scikit-learn, qu'est-ce qu'une forêt aléatoire ?"
    answer: "Un ensemble d'arbres entraînés sur des échantillons différents, dont on combine les prédictions"
    decoys:
      - "Un arbre unique dont la profondeur est tirée au hasard à chaque appel de predict"
      - "Une suite d'arbres où chacun corrige les erreurs des précédents, comme en gradient boosting"
    why: "Les arbres sont entraînés indépendamment puis combinés. La correction successive des erreurs, c'est le boosting, celui de XGBoost."
  - id: regression-logistique
    prompt: "Malgré son nom, à quoi sert la régression logistique ?"
    answer: "À la classification, par exemple prédire oui ou non"
    decoys:
      - "À prédire une valeur continue, comme le prix d'un appartement"
      - "À regrouper des exemples sans étiquette en segments de profils proches"
    why: "La régression logistique estime la probabilité d'appartenir à une classe. La prédiction d'un prix relève d'une régression linéaire, le regroupement d'un clustering."
  - id: kmeans-k
    prompt: "En k-means, que représente le paramètre k ?"
    answer: "Le nombre de groupes à former, fixé avant l'apprentissage"
    decoys:
      - "Le nombre de voisins consultés pour attribuer une étiquette à un point"
      - "Le nombre de colonnes conservées après une réduction de dimension"
    why: "k-means demande à l'avance combien de groupes former. Le nombre de voisins est le paramètre d'un autre modèle, les k plus proches voisins."
  - id: acp
    prompt: "À quoi sert l'analyse en composantes principales (PCA) ?"
    answer: "Réduire le nombre de colonnes en gardant l'essentiel de la variation des données"
    decoys:
      - "Augmenter le nombre d'exemples en créant des copies légèrement modifiées des lignes"
      - "Mettre toutes les colonnes à la même échelle pour que le modèle les compare"
    why: "La PCA est une méthode de réduction de dimension : elle résume les colonnes en moins de composantes. La mise à l'échelle est le travail d'un scaler."
  - id: arbre-surappris
    prompt: "Un arbre de décision sans limite de profondeur est parfait sur l'entraînement mais mauvais sur le test. Quel est le problème ?"
    answer: "Du surapprentissage : limiter la profondeur ou passer à un ensemble d'arbres"
    decoys:
      - "Du sous-apprentissage : il faut ajouter des couches pour donner de la capacité à l'arbre"
      - "Une fuite de données : il faut mélanger les lignes avant de les découper en deux jeux"
    why: "Un arbre trop profond mémorise l'entraînement. Il se corrige en limitant sa profondeur ou en combinant plusieurs arbres. Les arbres n'ont pas de couches."
  - id: fit-sur-entrainement
    prompt: "Pourquoi appeler fit d'un transformateur uniquement sur l'entraînement, puis transform sur le test ?"
    answer: "Pour que les statistiques du prétraitement ne viennent que de l'entraînement"
    decoys:
      - "Parce que transform ne fonctionne pas sur le jeu d'entraînement, seulement sur de nouvelles données"
      - "Parce que fit est trop lent pour être exécuté sur deux jeux de données différents"
    why: "Le transformateur apprend ses paramètres (moyenne, catégories…) avec fit ; les calculer aussi sur le test ferait fuiter de l'information. Le Pipeline le fait automatiquement."
  - id: sauvegarde
    prompt: "Comment sauvegarder un modèle scikit-learn entraîné pour le réutiliser plus tard ?"
    answer: "Le sérialiser, par exemple avec joblib ou pickle"
    decoys:
      - "Au format SavedModel de TensorFlow, que toutes les bibliothèques de ML savent lire"
      - "Il faut le ré-entraîner à chaque lancement : rien n'est prévu pour l'enregistrer"
    why: "Un modèle scikit-learn est un objet Python, qu'on sérialise. Un fichier pickle ne se charge que s'il vient d'une source de confiance."
  - id: avec-pandas
    prompt: "Quel rôle joue pandas avec scikit-learn ?"
    answer: "Il prépare les données en DataFrame que l'on passe ensuite aux estimateurs"
    decoys:
      - "Il remplace les estimateurs de scikit-learn par des modèles plus rapides"
      - "Il fournit le Pipeline, qui enchaîne les étapes de traitement et le modèle"
    why: "pandas manipule les tables ; scikit-learn apprend dessus. Le Pipeline fait partie de scikit-learn lui-même."
  - id: random-state
    prompt: "À quoi sert le paramètre random_state dans scikit-learn ?"
    answer: "Fixer le hasard pour obtenir des résultats reproductibles d'une exécution à l'autre"
    decoys:
      - "Choisir au hasard l'algorithme le plus adapté parmi ceux disponibles dans la bibliothèque"
      - "Mélanger les colonnes pour réduire le risque de surapprentissage du modèle"
    why: "Découpages, tirages et initialisations utilisent le hasard : fixer la graine rend l'exécution reproductible. Il ne choisit aucun algorithme."
  - id: stratify
    prompt: "À quoi sert le paramètre stratify de train_test_split ?"
    answer: "Conserver la même proportion de chaque classe dans l'entraînement et dans le test"
    decoys:
      - "Retirer des exemples de la classe majoritaire pour équilibrer les effectifs"
      - "Trier les exemples par classe avant de les découper en deux jeux consécutifs"
    why: "Avec une classe rare, un découpage au hasard peut en laisser très peu dans le test. La stratification garde les proportions, sans supprimer d'exemples."
  - id: dummy
    prompt: "Que fait DummyClassifier ?"
    answer: "Il prédit selon une règle triviale, comme la classe la plus fréquente, pour servir de point de comparaison"
    decoys:
      - "Il génère des données factices pour tester un pipeline sans données réelles disponibles"
      - "Il remplace un modèle absent par une valeur lue dans un fichier de configuration"
    why: "C'est une baseline minimale : un vrai modèle doit faire mieux qu'elle pour avoir un intérêt."
---
