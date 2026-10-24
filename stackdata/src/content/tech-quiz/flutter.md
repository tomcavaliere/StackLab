---
questions:
  - id: rendu
    prompt: "Comment Flutter affiche-t-il l'interface ?"
    answer: "Il dessine lui-même chaque pixel avec son propre moteur de rendu"
    decoys:
      - "Avec les composants natifs de chaque plateforme, comme une application Swift ou Kotlin"
      - "Dans une WebView qui affiche du HTML"
    why: "C'est la grande différence avec React Native, qui utilise les vues natives."
  - id: consequence
    prompt: "Flutter dessine lui-même chaque pixel. Quelle conséquence pour l'application ?"
    answer: "L'application a le même aspect sur toutes les plateformes"
    decoys:
      - "L'application prend automatiquement l'apparence native de chaque plateforme"
      - "L'application ne fonctionne que sur Android"
    why: "Même dessin partout : idéal pour une identité visuelle forte, moins pour reprendre exactement les comportements natifs."
  - id: langage
    prompt: "En quel langage écrit-on une application Flutter ?"
    answer: "Dart"
    decoys:
      - "Kotlin"
      - "JavaScript"
    why: "Dart est compilé en code natif pour la production."
  - id: hot-reload
    prompt: "Que fait le rechargement à chaud (hot reload) ?"
    answer: "Il applique une modification sans perdre l'état de l'application"
    decoys:
      - "Il redémarre le téléphone de test"
      - "Il publie la nouvelle version de l'application sur les stores, sans validation"
    why: "On voit l'effet d'un changement immédiatement, au même endroit de l'application."
  - id: widgets
    prompt: "Quels styles de widgets Flutter fournit-il ?"
    answer: "Material (Google) et Cupertino (Apple)"
    decoys:
      - "Bootstrap et Tailwind, adaptés au mobile par Google"
      - "SwiftUI et Jetpack Compose"
    why: "Bootstrap et Tailwind sont des outils CSS ; SwiftUI et Jetpack Compose sont les boîtes à outils natives d'Apple et d'Android."
  - id: equipe-react
    prompt: "Une équipe React veut partager compétences et code avec le web : Flutter est-il le plus naturel ?"
    answer: "Non : React Native l'est davantage"
    decoys:
      - "Oui : Flutter exécute du code React"
      - "Oui : Dart est un dialecte de JavaScript"
    why: "React Native reprend le modèle de composants de React ; Flutter demande d'apprendre Dart."
  - id: quand
    prompt: "Quand Flutter est-il particulièrement adapté ?"
    answer: "Une interface à l'identité visuelle très personnalisée, identique au pixel près partout"
    decoys:
      - "Une application qui doit reproduire exactement les comportements natifs de chaque plateforme"
      - "Un site web essentiellement statique"
    why: "Reprendre fidèlement l'aspect natif est justement un cas où la fiche déconseille Flutter."
  - id: sdk-natifs
    prompt: "L'application doit intégrer beaucoup de SDK natifs. Que faut-il prévoir avec Flutter ?"
    answer: "Écrire des ponts vers le code natif"
    decoys:
      - "Rien : Flutter intègre automatiquement tous les SDK"
      - "Réécrire chaque SDK en Dart"
    why: "Chaque SDK natif demande un pont entre Dart et le code de la plateforme."
  - id: version-1
    prompt: "Quand Flutter 1.0 est-il sorti ?"
    answer: "En 2018, chez Google"
    decoys:
      - "En 2015, chez Meta"
      - "En 2014, chez Apple"
    why: "Meta a sorti React Native en 2015 ; Apple a présenté Swift en 2014."
  - id: cibles
    prompt: "Quelles cibles un même code Flutter peut-il viser ?"
    answer: "iOS, Android, le web et le bureau"
    decoys:
      - "Uniquement iOS"
      - "Uniquement Android et les montres connectées"
    why: "Son propre moteur de rendu lui permet de viser de nombreuses plateformes."
  - id: tout-est-widget
    prompt: "Dans Flutter, de quoi est faite l'interface d'une application ?"
    answer: "D'un arbre de widgets imbriqués, y compris pour les marges et l'alignement"
    decoys:
      - "D'un fichier XML de mise en page par écran, complété par une feuille de style séparée"
      - "De pages HTML générées par Dart puis affichées dans une WebView"
    why: "Chez Flutter, tout est widget : même un espacement (Padding) ou un centrage (Center) en est un. Il n'y a ni fichier XML de mise en page ni HTML."
  - id: stateless-stateful
    prompt: "Quel type de widget choisir pour un compteur dont la valeur change quand on appuie sur un bouton ?"
    answer: "Un StatefulWidget"
    decoys:
      - "Un StatelessWidget, rafraîchi automatiquement à chaque appui"
      - "Un InheritedWidget"
    why: "Un StatefulWidget conserve un état qui évolue dans le temps. Un StatelessWidget ne dépend que de ses paramètres et n'a pas d'état propre à modifier."
  - id: setstate
    prompt: "Dans un StatefulWidget, à quoi sert l'appel à setState ?"
    answer: "Signaler que l'état a changé, pour que le widget soit reconstruit"
    decoys:
      - "Sauvegarder l'état sur le disque, pour le retrouver au prochain lancement de l'application"
      - "Envoyer l'état au serveur pour le synchroniser entre appareils"
    why: "setState déclenche un nouvel appel à build avec le nouvel état. Il ne persiste rien, ni sur le disque ni sur un serveur."
  - id: methode-build
    prompt: "Quelle méthode d'un widget Flutter décrit l'interface qu'il affiche ?"
    answer: "build"
    decoys:
      - "render"
      - "onCreate"
    why: "build renvoie l'arbre de widgets à afficher. render est le nom de la méthode des composants de classe React, onCreate celui d'une activité Android."
  - id: pubspec
    prompt: "Dans quel fichier un projet Flutter déclare-t-il ses dépendances ?"
    answer: "pubspec.yaml"
    decoys:
      - "package.json"
      - "build.gradle"
    why: "pubspec.yaml est le fichier de l'outil pub de Dart. package.json est celui de npm, build.gradle celui de Gradle côté Android."
  - id: pub-dev
    prompt: "Où trouve-t-on les paquets Dart et Flutter publiés par la communauté ?"
    answer: "Sur pub.dev"
    decoys:
      - "Sur npmjs.com, à côté des paquets JavaScript"
      - "Sur Maven Central"
    why: "pub.dev est le dépôt officiel des paquets Dart et Flutter. npm sert JavaScript, Maven Central l'écosystème Java."
  - id: impeller
    prompt: "Quel moteur de rendu Flutter a-t-il développé pour remplacer progressivement Skia ?"
    answer: "Impeller"
    decoys:
      - "WebKit"
      - "Hermes"
    why: "Impeller est le moteur de rendu de Flutter, devenu celui par défaut sur iOS puis sur Android. WebKit est un moteur de navigateur, Hermes un moteur JavaScript pour React Native."
  - id: hot-restart
    prompt: "Quelle différence entre le hot reload et le hot restart de Flutter ?"
    answer: "Le hot restart relance l'application et perd son état"
    decoys:
      - "Le hot restart conserve l'état, alors que le hot reload le remet à zéro à chaque modification"
      - "Le hot restart réinstalle l'application depuis le store"
    why: "Le hot reload injecte le code modifié en gardant l'état ; le hot restart repart de zéro, utile quand une modification touche l'initialisation."
  - id: jit-aot
    prompt: "Comment Dart est-il compilé en développement et en production dans Flutter ?"
    answer: "À la volée (JIT) en développement, à l'avance (AOT) en production"
    decoys:
      - "À l'avance (AOT) en développement, interprété ligne à ligne en production"
      - "Toujours traduit en JavaScript, puis exécuté par le moteur du téléphone"
    why: "La compilation JIT rend possible le hot reload ; la compilation AOT produit le code natif livré dans l'application."
  - id: platform-channels
    prompt: "Par quel mécanisme le code Dart d'une application Flutter appelle-t-il du code natif Kotlin ou Swift ?"
    answer: "Les platform channels"
    decoys:
      - "Le bridge JSON de React Native, réutilisé par Flutter"
      - "Des requêtes HTTP vers un serveur local"
    why: "Les platform channels (MethodChannel, par exemple) font passer des messages entre Dart et la plateforme. Le bridge est un mécanisme propre à React Native."
  - id: row-column
    prompt: "Quel widget Flutter aligne ses enfants horizontalement ?"
    answer: "Row"
    decoys:
      - "Column"
      - "Stack"
    why: "Row aligne horizontalement, Column verticalement, et Stack superpose ses enfants."
  - id: contraintes
    prompt: "Comment la mise en page de Flutter détermine-t-elle la taille d'un widget ?"
    answer: "Le parent impose des contraintes, l'enfant choisit sa taille dans ces limites"
    decoys:
      - "Chaque widget fixe librement sa taille en pixels, sans tenir compte de son parent"
      - "Une feuille de style globale calcule toutes les tailles avant l'affichage"
    why: "La règle de Flutter : les contraintes descendent, les tailles remontent, et le parent place l'enfant."
  - id: stream
    prompt: "Quel type Dart représente une suite de valeurs asynchrones qui arrivent au fil du temps ?"
    answer: "Stream"
    decoys:
      - "Future, qui produit une valeur à chaque nouvel événement"
      - "List"
    why: "Un Future ne produit qu'une seule valeur, une fois ; un Stream en produit plusieurs, comme des messages ou des positions GPS."
  - id: gestion-etat
    prompt: "Que sont Provider, Riverpod et Bloc dans l'écosystème Flutter ?"
    answer: "Des solutions pour partager et gérer l'état de l'application"
    decoys:
      - "Des moteurs de rendu alternatifs, qui remplacent celui de Flutter"
      - "Des services d'hébergement et de publication sur les stores"
    why: "Ce sont des paquets de gestion d'état : setState suffit pour un widget, pas pour un état partagé dans toute l'application."
  - id: null-safety
    prompt: "Que garantit la null safety de Dart ?"
    answer: "Une variable de type non nullable ne peut pas contenir null, vérifié à la compilation"
    decoys:
      - "Toute valeur null est remplacée automatiquement par une valeur par défaut à l'exécution"
      - "Les variables ne peuvent jamais être modifiées après leur création, même sans le mot-clé final"
    why: "Le compilateur refuse null dans un type comme String ; il faut écrire String? pour l'autoriser. Rien n'est remplacé à l'exécution."
  - id: flutter-web
    prompt: "Pourquoi Flutter web convient-il mal à un site de contenu qui doit être bien référencé ?"
    answer: "L'interface est dessinée dans un canvas, pas écrite en HTML sémantique"
    decoys:
      - "Flutter web refuse d'afficher du texte, seulement des images et des formes"
      - "Les moteurs de recherche bloquent volontairement tout site construit avec Dart"
    why: "Flutter dessine l'interface lui-même, aussi sur le web : le résultat ressemble à une application, pas à un document HTML que les moteurs indexent facilement."
  - id: keys
    prompt: "À quoi sert une Key sur des widgets Flutter d'une liste ?"
    answer: "À conserver l'état de chaque élément quand la liste est réordonnée"
    decoys:
      - "À chiffrer les données affichées par le widget"
      - "À traduire le widget dans la langue de l'utilisateur, à partir d'un fichier de clés"
    why: "Sans clé, Flutter associe l'état par position : après un tri, un état peut se retrouver sur le mauvais élément."
  - id: listview-builder
    prompt: "Pourquoi utiliser ListView.builder pour une très longue liste ?"
    answer: "Il ne construit que les éléments visibles à l'écran"
    decoys:
      - "Il charge toute la liste en une fois au démarrage pour éviter les saccades ensuite"
      - "Il trie la liste automatiquement"
    why: "Les éléments sont construits à la demande, au défilement : la mémoire et le temps de construction restent maîtrisés."
  - id: navigator
    prompt: "Comment le Navigator de Flutter gère-t-il les écrans ?"
    answer: "Comme une pile : push ajoute un écran, pop revient au précédent"
    decoys:
      - "Comme des onglets indépendants, tous construits au démarrage de l'application"
      - "Par des URL rechargées à chaque changement d'écran, comme un site web classique"
    why: "Le Navigator empile les routes ; pop dépile l'écran du dessus pour revenir au précédent."
  - id: recrutement
    prompt: "Quel inconvénient de recrutement Flutter présente-t-il ?"
    answer: "Dart reste peu utilisé en dehors de Flutter"
    decoys:
      - "Flutter impose de recruter une équipe iOS et une équipe Android distinctes"
      - "Les développeurs Flutter doivent tous être certifiés par Google avant de publier"
    why: "Le vivier de développeurs Dart est plus restreint que celui de JavaScript ; une seule équipe suffit, et aucune certification n'est exigée."
---
