---
questions:
  - id: binaire
    prompt: "Que produit le compilateur Go ?"
    answer: "Un binaire unique, sans dépendance à installer sur la machine cible"
    decoys:
      - "Du bytecode pour la JVM"
      - "Du JavaScript exécuté par V8, comme Node.js, pour partager le moteur"
    why: "Déployer un programme Go, c'est copier un fichier. C'est l'un de ses grands atouts pour les services et les outils."
  - id: goroutines
    prompt: "Que sont les goroutines ?"
    answer: "Des tâches légères, ordonnancées par le runtime Go"
    decoys:
      - "Des threads du système d'exploitation, un par requête"
      - "Des processus séparés qui communiquent par fichiers"
    why: "Les goroutines sont bien plus légères que des threads système : un serveur peut en lancer énormément."
  - id: canaux
    prompt: "Comment les goroutines communiquent-elles typiquement ?"
    answer: "Par des canaux (channels)"
    decoys:
      - "Par une instance Redis partagée"
      - "Par des callbacks imbriqués"
    why: "La concurrence fait partie du langage : goroutines et canaux permettent un code séquentiel lisible."
  - id: gofmt
    prompt: "Que fait gofmt ?"
    answer: "Il impose un formatage standard du code"
    decoys:
      - "Il compile le code en WebAssembly"
      - "Il gère les dépendances du projet et leurs versions"
    why: "Un seul formatage pour tout le monde : fini les débats de style, le code Go se ressemble partout."
  - id: generiques
    prompt: "Quand les génériques sont-ils arrivés en Go ?"
    answer: "En 2022, avec Go 1.18"
    decoys:
      - "Dès Go 1.0, en 2012"
      - "Jamais : Go ne les prend pas en charge"
    why: "Le langage est resté volontairement petit : les génériques ne sont arrivés qu'en 2022."
  - id: outillage-cloud
    prompt: "Quels outils célèbres sont écrits en Go ?"
    answer: "Docker, Kubernetes, Prometheus et Terraform"
    decoys:
      - "Kafka, Spark, Hadoop, Cassandra et Elasticsearch"
      - "Django, Celery, Airflow et dbt"
    why: "Une grande partie de l'outillage cloud est en Go. Kafka, Spark et Hadoop tournent sur la JVM ; Django, Celery et Airflow sont en Python."
  - id: machine-learning
    prompt: "Un projet de machine learning : Go est-il un bon choix ?"
    answer: "Non : son écosystème est sans commune mesure avec celui de Python"
    decoys:
      - "Oui : PyTorch est écrit en Go"
      - "Oui : les goroutines remplacent les GPU pour entraîner les modèles"
    why: "NumPy, pandas, scikit-learn, PyTorch : la data et le ML vivent en Python."
  - id: outils-cli
    prompt: "Pourquoi Go est-il apprécié pour les outils en ligne de commande ?"
    answer: "Il n'y a qu'un binaire à distribuer"
    decoys:
      - "Il est interprété, donc rien à compiler"
      - "Il est préinstallé sur tous les systèmes"
    why: "Un binaire autonome se distribue sans demander à l'utilisateur d'installer un runtime."
  - id: origine
    prompt: "Qui a conçu Go ?"
    answer: "Google, qui l'a annoncé en 2009"
    decoys:
      - "Mozilla, qui l'a annoncé en 2010"
      - "Microsoft, qui l'a annoncé en 2012"
    why: "Go vient de Google (version 1.0 en 2012). Rust est né chez Mozilla, TypeScript chez Microsoft."
  - id: philosophie
    prompt: "Quelle est la philosophie du langage Go ?"
    answer: "Rester petit et simple : peu de mots-clés, un code facile à lire"
    decoys:
      - "Offrir plusieurs façons d'écrire chaque chose, pour laisser le choix au développeur"
      - "Miser sur la métaprogrammation et les DSL"
    why: "Go privilégie la lisibilité et la simplicité. La métaprogrammation et les DSL sont plutôt la marque de Ruby."
  - id: defer
    prompt: "En Go, que fait le mot-clé defer ?"
    answer: "Il reporte un appel à la sortie de la fonction englobante"
    decoys:
      - "Il lance l'appel dans une nouvelle goroutine, en arrière-plan"
      - "Il retarde l'appel jusqu'au prochain passage du ramasse-miettes"
    why: "defer sert typiquement à fermer un fichier ou libérer un verrou quoi qu'il arrive. Lancer une goroutine, c'est le mot-clé go."
  - id: erreurs
    prompt: "Comment une fonction Go signale-t-elle habituellement une erreur ?"
    answer: "En renvoyant une valeur error, testée par if err != nil"
    decoys:
      - "En levant une exception, à attraper avec un bloc try/catch"
      - "En renvoyant -1 et en remplissant une variable globale errno"
    why: "Go n'a pas d'exceptions : l'erreur est une valeur de retour comme une autre, traitée explicitement par l'appelant."
  - id: interfaces-implicites
    prompt: "Comment un type Go implémente-t-il une interface ?"
    answer: "Implicitement, dès qu'il possède les méthodes demandées"
    decoys:
      - "En le déclarant explicitement avec le mot-clé implements"
      - "En héritant d'une classe abstraite qui implémente l'interface"
    why: "Aucune déclaration n'est nécessaire en Go. implements est un mot-clé de Java ; Go n'a pas de classes."
  - id: composition
    prompt: "Go a-t-il des classes et de l'héritage ?"
    answer: "Non : des structures avec méthodes, composées par embarquement"
    decoys:
      - "Oui : des classes avec héritage simple, comme en Java"
      - "Oui : de l'héritage multiple entre classes, comme en C++"
    why: "Go réutilise le code par composition : une structure peut en embarquer une autre et profiter de ses méthodes."
  - id: go-mod
    prompt: "Quel fichier déclare un module Go et ses dépendances ?"
    answer: "go.mod"
    decoys:
      - "package.json"
      - "Cargo.toml"
      - "requirements.txt"
    why: "go.mod est le fichier des modules Go. Les autres appartiennent à Node.js, Rust et Python."
  - id: majuscule
    prompt: "En Go, comment rendre un identifiant visible hors de son paquet ?"
    answer: "En commençant son nom par une majuscule"
    decoys:
      - "En le précédant du mot-clé public"
      - "En l'ajoutant à la liste export du go.mod"
    why: "La casse de la première lettre fixe la visibilité : Println est exporté, println ne le serait pas. Go n'a pas de mot-clé public."
  - id: panic-recover
    prompt: "En Go, à quoi servent panic et recover ?"
    answer: "Aux situations exceptionnelles ; le cas courant passe par error"
    decoys:
      - "À la gestion d'erreur ordinaire, comme try/catch en Java"
      - "À arrêter puis relancer une goroutine restée bloquée"
    why: "Une panic signale un état irrécupérable ou un bug. Les erreurs attendues (fichier absent, réseau) se renvoient comme valeurs error."
  - id: ramasse-miettes
    prompt: "Comment Go gère-t-il la mémoire ?"
    answer: "Avec un ramasse-miettes intégré au runtime"
    decoys:
      - "À la main, avec malloc et free, comme en C"
      - "Par la possession vérifiée à la compilation, comme Rust"
    why: "Le ramasse-miettes simplifie le code au prix d'un runtime. C'est l'une des différences majeures avec Rust."
  - id: select
    prompt: "En Go, à quoi sert l'instruction select ?"
    answer: "Attendre sur plusieurs canaux et traiter la première opération prête"
    decoys:
      - "Lire une ligne d'une base SQL sans passer par un driver"
      - "Choisir la goroutine que le runtime exécutera en priorité"
    why: "select est l'équivalent d'un switch pour les canaux, utile pour combiner un délai, une annulation et un résultat."
  - id: waitgroup
    prompt: "En Go, comment attendre proprement la fin de plusieurs goroutines ?"
    answer: "Avec un sync.WaitGroup"
    decoys:
      - "Avec un time.Sleep assez long"
      - "Avec le mot-clé await devant chaque goroutine"
    why: "Le WaitGroup compte les goroutines lancées et bloque jusqu'à ce qu'elles aient toutes terminé. Un Sleep ne garantit rien ; Go n'a pas d'await."
  - id: mutex
    prompt: "En Go, comment protéger une variable partagée entre goroutines sans passer par un canal ?"
    answer: "Avec un sync.Mutex"
    decoys:
      - "Avec le mot-clé synchronized"
      - "Avec le mot-clé volatile"
    why: "Le paquet sync fournit verrous et outils de synchronisation. synchronized et volatile sont des mots-clés de Java."
  - id: detecteur-courses
    prompt: "Comment détecter des courses de données dans un programme Go ?"
    answer: "Avec le détecteur intégré : go test -race ou go run -race"
    decoys:
      - "Inutile : le compilateur Go les refuse toujours, comme en Rust"
      - "Avec gofmt -race, qui réécrit les accès concurrents"
    why: "Go ne les interdit pas à la compilation : le détecteur les repère à l'exécution. gofmt ne fait que formater."
  - id: go-test
    prompt: "Comment écrit-on les tests d'un programme Go ?"
    answer: "Dans des fichiers _test.go, avec le paquet testing, lancés par go test"
    decoys:
      - "Dans un dossier spec/, avec un framework tiers obligatoire"
      - "Dans des commentaires au-dessus des fonctions, lancés par go doc"
    why: "Les tests font partie de l'outillage standard : pas besoin de framework tiers pour commencer."
  - id: compilation-croisee
    prompt: "Comment compiler un binaire Go pour Linux depuis une machine Windows ?"
    answer: "En fixant GOOS=linux (et GOARCH) avant go build"
    decoys:
      - "C'est impossible : il faut compiler sur la machine cible"
      - "En installant un runtime Go sur la machine Linux cible"
    why: "La compilation croisée est intégrée à la chaîne d'outils. Le binaire produit n'a besoin d'aucun runtime sur la cible."
  - id: mot-cle-go
    prompt: "Comment lancer une fonction dans une nouvelle goroutine ?"
    answer: "En préfixant l'appel du mot-clé go"
    decoys:
      - "En appelant thread.start() sur la fonction"
      - "En marquant la fonction avec async"
    why: "go f() suffit à lancer f de façon concurrente. Go n'a ni objets thread à démarrer ni fonctions async."
  - id: slice
    prompt: "Quelle structure Go correspond à un tableau dynamique, qui peut grandir avec append ?"
    answer: "La slice"
    decoys:
      - "Le tableau de taille fixe [N]T"
      - "La map"
    why: "Une slice est une vue sur un tableau sous-jacent, réalloué au besoin. Un tableau [N]T a une taille fixe ; une map associe des clés à des valeurs."
  - id: valeur-zero
    prompt: "En Go, que vaut une variable déclarée sans valeur initiale ?"
    answer: "La valeur zéro de son type : 0, chaîne vide, nil…"
    decoys:
      - "Une valeur indéterminée, comme en C"
      - "Rien : le compilateur refuse une telle déclaration"
    why: "Go initialise toujours les variables. Il n'y a pas de mémoire non initialisée comme en C."
  - id: paquet-context
    prompt: "En Go, à quoi sert le paquet context ?"
    answer: "Propager annulation, délais et valeurs d'une requête entre goroutines"
    decoys:
      - "Stocker la configuration globale du programme lue au démarrage"
      - "Gérer les sessions utilisateur dans un cookie chiffré"
    why: "Un context.Context permet d'arrêter le travail lancé pour une requête quand le client abandonne ou qu'un délai expire."
  - id: compatibilite-go1
    prompt: "Quelle promesse le projet Go fait-il depuis Go 1 ?"
    answer: "Un programme Go 1 valide continue de compiler avec les versions suivantes"
    decoys:
      - "Une nouvelle version majeure, volontairement incompatible, chaque année"
      - "Une compatibilité binaire complète avec les bibliothèques écrites en C"
    why: "La promesse de compatibilité de Go 1 porte sur le code source : c'est ce qui explique l'absence de « Go 2 » incompatible."
  - id: retours-multiples
    prompt: "Combien de valeurs une fonction Go peut-elle renvoyer ?"
    answer: "Plusieurs, par exemple un résultat et une erreur"
    decoys:
      - "Une seule : il faut une structure pour en renvoyer plusieurs"
      - "Aucune : les résultats passent par des pointeurs en argument"
    why: "Les retours multiples sont la base de la gestion d'erreur en Go : valeur, err := f()."
---
