---
name: Java
kind: langage
layers: []
tags: [typage-statique, jvm, open-source]
difficulty: 2
summary: "Langage typé statiquement, compilé vers le bytecode de la JVM : pilier des back-ends d'entreprise et d'une grande partie de l'outillage big data."
---

## Problème résolu

Java (Sun, 1995, aujourd'hui Oracle) compile vers un bytecode exécuté par la machine virtuelle Java (JVM). Le même programme tourne sur tout système qui a une JVM. La JVM compile à la volée le code le plus utilisé (JIT) et gère la mémoire par ramasse-miettes : les performances sont élevées, sans gestion manuelle de la mémoire.

Le typage statique et un outillage très mûr (IDE, profilage, refactoring) rendent les grosses bases de code maintenables par de grandes équipes. Une grande partie de l'écosystème data tourne sur la JVM : Kafka, Hadoop et Spark (écrit en Scala) notamment. Depuis Java 21, les threads virtuels permettent de gérer de très nombreuses tâches concurrentes avec un code bloquant classique.

## Quand l'utiliser

- Back-end d'entreprise à longue durée de vie, grande équipe, besoin de stabilité (versions LTS maintenues sur plusieurs années).
- Services à fort trafic, avec Spring Boot par exemple.
- Écosystème JVM imposé : extensions Kafka, jobs Spark, Android historique.

## Quand l'éviter

- MVP à livrer très vite par une petite équipe : le code est plus verbeux qu'en Python ou en Ruby.
- Fonctions à démarrage très fréquent (serverless) : la JVM démarre plus lentement qu'un binaire Go, sauf compilation native avec GraalVM.
- Équipe sans culture JVM : Kotlin, plus concis, tourne sur la même JVM.

## Pour aller plus loin

- [Tutoriels officiels (dev.java)](https://dev.java/learn/)
- [Documentation du JDK](https://docs.oracle.com/en/java/javase/)
