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
---
