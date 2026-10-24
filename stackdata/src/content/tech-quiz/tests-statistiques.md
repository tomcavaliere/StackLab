---
questions:
  - id: probleme
    prompt: "À quelle question répond un test d'hypothèse ?"
    answer: "L'écart observé dans l'échantillon peut-il s'expliquer par le seul hasard ?"
    decoys:
      - "Quelle est la valeur exacte de l'effet dans toute la population, sans aucune incertitude ?"
      - "Quelle variable cause l'autre, parmi toutes celles du jeu de données ?"
    why: "Deux échantillons tirés de la même population n'ont presque jamais la même moyenne. Le test mesure si l'écart est trop grand pour être du hasard."
  - id: h0
    prompt: "Que dit l'hypothèse nulle (H0) quand on compare deux groupes ?"
    answer: "Il n'y a pas d'effet : les deux groupes ont la même moyenne"
    decoys:
      - "Il y a un effet, et c'est ce que le test va démontrer"
      - "Les deux groupes n'ont aucune valeur en commun"
    why: "H0 est l'hypothèse d'absence d'effet. L'hypothèse alternative (H1) dit qu'il y en a un."
  - id: p-value
    prompt: "Qu'est-ce que la p-value ?"
    answer: "La probabilité d'observer un écart au moins aussi grand si H0 était vraie"
    decoys:
      - "La probabilité que l'hypothèse nulle soit vraie, compte tenu des données observées"
      - "La probabilité que le résultat soit reproduit si l'on refait l'expérience"
    why: "La p-value se calcule en supposant H0 vraie. Ce n'est ni la probabilité de H0, ni celle de reproduire le résultat."
  - id: p-value-erreur
    prompt: "Une p-value de 0,03 veut-elle dire qu'il y a 3 % de chances que H0 soit vraie ?"
    answer: "Non : c'est la probabilité d'un écart au moins aussi grand si H0 était vraie"
    decoys:
      - "Oui : c'est exactement la définition de la p-value"
      - "Oui, mais seulement si l'échantillon compte plus de 100 observations par groupe comparé"
    why: "C'est l'erreur d'interprétation la plus fréquente. La p-value suppose H0 vraie, elle ne mesure pas sa probabilité."
  - id: seuil
    prompt: "Quel seuil α est le plus souvent utilisé, par convention ?"
    answer: "5 %"
    decoys:
      - "50 %"
      - "0,5 %"
    why: "5 % est une convention, fixée avant de regarder les données. Sous ce seuil, on rejette H0."
  - id: significatif
    prompt: "Que veut dire « statistiquement significatif » ?"
    answer: "La p-value est sous le seuil fixé : on rejette H0"
    decoys:
      - "L'effet est grand et important pour l'entreprise"
      - "Le résultat est certain, sans risque d'erreur"
    why: "Significatif veut dire que l'écart est peu compatible avec le hasard seul. Cela ne dit rien de sa taille, et un faux positif reste possible."
  - id: non-rejet
    prompt: "Le test ne rejette pas H0. Peut-on conclure qu'il n'y a pas d'effet ?"
    answer: "Non : l'échantillon était peut-être trop petit pour le voir"
    decoys:
      - "Oui : ne pas rejeter H0 prouve qu'elle est vraie, quelle que soit la taille de l'échantillon"
      - "Oui, si la p-value est supérieure à 50 %"
    why: "Ne pas rejeter H0 n'est pas prouver l'absence d'effet. Un test peu puissant rate des effets réels."
  - id: type-1
    prompt: "Qu'est-ce qu'une erreur de première espèce ?"
    answer: "Rejeter H0 alors qu'elle est vraie : un faux positif"
    decoys:
      - "Ne pas rejeter H0 alors qu'elle est fausse : un faux négatif"
      - "Se tromper dans le calcul de la moyenne d'un des groupes"
    why: "Conclure à un effet qui n'existe pas. Sa probabilité est le seuil α."
  - id: type-2
    prompt: "Qu'est-ce qu'une erreur de seconde espèce ?"
    answer: "Ne pas rejeter H0 alors qu'il y a un effet réel : un faux négatif"
    decoys:
      - "Rejeter H0 alors qu'elle est vraie : un faux positif"
      - "Choisir un test qui ne correspond pas à la forme des données, comme un t sur des rangs"
    why: "On rate un effet qui existe. Le risque diminue quand la puissance augmente."
  - id: alpha-proba
    prompt: "À quoi correspond le seuil α ?"
    answer: "La probabilité de faux positif qu'on accepte"
    decoys:
      - "La probabilité de détecter un effet réel"
      - "La taille minimale de l'effet recherché"
    why: "Rejeter H0 quand p < α, c'est accepter une probabilité α de rejeter à tort. Détecter un effet réel, c'est la puissance."
  - id: puissance
    prompt: "Qu'est-ce que la puissance d'un test ?"
    answer: "Sa probabilité de détecter un effet qui existe vraiment"
    decoys:
      - "Sa probabilité de ne jamais se tromper, quelle que soit la réalité"
      - "Le nombre de variables qu'il peut comparer à la fois"
    why: "Un test puissant voit les effets réels. Il ne protège pas pour autant des faux positifs, qui dépendent de α."
  - id: puissance-facteurs
    prompt: "Qu'est-ce qui augmente la puissance d'un test ?"
    answer: "Un échantillon plus grand, ou un effet plus grand"
    decoys:
      - "Un seuil α plus petit, par exemple 1 % au lieu de 5 %"
      - "Un test non paramétrique à la place d'un t de Student"
    why: "Plus d'observations et un effet plus marqué rendent l'écart plus facile à distinguer du hasard."
  - id: intervalle
    prompt: "Qu'apporte un intervalle de confiance à 95 % par rapport à un simple verdict significatif ou non ?"
    answer: "Une plage de valeurs plausibles pour l'effet, et donc sa précision"
    decoys:
      - "La garantie que 95 % des observations sont dans l'intervalle"
      - "La probabilité que le test soit juste, à 95 %"
    why: "L'intervalle dit de combien l'effet peut être, pas seulement s'il existe. Sa largeur mesure ce qu'on sait."
  - id: intervalle-zero
    prompt: "L'intervalle de confiance à 95 % de l'écart entre deux groupes ne contient pas 0. Qu'en déduire ?"
    answer: "Le test correspondant au seuil de 5 % est significatif"
    decoys:
      - "Les deux groupes n'ont aucune observation en commun"
      - "L'écart observé est forcément important en pratique"
    why: "Un intervalle qui exclut 0 correspond à un test significatif au seuil de 5 %. La taille de l'effet reste à juger."
  - id: intervalle-large
    prompt: "Que signale un intervalle de confiance très large ?"
    answer: "Qu'on sait peu de choses sur la valeur de l'effet"
    decoys:
      - "Que l'effet est très grand, bien au-delà de ce que le hasard produit"
      - "Que le test est forcément significatif"
    why: "La largeur reflète la précision. Un échantillon plus grand la réduit."
  - id: student
    prompt: "Quel test compare la moyenne de deux groupes indépendants ?"
    answer: "Le t de Student"
    decoys:
      - "Le test du χ²"
      - "L'ANOVA"
    why: "Le t de Student compare deux moyennes. L'ANOVA en compare plus de deux, le χ² porte sur des variables catégorielles."
  - id: welch
    prompt: "Quelle variante du test t la fonction t.test() de R utilise-t-elle par défaut ?"
    answer: "Celle de Welch, qui n'exige pas des variances égales"
    decoys:
      - "Celle de Student classique, qui suppose des variances égales"
      - "Le test apparié, qui compare les mêmes individus"
    why: "Par défaut, t.test() applique la correction de Welch. En Python, scipy fait de même avec equal_var=False."
  - id: apparie
    prompt: "On mesure les mêmes personnes avant et après une formation. Quel test utiliser ?"
    answer: "Un t apparié, sur la différence de chaque personne"
    decoys:
      - "Un t pour deux groupes indépendants, avant et après"
      - "Un test du χ² sur les deux séries"
    why: "Les mesures sont liées deux à deux. Les traiter comme indépendantes ignore cette information et fausse le test."
  - id: anova
    prompt: "Quel test compare les moyennes de plus de deux groupes ?"
    answer: "L'ANOVA"
    decoys:
      - "Le t apparié"
      - "Le test de Wilcoxon"
    why: "L'ANOVA (analyse de la variance) généralise la comparaison de moyennes à plusieurs groupes."
  - id: chi2
    prompt: "Quel test vérifie si deux variables catégorielles sont indépendantes, ou si des proportions diffèrent ?"
    answer: "Le test du χ² (khi-deux)"
    decoys:
      - "Le t de Student"
      - "La corrélation de Pearson"
    why: "Le χ² travaille sur des effectifs par catégorie (un tableau croisé). Le t de Student compare des moyennes."
  - id: non-parametrique
    prompt: "Quand préférer un test non paramétrique comme Wilcoxon ou Mann-Whitney ?"
    answer: "Données loin d'une loi normale, petits échantillons, ou données de rangs"
    decoys:
      - "Données nombreuses et parfaitement normales, pour gagner en puissance"
      - "Variables catégorielles à plus de deux modalités, dans un tableau croisé"
    why: "Ces tests ne supposent pas une forme de distribution. Pour des variables catégorielles, c'est le χ²."
  - id: tests-multiples
    prompt: "On fait 20 tests au seuil de 5 % alors qu'il n'y a aucun effet réel. À quoi s'attendre ?"
    answer: "En moyenne, à un faux positif"
    decoys:
      - "À aucun faux positif : chaque test reste à 5 %"
      - "À vingt faux positifs, un par test"
    why: "Chaque test a 5 % de chances de rejeter à tort : sur 20 tests, cela fait en moyenne un faux positif."
  - id: bonferroni
    prompt: "Que fait la correction de Bonferroni ?"
    answer: "Elle divise le seuil α par le nombre de tests"
    decoys:
      - "Elle multiplie la taille de l'échantillon par le nombre de tests"
      - "Elle supprime les tests dont la p-value est la plus grande"
    why: "Avec un seuil plus strict pour chaque test, le risque d'au moins un faux positif sur l'ensemble reste maîtrisé."
  - id: p-hacking
    prompt: "Qu'est-ce que le p-hacking ?"
    answer: "Essayer des variantes, des sous-groupes ou des exclusions jusqu'à passer sous 5 %"
    decoys:
      - "Calculer la p-value à la main plutôt qu'avec un logiciel, au risque d'erreurs d'arrondi"
      - "Publier une p-value arrondie au centième au lieu de la valeur exacte"
    why: "À force d'essais, on finit par trouver un résultat significatif par hasard, qui ne se reproduit pas."
  - id: grand-echantillon
    prompt: "Sur un million d'utilisateurs, un écart minuscule est significatif. Faut-il agir ?"
    answer: "Pas forcément : significatif ne veut pas dire important, il faut regarder la taille de l'effet"
    decoys:
      - "Oui : un résultat significatif est toujours un effet important à exploiter, d'autant plus que l'échantillon est grand"
      - "Non : un test sur plus de mille personnes n'est jamais fiable"
    why: "Avec beaucoup de données, des écarts négligeables deviennent significatifs. La taille de l'effet et son intervalle disent s'il compte."
  - id: conditions
    prompt: "Laquelle de ces situations viole une condition d'un test t pour deux groupes indépendants ?"
    answer: "Les mêmes clients apparaissent plusieurs fois dans les deux groupes"
    decoys:
      - "Les deux groupes n'ont pas exactement le même nombre d'observations"
      - "Les moyennes des deux groupes sont différentes"
    why: "Le test suppose des observations indépendantes. Des groupes de tailles différentes sont acceptés ; des moyennes différentes, c'est ce qu'on teste."
  - id: population
    prompt: "On dispose des notes de tous les élèves d'une classe et on ne s'intéresse qu'à cette classe. Faut-il un test pour comparer filles et garçons ?"
    answer: "Non : on a toute la population, la description suffit"
    decoys:
      - "Oui : un test est obligatoire dès qu'on compare deux groupes"
      - "Oui, un t apparié, car ce sont les mêmes élèves"
    why: "Le test sert à inférer d'un échantillon vers une population. Quand on a toute la population étudiée, il n'y a rien à inférer."
  - id: r-fonctions
    prompt: "Quelle fonction de R réalise un test du χ² d'indépendance ?"
    answer: "chisq.test()"
    decoys:
      - "t.test()"
      - "wilcox.test()"
    why: "chisq.test() prend un tableau croisé. t.test() compare des moyennes, wilcox.test() est non paramétrique."
  - id: usage
    prompt: "Dans quel cas un test d'hypothèse est-il utile ?"
    answer: "Analyser une expérience, comme un A/B test, ou vérifier qu'un écart n'est pas du bruit"
    decoys:
      - "Calculer le chiffre d'affaires exact du mois à partir de toutes les factures de l'entreprise"
      - "Choisir le type de graphique le plus lisible pour présenter un résultat au comité de direction"
    why: "Le test sert à décider à partir d'un échantillon. Un total calculé sur toutes les factures n'a pas d'incertitude d'échantillonnage."
  - id: avance
    prompt: "Pourquoi fixer le seuil et l'hypothèse avant de regarder les données ?"
    answer: "Pour ne pas les adapter au résultat, ce qui gonflerait les faux positifs"
    decoys:
      - "Parce que les logiciels refusent de changer le seuil une fois les données chargées"
      - "Parce que le seuil dépend de la moyenne des données, qu'il faut calculer avant"
    why: "Choisir l'hypothèse ou le seuil après coup revient à chercher jusqu'à trouver, le principe du p-hacking."
---
