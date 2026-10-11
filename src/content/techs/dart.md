---
name: Dart
kind: langage
layers: []
tags: [typage-statique, open-source, mobile]
difficulty: 1
summary: "Langage typé de Google, compilé en code natif ou pour le web : utilisé avant tout pour écrire des applications Flutter."
---

## Problème résolu

Dart (Google, annoncé en 2011) visait d'abord le web, comme alternative à JavaScript. Il a trouvé sa place avec Flutter, qui avait besoin d'un langage capable de deux modes : une compilation à la volée en développement, pour le rechargement à chaud, et une compilation anticipée en code natif pour des applications rapides en production. Il compile aussi vers JavaScript et WebAssembly pour le web.

Sa syntaxe est familière aux développeurs Java, C# ou JavaScript. Depuis Dart 3 (2023), la sûreté vis-à-vis de null est obligatoire : une variable ne peut contenir null que si son type le déclare.

## Quand l'utiliser

- Application Flutter : c'est son langage.
- Code partagé entre mobile, web et bureau, via Flutter.

## Quand l'éviter

- Back-end, data ou outillage : c'est possible, mais l'écosystème est bien plus réduit que celui de Go, Java ou Python.
- Développement web classique : JavaScript et TypeScript restent la norme.

## Pour aller plus loin

- [Visite du langage](https://dart.dev/language)
- [Sûreté vis-à-vis de null](https://dart.dev/null-safety)
