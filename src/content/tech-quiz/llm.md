---
questions:
  - id: tache-de-pretraining
    prompt: "Sur quelle tâche un LLM est-il pré-entraîné ?"
    answer: "Prédire le token suivant d'après ceux qui précèdent"
    decoys:
      - "Classer des phrases dans des catégories étiquetées à la main"
      - "Retrouver dans une base la réponse exacte à chaque question"
    why: "Le pré-entraînement consiste à prédire le token suivant sur un vaste corpus. Suivre des consignes vient d'un entraînement complémentaire ; le modèle ne consulte aucune base."
  - id: token
    prompt: "Qu'est-ce qu'un token pour un LLM ?"
    answer: "Un morceau de texte (mot, bout de mot, caractère) dont le découpage dépend du modèle"
    decoys:
      - "Une clé d'API qui autorise un nombre fixe de requêtes par jour"
      - "Une phrase complète, unité de base de tous les modèles de langage"
    why: "Le modèle lit et produit des tokens, des morceaux de texte découpés selon son propre tokenizer. C'est aussi l'unité de facturation des API."
  - id: fenetre-de-contexte
    prompt: "Que désigne la fenêtre de contexte d'un LLM ?"
    answer: "La quantité de tokens qu'il peut traiter en un appel, prompt et réponse compris"
    decoys:
      - "La période couverte par ses données d'entraînement"
      - "Le nombre de conversations qu'il retient d'un utilisateur à l'autre"
    why: "C'est sa mémoire de travail pour un appel : consigne, documents fournis, historique et réponse. Ce qui n'y est pas, il ne le voit pas."
  - id: temperature
    prompt: "Que règle la température lors de la génération ?"
    answer: "La part de hasard dans le choix des tokens"
    decoys:
      - "La longueur maximale de la réponse, en tokens"
      - "Le niveau de vérification des faits avant de répondre"
    why: "Basse, le modèle choisit les tokens les plus probables ; haute, des réponses plus variées. La longueur se règle par un autre paramètre, et aucun ne vérifie les faits."
  - id: temperature-zero
    prompt: "Avec une température à 0, une API de LLM donne-t-elle toujours la même réponse à la même entrée ?"
    answer: "Non : les sorties restent non garanties identiques"
    decoys:
      - "Oui : la température 0 rend le modèle strictement déterministe"
      - "Oui, à condition de réutiliser la même clé d'API"
    why: "La documentation des fournisseurs le précise : même à température 0, des entrées identiques peuvent produire des sorties différentes. Un LLM ne remplace pas un calcul reproductible."
  - id: hallucination
    prompt: "Pourquoi un LLM peut-il affirmer un fait faux avec assurance ?"
    answer: "Il produit le texte le plus plausible, pas un texte vérifié"
    decoys:
      - "Parce que sa température est réglée trop haut par défaut chez tous les fournisseurs"
      - "Parce qu'il recopie une page web erronée trouvée pendant la requête"
    why: "Le modèle génère ce qui ressemble à une bonne réponse d'après son entraînement, sans vérifier. Il ne cherche pas sur le web par lui-même, et baisser la température ne supprime pas les hallucinations."
  - id: cout-api
    prompt: "Comment l'usage d'un LLM par API est-il généralement facturé ?"
    answer: "Au token, en entrée comme en sortie"
    decoys:
      - "Par utilisateur et par mois, quel que soit le volume"
      - "À la requête, quelle que soit la longueur du prompt"
    why: "On paie les tokens envoyés et les tokens générés. Un long document joint à chaque requête est facturé à chaque requête."
  - id: calcul-exact
    prompt: "Quel besoin se prête mal à un LLM ?"
    answer: "Calculer la TVA de chaque facture"
    decoys:
      - "Résumer les réclamations clients de la semaine"
      - "Extraire le nom et l'adresse d'un courriel libre"
    why: "Un calcul exact relève d'un code classique : juste, reproductible, presque gratuit. Le résumé et l'extraction depuis du texte libre sont le terrain des LLM."
  - id: donnees-confidentielles
    prompt: "Des données ne doivent pas quitter l'entreprise, mais on veut un LLM. Quelle option ?"
    answer: "Héberger soi-même un modèle ouvert"
    decoys:
      - "Baisser la température pour que l'API ne garde aucune trace"
      - "Découper les données en plus petits prompts envoyés à l'API d'un fournisseur"
    why: "Avec Ollama ou vLLM, le modèle tourne sur ses propres machines et les données ne partent pas chez un tiers. La température ou le découpage ne changent rien à l'envoi."
  - id: donnees-recentes
    prompt: "Comment faire répondre un LLM sur des documents internes qu'il n'a jamais vus ?"
    answer: "Lui fournir les passages utiles dans le prompt (RAG)"
    decoys:
      - "Augmenter la température pour qu'il explore plus de connaissances"
      - "Rien de spécial : il les a appris pendant son pré-entraînement sur le web"
    why: "Un LLM ne connaît que ses données d'entraînement. On récupère les passages pertinents et on les place dans le prompt : c'est le RAG."
---
