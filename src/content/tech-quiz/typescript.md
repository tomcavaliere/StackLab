---
questions:
  - id: role
    prompt: "Qu'est-ce que TypeScript ?"
    answer: "JavaScript avec des types statiques, vérifiés à la compilation"
    decoys:
      - "Un nouveau langage exécuté par sa propre machine virtuelle"
      - "Un framework front édité par Microsoft"
    why: "Le compilateur vérifie les types puis produit du JavaScript standard."
  - id: types-effaces
    prompt: "Que deviennent les types après la compilation ?"
    answer: "Ils sont effacés : le résultat est du JavaScript ordinaire"
    decoys:
      - "Ils sont vérifiés à nouveau à l'exécution, à chaque appel de fonction"
      - "Ils sont conservés dans un binaire"
    why: "Les types n'existent qu'à la compilation."
  - id: donnees-externes
    prompt: "Les types TypeScript vérifient-ils les données d'une requête HTTP à l'exécution ?"
    answer: "Non : il faut les valider, par exemple avec Zod"
    decoys:
      - "Oui, automatiquement"
      - "Oui, si le serveur tourne sous Node.js récent"
    why: "Les types sont effacés : rien ne vérifie à l'exécution que les données externes ont la bonne forme."
  - id: adoption
    prompt: "Pourquoi l'adoption de TypeScript peut-elle être progressive ?"
    answer: "Tout fichier JavaScript valide est presque toujours du TypeScript valide"
    decoys:
      - "TypeScript convertit automatiquement tout le projet JavaScript existant"
      - "Il faut réécrire tout le projet d'un coup"
    why: "On renomme les fichiers et l'on ajoute des types au fil de l'eau."
  - id: createur
    prompt: "Qui a créé TypeScript ?"
    answer: "Microsoft, en 2012"
    decoys:
      - "Google, en 2009"
      - "Meta, en 2013"
    why: "Google a annoncé Go en 2009 ; Meta a publié React en 2013."
  - id: editeur
    prompt: "Que permettent les types dans l'éditeur de code ?"
    answer: "L'autocomplétion et le renommage sûr"
    decoys:
      - "Une exécution plus rapide du programme"
      - "La compression du code"
    why: "Les types n'accélèrent pas l'exécution, mais ils guident l'éditeur."
  - id: contrat
    prompt: "Quel intérêt TypeScript a-t-il pour le contrat entre front et back ?"
    answer: "La forme des données d'une API est vérifiée par l'outillage"
    decoys:
      - "Le back-end est généré automatiquement à partir des types"
      - "Le réseau est chiffré"
    why: "Front et back partagent les mêmes types : un changement de forme casse la compilation, pas la production."
  - id: script-jetable
    prompt: "Un script jetable de quelques lignes : faut-il TypeScript ?"
    answer: "Non : la configuration n'en vaut pas la peine"
    decoys:
      - "Oui : c'est indispensable"
      - "C'est impossible : TypeScript exige un projet complet"
    why: "L'intérêt de TypeScript croît avec la taille du code et de l'équipe."
  - id: node-recent
    prompt: "Que savent faire les versions récentes de Node.js avec TypeScript ?"
    answer: "Exécuter directement du TypeScript simple en retirant les types"
    decoys:
      - "Vérifier les types pendant l'exécution du programme"
      - "Compiler TypeScript en binaire natif"
    why: "Node.js retire les types sans les vérifier : la vérification reste le travail du compilateur."
  - id: frameworks
    prompt: "Quelle place TypeScript a-t-il dans les frameworks front ?"
    answer: "C'est le choix par défaut de la plupart, qui proposent des modèles TypeScript"
    decoys:
      - "Il est interdit dans React, qui n'accepte que du JavaScript"
      - "Il est réservé à Angular, les autres frameworks refusant les fichiers .ts"
    why: "React, Vue et Next.js proposent des modèles TypeScript ; Angular s'écrit en TypeScript."
  - id: unknown-any
    prompt: "Quelle différence entre les types any et unknown ?"
    answer: "unknown oblige à vérifier le type avant usage"
    decoys:
      - "any oblige à vérifier le type avant usage, alors que unknown désactive toute vérification du compilateur"
      - "Aucune : unknown est simplement le nouveau nom de any depuis TypeScript 3"
    why: "any désactive la vérification ; unknown accepte toute valeur mais interdit de s'en servir tant qu'on n'a pas restreint son type."
  - id: union
    prompt: "Que signifie le type string | number ?"
    answer: "Une valeur qui est soit une chaîne, soit un nombre"
    decoys:
      - "Une valeur qui est à la fois une chaîne et un nombre, comme '42' converti automatiquement"
      - "Un tableau qui contient des chaînes et des nombres mélangés"
    why: "C'est un type union : la valeur appartient à l'un des membres. Un tableau mixte s'écrit (string | number)[]."
  - id: narrowing
    prompt: "Dans if (typeof x === 'string') { … }, que sait le compilateur de x à l'intérieur du bloc ?"
    answer: "Que x est une string"
    decoys:
      - "Rien de plus : typeof n'est évalué qu'à l'exécution, le compilateur ne l'analyse pas"
      - "Que x est de type any"
    why: "C'est le rétrécissement (narrowing) : le compilateur suit les tests typeof, instanceof ou in pour affiner le type dans chaque branche."
  - id: generiques
    prompt: "À quoi sert le paramètre T dans function first<T>(items: T[]): T ?"
    answer: "Relier le type du résultat à celui des éléments reçus"
    decoys:
      - "Indiquer que la fonction accepte uniquement des tableaux de texte"
      - "Rendre la fonction exécutable sur plusieurs threads en parallèle"
    why: "C'est un générique : appelée avec un number[], la fonction renvoie un number, sans perdre l'information de type comme avec any."
  - id: typage-structurel
    prompt: "Sur quoi TypeScript se fonde-t-il pour décider qu'un objet est compatible avec un type ?"
    answer: "Sur sa forme : ses propriétés et leurs types"
    decoys:
      - "Sur le nom de la classe qui l'a créé, déclaré explicitement avec implements"
      - "Sur le fichier dans lequel l'objet a été déclaré"
    why: "Le typage est structurel : un objet qui a les bonnes propriétés convient, même sans lien déclaré avec le type, contrairement au typage nominal de Java."
  - id: mode-strict
    prompt: "Que fait l'option strict dans tsconfig.json ?"
    answer: "Elle active un ensemble de vérifications plus sévères, dont strictNullChecks"
    decoys:
      - "Elle ajoute des vérifications de type à l'exécution dans le JavaScript produit par le compilateur"
      - "Elle interdit d'importer des bibliothèques JavaScript"
    why: "Avec strictNullChecks, null et undefined ne sont plus acceptés partout. Aucune option n'ajoute de vérification à l'exécution : les types sont effacés."
  - id: tsconfig
    prompt: "Quel fichier configure le compilateur TypeScript d'un projet ?"
    answer: "tsconfig.json"
    decoys:
      - "package.json, dans une section typescript"
      - ".babelrc"
    why: "tsconfig.json définit les fichiers inclus, la cible JavaScript et les options de vérification. .babelrc configure Babel."
  - id: inference
    prompt: "Quel type TypeScript donne-t-il à x dans let x = 3, sans annotation ?"
    answer: "number, déduit de la valeur"
    decoys:
      - "any, faute d'annotation explicite"
      - "unknown, jusqu'à la première affectation"
    why: "Le compilateur infère les types : inutile d'annoter ce qu'il peut déduire. x = 'texte' ensuite serait une erreur."
  - id: fichiers-d-ts
    prompt: "Comment obtenir les types d'une bibliothèque écrite en JavaScript sans types ?"
    answer: "Installer son paquet @types, issu de DefinitelyTyped, s'il existe"
    decoys:
      - "Le compilateur les devine en lisant le code source de la bibliothèque dans node_modules"
      - "C'est impossible : une bibliothèque JavaScript ne peut pas être utilisée en TypeScript"
    why: "Les fichiers de déclaration .d.ts décrivent les types d'un code JavaScript ; DefinitelyTyped en publie pour de nombreuses bibliothèques sous @types/."
  - id: assertion-non-nulle
    prompt: "Que fait le ! dans document.getElementById('app')!.textContent ?"
    answer: "Il affirme au compilateur que la valeur n'est pas null, sans rien vérifier"
    decoys:
      - "Il lève une erreur explicite à l'exécution si l'élément est introuvable dans la page"
      - "Il inverse la valeur booléenne renvoyée par getElementById"
    why: "C'est l'assertion de non-nullité : elle disparaît à la compilation. Si l'élément manque, l'erreur survient quand même à l'exécution."
  - id: assertion-as
    prompt: "Que fait value as User à l'exécution ?"
    answer: "Rien : c'est une indication pour le compilateur"
    decoys:
      - "Il convertit l'objet en instance de User et lève une erreur si des champs manquent"
      - "Il copie l'objet en retirant les propriétés absentes du type User"
    why: "Une assertion de type est effacée comme les autres types : elle fait taire le compilateur, et des données invalides passent quand même."
  - id: partial
    prompt: "Que produit le type utilitaire Partial<User> ?"
    answer: "Le type User avec toutes ses propriétés optionnelles"
    decoys:
      - "Un type qui ne garde que la première moitié des propriétés de User"
      - "Le type User dont toutes les propriétés sont en lecture seule"
    why: "Partial rend chaque propriété optionnelle, utile pour une mise à jour partielle. Rendre les propriétés non modifiables, c'est Readonly<User>."
  - id: union-discriminee
    prompt: "Dans type Forme = { kind: 'cercle'; r: number } | { kind: 'carre'; c: number }, à quoi sert la propriété kind ?"
    answer: "À distinguer les cas : tester kind restreint le type"
    decoys:
      - "À rien pour le compilateur : c'est un simple commentaire documentaire, ignoré pendant la vérification des types"
      - "À générer automatiquement une classe par forme"
    why: "C'est une union discriminée : après if (f.kind === 'cercle'), le compilateur sait que f a une propriété r."
  - id: type-never
    prompt: "Dans un switch sur une union, à quoi sert d'affecter la valeur à une variable de type never dans le cas default ?"
    answer: "Faire échouer la compilation si un cas de l'union n'est pas traité"
    decoys:
      - "Empêcher le programme de s'arrêter en cas d'erreur à l'exécution"
      - "Accélérer le switch en supprimant la branche default à la compilation"
    why: "never n'accepte aucune valeur : si un cas est oublié, la valeur restante n'est pas never et le compilateur signale l'oubli."
  - id: enum
    prompt: "En quoi un enum TypeScript classique fait-il exception à l'effacement des types ?"
    answer: "Il produit un objet JavaScript dans le code compilé"
    decoys:
      - "Il est vérifié à chaque affectation pendant l'exécution, avec une erreur si la valeur est inconnue"
      - "Il n'est disponible que dans les fichiers .d.ts"
    why: "Un enum génère du code réel ; c'est pourquoi certains outils qui se contentent de retirer les types ne l'acceptent pas, et beaucoup lui préfèrent une union de littéraux."
  - id: noemit
    prompt: "Un projet compile avec esbuild ou SWC, qui retirent les types. Que faut-il ajouter pour vérifier les types ?"
    answer: "Lancer tsc --noEmit, qui vérifie sans produire de fichiers"
    decoys:
      - "Rien : esbuild et SWC vérifient les types aussi complètement que tsc, en plus de les retirer"
      - "Activer le mode strict d'esbuild"
    why: "Ces outils transpilent sans vérifier, pour aller vite. La vérification reste le travail de tsc, souvent lancé à part, dans l'éditeur ou en CI."
  - id: hejlsberg
    prompt: "Quel concepteur, déjà à l'origine de C#, a dirigé la création de TypeScript ?"
    answer: "Anders Hejlsberg"
    decoys:
      - "Brendan Eich"
      - "Guido van Rossum"
    why: "Anders Hejlsberg a conçu C# chez Microsoft, puis TypeScript. Brendan Eich a créé JavaScript, Guido van Rossum Python."
  - id: compilateur-go
    prompt: "En quel langage Microsoft a-t-il annoncé en 2025 réécrire le compilateur TypeScript, pour l'accélérer ?"
    answer: "Go"
    decoys:
      - "Rust"
      - "C#"
    why: "Le compilateur, jusque-là écrit en TypeScript, est porté en Go en conservant sa structure ; Microsoft a expliqué que Go s'y prêtait mieux que Rust ou C#."
  - id: satisfies
    prompt: "Que fait l'opérateur satisfies dans const config = { port: 3000 } satisfies Config ?"
    answer: "Il vérifie que la valeur respecte Config, en gardant son type précis"
    decoys:
      - "Il convertit la valeur en Config à l'exécution, en ajoutant les propriétés manquantes"
      - "Il élargit le type de la valeur à Config, comme une annotation : Config"
    why: "Avec une annotation, config aurait le type Config ; avec satisfies, la conformité est vérifiée et le type inféré, plus précis, est conservé."
  - id: fusion-interface
    prompt: "Que se passe-t-il si l'on déclare deux fois interface User dans la même portée ?"
    answer: "Les deux déclarations fusionnent"
    decoys:
      - "Une erreur de compilation : identifiant déjà déclaré, comme avec deux alias type de même nom"
      - "La seconde déclaration remplace la première"
    why: "Les interfaces acceptent la fusion de déclarations, ce qui permet d'étendre des types existants ; un alias type déclaré deux fois provoque une erreur."
---
