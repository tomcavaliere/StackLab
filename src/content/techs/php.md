---
name: PHP
kind: langage
layers: []
tags: [typage-dynamique, open-source, web]
difficulty: 1
summary: "Langage de script côté serveur né pour le web : chaque requête exécute le script dans un contexte neuf. Il fait tourner WordPress et une grande partie du web."
---

## Problème résolu

Au milieu des années 1990, rendre une page web dynamique demandait d'écrire des programmes CGI. PHP (Rasmus Lerdorf, 1995) permet d'insérer du code directement dans les pages, exécuté par le serveur à chaque requête. Chaque requête repart d'un état vierge : rien n'est partagé entre deux requêtes, ce qui rend le déploiement simple (on dépose des fichiers) et limite la portée d'une erreur.

Le langage a beaucoup évolué : PHP 7 (2015) a nettement amélioré les performances, PHP 8 (2020) a ajouté un compilateur à la volée (JIT), des types plus stricts et une syntaxe modernisée. Composer gère les dépendances. WordPress, Drupal, Laravel et Symfony sont écrits en PHP, et Facebook l'a été à ses débuts.

## Quand l'utiliser

- Sites et CMS (WordPress, Drupal), leurs thèmes et leurs extensions.
- Applications web avec Laravel ou Symfony, par une équipe qui pratique PHP.
- Hébergement mutualisé bon marché : la plupart des hébergeurs l'exécutent sans configuration.

## Quand l'éviter

- Processus de longue durée et connexions persistantes (WebSockets, workers en continu) : le modèle d'une exécution par requête ne s'y prête pas d'origine ; des serveurs comme FrankenPHP ou Swoole changent ce modèle.
- Data et machine learning : l'écosystème Python domine.
- Application mobile ou code exécuté dans le navigateur : ce n'est pas son terrain.

## Pour aller plus loin

- [Documentation officielle](https://www.php.net/manual/fr/)
- [PHP: The Right Way](https://phptherightway.com/)
