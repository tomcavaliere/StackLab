---
questions:
  - id: philosophie
    prompt: "Qu'apporte Laravel à PHP ?"
    answer: "Des conventions et toutes les briques d'une application web, comme Rails pour Ruby"
    decoys:
      - "Un nouveau moteur d'exécution qui remplace PHP"
      - "Un framework front qui s'exécute dans le navigateur, à la manière de Vue ou de React"
    why: "PHP a longtemps été écrit sans cadre ; Laravel apporte structure et briques intégrées."
  - id: eloquent
    prompt: "Qu'est-ce qu'Eloquent ?"
    answer: "L'ORM de Laravel"
    decoys:
      - "Son moteur de gabarits"
      - "Sa ligne de commande"
    why: "Eloquent fait le lien avec la base ; Blade rend les pages, Artisan est la CLI."
  - id: blade
    prompt: "À quoi sert Blade ?"
    answer: "Rendre les pages côté serveur (gabarits)"
    decoys:
      - "Gérer les files d'attente"
      - "Faire le lien avec la base de données"
    why: "Blade est le moteur de gabarits de Laravel."
  - id: artisan
    prompt: "Qu'est-ce qu'Artisan ?"
    answer: "La CLI de Laravel, qui génère le code"
    decoys:
      - "L'offre d'hébergement managé de Laravel"
      - "L'ORM de Laravel"
    why: "Artisan génère contrôleurs, modèles, migrations… L'hébergement passe par Forge, Vapor ou Laravel Cloud."
  - id: livewire
    prompt: "Que permet Livewire ?"
    answer: "Des interfaces réactives en restant côté PHP"
    decoys:
      - "Écrire des applications mobiles natives en PHP"
      - "Remplacer la base de données par Redis"
    why: "Livewire joue un rôle proche de Hotwire pour Rails."
  - id: authentification
    prompt: "Comment obtenir inscription, connexion et réinitialisation du mot de passe dans Laravel ?"
    answer: "Avec des kits de démarrage"
    decoys:
      - "En installant obligatoirement Auth0"
      - "Laravel ne gère pas l'authentification"
    why: "Les kits de démarrage fournissent l'authentification complète."
  - id: createur
    prompt: "Qui a créé Laravel ?"
    answer: "Taylor Otwell, en 2011"
    decoys:
      - "Rasmus Lerdorf, en 1995"
      - "David Heinemeier Hansson, en 2004"
    why: "Rasmus Lerdorf a créé PHP, David Heinemeier Hansson Rails."
  - id: equipe-sans-php
    prompt: "Une équipe qui ne pratique pas PHP : Laravel est-il un bon choix ?"
    answer: "Non : Django ou Rails offrent la même productivité dans leur langage"
    decoys:
      - "Oui : PHP reste le seul langage vraiment adapté aux applications web"
      - "Oui : on peut écrire une application Laravel en TypeScript"
    why: "La productivité de Laravel suppose de pratiquer PHP."
  - id: integre
    prompt: "Qu'est-ce qui est intégré à Laravel ?"
    answer: "Les files d'attente, la planification de tâches et l'envoi d'e-mails"
    decoys:
      - "Un entrepôt de données colonnaire, pour les rapports et les tableaux de bord"
      - "Un orchestrateur de conteneurs"
    why: "Ce sont des besoins courants d'une application web, fournis d'emblée."
  - id: fort-trafic
    prompt: "Service à très fort trafic : que dit la fiche de Laravel ?"
    answer: "Il tient la charge avec un effort d'optimisation (cache, Octane)"
    decoys:
      - "Il est plus rapide qu'un langage compilé, sans effort"
      - "Il ne dépasse pas une centaine d'utilisateurs simultanés, quelle que soit l'infrastructure"
    why: "Comme Rails, Laravel monte en charge, mais demande un effort qu'un langage compilé évite en partie."
---
