---
name: React Native
kind: framework
layers: [mobile]
languages: [javascript, typescript]
tags: [open-source, mobile, composants]
difficulty: 2
summary: "Framework de Meta pour écrire des applications iOS et Android en React : les composants s'affichent avec les vues natives de chaque plateforme."
integratesWith:
  - tech: react
    note: "Même modèle de composants et même logique d'état ; le code métier peut être partagé avec le web."
---

## Problème résolu

Développer une application mobile, c'est souvent écrire deux applications : une en Swift pour iOS, une en Kotlin pour Android. React Native (Meta, 2015) permet d'en écrire une seule en React. Contrairement à une page web empaquetée, les composants sont rendus avec les vues natives de la plateforme, ce qui donne une interface proche de celle d'une application native.

Le framework peut appeler du code natif quand il le faut (caméra, capteurs, SDK spécifiques). La « nouvelle architecture », active par défaut depuis 2024, réduit le coût des échanges entre JavaScript et le natif. Expo ajoute un outillage (build, mises à jour, modules) qui simplifie beaucoup le démarrage.

## Quand l'utiliser

- Application iOS et Android avec une seule équipe, surtout si elle pratique déjà React.
- Application de type formulaires, listes, contenus, où l'interface native standard suffit.
- Quand on veut livrer vite sur les deux plateformes.

## Quand l'éviter

- Usage intensif de fonctionnalités natives ou de graphismes exigeants : on finit par écrire beaucoup de code natif quand même.
- Entreprise qui a déjà des équipes iOS et Android natives solides : l'intégration dans des applications existantes est coûteuse. Airbnb a ainsi abandonné React Native en 2018 et a expliqué pourquoi sur son blog engineering.
- Chaque mise à jour majeure d'iOS ou d'Android peut demander d'attendre ou de corriger des bibliothèques tierces.

## Pour aller plus loin

- [Documentation officielle](https://reactnative.dev/docs/getting-started)
- [Sunsetting React Native (Airbnb, 2018)](https://medium.com/airbnb-engineering/sunsetting-react-native-1868ba28e30a)
