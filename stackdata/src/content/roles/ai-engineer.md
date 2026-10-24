---
name: AI engineer
family: ia
summary: "Construit des applications sur des modèles de langage existants, sans les entraîner."
mission: "Assemble un LLM, des données de l'entreprise et du code applicatif pour produire un assistant, un moteur de recherche en langage naturel ou un agent. Il écrit les prompts, choisit comment fournir le bon contexte au modèle, puis mesure si les réponses sont bonnes."
stack:
  - step: Écrire le code applicatif
    intro: "Une application LLM est d'abord une application : du code qui appelle des API, gère des erreurs et enchaîne des étapes."
    techs:
      - { tech: python, essential: true, why: "Le langage où les bibliothèques LLM arrivent en premier." }
      - { tech: typescript, why: "Choisi quand l'application est déjà dans l'écosystème web." }
      - { tech: fastapi, why: "Expose l'assistant en API HTTP, avec streaming des réponses." }
  - step: Comprendre le modèle
    intro: "Savoir ce qu'un modèle de langage fait vraiment (prédire la suite d'un texte) évite d'en attendre ce qu'il ne sait pas faire."
    techs:
      - { tech: llm, essential: true, why: "Le concept central : un modèle qui génère du texte à partir d'un contexte limité." }
      - { tech: transformer, why: "L'architecture sous les LLM : l'attention explique les limites de longueur de contexte." }
  - step: Choisir où tourne le modèle
    intro: "Un modèle s'appelle en API chez un fournisseur, se loue via un cloud, ou s'héberge soi-même : coût, confidentialité et qualité diffèrent."
    techs:
      - { tech: claude-api, essential: true, why: "Les modèles Claude d'Anthropic, appelés en API." }
      - { tech: openai-api, why: "L'API des modèles d'OpenAI, souvent copiée par d'autres fournisseurs." }
      - { tech: aws-bedrock, why: "Plusieurs modèles de fournisseurs via AWS, avec la facturation et la sécurité AWS." }
      - { tech: hugging-face, why: "Hub de modèles ouverts à télécharger et à héberger soi-même." }
      - { tech: ollama, why: "Fait tourner un modèle ouvert sur sa propre machine, pour développer sans dépendre d'une API." }
      - { tech: vllm, why: "Sert un modèle auto-hébergé à plusieurs utilisateurs avec un bon débit." }
  - step: Piloter le comportement
    intro: "On dispose de trois leviers, du plus léger au plus lourd : le prompt, le contexte fourni, puis l'entraînement complémentaire."
    techs:
      - { tech: prompt-engineering, essential: true, why: "Rédiger les consignes et les exemples qui obtiennent le comportement voulu, sans toucher au modèle." }
      - { tech: fine-tuning, why: "Poursuivre l'entraînement sur ses propres exemples quand le prompt ne suffit plus." }
  - step: Donner accès aux connaissances de l'entreprise
    intro: "Le modèle ne connaît ni vos documents ni les événements récents. Le RAG consiste à retrouver les passages utiles et à les insérer dans le prompt."
    techs:
      - { tech: rag, essential: true, why: "Retrouve les bons passages de documents avant de répondre : moins d'inventions, sources citables." }
      - { tech: embeddings, essential: true, why: "Transforment des textes en vecteurs pour chercher par le sens plutôt que par mots-clés." }
      - { tech: pgvector, why: "Recherche vectorielle dans PostgreSQL : une base de moins à exploiter." }
      - { tech: qdrant, why: "Base vectorielle dédiée, open source." }
      - { tech: pinecone, why: "Base vectorielle managée : rien à héberger." }
      - { tech: chroma, why: "Base vectorielle légère, pratique pour prototyper." }
      - { tech: weaviate, why: "Base vectorielle avec recherche hybride (mots-clés + sens)." }
  - step: Orchestrer et donner des outils au modèle
    intro: "Quand une seule requête ne suffit pas, on enchaîne des étapes, ou on laisse le modèle appeler des outils."
    techs:
      - { tech: langchain, why: "Bibliothèque pour enchaîner appels de modèle, outils et recherches." }
      - { tech: llamaindex, why: "Spécialisée dans l'ingestion de documents et la recherche pour le RAG." }
      - { tech: agent-llm, why: "Le modèle décide lui-même des étapes et des outils à utiliser pour atteindre un but." }
      - { tech: mcp, why: "Protocole standard pour brancher un modèle sur des outils et des sources de données." }
  - step: Évaluer et observer
    intro: "Une réponse de LLM n'est pas déterministe : sans mesure, on ne sait pas si une modification améliore ou dégrade."
    techs:
      - { tech: evaluation-llm, essential: true, why: "Mesurer la qualité des réponses sur un jeu de cas, pour comparer deux versions du système." }
      - { tech: langfuse, why: "Trace chaque appel (prompt, réponse, coût, latence) pour comprendre ce qui s'est passé." }
---
