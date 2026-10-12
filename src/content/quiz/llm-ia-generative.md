---
title: LLM & IA générative
description: "RAG ou fine-tuning, base vectorielle, API ou modèle local, agent ou workflow : qui fait quoi dans une application de LLM ?"
questions:
  - id: connaissances-qui-changent
    prompt: "Un assistant qui répond sur une documentation interne modifiée chaque semaine"
    answer: rag
    decoy: fine-tuning
    why: "Avec le RAG, mettre à jour les connaissances revient à réindexer un document, sans toucher au modèle. Le fine-tuning retient mal les connaissances et demanderait de réentraîner à chaque changement."
  - id: format-de-sortie-strict
    prompt: "Obtenir de façon constante un format de sortie et un ton maison, que la consigne et quelques exemples ne suffisent pas à imposer"
    answer: fine-tuning
    decoy: rag
    why: "Le fine-tuning prolonge l'entraînement sur ses propres exemples pour reproduire un format ou un style. Le RAG apporte des passages de documents, pas un comportement."
  - id: reponse-avec-sources
    prompt: "Une réponse qui cite les passages de documents sur lesquels elle s'appuie, pour pouvoir la vérifier"
    answer: rag
    decoy: fine-tuning
    why: "Le RAG place des extraits dans le prompt et peut demander au modèle de les citer. Un modèle affiné ne peut pas citer sa source."
  - id: recherche-par-le-sens
    prompt: "Retrouver « mettre fin au contrat » quand l'utilisateur cherche « résilier mon abonnement »"
    answer: embeddings
    decoy: elasticsearch
    why: "Des textes de sens proche donnent des vecteurs proches, ce qui permet la recherche sémantique. La recherche par mots-clés est aveugle aux synonymes et aux reformulations."
  - id: reference-produit-exacte
    prompt: "Retrouver une facture à partir de son numéro exact, ou un code produit rare"
    answer: elasticsearch
    decoy: embeddings
    why: "Pour les termes exacts, la recherche par mots-clés est plus fiable. La fiche des embeddings déconseille de s'y fier pour un numéro de facture ou un nom propre rare."
  - id: deja-sur-postgresql
    prompt: "Ajouter la recherche sémantique à une application qui a déjà sa base PostgreSQL, pour un volume modeste, avec des filtres métier"
    answer: pgvector
    decoy: pinecone
    why: "pgvector est une extension : les vecteurs vivent à côté des données et se filtrent en SQL, sans brique de plus. Pinecone ajoute un fournisseur et des données hors de la base."
  - id: sans-rien-operer
    prompt: "Une petite équipe veut une recherche vectorielle en production sans aucune base à déployer ni à surveiller"
    answer: pinecone
    decoy: qdrant
    why: "Pinecone est entièrement managé : le service gère stockage, montée en charge et disponibilité. Qdrant demande d'être auto-hébergé, ou de payer son offre managée."
  - id: filtres-riches-et-auto-hebergement
    prompt: "Une recherche vectorielle qui devient le cœur du produit, avec des filtres riches sur les métadonnées, sur sa propre infrastructure"
    answer: qdrant
    decoy: pgvector
    why: "Qdrant est une base vectorielle open-source dédiée, avec filtrage sur les métadonnées et recherche hybride, auto-hébergeable. pgvector partage les ressources de la base transactionnelle."
  - id: donnees-confidentielles-en-local
    prompt: "Tester un modèle de langage sur son poste, hors ligne, sans que les données quittent la machine"
    answer: ollama
    decoy: openai-api
    why: "Ollama télécharge et exécute des modèles à poids ouverts en local. Avec l'API OpenAI, les prompts sont envoyés à un tiers."
  - id: modele-ouvert-en-production
    prompt: "Servir un modèle ouvert à de nombreux utilisateurs simultanés sur ses propres GPU"
    answer: vllm
    decoy: ollama
    why: "vLLM est conçu pour le débit (PagedAttention, batching continu). Ollama vise la simplicité d'un poste de travail, pas le débit d'un serveur."
  - id: mvp-sans-gpu
    prompt: "Ajouter un résumé automatique de textes à un MVP, sans aucun GPU à acheter ni à exploiter"
    answer: claude-api
    decoy: vllm
    why: "Une API hébergée se paie à l'usage, sans infrastructure ML. vLLM impose de provisionner, surveiller et mettre à l'échelle des machines GPU."
  - id: tache-ouverte-et-outils
    prompt: "Enquêter sur un incident en choisissant soi-même quels outils interroger, sans connaître les étapes à l'avance"
    answer: agent-llm
    decoy: rag
    why: "Dans un agent, le modèle choisit en boucle les outils à appeler selon la situation. Le RAG ne fait que récupérer des passages à insérer dans le prompt."
  - id: un-outil-pour-plusieurs-applications
    prompt: "Rendre une source de données interne utilisable par un assistant de bureau, un IDE et des agents maison, sans un connecteur par application"
    answer: mcp
    decoy: rest
    why: "Un serveur MCP écrit une fois sert à tous les clients compatibles. Appeler directement l'API REST suppose un connecteur dans chaque application."
  - id: une-seule-application
    prompt: "Une seule application, dont on maîtrise le code, doit appeler un seul service pour un outil de son LLM"
    answer: rest
    decoy: mcp
    why: "La fiche de MCP déconseille ce cas : un appel d'outil défini dans l'application qui appelle l'API est plus simple. MCP vaut surtout pour mutualiser un connecteur."
  - id: un-prompt-une-reponse
    prompt: "Un simple appel avec un prompt, une réponse et éventuellement un outil, que l'équipe veut lisible et facile à déboguer"
    answer: claude-api
    decoy: langchain
    why: "Pour un cas simple, un appel direct au SDK du fournisseur est plus court et plus lisible. LangChain ajoute une couche d'abstraction qui complique le débogage."
  - id: changer-de-fournisseur
    prompt: "Une application qui combine récupération de documents, outils et plusieurs modèles, et doit pouvoir changer de fournisseur sans être réécrite"
    answer: langchain
    decoy: openai-api
    why: "LangChain offre une interface commune aux modèles et des briques de RAG et d'agents réutilisables. Appeler un seul fournisseur lie le code à son API."
  - id: modele-sans-fiche
    prompt: "Trouver un modèle à poids ouverts à télécharger, en vérifiant sa licence et sa carte de modèle"
    answer: hugging-face
    decoy: ollama
    why: "Le Hub de Hugging Face publie les modèles avec leur carte et leur licence, à lire avant tout usage commercial. Ollama sert à exécuter un modèle, pas à les cataloguer."
  - id: calcul-exact
    prompt: "Calculer exactement des totaux de comptabilité à partir de règles métier déterministes"
    answer: postgresql
    decoy: llm
    why: "Un code ou une requête classique donne toujours le même résultat pour un coût négligeable. Un LLM peut se tromper sur une addition."
  - id: agreger-toute-la-base
    prompt: "Savoir combien de contrats ont été signés en mars, à partir d'une base de contrats"
    answer: postgresql
    decoy: rag
    why: "Le RAG ne récupère que quelques morceaux : il ne sait pas agréger toute une base. Une requête SQL le fait."
---
