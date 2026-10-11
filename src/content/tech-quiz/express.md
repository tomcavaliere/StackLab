---
questions:
  - id: apport
    prompt: "Qu'apporte Express au module HTTP de Node.js ?"
    answer: "Un routage par méthode et chemin, et une chaîne de middlewares"
    decoys:
      - "Un ORM et un système de migrations"
      - "Le rendu côté serveur de composants React, avec un routage par fichiers"
    why: "Le module HTTP de Node.js est bas niveau. Express ajoute une couche fine : routes et middlewares. Le reste se choisit à la carte."
  - id: middleware
    prompt: "Qu'est-ce qu'un middleware Express ?"
    answer: "Une fonction qui traite la requête puis passe la main à la suivante"
    decoys:
      - "Un serveur intermédiaire placé entre le navigateur et Node.js"
      - "Un pilote de base de données"
    why: "Journalisation, authentification, analyse du JSON : chaque middleware traite la requête à son tour."
  - id: minimaliste
    prompt: "Comment Express gère-t-il la base de données et la validation ?"
    answer: "Il ne les gère pas : chaque besoin se couvre par un paquet npm choisi par l'équipe"
    decoys:
      - "Avec un ORM intégré et un validateur de schémas"
      - "En générant automatiquement une API REST à partir du schéma de la base de données"
    why: "Express est volontairement minimal : base, validation, authentification sont des choix de l'équipe."
  - id: projet-qui-grossit
    prompt: "Quel risque quand un projet Express grossit avec plusieurs équipes ?"
    answer: "Sans structure imposée, chaque projet finit avec sa propre architecture"
    decoys:
      - "Express limite le nombre de routes par application"
      - "Express cesse de gérer les middlewares au-delà d'une certaine taille"
    why: "La liberté d'Express se paie sur les gros projets : les conventions divergent. NestJS fournit ce cadre."
  - id: nestjs
    prompt: "Quel framework Node.js impose une structure (modules, contrôleurs, services), là où Express n'en impose pas ?"
    answer: "NestJS"
    decoys:
      - "Fastify"
      - "Next.js"
    why: "NestJS impose une architecture et s'exécute d'ailleurs au-dessus d'Express. Fastify met l'accent sur la validation et la performance ; Next.js est un framework full-stack React."
  - id: validation-integree
    prompt: "Besoin de validation et de documentation d'API intégrées, en Node.js. Que suggère la fiche ?"
    answer: "Fastify"
    decoys:
      - "Express 5, qui les intègre désormais"
      - "Le module HTTP de Node.js, sans framework"
    why: "Fastify (ou FastAPI en Python) apporte validation et documentation intégrées. Express 5 reste minimaliste."
  - id: express-5
    prompt: "Quand Express 5 est-il sorti ?"
    answer: "En 2024, après une très longue gestation"
    decoys:
      - "En 2010, avec la première version d'Express"
      - "Jamais : le projet est resté en version 4"
    why: "Express date de 2010 ; sa version 5 n'est sortie qu'en 2024."
  - id: equivalent-python
    prompt: "Quel équivalent Python d'Express la fiche cite-t-elle, avec validation et OpenAPI intégrées ?"
    answer: "FastAPI"
    decoys:
      - "Django"
      - "Celery"
    why: "FastAPI est léger comme Express, mais valide les entrées et génère la documentation OpenAPI. Django est un framework complet ; Celery une file de tâches."
  - id: application-complete
    prompt: "Une application avec beaucoup de pages et de données métier. Express est-il le meilleur choix ?"
    answer: "Non : un framework complet (Django, Rails, Next.js) fait gagner du temps"
    decoys:
      - "Oui : Express impose une structure MVC complète"
      - "Oui : Express fournit une interface d'administration intégrée, générée depuis les modèles"
    why: "Express n'apporte ni ORM, ni admin, ni structure : sur une application riche, tout est à assembler."
  - id: projet-existant
    prompt: "Pourquoi garder Express dans un projet existant ?"
    answer: "C'est le framework Node.js le plus répandu et le plus documenté"
    decoys:
      - "C'est le seul framework Node.js compatible avec TypeScript"
      - "C'est le plus rapide de tous les frameworks web"
    why: "Express s'écrit en JavaScript comme en TypeScript, et n'est pas le plus rapide. Son atout est sa diffusion : documentation, exemples, développeurs."
---
