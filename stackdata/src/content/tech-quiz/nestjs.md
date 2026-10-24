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
  - id: decorateur-controller
    prompt: "Dans NestJS, que déclare le décorateur @Controller('users') ?"
    answer: "Une classe de routes dont les chemins commencent par /users"
    decoys:
      - "Une table users créée automatiquement en base"
      - "Un service injectable nommé users, disponible dans tous les modules de l'application"
    why: "@Controller fixe le préfixe des routes de la classe. Les tables relèvent de l'ORM, les services de @Injectable."
  - id: injectable
    prompt: "À quoi sert le décorateur @Injectable() dans NestJS ?"
    answer: "Déclarer une classe comme provider, gérée par le conteneur d'injection"
    decoys:
      - "Protéger une route contre les injections SQL"
      - "Rendre une classe accessible depuis le navigateur"
    why: "Un provider marqué @Injectable() peut être injecté dans les contrôleurs ou d'autres services. Il n'a aucun lien avec les injections SQL."
  - id: decorateur-module
    prompt: "Que décrit le décorateur @Module() dans NestJS ?"
    answer: "Les imports, contrôleurs, providers et exports d'un module"
    decoys:
      - "Le paquet npm à installer pour la fonctionnalité"
      - "Le schéma de la base de données utilisé par le module, avec ses tables et ses relations"
    why: "@Module regroupe une fonctionnalité et déclare ce qu'elle importe et expose. Le schéma de base relève de l'ORM."
  - id: exports-module
    prompt: "Un service déclaré dans le module A doit être injecté dans le module B. Que faut-il faire ?"
    answer: "L'exporter depuis A et importer A dans B"
    decoys:
      - "Rien : tous les providers sont visibles dans toute l'application"
      - "Le déclarer dans un fichier global nest.config.json"
    why: "Les providers sont encapsulés dans leur module : seuls ceux exportés sont visibles des modules qui l'importent."
  - id: injection-constructeur
    prompt: "Comment un contrôleur NestJS reçoit-il habituellement un service ?"
    answer: "Par un paramètre de son constructeur, typé avec la classe du service"
    decoys:
      - "En l'instanciant lui-même avec new dans chaque méthode qui en a besoin"
      - "En le lisant dans une variable globale"
    why: "Le conteneur lit le type du paramètre et fournit l'instance : c'est l'injection par constructeur."
  - id: portee-singleton
    prompt: "Par défaut, combien d'instances d'un provider NestJS sont créées ?"
    answer: "Une seule, partagée par toute l'application"
    decoys:
      - "Une par requête HTTP reçue"
      - "Une par classe qui l'injecte, recréée à chaque appel de méthode"
    why: "La portée par défaut est singleton. Les portées REQUEST et TRANSIENT existent mais doivent être demandées."
  - id: decorateur-param
    prompt: "Dans une méthode décorée par @Get(':id'), comment récupérer la valeur de id ?"
    answer: "Avec le décorateur @Param('id') sur un paramètre"
    decoys:
      - "Avec le décorateur @Body('id') sur un paramètre"
      - "Avec le décorateur @Query('id') sur un paramètre"
    why: "@Param lit les segments du chemin ; @Body lit le corps, @Query la chaîne de requête."
  - id: pipes
    prompt: "Quel est le rôle d'un pipe dans NestJS ?"
    answer: "Transformer ou valider les données d'entrée avant le gestionnaire"
    decoys:
      - "Relier deux microservices par un canal de messages"
      - "Formater la réponse après l'exécution du gestionnaire de route"
    why: "Un pipe (ValidationPipe, ParseIntPipe…) agit sur les arguments. Formater la réponse est le rôle des intercepteurs."
  - id: dto-validation
    prompt: "Comment valide-t-on couramment le corps d'une requête dans NestJS ?"
    answer: "Une classe DTO annotée avec class-validator, et le ValidationPipe"
    decoys:
      - "Un schéma JSON déclaré dans le fichier package.json"
      - "Une vérification automatique par TypeScript au moment où la requête arrive sur le serveur"
    why: "Les types TypeScript disparaissent à l'exécution : la validation se fait par les décorateurs de class-validator, appliqués par le ValidationPipe."
  - id: guards
    prompt: "À quoi sert un guard dans NestJS ?"
    answer: "Décider si une requête peut atteindre le gestionnaire"
    decoys:
      - "Chiffrer les réponses envoyées au client"
      - "Limiter la mémoire consommée par un module, pour protéger le reste de l'application"
    why: "Un guard implémente canActivate : c'est l'endroit naturel pour l'authentification et les rôles."
  - id: intercepteurs
    prompt: "Qu'est-ce qu'un intercepteur dans NestJS ?"
    answer: "Un code exécuté avant et après le gestionnaire"
    decoys:
      - "Un pare-feu réseau intégré au framework"
      - "Un composant qui capture uniquement les exceptions non gérées pour formater l'erreur"
    why: "Un intercepteur enveloppe l'appel : journalisation, transformation de la réponse, cache. Formater les exceptions est le rôle des filtres."
  - id: filtres-exceptions
    prompt: "À quoi sert un filtre d'exceptions (exception filter) dans NestJS ?"
    answer: "Capturer les exceptions et construire la réponse d'erreur"
    decoys:
      - "Filtrer les requêtes venant d'adresses IP bannies"
      - "Retirer les champs sensibles des réponses réussies avant leur envoi"
    why: "Un filtre (@Catch) contrôle la réponse renvoyée quand une exception remonte. Le filtrage d'IP ou de champs relève d'autres mécanismes."
  - id: http-exception
    prompt: "Dans un service NestJS, comment renvoyer une erreur 404 au client ?"
    answer: "Lever une NotFoundException"
    decoys:
      - "Retourner null : NestJS le convertit en 404"
      - "Appeler process.exit(404)"
    why: "Les exceptions HTTP intégrées (NotFoundException, BadRequestException…) sont traduites par le filtre par défaut en réponse au bon statut."
  - id: ordre-cycle
    prompt: "Dans quel ordre une requête traverse-t-elle les mécanismes de NestJS avant d'atteindre le gestionnaire ?"
    answer: "Middlewares, guards, intercepteurs, puis pipes"
    decoys:
      - "Pipes, guards, middlewares, puis intercepteurs"
      - "Guards, middlewares, pipes, puis intercepteurs"
    why: "Les middlewares passent en premier, puis les guards autorisent, les intercepteurs enveloppent et les pipes préparent les arguments."
  - id: cli
    prompt: "Que fournit la CLI Nest (nest new, nest generate) ?"
    answer: "La création d'un projet et la génération de modules, contrôleurs et services"
    decoys:
      - "Le déploiement du back-end sur l'hébergement fourni par l'équipe de NestJS"
      - "Une console d'administration des données"
    why: "La CLI crée le squelette conforme aux conventions. NestJS ne fournit ni hébergement ni back-office."
  - id: bootstrap
    prompt: "Dans main.ts, quelle instruction crée l'application NestJS ?"
    answer: "NestFactory.create(AppModule)"
    decoys:
      - "express() suivi de app.use(AppModule)"
      - "new NestApplication(AppController)"
    why: "NestFactory construit l'application à partir du module racine ; on appelle ensuite listen()."
  - id: tests
    prompt: "Comment tester un service NestJS en remplaçant ses dépendances par des simulacres ?"
    answer: "Avec Test.createTestingModule de @nestjs/testing"
    decoys:
      - "En démarrant toujours toute l'application et une vraie base"
      - "NestJS ne permet pas de remplacer un provider dans un test"
    why: "Le module de test reconstruit le conteneur d'injection, où chaque provider peut être remplacé par un simulacre."
  - id: config-module
    prompt: "Quel module officiel lit les variables d'environnement et le fichier .env dans NestJS ?"
    answer: "ConfigModule, de @nestjs/config"
    decoys:
      - "EnvModule, intégré au cœur de @nestjs/core"
      - "DotenvGuard"
    why: "@nestjs/config charge la configuration et l'expose par un ConfigService injectable."
  - id: swagger
    prompt: "Comment obtenir une documentation OpenAPI d'une API NestJS ?"
    answer: "Avec le module @nestjs/swagger"
    decoys:
      - "Elle est générée par TypeScript à la compilation"
      - "Avec le module @nestjs/graphql"
    why: "@nestjs/swagger construit la spécification OpenAPI depuis les contrôleurs et les DTO. Le module GraphQL produit un schéma GraphQL."
  - id: microservices-transport
    prompt: "Dans le module microservices de NestJS, que peut-on changer sans réécrire les gestionnaires de messages ?"
    answer: "Le transport (TCP, Kafka, RabbitMQ, gRPC…)"
    decoys:
      - "Le langage d'écriture, de TypeScript à Go"
      - "Le moteur JavaScript, de V8 à la JVM"
    why: "Le module abstrait le transport : les gestionnaires @MessagePattern restent les mêmes. Le langage et le moteur, eux, ne changent pas."
---
