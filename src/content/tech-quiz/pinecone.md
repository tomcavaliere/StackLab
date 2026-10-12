---
questions:
  - id: role
    prompt: "Qu'est-ce que Pinecone ?"
    answer: "Une base vectorielle entièrement managée, proposée en SaaS"
    decoys:
      - "Une base vectorielle open-source, à installer et à exploiter sur ses propres serveurs"
      - "Une extension de PostgreSQL pour la recherche par similarité"
    why: "Pinecone est un service hébergé : on crée un index et on l'utilise via une API, sans base à opérer. Le logiciel n'est pas open-source."
  - id: open-source
    prompt: "Peut-on installer Pinecone en open-source sur ses propres serveurs ?"
    answer: "Non : le logiciel n'est pas publié, le service est piloté par Pinecone"
    decoys:
      - "Oui : la même version que le cloud, sous licence Apache 2.0"
      - "Oui : une édition communautaire limitée à un seul nœud"
    why: "Pinecone n'a pas de version auto-hébergeable. Une option de déploiement dans son propre compte cloud (BYOC) existe, mais elle reste gérée par Pinecone."
  - id: namespaces
    prompt: "À quoi servent les namespaces d'un index Pinecone ?"
    answer: "À cloisonner les données dans un index, typiquement un par client"
    decoys:
      - "À versionner les modèles d'embeddings utilisés pour calculer les vecteurs de l'index"
      - "À répartir l'index entre plusieurs régions du cloud"
    why: "Un namespace sépare les données d'un même index : les requêtes d'un client ne voient que les siennes. C'est la façon simple de faire du multi-clients."
  - id: rien-a-operer
    prompt: "Quel est le principal argument pour choisir Pinecone ?"
    answer: "Rien à opérer : stockage, montée en charge et disponibilité sont gérés"
    decoys:
      - "Les vecteurs restent dans la base métier, ce qui permet des jointures SQL directes"
      - "Le code source est modifiable pour l'adapter à son produit"
    why: "Le service s'occupe de l'infrastructure : une petite équipe peut ajouter une recherche vectorielle sans compétence d'exploitation. Les jointures SQL, c'est pgvector."
  - id: donnees-sensibles
    prompt: "Données qui ne doivent pas quitter votre infrastructure : pourquoi Pinecone pose-t-il problème ?"
    answer: "Les données sont confiées à un service tiers qui les héberge et les gère"
    decoys:
      - "Pinecone refuse tout vecteur accompagné de métadonnées, ce qui interdit le filtrage"
      - "Pinecone publie les index sur un catalogue public par défaut"
    why: "Avec un SaaS, vecteurs et métadonnées sont stockés par le fournisseur. Pour des contraintes réglementaires fortes, on regarde l'auto-hébergement (Qdrant, pgvector), ou l'option BYOC au cas par cas."
  - id: embedding-integre
    prompt: "Que permet l'embedding intégré de Pinecone ?"
    answer: "Envoyer du texte : Pinecone calcule les vecteurs avec un modèle qu'il héberge"
    decoys:
      - "Embarquer Pinecone dans le processus de l'application, sans passer par le réseau ni par une API"
      - "Intégrer l'index directement dans une base PostgreSQL existante"
    why: "Avec un modèle hébergé par Pinecone, on écrit et on interroge avec du texte : le calcul des embeddings se fait côté service, plus besoin de l'appeler à part."
  - id: alternative-postgres
    prompt: "L'application a déjà PostgreSQL et quelques milliers de documents à indexer. Pourquoi Pinecone est-il sans doute superflu ?"
    answer: "pgvector suffit, sans fournisseur ni facture de plus"
    decoys:
      - "Pinecone ne sait pas indexer moins d'un million de vecteurs"
      - "Pinecone ne fonctionne qu'avec des bases NoSQL"
    why: "Pour un volume modeste, l'extension pgvector dans la base existante évite un service, un contrat et une synchronisation de plus."
  - id: dependance
    prompt: "Pourquoi parle-t-on de dépendance fournisseur avec Pinecone ?"
    answer: "Sans version auto-hébergeable, en partir demande de réindexer dans une autre base"
    decoys:
      - "Ses index ne s'interrogent qu'avec les modèles d'embeddings d'un seul éditeur de LLM"
      - "Son contrat interdit d'utiliser une autre base vectorielle en parallèle"
    why: "On ne peut pas reprendre Pinecone chez soi : pour changer, il faut réécrire les vecteurs dans une autre base et adapter le code. Les vecteurs eux-mêmes viennent du modèle de son choix."
  - id: filtres
    prompt: "Peut-on filtrer une recherche Pinecone sur autre chose que la similarité ?"
    answer: "Oui, sur les métadonnées associées aux vecteurs"
    decoys:
      - "Non, seule la distance entre vecteurs compte"
      - "Oui, mais seulement sur la date d'insertion du vecteur dans l'index"
    why: "Chaque vecteur porte des métadonnées (document, langue, date…) et la requête peut filtrer dessus pendant la recherche."
  - id: cas-type
    prompt: "Dans quel cas Pinecone est-il un bon choix ?"
    answer: "Un MVP d'IA monté par une petite équipe pressée, sans contrainte de localisation des données"
    decoys:
      - "Une banque dont les données ne doivent jamais quitter ses propres serveurs ni son réseau"
      - "Une application qui doit joindre les vecteurs aux factures en SQL"
    why: "Pinecone échange le contrôle contre la rapidité de mise en œuvre. Données confinées ou jointures SQL orientent vers l'auto-hébergement ou pgvector."
---
