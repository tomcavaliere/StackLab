---
name: tidyverse
kind: framework
layers: []
languages: [r]
tags: [open-source, tabulaire, data]
difficulty: 1
summary: "Ensemble de paquets R qui partagent la même philosophie (des données « tidy ») pour importer, nettoyer, transformer et visualiser des tableaux de données."
alternatives:
  - tech: pandas
    note: "L'équivalent côté Python : un DataFrame et ses opérations de filtre, de regroupement et de jointure."
integratesWith:
  - tech: ggplot2
    note: "ggplot2 fait partie du tidyverse : un tableau préparé avec dplyr se trace directement."
  - tech: duckdb
    note: "DuckDB s'utilise aussi depuis R, pour des requêtes SQL rapides sur de gros fichiers avant de passer au tidyverse."
---

## Problème résolu

R de base a été conçu par couches successives : les fonctions n'ont pas toujours le même ordre d'arguments, ni le même style de résultat. Le tidyverse, porté par Hadley Wickham et la société Posit, est une collection de paquets qui partagent une même grammaire et une même idée des données. On l'installe et on le charge d'un coup : `install.packages("tidyverse")`, puis `library(tidyverse)`.

### Les données « tidy »

Une table est *tidy* (« rangée ») quand **chaque variable est une colonne, chaque observation une ligne, et chaque valeur une cellule**. Un tableau de ventes avec une colonne par mois n'est pas tidy : le mois est une variable, elle devrait être une colonne. Une fois les données rangées ainsi, les mêmes verbes s'appliquent partout.

### Les paquets principaux

- **dplyr** : transformer un tableau avec des verbes. `filter()` garde des lignes, `select()` choisit des colonnes, `mutate()` crée ou modifie une colonne, `arrange()` trie, `summarise()` résume, `group_by()` fait travailler les verbes suivants groupe par groupe, et les jointures (`left_join()`…) relient deux tables.
- **tidyr** : ranger les données. `pivot_longer()` passe de colonnes à lignes (une colonne par mois → une colonne `mois`), `pivot_wider()` fait l'inverse.
- **readr** : lire des fichiers plats (`read_csv()`), plus vite et avec des types mieux devinés que `read.csv()`.
- **ggplot2** : les graphiques (fiche dédiée).
- **tibble** (un data frame à l'affichage plus lisible), **stringr** (texte), **forcats** (facteurs), **lubridate** (dates), **purrr** (appliquer une fonction à chaque élément).

```r
library(tidyverse)

ventes <- read_csv("ventes.csv")

ventes |>
  filter(!is.na(montant)) |>               # garder les lignes renseignées
  mutate(ttc = montant * 1.2) |>           # nouvelle colonne
  group_by(ville) |>                       # les verbes suivants travaillent par ville
  summarise(total = sum(ttc), n = n()) |>  # une ligne par ville
  arrange(desc(total))                     # du plus grand au plus petit

# Une colonne par mois -> une ligne par (produit, mois)
ventes_mois |>
  pivot_longer(cols = janvier:decembre, names_to = "mois", values_to = "montant")
```

Les verbes s'enchaînent avec le pipe (`|>`, ou `%>%` dans le code plus ancien) : chaque étape reçoit le tableau de la précédente. Dans les verbes, on écrit le nom des colonnes directement, sans `df$`. Dans `summarise()`, `n()` compte les lignes de chaque groupe. Pour garder toutes les lignes en ajoutant le total de leur groupe, on remplace `summarise()` par `mutate()`.

## Quand l'utiliser

- Préparer des données dans R : nettoyage, recodage, regroupements, jointures, mise au format attendu par un modèle ou un graphique.
- Écrire une analyse lisible par d'autres : une suite de verbes se relit presque comme une phrase.
- Enseigner ou apprendre R : c'est par lui que commencent la plupart des cours récents.

## Quand l'éviter

- Données qui ne tiennent pas en mémoire : comme pandas, le tidyverse travaille en mémoire. Une base de données ou DuckDB (interrogeables depuis R) prennent le relais.
- Paquet ou script destiné à durer sans dépendances : le tidyverse évolue et a déjà rendu obsolètes certaines fonctions. Pour une bibliothèque minimale, R de base suffit souvent.
- Équipe qui travaille en Python : pandas fait le même travail dans l'écosystème de l'équipe.

## Pour aller plus loin

- [Site officiel du tidyverse](https://www.tidyverse.org/)
- [Documentation de dplyr](https://dplyr.tidyverse.org/)
- [R for Data Science, livre en ligne gratuit](https://r4ds.hadley.nz/)
