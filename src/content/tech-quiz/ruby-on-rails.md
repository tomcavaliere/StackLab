---
questions:
  - id: convention
    prompt: "Quel principe guide Ruby on Rails ?"
    answer: "La convention plutôt que la configuration"
    decoys:
      - "La configuration explicite de chaque détail"
      - "Le minimalisme : chaque brique se choisit à la carte"
    why: "Rails prend par convention les décisions communes à tous les projets (nommage, dossiers, routes) pour que l'équipe écrive surtout du code métier."
  - id: active-record
    prompt: "Qu'est-ce qu'Active Record dans Rails ?"
    answer: "La couche qui fait le lien avec la base de données"
    decoys:
      - "Le moteur de gabarits qui produit les pages HTML"
      - "Le système de tâches de fond"
    why: "Active Record est l'ORM de Rails ; les tâches de fond passent par Active Job."
  - id: hotwire
    prompt: "Que permet Hotwire (Turbo et Stimulus), depuis Rails 7 ?"
    answer: "Des interfaces réactives avec très peu de JavaScript"
    decoys:
      - "Compiler le code Ruby en JavaScript"
      - "Remplacer la base de données par Redis pour les pages dynamiques"
    why: "Hotwire garde le rendu côté serveur tout en rendant l'interface réactive."
  - id: rails-8
    prompt: "Qu'apporte Rails 8 (2024) ?"
    answer: "Un générateur d'authentification, et Solid Cache et Solid Queue adossés à la base"
    decoys:
      - "Un compilateur qui transforme l'application Rails en un binaire Go autonome"
      - "La suppression d'Active Record au profit de SQL brut"
    why: "Rails 8 permet de démarrer avec l'authentification générée et sans Redis pour le cache et les files."
  - id: solid
    prompt: "Pourquoi Solid Cache et Solid Queue ?"
    answer: "Pour démarrer sans Redis, avec un cache et des files adossés à la base"
    decoys:
      - "Pour remplacer PostgreSQL par Redis comme base principale"
      - "Pour exécuter Rails dans le navigateur"
    why: "Une brique de moins à opérer au démarrage : la base suffit."
  - id: origine
    prompt: "D'où Rails a-t-il été extrait ?"
    answer: "De Basecamp, par David Heinemeier Hansson, en 2004"
    decoys:
      - "De GitHub, en 2008, pour gérer ses dépôts"
      - "De Shopify, en 2006, pour sa boutique"
    why: "Rails est né de Basecamp. GitHub et Shopify sont des exemples publics de Rails à grande échelle."
  - id: cible
    prompt: "Quel est le cœur de cible de Rails ?"
    answer: "Un MVP ou un SaaS à livrer vite par une petite équipe"
    decoys:
      - "Un service temps réel à latence très serrée, à la milliseconde"
      - "Un pipeline de machine learning"
    why: "La productivité prime : beaucoup de fonctionnalités avec peu de code."
  - id: montee-en-charge
    prompt: "Rails peut-il monter en charge ?"
    answer: "Oui (GitHub, Shopify), au prix d'un effort d'optimisation"
    decoys:
      - "Non : il plafonne à quelques centaines d'utilisateurs"
      - "Oui, sans aucun effort, mieux qu'un langage compilé"
    why: "Rails tient de très gros trafics, mais cela demande un effort qu'un langage compilé évite en partie."
  - id: mails-et-jobs
    prompt: "Quels composants de Rails gèrent les e-mails et les tâches de fond ?"
    answer: "Action Mailer et Active Job"
    decoys:
      - "Celery et Airflow, intégrés"
      - "Eloquent et Blade, repris de Laravel"
    why: "Ce sont des briques intégrées à Rails. Celery et Airflow sont en Python ; Eloquent et Blade appartiennent à Laravel."
  - id: conventions
    prompt: "Une équipe qui n'adhère pas aux conventions du framework : Rails est-il un bon choix ?"
    answer: "Non : elle se battra contre le framework"
    decoys:
      - "Oui : Rails n'impose aucune convention"
      - "Oui : il suffit de désactiver les conventions"
    why: "Toute la productivité de Rails vient de ses conventions."
---
