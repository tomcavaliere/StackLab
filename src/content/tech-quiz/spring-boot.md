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
---
