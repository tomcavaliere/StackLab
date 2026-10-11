---
name: Rust
kind: langage
layers: []
tags: [typage-statique, open-source]
difficulty: 3
summary: "Langage compilé aux performances proches du C, qui garantit la sûreté mémoire à la compilation, sans ramasse-miettes."
alternatives:
  - tech: go
    note: "Plus simple et bien plus rapide à apprendre, avec un ramasse-miettes : souvent suffisant pour des services réseau."
---

## Problème résolu

En C et en C++, le programmeur gère la mémoire à la main : une erreur (accès après libération, dépassement de tampon) produit des plantages et une grande partie des failles de sécurité. Les langages à ramasse-miettes (Java, Go) évitent ces erreurs, mais ajoutent un runtime et des pauses. Rust (né chez Mozilla, version 1.0 en 2015) prend une troisième voie : un système de possession et d'emprunt, vérifié par le compilateur, garantit qu'aucun accès mémoire invalide ni aucune course de données n'est possible dans le code dit « sûr ».

Le prix est une courbe d'apprentissage réelle : le compilateur refuse beaucoup de programmes tant que les règles de possession ne sont pas respectées. En retour, le code compilé est rapide et prévisible. Cargo gère build, dépendances et tests. Rust est utilisé dans Firefox, dans le noyau Linux depuis 2022, et dans l'infrastructure de grands acteurs du cloud.

## Quand l'utiliser

- Logiciel système, moteurs, bases de données, proxys : là où l'on aurait écrit du C ou du C++.
- Composants où performance et sûreté comptent ensemble : traitement de données intensif, cryptographie, calcul exécuté dans le navigateur via WebAssembly.
- Outils en ligne de commande rapides, distribués en un binaire.

## Quand l'éviter

- MVP ou application CRUD : le temps d'apprentissage et d'écriture ne se rentabilise pas.
- Service réseau classique : Go apporte l'essentiel des performances utiles, avec une prise en main bien plus rapide.
- Data science et machine learning exploratoire : Python reste la référence, même si des bibliothèques Python rapides sont écrites en Rust (Polars, par exemple).

## Pour aller plus loin

- [The Rust Programming Language (le « Book »)](https://doc.rust-lang.org/book/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
