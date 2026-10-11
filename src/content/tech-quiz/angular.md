---
questions:
  - id: framework-complet
    prompt: "Qu'est-ce qui distingue Angular de React ?"
    answer: "C'est un framework complet : routeur, formulaires, client HTTP et injection de dépendances fournis"
    decoys:
      - "C'est une simple bibliothèque d'interface : routage, formulaires et appels HTTP restent à choisir à part"
      - "Il compile les composants au build pour se passer de tout runtime"
    why: "Angular fournit tout dans un cadre unique. Compiler les composants pour réduire le runtime, c'est l'approche de Svelte."
  - id: langage
    prompt: "En quel langage écrit-on une application Angular ?"
    answer: "TypeScript"
    decoys:
      - "Dart"
      - "Kotlin"
    why: "Angular est écrit en TypeScript et s'utilise en TypeScript."
  - id: angularjs
    prompt: "Quel lien y a-t-il entre Angular et AngularJS ?"
    answer: "Angular (2016) est une réécriture complète, en TypeScript, d'AngularJS (2010)"
    decoys:
      - "C'est la version suivante d'AngularJS, compatible sans migration"
      - "Ce sont deux projets concurrents et indépendants, l'un maintenu par Google, l'autre par Meta"
    why: "Les deux viennent de Google, mais Angular a tout réécrit."
  - id: injection
    prompt: "À quoi sert l'injection de dépendances dans Angular ?"
    answer: "Structurer et fournir les services partagés entre composants"
    decoys:
      - "Injecter du HTML brut dans la page"
      - "Télécharger automatiquement les paquets npm manquants au démarrage de l'application"
    why: "Les services sont fournis aux composants qui en ont besoin, sans qu'ils les créent eux-mêmes."
  - id: rythme
    prompt: "À quel rythme paraît une version majeure d'Angular ?"
    answer: "Tous les six mois"
    decoys:
      - "Tous les cinq ans"
      - "Jamais : l'API est figée depuis 2016"
    why: "Ce rythme régulier a permis de moderniser le framework par étapes."
  - id: modernisation
    prompt: "Qu'ont apporté les versions récentes d'Angular ?"
    answer: "Des composants autonomes sans modules, les signaux et une nouvelle syntaxe de contrôle"
    decoys:
      - "Le passage de TypeScript à JavaScript sans types, pour simplifier l'outillage des projets"
      - "La suppression du routeur officiel"
    why: "Angular a allégé son modèle (composants autonomes) et adopté les signaux pour la réactivité."
  - id: cible
    prompt: "Pour quel projet Angular est-il le plus adapté ?"
    answer: "Une grosse application métier riche en formulaires, développée par plusieurs équipes"
    decoys:
      - "Un site vitrine statique de quelques pages"
      - "Un MVP monté en un week-end par un développeur seul, qui veut démarrer avec le moins de concepts possible"
    why: "Un cadre commun évite que chaque équipe choisisse ses propres outils."
  - id: petite-equipe
    prompt: "Pourquoi Angular pèse-t-il pour une petite équipe ?"
    answer: "Le nombre de concepts à apprendre : injection de dépendances, RxJS, cycle de vie des composants"
    decoys:
      - "Il impose un back-end écrit en Java ou en C#, dont le front doit partager les classes et les annotations"
      - "Il ne fonctionne que sur Google Cloud"
    why: "Angular n'impose ni back-end ni hébergeur ; c'est sa richesse qui coûte en apprentissage."
  - id: profil
    prompt: "Quelle équipe se sent vite à l'aise avec Angular ?"
    answer: "Une équipe venue de Java ou de C#, habituée au typage, aux classes et à l'injection de dépendances"
    decoys:
      - "Une équipe data qui pratique surtout Python et SQL"
      - "Une équipe mobile qui veut réutiliser telle quelle sa base de code React Native et tous ses composants"
    why: "Les concepts d'Angular rappellent ceux des back-ends Java et .NET."
  - id: cli
    prompt: "Que fait la CLI d'Angular ?"
    answer: "Elle génère le code selon des conventions communes"
    decoys:
      - "Elle déploie l'application sur Google Cloud en une seule commande"
      - "Elle convertit du code React en Angular"
    why: "Générer composants et services selon les mêmes conventions garde le code homogène entre équipes."
---
