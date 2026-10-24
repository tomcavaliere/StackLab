---
name: Supabase
kind: plateforme
layers: [base-operationnelle, auth, backend-api]
languages: [sql, typescript]
tags: [open-source, offre-managee, relationnel, serverless]
difficulty: 1
summary: "Back-end hébergé bâti sur PostgreSQL : base, authentification, API générée, stockage de fichiers et temps réel prêts à l'emploi."
alternatives:
  - tech: auth0
    note: "Si seule l'authentification doit être externalisée, avec du SSO d'entreprise avancé."
integratesWith:
  - tech: postgresql
    note: "Chaque projet est une base PostgreSQL standard : on peut s'y connecter directement et la migrer ailleurs."
  - tech: nextjs
    note: "Client JavaScript et intégration documentée pour l'authentification côté serveur."
---

## Problème résolu

Pour un MVP, monter un back-end complet (base, API, comptes, stockage de fichiers) prend des semaines avant la première fonctionnalité visible. Supabase (2020) fournit ces briques autour d'une base PostgreSQL : une API REST générée à partir du schéma (PostgREST), l'authentification, le stockage de fichiers, des abonnements temps réel aux changements et des fonctions serverless.

Les autorisations s'écrivent en SQL avec la sécurité au niveau des lignes (Row Level Security) de PostgreSQL : le front peut interroger la base directement, et chaque utilisateur ne voit que ses lignes. Le projet est open-source et peut être auto-hébergé.

## Quand l'utiliser

- MVP ou prototype à livrer vite, avec un front (web ou mobile) qui parle directement au back-end.
- Petite équipe orientée front qui ne veut pas écrire ni opérer de serveur.
- Quand on veut garder une vraie base relationnelle, contrairement à des back-ends hébergés NoSQL.

## Quand l'éviter

- Logique métier complexe côté serveur : elle se disperse entre politiques RLS, fonctions SQL et fonctions serverless, et devient difficile à tester. Un back-end dédié est plus clair.
- Politiques RLS mal écrites : comme le front interroge la base, une erreur expose directement des données.
- Besoins très spécifiques en exploitation de base (extensions rares, réglages fins) : vérifier ce que l'offre hébergée permet.

## Pour aller plus loin

- [Documentation officielle](https://supabase.com/docs)
- [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
