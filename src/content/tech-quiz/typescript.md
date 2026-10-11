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
---
