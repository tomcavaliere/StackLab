---
name: Django
kind: framework
layers: [backend-api, auth]
languages: [python]
tags: [open-source, web, batteries-incluses]
difficulty: 2
summary: "Framework web Python « batteries incluses » : ORM, migrations, authentification et interface d'administration sont fournis d'emblée."
alternatives:
  - tech: ruby-on-rails
    note: "Même philosophie d'application complète et de conventions, en Ruby."
  - tech: fastapi
    note: "API seule, plus légère, asynchrone et typée ; sans ORM, sans administration ni authentification intégrées."
integratesWith:
  - tech: postgresql
    note: "La base la mieux prise en charge par l'ORM, avec des champs et fonctions dédiés (django.contrib.postgres)."
  - tech: celery
    note: "Combinaison classique pour exécuter les tâches lentes en arrière-plan."
  - tech: redis
    note: "Backend de cache intégré à Django depuis la version 4.0."
---

## Problème résolu

Une application web refait toujours les mêmes briques : modèle de données et migrations, formulaires et validation, comptes utilisateurs et permissions, back-office pour gérer les données. Django (publié en 2005) les fournit toutes, cohérentes entre elles. On décrit ses modèles en Python, l'ORM génère les tables et les migrations, et l'interface d'administration est disponible sans écrire de code.

L'authentification (`django.contrib.auth`) gère les comptes, les mots de passe hachés, les sessions, les groupes et les permissions. Pour exposer une API REST, le paquet tiers Django REST Framework est la référence.

## Quand l'utiliser

- MVP ou SaaS avec beaucoup de données métier et un besoin de back-office : l'admin fait gagner des semaines.
- Équipe Python, en particulier si le produit touche aussi à la data.
- Projet qui veut des choix déjà faits et une documentation exemplaire.

## Quand l'éviter

- Micro-API sans base de données ni utilisateurs : FastAPI ou un framework minimal suffisent.
- Charges très concurrentes à base de connexions longues (WebSockets en masse) : Django gère l'asynchrone (vues async, Channels), mais ce n'est pas son modèle d'origine.
- Équipe qui ne pratique pas Python.

## Pour aller plus loin

- [Documentation officielle](https://docs.djangoproject.com/fr/stable/)
- [Tutoriel officiel](https://docs.djangoproject.com/fr/stable/intro/tutorial01/)
