---
questions:
  - id: usage
    prompt: "À quoi sert surtout Dart aujourd'hui ?"
    answer: "Écrire des applications Flutter"
    decoys:
      - "Écrire des notebooks de data science"
      - "Écrire des pilotes de périphériques"
    why: "Dart a trouvé sa place avec Flutter, dont il est le langage."
  - id: deux-compilations
    prompt: "Pourquoi Flutter avait-il besoin des deux modes de compilation de Dart ?"
    answer: "À la volée en développement, pour le rechargement à chaud ; anticipée en natif en production"
    decoys:
      - "Pour exécuter le même code sur la JVM et sur .NET, selon la plateforme de l'appareil"
      - "Pour traduire le code en Python, puis en C"
    why: "Le rechargement à chaud rend le développement rapide ; la compilation native rend l'application rapide."
  - id: null-safety
    prompt: "Qu'impose Dart 3 (2023) ?"
    answer: "La sûreté vis-à-vis de null : une variable ne peut valoir null que si son type le déclare"
    decoys:
      - "Le typage dynamique pour toutes les variables, afin de simplifier l'écriture des widgets"
      - "La suppression des classes"
    why: "La sûreté vis-à-vis de null est obligatoire depuis Dart 3."
  - id: web
    prompt: "Vers quoi Dart compile-t-il pour le web ?"
    answer: "JavaScript et WebAssembly"
    decoys:
      - "PHP"
      - "Du bytecode JVM"
    why: "Dart compile en code natif pour le mobile, et vers JavaScript ou WebAssembly pour le web."
  - id: origine
    prompt: "Qui a créé Dart, et pour viser quoi au départ ?"
    answer: "Google, en 2011, d'abord pour le web, comme alternative à JavaScript"
    decoys:
      - "Apple, pour remplacer Objective-C"
      - "JetBrains, en 2011, pour remplacer Java dans les applications Android"
    why: "Swift a remplacé Objective-C chez Apple ; Kotlin, de JetBrains, est devenu le langage recommandé d'Android."
  - id: syntaxe
    prompt: "À quels langages la syntaxe de Dart ressemble-t-elle ?"
    answer: "Java, C# ou JavaScript"
    decoys:
      - "Python ou Ruby"
      - "Haskell ou Lisp"
    why: "Une syntaxe familière facilite la prise en main."
  - id: back-end
    prompt: "Écrire un back-end en Dart ?"
    answer: "C'est possible, mais l'écosystème est bien plus réduit que celui de Go, Java ou Python"
    decoys:
      - "C'est impossible : Dart ne s'exécute que sur mobile, à l'intérieur d'une application Flutter"
      - "C'est recommandé : c'est son usage principal"
    why: "Back-end, data, outillage : Dart sait le faire, mais sans l'écosystème des grands langages."
  - id: recrutement
    prompt: "Quel inconvénient Dart présente-t-il pour recruter ?"
    answer: "Il reste peu utilisé hors de Flutter"
    decoys:
      - "Il n'est plus maintenu par Google"
      - "Il est réservé aux employés de Google"
    why: "La fiche Flutter le relève aussi."
  - id: partage
    prompt: "Qu'offre Dart, via Flutter ?"
    answer: "Un code partagé entre mobile, web et bureau"
    decoys:
      - "Un code partagé avec React Native, qui sait exécuter du Dart"
      - "L'exécution directe de code Python"
    why: "Flutter vise plusieurs plateformes avec le même code Dart."
  - id: typage
    prompt: "Comment Dart est-il typé ?"
    answer: "Statiquement"
    decoys:
      - "Dynamiquement, sans annotations possibles"
      - "Il n'a pas de types"
    why: "Dart est un langage typé, avec une sûreté vis-à-vis de null obligatoire."
  - id: pub
    prompt: "Quel est le gestionnaire de paquets de Dart ?"
    answer: "pub, avec le dépôt pub.dev"
    decoys:
      - "npm, avec le dépôt npmjs.com"
      - "Cargo, avec le dépôt crates.io"
    why: "Les paquets Dart et Flutter se publient sur pub.dev et se déclarent dans pubspec.yaml. npm sert à JavaScript, Cargo à Rust."
  - id: late
    prompt: "Que signifie le mot-clé late sur une variable Dart ?"
    answer: "Elle sera initialisée plus tard, avant sa première lecture"
    decoys:
      - "Elle est chargée en différé depuis le réseau au premier accès"
      - "Elle est libérée en dernier par le ramasse-miettes"
    why: "late permet de déclarer une variable non nullable sans l'initialiser tout de suite ; la lire avant de l'avoir affectée lève une erreur à l'exécution."
  - id: final-const
    prompt: "Quelle différence entre final et const en Dart ?"
    answer: "const est fixé à la compilation, final une seule fois à l'exécution"
    decoys:
      - "final est fixé à la compilation, const peut être réaffecté ensuite"
      - "Aucune : ce sont deux synonymes, au choix du développeur"
    why: "Une valeur const doit être connue à la compilation (Flutter en profite pour ses widgets constants) ; une variable final est affectée une fois, éventuellement à l'exécution."
  - id: future
    prompt: "Que représente un Future en Dart ?"
    answer: "Une valeur disponible plus tard, issue d'une opération asynchrone"
    decoys:
      - "Une fonctionnalité expérimentale à activer par une option du compilateur"
      - "Une variable dont le type ne sera choisi qu'à l'exécution"
    why: "Un appel réseau renvoie un Future<T> : la valeur arrivera plus tard, ou une erreur. On l'attend avec await ou then."
  - id: stream
    prompt: "Qu'est-ce qu'un Stream en Dart ?"
    answer: "Une suite d'événements asynchrones, reçus au fil du temps"
    decoys:
      - "Un fichier ouvert en lecture seule, chargé entièrement en mémoire"
      - "Un widget Flutter qui affiche une vidéo en continu"
    why: "Un Future livre une valeur, un Stream en livre plusieurs (clics, messages d'un WebSocket…), qu'on écoute avec listen ou await for."
  - id: isolates
    prompt: "Comment Dart exécute-t-il du code en parallèle ?"
    answer: "Avec des isolates, qui ne partagent pas leur mémoire"
    decoys:
      - "Avec des threads qui partagent librement toute la mémoire"
      - "Il ne le peut pas : tout s'exécute toujours sur un seul cœur"
    why: "Chaque isolate a sa propre mémoire et communique par messages, ce qui évite les courses de données entre threads."
  - id: boucle-evenements
    prompt: "Comment le code asynchrone de Dart s'exécute-t-il au sein d'un isolate ?"
    answer: "Sur une boucle d'événements à un seul thread"
    decoys:
      - "Sur un pool de threads créé à chaque await"
      - "Sur un processus système séparé pour chaque fonction"
    why: "Comme en JavaScript, l'asynchrone de Dart repose sur une boucle d'événements : await rend la main sans créer de thread."
  - id: operateur-null
    prompt: "Que fait l'opérateur ?? en Dart (nom ?? « inconnu ») ?"
    answer: "Il renvoie la valeur de droite si celle de gauche vaut null"
    decoys:
      - "Il renvoie true si les deux valeurs sont du même type"
      - "Il lève une exception si l'une des deux valeurs vaut null"
    why: "?? fournit une valeur par défaut aux expressions nullables ; il ne compare pas les types et ne lève rien."
  - id: assertion-non-null
    prompt: "Que fait l'opérateur ! placé après une expression Dart (user!) ?"
    answer: "Il affirme qu'elle n'est pas null, et lève une erreur sinon"
    decoys:
      - "Il inverse la valeur booléenne de l'expression, comme en C"
      - "Il copie l'objet pour éviter de modifier l'original"
    why: "Le ! postfixé convertit un type nullable en non nullable, au risque d'une erreur à l'exécution. Placé avant une expression booléenne, ! est la négation."
  - id: constructeurs-nommes
    prompt: "Que permet un constructeur nommé en Dart (Point.origin()) ?"
    answer: "Donner plusieurs constructeurs à une classe, chacun avec son nom"
    decoys:
      - "Créer une instance accessible partout sous ce nom, comme un singleton"
      - "Nommer l'instance pour la retrouver facilement dans le débogueur"
    why: "Dart n'a pas de surcharge de méthodes : les constructeurs nommés (Point.origin(), Point.fromJson()) offrent plusieurs façons de construire un objet."
  - id: records-patterns
    prompt: "Qu'a apporté Dart 3, en plus de la sûreté vis-à-vis de null obligatoire ?"
    answer: "Les records et le pattern matching"
    decoys:
      - "Les pointeurs manuels et l'arithmétique de pointeurs"
      - "Le typage dynamique par défaut et la fin des classes"
    why: "Dart 3 a ajouté les records (regrouper plusieurs valeurs sans classe) et les patterns (déstructuration, switch exhaustif). Dart reste typé statiquement."
  - id: point-entree
    prompt: "Où commence l'exécution d'un programme Dart ?"
    answer: "Dans une fonction main() de premier niveau"
    decoys:
      - "Dans une méthode statique main d'une classe obligatoire"
      - "À la première ligne du fichier, exécuté comme un script"
    why: "Dart accepte des fonctions hors de toute classe : main() est une fonction de premier niveau, sans classe englobante comme en Java."
  - id: mixins
    prompt: "Qu'est-ce qu'un mixin en Dart ?"
    answer: "Un ensemble de membres réutilisables dans plusieurs classes, via with"
    decoys:
      - "Une classe qui hérite de plusieurs superclasses à la fois, comme en C++"
      - "Un fichier de styles mélangé au code des widgets Flutter"
    why: "class Chat extends Animal with Ronronne ajoute les membres du mixin sans héritage multiple de classes, que Dart n'autorise pas."
  - id: interfaces-implicites
    prompt: "Comment une classe Dart peut-elle servir d'interface ?"
    answer: "Toute classe définit une interface implicite, qu'on peut implémenter"
    decoys:
      - "En la décrivant dans un fichier .d.ts séparé, comme en TypeScript"
      - "Elle ne le peut pas : Dart n'a aucune notion d'interface"
    why: "class B implements A oblige B à fournir tous les membres de A, sans hériter de son code. Les fichiers .d.ts sont propres à TypeScript."
  - id: compile-exe
    prompt: "Que produit la commande dart compile exe ?"
    answer: "Un exécutable natif autonome"
    decoys:
      - "Un fichier .jar pour la JVM"
      - "Un installeur pour le Play Store"
    why: "La compilation anticipée de Dart produit un binaire natif, utile pour des outils en ligne de commande. Dart ne cible pas la JVM."
  - id: tout-est-objet
    prompt: "En Dart, un nombre ou la valeur null sont-ils des objets ?"
    answer: "Oui : toute valeur est un objet"
    decoys:
      - "Non : les nombres sont des types primitifs, comme int en Java"
      - "Non : seules les instances créées avec new en sont"
    why: "En Dart, int, double, bool et même null sont des objets, instances de classes. Le mot-clé new est d'ailleurs facultatif."
  - id: dynamic
    prompt: "À quoi sert le type dynamic en Dart ?"
    answer: "Désactiver la vérification statique des types pour une variable"
    decoys:
      - "Allouer la variable sur le tas plutôt que sur la pile"
      - "Rendre la variable réactive pour qu'un widget se redessine"
    why: "Une variable dynamic accepte n'importe quelle valeur et ses appels ne sont vérifiés qu'à l'exécution ; à réserver aux cas où le type est vraiment inconnu (JSON brut)."
  - id: await
    prompt: "Que fait await dans une fonction async en Dart ?"
    answer: "Il attend la fin d'un Future sans bloquer la boucle d'événements"
    decoys:
      - "Il bloque tout l'isolate, interface comprise, jusqu'à la fin de l'opération"
      - "Il lance l'opération dans un nouveau thread système"
    why: "await suspend la fonction et rend la main à la boucle d'événements : l'interface Flutter reste fluide pendant l'attente."
  - id: prive-underscore
    prompt: "Comment rend-on un membre privé en Dart ?"
    answer: "En préfixant son nom par _ : il est privé à sa bibliothèque"
    decoys:
      - "Avec le mot-clé private devant sa déclaration, comme en Java ou en C#"
      - "Avec le mot-clé internal, qui le rend privé à sa seule classe"
    why: "Dart n'a pas de mot-clé de visibilité : un nom qui commence par _ n'est visible que dans sa bibliothèque (son fichier, en pratique)."
  - id: web-classique
    prompt: "Pour un site web classique, Dart remplace-t-il couramment JavaScript ?"
    answer: "Non : JavaScript et TypeScript restent la norme"
    decoys:
      - "Oui : les navigateurs exécutent Dart nativement depuis 2015"
      - "Oui : c'est son usage principal, loin devant Flutter"
    why: "Dart compile vers JavaScript ou WebAssembly, mais aucun navigateur ne l'exécute nativement ; son usage principal reste Flutter."
---
