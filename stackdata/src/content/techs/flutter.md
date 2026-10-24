---
name: Flutter
kind: framework
layers: [mobile]
languages: [dart]
tags: [open-source, mobile, composants]
difficulty: 2
summary: "Framework de Google pour écrire en Dart une application iOS et Android : il dessine lui-même chaque élément d'interface, identique sur toutes les plateformes."
alternatives:
  - tech: react-native
    note: "Composants rendus avec les vues natives de chaque plateforme, en React : naturel pour une équipe JavaScript qui fait aussi du web."
---

## Problème résolu

Comme React Native, Flutter (Google, version 1.0 en 2018) évite d'écrire deux applications, une pour iOS et une pour Android. Son approche diffère : au lieu d'utiliser les composants natifs de chaque plateforme, il dessine lui-même chaque pixel de l'interface avec son propre moteur de rendu. L'application a le même aspect partout, et le même code peut aussi viser le web et le bureau.

Le code s'écrit en Dart, compilé en code natif pour la production. En développement, le rechargement à chaud (hot reload) applique une modification sans perdre l'état de l'application. Le framework fournit un large catalogue de widgets, aux styles Material (Google) et Cupertino (Apple).

## Quand l'utiliser

- Application iOS et Android avec une seule équipe, surtout avec une identité visuelle très personnalisée.
- Interface qui doit être identique au pixel près sur toutes les plateformes.
- Équipe sans culture JavaScript, prête à apprendre Dart.

## Quand l'éviter

- Équipe React qui veut partager compétences et code métier avec le web : React Native est plus naturel.
- Application qui doit reprendre exactement l'aspect et les comportements natifs de chaque plateforme, ou intégrer beaucoup de SDK natifs : il faut alors écrire des ponts vers le code natif.
- Recrutement : Dart reste peu utilisé hors de Flutter.

## Pour aller plus loin

- [Documentation officielle](https://docs.flutter.dev/)
- [Flutter pour les développeurs React Native](https://docs.flutter.dev/get-started/flutter-for/react-native-devs)
