---
name: Ruby
kind: langage
layers: []
tags: [typage-dynamique, open-source]
difficulty: 1
summary: "Langage dynamique pensé pour l'expressivité et le confort du développeur, connu surtout pour Ruby on Rails."
---

## Problème résolu

Ruby (Yukihiro Matsumoto, 1995) cherche à rendre le code agréable à écrire et à lire : tout est objet, la syntaxe est concise et la métaprogrammation permet de créer de petits langages internes, appelés DSL. Rails en tire parti pour décrire une application avec très peu de code.

L'interpréteur de référence (CRuby) a, comme CPython, un verrou global qui limite le parallélisme des threads. Le compilateur à la volée YJIT, développé chez Shopify et intégré depuis Ruby 3.1, améliore les performances des applications Rails en production. Les bibliothèques (gems) s'installent avec Bundler.

## Quand l'utiliser

- Application web avec Ruby on Rails, surtout pour aller vite avec une petite équipe.
- Scripts et outillage quand l'équipe pratique déjà Ruby.

## Quand l'éviter

- Data et machine learning : l'écosystème est très en retrait par rapport à Python.
- Calcul intensif ou services où chaque milliseconde compte : un langage compilé (Go, Java) est plus adapté.
- Recrutement : le vivier de développeurs Ruby est plus restreint que pour JavaScript, Python ou Java.

## Pour aller plus loin

- [Documentation officielle](https://www.ruby-lang.org/fr/documentation/)
- [Ruby en 20 minutes](https://www.ruby-lang.org/fr/documentation/quickstart/)
