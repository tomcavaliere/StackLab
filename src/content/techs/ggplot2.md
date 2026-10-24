---
name: ggplot2
kind: framework
layers: []
languages: [r]
tags: [open-source, data]
difficulty: 2
summary: "Bibliothèque de graphiques de R fondée sur une grammaire : on associe des colonnes à des propriétés visuelles, puis on empile des couches."
alternatives:
  - tech: grafana
    note: "Pour des tableaux de bord qui se mettent à jour en continu, et non des graphiques d'analyse ou de publication."
---

## Problème résolu

Dans beaucoup d'outils, chaque type de graphique est une fonction à part, avec ses propres options : passer d'un nuage de points à des histogrammes par groupe oblige à tout réécrire. ggplot2 (créé par Hadley Wickham, intégré au tidyverse) applique la **grammaire des graphiques** de Leland Wilkinson : un graphique se décrit par des éléments indépendants, qu'on combine.

### La grammaire

- **Les données** : un data frame, de préférence *tidy* (une ligne par observation).
- **L'esthétique** (`aes()`) : quelle colonne va sur l'axe x, sur l'axe y, en couleur, en taille.
- **Les géométries** (`geom_*`) : la forme qui représente les données. `geom_point()` pour un nuage de points, `geom_line()` pour une courbe, `geom_col()` pour des barres, `geom_histogram()` pour une distribution, `geom_boxplot()` pour une boîte à moustaches.
- **Les facettes** (`facet_wrap()`) : le même graphique répété pour chaque valeur d'une variable, en petits multiples.
- **Les échelles, les étiquettes et le thème** : couleurs, axes, titres (`labs()`), apparence générale (`theme_minimal()`).

On construit le graphique en additionnant les couches avec `+` :

```r
library(ggplot2)

ggplot(clients, aes(x = age, y = panier, colour = fidele)) +  # données et esthétique
  geom_point(alpha = 0.5) +                                  # une couche de points
  geom_smooth(method = "lm") +                               # une droite de régression par groupe
  facet_wrap(~ region) +                                     # un panneau par région
  labs(title = "Panier selon l'âge", x = "Âge", y = "Panier (€)") +
  theme_minimal()

ggsave("panier.png", width = 8, height = 5)                  # enregistrer le dernier graphique
```

Ce qui dépend d'une colonne va dans `aes()`. Un réglage fixe pour toute la couche va hors de `aes()` : `geom_point(alpha = 0.5)` rend tous les points semi-transparents (utile quand ils se superposent), `geom_point(colour = "red")` les colore tous en rouge. `geom_col()` trace une barre par ligne, de la hauteur de la valeur ; `geom_histogram()` compte lui-même les valeurs par intervalles.

Changer de représentation revient souvent à changer une seule ligne : remplacer `geom_point()` par `geom_boxplot()` montre la distribution par groupe, sans toucher aux données ni à l'esthétique.

## Quand l'utiliser

- Explorer des données dans R : voir une distribution, une relation, une différence entre groupes en quelques lignes.
- Graphiques de rapport ou de publication, soignés et reproductibles : le code qui les produit se relance quand les données changent.
- Comparer de nombreux groupes avec des facettes, ce qui serait fastidieux à la main.

## Quand l'éviter

- Tableau de bord qui se met à jour en continu, consulté par une équipe : un outil de dashboards (Grafana, outils de BI) convient mieux.
- Graphiques interactifs (survol, zoom) : ggplot2 produit des images fixes ; il faut un paquet complémentaire ou un autre outil.
- Travail en Python : on y utilise d'autres bibliothèques (matplotlib, seaborn, ou plotnine qui reprend la même grammaire).

## Pour aller plus loin

- [Documentation officielle de ggplot2](https://ggplot2.tidyverse.org/)
- [Chapitre visualisation de R for Data Science](https://r4ds.hadley.nz/data-visualize.html)
