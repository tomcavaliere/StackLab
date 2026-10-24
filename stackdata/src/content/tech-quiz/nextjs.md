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
  - id: fichier-page
    prompt: "Avec l'App Router, quel fichier rend un dossier de app/ accessible comme une page ?"
    answer: "page.tsx (ou page.js)"
    decoys:
      - "index.html"
      - "route.config.json"
      - "layout.tsx, seul"
    why: "Un segment de app/ devient une route publique quand il contient un fichier page. layout définit l'habillage partagé, pas la page."
  - id: layout
    prompt: "Quel est le rôle d'un fichier layout.tsx dans l'App Router ?"
    answer: "Une interface partagée par les pages du segment, conservée à la navigation"
    decoys:
      - "La configuration du serveur : port, variables d'environnement et redirections"
      - "Le gabarit d'e-mail du projet"
    why: "Un layout enveloppe les pages de son segment et ne se re-rend pas quand on navigue entre elles : en-tête, menu, barre latérale."
  - id: serveur-par-defaut
    prompt: "Dans l'App Router, un composant sans directive particulière est-il un composant serveur ou client ?"
    answer: "Un composant serveur"
    decoys:
      - "Un composant client"
      - "Les deux : il est exécuté deux fois par défaut"
    why: "L'App Router rend les composants côté serveur par défaut ; il faut \"use client\" pour en faire des composants client."
  - id: use-client
    prompt: "Que signale la directive \"use client\" en tête d'un fichier Next.js ?"
    answer: "Une frontière : ce composant et ses imports partent au navigateur"
    decoys:
      - "Le composant ne sera jamais rendu côté serveur, même au premier affichage de la page"
      - "Le fichier est réservé aux clients authentifiés"
    why: "Un composant client est envoyé au navigateur pour l'interactivité, mais il est quand même pré-rendu en HTML côté serveur au premier affichage."
  - id: hooks-etat
    prompt: "Un composant utilise useState et un gestionnaire onClick. Que doit-il être dans l'App Router ?"
    answer: "Un composant client"
    decoys:
      - "Un composant serveur"
      - "Une route d'API"
    why: "L'état et les événements n'existent que dans le navigateur : les composants serveur ne peuvent pas utiliser useState ni onClick."
  - id: route-dynamique
    prompt: "Comment déclarer une route dynamique /blog/<slug> avec l'App Router ?"
    answer: "Un dossier app/blog/[slug] contenant un fichier page"
    decoys:
      - "Un dossier app/blog/:slug contenant un fichier page"
      - "Un dossier app/blog/{slug} contenant un fichier page"
    why: "Les crochets marquent un segment dynamique, dont la valeur est transmise à la page. La syntaxe :slug est celle d'Express."
  - id: route-handler
    prompt: "Comment écrire un point d'API dans l'App Router ?"
    answer: "Un fichier route.ts qui exporte des fonctions GET, POST…"
    decoys:
      - "Un fichier api.json qui décrit les routes et leurs réponses"
      - "Un composant serveur qui retourne du JSON à la place du JSX"
    why: "Les route handlers (route.ts) reçoivent une requête web standard et renvoient une Response. Un composant rend de l'interface."
  - id: server-actions
    prompt: "Qu'est-ce qu'une Server Action dans Next.js ?"
    answer: "Une fonction marquée \"use server\", appelée depuis le client mais exécutée sur le serveur"
    decoys:
      - "Une tâche planifiée qui s'exécute à intervalle régulier sur le serveur"
      - "Un script lancé une fois au build"
    why: "Une Server Action se branche par exemple sur un formulaire : Next.js gère l'appel réseau. Ce n'est ni un cron ni un script de build."
  - id: loading
    prompt: "À quoi sert un fichier loading.tsx dans l'App Router ?"
    answer: "Afficher immédiatement un état de chargement pendant que le segment se rend"
    decoys:
      - "Précharger toutes les images du site au démarrage de l'application"
      - "Mesurer le temps de chargement des pages"
    why: "loading.tsx enveloppe le segment dans une frontière Suspense : l'utilisateur voit un retour immédiat."
  - id: error-boundary
    prompt: "Quel fichier de l'App Router affiche une interface de repli quand un segment lève une erreur ?"
    answer: "error.tsx, qui doit être un composant client"
    decoys:
      - "error.tsx, qui doit être un composant serveur"
      - "500.html, placé dans le dossier public"
    why: "error.tsx est une frontière d'erreur React, qui exige un composant client pour gérer l'état et la relance."
  - id: not-found
    prompt: "Dans une page de l'App Router, comment afficher la page 404 quand l'article demandé n'existe pas ?"
    answer: "Appeler notFound(), qui rend le fichier not-found.tsx"
    decoys:
      - "Retourner null : Next.js en déduit une 404"
      - "Lever une exception HTTP 404, comme avec NestJS"
    why: "notFound() interrompt le rendu et affiche l'interface not-found du segment, avec le statut 404."
  - id: composant-link
    prompt: "Pourquoi utiliser le composant Link de Next.js plutôt qu'une balise <a> pour les liens internes ?"
    answer: "Navigation côté client sans rechargement, avec préchargement des pages"
    decoys:
      - "Les balises <a> sont interdites dans les composants serveur et cassent le build"
      - "Link chiffre l'URL de destination"
    why: "Link évite le rechargement complet et précharge les routes visibles. Une balise <a> reste valide, mais recharge la page."
  - id: next-image
    prompt: "Qu'apporte le composant Image de Next.js ?"
    answer: "L'optimisation des images : redimensionnement, chargement différé, formats modernes"
    decoys:
      - "La génération d'images par intelligence artificielle"
      - "Le stockage des images dans une base de données"
    why: "next/image sert des images adaptées à l'écran et chargées au besoin, ce qui améliore le premier affichage."
  - id: generate-static-params
    prompt: "À quoi sert generateStaticParams dans une route dynamique de l'App Router ?"
    answer: "Lister les valeurs du segment à pré-rendre au build"
    decoys:
      - "Valider les paramètres d'URL reçus à chaque requête, avant le rendu de la page"
      - "Générer des paramètres aléatoires pour les tests"
    why: "Next.js génère au build une page statique par valeur retournée, par exemple un slug par article."
  - id: metadata
    prompt: "Comment définir le titre et la description d'une page pour le référencement dans l'App Router ?"
    answer: "Exporter un objet metadata ou une fonction generateMetadata"
    decoys:
      - "Modifier document.title dans un useEffect du composant de la page"
      - "Les écrire dans next.config.js"
    why: "L'API metadata produit les balises du <head> côté serveur. document.title n'agit qu'après exécution dans le navigateur."
  - id: pages-router
    prompt: "Avant l'App Router, quel système de routage Next.js utilisait-il ?"
    answer: "Le Pages Router, avec le dossier pages/ et getServerSideProps"
    decoys:
      - "Un routeur configuré dans un fichier routes.xml"
      - "React Router, intégré tel quel au framework"
    why: "Le Pages Router (pages/, getStaticProps, getServerSideProps) est toujours pris en charge ; l'App Router (app/) est l'approche recommandée."
  - id: isr
    prompt: "Qu'est-ce que la régénération statique incrémentale (ISR) dans Next.js ?"
    answer: "Régénérer une page statique après le déploiement, sans tout reconstruire"
    decoys:
      - "Compiler seulement les fichiers modifiés pendant le développement local"
      - "Charger la page par morceaux dans le navigateur"
    why: "Avec l'ISR (revalidate), une page statique est reconstruite en arrière-plan après un délai ou sur demande."
  - id: next-public
    prompt: "Quelles variables d'environnement Next.js expose-t-il au code envoyé au navigateur ?"
    answer: "Celles préfixées par NEXT_PUBLIC_"
    decoys:
      - "Toutes celles du fichier .env, sans exception"
      - "Aucune : elles ne sont jamais accessibles côté client"
    why: "Seules les variables NEXT_PUBLIC_ sont intégrées au JavaScript client ; les autres restent côté serveur, ce qui protège les secrets."
  - id: groupes-routes
    prompt: "Que fait un dossier entre parenthèses, comme app/(marketing), dans l'App Router ?"
    answer: "Il organise les routes sans apparaître dans l'URL"
    decoys:
      - "Il rend les routes du dossier privées, réservées aux utilisateurs connectés"
      - "Il crée un segment dynamique facultatif"
    why: "Un groupe de routes sert à regrouper des pages ou à leur donner un layout commun, sans changer leurs URL."
  - id: export-statique
    prompt: "Que produit l'option output: 'export' de next.config ?"
    answer: "Un site entièrement statique, hébergeable sans serveur Node.js"
    decoys:
      - "Une image Docker prête à déployer"
      - "Un paquet npm réutilisable dans d'autres projets"
    why: "L'export statique génère du HTML, du CSS et du JavaScript ; les fonctions qui exigent un serveur ne sont alors pas disponibles."
---
