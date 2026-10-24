---
name: Régression
kind: concept
layers: []
tags: [data, machine-learning, standard]
difficulty: 2
summary: "Modéliser une variable en fonction d'autres : régression linéaire pour une valeur numérique, logistique pour un oui ou non, avec des coefficients qui s'interprètent."
integratesWith:
  - tech: apprentissage-supervise
    note: "La régression est aussi un modèle d'apprentissage supervisé : en machine learning, on la juge sur ses prédictions pour de nouvelles données."
  - tech: tests-statistiques
    note: "Chaque coefficient est accompagné d'un test (est-il différent de 0 ?) et d'un intervalle de confiance."
  - tech: scikit-learn
    note: "LinearRegression et LogisticRegression, pour prédire ; statsmodels ou R pour l'analyse des coefficients."
---

## Problème résolu

Le panier d'un client dépend-il de son âge, de son ancienneté, de sa région ? De combien varie-t-il quand l'ancienneté augmente d'un an, à âge égal ? Comparer des moyennes groupe par groupe ne suffit plus dès qu'il y a plusieurs facteurs à la fois. La régression modélise une variable (la **variable expliquée**) en fonction d'autres (les **variables explicatives**).

### La régression linéaire

Le modèle suppose une relation de la forme `y = b0 + b1·x1 + b2·x2 + … + erreur`. La méthode des **moindres carrés ordinaires** choisit les coefficients qui minimisent la somme des carrés des **résidus** (les écarts entre valeurs observées et valeurs prédites).

- **Coefficient** : quand `x1` augmente de 1, `y` varie en moyenne de `b1`, **les autres variables étant fixées**. C'est ce qui distingue la régression multiple d'une simple comparaison.
- **Variable catégorielle** (la région) : elle entre sous forme d'indicatrices (0 ou 1), une par modalité sauf une, la **modalité de référence**. Chaque coefficient compare alors une modalité à la référence.
- **Tests et intervalles** : chaque coefficient a une p-value (teste s'il est différent de 0) et un intervalle de confiance.
- **R²** : la part de la variance de `y` expliquée par le modèle, entre 0 et 1. Il augmente mécaniquement quand on ajoute des variables, même inutiles ; le **R² ajusté** corrige cet effet. Un R² élevé ne dit rien de la causalité.

### Les hypothèses à vérifier

Les tests et intervalles reposent sur des hypothèses : relation **linéaire**, erreurs **indépendantes**, variance des erreurs **constante** (homoscédasticité), résidus à peu près **normaux**. On les vérifie en traçant les résidus : un motif visible (une courbe, un entonnoir) signale un problème.

### La régression logistique

Quand la variable expliquée est binaire (le client résilie ou non), on utilise la **régression logistique**. Elle modélise la **probabilité** de l'événement, toujours entre 0 et 1, grâce à la fonction logistique. Ses coefficients s'expriment en logarithme de cote (*log-odds*) ; leur exponentielle est un **rapport de cotes** (*odds ratio*). Malgré son nom, c'est un modèle de **classification**.

### En pratique

```r
modele <- lm(panier ~ age + anciennete + region, data = clients)
summary(modele)       # coefficients, p-values, R² et R² ajusté
confint(modele)       # intervalles de confiance des coefficients
plot(modele)          # graphiques des résidus

logit <- glm(resilie ~ anciennete + reclamations, data = clients, family = binomial)
exp(coef(logit))      # rapports de cotes
```

```python
import statsmodels.formula.api as smf
smf.ols("panier ~ age + anciennete + region", data=clients).fit().summary()
```

### Expliquer ou prédire

La statistique utilise la régression pour **expliquer** : quels facteurs comptent, avec quelle incertitude. Le machine learning l'utilise pour **prédire** : on la juge alors sur des données qu'elle n'a pas vues à l'entraînement, et l'interprétation des coefficients passe au second plan.

## Quand l'utiliser

- Mesurer l'effet d'un facteur en tenant compte des autres (à âge égal, à région égale).
- Prédire une valeur numérique (linéaire) ou la probabilité d'un événement (logistique) avec un modèle simple et explicable, souvent un premier modèle de référence.
- Quantifier une relation pour la communiquer : « chaque année d'ancienneté est associée à X € de panier en plus ».

## Quand l'éviter

- **Conclure à une causalité** à partir de données observées : une **variable confondante** absente du modèle peut expliquer la relation. Pour établir un effet causal, une expérience (un A/B test) est plus sûre.
- **Variables explicatives très corrélées entre elles** (multicolinéarité) : les coefficients deviennent instables et difficiles à interpréter.
- **Extrapoler** loin de la plage des données observées : rien ne garantit que la relation y reste linéaire.
- **Relations fortement non linéaires** ou interactions complexes, quand seule la prédiction compte : des arbres boostés (XGBoost) font souvent mieux.
- **Trop de variables pour trop peu d'observations** : le modèle colle au bruit (surapprentissage).

## Pour aller plus loin

- [OpenIntro Statistics, manuel libre et gratuit](https://www.openintro.org/book/os/)
- [Documentation de statsmodels : modèles de régression](https://www.statsmodels.org/stable/regression.html)
- [Documentation de scikit-learn : modèles linéaires](https://scikit-learn.org/stable/modules/linear_model.html)
