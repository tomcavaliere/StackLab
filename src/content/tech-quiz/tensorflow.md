---
questions:
  - id: origine
    prompt: "Quelle entreprise a créé TensorFlow ?"
    answer: "Google"
    decoys:
      - "Meta (Facebook)"
      - "Microsoft"
    why: "TensorFlow vient de Google, open-source depuis 2015. PyTorch vient de Facebook AI Research."
  - id: keras
    prompt: "Quel est le rôle de Keras dans TensorFlow ?"
    answer: "L'API haut niveau pour décrire et entraîner un modèle"
    decoys:
      - "Le serveur qui expose les modèles entraînés derrière une API en production"
      - "Le format de fichier utilisé pour exécuter un modèle sur mobile"
    why: "Depuis TensorFlow 2, Keras est l'API recommandée : on empile des couches, puis fit entraîne. TF Serving sert les modèles, LiteRT les exécute sur mobile."
  - id: keras-3
    prompt: "Qu'a changé Keras 3 ?"
    answer: "Il est multi-backend : le même code tourne sur TensorFlow, JAX ou PyTorch"
    decoys:
      - "Il a été retiré de TensorFlow et remplacé par une API en JavaScript"
      - "Il ne fonctionne plus que sur les TPU de Google Cloud"
    why: "Keras 3 découple l'API de son moteur : TensorFlow, JAX ou PyTorch peuvent exécuter le même modèle."
  - id: tf2-eager
    prompt: "Quel changement majeur TensorFlow 2 (2019) a-t-il apporté ?"
    answer: "L'exécution immédiate par défaut et Keras comme API principale"
    decoys:
      - "L'abandon du GPU au profit du seul CPU"
      - "Le passage à une licence propriétaire réservée à Google Cloud"
    why: "TensorFlow 2 a rendu l'exécution immédiate par défaut, comme PyTorch, et fait de Keras l'API recommandée. Le projet reste open-source et utilise toujours les GPU."
  - id: litert
    prompt: "Qu'est-ce que LiteRT ?"
    answer: "Le nouveau nom de TensorFlow Lite, pour exécuter des modèles sur mobile et embarqué"
    decoys:
      - "Une version allégée de Keras réservée à l'apprentissage des débutants"
      - "Le service managé de Google Cloud pour entraîner des modèles TensorFlow"
    why: "LiteRT (anciennement TensorFlow Lite) fait tourner des modèles sur téléphones et appareils embarqués. C'est l'un des points forts de TensorFlow pour le déploiement."
  - id: tf-serving
    prompt: "À quoi sert TF Serving ?"
    answer: "Servir des modèles entraînés derrière une API"
    decoys:
      - "Entraîner un modèle dans le navigateur de l'utilisateur"
      - "Héberger des notebooks Jupyter partagés entre data scientists"
    why: "TF Serving est le serveur d'inférence de TensorFlow : il expose les modèles en production. Le navigateur, c'est TensorFlow.js."
  - id: navigateur
    prompt: "Faire tourner un modèle directement dans le navigateur : quel outil de l'écosystème TensorFlow ?"
    answer: "TensorFlow.js"
    decoys:
      - "TF Serving"
      - "Keras 3 avec le backend JAX"
    why: "TensorFlow.js exécute des modèles en JavaScript dans le navigateur. TF Serving tourne côté serveur, JAX est un backend Python."
  - id: tendance-recherche
    prompt: "Pour un nouveau projet de recherche en deep learning, quelle tendance observe-t-on ces dernières années ?"
    answer: "PyTorch s'est imposé comme le choix le plus courant"
    decoys:
      - "TensorFlow est devenu l'unique framework accepté dans les publications"
      - "Les deux frameworks ont été abandonnés au profit de scikit-learn"
    why: "Ces dernières années, PyTorch domine les nouveaux projets de recherche et l'écosystème Hugging Face. TensorFlow reste présent, notamment là où il est déjà en place et pour le déploiement."
  - id: quand-le-garder
    prompt: "Dans quel cas TensorFlow reste-t-il un choix naturel ?"
    answer: "Un projet existant en TensorFlow, ou un déploiement mobile et embarqué"
    decoys:
      - "Une analyse de quelques milliers de lignes dans un fichier CSV"
      - "Un simple appel à un modèle de langage hébergé chez un fournisseur externe, via son API"
    why: "L'existant, les compétences et l'outillage de déploiement (LiteRT, TensorFlow.js) justifient TensorFlow. Pour un petit CSV ou un appel d'API, il est surdimensionné."
  - id: tpu
    prompt: "Sur quel matériel spécifique à Google Cloud TensorFlow peut-il entraîner des modèles ?"
    answer: "Les TPU"
    decoys:
      - "Les FPGA"
      - "Les processeurs ARM des téléphones"
    why: "Les TPU sont les accélérateurs conçus par Google pour le machine learning, disponibles dans Google Cloud ; TensorFlow les exploite en plus des CPU et GPU."
---
