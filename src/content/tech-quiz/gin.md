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
  - id: contexte-handler
    prompt: "Quel argument reçoit chaque handler Gin ?"
    answer: "Un *gin.Context, qui regroupe requête, réponse et paramètres"
    decoys:
      - "Un *http.Request seul, la réponse étant renvoyée par return"
      - "Un objet Session global, partagé entre toutes les requêtes"
    why: "Le contexte de Gin donne accès à la requête, aux paramètres et aux méthodes d'écriture de la réponse. Il est propre à chaque requête, jamais global."
  - id: param-chemin
    prompt: "Avec Gin, comment lire le paramètre id d'une route déclarée /users/:id ?"
    answer: "c.Param(\"id\")"
    decoys:
      - "c.Query(\"id\")"
      - "c.PostForm(\"id\")"
    why: "c.Param lit les segments du chemin déclarés avec « : ». c.Query lit la chaîne de requête, c.PostForm les champs d'un formulaire."
  - id: query-string
    prompt: "Avec Gin, comment lire le paramètre page de l'URL /articles?page=2 ?"
    answer: "c.Query(\"page\")"
    decoys:
      - "c.Param(\"page\")"
      - "c.GetHeader(\"page\")"
    why: "La partie après « ? » se lit avec c.Query. c.Param ne lit que les paramètres du chemin, c.GetHeader les en-têtes HTTP."
  - id: default-vs-new
    prompt: "Quelle différence entre gin.Default() et gin.New() ?"
    answer: "Default ajoute les middlewares Logger et Recovery, New part d'un moteur vide"
    decoys:
      - "New active le mode release, Default le mode debug, sans aucun middleware"
      - "Default démarre un serveur HTTPS, New un serveur HTTP sans chiffrement"
    why: "gin.Default() est gin.New() plus deux middlewares : journalisation et récupération des panics. Le mode et le protocole se règlent ailleurs."
  - id: recovery
    prompt: "Que fait le middleware Recovery de Gin ?"
    answer: "Il intercepte la panic d'un handler et répond 500 au lieu d'arrêter le serveur"
    decoys:
      - "Il relance automatiquement chaque requête échouée vers une autre instance du service"
      - "Il restaure l'état de la base de données après une transaction échouée"
    why: "Sans lui, une panic dans un handler ferait tomber le traitement. Gin ne gère ni la répartition de charge ni les transactions."
  - id: c-next
    prompt: "Dans un middleware Gin, que fait c.Next() ?"
    answer: "Il exécute la suite de la chaîne de handlers, puis rend la main au middleware"
    decoys:
      - "Il redirige le client vers la route déclarée juste après dans le routeur"
      - "Il passe à la requête suivante dans la file d'attente du serveur HTTP"
    why: "Le code placé après c.Next() s'exécute une fois le handler terminé : c'est ainsi qu'un middleware mesure la durée d'une requête."
  - id: abort
    prompt: "Comment un middleware d'authentification Gin empêche-t-il le handler de s'exécuter ?"
    answer: "En appelant c.AbortWithStatus (ou c.Abort), qui stoppe la suite de la chaîne"
    decoys:
      - "En retournant false depuis la fonction du middleware, ce qui annule la route"
      - "En appelant os.Exit, qui ferme proprement la connexion du client en cours"
    why: "Les middlewares Gin ne renvoient rien : c'est Abort qui interrompt la chaîne. os.Exit arrêterait tout le programme."
  - id: groupes-routes
    prompt: "À quoi sert router.Group(\"/api/v1\") dans Gin ?"
    answer: "Regrouper des routes sous un préfixe commun, avec leurs propres middlewares"
    decoys:
      - "Lancer un second serveur HTTP, sur un autre port, pour ces routes"
      - "Répartir ces routes entre plusieurs instances du service derrière un proxy"
    why: "Un groupe factorise le préfixe et les middlewares (authentification d'une partie de l'API, par exemple), dans le même serveur."
  - id: c-json
    prompt: "Dans un handler Gin, que fait c.JSON(http.StatusOK, data) ?"
    answer: "Il sérialise data en JSON et l'écrit dans la réponse, avec le code 200"
    decoys:
      - "Il lit le corps JSON de la requête et le copie dans la variable data"
      - "Il valide data contre le schéma JSON déclaré pour la route courante"
    why: "c.JSON écrit la réponse. Lire le JSON entrant relève de la liaison (ShouldBindJSON)."
  - id: gin-h
    prompt: "Qu'est-ce que gin.H ?"
    answer: "Un raccourci pour une map de chaînes vers des valeurs quelconques"
    decoys:
      - "Le type des en-têtes HTTP, prédéfini pour les réponses JSON de Gin"
      - "Le gestionnaire principal de routes, créé par gin.Default()"
    why: "gin.H permet d'écrire vite une réponse JSON, comme c.JSON(200, gin.H{\"ok\": true}). Les en-têtes et le moteur ont leurs propres types."
  - id: balise-required
    prompt: "Avec la liaison de Gin, comment rendre obligatoire un champ d'une structure ?"
    answer: "Avec la balise de structure binding:\"required\""
    decoys:
      - "Avec l'annotation @Required placée au-dessus du champ"
      - "En déclarant le champ avec le mot-clé required de Go"
    why: "Gin lit les balises de structure pour valider. Go n'a ni annotations ni mot-clé required."
  - id: should-bind
    prompt: "Quelle différence entre c.ShouldBindJSON et c.BindJSON dans Gin ?"
    answer: "ShouldBindJSON renvoie l'erreur au code, BindJSON répond lui-même 400"
    decoys:
      - "ShouldBindJSON ignore les champs inconnus, BindJSON les ajoute à la structure"
      - "ShouldBindJSON valide sans lire le corps, BindJSON lit le corps sans valider"
    why: "Les deux lisent et valident. Avec ShouldBind, on choisit soi-même la réponse d'erreur ; Bind interrompt la requête avec un 400."
  - id: validator
    prompt: "Sur quelle bibliothèque repose la validation des structures dans Gin ?"
    answer: "go-playground/validator"
    decoys:
      - "Zod, appelée via un pont JavaScript"
      - "Hibernate Validator, porté en Go"
    why: "Les règles des balises binding sont celles de go-playground/validator. Zod est une bibliothèque TypeScript, Hibernate Validator une bibliothèque Java."
  - id: mode-release
    prompt: "Comment passer Gin en mode production ?"
    answer: "Avec GIN_MODE=release ou gin.SetMode(gin.ReleaseMode)"
    decoys:
      - "En compilant le binaire avec l'option go build -prod"
      - "En remplaçant gin.Default() par l'appel gin.Production()"
    why: "Le mode release coupe les messages de débogage. go build n'a pas d'option -prod et gin.Production() n'existe pas."
  - id: run
    prompt: "Que fait router.Run(\":8080\") dans une application Gin ?"
    answer: "Il démarre le serveur HTTP sur le port 8080"
    decoys:
      - "Il compile l'application puis la lance dans un conteneur sur le port 8080"
      - "Il exécute les tests de toutes les routes sur le port 8080"
    why: "Run est un raccourci vers le serveur HTTP de la bibliothèque standard. Compilation et tests passent par go build et go test."
  - id: http-handler
    prompt: "Peut-on confier un moteur Gin à un http.Server de la bibliothèque standard ?"
    answer: "Oui : le moteur Gin implémente l'interface http.Handler"
    decoys:
      - "Non : Gin réimplémente le protocole HTTP sans utiliser net/http"
      - "Seulement derrière un proxy Nginx qui traduit les requêtes pour Gin"
    why: "Gin s'appuie sur net/http : on peut régler soi-même le serveur (délais, TLS) et lui passer le moteur."
  - id: set-get
    prompt: "Dans Gin, comment un middleware transmet-il l'utilisateur authentifié au handler ?"
    answer: "Avec c.Set(\"user\", u), que le handler relit avec c.Get(\"user\")"
    decoys:
      - "Avec une variable globale du paquet, que le handler lit ensuite"
      - "En ajoutant l'utilisateur comme paramètre dans le chemin de la route"
    why: "Le contexte porte des valeurs propres à la requête. Une variable globale serait partagée entre requêtes concurrentes."
  - id: use-global
    prompt: "Que fait router.Use(monMiddleware) sur le moteur Gin ?"
    answer: "Il ajoute un middleware global, plutôt qu'à une seule route ou un seul groupe"
    decoys:
      - "Il remplace le routeur de Gin par celui fourni par le middleware"
      - "Il déclare le middleware comme dépendance du module dans le fichier go.mod"
    why: "Use enregistre des middlewares dans la chaîne commune. Les dépendances de module se gèrent avec go get, pas dans le code."
  - id: copie-contexte
    prompt: "Un handler Gin lance une goroutine qui utilise le contexte après la réponse. Que recommande la documentation ?"
    answer: "Travailler sur une copie du contexte, obtenue avec c.Copy()"
    decoys:
      - "Garder le contexte original, réservé à cette requête pour toujours"
      - "Appeler c.Next() dans la goroutine pour prolonger la durée de la requête"
    why: "Gin réutilise ses contextes d'une requête à l'autre : après la réponse, l'original peut servir à une autre requête."
  - id: fichiers-statiques
    prompt: "Comment servir un dossier de fichiers statiques avec Gin ?"
    answer: "router.Static(\"/assets\", \"./assets\")"
    decoys:
      - "router.Files(\"/assets\"), une seule fois"
      - "c.Static(\"./assets\"), dans chaque handler"
    why: "Static associe un préfixe d'URL à un dossier. Il se déclare sur le routeur, pas sur le contexte d'une requête."
---
