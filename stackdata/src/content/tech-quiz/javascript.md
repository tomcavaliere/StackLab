---
questions:
  - id: navigateur
    prompt: "Pourquoi JavaScript est-il incontournable dans le navigateur ?"
    answer: "C'est le langage que tous les navigateurs exécutent nativement"
    decoys:
      - "C'est le seul langage capable de produire du HTML"
      - "Les navigateurs n'acceptent aucune autre forme de code"
    why: "Les autres langages ne visent le navigateur qu'en compilant vers JavaScript ou vers WebAssembly."
  - id: ecmascript
    prompt: "Sous quel nom le langage est-il normalisé ?"
    answer: "ECMAScript (ECMA-262)"
    decoys:
      - "ISO/IEC 9075"
      - "RFC 6455"
    why: "JavaScript est normalisé sous le nom ECMAScript. ISO/IEC 9075 est la norme SQL, la RFC 6455 celle de WebSocket."
  - id: nodejs
    prompt: "Qu'a permis Node.js, en 2009 ?"
    answer: "Exécuter JavaScript côté serveur"
    decoys:
      - "Ajouter des types statiques à JavaScript"
      - "Compiler JavaScript en binaire natif"
    why: "Node.js exécute JavaScript hors du navigateur. Les types statiques, c'est TypeScript."
  - id: dom
    prompt: "Que manipule JavaScript dans une page web ?"
    answer: "Le DOM : la structure de la page, modifiée sans rechargement"
    decoys:
      - "Uniquement les feuilles de style CSS"
      - "La base de données du serveur, directement depuis la page"
    why: "JavaScript modifie la page, réagit aux événements et échange avec les serveurs sans recharger la page."
  - id: typage-dynamique
    prompt: "Quel risque le typage dynamique fait-il courir à un gros projet ?"
    answer: "Des erreurs de type qui n'apparaissent qu'à l'exécution, et que TypeScript aurait détectées"
    decoys:
      - "Un code qui refuse de s'exécuter sur certains navigateurs récents, plus stricts sur les types"
      - "L'impossibilité de changer la valeur d'une variable"
    why: "Une faute de frappe dans un nom de propriété passe inaperçue jusqu'à l'exécution. TypeScript la détecte à la compilation."
  - id: calcul-serveur
    prompt: "Pourquoi un calcul long dans un serveur Node.js pose-t-il problème ?"
    answer: "Le JavaScript s'exécute sur un seul thread principal par processus : le calcul bloque les autres requêtes"
    decoys:
      - "JavaScript ne sait pas faire de calcul numérique"
      - "Node.js limite chaque requête à une seconde d'exécution, puis l'interrompt et renvoie une erreur au client"
    why: "Pendant le calcul, la boucle d'événements ne traite rien d'autre."
  - id: autres-langages
    prompt: "Comment d'autres langages peuvent-ils viser le navigateur ?"
    answer: "En compilant vers JavaScript ou vers WebAssembly"
    decoys:
      - "En étant interprétés directement par le navigateur"
      - "Ils ne le peuvent pas"
    why: "TypeScript compile vers JavaScript ; Rust peut viser WebAssembly, par exemple."
  - id: editions
    prompt: "À quel rythme la norme ECMAScript évolue-t-elle ?"
    answer: "Une nouvelle édition chaque année"
    decoys:
      - "Une fois par décennie"
      - "Elle est figée depuis la sortie de Node.js, en 2009"
    why: "Le comité TC39 publie une édition par an."
  - id: meme-langage
    prompt: "Quel avantage d'équipe JavaScript offre-t-il du front au back ?"
    answer: "Écrire le front et le back dans le même langage"
    decoys:
      - "Se passer de base de données"
      - "Avoir des types garantis à la compilation"
    why: "Avec Node.js, une équipe peut tout écrire en JavaScript. Les types garantis demandent TypeScript."
  - id: typescript
    prompt: "Quand préférer TypeScript à JavaScript ?"
    answer: "Dès que le code grossit ou que l'équipe s'agrandit"
    decoys:
      - "Uniquement pour des scripts jetables de quelques lignes"
      - "Jamais pour du code exécuté dans le navigateur"
    why: "TypeScript compile vers JavaScript et tourne partout où il tourne ; son intérêt croît avec la taille du code et de l'équipe."
  - id: egalite-stricte
    prompt: "Quelle différence entre == et === en JavaScript ?"
    answer: "=== compare sans conversion de type, == convertit d'abord"
    decoys:
      - "=== compare les références des objets, == compare toujours leur contenu champ par champ"
      - "Aucune : === est un simple alias historique de =="
    why: "Avec ==, 0 == '' vaut true après conversion ; avec ===, les types doivent aussi être égaux. Aucun des deux ne compare des objets champ par champ."
  - id: let-var
    prompt: "Quelle différence de portée entre let et var ?"
    answer: "let est limité au bloc, var à la fonction entière"
    decoys:
      - "let est global à tout le fichier, var limité au bloc où il est déclaré"
      - "Aucune : let est seulement la nouvelle orthographe de var"
    why: "Une variable déclarée avec let dans un if ou une boucle n'existe pas en dehors ; var déborde du bloc jusqu'à la fonction."
  - id: const-objet
    prompt: "Un objet déclaré avec const peut-il voir ses propriétés modifiées ?"
    answer: "Oui : const interdit la réaffectation, pas la modification de l'objet"
    decoys:
      - "Non : const rend l'objet et toutes ses propriétés immuables"
      - "Non, sauf si l'objet a été créé avec le mot-clé new"
    why: "const fixe la liaison du nom vers l'objet. Pour figer l'objet lui-même, il faut Object.freeze."
  - id: typeof-null
    prompt: "Que renvoie typeof null en JavaScript ?"
    answer: "\"object\""
    decoys:
      - "\"null\""
      - "\"undefined\""
    why: "C'est une erreur historique du langage, conservée pour ne pas casser le web existant."
  - id: promesse
    prompt: "Que représente une Promise en JavaScript ?"
    answer: "Le résultat futur d'une opération asynchrone, réussie ou échouée"
    decoys:
      - "Un thread séparé qui exécute du code en parallèle du thread principal"
      - "Une valeur constante, garantie de ne jamais changer après sa création"
    why: "Une Promise se résout ou se rejette plus tard ; async/await permet d'écrire ce code comme du code séquentiel. Elle ne crée pas de thread."
  - id: settimeout-zero
    prompt: "Quand s'exécute la fonction passée à setTimeout(fn, 0) ?"
    answer: "Après la fin du code synchrone en cours"
    decoys:
      - "Immédiatement, avant la ligne suivante du code synchrone"
      - "Jamais : un délai de 0 annule le minuteur"
    why: "La fonction est placée dans la file de la boucle d'événements et ne s'exécute qu'une fois la pile d'appels vidée."
  - id: virgule-flottante
    prompt: "Pourquoi 0.1 + 0.2 === 0.3 vaut-il false en JavaScript ?"
    answer: "Les nombres sont des flottants binaires, qui ne représentent pas exactement 0,1"
    decoys:
      - "JavaScript arrondit tous les résultats à l'entier le plus proche avant de comparer"
      - "=== refuse de comparer deux résultats de calcul entre eux"
    why: "Le type number suit la norme IEEE 754 en double précision : 0.1 + 0.2 donne 0.30000000000000004. Ce n'est pas propre à JavaScript."
  - id: fermeture
    prompt: "Qu'est-ce qu'une fermeture (closure) en JavaScript ?"
    answer: "Une fonction qui garde accès aux variables de la portée où elle a été créée"
    decoys:
      - "Une fonction qui ne peut plus être appelée après sa première exécution"
      - "Un bloc try/finally qui libère les ressources à la fin d'une fonction"
    why: "Une fonction interne continue de voir les variables de sa fonction englobante, même après la fin de celle-ci : c'est la base de nombreux motifs (compteurs, modules)."
  - id: prototypes
    prompt: "Sur quel mécanisme repose l'héritage en JavaScript, y compris avec le mot-clé class ?"
    answer: "Les prototypes"
    decoys:
      - "Les classes, copiées à la compilation comme en Java"
      - "Les interfaces, vérifiées à l'exécution par le moteur"
    why: "class, ajouté en ES2015, est une syntaxe plus lisible au-dessus des prototypes : un objet délègue à son prototype les propriétés qu'il n'a pas."
  - id: fleche-this
    prompt: "Qu'est-ce qui distingue une fonction fléchée d'une fonction classique pour this ?"
    answer: "Elle reprend le this de la portée où elle est définie"
    decoys:
      - "Elle désigne toujours par this l'objet global window, quelle que soit la façon dont on l'appelle"
      - "Elle crée un nouveau this à chaque appel, comme un constructeur"
    why: "Une fonction classique reçoit son this selon la façon dont elle est appelée ; une fonction fléchée n'a pas de this propre, d'où son usage dans les callbacks."
  - id: null-undefined
    prompt: "Quelle différence d'usage entre undefined et null ?"
    answer: "undefined : rien n'a été affecté ; null : absence de valeur voulue"
    decoys:
      - "undefined signale une erreur de syntaxe, null une erreur d'exécution"
      - "Aucune : null est l'ancien nom de undefined, gardé par compatibilité"
    why: "Une variable déclarée sans valeur ou une propriété absente vaut undefined ; null s'écrit explicitement pour dire « pas de valeur »."
  - id: npm
    prompt: "Qu'est-ce que npm ?"
    answer: "Le gestionnaire de paquets livré avec Node.js, et son registre public"
    decoys:
      - "Le moteur JavaScript de Chrome"
      - "Un framework de tests unitaires"
    why: "npm installe les dépendances déclarées dans package.json depuis le registre npm. Le moteur de Chrome s'appelle V8."
  - id: modules-es
    prompt: "Quelle syntaxe de modules la norme ECMAScript définit-elle depuis ES2015 ?"
    answer: "import et export"
    decoys:
      - "require et module.exports"
      - "include et define"
    why: "Les modules ES (import/export) sont la norme. require et module.exports viennent de CommonJS, le système historique de Node.js."
  - id: json
    prompt: "D'où vient le format JSON ?"
    answer: "De la syntaxe des objets littéraux de JavaScript"
    decoys:
      - "D'un sous-ensemble de XML simplifié pour le web"
      - "Du format de configuration de Java"
    why: "JSON signifie JavaScript Object Notation : il reprend la syntaxe des objets et tableaux littéraux, et se lit avec JSON.parse."
  - id: origine
    prompt: "Où et quand JavaScript a-t-il été créé ?"
    answer: "Chez Netscape, en 1995, par Brendan Eich"
    decoys:
      - "Chez Sun Microsystems, en 1991, comme version allégée de Java"
      - "Chez Microsoft, en 1998, pour Internet Explorer"
    why: "Brendan Eich l'a conçu pour le navigateur Netscape Navigator. Java vient de Sun, mais n'a pas donné naissance à JavaScript."
  - id: nom-java
    prompt: "Quel lien y a-t-il entre JavaScript et Java ?"
    answer: "Surtout le nom, choisi pour profiter de la popularité de Java"
    decoys:
      - "JavaScript est un sous-ensemble de Java qui s'exécute dans le navigateur"
      - "JavaScript se compile en bytecode Java avant d'être exécuté"
    why: "Les deux langages sont distincts dans leur conception : typage dynamique et prototypes pour JavaScript, typage statique et classes pour Java."
  - id: chainage-optionnel
    prompt: "Que vaut user?.address?.city si user.address est undefined ?"
    answer: "undefined, sans erreur"
    decoys:
      - "Une TypeError, car address est undefined"
      - "Une chaîne vide"
    why: "Le chaînage optionnel ?. s'arrête dès qu'une valeur est null ou undefined et renvoie undefined ; sans lui, accéder à city lèverait une TypeError."
  - id: coalescence-nulle
    prompt: "Pourquoi écrire count ?? 10 plutôt que count || 10 pour une valeur par défaut ?"
    answer: "?? ne remplace que null et undefined, pas 0 ni la chaîne vide"
    decoys:
      - "?? est plus rapide car il ne convertit jamais count en booléen"
      - "|| est déprécié dans les éditions récentes d'ECMAScript"
    why: "Avec ||, un count de 0 serait remplacé par 10, car 0 est « falsy ». ?? garde 0 et ne remplace que l'absence de valeur."
  - id: workers
    prompt: "Comment exécuter un calcul lourd en JavaScript sans bloquer le thread principal ?"
    answer: "Le confier à un worker : Web Worker ou worker_threads dans Node.js"
    decoys:
      - "L'écrire avec async/await, qui le fait tourner sur un autre cœur"
      - "L'envelopper dans setTimeout(fn, 0)"
    why: "Un worker tourne sur un thread séparé. async/await et setTimeout ne font que différer le code : il s'exécute toujours sur le thread principal."
  - id: map
    prompt: "Que fait la méthode map d'un tableau ?"
    answer: "Elle renvoie un nouveau tableau avec le résultat de la fonction pour chaque élément"
    decoys:
      - "Elle modifie le tableau d'origine en place, élément par élément"
      - "Elle renvoie uniquement les éléments pour lesquels la fonction renvoie true"
    why: "map ne modifie pas le tableau d'origine. Garder les éléments qui passent un test, c'est filter."
---
