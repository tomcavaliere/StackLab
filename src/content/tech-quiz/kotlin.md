---
questions:
  - id: jvm
    prompt: "Sur quoi Kotlin tourne-t-il ?"
    answer: "Sur la JVM, en appelant directement le code Java, dans les deux sens"
    decoys:
      - "Sur son propre runtime, incompatible avec Java, conçu par JetBrains pour Android"
      - "Uniquement dans le navigateur"
    why: "Kotlin réutilise toutes les bibliothèques Java existantes."
  - id: references-nulles
    prompt: "Comment Kotlin traite-t-il les références nulles ?"
    answer: "Son système de types distingue les valeurs qui peuvent être nulles de celles qui ne le peuvent pas"
    decoys:
      - "Il interdit totalement la valeur null"
      - "Comme Java : les erreurs de référence nulle n'apparaissent qu'à l'exécution, en production si l'on n'a pas de chance"
    why: "Les erreurs de référence nulle sont détectées à la compilation."
  - id: android
    prompt: "Quel statut Kotlin a-t-il sur Android depuis 2019 ?"
    answer: "Le langage recommandé par Google (« Kotlin first »)"
    decoys:
      - "Il est interdit sur le Play Store au profit de Java et de Dart"
      - "Il est réservé aux jeux"
    why: "Google l'a pris en charge en 2017, puis en a fait le langage recommandé en 2019."
  - id: compose
    prompt: "En quel langage s'écrit Jetpack Compose, la boîte à outils d'interface moderne d'Android ?"
    answer: "Kotlin"
    decoys:
      - "Dart"
      - "Swift"
    why: "Dart est le langage de Flutter, Swift celui d'Apple."
  - id: coroutines
    prompt: "Que simplifient les coroutines de Kotlin ?"
    answer: "Le code asynchrone"
    decoys:
      - "La gestion des dépendances"
      - "La compilation vers JavaScript"
    why: "Les coroutines permettent d'écrire du code asynchrone comme du code séquentiel."
  - id: createur
    prompt: "Qui a créé Kotlin ?"
    answer: "JetBrains, version 1.0 en 2016"
    decoys:
      - "Google, en 2017, pour Android"
      - "Oracle, en 2014, avec Java 8"
    why: "Google l'a adopté pour Android, mais Kotlin vient de JetBrains."
  - id: adoption
    prompt: "Comment une équipe Java peut-elle adopter Kotlin ?"
    answer: "Fichier par fichier, grâce à l'interopérabilité avec Java"
    decoys:
      - "En réécrivant tout le projet d'un coup, car les deux langages ne cohabitent pas"
      - "En changeant de machine virtuelle"
    why: "Kotlin et Java cohabitent dans le même projet."
  - id: serveur
    prompt: "Quels frameworks serveur utilisent Kotlin ?"
    answer: "Spring Boot et Ktor"
    decoys:
      - "Django et Flask"
      - "Express et NestJS"
    why: "Spring Boot le prend en charge ; Ktor a été écrit pour lui."
  - id: multiplatform
    prompt: "Que permet Kotlin Multiplatform ?"
    answer: "Partager du code entre Android et iOS"
    decoys:
      - "Exécuter du code Swift sur Android"
      - "Compiler du Kotlin en Python"
    why: "Une partie du code (logique métier) peut être commune aux deux plateformes."
  - id: ios
    prompt: "Une application uniquement iOS : que conseille la fiche ?"
    answer: "Swift, le langage natif d'Apple"
    decoys:
      - "Kotlin, le langage recommandé pour iOS"
      - "Dart, sans Flutter"
    why: "Kotlin est le choix par défaut pour Android ; pour iOS seul, Swift."
  - id: val-var
    prompt: "Quelle différence entre val et var en Kotlin ?"
    answer: "val ne peut pas être réaffectée, var le peut"
    decoys:
      - "val est typée statiquement, var dynamiquement"
      - "val est locale à la fonction, var globale au fichier"
    why: "val déclare une référence en lecture seule, var une variable modifiable ; les deux sont typées statiquement, quelle que soit leur portée."
  - id: appel-sur
    prompt: "Que fait l'opérateur ?. en Kotlin (user?.name) ?"
    answer: "Il renvoie null au lieu de lever une erreur si l'objet est null"
    decoys:
      - "Il lève une exception explicite si l'objet est null"
      - "Il convertit l'objet en chaîne avant d'accéder au champ"
    why: "L'appel sûr (safe call) court-circuite l'accès quand la valeur est nulle et renvoie null, d'où un type de résultat nullable."
  - id: elvis
    prompt: "Que fait l'opérateur Elvis ?: en Kotlin (name ?: « inconnu ») ?"
    answer: "Il fournit une valeur par défaut quand l'expression de gauche vaut null"
    decoys:
      - "Il compare deux valeurs et renvoie la plus grande des deux"
      - "Il force la conversion de l'expression de gauche en un type non nullable"
    why: "?: renvoie la valeur de gauche si elle n'est pas nulle, sinon celle de droite. Il ne compare rien et ne convertit pas de force."
  - id: double-point-exclamation
    prompt: "Quel risque fait courir l'opérateur !! en Kotlin (user!!.name) ?"
    answer: "Une NullPointerException si la valeur est null"
    decoys:
      - "Une erreur de compilation dès que la valeur peut être nulle"
      - "Une copie profonde de l'objet à chaque appel"
    why: "!! affirme qu'une valeur n'est pas nulle ; si elle l'est, une NullPointerException est levée à l'exécution. Il compile justement sur un type nullable."
  - id: data-class
    prompt: "Qu'est-ce qu'une data class en Kotlin ?"
    answer: "Une classe dont equals, hashCode, toString et copy sont générés"
    decoys:
      - "Une classe dont les instances sont enregistrées automatiquement en base de données"
      - "Une classe qui ne peut contenir que des champs de type primitif"
    why: "data class génère les méthodes utilitaires à partir des propriétés du constructeur principal. Elle n'a aucun lien avec la persistance et accepte tous les types."
  - id: when
    prompt: "À quoi sert l'expression when en Kotlin ?"
    answer: "Choisir une branche selon une valeur, comme un switch plus puissant"
    decoys:
      - "Planifier l'exécution d'un bloc de code à une date donnée"
      - "Attendre la fin d'une coroutine avant de continuer"
    why: "when remplace le switch de Java : conditions, plages, tests de type, et il peut renvoyer une valeur. Ce n'est ni un planificateur ni une attente."
  - id: fonctions-extension
    prompt: "Que permettent les fonctions d'extension de Kotlin ?"
    answer: "Ajouter une méthode à une classe existante sans la modifier ni en hériter"
    decoys:
      - "Prolonger la durée de vie d'un objet au-delà de sa portée normale"
      - "Charger à l'exécution des modules téléchargés depuis un dépôt distant"
    why: "fun String.slug() s'appelle comme une méthode de String, même sans accès à sa source ; c'est résolu à la compilation."
  - id: sealed-class
    prompt: "À quoi sert une sealed class (classe scellée) en Kotlin ?"
    answer: "Restreindre ses sous-classes à un ensemble connu, vérifié par when"
    decoys:
      - "Empêcher toute modification de ses champs après la construction"
      - "Chiffrer ses données en mémoire pour les protéger des autres threads"
    why: "Les sous-classes d'une sealed class sont connues à la compilation : un when qui les couvre toutes n'a pas besoin de branche else. L'immuabilité, c'est val."
  - id: smart-cast
    prompt: "Que fait le smart cast de Kotlin ?"
    answer: "Après un test (is, != null), la variable est traitée comme du type vérifié"
    decoys:
      - "Il convertit automatiquement les nombres en chaînes quand c'est nécessaire"
      - "Il choisit à l'exécution la méthode la plus rapide à appeler sur l'objet"
    why: "Après if (x is String), x s'utilise comme une String sans conversion explicite. Kotlin ne fait pas de conversion implicite entre nombres et chaînes."
  - id: object
    prompt: "Que déclare le mot-clé object en Kotlin (object Config { … }) ?"
    answer: "Un singleton : une classe à instance unique"
    decoys:
      - "Une classe abstraite dont il faut obligatoirement hériter"
      - "Un type générique qui accepte n'importe quelle valeur"
    why: "Une déclaration object crée la classe et son unique instance. Le type qui accepte toute valeur est Any."
  - id: gradle-kts
    prompt: "En quel langage peut-on écrire les scripts de build Gradle, à la place de Groovy ?"
    answer: "Kotlin (build.gradle.kts)"
    decoys:
      - "Python (build.gradle.py)"
      - "YAML (build.gradle.yml)"
    why: "Gradle accepte un DSL Kotlin, avec complétion et vérification de types dans l'IDE ; il n'existe pas de DSL Gradle en Python ou en YAML."
  - id: classes-finales
    prompt: "Par défaut, une classe Kotlin peut-elle être héritée ?"
    answer: "Non : elle est finale, sauf si on la déclare open"
    decoys:
      - "Oui : toutes les classes sont ouvertes, comme en Java"
      - "Non : Kotlin interdit tout héritage entre classes"
    why: "Kotlin inverse le choix de Java : les classes et méthodes sont finales par défaut, et open autorise l'héritage."
  - id: suspend
    prompt: "Que signale le mot-clé suspend sur une fonction Kotlin ?"
    answer: "Elle peut se suspendre sans bloquer le thread, dans une coroutine"
    decoys:
      - "Elle est désactivée tant qu'aucun test unitaire ne la couvre"
      - "Elle s'exécute toujours dans un nouveau thread système, créé à chaque appel"
    why: "Une fonction suspend peut s'interrompre (attente réseau, délai) en libérant le thread ; elle s'appelle depuis une coroutine ou une autre fonction suspend."
  - id: cibles-compilation
    prompt: "Vers quoi Kotlin peut-il compiler, en plus du bytecode JVM ?"
    answer: "JavaScript et du code natif (Kotlin/Native)"
    decoys:
      - "Rien d'autre : il est limité au bytecode JVM"
      - "Du bytecode .NET et du code Python"
    why: "Kotlin/JS et Kotlin/Native sont les cibles sur lesquelles repose Kotlin Multiplatform, iOS compris. Il ne vise ni .NET ni Python."
  - id: templates-chaines
    prompt: "Comment insérer la valeur d'une variable nom dans une chaîne Kotlin ?"
    answer: "Avec un template : « Bonjour $nom »"
    decoys:
      - "Avec String.format seulement, faute de syntaxe dédiée"
      - "Avec l'opérateur % : « Bonjour % » % nom"
    why: "Kotlin interpole $variable et ${expression} directement dans les chaînes. L'opérateur % de formatage vient de Python."
  - id: parametres-nommes
    prompt: "Que permettent les paramètres par défaut et nommés de Kotlin ?"
    answer: "Éviter d'écrire plusieurs surcharges d'une même fonction"
    decoys:
      - "Rendre tous les paramètres optionnels et typés dynamiquement"
      - "Passer les paramètres par référence plutôt que par valeur"
    why: "Une seule fonction avec des valeurs par défaut remplace les surcharges de Java, et les arguments nommés rendent l'appel lisible. Le typage reste statique."
  - id: ide
    prompt: "Quel IDE est développé par la même entreprise que Kotlin ?"
    answer: "IntelliJ IDEA"
    decoys:
      - "Xcode"
      - "Visual Studio"
      - "Eclipse"
    why: "JetBrains édite IntelliJ IDEA (sur lequel repose Android Studio) et a créé Kotlin. Xcode est d'Apple, Visual Studio de Microsoft, Eclipse de la fondation du même nom."
  - id: fonctions-portee
    prompt: "À quoi servent let, apply, also, run et with en Kotlin ?"
    answer: "Exécuter un bloc dans le contexte d'un objet (fonctions de portée)"
    decoys:
      - "Déclarer des variables globales modifiables, partagées par les threads"
      - "Importer des bibliothèques Java dans un fichier Kotlin"
    why: "Ces fonctions de portée (scope functions) donnent accès à l'objet dans un bloc, par exemple pour le configurer (apply) ou traiter une valeur non nulle (?.let)."
  - id: flow
    prompt: "Dans les coroutines Kotlin, qu'est-ce qu'un Flow ?"
    answer: "Un flux asynchrone de valeurs émises au fil du temps"
    decoys:
      - "Un diagramme généré à partir du code des coroutines"
      - "Une file de messages persistée sur disque entre deux exécutions"
    why: "Une fonction suspend renvoie une seule valeur ; un Flow en émet plusieurs, de façon asynchrone. Il ne persiste rien sur disque."
  - id: types-plateforme
    prompt: "Quand Kotlin appelle du code Java, la sûreté vis-à-vis de null est-elle garantie ?"
    answer: "Pas entièrement : les types Java ne disent pas s'ils peuvent être nuls"
    decoys:
      - "Oui : la JVM vérifie la nullité de chaque valeur reçue du code Java"
      - "Oui : le compilateur Kotlin réécrit le code Java pour le rendre sûr"
    why: "Sans annotations, une valeur venue de Java a un « type plateforme » : Kotlin ne peut pas savoir si elle est nulle, et l'erreur peut survenir à l'exécution."
---
