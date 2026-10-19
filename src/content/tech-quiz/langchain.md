---
questions:
  - id: role
    prompt: "Quel est le rôle de LangChain ?"
    answer: "Assembler une application de LLM avec des composants communs"
    decoys:
      - "Servir des modèles ouverts sur GPU avec un objectif de débit maximal"
      - "Héberger et versionner des modèles et des jeux de données publics"
    why: "LangChain fournit des briques (prompts, modèles, outils, récupération) derrière des interfaces communes. Servir sur GPU, c'est vLLM ; héberger des modèles, le Hub de Hugging Face."
  - id: changer-fournisseur
    prompt: "Quel avantage l'interface commune aux modèles de LangChain donne-t-elle ?"
    answer: "Changer de fournisseur sans réécrire l'application"
    decoys:
      - "Payer moins cher chaque token envoyé au fournisseur"
      - "Utiliser les modèles des fournisseurs sans clé d'API"
    why: "Un même code appelle l'API OpenAI, l'API Claude ou un modèle local via Ollama. La facture et les clés restent celles du fournisseur."
  - id: langgraph
    prompt: "À quoi sert LangGraph ?"
    answer: "Décrire agents et flux à plusieurs étapes comme un graphe avec un état"
    decoys:
      - "Afficher sous forme de graphique les coûts d'appel des modèles"
      - "Stocker des embeddings dans une base de données orientée graphe, pour la recherche"
    why: "LangGraph modélise la boucle d'un agent comme un graphe d'étapes, avec un état, des boucles et des reprises ; les agents de LangChain reposent dessus."
  - id: langsmith
    prompt: "Qu'est-ce que LangSmith ?"
    answer: "Une plateforme commerciale pour tracer, évaluer et surveiller les appels"
    decoys:
      - "La version open-source de LangChain, réécrite en TypeScript pour le navigateur et Node"
      - "Un modèle de langage entraîné par l'équipe de LangChain"
    why: "LangSmith est l'outil d'observabilité et d'évaluation de l'écosystème, payant, utilisable même sans LangChain. LangChain existe lui-même en Python et en TypeScript."
  - id: langages
    prompt: "Dans quels langages LangChain est-il disponible ?"
    answer: "Python et TypeScript"
    decoys:
      - "Python uniquement"
      - "Java et Go"
    why: "LangChain existe en Python et en TypeScript (JavaScript)."
  - id: cas-simple
    prompt: "Une fonction envoie un prompt et affiche la réponse. Faut-il LangChain ?"
    answer: "Non : un appel direct au SDK du fournisseur suffit"
    decoys:
      - "Oui : sans LangChain, on ne peut pas appeler un modèle"
      - "Oui : LangChain est obligatoire pour gérer le streaming"
    why: "Pour un cas simple, le SDK officiel est plus court et plus lisible. LangChain apporte de la valeur quand on combine plusieurs briques."
  - id: critique
    prompt: "Quelle est la critique la plus fréquente faite à LangChain ?"
    answer: "Une couche d'abstraction épaisse qui complique le débogage"
    decoys:
      - "Une licence propriétaire qui interdit l'usage commercial"
      - "Une compatibilité limitée à un seul fournisseur de modèles"
    why: "L'abstraction masque ce qui est réellement envoyé au modèle, ce qui gêne le débogage. LangChain est open-source et compatible avec de nombreux fournisseurs."
  - id: rag
    prompt: "Pour un RAG, quelles briques LangChain fournit-il ?"
    answer: "Chargeurs de documents, découpage, embeddings et accès aux bases vectorielles"
    decoys:
      - "Une base vectorielle intégrée qui remplace pgvector ou Qdrant"
      - "Un modèle de langage pré-entraîné sur l'ensemble des documents internes de l'entreprise"
    why: "LangChain fournit les étapes du RAG et des interfaces vers les bases vectorielles ; il n'est ni une base vectorielle ni un modèle."
  - id: fonction-recente
    prompt: "Un fournisseur sort une nouvelle fonction de son API. Quel risque avec LangChain ?"
    answer: "L'abstraction commune peut la proposer en retard"
    decoys:
      - "LangChain bloque l'accès aux fonctions qu'il ne connaît pas"
      - "La fonction devient payante quand elle passe par LangChain"
    why: "L'interface commune doit suivre chaque fournisseur ; une nouveauté peut y arriver plus tard, ou moins directement, que dans le SDK officiel."
  - id: quand-utiliser
    prompt: "Dans quel cas LangChain est-il un bon choix ?"
    answer: "Une application qui combine documents, outils et plusieurs modèles"
    decoys:
      - "Servir un modèle ouvert à des milliers d'utilisateurs sur ses propres GPU"
      - "Un unique appel de résumé, avec un seul modèle et sans outil"
    why: "LangChain vaut le coup quand plusieurs briques s'assemblent et que ses intégrations font gagner du temps. Servir sur GPU relève de vLLM ; un appel unique, du SDK direct."
  - id: ecosysteme
    prompt: "Quels sont les trois étages de l'écosystème LangChain ?"
    answer: "LangChain, LangGraph et LangSmith"
    decoys:
      - "LangChain, LangVector et LangServe"
      - "LangModel, LangGraph et LangHub"
    why: "LangChain pour les composants, LangGraph pour les agents et flux à plusieurs étapes, LangSmith pour le traçage et l'évaluation."
  - id: ollama
    prompt: "Peut-on utiliser LangChain avec un modèle tournant sur sa propre machine ?"
    answer: "Oui, par exemple via Ollama, avec la même interface commune"
    decoys:
      - "Non : LangChain n'accepte que des modèles accessibles par une API hébergée"
      - "Oui, mais il faut alors réécrire toute la chaîne pour le modèle local"
    why: "L'interface commune couvre les fournisseurs hébergés comme les modèles locaux : changer de modèle est un réglage, pas une réécriture."
  - id: outils
    prompt: "Dans LangChain, qu'est-ce qu'un outil (tool) donné à un modèle ?"
    answer: "Une fonction que le modèle peut demander d'appeler, avec une description de son rôle"
    decoys:
      - "Un modèle spécialisé que LangChain entraîne pour une tâche particulière"
      - "Un extrait de document que le modèle reçoit en plus de la question"
    why: "Le modèle décide quand appeler une fonction décrite ; c'est le code qui l'exécute et lui renvoie le résultat. Les extraits de document relèvent de la récupération."
  - id: sorties-structurees
    prompt: "Le code doit recevoir la réponse du modèle sous une forme typée. Que propose LangChain ?"
    answer: "Une sortie structurée, qui demande au modèle de respecter un schéma"
    decoys:
      - "Un analyseur d'expressions régulières qui devine le format à partir de la réponse"
      - "Une base de données qui stocke la réponse sous forme de tableau"
    why: "On décrit le schéma attendu et LangChain s'appuie sur les capacités du fournisseur pour obtenir une sortie conforme. Le résultat reste à valider."
  - id: text-splitter
    prompt: "Dans un RAG construit avec LangChain, à quoi sert un text splitter ?"
    answer: "Découper les documents chargés en morceaux avant leur indexation"
    decoys:
      - "Séparer la question de l'utilisateur de la consigne système dans le prompt"
      - "Répartir les requêtes entre plusieurs fournisseurs de modèles"
    why: "Le découpage est l'étape qui précède le calcul des embeddings. Il ne concerne ni le prompt ni le choix du fournisseur."
  - id: boucle-agent
    prompt: "Qu'apporte LangGraph pour un agent par rapport à une boucle écrite à la main ?"
    answer: "Un état explicite, des boucles décrites comme un graphe et des reprises possibles"
    decoys:
      - "Un modèle de langage plus fiable, qui ne se trompe plus dans le choix des outils"
      - "La garantie que l'agent termine toujours en un nombre d'étapes limité"
    why: "LangGraph structure la logique de l'agent, sans rendre le modèle meilleur ni borner son exécution. Une limite d'étapes reste à définir."
  - id: reprise
    prompt: "Un agent LangGraph s'interrompt au milieu d'une tâche, par exemple en attendant la validation d'un humain. Que permet l'état ?"
    answer: "Reprendre l'exécution à l'étape où elle s'est arrêtée"
    decoys:
      - "Rejouer la tâche depuis le début en refaisant tous les appels au modèle"
      - "Fusionner la tâche avec les autres tâches en cours du même utilisateur"
    why: "L'état est sauvegardé au fil des étapes : une pause ou une panne n'oblige pas à tout recommencer."
  - id: sdk-direct
    prompt: "Quel est l'avantage d'un appel direct au SDK du fournisseur plutôt que de passer par LangChain ?"
    answer: "On voit exactement ce qui est envoyé au modèle, et on accède vite aux nouveautés"
    decoys:
      - "On profite de nombreuses intégrations déjà écrites pour les bases vectorielles"
      - "Le changement de fournisseur se fait par un simple réglage"
    why: "Sans couche intermédiaire, le code est plus lisible et suit l'API du fournisseur. Intégrations prêtes et changement de fournisseur sont justement les atouts de LangChain."
  - id: debogage
    prompt: "Une chaîne LangChain donne une réponse décevante. Que faut-il pouvoir examiner ?"
    answer: "Le prompt réellement envoyé au modèle à chaque étape"
    decoys:
      - "Le code source du fournisseur de modèle, pour comprendre sa décision"
      - "Le nombre de dépendances installées dans le projet, qui limite les performances"
    why: "L'abstraction masque ce qui part vers le modèle. Une trace, avec LangSmith par exemple, rend chaque étape visible."
  - id: langsmith-sans-langchain
    prompt: "Peut-on utiliser LangSmith sans LangChain ?"
    answer: "Oui : c'est une plateforme de traçage et d'évaluation utilisable seule"
    decoys:
      - "Non : LangSmith lit uniquement les objets internes produits par LangChain"
      - "Oui, mais seulement avec les modèles d'un fournisseur partenaire"
    why: "LangSmith est un produit à part de l'écosystème, qui peut tracer n'importe quelle application de LLM."
  - id: open-source
    prompt: "Parmi LangChain, LangGraph et LangSmith, lesquels sont open-source ?"
    answer: "LangChain et LangGraph"
    decoys:
      - "Les trois, LangSmith comprise"
      - "LangChain seulement"
    why: "Les deux bibliothèques sont open-source ; LangSmith est une plateforme commerciale."
  - id: memoire
    prompt: "Un chatbot doit tenir compte des messages précédents. Que gère-t-on côté application avec LangChain ?"
    answer: "L'historique, renvoyé avec chaque nouvelle question au modèle"
    decoys:
      - "Rien : le modèle retient seul les échanges précédents d'une requête à l'autre"
      - "L'entraînement du modèle sur la conversation après chaque message"
    why: "Un appel à un LLM ne garde pas d'état par lui-même. Le contexte de la conversation doit être renvoyé à chaque fois, ce que les composants de LangChain aident à gérer."
  - id: streaming
    prompt: "Pourquoi la réponse d'un LLM s'affiche-t-elle souvent mot après mot dans une application ?"
    answer: "Le modèle est appelé en streaming et chaque morceau est transmis dès qu'il arrive"
    decoys:
      - "L'application découpe artificiellement la réponse complète pour l'animer à l'écran"
      - "Le modèle écrit sa réponse en plusieurs fois et se relit à chaque passage"
    why: "Les frameworks comme LangChain relaient le flux du fournisseur. L'utilisateur voit le début de la réponse sans attendre la fin."
  - id: choix-modele
    prompt: "Une équipe veut comparer deux modèles de fournisseurs différents sur le même prompt. Quel intérêt de LangChain ?"
    answer: "Changer le modèle par configuration en gardant le reste de la chaîne"
    decoys:
      - "Obtenir automatiquement le meilleur modèle selon la tâche, sans test"
      - "Fusionner les deux modèles en un seul pour de meilleurs résultats"
    why: "L'interface commune facilite la comparaison. Elle ne choisit pas à votre place : il faut mesurer sur ses propres cas."
  - id: rag-alternatives
    prompt: "Pour un RAG centré sur l'ingestion de nombreux documents hétérogènes, quel autre framework faut-il regarder ?"
    answer: "LlamaIndex, plus orienté vers l'indexation et l'interrogation de documents"
    decoys:
      - "LangGraph, qui remplace le découpage et l'indexation par un graphe"
      - "LangSmith, qui calcule les embeddings et stocke l'index"
    why: "LlamaIndex est la comparaison naturelle pour un RAG. LangGraph structure des agents et LangSmith observe les appels."
  - id: surcout
    prompt: "Une petite équipe hésite à adopter LangChain pour un script de classification d'e-mails. Que lui conseiller ?"
    answer: "Un appel direct au SDK, tant qu'il n'y a qu'un prompt et une réponse"
    decoys:
      - "Adopter LangChain dès le début, car on ne peut pas passer à un framework plus tard"
      - "Écrire sa propre couche d'abstraction maison pour rester indépendant de tout fournisseur"
    why: "Pour un cas simple, le framework ajoute de la complexité sans gain. On peut l'introduire plus tard, si le besoin de plusieurs briques apparaît."
  - id: outil-recent
    prompt: "Quand LangChain devient-il un choix moins évident ?"
    answer: "Quand on veut utiliser dès leur sortie les nouveautés d'un fournisseur"
    decoys:
      - "Quand on veut comparer deux modèles de fournisseurs différents sur un même prompt"
      - "Quand on veut réutiliser des chargeurs de documents déjà écrits par la communauté"
    why: "L'interface commune doit suivre chaque fournisseur et peut être en retard. Comparer des modèles et réutiliser des intégrations sont au contraire ses atouts."
  - id: agent-simple
    prompt: "Un agent n'a que deux outils et une boucle courte. LangGraph est-il indispensable ?"
    answer: "Non : écrire soi-même cette petite boucle reste une option raisonnable"
    decoys:
      - "Oui : un agent ne peut pas appeler d'outils sans un graphe d'étapes"
      - "Oui : sans LangGraph, l'agent perd son historique à chaque appel"
    why: "LangGraph aide quand l'agent a des états, des boucles et des reprises complexes. Une boucle simple se code directement."
  - id: integrations
    prompt: "Quel type d'intégrations LangChain propose-t-il déjà ?"
    answer: "Des chargeurs de documents, des bases vectorielles et des outils"
    decoys:
      - "Des GPU hébergés pour entraîner ses propres modèles"
      - "Des modèles de langage propriétaires de l'équipe LangChain"
    why: "Ces intégrations, utilisables derrière des interfaces communes, sont l'un des principaux intérêts du framework."
  - id: evaluer-chaine
    prompt: "Comment savoir si une modification de prompt améliore vraiment une chaîne LangChain ?"
    answer: "La comparer, avant et après, sur un jeu de cas de test représentatifs"
    decoys:
      - "Relancer la chaîne une fois et vérifier que la réponse semble meilleure"
      - "Compter le nombre d'étapes de la chaîne, un graphe plus court étant plus fiable"
    why: "Une impression sur un exemple ne dit pas si d'autres cas se dégradent. LangSmith, entre autres, permet de lancer des évaluations sur un jeu de cas."
---
