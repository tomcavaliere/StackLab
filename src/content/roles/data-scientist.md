---
name: Data scientist
family: data
summary: "Explore les données et construit des modèles qui expliquent ou prédisent."
mission: "Pose une question de prédiction ou de compréhension (qui va résilier ? quels clients se ressemblent ?), prépare les données, entraîne puis évalue des modèles. Son livrable est une réponse fiable et expliquée, pas forcément un système en production."
stack:
  - step: Écrire le code d'analyse
    intro: "Python est le langage de la data science ; SQL donne accès aux données qui vivent dans des bases."
    techs:
      - { tech: python, essential: true, why: "Le langage de la data science : bibliothèques d'analyse et de modélisation." }
      - { tech: sql, essential: true, why: "Va chercher les données là où elles sont stockées." }
  - step: Accéder aux données
    intro: "Les données d'entraînement viennent le plus souvent d'un entrepôt ou de la base de l'application."
    techs:
      - { tech: bigquery, why: "Entrepôt de Google Cloud, interrogé en SQL depuis un notebook." }
      - { tech: snowflake, why: "Entrepôt cloud fréquent dans les équipes data." }
      - { tech: postgresql, why: "Source courante pour un premier jeu de données." }
  - step: Explorer et préparer
    intro: "Avant tout modèle, on regarde les données : distributions, valeurs manquantes, anomalies. La qualité du modèle dépend de celle de cette étape."
    techs:
      - { tech: pandas, essential: true, why: "Charge, nettoie et agrège des tableaux de données en Python." }
      - { tech: duckdb, why: "Requêtes SQL rapides sur de gros fichiers, directement depuis un notebook." }
  - step: Comprendre les familles d'apprentissage
    intro: "Choisir une méthode commence par savoir si l'on dispose d'exemples déjà étiquetés."
    techs:
      - { tech: apprentissage-supervise, essential: true, why: "On apprend à partir d'exemples dont la réponse est connue : prédire une valeur ou une catégorie." }
      - { tech: apprentissage-non-supervise, why: "On cherche une structure sans réponse attendue : regrouper des clients, détecter des anomalies." }
  - step: Modéliser
    intro: "On part du modèle le plus simple qui marche : il est plus rapide à entraîner, plus facile à expliquer et sert de référence."
    techs:
      - { tech: scikit-learn, essential: true, why: "Boîte à outils de référence pour le machine learning classique, avec une API homogène." }
      - { tech: xgboost, why: "Arbres boostés : souvent le meilleur choix sur des données de type tableau." }
      - { tech: deep-learning, why: "Réseaux de neurones profonds : utiles sur images, texte et audio, plus coûteux en données et en calcul." }
      - { tech: pytorch, why: "Bibliothèque de deep learning, très utilisée en recherche et en prototypage." }
      - { tech: tensorflow, why: "Autre grande bibliothèque de deep learning, avec un outillage de déploiement étendu." }
      - { tech: hugging-face, why: "Hub de modèles préentraînés à réutiliser plutôt qu'entraîner de zéro." }
  - step: Suivre les expériences
    intro: "On teste beaucoup de variantes : sans trace de ce qui a été essayé, on ne retrouve plus quel modèle était le bon."
    techs:
      - { tech: mlflow, essential: true, why: "Enregistre paramètres, métriques et modèles de chaque essai pour les comparer." }
---
