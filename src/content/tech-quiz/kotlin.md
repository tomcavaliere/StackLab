---
questions:
  - id: jvm
    prompt: "Sur quoi Kotlin tourne-t-il ?"
    answer: "Sur la JVM, en appelant directement le code Java, dans les deux sens"
    decoys:
      - "Sur son propre runtime, incompatible avec Java, conçu par JetBrains pour Android"
      - "Uniquement dans le navigateur"
    why: "Kotlin réutilise toutes les bibliothèques Java existantes."
  - id: references-nulles
    prompt: "Comment Kotlin traite-t-il les références nulles ?"
    answer: "Son système de types distingue les valeurs qui peuvent être nulles de celles qui ne le peuvent pas"
    decoys:
      - "Il interdit totalement la valeur null"
      - "Comme Java : les erreurs de référence nulle n'apparaissent qu'à l'exécution, en production si l'on n'a pas de chance"
    why: "Les erreurs de référence nulle sont détectées à la compilation."
  - id: android
    prompt: "Quel statut Kotlin a-t-il sur Android depuis 2019 ?"
    answer: "Le langage recommandé par Google (« Kotlin first »)"
    decoys:
      - "Il est interdit sur le Play Store au profit de Java et de Dart"
      - "Il est réservé aux jeux"
    why: "Google l'a pris en charge en 2017, puis en a fait le langage recommandé en 2019."
  - id: compose
    prompt: "En quel langage s'écrit Jetpack Compose, la boîte à outils d'interface moderne d'Android ?"
    answer: "Kotlin"
    decoys:
      - "Dart"
      - "Swift"
    why: "Dart est le langage de Flutter, Swift celui d'Apple."
  - id: coroutines
    prompt: "Que simplifient les coroutines de Kotlin ?"
    answer: "Le code asynchrone"
    decoys:
      - "La gestion des dépendances"
      - "La compilation vers JavaScript"
    why: "Les coroutines permettent d'écrire du code asynchrone comme du code séquentiel."
  - id: createur
    prompt: "Qui a créé Kotlin ?"
    answer: "JetBrains, version 1.0 en 2016"
    decoys:
      - "Google, en 2017, pour Android"
      - "Oracle, en 2014, avec Java 8"
    why: "Google l'a adopté pour Android, mais Kotlin vient de JetBrains."
  - id: adoption
    prompt: "Comment une équipe Java peut-elle adopter Kotlin ?"
    answer: "Fichier par fichier, grâce à l'interopérabilité avec Java"
    decoys:
      - "En réécrivant tout le projet d'un coup, car les deux langages ne cohabitent pas"
      - "En changeant de machine virtuelle"
    why: "Kotlin et Java cohabitent dans le même projet."
  - id: serveur
    prompt: "Quels frameworks serveur utilisent Kotlin ?"
    answer: "Spring Boot et Ktor"
    decoys:
      - "Django et Flask"
      - "Express et NestJS"
    why: "Spring Boot le prend en charge ; Ktor a été écrit pour lui."
  - id: multiplatform
    prompt: "Que permet Kotlin Multiplatform ?"
    answer: "Partager du code entre Android et iOS"
    decoys:
      - "Exécuter du code Swift sur Android"
      - "Compiler du Kotlin en Python"
    why: "Une partie du code (logique métier) peut être commune aux deux plateformes."
  - id: ios
    prompt: "Une application uniquement iOS : que conseille la fiche ?"
    answer: "Swift, le langage natif d'Apple"
    decoys:
      - "Kotlin, le langage recommandé pour iOS"
      - "Dart, sans Flutter"
    why: "Kotlin est le choix par défaut pour Android ; pour iOS seul, Swift."
---
