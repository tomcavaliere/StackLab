---
name: Swift
kind: langage
layers: []
tags: [typage-statique, open-source, mobile]
difficulty: 2
summary: "Le langage d'Apple pour iOS, macOS et ses autres plateformes : typé, compilé, avec SwiftUI pour décrire l'interface."
alternatives:
  - tech: react-native
    note: "Une seule application pour iOS et Android, en React, au prix d'un accès moins direct aux API natives."
---

## Problème résolu

Pendant des décennies, les applications Apple s'écrivaient en Objective-C, un langage ancien, à la syntaxe déroutante et peu protecteur. Swift (Apple, 2014) le remplace : typage statique, inférence de types, optionnels qui obligent à traiter explicitement l'absence de valeur, et gestion automatique de la mémoire par comptage de références (ARC), sans ramasse-miettes. Il reste interopérable avec le code Objective-C existant.

SwiftUI (2019) décrit l'interface de façon déclarative, un peu à la manière de React. Swift est open-source depuis 2015 et tourne aussi sous Linux, mais son usage reste très concentré sur les plateformes Apple.

## Quand l'utiliser

- Application iOS ou macOS native : c'est le langage de référence, avec un accès immédiat aux nouvelles API d'Apple.
- Application où l'expérience native et la performance sur iPhone priment (graphismes, caméra, capteurs).

## Quand l'éviter

- Application attendue aussi sur Android : il faudra une seconde application en Kotlin, ou un framework multiplateforme (React Native, Flutter).
- Petite équipe qui doit livrer vite sur les deux plateformes.
- Back-end : possible (Vapor), mais l'écosystème est réduit par rapport à Go, Java ou Node.js.

## Pour aller plus loin

- [The Swift Programming Language](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/)
- [Tutoriels SwiftUI (Apple)](https://developer.apple.com/tutorials/swiftui)
