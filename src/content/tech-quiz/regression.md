---
questions:
  - id: probleme
    prompt: "Quel problème la régression résout-elle, par rapport à une simple comparaison de moyennes ?"
    answer: "Mesurer l'effet de plusieurs facteurs à la fois, chacun à niveau égal des autres"
    decoys:
      - "Décrire une seule variable par sa moyenne, sa médiane et son écart-type, sans autre facteur"
      - "Répartir des clients en groupes qui se ressemblent, sans variable à expliquer"
    why: "La régression modélise une variable en fonction de plusieurs autres. Regrouper sans variable cible, c'est de l'apprentissage non supervisé."
  - id: vocabulaire
    prompt: "Dans une régression du panier sur l'âge et l'ancienneté, quelle est la variable expliquée ?"
    answer: "Le panier"
    decoys:
      - "L'âge"
      - "L'ancienneté"
    why: "La variable expliquée est celle qu'on modélise ; l'âge et l'ancienneté sont les variables explicatives."
  - id: forme
    prompt: "Quelle forme de relation suppose la régression linéaire ?"
    answer: "y = b0 + b1·x1 + b2·x2 + … + erreur"
    decoys:
      - "y = b0 × x1 × x2 × …, sans terme d'erreur"
      - "y = la moyenne de x1, x2… pondérée par leur variance"
    why: "Une somme de variables pondérées par des coefficients, plus une erreur."
  - id: moindres-carres
    prompt: "Comment la méthode des moindres carrés choisit-elle les coefficients ?"
    answer: "En minimisant la somme des carrés des résidus"
    decoys:
      - "En maximisant la corrélation entre chaque variable et les autres"
      - "En prenant la médiane des pentes entre chaque paire de points"
    why: "Les résidus sont les écarts entre valeurs observées et prédites ; les moindres carrés ordinaires minimisent la somme de leurs carrés."
  - id: residu
    prompt: "Qu'est-ce qu'un résidu ?"
    answer: "L'écart entre la valeur observée et la valeur prédite"
    decoys:
      - "La part de la variance expliquée par le modèle, entre 0 et 1"
      - "Une variable explicative retirée du modèle, faute d'être significative"
    why: "Chaque observation a son résidu. La part de variance expliquée, c'est le R²."
  - id: coefficient
    prompt: "Le coefficient de l'ancienneté vaut 5 dans une régression du panier (en €) sur l'âge et l'ancienneté. Comment le lire ?"
    answer: "Un an d'ancienneté en plus est associé à 5 € de panier en plus en moyenne, à âge égal"
    decoys:
      - "L'ancienneté explique 5 % des variations du panier, quelle que soit la valeur de l'âge"
      - "Il faut 5 ans d'ancienneté pour que le panier augmente d'un euro, en moyenne"
    why: "Un coefficient est la variation moyenne de y quand la variable augmente de 1, les autres étant fixées."
  - id: autres-fixees
    prompt: "Qu'apporte la régression multiple par rapport à des comparaisons variable par variable ?"
    answer: "Chaque coefficient s'interprète les autres variables étant fixées"
    decoys:
      - "Elle se passe de toute hypothèse sur les données, contrairement aux comparaisons"
      - "Elle prouve que chaque variable cause la variation de y"
    why: "À âge égal, à région égale : c'est ce qui distingue la régression multiple d'une simple comparaison."
  - id: categorielle
    prompt: "Comment une variable catégorielle comme la région entre-t-elle dans une régression ?"
    answer: "Sous forme d'indicatrices (0 ou 1), une par modalité sauf la modalité de référence"
    decoys:
      - "Sous la forme d'un nombre par région (1, 2, 3…), traité comme une valeur continue"
      - "Elle ne peut pas entrer : seules les variables numériques sont acceptées"
    why: "Numéroter les régions imposerait un ordre et des écarts arbitraires. Chaque indicatrice compare une modalité à la référence."
  - id: reference
    prompt: "Que compare le coefficient de l'indicatrice « région Sud », quand la référence est « Nord » ?"
    answer: "Le Sud au Nord, les autres variables étant fixées"
    decoys:
      - "Le Sud à la moyenne de toutes les régions réunies, Nord compris"
      - "Le Sud à zéro, sans référence"
    why: "Chaque coefficient d'indicatrice mesure l'écart avec la modalité de référence."
  - id: p-value-coef
    prompt: "Que teste la p-value d'un coefficient de régression ?"
    answer: "Si le coefficient est différent de 0"
    decoys:
      - "Si le modèle entier est linéaire"
      - "Si la variable cause la variation de y"
    why: "Chaque coefficient a son test (est-il différent de 0 ?) et son intervalle de confiance. Aucun ne prouve une causalité."
  - id: r2
    prompt: "Que mesure le R² ?"
    answer: "La part de la variance de y expliquée par le modèle, entre 0 et 1"
    decoys:
      - "La probabilité que le modèle soit juste, exprimée en pourcentage entre 0 et 100"
      - "La corrélation entre les deux premières variables explicatives"
    why: "Un R² de 0,6 veut dire que le modèle explique 60 % de la variance de y."
  - id: r2-ajuste
    prompt: "Pourquoi utiliser le R² ajusté ?"
    answer: "Le R² augmente mécaniquement avec chaque variable ajoutée, même inutile"
    decoys:
      - "Le R² classique ne se calcule pas sur des variables catégorielles"
      - "Le R² ajusté est toujours plus élevé, ce qui flatte le modèle"
    why: "Le R² ajusté pénalise les variables qui n'apportent rien, pour comparer honnêtement des modèles."
  - id: r2-causalite
    prompt: "Un modèle a un R² élevé. Peut-on en conclure que les variables causent y ?"
    answer: "Non : le R² ne dit rien de la causalité"
    decoys:
      - "Oui, dès que le R² dépasse 0,9"
      - "Oui, si toutes les p-values sont sous 5 %"
    why: "Un modèle peut très bien décrire une relation due à une variable confondante. Le R² mesure l'ajustement, pas la cause."
  - id: hypotheses
    prompt: "Laquelle est une hypothèse de la régression linéaire ?"
    answer: "La variance des erreurs est constante (homoscédasticité)"
    decoys:
      - "Toutes les variables explicatives suivent une loi normale"
      - "Les variables explicatives sont parfaitement corrélées entre elles"
    why: "Hypothèses : relation linéaire, erreurs indépendantes, variance constante, résidus à peu près normaux. Ce sont les erreurs, pas les variables, qui doivent être à peu près normales."
  - id: verifier
    prompt: "Comment vérifier les hypothèses d'une régression ?"
    answer: "Tracer les résidus : un motif visible (courbe, entonnoir) signale un problème"
    decoys:
      - "Regarder le R² : au-dessus de 0,5, les hypothèses de la régression sont forcément respectées"
      - "Relancer le modèle avec une graine aléatoire différente"
    why: "Des résidus sans structure sont le signe d'un modèle adapté. Une courbe indique une relation non linéaire, un entonnoir une variance non constante."
  - id: logistique
    prompt: "Quand utiliser une régression logistique plutôt que linéaire ?"
    answer: "Quand la variable expliquée est binaire, comme résilie ou ne résilie pas"
    decoys:
      - "Quand les variables explicatives sont toutes binaires, comme homme ou femme, oui ou non"
      - "Quand il y a plus de dix variables explicatives"
    why: "La logistique modélise la probabilité d'un événement, toujours entre 0 et 1. Une régression linéaire pourrait prédire des probabilités négatives ou supérieures à 1."
  - id: logistique-sortie
    prompt: "Que modélise la régression logistique ?"
    answer: "La probabilité de l'événement, toujours entre 0 et 1"
    decoys:
      - "Le nombre de fois où l'événement se produit, sans limite haute"
      - "La durée avant que l'événement se produise"
    why: "Grâce à la fonction logistique, la sortie reste une probabilité."
  - id: odds-ratio
    prompt: "Que donne l'exponentielle d'un coefficient de régression logistique ?"
    answer: "Un rapport de cotes (odds ratio)"
    decoys:
      - "La probabilité de l'événement"
      - "Le R² du modèle"
    why: "Les coefficients sont en logarithme de cote ; leur exponentielle est un rapport de cotes. En R : exp(coef(modele))."
  - id: classification
    prompt: "Malgré son nom, quel type de modèle est la régression logistique ?"
    answer: "Un modèle de classification"
    decoys:
      - "Un modèle de regroupement"
      - "Un test de moyennes"
    why: "Elle prédit l'appartenance à une classe (via une probabilité), pas une valeur numérique continue."
  - id: lm
    prompt: "Quelle fonction de R ajuste une régression linéaire ?"
    answer: "lm()"
    decoys:
      - "glm(family = binomial)"
      - "t.test()"
    why: "lm() pour linéaire, glm(family = binomial) pour la logistique, summary() pour lire les coefficients."
  - id: glm
    prompt: "Comment ajuster une régression logistique en R ?"
    answer: "glm(y ~ x, data = df, family = binomial)"
    decoys:
      - "lm(y ~ x, data = df, type = \"logistic\")"
      - "logit(y, x, data = df)"
    why: "glm() avec family = binomial ajuste une régression logistique."
  - id: expliquer-predire
    prompt: "Quelle différence d'usage entre statistique et machine learning dans une régression ?"
    answer: "La statistique cherche à expliquer, le machine learning à prédire sur de nouvelles données"
    decoys:
      - "La statistique utilise des données réelles, le machine learning des données simulées"
      - "La statistique ne fait que des régressions linéaires, le machine learning que des logistiques"
    why: "En statistique, on interprète les coefficients et leur incertitude ; en machine learning, on juge le modèle sur des données qu'il n'a pas vues."
  - id: confondante
    prompt: "Pourquoi une régression sur des données observées ne prouve-t-elle pas une causalité ?"
    answer: "Une variable confondante absente du modèle peut expliquer la relation"
    decoys:
      - "Parce que les coefficients sont toujours arrondis, ce qui fausse le sens de la relation"
      - "Parce que le R² ne peut pas dépasser 1"
    why: "Pour établir un effet causal, une expérience aléatoire (un A/B test) est plus sûre."
  - id: multicolinearite
    prompt: "Que se passe-t-il quand deux variables explicatives sont très corrélées entre elles ?"
    answer: "Les coefficients deviennent instables et difficiles à interpréter"
    decoys:
      - "Le R² tombe automatiquement à 0, quelle que soit la qualité des autres variables"
      - "Le modèle refuse de s'ajuster"
    why: "C'est la multicolinéarité : le modèle ne sait pas attribuer l'effet à l'une plutôt qu'à l'autre."
  - id: extrapolation
    prompt: "Le modèle a été ajusté sur des clients de 20 à 60 ans. Que penser d'une prédiction pour un client de 90 ans ?"
    answer: "Elle est risquée : rien ne garantit que la relation reste linéaire hors de la plage observée"
    decoys:
      - "Elle est aussi fiable que les autres, puisque le modèle est linéaire partout"
      - "Elle est impossible : lm() refuse toute valeur hors de la plage vue pendant l'ajustement du modèle"
    why: "C'est l'extrapolation : le modèle n'a rien vu au-delà de 60 ans."
  - id: non-lineaire
    prompt: "Seule la prédiction compte, et les relations sont fortement non linéaires. Quel choix est souvent meilleur qu'une régression linéaire ?"
    answer: "Des arbres boostés, comme XGBoost"
    decoys:
      - "Une régression linéaire avec plus de décimales"
      - "Un test du χ²"
    why: "Les arbres boostés captent les non-linéarités et les interactions. La régression reste un bon modèle de référence, plus explicable."
  - id: surapprentissage
    prompt: "Que risque-t-on avec trop de variables pour trop peu d'observations ?"
    answer: "Le surapprentissage : le modèle colle au bruit"
    decoys:
      - "Un R² forcément négatif"
      - "Des résidus tous égaux à 0, ce qui prouve le modèle"
    why: "Le modèle s'ajuste aux particularités de l'échantillon et prédit mal de nouvelles données."
  - id: usage
    prompt: "Dans quel cas la régression est-elle un bon choix ?"
    answer: "Mesurer l'effet d'un facteur en tenant compte des autres, avec un modèle explicable"
    decoys:
      - "Regrouper des documents par thème sans aucune étiquette, à partir de leur seul contenu"
      - "Planifier chaque nuit des traitements dépendants les uns des autres, avec des reprises"
    why: "C'est souvent le premier modèle de référence : simple, rapide, et ses coefficients s'expliquent."
  - id: confint
    prompt: "En R, que donne confint(modele) après lm() ?"
    answer: "Les intervalles de confiance des coefficients"
    decoys:
      - "Les prédictions du modèle pour chaque observation du tableau"
      - "Le graphique des résidus"
    why: "confint() donne l'incertitude sur chaque coefficient ; plot(modele) trace les résidus."
  - id: statsmodels
    prompt: "En Python, quelle bibliothèque est adaptée pour lire les coefficients, p-values et R² d'une régression ?"
    answer: "statsmodels"
    decoys:
      - "matplotlib"
      - "requests"
    why: "statsmodels donne un résumé complet comme summary() en R. scikit-learn sert plutôt à prédire."
---
