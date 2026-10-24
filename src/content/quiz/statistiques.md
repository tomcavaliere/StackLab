---
title: Statistiques
description: "Décrire, tester, modéliser, expérimenter : quel outil ou quelle méthode pour quelle question sur des données ?"
questions:
  - id: resumer-une-variable
    prompt: "Savoir à quoi ressemblent les paniers des clients avant toute analyse"
    answer: statistiques-descriptives
    decoy: regression
    why: "On décrit d'abord : médiane, dispersion, valeurs atypiques. Une régression vient ensuite, quand on cherche à expliquer le panier par d'autres variables."
  - id: ecart-du-au-hasard
    prompt: "Savoir si l'écart de panier moyen entre deux groupes de clients peut être dû au hasard"
    answer: tests-statistiques
    decoy: statistiques-descriptives
    why: "La description montre l'écart ; seul un test dit s'il est trop grand pour s'expliquer par l'échantillon."
  - id: effet-a-age-egal
    prompt: "Mesurer l'effet de l'ancienneté sur le panier, à âge et à région égaux"
    answer: regression
    decoy: tests-statistiques
    why: "Un test compare deux groupes ; la régression multiple isole l'effet d'une variable en fixant les autres."
  - id: effet-causal-bouton
    prompt: "Établir que c'est le nouveau bouton, et non la saison, qui fait monter les achats"
    answer: ab-test
    decoy: regression
    why: "Une régression sur des données observées laisse la place aux variables confondantes. La répartition au hasard, en même temps, isole l'effet du bouton."
  - id: probabilite-resiliation
    prompt: "Estimer la probabilité qu'un client résilie, avec des coefficients qu'on peut expliquer"
    answer: regression
    decoy: ab-test
    why: "La régression logistique modélise une probabilité à partir de variables observées. Un A/B test mesure l'effet d'un changement, il ne prédit rien."
  - id: taille-echantillon
    prompt: "Décider combien d'utilisateurs il faut avant de tester une nouvelle page d'accueil"
    answer: ab-test
    decoy: statistiques-descriptives
    why: "Le calcul de la taille d'échantillon, à partir de l'effet minimal détectable, est une étape de la conception d'un A/B test."
  - id: mediane-ou-moyenne
    prompt: "Présenter honnêtement des salaires très asymétriques"
    answer: statistiques-descriptives
    decoy: tests-statistiques
    why: "Médiane plutôt que moyenne seule, avec la dispersion : c'est une question de description, pas de test."
  - id: vingt-sous-groupes
    prompt: "Ne pas conclure à tort après avoir comparé vingt sous-groupes de clients"
    answer: tests-statistiques
    decoy: ab-test
    why: "C'est le problème des tests multiples : corriger le seuil (Bonferroni) ou choisir à l'avance ce qu'on teste."
  - id: colonnes-mois
    prompt: "Passer dans R d'un tableau à une colonne par mois à une ligne par mois"
    answer: tidyverse
    decoy: ggplot2
    why: "pivot_longer(), du paquet tidyr, range les données. ggplot2 trace, il ne remodèle pas le tableau."
  - id: panneaux-par-region
    prompt: "Tracer le même nuage de points pour chaque région, en petits multiples"
    answer: ggplot2
    decoy: tidyverse
    why: "Les facettes (facet_wrap) de ggplot2 répètent le graphique par valeur d'une variable. dplyr et tidyr préparent les données."
  - id: tests-integres
    prompt: "Un langage où tests et modèles statistiques font partie du langage, avec les méthodes récentes disponibles en premier"
    answer: r
    decoy: python
    why: "t.test(), lm() ou glm() sont dans R de base, et le CRAN reçoit souvent les méthodes de leurs auteurs. Python demande scipy ou statsmodels."
  - id: modele-en-production
    prompt: "Intégrer un modèle de prédiction dans l'API de l'application"
    answer: python
    decoy: r
    why: "Python s'intègre bien plus facilement à une application et à une API. R n'est pas fait pour les services de production."
  - id: extraire-entrepot
    prompt: "Extraire soi-même de la base les lignes utiles, filtrées et agrégées, avant l'analyse"
    answer: sql
    decoy: r
    why: "Le calcul se fait là où sont les données, en SQL. R récupère ensuite un tableau de taille raisonnable, qui tient en mémoire."
  - id: graphique-rapport
    prompt: "Un graphique de rapport qui se régénère quand les données changent"
    answer: ggplot2
    decoy: statistiques-descriptives
    why: "Le graphique ggplot2 est décrit par du code, qu'on relance. Les statistiques descriptives disent quoi montrer, pas comment le tracer."
---
