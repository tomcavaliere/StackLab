---
name: A/B test
kind: concept
layers: []
tags: [data, standard]
difficulty: 2
summary: "Expérience contrôlée : on répartit les utilisateurs au hasard entre l'existant (A) et une variante (B) pour mesurer l'effet causal d'un changement."
integratesWith:
  - tech: tests-statistiques
    note: "L'analyse d'un A/B test est un test d'hypothèse : l'écart entre A et B dépasse-t-il ce que le hasard produirait ?"
  - tech: statistiques-descriptives
    note: "Avant de conclure, on décrit chaque groupe : effectifs, distribution de la métrique, valeurs atypiques."
---

## Problème résolu

Le taux de conversion a augmenté le mois où le nouveau bouton a été mis en ligne. Est-ce le bouton, ou la saison, une campagne marketing, un concurrent en panne ? Comparer un « avant » et un « après » mélange l'effet du changement avec tout le reste. Un A/B test répartit les utilisateurs **au hasard** entre l'existant (A, le **groupe de contrôle**) et la variante (B), **en même temps**. La seule différence systématique entre les groupes est le changement : un écart de métrique lui est donc attribuable. C'est ce qui fait de l'expérience aléatoire la méthode de référence pour établir un **effet causal**.

### Les étapes

1. **Formuler l'hypothèse** : « le nouveau bouton augmente le taux d'achat ».
2. **Choisir la métrique principale à l'avance**, celle qui décidera, et des **métriques de garde-fou** qui ne doivent pas se dégrader (temps de chargement, désinscriptions).
3. **Calculer la taille d'échantillon avant de lancer**, à partir de l'**effet minimal détectable** (le plus petit effet qui vaudrait la peine), du seuil α et de la puissance voulue. Elle fixe la durée du test.
4. **Répartir au hasard**, par utilisateur, et de façon stable : un même utilisateur voit toujours la même version.
5. **Laisser tourner la durée prévue**, de préférence en semaines complètes, car le comportement varie selon les jours.
6. **Analyser** avec le test adapté (test du χ² ou test de proportions pour un taux, t de Student pour une moyenne), avec l'intervalle de confiance de l'effet, puis décider.

## Quand l'utiliser

- Mesurer l'effet d'un changement de produit : interface, parcours d'inscription, prix, algorithme de recommandation, texte d'un e-mail.
- Trancher un désaccord par des données plutôt que par des opinions.
- Dès qu'il y a assez de trafic pour atteindre la taille d'échantillon dans un délai raisonnable.

## Quand l'éviter

- **Trafic trop faible** : la taille d'échantillon nécessaire prendrait des mois ; le test conclurait au hasard ou ne conclurait pas.
- **Effet qui ne se voit qu'à long terme** (fidélité sur un an) ou changement irréversible : la durée d'un test ne le capte pas.
- **Raisons éthiques ou légales** : on ne teste pas au hasard ce qui pourrait nuire à une partie des utilisateurs.
- **Groupes qui s'influencent** (réseau social, place de marché où acheteurs et vendeurs interagissent) : B change aussi l'expérience de A, et la comparaison est faussée.

Et les pièges, une fois lancé :

- **Regarder en continu et arrêter dès que c'est significatif** (*peeking*) : à force de vérifier, on finit par passer sous le seuil par hasard, ce qui gonfle les faux positifs. On attend la taille d'échantillon prévue (ou on utilise une méthode conçue pour le suivi continu).
- **Multiplier les métriques et les segments** jusqu'à trouver un écart significatif : c'est le problème des tests multiples.
- **Répartition déséquilibrée** (*sample ratio mismatch*) : si l'on attend 50/50 et qu'on observe un écart net, la répartition ou la collecte a un bug ; les résultats ne sont pas fiables.
- **Effet de nouveauté** : les utilisateurs cliquent sur ce qui est nouveau, puis l'effet retombe.
- Un **test A/A** (deux groupes qui voient la même version) vérifie que la chaîne de mesure ne trouve pas d'écart là où il n'y en a pas.

## Pour aller plus loin

- [Trustworthy Online Controlled Experiments, site du livre de référence (Kohavi, Tang, Xu)](https://experimentguide.com/)
- [OpenIntro Statistics, manuel libre et gratuit](https://www.openintro.org/book/os/)
