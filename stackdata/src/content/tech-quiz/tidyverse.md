---
questions:
  - id: probleme
    prompt: "Quel problème le tidyverse résout-il ?"
    answer: "Les fonctions de R de base n'ont pas toutes le même style ; il offre des paquets qui partagent une même grammaire"
    decoys:
      - "R ne sait pas lire de fichiers ; le tidyverse ajoute l'import de CSV et d'Excel, absent du langage de base"
      - "R est trop lent pour les statistiques ; le tidyverse réécrit les tests et les modèles en C pour les accélérer"
    why: "R de base s'est construit par couches successives. Le tidyverse rassemble des paquets cohérents : même ordre d'arguments, même façon de travailler sur un tableau."
  - id: auteur
    prompt: "Qui porte le tidyverse ?"
    answer: "Hadley Wickham et la société Posit"
    decoys:
      - "Ross Ihaka et Robert Gentleman, les créateurs de R"
      - "La fondation Apache, comme Spark et Airflow"
    why: "Le tidyverse est porté par Hadley Wickham et Posit (la société de RStudio). Ihaka et Gentleman ont créé R lui-même."
  - id: installation
    prompt: "Comment installer puis charger l'ensemble du tidyverse ?"
    answer: "install.packages(\"tidyverse\") une fois, puis library(tidyverse)"
    decoys:
      - "Rien à faire : le tidyverse fait partie de R de base depuis la version 4"
      - "pip install tidyverse, puis import tidyverse dans le script R"
    why: "Le tidyverse s'installe depuis le CRAN comme un paquet, puis se charge d'un coup avec library(tidyverse)."
  - id: tidy-definition
    prompt: "Quand une table est-elle « tidy » ?"
    answer: "Chaque variable est une colonne, chaque observation une ligne, chaque valeur une cellule"
    decoys:
      - "Toutes ses colonnes ont le même type et aucune valeur n'est manquante, ce qui permet de la trier"
      - "Elle est triée par sa première colonne et ne contient aucun doublon, ni ligne ni colonne"
    why: "Les données tidy (rangées) ont une structure précise. Les valeurs manquantes ou l'ordre des lignes n'entrent pas dans la définition."
  - id: pas-tidy
    prompt: "Un tableau de ventes a une colonne par mois (janvier, février…). Pourquoi n'est-il pas tidy ?"
    answer: "Le mois est une variable : il devrait être une colonne, pas un nom de colonnes"
    decoys:
      - "Il a trop de colonnes : une table tidy en a au plus dix, au-delà il faut la découper"
      - "Les noms de colonnes contiennent des accents, que le tidyverse refuse"
    why: "Chaque variable doit être une colonne. Ici le mois est éclaté dans les noms de colonnes ; pivot_longer() le remet en colonne."
  - id: pivot-longer
    prompt: "Quelle fonction passe d'une colonne par mois à une colonne mois et une colonne montant ?"
    answer: "pivot_longer(), du paquet tidyr"
    decoys:
      - "pivot_wider(), du paquet tidyr"
      - "summarise(), du paquet dplyr"
    why: "pivot_longer() transforme des colonnes en lignes. pivot_wider() fait l'inverse ; summarise() résume des groupes."
  - id: pivot-wider
    prompt: "Que fait pivot_wider() ?"
    answer: "L'inverse de pivot_longer() : les valeurs d'une colonne deviennent des noms de colonnes"
    decoys:
      - "Elle élargit l'affichage du tableau dans la console pour voir toutes les colonnes d'un coup"
      - "Elle ajoute une colonne calculée à partir des autres, comme mutate() le ferait"
    why: "pivot_wider() passe de lignes à colonnes, par exemple une ligne par (produit, mois) vers une colonne par mois."
  - id: dplyr-role
    prompt: "À quoi sert dplyr ?"
    answer: "Transformer un tableau avec des verbes : filtrer, choisir, créer des colonnes, résumer"
    decoys:
      - "Tracer des graphiques en associant des colonnes à des propriétés visuelles, couche par couche"
      - "Lire des fichiers CSV plus vite que read.csv(), avec des types mieux devinés"
    why: "dplyr fournit les verbes de transformation. Les graphiques, c'est ggplot2 ; la lecture de fichiers, readr."
  - id: filter
    prompt: "Quel verbe dplyr garde seulement certaines lignes ?"
    answer: "filter()"
    decoys:
      - "select()"
      - "arrange()"
    why: "filter() garde les lignes qui vérifient une condition. select() choisit des colonnes, arrange() trie."
  - id: select
    prompt: "Quel verbe dplyr choisit des colonnes ?"
    answer: "select()"
    decoys:
      - "filter()"
      - "mutate()"
    why: "select() garde ou retire des colonnes. filter() agit sur les lignes, mutate() crée ou modifie une colonne."
  - id: mutate
    prompt: "Comment ajouter une colonne ttc = montant * 1.2 avec dplyr ?"
    answer: "mutate(ttc = montant * 1.2)"
    decoys:
      - "summarise(ttc = montant * 1.2)"
      - "select(ttc = montant * 1.2)"
    why: "mutate() crée ou modifie une colonne en gardant toutes les lignes. summarise() réduirait le tableau à une ligne par groupe."
  - id: arrange
    prompt: "Comment trier un tableau par total décroissant avec dplyr ?"
    answer: "arrange(desc(total))"
    decoys:
      - "sort(total, reverse = TRUE)"
      - "order_by(total, \"desc\")"
    why: "arrange() trie les lignes ; desc() inverse l'ordre."
  - id: group-by
    prompt: "Que fait group_by(ville) dans une chaîne de verbes dplyr ?"
    answer: "Les verbes suivants travaillent ville par ville"
    decoys:
      - "Il trie les lignes par ville, sans autre effet"
      - "Il garde une seule ligne par ville et supprime les autres"
    why: "group_by() ne change pas les données visibles : il fait travailler summarise() ou mutate() groupe par groupe."
  - id: summarise
    prompt: "Que donne group_by(ville) |> summarise(total = sum(montant)) ?"
    answer: "Une ligne par ville, avec son total"
    decoys:
      - "Toutes les lignes d'origine, avec une colonne total ajoutée à chacune"
      - "Une seule ligne : le total de toutes les villes réunies"
    why: "summarise() résume chaque groupe en une ligne. Pour garder toutes les lignes avec le total du groupe, on utiliserait mutate()."
  - id: n
    prompt: "Dans summarise(), que compte n() ?"
    answer: "Le nombre de lignes du groupe"
    decoys:
      - "Le nombre de colonnes du tableau"
      - "Le nombre de valeurs distinctes"
    why: "n() compte les lignes de chaque groupe : summarise(n = n()) donne l'effectif par groupe."
  - id: jointure
    prompt: "Comment relier une table de commandes à une table de clients avec dplyr ?"
    answer: "Avec une jointure, par exemple left_join()"
    decoys:
      - "Avec bind_cols(), qui colle les deux tables côte à côte"
      - "Avec pivot_wider(), qui fusionne les tables"
    why: "Les jointures (left_join()…) relient deux tables sur une colonne commune, comme en SQL."
  - id: readr
    prompt: "Quel avantage readr::read_csv() a-t-il sur read.csv() de R de base ?"
    answer: "Il lit plus vite et devine mieux les types des colonnes"
    decoys:
      - "C'est le seul moyen de lire un CSV en R"
      - "Il lit aussi les fichiers trop gros pour la mémoire"
    why: "read_csv() est plus rapide et plus prévisible. Comme le reste du tidyverse, il charge les données en mémoire."
  - id: ggplot2-membre
    prompt: "Quel paquet du tidyverse sert aux graphiques ?"
    answer: "ggplot2"
    decoys:
      - "tidyr"
      - "purrr"
    why: "ggplot2 fait partie du tidyverse. tidyr range les données, purrr applique une fonction à chaque élément."
  - id: paquets-annexes
    prompt: "Quel paquet du tidyverse travaille sur les dates ?"
    answer: "lubridate"
    decoys:
      - "stringr"
      - "forcats"
    why: "lubridate gère les dates ; stringr le texte, forcats les facteurs."
  - id: forcats
    prompt: "À quoi sert forcats ?"
    answer: "Manipuler les facteurs : modalités, ordre, regroupement"
    decoys:
      - "Prévoir les valeurs futures d'une série temporelle à partir de son historique"
      - "Formater les nombres en monnaie"
    why: "forcats travaille sur les facteurs, les variables catégorielles de R."
  - id: purrr
    prompt: "À quoi sert purrr ?"
    answer: "Appliquer une fonction à chaque élément d'une liste ou d'un vecteur"
    decoys:
      - "Nettoyer les doublons d'un tableau"
      - "Lire des fichiers Excel et Google Sheets directement dans un tibble"
    why: "purrr joue le rôle de la famille apply de R de base, avec une syntaxe cohérente avec le reste du tidyverse."
  - id: tibble
    prompt: "Qu'est-ce qu'un tibble ?"
    answer: "Un data frame à l'affichage plus lisible"
    decoys:
      - "Un format de fichier compressé propre au tidyverse"
      - "Une base de données embarquée dans R"
    why: "Le tibble est le data frame du tidyverse : même rôle, affichage plus lisible dans la console."
  - id: pipe
    prompt: "Comment s'enchaînent les verbes du tidyverse ?"
    answer: "Avec le pipe : chaque étape reçoit le tableau produit par la précédente"
    decoys:
      - "Avec des virgules dans un appel unique à tidy(), qui exécute les verbes dans l'ordre"
      - "Avec des points-virgules : chaque ligne modifie le tableau d'origine en place"
    why: "|> (ou %>% dans le code plus ancien) passe le tableau d'étape en étape."
  - id: sans-dollar
    prompt: "Dans filter(montant > 60), pourquoi n'écrit-on pas df$montant ?"
    answer: "Dans les verbes, on écrit directement le nom des colonnes du tableau reçu"
    decoys:
      - "Parce que $ est interdit depuis R 4, il faut toujours écrire le nom seul"
      - "Parce que filter() ne fonctionne que sur la première colonne du tableau"
    why: "Les verbes du tidyverse cherchent les noms dans les colonnes du tableau qu'ils reçoivent, d'où une écriture plus légère."
  - id: quand-utiliser
    prompt: "Dans quel cas le tidyverse est-il un bon choix ?"
    answer: "Préparer des données dans R : nettoyage, recodage, regroupements, jointures"
    decoys:
      - "Servir une API web qui renvoie des prédictions en quelques millisecondes"
      - "Transformer chaque nuit des téraoctets répartis sur un cluster de machines"
    why: "Le tidyverse sert à préparer et analyser des données dans R. Les volumes d'un cluster relèvent de Spark, une API d'un framework web."
  - id: lisibilite
    prompt: "Pourquoi le tidyverse est-il apprécié pour partager une analyse ?"
    answer: "Une suite de verbes se relit presque comme une phrase"
    decoys:
      - "Il chiffre le code pour que seuls les collègues puissent l'exécuter"
      - "Il génère automatiquement un rapport PDF à chaque exécution du script"
    why: "filter, group_by, summarise, arrange : la chaîne décrit ce qu'elle fait, même pour qui lit le code pour la première fois."
  - id: memoire
    prompt: "Les données ne tiennent pas en mémoire. Que faire au lieu du tidyverse seul ?"
    answer: "Passer par une base de données ou DuckDB, interrogeables depuis R"
    decoys:
      - "Rien : le tidyverse découpe automatiquement les données trop grosses en morceaux"
      - "Convertir le tableau en tibble, qui ne charge que les lignes affichées"
    why: "Comme pandas, le tidyverse travaille en mémoire. Une base ou DuckDB traite les gros volumes, et R récupère le résultat."
  - id: stabilite
    prompt: "Pourquoi un paquet R minimal, destiné à durer, préfère-t-il parfois R de base au tidyverse ?"
    answer: "Le tidyverse évolue et a déjà rendu obsolètes certaines fonctions"
    decoys:
      - "Le tidyverse est payant pour les paquets publiés sur le CRAN"
      - "Le tidyverse ne fonctionne pas sous Windows"
    why: "Le tidyverse change plus vite que R de base. Pour limiter les dépendances d'un paquet, R de base suffit souvent."
  - id: pandas
    prompt: "Quel est l'équivalent du tidyverse dans l'écosystème Python ?"
    answer: "pandas, avec son DataFrame"
    decoys:
      - "Airflow, avec ses DAG"
      - "FastAPI, avec ses routes"
    why: "pandas fait en Python ce que dplyr et tidyr font en R : filtrer, regrouper, joindre, remodeler un tableau."
  - id: equipe-python
    prompt: "Une équipe travaille entièrement en Python. Faut-il adopter le tidyverse pour préparer ses données ?"
    answer: "Non : pandas fait le même travail dans l'écosystème de l'équipe"
    decoys:
      - "Oui : le tidyverse est le seul outil qui sait regrouper et joindre des tableaux"
      - "Oui : le tidyverse s'importe directement dans un script Python avec import"
    why: "Le tidyverse est un ensemble de paquets R. En Python, pandas couvre les mêmes besoins."
---
