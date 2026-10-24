---
questions:
  - id: annotations
    prompt: "Sur quoi FastAPI s'appuie-t-il pour valider les entrées ?"
    answer: "Les annotations de type Python, avec Pydantic"
    decoys:
      - "Des schémas JSON écrits à la main dans un fichier séparé"
      - "Des contraintes déclarées dans la base de données"
    why: "On déclare paramètres et modèles avec des types Python ; FastAPI valide les requêtes et sérialise les réponses à partir d'eux."
  - id: openapi
    prompt: "Quelle documentation FastAPI génère-t-il automatiquement ?"
    answer: "Une documentation OpenAPI interactive"
    decoys:
      - "Un wiki Markdown du projet, généré au build"
      - "Aucune : elle s'écrit à part"
    why: "Les types déclarés suffisent à produire une documentation OpenAPI à jour, sans effort supplémentaire."
  - id: fondations
    prompt: "Sur quoi FastAPI repose-t-il ?"
    answer: "Starlette et la norme ASGI"
    decoys:
      - "Flask et la norme WSGI"
      - "Django et son ORM"
    why: "ASGI est la norme Python des serveurs asynchrones ; Starlette en fournit les briques web."
  - id: async-await
    prompt: "Que permet async/await dans FastAPI ?"
    answer: "Attendre de nombreuses entrées-sorties en parallèle dans un même processus"
    decoys:
      - "Répartir un calcul intensif sur tous les cœurs de la machine"
      - "Exécuter du JavaScript côté serveur, à côté du code Python"
    why: "Pendant qu'une requête attend la base ou un appel HTTP, le processus en traite d'autres. Cela n'accélère pas le calcul."
  - id: calcul-lourd
    prompt: "Un endpoint fait un calcul de plusieurs secondes. L'asynchrone de FastAPI l'accélère-t-il ?"
    answer: "Non : l'asynchrone accélère l'attente d'entrées-sorties, pas le calcul"
    decoys:
      - "Oui : async parallélise automatiquement le calcul"
      - "Oui, à condition de déclarer les types des paramètres avec Pydantic"
    why: "Un calcul occupe le processeur ; async n'y change rien. La fiche range « calcul intensif dans les requêtes » dans « Quand l'éviter »."
  - id: code-bloquant
    prompt: "Que se passe-t-il si l'on appelle du code bloquant dans une route async, sans précaution ?"
    answer: "La boucle d'événements est bloquée et tout le service se dégrade"
    decoys:
      - "FastAPI le détecte et le déplace tout seul dans un thread"
      - "Rien : Python exécute les deux en parallèle"
    why: "Dans une route async, un appel bloquant arrête la boucle d'événements : toutes les autres requêtes attendent."
  - id: orm
    prompt: "Quel ORM FastAPI fournit-il ?"
    answer: "Aucun : on utilise par exemple SQLAlchemy ou SQLModel"
    decoys:
      - "Son propre ORM, intégré au framework, avec ses migrations"
      - "L'ORM de Django, embarqué"
    why: "FastAPI se concentre sur l'API. La base se branche via SQLAlchemy ou SQLModel."
  - id: servir-un-modele
    prompt: "Quel usage courant de FastAPI la fiche cite-t-elle ?"
    answer: "Servir un modèle de machine learning en service web"
    decoys:
      - "Rendre des pages HTML avec un back-office complet"
      - "Orchestrer des pipelines de données planifiés"
    why: "Exposer un modèle ou un traitement data en API est un usage très courant de FastAPI."
  - id: vs-django
    prompt: "Une application avec comptes, back-office et beaucoup de pages. FastAPI est-il le plus adapté ?"
    answer: "Non : il faudrait assembler ORM, migrations, authentification et administration, que Django fournit"
    decoys:
      - "Oui : FastAPI inclut une interface d'administration"
      - "Oui : FastAPI génère tout le back-office à partir de la documentation OpenAPI des routes"
    why: "FastAPI excelle pour une API. Pour une application complète, Django fournit tout d'emblée."
  - id: auteur
    prompt: "Qui a créé FastAPI ?"
    answer: "Sebastián Ramírez, en 2018"
    decoys:
      - "Guido van Rossum, en 1991"
      - "La Django Software Foundation, en 2005"
    why: "FastAPI date de 2018. Guido van Rossum a créé Python ; Django est sorti en 2005."
  - id: depends
    prompt: "À quoi sert Depends dans FastAPI ?"
    answer: "Injecter une dépendance (session de base, utilisateur courant) dans une route"
    decoys:
      - "Déclarer les paquets pip dont une route a besoin pour démarrer"
      - "Ordonner l'exécution des routes au démarrage de l'application"
    why: "Le système d'injection de dépendances de FastAPI appelle la fonction passée à Depends et fournit son résultat à la route ; c'est le moyen standard de partager base, authentification ou réglages."
  - id: decorateur-route
    prompt: "Comment déclare-t-on une route GET dans FastAPI ?"
    answer: "Avec @app.get(\"/chemin\") sur une fonction"
    decoys:
      - "Dans un fichier routes.yaml lu au démarrage"
      - "En héritant d'une classe GetView par route"
    why: "Les routes sont des fonctions décorées par la méthode HTTP (@app.get, @app.post…), sans fichier de routage séparé."
  - id: url-docs
    prompt: "À quelle URL une application FastAPI sert-elle par défaut sa documentation Swagger UI ?"
    answer: "/docs"
    decoys:
      - "/admin"
      - "/redoc"
      - "/swagger-ui"
    why: "Swagger UI est sur /docs et ReDoc sur /redoc, tous deux générés depuis le schéma /openapi.json. Il n'y a pas d'administration."
  - id: erreur-422
    prompt: "Que renvoie FastAPI quand le corps d'une requête ne respecte pas le modèle Pydantic déclaré ?"
    answer: "Une erreur 422 qui détaille les champs invalides"
    decoys:
      - "Une erreur 500 accompagnée de la trace Python complète"
      - "Une réponse 200, avec les champs invalides mis à null"
    why: "La validation échoue avant d'appeler la fonction, et FastAPI répond 422 avec la liste des erreurs par champ."
  - id: uvicorn
    prompt: "Avec quel type de serveur lance-t-on une application FastAPI ?"
    answer: "Un serveur ASGI, comme Uvicorn"
    decoys:
      - "Un serveur WSGI synchrone, comme Gunicorn sans worker ASGI"
      - "Apache avec le module mod_php"
    why: "FastAPI est une application ASGI : Uvicorn (ou Hypercorn) la sert. Gunicorn ne convient qu'avec des workers Uvicorn."
  - id: route-def
    prompt: "Une route FastAPI déclarée avec def, sans async : comment est-elle exécutée ?"
    answer: "Dans un pool de threads, sans bloquer la boucle d'événements"
    decoys:
      - "Directement dans la boucle d'événements, qu'elle bloque à chaque appel"
      - "Jamais : FastAPI refuse de démarrer si une route n'est pas async"
    why: "FastAPI exécute les routes def dans un pool de threads. Le danger vient du code bloquant appelé dans une route async def."
  - id: httpexception
    prompt: "Comment renvoyer une erreur 404 depuis une route FastAPI ?"
    answer: "Lever HTTPException(status_code=404)"
    decoys:
      - "Retourner la chaîne \"404\" depuis la route"
      - "Appeler abort(404), importé de Flask"
    why: "Lever HTTPException interrompt la route et produit la réponse d'erreur JSON ; retourner une chaîne donnerait une réponse 200."
  - id: response-model
    prompt: "À quoi sert le paramètre response_model d'une route ?"
    answer: "Valider et filtrer la réponse selon un modèle, par exemple pour cacher un mot de passe"
    decoys:
      - "Choisir l'algorithme de compression appliqué à la réponse envoyée au client"
      - "Associer à la route la table de base de données qu'elle doit interroger"
    why: "response_model ne garde que les champs du modèle de sortie et les documente dans OpenAPI : un champ sensible de l'objet interne n'est pas renvoyé."
  - id: parametre-requete
    prompt: "Dans @app.get(\"/items/{item_id}\"), la fonction a aussi un paramètre q: str absent du chemin. Qu'est-ce que q ?"
    answer: "Un paramètre de requête (query string)"
    decoys:
      - "Un champ du corps JSON de la requête"
      - "Un en-tête HTTP de la requête"
    why: "Un paramètre de type simple qui ne figure pas dans le chemin est lu dans la query string ; un modèle Pydantic serait lu dans le corps."
  - id: basemodel
    prompt: "Comment déclare-t-on le corps JSON attendu par une route FastAPI ?"
    answer: "Avec une classe qui hérite de pydantic.BaseModel"
    decoys:
      - "Avec un dictionnaire Python qui décrit chaque champ et son type"
      - "Avec un schéma JSON passé en chaîne au décorateur de la route"
    why: "On type le paramètre avec un modèle Pydantic : FastAPI lit le corps, le valide et en dérive le schéma OpenAPI."
  - id: background-tasks
    prompt: "Que permet BackgroundTasks dans FastAPI ?"
    answer: "Lancer une tâche légère après l'envoi de la réponse"
    decoys:
      - "Distribuer des calculs lourds sur plusieurs machines, comme Celery"
      - "Planifier des tâches récurrentes qui tournent à heure fixe"
    why: "BackgroundTasks s'exécute dans le même processus, après la réponse (envoyer un e-mail…). Pour du lourd ou du distribué, la doc renvoie vers Celery."
  - id: apirouter
    prompt: "À quoi sert APIRouter ?"
    answer: "Découper les routes en modules, inclus dans l'application"
    decoys:
      - "Répartir la charge entre plusieurs instances de l'API"
      - "Rediriger les requêtes vers une API externe"
    why: "Chaque module déclare ses routes sur un APIRouter, puis app.include_router() les monte, avec un préfixe et des tags."
  - id: testclient
    prompt: "Comment tester une application FastAPI sans lancer de serveur ?"
    answer: "Avec TestClient, qui appelle l'application directement"
    decoys:
      - "Uniquement avec curl, sur un serveur lancé à part"
      - "Avec Selenium, en pilotant la page /docs du navigateur"
    why: "TestClient (fourni par Starlette) envoie des requêtes à l'application en mémoire, dans des tests pytest ordinaires."
  - id: cors
    prompt: "Un front servi sur un autre domaine doit appeler l'API FastAPI. Que faut-il ajouter ?"
    answer: "Le middleware CORSMiddleware"
    decoys:
      - "Une désactivation de la validation Pydantic"
      - "L'option --cors-all au lancement d'Uvicorn"
    why: "Le navigateur exige des en-têtes CORS ; CORSMiddleware les ajoute selon les origines autorisées. La validation n'a rien à voir."
  - id: websockets
    prompt: "FastAPI gère-t-il les WebSockets ?"
    answer: "Oui, avec @app.websocket, grâce à Starlette"
    decoys:
      - "Non, il faut ajouter Django Channels et une couche Redis"
      - "Seulement avec un serveur Node.js à côté"
    why: "ASGI prend en charge les WebSockets, et FastAPI expose les routes WebSocket de Starlette."
  - id: fastapi-security
    prompt: "Que fournit le module fastapi.security ?"
    answer: "Des briques comme OAuth2PasswordBearer, intégrées à la doc OpenAPI"
    decoys:
      - "Un système complet de comptes, avec administration et tables intégrées"
      - "Un pare-feu applicatif qui bloque les adresses IP suspectes"
    why: "fastapi.security fournit des schémas d'authentification à utiliser avec Depends ; la gestion des comptes reste à écrire ou à confier à un service."
  - id: status-code
    prompt: "Comment une route de création FastAPI répond-elle 201 au lieu de 200 ?"
    answer: "Avec status_code=201 dans le décorateur"
    decoys:
      - "En retournant un tuple (données, 201), comme dans Flask"
      - "En nommant la fonction avec le préfixe create_"
    why: "Le code par défaut se fixe dans le décorateur et apparaît dans la doc. Un tuple serait sérialisé tel quel en liste JSON."
  - id: lifespan
    prompt: "Où initialiser une ressource partagée (pool de connexions, modèle ML) au démarrage d'une application FastAPI ?"
    answer: "Dans la fonction lifespan passée à FastAPI()"
    decoys:
      - "Dans chaque route, à chaque requête reçue"
      - "Dans un fichier startup.sql exécuté par Uvicorn"
    why: "lifespan exécute du code avant le démarrage et après l'arrêt ; il remplace les anciens gestionnaires on_event."
  - id: dependance-yield
    prompt: "Dans une dépendance FastAPI, à quoi sert yield ?"
    answer: "À exécuter du nettoyage après la réponse, comme fermer une session"
    decoys:
      - "À rendre la dépendance asynchrone sans écrire async def"
      - "À renvoyer la réponse en streaming, morceau par morceau"
    why: "Le code avant yield prépare la ressource, le code après s'exécute à la fin du traitement : c'est le patron classique pour une session de base."
  - id: sqlmodel
    prompt: "Qu'est-ce que SQLModel ?"
    answer: "Une bibliothèque du créateur de FastAPI, qui combine SQLAlchemy et Pydantic"
    decoys:
      - "L'ORM intégré à FastAPI depuis sa toute première version publique"
      - "Un langage de requête propre à FastAPI, compilé ensuite en SQL standard"
    why: "SQLModel, de Sebastián Ramírez, permet d'écrire une seule classe pour la table et le modèle d'API ; c'est un paquet séparé, FastAPI n'a pas d'ORM."
---
