---
title: Langages
description: "Navigateur, data, mobile, systèmes, back-end : quel langage pour quel terrain ?"
questions:
  - id: execute-par-le-navigateur
    prompt: "Écrire du code exécuté nativement par tous les navigateurs"
    answer: javascript
    decoy: python
    why: "JavaScript est exécuté nativement par tous les navigateurs ; les autres langages doivent compiler vers lui ou vers WebAssembly."
  - id: entrainer-un-modele
    prompt: "Explorer des données et entraîner un modèle de machine learning"
    answer: python
    decoy: go
    why: "NumPy, pandas, scikit-learn et PyTorch font de Python la référence en data et en ML. L'écosystème de Go y est sans commune mesure."
  - id: fiabiliser-le-front
    prompt: "Fiabiliser une grosse base de code front partagée par plusieurs développeurs"
    answer: typescript
    decoy: javascript
    why: "TypeScript vérifie les types avant l'exécution et détecte des erreurs que JavaScript ne révèle qu'à l'exécution, parfois en production. Le code produit reste du JavaScript standard."
  - id: outil-un-seul-binaire
    prompt: "Un outil en ligne de commande à distribuer en un seul binaire, sans rien installer d'autre"
    answer: go
    decoy: python
    why: "Go compile en un binaire unique, sans dépendance sur la machine cible. Distribuer une application Python avec ses dépendances est moins simple."
  - id: memoire-sure-sans-gc
    prompt: "Un composant système où la mémoire doit être sûre, sans ramasse-miettes"
    answer: rust
    decoy: go
    why: "Rust vérifie la sûreté mémoire à la compilation (possession et emprunt), sans ramasse-miettes. Go gère la mémoire avec un ramasse-miettes."
  - id: service-reseau-appris-vite
    prompt: "Un service réseau performant, écrit par une équipe qui doit monter en compétence en quelques semaines"
    answer: go
    decoy: rust
    why: "Go est volontairement petit et rapide à apprendre. Rust demande un vrai temps d'apprentissage, notamment de ses règles de possession."
  - id: android-natif
    prompt: "Une application Android native moderne"
    answer: kotlin
    decoy: swift
    why: "Google recommande Kotlin pour Android depuis 2019 (« Kotlin first »). Swift est le langage des plateformes Apple."
  - id: ios-natif
    prompt: "Une application iPhone native qui exploite les dernières API d'Apple"
    answer: swift
    decoy: kotlin
    why: "Swift est le langage d'Apple, avec SwiftUI pour l'interface. Kotlin cible d'abord Android et la JVM."
  - id: java-plus-concis
    prompt: "Une équipe Java qui veut un langage plus concis, sans quitter la JVM ni ses bibliothèques"
    answer: kotlin
    decoy: go
    why: "Kotlin tourne sur la JVM et appelle directement le code Java existant : on l'adopte fichier par fichier. Passer à Go imposerait de tout réécrire."
  - id: theme-wordpress
    prompt: "Développer un thème ou une extension WordPress"
    answer: php
    decoy: ruby
    why: "WordPress est écrit en PHP, comme ses thèmes et ses extensions. Ruby est surtout connu pour Rails."
  - id: hebergement-mutualise
    prompt: "Un site dynamique sur un hébergement mutualisé bon marché, en déposant simplement des fichiers"
    answer: php
    decoy: java
    why: "La plupart des hébergeurs mutualisés exécutent PHP sans configuration : chaque requête lance le script. Une application Java demande une JVM qui tourne en permanence."
  - id: langage-de-flutter
    prompt: "Écrire une application Flutter"
    answer: dart
    decoy: kotlin
    why: "Flutter s'écrit en Dart, compilé en code natif pour iOS et Android. Kotlin sert aux applications Android natives."
  - id: agreger-dans-l-entrepot
    prompt: "Agréger les ventes par magasin dans un entrepôt de données"
    answer: sql
    decoy: python
    why: "SQL est le langage commun des bases et des entrepôts : on décrit le résultat, le moteur choisit comment l'obtenir. Python servirait pour ce que le SQL exprime mal."
  - id: backend-versions-lts
    prompt: "Un back-end d'entreprise à longue durée de vie, avec des versions maintenues sur plusieurs années"
    answer: java
    decoy: ruby
    why: "Java a des versions LTS maintenues sur plusieurs années, un typage statique et un outillage très mûr pour de grandes équipes. Ruby vise d'abord la productivité de petites équipes."
  - id: agent-infra-cloud
    prompt: "Un agent d'infrastructure, dans le même langage que Docker, Kubernetes et Terraform"
    answer: go
    decoy: java
    why: "Docker, Kubernetes, Prometheus et Terraform sont écrits en Go, qui produit des binaires uniques faciles à déployer. La JVM domine plutôt l'écosystème data (Kafka, Spark)."
  - id: script-lisible-vite
    prompt: "Un script d'automatisation écrit vite, lisible, avec une bibliothèque standard très fournie"
    answer: python
    decoy: java
    why: "Python privilégie un code court et lisible, avec une bibliothèque standard riche. Java est plus verbeux pour un script ponctuel."
  - id: calcul-dans-le-navigateur
    prompt: "Du calcul intensif exécuté dans le navigateur via WebAssembly"
    answer: rust
    decoy: python
    why: "Rust compile vers WebAssembly sans ramasse-miettes à embarquer : rapide et prévisible. Le navigateur n'est pas le terrain de Python."
---
