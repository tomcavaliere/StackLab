---
questions:
  - id: boucle
    prompt: "Comment fonctionne la boucle d'un agent LLM ?"
    answer: "Le modèle demande un outil, l'application l'exécute et lui renvoie le résultat, et ainsi de suite"
    decoys:
      - "Le modèle exécute lui-même le code de chaque outil déclaré, puis lit le résultat et décide de la suite"
      - "Le code enchaîne des étapes fixées d'avance et appelle le modèle à chacune"
    why: "Le modèle renvoie un appel structuré, l'application l'exécute et renvoie le résultat, jusqu'à ce que le modèle estime la tâche finie. Des étapes fixées par le code, c'est un workflow."
  - id: description-outil
    prompt: "Comment un outil est-il décrit au modèle ?"
    answer: "Par un nom, une description et un schéma JSON des paramètres"
    decoys:
      - "Par le code source complet de la fonction"
      - "Par une URL que le modèle visite lui-même pour découvrir ce que fait l'outil"
    why: "Le modèle ne voit que la description : nom, rôle et schéma des paramètres. C'est d'après elle qu'il choisit l'outil et construit les arguments."
  - id: agent-vs-workflow
    prompt: "Qu'est-ce qui distingue un agent d'un workflow ?"
    answer: "Dans un agent, c'est le modèle qui choisit les étapes"
    decoys:
      - "Un agent n'utilise jamais d'outils externes"
      - "Un workflow n'appelle jamais de LLM"
    why: "Un workflow fixe les étapes dans le code et peut appeler un LLM à certaines d'entre elles. Un agent laisse le modèle décider de l'enchaînement."
  - id: etapes-connues
    prompt: "Les étapes sont toujours les mêmes : récupérer un ticket, le résumer, le classer. Que choisir ?"
    answer: "Un workflow fixe"
    decoys:
      - "Un agent autonome"
      - "Un agent par étape"
    why: "Quand les étapes sont connues, un workflow est plus prévisible, moins cher et plus facile à tester. L'autonomie d'un agent n'apporte rien ici."
  - id: erreurs-en-cascade
    prompt: "Pourquoi les erreurs sont-elles un risque particulier pour un agent ?"
    answer: "Une erreur tôt dans la boucle fausse toutes les étapes suivantes"
    decoys:
      - "Parce qu'un agent s'arrête à la première erreur d'outil"
      - "Parce que les outils renvoient leurs erreurs à l'utilisateur, jamais au modèle"
    why: "Chaque étape s'appuie sur les précédentes : une mauvaise lecture se propage. D'où l'intérêt d'un humain qui suit, ou d'actions réversibles."
  - id: cout
    prompt: "Pourquoi le coût d'un agent est-il difficile à prévoir ?"
    answer: "Le nombre de tours n'est pas connu d'avance et chaque tour renvoie l'historique"
    decoys:
      - "Parce que les outils sont facturés au temps d'exécution par le fournisseur du LLM"
      - "Parce que les API facturent un forfait différent pour chaque outil déclaré"
    why: "Le modèle décide quand s'arrêter, et chaque appel relit tout l'historique de la tâche : la consommation de tokens varie d'une exécution à l'autre."
  - id: injection
    prompt: "Qu'est-ce qu'une injection de prompt pour un agent ?"
    answer: "Des instructions cachées dans un document ou un résultat d'outil, que le modèle risque de suivre"
    decoys:
      - "Une requête SQL malveillante qu'un attaquant envoie directement à la base de données utilisée par l'agent"
      - "L'ajout par le développeur d'exemples dans le prompt système"
    why: "Le modèle lit le contenu des pages, documents et résultats d'outils ; s'il contient des instructions, il peut les exécuter avec les outils dont il dispose."
  - id: limiter-risque
    prompt: "Un agent peut envoyer des courriels et écrire en base. Quelle précaution prendre ?"
    answer: "Droits minimaux et confirmation humaine pour les actions irréversibles"
    decoys:
      - "Baisser la température à 0 pour qu'il ne se trompe plus dans le choix des outils"
      - "Lui interdire de lire des documents externes, quels qu'ils soient"
    why: "Limiter les droits réduit les dégâts possibles, et la confirmation humaine bloque les actions graves. La température ne protège ni des erreurs ni des injections."
  - id: bon-cas
    prompt: "Quelle tâche se prête bien à un agent ?"
    answer: "Enquêter sur un incident en consultant journaux et métriques"
    decoys:
      - "Calculer chaque nuit les totaux de ventes par magasin"
      - "Envoyer un courriel de bienvenue à chaque inscription"
    why: "L'enquête est ouverte : les prochaines étapes dépendent de ce qu'on trouve. Les deux autres tâches ont des étapes fixes, qu'un code classique ou un workflow fait mieux."
  - id: qui-execute
    prompt: "Avec un outil défini par l'application, qui exécute l'appel demandé par le modèle ?"
    answer: "L'application"
    decoys:
      - "Le modèle, sur l'infrastructure du fournisseur"
      - "Le navigateur de l'utilisateur"
    why: "Le modèle renvoie seulement un appel structuré (outil et arguments). C'est le code de l'application qui l'exécute et lui renvoie le résultat."
---
