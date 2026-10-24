---
questions:
  - id: v8
    prompt: "Sur quel moteur Node.js est-il bâti ?"
    answer: "V8, le moteur JavaScript de Chrome"
    decoys:
      - "La JVM"
      - "SpiderMonkey, le moteur de Firefox"
    why: "Ryan Dahl a construit Node.js autour de V8 et d'une boucle d'événements."
  - id: boucle-evenements
    prompt: "Comment Node.js traite-t-il de nombreuses requêtes ?"
    answer: "Autour d'une boucle d'événements, avec des entrées-sorties non bloquantes"
    decoys:
      - "Avec un thread système par requête"
      - "Avec un processus par requête, comme en CGI, créé puis détruit à chaque appel"
    why: "Pendant qu'une requête attend la base, le même processus en traite d'autres."
  - id: calcul-intensif
    prompt: "Que se passe-t-il si une requête fait un calcul intensif ?"
    answer: "Elle bloque la boucle d'événements, donc toutes les autres requêtes du processus"
    decoys:
      - "Node.js la répartit automatiquement sur tous les cœurs de la machine, sans rien bloquer"
      - "Rien : chaque requête a son propre thread"
    why: "Le JavaScript s'exécute sur un thread principal : un calcul long fige tout le processus."
  - id: remede
    prompt: "Comment traiter un calcul lourd avec Node.js ?"
    answer: "Avec des worker threads, ou dans un autre langage"
    decoys:
      - "En ajoutant async devant la fonction de calcul"
      - "En augmentant la taille du tas mémoire"
    why: "async ne rend pas un calcul non bloquant : il faut le sortir du thread principal."
  - id: npm
    prompt: "Qu'est-ce que npm ?"
    answer: "Le registre de paquets JavaScript"
    decoys:
      - "Le moteur d'exécution de Node.js"
      - "Un framework web"
    why: "Node.js a apporté npm, le registre de paquets de tout l'écosystème JavaScript."
  - id: dependances
    prompt: "Quel risque l'écosystème npm présente-t-il ?"
    answer: "Beaucoup de petites dépendances : une surface d'attaque et une maintenance à surveiller"
    decoys:
      - "Trop peu de paquets disponibles pour les besoins courants, qu'il faut donc écrire soi-même"
      - "Des paquets tous payants"
    why: "Chaque dépendance, et chaque dépendance de dépendance, est du code à mettre à jour et à surveiller."
  - id: frameworks
    prompt: "Écrit-on souvent un serveur Node.js sans framework ?"
    answer: "Rarement : on utilise Express, Fastify, NestJS ou Next.js"
    decoys:
      - "Toujours : les frameworks sont déconseillés"
      - "Jamais : Node.js ne sait pas écouter un port sans framework"
    why: "Node.js sait écouter un port, mais son module HTTP est bas niveau : un framework se place au-dessus."
  - id: bon-usage
    prompt: "Quel back-end convient bien à Node.js ?"
    answer: "Une API dominée par les entrées-sorties : bases, autres services, temps réel"
    decoys:
      - "Un service de calcul numérique intensif"
      - "Un traitement batch de plusieurs téraoctets, réparti sur un cluster"
    why: "Les entrées-sorties non bloquantes brillent quand on attend beaucoup et calcule peu."
  - id: createur
    prompt: "Qui a créé Node.js ?"
    answer: "Ryan Dahl, en 2009"
    decoys:
      - "Brendan Eich, en 1995"
      - "Guido van Rossum, en 1991"
    why: "Brendan Eich a créé JavaScript, Guido van Rossum Python."
  - id: partage
    prompt: "Quel avantage Node.js offre-t-il à une équipe TypeScript ?"
    answer: "Partager le langage, l'outillage et les types entre front et back"
    decoys:
      - "Se passer de navigateur"
      - "Compiler le back-end en binaire natif, comme en Go"
    why: "Un seul langage du front au back : les types d'une API peuvent être partagés."
  - id: libuv
    prompt: "Quelle bibliothèque fournit à Node.js sa boucle d'événements et ses entrées-sorties asynchrones ?"
    answer: "libuv"
    decoys:
      - "V8"
      - "OpenSSL"
      - "npm"
    why: "V8 exécute le JavaScript ; libuv gère la boucle d'événements, les entrées-sorties et un pool de threads. OpenSSL fournit la cryptographie."
  - id: pool-threads
    prompt: "Node.js exécute le JavaScript sur un seul thread. Comment certaines opérations du système de fichiers restent-elles non bloquantes ?"
    answer: "libuv les confie à un pool de threads en arrière-plan"
    decoys:
      - "V8 les compile en code natif, qui s'exécute instantanément sans attendre le disque"
      - "Le système d'exploitation les met en cache dès le démarrage"
    why: "Le pool de threads de libuv prend en charge le système de fichiers, une partie de la cryptographie ou la compression, puis rend la main à la boucle."
  - id: esm-commonjs
    prompt: "Comment indiquer à Node.js qu'un projet utilise les modules ES (import/export) plutôt que CommonJS (require) ?"
    answer: "Avec \"type\": \"module\" dans package.json, ou l'extension .mjs"
    decoys:
      - "Avec l'option --es6 passée à chaque lancement de node"
      - "Impossible : Node.js ne comprend que require, il faut un bundler"
    why: "Node.js prend en charge les deux systèmes : le champ type de package.json ou l'extension (.mjs, .cjs) choisit lequel s'applique."
  - id: package-json
    prompt: "Quel est le rôle du fichier package.json dans un projet Node.js ?"
    answer: "Décrire le projet, ses dépendances et ses scripts"
    decoys:
      - "Stocker le code compilé des dépendances, prêt à être exécuté"
      - "Configurer le moteur V8"
    why: "package.json déclare nom, dépendances et scripts (npm run …). Le code des dépendances est dans node_modules."
  - id: package-lock
    prompt: "À quoi sert package-lock.json ?"
    answer: "Figer les versions exactes de tout l'arbre de dépendances"
    decoys:
      - "Empêcher toute installation de nouveau paquet dans le projet"
      - "Chiffrer les paquets installés pour qu'ils ne soient pas modifiés"
    why: "Le fichier de verrouillage garantit que chaque installation reproduit le même arbre, dépendances indirectes comprises."
  - id: npm-ci
    prompt: "Quelle différence entre npm ci et npm install ?"
    answer: "npm ci installe exactement le fichier de verrouillage, sans le modifier"
    decoys:
      - "npm ci installe les dernières versions disponibles, sans tenir compte du verrouillage"
      - "npm ci ne fonctionne que sur GitHub Actions"
    why: "npm ci repart de zéro et échoue si package.json et le fichier de verrouillage divergent : c'est la commande des installations reproductibles (CI)."
  - id: caret
    prompt: "Dans package.json, que signifie la contrainte de version \"^1.2.3\" ?"
    answer: "Toute version 1.x.x à partir de 1.2.3, sans passer à 2.0.0"
    decoys:
      - "Exactement la version 1.2.3, et aucune autre"
      - "Toute version supérieure ou égale à 1.2.3, y compris les majeures"
    why: "Le ^ accepte les mises à jour mineures et correctives, supposées compatibles selon le versionnage sémantique, mais pas une nouvelle majeure."
  - id: npx
    prompt: "À quoi sert npx ?"
    answer: "Exécuter l'outil en ligne de commande d'un paquet, sans installation globale"
    decoys:
      - "Publier un paquet sur le registre npm"
      - "Mettre à jour la version de Node.js installée sur la machine"
    why: "npx lance le binaire d'un paquet local ou le télécharge temporairement. La publication se fait avec npm publish."
  - id: lts
    prompt: "Quelles versions de Node.js deviennent LTS (support à long terme) ?"
    answer: "Les versions majeures paires"
    decoys:
      - "Les versions majeures impaires"
      - "Toutes les versions majeures, dès leur sortie"
    why: "Les majeures paires (20, 22, 24…) passent en LTS ; les impaires ont un support court. La production vise une LTS."
  - id: streams
    prompt: "Pourquoi utiliser un stream pour traiter un très gros fichier dans Node.js ?"
    answer: "Pour le traiter morceau par morceau, sans tout charger en mémoire"
    decoys:
      - "Pour le traiter sur tous les cœurs à la fois, en parallèle"
      - "Pour le compresser automatiquement sur le disque"
    why: "Un stream lit et écrit par morceaux : la mémoire reste bornée quelle que soit la taille du fichier. Il ne parallélise rien."
  - id: event-emitter
    prompt: "Quel motif l'EventEmitter de Node.js implémente-t-il ?"
    answer: "Des écouteurs abonnés avec on() et déclenchés par emit()"
    decoys:
      - "Une file de messages persistante entre plusieurs serveurs"
      - "Un ordonnanceur de tâches périodiques, comme cron"
    why: "EventEmitter est un mécanisme en mémoire, dans le processus. Beaucoup d'objets du cœur (streams, serveurs) en héritent."
  - id: cluster
    prompt: "Comment un serveur Node.js peut-il utiliser plusieurs cœurs pour servir des requêtes ?"
    answer: "En lançant plusieurs processus (module cluster ou gestionnaire comme PM2)"
    decoys:
      - "En activant l'option async sur le serveur HTTP"
      - "Automatiquement : V8 répartit le JavaScript sur tous les cœurs"
    why: "Un processus n'exécute le JavaScript que sur un thread : plusieurs processus partagent le port pour exploiter les cœurs."
  - id: next-tick
    prompt: "Quand s'exécute un rappel passé à process.nextTick() ?"
    answer: "Juste après l'opération en cours, avant que la boucle d'événements continue"
    decoys:
      - "Au prochain tour d'horloge système, une seconde plus tard"
      - "Dans un thread séparé, en parallèle du code en cours"
    why: "process.nextTick place le rappel dans une file traitée dès que l'opération en cours se termine. Il ne crée aucun thread."
  - id: rejet-non-gere
    prompt: "Dans les versions récentes de Node.js, que se passe-t-il par défaut quand une promesse rejetée n'est jamais gérée ?"
    answer: "Le processus s'arrête avec une erreur"
    decoys:
      - "Un simple avertissement s'affiche et le processus continue sans conséquence"
      - "La promesse est relancée automatiquement"
    why: "Depuis Node.js 15, un rejet non géré arrête le processus par défaut. Il faut un catch ou un gestionnaire unhandledRejection."
  - id: window
    prompt: "Quel élément, présent dans le navigateur, n'existe pas dans Node.js ?"
    answer: "Le DOM (window, document)"
    decoys:
      - "Les promesses et async/await"
      - "L'objet JSON et ses méthodes parse et stringify"
    why: "Node.js exécute le langage JavaScript, pas l'environnement du navigateur : pas de page, donc pas de DOM. Promesses et JSON font partie du langage."
  - id: fetch-natif
    prompt: "Faut-il un paquet npm pour faire une requête HTTP avec fetch() dans un Node.js récent ?"
    answer: "Non : fetch est disponible globalement depuis Node.js 18"
    decoys:
      - "Oui : fetch n'existe que dans le navigateur, il faut le paquet node-fetch"
      - "Oui : il faut installer axios, seul client HTTP compatible"
    why: "fetch est intégré depuis Node.js 18. node-fetch et axios restent utilisables mais ne sont plus nécessaires pour ce besoin."
  - id: deno-bun
    prompt: "Quels environnements d'exécution JavaScript côté serveur sont des alternatives à Node.js ?"
    answer: "Deno et Bun"
    decoys:
      - "V8 et SpiderMonkey"
      - "Express et Fastify"
      - "Webpack et Vite"
    why: "Deno (lancé par Ryan Dahl, créateur de Node.js) et Bun sont des runtimes. V8 et SpiderMonkey sont des moteurs, Express et Fastify des frameworks, Webpack et Vite des outils de build."
  - id: node-modules
    prompt: "Où npm installe-t-il les dépendances d'un projet ?"
    answer: "Dans le dossier node_modules du projet"
    decoys:
      - "Dans un dossier système partagé par tous les projets de la machine"
      - "Dans package.json, sous forme de code embarqué"
    why: "Chaque projet a son propre node_modules, ce qui permet des versions différentes d'un projet à l'autre. Il ne se versionne pas dans git."
  - id: test-runner
    prompt: "Node.js intègre-t-il un lanceur de tests ?"
    answer: "Oui : le module node:test, lancé par node --test"
    decoys:
      - "Non : il faut obligatoirement installer Jest ou Mocha pour écrire le moindre test"
      - "Oui : le module node:jest, une copie de Jest intégrée au cœur"
    why: "node:test fait partie de Node.js depuis la version 18. Jest, Mocha ou Vitest restent des choix courants, mais ne sont pas obligatoires."
  - id: async-await
    prompt: "Que fait await devant un appel à la base dans une route Node.js ?"
    answer: "Suspend cette fonction jusqu'au résultat, sans bloquer le processus"
    decoys:
      - "Bloque tout le processus jusqu'à la réponse de la base"
      - "Lance la requête dans un nouveau thread système dédié"
    why: "await rend la main à la boucle d'événements : d'autres requêtes sont traitées pendant l'attente. Aucun thread n'est créé."
---
