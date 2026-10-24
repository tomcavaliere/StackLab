---
questions:
  - id: remplace
    prompt: "Quel langage Swift remplace-t-il chez Apple ?"
    answer: "Objective-C"
    decoys:
      - "Java"
      - "C#"
    why: "Swift reste interopérable avec le code Objective-C existant."
  - id: optionnels
    prompt: "Que font les optionnels de Swift ?"
    answer: "Ils obligent à traiter explicitement l'absence de valeur"
    decoys:
      - "Ils rendent tous les paramètres de fonction facultatifs par défaut"
      - "Ils désactivent le typage"
    why: "On ne peut pas oublier qu'une valeur peut manquer : le compilateur l'impose."
  - id: memoire
    prompt: "Comment Swift gère-t-il la mémoire ?"
    answer: "Par comptage de références automatique (ARC), sans ramasse-miettes"
    decoys:
      - "Par un ramasse-miettes, comme Java et Go"
      - "À la main, comme en C, avec des appels explicites d'allocation"
    why: "ARC libère la mémoire dès qu'un objet n'est plus référencé, sans pauses de ramasse-miettes."
  - id: swiftui
    prompt: "Qu'est-ce que SwiftUI ?"
    answer: "Une façon déclarative de décrire l'interface, un peu à la manière de React"
    decoys:
      - "Un framework web pour écrire des sites en Swift"
      - "Un émulateur qui exécute les applications Android sur iPhone"
    why: "SwiftUI (2019) décrit l'interface pour un état donné."
  - id: annee
    prompt: "Quand Swift est-il sorti ?"
    answer: "En 2014, chez Apple"
    decoys:
      - "En 2009, chez Google"
      - "En 1995, chez Sun"
    why: "Google a annoncé Go en 2009, Sun Java en 1995."
  - id: open-source
    prompt: "Swift est-il open-source ?"
    answer: "Oui, depuis 2015, et il tourne aussi sous Linux"
    decoys:
      - "Non : il est réservé aux Mac"
      - "Oui, mais seulement depuis 2024, et uniquement sur macOS"
    why: "Son usage reste toutefois très concentré sur les plateformes Apple."
  - id: android
    prompt: "L'application est aussi attendue sur Android. Swift suffit-il ?"
    answer: "Non : il faudra une seconde application en Kotlin, ou un framework multiplateforme"
    decoys:
      - "Oui : Swift compile aussi pour Android sans changement"
      - "Oui : Android exécute nativement les applications Swift depuis plusieurs années"
    why: "React Native et Flutter permettent une seule application pour les deux plateformes."
  - id: quand
    prompt: "Quand Swift est-il le meilleur choix ?"
    answer: "Une application iOS où l'expérience native et la performance priment"
    decoys:
      - "Une application à livrer vite sur iOS et Android par une petite équipe"
      - "Un back-end à fort trafic"
    why: "Swift donne un accès immédiat aux nouvelles API d'Apple : graphismes, caméra, capteurs."
  - id: interop
    prompt: "Swift peut-il utiliser du code Objective-C existant ?"
    answer: "Oui : il reste interopérable"
    decoys:
      - "Non : il faut tout réécrire"
      - "Seulement via une API REST"
    why: "Une application peut migrer progressivement d'Objective-C vers Swift."
  - id: back-end
    prompt: "Un back-end en Swift ?"
    answer: "C'est possible (Vapor), mais l'écosystème est réduit par rapport à Go, Java ou Node.js"
    decoys:
      - "C'est son usage principal, devant les applications iOS"
      - "C'est impossible : Swift ne tourne que sur les appareils d'Apple"
    why: "Swift tourne sous Linux, mais son écosystème serveur reste petit."
  - id: let-var
    prompt: "Quelle différence entre let et var en Swift ?"
    answer: "let déclare une constante, var une variable modifiable"
    decoys:
      - "let déclare une variable locale, var une variable globale"
      - "let est typé statiquement, var dynamiquement"
    why: "Une constante let ne peut pas être réaffectée ; les deux sont typées statiquement, quelle que soit leur portée."
  - id: guard
    prompt: "À quoi sert l'instruction guard en Swift ?"
    answer: "Sortir tôt de la fonction si une condition n'est pas remplie"
    decoys:
      - "Protéger une variable contre les accès concurrents entre threads"
      - "Intercepter les exceptions levées par le bloc de code qui la suit"
    why: "guard condition else { return } impose de quitter la portée si la condition échoue, ce qui évite l'imbrication. Les erreurs s'interceptent avec do/catch."
  - id: if-let
    prompt: "Que fait if let x = valeurOptionnelle { … } en Swift ?"
    answer: "Il déballe l'optionnel et n'exécute le bloc que s'il contient une valeur"
    decoys:
      - "Il déclare une constante x et l'initialise à nil par défaut"
      - "Il convertit l'optionnel en booléen et lève une erreur s'il vaut nil"
    why: "La liaison optionnelle (optional binding) donne accès à la valeur non optionnelle dans le bloc ; si l'optionnel vaut nil, le bloc est simplement ignoré."
  - id: deballage-force
    prompt: "Que se passe-t-il si l'on force le déballage (valeur!) d'un optionnel qui vaut nil ?"
    answer: "Le programme plante à l'exécution"
    decoys:
      - "Le compilateur refuse de compiler le fichier"
      - "La valeur est remplacée par zéro ou par une chaîne vide"
    why: "Le ! dit au compilateur « fais-moi confiance » : il compile, mais un nil provoque un arrêt brutal à l'exécution."
  - id: struct-class
    prompt: "Quelle différence principale entre struct et class en Swift ?"
    answer: "Une struct est un type valeur (copiée), une classe un type référence"
    decoys:
      - "Une struct est gérée par un ramasse-miettes, une classe par ARC"
      - "Une struct ne peut pas avoir de méthodes, contrairement à une classe"
    why: "Affecter une struct en crée une copie ; deux variables peuvent pointer vers la même instance de classe. Les structs ont aussi des méthodes, et Swift n'a pas de ramasse-miettes."
  - id: protocoles
    prompt: "Qu'est-ce qu'un protocole en Swift ?"
    answer: "Un ensemble d'exigences (méthodes, propriétés) qu'un type s'engage à fournir"
    decoys:
      - "Un format réseau utilisé pour communiquer avec les serveurs d'Apple"
      - "Une règle de nommage imposée par Xcode à tous les fichiers du projet"
    why: "Un protocole joue le rôle d'une interface : classes, structs et enums peuvent s'y conformer. Swift se décrit d'ailleurs comme orienté protocoles."
  - id: cycles-references
    prompt: "Quel piège l'ARC de Swift ne résout-il pas tout seul ?"
    answer: "Les cycles de références fortes, à casser avec weak ou unowned"
    decoys:
      - "Les pauses du ramasse-miettes pendant les collectes de mémoire"
      - "Les doubles libérations de mémoire faites à la main avec free"
    why: "Deux objets qui se référencent mutuellement ne tombent jamais à zéro référence : ils fuient. ARC n'a pas de ramasse-miettes, et Swift ne libère pas la mémoire à la main."
  - id: enums-valeurs-associees
    prompt: "Qu'ont de particulier les enums de Swift ?"
    answer: "Chaque cas peut porter ses propres valeurs associées"
    decoys:
      - "Chaque cas est forcément un entier qui commence à zéro"
      - "Elles ne peuvent pas être utilisées dans un switch"
    why: "case erreur(code: Int) attache des données à un cas, ce qui fait des enums Swift des types riches. Elles se combinent naturellement avec switch."
  - id: switch-exhaustif
    prompt: "Que vérifie le compilateur Swift sur une instruction switch ?"
    answer: "Qu'elle est exhaustive : tous les cas possibles sont traités"
    decoys:
      - "Qu'elle contient au moins trois cas et un break dans chacun"
      - "Qu'elle ne porte que sur des entiers ou des chaînes de caractères"
    why: "Un switch doit couvrir toutes les valeurs (ou avoir un default). Les break ne sont pas nécessaires et switch accepte enums, tuples ou plages."
  - id: async-await
    prompt: "Qu'a introduit Swift 5.5 (2021) pour le code concurrent ?"
    answer: "async/await et les acteurs"
    decoys:
      - "Les goroutines et les canaux"
      - "Les callbacks obligatoires, sans alternative"
    why: "Swift 5.5 a intégré la concurrence au langage avec async/await et les actors. Les goroutines et canaux viennent de Go."
  - id: actor
    prompt: "Qu'est-ce qu'un acteur (actor) en Swift ?"
    answer: "Un type qui protège son état des accès concurrents simultanés"
    decoys:
      - "Un composant d'interface SwiftUI qui joue une animation"
      - "Un processus séparé lancé pour chaque requête réseau"
    why: "Un actor sérialise l'accès à ses propriétés : un seul appel à la fois les modifie, ce qui évite les courses de données sans verrou manuel."
  - id: xcode
    prompt: "Quel est l'IDE de référence pour développer en Swift sur les plateformes Apple ?"
    answer: "Xcode"
    decoys:
      - "Android Studio"
      - "IntelliJ IDEA"
      - "Visual Studio"
    why: "Xcode, l'IDE d'Apple, fournit le compilateur, les simulateurs et la publication sur l'App Store. Android Studio sert à Android."
  - id: swift-package-manager
    prompt: "Quel est le gestionnaire de paquets officiel de Swift ?"
    answer: "Swift Package Manager"
    decoys:
      - "Gradle, comme pour Kotlin"
      - "Cargo, comme pour Rust"
      - "Maven Central"
    why: "Swift Package Manager fait partie de la chaîne d'outils Swift et est intégré à Xcode. Gradle, Cargo et Maven appartiennent à d'autres écosystèmes."
  - id: playgrounds
    prompt: "Que sont les Playgrounds de Swift ?"
    answer: "Un environnement pour tester du code et voir le résultat immédiatement"
    decoys:
      - "Une boutique de jeux réservée aux applications écrites en Swift"
      - "Un service qui exécute les tests de l'application sur de vrais iPhone"
    why: "Un playground exécute le code au fil de l'écriture et affiche les valeurs, pratique pour apprendre ou prototyper."
  - id: inference-types
    prompt: "Dans let n = 42, comment Swift connaît-il le type de n ?"
    answer: "Par inférence : il déduit Int de la valeur"
    decoys:
      - "Il ne le connaît pas : n reste non typé jusqu'à l'exécution"
      - "Il attribue toujours le type Any aux littéraux"
    why: "Swift est typé statiquement mais infère le type à partir de l'initialisation : pas besoin d'écrire let n: Int = 42."
  - id: uikit
    prompt: "Avec quel framework construisait-on les interfaces iOS avant SwiftUI ?"
    answer: "UIKit"
    decoys:
      - "Jetpack Compose"
      - "Flutter"
      - "Qt"
    why: "UIKit, impératif, reste très utilisé et cohabite avec SwiftUI. Jetpack Compose est l'équivalent d'Android, Flutter un framework multiplateforme de Google."
  - id: throws
    prompt: "Comment une fonction Swift signale-t-elle qu'elle peut échouer ?"
    answer: "Elle est marquée throws, et on l'appelle avec try"
    decoys:
      - "Elle renvoie toujours -1 en cas d'échec, par convention"
      - "Elle lève une exception non déclarée, attrapée par le système"
    why: "Une fonction throws doit être appelée avec try, dans un bloc do/catch ou une fonction elle-même throws : l'erreur ne peut pas passer inaperçue."
  - id: chris-lattner
    prompt: "Qui est à l'origine de Swift chez Apple ?"
    answer: "Chris Lattner, également créateur de LLVM"
    decoys:
      - "James Gosling, également créateur de Java"
      - "Guido van Rossum, également créateur de Python"
    why: "Chris Lattner a lancé Swift chez Apple ; il avait auparavant créé LLVM, l'infrastructure de compilation sur laquelle Swift s'appuie."
  - id: compilation-native
    prompt: "Comment le code Swift d'une application iPhone est-il exécuté ?"
    answer: "Compilé à l'avance en code machine natif, via LLVM"
    decoys:
      - "Interprété par une machine virtuelle, comme la JVM"
      - "Traduit en JavaScript et exécuté dans une WebView"
    why: "Swift est un langage compilé : le compilateur produit du code machine pour le processeur de l'appareil, sans machine virtuelle."
  - id: closures
    prompt: "Que désigne une closure en Swift ?"
    answer: "Un bloc de code qui capture les variables de son contexte"
    decoys:
      - "Le mot-clé qui ferme une classe à l'héritage"
      - "Une fonction appelée à la fermeture de l'application"
    why: "Une closure est une fonction anonyme qu'on passe en paramètre (map, completion handlers) et qui garde accès aux variables environnantes. Fermer une classe, c'est final."
---
