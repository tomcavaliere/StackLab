---
questions:
  - id: architecture
    prompt: "Quelle architecture NestJS impose-t-il ?"
    answer: "Des modules, des contrôleurs et des services fournis par injection de dépendances"
    decoys:
      - "Un seul fichier de routes, sans structure imposée"
      - "Des composants d'interface rendus côté serveur, comme avec Next.js"
    why: "C'est la réponse au principal défaut d'Express : chaque projet invente sa structure."
  - id: inspiration
    prompt: "De quel framework NestJS s'inspire-t-il ?"
    answer: "Angular"
    decoys:
      - "React"
      - "Ruby on Rails"
    why: "Modules, décorateurs et injection de dépendances viennent du modèle d'Angular."
  - id: serveur-http
    prompt: "Sur quel serveur HTTP NestJS s'appuie-t-il par défaut ?"
    answer: "Express (Fastify est l'autre option intégrée)"
    decoys:
      - "Nginx"
      - "Son propre serveur, incompatible avec Express"
    why: "NestJS ne remplace pas le serveur HTTP : il structure l'application au-dessus."
  - id: decorateurs
    prompt: "Comment décrit-on routes et injections dans NestJS ?"
    answer: "Avec des décorateurs TypeScript"
    decoys:
      - "Avec des fichiers de configuration XML"
      - "Avec des annotations Java"
    why: "NestJS est écrit pour TypeScript. Les annotations Java, c'est le monde de Spring Boot."
  - id: orm
    prompt: "Quel ORM NestJS impose-t-il ?"
    answer: "Aucun : TypeORM, Prisma ou un autre, au choix"
    decoys:
      - "Eloquent, l'ORM repris de Laravel"
      - "Active Record, intégré au framework"
    why: "L'ORM reste à choisir. Eloquent appartient à Laravel, Active Record à Rails."
  - id: modules-officiels
    prompt: "Que couvrent les modules officiels de NestJS ?"
    answer: "Validation, configuration, GraphQL, WebSockets, microservices"
    decoys:
      - "Le rendu d'applications mobiles natives pour iOS et Android"
      - "Un entrepôt de données intégré"
    why: "Les modules microservices proposent des transports Kafka, RabbitMQ, gRPC…"
  - id: petite-api
    prompt: "Une petite API de quelques routes : NestJS est-il adapté ?"
    answer: "Peu : la structure imposée ajoute beaucoup de fichiers et d'abstraction pour peu de routes"
    decoys:
      - "Très : c'est le framework Node.js le plus léger, avec très peu de fichiers à créer"
      - "Pas du tout : NestJS exige au moins dix modules"
    why: "La structure se rentabilise sur un back-end qui grossit, pas sur cinq routes."
  - id: calcul
    prompt: "Calcul intensif dans les requêtes d'une application NestJS : que se passe-t-il ?"
    answer: "Comme tout serveur Node.js, il bloque la boucle d'événements"
    decoys:
      - "NestJS répartit automatiquement le calcul sur plusieurs threads"
      - "Rien, grâce à l'injection de dépendances"
    why: "NestJS reste du Node.js : l'architecture ne change pas le modèle d'exécution."
  - id: profil
    prompt: "Quelle équipe se sent vite à l'aise avec NestJS ?"
    answer: "Une équipe venue d'Angular, de Spring ou de .NET, habituée à l'injection de dépendances"
    decoys:
      - "Une équipe data qui pratique surtout Python, SQL et les notebooks"
      - "Une équipe qui ne connaît que PHP et veut retrouver les conventions de Laravel à l'identique"
    why: "Ce sont les mêmes concepts : modules, services, injection."
  - id: createur
    prompt: "Qui a créé NestJS ?"
    answer: "Kamil Myśliwiec, en 2017"
    decoys:
      - "Google, en même temps qu'Angular"
      - "Vercel, en même temps que Next.js"
    why: "NestJS s'inspire d'Angular, mais n'est pas un projet de Google."
---
