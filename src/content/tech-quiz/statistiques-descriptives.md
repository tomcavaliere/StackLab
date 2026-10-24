---
questions:
  - id: probleme
    prompt: "À quoi servent les statistiques descriptives ?"
    answer: "Résumer les données observées en quelques indicateurs et graphiques"
    decoys:
      - "Prouver qu'un résultat observé sur un échantillon vaut pour toute la population, avec une marge d'erreur"
      - "Prédire les valeurs futures d'une variable à partir de son historique, avec un modèle entraîné"
    why: "Elles décrivent les données qu'on a. Conclure sur toute une population relève de l'inférence (tests, intervalles de confiance) ; prédire, d'un modèle."
  - id: moment
    prompt: "À quel moment d'une analyse faire des statistiques descriptives ?"
    answer: "En premier, avant tout test, modèle ou tableau de bord"
    decoys:
      - "À la fin, une fois le modèle entraîné, pour présenter ses résultats au client"
      - "Seulement quand un test statistique a donné un résultat surprenant qu'il faut expliquer"
    why: "Elles révèlent erreurs de saisie, valeurs manquantes et valeurs atypiques, et orientent le choix du test ou du modèle."
  - id: moyenne-sensible
    prompt: "Dans une entreprise, quelques dirigeants ont des salaires très élevés. Que fait la moyenne des salaires ?"
    answer: "Elle est tirée vers le haut : elle est sensible aux valeurs extrêmes"
    decoys:
      - "Rien : la moyenne ignore les valeurs extrêmes, c'est sa raison d'être"
      - "Elle devient égale à la médiane, puisque les écarts se compensent"
    why: "La moyenne prend en compte chaque valeur, extrêmes compris. La médiane, elle, bouge peu."
  - id: mediane
    prompt: "Qu'est-ce que la médiane ?"
    answer: "La valeur du milieu, qui coupe les données en deux moitiés"
    decoys:
      - "La valeur la plus fréquente parmi les observations"
      - "La moyenne entre la plus petite et la plus grande valeur"
    why: "La moitié des valeurs sont en dessous, l'autre moitié au-dessus. La valeur la plus fréquente, c'est le mode."
  - id: robustesse
    prompt: "Pourquoi dit-on que la médiane est robuste ?"
    answer: "Les valeurs extrêmes la déplacent peu"
    decoys:
      - "Elle se calcule même sur des données textuelles"
      - "Elle ne change jamais quand on ajoute des données"
    why: "Remplacer la plus grande valeur par une valeur dix fois plus grande ne change pas la valeur du milieu."
  - id: mode
    prompt: "Pour quel type de variable le mode est-il surtout utile ?"
    answer: "Une variable catégorielle, comme la couleur préférée"
    decoys:
      - "Une variable continue mesurée très finement, comme une température au millième"
      - "Une variable de dates, pour trouver la plus récente"
    why: "Le mode est la valeur la plus fréquente : il a du sens pour des catégories. Sur des mesures très fines, presque toutes les valeurs sont uniques."
  - id: moyenne-mediane-ecart
    prompt: "La moyenne et la médiane d'une variable sont très différentes. Qu'en conclure ?"
    answer: "La distribution est asymétrique : il faut regarder les deux"
    decoys:
      - "Il y a forcément une erreur de calcul dans l'une des deux"
      - "La variable est catégorielle et ces indicateurs n'ont pas de sens"
    why: "Une longue queue d'un côté tire la moyenne sans bouger beaucoup la médiane."
  - id: queue-droite
    prompt: "Des temps de réponse ont une longue queue vers la droite. Comment se placent moyenne et médiane ?"
    answer: "La moyenne est au-dessus de la médiane"
    decoys:
      - "La médiane est au-dessus de la moyenne"
      - "Elles sont égales, la queue ne change rien"
    why: "Les quelques valeurs très grandes de la queue tirent la moyenne vers le haut ; la médiane reste au milieu."
  - id: etendue
    prompt: "Quel défaut a l'étendue (maximum moins minimum) comme mesure de dispersion ?"
    answer: "Elle ne dépend que de deux valeurs, les plus extrêmes"
    decoys:
      - "Elle est exprimée au carré de l'unité des données"
      - "Elle ne se calcule que sur des données normales"
    why: "Une seule valeur aberrante suffit à la changer complètement. Le carré de l'unité, c'est le défaut de la variance."
  - id: variance-ecart-type
    prompt: "Pourquoi préfère-t-on souvent l'écart-type à la variance pour communiquer ?"
    answer: "Il s'exprime dans la même unité que les données"
    decoys:
      - "Il ne dépend pas des valeurs extrêmes, contrairement à la variance"
      - "Il est toujours plus petit que la variance, donc plus rassurant"
    why: "L'écart-type est la racine carrée de la variance : on retrouve l'unité d'origine (des euros, pas des euros au carré)."
  - id: variance-definition
    prompt: "Comment se définit la variance ?"
    answer: "La moyenne des carrés des écarts à la moyenne"
    decoys:
      - "L'écart entre la plus grande et la plus petite valeur"
      - "La moyenne des écarts entre chaque valeur et la médiane"
    why: "On élève les écarts au carré pour qu'ils ne se compensent pas. Son unité est donc le carré de celle des données."
  - id: quartiles
    prompt: "Que représentent Q1, la médiane et Q3 ?"
    answer: "Les trois valeurs qui coupent les données en quatre parts égales"
    decoys:
      - "La moyenne des trois premiers quarts des données"
      - "Les trois valeurs les plus fréquentes"
    why: "25 % des valeurs sont sous Q1, 50 % sous la médiane, 75 % sous Q3."
  - id: iqr
    prompt: "Que contient l'écart interquartile (Q3 − Q1) ?"
    answer: "La moitié centrale des valeurs"
    decoys:
      - "Toutes les valeurs sauf les extrêmes"
      - "Le quart le plus élevé des valeurs"
    why: "Entre Q1 et Q3 se trouvent 50 % des observations, celles du milieu. Comme la médiane, il est robuste aux extrêmes."
  - id: percentile
    prompt: "Le 90ᵉ percentile des temps de réponse vaut 800 ms. Qu'est-ce que cela veut dire ?"
    answer: "90 % des requêtes ont répondu en 800 ms ou moins"
    decoys:
      - "90 % des requêtes ont répondu en 800 ms exactement"
      - "La moyenne des 90 requêtes les plus lentes vaut 800 ms"
    why: "Le 90ᵉ percentile est la valeur sous laquelle se trouvent 90 % des observations."
  - id: histogramme
    prompt: "Que montre un histogramme ?"
    answer: "La répartition des valeurs par intervalles : symétrie, asymétrie, nombre de pics"
    decoys:
      - "L'évolution d'une variable dans le temps, point par point, de la plus ancienne à la plus récente"
      - "La relation entre deux variables, une observation par point dans un plan"
    why: "L'histogramme compte les valeurs par intervalle : c'est la forme de la distribution. La relation entre deux variables se voit avec un nuage de points."
  - id: boxplot
    prompt: "Dans une boîte à moustaches, que représente la boîte ?"
    answer: "L'intervalle de Q1 à Q3, avec la médiane en trait intérieur"
    decoys:
      - "L'intervalle entre la moyenne moins un écart-type et la moyenne plus un écart-type"
      - "L'ensemble des valeurs, du minimum au maximum, sans exception"
    why: "La boîte va de Q1 à Q3 ; les moustaches couvrent le reste des valeurs, et les points isolés au-delà signalent des valeurs atypiques."
  - id: atypiques
    prompt: "Dans une boîte à moustaches, que signalent les points isolés au-delà des moustaches ?"
    answer: "Des valeurs atypiques"
    decoys:
      - "La moyenne et la médiane"
      - "Les valeurs manquantes"
    why: "Ces points sont loin du reste de la distribution : erreurs de saisie ou vrais cas extrêmes, à examiner."
  - id: normale-regle
    prompt: "Pour une distribution normale, quelle part des valeurs est à moins de deux écarts-types de la moyenne ?"
    answer: "Environ 95 %"
    decoys:
      - "Environ 50 %"
      - "Exactement 100 %"
    why: "Pour une loi normale : environ 68 % à moins d'un écart-type, environ 95 % à moins de deux."
  - id: normale-supposer
    prompt: "Peut-on supposer que des données réelles suivent une loi normale ?"
    answer: "Non : beaucoup ne le sont pas, il faut le vérifier"
    decoys:
      - "Oui : toutes les données réelles suivent une loi normale dès qu'elles sont nombreuses"
      - "Oui, à condition que la moyenne soit positive"
    why: "Revenus, temps de réponse ou prix sont souvent asymétriques. On regarde l'histogramme avant de supposer une forme."
  - id: correlation
    prompt: "Que mesure la corrélation de Pearson ?"
    answer: "À quel point deux variables évoluent ensemble de façon linéaire, entre −1 et 1"
    decoys:
      - "À quel point une variable cause l'autre, en pourcentage de l'effet total observé"
      - "La différence entre les moyennes de deux variables, rapportée à leur écart-type"
    why: "Elle mesure une relation linéaire, pas une causalité, et ne vaut que entre −1 et 1."
  - id: correlation-zero
    prompt: "Une corrélation de Pearson proche de 0 veut-elle dire qu'il n'y a aucune relation entre deux variables ?"
    answer: "Non : seulement qu'il n'y a pas de relation linéaire"
    decoys:
      - "Oui : les deux variables sont alors parfaitement indépendantes"
      - "Oui, à condition qu'il y ait plus de cent observations"
    why: "Une relation en forme de U, par exemple, donne une corrélation proche de 0 alors que les variables sont très liées."
  - id: causalite
    prompt: "Les ventes de glaces et les noyades augmentent ensemble. Pourquoi ne pas conclure que les glaces causent les noyades ?"
    answer: "Une troisième variable, l'été, fait monter les deux : corrélation n'est pas causalité"
    decoys:
      - "La corrélation est trop faible pour qu'on puisse conclure quoi que ce soit, quel que soit le contexte"
      - "Il faudrait d'abord calculer la médiane des deux séries pour vérifier qu'elles se ressemblent"
    why: "Une variable confondante peut expliquer une corrélation. Établir une causalité demande une expérience ou un raisonnement de plus."
  - id: nuage
    prompt: "Quel graphique montre la relation entre deux variables numériques ?"
    answer: "Un nuage de points"
    decoys:
      - "Un histogramme"
      - "Une boîte à moustaches"
    why: "Chaque observation est un point, une variable par axe. L'histogramme et la boîte décrivent une seule variable."
  - id: anscombe
    prompt: "Que montre le quartet d'Anscombe ?"
    answer: "Des jeux de données très différents peuvent avoir les mêmes moyennes, variances et corrélation"
    decoys:
      - "La moyenne est toujours plus fiable que la médiane dès qu'on dispose de quatre séries de mesures"
      - "Quatre indicateurs suffisent à décrire n'importe quel jeu de données, sans graphique"
    why: "D'où la règle : toujours tracer les données, les chiffres seuls peuvent tromper."
  - id: moyenne-de-moyennes
    prompt: "Un magasin de 1 000 clients a un panier moyen de 50 €, un autre de 10 clients un panier moyen de 100 €. Pourquoi ne pas annoncer un panier moyen global de 75 € ?"
    answer: "La moyenne des moyennes ignore le nombre de clients de chaque magasin"
    decoys:
      - "Parce que 75 € est une médiane, pas une moyenne, quand on combine deux magasins"
      - "Parce qu'on ne peut jamais combiner les données de deux magasins dans un même indicateur"
    why: "Le petit magasin pèse autant que le grand dans 75 €. Il faut pondérer par le nombre de clients."
  - id: simpson
    prompt: "Qu'est-ce que le paradoxe de Simpson ?"
    answer: "Une tendance vraie dans chaque groupe peut s'inverser quand on regroupe les données"
    decoys:
      - "La moyenne d'un échantillon s'éloigne de celle de la population quand l'échantillon grandit"
      - "Deux variables corrélées dans un sens deviennent toujours corrélées dans l'autre avec le temps"
    why: "La composition des groupes peut renverser la tendance globale. D'où l'intérêt de regarder aussi les sous-groupes."
  - id: inference
    prompt: "On a mesuré 50 clients. Peut-on conclure, avec les seules statistiques descriptives, que tous les clients se comportent ainsi ?"
    answer: "Non : passer de l'échantillon à la population demande des tests et des intervalles de confiance"
    decoys:
      - "Oui, dès que l'échantillon dépasse 30 clients, la description vaut pour la population"
      - "Oui, à condition de donner la médiane plutôt que la moyenne"
    why: "La description porte sur les données observées. L'inférence (tests, intervalles de confiance) mesure l'incertitude quand on généralise."
  - id: r-summary
    prompt: "Que donne summary(clients$panier) en R ?"
    answer: "Le minimum, les quartiles, la médiane, la moyenne et le maximum"
    decoys:
      - "Un histogramme de la variable, affiché dans la fenêtre des graphiques"
      - "La liste des valeurs manquantes et leur position dans le tableau"
    why: "summary() donne un résumé numérique ; sd() donne l'écart-type, quantile() un percentile."
  - id: pandas-describe
    prompt: "Quelle méthode pandas résume en une ligne chaque colonne numérique d'un DataFrame ?"
    answer: "describe()"
    decoys:
      - "summary()"
      - "info()"
    why: "describe() donne effectif, moyenne, écart-type, minimum, quartiles et maximum. summary() est la fonction équivalente en R."
  - id: communiquer
    prompt: "Comment présenter le panier « typique » de clients dont les montants sont très asymétriques ?"
    answer: "Donner la médiane, avec une mesure de dispersion comme les quartiles"
    decoys:
      - "Donner la moyenne seule, c'est l'indicateur que tout le monde comprend"
      - "Donner le maximum, qui montre le potentiel des meilleurs clients"
    why: "Sur des données asymétriques, la moyenne seule trompe. La médiane et la dispersion donnent l'ordre de grandeur."
---
