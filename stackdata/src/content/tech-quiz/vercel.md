---
questions:
  - id: role
    prompt: "Qu'est-ce que Vercel ?"
    answer: "Un hébergement pour applications front et full-stack JavaScript"
    decoys:
      - "Un cloud généraliste de machines virtuelles, comme EC2"
      - "Une base de données serverless"
    why: "Vercel automatise build, CDN, certificats et environnements de test des applications front."
  - id: push
    prompt: "Que déclenche un push Git sur un projet relié à Vercel ?"
    answer: "Un build et un déploiement"
    decoys:
      - "Rien, sans configuration manuelle"
      - "Une revue de code automatique"
    why: "Chaque push est construit et déployé."
  - id: preversion
    prompt: "Qu'obtient chaque branche sur Vercel ?"
    answer: "Sa propre URL de préversion"
    decoys:
      - "Son propre cluster"
      - "Sa propre base de données"
    why: "On fait valider chaque changement sur une URL dédiée avant la fusion."
  - id: serverless
    prompt: "Où s'exécute le code serveur (rendu, routes d'API) sur Vercel ?"
    answer: "Dans des fonctions serverless"
    decoys:
      - "Sur un serveur dédié toujours allumé"
      - "Dans le navigateur du visiteur"
    why: "Les pages sont servies depuis un réseau mondial ; le code serveur s'exécute en fonctions serverless."
  - id: longue-duree
    prompt: "Workers, serveurs WebSocket, tâches planifiées lourdes : Vercel est-il adapté ?"
    answer: "Non : les fonctions serverless ont des durées d'exécution limitées"
    decoys:
      - "Oui : c'est son usage principal"
      - "Oui, grâce aux préversions par branche qui restent allumées en continu"
    why: "Les processus de longue durée demandent un PaaS généraliste ou un cloud."
  - id: nextjs
    prompt: "Quel lien Vercel a-t-il avec Next.js ?"
    answer: "Vercel édite Next.js"
    decoys:
      - "Vercel est un fork de Next.js"
      - "Aucun lien"
    why: "L'intégration avec Next.js est la plus poussée, mais d'autres frameworks front sont pris en charge."
  - id: ancien-nom
    prompt: "Quel était l'ancien nom de Vercel ?"
    answer: "ZEIT"
    decoys:
      - "Heroku"
      - "Netlify"
    why: "Heroku et Netlify sont d'autres plateformes d'hébergement."
  - id: cdn
    prompt: "Comment les pages sont-elles servies par Vercel ?"
    answer: "Depuis un réseau mondial (CDN)"
    decoys:
      - "Depuis un seul serveur, dans une seule région"
      - "Depuis le poste du développeur"
    why: "Un CDN rapproche les pages des visiteurs."
  - id: autre-langage
    prompt: "Back-end principal en Java, avec une base à côté : Vercel convient-il ?"
    answer: "Mal : un PaaS généraliste ou un cloud est plus adapté"
    decoys:
      - "Très bien : Vercel est optimisé pour les applications Java"
      - "Très bien : Vercel héberge aussi la base"
    why: "Vercel vise les applications front et full-stack JavaScript ; Heroku exécute des serveurs en continu, dans de nombreux langages."
  - id: couts
    prompt: "Fort trafic avec un budget serré : quel point surveiller sur Vercel ?"
    answer: "La facturation à l'usage, qui peut monter vite"
    decoys:
      - "La limite de deux branches de préversion par projet"
      - "Les certificats HTTPS, payants"
    why: "La fiche le range dans « Quand l'éviter » : à surveiller."
  - id: branche-production
    prompt: "Sur Vercel, quel déploiement sert le domaine de production ?"
    answer: "Celui de la branche de production, souvent main"
    decoys:
      - "Le dernier déploiement, quelle que soit sa branche"
      - "Celui qu'on copie à la main sur un serveur FTP"
    why: "Les pushs sur la branche de production mettent à jour le domaine principal ; les autres branches produisent des préversions. Aucun transfert manuel n'est nécessaire."
  - id: retour-arriere
    prompt: "Comment revenir rapidement à la version précédente d'un site sur Vercel ?"
    answer: "Remettre en production un déploiement antérieur, déjà construit"
    decoys:
      - "Restaurer une sauvegarde du serveur, puis relancer tout le build"
      - "Supprimer le dépôt Git, puis le recréer depuis une copie locale"
    why: "Chaque déploiement est conservé tel quel : on peut repointer la production vers l'un d'eux sans reconstruire. Il n'y a pas de serveur à restaurer."
  - id: cli-deploy
    prompt: "Quelle commande de la CLI Vercel déploie le projet du dossier courant ?"
    answer: "vercel deploy"
    decoys:
      - "vercel push"
      - "vercel launch"
    why: "vercel deploy (ou simplement vercel) envoie et déploie le projet. Les autres commandes n'existent pas dans la CLI."
  - id: environnements
    prompt: "Comment Vercel organise-t-il les variables d'environnement d'un projet ?"
    answer: "Par environnement : production, préversion et développement"
    decoys:
      - "Une seule valeur, commune à tous les déploiements du projet"
      - "Uniquement dans un fichier .env versionné dans le dépôt"
    why: "Chaque variable peut prendre une valeur différente selon l'environnement, ce qui évite qu'une préversion écrive dans la base de production. Versionner ses secrets dans le dépôt est à éviter."
  - id: env-pull
    prompt: "Quelle commande récupère en local les variables d'environnement d'un projet Vercel ?"
    answer: "vercel env pull"
    decoys:
      - "vercel env push"
      - "vercel secrets sync"
    why: "vercel env pull écrit les variables du projet dans un fichier local (.env.local par défaut). Les deux autres commandes n'existent pas."
  - id: isr
    prompt: "Qu'est-ce que l'ISR (Incremental Static Regeneration), prise en charge par Vercel ?"
    answer: "Régénérer une page statique en arrière-plan après sa mise en ligne, sans tout reconstruire"
    decoys:
      - "Reconstruire l'ensemble du site à chaque visite d'un utilisateur, pour rester à jour"
      - "Rendre chaque page uniquement dans le navigateur du visiteur, sans HTML côté serveur"
    why: "L'ISR garde les avantages du statique (servi depuis le CDN) tout en rafraîchissant les pages périodiquement ou à la demande. Ce n'est ni un build par visite ni du rendu côté client."
  - id: autres-frameworks
    prompt: "Lequel de ces frameworks Vercel prend-il en charge, en plus de Next.js ?"
    answer: "SvelteKit"
    decoys:
      - "Spring Boot"
      - "ASP.NET Core"
    why: "Vercel déploie de nombreux frameworks front JavaScript, dont SvelteKit, Nuxt ou Astro. Spring Boot (Java) et ASP.NET Core (.NET) sont des serveurs à faire tourner en continu ailleurs."
  - id: detection-framework
    prompt: "Que fait Vercel quand on importe un dépôt Next.js ou SvelteKit ?"
    answer: "Il détecte le framework et applique les réglages de build adaptés"
    decoys:
      - "Il exige un Dockerfile écrit à la main avant le premier build"
      - "Il demande de choisir une taille de serveur et un système d'exploitation"
    why: "La détection automatique fixe commande de build et dossier de sortie : le premier déploiement ne demande presque aucune configuration. Pas de Dockerfile ni de serveur à dimensionner."
  - id: domaine-perso
    prompt: "Comment servir une application Vercel sur son propre nom de domaine ?"
    answer: "Ajouter le domaine au projet et régler le DNS ; le certificat HTTPS est géré automatiquement"
    decoys:
      - "Louer une adresse IP fixe chez Vercel et installer soi-même le certificat HTTPS sur le serveur"
      - "Acheter un certificat SSL et le téléverser dans Vercel à chaque renouvellement annuel"
    why: "Vercel émet et renouvelle les certificats des domaines ajoutés au projet. Il n'y a ni serveur à configurer ni certificat à gérer à la main."
  - id: pull-request
    prompt: "Quand on ouvre une pull request sur GitHub, que fait l'intégration Vercel ?"
    answer: "Elle déploie une préversion et indique son URL dans la pull request"
    decoys:
      - "Elle fusionne la pull request dès que le build réussit"
      - "Elle déploie directement la branche sur le domaine de production"
    why: "Les relecteurs testent le changement sur sa préversion, liée depuis la pull request. La fusion reste une décision humaine, et la production n'est mise à jour que par sa branche."
  - id: vercel-json
    prompt: "Quel fichier du dépôt configure un projet Vercel (redirections, en-têtes, réécritures…) ?"
    answer: "vercel.json"
    decoys:
      - "netlify.toml"
      - "Procfile"
    why: "vercel.json, à la racine, règle redirections, en-têtes et options de build. netlify.toml configure Netlify, le Procfile déclare les processus d'une application Heroku."
  - id: dossier-api
    prompt: "Sans framework, où place-t-on les fonctions serverless d'un projet Vercel ?"
    answer: "Dans le dossier api/ à la racine du projet"
    decoys:
      - "Dans le dossier public/ à la racine du projet"
      - "Dans le dossier node_modules/ du projet"
    why: "Chaque fichier de api/ devient une fonction servie sous /api. public/ contient des fichiers statiques servis tels quels, et node_modules/ les dépendances."
  - id: base-de-donnees
    prompt: "Une application hébergée sur Vercel a besoin d'une base de données. Comment fait-on en général ?"
    answer: "On la branche sur une base managée externe, reliée au projet"
    decoys:
      - "On installe PostgreSQL à l'intérieur d'une fonction serverless"
      - "On écrit les données dans les fichiers du déploiement lui-même"
    why: "Les fonctions serverless sont éphémères : la base vit ailleurs, chez un fournisseur managé, et le projet s'y connecte. Un déploiement n'est pas un stockage modifiable."
  - id: fichiers-persistants
    prompt: "Une fonction serverless Vercel peut-elle conserver des fichiers écrits sur disque d'un appel à l'autre ?"
    answer: "Non : il faut un stockage externe, comme un stockage d'objets"
    decoys:
      - "Oui : le disque du déploiement est persistant et partagé"
      - "Oui, à condition d'écrire dans le dossier public/ du projet"
    why: "Chaque instance de fonction est éphémère et ne partage pas son disque. Les fichiers envoyés par les utilisateurs vont dans un stockage d'objets ou une base."
  - id: auto-hebergement-nextjs
    prompt: "Une application Next.js doit-elle obligatoirement être hébergée sur Vercel ?"
    answer: "Non : Next.js est open source et s'héberge ailleurs, par exemple avec Node.js ou Docker"
    decoys:
      - "Oui : Next.js ne fonctionne que sur l'infrastructure mondiale et le CDN de Vercel"
      - "Oui, sauf à acheter une licence commerciale Next.js pour l'hébergement externe"
    why: "Vercel édite Next.js sous licence MIT ; on peut le lancer sur n'importe quel serveur Node.js ou dans un conteneur. Vercel offre seulement l'intégration la plus poussée."
  - id: turborepo
    prompt: "Quel outil de monorepo JavaScript Vercel édite-t-il aussi ?"
    answer: "Turborepo"
    decoys:
      - "Nx"
      - "Lerna"
    why: "Vercel a racheté puis développe Turborepo, un outil de build pour monorepos. Nx est édité par Nrwl, qui a aussi repris la maintenance de Lerna."
  - id: v0
    prompt: "Qu'est-ce que v0, chez Vercel ?"
    answer: "Un outil qui génère des interfaces et du code à partir d'une description en langage naturel"
    decoys:
      - "La toute première version de Next.js, publiée à l'époque où l'entreprise s'appelait ZEIT"
      - "Le nom interne du réseau mondial de distribution (CDN) qui sert les pages de Vercel"
    why: "v0 est l'outil de génération par IA de Vercel : on décrit une interface, il produit le code. Ce n'est ni une version de Next.js ni le nom du CDN."
  - id: page-statique
    prompt: "Comment Vercel sert-il une page générée statiquement au moment du build ?"
    answer: "Directement depuis le CDN, sans exécuter de fonction à chaque requête"
    decoys:
      - "En relançant le build de la page à chaque visite d'un utilisateur"
      - "Par une fonction serverless qui la recalcule à chaque requête reçue"
    why: "Une page statique est un fichier déjà prêt, mis en cache au plus près des visiteurs. Les fonctions serverless ne servent qu'au rendu dynamique et aux routes d'API."
  - id: commentaires-preversion
    prompt: "Sur une préversion Vercel, comment les relecteurs peuvent-ils annoter directement la page ?"
    answer: "Avec les commentaires de Vercel, posés sur la page de préversion"
    decoys:
      - "En modifiant le code source dans un éditeur intégré à la page"
      - "En ouvrant un ticket chez le support de Vercel pour chaque remarque"
    why: "La barre d'outils des préversions permet de laisser des commentaires à l'endroit précis de la page. On ne modifie pas le code depuis la préversion, et le support n'est pas un outil de relecture."
  - id: ai-sdk
    prompt: "Quelle bibliothèque TypeScript Vercel édite-t-il pour intégrer des modèles de langage dans une application ?"
    answer: "L'AI SDK"
    decoys:
      - "LangChain"
      - "TensorFlow.js"
    why: "L'AI SDK de Vercel unifie l'appel à différents fournisseurs de modèles et le streaming des réponses. LangChain est un projet indépendant, TensorFlow.js vient de Google."
---
