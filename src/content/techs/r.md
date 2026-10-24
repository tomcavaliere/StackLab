---
name: R
kind: langage
layers: []
tags: [typage-dynamique, open-source, data]
difficulty: 2
summary: "Langage conçu pour les statistiques : vecteurs et tableaux de données natifs, tests et modèles statistiques intégrés, graphiques de qualité publication."
alternatives:
  - tech: python
    note: "Pour la data science généraliste, le machine learning et le deep learning, ou quand le code doit partir en production dans une application."
---

## Problème résolu

Faire des statistiques dans un langage généraliste demande d'assembler des bibliothèques. R part de l'autre côté : c'est un langage pensé pour l'analyse statistique, où le tableau de données, les valeurs manquantes, les tests et les modèles font partie du langage lui-même. Il a été créé par Ross Ihaka et Robert Gentleman à l'université d'Auckland au début des années 1990, comme une implémentation libre du langage S (né aux laboratoires Bell).

Sa force est son écosystème statistique. Le **CRAN** (*Comprehensive R Archive Network*) distribue des milliers de paquets, souvent écrits par les statisticiens qui ont inventé la méthode. Bioconductor fait de même pour la bio-informatique. Le **tidyverse** et **ggplot2** ont modernisé la manipulation et la visualisation des données. L'éditeur le plus utilisé est RStudio (de la société Posit) ; R tourne aussi dans Jupyter et dans VS Code.

## Quand l'utiliser

- Statistiques : tests, modèles, plans d'expérience, séries temporelles, statistiques bayésiennes. Les méthodes récentes y arrivent souvent en premier.
- Recherche et domaines où R est la norme : biostatistiques, épidémiologie, économie, sciences sociales.
- Rapports reproductibles qui mêlent code, résultats et texte (R Markdown, Quarto), et graphiques soignés avec ggplot2.

## Quand l'éviter

- Application web, API ou service de production : ce n'est pas son terrain, Python ou un langage de backend s'intègrent bien plus facilement.
- Deep learning et machine learning à grande échelle : l'écosystème vit surtout en Python (PyTorch, scikit-learn).
- Données qui ne tiennent pas en mémoire : R charge ses tableaux en mémoire, comme pandas. Une base, DuckDB ou Spark prennent alors le relais.
- Équipe de développeurs sans statisticien : la syntaxe et ses particularités (indices à partir de 1, recyclage des vecteurs) surprennent.

## Syntaxe

On lance le code dans la console R, dans RStudio ou dans un notebook. L'aide d'une fonction s'affiche avec `?mean`. Un commentaire commence par `#`.

### Variables et types

```r
nom <- "Ada"           # affectation : <- (le = fonctionne aussi)
age <- 36              # numeric (nombre à virgule par défaut)
n <- 5L                # integer : suffixe L
actif <- TRUE          # logical : TRUE / FALSE
inconnu <- NA          # valeur manquante
class(age)             # "numeric"
cat(nom, "a", age, "ans\n")   # affiche : Ada a 36 ans
```

Le typage est **dynamique**. Les noms peuvent contenir un point (`taux.moyen`), sans signification particulière. `NA` marque une valeur manquante, `NULL` l'absence d'objet.

### Vecteurs

En R, **tout est vecteur** : un nombre seul est un vecteur de longueur 1.

```r
x <- c(4, 8, 15, 16)   # c() combine des valeurs en vecteur
x[1]                   # 4 : les indices commencent à 1
x[-1]                  # 8 15 16 : un indice négatif exclut
x[x > 10]              # 15 16 : indexation par condition
x * 2                  # 8 16 30 32 : les opérations sont vectorisées
length(x)              # 4
1:5                    # 1 2 3 4 5 : suite d'entiers
mean(x); sum(x); max(x)
```

Les opérations s'appliquent élément par élément, sans boucle. Quand deux vecteurs n'ont pas la même longueur, le plus court est **recyclé** : `c(1, 2, 3, 4) + c(10, 20)` donne `11 22 13 24`.

Les **valeurs manquantes se propagent** : `mean(c(1, NA, 3))` vaut `NA`. Il faut demander de les ignorer : `mean(c(1, NA, 3), na.rm = TRUE)` vaut `2`. `is.na(x)` teste chaque élément.

### Conditions

```r
if (age < 18) {
  statut <- "mineur"
} else if (age < 65) {
  statut <- "adulte"
} else {
  statut <- "senior"
}

ifelse(x > 10, "grand", "petit")   # version vectorisée : un résultat par élément
```

`if` ne teste qu'une seule valeur ; `ifelse()` travaille sur tout un vecteur. Opérateurs logiques : `&`, `|`, `!` (vectorisés) et `&&`, `||` (pour une seule valeur, dans un `if`). `%in%` teste l'appartenance : `"b" %in% c("a", "b")` vaut `TRUE`. `%%` donne le reste de la division entière : `7 %% 2` vaut `1`, d'où le test de parité `i %% 2 == 0`.

### Boucles et fonctions apply

```r
for (i in 1:3) {
  cat("tour", i, "\n")
}

n <- 0
while (n < 3) n <- n + 1

sapply(1:3, function(i) i^2)   # 1 4 9 : applique une fonction à chaque élément
```

Les boucles existent, mais on les évite quand une opération vectorisée suffit : c'est plus court et plus rapide. La famille *apply* applique une fonction à chaque élément : `sapply()` rend un vecteur, `lapply()` une liste.

### Listes, facteurs et data frames

```r
personne <- list(nom = "Ada", langages = c("R", "Python"))   # liste : éléments de types différents
personne$nom                   # "Ada"

taille <- factor(c("S", "M", "S", "L"), levels = c("S", "M", "L"))   # facteur : variable catégorielle
table(taille)                  # compte par modalité : S 2, M 1, L 1

df <- data.frame(
  ville = c("Lyon", "Nantes", "Lyon"),
  montant = c(120, 80, 50)
)
df$montant                     # une colonne, avec $
df[df$montant > 60, ]          # lignes qui vérifient la condition, toutes les colonnes
nrow(df); summary(df)
```

Le **data frame** est le tableau de données natif de R : une colonne par variable, une ligne par observation, chaque colonne avec son type. `df[lignes, colonnes]` sélectionne ; laisser un côté vide garde tout. Un **facteur** représente une variable catégorielle, avec ses modalités (`levels`), ce que les modèles statistiques savent exploiter.

### Fonctions

```r
aire <- function(r, pi_approx = 3.14) {   # paramètre avec valeur par défaut
  pi_approx * r^2                         # la dernière expression est la valeur renvoyée
}
aire(2)                     # 12.56
aire(r = 2, pi_approx = pi) # arguments nommés ; pi est une constante de R
```

`return()` existe mais n'est pas nécessaire : la fonction renvoie la valeur de sa dernière expression.

### Pipe, paquets et statistiques intégrées

```r
x |> sqrt() |> sum()        # pipe natif (R 4.1 et plus) : sum(sqrt(x))

install.packages("dplyr")   # installe un paquet depuis le CRAN (une fois)
library(dplyr)              # le charge dans la session (à chaque fois)

t.test(montant ~ ville, data = df)   # test de Student, sans paquet à installer
lm(montant ~ ville, data = df)       # régression linéaire
```

Le pipe `|>` passe le résultat de gauche comme premier argument de la fonction de droite ; le tidyverse utilise aussi `%>%`, du paquet magrittr. La notation `y ~ x` est une **formule** : « y expliqué par x ». Elle sert aux tests (`t.test`), aux modèles (`lm`, `glm`) et aux graphiques.

## Exemples concrets

**Résumer des ventes par ville** (R de base, sans paquet).

```r
ventes <- read.csv("ventes.csv")                 # data frame
str(ventes)                                      # structure : colonnes et types
aggregate(montant ~ ville, data = ventes, FUN = sum)      # total par ville
tapply(ventes$montant, ventes$ville, mean, na.rm = TRUE)  # moyenne par ville
```

**Comparer deux groupes, puis modéliser.**

```r
# Le panier moyen diffère-t-il entre clients fidèles et nouveaux ?
t.test(panier ~ fidele, data = clients)          # p-value et intervalle de confiance

# Le panier s'explique-t-il par l'âge et l'ancienneté ?
modele <- lm(panier ~ age + anciennete, data = clients)
summary(modele)                                  # coefficients, p-values, R²
```

**Le même résumé avec le tidyverse.**

```r
library(dplyr)

ventes |>
  filter(!is.na(montant)) |>
  group_by(ville) |>
  summarise(total = sum(montant), n = n()) |>
  arrange(desc(total))
```

## Pour aller plus loin

- [Site officiel du projet R](https://www.r-project.org/)
- [An Introduction to R, le manuel officiel](https://cran.r-project.org/doc/manuals/r-release/R-intro.html)
- [R for Data Science, livre en ligne gratuit](https://r4ds.hadley.nz/)
