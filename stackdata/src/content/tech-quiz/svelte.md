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
  - id: rune-state
    prompt: "En Svelte 5, comment déclare-t-on une variable d'état qui met l'interface à jour quand elle change ?"
    answer: "let count = $state(0)"
    decoys:
      - "const [count, setCount] = useState(0)"
      - "const count = ref(0)"
      - "let count = writable(0)"
    why: "La rune $state rend la variable réactive ; useState est le hook de React, ref() la fonction de Vue, writable() un store Svelte."
  - id: rune-derived
    prompt: "Quelle rune Svelte 5 calcule une valeur à partir d'autres états, recalculée quand ils changent ?"
    answer: "$derived"
    decoys:
      - "$effect"
      - "$props"
      - "$bindable"
    why: "$derived exprime une valeur dérivée ; $effect exécute un effet de bord, $props lit les props, $bindable autorise la liaison bidirectionnelle d'une prop."
  - id: rune-effect
    prompt: "À quoi sert la rune $effect en Svelte 5 ?"
    answer: "À exécuter du code de bord quand les états qu'il lit changent, par exemple dessiner dans un canvas"
    decoys:
      - "À déclarer une valeur dérivée affichée dans le gabarit, mise en cache entre les rendus"
      - "À ajouter une animation de transition à l'apparition d'un élément dans la page"
    why: "$effect suit ses dépendances automatiquement ; pour une simple valeur calculée, $derived est préférable."
  - id: rune-props
    prompt: "En Svelte 5, comment un composant récupère-t-il les props que lui passe son parent ?"
    answer: "let { titre } = $props()"
    decoys:
      - "export let titre, comme dans toutes les versions"
      - "const titre = defineProps()"
      - "this.props.titre"
    why: "Svelte 5 lit les props avec la rune $props ; export let était la syntaxe de Svelte 4, defineProps celle de Vue, this.props celle des classes React."
  - id: dollar-label
    prompt: "Dans Svelte 3 et 4, que signifiait une instruction préfixée par « $: » ?"
    answer: "Une déclaration réactive, réexécutée quand les variables qu'elle lit changent"
    decoys:
      - "Un commentaire destiné au compilateur, ignoré lors de l'exécution dans le navigateur"
      - "Une variable globale, partagée par tous les composants de l'application"
    why: "« $: » (un label JavaScript détourné) rendait une instruction réactive ; Svelte 5 le remplace par $derived et $effect."
  - id: bloc-if
    prompt: "Comment écrit-on un affichage conditionnel dans un gabarit Svelte ?"
    answer: "{#if condition} … {:else} … {/if}"
    decoys:
      - "<div v-if=\"condition\"> … <div v-else>"
      - "@if (condition) { … } @else { … }"
      - "{condition && <div>…</div>}"
    why: "Svelte utilise des blocs {#…}. v-if est la syntaxe de Vue, @if celle d'Angular, && en JSX celle de React."
  - id: bloc-each
    prompt: "Dans {#each items as item (item.id)}, à quoi sert la partie (item.id) ?"
    answer: "C'est une clé qui identifie chaque élément quand la liste change"
    decoys:
      - "C'est un filtre qui n'affiche que les éléments dotés d'un identifiant non vide"
      - "C'est un tri appliqué à la liste selon les identifiants, du plus petit au plus grand"
    why: "La clé permet à Svelte de déplacer ou supprimer les bons éléments au lieu de les mettre à jour par position."
  - id: bloc-await
    prompt: "Quel bloc Svelte affiche directement les états d'une Promise (en attente, résolue, rejetée) dans le gabarit ?"
    answer: "{#await}"
    decoys:
      - "{#async}"
      - "{#promise}"
      - "{#try}"
    why: "{#await promise} … {:then valeur} … {:catch erreur} … {/await} gère les trois états sans code supplémentaire."
  - id: bind-value
    prompt: "Comment lier un champ de saisie à une variable dans les deux sens en Svelte ?"
    answer: "Avec bind:value={nom}"
    decoys:
      - "Avec v-model=\"nom\""
      - "Avec [(ngModel)]=\"nom\""
      - "Avec value={nom} seul"
    why: "La directive bind: synchronise la variable et le champ. value={nom} seul ne lie que dans un sens ; v-model et ngModel appartiennent à Vue et Angular."
  - id: styles-scopes
    prompt: "Par défaut, à quoi s'appliquent les styles écrits dans la balise <style> d'un composant .svelte ?"
    answer: "Aux seuls éléments de ce composant"
    decoys:
      - "À toute la page, comme une feuille de style globale chargée au démarrage"
      - "Aux composants enfants seulement, jamais au composant qui les déclare"
    why: "Svelte ajoute une classe propre au composant et réécrit les sélecteurs ; :global(...) permet d'en sortir volontairement."
  - id: evenements-svelte5
    prompt: "En Svelte 5, comment écoute-t-on le clic sur un bouton ?"
    answer: "Avec l'attribut onclick={handler}"
    decoys:
      - "Avec la directive on:click={handler}, seule syntaxe acceptée"
      - "Avec (click)=\"handler()\""
      - "Avec @click=\"handler\""
    why: "Svelte 5 traite les gestionnaires comme des attributs ; on:click était la syntaxe de Svelte 4. (click) vient d'Angular, @click de Vue."
  - id: stores
    prompt: "Avant les runes, quel mécanisme Svelte servait à partager un état réactif entre plusieurs composants ?"
    answer: "Les stores (writable, readable), lus avec le préfixe $"
    decoys:
      - "Les signaux importés depuis le paquet @angular/core, partagés par injection"
      - "Un contexte React, fourni par un Provider placé au sommet de l'arbre"
    why: "Un store writable s'importe partout ; $store s'y abonne et s'en désabonne automatiquement dans un composant."
  - id: transitions
    prompt: "Qu'offre Svelte nativement pour animer l'apparition et la disparition d'un élément ?"
    answer: "Des transitions intégrées, comme transition:fade, sans bibliothèque à ajouter"
    decoys:
      - "Rien : il faut obligatoirement installer une bibliothèque d'animation tierce"
      - "Un moteur 3D intégré, basé sur WebGL, pour tous les composants"
    why: "Le module svelte/transition fournit fade, fly, slide… à appliquer par directive."
  - id: snippets
    prompt: "En Svelte 5, quel mécanisme remplace les slots pour passer des morceaux de gabarit à un composant ?"
    answer: "Les snippets, déclarés avec {#snippet} et affichés avec {@render}"
    decoys:
      - "Les portails, déclarés avec {#portal} et affichés avec {@teleport}"
      - "Les fragments JSX, passés comme props children au composant"
    why: "Les snippets rendent le passage de contenu plus explicite ; {#portal} n'existe pas, children en JSX est le mécanisme de React."
  - id: sveltekit-routes
    prompt: "Dans SvelteKit, quel fichier définit la page de la route /blog ?"
    answer: "src/routes/blog/+page.svelte"
    decoys:
      - "src/pages/blog.svelte"
      - "src/routes/blog/index.svelte"
      - "src/app/blog/page.tsx"
    why: "SvelteKit route par dossiers, avec des fichiers préfixés + ; app/…/page.tsx est la convention de Next.js."
  - id: sveltekit-load
    prompt: "À quoi sert une fonction load dans un fichier +page.server.js de SvelteKit ?"
    answer: "À charger côté serveur les données de la page avant son rendu"
    decoys:
      - "À précharger les images et polices de la page dans le cache du navigateur"
      - "À mesurer le temps de chargement de la page pour les outils de monitoring"
    why: "Ce code ne tourne que sur le serveur (accès base, secrets) ; ses données arrivent dans la page via la prop data."
  - id: adapters
    prompt: "Dans SvelteKit, à quoi servent les adaptateurs (adapter-node, adapter-static…) ?"
    answer: "À produire un build adapté à la cible de déploiement"
    decoys:
      - "À convertir automatiquement des composants React en composants Svelte"
      - "À brancher SvelteKit sur une base de données précise, comme PostgreSQL"
      - "À adapter la mise en page de l'application aux écrans mobiles"
    why: "Le même projet peut sortir en serveur Node, en site statique ou pour une plateforme serverless selon l'adaptateur."
  - id: accessibilite
    prompt: "Que fait le compilateur Svelte quand une balise <img> n'a pas d'attribut alt ?"
    answer: "Il émet un avertissement d'accessibilité au build"
    decoys:
      - "Il refuse de compiler le composant et arrête le build en erreur"
      - "Il génère automatiquement un texte alternatif à partir du nom du fichier"
    why: "Svelte intègre des vérifications a11y sous forme d'avertissements, sans bloquer la compilation ni inventer de contenu."
  - id: svelte-head
    prompt: "Quel élément spécial Svelte permet d'ajouter un <title> ou des balises meta depuis un composant ?"
    answer: "<svelte:head>"
    decoys:
      - "<svelte:meta>"
      - "<svelte:document>"
      - "<svelte:title>"
    why: "<svelte:head> insère son contenu dans le head du document ; les autres éléments cités n'existent pas sous ces noms."
  - id: fichiers-svelte-js
    prompt: "En Svelte 5, où peut-on utiliser les runes en dehors d'un composant, pour partager un état réactif ?"
    answer: "Dans un fichier .svelte.js ou .svelte.ts"
    decoys:
      - "Dans n'importe quel fichier .js, sans aucune convention de nom"
      - "Nulle part : les runes ne fonctionnent que dans les fichiers .svelte"
      - "Dans le fichier svelte.config.js, à la clé runes"
    why: "Le compilateur traite les runes dans les fichiers .svelte et .svelte.js/.ts ; un .js ordinaire n'est pas compilé par Svelte."
---
