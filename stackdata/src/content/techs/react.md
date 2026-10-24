---
name: React
kind: framework
layers: [frontend]
languages: [javascript, typescript]
tags: [open-source, web, composants, spa]
difficulty: 2
summary: "Bibliothèque pour construire des interfaces en composants : on décrit l'interface pour un état donné, React met à jour la page quand l'état change."
alternatives:
  - tech: vue
    note: "Même modèle à composants, courbe d'apprentissage souvent jugée plus douce, avec routage et état officiels."
integratesWith:
  - tech: nextjs
    note: "Next.js est un framework construit sur React : routage, rendu serveur et build fournis."
---

## Problème résolu

Dans une interface riche, synchroniser la page avec les données à la main (afficher, masquer, mettre à jour chaque élément) devient vite ingérable. React, créé chez Facebook (aujourd'hui Meta) et open-source depuis 2013, inverse le problème : on écrit des composants qui décrivent l'interface pour un état donné, en JSX (du HTML dans du JavaScript), et React calcule les changements à appliquer à la page quand l'état change.

React n'est qu'une bibliothèque d'interface. Le routage, la récupération des données et le build relèvent d'autres outils ou d'un framework construit dessus, comme Next.js ou React Router. Le même modèle sert au mobile avec React Native.

## Quand l'utiliser

- Interface web interactive : tableau de bord, application SaaS, éditeur.
- Équipe qui veut l'écosystème le plus large (bibliothèques de composants, outillage) et un recrutement facile.
- Projet qui partagera des compétences entre web et mobile (React Native).

## Quand l'éviter

- Site essentiellement statique (vitrine, documentation) : un générateur de site ou du HTML rendu côté serveur suffit, sans envoyer de JavaScript inutile au navigateur.
- Application CRUD simple dont l'équipe maîtrise un framework serveur : des pages rendues par Django ou Rails évitent de maintenir deux applications.
- Besoin d'un cadre complet et imposé : React laisse beaucoup de choix d'architecture à faire.

## Pour aller plus loin

- [Documentation officielle](https://react.dev/learn)
- [Penser en React](https://react.dev/learn/thinking-in-react)
