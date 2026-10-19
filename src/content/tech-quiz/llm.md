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
  - id: suivre-des-consignes
    prompt: "Qu'est-ce qui permet à un LLM pré-entraîné de suivre des consignes ?"
    answer: "Un entraînement complémentaire, comme le fine-tuning"
    decoys:
      - "Un moteur de règles ajouté par le fournisseur, qui traduit chaque consigne en requête"
      - "Une base de consignes consultée à chaque appel pour retrouver la réponse enregistrée"
    why: "Après le pré-entraînement, un entraînement complémentaire (fine-tuning, retours humains) apprend au modèle à suivre une consigne. Il ne consulte aucune base de réponses."
  - id: date-de-coupure
    prompt: "Pourquoi un LLM ne connaît-il pas l'actualité de la semaine ?"
    answer: "Ses connaissances s'arrêtent à la date de ses données d'entraînement"
    decoys:
      - "Son tokenizer écarte automatiquement les contenus récents pour limiter les erreurs"
      - "Il met à jour ses connaissances une fois par mois à partir des requêtes des utilisateurs"
    why: "Le modèle ne sait que ce que contenaient ses données d'entraînement. Pour des faits récents, on les fournit dans le prompt."
  - id: prompt-langage-naturel
    prompt: "Comment indique-t-on à un LLM la tâche à accomplir ?"
    answer: "Par une consigne en langage naturel, le prompt"
    decoys:
      - "Par un programme écrit dans le langage propre au modèle, compilé avant chaque appel"
      - "Par un réentraînement complet du modèle à chaque nouvelle tâche"
    why: "C'est l'intérêt d'un LLM : on décrit la tâche en langage naturel au lieu de la programmer ou de réentraîner un modèle."
  - id: document-trop-long
    prompt: "Que se passe-t-il si un document dépasse la fenêtre de contexte du modèle ?"
    answer: "Le modèle ne peut pas le lire en entier en un seul appel"
    decoys:
      - "Le modèle le compresse de lui-même, sans aucune perte, pour le faire tenir dans la fenêtre"
      - "L'API le facture en double et le traite en deux passes successives, de façon transparente"
    why: "Ce qui n'est pas dans la fenêtre, le modèle ne le voit pas. Il faut découper le document ou n'envoyer que les passages utiles, comme avec un RAG."
  - id: facture-document-joint
    prompt: "Un long document est joint à chaque requête d'un assistant. Quelle conséquence sur la facture ?"
    answer: "Il est facturé en tokens d'entrée à chaque requête"
    decoys:
      - "Il n'est facturé qu'à la première requête, le modèle le gardant ensuite en mémoire"
      - "Il est gratuit : seuls les tokens de la réponse du modèle sont facturés"
    why: "On paie les tokens d'entrée comme ceux de sortie, à chaque appel. Le modèle ne garde rien d'un appel à l'autre."
  - id: temperature-extraction
    prompt: "On extrait des champs de courriels. Quelle température viser pour des réponses stables ?"
    answer: "Une température basse"
    decoys:
      - "Une température haute, pour que le modèle explore plusieurs lectures possibles du courriel"
      - "Peu importe : ce paramètre n'agit que sur la longueur maximale de la réponse"
    why: "Basse, le modèle choisit les tokens les plus probables, donc des sorties plus conservatrices. Elle ne garantit pas pour autant des sorties identiques."
  - id: classifieur-classique
    prompt: "Des millions de tickets à classer dans des catégories fixes, avec des exemples étiquetés. Quelle option revient souvent moins cher ?"
    answer: "Un modèle classique entraîné sur ces exemples"
    decoys:
      - "Un LLM appelé par API pour chaque ticket, car son coût au token devient négligeable au volume"
      - "Un agent LLM qui choisit lui-même ses outils pour traiter chaque ticket"
    why: "Pour une tâche bien définie à gros volume, un modèle spécialisé est moins cher à faire tourner. Le coût au token d'un LLM s'additionne à chaque ticket."
  - id: relecture-humaine
    prompt: "Un LLM rédige des réponses juridiques envoyées à des clients. Que prévoir ?"
    answer: "Une relecture humaine avant l'envoi"
    decoys:
      - "Une température à 0, qui supprime les hallucinations du modèle"
      - "Un prompt plus long, qui garantit la véracité des citations de textes de loi"
    why: "Les hallucinations se réduisent mais ne disparaissent pas. Quand la réponse doit être vraie, un humain relit."
  - id: atout-prototype
    prompt: "Pourquoi un LLM convient-il bien pour valider une idée rapidement ?"
    answer: "Une consigne bien écrite remplace souvent des semaines de développement"
    decoys:
      - "Il ne coûte rien tant que l'application reste en phase de test"
      - "Il garantit en production de meilleures performances qu'un modèle entraîné pour la tâche"
    why: "On décrit la tâche en langage naturel et on voit tout de suite si l'idée tient. Cela n'implique ni gratuité ni supériorité à long terme."
  - id: mots-et-tokens
    prompt: "Un texte de 1000 mots fait-il exactement 1000 tokens ?"
    answer: "Non : le découpage en tokens dépend du modèle"
    decoys:
      - "Oui : un token correspond toujours à un mot entier, quelle que soit la langue"
      - "Oui, à condition que le texte soit écrit en anglais"
    why: "Un token est un mot, un bout de mot ou un caractère, selon le tokenizer du modèle. Le nombre de tokens se mesure avec celui du modèle utilisé."
  - id: hugging-face-role
    prompt: "Quel rôle Hugging Face joue-t-il vis-à-vis des LLM ?"
    answer: "Un catalogue de modèles ouverts à télécharger, avec fiches et licences"
    decoys:
      - "Un moteur d'inférence qui sert un modèle sur GPU à de nombreux utilisateurs"
      - "Le fournisseur de modèles hébergés, facturés au token via une API"
    why: "Hugging Face répertorie des modèles ouverts avec leurs fiches et leurs licences. Les servir à de nombreux utilisateurs, c'est le rôle d'un moteur comme vLLM."
  - id: tests-non-deterministes
    prompt: "Pourquoi tester une fonction qui appelle un LLM est-il délicat ?"
    answer: "Une même entrée peut donner des sorties différentes"
    decoys:
      - "Le fournisseur refuse les appels tant que la fonction n'a pas été validée par ses équipes"
      - "Le modèle change de tokenizer à chaque appel, ce qui modifie le découpage du texte"
    why: "Un LLM n'est pas déterministe, même à température 0. Les tests doivent tolérer des formulations différentes."
  - id: donner-des-outils
    prompt: "Que faut-il ajouter à un LLM pour qu'il puisse agir, par exemple interroger une API ?"
    answer: "Des outils : c'est le principe d'un agent"
    decoys:
      - "Une fenêtre de contexte plus grande, qui lui donne la capacité d'agir"
      - "Un RAG, qui lui permet d'exécuter des fonctions de l'application"
    why: "Le LLM seul produit du texte. Pour agir, on lui décrit des outils et l'application les exécute à sa demande. Le RAG, lui, ne fait qu'apporter des données dans le prompt."
  - id: tache-adaptee
    prompt: "Laquelle de ces tâches se prête bien à un LLM ?"
    answer: "Classer des demandes clients écrites en texte libre"
    decoys:
      - "Vérifier qu'un IBAN respecte son format, avec un résultat toujours identique"
      - "Appliquer chaque mois une remise définie précisément dans un contrat"
    why: "Le texte libre difficile à mettre en règles est le terrain des LLM. Une règle précise et déterministe se programme, pour un résultat toujours juste."
  - id: donnees-chez-un-tiers
    prompt: "Un prompt envoyé à l'API d'un fournisseur contient des données personnelles de clients. Quel point surveiller ?"
    answer: "Ces données partent chez un tiers : lire ses conditions de traitement"
    decoys:
      - "Elles sont automatiquement anonymisées par le modèle avant d'être traitées"
      - "Elles restent dans la fenêtre de contexte, qui ne quitte jamais l'application"
    why: "Chaque requête transmet son contenu au fournisseur. Selon les contraintes, on lit ses conditions de conservation des données ou on héberge un modèle chez soi."
  - id: memoire-chatbot
    prompt: "Un chatbot doit se souvenir du début de la conversation. Comment l'application s'y prend-elle ?"
    answer: "Elle renvoie l'historique dans le prompt à chaque appel"
    decoys:
      - "Le modèle retient chaque échange dans ses poids dès qu'il le reçoit"
      - "Le modèle l'écrit dans un fichier local qu'il relit à l'appel suivant"
    why: "La fenêtre de contexte est la mémoire de travail du modèle : ce qui n'y est pas, il ne le voit pas. L'historique y est donc réinséré à chaque appel."
  - id: reduire-le-cout
    prompt: "Quel levier réduit le coût d'appels à un LLM par API ?"
    answer: "Envoyer moins de tokens, par exemple seulement les passages utiles"
    decoys:
      - "Augmenter la température pour que les réponses soient plus courtes"
      - "Répéter la consigne deux fois pour que le modèle la mémorise d'un appel à l'autre"
    why: "On paie au token, en entrée comme en sortie : moins de tokens, moins de coût. La température ne règle pas la longueur, et le modèle ne mémorise rien."
  - id: citation-inventee
    prompt: "Un LLM cite un article scientifique, avec auteurs et titre précis. Que faire ?"
    answer: "Vérifier la référence, car elle peut être inventée"
    decoys:
      - "Lui faire confiance : une citation précise est le signe qu'elle est réelle"
      - "Baisser la température, qui force le modèle à ne citer que des sources existantes"
    why: "Le modèle produit le texte le plus plausible : une référence peut avoir l'air parfaite et être inventée. La température n'y change rien."
  - id: licence-modele-ouvert
    prompt: "Pourquoi lire la licence d'un modèle ouvert avant de l'utiliser dans un produit ?"
    answer: "Elle précise les usages permis, qui varient d'un modèle à l'autre"
    decoys:
      - "Elle fixe la température recommandée et la longueur maximale des réponses du modèle"
      - "Elle garantit la qualité des réponses du modèle dans la langue des utilisateurs du produit"
    why: "Un catalogue comme Hugging Face publie la licence de chaque modèle ouvert, et ses conditions d'usage diffèrent. La licence ne dit rien de la qualité ni des réglages."
  - id: erreur-d-addition
    prompt: "Pourquoi un LLM peut-il se tromper sur une addition ?"
    answer: "Il prédit un texte plausible au lieu de calculer"
    decoys:
      - "Son tokenizer supprime les chiffres trop longs avant de les lire"
      - "Sa fenêtre de contexte est trop petite pour contenir deux nombres à additionner"
    why: "Un LLM génère le token suivant le plus plausible : ce n'est pas un calcul. Pour un résultat exact, on utilise un code classique."
---
