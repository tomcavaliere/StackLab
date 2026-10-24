---
questions:
  - id: auto-configuration
    prompt: "Quel est le principe clé de Spring Boot ?"
    answer: "L'auto-configuration, à partir des dépendances présentes"
    decoys:
      - "Le routage déduit de l'arborescence des fichiers du projet"
      - "La convention de nommage des tables"
    why: "Spring Boot configure ce qu'il faut selon les dépendances du projet. Le routage par fichiers, c'est Next.js."
  - id: serveur-embarque
    prompt: "Quel serveur web Spring Boot embarque-t-il par défaut ?"
    answer: "Tomcat"
    decoys:
      - "Nginx"
      - "Express"
    why: "Le serveur est embarqué dans l'application ; pas besoin d'en installer un à part."
  - id: jar
    prompt: "Que produit typiquement le build d'une application Spring Boot ?"
    answer: "Un JAR exécutable, serveur web compris"
    decoys:
      - "Toujours un binaire natif, sans JVM"
      - "Un dossier de fichiers PHP"
    why: "Un seul fichier à lancer avec Java. La compilation native (GraalVM) est une option."
  - id: actuator
    prompt: "À quoi sert l'Actuator ?"
    answer: "Exposer la santé, les métriques et les informations de build en production"
    decoys:
      - "Gérer l'authentification des utilisateurs et leurs droits d'accès aux routes"
      - "Générer les migrations de la base"
    why: "L'Actuator fournit de quoi exploiter l'application. L'authentification relève de Spring Security."
  - id: spring
    prompt: "Qu'apporte le framework Spring (2003), sur lequel repose Spring Boot ?"
    answer: "L'injection de dépendances et un très large écosystème"
    decoys:
      - "Un moteur de rendu React côté serveur, écrit en Java"
      - "Un orchestrateur de conteneurs"
    why: "Accès aux données, sécurité, messagerie : l'écosystème Spring est vaste. Spring Boot le rend simple à configurer."
  - id: securite
    prompt: "Quel module couvre la sécurité ?"
    answer: "Spring Security"
    decoys:
      - "Spring Data"
      - "L'Actuator"
    why: "Spring Data couvre l'accès aux données, l'Actuator l'exploitation."
  - id: kafka
    prompt: "Comment intégrer Kafka dans une application Spring Boot ?"
    answer: "Avec Spring for Apache Kafka"
    decoys:
      - "Avec Celery"
      - "En écrivant un client réseau à la main"
    why: "Producteurs, consommateurs et configuration sont fournis et intégrés."
  - id: serverless
    prompt: "Des fonctions serverless qui démarrent très souvent : Spring Boot convient-il ?"
    answer: "Mal : le démarrage et la mémoire de la JVM pèsent, sauf compilation native avec GraalVM"
    decoys:
      - "Très bien : la JVM démarre instantanément"
      - "Pas du tout : Spring Boot ne peut pas tourner sur une plateforme cloud"
    why: "Le coût de démarrage de la JVM se paie à chaque nouvelle instance."
  - id: revers
    prompt: "Quel est le revers de l'auto-configuration ?"
    answer: "Elle peut masquer ce qui se passe : déboguer demande de bien comprendre Spring"
    decoys:
      - "Elle oblige à tout configurer en XML, fichier par fichier, comme avant Spring Boot"
      - "Elle désactive les tests automatiques"
    why: "Ce qui est configuré automatiquement n'est écrit nulle part dans le projet."
  - id: mvp
    prompt: "MVP d'une petite équipe sans expérience de la JVM : Spring Boot est-il le plus rapide ?"
    answer: "Non : la courbe d'apprentissage de Spring est réelle"
    decoys:
      - "Oui : c'est le framework le plus rapide à apprendre"
      - "Oui : il n'y a rien à apprendre grâce à l'auto-configuration"
    why: "Spring Boot vise les back-ends d'entreprise à longue durée de vie, avec une équipe Java ou Kotlin."
  - id: starters
    prompt: "Que sont les « starters » de Spring Boot, comme spring-boot-starter-web ?"
    answer: "Des dépendances groupées qui apportent tout le nécessaire pour un usage"
    decoys:
      - "Des modèles de projet complets, générés en ligne de commande, un par usage"
      - "Des scripts shell qui démarrent le serveur web en production"
    why: "Un starter tire d'un coup les bibliothèques cohérentes d'un usage (web, données, sécurité). L'auto-configuration fait ensuite le reste."
  - id: initializr
    prompt: "À quoi sert Spring Initializr (start.spring.io) ?"
    answer: "Générer un squelette de projet avec les dépendances choisies"
    decoys:
      - "Déployer l'application sur l'hébergement cloud fourni par Spring"
      - "Surveiller les métriques d'une application déjà en production"
    why: "On choisit langage, outil de build et starters, et l'on récupère un projet prêt à compiler. La surveillance relève de l'Actuator."
  - id: annotation-application
    prompt: "Que regroupe l'annotation @SpringBootApplication ?"
    answer: "@Configuration, @EnableAutoConfiguration et @ComponentScan"
    decoys:
      - "@Controller, @Service et @Repository"
      - "@Entity, @Table et @Id"
    why: "Elle marque la classe principale : configuration, auto-configuration et détection des composants. Les autres annotations décrivent des composants ou des entités JPA."
  - id: restcontroller
    prompt: "Dans Spring Boot, quelle annotation déclare une classe qui renvoie les réponses JSON d'une API REST ?"
    answer: "@RestController"
    decoys:
      - "@Repository"
      - "@Configuration"
      - "@EnableWebEndpoints"
    why: "@RestController combine @Controller et @ResponseBody : le retour des méthodes est sérialisé, en JSON par défaut."
  - id: getmapping
    prompt: "Dans Spring Boot, comment associer une méthode à la requête GET /users/{id} ?"
    answer: "@GetMapping(\"/users/{id}\") et un paramètre @PathVariable"
    decoys:
      - "@Route(\"GET /users/:id\") et un paramètre annoté @Param"
      - "@RequestBody(\"/users/{id}\") et un paramètre @Query"
    why: "@GetMapping déclare la route, @PathVariable lit le segment {id}. @RequestBody sert à lire le corps de la requête."
  - id: application-properties
    prompt: "Où règle-t-on par défaut la configuration d'une application Spring Boot (port, base de données…) ?"
    answer: "Dans application.properties ou application.yml"
    decoys:
      - "Dans un fichier web.xml, obligatoire"
      - "Dans le pom.xml, section <config>"
    why: "Spring Boot lit ces fichiers, que l'on peut surcharger par variables d'environnement. Le web.xml n'est plus nécessaire."
  - id: profils
    prompt: "Dans Spring Boot, à quoi servent les profils (spring.profiles.active) ?"
    answer: "Charger une configuration différente selon l'environnement : dev, test, prod"
    decoys:
      - "Mesurer le temps d'exécution de chaque méthode pour trouver les lenteurs en production"
      - "Attribuer des rôles et des permissions aux utilisateurs connectés"
    why: "Un fichier application-prod.yml, par exemple, n'est chargé qu'avec le profil prod. Les rôles relèvent de Spring Security."
  - id: injection-constructeur
    prompt: "Dans Spring, quelle forme d'injection de dépendances est recommandée ?"
    answer: "L'injection par le constructeur"
    decoys:
      - "L'injection dans un champ privé annoté @Autowired"
      - "La recherche manuelle dans un annuaire global"
    why: "Par le constructeur, les dépendances sont explicites, peuvent être final et se remplacent facilement en test."
  - id: jpa-repository
    prompt: "Qu'obtient-on en déclarant une interface qui étend JpaRepository de Spring Data JPA ?"
    answer: "Les opérations CRUD sans implémentation à écrire"
    decoys:
      - "Un schéma GraphQL généré à partir des entités Java"
      - "Une base embarquée qui remplace PostgreSQL en production"
    why: "Spring Data génère l'implémentation à l'exécution. Il s'appuie sur la base configurée, il ne la remplace pas."
  - id: requete-derivee
    prompt: "Que fait une méthode findByEmail(String email) déclarée dans un repository Spring Data ?"
    answer: "Spring Data en déduit la requête qui cherche selon le champ email"
    decoys:
      - "Rien tant qu'on n'a pas écrit son corps en SQL à la main"
      - "Elle envoie un e-mail de vérification à l'adresse donnée"
    why: "Le nom de la méthode suffit à générer la requête. Pour un cas complexe, on peut l'écrire avec @Query."
  - id: devtools
    prompt: "Que fait spring-boot-devtools pendant le développement ?"
    answer: "Il redémarre automatiquement l'application quand le code change"
    decoys:
      - "Il génère les tests unitaires de chaque contrôleur de l'application"
      - "Il compile l'application en binaire natif à chaque modification"
    why: "Devtools accélère la boucle de développement. La compilation native passe par GraalVM, pas par devtools."
  - id: langages
    prompt: "En quels langages peut-on écrire une application Spring Boot ?"
    answer: "Java, Kotlin ou Groovy"
    decoys:
      - "Java uniquement"
      - "Java ou Scala uniquement"
    why: "Spring Boot tourne sur la JVM et prend officiellement en charge Kotlin et Groovy en plus de Java."
  - id: outils-build
    prompt: "Quels outils de build Spring Boot prend-il en charge officiellement ?"
    answer: "Maven et Gradle"
    decoys:
      - "npm et Yarn"
      - "Make et CMake"
      - "Ant et Bazel uniquement"
    why: "Spring Boot fournit un plugin pour chacun, qui produit le JAR exécutable. npm et Make servent d'autres écosystèmes."
  - id: auto-config-conditionnelle
    prompt: "Sur quoi repose techniquement l'auto-configuration de Spring Boot ?"
    answer: "Des configurations conditionnelles, activées selon le classpath et les propriétés"
    decoys:
      - "Un fichier XML central qui liste chaque composant à créer au démarrage"
      - "Une analyse du code source au moment de la compilation par javac"
    why: "Des annotations comme @ConditionalOnClass n'activent une configuration que si une bibliothèque est présente. Tout se décide au démarrage."
  - id: surcharger-bean
    prompt: "Comment remplacer un composant que Spring Boot a configuré automatiquement ?"
    answer: "En déclarant son propre bean : l'auto-configuration s'efface"
    decoys:
      - "En modifiant puis recompilant le code source de Spring Boot"
      - "C'est impossible : l'auto-configuration ne se change pas après le build"
    why: "Beaucoup d'auto-configurations ne s'appliquent qu'en l'absence d'un bean du même type (@ConditionalOnMissingBean)."
  - id: actuator-health
    prompt: "Quel endpoint de l'Actuator indique si l'application est en bonne santé ?"
    answer: "/actuator/health"
    decoys:
      - "/actuator/status"
      - "/health-check"
    why: "/actuator/health sert typiquement aux sondes d'un orchestrateur comme Kubernetes."
  - id: webflux
    prompt: "Quel module Spring propose un modèle web réactif, non bloquant ?"
    answer: "Spring WebFlux"
    decoys:
      - "Spring MVC"
      - "Spring Batch"
      - "Spring Reactor MVC"
    why: "Spring MVC suit le modèle classique d'un thread par requête ; Spring Batch traite des lots de données."
  - id: springboottest
    prompt: "Que fait l'annotation @SpringBootTest ?"
    answer: "Elle démarre le contexte de l'application pour un test d'intégration"
    decoys:
      - "Elle génère automatiquement un test pour chaque contrôleur"
      - "Elle exécute le test contre l'instance de production"
    why: "Le test dispose alors des vrais beans de l'application. Elle n'écrit aucun test à la place du développeur."
  - id: bean
    prompt: "Qu'est-ce qu'un bean dans Spring ?"
    answer: "Un objet créé et géré par le conteneur Spring, injectable ailleurs"
    decoys:
      - "Un fichier de configuration au format JSON, chargé une fois au démarrage"
      - "Une table de base de données associée à une classe Java"
    why: "Le conteneur instancie les beans et leur fournit leurs dépendances. Une classe associée à une table est une entité JPA."
  - id: annee-sortie
    prompt: "En quelle année Spring Boot est-il sorti ?"
    answer: "2014"
    decoys:
      - "2003"
      - "2020"
    why: "Spring Boot (2014) est venu simplifier la configuration du framework Spring, sorti en 2003."
---
