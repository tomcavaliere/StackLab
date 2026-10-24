---
questions:
  - id: probleme
    prompt: "Quel problème ggplot2 résout-il ?"
    answer: "Changer de graphique sans tout réécrire : il décrit un graphique par des éléments indépendants qu'on combine"
    decoys:
      - "Mettre à jour en continu des tableaux de bord consultés par toute une équipe, à partir de métriques en direct"
      - "Rendre interactifs les graphiques de R, avec survol, zoom et filtres directement dans le navigateur"
    why: "Dans beaucoup d'outils, chaque graphique est une fonction à part. ggplot2 applique une grammaire : données, esthétique, géométries, facettes. Les dashboards en continu relèvent de Grafana."
  - id: grammaire
    prompt: "Sur quelle idée ggplot2 est-il fondé ?"
    answer: "La grammaire des graphiques de Leland Wilkinson"
    decoys:
      - "Le modèle des tableurs, où chaque graphique part d'une plage de cellules"
      - "Le langage SQL, où chaque graphique est une requête sur une table"
    why: "La grammaire des graphiques décrit un graphique comme une combinaison d'éléments indépendants."
  - id: auteur
    prompt: "Qui a créé ggplot2 ?"
    answer: "Hadley Wickham"
    decoys:
      - "Leland Wilkinson"
      - "Ross Ihaka"
    why: "Hadley Wickham a créé ggplot2, en s'appuyant sur la grammaire des graphiques de Leland Wilkinson. Ross Ihaka est l'un des créateurs de R."
  - id: tidyverse
    prompt: "Quel lien entre ggplot2 et le tidyverse ?"
    answer: "ggplot2 fait partie du tidyverse"
    decoys:
      - "ggplot2 remplace le tidyverse pour les graphiques et les deux ne se chargent jamais ensemble"
      - "Aucun : ggplot2 est un outil Python, le tidyverse un outil R"
    why: "ggplot2 est un des paquets du tidyverse : un tableau préparé avec dplyr se trace directement."
  - id: donnees
    prompt: "Quelles données ggplot2 attend-il, de préférence ?"
    answer: "Un data frame tidy : une ligne par observation"
    decoys:
      - "Un vecteur par série, à passer séparément à chaque couche"
      - "Une image déjà tracée, à laquelle on ajoute des couches"
    why: "ggplot2 part d'un data frame, idéalement tidy, dont il associe les colonnes à des propriétés visuelles."
  - id: aes
    prompt: "À quoi sert aes() ?"
    answer: "Associer des colonnes à des propriétés visuelles : axe x, axe y, couleur, taille"
    decoys:
      - "Choisir l'apparence générale du graphique : police, fond, quadrillage, marges"
      - "Enregistrer le graphique dans un fichier image, au format et à la taille choisis"
    why: "aes() (l'esthétique) décrit quelles colonnes vont où. L'apparence générale, c'est le thème ; l'enregistrement, ggsave()."
  - id: geom
    prompt: "Que représentent les fonctions geom_*() ?"
    answer: "La forme qui représente les données : points, lignes, barres, boîtes"
    decoys:
      - "Les calculs statistiques faits avant le tracé, comme la moyenne ou la médiane"
      - "Les panneaux du graphique, un par valeur d'une variable"
    why: "Les géométries sont les formes tracées. Les panneaux par valeur, ce sont les facettes."
  - id: nuage
    prompt: "Quelle géométrie trace un nuage de points ?"
    answer: "geom_point()"
    decoys:
      - "geom_col()"
      - "geom_line()"
    why: "geom_point() trace un point par observation. geom_col() trace des barres, geom_line() une courbe."
  - id: distribution
    prompt: "Quelle géométrie montre la distribution d'une variable numérique ?"
    answer: "geom_histogram()"
    decoys:
      - "geom_point()"
      - "geom_line()"
    why: "L'histogramme compte les valeurs par intervalles. On peut aussi utiliser geom_boxplot() pour comparer des groupes."
  - id: boxplot
    prompt: "Quelle géométrie compare la distribution d'une variable entre plusieurs groupes ?"
    answer: "geom_boxplot(), une boîte à moustaches par groupe"
    decoys:
      - "geom_smooth(), une courbe lissée par groupe"
      - "geom_col(), une barre par observation"
    why: "La boîte à moustaches résume chaque distribution (médiane, quartiles, valeurs atypiques) et se compare facilement d'un groupe à l'autre."
  - id: barres
    prompt: "Quelle géométrie trace des barres dont la hauteur est une valeur du tableau ?"
    answer: "geom_col()"
    decoys:
      - "geom_point()"
      - "geom_histogram()"
    why: "geom_col() trace une barre par ligne, de la hauteur de la valeur. geom_histogram() compte lui-même les valeurs par intervalles."
  - id: plus
    prompt: "Comment ajoute-t-on des couches à un graphique ggplot2 ?"
    answer: "Avec l'opérateur +"
    decoys:
      - "Avec le pipe |>, comme dans dplyr"
      - "Avec la fonction add_layer()"
    why: "ggplot(...) + geom_point() + labs(...) : chaque élément s'additionne au graphique."
  - id: facettes
    prompt: "À quoi sert facet_wrap(~ region) ?"
    answer: "Répéter le même graphique pour chaque région, en petits multiples"
    decoys:
      - "Colorer les points selon la région, sur un seul graphique"
      - "Trier les régions par ordre alphabétique sur l'axe x"
    why: "Les facettes découpent le graphique en panneaux, un par valeur d'une variable. Colorer, c'est l'esthétique colour."
  - id: couleur
    prompt: "Comment colorer les points selon la variable fidele ?"
    answer: "Ajouter colour = fidele dans aes()"
    decoys:
      - "Écrire geom_point(colour = \"fidele\") hors de aes()"
      - "Ajouter facet_wrap(~ fidele)"
    why: "Une couleur qui dépend d'une colonne est une esthétique : elle va dans aes(). Hors de aes(), colour fixe une seule couleur pour tous les points."
  - id: smooth
    prompt: "Que fait geom_smooth(method = \"lm\") ?"
    answer: "Ajoute une droite de régression linéaire, par groupe si une couleur est définie"
    decoys:
      - "Lisse les points en supprimant les valeurs atypiques du tableau avant le tracé du nuage de points"
      - "Remplace les points par une courbe qui passe par chacun d'eux"
    why: "geom_smooth() ajoute une tendance ; method = \"lm\" demande une régression linéaire."
  - id: labs
    prompt: "Avec quelle fonction donne-t-on un titre et des noms d'axes ?"
    answer: "labs()"
    decoys:
      - "aes()"
      - "theme()"
    why: "labs(title = …, x = …, y = …) gère les étiquettes. aes() associe les colonnes, theme() règle l'apparence."
  - id: theme
    prompt: "Que règle theme_minimal() ?"
    answer: "L'apparence générale du graphique"
    decoys:
      - "Le nombre de points affichés"
      - "Les colonnes utilisées sur les axes"
    why: "Les thèmes changent l'habillage (fond, quadrillage, polices), pas les données ni l'esthétique."
  - id: ggsave
    prompt: "Comment enregistrer le dernier graphique dans un fichier ?"
    answer: "ggsave(\"panier.png\", width = 8, height = 5)"
    decoys:
      - "export(\"panier.png\", plot = last)"
      - "save.plot(\"panier.png\")"
    why: "ggsave() enregistre le dernier graphique, au format déduit de l'extension."
  - id: changer-geom
    prompt: "On veut passer d'un nuage de points à des boîtes à moustaches. Que faut-il changer ?"
    answer: "Souvent une seule ligne : remplacer geom_point() par geom_boxplot()"
    decoys:
      - "Tout réécrire : chaque type de graphique a sa propre fonction et ses propres options"
      - "Retransformer les données avec pivot_longer() avant chaque changement de type"
    why: "Données et esthétique restent les mêmes : seule la géométrie change. C'est l'intérêt de la grammaire."
  - id: exploration
    prompt: "Pourquoi ggplot2 est-il utile pour explorer des données ?"
    answer: "On voit une distribution, une relation ou une différence entre groupes en quelques lignes"
    decoys:
      - "Il calcule à notre place les tests statistiques et donne les p-values sur le graphique"
      - "Il corrige automatiquement les valeurs manquantes et atypiques avant de tracer"
    why: "Quelques lignes suffisent pour regarder les données sous plusieurs angles. Les tests restent à faire à part."
  - id: reproductible
    prompt: "Pourquoi un graphique ggplot2 est-il dit reproductible ?"
    answer: "Le code qui le produit se relance quand les données changent"
    decoys:
      - "Il est enregistré avec une copie chiffrée de ses données"
      - "Il ne peut être modifié qu'en passant par RStudio"
    why: "Le graphique est décrit par du code : on le régénère à l'identique avec de nouvelles données, sans retouche à la main."
  - id: facettes-usage
    prompt: "Pourquoi les facettes sont-elles pratiques avec de nombreux groupes ?"
    answer: "Elles produisent un panneau par groupe en une ligne, au lieu d'un graphique par groupe à la main"
    decoys:
      - "Elles fusionnent tous les groupes en une seule courbe moyenne, plus facile à lire qu'une série de panneaux séparés"
      - "Elles cachent les groupes trop petits pour ne garder que les principaux"
    why: "facet_wrap() répète le graphique pour chaque valeur : comparer vingt groupes ne demande pas vingt graphiques."
  - id: dashboard
    prompt: "Une équipe veut un tableau de bord qui se met à jour en continu. ggplot2 est-il le bon outil ?"
    answer: "Non : un outil de dashboards comme Grafana convient mieux"
    decoys:
      - "Oui : ggplot2 rafraîchit ses graphiques automatiquement toutes les minutes"
      - "Oui, à condition d'enregistrer le graphique avec ggsave() à chaque mise à jour"
    why: "ggplot2 produit des graphiques d'analyse ou de publication. Un tableau de bord vivant, consulté par une équipe, relève d'un outil de dashboards."
  - id: interactif
    prompt: "Peut-on survoler ou zoomer dans un graphique ggplot2 ?"
    answer: "Pas directement : ggplot2 produit des images fixes"
    decoys:
      - "Oui : tout graphique ggplot2 est interactif dans le navigateur"
      - "Oui, en ajoutant + interactive() au graphique"
    why: "Pour de l'interactivité, il faut un paquet complémentaire ou un autre outil."
  - id: python
    prompt: "En Python, quelle bibliothèque reprend la même grammaire que ggplot2 ?"
    answer: "plotnine"
    decoys:
      - "pandas"
      - "scikit-learn"
    why: "plotnine reprend la grammaire de ggplot2. matplotlib et seaborn sont les autres bibliothèques courantes de graphiques en Python."
  - id: langage
    prompt: "Dans quel langage utilise-t-on ggplot2 ?"
    answer: "R"
    decoys:
      - "Python"
      - "SQL"
    why: "ggplot2 est un paquet R, membre du tidyverse."
  - id: couche-tendance
    prompt: "Que donne ggplot(df, aes(age, panier)) + geom_point() + geom_smooth(method = \"lm\") ?"
    answer: "Le nuage de points avec une droite de régression par-dessus"
    decoys:
      - "Deux graphiques séparés, l'un sous l'autre, à la même échelle"
      - "Une erreur : une seule géométrie par graphique"
    why: "Les couches s'empilent : les points d'abord, puis la tendance, sur le même graphique."
  - id: esthetique-fixe
    prompt: "Que fait geom_point(alpha = 0.5) ?"
    answer: "Rend tous les points semi-transparents, ce qui aide quand ils se superposent"
    decoys:
      - "N'affiche qu'un point sur deux, choisi au hasard, pour alléger un graphique trop chargé"
      - "Rend les points deux fois plus petits que la taille par défaut"
    why: "Hors de aes(), un argument fixe une propriété pour toute la couche. alpha règle la transparence."
  - id: tidy-avant
    prompt: "Les ventes sont dans un tableau avec une colonne par mois. Que faire avant de tracer une courbe par mois avec ggplot2 ?"
    answer: "Passer le tableau en format tidy avec pivot_longer(), pour avoir une colonne mois"
    decoys:
      - "Rien : ggplot2 lit chaque colonne comme une série et trace tout seul une courbe par colonne"
      - "Créer un graphique par colonne puis les assembler avec le signe + pour obtenir une courbe par mois"
    why: "ggplot2 associe des colonnes à l'esthétique : il faut que le mois soit une colonne pour pouvoir le mettre sur l'axe x."
  - id: publication
    prompt: "Pour quel usage ggplot2 est-il particulièrement réputé ?"
    answer: "Des graphiques soignés pour des rapports et des publications"
    decoys:
      - "Des animations 3D temps réel pour le jeu vidéo"
      - "Des cartes interactives pour les applications mobiles"
    why: "ggplot2 produit des graphiques de qualité publication, reproductibles par le code."
---
