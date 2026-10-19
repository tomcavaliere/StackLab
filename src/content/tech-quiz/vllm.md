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
  - id: commande-serve
    prompt: "Que fait la commande `vllm serve <modèle>` ?"
    answer: "Elle lance un serveur exposant le modèle par une API compatible OpenAI"
    decoys:
      - "Elle télécharge le modèle puis l'affine automatiquement sur les exemples fournis"
      - "Elle publie le modèle sur le Hub de Hugging Face pour le rendre accessible"
    why: "`vllm serve` démarre un serveur d'inférence avec une API au format OpenAI. Il n'affine ni ne publie rien."
  - id: origine
    prompt: "Quel problème de fond un serveur naïf d'inférence LLM pose-t-il sur GPU ?"
    answer: "Il utilise mal le GPU et gaspille la mémoire du cache KV"
    decoys:
      - "Il refuse de traiter plus d'une requête à la fois, par conception du modèle"
      - "Il recalcule les poids du modèle à chaque requête, ce qui ralentit tout"
    why: "Un serveur naïf traite les requêtes une par une ou par lots figés et réserve trop de mémoire au cache KV. vLLM corrige ces deux pertes."
  - id: lots-figes
    prompt: "Dans un traitement par lots figés, quel défaut le batching continu supprime-t-il ?"
    answer: "Attendre que la requête la plus longue du lot ait fini"
    decoys:
      - "Devoir recharger les poids du modèle à chaque nouveau lot"
      - "Devoir chiffrer les prompts avant de les envoyer au GPU"
    why: "Dans un lot figé, les requêtes courtes attendent la plus longue. Avec le batching continu, une requête terminée est remplacée tout de suite."
  - id: pages
    prompt: "Pourquoi PagedAttention est-il comparé à la mémoire virtuelle d'un système d'exploitation ?"
    answer: "Le cache KV est découpé en blocs alloués à la demande"
    decoys:
      - "Le cache KV est déplacé sur le disque quand la mémoire du GPU est pleine"
      - "Les poids du modèle sont partagés entre plusieurs processus du système"
    why: "Comme des pages de mémoire virtuelle, les blocs de cache KV ne sont pas réservés d'avance en une zone contiguë, ce qui réduit la mémoire perdue."
  - id: plus-requetes
    prompt: "Quel bénéfice concret une meilleure gestion de la mémoire du cache KV apporte-t-elle ?"
    answer: "Davantage de requêtes en parallèle sur le même GPU"
    decoys:
      - "Des réponses plus précises, car le modèle retient plus de connaissances"
      - "Un modèle plus petit, dont les poids occupent moins d'espace sur disque"
    why: "La mémoire économisée sur le cache KV permet de traiter plus de requêtes à la fois. Elle ne change ni les connaissances ni les poids du modèle."
  - id: confidentialite
    prompt: "Quel argument de confidentialité justifie d'auto-héberger un modèle avec vLLM ?"
    answer: "Les données restent dans l'infrastructure de l'entreprise"
    decoys:
      - "Le modèle chiffre automatiquement toutes les réponses côté serveur"
      - "Les prompts ne sont jamais journalisés, quelle que soit la configuration"
    why: "Avec vLLM, le modèle tourne sur ses propres machines : aucune requête ne part chez un fournisseur. Le chiffrement et la journalisation restent à configurer soi-même."
  - id: modele-affine
    prompt: "On a affiné un modèle ouvert pour un usage interne. Comment le servir à beaucoup d'utilisateurs ?"
    answer: "Le charger dans vLLM sur des GPU"
    decoys:
      - "L'envoyer à l'API d'OpenAI, qui l'hébergera avec les mêmes poids"
      - "Le convertir en jeu de données pour le publier sur le Hub de Hugging Face"
    why: "vLLM sert aussi un modèle affiné en interne. Les poids ne se téléversent pas dans l'API d'OpenAI, et le Hub héberge des modèles, pas des « jeux de données » issus d'eux."
  - id: alternative-api
    prompt: "Dans quel cas une API hébergée est-elle préférable à vLLM ?"
    answer: "Une petite équipe sans compétence GPU qui démarre un produit"
    decoys:
      - "Une exigence stricte que les données ne quittent jamais l'entreprise"
      - "Un très fort trafic stable et prévisible, sur du matériel déjà acquis"
    why: "Provisionner et surveiller des GPU est lourd pour une petite équipe : l'API hébergée est plus simple au départ. Les deux autres cas plaident pour l'auto-hébergement."
  - id: seuil
    prompt: "À partir de quel volume vaut-il mieux auto-héberger avec vLLM plutôt que payer au token ?"
    answer: "Aucun seuil fiable ne se donne : cela dépend du modèle, du matériel et du trafic"
    decoys:
      - "Dès que l'on dépasse le premier millier de requêtes par jour"
      - "Dès que l'on utilise un modèle de plus de dix milliards de paramètres"
    why: "Le point de rentabilité varie avec le modèle, le matériel et la forme du trafic. Aucune règle universelle n'existe, il faut chiffrer son propre cas."
  - id: ollama-vs
    prompt: "Pour tester un modèle ouvert sur un poste de travail, que choisir entre Ollama et vLLM ?"
    answer: "Ollama, qui s'installe et se lance en une commande"
    decoys:
      - "vLLM, car il est toujours plus rapide quelle que soit la machine"
      - "vLLM, car Ollama ne sait pas exécuter de modèle sans carte graphique"
    why: "Ollama est conçu pour la simplicité en local, vLLM pour le débit en production. Ollama sait aussi se rabattre sur le CPU."
  - id: kubernetes
    prompt: "Quel rôle joue Kubernetes avec vLLM ?"
    answer: "Il héberge les serveurs vLLM sur des nœuds GPU et gère leur mise à l'échelle"
    decoys:
      - "Il fournit les modèles que vLLM sert, à la manière d'un catalogue"
      - "Il remplace le batching continu en répartissant les mots d'une requête"
    why: "Kubernetes déploie et met à l'échelle des serveurs vLLM sur le cluster. Il ne fournit pas de modèle et ne remplace pas la planification interne de vLLM."
  - id: formats
    prompt: "Sur quels accélérateurs vLLM vise-t-il d'abord à fonctionner ?"
    answer: "Les GPU NVIDIA et AMD"
    decoys:
      - "Les processeurs de smartphone, pour une inférence embarquée"
      - "Uniquement les TPU d'un fournisseur cloud, via un service géré"
    why: "vLLM cible d'abord les GPU NVIDIA et AMD ; d'autres accélérateurs passent par des extensions."
  - id: api-compat-limites
    prompt: "Quelle précaution prendre en remplaçant une API OpenAI par vLLM dans une application ?"
    answer: "Vérifier que le modèle ouvert choisi est assez bon pour la tâche"
    decoys:
      - "Réécrire entièrement le client, les formats de requête étant incompatibles"
      - "Aucune : le modèle servi par vLLM donne les mêmes réponses que celui d'OpenAI"
    why: "La compatibilité d'API évite de réécrire le client, mais le modèle change : sa qualité doit être mesurée sur ses propres cas."
  - id: berkeley
    prompt: "Dans quel contexte vLLM est-il né ?"
    answer: "À l'université de Berkeley, comme projet open-source"
    decoys:
      - "Dans un fournisseur d'API commerciale, qui l'a ensuite ouvert au public"
      - "Chez un éditeur de bases de données, pour accélérer ses requêtes SQL"
    why: "vLLM a été créé à l'université de Berkeley et est open-source."
  - id: cout-materiel
    prompt: "Quel coût remplace une facture au token quand on passe à vLLM auto-hébergé ?"
    answer: "Le matériel GPU et son exploitation"
    decoys:
      - "Une licence par utilisateur facturée par les auteurs de vLLM"
      - "Une redevance par requête versée à l'éditeur du modèle ouvert"
    why: "vLLM est open-source : on paie les machines (achetées ou louées) et le travail pour les exploiter. Les licences de modèles sont une question distincte."
  - id: pas-entrainement
    prompt: "Que ne fait pas vLLM ?"
    answer: "Entraîner un modèle, car il sert à l'inférence"
    decoys:
      - "Répartir un modèle sur plusieurs GPU"
      - "Exposer une API compatible avec celle d'OpenAI"
    why: "vLLM est un moteur d'inférence : il sert des modèles déjà entraînés. Il sait en revanche répartir un modèle sur plusieurs GPU et exposer une API OpenAI."
  - id: kv-generation
    prompt: "Pourquoi le cache KV grossit-il pendant la génération d'une réponse ?"
    answer: "Chaque nouveau token ajoute ses clés et valeurs d'attention à conserver"
    decoys:
      - "Parce que le modèle recopie ses poids à chaque token généré pour les mettre à jour"
      - "Parce que vLLM enregistre chaque requête de l'utilisateur dans une base de données"
    why: "Le modèle garde les clés et valeurs d'attention des tokens déjà traités pour ne pas les recalculer ; chaque token produit en ajoute. C'est ce que gère PagedAttention."
  - id: choix-vllm-ollama-api
    prompt: "Une entreprise veut servir un assistant interne à des milliers d'employés avec un modèle ouvert, sur ses propres GPU. Quel outil choisir ?"
    answer: "vLLM, conçu pour le débit en production"
    decoys:
      - "Ollama, qui vise surtout la simplicité d'un poste de travail"
      - "Hugging Face transformers seul, qui est un serveur optimisé pour le débit"
    why: "vLLM est fait pour servir beaucoup d'utilisateurs sur GPU. Ollama est pensé pour le local et transformers seul n'est pas optimisé pour le débit."
  - id: gpu-vide
    prompt: "Pourquoi surveiller l'utilisation des GPU est-il important avec vLLM ?"
    answer: "Des machines chères coûtent même quand elles ne servent presque pas"
    decoys:
      - "Parce que vLLM s'arrête automatiquement dès que le GPU dépasse une charge fixe"
      - "Parce que l'API compatible OpenAI ne fonctionne que sous un seuil de charge"
    why: "Avec l'auto-hébergement, on paie le matériel utilisé ou non, d'où l'intérêt de surveiller et de dimensionner. vLLM ne s'arrête pas de lui-même."
  - id: poste-de-cout
    prompt: "Quel poste de dépense domine quand on exploite vLLM soi-même ?"
    answer: "Des machines GPU à provisionner, surveiller et mettre à l'échelle"
    decoys:
      - "Une licence annuelle, à payer au projet vLLM"
      - "Un abonnement mensuel fixe auprès du Hub de Hugging Face"
    why: "vLLM est open-source : le coût est celui des GPU et de leur exploitation."
---
