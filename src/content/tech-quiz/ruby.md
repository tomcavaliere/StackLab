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
---
