---
name: Next.js
kind: framework
layers: [frontend, backend-api]
languages: [javascript, typescript]
tags: [open-source, web, ssr, composants]
difficulty: 2
summary: "Framework React qui ajoute le routage, le rendu côté serveur ou statique et des routes d'API : une application web complète dans un seul projet."
integratesWith:
  - tech: vercel
    note: "Vercel édite Next.js et l'héberge sans configuration ; l'auto-hébergement sur Node.js ou Docker reste possible."
---

## Problème résolu

Une application React seule envoie une page vide que le navigateur remplit en JavaScript : le premier affichage est plus lent et le référencement plus difficile. Il faut aussi choisir et assembler soi-même le routage, le build et le rendu serveur. Next.js, publié par Vercel en 2016, fournit ces briques d'un coup : routage par fichiers, rendu côté serveur, génération statique et routes d'API dans le même projet.

Depuis l'App Router (stable en 2023), les composants serveur de React s'exécutent uniquement sur le serveur et peuvent lire directement une base ou une API, ce qui réduit le JavaScript envoyé au navigateur.

## Quand l'utiliser

- Application web React qui a besoin d'un bon premier affichage ou de référencement : SaaS, e-commerce, contenu.
- Petite équipe full-stack JavaScript qui veut un seul projet pour l'interface et une API légère.
- Déploiement sur Vercel ou une plateforme compatible, pour profiter des préversions par branche.

## Quand l'éviter

- Back-end lourd : tâches de fond, traitements longs, logique métier complexe. Un back-end dédié (Django, Rails, Spring Boot…) est plus adapté, et Next.js devient alors seulement le front.
- Interface purement client derrière une connexion, sans besoin de SEO : React avec un outil de build simple suffit.
- La frontière entre composants serveur et client ajoute une complexité réelle, qui demande un temps d'apprentissage.

## Pour aller plus loin

- [Documentation officielle](https://nextjs.org/docs)
- [Composants serveur et client](https://nextjs.org/docs/app/getting-started/server-and-client-components)
