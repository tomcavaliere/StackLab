---
questions:
  - id: role
    prompt: "À quoi sert Langfuse ?"
    answer: "Observer une application de LLM : traces, coûts, latences, prompts, évaluations"
    decoys:
      - "Servir un modèle à poids ouverts sur ses propres GPU, avec un bon débit"
      - "Remonter les erreurs JavaScript d'une application web vers l'équipe"
    why: "Langfuse est une plateforme d'observabilité dédiée aux LLM. Servir un modèle relève de vLLM ; les erreurs JavaScript, de Sentry."
  - id: pourquoi
    prompt: "Pourquoi les outils d'observabilité classiques ne suffisent-ils pas pour une application de LLM ?"
    answer: "Une mauvaise réponse ne lève pas d'erreur : il faut voir le prompt et le contexte"
    decoys:
      - "Les appels aux LLM ne passent pas par HTTP et échappent aux métriques"
      - "Les fournisseurs de LLM effacent leurs journaux après chaque réponse, sans laisser de trace"
    why: "Le code renvoie un succès même quand la réponse est fausse ; seule la trace (prompt, passages, sortie) explique le problème."
  - id: trace
    prompt: "Dans Langfuse, que contient une trace ?"
    answer: "Les étapes d'une requête, avec entrées, sorties, latence et coût"
    decoys:
      - "La pile d'appels d'une exception levée par le serveur de l'application"
      - "Le relevé de l'utilisation des GPU du fournisseur pendant la journée"
    why: "Une trace suit une requête : récupération, appels au modèle, appels d'outils, chacun avec ses données et son coût."
  - id: prompts
    prompt: "Qu'apporte la gestion des prompts de Langfuse ?"
    answer: "Versionner les prompts hors du code et relier chaque réponse à sa version"
    decoys:
      - "Écrire automatiquement le meilleur prompt pour chaque question posée"
      - "Chiffrer les prompts pour que le fournisseur du modèle ne puisse les lire"
    why: "On sait quelle version de prompt a produit quelle réponse, et on peut en changer sans redéployer. Langfuse n'écrit pas les prompts à votre place."
  - id: scores
    prompt: "Comment Langfuse associe-t-il une mesure de qualité à une réponse enregistrée ?"
    answer: "Par des scores ajoutés aux traces : retour utilisateur, annotation, LLM juge"
    decoys:
      - "En comparant automatiquement chaque réponse à la documentation du fournisseur"
      - "En mesurant uniquement la latence, seul indicateur de qualité fiable"
    why: "Les scores viennent de plusieurs sources et s'attachent aux traces ; les jeux de données servent à comparer des versions."
  - id: instrumentation
    prompt: "Comment instrumente-t-on une application avec Langfuse ?"
    answer: "Avec ses SDK, ses intégrations (LangChain, SDK OpenAI…) ou OpenTelemetry"
    decoys:
      - "Uniquement en remplaçant le fournisseur du modèle par celui de Langfuse"
      - "En installant un agent système qui lit le trafic réseau de la machine"
    why: "SDK Python et TypeScript, intégrations prêtes ou OpenTelemetry : Langfuse n'est pas un fournisseur de modèles."
  - id: donnees-sensibles
    prompt: "Les prompts contiennent des données confidentielles. Que faire avant de les tracer dans Langfuse ?"
    answer: "Auto-héberger, masquer les champs sensibles, ou ne pas tracer le contenu"
    decoys:
      - "Rien : Langfuse ne stocke jamais le texte des prompts ni des réponses"
      - "Baisser la température du modèle pour réduire les données envoyées"
    why: "Les traces recopient prompts et réponses : il faut choisir où elles sont stockées et ce qu'elles contiennent."
  - id: prototype
    prompt: "Un prototype fait un seul appel au modèle. Faut-il installer Langfuse ?"
    answer: "Pas forcément : journaliser la requête et la réponse suffit pour commencer"
    decoys:
      - "Oui : sans Langfuse, l'appel au modèle n'est pas autorisé par le fournisseur"
      - "Oui : c'est la seule façon de connaître le nombre de tokens consommés"
    why: "La valeur de Langfuse croît avec le nombre d'étapes et le passage en production ; les API renvoient elles-mêmes le nombre de tokens."
  - id: vs-sentry
    prompt: "Langfuse remplace-t-il Sentry dans une application de LLM ?"
    answer: "Non : ils sont complémentaires, chacun voit autre chose"
    decoys:
      - "Oui : Langfuse surveille aussi les serveurs et les erreurs du front"
      - "Oui : les deux outils mesurent exactement les mêmes choses"
    why: "Ils sont complémentaires : l'un voit les exceptions et les performances, l'autre les prompts, les réponses et les coûts."
  - id: licence
    prompt: "Comment Langfuse est-il distribué ?"
    answer: "Cœur open-source sous licence MIT, auto-hébergeable ou en offre managée"
    decoys:
      - "Uniquement en offre managée, sans version à auto-héberger"
      - "Uniquement comme extension payante de LangChain, réservée à ses clients entreprise"
    why: "Le cœur est sous licence MIT et s'auto-héberge (Docker Compose, Kubernetes) ; une offre cloud existe aussi. Il marche sans LangChain."
  - id: agent-etapes
    prompt: "Un agent appelle trois outils puis le modèle. Comment Langfuse le représente-t-il ?"
    answer: "Une trace dont chaque appel est une étape, avec ses entrées et sorties"
    decoys:
      - "Quatre traces indépendantes, sans lien entre elles, à rapprocher à la main"
      - "Un seul enregistrement qui ne conserve que la réponse finale de l'agent"
    why: "Une trace correspond à une requête et contient ses étapes (récupération, modèle, outils), ce qui permet de voir laquelle a échoué."
  - id: diagnostic-rag
    prompt: "Une réponse de RAG est fausse. Comment Langfuse aide-t-il à trouver la cause ?"
    answer: "La trace montre les passages récupérés : la recherche ou la rédaction est en cause"
    decoys:
      - "Il corrige automatiquement l'index vectoriel quand un passage utile est absent"
      - "Il relance la question avec un autre modèle jusqu'à obtenir une bonne réponse"
    why: "Langfuse observe, il ne répare pas : voir le contexte transmis au modèle permet de localiser l'erreur."
  - id: suivi-cout
    prompt: "Comment suivre le coût d'une fonctionnalité avec Langfuse ?"
    answer: "Avec les tokens et les coûts enregistrés dans les traces, dans les tableaux de bord"
    decoys:
      - "En lisant la facture mensuelle du fournisseur, qui détaille déjà chaque fonctionnalité"
      - "En additionnant à la main la durée de chaque requête relevée dans les journaux du serveur"
    why: "Chaque trace porte ses tokens et son coût, qu'on regroupe par fonctionnalité ou par utilisateur."
  - id: opentelemetry
    prompt: "Que permet la compatibilité de Langfuse avec OpenTelemetry ?"
    answer: "Instrumenter l'application avec un standard ouvert plutôt qu'avec son SDK"
    decoys:
      - "Remplacer toute la supervision de l'infrastructure (CPU, mémoire, réseau) par Langfuse"
      - "Exporter les prompts dans un format de modèle utilisable par tous les fournisseurs"
    why: "OpenTelemetry est l'une des trois voies d'instrumentation, avec les SDK et les intégrations ; il ne transforme pas Langfuse en outil de supervision système."
  - id: callback-langchain
    prompt: "Comment Langfuse s'intègre-t-il à LangChain ?"
    answer: "Par callback : chaque étape de la chaîne devient un élément de la trace"
    decoys:
      - "En remplaçant les modèles de LangChain par ceux de Langfuse, hébergés chez lui"
      - "En réécrivant la chaîne dans un format propre à Langfuse avant chaque exécution"
    why: "L'intégration observe la chaîne sans la modifier ; Langfuse ne fournit pas de modèles."
  - id: wrapper-openai
    prompt: "Que fait le wrapper du SDK OpenAI fourni par Langfuse ?"
    answer: "Il trace les appels sans changer le code métier"
    decoys:
      - "Il redirige les appels vers un modèle moins cher choisi automatiquement selon la question"
      - "Il ajoute un cache qui évite de refacturer les questions déjà posées auparavant"
    why: "Le wrapper enveloppe le SDK pour enregistrer les appels ; il ne change ni le modèle ni la facturation."
  - id: auto-hebergement
    prompt: "Comment auto-héberger Langfuse ?"
    answer: "Avec Docker Compose ou Kubernetes, d'après la documentation"
    decoys:
      - "Uniquement en compilant le code source à la main sur un poste Windows de développement"
      - "C'est impossible : l'auto-hébergement exige une licence entreprise payante"
    why: "L'auto-hébergement est documenté avec Docker Compose et Kubernetes, et le cœur est sous licence MIT."
  - id: jeux-de-donnees
    prompt: "À quoi servent les jeux de données (datasets) de Langfuse ?"
    answer: "Comparer des versions du prompt ou du modèle sur les mêmes cas"
    decoys:
      - "Réentraîner le modèle du fournisseur à partir des traces enregistrées par l'application"
      - "Remplacer la base de données de l'application pour y stocker les données des utilisateurs"
    why: "Un jeu de cas fixe permet de comparer deux versions à conditions égales ; Langfuse n'entraîne aucun modèle."
  - id: llm-juge
    prompt: "Que peut faire un LLM juge branché sur Langfuse ?"
    answer: "Ajouter des scores aux traces enregistrées"
    decoys:
      - "Bloquer en temps réel les requêtes dangereuses des utilisateurs avant le modèle"
      - "Réécrire les prompts en production sans passer par aucune validation humaine"
    why: "Le LLM juge est l'une des sources de scores, avec le retour utilisateur et l'annotation humaine. Le blocage d'entrées relève d'un garde-fou."
  - id: sans-redeploiement
    prompt: "Quel avantage y a-t-il à gérer les prompts hors du code avec Langfuse ?"
    answer: "Changer de version de prompt sans redéployer l'application"
    decoys:
      - "Rendre le prompt invisible pour le fournisseur du modèle appelé par l'application"
      - "Garantir que la nouvelle version du prompt répond toujours mieux que la précédente"
    why: "Le prompt devient une donnée versionnée ; rien n'assure pour autant qu'une version soit meilleure, d'où les évaluations."
  - id: pas-supervision
    prompt: "Faut-il surveiller le processeur et la mémoire des serveurs avec Langfuse ?"
    answer: "Non : il ne surveille ni les serveurs ni les erreurs du reste de l'application"
    decoys:
      - "Oui : c'est sa fonction principale, avec la collecte des journaux système"
      - "Oui, grâce à un agent à installer sur chaque machine du parc"
    why: "Langfuse complète l'observabilité classique sans la remplacer."
  - id: retour-utilisateur
    prompt: "Un utilisateur clique sur « pouce vers le bas » sous une réponse. Comment l'exploiter ?"
    answer: "L'enregistrer comme score sur la trace de cette réponse"
    decoys:
      - "Modifier le modèle du fournisseur pour qu'il apprenne de ce clic"
      - "L'ignorer : seuls les LLM juges peuvent produire des scores"
    why: "Le retour utilisateur est une source de scores, rattachés à la trace pour retrouver le prompt et le contexte de la mauvaise réponse."
  - id: llamaindex
    prompt: "Que permet l'intégration de Langfuse avec LlamaIndex ?"
    answer: "Tracer l'indexation et les requêtes"
    decoys:
      - "Entraîner les modèles d'embeddings à partir des requêtes des utilisateurs"
      - "Lire les fichiers du poste du développeur pour alimenter l'index"
    why: "L'intégration rend visibles les étapes de LlamaIndex dans les traces ; elle n'entraîne ni ne remplace rien."
  - id: sdk
    prompt: "Pour quels langages Langfuse fournit-il ses SDK ?"
    answer: "Python et TypeScript"
    decoys:
      - "Java et C# uniquement"
      - "Go et Rust uniquement"
    why: "Ses SDK couvrent Python et TypeScript ; OpenTelemetry et les intégrations élargissent les possibilités d'instrumentation."
  - id: lenteur
    prompt: "Un utilisateur se plaint de lenteur. Que cherche-t-on dans la trace ?"
    answer: "L'étape qui prend le plus de temps : récupération, modèle ou outil"
    decoys:
      - "La version du navigateur utilisée par l'utilisateur au moment de la requête"
      - "Le nombre de serveurs web actifs à l'instant où la requête a été reçue"
    why: "Chaque étape de la trace a sa latence, ce qui désigne celle qui ralentit la requête."
  - id: tokens
    prompt: "Quelle information de consommation chaque trace conserve-t-elle ?"
    answer: "Les tokens et le coût de chaque appel"
    decoys:
      - "Seulement le total de la facture mensuelle du compte du fournisseur"
      - "La consommation électrique du centre de données qui a répondu"
    why: "Langfuse détaille tokens, coût et latence par appel, ce qui permet de les regrouper à volonté."
  - id: usage-cible
    prompt: "Pour quelle application Langfuse apporte-t-il le plus ?"
    answer: "Un RAG ou un agent en production, à plusieurs étapes"
    decoys:
      - "Un site statique qui n'appelle aucun modèle de langage"
      - "Un script jetable qui fait un seul appel au modèle"
    why: "Plus il y a d'étapes et d'utilisateurs, plus la trace complète est précieuse ; pour un appel unique, des journaux suffisent."
  - id: comparer-prompts
    prompt: "Comment savoir laquelle de deux versions d'un prompt est la meilleure ?"
    answer: "Relier chaque réponse à sa version et comparer les scores sur un jeu de données"
    decoys:
      - "Garder la plus récente, car une version suivante est toujours meilleure"
      - "Choisir celle dont les réponses contiennent le plus de mots"
    why: "La gestion des prompts et les évaluations de Langfuse servent à comparer sur les mêmes cas, pas à supposer."
  - id: confidentialite
    prompt: "Pourquoi l'auto-hébergement peut-il répondre à une contrainte de confidentialité ?"
    answer: "Les traces restent sur ses propres serveurs"
    decoys:
      - "Il chiffre les prompts de bout en bout avant de les envoyer au fournisseur du modèle"
      - "Il supprime automatiquement toute donnée personnelle des réponses du modèle"
    why: "Les traces recopient prompts et réponses ; les stocker chez soi évite de les confier à un tiers. Le masquage des champs reste à configurer."
  - id: reponse-fausse-sans-erreur
    prompt: "Une réponse fausse est renvoyée avec un code HTTP 200. Que montre Langfuse que les journaux classiques ne montrent pas ?"
    answer: "Le prompt réellement envoyé, les passages récupérés et la sortie du modèle"
    decoys:
      - "Le code HTTP exact renvoyé par le fournisseur à chaque nouvelle tentative"
      - "La pile d'appels de l'exception qui a provoqué la mauvaise réponse"
    why: "Aucune exception n'est levée : seul le contenu de la trace explique pourquoi la réponse est mauvaise."
---
