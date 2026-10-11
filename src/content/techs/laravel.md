---
name: Laravel
kind: framework
layers: [frontend, backend-api, auth]
languages: [php]
tags: [open-source, web, batteries-incluses]
difficulty: 2
summary: "Framework web PHP « batteries incluses » : ORM, migrations, files d'attente, e-mails et authentification fournis, pour livrer vite une application complète."
alternatives:
  - tech: ruby-on-rails
    note: "Même philosophie d'application complète et de conventions, en Ruby."
  - tech: django
    note: "Même approche « batteries incluses », en Python, avec en plus une interface d'administration générée."
integratesWith:
  - tech: mysql
    note: "Base historique de l'écosystème PHP, prise en charge nativement par Eloquent, comme PostgreSQL et SQLite."
  - tech: redis
    note: "Souvent utilisé pour le cache, les sessions et les files d'attente de Laravel."
---

## Problème résolu

PHP a longtemps été écrit sans cadre, avec SQL et HTML mêlés dans les mêmes fichiers. Laravel (Taylor Otwell, 2011) apporte à PHP ce que Rails a apporté à Ruby : des conventions et toutes les briques d'une application web. Eloquent fait le lien avec la base, les migrations versionnent le schéma, Blade rend les pages côté serveur, et les files d'attente, la planification de tâches et l'envoi d'e-mails sont intégrés. La CLI Artisan génère le code.

Des kits de démarrage fournissent l'authentification (inscription, connexion, réinitialisation du mot de passe). Livewire permet des interfaces réactives en restant côté PHP, et Laravel s'associe aussi à React ou Vue. Un écosystème commercial (Forge, Vapor, Laravel Cloud) simplifie l'hébergement.

## Quand l'utiliser

- MVP ou SaaS à livrer vite par une équipe qui pratique PHP.
- Application CRUD avec comptes utilisateurs, tâches de fond et e-mails.
- Contexte où un hébergement PHP est déjà en place.

## Quand l'éviter

- Équipe qui ne pratique pas PHP : Django ou Rails offrent la même productivité dans leur langage.
- Data et machine learning au cœur du produit : l'écosystème Python est plus adapté.
- Service à très fort trafic où la latence compte : comme Rails, Laravel tient la charge avec un effort d'optimisation (cache, Octane) qu'un langage compilé évite en partie.

## Pour aller plus loin

- [Documentation officielle](https://laravel.com/docs)
- [Kits de démarrage](https://laravel.com/docs/starter-kits)
