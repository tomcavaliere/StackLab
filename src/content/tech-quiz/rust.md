---
questions:
  - id: surete-memoire
    prompt: "Comment Rust garantit-il la sûreté mémoire ?"
    answer: "Par un système de possession et d'emprunt vérifié par le compilateur, sans ramasse-miettes"
    decoys:
      - "Par un ramasse-miettes particulièrement rapide"
      - "Par des vérifications à l'exécution, qui arrêtent le programme dès qu'un accès mémoire est invalide"
    why: "Les accès mémoire invalides sont refusés dès la compilation."
  - id: troisieme-voie
    prompt: "Quelle voie Rust prend-il entre le C et les langages à ramasse-miettes ?"
    answer: "Une sûreté garantie à la compilation, sans runtime ni pauses de ramasse-miettes"
    decoys:
      - "Une gestion manuelle comme en C, avec des avertissements du compilateur"
      - "Un ramasse-miettes comme en Go, avec un typage plus strict"
    why: "Le C laisse les erreurs mémoire passer ; Java et Go les évitent au prix d'un runtime. Rust évite les deux écueils."
  - id: courses-de-donnees
    prompt: "Outre les accès mémoire invalides, quel type de bug le code « sûr » de Rust exclut-il ?"
    answer: "Les courses de données"
    decoys:
      - "Les erreurs de logique métier"
      - "Les boucles infinies"
    why: "Le compilateur empêche deux threads de modifier les mêmes données sans synchronisation. Il ne vérifie pas la logique métier."
  - id: prix
    prompt: "Quel est le prix des garanties de sûreté de Rust ?"
    answer: "Une courbe d'apprentissage réelle : le compilateur refuse beaucoup de programmes"
    decoys:
      - "Des performances bien inférieures à celles de Python, à cause des vérifications"
      - "L'impossibilité d'écrire du code concurrent"
    why: "En retour, le code compilé est rapide et prévisible."
  - id: cargo
    prompt: "Que fait Cargo ?"
    answer: "Il gère le build, les dépendances et les tests"
    decoys:
      - "C'est le ramasse-miettes de Rust, désactivable"
      - "C'est un framework web"
    why: "Rust n'a pas de ramasse-miettes ; Cargo est son outil de build."
  - id: origine
    prompt: "Où Rust est-il né ?"
    answer: "Chez Mozilla, version 1.0 en 2015"
    decoys:
      - "Chez Google, en 2009, comme Go"
      - "Chez Apple, en 2014, comme Swift"
    why: "Google a annoncé Go en 2009, Apple Swift en 2014."
  - id: linux
    prompt: "Où Rust est-il utilisé depuis 2022 ?"
    answer: "Dans le noyau Linux"
    decoys:
      - "Comme langage officiel d'Android, à la place de Kotlin"
      - "Dans le navigateur, à la place de JavaScript"
    why: "Rust est aussi utilisé dans Firefox et dans l'infrastructure de grands acteurs du cloud."
  - id: mvp
    prompt: "Un MVP CRUD à livrer vite : Rust est-il un bon choix ?"
    answer: "Non : le temps d'apprentissage et d'écriture ne se rentabilise pas"
    decoys:
      - "Oui : Rust est le langage le plus rapide à écrire"
      - "Non : Rust ne sait pas servir de requêtes HTTP sans bibliothèque en C"
    why: "Rust sert très bien du HTTP, mais ses garanties coûtent du temps de développement."
  - id: vs-go
    prompt: "Pour un service réseau classique, que conseille la fiche entre Rust et Go ?"
    answer: "Go, qui apporte l'essentiel des performances utiles avec une prise en main bien plus rapide"
    decoys:
      - "Rust, car Go n'a pas de concurrence intégrée"
      - "Rust, car le ramasse-miettes de Go est trop lent pour un service réseau, quel que soit le trafic"
    why: "Go a la concurrence intégrée (goroutines) et suffit souvent pour des services réseau."
  - id: polars
    prompt: "Quelle bibliothèque Python rapide est écrite en Rust ?"
    answer: "Polars"
    decoys:
      - "pandas"
      - "Django"
    why: "Python reste la référence en data, mais certaines de ses bibliothèques rapides sont écrites en Rust."
---
