---
questions:
  - id: philosophie
    prompt: "Que privilégie le langage Ruby ?"
    answer: "L'expressivité et le confort du développeur"
    decoys:
      - "La performance brute avant tout"
      - "Un langage minimal, avec très peu de mots-clés"
    why: "Ruby cherche à rendre le code agréable à écrire et à lire. Le minimalisme revendiqué, c'est plutôt Go."
  - id: tout-objet
    prompt: "Quelle caractéristique est centrale en Ruby ?"
    answer: "Tout est objet"
    decoys:
      - "Le langage n'a pas de classes"
      - "Le typage est statique et vérifié à la compilation"
    why: "En Ruby, même un nombre est un objet. Le typage est dynamique."
  - id: dsl
    prompt: "Qu'est-ce qui permet de créer de petits langages internes (DSL) en Ruby ?"
    answer: "La métaprogrammation"
    decoys:
      - "Les goroutines"
      - "Le verrou global de l'interpréteur"
    why: "Rails en tire parti pour décrire une application avec très peu de code."
  - id: verrou-global
    prompt: "Quel point commun CRuby partage-t-il avec CPython ?"
    answer: "Un verrou global qui limite le parallélisme des threads"
    decoys:
      - "Une compilation vers la JVM"
      - "Un typage statique optionnel vérifié par l'interpréteur"
    why: "Comme CPython avec son GIL, l'interpréteur de référence de Ruby limite le parallélisme des threads."
  - id: yjit
    prompt: "Qu'est-ce que YJIT ?"
    answer: "Un compilateur à la volée développé chez Shopify, intégré depuis Ruby 3.1"
    decoys:
      - "Le gestionnaire de dépendances de Ruby, qui remplace Bundler"
      - "Un framework web concurrent de Rails, créé chez Shopify"
    why: "YJIT améliore les performances des applications Rails en production."
  - id: bundler
    prompt: "Avec quoi installe-t-on les bibliothèques (gems) d'un projet Ruby ?"
    answer: "Bundler"
    decoys:
      - "npm"
      - "Composer"
    why: "npm est le gestionnaire de JavaScript, Composer celui de PHP."
  - id: createur
    prompt: "Qui a créé Ruby ?"
    answer: "Yukihiro Matsumoto, en 1995"
    decoys:
      - "David Heinemeier Hansson, en 2004"
      - "Guido van Rossum, en 1991"
    why: "David Heinemeier Hansson a créé Rails ; Guido van Rossum a créé Python."
  - id: data
    prompt: "Data et machine learning en Ruby ?"
    answer: "L'écosystème est très en retrait par rapport à Python"
    decoys:
      - "Ruby est le langage de référence du ML, devant Python"
      - "Rails intègre un moteur de ML complet"
    why: "Pour la data, Python domine largement."
  - id: recrutement
    prompt: "Quel inconvénient Ruby présente-t-il pour recruter ?"
    answer: "Le vivier est plus restreint que pour JavaScript, Python ou Java"
    decoys:
      - "Le langage n'est plus maintenu"
      - "Il est réservé aux entreprises japonaises, faute de documentation en anglais"
    why: "Ruby est bien vivant, mais moins répandu que les grands langages généralistes."
  - id: usage-principal
    prompt: "Pour quel usage Ruby est-il surtout connu ?"
    answer: "Les applications web avec Ruby on Rails"
    decoys:
      - "Les pilotes de périphériques"
      - "Les applications mobiles natives pour iOS et Android"
    why: "Ruby doit l'essentiel de sa notoriété à Rails."
  - id: symboles
    prompt: "Qu'est-ce qu'un symbole comme :nom en Ruby ?"
    answer: "Un identifiant immuable, unique en mémoire pour un même nom"
    decoys:
      - "Une variable globale, accessible depuis n'importe quel fichier du programme"
      - "Une chaîne mutable qu'on peut modifier sur place, par exemple avec <<"
    why: "Deux :nom désignent le même objet ; on s'en sert souvent comme clés de hash. Les variables globales commencent par $."
  - id: blocs
    prompt: "En Ruby, que représente { |x| puts x } dans [1, 2, 3].each { |x| puts x } ?"
    answer: "Un bloc : du code passé à la méthode each, appelé pour chaque élément"
    decoys:
      - "Une table de hachage littérale, créée puis parcourue par la méthode each"
      - "Une fonction anonyme exécutée dans un thread séparé, en parallèle des autres"
    why: "Les blocs sont omniprésents en Ruby : each, map ou select en reçoivent un. Un hash littéral s'écrit avec des paires clé => valeur."
  - id: yield
    prompt: "Que fait yield dans une méthode Ruby ?"
    answer: "Il appelle le bloc passé à la méthode"
    decoys:
      - "Il suspend le thread courant pour laisser la main au planificateur"
      - "Il renvoie une valeur et termine la méthode, comme return"
    why: "yield exécute le bloc reçu, éventuellement avec des arguments, puis la méthode continue."
  - id: valeurs-fausses
    prompt: "Quelles valeurs sont fausses dans une condition Ruby ?"
    answer: "Seulement false et nil"
    decoys:
      - "false, nil, 0 et la chaîne vide"
      - "false, nil et les tableaux vides"
      - "false, 0 et nil"
    why: "En Ruby, 0, \"\" et [] sont vrais : seuls false et nil sont faux, contrairement à Python ou PHP."
  - id: point-exclamation
    prompt: "Que signale, par convention, un point d'exclamation en fin de nom de méthode (sort!, save!) ?"
    answer: "Une version « dangereuse » : elle modifie l'objet en place ou lève une exception"
    decoys:
      - "Une méthode privée, appelable seulement depuis l'intérieur de la classe qui la définit"
      - "Une méthode qui renvoie toujours un booléen, true ou false, sans effet de bord"
    why: "sort! trie le tableau lui-même, save! lève une exception en cas d'échec. Les méthodes qui renvoient un booléen finissent par un point d'interrogation."
  - id: point-interrogation
    prompt: "Que signale, par convention, un point d'interrogation en fin de nom de méthode (empty?, include?) ?"
    answer: "Elle répond par vrai ou faux"
    decoys:
      - "Elle peut renvoyer nil au lieu de lever une exception"
      - "Elle s'exécute de façon asynchrone et renvoie une promesse"
    why: "Les méthodes en ? sont des prédicats. Celles qui lèvent une exception portent plutôt un point d'exclamation."
  - id: classes-ouvertes
    prompt: "Que permettent les classes ouvertes (monkey patching) en Ruby ?"
    answer: "Rouvrir une classe existante, même String, pour y ajouter des méthodes"
    decoys:
      - "Hériter de plusieurs classes à la fois, avec résolution automatique des conflits de noms"
      - "Rendre publics tous les attributs d'une classe sans écrire le moindre accesseur"
    why: "C'est puissant mais risqué : modifier une classe de base touche tout le programme. Ruby n'a pas d'héritage multiple."
  - id: modules-mixins
    prompt: "Comment Ruby partage-t-il du comportement entre classes, sans héritage multiple ?"
    answer: "En incluant des modules (mixins)"
    decoys:
      - "Avec des interfaces implémentées explicitement, comme en Java"
      - "En copiant les méthodes par des macros évaluées à la compilation"
    why: "include Comparable ou include Enumerable ajoute à une classe tout un jeu de méthodes. Ruby n'a pas d'interfaces à la Java."
  - id: method-missing
    prompt: "À quoi sert method_missing en Ruby ?"
    answer: "Intercepter les appels à des méthodes non définies, pour y répondre dynamiquement"
    decoys:
      - "Signaler, avant l'exécution, les méthodes appelées mais jamais définies dans le projet"
      - "Lister les méthodes d'une classe qui ne sont pas encore couvertes par des tests"
    why: "C'est l'un des outils de métaprogrammation de Ruby. Ruby étant dynamique, rien n'est vérifié avant l'exécution."
  - id: irb
    prompt: "Qu'est-ce qu'IRB ?"
    answer: "La console interactive de Ruby"
    decoys:
      - "Le gestionnaire de versions de Ruby"
      - "Le format du fichier de dépendances d'un projet"
      - "Le compilateur à la volée intégré à CRuby"
    why: "IRB (Interactive Ruby) permet de tester du code ligne à ligne. Le compilateur à la volée, c'est YJIT."
  - id: gemfile
    prompt: "Quel fichier liste les gems d'un projet Ruby pour Bundler ?"
    answer: "Gemfile"
    decoys:
      - "package.json"
      - "requirements.txt"
      - "composer.json"
    why: "package.json sert à npm, requirements.txt à pip, composer.json à Composer (PHP)."
  - id: gemfile-lock
    prompt: "Quel est le rôle du fichier Gemfile.lock ?"
    answer: "Figer les versions exactes installées, pour que toute l'équipe ait les mêmes"
    decoys:
      - "Bloquer l'ajout de nouvelles gems tant qu'un administrateur ne l'a pas déverrouillé"
      - "Stocker les identifiants de connexion à RubyGems.org pour publier des gems"
    why: "Bundler y note la version précise de chaque gem et de ses dépendances ; on le versionne avec le code d'une application."
  - id: rubygems
    prompt: "Où sont publiées les gems open source ?"
    answer: "Sur RubyGems.org"
    decoys:
      - "Sur Packagist"
      - "Sur PyPI"
      - "Sur npmjs.com"
    why: "Packagist sert PHP, PyPI Python et npmjs.com JavaScript."
  - id: duck-typing
    prompt: "Qu'est-ce que le duck typing, très présent en Ruby ?"
    answer: "Juger un objet sur les méthodes auxquelles il répond, pas sur sa classe"
    decoys:
      - "Vérifier à la compilation que chaque objet hérite de la bonne classe parente"
      - "Convertir automatiquement un objet vers le type attendu par la méthode appelée"
    why: "« S'il cancane comme un canard… » : une méthode accepte tout objet qui répond aux messages qu'elle envoie. Ruby ne vérifie pas les types à la compilation."
  - id: interpolation
    prompt: "Comment insère-t-on la valeur de la variable nom dans une chaîne Ruby ?"
    answer: "\"Bonjour #{nom}\" (guillemets doubles)"
    decoys:
      - "'Bonjour #{nom}' (guillemets simples)"
      - "\"Bonjour ${nom}\" (guillemets doubles)"
      - "f\"Bonjour {nom}\" (préfixe f)"
    why: "L'interpolation #{} ne marche qu'entre guillemets doubles. ${} est la syntaxe de JavaScript ou PHP, f\"…\" celle de Python."
  - id: ractors
    prompt: "Quel mécanisme Ruby 3 a-t-il introduit pour exécuter du code en parallèle malgré le verrou global ?"
    answer: "Les Ractors"
    decoys:
      - "Les Fibers"
      - "Les goroutines"
      - "Les Promises"
    why: "Les Ractors (encore expérimentaux) s'exécutent en parallèle sans partager d'état modifiable. Les Fibers font de la concurrence, pas du parallélisme ; les goroutines sont en Go."
  - id: retour-implicite
    prompt: "Que renvoie une méthode Ruby qui n'a pas de return explicite ?"
    answer: "La valeur de la dernière expression évaluée"
    decoys:
      - "Toujours nil, sauf si un return est écrit"
      - "L'objet sur lequel la méthode a été appelée (self)"
    why: "En Ruby, le return est implicite : on l'écrit surtout pour sortir plus tôt d'une méthode."
  - id: rspec
    prompt: "Qu'est-ce que RSpec ?"
    answer: "Un framework de tests au style descriptif (describe, it)"
    decoys:
      - "Un outil d'analyse statique qui vérifie les types déclarés dans le code"
      - "Un serveur d'applications qui exécute les applications web Ruby en production"
    why: "RSpec est très répandu dans l'écosystème Ruby, à côté de Minitest, livré avec Ruby."
  - id: calcul-intensif
    prompt: "Un service où chaque milliseconde compte : Ruby est-il le meilleur choix ?"
    answer: "Non : un langage compilé comme Go ou Java est plus adapté"
    decoys:
      - "Oui : YJIT le rend plus rapide que les langages compilés"
      - "Oui : son verrou global garantit des temps de réponse constants"
    why: "YJIT améliore les performances de Ruby sans le placer au niveau d'un langage compilé, et le verrou global limite le parallélisme."
  - id: typage-optionnel
    prompt: "Comment ajouter des annotations de types à un projet Ruby ?"
    answer: "Avec RBS (depuis Ruby 3.0) ou Sorbet, vérifiés par des outils à part"
    decoys:
      - "Avec le mot-clé type, que l'interpréteur vérifie depuis Ruby 2.0"
      - "C'est impossible : aucun outil ne vérifie les types en Ruby"
    why: "Ruby reste dynamique : RBS décrit les types dans des fichiers séparés, Sorbet (créé chez Stripe) les vérifie ; l'interpréteur ne les impose pas."
---
