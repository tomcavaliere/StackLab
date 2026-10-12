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
---
