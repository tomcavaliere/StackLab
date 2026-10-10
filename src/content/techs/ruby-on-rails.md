---
name: Ruby on Rails
kind: framework
layers: [backend-api, auth]
languages: [ruby]
tags: [open-source, web, batteries-incluses]
difficulty: 2
summary: "Framework web Ruby qui privilégie la convention à la configuration : on obtient très vite une application complète, de la base aux vues."
integratesWith:
  - tech: postgresql
    note: "Base par défaut de nombreux projets Rails, prise en charge nativement par Active Record."
  - tech: mysql
    note: "Également pris en charge nativement par Active Record ; historiquement très courant avec Rails."
  - tech: redis
    note: "Souvent utilisé pour le cache et les files de tâches (Sidekiq), même si Rails 8 propose des alternatives adossées à la base."
---

## Problème résolu

Rails (David Heinemeier Hansson, 2004, extrait de Basecamp) part d'un constat : la plupart des décisions d'une application web sont les mêmes d'un projet à l'autre. Il les prend par convention (nommage des tables, structure des dossiers, routes) pour que l'équipe écrive surtout du code métier. Active Record fait le lien avec la base, les migrations versionnent le schéma, Action Mailer et Active Job gèrent e-mails et tâches de fond.

Depuis Rails 7, Hotwire (Turbo et Stimulus) permet des interfaces réactives avec très peu de JavaScript. Rails 8 (2024) ajoute un générateur d'authentification et des briques de cache et de files adossées à la base (Solid Cache, Solid Queue), pour démarrer sans Redis.

## Quand l'utiliser

- MVP ou SaaS à livrer vite par une petite équipe : c'est le cœur de cible.
- Application CRUD riche avec back-office, où la productivité prime sur la performance brute.
- Équipe qui pratique Ruby.

## Quand l'éviter

- Services à très fort trafic avec latence serrée : Rails sait monter en charge (GitHub et Shopify en sont des exemples publics connus), mais cela demande un effort d'optimisation qu'un langage compilé évite en partie.
- Data et machine learning au cœur du produit : l'écosystème Python est plus adapté.
- Équipe qui n'adhère pas aux conventions : on se bat alors contre le framework.

## Pour aller plus loin

- [Guides officiels](https://guides.rubyonrails.org/)
- [Getting Started with Rails](https://guides.rubyonrails.org/getting_started.html)
