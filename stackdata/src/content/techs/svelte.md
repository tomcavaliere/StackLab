---
name: Svelte
kind: framework
layers: [frontend]
languages: [javascript, typescript]
tags: [open-source, web, composants]
difficulty: 1
summary: "Framework front qui compile les composants en JavaScript ciblé au moment du build : peu de code envoyé au navigateur, une syntaxe proche du HTML."
alternatives:
  - tech: react
    note: "Écosystème et vivier de développeurs bien plus larges, et partage possible avec le mobile via React Native."
  - tech: vue
    note: "Même promesse de prise en main rapide, avec un écosystème plus large."
---

## Problème résolu

React et Vue embarquent dans le navigateur un runtime qui recalcule, à chaque changement d'état, ce qu'il faut mettre à jour dans la page (DOM virtuel). Svelte (Rich Harris, 2016) déplace ce travail au moment du build : le compilateur analyse chaque composant et génère le code qui met à jour exactement les éléments concernés. Le navigateur reçoit moins de JavaScript, avec un runtime minimal.

Les composants s'écrivent dans des fichiers `.svelte` proches du HTML. Svelte 5 (2024) a introduit les « runes » (`$state`, `$derived`) pour déclarer explicitement la réactivité. SvelteKit joue pour Svelte le rôle que Next.js joue pour React : routage, rendu serveur et routes d'API.

## Quand l'utiliser

- Interfaces où le poids et la réactivité comptent : sites riches en contenu, widgets intégrés à d'autres pages, appareils modestes.
- Petite équipe qui veut une syntaxe concise et une prise en main rapide.
- Application full-stack avec SvelteKit.

## Quand l'éviter

- Besoin du plus large choix de bibliothèques de composants et de développeurs à recruter : React domine.
- Application mobile qui doit partager code et compétences avec le web : pas d'équivalent aussi répandu que React Native.
- Grosse équipe déjà formée à React ou à Angular : le gain ne compense pas une migration.

## Pour aller plus loin

- [Documentation officielle](https://svelte.dev/docs)
- [Tutoriel interactif](https://svelte.dev/tutorial)
