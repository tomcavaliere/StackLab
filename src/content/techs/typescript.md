---
name: TypeScript
kind: langage
layers: []
tags: [web, typage-statique, open-source]
difficulty: 2
summary: "JavaScript avec des types statiques : le compilateur vérifie les types puis les efface, et le code produit est du JavaScript standard."
---

## Problème résolu

Dans un gros projet JavaScript, une faute de frappe dans un nom de propriété ou un argument du mauvais type n'apparaît qu'à l'exécution, parfois en production. TypeScript, créé par Microsoft en 2012, ajoute des annotations de type que le compilateur vérifie avant l'exécution. Les éditeurs s'en servent aussi pour l'autocomplétion et le renommage sûr.

Les types n'existent qu'à la compilation : ils sont effacés et le résultat est du JavaScript ordinaire, qui tourne partout où JavaScript tourne. Tout fichier JavaScript valide est presque toujours du TypeScript valide, ce qui permet une adoption progressive.

## Quand l'utiliser

- Toute application front ou Node.js destinée à durer ou à être partagée entre plusieurs développeurs.
- Quand on veut que le contrat entre front et back (forme des données d'une API) soit vérifié par l'outillage.
- C'est aujourd'hui le choix par défaut de la plupart des frameworks front (React, Vue, Next.js proposent des modèles TypeScript).

## Quand l'éviter

- Script jetable de quelques lignes : la configuration n'en vaut pas la peine.
- Les types ne vérifient rien à l'exécution : des données venues de l'extérieur (requête HTTP, fichier) doivent toujours être validées, par exemple avec une bibliothèque comme Zod.
- Une étape de compilation s'ajoute à la chaîne de build, même si les versions récentes de Node.js savent exécuter directement du TypeScript simple en retirant les types.

## Pour aller plus loin

- [Documentation officielle](https://www.typescriptlang.org/docs/)
- [TypeScript pour les développeurs JavaScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
