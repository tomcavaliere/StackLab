---
questions:
  - id: probleme
    prompt: "Pour quel usage le langage R a-t-il été pensé ?"
    answer: "L'analyse statistique : tableaux de données, valeurs manquantes, tests et modèles font partie du langage"
    decoys:
      - "Le développement d'applications web, avec un serveur HTTP et un système de templates intégrés"
      - "La programmation système, pour écrire des pilotes, des noyaux et des outils en ligne de commande proches du matériel"
    why: "R part des statistiques : le data frame, NA, t.test() ou lm() sont dans le langage de base. Le web et le système ne sont pas son terrain."
  - id: origine
    prompt: "D'où vient R ?"
    answer: "Ross Ihaka et Robert Gentleman l'ont créé à Auckland, comme implémentation libre du langage S"
    decoys:
      - "Google l'a conçu pour remplacer Python dans ses équipes de data science"
      - "C'est une extension de Python, ajoutée pour les statisticiens au début des années 2000 par la fondation Python"
    why: "R est né à l'université d'Auckland au début des années 1990, comme implémentation libre de S, un langage des laboratoires Bell."
  - id: cran
    prompt: "Qu'est-ce que le CRAN ?"
    answer: "Le dépôt qui distribue les paquets R"
    decoys:
      - "L'éditeur de code le plus utilisé pour écrire du R"
      - "Le format de fichier des tableaux de données R"
    why: "Le CRAN (Comprehensive R Archive Network) distribue des milliers de paquets. L'éditeur le plus courant est RStudio."
  - id: bioconductor
    prompt: "Dans quel domaine Bioconductor joue-t-il le rôle du CRAN ?"
    answer: "La bio-informatique"
    decoys:
      - "L'apprentissage profond"
      - "Les applications mobiles"
    why: "Bioconductor distribue les paquets R de bio-informatique, un des domaines où R est la norme."
  - id: rstudio
    prompt: "Qu'est-ce que RStudio ?"
    answer: "L'éditeur le plus utilisé pour écrire et exécuter du R, de la société Posit"
    decoys:
      - "Le dépôt officiel des paquets R, maintenu par les auteurs du langage"
      - "Une version commerciale de R, plus rapide que la version libre et vendue avec ses propres paquets"
    why: "RStudio est un éditeur (de Posit). R tourne aussi dans Jupyter et VS Code. Les paquets viennent du CRAN."
  - id: affectation
    prompt: "Quel opérateur d'affectation est l'usage habituel en R ?"
    answer: "<-, même si = fonctionne aussi"
    decoys:
      - ":=, comme en Go"
      - "==, le seul accepté hors des fonctions"
    why: "nom <- \"Ada\" est la forme habituelle ; = fonctionne aussi. == compare deux valeurs."
  - id: indice-un
    prompt: "Avec x <- c(4, 8, 15), que vaut x[1] ?"
    answer: "4 : les indices commencent à 1"
    decoys:
      - "8 : les indices commencent à 0, comme en Python"
      - "Une erreur : il faut écrire x$1"
    why: "En R, le premier élément est x[1]. C'est une des particularités qui surprennent les développeurs habitués à l'indice 0."
  - id: indice-negatif
    prompt: "Avec x <- c(4, 8, 15, 16), que donne x[-1] ?"
    answer: "8 15 16 : un indice négatif exclut l'élément"
    decoys:
      - "16 : un indice négatif part de la fin, comme en Python"
      - "Une erreur : les indices négatifs n'existent pas en R"
    why: "En R, x[-1] retire le premier élément. Contrairement à Python, un indice négatif ne compte pas depuis la fin."
  - id: tout-vecteur
    prompt: "Que veut dire « en R, tout est vecteur » ?"
    answer: "Même un nombre seul est un vecteur de longueur 1"
    decoys:
      - "Toutes les variables doivent être déclarées avec c() avant d'être utilisées"
      - "R n'a pas de tableaux de données : tout se range dans des vecteurs séparés"
    why: "Un nombre seul est un vecteur d'un élément, ce qui explique que les opérations soient vectorisées partout."
  - id: vectorisation
    prompt: "Avec x <- c(4, 8, 15, 16), que donne x * 2 ?"
    answer: "8 16 30 32"
    decoys:
      - "4 8 15 16 4 8 15 16"
      - "Une erreur : il faut une boucle for"
    why: "Les opérations sont vectorisées : elles s'appliquent à chaque élément, sans boucle."
  - id: recyclage
    prompt: "Que donne c(1, 2, 3, 4) + c(10, 20) ?"
    answer: "11 22 13 24 : le vecteur le plus court est recyclé"
    decoys:
      - "11 22 3 4 : les éléments sans partenaire restent inchangés"
      - "Une erreur : les deux vecteurs n'ont pas la même longueur"
    why: "Quand les longueurs diffèrent, R répète le vecteur le plus court : c(10, 20) devient 10 20 10 20."
  - id: condition-indexation
    prompt: "Avec x <- c(4, 8, 15, 16), que donne x[x > 10] ?"
    answer: "15 16"
    decoys:
      - "TRUE TRUE"
      - "3 4"
    why: "x > 10 donne un vecteur de TRUE/FALSE ; l'utiliser comme indice garde les éléments où il vaut TRUE. which(x > 10) donnerait les positions, 3 et 4."
  - id: na-propagation
    prompt: "Que vaut mean(c(1, NA, 3)) ?"
    answer: "NA : la valeur manquante se propage"
    decoys:
      - "2 : R ignore les valeurs manquantes par défaut"
      - "1.33 : NA compte comme 0"
    why: "Par défaut, une valeur manquante rend le résultat manquant. Il faut demander explicitement de l'ignorer."
  - id: na-rm
    prompt: "Comment obtenir la moyenne de c(1, NA, 3) sans la valeur manquante ?"
    answer: "mean(c(1, NA, 3), na.rm = TRUE), qui vaut 2"
    decoys:
      - "mean(c(1, NA, 3), skipna = TRUE), qui vaut 2"
      - "mean(na.omit = c(1, NA, 3)), qui vaut 2"
    why: "na.rm = TRUE (« NA remove ») ignore les valeurs manquantes. skipna est l'argument équivalent dans pandas, pas en R."
  - id: na-null
    prompt: "Quelle différence entre NA et NULL en R ?"
    answer: "NA est une valeur manquante dans un vecteur ; NULL est l'absence d'objet"
    decoys:
      - "Aucune : ce sont deux noms pour la même valeur manquante"
      - "NA marque une erreur de calcul ; NULL une valeur manquante dans un tableau"
    why: "NA garde la place d'une valeur inconnue (une case vide d'un tableau). NULL signifie qu'il n'y a pas d'objet du tout."
  - id: if-ifelse
    prompt: "Pourquoi utiliser ifelse() plutôt que if pour classer chaque élément d'un vecteur ?"
    answer: "if ne teste qu'une seule valeur ; ifelse() donne un résultat par élément"
    decoys:
      - "if est réservé aux fonctions, ifelse() s'utilise partout ailleurs"
      - "ifelse() est simplement plus rapide que if, mais le résultat est exactement le même sur un vecteur"
    why: "ifelse(x > 10, \"grand\", \"petit\") est vectorisé. if attend une seule valeur logique."
  - id: et-logique
    prompt: "Dans un if, quel opérateur « et » utiliser pour combiner deux conditions simples ?"
    answer: "&&, qui travaille sur une seule valeur"
    decoys:
      - "&, qui est le seul « et » de R"
      - "and, comme en Python"
    why: "& et | sont vectorisés (élément par élément) ; && et || s'utilisent pour une seule valeur, typiquement dans un if."
  - id: in-operator
    prompt: "Que vaut \"b\" %in% c(\"a\", \"b\") ?"
    answer: "TRUE"
    decoys:
      - "2"
      - "\"b\""
    why: "%in% teste l'appartenance et renvoie TRUE ou FALSE. La position s'obtient avec match()."
  - id: modulo
    prompt: "Comment tester qu'un nombre i est pair en R ?"
    answer: "i %% 2 == 0"
    decoys:
      - "i % 2 == 0"
      - "i mod 2 == 0"
    why: "%% donne le reste de la division entière : 7 %% 2 vaut 1. Le % seul n'est pas un opérateur en R."
  - id: sapply-lapply
    prompt: "Quelle différence entre sapply() et lapply() ?"
    answer: "sapply() rend un vecteur quand c'est possible, lapply() rend toujours une liste"
    decoys:
      - "sapply() parcourt les lignes d'un tableau, lapply() ses colonnes"
      - "sapply() s'exécute en parallèle sur plusieurs cœurs de la machine, lapply() sur un seul cœur"
    why: "Les deux appliquent une fonction à chaque élément. sapply(1:3, function(i) i^2) donne le vecteur 1 4 9."
  - id: boucles
    prompt: "Pourquoi éviter une boucle for quand une opération vectorisée existe ?"
    answer: "Le code vectorisé est plus court et plus rapide"
    decoys:
      - "Les boucles for n'existent pas en R"
      - "Une boucle for modifie toujours le vecteur d'origine, même sans affectation"
    why: "Les boucles existent, mais x * 2 fait en une expression ce qu'une boucle ferait en plusieurs lignes, et plus vite."
  - id: liste
    prompt: "Qu'est-ce qui distingue une liste d'un vecteur en R ?"
    answer: "Une liste peut contenir des éléments de types différents"
    decoys:
      - "Une liste est ordonnée et nommée, alors qu'un vecteur ne l'est jamais"
      - "Une liste ne peut contenir que des nombres"
    why: "list(nom = \"Ada\", langages = c(\"R\", \"Python\")) mélange un texte et un vecteur. Un vecteur a un seul type."
  - id: facteur
    prompt: "Qu'est-ce qu'un facteur (factor) en R ?"
    answer: "Une variable catégorielle, avec ses modalités (levels)"
    decoys:
      - "Un coefficient multiplicateur appliqué à une colonne"
      - "Un nombre entier, avec le suffixe L"
    why: "factor(c(\"S\", \"M\", \"S\")) représente une catégorie. Les modèles statistiques savent l'exploiter. L'entier s'écrit 5L."
  - id: table
    prompt: "Que donne table() sur un facteur de tailles S, M, S, L ?"
    answer: "Le nombre d'observations par modalité : S 2, M 1, L 1"
    decoys:
      - "Un data frame à quatre lignes, une par observation"
      - "Les modalités triées : L, M, S, S"
    why: "table() compte les occurrences de chaque modalité."
  - id: data-frame
    prompt: "Qu'est-ce qu'un data frame ?"
    answer: "Le tableau de données natif de R : une colonne par variable, chacune avec son type"
    decoys:
      - "Un paquet du CRAN qu'il faut installer pour lire des fichiers CSV"
      - "Une matrice de nombres où toutes les colonnes doivent avoir le même type, sans valeur manquante"
    why: "Le data frame fait partie de R de base : chaque colonne a son type, chaque ligne est une observation."
  - id: selection-lignes
    prompt: "Que sélectionne df[df$montant > 60, ] ?"
    answer: "Les lignes où montant dépasse 60, avec toutes les colonnes"
    decoys:
      - "La colonne montant, uniquement pour les valeurs au-dessus de 60"
      - "Les 60 premières lignes du tableau"
    why: "df[lignes, colonnes] : la condition choisit les lignes, et le côté colonnes laissé vide garde toutes les colonnes."
  - id: dollar
    prompt: "Que fait df$montant ?"
    answer: "Renvoie la colonne montant du data frame"
    decoys:
      - "Convertit la colonne montant en euros"
      - "Supprime la colonne montant du data frame"
    why: "$ accède à un élément nommé : une colonne d'un data frame, ou un élément d'une liste (personne$nom)."
  - id: retour-fonction
    prompt: "Que renvoie une fonction R sans instruction return() ?"
    answer: "La valeur de sa dernière expression"
    decoys:
      - "NULL, toujours"
      - "Le premier argument reçu"
    why: "return() existe mais n'est pas nécessaire : function(r) 3.14 * r^2 renvoie l'aire."
  - id: pipe
    prompt: "Que fait x |> sqrt() |> sum() ?"
    answer: "Calcule sum(sqrt(x)) : le pipe passe le résultat de gauche à la fonction de droite"
    decoys:
      - "Calcule sqrt(x) et sum(x) en parallèle, puis affiche les deux résultats l'un sous l'autre"
      - "Calcule sqrt(sum(x)) : le pipe lit les fonctions de droite à gauche"
    why: "Le pipe natif |> (R 4.1 et plus) passe le résultat comme premier argument de la fonction suivante. Le tidyverse utilise aussi %>%."
  - id: install-library
    prompt: "Quelle différence entre install.packages(\"dplyr\") et library(dplyr) ?"
    answer: "install.packages() installe depuis le CRAN, une fois ; library() charge dans la session, à chaque fois"
    decoys:
      - "install.packages() installe pour la session courante ; library() installe pour toujours"
      - "Aucune : library() est l'ancien nom d'install.packages(), gardé pour la compatibilité avec les vieux scripts"
    why: "On installe un paquet une seule fois sur la machine, puis on le charge avec library() dans chaque session qui l'utilise."
  - id: formule
    prompt: "Que signifie montant ~ ville dans t.test(montant ~ ville, data = df) ?"
    answer: "Une formule : montant expliqué par ville"
    decoys:
      - "Montant approximativement égal à ville"
      - "Montant divisé par le nombre de villes"
    why: "La notation y ~ x est une formule. Elle sert aux tests (t.test), aux modèles (lm, glm) et aux graphiques."
  - id: quand-utiliser
    prompt: "Dans quel contexte R est-il un choix naturel ?"
    answer: "Biostatistiques, épidémiologie, économie : des domaines où R est la norme"
    decoys:
      - "Une API web à fort trafic, qui doit répondre en quelques millisecondes"
      - "Une application mobile hors ligne, publiée sur les magasins d'applications d'Apple et de Google"
    why: "R brille en statistiques et dans la recherche ; les méthodes récentes y arrivent souvent en premier. Le web et le mobile ne sont pas son terrain."
  - id: quand-eviter
    prompt: "Dans quel cas Python est-il un meilleur choix que R ?"
    answer: "Deep learning, ou code qui doit partir en production dans une application"
    decoys:
      - "Un test de Student sur deux groupes de clients"
      - "Un rapport reproductible avec des graphiques soignés, mêlant le code, les résultats et le texte"
    why: "L'écosystème du deep learning (PyTorch) vit en Python, qui s'intègre aussi mieux dans une application. Tests et rapports sont des points forts de R."
---
