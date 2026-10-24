---
name: Angular
kind: framework
layers: [frontend]
languages: [typescript]
tags: [open-source, web, composants, spa]
difficulty: 2
summary: "Framework front complet de Google, en TypeScript : composants, routeur, formulaires, client HTTP et injection de dépendances fournis et intégrés."
alternatives:
  - tech: react
    note: "Bibliothèque d'interface plus légère, à l'écosystème plus large ; routage, données et architecture restent à choisir."
---

## Problème résolu

Une grosse application front développée par plusieurs équipes dérive vite si chacune choisit son routeur, sa gestion des formulaires et son organisation du code. Angular (Google) fournit tout dans un cadre unique : composants, routeur, formulaires avec validation, client HTTP, outillage de test, et une CLI qui génère le code selon des conventions communes. L'injection de dépendances structure les services partagés.

Angular est une réécriture complète, en TypeScript, d'AngularJS (2010). Il est sorti en 2016, et une version majeure paraît tous les six mois. Les versions récentes ont modernisé le framework : composants autonomes sans modules, signaux pour la réactivité, nouvelle syntaxe de contrôle dans les gabarits.

## Quand l'utiliser

- Grosse application d'entreprise (back-office, outil métier riche en formulaires), développée par plusieurs équipes qui doivent partager une structure.
- Équipe venue de Java ou de C#, à l'aise avec le typage, les classes et l'injection de dépendances.
- Projet qui préfère des choix officiels et cohérents à un écosystème à assembler.

## Quand l'éviter

- MVP ou petite interface : le nombre de concepts à apprendre (injection de dépendances, RxJS, cycle de vie des composants) pèse pour une petite équipe.
- Site essentiellement statique : pas besoin d'un framework front.
- Partage de compétences avec le mobile (React Native) ou recherche du plus large choix de bibliothèques et de développeurs : l'écosystème de React est plus vaste.

## Pour aller plus loin

- [Documentation officielle](https://angular.dev/overview)
- [Tutoriel officiel](https://angular.dev/tutorials/learn-angular)
