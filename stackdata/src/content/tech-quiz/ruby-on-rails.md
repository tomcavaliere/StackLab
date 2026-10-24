---
questions:
  - id: convention
    prompt: "Quel principe guide Ruby on Rails ?"
    answer: "La convention plutôt que la configuration"
    decoys:
      - "La configuration explicite de chaque détail"
      - "Le minimalisme : chaque brique se choisit à la carte"
    why: "Rails prend par convention les décisions communes à tous les projets (nommage, dossiers, routes) pour que l'équipe écrive surtout du code métier."
  - id: active-record
    prompt: "Qu'est-ce qu'Active Record dans Rails ?"
    answer: "La couche qui fait le lien avec la base de données"
    decoys:
      - "Le moteur de gabarits qui produit les pages HTML"
      - "Le système de tâches de fond"
    why: "Active Record est l'ORM de Rails ; les tâches de fond passent par Active Job."
  - id: hotwire
    prompt: "Que permet Hotwire (Turbo et Stimulus), depuis Rails 7 ?"
    answer: "Des interfaces réactives avec très peu de JavaScript"
    decoys:
      - "Compiler le code Ruby en JavaScript"
      - "Remplacer la base de données par Redis pour les pages dynamiques"
    why: "Hotwire garde le rendu côté serveur tout en rendant l'interface réactive."
  - id: rails-8
    prompt: "Qu'apporte Rails 8 (2024) ?"
    answer: "Un générateur d'authentification, et Solid Cache et Solid Queue adossés à la base"
    decoys:
      - "Un compilateur qui transforme l'application Rails en un binaire Go autonome"
      - "La suppression d'Active Record au profit de SQL brut"
    why: "Rails 8 permet de démarrer avec l'authentification générée et sans Redis pour le cache et les files."
  - id: solid
    prompt: "Pourquoi Solid Cache et Solid Queue ?"
    answer: "Pour démarrer sans Redis, avec un cache et des files adossés à la base"
    decoys:
      - "Pour remplacer PostgreSQL par Redis comme base principale"
      - "Pour exécuter Rails dans le navigateur"
    why: "Une brique de moins à opérer au démarrage : la base suffit."
  - id: origine
    prompt: "D'où Rails a-t-il été extrait ?"
    answer: "De Basecamp, par David Heinemeier Hansson, en 2004"
    decoys:
      - "De GitHub, en 2008, pour gérer ses dépôts"
      - "De Shopify, en 2006, pour sa boutique"
    why: "Rails est né de Basecamp. GitHub et Shopify sont des exemples publics de Rails à grande échelle."
  - id: cible
    prompt: "Quel est le cœur de cible de Rails ?"
    answer: "Un MVP ou un SaaS à livrer vite par une petite équipe"
    decoys:
      - "Un service temps réel à latence très serrée, à la milliseconde"
      - "Un pipeline de machine learning"
    why: "La productivité prime : beaucoup de fonctionnalités avec peu de code."
  - id: montee-en-charge
    prompt: "Rails peut-il monter en charge ?"
    answer: "Oui (GitHub, Shopify), au prix d'un effort d'optimisation"
    decoys:
      - "Non : il plafonne à quelques centaines d'utilisateurs"
      - "Oui, sans aucun effort, mieux qu'un langage compilé"
    why: "Rails tient de très gros trafics, mais cela demande un effort qu'un langage compilé évite en partie."
  - id: mails-et-jobs
    prompt: "Quels composants de Rails gèrent les e-mails et les tâches de fond ?"
    answer: "Action Mailer et Active Job"
    decoys:
      - "Celery et Airflow, intégrés"
      - "Eloquent et Blade, repris de Laravel"
    why: "Ce sont des briques intégrées à Rails. Celery et Airflow sont en Python ; Eloquent et Blade appartiennent à Laravel."
  - id: conventions
    prompt: "Une équipe qui n'adhère pas aux conventions du framework : Rails est-il un bon choix ?"
    answer: "Non : elle se battra contre le framework"
    decoys:
      - "Oui : Rails n'impose aucune convention"
      - "Oui : il suffit de désactiver les conventions"
    why: "Toute la productivité de Rails vient de ses conventions."
  - id: mvc
    prompt: "Quel motif d'architecture structure une application Rails ?"
    answer: "Modèle-Vue-Contrôleur (MVC)"
    decoys:
      - "Des microservices, un par modèle"
      - "Modèle-Vue-VueModèle (MVVM), comme sur mobile"
    why: "Les dossiers app/models, app/views et app/controllers reflètent ce découpage."
  - id: migrations
    prompt: "À quoi servent les migrations dans Rails ?"
    answer: "Versionner les évolutions du schéma de la base, écrites en Ruby"
    decoys:
      - "Déplacer l'application d'un hébergeur à un autre sans interruption de service"
      - "Faire passer l'application à la version majeure suivante du framework"
    why: "Chaque migration décrit un changement de schéma (ajouter une table, une colonne) que rails db:migrate applique dans l'ordre."
  - id: scaffold
    prompt: "Que fait la commande rails generate scaffold Article title:string ?"
    answer: "Elle génère modèle, migration, contrôleur, vues et routes d'un CRUD d'articles"
    decoys:
      - "Elle crée la table articles en base, sans produire aucun fichier dans le projet"
      - "Elle installe une gem de gestion de contenu et la configure pour les articles"
    why: "Le scaffold produit tout le code d'un CRUD fonctionnel, à adapter ensuite ; la table n'est créée qu'en lançant la migration générée."
  - id: routes-resources
    prompt: "Que déclare la ligne resources :articles dans config/routes.rb ?"
    answer: "Les routes REST standard des articles (index, show, create, update, destroy…)"
    decoys:
      - "Un modèle Article avec sa table, ses validations et ses associations par défaut"
      - "Un dossier de fichiers statiques servis sans passer par aucun contrôleur de l'application"
    why: "Une seule ligne crée les sept routes classiques d'une ressource, reliées aux actions d'ArticlesController."
  - id: nommage-tables
    prompt: "Par convention, à quelle table correspond le modèle Article dans Rails ?"
    answer: "articles"
    decoys:
      - "article"
      - "Article"
      - "tbl_article"
    why: "Active Record met le nom du modèle au pluriel et en minuscules : la convention évite toute configuration."
  - id: associations
    prompt: "Comment déclare-t-on, dans le modèle Article, qu'un article a plusieurs commentaires ?"
    answer: "has_many :comments"
    decoys:
      - "belongs_to :comments"
      - "has_one :comments"
      - "references :comments"
    why: "has_many déclare la relation un-à-plusieurs ; c'est le modèle Comment qui porte belongs_to :article."
  - id: n-plus-un
    prompt: "Afficher 50 articles avec leur auteur déclenche 51 requêtes SQL. Quelle méthode d'Active Record corrige ce problème N+1 ?"
    answer: "includes(:author), qui précharge les auteurs"
    decoys:
      - "find_each, qui parcourt les articles par lots de mille"
      - "distinct, qui supprime les doublons d'auteurs dans le résultat"
    why: "includes charge tous les auteurs en une ou deux requêtes au lieu d'une par article. find_each limite la mémoire, pas le nombre de requêtes."
  - id: validations
    prompt: "Où place-t-on validates :email, presence: true dans une application Rails ?"
    answer: "Dans le modèle, pour refuser d'enregistrer un objet invalide"
    decoys:
      - "Dans la migration, pour créer une contrainte NOT NULL dans la base"
      - "Dans la vue, pour bloquer l'envoi du formulaire côté navigateur"
    why: "Les validations d'Active Record s'exécutent avant l'enregistrement et remplissent errors ; une contrainte en base s'écrit à part, dans une migration."
  - id: strong-parameters
    prompt: "Que protège params.require(:article).permit(:title, :body) dans un contrôleur ?"
    answer: "L'affectation de masse : seuls les champs autorisés passent du formulaire au modèle"
    decoys:
      - "Les requêtes SQL : les paramètres reçus sont échappés pour éviter les injections"
      - "La session : les paramètres sont chiffrés avant d'être stockés dans le cookie"
    why: "Sans cette liste blanche, un utilisateur pourrait envoyer un champ admin=true. Les injections SQL sont évitées par Active Record lui-même."
  - id: csrf
    prompt: "Quelle protection Rails active-t-il par défaut sur les formulaires ?"
    answer: "Un jeton CSRF vérifié à chaque requête qui modifie des données"
    decoys:
      - "Un captcha ajouté automatiquement à chaque formulaire public de l'application"
      - "Une limite du nombre de soumissions par adresse IP et par minute"
    why: "Les formulaires générés par Rails incluent un jeton que le serveur vérifie, ce qui bloque les requêtes forgées depuis un autre site."
  - id: console-rails
    prompt: "Que fait la commande rails console ?"
    answer: "Elle ouvre une session Ruby interactive avec l'application et ses modèles chargés"
    decoys:
      - "Elle affiche en temps réel les journaux du serveur de production dans le terminal"
      - "Elle ouvre un client SQL connecté à la base, sans charger le code de l'application"
    why: "On y manipule les modèles directement (Article.count). Le client SQL de la base s'ouvre avec rails dbconsole."
  - id: devise
    prompt: "Quelle gem a longtemps été le choix courant pour l'authentification dans Rails, avant le générateur de Rails 8 ?"
    answer: "Devise"
    decoys:
      - "Sidekiq"
      - "RSpec"
      - "Puma"
    why: "Sidekiq gère les tâches de fond, RSpec les tests, Puma sert l'application."
  - id: sidekiq
    prompt: "Qu'est-ce que Sidekiq dans l'écosystème Rails ?"
    answer: "Un système de tâches de fond adossé à Redis"
    decoys:
      - "Un serveur web multithread qui remplace WEBrick"
      - "Une bibliothèque de composants d'interface pour Hotwire"
    why: "Sidekiq exécute des jobs (souvent via Active Job) dans des processus à part ; Rails 8 propose Solid Queue pour se passer de Redis."
  - id: puma
    prompt: "Quel est le serveur web par défaut d'une application Rails récente ?"
    answer: "Puma"
    decoys:
      - "Unicorn"
      - "Gunicorn"
      - "Nginx"
    why: "Puma est le serveur par défaut depuis Rails 5. Unicorn a été très utilisé, Gunicorn sert Python, et Nginx se place devant en reverse proxy."
  - id: turbo
    prompt: "Que fait Turbo, l'une des deux briques de Hotwire ?"
    answer: "Il remplace pages ou fragments par du HTML renvoyé par le serveur, sans rechargement complet"
    decoys:
      - "Il compile les vues ERB en composants React exécutés dans le navigateur du visiteur"
      - "Il met en cache toutes les requêtes SQL de l'application pour accélérer le rendu des pages"
    why: "Le rendu reste côté serveur : Turbo échange simplement des morceaux de HTML."
  - id: stimulus
    prompt: "Quel est le rôle de Stimulus, dans Hotwire ?"
    answer: "Attacher de petits contrôleurs JavaScript au HTML existant, via des attributs data-"
    decoys:
      - "Générer tout le HTML de la page dans le navigateur à partir d'une réponse JSON"
      - "Pousser en temps réel les changements de la base vers toutes les pages ouvertes"
    why: "Stimulus ajoute du comportement à un HTML rendu par le serveur ; il ne génère pas la page."
  - id: erb
    prompt: "Dans quel format sont écrites par défaut les vues Rails ?"
    answer: "ERB : du HTML avec du Ruby intégré (<%= %>)"
    decoys:
      - "JSX : du HTML dans des fonctions JavaScript"
      - "Blade : des gabarits compilés en code PHP"
      - "Jinja : des gabarits écrits pour Python"
    why: "ERB est livré avec Ruby. Blade appartient à Laravel, Jinja à l'écosystème Python, JSX à React."
  - id: mode-api
    prompt: "Comment créer une application Rails qui ne sert que du JSON ?"
    answer: "rails new mon_app --api, qui allège la pile des vues et des middlewares de navigateur"
    decoys:
      - "rails new mon_app --json, qui remplace Active Record par un client HTTP"
      - "C'est impossible : Rails produit toujours des pages HTML rendues côté serveur"
    why: "Le mode API garde Active Record, les routes et les contrôleurs, sans ce qui ne sert qu'à un navigateur (cookies, gabarits HTML…)."
  - id: action-cable
    prompt: "Quel composant de Rails gère les WebSockets ?"
    answer: "Action Cable"
    decoys:
      - "Active Storage"
      - "Action Mailer"
      - "Active Job"
    why: "Active Storage gère les fichiers, Action Mailer les e-mails, Active Job les tâches de fond."
  - id: active-storage
    prompt: "À quoi sert Active Storage dans Rails ?"
    answer: "Attacher des fichiers aux modèles et les stocker sur disque ou dans le cloud (S3…)"
    decoys:
      - "Stocker le cache de l'application dans la base de données, à la place de Redis"
      - "Sauvegarder chaque nuit la base de données de production sur un disque externe"
    why: "Un modèle déclare has_one_attached :avatar et Rails gère l'envoi et le stockage. Le cache adossé à la base, c'est Solid Cache."
---
