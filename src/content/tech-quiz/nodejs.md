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
---
