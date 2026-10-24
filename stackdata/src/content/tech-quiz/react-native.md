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
  - id: composant-view
    prompt: "Quel composant de base de React Native joue le rôle d'un conteneur, comme une div sur le web ?"
    answer: "View"
    decoys:
      - "div, comme dans React pour le web"
      - "Container"
    why: "React Native n'a pas de balises HTML : View est le conteneur de base, traduit en vue native sur chaque plateforme."
  - id: composant-text
    prompt: "Dans React Native, où doit se trouver un texte affiché à l'écran ?"
    answer: "Dans un composant Text"
    decoys:
      - "Directement dans une View, comme du texte dans une div"
      - "Dans une balise p ou span"
    why: "Un texte brut placé hors d'un composant Text provoque une erreur. Les balises HTML comme p ou span n'existent pas en React Native."
  - id: styles
    prompt: "Comment applique-t-on des styles en React Native ?"
    answer: "Avec des objets JavaScript, par exemple via StyleSheet.create"
    decoys:
      - "Avec des fichiers CSS importés, comme dans une application React pour le web"
      - "Avec des fichiers XML de thème, comme une application Android native"
    why: "Les styles sont des objets JavaScript aux propriétés en camelCase (backgroundColor). Il n'y a pas de fichiers CSS ni de thèmes XML."
  - id: flex-direction
    prompt: "Quelle est la direction par défaut de flexbox en React Native ?"
    answer: "En colonne (column)"
    decoys:
      - "En ligne (row), comme en CSS sur le web"
      - "Il n'y a pas de flexbox en React Native"
    why: "React Native utilise flexbox pour la mise en page, mais avec flexDirection: column par défaut, contrairement au web où c'est row."
  - id: flatlist
    prompt: "Pourquoi utiliser FlatList plutôt qu'une ScrollView pour une longue liste ?"
    answer: "FlatList n'affiche que les éléments proches de l'écran"
    decoys:
      - "FlatList charge tous les éléments d'un coup, ce qui rend le défilement plus fluide"
      - "ScrollView ne fonctionne que sur iOS"
    why: "FlatList virtualise la liste. Une ScrollView rend tous ses enfants d'emblée, ce qui coûte cher en mémoire sur une longue liste."
  - id: hermes
    prompt: "Qu'est-ce que Hermes dans l'écosystème React Native ?"
    answer: "Un moteur JavaScript conçu par Meta pour React Native"
    decoys:
      - "Un moteur de rendu qui dessine chaque pixel, comme celui de Flutter"
      - "Un service d'hébergement de back-end proposé par Expo"
    why: "Hermes exécute le JavaScript de l'application et est le moteur par défaut de React Native. Il ne dessine pas l'interface, qui reste native."
  - id: metro
    prompt: "Quel est le rôle de Metro dans un projet React Native ?"
    answer: "Regrouper le code JavaScript en un bundle et le servir en développement"
    decoys:
      - "Compiler le JavaScript en code machine natif avant la publication sur les stores"
      - "Gérer la navigation entre les écrans"
    why: "Metro est le bundler de React Native. Le code JavaScript reste exécuté par un moteur comme Hermes ; la navigation relève d'autres bibliothèques."
  - id: fast-refresh
    prompt: "Que fait Fast Refresh pendant le développement d'une application React Native ?"
    answer: "Il affiche une modification du code presque instantanément, en gardant l'état des composants"
    decoys:
      - "Il publie automatiquement chaque modification sur les stores, après validation par Apple et Google"
      - "Il vide le cache du téléphone pour accélérer l'application"
    why: "C'est l'équivalent du hot reload de Flutter : on voit l'effet d'un changement sans relancer l'application."
  - id: bridge
    prompt: "Quel mécanisme historique la nouvelle architecture de React Native remplace-t-elle ?"
    answer: "Le bridge, qui sérialisait chaque échange entre JavaScript et natif"
    decoys:
      - "La WebView, dans laquelle s'affichait toute l'interface des premières versions"
      - "Le moteur Dart, utilisé avant le passage à JavaScript"
    why: "Le bridge faisait passer des messages asynchrones sérialisés ; la nouvelle architecture appelle le natif directement via JSI. React Native n'a jamais utilisé de WebView pour son interface ni de Dart."
  - id: fabric
    prompt: "Qu'est-ce que Fabric dans la nouvelle architecture de React Native ?"
    answer: "Le nouveau système de rendu"
    decoys:
      - "Un outil de build cloud, fourni par Expo pour produire les binaires"
      - "Une bibliothèque de composants Material, éditée par Google"
    why: "Fabric est le moteur de rendu de la nouvelle architecture ; les modules natifs y deviennent des TurboModules."
  - id: turbomodules
    prompt: "Qu'apportent les TurboModules aux modules natifs de React Native ?"
    answer: "Un chargement à la demande et des appels directs via JSI"
    decoys:
      - "La traduction automatique des modules natifs en JavaScript pur, sans code Swift ni Kotlin"
      - "L'exécution des modules natifs dans un serveur distant"
    why: "Les TurboModules ne sont chargés que lorsqu'on en a besoin et s'appellent sans passer par le bridge. Ils restent écrits en code natif."
  - id: code-par-plateforme
    prompt: "Comment écrire un comportement différent pour iOS et pour Android dans React Native ?"
    answer: "Avec Platform.OS ou des fichiers suffixés .ios.js et .android.js"
    decoys:
      - "C'est impossible : le code doit être strictement identique sur les deux plateformes"
      - "En créant deux projets React Native séparés, un par plateforme"
    why: "Platform.OS indique la plateforme à l'exécution, et Metro choisit automatiquement le fichier suffixé qui correspond."
  - id: expo-go
    prompt: "À quoi sert l'application Expo Go ?"
    answer: "Tester son projet sur un vrai téléphone sans compiler d'application native"
    decoys:
      - "Publier l'application sur l'App Store sans compte développeur Apple"
      - "Transformer une application React Native en site web"
    why: "Expo Go charge le JavaScript du projet sur un téléphone, à condition de se limiter aux modules natifs qu'elle embarque. La publication exige toujours un compte développeur."
  - id: eas-build
    prompt: "Que fait EAS Build, le service d'Expo ?"
    answer: "Il compile les binaires iOS et Android dans le cloud"
    decoys:
      - "Il héberge la base de données et l'authentification de l'application"
      - "Il convertit le code JavaScript en Swift et en Kotlin lisibles et modifiables"
    why: "EAS Build produit les binaires à publier sans configurer Xcode ni Android Studio sur sa machine. Ce n'est ni un back-end ni un traducteur de code."
  - id: mise-a-jour-ota
    prompt: "Quel type de mise à jour peut-on livrer sans republier l'application sur les stores ?"
    answer: "Un changement du seul code JavaScript, téléchargé au lancement"
    decoys:
      - "Un nouveau module natif en Swift ou en Kotlin, ajouté au binaire à distance"
      - "Aucune : toute modification passe par la validation des stores"
    why: "Les mises à jour OTA (Expo Updates, par exemple) remplacent le bundle JavaScript. Le code natif fait partie du binaire et impose une nouvelle publication."
  - id: navigation
    prompt: "La navigation entre écrans fait-elle partie du cœur de React Native ?"
    answer: "Non : on utilise une bibliothèque comme React Navigation ou Expo Router"
    decoys:
      - "Oui : le cœur fournit un routeur complet, configuré par des fichiers XML"
      - "Oui : on utilise React Router DOM, comme sur le web"
    why: "Le cœur reste minimal ; React Navigation et Expo Router sont les choix courants. React Router DOM dépend du DOM du navigateur."
  - id: pas-de-dom
    prompt: "Une bibliothèque React pour le web qui manipule le DOM fonctionne-t-elle dans React Native ?"
    answer: "Non : il n'y a pas de DOM"
    decoys:
      - "Oui : React Native émule un DOM complet au-dessus des vues natives"
      - "Oui, à condition de l'importer depuis react-dom/native"
    why: "React Native rend des vues natives, pas du HTML. Seul le code sans dépendance au DOM (logique métier, état) se partage avec le web."
  - id: learn-once
    prompt: "Quel slogan résume l'approche de React Native ?"
    answer: "« Learn once, write anywhere »"
    decoys:
      - "« Write once, run anywhere »"
      - "« Everything is a widget »"
    why: "On apprend React une fois et l'on écrit pour chaque plateforme, en adaptant si besoin. « Write once, run anywhere » est le slogan de Java ; « tout est widget » décrit Flutter."
  - id: pressable
    prompt: "Quel composant React Native sert à réagir à l'appui de l'utilisateur sur un élément ?"
    answer: "Pressable"
    decoys:
      - "onclick, posé sur une View"
      - "button, comme la balise HTML"
    why: "Pressable détecte les appuis et leurs états (appui long, relâchement). Les attributs et balises HTML n'existent pas en React Native."
  - id: thread-js
    prompt: "Pourquoi un calcul long en JavaScript peut-il faire ramer une application React Native ?"
    answer: "Il occupe le thread JavaScript, qui ne répond plus aux interactions"
    decoys:
      - "Il force le téléphone à basculer l'application dans une WebView, beaucoup plus lente"
      - "Il déclenche une nouvelle compilation de l'application sur le téléphone"
    why: "La logique de l'application tourne sur un thread JavaScript : tant qu'il calcule, les événements et une partie des animations attendent."
---
