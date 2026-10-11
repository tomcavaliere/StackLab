---
questions:
  - id: rendu-natif
    prompt: "Comment React Native affiche-t-il l'interface ?"
    answer: "Avec les vues natives de chaque plateforme"
    decoys:
      - "Dans une WebView, comme une page web empaquetée"
      - "Avec son propre moteur qui dessine chaque pixel, identique partout"
    why: "Les composants React sont rendus avec les vues natives. Dessiner chaque pixel soi-même, c'est l'approche de Flutter."
  - id: probleme
    prompt: "Quel problème React Native résout-il ?"
    answer: "Écrire une seule application en React pour iOS et Android"
    decoys:
      - "Accélérer le chargement des sites web"
      - "Remplacer le back-end des applications mobiles par du JavaScript"
    why: "Sans lui, il faut souvent deux applications : Swift pour iOS, Kotlin pour Android."
  - id: code-natif
    prompt: "Peut-on appeler du code natif depuis React Native ?"
    answer: "Oui, quand il le faut : caméra, capteurs, SDK spécifiques"
    decoys:
      - "Non, jamais"
      - "Oui, mais uniquement sur Android, iOS l'interdisant"
    why: "Le framework peut appeler du code natif sur les deux plateformes."
  - id: nouvelle-architecture
    prompt: "Que réduit la « nouvelle architecture », active par défaut depuis 2024 ?"
    answer: "Le coût des échanges entre JavaScript et le natif"
    decoys:
      - "La taille des images de l'application"
      - "Le nombre de plateformes prises en charge, recentré sur iOS"
    why: "Les échanges entre JavaScript et le natif étaient un point faible historique ; la nouvelle architecture les allège."
  - id: expo
    prompt: "Qu'apporte Expo ?"
    answer: "Un outillage (build, mises à jour, modules) qui simplifie beaucoup le démarrage"
    decoys:
      - "Un back-end hébergé avec base de données, authentification et stockage de fichiers"
      - "Un moteur de jeu 3D"
    why: "Expo évite une grande partie de la configuration native au démarrage."
  - id: airbnb
    prompt: "Quelle entreprise a abandonné React Native en 2018, en expliquant pourquoi sur son blog ?"
    answer: "Airbnb"
    decoys:
      - "Meta"
      - "Instagram"
    why: "Airbnb avait déjà des équipes iOS et Android solides ; l'intégration dans ses applications existantes s'est révélée coûteuse."
  - id: natif-intensif
    prompt: "Usage intensif de fonctionnalités natives et graphismes exigeants : React Native est-il adapté ?"
    answer: "Peu : on finit par écrire beaucoup de code natif quand même"
    decoys:
      - "Très : il est plus rapide que du code natif, grâce au moteur JavaScript"
      - "Très : il n'y a jamais besoin de code natif"
    why: "Le gain d'une base de code unique s'efface quand l'essentiel est natif."
  - id: createur
    prompt: "Qui a créé React Native ?"
    answer: "Meta, en 2015"
    decoys:
      - "Google, en 2018"
      - "Vercel, en 2016"
    why: "Meta a créé React puis React Native. Google a sorti Flutter 1.0 en 2018, Vercel Next.js en 2016."
  - id: bon-usage
    prompt: "Quel type d'application convient bien à React Native ?"
    answer: "Formulaires, listes, contenus : quand l'interface native standard suffit"
    decoys:
      - "Un jeu vidéo en 3D aux graphismes exigeants, avec un moteur de rendu dédié"
      - "Un pilote de périphérique pour un capteur"
    why: "Une interface standard tire pleinement parti des vues natives, sans code natif à écrire."
  - id: mises-a-jour-os
    prompt: "Quel inconvénient apparaît lors des mises à jour majeures d'iOS ou d'Android ?"
    answer: "Il faut parfois attendre ou corriger des bibliothèques tierces"
    decoys:
      - "L'application est retirée des stores jusqu'à la mise à jour de React Native"
      - "Il faut réécrire l'application"
    why: "Les bibliothèques qui font le pont avec le natif doivent suivre chaque nouvelle version du système."
---
