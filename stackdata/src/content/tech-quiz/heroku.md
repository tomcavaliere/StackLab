---
questions:
  - id: paas
    prompt: "Quel modèle Heroku a-t-il popularisé ?"
    answer: "Le PaaS : on pousse son code, la plateforme le construit et l'exécute"
    decoys:
      - "L'IaaS : on loue des machines virtuelles à configurer soi-même"
      - "Le SaaS : on loue un logiciel fini à ses utilisateurs"
    why: "Avec un PaaS, pas de serveurs à gérer : on fournit le code, Heroku s'occupe du reste."
  - id: git-push
    prompt: "Comment déploie-t-on classiquement sur Heroku ?"
    answer: "Avec un git push"
    decoys:
      - "En envoyant une archive ZIP par FTP"
      - "En configurant un cluster Kubernetes"
    why: "Un git push suffit : c'est ce qui a fait le succès d'Heroku."
  - id: buildpacks
    prompt: "Que font les buildpacks ?"
    answer: "Ils détectent le langage et construisent l'application"
    decoys:
      - "Ils sauvegardent la base de données chaque nuit"
      - "Ils répartissent le trafic entre plusieurs régions"
    why: "Le buildpack reconnaît une application Rails, Django ou Node.js et la prépare pour l'exécution."
  - id: dynos
    prompt: "Comment s'appellent les conteneurs qui exécutent l'application sur Heroku ?"
    answer: "Des dynos"
    decoys:
      - "Des pods"
      - "Des runners"
    why: "Les dynos sont les conteneurs d'Heroku ; on en ajoute d'un clic. Les pods sont ceux de Kubernetes, les runners ceux de GitHub Actions."
  - id: add-ons
    prompt: "Que fournissent les add-ons d'Heroku ?"
    answer: "Des services courants tout configurés : Postgres, Redis, e-mails, journaux"
    decoys:
      - "Des extensions du langage de programmation, installées dans chaque dyno au démarrage"
      - "Des thèmes graphiques pour l'application"
    why: "Une base ou un cache s'ajoutent en un clic, déjà branchés à l'application."
  - id: offres-gratuites
    prompt: "Qu'est-il arrivé aux offres gratuites d'Heroku ?"
    answer: "Elles ont été supprimées fin 2022"
    decoys:
      - "Elles ont été étendues à toutes les bases de données"
      - "Elles n'ont jamais existé"
    why: "Heroku a longtemps proposé des offres gratuites, supprimées fin 2022."
  - id: croissance
    prompt: "Forte croissance et gros volumes : quel problème pose Heroku ?"
    answer: "Le coût par ressource devient élevé comparé à un cloud ou à une infrastructure gérée soi-même"
    decoys:
      - "Heroku ne permet pas d'ajouter des instances au-delà d'un seul dyno par application"
      - "Heroku ne prend en charge qu'un seul langage"
    why: "On paie la simplicité : à gros volume, la facture d'un PaaS dépasse celle d'un cloud configuré soi-même."
  - id: nextjs
    prompt: "Une application Next.js seule : Heroku est-il le plus adapté ?"
    answer: "Non : Vercel ou un hébergement statique conviennent mieux"
    decoys:
      - "Oui : Heroku est le seul hébergeur compatible avec Next.js"
      - "Non : Heroku impose de réécrire l'application en Rails"
    why: "Vercel édite Next.js et l'héberge sans configuration. Heroku vise des serveurs qui tournent en continu, dans de nombreux langages."
  - id: proprietaire
    prompt: "Qui possède Heroku ?"
    answer: "Salesforce, depuis 2010"
    decoys:
      - "Amazon"
      - "Okta"
    why: "Salesforce a racheté Heroku en 2010. Okta possède Auth0."
  - id: cible
    prompt: "Pour quelle équipe Heroku est-il fait ?"
    answer: "Une petite équipe sans compétences ops, avec une app web classique et une base relationnelle"
    decoys:
      - "Une équipe plateforme qui veut un contrôle fin du réseau, du matériel et du système d'exploitation"
      - "Une équipe data qui traite des téraoctets chaque nuit"
    why: "Heroku permet de se concentrer sur le produit. Contrôle fin et gros volumes data sortent de son terrain."
  - id: procfile
    prompt: "À quoi sert le Procfile d'une application Heroku ?"
    answer: "À déclarer les types de processus et leur commande : web, worker…"
    decoys:
      - "À lister les dépendances du langage et leurs versions exactes"
      - "À décrire le réseau et les règles de pare-feu de l'application"
    why: "Le Procfile indique quelle commande lance chaque type de processus. Les dépendances restent dans le fichier du langage (requirements.txt, package.json…)."
  - id: port
    prompt: "Sur quel port un processus web doit-il écouter sur Heroku ?"
    answer: "Celui donné par la variable d'environnement PORT"
    decoys:
      - "Toujours le port 80, réservé au trafic HTTP"
      - "Celui qu'on choisit dans le Procfile, déclaré une fois pour toutes"
    why: "Heroku attribue le port au démarrage du dyno via $PORT ; le routeur y envoie le trafic. Un port codé en dur fait échouer le démarrage."
  - id: config-vars
    prompt: "Où ranger les secrets et la configuration d'une application Heroku ?"
    answer: "Dans les config vars, exposées comme variables d'environnement"
    decoys:
      - "Dans un fichier config.json versionné dans le dépôt Git, avec le reste du code"
      - "Dans le Procfile"
    why: "Les config vars (heroku config:set) séparent la configuration du code, comme le recommande la méthode des douze facteurs."
  - id: douze-facteurs
    prompt: "Quelle méthodologie de conception d'applications est née chez Heroku ?"
    answer: "The Twelve-Factor App"
    decoys:
      - "Le manifeste agile"
      - "Le Domain-Driven Design"
    why: "Les douze facteurs ont été rédigés par Adam Wiggins, cofondateur d'Heroku : configuration dans l'environnement, processus sans état, journaux en flux…"
  - id: systeme-fichiers
    prompt: "Une application Heroku enregistre les fichiers envoyés par les utilisateurs sur le disque local. Que se passe-t-il ?"
    answer: "Ils disparaissent au redémarrage du dyno : il faut un stockage objet comme S3"
    decoys:
      - "Ils sont copiés automatiquement sur tous les autres dynos de l'application, en continu"
      - "Rien : le disque des dynos est permanent et sauvegardé chaque nuit"
    why: "Le système de fichiers d'un dyno est éphémère et propre à chaque dyno. Les fichiers durables vont dans un stockage externe."
  - id: redemarrage-quotidien
    prompt: "Pourquoi une application Heroku doit-elle supporter des redémarrages fréquents ?"
    answer: "Les dynos sont redémarrés automatiquement, environ une fois par jour"
    decoys:
      - "Chaque requête HTTP lance un nouveau dyno, qui s'arrête aussitôt la réponse envoyée"
      - "Heroku redémarre l'application à chaque modification d'un add-on"
    why: "Heroku recycle les dynos régulièrement : un état gardé en mémoire ou sur disque ne survit pas."
  - id: release-phase
    prompt: "Quel mécanisme d'Heroku permet de lancer les migrations de base avant la mise en service d'une version ?"
    answer: "La release phase, déclarée par une ligne release: dans le Procfile"
    decoys:
      - "Un add-on de migration à installer depuis la place de marché"
      - "Le buildpack, qui exécute les migrations pendant la compilation, avant de produire le slug"
    why: "La commande de release s'exécute après le build et avant le démarrage de la nouvelle version ; si elle échoue, la version n'est pas mise en service."
  - id: heroku-run
    prompt: "Comment ouvrir une console Rails ou Django sur une application Heroku ?"
    answer: "Avec heroku run, qui lance un dyno ponctuel"
    decoys:
      - "En se connectant en SSH au serveur physique qui héberge l'application"
      - "Avec git push heroku console"
    why: "heroku run lance un dyno éphémère (one-off) avec le code et la config de l'application, par exemple heroku run rails console."
  - id: logs
    prompt: "Comment suivre en direct les journaux d'une application Heroku ?"
    answer: "heroku logs --tail"
    decoys:
      - "heroku ps:watch"
      - "En lisant le fichier log/production.log dans chaque dyno, via heroku run cat"
    why: "Heroku agrège la sortie standard de tous les dynos et du routeur dans un flux unique ; les fichiers locaux des dynos sont éphémères."
  - id: ps-scale
    prompt: "Quelle commande passe une application Heroku à trois dynos web ?"
    answer: "heroku ps:scale web=3"
    decoys:
      - "heroku dynos:add 3"
      - "heroku scale --instances 3"
    why: "heroku ps:scale fixe le nombre de dynos par type de processus déclaré dans le Procfile."
  - id: rollback
    prompt: "Une mise en production casse l'application Heroku. Comment revenir à la version précédente ?"
    answer: "heroku releases:rollback, qui republie une release antérieure"
    decoys:
      - "Il faut restaurer une sauvegarde complète de la base de données"
      - "Faire un git revert puis attendre le prochain déploiement automatique"
    why: "Chaque déploiement ou changement de config crée une release ; le rollback relance la précédente. Il ne touche pas aux données de la base."
  - id: slug
    prompt: "Qu'est-ce qu'un slug sur Heroku ?"
    answer: "L'archive de l'application compilée par le buildpack, prête à lancer"
    decoys:
      - "L'URL lisible de l'application, en kebab-case"
      - "Un dyno en veille, réveillé à la première requête qu'il reçoit"
    why: "Le build produit un slug, copié sur chaque dyno au démarrage : c'est ce qui permet d'ajouter des instances rapidement."
  - id: worker
    prompt: "Un traitement long (export, envoi d'e-mails en masse) bloque les requêtes web. Que faire sur Heroku ?"
    answer: "Le confier à un dyno worker, alimenté par une file comme Redis"
    decoys:
      - "Augmenter le délai maximal des requêtes HTTP dans les réglages du routeur"
      - "Ajouter des dynos web jusqu'à ce que le traitement passe"
    why: "Le routeur coupe les requêtes trop longues ; les tâches lourdes vont dans un processus worker qui lit une file de jobs."
  - id: timeout-routeur
    prompt: "Que fait le routeur d'Heroku si une requête web ne reçoit pas de réponse dans les 30 secondes ?"
    answer: "Il coupe la requête et renvoie une erreur"
    decoys:
      - "Il la transfère à un autre dyno web et recommence"
      - "Il l'attend indéfiniment, sans limite de durée"
    why: "Au-delà de 30 secondes sans réponse initiale, le routeur abandonne la requête (erreur H12). D'où l'usage de workers pour les tâches longues."
  - id: scheduler
    prompt: "Comment lancer une tâche planifiée, par exemple chaque nuit, sur Heroku ?"
    answer: "Avec l'add-on Heroku Scheduler"
    decoys:
      - "Avec la crontab du serveur, éditée par heroku run crontab -e"
      - "Avec la release phase"
    why: "Heroku Scheduler lance des commandes dans des dynos ponctuels à intervalle régulier. Il n'y a pas de crontab persistante sur un dyno."
  - id: database-url
    prompt: "Comment une application récupère-t-elle les identifiants de son Heroku Postgres ?"
    answer: "Par la config var DATABASE_URL, posée par l'add-on"
    decoys:
      - "En les copiant à la main depuis le tableau de bord dans un fichier versionné du dépôt"
      - "Par un appel à l'API Heroku à chaque requête"
    why: "Un add-on injecte ses accès dans les config vars. Heroku peut les faire tourner : il ne faut pas les recopier en dur."
  - id: pipelines
    prompt: "Que permettent les pipelines Heroku ?"
    answer: "Promouvoir un même build de staging vers la production, avec des review apps"
    decoys:
      - "Enchaîner des traitements de données dans un DAG planifié, comme le ferait un orchestrateur"
      - "Répartir le trafic entre plusieurs régions"
    why: "Un pipeline relie les environnements d'une application ; la promotion réutilise le slug déjà testé, sans reconstruire. Les review apps déploient chaque pull request."
  - id: docker
    prompt: "Peut-on déployer une image Docker sur Heroku plutôt que passer par un buildpack ?"
    answer: "Oui, via le registre de conteneurs d'Heroku ou un heroku.yml"
    decoys:
      - "Non : Heroku n'accepte que du code source poussé par Git"
      - "Oui, mais seulement en installant soi-même un cluster Kubernetes"
    why: "Heroku accepte aussi des images Docker, quand on veut maîtriser l'environnement d'exécution plus finement qu'avec un buildpack."
  - id: cloud-native-buildpacks
    prompt: "À quel projet ouvert Heroku a-t-il contribué pour standardiser les buildpacks ?"
    answer: "Cloud Native Buildpacks, à la CNCF"
    decoys:
      - "Docker Compose, chez Docker"
      - "Helm, à la CNCF"
    why: "Heroku a lancé avec Pivotal le projet Cloud Native Buildpacks, qui produit des images OCI à partir du code source. Helm sert à packager des applications Kubernetes."
  - id: infrastructure
    prompt: "Sur quelle infrastructure tourne Heroku ?"
    answer: "Sur AWS"
    decoys:
      - "Sur ses propres datacenters, sans cloud public"
      - "Sur Google Cloud"
    why: "Heroku est une couche PaaS au-dessus d'AWS : on y gagne la simplicité, au prix d'un coût par ressource plus élevé qu'AWS en direct."
---
