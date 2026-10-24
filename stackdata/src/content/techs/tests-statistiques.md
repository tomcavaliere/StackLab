---
name: Tests d'hypothèse
kind: concept
layers: []
tags: [data, standard]
difficulty: 2
summary: "Décider si un écart observé dans un échantillon peut s'expliquer par le hasard : hypothèse nulle, p-value, seuil, erreurs de première et de seconde espèce."
integratesWith:
  - tech: statistiques-descriptives
    note: "On décrit d'abord les données : la forme de la distribution oriente le choix du test."
  - tech: r
    note: "Les tests courants sont intégrés à R : t.test(), chisq.test(), wilcox.test()."
---

## Problème résolu

Les clients du nouveau parcours dépensent en moyenne un peu plus que ceux de l'ancien. Est-ce un vrai effet, ou le hasard de l'échantillon ? Deux échantillons tirés de la même population n'ont presque jamais exactement la même moyenne. Un test d'hypothèse mesure si l'écart observé est assez grand pour qu'il soit peu crédible de l'attribuer au seul hasard.

### Le raisonnement

1. **Hypothèse nulle** (H0) : il n'y a pas d'effet (les deux groupes ont la même moyenne). **Hypothèse alternative** (H1) : il y en a un.
2. On calcule une **statistique de test** à partir des données (par exemple l'écart entre les moyennes, rapporté à sa variabilité).
3. La **p-value** est la probabilité d'observer un écart au moins aussi grand que celui-ci **si H0 était vraie**.
4. On compare la p-value à un **seuil α** fixé à l'avance, très souvent 5 % par convention. Sous le seuil, on rejette H0 : l'effet est dit « statistiquement significatif ».

La p-value n'est **pas** la probabilité que H0 soit vraie, ni celle que le résultat soit dû au hasard. Et ne pas rejeter H0 ne prouve pas l'absence d'effet : l'échantillon était peut-être trop petit pour le voir.

### Les deux erreurs possibles

| | H0 vraie (pas d'effet) | H0 fausse (effet réel) |
|---|---|---|
| On rejette H0 | **Erreur de première espèce** : faux positif (probabilité α) | Bonne décision |
| On ne rejette pas H0 | Bonne décision | **Erreur de seconde espèce** : faux négatif |

La **puissance** d'un test est sa probabilité de détecter un effet qui existe vraiment. Elle augmente avec la taille de l'échantillon et avec la taille de l'effet. Un échantillon trop petit donne un test peu puissant, qui rate des effets réels.

### L'intervalle de confiance

Un intervalle de confiance à 95 % donne une plage de valeurs plausibles pour l'effet (par exemple, l'écart de panier moyen), et pas seulement un verdict oui ou non. Si l'intervalle de l'écart ne contient pas 0, le test correspondant au seuil de 5 % est significatif. Sa largeur dit la précision : un intervalle très large signale qu'on sait peu de choses.

### Quel test pour quelle question

| Question | Test courant |
|---|---|
| Deux groupes indépendants ont-ils la même moyenne ? | **t de Student** (sa variante de Welch, qui n'exige pas des variances égales, est celle de `t.test()` par défaut dans R) |
| Les mêmes individus, mesurés avant et après ? | **t apparié** : on teste la différence pour chaque individu |
| Plus de deux groupes ont-ils la même moyenne ? | **ANOVA** |
| Deux variables catégorielles sont-elles indépendantes ? Des proportions diffèrent-elles ? | **Test du χ² (khi-deux)** |
| Données loin d'une loi normale, petits échantillons, rangs | Tests **non paramétriques** : Wilcoxon, Mann-Whitney |

```r
t.test(panier ~ parcours, data = clients)         # deux moyennes (Welch)
t.test(apres, avant, paired = TRUE)               # mesures appariées
chisq.test(table(clients$parcours, clients$achat)) # indépendance de deux variables catégorielles
wilcox.test(panier ~ parcours, data = clients)    # non paramétrique
```

```python
from scipy import stats
stats.ttest_ind(a, b, equal_var=False)            # Welch, en Python
```

## Quand l'utiliser

- Décider à partir d'un échantillon : un changement a-t-il eu un effet, deux populations diffèrent-elles ?
- Analyser une expérience, par exemple un A/B test.
- Vérifier qu'un écart vu dans un tableau de bord n'est pas simplement du bruit avant d'agir.

## Quand l'éviter

- **Multiplier les tests** : avec un seuil de 5 %, faire 20 tests où il n'y a aucun effet donne en moyenne un faux positif. Corriger le seuil (la correction de Bonferroni divise α par le nombre de tests) ou choisir à l'avance ce qu'on teste.
- **Chercher jusqu'à trouver** (*p-hacking*) : essayer des variantes, des sous-groupes ou des exclusions jusqu'à passer sous 5 % produit des résultats qui ne se reproduisent pas.
- **Confondre significatif et important** : sur un très grand échantillon, un écart minuscule devient significatif. Toujours donner la taille de l'effet et son intervalle de confiance.
- **Ignorer les conditions du test** : observations indépendantes, mesures appariées traitées comme telles, distribution compatible avec le test choisi.
- Données de toute la population (et pas d'un échantillon) : il n'y a rien à inférer, la description suffit.

## Pour aller plus loin

- [OpenIntro Statistics, manuel libre et gratuit](https://www.openintro.org/book/os/)
- [Documentation de scipy.stats](https://docs.scipy.org/doc/scipy/reference/stats.html)
- [Les fonctions statistiques de R (paquet stats)](https://stat.ethz.ch/R-manual/R-devel/library/stats/html/00Index.html)
