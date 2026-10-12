---
title: "Assistant documentaire : répondre aux employés à partir de nos documents"
type: ia-generative
brief: |
  Nous sommes une entreprise d'environ 800 personnes. Nos procédures, contrats types, notes internes et comptes rendus
  sont dispersés dans des dossiers partagés, et les employés perdent un temps fou à retrouver la bonne information.
  Nous voulons un assistant, accessible depuis un site interne, auquel on pose une question en langage courant
  et qui répond à partir de nos documents, en citant les passages d'où vient la réponse pour que chacun puisse vérifier.
  Ces documents sont confidentiels : chaque employé ne doit voir que ce qu'il a le droit de consulter,
  et nous devons savoir où partent nos données. L'équipe est petite et nous voulons une première version utile rapidement.
constraints:
  team: "3 développeurs web, aucun spécialiste du machine learning"
  budget: "Raisonnable : pas de parc de machines à GPU à acheter pour la première version"
  volume: "Quelques dizaines de milliers de documents, quelques centaines de questions par jour"
  latency: "Une réponse en quelques secondes, affichée au fil de l'eau"
  timeToMarket: "Première version en 2 mois"
requiredLayers: [frontend, backend-api, ml, base-operationnelle]
optionalLayers: [auth, cloud, observabilite, ci-cd, conteneurs-infra]
verdicts:
  frontend:
    - { tech: react, verdict: ideal, why: "Une interface de conversation avec réponses affichées au fil de l'eau et sources cliquables : un cas courant pour React." }
    - { tech: nextjs, verdict: acceptable, why: "Convient très bien, mais le rendu serveur n'apporte rien à un site interne derrière authentification." }
    - { tech: vue, verdict: acceptable, why: "Tout aussi capable pour une interface de chat ; le choix dépend surtout des habitudes de l'équipe." }
    - { tech: svelte, verdict: acceptable, why: "Léger et agréable pour une interface simple, avec un écosystème de composants plus restreint." }
    - { tech: angular, verdict: acceptable, why: "Cadre complet qui fonctionne, mais lourd pour un écran de conversation et une équipe de 3 personnes." }
    - { tech: django, verdict: acceptable, why: "Des pages rendues côté serveur suffisent pour une première version, avec moins d'interactivité pour le texte qui s'affiche au fil de l'eau." }
    - { tech: laravel, verdict: acceptable, why: "Des vues serveur pour un site interne : correct, moins à l'aise pour le flux de texte progressif." }
    - { tech: ruby-on-rails, verdict: acceptable, why: "Des vues serveur pour un site interne : correct, moins à l'aise pour le flux de texte progressif." }
  backend-api:
    - { tech: fastapi, verdict: ideal, why: "Python, le langage de l'écosystème d'IA, avec le streaming de réponses et des schémas validés ; le chemin le plus court entre la recherche et le modèle." }
    - { tech: nodejs, verdict: acceptable, why: "Gère bien le flux de réponses ; les bibliothèques d'IA y sont présentes mais plus riches en Python." }
    - { tech: express, verdict: acceptable, why: "Minimaliste et suffisant pour exposer quelques routes ; tout le reste (validation, structure) est à construire." }
    - { tech: nestjs, verdict: acceptable, why: "Structure solide en TypeScript, un peu d'appareil pour une API de quelques routes." }
    - { tech: django, verdict: acceptable, why: "Solide en Python avec gestion des utilisateurs incluse ; moins naturel que FastAPI pour du streaming asynchrone." }
    - { tech: nextjs, verdict: acceptable, why: "Permet de tout faire dans un seul projet TypeScript, au prix d'un back et d'un front plus couplés." }
    - { tech: laravel, verdict: acceptable, why: "Un backend complet en PHP qui fait le travail, loin de l'écosystème d'IA." }
    - { tech: ruby-on-rails, verdict: acceptable, why: "Un backend complet qui fait le travail, loin de l'écosystème d'IA." }
    - { tech: spring-boot, verdict: surdimensionne, why: "Un cadre d'entreprise robuste, lourd pour une équipe de 3 personnes qui veut une première version en 2 mois." }
    - { tech: gin, verdict: acceptable, why: "Rapide et léger, mais l'écosystème Go pour l'IA est bien plus mince qu'en Python." }
    - { tech: supabase, verdict: acceptable, why: "Peut porter l'API et les utilisateurs, mais l'orchestration de la recherche et du modèle demandera quand même un service à soi." }
  ml:
    - { tech: pgvector, verdict: ideal, why: "Quelques dizaines de milliers de documents : les vecteurs vivent dans la même base que les droits d'accès et les métadonnées, un seul système à sauvegarder et à sécuriser." }
    - { tech: qdrant, verdict: acceptable, why: "Base vectorielle auto-hébergeable avec filtres sur les métadonnées : performante, mais un service de plus à opérer pour ce volume." }
    - { tech: pinecone, verdict: acceptable, why: "Zéro serveur à gérer, mais les contenus confidentiels partent chez un tiers : à valider contractuellement avant de s'engager." }
    - { tech: claude-api, verdict: acceptable, why: "Modèle de langage managé, sans machine à gérer : le moyen le plus rapide d'obtenir des réponses de qualité. Les extraits de documents sont envoyés au fournisseur, à valider avec les conditions contractuelles." }
    - { tech: openai-api, verdict: acceptable, why: "Modèle de langage managé, sans machine à gérer : le moyen le plus rapide d'obtenir des réponses de qualité. Les extraits de documents sont envoyés au fournisseur, à valider avec les conditions contractuelles." }
    - { tech: ollama, verdict: acceptable, why: "Garde tout en interne avec un modèle à poids ouverts, pratique pour développer ; conçu pour une machine, pas pour de nombreux utilisateurs simultanés." }
    - { tech: vllm, verdict: acceptable, why: "Sert un modèle à poids ouverts en interne avec un bon débit, ce qui répond à la confidentialité ; demande des GPU et une équipe pour les exploiter, ce que le contexte n'a pas." }
    - { tech: langchain, verdict: acceptable, why: "Accélère l'assemblage découpage, recherche et appel du modèle ; pour un pipeline aussi simple, le code direct reste lisible, et la bibliothèque ajoute une couche à comprendre." }
    - { tech: hugging-face, verdict: acceptable, why: "Utile pour trouver un modèle d'embeddings ou un modèle à poids ouverts à héberger soi-même, mais ce n'est pas le service qui répond aux utilisateurs." }
    - { tech: mlflow, verdict: surdimensionne, why: "Suivi d'expériences et registre de modèles : on entraîne aucun modèle ici, on appelle un modèle existant." }
    - { tech: aws-sagemaker, verdict: surdimensionne, why: "Plateforme d'entraînement et de déploiement de modèles, sans objet quand on s'appuie sur un modèle déjà prêt." }
    - { tech: scikit-learn, verdict: inadapte, why: "Machine learning classique sur données tabulaires : il ne génère pas de texte et ne comprend pas des questions en langage courant." }
    - { tech: xgboost, verdict: inadapte, why: "Prédiction sur données tabulaires : sans rapport avec la génération de réponses à partir de textes." }
    - { tech: pytorch, verdict: surdimensionne, why: "Un cadre pour entraîner des réseaux de neurones, alors que le besoin est d'utiliser un modèle existant." }
    - { tech: tensorflow, verdict: surdimensionne, why: "Un cadre pour entraîner des réseaux de neurones, alors que le besoin est d'utiliser un modèle existant." }
  base-operationnelle:
    - { tech: postgresql, verdict: ideal, why: "Stocke documents, métadonnées et droits d'accès, et accueille les vecteurs avec une extension : une seule base pour tout." }
    - { tech: supabase, verdict: acceptable, why: "PostgreSQL managé avec authentification incluse ; pratique, mais place les documents confidentiels chez un tiers." }
    - { tech: mysql, verdict: acceptable, why: "Base relationnelle solide pour les métadonnées et les droits ; la recherche vectorielle serait à confier à un autre service." }
    - { tech: sqlite, verdict: surdimensionne, why: "Une base locale en fichier : suffisante pour un prototype, pas pour des utilisateurs simultanés sur plusieurs services." }
    - { tech: mongodb, verdict: acceptable, why: "Peut stocker documents et métadonnées, mais les droits d'accès par employé se modélisent plus naturellement en relationnel." }
    - { tech: elasticsearch, verdict: acceptable, why: "Bon moteur de recherche de texte, y compris par mots-clés, mais un cluster à opérer en plus pour ce volume." }
    - { tech: cassandra, verdict: surdimensionne, why: "Conçue pour de très gros volumes répartis sur de nombreux serveurs : sans rapport avec quelques dizaines de milliers de documents." }
    - { tech: dynamodb, verdict: acceptable, why: "Convient pour des métadonnées simples, mais les droits d'accès croisés se modélisent plus naturellement en relationnel." }
  auth:
    - { tech: keycloak, verdict: ideal, why: "Se branche sur l'annuaire de l'entreprise, auto-hébergé : les droits de chaque employé restent chez nous." }
    - { tech: auth0, verdict: acceptable, why: "Authentification managée prête à l'emploi, avec une dépendance à un service externe pour l'identité des employés." }
    - { tech: supabase, verdict: acceptable, why: "Authentification incluse si la base y est aussi ; moins adaptée au branchement sur un annuaire d'entreprise." }
    - { tech: django, verdict: acceptable, why: "Gestion des utilisateurs incluse, mais l'intégration à l'annuaire de l'entreprise reste à faire." }
    - { tech: laravel, verdict: acceptable, why: "Gestion des utilisateurs incluse, mais l'intégration à l'annuaire de l'entreprise reste à faire." }
    - { tech: ruby-on-rails, verdict: acceptable, why: "Gestion des utilisateurs incluse, mais l'intégration à l'annuaire de l'entreprise reste à faire." }
  cloud:
    - { tech: aws, verdict: ideal, why: "Héberge l'application et la base dans une région choisie, avec des services d'identité et de réseau privés pour des données confidentielles." }
    - { tech: aws-s3, verdict: acceptable, why: "Bon endroit pour conserver les fichiers sources avant leur découpage, avec des accès restreints." }
    - { tech: aws-lambda, verdict: acceptable, why: "Peut exécuter l'indexation des nouveaux documents à la demande ; moins adapté à un flux de réponses de plusieurs secondes." }
    - { tech: heroku, verdict: acceptable, why: "Déploiement simple pour une petite équipe, avec moins de contrôle réseau pour des données confidentielles." }
    - { tech: vercel, verdict: acceptable, why: "Très bien pour le front ; moins pour un backend de longue durée et des données confidentielles." }
  observabilite:
    - { tech: sentry, verdict: ideal, why: "Remonte les erreurs de l'API et de l'interface, ce qui compte vite quand un appel au modèle échoue." }
    - { tech: grafana, verdict: acceptable, why: "Pour suivre les temps de réponse et le volume d'appels, à brancher sur une source de métriques." }
    - { tech: prometheus, verdict: acceptable, why: "Collecte des métriques de l'API : utile, avec un service de plus à exploiter pour quelques centaines de questions par jour." }
    - { tech: elasticsearch, verdict: surdimensionne, why: "Un cluster de journaux à opérer en plus, alors que le volume de questions reste modeste." }
  ci-cd:
    - { tech: github-actions, verdict: ideal, why: "Tests et déploiement à chaque modification, y compris un jeu de questions de référence pour détecter qu'un changement dégrade les réponses." }
  conteneurs-infra:
    - { tech: docker, verdict: ideal, why: "Empaquette l'API et ses dépendances de la même façon sur le poste du développeur et en production." }
    - { tech: nginx, verdict: acceptable, why: "Placé devant l'API, il gère le HTTPS et le flux de réponses ; utile, pas indispensable avec un hébergeur managé." }
    - { tech: terraform, verdict: acceptable, why: "Décrire l'infrastructure en code est précieux dès qu'elle grandit ; pour une première version, une configuration manuelle documentée suffit." }
    - { tech: kubernetes, verdict: surdimensionne, why: "Un orchestrateur de conteneurs pour une application et une base, avec une équipe de 3 personnes." }
antiPatterns:
  - { techs: [pgvector, qdrant], penalty: 10, why: "Deux bases vectorielles pour les mêmes documents : les index divergeront, et chaque mise à jour devra être faite deux fois." }
  - { techs: [qdrant, pinecone], penalty: 10, why: "Deux bases vectorielles pour les mêmes documents : les index divergeront, et chaque mise à jour devra être faite deux fois." }
  - { techs: [pgvector, pinecone], penalty: 10, why: "Deux bases vectorielles pour les mêmes documents : les index divergeront, et chaque mise à jour devra être faite deux fois." }
  - { techs: [claude-api, openai-api], penalty: 5, why: "Deux fournisseurs de modèle sans raison précise : des comportements différents à surveiller et des données confidentielles envoyées à deux tiers." }
  - { techs: [ollama, vllm], penalty: 5, why: "Deux serveurs de modèles auto-hébergés pour la même fonction : un seul suffit." }
  - { techs: [pytorch, tensorflow], penalty: 10, why: "Deux cadres d'entraînement pour un besoin qui n'en demande aucun." }
  - { techs: [pinecone, vllm], penalty: 10, why: "Des modèles gardés en interne pour la confidentialité, mais les extraits de documents indexés chez un tiers : l'effort est annulé." }
referenceStack:
  frontend: [react]
  backend-api: [fastapi]
  ml: [pgvector, claude-api]
  base-operationnelle: [postgresql]
  auth: [keycloak]
  cloud: [aws]
  observabilite: [sentry]
  ci-cd: [github-actions]
---

## Ce qui compte vraiment ici

Le besoin n'est pas « avoir une IA », c'est **retrouver l'information de l'entreprise et pouvoir la vérifier**. Cela se traite par la recherche augmentée (RAG) : on découpe les documents, on les indexe, on retrouve les passages proches de la question, puis on demande au modèle de répondre uniquement à partir d'eux, en citant. La difficulté est dans les droits d'accès et la confidentialité, pas dans le modèle.

## Le raisonnement

- **Une seule base si possible.** Quelques dizaines de milliers de documents tiennent largement dans PostgreSQL avec pgvector : les passages, leurs sources et les droits de chaque employé se filtrent dans la même requête. Une base vectorielle dédiée devient utile avec des volumes ou des besoins de recherche bien plus grands.
- **Un modèle existant, pas un modèle entraîné.** L'équipe n'a ni données d'entraînement ni spécialiste : on appelle un modèle de langage par API. Entraîner ou affiner un modèle ne règle pas le problème de départ, qui est de s'appuyer sur des documents qui changent.
- **La confidentialité est un choix à assumer.** Une API managée envoie des extraits à un tiers : acceptable si les conditions contractuelles le permettent. Sinon, un modèle à poids ouverts servi en interne garde tout chez soi, au prix de GPU et de compétences d'exploitation. Les deux se défendent ; il faut choisir en connaissance de cause.
- **Les droits d'accès filtrent avant le modèle.** Un employé ne doit jamais recevoir un passage qu'il ne peut pas lire : le filtre se fait dans la recherche, avec l'identité venant de l'authentification, jamais en demandant poliment au modèle de se taire.
- **Des sources citées, donc vérifiables.** L'interface affiche les passages d'origine ; c'est ce qui permet de faire confiance, ou non, à une réponse.

## Les pièges

- **Deux bases vectorielles** (ou deux fournisseurs de modèle) « pour comparer » : des index qui divergent et deux fois plus de choses à sécuriser.
- **Entraîner un modèle par réflexe.** PyTorch, TensorFlow, SageMaker et MLflow servent à entraîner et suivre des modèles : ici on n'en entraîne aucun.
- **Du machine learning classique pour du texte.** scikit-learn et XGBoost traitent des tableaux de chiffres, pas des questions en langage courant.
- **Une infrastructure de grande entreprise.** Kubernetes ou un cluster de journaux pour quelques centaines de questions par jour coûtent plus qu'ils n'apportent.
- **Une confidentialité de façade.** Garder le modèle en interne mais indexer les documents chez un tiers annule l'effort.
