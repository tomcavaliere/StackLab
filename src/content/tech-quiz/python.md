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
---
