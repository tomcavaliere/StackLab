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
---
