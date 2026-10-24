---
name: Statisticien
family: data
summary: "Tire des conclusions fiables à partir de données incomplètes : mesure les effets, leur incertitude, et ce qu'on peut vraiment en dire."
mission: "Conçoit les études et les expériences (quels échantillons, combien d'observations), décrit les données, teste des hypothèses et construit des modèles dont chaque coefficient s'interprète. Son livrable est une conclusion chiffrée, avec sa marge d'incertitude et ses limites."
stack:
  - step: Écrire le code d'analyse
    intro: "R est le langage historique de la statistique ; Python et SQL servent à aller chercher les données et à travailler avec les équipes data."
    techs:
      - { tech: r, essential: true, why: "Tests, modèles et graphiques sont dans le langage ; les méthodes récentes arrivent souvent d'abord sur le CRAN." }
      - { tech: python, why: "Le langage commun avec les data scientists et les data engineers, avec scipy et statsmodels pour les statistiques." }
      - { tech: sql, why: "Extraire soi-même les données de la base ou de l'entrepôt, sans dépendre de quelqu'un d'autre." }
  - step: Préparer les données
    intro: "Une analyse fiable commence par des données rangées : une ligne par observation, une colonne par variable, les valeurs manquantes repérées."
    techs:
      - { tech: tidyverse, essential: true, why: "Nettoyer, recoder, joindre et ranger les données dans R avec une grammaire cohérente." }
      - { tech: pandas, why: "La même préparation côté Python, quand l'équipe y travaille." }
  - step: Décrire et visualiser
    intro: "Avant tout test, regarder les données : distribution, dispersion, valeurs atypiques, relations entre variables."
    techs:
      - { tech: statistiques-descriptives, essential: true, why: "Moyenne ou médiane, écart-type, quartiles : savoir quel indicateur résume honnêtement une variable." }
      - { tech: ggplot2, essential: true, why: "Tracer en quelques lignes histogrammes, boîtes à moustaches et nuages de points, puis les graphiques du rapport." }
  - step: Tester des hypothèses
    intro: "Distinguer un vrai effet du hasard de l'échantillon, et organiser des expériences qui permettent de conclure sur une cause."
    techs:
      - { tech: tests-statistiques, essential: true, why: "Choisir le bon test, lire une p-value et un intervalle de confiance, éviter les tests multiples." }
      - { tech: ab-test, why: "Concevoir l'expérience : taille d'échantillon, répartition au hasard, durée, analyse." }
  - step: Modéliser
    intro: "Mesurer l'effet de plusieurs facteurs à la fois, avec une incertitude sur chaque effet."
    techs:
      - { tech: regression, essential: true, why: "Régression linéaire et logistique : des coefficients qui s'interprètent, à niveau égal des autres variables." }
      - { tech: apprentissage-supervise, why: "Quand le but devient de prédire plutôt que d'expliquer, et qu'on juge le modèle sur de nouvelles données." }
  - step: Partager l'analyse
    intro: "Le raisonnement compte autant que le résultat : code, graphiques et texte vont ensemble, et doivent pouvoir se relancer."
    techs:
      - { tech: jupyter, why: "Un document qui mêle le code, ses résultats et le texte qui les explique, avec un noyau R ou Python." }
---
