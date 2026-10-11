---
questions:
  - id: reactivite
    prompt: "Qu'est-ce qui distingue Vue ?"
    answer: "Son système de réactivité : modifier une donnée met à jour ce qui en dépend"
    decoys:
      - "Il n'utilise pas de composants"
      - "Il rend tout côté serveur, sans aucun JavaScript exécuté dans le navigateur"
    why: "Comme React, Vue travaille en composants ; sa réactivité met à jour l'interface sans gestion explicite."
  - id: fichier-vue
    prompt: "Que regroupe un fichier .vue ?"
    answer: "Le gabarit HTML, la logique et le style d'un composant"
    decoys:
      - "La configuration du serveur de développement"
      - "Les routes de l'API"
    why: "Un composant tient dans un seul fichier."
  - id: progressif
    prompt: "Pourquoi Vue est-il dit « progressif » ?"
    answer: "On peut l'ajouter à une page existante comme bâtir une application complète"
    decoys:
      - "Il affiche la page progressivement, élément par élément, au fil du chargement"
      - "Ses nouvelles versions sont publiées progressivement"
    why: "On peut enrichir des pages rendues côté serveur sans tout réécrire."
  - id: projets-officiels
    prompt: "Quels projets officiels accompagnent Vue ?"
    answer: "Vue Router et Pinia"
    decoys:
      - "Redux et React Router"
      - "Express et Mongoose"
    why: "Routeur et gestion d'état sont officiels chez Vue. Redux et React Router appartiennent à l'écosystème React."
  - id: nuxt
    prompt: "Quel framework joue pour Vue le rôle que Next.js joue pour React ?"
    answer: "Nuxt"
    decoys:
      - "NestJS"
      - "Vite"
    why: "NestJS est un framework back-end ; Vite est un outil de build (créé par Evan You, auteur de Vue)."
  - id: createur
    prompt: "Qui a créé Vue ?"
    answer: "Evan You, en 2014"
    decoys:
      - "Meta, en 2013"
      - "Google, en 2010"
    why: "Meta a créé React, Google AngularJS."
  - id: react-native
    prompt: "Besoin de partager du code et des compétences avec une application React Native : que préférer ?"
    answer: "React, qui partage son modèle avec React Native"
    decoys:
      - "Vue, qui compile vers React Native"
      - "Indifférent : les deux partagent le même code"
    why: "La fiche range ce besoin dans « Quand l'éviter » pour Vue."
  - id: ecosysteme
    prompt: "Quand React est-il préférable à Vue ?"
    answer: "Quand la disponibilité de développeurs et de bibliothèques prime"
    decoys:
      - "Quand on veut une prise en main plus rapide pour l'équipe"
      - "Quand on veut un routeur officiel"
    why: "Prise en main rapide et routeur officiel sont des atouts de Vue ; l'écosystème de React est plus large."
  - id: reputation
    prompt: "Quelle réputation Vue a-t-il ?"
    answer: "Une prise en main rapide"
    decoys:
      - "Une courbe d'apprentissage très raide"
      - "Le plus grand écosystème front"
    why: "Vue est réputé facile à prendre en main ; le plus grand écosystème est celui de React."
  - id: api
    prompt: "Quelles API d'écriture des composants Vue propose-t-il ?"
    answer: "Options et Composition"
    decoys:
      - "Classes et Hooks"
      - "REST et GraphQL"
    why: "La documentation officielle compare l'API Options et l'API Composition."
---
