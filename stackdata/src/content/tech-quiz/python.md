---
questions:
  - id: atout
    prompt: "Quel est le principal atout de Python ?"
    answer: "Son écosystème, en particulier en data et en machine learning"
    decoys:
      - "Sa vitesse d'exécution sur les boucles"
      - "Son exécution native dans le navigateur, sans compilation vers JavaScript"
    why: "NumPy, pandas, scikit-learn et PyTorch en ont fait le langage de référence de la data et du ML."
  - id: gil
    prompt: "Que fait le GIL de CPython ?"
    answer: "Il empêche plusieurs threads d'exécuter du code Python en parallèle"
    decoys:
      - "Il compile le code Python en binaire natif avant l'exécution"
      - "Il vérifie les types à l'exécution"
    why: "Le verrou global de l'interpréteur limite le parallélisme des threads sur du code Python pur."
  - id: sans-gil
    prompt: "Que propose CPython depuis la version 3.13 ?"
    answer: "Une variante sans GIL, encore optionnelle"
    decoys:
      - "La suppression définitive du GIL, pour tout le monde"
      - "Un typage statique obligatoire"
    why: "La variante sans GIL existe, mais reste optionnelle."
  - id: typage
    prompt: "Comment fonctionne le typage en Python ?"
    answer: "Dynamique, avec des annotations optionnelles que des outils comme mypy vérifient"
    decoys:
      - "Statique, vérifié par l'interpréteur avant chaque exécution du programme"
      - "Il n'existe aucune annotation de type"
    why: "Les annotations sont optionnelles ; l'interpréteur ne les vérifie pas, des outils et les éditeurs le font."
  - id: calcul-rapide
    prompt: "Comment Python reste-t-il rapide en calcul numérique ?"
    answer: "Des bibliothèques comme NumPy ou Polars déportent le calcul dans du code natif"
    decoys:
      - "L'interpréteur exécute automatiquement toutes les boucles sur le GPU, quand il y en a un"
      - "Le GIL accélère les calculs"
    why: "Python pur est lent sur les boucles ; le calcul intensif passe par des bibliothèques natives."
  - id: web
    prompt: "Quels frameworks web Python la fiche cite-t-elle ?"
    answer: "Django, Flask et FastAPI"
    decoys:
      - "Express, Gin et Spring Boot"
      - "Rails, Sinatra et Hanami"
    why: "Express est en JavaScript, Gin en Go, Spring Boot en Java ; Rails, Sinatra et Hanami en Ruby."
  - id: distribuer
    prompt: "Quel inconvénient pour distribuer un outil autonome écrit en Python ?"
    answer: "Le packager avec ses dépendances est moins simple qu'avec Go"
    decoys:
      - "Python ne sait pas lire de fichiers"
      - "Python ne fonctionne pas sous Windows sans machine virtuelle"
    why: "Go produit un binaire unique ; une application Python a besoin de son interpréteur et de ses dépendances."
  - id: mobile
    prompt: "Une application mobile, ou du code exécuté dans le navigateur : Python est-il adapté ?"
    answer: "Non : ce n'est pas son terrain"
    decoys:
      - "Oui : c'est son point fort"
      - "Oui : c'est le seul langage possible"
    why: "Le mobile a Swift, Kotlin et les frameworks multiplateformes ; le navigateur, JavaScript."
  - id: createur
    prompt: "Qui a créé Python ?"
    answer: "Guido van Rossum, en 1991"
    decoys:
      - "Yukihiro Matsumoto, en 1995"
      - "Ryan Dahl, en 2009"
    why: "Matsumoto a créé Ruby, Ryan Dahl Node.js."
  - id: equipe-mixte
    prompt: "Pourquoi Python convient-il à une équipe mixte, développeurs et data ?"
    answer: "C'est un langage commun aux deux métiers"
    decoys:
      - "Il impose des types stricts que tout le monde comprend"
      - "Il remplace SQL pour interroger les données"
    why: "Le même langage sert au back-end web et à l'analyse : moins de frontières dans l'équipe."
  - id: venv
    prompt: "À quoi sert un environnement virtuel Python (venv) ?"
    answer: "Isoler les dépendances d'un projet de celles du système"
    decoys:
      - "Exécuter Python dans une machine virtuelle, comme la JVM"
      - "Accélérer l'interpréteur en précompilant tous les modules"
    why: "Un venv a son propre dossier de paquets : chaque projet garde ses versions sans conflit. Rien à voir avec une machine virtuelle ou la vitesse."
  - id: pip
    prompt: "Quel outil installe les paquets Python depuis PyPI ?"
    answer: "pip"
    decoys:
      - "npm"
      - "gem"
      - "cargo"
    why: "pip est l'installateur de paquets de Python ; npm sert à JavaScript, gem à Ruby, cargo à Rust."
  - id: indentation
    prompt: "Comment Python délimite-t-il les blocs de code ?"
    answer: "Par l'indentation"
    decoys:
      - "Par des accolades"
      - "Par les mots-clés begin et end"
    why: "L'indentation fait partie de la syntaxe : elle remplace les accolades de C ou de Java."
  - id: fin-python-2
    prompt: "Quand Python 2 a-t-il cessé d'être maintenu ?"
    answer: "Le 1er janvier 2020"
    decoys:
      - "En 2008, dès la sortie de Python 3"
      - "Jamais : il est toujours maintenu en parallèle"
    why: "Python 3 est sorti en 2008, mais Python 2 a été maintenu jusqu'au 1er janvier 2020 pour laisser le temps de migrer."
  - id: liste-tuple
    prompt: "Quelle différence entre une liste et un tuple en Python ?"
    answer: "Le tuple est immuable, la liste est modifiable"
    decoys:
      - "La liste se trie toute seule, le tuple garde l'ordre"
      - "Le tuple n'accepte que des nombres, la liste tout type"
    why: "On ne peut ni ajouter ni remplacer un élément d'un tuple ; les deux gardent l'ordre et acceptent n'importe quel type."
  - id: ordre-dict
    prompt: "Que garantit un dict depuis Python 3.7 ?"
    answer: "Il conserve l'ordre d'insertion des clés"
    decoys:
      - "Il trie ses clés par ordre alphabétique"
      - "Il refuse les clés qui ne sont pas des chaînes"
    why: "L'ordre d'insertion est garanti par le langage depuis 3.7. Les clés peuvent être de tout type hachable."
  - id: defaut-mutable
    prompt: "Piège classique : que se passe-t-il avec def f(x=[]) ?"
    answer: "La même liste est partagée par tous les appels"
    decoys:
      - "Une nouvelle liste vide est créée à chaque appel"
      - "C'est refusé par l'interpréteur, erreur de syntaxe"
    why: "La valeur par défaut est évaluée une seule fois, à la définition : la liste modifiée persiste d'un appel à l'autre. On écrit x=None, puis on crée la liste."
  - id: comprehension
    prompt: "Que produit l'expression [x * 2 for x in range(3)] ?"
    answer: "[0, 2, 4]"
    decoys:
      - "[2, 4, 6]"
      - "[0, 1, 2, 0, 1, 2]"
    why: "range(3) donne 0, 1, 2, chacun multiplié par 2. Multiplier une liste par 2 la répéterait, mais ici on multiplie chaque élément."
  - id: yield
    prompt: "Que fait le mot-clé yield dans une fonction Python ?"
    answer: "Il en fait un générateur, qui produit ses valeurs à la demande"
    decoys:
      - "Il termine la fonction et libère immédiatement sa mémoire"
      - "Il lance la suite de la fonction dans un thread séparé"
    why: "Un générateur suspend son exécution à chaque yield : on peut parcourir de gros volumes sans tout charger en mémoire."
  - id: multiprocessing
    prompt: "Comment répartir un calcul en Python pur sur plusieurs cœurs malgré le GIL ?"
    answer: "Avec plusieurs processus (multiprocessing)"
    decoys:
      - "Avec plusieurs threads (threading)"
      - "Avec des coroutines (asyncio)"
    why: "Chaque processus a son propre interpréteur et son propre GIL. Les threads restent limités par le GIL, et asyncio ne parallélise pas le calcul."
  - id: asyncio
    prompt: "À quoi sert asyncio ?"
    answer: "Gérer beaucoup d'entrées-sorties concurrentes dans un seul thread"
    decoys:
      - "Déporter automatiquement les calculs sur la carte graphique"
      - "Compiler les fonctions marquées async en code machine natif"
    why: "asyncio fait tourner une boucle d'événements qui passe d'une tâche à l'autre pendant les attentes réseau ou disque."
  - id: pep-8
    prompt: "Qu'est-ce que la PEP 8 ?"
    answer: "Le guide de style du code Python"
    decoys:
      - "La spécification du GIL de CPython"
      - "Le format standard des paquets wheel"
    why: "La PEP 8 fixe les conventions de nommage et de mise en forme, appliquées par des outils comme Black ou Ruff."
  - id: zen
    prompt: "Quelle instruction affiche le « Zen of Python » dans l'interpréteur ?"
    answer: "import this"
    decoys:
      - "import zen"
      - "help(\"zen\")"
    why: "import this affiche les aphorismes de Tim Peters (PEP 20), comme « Readability counts »."
  - id: name-main
    prompt: "À quoi sert le bloc if __name__ == \"__main__\": ?"
    answer: "Exécuter du code seulement quand le fichier est lancé directement, pas importé"
    decoys:
      - "Déclarer la fonction principale, obligatoire dans tout programme Python"
      - "Empêcher que le fichier puisse être importé depuis un autre module"
    why: "__name__ vaut \"__main__\" pour le script lancé, et le nom du module quand il est importé. Python n'impose pas de fonction main."
  - id: pypy
    prompt: "Qu'est-ce que PyPy ?"
    answer: "Une autre implémentation de Python, avec un compilateur à la volée (JIT)"
    decoys:
      - "Le dépôt officiel où sont publiés les paquets Python installés par pip"
      - "Un framework web minimaliste, concurrent de Flask et de Bottle"
    why: "PyPy est une alternative à CPython, avec un JIT. À ne pas confondre avec PyPI, le dépôt de paquets."
  - id: bytecode
    prompt: "Comment CPython exécute-t-il un script ?"
    answer: "Il le compile en bytecode, puis l'interprète dans sa machine virtuelle"
    decoys:
      - "Il le compile en binaire natif optimisé avant chaque exécution"
      - "Il le traduit en C, puis appelle un compilateur C du système"
    why: "CPython produit du bytecode (mis en cache dans les .pyc) et l'exécute dans sa boucle d'interprétation."
  - id: memoire
    prompt: "Comment CPython libère-t-il la mémoire ?"
    answer: "Par comptage de références, complété par un ramasse-miettes pour les cycles"
    decoys:
      - "Manuellement : le développeur appelle free() sur chaque objet créé"
      - "Uniquement à la fin du programme, quand le processus se termine"
    why: "Un objet est libéré quand plus rien ne le référence ; le module gc détecte les cycles que le comptage seul ne voit pas."
  - id: pyproject
    prompt: "Quel fichier standard décrit un projet Python moderne (métadonnées, dépendances, outil de build) ?"
    answer: "pyproject.toml"
    decoys:
      - "package.json"
      - "python.config.yaml"
    why: "pyproject.toml est normalisé par les PEP 518 et 621. package.json est l'équivalent de l'écosystème JavaScript."
  - id: duck-typing
    prompt: "Qu'appelle-t-on le « duck typing » en Python ?"
    answer: "Un objet convient s'il a les méthodes attendues, quelle que soit sa classe"
    decoys:
      - "Le typage statique vérifié par mypy avant chaque exécution du programme"
      - "La conversion automatique entre nombres et chaînes lors des opérations"
    why: "« Si ça cancane comme un canard… » : Python vérifie la présence des méthodes à l'usage, pas l'héritage. Il ne convertit pas les types tout seul."
  - id: typage-fort
    prompt: "Que donne l'expression \"1\" + 1 en Python ?"
    answer: "Une erreur TypeError"
    decoys:
      - "La chaîne \"11\""
      - "Le nombre 2"
    why: "Python est dynamique mais fortement typé : il ne convertit pas implicitement une chaîne en nombre, contrairement à JavaScript."
---
