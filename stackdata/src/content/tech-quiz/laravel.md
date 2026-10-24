---
questions:
  - id: philosophie
    prompt: "Qu'apporte Laravel à PHP ?"
    answer: "Des conventions et toutes les briques d'une application web, comme Rails pour Ruby"
    decoys:
      - "Un nouveau moteur d'exécution qui remplace PHP"
      - "Un framework front qui s'exécute dans le navigateur, à la manière de Vue ou de React"
    why: "PHP a longtemps été écrit sans cadre ; Laravel apporte structure et briques intégrées."
  - id: eloquent
    prompt: "Qu'est-ce qu'Eloquent ?"
    answer: "L'ORM de Laravel"
    decoys:
      - "Son moteur de gabarits"
      - "Sa ligne de commande"
    why: "Eloquent fait le lien avec la base ; Blade rend les pages, Artisan est la CLI."
  - id: blade
    prompt: "À quoi sert Blade ?"
    answer: "Rendre les pages côté serveur (gabarits)"
    decoys:
      - "Gérer les files d'attente"
      - "Faire le lien avec la base de données"
    why: "Blade est le moteur de gabarits de Laravel."
  - id: artisan
    prompt: "Qu'est-ce qu'Artisan ?"
    answer: "La CLI de Laravel, qui génère le code"
    decoys:
      - "L'offre d'hébergement managé de Laravel"
      - "L'ORM de Laravel"
    why: "Artisan génère contrôleurs, modèles, migrations… L'hébergement passe par Forge, Vapor ou Laravel Cloud."
  - id: livewire
    prompt: "Que permet Livewire ?"
    answer: "Des interfaces réactives en restant côté PHP"
    decoys:
      - "Écrire des applications mobiles natives en PHP"
      - "Remplacer la base de données par Redis"
    why: "Livewire joue un rôle proche de Hotwire pour Rails."
  - id: authentification
    prompt: "Comment obtenir inscription, connexion et réinitialisation du mot de passe dans Laravel ?"
    answer: "Avec des kits de démarrage"
    decoys:
      - "En installant obligatoirement Auth0"
      - "Laravel ne gère pas l'authentification"
    why: "Les kits de démarrage fournissent l'authentification complète."
  - id: createur
    prompt: "Qui a créé Laravel ?"
    answer: "Taylor Otwell, en 2011"
    decoys:
      - "Rasmus Lerdorf, en 1995"
      - "David Heinemeier Hansson, en 2004"
    why: "Rasmus Lerdorf a créé PHP, David Heinemeier Hansson Rails."
  - id: equipe-sans-php
    prompt: "Une équipe qui ne pratique pas PHP : Laravel est-il un bon choix ?"
    answer: "Non : Django ou Rails offrent la même productivité dans leur langage"
    decoys:
      - "Oui : PHP reste le seul langage vraiment adapté aux applications web"
      - "Oui : on peut écrire une application Laravel en TypeScript"
    why: "La productivité de Laravel suppose de pratiquer PHP."
  - id: integre
    prompt: "Qu'est-ce qui est intégré à Laravel ?"
    answer: "Les files d'attente, la planification de tâches et l'envoi d'e-mails"
    decoys:
      - "Un entrepôt de données colonnaire, pour les rapports et les tableaux de bord"
      - "Un orchestrateur de conteneurs"
    why: "Ce sont des besoins courants d'une application web, fournis d'emblée."
  - id: fort-trafic
    prompt: "Service à très fort trafic : que dit la fiche de Laravel ?"
    answer: "Il tient la charge avec un effort d'optimisation (cache, Octane)"
    decoys:
      - "Il est plus rapide qu'un langage compilé, sans effort"
      - "Il ne dépasse pas une centaine d'utilisateurs simultanés, quelle que soit l'infrastructure"
    why: "Comme Rails, Laravel monte en charge, mais demande un effort qu'un langage compilé évite en partie."
  - id: commande-migrate
    prompt: "Quelle commande applique les migrations d'un projet Laravel ?"
    answer: "php artisan migrate"
    decoys:
      - "php artisan db:push"
      - "composer migrate"
    why: "Les migrations passent par Artisan. Composer gère les dépendances, et db:push n'existe pas."
  - id: composer
    prompt: "Quel gestionnaire de dépendances PHP utilise un projet Laravel ?"
    answer: "Composer"
    decoys:
      - "PEAR, livré avec PHP"
      - "pip, via un pont PHP"
    why: "Laravel et ses paquets s'installent avec Composer ; npm ne sert qu'aux ressources front."
  - id: routes-web
    prompt: "Où déclare-t-on les routes des pages web d'une application Laravel ?"
    answer: "Dans routes/web.php"
    decoys:
      - "Dans config/app.php"
      - "Dans des annotations des vues Blade"
    why: "routes/web.php contient les routes des pages, avec sessions et protection CSRF ; la configuration et les vues n'en déclarent pas."
  - id: fillable
    prompt: "Pourquoi déclarer $fillable sur un modèle Eloquent ?"
    answer: "Limiter les champs remplissables en masse"
    decoys:
      - "Indiquer les colonnes à indexer dans la base"
      - "Lister les champs affichés par défaut dans les vues"
    why: "Sans cette liste, un utilisateur pourrait envoyer un champ comme is_admin et le voir enregistré par create($request->all())."
  - id: middleware
    prompt: "À quoi sert un middleware Laravel, comme auth ?"
    answer: "Filtrer les requêtes avant qu'elles atteignent la route"
    decoys:
      - "Relier deux bases de données entre elles"
      - "Compiler les gabarits Blade au démarrage"
    why: "Le middleware auth redirige un visiteur non connecté avant d'exécuter le contrôleur."
  - id: tinker
    prompt: "Qu'est-ce que php artisan tinker ?"
    answer: "Une console interactive pour manipuler l'application"
    decoys:
      - "Un profileur des requêtes SQL exécutées par page"
      - "Un générateur automatique de tests unitaires"
    why: "Tinker ouvre un REPL avec l'application chargée : on y interroge les modèles Eloquent directement."
  - id: blade-echappement
    prompt: "Que fait {{ $nom }} dans un gabarit Blade ?"
    answer: "Il affiche la valeur échappée, contre le XSS"
    decoys:
      - "Il affiche la valeur brute, sans aucun échappement"
      - "Il déclare une variable utilisable dans le gabarit"
    why: "Les doubles accolades échappent le HTML ; l'affichage brut s'écrit {!! $nom !!} et ne doit servir qu'à du contenu de confiance."
  - id: csrf
    prompt: "Que fait la directive @csrf dans un formulaire Blade ?"
    answer: "Elle ajoute un champ caché avec le jeton anti-CSRF"
    decoys:
      - "Elle chiffre les champs du formulaire avant l'envoi"
      - "Elle désactive la validation côté serveur du formulaire"
    why: "Laravel refuse un POST web sans jeton valide ; @csrf l'insère dans le formulaire."
  - id: queue-work
    prompt: "Comment sont traités les jobs placés dans une file d'attente Laravel ?"
    answer: "Par un worker lancé avec php artisan queue:work"
    decoys:
      - "Toujours dans la requête HTTP qui les a créés, avant la réponse"
      - "Par une entrée cron par job, écrite à la main dans la crontab"
    why: "Un ou plusieurs workers lisent la file (base, Redis, SQS…) et exécutent les jobs hors de la requête."
  - id: scheduler
    prompt: "Comment fonctionne la planification de tâches de Laravel ?"
    answer: "Une seule entrée cron appelle schedule:run chaque minute"
    decoys:
      - "Chaque tâche planifiée a sa propre ligne écrite dans la crontab"
      - "Un service payant de Laravel est obligatoire pour la déclencher"
    why: "Les tâches sont décrites en PHP ; une seule ligne cron lance schedule:run, qui exécute celles qui sont dues."
  - id: has-many
    prompt: "Comment déclare-t-on dans Eloquent qu'un utilisateur a plusieurs articles ?"
    answer: "Une méthode posts() qui retourne $this->hasMany(Post::class)"
    decoys:
      - "Une clé étrangère déclarée dans le fichier config/database.php"
      - "Un attribut @relation placé dans la vue Blade de l'utilisateur"
    why: "Les relations Eloquent sont des méthodes du modèle (hasMany, belongsTo…) ; $user->posts renvoie alors la collection."
  - id: eager-loading
    prompt: "Quelle méthode Eloquent évite le problème N+1 en chargeant les relations à l'avance ?"
    answer: "with()"
    decoys:
      - "all()"
      - "pluck()"
      - "first()"
    why: "Post::with('author') charge tous les auteurs en une requête de plus, au lieu d'une par article."
  - id: validation
    prompt: "Comment valider les données d'une requête dans un contrôleur Laravel ?"
    answer: "Avec $request->validate() et des règles comme required"
    decoys:
      - "Uniquement par des contraintes CHECK en base de données"
      - "Avec un paquet tiers : Laravel ne valide rien lui-même"
    why: "La validation est intégrée : en cas d'échec, Laravel redirige avec les erreurs (ou renvoie 422 en JSON)."
  - id: sanctum
    prompt: "À quoi sert Laravel Sanctum ?"
    answer: "Authentifier une SPA ou une application mobile par jetons d'API"
    decoys:
      - "Exécuter les files d'attente sur plusieurs serveurs en parallèle"
      - "Servir et mettre en cache les fichiers statiques de l'application"
    why: "Sanctum fournit une authentification légère par jetons ou par cookie pour les SPA et les applications mobiles."
  - id: octane
    prompt: "Que fait Laravel Octane ?"
    answer: "Il garde l'application chargée en mémoire entre les requêtes"
    decoys:
      - "Il compile le code PHP en binaire natif avant le déploiement"
      - "Il répartit la base de données sur plusieurs serveurs"
    why: "Octane évite de redémarrer le framework à chaque requête, en s'appuyant sur des serveurs comme FrankenPHP, Swoole ou RoadRunner."
  - id: env
    prompt: "Où ranger les secrets (mot de passe de base, clés d'API) d'une application Laravel ?"
    answer: "Dans le fichier .env, non versionné"
    decoys:
      - "Dans le fichier routes/web.php"
      - "Dans les vues Blade concernées"
    why: "Le fichier .env porte la configuration propre à chaque environnement ; les fichiers de config/ le lisent avec env()."
  - id: facades
    prompt: "Que sont les façades Laravel, comme Cache::get ou DB::table ?"
    answer: "Des accès d'allure statique à des services du conteneur"
    decoys:
      - "Des classes PHP réellement statiques, sans aucun état"
      - "Des écrans d'administration générés pour chaque modèle"
    why: "Une façade transmet l'appel à l'instance enregistrée dans le conteneur de services, ce qui permet de la remplacer en test."
  - id: inertia
    prompt: "Quelle bibliothèque permet d'écrire les pages d'une application Laravel en React ou Vue sans API séparée ?"
    answer: "Inertia.js"
    decoys:
      - "Livewire"
      - "Alpine.js"
    why: "Inertia relie les contrôleurs Laravel à des composants React ou Vue. Livewire reste côté PHP, et Alpine.js est une petite bibliothèque d'interactions."
  - id: forge
    prompt: "Que propose Laravel Forge ?"
    answer: "Provisionner et gérer des serveurs pour y déployer ses applications"
    decoys:
      - "Un ORM alternatif à Eloquent, pensé pour les très grosses tables"
      - "Un moteur de gabarits plus rapide que Blade, compilé à l'avance"
    why: "Forge configure des serveurs (chez divers hébergeurs) et automatise les déploiements ; ce n'est pas une brique du framework."
  - id: vapor
    prompt: "Qu'est-ce que Laravel Vapor ?"
    answer: "Une plateforme de déploiement serverless sur AWS"
    decoys:
      - "Le serveur d'application utilisé par Octane"
      - "Le système de cache intégré à Laravel"
    why: "Vapor déploie une application Laravel sur AWS Lambda ; le cache et Octane sont des briques distinctes."
---
