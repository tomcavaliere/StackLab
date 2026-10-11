---
questions:
  - id: compilateur
    prompt: "Qu'est-ce qui distingue Svelte de React et de Vue ?"
    answer: "Son compilateur génère, au build, le code qui met à jour exactement les éléments concernés"
    decoys:
      - "Il utilise un DOM virtuel plus rapide que celui de React, recalculé dans le navigateur"
      - "Il rend tout côté serveur et n'envoie aucun JavaScript"
    why: "Le travail que React et Vue font dans le navigateur, Svelte le fait au moment du build."
  - id: poids
    prompt: "Quel avantage la compilation de Svelte apporte-t-elle au navigateur ?"
    answer: "Moins de JavaScript à télécharger, avec un runtime minimal"
    decoys:
      - "Aucun JavaScript du tout"
      - "Un cache intégré des requêtes HTTP, partagé entre les composants"
    why: "Le navigateur reçoit le code de mise à jour ciblé, sans gros runtime."
  - id: runes
    prompt: "Qu'a introduit Svelte 5, en 2024 ?"
    answer: "Les runes ($state, $derived), pour déclarer explicitement la réactivité"
    decoys:
      - "Un DOM virtuel, pour s'aligner sur le fonctionnement interne de React et de Vue"
      - "L'obligation d'écrire les composants en classes"
    why: "Les runes rendent la réactivité explicite."
  - id: sveltekit
    prompt: "Quel rôle SvelteKit joue-t-il ?"
    answer: "Celui de Next.js pour React : routage, rendu serveur et routes d'API"
    decoys:
      - "Un ORM pour applications Svelte"
      - "Une bibliothèque de composants graphiques prêts à l'emploi"
    why: "SvelteKit permet une application full-stack avec Svelte."
  - id: fichiers
    prompt: "Comment s'écrivent les composants Svelte ?"
    answer: "Dans des fichiers .svelte, proches du HTML"
    decoys:
      - "Uniquement en JSX, comme React"
      - "En YAML, compilé ensuite en JavaScript par l'outil"
    why: "La syntaxe proche du HTML fait partie de sa prise en main rapide."
  - id: createur
    prompt: "Qui a créé Svelte ?"
    answer: "Rich Harris, en 2016"
    decoys:
      - "Evan You, en 2014"
      - "Meta, en 2013"
    why: "Evan You a créé Vue, Meta React."
  - id: quand
    prompt: "Quand Svelte est-il un bon choix ?"
    answer: "Pour des interfaces où le poids compte : widgets intégrés à d'autres pages, appareils modestes"
    decoys:
      - "Pour une application mobile qui doit partager tout son code avec React Native"
      - "Pour une grande équipe déjà formée à React"
    why: "Ces deux autres cas figurent dans « Quand l'éviter »."
  - id: inconvenient
    prompt: "Quel est le principal inconvénient de Svelte ?"
    answer: "Un choix de bibliothèques et de développeurs plus restreint qu'avec React"
    decoys:
      - "Il envoie trop de JavaScript au navigateur, à cause de son runtime"
      - "Il ne fonctionne pas avec TypeScript"
    why: "Svelte est léger et s'écrit en JavaScript ou TypeScript ; c'est son écosystème qui est plus petit."
  - id: dom-virtuel
    prompt: "Que font React et Vue, que Svelte évite ?"
    answer: "Recalculer dans le navigateur, à chaque changement d'état, ce qu'il faut mettre à jour (DOM virtuel)"
    decoys:
      - "Découper l'interface en composants réutilisables, chacun avec son propre fichier"
      - "Gérer un état"
    why: "Les trois utilisent des composants et un état ; Svelte se distingue par la compilation."
  - id: migration
    prompt: "Une grosse équipe formée à React : faut-il migrer vers Svelte ?"
    answer: "Non : le gain ne compense pas une migration"
    decoys:
      - "Oui : Svelte remplace avantageusement React dans tous les cas"
      - "Oui : le code React fonctionne tel quel dans Svelte"
    why: "Un code React ne tourne pas dans Svelte : il faudrait tout réécrire."
---
