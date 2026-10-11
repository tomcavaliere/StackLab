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
---
