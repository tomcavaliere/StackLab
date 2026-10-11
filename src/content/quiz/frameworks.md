---
title: Frameworks web & mobile
description: "Front, full-stack, back-end, mobile : quel framework pour quelle équipe et quel besoin ?"
questions:
  - id: back-office-python
    prompt: "Une application Python avec beaucoup de données métier et un back-office prêt à l'emploi"
    answer: django
    decoy: fastapi
    why: "Django fournit ORM, migrations, authentification et interface d'administration. FastAPI ne livre que l'API : le back-office reste à construire."
  - id: api-python-typee
    prompt: "Une API JSON en Python dont la validation et la documentation OpenAPI sont générées à partir des types"
    answer: fastapi
    decoy: django
    why: "FastAPI part des annotations de type pour valider les requêtes et générer la documentation. Django vise les applications complètes ; pour une API, on lui ajoute Django REST Framework."
  - id: pages-publiques-referencees
    prompt: "Une application React dont les pages publiques doivent s'afficher vite et être bien référencées"
    answer: nextjs
    decoy: react
    why: "React seul envoie une page vide que le navigateur remplit en JavaScript. Next.js ajoute le rendu côté serveur et la génération statique."
  - id: mobile-equipe-react
    prompt: "Une application iOS et Android pour une équipe qui fait déjà du React sur le web"
    answer: react-native
    decoy: flutter
    why: "React Native reprend le modèle de composants de React, et le code métier peut être partagé avec le web. Flutter impose d'apprendre Dart."
  - id: interface-identique-partout
    prompt: "Une application mobile à l'identité visuelle très personnalisée, identique au pixel près sur iOS et Android"
    answer: flutter
    decoy: react-native
    why: "Flutter dessine lui-même chaque élément avec son moteur de rendu : l'interface est la même partout. React Native s'appuie sur les vues natives de chaque plateforme."
  - id: grosse-appli-structuree
    prompt: "Une grosse application front d'entreprise, développée par plusieurs équipes dans un cadre complet et imposé"
    answer: angular
    decoy: react
    why: "Angular fournit routeur, formulaires, client HTTP, injection de dépendances et une CLI qui impose une structure commune. React n'est qu'une bibliothèque d'interface : l'architecture reste à choisir."
  - id: peu-de-javascript
    prompt: "Une interface légère, qui envoie le moins de JavaScript possible au navigateur"
    answer: svelte
    decoy: angular
    why: "Svelte compile les composants au build et n'embarque qu'un runtime minimal. Angular livre un framework complet au navigateur."
  - id: back-end-node-structure
    prompt: "Un back-end Node.js en TypeScript, partagé par plusieurs équipes, avec modules et injection de dépendances"
    answer: nestjs
    decoy: express
    why: "NestJS impose une architecture (modules, contrôleurs, services injectés) au-dessus d'Express. Express laisse chaque projet inventer la sienne."
  - id: serveur-sans-magie
    prompt: "Comprendre comment marche un serveur web, avec seulement des routes et des middlewares"
    answer: express
    decoy: nestjs
    why: "Express ajoute une couche fine au module HTTP de Node.js : routes et middlewares, sans magie. NestJS empile décorateurs et injection de dépendances par-dessus."
  - id: saas-equipe-php
    prompt: "Un SaaS avec comptes, e-mails et tâches de fond, à livrer vite par une équipe qui pratique PHP"
    answer: laravel
    decoy: ruby-on-rails
    why: "Laravel est le framework « batteries incluses » de PHP : ORM, migrations, files d'attente, e-mails, authentification. Rails suit la même philosophie, mais en Ruby."
  - id: crud-deux-devs-ruby
    prompt: "Une application CRUD avec back-office, à livrer en quelques semaines par deux développeurs Ruby"
    answer: ruby-on-rails
    decoy: spring-boot
    why: "Rails est conçu pour livrer vite une application complète, par convention. Spring Boot est robuste, mais long à prendre en main pour une petite équipe sans expérience de la JVM."
  - id: microservice-binaire-unique
    prompt: "Un microservice JSON à fort trafic, livré en un seul binaire qui démarre vite"
    answer: gin
    decoy: django
    why: "Gin s'appuie sur Go : un binaire unique, qui démarre vite et consomme peu de mémoire. L'administration et les gabarits de Django ne serviraient à rien ici."
  - id: banque-equipe-java
    prompt: "Le back-end d'une banque, avec une grande équipe Java et de nombreuses intégrations"
    answer: spring-boot
    decoy: express
    why: "Spring Boot couvre sécurité, messagerie et accès aux données pour une équipe Java, avec l'Actuator pour l'exploitation. Express laisse tout à assembler, en JavaScript."
  - id: routeur-et-etat-officiels
    prompt: "Un framework front à composants réputé pour sa prise en main rapide, avec routeur et gestion d'état officiels"
    answer: vue
    decoy: react
    why: "Vue a des projets officiels pour le routage (Vue Router) et l'état (Pinia). Avec React, ces choix sont laissés à l'équipe."
  - id: enrichir-pages-serveur
    prompt: "Ajouter de l'interactivité à quelques pages rendues côté serveur, sans réécrire le site"
    answer: vue
    decoy: angular
    why: "Vue est progressif : il s'ajoute à une page existante. Angular est pensé pour bâtir une application complète."
  - id: interface-et-api-un-projet
    prompt: "Une petite équipe JavaScript qui veut l'interface et une API légère dans un seul projet"
    answer: nextjs
    decoy: express
    why: "Next.js réunit pages, rendu serveur et routes d'API. Express ne fait que le serveur : l'interface serait un second projet."
  - id: connexions-temps-reel-js
    prompt: "Un back-end temps réel avec beaucoup de connexions WebSocket, dans le même langage que le front"
    answer: nodejs
    decoy: django
    why: "La boucle d'événements de Node.js traite de nombreuses connexions dans un seul processus, en JavaScript comme le front. Django gère l'asynchrone, mais ce n'est pas son modèle d'origine."
---
