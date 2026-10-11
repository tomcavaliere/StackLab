---
questions:
  - id: role
    prompt: "Qu'est-ce que Gin ?"
    answer: "Un framework HTTP léger pour Go"
    decoys:
      - "Un ORM pour Go"
      - "Un orchestrateur de conteneurs écrit en Go"
    why: "Gin ajoute routage, middlewares et validation au-dessus de la bibliothèque standard de Go."
  - id: apport
    prompt: "Qu'ajoute Gin à net/http ?"
    answer: "Paramètres et groupes de routes, middlewares, lecture et validation du JSON"
    decoys:
      - "Une machine virtuelle qui exécute le code Go plus vite que le compilateur standard"
      - "Un ORM et un système de migrations"
    why: "Ce sont les utilitaires qu'on réécrit vite avec net/http seul. Gin ne change pas le modèle de Go et ne fournit pas d'ORM."
  - id: goroutine
    prompt: "Comment Gin traite-t-il chaque requête ?"
    answer: "Dans une goroutine, selon le modèle standard de Go"
    decoys:
      - "Dans un processus système séparé"
      - "Sur une boucle d'événements à un seul thread, comme Node.js"
    why: "Gin garde le modèle de net/http : une goroutine par requête, ordonnancée par le runtime Go."
  - id: deploiement
    prompt: "Quel avantage de déploiement offre un service écrit avec Gin ?"
    answer: "Un binaire unique, qui démarre vite et consomme peu de mémoire"
    decoys:
      - "Il s'exécute dans la JVM, donc sur n'importe quel système"
      - "Il ne nécessite aucun serveur pour tourner"
    why: "Go compile en un seul binaire : c'est un bon profil pour des API à fort trafic déployées en conteneurs."
  - id: go-1-22
    prompt: "Pourquoi la bibliothèque standard peut-elle suffire pour un routage simple ?"
    answer: "Depuis Go 1.22 (2024), le routeur standard gère méthodes et paramètres de chemin"
    decoys:
      - "Gin a été intégré à la bibliothèque standard de Go"
      - "Go interdit les frameworks tiers depuis la version 1.22, au profit de la bibliothèque standard"
    why: "Le routeur de net/http s'est enrichi en 2024 : pour des besoins simples, plus besoin de framework."
  - id: application-metier
    prompt: "Une application avec beaucoup de données métier, de pages et un back-office. Gin convient-il ?"
    answer: "Mal : il faut tout assembler soi-même (ORM, migrations, authentification)"
    decoys:
      - "Très bien : Gin fournit un back-office et un ORM"
      - "Très bien : Gin génère les pages et les formulaires à partir du schéma"
    why: "Gin est un framework HTTP léger. Pour une application complète, Django, Rails ou Laravel fournissent ces briques."
  - id: usage
    prompt: "Quel est un cas d'usage typique de Gin ?"
    answer: "Une API JSON ou un microservice à fort trafic, en Go"
    decoys:
      - "Une application mobile multiplateforme, compilée en Go"
      - "Un pipeline de données planifié chaque nuit"
    why: "Performance, binaire unique, conteneurs : Gin vise les API et microservices."
  - id: alternative
    prompt: "Quelle alternative la fiche cite-t-elle, plus riche pour l'entreprise au prix d'une application plus lourde ?"
    answer: "Spring Boot"
    decoys:
      - "Express"
      - "FastAPI"
    why: "L'écosystème Java de Spring Boot couvre bien plus de besoins d'entreprise, avec la JVM en contrepartie."
  - id: equipe-sans-go
    prompt: "Une équipe sans expérience de Go doit livrer vite. Gin est-il un bon choix ?"
    answer: "Non : la fiche le range dans « Quand l'éviter »"
    decoys:
      - "Oui : Gin masque complètement le langage Go"
      - "Oui : on écrit les routes Gin en JavaScript"
    why: "Gin reste du Go : il faut d'abord apprendre le langage."
  - id: liaison
    prompt: "Que fait la liaison (binding) de Gin ?"
    answer: "Elle lit les données de la requête, par exemple du JSON, dans des structures Go et les valide"
    decoys:
      - "Elle relie chaque route à un composant React"
      - "Elle crée automatiquement une table SQL par route, avec une colonne par champ du JSON reçu"
    why: "Lier et valider le JSON entrant fait partie des utilitaires que Gin ajoute à net/http."
---
