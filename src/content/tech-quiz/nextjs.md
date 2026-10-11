---
questions:
  - id: apport
    prompt: "Qu'ajoute Next.js à React ?"
    answer: "Le routage, le rendu côté serveur ou statique et des routes d'API"
    decoys:
      - "Un ORM et une interface d'administration"
      - "Un moteur de rendu natif pour iOS et Android, à la place de React Native"
    why: "Next.js fournit d'un coup les briques qu'une application React seule doit assembler. Le mobile natif, c'est React Native."
  - id: page-vide
    prompt: "Quel problème d'une application React seule Next.js résout-il ?"
    answer: "La page arrive vide et se remplit en JavaScript : premier affichage lent, référencement difficile"
    decoys:
      - "React ne sait pas gérer l'état d'une interface : il faut une bibliothèque externe pour chaque composant"
      - "React ne fonctionne pas avec TypeScript"
    why: "Le rendu côté serveur ou statique envoie une page déjà remplie."
  - id: routage-fichiers
    prompt: "Comment le routage est-il défini dans Next.js ?"
    answer: "Par fichiers : l'arborescence des dossiers donne les routes"
    decoys:
      - "Dans un fichier XML central"
      - "Par un routeur à configurer à la main dans chaque composant"
    why: "Le routage par fichiers évite de configurer un routeur."
  - id: composants-serveur
    prompt: "Que permettent les composants serveur de l'App Router ?"
    answer: "S'exécuter uniquement sur le serveur, lire directement une base et envoyer moins de JavaScript"
    decoys:
      - "Exécuter du code natif sur le téléphone de l'utilisateur, sans passer par le navigateur"
      - "Remplacer la base de données de l'application"
    why: "Depuis l'App Router (stable en 2023), une partie des composants ne part jamais au navigateur."
  - id: editeur
    prompt: "Qui édite Next.js ?"
    answer: "Vercel"
    decoys:
      - "Meta"
      - "Google"
    why: "Vercel a publié Next.js en 2016 et l'héberge sans configuration. Meta édite React."
  - id: auto-hebergement
    prompt: "Peut-on héberger Next.js ailleurs que sur Vercel ?"
    answer: "Oui : sur Node.js ou dans un conteneur Docker"
    decoys:
      - "Non : Next.js ne tourne que sur Vercel"
      - "Oui, mais uniquement sous forme de site statique"
    why: "L'auto-hébergement sur Node.js ou Docker reste possible, rendu serveur compris."
  - id: back-end-lourd
    prompt: "Tâches de fond, traitements longs, logique métier complexe : Next.js seul suffit-il ?"
    answer: "Non : un back-end dédié est plus adapté, et Next.js devient seulement le front"
    decoys:
      - "Oui : les routes d'API gèrent les workers permanents"
      - "Oui : les composants serveur exécutent les tâches de fond et les traitements longs"
    why: "Les routes d'API conviennent à un back-end léger. Pour du lourd, Django, Rails ou Spring Boot sont plus adaptés."
  - id: quand-l-utiliser
    prompt: "Quand Next.js est-il un bon choix ?"
    answer: "Une application React qui a besoin d'un bon premier affichage ou de référencement"
    decoys:
      - "Une interface interne derrière une connexion, sans aucun besoin de référencement ni de premier affichage rapide"
      - "Une application mobile native"
    why: "SaaS, e-commerce, contenu : le rendu serveur paie. Derrière une connexion, React avec un build simple suffit."
  - id: complexite
    prompt: "Quelle difficulté propre à Next.js la fiche signale-t-elle ?"
    answer: "La frontière entre composants serveur et client, qui demande un temps d'apprentissage"
    decoys:
      - "Next.js n'accepte pas TypeScript : tout le projet doit rester en JavaScript"
      - "Next.js impose une base MongoDB"
    why: "Savoir ce qui s'exécute où ajoute une complexité réelle."
  - id: previews
    prompt: "Quel avantage le déploiement sur Vercel apporte-t-il ?"
    answer: "Une préversion par branche"
    decoys:
      - "Un ORM intégré"
      - "Un cluster Kubernetes inclus"
    why: "Chaque branche obtient sa propre URL : on fait valider chaque changement avant de le fusionner."
---
