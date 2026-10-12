---
questions:
  - id: principe
    prompt: "Quel est le principe du RAG ?"
    answer: "Récupérer des passages pertinents, puis les placer dans le prompt du LLM"
    decoys:
      - "Réentraîner le LLM chaque nuit sur les nouveaux documents de l'entreprise"
      - "Remplacer le LLM par un moteur de recherche qui renvoie des liens"
    why: "Le RAG cherche d'abord dans vos documents, puis demande au LLM de répondre à partir des extraits fournis. Le modèle n'est pas réentraîné et rédige toujours la réponse."
  - id: indexation
    prompt: "Que fait-on à l'étape d'indexation d'un RAG ?"
    answer: "On découpe les documents en morceaux, on calcule leurs embeddings et on les stocke"
    decoys:
      - "On envoie tous les documents au LLM pour qu'il les mémorise"
      - "On trie les documents par date pour garder les plus récents"
    why: "L'indexation prépare la recherche : découpage en morceaux, un embedding par morceau, rangement dans une base vectorielle. Le LLM n'intervient qu'au moment de répondre."
  - id: mise-a-jour
    prompt: "Un document de la base change. Que faut-il faire dans un RAG ?"
    answer: "Réindexer ce document"
    decoys:
      - "Réentraîner le modèle sur toute la base"
      - "Changer de modèle d'embeddings pour toute la base"
    why: "Les connaissances vivent dans l'index, pas dans le modèle : il suffit de recalculer les morceaux du document modifié."
  - id: rag-ou-fine-tuning
    prompt: "Un assistant doit répondre sur un catalogue produit mis à jour chaque semaine. RAG ou fine-tuning ?"
    answer: "RAG : on réindexe le catalogue à chaque mise à jour"
    decoys:
      - "Fine-tuning : le modèle retient mieux un catalogue appris par cœur"
      - "Fine-tuning : c'est la seule façon d'ajouter des connaissances à un modèle"
    why: "Le RAG gère les connaissances qui changent et permet de citer la source. Le fine-tuning sert au format, au ton ou à une tâche étroite, et retient mal des faits."
  - id: citations
    prompt: "Quel avantage apporte la citation des passages dans une réponse RAG ?"
    answer: "On peut vérifier sur quoi s'appuie la réponse"
    decoys:
      - "Le modèle ne peut plus halluciner du tout"
      - "La réponse coûte moins de tokens"
    why: "Les citations rendent la réponse vérifiable. Elles réduisent le risque d'hallucination sans le supprimer, et ajoutent plutôt des tokens."
  - id: recuperation-ratee
    prompt: "Le bon passage n'est pas retrouvé à l'étape de récupération. Que se passe-t-il ?"
    answer: "Le LLM ne peut pas répondre correctement, voire invente"
    decoys:
      - "Le LLM va chercher le passage manquant par lui-même dans la base"
      - "La base vectorielle renvoie une erreur et la requête échoue"
    why: "Le modèle ne voit que ce qu'on lui fournit. Une récupération ratée donne une réponse incomplète ou inventée : d'où l'intérêt d'évaluer la récupération à part."
  - id: recherche-hybride
    prompt: "Pourquoi combiner mots-clés et vecteurs (recherche hybride) ?"
    answer: "La recherche vectorielle rate souvent les termes exacts, comme les codes produits"
    decoys:
      - "La recherche par mots-clés comprend mieux les synonymes que les embeddings"
      - "Les bases vectorielles ne savent pas stocker plus de quelques milliers de morceaux"
    why: "Les vecteurs capturent le sens mais peuvent rater un nom propre ou une référence exacte ; les mots-clés les trouvent. Combiner les deux couvre les deux cas."
  - id: evaluer
    prompt: "Comment évaluer la récupération d'un RAG ?"
    answer: "Avec des questions dont on connaît les bons passages"
    decoys:
      - "En demandant au LLM s'il est satisfait de sa réponse"
      - "En mesurant le temps de réponse de la base vectorielle"
    why: "On vérifie que les passages attendus remontent bien, indépendamment de la rédaction. L'avis du modèle sur lui-même ou la latence ne mesurent pas la pertinence."
  - id: petit-corpus
    prompt: "Le corpus fait quelques pages et change rarement. Faut-il un RAG ?"
    answer: "Pas forcément : il tient peut-être directement dans la fenêtre de contexte"
    decoys:
      - "Oui : un LLM ne peut lire aucun document sans base vectorielle"
      - "Oui : sans RAG, le coût en tokens est toujours plus élevé"
    why: "Si le corpus tient dans le prompt, inutile d'ajouter index et base vectorielle. Le RAG se justifie quand les documents sont trop nombreux ou changent souvent."
  - id: agregation
    prompt: "Quelle question un RAG classique gère-t-il mal ?"
    answer: "Combien de contrats ont été signés en mars ?"
    decoys:
      - "Que dit notre procédure en cas de perte de badge ?"
      - "Quel est le délai de rétractation prévu par nos conditions générales ?"
    why: "Le RAG récupère quelques morceaux pertinents, il ne parcourt pas toute la base pour compter. Une agrégation relève d'une requête SQL."
---
