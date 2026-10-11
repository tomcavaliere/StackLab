---
questions:
  - id: bytecode
    prompt: "Vers quoi le code Java est-il compilé ?"
    answer: "Le bytecode de la JVM"
    decoys:
      - "Un binaire natif autonome, comme en Go"
      - "Du JavaScript"
    why: "Java compile vers un bytecode exécuté par la machine virtuelle Java (JVM). La compilation native existe (GraalVM), mais ce n'est pas le mode standard."
  - id: portabilite
    prompt: "Pourquoi un même programme Java tourne-t-il sur des systèmes différents ?"
    answer: "Il suffit d'une JVM sur le système cible"
    decoys:
      - "Le compilateur produit automatiquement un binaire par système"
      - "Java s'exécute dans le navigateur"
    why: "Le bytecode est le même partout ; c'est la JVM qui s'adapte au système."
  - id: jit
    prompt: "D'où viennent les bonnes performances de la JVM ?"
    answer: "Elle compile à la volée (JIT) le code le plus utilisé"
    decoys:
      - "Elle interprète chaque instruction sans optimisation"
      - "Elle désactive la gestion automatique de la mémoire"
    why: "Le compilateur JIT transforme le code le plus exécuté en code machine optimisé, pendant l'exécution."
  - id: memoire
    prompt: "Comment la mémoire est-elle gérée en Java ?"
    answer: "Par un ramasse-miettes"
    decoys:
      - "Manuellement, avec malloc et free"
      - "Par un système de possession vérifié à la compilation"
    why: "Le ramasse-miettes libère la mémoire inutilisée. La possession vérifiée à la compilation, c'est Rust."
  - id: threads-virtuels
    prompt: "Qu'apportent les threads virtuels de Java 21 ?"
    answer: "De très nombreuses tâches concurrentes, avec un code bloquant classique"
    decoys:
      - "L'exécution du code Java sur GPU"
      - "La suppression de la JVM au profit d'un binaire natif, comme en Go ou en Rust"
    why: "Les threads virtuels sont légers : on garde un code séquentiel lisible tout en gérant beaucoup de tâches simultanées."
  - id: ecosysteme-data
    prompt: "Quels outils data tournent sur la JVM ?"
    answer: "Kafka, Hadoop et Spark"
    decoys:
      - "pandas, NumPy et scikit-learn"
      - "dbt, DuckDB et Airflow"
    why: "Une grande partie de l'écosystème data historique est sur la JVM (Spark est écrit en Scala). pandas et dbt sont en Python, DuckDB en C++."
  - id: serverless
    prompt: "Pourquoi Java est-il moins adapté aux fonctions serverless à démarrage fréquent ?"
    answer: "La JVM démarre plus lentement qu'un binaire Go, sauf compilation native avec GraalVM"
    decoys:
      - "Java ne peut pas s'exécuter sur les plateformes serverless, qui n'acceptent que des binaires natifs"
      - "Les fonctions serverless n'acceptent que du Python"
    why: "Java fonctionne en serverless, mais le démarrage de la JVM pèse quand les instances démarrent souvent."
  - id: kotlin
    prompt: "Quel langage plus concis tourne sur la même JVM que Java ?"
    answer: "Kotlin"
    decoys:
      - "TypeScript"
      - "Swift"
    why: "Kotlin tourne sur la JVM et appelle directement le code Java ; la fiche le cite pour une équipe sans culture JVM."
  - id: entreprise
    prompt: "Pourquoi Java convient-il aux back-ends d'entreprise à longue durée de vie ?"
    answer: "Des versions LTS maintenues sur plusieurs années, un typage statique et un outillage très mûr"
    decoys:
      - "Il change de syntaxe à chaque version, sans compatibilité ascendante, ce qui force à moderniser le code"
      - "C'est le langage le plus concis du marché"
    why: "Stabilité, typage et outillage (IDE, profilage, refactoring) rendent les grosses bases de code maintenables par de grandes équipes."
  - id: mvp
    prompt: "Un MVP à livrer très vite par une petite équipe : Java est-il le choix le plus rapide ?"
    answer: "Non : le code est plus verbeux qu'en Python ou en Ruby"
    decoys:
      - "Oui : Java est le langage le plus concis"
      - "Non : Java ne permet pas d'écrire d'application web"
    why: "Java est solide mais verbeux ; pour aller vite, Python ou Ruby avec un framework complet vont plus loin en moins de code."
---
