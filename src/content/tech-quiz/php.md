---
questions:
  - id: modele
    prompt: "Comment s'exécute un script PHP classique ?"
    answer: "À chaque requête, dans un contexte neuf : rien n'est partagé entre deux requêtes"
    decoys:
      - "Dans un processus unique et permanent qui garde en mémoire l'état de tous les utilisateurs"
      - "Dans le navigateur du visiteur"
    why: "Chaque requête repart d'un état vierge."
  - id: avantage
    prompt: "Quel avantage PHP tire-t-il de son exécution à chaque requête, dans un contexte neuf ?"
    answer: "Un déploiement simple, et une erreur à la portée limitée"
    decoys:
      - "Des connexions WebSocket persistantes faciles à gérer"
      - "Un cache partagé automatiquement entre les requêtes"
    why: "On dépose des fichiers, et une erreur ne touche que la requête en cours. Les connexions persistantes sont justement son point faible."
  - id: php-7
    prompt: "Qu'a apporté PHP 7, en 2015 ?"
    answer: "Une nette amélioration des performances"
    decoys:
      - "Le passage au typage dynamique, abandonné ensuite"
      - "L'exécution du code PHP dans le navigateur"
    why: "PHP 7 a nettement accéléré le langage ; PHP 8 a ensuite ajouté un compilateur à la volée."
  - id: php-8
    prompt: "Qu'a ajouté PHP 8, en 2020 ?"
    answer: "Un compilateur à la volée (JIT), des types plus stricts et une syntaxe modernisée"
    decoys:
      - "La suppression des classes"
      - "Un moteur de base de données intégré, qui remplace MySQL dans la plupart des hébergements"
    why: "Le langage s'est beaucoup modernisé au fil des versions."
  - id: composer
    prompt: "Quel outil gère les dépendances en PHP ?"
    answer: "Composer"
    decoys:
      - "Bundler"
      - "Cargo"
    why: "Bundler est celui de Ruby, Cargo celui de Rust."
  - id: logiciels
    prompt: "Quels logiciels sont écrits en PHP ?"
    answer: "WordPress, Drupal, Laravel et Symfony"
    decoys:
      - "Django, Airflow, dbt et Celery"
      - "Kubernetes, Docker et Terraform"
    why: "Django, Airflow et dbt sont en Python ; Kubernetes, Docker et Terraform en Go."
  - id: connexions-persistantes
    prompt: "Workers permanents et WebSockets en PHP classique ?"
    answer: "Le modèle d'une exécution par requête ne s'y prête pas d'origine ; FrankenPHP ou Swoole le changent"
    decoys:
      - "C'est le point fort de PHP depuis ses débuts"
      - "C'est impossible, quel que soit le serveur utilisé : le langage ferme toute connexion après chaque réponse"
    why: "Des serveurs comme FrankenPHP ou Swoole gardent l'application en mémoire entre les requêtes."
  - id: hebergement
    prompt: "Pourquoi PHP est-il pratique en hébergement mutualisé ?"
    answer: "La plupart des hébergeurs l'exécutent sans configuration"
    decoys:
      - "Il ne nécessite aucun serveur web"
      - "Il est compilé en un binaire unique, que l'hébergeur copie tel quel"
    why: "C'est l'une des raisons de sa diffusion sur le web."
  - id: createur
    prompt: "Qui a créé PHP ?"
    answer: "Rasmus Lerdorf, en 1995"
    decoys:
      - "Taylor Otwell, en 2011"
      - "Brendan Eich, en 1995"
    why: "Taylor Otwell a créé Laravel, Brendan Eich JavaScript."
  - id: facebook
    prompt: "Quelle grande application a été écrite en PHP à ses débuts ?"
    answer: "Facebook"
    decoys:
      - "Instagram"
      - "Netflix"
    why: "Instagram a démarré avec Django, en Python."
---
