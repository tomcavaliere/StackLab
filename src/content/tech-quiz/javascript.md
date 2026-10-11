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
---
