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
  - id: exceptions-verifiees
    prompt: "Qu'est-ce qu'une exception vérifiée (checked exception) en Java ?"
    answer: "Une exception que le compilateur oblige à attraper ou à déclarer avec throws"
    decoys:
      - "Une exception que la JVM ignore silencieusement si personne ne l'attrape"
      - "Une exception contrôlée par le ramasse-miettes avant d'être levée à l'exécution"
    why: "Les exceptions vérifiées (comme IOException) doivent être traitées ou déclarées, sinon le code ne compile pas. La JVM n'ignore pas une exception non attrapée : le thread s'arrête."
  - id: comparer-chaines
    prompt: "Comment comparer le contenu de deux chaînes (String) en Java ?"
    answer: "Avec la méthode equals()"
    decoys:
      - "Avec l'opérateur ==, qui compare toujours le contenu des chaînes"
      - "Avec l'opérateur ===, comme en JavaScript"
    why: "== compare les références (deux objets distincts peuvent avoir le même contenu) ; equals() compare le contenu. L'opérateur === n'existe pas en Java."
  - id: heritage-multiple
    prompt: "Une classe Java peut-elle hériter de plusieurs classes ?"
    answer: "Non : une seule superclasse, mais elle peut implémenter plusieurs interfaces"
    decoys:
      - "Oui : l'héritage multiple de classes est autorisé, comme en C++"
      - "Non : Java n'a pas d'héritage, seulement de la composition d'objets"
    why: "Java limite l'héritage de classes à une seule superclasse (extends) et compense par les interfaces (implements)."
  - id: lambdas-streams
    prompt: "Quelle version de Java a introduit les lambdas et l'API Stream ?"
    answer: "Java 8 (2014)"
    decoys:
      - "Java 5 (2004)"
      - "Java 11 (2018)"
      - "Java 17 (2021)"
    why: "Java 8 a apporté la programmation fonctionnelle (lambdas, streams). Java 5 avait introduit les génériques ; 11 et 17 sont des versions LTS plus récentes."
  - id: records
    prompt: "À quoi servent les records, finalisés en Java 16 ?"
    answer: "Déclarer en une ligne une classe de données immuable"
    decoys:
      - "Enregistrer l'historique des exécutions de la JVM dans un fichier"
      - "Déclarer une table de base de données directement dans le code"
    why: "Un record génère constructeur, accesseurs, equals, hashCode et toString pour des champs finaux. Il ne journalise rien et n'a pas de lien avec une base."
  - id: effacement-generiques
    prompt: "Que deviennent les types génériques (comme List<String>) à l'exécution en Java ?"
    answer: "Ils sont effacés : la JVM ne voit qu'une List"
    decoys:
      - "Ils sont conservés : la JVM crée une classe par type"
      - "Ils sont transformés en annotations lues par le JIT"
    why: "Java implémente les génériques par effacement de type (type erasure) : la vérification se fait à la compilation, et le bytecode ne garde pas le paramètre de type."
  - id: outils-build
    prompt: "Quels outils gèrent la compilation et les dépendances d'un projet Java ?"
    answer: "Maven et Gradle"
    decoys:
      - "npm et Yarn"
      - "pip et Poetry"
      - "Cargo et rustup"
    why: "Maven et Gradle sont les outils de build standard de la JVM. npm et Yarn servent à JavaScript, pip et Poetry à Python, Cargo à Rust."
  - id: jdk
    prompt: "Que contient le JDK, en plus de ce qu'il faut pour exécuter du Java ?"
    answer: "Le compilateur javac et les outils de développement"
    decoys:
      - "Un serveur d'applications et une base de données intégrée"
      - "Un éditeur de code graphique et un émulateur Android"
    why: "Le JDK (Java Development Kit) ajoute à l'environnement d'exécution le compilateur et les outils (débogage, documentation, empaquetage). Ni IDE, ni serveur, ni base."
  - id: openjdk
    prompt: "Qu'est-ce qu'OpenJDK ?"
    answer: "L'implémentation open-source de référence de Java"
    decoys:
      - "Un fork de Java abandonné, incompatible avec la plateforme officielle"
      - "Un framework web concurrent de Spring Boot"
    why: "OpenJDK est le projet open-source où Java est développé ; la plupart des distributions du JDK (dont celle d'Oracle) en sont issues."
  - id: rythme-versions
    prompt: "À quel rythme sortent les versions de Java depuis 2018 ?"
    answer: "Une nouvelle version tous les six mois"
    decoys:
      - "Une nouvelle version tous les cinq ans"
      - "Une nouvelle version à chaque mise à jour d'Android"
    why: "Java publie une version tous les six mois ; certaines sont désignées LTS et maintenues plusieurs années, ce qui convient aux entreprises."
  - id: null-pointer
    prompt: "Quelle exception Java signale l'accès à un membre d'une référence qui vaut null ?"
    answer: "NullPointerException"
    decoys:
      - "ClassNotFoundException"
      - "StackOverflowError"
      - "OutOfMemoryError"
    why: "Appeler une méthode sur null lève une NullPointerException à l'exécution : le typage de Java ne l'empêche pas, contrairement à Kotlin. Les autres signalent une classe introuvable, une pile ou une mémoire épuisée."
  - id: int-integer
    prompt: "Quelle différence entre int et Integer en Java ?"
    answer: "int est un type primitif, Integer un objet qui l'enveloppe"
    decoys:
      - "int est sur 64 bits, Integer sur 32 bits, pour économiser la mémoire"
      - "Aucune : ce sont deux noms du même type, au choix du développeur"
    why: "Java distingue types primitifs et objets ; les collections n'acceptent que des objets, d'où les classes enveloppes (Integer) et l'autoboxing. int fait 32 bits."
  - id: mot-cle-final
    prompt: "Que signifie le mot-clé final sur une variable Java ?"
    answer: "Elle ne peut être affectée qu'une seule fois"
    decoys:
      - "Elle est libérée par le ramasse-miettes en dernier"
      - "Elle est partagée entre toutes les instances de la classe"
    why: "Une variable final ne peut pas être réaffectée. Le partage entre instances, c'est static ; final n'a aucun effet sur le ramasse-miettes."
  - id: spring
    prompt: "Quel framework domine le développement de back-ends en Java ?"
    answer: "Spring Boot"
    decoys:
      - "Django"
      - "Ruby on Rails"
      - "Laravel"
    why: "Spring Boot est le framework de référence des services Java. Django est en Python, Rails en Ruby, Laravel en PHP."
  - id: android-historique
    prompt: "Quel rôle Java a-t-il joué pour Android ?"
    answer: "Le langage historique des applications, avant que Kotlin soit recommandé"
    decoys:
      - "Aucun : Android impose Kotlin depuis sa toute première version"
      - "Un rôle mineur : les applications Android s'écrivaient d'abord en Swift"
    why: "Les applications Android se sont écrites en Java jusqu'à ce que Google recommande Kotlin (2019). Kotlin n'existait pas aux débuts d'Android ; Swift est le langage d'Apple."
  - id: createur
    prompt: "Quelle entreprise a créé Java, et laquelle le maintient aujourd'hui ?"
    answer: "Sun en 1995 ; Oracle aujourd'hui"
    decoys:
      - "Microsoft en 1995 ; la fondation Eclipse aujourd'hui"
      - "Google en 2005 ; la fondation Apache aujourd'hui"
    why: "Java a été publié par Sun Microsystems en 1995 ; Oracle a racheté Sun et pilote aujourd'hui le langage."
  - id: synchronized
    prompt: "Que garantit le mot-clé synchronized sur une méthode Java ?"
    answer: "Un seul thread à la fois l'exécute sur un même objet"
    decoys:
      - "Elle s'exécute en parallèle sur tous les cœurs disponibles"
      - "Son résultat est mis en cache entre deux appels identiques"
    why: "synchronized pose un verrou sur l'objet : les autres threads attendent. C'est l'inverse d'une parallélisation, et rien n'est mis en cache."
  - id: methodes-par-defaut
    prompt: "Depuis Java 8, que peut contenir une interface en plus des signatures de méthodes ?"
    answer: "Des méthodes par défaut, avec une implémentation"
    decoys:
      - "Des champs d'instance modifiables, comme une classe"
      - "Des constructeurs appelés lors de l'implémentation"
    why: "Les méthodes default permettent de faire évoluer une interface sans casser les classes qui l'implémentent. Une interface n'a toujours ni constructeur ni état d'instance."
  - id: try-with-resources
    prompt: "Que fait le bloc try-with-resources en Java ?"
    answer: "Il ferme automatiquement les ressources ouvertes, même en cas d'exception"
    decoys:
      - "Il réessaie automatiquement le bloc tant qu'une exception est levée"
      - "Il alloue les ressources sur la pile plutôt que sur le tas, sans ramasse-miettes"
    why: "Les ressources déclarées dans try (...) qui implémentent AutoCloseable sont fermées à la sortie du bloc. Il n'y a ni nouvelle tentative ni changement d'allocation."
  - id: var
    prompt: "Que permet le mot-clé var depuis Java 10 ?"
    answer: "Inférer le type d'une variable locale, qui reste typée statiquement"
    decoys:
      - "Déclarer une variable au type dynamique, comme en JavaScript"
      - "Déclarer une variable globale accessible depuis toutes les classes du projet"
    why: "var laisse le compilateur déduire le type à partir de l'initialisation ; ce type est ensuite fixé. Java reste statiquement typé."
---
