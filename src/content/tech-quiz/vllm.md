---
questions:
  - id: role
    prompt: "Qu'est-ce que vLLM ?"
    answer: "Un moteur open-source pour servir des LLM sur GPU"
    decoys:
      - "Une API hébergée qui donne accès à des modèles propriétaires, facturée au token"
      - "Une bibliothèque pour chaîner prompts, outils et documents dans une application"
    why: "vLLM sert des modèles (inférence) sur ses propres GPU, avec un objectif de débit. Chaîner des étapes, c'est LangChain ; une API au token, c'est OpenAI ou Claude."
  - id: paged-attention
    prompt: "Quel problème PagedAttention résout-il ?"
    answer: "Le gaspillage de la mémoire réservée au cache KV"
    decoys:
      - "La lenteur du téléchargement des poids depuis le Hub de Hugging Face"
      - "La perte de qualité due à la quantification des poids du modèle"
    why: "PagedAttention découpe le cache KV en blocs alloués à la demande, comme des pages de mémoire virtuelle : moins de mémoire perdue, donc plus de requêtes en parallèle sur un GPU."
  - id: cache-kv
    prompt: "Qu'est-ce que le cache KV d'un LLM ?"
    answer: "Les clés et valeurs d'attention gardées pendant la génération"
    decoys:
      - "Un cache des réponses déjà données, rejouées pour les questions identiques"
      - "Une base clé-valeur externe, comme Redis, où vLLM stocke l'historique des conversations"
    why: "Pendant la génération, le modèle garde les clés et valeurs d'attention des tokens déjà traités pour ne pas les recalculer. C'est cette mémoire que PagedAttention gère."
  - id: batching-continu
    prompt: "Qu'apporte le batching continu de vLLM ?"
    answer: "Les requêtes entrent et sortent du lot à chaque étape de génération"
    decoys:
      - "Les requêtes sont regroupées une fois par nuit et traitées en différé"
      - "Chaque requête reçoit son propre GPU, réservé jusqu'à la fin de sa réponse"
    why: "Le lot n'attend pas que la requête la plus longue ait fini : une requête terminée libère sa place, une nouvelle la prend. Le GPU reste occupé."
  - id: api-compatible
    prompt: "Pourquoi l'API compatible OpenAI de vLLM est-elle utile ?"
    answer: "Les clients existants s'y branchent en changeant l'URL"
    decoys:
      - "Elle permet d'utiliser les modèles d'OpenAI sur ses propres GPU"
      - "Elle facture les appels au même tarif que l'API d'OpenAI"
    why: "`vllm serve` expose une API au format de celle d'OpenAI : on passe d'une API hébergée à un modèle ouvert auto-hébergé sans réécrire le client. Les modèles d'OpenAI, eux, ne sont pas téléchargeables."
  - id: prerequis
    prompt: "Que faut-il pour exploiter vLLM en production ?"
    answer: "Des GPU et une équipe capable de les exploiter"
    decoys:
      - "Un simple abonnement, vLLM étant un service hébergé"
      - "Un poste de développement récent, sans autre infrastructure"
    why: "vLLM s'auto-héberge sur des machines à GPU qu'il faut provisionner, surveiller et mettre à l'échelle. Pour un poste de travail, Ollama est plus adapté."
  - id: quand-utiliser
    prompt: "Dans quel cas vLLM est-il un bon choix ?"
    answer: "Servir un modèle ouvert à beaucoup d'utilisateurs, sans que les données sortent"
    decoys:
      - "Essayer un modèle sur son ordinateur portable pendant un après-midi"
      - "Ajouter un résumé de texte à un MVP construit par deux personnes en un mois"
    why: "vLLM vise la production à fort trafic sur ses propres GPU. Pour un essai local, Ollama ; pour un MVP sans compétence GPU, une API hébergée."
  - id: volume-faible
    prompt: "Pourquoi vLLM est-il peu adapté à un trafic faible et irrégulier ?"
    answer: "Des GPU qui tournent à vide coûtent quand même"
    decoys:
      - "vLLM refuse de démarrer sous un nombre minimal de requêtes par seconde"
      - "vLLM ne sait traiter les requêtes que par gros lots planifiés"
    why: "Avec l'auto-hébergement, on paie le matériel, utilisé ou non. Pour un faible trafic, une API facturée au token est souvent plus simple et moins chère."
  - id: modeles-hub
    prompt: "D'où vLLM charge-t-il habituellement les modèles qu'il sert ?"
    answer: "Du Hub de Hugging Face"
    decoys:
      - "De l'API d'OpenAI, dont il télécharge les poids"
      - "De la bibliothèque de modèles intégrée à Kubernetes"
    why: "vLLM charge les modèles ouverts publiés sur le Hub, au format de transformers. Kubernetes peut héberger les serveurs vLLM, mais ne fournit pas de modèles."
  - id: gros-modele
    prompt: "Un modèle est trop gros pour la mémoire d'un seul GPU. Que permet vLLM ?"
    answer: "Le répartir sur plusieurs GPU"
    decoys:
      - "Le compresser automatiquement jusqu'à ce qu'il tienne sur un seul GPU, sans perte"
      - "L'exécuter sur le disque à la place de la mémoire du GPU, à vitesse égale"
    why: "vLLM sait découper un modèle entre plusieurs GPU. Aucune compression n'est sans perte, et le disque est bien plus lent que la mémoire du GPU."
---
