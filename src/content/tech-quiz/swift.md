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
---
