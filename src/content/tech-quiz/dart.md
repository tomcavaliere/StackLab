---
questions:
  - id: usage
    prompt: "À quoi sert surtout Dart aujourd'hui ?"
    answer: "Écrire des applications Flutter"
    decoys:
      - "Écrire des notebooks de data science"
      - "Écrire des pilotes de périphériques"
    why: "Dart a trouvé sa place avec Flutter, dont il est le langage."
  - id: deux-compilations
    prompt: "Pourquoi Flutter avait-il besoin des deux modes de compilation de Dart ?"
    answer: "À la volée en développement, pour le rechargement à chaud ; anticipée en natif en production"
    decoys:
      - "Pour exécuter le même code sur la JVM et sur .NET, selon la plateforme de l'appareil"
      - "Pour traduire le code en Python, puis en C"
    why: "Le rechargement à chaud rend le développement rapide ; la compilation native rend l'application rapide."
  - id: null-safety
    prompt: "Qu'impose Dart 3 (2023) ?"
    answer: "La sûreté vis-à-vis de null : une variable ne peut valoir null que si son type le déclare"
    decoys:
      - "Le typage dynamique pour toutes les variables, afin de simplifier l'écriture des widgets"
      - "La suppression des classes"
    why: "La sûreté vis-à-vis de null est obligatoire depuis Dart 3."
  - id: web
    prompt: "Vers quoi Dart compile-t-il pour le web ?"
    answer: "JavaScript et WebAssembly"
    decoys:
      - "PHP"
      - "Du bytecode JVM"
    why: "Dart compile en code natif pour le mobile, et vers JavaScript ou WebAssembly pour le web."
  - id: origine
    prompt: "Qui a créé Dart, et pour viser quoi au départ ?"
    answer: "Google, en 2011, d'abord pour le web, comme alternative à JavaScript"
    decoys:
      - "Apple, pour remplacer Objective-C"
      - "JetBrains, en 2011, pour remplacer Java dans les applications Android"
    why: "Swift a remplacé Objective-C chez Apple ; Kotlin, de JetBrains, est devenu le langage recommandé d'Android."
  - id: syntaxe
    prompt: "À quels langages la syntaxe de Dart ressemble-t-elle ?"
    answer: "Java, C# ou JavaScript"
    decoys:
      - "Python ou Ruby"
      - "Haskell ou Lisp"
    why: "Une syntaxe familière facilite la prise en main."
  - id: back-end
    prompt: "Écrire un back-end en Dart ?"
    answer: "C'est possible, mais l'écosystème est bien plus réduit que celui de Go, Java ou Python"
    decoys:
      - "C'est impossible : Dart ne s'exécute que sur mobile, à l'intérieur d'une application Flutter"
      - "C'est recommandé : c'est son usage principal"
    why: "Back-end, data, outillage : Dart sait le faire, mais sans l'écosystème des grands langages."
  - id: recrutement
    prompt: "Quel inconvénient Dart présente-t-il pour recruter ?"
    answer: "Il reste peu utilisé hors de Flutter"
    decoys:
      - "Il n'est plus maintenu par Google"
      - "Il est réservé aux employés de Google"
    why: "La fiche Flutter le relève aussi."
  - id: partage
    prompt: "Qu'offre Dart, via Flutter ?"
    answer: "Un code partagé entre mobile, web et bureau"
    decoys:
      - "Un code partagé avec React Native, qui sait exécuter du Dart"
      - "L'exécution directe de code Python"
    why: "Flutter vise plusieurs plateformes avec le même code Dart."
  - id: typage
    prompt: "Comment Dart est-il typé ?"
    answer: "Statiquement"
    decoys:
      - "Dynamiquement, sans annotations possibles"
      - "Il n'a pas de types"
    why: "Dart est un langage typé, avec une sûreté vis-à-vis de null obligatoire."
---
