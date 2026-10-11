---
name: Kotlin
kind: langage
layers: []
tags: [typage-statique, jvm, open-source, mobile]
difficulty: 2
summary: "Langage concis de JetBrains, compatible avec Java et sa JVM : le langage recommandé par Google pour Android, aussi utilisé côté serveur."
alternatives:
  - tech: java
    note: "Même JVM et mêmes bibliothèques, plus verbeux ; vivier de développeurs et historique plus larges."
---

## Problème résolu

Java est robuste mais verbeux, et laisse passer les erreurs de référence nulle jusqu'à l'exécution. Kotlin (JetBrains, version 1.0 en 2016) tourne sur la même JVM et appelle directement le code Java existant, dans les deux sens : une équipe peut l'adopter fichier par fichier. Son système de types distingue les valeurs qui peuvent être nulles de celles qui ne le peuvent pas, sa syntaxe est plus concise, et les coroutines simplifient le code asynchrone.

Google l'a pris en charge pour Android en 2017, puis en a fait le langage recommandé (« Kotlin first ») en 2019 ; Jetpack Compose, la boîte à outils d'interface moderne d'Android, s'écrit en Kotlin. Côté serveur, Spring Boot le prend en charge et Ktor est un framework écrit pour lui. Kotlin Multiplatform permet de partager du code entre Android et iOS.

## Quand l'utiliser

- Application Android native : c'est le choix par défaut.
- Back-end sur la JVM (Spring Boot, Ktor), par une équipe qui veut un code plus concis que Java.
- Moderniser progressivement une base de code Java existante.

## Quand l'éviter

- Application uniquement iOS : Swift est le langage natif d'Apple.
- Une application iOS et Android par une équipe venue du web : React Native réutilise ses compétences React.
- Équipe et outillage entièrement Java, sans besoin de changer : la migration a un coût.

## Pour aller plus loin

- [Documentation officielle](https://kotlinlang.org/docs/home.html)
- [Kotlin pour Android](https://developer.android.com/kotlin)
