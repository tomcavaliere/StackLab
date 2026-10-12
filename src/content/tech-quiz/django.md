---
questions:
  - id: batteries-incluses
    prompt: "Que veut dire « batteries incluses » pour Django ?"
    answer: "ORM, migrations, authentification et administration sont fournis d'emblée"
    decoys:
      - "Il embarque son propre serveur de base de données"
      - "Il inclut un framework front React prêt à l'emploi, branché sur les vues"
    why: "Django fournit, cohérentes entre elles, les briques que toute application web refait. Il utilise une base externe (PostgreSQL…) et rend ses pages lui-même."
  - id: admin
    prompt: "Quel atout décisif Django offre-t-il à un MVP riche en données métier ?"
    answer: "L'interface d'administration, disponible sans écrire de code"
    decoys:
      - "Une API GraphQL générée automatiquement"
      - "Un hébergement gratuit fourni par la Django Software Foundation"
    why: "Le back-office est généré à partir des modèles : la fiche parle de semaines gagnées."
  - id: drf
    prompt: "Quel paquet est la référence pour exposer une API REST avec Django ?"
    answer: "Django REST Framework"
    decoys:
      - "Django Channels"
      - "Celery"
    why: "Django REST Framework, un paquet tiers, est la référence pour les API REST. Channels gère l'asynchrone (WebSockets), Celery les tâches de fond."
  - id: contrib-auth
    prompt: "Que gère django.contrib.auth ?"
    answer: "Les comptes, les mots de passe hachés, les sessions, les groupes et les permissions"
    decoys:
      - "Le SSO d'entreprise par SAML, activé par défaut"
      - "Le chiffrement de toutes les colonnes de la base, avec rotation automatique des clés"
    why: "L'authentification intégrée couvre comptes, sessions et permissions. Le SSO d'entreprise demande des paquets supplémentaires ou un service comme Auth0."
  - id: rendu-serveur
    prompt: "Comment Django peut-il produire ses pages HTML ?"
    answer: "Par son système de gabarits, côté serveur, sans application front séparée"
    decoys:
      - "Il impose une application React séparée"
      - "Il ne produit que du JSON : l'interface est forcément une application séparée"
    why: "Les gabarits Django rendent les pages côté serveur : pas besoin de maintenir une seconde application front."
  - id: orm
    prompt: "Comment décrit-on le modèle de données dans Django ?"
    answer: "En classes Python ; l'ORM génère les tables et les migrations"
    decoys:
      - "En SQL, dans des migrations écrites entièrement à la main"
      - "En YAML, dans un fichier de schéma central"
    why: "On décrit les modèles en Python, et Django génère tables et migrations à partir de leurs changements."
  - id: websockets
    prompt: "Pourquoi Django n'est-il pas le premier choix pour des WebSockets en masse ?"
    answer: "Il gère l'asynchrone (vues async, Channels), mais ce n'est pas son modèle d'origine"
    decoys:
      - "Il est incapable de gérer une connexion WebSocket, même avec Channels"
      - "Il ne fonctionne qu'avec MySQL, qui ne sait pas gérer les connexions longues en masse"
    why: "Django sait faire de l'asynchrone, mais il a été conçu pour le cycle requête-réponse classique. Pour des charges très concurrentes à connexions longues, d'autres modèles sont plus naturels."
  - id: micro-api
    prompt: "Une micro-API sans base de données ni utilisateurs. Que conseille la fiche ?"
    answer: "FastAPI ou un framework minimal suffit"
    decoys:
      - "Django, pour bénéficier de l'interface d'administration"
      - "Django avec Celery, pour être prêt à grossir"
    why: "Sans base ni utilisateurs, ORM, admin et authentification ne servent à rien : un framework léger suffit."
  - id: taches-lentes
    prompt: "Quelle combinaison classique pour exécuter les tâches lentes d'une application Django ?"
    answer: "Celery, avec Redis ou RabbitMQ comme broker"
    decoys:
      - "Airflow, déclenché à chaque requête"
      - "Spark Structured Streaming"
    why: "Celery, avec un broker, est la combinaison documentée et très répandue pour les tâches de fond de Django."
  - id: base-preferee
    prompt: "Quelle base est la mieux prise en charge par l'ORM de Django ?"
    answer: "PostgreSQL, avec des champs et fonctions dédiés (django.contrib.postgres)"
    decoys:
      - "SQLite, la seule prise en charge en production"
      - "DynamoDB, via un backend officiel intégré à Django depuis la version 4"
    why: "django.contrib.postgres apporte des champs et fonctions propres à PostgreSQL. SQLite est pris en charge mais pas seul, et DynamoDB n'a pas de backend officiel."
  - id: commande-migrate
    prompt: "Quelle commande Django applique les migrations en attente sur la base ?"
    answer: "python manage.py migrate"
    decoys:
      - "python manage.py makemigrations"
      - "python manage.py syncdb --apply"
    why: "migrate applique les migrations ; makemigrations les génère sans toucher à la base. syncdb a été retiré depuis longtemps."
  - id: makemigrations
    prompt: "Que fait python manage.py makemigrations ?"
    answer: "Il génère les fichiers de migration à partir des changements des modèles"
    decoys:
      - "Il applique immédiatement les migrations en attente sur la base de données de production"
      - "Il crée les classes de modèles Python à partir d'une base de données existante"
    why: "makemigrations écrit les migrations, migrate les applique. Générer des modèles depuis une base existante, c'est inspectdb."
  - id: mtv
    prompt: "Comment Django nomme-t-il le découpage de son architecture ?"
    answer: "MTV : modèle, gabarit (template), vue"
    decoys:
      - "MVVM : modèle, vue, vue-modèle liée par data binding"
      - "Flux : actions, dispatcher et stores unidirectionnels"
    why: "Django parle de modèle, gabarit et vue : la vue Django joue le rôle que d'autres frameworks donnent au contrôleur."
  - id: queryset-paresseux
    prompt: "Quand un QuerySet Django exécute-t-il réellement sa requête SQL ?"
    answer: "Quand on l'évalue (itération, list(), len()…)"
    decoys:
      - "Dès sa création, puis à chaque appel de filter() chaîné"
      - "Au démarrage du serveur, qui charge toutes les tables en cache mémoire"
    why: "Les QuerySets sont paresseux : on peut chaîner filter() et exclude() sans requête, jusqu'à l'évaluation."
  - id: select-related
    prompt: "Quelle méthode de QuerySet évite le problème N+1 en chargeant une clé étrangère par jointure SQL ?"
    answer: "select_related()"
    decoys:
      - "only()"
      - "distinct()"
      - "annotate()"
    why: "select_related() fait une jointure et ramène l'objet lié dans la même requête. only() restreint les colonnes, distinct() dédoublonne, annotate() ajoute des agrégats."
  - id: prefetch-related
    prompt: "Quelle méthode charge efficacement une relation many-to-many pour toute une liste d'objets ?"
    answer: "prefetch_related()"
    decoys:
      - "select_related()"
      - "values_list()"
      - "defer()"
    why: "prefetch_related() fait une requête séparée par relation et assemble en Python ; select_related() ne suit que les relations à valeur unique (clé étrangère, one-to-one)."
  - id: csrf
    prompt: "Quelle protection Django active-t-il par défaut sur les formulaires envoyés en POST ?"
    answer: "Un jeton CSRF, vérifié par un middleware"
    decoys:
      - "Un captcha ajouté automatiquement à chaque formulaire"
      - "Un chiffrement du corps de la requête par clé publique"
    why: "Le middleware CSRF refuse un POST sans jeton valide ; le gabarit l'insère avec {% csrf_token %}. Pas de captcha ni de chiffrement applicatif."
  - id: injection-sql
    prompt: "Pourquoi les requêtes construites avec l'ORM Django protègent-elles des injections SQL ?"
    answer: "Les valeurs sont passées en paramètres à la base, jamais concaténées"
    decoys:
      - "L'ORM supprime toutes les apostrophes des chaînes reçues avant de les enregistrer"
      - "Django refuse toute valeur qui contient un mot-clé SQL comme SELECT"
    why: "L'ORM utilise des requêtes paramétrées : la base ne confond jamais données et code. Filtrer des caractères ou des mots serait fragile."
  - id: debug-production
    prompt: "Quel réglage Django ne doit jamais rester actif en production ?"
    answer: "DEBUG = True"
    decoys:
      - "ALLOWED_HOSTS renseigné"
      - "USE_TZ = True"
    why: "DEBUG = True affiche des pages d'erreur détaillées (code, réglages) à n'importe quel visiteur. ALLOWED_HOSTS doit au contraire être renseigné, et USE_TZ est sans danger."
  - id: settings
    prompt: "Où configure-t-on un projet Django (base, applications installées, middlewares) ?"
    answer: "Dans le module Python settings.py"
    decoys:
      - "Dans un fichier django.yaml placé à la racine"
      - "Dans une table de configuration créée en base"
    why: "La configuration est un module Python : DATABASES, INSTALLED_APPS, MIDDLEWARE… y sont des variables."
  - id: application
    prompt: "Qu'est-ce qu'une « application » dans un projet Django ?"
    answer: "Un module qui regroupe modèles, vues et gabarits d'un domaine"
    decoys:
      - "Un processus serveur indépendant, lancé sur son propre port"
      - "Un conteneur Docker généré par la commande startapp"
    why: "Un projet est composé d'applications (créées par startapp), déclarées dans INSTALLED_APPS, et réutilisables d'un projet à l'autre."
  - id: urls
    prompt: "Comment Django associe-t-il une URL à une vue ?"
    answer: "Par la liste urlpatterns, dans urls.py"
    decoys:
      - "Par un décorateur @route posé sur chaque fonction de vue"
      - "Par le nom du fichier de la vue, avec un routage par dossier"
    why: "Le routage Django est déclaré dans urlpatterns avec path() ; le décorateur @route est le style de Flask, le routage par fichier celui de Next.js."
  - id: signaux
    prompt: "Que sont les signaux Django, comme post_save ?"
    answer: "Des notifications d'événements, auxquelles on abonne des fonctions"
    decoys:
      - "Des signaux Unix envoyés au processus pour recharger le code"
      - "Des alertes de monitoring envoyées par e-mail aux administrateurs"
    why: "Un récepteur branché sur post_save s'exécute après chaque enregistrement d'un modèle : utile pour découpler, au prix d'un flux moins lisible."
  - id: middleware
    prompt: "Qu'est-ce qu'un middleware Django ?"
    answer: "Une couche qui traite chaque requête et chaque réponse autour des vues"
    decoys:
      - "Un serveur intermédiaire placé entre Django et la base de données"
      - "Un fragment de gabarit inclus automatiquement dans chaque page"
    why: "Les middlewares (sessions, authentification, CSRF…) s'enchaînent autour de la vue, dans l'ordre de MIDDLEWARE."
  - id: deploiement
    prompt: "Comment sert-on une application Django en production ?"
    answer: "Derrière un serveur WSGI ou ASGI, comme Gunicorn ou Uvicorn"
    decoys:
      - "Avec runserver, le serveur de développement fourni avec Django"
      - "Compilée en binaire autonome par une commande manage.py build"
    why: "La documentation déconseille runserver en production. Django expose une interface WSGI et ASGI que servent Gunicorn, uWSGI ou Uvicorn."
  - id: createsuperuser
    prompt: "Quelle commande crée un compte capable de se connecter à l'administration Django ?"
    answer: "python manage.py createsuperuser"
    decoys:
      - "python manage.py startadmin"
      - "python manage.py adduser --admin"
    why: "createsuperuser crée un utilisateur avec tous les droits ; les deux autres commandes n'existent pas."
  - id: modelform
    prompt: "Que fournit un ModelForm ?"
    answer: "Un formulaire généré depuis un modèle, avec sa validation"
    decoys:
      - "Un modèle créé automatiquement à partir d'un formulaire HTML existant"
      - "Une page d'administration personnalisée pour un seul modèle"
    why: "Le ModelForm reprend les champs et contraintes du modèle, valide les données et sait enregistrer l'objet."
  - id: vues-generiques
    prompt: "À quoi servent les vues génériques de Django (ListView, DetailView…) ?"
    answer: "Couvrir les cas courants (liste, détail, édition) sans les réécrire"
    decoys:
      - "Générer automatiquement une API REST complète pour chaque modèle"
      - "Remplacer les gabarits HTML par des réponses JSON génériques"
    why: "Les vues génériques basées sur des classes factorisent les écrans CRUD. L'API REST générée, c'est plutôt Django REST Framework."
  - id: collectstatic
    prompt: "Que fait python manage.py collectstatic ?"
    answer: "Il rassemble les fichiers statiques dans un dossier unique à servir"
    decoys:
      - "Il compresse et minifie le JavaScript inclus dans les gabarits"
      - "Il supprime du projet les fichiers statiques jamais référencés"
    why: "collectstatic copie les fichiers statiques de chaque application dans STATIC_ROOT, d'où un serveur web ou un CDN les sert."
  - id: origine
    prompt: "Dans quel contexte Django a-t-il été développé à l'origine ?"
    answer: "Au sein d'un journal local du Kansas"
    decoys:
      - "Chez Google, pour la plateforme App Engine"
      - "Dans un laboratoire universitaire suisse, comme le Web"
    why: "Django est né au Lawrence Journal-World, où il fallait publier vite des applications web d'information, avant d'être publié en open source en 2005."
---
