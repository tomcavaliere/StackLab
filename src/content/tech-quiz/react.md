---
questions:
  - id: principe
    prompt: "Quel est le principe de React ?"
    answer: "On décrit l'interface pour un état donné ; React met la page à jour quand l'état change"
    decoys:
      - "On modifie à la main chaque élément de la page concerné, à chaque changement de donnée"
      - "Le serveur renvoie toute la page à chaque clic"
    why: "React calcule les changements à appliquer : on ne synchronise plus la page à la main."
  - id: jsx
    prompt: "Qu'est-ce que JSX ?"
    answer: "Une syntaxe qui écrit du HTML dans du JavaScript"
    decoys:
      - "Un format d'échange de données, comme JSON"
      - "Un moteur de base de données embarqué"
    why: "Les composants React décrivent l'interface en JSX."
  - id: bibliotheque
    prompt: "Que fournit React lui-même ?"
    answer: "Seulement l'interface : routage, données et build relèvent d'autres outils"
    decoys:
      - "Le routage, un ORM et le rendu serveur, intégrés et configurés d'office"
      - "Un serveur web complet"
    why: "React est une bibliothèque d'interface. Next.js ou React Router complètent le reste."
  - id: createur
    prompt: "Qui a créé React ?"
    answer: "Facebook (aujourd'hui Meta), open-source depuis 2013"
    decoys:
      - "Google, en 2010, avant qu'il ne passe chez Meta"
      - "Evan You, en 2014, pour un projet personnel"
    why: "Google a créé AngularJS en 2010 ; Evan You a créé Vue en 2014."
  - id: site-statique
    prompt: "Un site vitrine essentiellement statique : React est-il nécessaire ?"
    answer: "Non : un générateur de site ou du HTML rendu côté serveur suffit"
    decoys:
      - "Oui : tout site moderne en a besoin"
      - "Oui : React réduit la quantité de JavaScript envoyée au navigateur"
    why: "Sur un site statique, React enverrait du JavaScript inutile au navigateur."
  - id: crud-serveur
    prompt: "Une application CRUD simple, une équipe qui maîtrise Django : que conseille la fiche ?"
    answer: "Des pages rendues par Django, pour ne pas maintenir deux applications"
    decoys:
      - "React, indispensable pour un CRUD"
      - "React Native, pour préparer dès maintenant une version mobile"
    why: "Un front React séparé double le nombre d'applications à maintenir, sans bénéfice pour un CRUD simple."
  - id: vs-vue
    prompt: "Quel avantage React a-t-il face à Vue ?"
    answer: "L'écosystème le plus large et un recrutement facile"
    decoys:
      - "Une courbe d'apprentissage plus douce"
      - "Un routeur et une gestion d'état officiels, maintenus par l'équipe React"
    why: "Prise en main douce, routeur et état officiels sont des atouts de Vue."
  - id: mobile
    prompt: "Comment partager ses compétences React avec le mobile ?"
    answer: "Avec React Native"
    decoys:
      - "Avec Next.js"
      - "Avec Flutter"
    why: "React Native reprend le même modèle de composants. Flutter s'écrit en Dart."
  - id: liberte
    prompt: "Quel inconvénient React présente-t-il pour une équipe qui veut un cadre imposé ?"
    answer: "Il laisse beaucoup de choix d'architecture à faire"
    decoys:
      - "Il impose une architecture unique et rigide à toutes les équipes"
      - "Il interdit TypeScript"
    why: "Routage, données, état : avec React, tout se choisit. Angular, à l'inverse, fournit un cadre complet."
  - id: framework
    prompt: "Quel framework construit sur React fournit routage et rendu serveur ?"
    answer: "Next.js"
    decoys:
      - "Nuxt"
      - "SvelteKit"
    why: "Next.js est construit sur React. Nuxt joue ce rôle pour Vue, SvelteKit pour Svelte."
---
