---
name: JavaScript
kind: langage
layers: []
tags: [web, typage-dynamique, standard]
difficulty: 1
summary: "Le langage que les navigateurs exécutent nativement ; avec Node.js, il tourne aussi côté serveur."
alternatives:
  - tech: typescript
    note: "JavaScript avec des types vérifiés à la compilation ; préférable dès que le code grossit ou que l'équipe s'agrandit."
---

## Problème résolu

Une page HTML seule ne réagit pas aux actions de l'utilisateur sans être rechargée. JavaScript est le langage que tous les navigateurs exécutent nativement : il modifie la page (le DOM), réagit aux événements et échange avec les serveurs sans rechargement. D'autres langages ne peuvent viser le navigateur qu'en compilant vers JavaScript ou vers WebAssembly.

Le langage est normalisé sous le nom ECMAScript (ECMA-262) et reçoit une nouvelle édition chaque année. Depuis Node.js (2009), il tourne aussi côté serveur : une équipe peut écrire le front et le back dans le même langage.

## Quand l'utiliser

- Tout code exécuté dans le navigateur : c'est incontournable, directement ou via TypeScript qui compile vers lui.
- Petits scripts, prototypes, outillage front.
- Back-end Node.js quand l'équipe est déjà à l'aise en JavaScript.

## Quand l'éviter

- Gros code partagé entre plusieurs développeurs : le typage dynamique laisse passer des erreurs que TypeScript détecte à la compilation.
- Calcul intensif côté serveur : Node.js exécute le JavaScript sur un seul thread principal par processus, et un calcul long y bloque les autres requêtes.
- Traitement de données ou machine learning : l'écosystème Python est bien plus fourni.

## Pour aller plus loin

- [Guide JavaScript (MDN)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide)
- [Spécification ECMAScript](https://tc39.es/ecma262/)
