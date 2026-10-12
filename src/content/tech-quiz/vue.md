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
  - id: ref-value
    prompt: "Dans l'API Composition de Vue, comment lit-on dans le script la valeur d'une variable créée avec ref() ?"
    answer: "Par sa propriété .value"
    decoys:
      - "En l'appelant comme une fonction, sans argument"
      - "Avec la méthode .get(), comme une Map JavaScript"
      - "Directement, comme une variable JavaScript ordinaire"
    why: "ref() enveloppe la valeur dans un objet réactif : .value dans le script, mais déballé automatiquement dans le gabarit."
  - id: ref-reactive
    prompt: "Quelle différence y a-t-il entre ref() et reactive() dans Vue ?"
    answer: "ref() accepte toute valeur, y compris primitive ; reactive() ne prend qu'un objet"
    decoys:
      - "ref() est réservé aux composants de l'API Options, reactive() à l'API Composition"
      - "reactive() rend la valeur persistante dans le localStorage, ref() la garde en mémoire"
    why: "reactive() rend un objet profondément réactif via un Proxy et ne fonctionne pas sur un nombre ou une chaîne ; ref() les enveloppe."
  - id: computed
    prompt: "À quoi sert computed() dans Vue ?"
    answer: "À dériver une valeur d'autres données réactives, recalculée seulement quand elles changent"
    decoys:
      - "À lancer un appel réseau à chaque modification d'une donnée et à stocker la réponse"
      - "À calculer une valeur une seule fois, au montage, sans jamais la recalculer ensuite"
    why: "Une propriété calculée est mise en cache selon ses dépendances ; pour un effet de bord comme un appel réseau, on utilise watch()."
  - id: watch
    prompt: "Quand préférer watch() à computed() dans Vue ?"
    answer: "Pour déclencher un effet de bord, comme un appel API, quand une donnée change"
    decoys:
      - "Pour afficher une valeur dérivée dans le gabarit, mise en cache entre les rendus"
      - "Pour surveiller les performances du composant pendant le développement"
    why: "computed produit une valeur pure et cachée ; watch réagit à un changement en exécutant du code."
  - id: v-if-v-show
    prompt: "Quelle différence y a-t-il entre v-if et v-show dans un gabarit Vue ?"
    answer: "v-if crée ou détruit l'élément ; v-show le garde et bascule son display CSS"
    decoys:
      - "v-show crée ou détruit l'élément ; v-if le garde et bascule son display CSS"
      - "Aucune : v-show est l'ancien nom de v-if, conservé pour la compatibilité"
    why: "v-show convient aux bascules fréquentes (élément toujours présent), v-if aux conditions qui changent rarement."
  - id: v-model
    prompt: "Que fait la directive v-model sur un champ de formulaire Vue ?"
    answer: "Elle lie le champ à une donnée dans les deux sens"
    decoys:
      - "Elle valide le champ côté serveur selon le modèle de données déclaré dans l'API"
      - "Elle lie la donnée au champ à sens unique, sans jamais relire ce que tape l'utilisateur"
      - "Elle génère automatiquement le formulaire à partir d'un modèle de base de données"
    why: "v-model combine la liaison de la valeur et l'écoute de l'événement de saisie ; c'est du sucre syntaxique côté client."
  - id: raccourcis
    prompt: "Dans un gabarit Vue, que signifient les raccourcis :title et @click ?"
    answer: "v-bind:title et v-on:click"
    decoys:
      - "v-on:title et v-bind:click"
      - "v-model:title et v-show:click"
      - "v-slot:title et v-for:click"
    why: "« : » abrège v-bind (lier un attribut à une expression), « @ » abrège v-on (écouter un événement)."
  - id: v-for-key
    prompt: "Pourquoi associer un attribut :key à chaque élément d'un v-for dans Vue ?"
    answer: "Pour que Vue suive l'identité de chaque élément et réutilise correctement les nœuds"
    decoys:
      - "Pour trier la liste dans l'ordre des clés avant de l'afficher à l'écran"
      - "Pour protéger la liste contre les injections de code dans le gabarit HTML"
    why: "Sans clé stable, Vue réutilise les nœuds par position, ce qui mélange l'état local des éléments quand la liste change."
  - id: script-setup
    prompt: "Qu'apporte <script setup> dans un fichier .vue ?"
    answer: "Une écriture concise de l'API Composition : tout ce qui est déclaré est disponible dans le gabarit"
    decoys:
      - "L'exécution du script uniquement côté serveur, avant l'envoi de la page au navigateur"
      - "Un script lancé une seule fois à l'installation du projet pour configurer les outils"
    why: "Les variables et imports de <script setup> sont exposés au gabarit sans return ; c'est la forme recommandée de l'API Composition."
  - id: define-props
    prompt: "Dans <script setup>, comment un composant Vue déclare-t-il les props qu'il reçoit ?"
    answer: "Avec defineProps()"
    decoys:
      - "Avec useProps(), importé depuis le paquet vue"
      - "Avec un export const props en tête du script"
      - "Avec l'attribut props sur la balise <template>"
    why: "defineProps est une macro du compilateur, sans import ; defineEmits déclare de même les événements émis."
  - id: emits
    prompt: "Comment un composant Vue enfant prévient-il son parent d'une action ?"
    answer: "Il émet un événement, que le parent écoute avec @"
    decoys:
      - "Il modifie directement la prop reçue, ce qui met à jour la donnée du parent"
      - "Il appelle une méthode du parent via this.$root, depuis n'importe quel niveau"
    why: "Les props descendent, les événements remontent ; modifier une prop déclenche un avertissement de Vue."
  - id: slots
    prompt: "À quoi servent les slots dans un composant Vue ?"
    answer: "À laisser le parent injecter du contenu dans le gabarit de l'enfant"
    decoys:
      - "À réserver des emplacements mémoire pour accélérer le rendu des listes longues"
      - "À planifier l'exécution d'un composant à une heure précise, comme une tâche cron"
    why: "<slot> marque l'endroit où s'affiche le contenu passé entre les balises du composant, par exemple le corps d'une modale."
  - id: style-scoped
    prompt: "Que fait l'attribut scoped sur la balise <style> d'un fichier .vue ?"
    answer: "Il limite les règles CSS aux éléments de ce composant"
    decoys:
      - "Il applique les règles à toute la page, y compris aux composants voisins"
      - "Il charge la feuille de style seulement quand le composant devient visible"
      - "Il convertit le CSS en styles en ligne au moment de l'exécution"
    why: "Vue ajoute un attribut unique aux éléments du composant et réécrit les sélecteurs pour qu'ils ne fuient pas."
  - id: proxy
    prompt: "Sur quel mécanisme JavaScript repose la réactivité de Vue 3 ?"
    answer: "Les Proxy, qui interceptent lectures et écritures"
    decoys:
      - "Un DOM virtuel comparé toutes les secondes par un minuteur interne au framework"
      - "Les Web Workers, qui surveillent les variables dans un fil séparé"
      - "Les Promise, résolues à chaque modification de donnée"
    why: "Vue 3 enveloppe les objets dans des Proxy pour suivre les dépendances ; Vue 2 utilisait Object.defineProperty, avec plus de limites."
  - id: vue2-fin
    prompt: "Quelle est la situation de Vue 2 aujourd'hui ?"
    answer: "Il n'est plus maintenu officiellement depuis le 31 décembre 2023"
    decoys:
      - "C'est toujours la version recommandée, Vue 3 restant expérimental"
      - "Il est maintenu à vie par l'équipe officielle, en parallèle de Vue 3"
    why: "Vue 2 a atteint sa fin de vie fin 2023 ; les nouveaux projets partent sur Vue 3, sorti en 2020."
  - id: pinia-vuex
    prompt: "Quelle bibliothèque Pinia remplace-t-elle comme solution officielle de gestion d'état de Vue ?"
    answer: "Vuex"
    decoys:
      - "Redux"
      - "MobX"
      - "Zustand"
    why: "Pinia est le successeur officiel de Vuex. Redux et Zustand viennent de l'écosystème React, MobX est indépendant."
  - id: on-mounted
    prompt: "Dans l'API Composition de Vue, quel hook exécute du code une fois le composant inséré dans le DOM ?"
    answer: "onMounted"
    decoys:
      - "onCreated"
      - "useEffect"
      - "onBeforeMount"
    why: "onMounted s'exécute après l'insertion ; onBeforeMount juste avant, quand le DOM n'est pas encore accessible. useEffect appartient à React."
  - id: v-html
    prompt: "Quel risque présente la directive v-html avec un contenu saisi par un utilisateur ?"
    answer: "Une faille XSS, car le HTML est inséré sans échappement"
    decoys:
      - "Un ralentissement, car le HTML est recompilé par le serveur à chaque rendu de la page"
      - "Aucun : Vue nettoie automatiquement tout le HTML passé à cette directive"
    why: "L'interpolation {{ }} échappe le texte ; v-html insère du HTML brut, à réserver à un contenu de confiance."
  - id: provide-inject
    prompt: "Quel mécanisme Vue permet de transmettre une donnée à des descendants éloignés sans passer par chaque niveau de props ?"
    answer: "provide et inject"
    decoys:
      - "emit et on"
      - "Les slots nommés"
      - "v-bind et v-model"
    why: "Un ancêtre fournit une valeur avec provide, n'importe quel descendant la récupère avec inject ; emit sert à remonter des événements."
  - id: vite
    prompt: "Quel outil de build, créé par l'auteur de Vue, sert par défaut aux nouveaux projets Vue ?"
    answer: "Vite"
    decoys:
      - "Webpack"
      - "Parcel"
      - "Turbopack"
    why: "Evan You a créé Vite ; create-vue génère un projet basé dessus. Turbopack est l'outil de Vercel pour Next.js."
---
