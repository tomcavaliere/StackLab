---
name: Développeur backend
family: dev
summary: "Construit la partie serveur : la logique métier, l'API et les données derrière l'interface."
mission: "Reçoit des requêtes du frontend ou d'un autre service, applique les règles métier, lit et écrit en base, puis répond. Il garantit que le système tient la charge, reste cohérent et ne laisse entrer que les bonnes personnes."
stack:
  - step: Choisir un langage
    intro: "Le langage conditionne les frameworks disponibles, les profils recrutables et les performances. Un backend se construit dans un seul langage principal."
    techs:
      - { tech: python, essential: true, why: "Lisible, avec de très bons frameworks web ; très répandu en backend et partagé avec la data et l'IA." }
      - { tech: typescript, essential: true, why: "Le même langage que le frontend, avec des types : une seule équipe peut tenir les deux côtés." }
      - { tech: java, why: "Un standard des grandes organisations : écosystème mûr, typage statique, outillage solide." }
      - { tech: go, why: "Compilé, simple, bon pour les services concurrents ; beaucoup d'outils d'infrastructure en sont écrits." }
      - { tech: php, why: "Historique du web, toujours très présent via Laravel et les sites existants." }
      - { tech: rust, why: "Performances et sûreté mémoire sans ramasse-miettes : pour les services où chaque milliseconde ou chaque octet compte, au prix d'un apprentissage exigeant." }
      - { tech: ruby, why: "Valorise le confort du développeur ; surtout connu via Ruby on Rails." }
  - step: Structurer l'API
    intro: "Un framework fournit le routage, la validation et l'accès aux données, pour éviter de réécrire ce que tout backend fait."
    techs:
      - { tech: fastapi, essential: true, why: "Framework Python moderne : validation par types et documentation d'API générée automatiquement." }
      - { tech: django, why: "Python « batteries incluses » : ORM, administration et authentification livrés d'origine." }
      - { tech: express, why: "Le framework Node.js minimaliste : on assemble soi-même ce dont on a besoin." }
      - { tech: nestjs, why: "Impose une architecture structurée à Node.js, pour les bases de code qui grossissent." }
      - { tech: nodejs, why: "Exécute du JavaScript côté serveur : l'environnement sur lequel reposent Express et NestJS." }
      - { tech: spring-boot, why: "Le framework Java dominant en entreprise, avec une configuration par défaut qui accélère le démarrage." }
      - { tech: laravel, why: "Framework PHP complet, apprécié pour sa productivité." }
      - { tech: ruby-on-rails, why: "Le framework qui a popularisé « convention plutôt que configuration » : très rapide pour un premier produit." }
      - { tech: gin, why: "Framework web minimal pour Go, adapté aux API légères et rapides." }
  - step: Exposer l'API
    intro: "L'API est le contrat entre le backend et ses clients. Le style choisi impose des contraintes aux deux côtés."
    techs:
      - { tech: rest, essential: true, why: "Le style de référence pour une API web : ressources, verbes HTTP, codes de statut." }
      - { tech: graphql, why: "Un seul point d'entrée où le client choisit les champs retournés ; plus de travail côté serveur." }
      - { tech: grpc, why: "Appels binaires typés entre services : plus compact et plus strict que REST, pensé pour le service-à-service." }
      - { tech: websocket, why: "Canal bidirectionnel ouvert pour pousser des données au client sans qu'il redemande." }
  - step: Stocker les données
    intro: "La base est l'état durable du système. Relationnel ou non, il faut décider d'abord comment les données sont reliées entre elles."
    techs:
      - { tech: sql, essential: true, why: "Le langage commun des bases relationnelles : le comprendre sert avec presque toutes les bases." }
      - { tech: postgresql, essential: true, why: "La base relationnelle polyvalente par défaut : transactions, contraintes, JSON et extensions." }
      - { tech: mysql, why: "Autre grande base relationnelle open source, très présente dans l'écosystème PHP." }
      - { tech: sqlite, why: "Une base dans un simple fichier, sans serveur : parfaite pour le développement, les petits outils et l'embarqué." }
      - { tech: mongodb, why: "Stocke des documents JSON souples quand le schéma bouge souvent ou que les données sont imbriquées." }
      - { tech: dynamodb, why: "Base clé-valeur managée d'AWS, pensée pour monter en charge sans gérer de serveur." }
      - { tech: cassandra, why: "Base distribuée pour de très gros volumes d'écriture, au prix d'un modèle de requêtes contraignant." }
      - { tech: elasticsearch, why: "Moteur de recherche plein texte : ce qu'une base classique fait mal." }
      - { tech: supabase, why: "Une base PostgreSQL avec authentification et API déjà prêtes : raccourcit un premier backend." }
  - step: Accélérer et découpler
    intro: "Quand la base devient le point lent, on garde en mémoire ce qui se relit souvent ; quand une tâche est longue, on la sort de la requête."
    techs:
      - { tech: redis, essential: true, why: "Cache en mémoire, sessions, files et compteurs : l'outil d'accélération le plus courant." }
      - { tech: memcached, why: "Cache mémoire simple, uniquement clé-valeur." }
      - { tech: celery, why: "Exécute des tâches longues en arrière-plan en Python, hors du cycle de la requête." }
      - { tech: rabbitmq, why: "File de messages : un service dépose un travail, un autre le traite plus tard." }
      - { tech: kafka, why: "Journal d'événements durable, pour que plusieurs services lisent le même flux à leur rythme." }
  - step: Authentifier et autoriser
    intro: "Savoir qui appelle et ce qu'il a le droit de faire. Ce domaine est risqué : on évite de le réinventer."
    techs:
      - { tech: keycloak, why: "Serveur d'identité open source auto-hébergé : SSO, rôles et jetons." }
      - { tech: auth0, why: "Le même besoin en service managé : moins à exploiter, mais un fournisseur de plus." }
  - step: Déployer
    intro: "Un backend ne sert à rien tant qu'il ne tourne pas de façon reproductible quelque part."
    techs:
      - { tech: docker, essential: true, why: "Empaquette le service avec ses dépendances : même comportement en local et en production." }
      - { tech: nginx, why: "Serveur web placé devant l'application : reverse proxy, TLS et répartition de charge." }
      - { tech: github-actions, why: "Automatise tests et déploiement à chaque changement de code." }
---
