---
questions:
  - id: role
    prompt: "Sur quel besoin LlamaIndex est-il avant tout centré ?"
    answer: "Connecter un LLM à vos documents pour les interroger (RAG)"
    decoys:
      - "Entraîner des LLM depuis zéro sur de grandes grappes de GPU dédiées"
      - "Servir un modèle à poids ouverts sur ses propres GPU"
      - "Tracer les appels à un LLM pour en surveiller les coûts"
    why: "LlamaIndex fournit chargement, découpage, indexation et interrogation de documents. Il n'entraîne ni ne sert de modèle, et l'observabilité relève d'autres outils."
  - id: readers
    prompt: "Dans LlamaIndex, à quoi servent les readers (chargeurs) ?"
    answer: "Transformer une source (PDF, page web, base…) en objets Document"
    decoys:
      - "Lire la réponse du LLM et la convertir dans un format JSON validé"
      - "Récupérer dans l'index les morceaux les plus proches de la question"
      - "Lire les journaux de l'application pour détecter les mauvaises réponses"
    why: "Les readers sont la porte d'entrée : ils lisent une source et produisent des Document. La récupération des morceaux, elle, est le travail des retrievers."
  - id: nodes
    prompt: "Que sont les nodes dans LlamaIndex ?"
    answer: "Les morceaux issus du découpage des documents, avec leurs métadonnées"
    decoys:
      - "Les serveurs du cluster qui exécutent les requêtes en parallèle"
      - "Les étapes d'un agent, reliées entre elles dans un graphe d'exécution"
      - "Les copies d'un index répliquées dans plusieurs bases vectorielles"
    why: "Les node parsers découpent les documents en nodes, l'unité qui reçoit un embedding et qui est récupérée. Rien à voir avec des machines ou des étapes d'agent."
  - id: vector-store-index
    prompt: "Sur quoi repose le VectorStoreIndex, l'index le plus courant de LlamaIndex ?"
    answer: "Sur un stockage vectoriel, en mémoire ou dans une base externe"
    decoys:
      - "Sur un index inversé de mots-clés, comme un moteur de recherche plein texte"
      - "Sur une table SQL interrogée par des requêtes générées par le LLM"
      - "Sur un graphe de connaissances construit à la main par l'équipe"
    why: "Le VectorStoreIndex range les embeddings des nodes dans un stockage vectoriel (en mémoire, ou Qdrant, pgvector…) et cherche les plus proches de la question."
  - id: query-engine
    prompt: "Que fait un query engine dans LlamaIndex ?"
    answer: "Il récupère les morceaux pertinents et fait rédiger la réponse par le LLM"
    decoys:
      - "Il traduit la question en SQL et l'exécute directement sur la base de production"
      - "Il réentraîne le modèle d'embeddings sur les questions des utilisateurs"
    why: "Le query engine enchaîne récupération et synthèse : c'est le cœur d'un RAG. Le chat engine y ajoute l'historique de conversation."
  - id: chat-engine
    prompt: "Qu'apporte un chat engine par rapport à un query engine dans LlamaIndex ?"
    answer: "La prise en compte de l'historique de la conversation"
    decoys:
      - "Un modèle de langage différent, spécialisé dans la conversation"
      - "Une base vectorielle séparée pour chaque utilisateur connecté"
    why: "Le chat engine garde le fil de l'échange pour interpréter les questions de suivi ; le reste du pipeline (récupération, synthèse) est le même."
  - id: vs-langchain
    prompt: "Qu'est-ce qui distingue le plus LlamaIndex de LangChain ?"
    answer: "Un positionnement plus centré sur l'indexation et l'interrogation de documents"
    decoys:
      - "LlamaIndex ne fonctionne qu'avec les modèles à poids ouverts Llama de Meta, d'où son nom"
      - "LlamaIndex est un service managé, LangChain une bibliothèque open-source"
    why: "Malgré son nom, LlamaIndex fonctionne avec de nombreux fournisseurs, et sa bibliothèque est open-source. Il est surtout orienté données et RAG, LangChain plus généraliste."
  - id: pipeline-simple
    prompt: "Quelques documents, une requête vectorielle et un appel au modèle : faut-il LlamaIndex ?"
    answer: "Pas forcément : écrit à la main, ce pipeline reste court et lisible"
    decoys:
      - "Oui : sans framework, impossible d'appeler une base vectorielle"
      - "Oui : seul un framework sait insérer des extraits dans un prompt"
    why: "Le framework accélère les cas riches ; pour un pipeline minimal, le code direct est tout aussi court et sans couche à comprendre."
  - id: inspecter-prompts
    prompt: "Pourquoi faut-il savoir inspecter les prompts envoyés par LlamaIndex ?"
    answer: "Ses composants de haut niveau ajoutent leurs propres consignes au prompt"
    decoys:
      - "Il chiffre les prompts, qu'il faut déchiffrer pour les relire en clair"
      - "Il tronque toujours les prompts à une longueur fixe, sans prévenir"
    why: "Query engines et synthétiseurs utilisent des modèles de prompt internes : pour comprendre une réponse, il faut voir ce qui a réellement été envoyé."
  - id: remplacer-etapes
    prompt: "Une réponse est mauvaise parce que le découpage des documents est inadapté. Que permet LlamaIndex ?"
    answer: "Remplacer seulement le node parser, en gardant le reste du pipeline"
    decoys:
      - "Rien : le découpage est fixé une fois pour toutes par la bibliothèque"
      - "Réentraîner le LLM pour qu'il compense un découpage maladroit"
    why: "Chaque étape est un composant interchangeable : on change le découpage, le retriever ou la base sans tout réécrire."
  - id: document-vs-node
    prompt: "Quelle différence y a-t-il entre un Document et un node dans LlamaIndex ?"
    answer: "Un Document est une source entière, un node l'un de ses morceaux découpés"
    decoys:
      - "Un Document est le texte brut, un node est ce même texte après traduction en vecteur"
      - "Un Document est une question de l'utilisateur, un node la réponse rédigée par le LLM"
    why: "Les readers produisent des Document, puis les node parsers les découpent en nodes. C'est le node qui reçoit un embedding et qui est récupéré."
  - id: retriever-seul
    prompt: "On veut seulement lister les passages les plus proches d'une question, sans faire rédiger de réponse. Quelle brique utiliser ?"
    answer: "Un retriever, sans l'étape de synthèse du query engine"
    decoys:
      - "Un chat engine, qui renvoie les passages avant de les résumer"
      - "Un reader, qui relit les documents pour trouver les passages proches"
    why: "Le retriever s'arrête à la récupération des nodes. Le query engine y ajoute l'appel au LLM pour rédiger, et le reader ne sert qu'à charger les sources."
  - id: synthese
    prompt: "Que fait l'étape de synthèse d'un query engine ?"
    answer: "Construire le prompt à partir des nodes récupérés et faire rédiger la réponse"
    decoys:
      - "Fusionner les nodes proches en un seul pour réduire la taille de l'index"
      - "Résumer chaque document à l'indexation pour accélérer les recherches futures"
    why: "La synthèse est la partie génération du RAG : les extraits sont insérés dans un prompt et le LLM répond. Elle n'altère pas l'index."
  - id: persistance
    prompt: "L'index d'un prototype est en mémoire et se recalcule à chaque lancement. Que faire pour éviter cela ?"
    answer: "Persister l'index, ou le placer dans une base vectorielle externe"
    decoys:
      - "Réduire la taille des nodes, ce qui accélère les calculs d'embeddings au démarrage"
      - "Rien : un index doit toujours être reconstruit pour rester cohérent avec le modèle"
    why: "Un index en mémoire disparaît avec le processus. L'enregistrer ou utiliser une base comme Qdrant ou pgvector évite de recalculer les embeddings."
  - id: changer-de-base
    prompt: "Un prototype utilise un stockage vectoriel en mémoire. Que change le passage à Qdrant ou pgvector dans LlamaIndex ?"
    answer: "On branche un autre stockage vectoriel, le reste du pipeline est conservé"
    decoys:
      - "Il faut réécrire les readers, qui sont liés au type de stockage choisi"
      - "Il faut changer de LLM, chaque base étant associée à un modèle précis"
    why: "Le stockage vectoriel est un composant interchangeable : le pipeline de lecture, de découpage et d'interrogation reste le même."
  - id: modele-embeddings
    prompt: "Avec LlamaIndex, quel modèle d'embeddings faut-il utiliser pour interroger un index existant ?"
    answer: "Celui qui a servi à l'indexer"
    decoys:
      - "Le plus récent du fournisseur, la compatibilité étant assurée par le framework"
      - "Celui du LLM qui rédige la réponse, puisque les deux doivent être du même fournisseur"
    why: "Comme dans tout RAG, les vecteurs de deux modèles ne se comparent pas. LlamaIndex configure le modèle mais ne rend pas deux espaces compatibles."
  - id: fournisseur-llm
    prompt: "Peut-on utiliser LlamaIndex avec un modèle tournant en local ?"
    answer: "Oui : le LLM et le modèle d'embeddings se configurent, locaux ou d'un fournisseur"
    decoys:
      - "Non : LlamaIndex a besoin d'une API hébergée pour calculer les embeddings"
      - "Oui, mais seulement avec les modèles Llama de Meta, d'où le nom du framework"
    why: "Le framework est indépendant du fournisseur : modèle de langage et modèle d'embeddings sont des réglages. Le nom n'est pas une restriction."
  - id: metadonnees
    prompt: "À quoi servent les métadonnées attachées aux nodes ?"
    answer: "Filtrer la récupération et citer l'origine d'un passage"
    decoys:
      - "Augmenter la taille de chaque node pour que le LLM dispose de plus de contexte"
      - "Remplacer l'embedding du node quand il est trop long à calculer"
    why: "Source, page, date ou service permettent de filtrer et de citer. Elles ne remplacent pas l'embedding, qui reste la base de la recherche par le sens."
  - id: reclassement
    prompt: "Les passages récupérés sont approximatifs. Quel composant LlamaIndex peut les réordonner avant la synthèse ?"
    answer: "Un post-traitement des nodes, comme un reclassement"
    decoys:
      - "Un reader configuré pour relire les documents sources"
      - "Un chat engine, qui rejoue la question avec d'autres mots"
    why: "Le pipeline accepte des étapes entre récupération et rédaction, dont le reclassement. Le reader ne sert qu'au chargement."
  - id: llamaparse
    prompt: "Que commercialise l'éditeur de LlamaIndex en plus de la bibliothèque ?"
    answer: "Des services managés, dont l'analyse de documents complexes"
    decoys:
      - "Un modèle de langage propriétaire qui remplace les LLM de fournisseurs externes"
      - "Une base vectorielle hébergée, nécessaire pour utiliser l'index vectoriel"
    why: "La bibliothèque est open-source ; l'entreprise vend en plus des services, comme l'extraction de documents difficiles. Rien n'oblige à les utiliser."
  - id: typescript
    prompt: "Dans quels langages LlamaIndex est-il disponible ?"
    answer: "Python et TypeScript"
    decoys:
      - "Python et Java"
      - "TypeScript uniquement"
    why: "LlamaIndex existe en Python et en TypeScript, comme LangChain."
  - id: agents-workflows
    prompt: "LlamaIndex propose-t-il autre chose que le RAG ?"
    answer: "Oui : des agents et des workflows à plusieurs étapes"
    decoys:
      - "Oui : l'entraînement de modèles de langage de petite taille"
      - "Non : il se limite à la lecture de documents et à leur indexation"
    why: "Le RAG est son cœur, mais le framework offre aussi des agents et des workflows. L'entraînement de modèles n'en fait pas partie."
  - id: quand-langchain
    prompt: "Une application combine de nombreux outils, plusieurs modèles et peu de documents. Quel framework est a priori le plus adapté ?"
    answer: "LangChain, plus généraliste que LlamaIndex"
    decoys:
      - "LlamaIndex, car il traite tous les cas d'usage de LLM mieux que les autres frameworks"
      - "Aucun : un framework ne peut pas combiner plusieurs modèles"
    why: "LlamaIndex excelle sur les documents ; pour un assemblage généraliste, LangChain est davantage centré sur les outils et les agents. Les deux se recoupent en partie."
  - id: debug-prompt
    prompt: "Une réponse de LlamaIndex est étrange. Quelle première vérification est utile ?"
    answer: "Regarder les nodes récupérés et le prompt réellement envoyé au LLM"
    decoys:
      - "Relancer l'indexation complète pour voir si le résultat change"
      - "Remplacer le framework par un autre avant toute investigation"
    why: "Le défaut vient soit de la récupération, soit de la rédaction à partir du prompt assemblé par les composants. Les voir tous les deux oriente la correction."
  - id: ingestion-incrementale
    prompt: "Un nouveau PDF arrive chaque jour. Quelle bonne pratique pour l'index ?"
    answer: "Ajouter les nouveaux nodes sans recalculer les embeddings des anciens"
    decoys:
      - "Reconstruire l'index entier chaque nuit, c'est la seule façon d'être cohérent"
      - "Remplacer l'index par un résumé de tous les documents ajoutés ce jour-là"
    why: "Les embeddings de documents inchangés restent valables tant que le modèle ne change pas. On insère seulement le nouveau contenu."
  - id: taille-des-nodes
    prompt: "Les réponses manquent de contexte parce que les nodes sont trop courts. Quel réglage essayer ?"
    answer: "Changer la taille du découpage dans le node parser"
    decoys:
      - "Réentraîner le modèle d'embeddings pour qu'il lise des phrases plus longues"
      - "Remplacer le VectorStoreIndex par un index sans découpage"
    why: "Le node parser décide de la taille et du chevauchement des morceaux. Le modifier ne demande que de réindexer."
  - id: debut-prototype
    prompt: "Quel est l'intérêt de LlamaIndex pour un premier prototype de RAG ?"
    answer: "Quelques lignes suffisent, chaque étape étant ensuite remplaçable"
    decoys:
      - "Aucune configuration n'est nécessaire, même pour choisir le modèle"
      - "Les performances de la récupération sont automatiquement optimisées"
    why: "Les valeurs par défaut donnent un résultat rapidement, puis on remplace pièce par pièce ce qui déçoit. L'optimisation reste à faire en mesurant."
  - id: evaluation
    prompt: "Un RAG construit avec LlamaIndex donne parfois de mauvaises réponses. Comment savoir si le défaut vient de la récupération ?"
    answer: "Évaluer les passages récupérés sur des questions aux bons passages connus"
    decoys:
      - "Poser plusieurs fois la même question et garder la réponse la plus fréquente"
      - "Demander au LLM s'il pense avoir trouvé la bonne information"
    why: "Mesurer la récupération à part de la rédaction isole la cause. L'avis du modèle sur sa propre réponse ne la mesure pas."
  - id: sans-framework
    prompt: "On veut maîtriser chaque prompt envoyé au modèle. Quelle précaution prendre avec LlamaIndex ?"
    answer: "Surcharger les modèles de prompt internes ou écrire l'étape soi-même"
    decoys:
      - "Aucune : le framework n'ajoute jamais de consigne au prompt de l'utilisateur"
      - "Désactiver l'index pour que le LLM reçoive uniquement la question"
    why: "Les composants de haut niveau utilisent leurs propres consignes. On peut les remplacer, ou revenir à un code direct pour les étapes critiques."
  - id: indexer-sans-llm
    prompt: "Quel modèle intervient lors de la construction d'un VectorStoreIndex, avant toute question ?"
    answer: "Le modèle d'embeddings seul : le LLM n'est sollicité qu'à la synthèse"
    decoys:
      - "Le LLM, qui lit chaque node pour en rédiger un résumé stocké dans l'index"
      - "Le LLM et le modèle d'embeddings, appelés ensemble pour chaque node"
    why: "À l'indexation, chaque node reçoit un embedding. Le LLM n'intervient qu'à la question, pour rédiger la réponse à partir des nodes récupérés."
---
