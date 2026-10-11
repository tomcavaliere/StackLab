---
questions:
  - id: base
    prompt: "Sur quelle base de données Supabase est-il bâti ?"
    answer: "PostgreSQL"
    decoys:
      - "MongoDB"
      - "MySQL"
    why: "Chaque projet Supabase est une base PostgreSQL standard."
  - id: api-generee
    prompt: "Comment Supabase fournit-il une API REST ?"
    answer: "Il la génère à partir du schéma de la base, avec PostgREST"
    decoys:
      - "À partir de fichiers OpenAPI écrits à la main par l'équipe"
      - "Il n'en fournit pas : il faut écrire un back-end"
    why: "Créer une table suffit pour pouvoir l'interroger par API."
  - id: rls
    prompt: "Comment écrit-on les autorisations dans Supabase ?"
    answer: "En SQL, avec la Row Level Security de PostgreSQL"
    decoys:
      - "Dans un fichier YAML de rôles, à la racine du projet"
      - "Uniquement dans le code du front"
    why: "La sécurité au niveau des lignes garantit que chaque utilisateur ne voit que ses lignes, même quand le front interroge la base directement."
  - id: rls-risque
    prompt: "Quel est le risque de politiques RLS mal écrites ?"
    answer: "Comme le front interroge la base, une erreur expose directement des données"
    decoys:
      - "La base devient plus lente"
      - "Aucun : Supabase détecte et corrige les politiques mal écrites automatiquement"
    why: "Il n'y a pas de back-end entre le front et la base : les politiques RLS sont la seule barrière."
  - id: briques
    prompt: "Que fournit Supabase en plus de la base ?"
    answer: "L'authentification, le stockage de fichiers, le temps réel et des fonctions serverless"
    decoys:
      - "Un cluster Kubernetes, un registre d'images et un orchestrateur de pipelines"
      - "Un entrepôt colonnaire et un orchestrateur"
    why: "Supabase rassemble les briques d'un back-end de MVP autour de PostgreSQL."
  - id: sortie
    prompt: "Peut-on quitter Supabase facilement ?"
    answer: "Oui : chaque projet est une base PostgreSQL standard, qu'on peut migrer ailleurs"
    decoys:
      - "Non : les données sont stockées dans un format propriétaire, impossible à relire ailleurs"
      - "Non : aucun export n'est prévu"
    why: "On peut se connecter directement à la base et la migrer."
  - id: auto-hebergement
    prompt: "Supabase peut-il être auto-hébergé ?"
    answer: "Oui : le projet est open-source"
    decoys:
      - "Non : c'est un service fermé"
      - "Oui, mais uniquement sur Vercel"
    why: "L'offre hébergée est la plus simple, mais le projet peut tourner sur ses propres serveurs."
  - id: logique-complexe
    prompt: "Une logique métier complexe côté serveur : Supabase seul suffit-il ?"
    answer: "Mal : elle se disperse entre RLS, fonctions SQL et serverless ; un back-end dédié est plus clair"
    decoys:
      - "Très bien : les politiques RLS gèrent toute la logique métier, et restent faciles à tester"
      - "Très bien : Supabase génère le back-end métier"
    why: "La fiche le range dans « Quand l'éviter » : cette logique devient difficile à tester."
  - id: cible
    prompt: "Pour qui Supabase est-il idéal ?"
    answer: "Une petite équipe orientée front qui veut livrer un MVP sans écrire ni opérer de serveur"
    decoys:
      - "Une grande plateforme data analytique"
      - "Une équipe d'exploitation qui veut régler finement chaque paramètre de la base"
    why: "Le front parle directement au back-end hébergé. Les réglages fins de la base dépendent de ce que permet l'offre hébergée."
  - id: seulement-l-auth
    prompt: "Seule l'authentification doit être externalisée, avec du SSO d'entreprise avancé. Que choisir ?"
    answer: "Auth0"
    decoys:
      - "Supabase Storage"
      - "PostgREST"
    why: "Auth0 est spécialisé dans l'identité et le SSO d'entreprise."
---
