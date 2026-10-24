---
name: Statistiques descriptives
kind: concept
layers: []
tags: [data, standard]
difficulty: 1
summary: "Résumer un jeu de données en quelques nombres et graphiques : où se situent les valeurs (moyenne, médiane), à quel point elles varient (écart-type, quartiles), quelle forme a leur distribution."
integratesWith:
  - tech: ggplot2
    note: "Histogrammes, boîtes à moustaches et nuages de points : les graphiques de base de la description."
  - tech: pandas
    note: "describe() donne en une ligne le résumé de chaque colonne numérique d'un DataFrame."
---

## Problème résolu

Un tableau de dix mille lignes ne se lit pas. Avant tout test ou tout modèle, il faut savoir à quoi ressemblent les données : quelles valeurs sont typiques, lesquelles sont rares, s'il y a des erreurs ou des valeurs manquantes. Les statistiques descriptives résument un jeu de données en quelques indicateurs et graphiques. Elles décrivent les données observées ; tirer des conclusions au-delà (sur toute une population) relève de l'inférence, avec les tests statistiques.

### La position : autour de quoi les valeurs se situent

- **Moyenne** : la somme divisée par le nombre de valeurs. Elle est **sensible aux valeurs extrêmes** : quelques très hauts salaires suffisent à la tirer vers le haut.
- **Médiane** : la valeur du milieu, qui coupe les données en deux moitiés. Elle est **robuste** : les valeurs extrêmes la déplacent peu.
- **Mode** : la valeur la plus fréquente, utile surtout pour une variable catégorielle.

Quand la moyenne et la médiane sont très différentes, la distribution est asymétrique : il faut regarder les deux.

### La dispersion : à quel point les valeurs varient

- **Étendue** : le maximum moins le minimum. Simple, mais déterminée par deux valeurs seulement.
- **Variance** : la moyenne des carrés des écarts à la moyenne. **Écart-type** : sa racine carrée, exprimée dans la même unité que les données, donc plus parlante.
- **Quartiles** : Q1, la médiane et Q3 coupent les données en quatre parts égales. L'**écart interquartile** (Q3 − Q1) contient la moitié centrale des valeurs, et reste robuste aux extrêmes.
- **Quantiles** et percentiles généralisent l'idée : le 90ᵉ percentile est la valeur sous laquelle se trouvent 90 % des observations.

### La forme : la distribution

- **Histogramme** : la répartition des valeurs par intervalles. Il montre si la distribution est symétrique, asymétrique, à un ou plusieurs pics.
- **Asymétrie** : une longue queue vers la droite (revenus, temps de réponse) place la moyenne au-dessus de la médiane.
- **Boîte à moustaches** (*boxplot*) : la boîte va de Q1 à Q3, le trait intérieur est la médiane, les moustaches couvrent le reste des valeurs, et les points isolés au-delà signalent des **valeurs atypiques**.
- **Loi normale** : la courbe en cloche, symétrique. Pour une distribution normale, environ 68 % des valeurs sont à moins d'un écart-type de la moyenne et environ 95 % à moins de deux. Beaucoup de données réelles ne sont pas normales : il faut le vérifier, pas le supposer.

### La relation entre deux variables

- **Nuage de points** : chaque observation est un point, une variable par axe.
- **Corrélation** (de Pearson) : un nombre entre −1 et 1 qui mesure à quel point deux variables évoluent ensemble **de façon linéaire**. 0 veut dire « pas de relation linéaire », pas « pas de relation ».
- **Corrélation n'est pas causalité** : les ventes de glaces et les noyades augmentent ensemble, parce que l'été fait monter les deux. Une troisième variable (une variable confondante) peut expliquer la relation.

### En pratique

```r
summary(clients$panier)          # R : minimum, quartiles, médiane, moyenne, maximum
sd(clients$panier, na.rm = TRUE) # écart-type
quantile(clients$panier, 0.9)    # 90e percentile
cor(clients$age, clients$panier) # corrélation de Pearson
```

```python
clients["panier"].describe()     # pandas : effectif, moyenne, écart-type, min, quartiles, max
clients["age"].corr(clients["panier"])
```

## Quand l'utiliser

- Toujours en premier, avant un test, un modèle ou un tableau de bord : repérer les erreurs de saisie, les valeurs manquantes et les valeurs atypiques.
- Pour communiquer un résultat simple : « le panier médian est de… », avec la dispersion pour donner l'ordre de grandeur.
- Pour choisir la suite : une distribution très asymétrique ou des valeurs atypiques changent le choix du test ou du modèle.

## Quand l'éviter

Les indicateurs ne s'évitent pas, mais certains usages trompent :

- **Une moyenne seule sur des données asymétriques** (salaires, prix, durées) : donner la médiane, ou les deux.
- **Des chiffres sans graphique** : des jeux de données très différents (le quartet d'Anscombe en est l'exemple classique) peuvent avoir la même moyenne, la même variance et la même corrélation. Toujours tracer les données.
- **La moyenne de moyennes** : moyenner les paniers moyens de deux magasins sans tenir compte de leur nombre de clients donne un mauvais résultat global.
- **Le paradoxe de Simpson** : une tendance observée dans chaque groupe peut s'inverser quand on regroupe les données. Regarder aussi les sous-groupes.
- **Conclure sur toute une population** à partir d'un petit échantillon : c'est le rôle des tests et des intervalles de confiance.

## Pour aller plus loin

- [OpenIntro Statistics, manuel libre et gratuit](https://www.openintro.org/book/os/)
- [Documentation de pandas : describe()](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.describe.html)
