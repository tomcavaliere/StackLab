---
title: Machine learning
description: "Supervisé ou non, ML classique ou deep learning, bibliothèques, traitement des données, suivi et déploiement des modèles : quel outil pour quel besoin ?"
questions:
  - id: predire-la-resiliation
    prompt: "Prédire quels clients vont résilier, à partir de l'historique des résiliations passées"
    answer: apprentissage-supervise
    decoy: apprentissage-non-supervise
    why: "L'apprentissage supervisé apprend à partir d'exemples dont on connaît déjà la bonne réponse (résilié ou non). Le non supervisé ne prédit pas une réponse connue."
  - id: segmenter-les-clients
    prompt: "Faire émerger des types de clients à partir de leurs achats, alors qu'aucune catégorie n'existe encore"
    answer: apprentissage-non-supervise
    decoy: apprentissage-supervise
    why: "Le clustering regroupe ce qui se ressemble sans étiquettes, c'est le cas de la segmentation client. Le supervisé suppose des exemples étiquetés."
  - id: capteurs-qui-derivent
    prompt: "Repérer une machine dont les capteurs dérivent, sans jamais avoir étiqueté d'incident"
    answer: apprentissage-non-supervise
    decoy: apprentissage-supervise
    why: "La détection d'anomalies sans exemples d'anomalies relève du non supervisé (Isolation Forest, par exemple). Le supervisé a besoin de cas étiquetés."
  - id: prix-d-un-appartement
    prompt: "Estimer le prix d'un appartement d'après sa surface, son quartier et son étage, à partir de ventes passées"
    answer: apprentissage-supervise
    decoy: apprentissage-non-supervise
    why: "C'est une régression supervisée : la réponse est un nombre connu pour les ventes passées. Le non supervisé cherche une structure, pas une valeur à prédire."
  - id: tabulaire-performant
    prompt: "Classer des clients à partir d'un tableau de quelques dizaines de colonnes, avec le meilleur modèle sans réseau de neurones"
    answer: xgboost
    decoy: pytorch
    why: "Le gradient boosting est une référence sur les données tabulaires et s'entraîne sur CPU. PyTorch y est surdimensionné."
  - id: baseline-classique
    prompt: "Construire une référence simple et solide, avec prétraitement, validation croisée et modèles classiques sur un tableau en mémoire"
    answer: scikit-learn
    decoy: tensorflow
    why: "scikit-learn rassemble prétraitement, modèles classiques et évaluation derrière une même API fit / predict. TensorFlow est un framework de deep learning."
  - id: images-de-pieces-defectueuses
    prompt: "Repérer sur des photos les pièces défectueuses d'une chaîne de production, en entraînant un réseau sur GPU"
    answer: pytorch
    decoy: scikit-learn
    why: "PyTorch fournit tenseurs sur GPU et différentiation automatique pour le deep learning sur images. scikit-learn n'est pas conçu pour les réseaux de neurones profonds et tourne surtout sur CPU."
  - id: deploiement-sur-mobile
    prompt: "Déployer un réseau de neurones sur des appareils mobiles et embarqués avec un outillage mature"
    answer: tensorflow
    decoy: xgboost
    why: "TensorFlow a LiteRT pour le mobile et l'embarqué, et TensorFlow.js pour le navigateur. XGBoost est une bibliothèque de gradient boosting pour données tabulaires."
  - id: donnees-brutes-non-structurees
    prompt: "Classer automatiquement des e-mails de support par motif, à partir du texte libre"
    answer: deep-learning
    decoy: xgboost
    why: "Le deep learning domine sur les données non structurées comme le texte, l'image ou l'audio. XGBoost vise des colonnes bien définies, pas du texte brut."
  - id: petit-fichier-clients
    prompt: "Prédire la fraude à partir d'un petit fichier de transactions en lignes et colonnes, avec un modèle simple à entraîner et à expliquer"
    answer: xgboost
    decoy: deep-learning
    why: "Sur de petites données tabulaires, le gradient boosting est souvent aussi bon ou meilleur, plus simple à entraîner et à expliquer. Le réseau de neurones surapprend vite avec peu d'exemples."
  - id: nettoyer-un-csv
    prompt: "Explorer, nettoyer et remodeler un export CSV dans un notebook, sur des données qui tiennent en mémoire"
    answer: pandas
    decoy: spark
    why: "pandas charge les données en mémoire et s'utilise immédiatement dans un notebook. Spark ajoute un cluster dont le coût de démarrage dépasse le gain sur de petits volumes."
  - id: fichiers-plus-gros-que-la-memoire
    prompt: "Écrire en SQL des transformations sur des fichiers Parquet plus gros que la mémoire, toujours sur une seule machine"
    answer: duckdb
    decoy: pandas
    why: "DuckDB lit directement le Parquet et traite des fichiers plus gros que la mémoire. pandas charge tout en mémoire."
  - id: preparer-des-volumes-de-cluster
    prompt: "Préparer pour l'entraînement des données du data lake qui dépassent une machine, avec une logique en Python"
    answer: spark
    decoy: pandas
    why: "Spark répartit le calcul sur un cluster et sert aussi à la préparation de données pour le ML. pandas s'exécute sur une seule machine."
  - id: suivre-les-experiences
    prompt: "Savoir quelle exécution d'entraînement, avec quels paramètres et quel score, a produit quel modèle, et pouvoir revenir en arrière"
    answer: mlflow
    decoy: airflow
    why: "MLflow enregistre paramètres, métriques et artefacts de chaque exécution, et versionne les modèles dans un registre. Airflow planifie les étapes, il ne garde pas la trace des expériences."
  - id: planifier-l-entrainement
    prompt: "Déclencher chaque nuit le réentraînement d'un modèle, en enchaînant extraction des données, entraînement et déploiement"
    answer: airflow
    decoy: mlflow
    why: "Planifier et enchaîner les étapes d'un pipeline est le rôle d'un orchestrateur. La fiche de MLflow précise qu'il ne le fait pas."
  - id: tout-le-cycle-sur-aws
    prompt: "Entraîner et servir des modèles sur des instances à la demande, avec des données dans S3, sans gérer les serveurs ni les GPU"
    answer: aws-sagemaker
    decoy: mlflow
    why: "SageMaker fournit en service managé les jobs d'entraînement, le registre et les endpoints d'inférence, avec S3 pour les données. MLflow suit les expériences mais n'exécute pas l'entraînement sur des instances managées."
  - id: rester-portable
    prompt: "Suivre ses expériences et versionner ses modèles en restant indépendant d'un cloud, en local ou sur un serveur maison"
    answer: mlflow
    decoy: aws-sagemaker
    why: "MLflow tourne en local, sur un serveur maison ou en offre managée. SageMaker lie fortement à AWS."
  - id: regrouper-sans-etiquettes
    prompt: "Regrouper les profils d'un tableau de clients par k-means, avec une API fit / transform commune à tous les modèles"
    answer: scikit-learn
    decoy: xgboost
    why: "scikit-learn fournit clustering, réduction de dimension et prétraitement derrière la même API. XGBoost est du gradient boosting, utilisé pour prédire une réponse connue."
  - id: texte-sans-etiquettes
    prompt: "Résumer des textes libres, sans exemples étiquetés ni envie d'entraîner un réseau de neurones"
    answer: llm
    decoy: deep-learning
    why: "Pour le texte, la fiche du deep learning conseille de vérifier avant tout si un LLM existant suffit. Un LLM se pilote par une consigne, sans entraînement."
  - id: partir-d-un-modele-pre-entraine
    prompt: "Adapter à son cas un modèle déjà entraîné sur de grandes quantités de texte, au lieu d'entraîner un réseau depuis zéro"
    answer: hugging-face
    decoy: scikit-learn
    why: "Le Hub de Hugging Face publie des modèles pré-entraînés, à affiner avec transformers sur ses propres données. scikit-learn n'est pas conçu pour les réseaux de neurones profonds."
---
