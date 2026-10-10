---
name: Gin
kind: framework
layers: [backend-api]
languages: [go]
tags: [open-source, api, cloud-native]
difficulty: 2
summary: "Framework HTTP léger pour Go : routage, middlewares, liaison et validation des requêtes au-dessus de la bibliothèque standard."
alternatives:
  - tech: spring-boot
    note: "Écosystème Java bien plus riche pour l'entreprise, au prix d'une application plus lourde."
---

## Problème résolu

La bibliothèque standard de Go (`net/http`) suffit pour écrire un serveur, mais on réécrit vite les mêmes utilitaires : paramètres de route, groupes de routes, middlewares, lecture et validation du JSON. Gin les fournit avec une API compacte et un routeur performant, sans changer le modèle de Go : chaque requête est traitée dans une goroutine.

Le service résultant est un binaire unique, qui démarre vite et consomme peu de mémoire. C'est un bon profil pour des API à fort trafic déployées dans des conteneurs.

## Quand l'utiliser

- API JSON ou microservice à fort trafic écrit en Go.
- Équipe qui veut un serveur performant, simple à déployer, sans l'écosystème de la JVM.

## Quand l'éviter

- Application avec beaucoup de données métier, de pages et de back-office : il faut tout assembler soi-même (ORM, migrations, authentification).
- Besoins de routage simples : depuis Go 1.22 (2024), le routeur standard gère méthodes et paramètres de chemin, et la bibliothèque standard peut suffire.
- Équipe sans expérience Go qui doit livrer vite.

## Pour aller plus loin

- [Documentation officielle](https://gin-gonic.com/en/docs/)
- [Écrire un service web avec Go et Gin (tutoriel go.dev)](https://go.dev/doc/tutorial/web-service-gin)
