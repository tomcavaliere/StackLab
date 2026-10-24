---
name: Vue.js
kind: framework
layers: [frontend]
languages: [javascript, typescript]
tags: [open-source, web, composants, spa]
difficulty: 1
summary: "Framework progressif pour construire des interfaces en composants, réputé pour sa prise en main rapide."
---

## Problème résolu

Comme React, Vue (Evan You, 2014) maintient la page synchronisée avec l'état de l'application via des composants. Il se distingue par son système de réactivité : on modifie une donnée et les parties de l'interface qui en dépendent se mettent à jour, sans gestion explicite. Les composants s'écrivent souvent dans un fichier `.vue` qui regroupe gabarit HTML, logique et style.

Vue est dit « progressif » : on peut l'ajouter à une page existante comme bâtir une application complète. Le routeur (Vue Router) et la gestion d'état (Pinia) sont des projets officiels, et Nuxt joue pour Vue le rôle que Next.js joue pour React.

## Quand l'utiliser

- Interface web interactive, avec une équipe qui veut monter en compétence rapidement.
- Enrichir progressivement des pages rendues côté serveur.
- Projet qui préfère des choix officiels (routeur, état) plutôt qu'un écosystème très ouvert.

## Quand l'éviter

- Besoin de partager du code et des compétences avec une application mobile en React Native.
- Projet où la disponibilité de développeurs et de bibliothèques prime : l'écosystème de React est plus large.
- Site essentiellement statique : pas besoin d'un framework front.

## Pour aller plus loin

- [Documentation officielle](https://fr.vuejs.org/guide/introduction)
- [Comparaison des API Options et Composition](https://fr.vuejs.org/guide/extras/composition-api-faq)
