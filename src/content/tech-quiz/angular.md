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
  - id: decorateur-component
    prompt: "Dans Angular, comment déclare-t-on qu'une classe TypeScript est un composant ?"
    answer: "Avec le décorateur @Component, qui précise son sélecteur et son gabarit"
    decoys:
      - "En la faisant hériter de la classe Component exportée par le paquet @angular/core"
      - "En nommant son fichier avec le suffixe .component.ts, détecté automatiquement par la CLI"
      - "En l'enregistrant dans le fichier angular.json, à la clé components"
    why: "Le décorateur @Component porte les métadonnées (selector, template, styles). Ni l'héritage, ni le nom du fichier, ni angular.json ne déclarent un composant."
  - id: injectable-root
    prompt: "Que signifie providedIn: 'root' dans le décorateur @Injectable d'un service Angular ?"
    answer: "Le service est une instance unique, partagée par toute l'application"
    decoys:
      - "Le service n'est accessible qu'au composant racine AppComponent et à lui seul"
      - "Le service s'exécute côté serveur, avec les droits d'administrateur du système"
      - "Une nouvelle instance du service est créée pour chaque composant qui l'injecte"
    why: "Fourni à la racine, le service est un singleton injectable partout. Une instance par composant s'obtient en le déclarant dans les providers du composant."
  - id: rxjs-observable
    prompt: "Que renvoie une requête faite avec HttpClient, le client HTTP d'Angular ?"
    answer: "Un Observable RxJS, qui n'envoie la requête qu'une fois souscrit"
    decoys:
      - "Une Promise native, qui part immédiatement dès l'appel de la méthode get"
      - "Directement les données JSON, car l'appel est bloquant jusqu'à la réponse"
      - "Un objet XMLHttpRequest brut à configurer puis à envoyer à la main"
    why: "HttpClient s'appuie sur RxJS : l'Observable est paresseux, rien ne part sans subscribe (ou pipe async)."
  - id: pipe-async
    prompt: "Quel intérêt présente le pipe async dans un gabarit Angular ?"
    answer: "Il souscrit à un Observable et se désabonne seul à la destruction"
    decoys:
      - "Il exécute le rendu du composant dans un Web Worker, en dehors du fil principal"
      - "Il rend toutes les méthodes du composant asynchrones sans écrire async ni await"
      - "Il diffère l'affichage du composant jusqu'au chargement complet de la page"
    why: "Le pipe async affiche la dernière valeur et gère l'abonnement, ce qui évite les fuites mémoire d'un subscribe oublié."
  - id: fuite-abonnement
    prompt: "Quel piège courant guette un composant Angular qui appelle subscribe() sur un Observable sans fin ?"
    answer: "Une fuite mémoire, si l'abonnement n'est pas arrêté à la destruction du composant"
    decoys:
      - "Une erreur de compilation, car subscribe() est interdit dans le code d'un composant"
      - "Un double appel du constructeur du composant, à chaque nouvelle valeur émise par le flux"
    why: "Un abonnement à un flux infini survit au composant ; on le coupe (takeUntilDestroyed, unsubscribe) ou on passe par le pipe async."
  - id: banana-in-a-box
    prompt: "Dans un gabarit Angular, que réalise la syntaxe [(ngModel)], surnommée « banana in a box » ?"
    answer: "Une liaison bidirectionnelle entre un champ et une propriété"
    decoys:
      - "Une liaison à sens unique, de la propriété du composant vers l'attribut HTML"
      - "L'écoute d'un événement du DOM, sans aucune mise à jour de la propriété liée"
      - "L'affichage d'une valeur dans le texte, comme une interpolation entre accolades"
    why: "Les crochets lient la propriété vers la vue, les parenthèses l'événement vers le composant : combinés, ils donnent le two-way binding."
  - id: liaisons
    prompt: "Dans un gabarit Angular, que désignent respectivement [disabled]=\"x\" et (click)=\"f()\" ?"
    answer: "Une liaison de propriété, puis une liaison d'événement"
    decoys:
      - "Une liaison d'événement, puis une liaison de propriété"
      - "Deux liaisons bidirectionnelles, équivalentes à ngModel"
      - "Une directive structurelle, puis une interpolation de texte"
    why: "Crochets = la valeur va du composant vers l'élément ; parenthèses = l'événement remonte vers le composant."
  - id: controle-flux
    prompt: "Par quoi la nouvelle syntaxe de contrôle des gabarits (Angular 17) remplace-t-elle *ngIf et *ngFor ?"
    answer: "Par des blocs intégrés @if et @for"
    decoys:
      - "Par des attributs v-if et v-for empruntés à la syntaxe de Vue"
      - "Par des expressions JSX avec l'opérateur && et la méthode map"
      - "Par des balises <if> et <for> à importer depuis @angular/common"
    why: "Angular a introduit @if, @for, @switch directement dans le gabarit ; v-if est la syntaxe de Vue, JSX celle de React."
  - id: for-track
    prompt: "Dans un bloc @for d'Angular, à quoi sert l'expression track, obligatoire ?"
    answer: "À identifier chaque élément, pour ne recréer que ce qui a changé dans la liste"
    decoys:
      - "À trier la liste avant l'affichage, selon la propriété indiquée en paramètre"
      - "À enregistrer chaque affichage de la liste dans les outils d'analytics du projet"
      - "À limiter le nombre d'éléments affichés à la valeur indiquée en paramètre"
    why: "track donne une identité stable aux éléments : Angular réutilise les nœuds existants au lieu de tout reconstruire."
  - id: signaux-api
    prompt: "Quelles fonctions forment l'API des signaux d'Angular ?"
    answer: "signal(), computed() et effect()"
    decoys:
      - "useState(), useMemo() et useEffect()"
      - "ref(), computed() et watch()"
      - "$state, $derived et $effect"
    why: "signal crée une valeur réactive, computed en dérive une, effect réagit aux changements. Les autres listes viennent de React, Vue et Svelte."
  - id: zone-js
    prompt: "Quel rôle jouait historiquement zone.js dans Angular ?"
    answer: "Déclencher la détection de changements après chaque événement asynchrone"
    decoys:
      - "Gérer les fuseaux horaires des dates affichées par le pipe date"
      - "Découper le bundle en zones chargées à la demande par le routeur"
      - "Isoler les styles CSS de chaque composant dans sa propre zone"
    why: "zone.js intercepte clics, timers et requêtes pour savoir quand revérifier la vue ; les signaux permettent désormais de s'en passer (mode zoneless)."
  - id: onpush
    prompt: "Qu'apporte la stratégie ChangeDetectionStrategy.OnPush à un composant Angular ?"
    answer: "Le composant n'est revérifié que si ses entrées changent de référence ou s'il émet un événement"
    decoys:
      - "Le composant est revérifié à chaque cycle, même si rien n'a changé nulle part dans l'application"
      - "Le composant envoie ses mises à jour au serveur par notifications push"
    why: "OnPush limite les vérifications inutiles ; d'où le piège classique d'un objet muté sans changer de référence, que la vue ne voit pas."
  - id: formulaires
    prompt: "Quelles sont les deux approches de formulaires proposées par Angular ?"
    answer: "Les formulaires pilotés par le gabarit et les formulaires réactifs"
    decoys:
      - "Les formulaires contrôlés et les formulaires non contrôlés, gérés par des hooks"
      - "Les formulaires synchrones, validés côté client, et les formulaires serveur"
    why: "Template-driven (ngModel) ou réactifs (FormGroup, FormControl, définis dans la classe) ; « contrôlés / non contrôlés » est le vocabulaire de React."
  - id: lazy-loading
    prompt: "Comment Angular évite-t-il de charger tout le code de l'application au démarrage ?"
    answer: "Par le chargement paresseux des routes, avec loadComponent ou loadChildren"
    decoys:
      - "En téléchargeant chaque composant depuis un CDN Google au moment de son affichage"
      - "En compilant les gabarits dans le navigateur, seulement quand ils sont affichés"
    why: "Le routeur charge le code d'une route quand on y navigue ; le bloc @defer applique la même idée à une partie de gabarit."
  - id: defer
    prompt: "À quoi sert le bloc @defer dans un gabarit Angular ?"
    answer: "À charger plus tard une partie du gabarit et son code, par exemple quand elle devient visible"
    decoys:
      - "À retarder l'exécution du constructeur d'un composant jusqu'à la fin de toutes les requêtes HTTP"
      - "À différer l'envoi d'un formulaire tant que tous les champs ne sont pas validés"
      - "À reporter la compilation TypeScript de ce morceau au premier lancement"
    why: "@defer découpe le bundle au niveau du gabarit, avec des déclencheurs comme on viewport ou on interaction."
  - id: guards
    prompt: "Dans le routeur Angular, à quoi sert une garde comme canActivate ?"
    answer: "À autoriser ou refuser la navigation vers une route, par exemple sans connexion"
    decoys:
      - "À protéger l'API back-end contre les injections SQL envoyées depuis les formulaires"
      - "À empêcher le rechargement de la page quand l'utilisateur appuie sur F5"
    why: "La garde s'exécute avant l'activation de la route ; la sécurité réelle reste côté serveur."
  - id: ng-update
    prompt: "Quelle commande aide à passer un projet Angular à la version majeure suivante ?"
    answer: "ng update, qui applique des migrations automatiques du code"
    decoys:
      - "npm upgrade angular, qui remplace les fichiers sans toucher au code"
      - "ng build --upgrade, qui recompile le projet dans la nouvelle version"
      - "ng migrate, qui convertit le projet en application AngularJS"
    why: "ng update met à jour les paquets et lance des schematics qui réécrivent le code concerné, ce qui rend tenable le rythme semestriel."
  - id: ng-serve
    prompt: "Que fait la commande ng serve d'un projet Angular ?"
    answer: "Elle lance un serveur de développement qui recharge l'application à chaque modification"
    decoys:
      - "Elle compile l'application pour la production et la publie aussitôt sur le serveur distant"
      - "Elle démarre le back-end Node fourni avec chaque projet Angular"
    why: "ng serve sert au développement local ; le build de production passe par ng build et Angular n'impose aucun back-end."
  - id: styles-encapsules
    prompt: "Par défaut, comment s'appliquent les styles déclarés dans un composant Angular ?"
    answer: "Ils sont limités à ce composant, grâce à l'encapsulation émulée"
    decoys:
      - "Ils s'appliquent à toute la page, comme une feuille de style globale"
      - "Ils sont ignorés tant qu'on ne les importe pas dans le fichier styles.css"
      - "Ils s'appliquent aux composants parents, mais pas à celui qui les déclare"
    why: "Angular réécrit sélecteurs et éléments avec des attributs propres au composant (ViewEncapsulation.Emulated) pour éviter les fuites de style."
  - id: input-output
    prompt: "Comment un composant Angular enfant renvoie-t-il une information à son parent ?"
    answer: "En émettant un événement déclaré comme sortie (@Output ou output())"
    decoys:
      - "En modifiant directement la propriété d'entrée @Input reçue du parent"
      - "En appelant window.parent.postMessage depuis son propre gabarit"
    why: "Les données descendent par les entrées et remontent par les sorties ; muter une entrée ne prévient pas le parent."
---
