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
  - id: usestate
    prompt: "Quel hook React donne à un composant fonction un état local qui déclenche un nouveau rendu quand il change ?"
    answer: "useState"
    decoys:
      - "useRef"
      - "useMemo"
      - "useContext"
    why: "useState renvoie la valeur et sa fonction de mise à jour. useRef garde une valeur sans provoquer de rendu, useMemo mémorise un calcul, useContext lit un contexte."
  - id: useeffect
    prompt: "À quoi sert le hook useEffect dans un composant React ?"
    answer: "À synchroniser le composant avec un système extérieur : abonnement, timer, appel réseau"
    decoys:
      - "À déclarer les styles CSS du composant, appliqués juste avant son tout premier rendu à l'écran"
      - "À mémoriser le résultat d'un calcul coûteux entre deux rendus du même composant"
    why: "useEffect s'exécute après le rendu pour les effets de bord ; mémoriser un calcul est le rôle de useMemo."
  - id: tableau-dependances
    prompt: "Que fait le tableau de dépendances passé en second argument de useEffect ?"
    answer: "Il relance l'effet seulement quand l'une des valeurs listées a changé"
    decoys:
      - "Il liste les paquets npm que l'effet doit importer avant de s'exécuter"
      - "Il fixe l'ordre d'exécution de tous les effets déclarés dans le composant"
      - "Il déclare les variables que l'effet a le droit de modifier dans l'état du composant"
    why: "Sans tableau, l'effet tourne à chaque rendu ; avec [], une seule fois au montage ; sinon quand une dépendance change."
  - id: regles-hooks
    prompt: "Quelle règle impose React pour l'appel des hooks ?"
    answer: "Les appeler au premier niveau du composant, jamais dans une condition ou une boucle"
    decoys:
      - "Les appeler uniquement dans des composants classes, juste après l'appel du constructeur parent"
      - "Les appeler toujours dans l'ordre alphabétique, pour que React les retrouve"
    why: "React associe les hooks à leur ordre d'appel : un hook conditionnel décale cet ordre d'un rendu à l'autre."
  - id: key-listes
    prompt: "Pourquoi React demande-t-il une prop key sur chaque élément d'une liste affichée avec map ?"
    answer: "Pour identifier chaque élément entre deux rendus et ne mettre à jour que ce qui a changé"
    decoys:
      - "Pour chiffrer le contenu de chaque élément de la liste avant de l'insérer dans la page affichée"
      - "Pour trier automatiquement la liste dans l'ordre croissant des clés fournies"
    why: "Une clé stable permet la réconciliation ; l'index du tableau comme clé pose problème quand la liste est réordonnée."
  - id: mutation-etat
    prompt: "Un développeur fait state.items.push(x) sur un tableau d'état React : que se passe-t-il ?"
    answer: "Rien ne s'affiche : React ne voit pas le changement, il faut créer un nouveau tableau"
    decoys:
      - "La page se met à jour immédiatement, car React observe toutes les mutations d'objets"
      - "React lève une exception, car les tableaux d'état sont gelés par Object.freeze"
    why: "React compare les références : il faut passer un nouveau tableau à la fonction de mise à jour ([...items, x])."
  - id: flux-unidirectionnel
    prompt: "Comment circulent les données entre composants React ?"
    answer: "Du parent vers l'enfant par les props ; l'enfant remonte via des fonctions reçues"
    decoys:
      - "Dans les deux sens : un enfant peut réassigner les props reçues pour modifier son parent"
      - "Par un bus d'événements global auquel chaque composant s'abonne automatiquement"
    why: "Les props sont en lecture seule ; pour remonter une information, le parent passe un callback à l'enfant."
  - id: context
    prompt: "Quel problème l'API Context de React résout-elle ?"
    answer: "Le « prop drilling » : faire passer une donnée à travers de nombreux niveaux de composants"
    decoys:
      - "Le chargement lent des images, en les mettant toutes en cache dans le contexte partagé du navigateur"
      - "Les fuites mémoire, en libérant automatiquement les composants plus affichés"
    why: "Un Provider rend une valeur (thème, utilisateur connecté) accessible à tout un sous-arbre via useContext."
  - id: useref
    prompt: "Quel hook React permet d'accéder directement à un élément du DOM, par exemple pour lui donner le focus ?"
    answer: "useRef"
    decoys:
      - "useState"
      - "useEffect"
      - "useId"
    why: "useRef fournit un objet stable dont .current pointe vers l'élément ; useId génère un identifiant unique, pas une référence au DOM."
  - id: dom-virtuel
    prompt: "Comment React détermine-t-il les changements à appliquer à la page ?"
    answer: "Il compare le nouvel arbre d'éléments au précédent, puis n'applique que les différences"
    decoys:
      - "Il recharge entièrement la page depuis le serveur après chaque modification de l'état du composant"
      - "Il compile au build le code de mise à jour exact de chaque élément, sans runtime"
    why: "C'est la réconciliation (DOM virtuel). Compiler les mises à jour au build sans runtime, c'est l'approche de Svelte."
  - id: classname
    prompt: "En JSX, quel attribut remplace l'attribut HTML class ?"
    answer: "className"
    decoys:
      - "cssClass"
      - "styleName"
      - "class, sans changement"
    why: "class est un mot réservé de JavaScript ; JSX utilise className (et htmlFor pour for)."
  - id: fragment
    prompt: "À quoi sert un fragment (<>…</>) en JSX ?"
    answer: "À renvoyer plusieurs éléments sans ajouter de nœud dans le DOM"
    decoys:
      - "À découper le composant en morceaux chargés séparément à la demande"
      - "À isoler les styles d'un groupe d'éléments du reste de la page"
      - "À marquer une zone rendue uniquement côté serveur, jamais dans le navigateur"
    why: "Un composant renvoie un seul élément racine ; le fragment les regroupe sans div superflue."
  - id: strict-mode
    prompt: "Pourquoi un effet s'exécute-t-il deux fois au montage en développement, dans une application React en StrictMode ?"
    answer: "StrictMode monte, démonte puis remonte les composants pour révéler les effets mal nettoyés"
    decoys:
      - "C'est un bug de React, corrigé en ajoutant la prop key au composant racine de l'application"
      - "Le serveur de développement charge deux copies de React, une par onglet ouvert"
    why: "Ce double appel n'existe qu'en développement : un effet bien écrit (avec sa fonction de nettoyage) le supporte sans problème."
  - id: composant-controle
    prompt: "Qu'est-ce qu'un champ de formulaire « contrôlé » en React ?"
    answer: "Un champ dont la valeur vient de l'état, mise à jour par onChange"
    decoys:
      - "Un champ dont la valeur est vérifiée par le serveur avant chaque frappe au clavier"
      - "Un champ désactivé tant que le formulaire n'est pas entièrement rempli et valide"
      - "Un champ dont la valeur reste dans le DOM, lue au besoin avec une ref"
    why: "L'état est la source de vérité. Une valeur laissée dans le DOM et lue par ref, c'est un champ non contrôlé."
  - id: remonter-etat
    prompt: "Deux composants frères doivent afficher la même donnée modifiable : que recommande React ?"
    answer: "Remonter l'état dans leur parent commun et le leur passer en props"
    decoys:
      - "Dupliquer l'état dans chacun des deux frères et les synchroniser par un useEffect"
      - "Stocker la donnée dans une variable globale window, lue par les deux"
    why: "« Lifting state up » garde une seule source de vérité ; dupliquer l'état et le synchroniser crée des incohérences."
  - id: memoisation
    prompt: "À quoi servent useMemo et useCallback ?"
    answer: "À conserver une valeur ou une fonction entre deux rendus tant que ses dépendances ne changent pas"
    decoys:
      - "À enregistrer l'état du composant dans le localStorage pour le retrouver après rechargement"
      - "À exécuter un calcul dans un Web Worker pour ne pas bloquer l'interface"
    why: "Ce sont des optimisations de rendu, pas de la persistance ; le React Compiler vise à les rendre souvent inutiles."
  - id: create-react-app
    prompt: "Pour démarrer un nouveau projet React aujourd'hui, que recommande la documentation officielle ?"
    answer: "Un framework comme Next.js, ou un outil de build comme Vite"
    decoys:
      - "Create React App, l'outil officiel toujours recommandé pour tout nouveau projet"
      - "Un simple fichier HTML qui charge React depuis un CDN, sans aucun outil de build"
    why: "Create React App est déprécié depuis 2025 ; react.dev oriente vers un framework, ou vers Vite pour partir de zéro."
  - id: server-components
    prompt: "Qu'est-ce qu'un React Server Component ?"
    answer: "Un composant exécuté uniquement sur le serveur, dont le code n'est pas envoyé au navigateur"
    decoys:
      - "Un composant qui affiche l'état de santé du serveur dans un tableau de bord"
      - "Un composant rendu côté serveur puis hydraté, avec tout son code dans le bundle client"
    why: "Un Server Component peut lire une base ou des fichiers directement et n'alourdit pas le bundle ; il ne peut pas utiliser useState."
  - id: mise-a-jour-fonctionnelle
    prompt: "Pourquoi écrire setCount(c => c + 1) plutôt que setCount(count + 1) quand on incrémente plusieurs fois de suite ?"
    answer: "La forme fonction part toujours de la dernière valeur, pas d'une valeur figée du rendu"
    decoys:
      - "La forme fonction met la page à jour de façon synchrone, sans attendre le prochain rendu"
      - "La forme avec valeur directe est dépréciée et sera retirée dans une future version"
    why: "count est la valeur du rendu en cours : deux setCount(count + 1) d'affilée n'ajoutent que 1, la forme fonction enchaîne correctement."
  - id: react-dom
    prompt: "Quel paquet relie les composants React au DOM du navigateur ?"
    answer: "react-dom"
    decoys:
      - "react-native"
      - "react-router"
      - "react-scripts"
    why: "react décrit les composants, react-dom les rend dans le navigateur (react-native sur mobile). react-router gère les routes, react-scripts appartenait à Create React App."
---
