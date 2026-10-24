---
questions:
  - id: but
    prompt: "À quoi sert l'évaluation (evals) d'une application de LLM ?"
    answer: "Mesurer la qualité des réponses pour comparer des versions avant de livrer"
    decoys:
      - "Calculer le prix d'un modèle avant de signer un contrat avec un fournisseur"
      - "Entraîner le modèle à partir des réponses qu'il a lui-même produites"
    why: "Les evals rendent la qualité mesurable sur un jeu de cas, pour savoir si un changement de prompt ou de modèle améliore les choses."
  - id: premiere-etape
    prompt: "Quelle est la première étape pour construire des evals ?"
    answer: "Définir les critères de succès : exactitude, format, ton, refus, coût…"
    decoys:
      - "Choisir le modèle le mieux classé dans les benchmarks publics"
      - "Écrire le prompt définitif avant de penser à le mesurer"
    why: "Sans critères explicites, on ne sait pas ce qu'on mesure ; le jeu de test et la notation en découlent."
  - id: jeu-test
    prompt: "Que doit contenir un bon jeu de cas de test ?"
    answer: "Des cas représentatifs, y compris des cas difficiles et limites"
    decoys:
      - "Uniquement les questions pour lesquelles le modèle répond déjà bien"
      - "Des questions générées au hasard, sans lien avec les vrais utilisateurs"
    why: "Questions réelles, erreurs déjà rencontrées et cas limites : c'est là que les régressions apparaissent."
  - id: code-d-abord
    prompt: "Quelle méthode de notation privilégier quand elle est possible ?"
    answer: "Les vérifications par code : rapides, fiables et gratuites"
    decoys:
      - "Le LLM juge, parce qu'il comprend mieux le sens que n'importe quel code"
      - "L'évaluation humaine, à appliquer systématiquement à chaque cas de test"
    why: "Correspondance exacte, JSON valide, classe attendue : quand un critère se vérifie par code, c'est le plus sûr et le moins cher."
  - id: llm-juge
    prompt: "Quel est le risque d'un LLM juge jamais confronté à des notes humaines ?"
    answer: "On mesure les préférences du juge, pas la qualité réelle"
    decoys:
      - "Le juge modifie les réponses évaluées avant de les noter"
      - "Le juge ne peut noter que des réponses au format JSON"
    why: "Un LLM juge a ses biais ; on le vérifie par sondage contre des notes humaines avant de lui faire confiance."
  - id: humain
    prompt: "Quand réserver l'évaluation humaine ?"
    answer: "À l'étalonnage des autres méthodes et aux cas ambigus"
    decoys:
      - "Jamais : un LLM juge est toujours plus fiable qu'un relecteur"
      - "À tous les cas, à chaque modification de prompt"
    why: "La plus fiable, mais la plus lente et la plus chère : on l'utilise là où elle apporte le plus."
  - id: pas-de-assert
    prompt: "Pourquoi un test unitaire classique (assertEquals) suffit-il rarement pour un LLM ?"
    answer: "Il n'y a souvent pas de sortie unique attendue pour une même question"
    decoys:
      - "Parce que les LLM renvoient leurs réponses dans un format binaire"
      - "Parce que les frameworks de test refusent d'appeler une API externe"
    why: "Plusieurs formulations correctes existent ; on note des critères (fidélité, format, exactitude) plutôt qu'une égalité."
  - id: benchmarks
    prompt: "Un modèle est premier d'un classement public. Que faut-il en conclure pour son application ?"
    answer: "Rien de certain : il faut le tester sur ses propres cas"
    decoys:
      - "Qu'il répondra forcément mieux que les autres à vos utilisateurs"
      - "Qu'il est inutile de garder un jeu de test interne"
    why: "Les benchmarks comparent les modèles entre eux sur des tâches générales, pas sur votre application."
  - id: rag
    prompt: "Dans un RAG, pourquoi évaluer la récupération séparément de la réponse ?"
    answer: "Pour savoir si l'erreur vient des passages retrouvés ou de la rédaction"
    decoys:
      - "Parce que la récupération ne peut jamais se tromper si l'index est à jour"
      - "Parce que la qualité de la réponse ne dépend pas des passages fournis"
    why: "Si le bon passage n'est pas retrouvé, le modèle ne peut pas bien répondre : on corrige alors la recherche, pas le prompt."
  - id: changement-modele
    prompt: "Le fournisseur propose une nouvelle version du modèle. Que faire avant de basculer ?"
    answer: "Relancer le jeu d'évaluation pour vérifier qu'aucun cas ne se dégrade"
    decoys:
      - "Basculer directement : une nouvelle version est toujours meilleure"
      - "Réécrire tous les prompts, car ils ne sont jamais compatibles"
    why: "Une nouvelle version peut améliorer certains cas et en dégrader d'autres ; seul le jeu d'évaluation le montre."
  - id: regression-prompt
    prompt: "Un prompt est modifié pour corriger un cas précis. Comment vérifier qu'il n'en dégrade pas d'autres ?"
    answer: "Relancer tout le jeu d'évaluation et comparer à la version précédente"
    decoys:
      - "Tester uniquement le cas corrigé, puisque les autres cas n'ont pas été modifiés"
      - "Demander au modèle de confirmer lui-même qu'aucune réponse n'a régressé"
    why: "Un prompt modifié peut améliorer un cas et en dégrader d'autres : seule la comparaison sur tout le jeu le montre."
  - id: json-valide
    prompt: "Comment vérifier dans un eval qu'un LLM renvoie bien du JSON valide ?"
    answer: "Par une vérification par code : on tente de parser la sortie"
    decoys:
      - "Avec un relecteur humain qui lit chaque sortie à chaque exécution du jeu de test"
      - "Avec un LLM juge qui donne une note générale de 1 à 10 sur l'impression de structure"
    why: "Un critère vérifiable mécaniquement se note par code : rapide, fiable et gratuit. Humain et juge sont réservés à ce que le code ne voit pas."
  - id: grille-juge
    prompt: "Comment rendre un LLM juge plus fiable ?"
    answer: "Lui fournir une grille de critères précise"
    decoys:
      - "Lui demander une impression générale, sans critère, pour laisser le modèle libre de son jugement"
      - "Lui faire noter ses propres réponses, qu'il connaît mieux que celles d'un autre modèle"
    why: "Une grille explicite rend la notation plus stable et plus vérifiable. Un jugement flou ou un juge qui évalue son propre travail amplifie les biais."
  - id: etalonnage-juge
    prompt: "Comment s'assurer qu'un LLM juge note comme le ferait un humain ?"
    answer: "Comparer ses notes à celles de relecteurs sur un échantillon de cas"
    decoys:
      - "Vérifier que ses notes sont presque toujours élevées, signe qu'il reconnaît la qualité"
      - "Lui faire noter deux fois le même cas et s'assurer qu'il se répète, sans contrôle humain"
    why: "Le juge se vérifie par sondage contre des notes humaines. Une note stable ou flatteuse ne prouve pas qu'elle soit juste."
  - id: cas-reels
    prompt: "D'où tirer des cas de test réalistes pour un assistant en production ?"
    answer: "De vraies questions d'utilisateurs et d'erreurs déjà rencontrées"
    decoys:
      - "De cas inventés par le modèle évalué, qui connaît mieux que quiconque ses propres limites"
      - "D'extraits de benchmarks publics recopiés tels quels, sans les adapter à l'application"
    why: "Un jeu de test doit ressembler à l'usage réel. Un modèle qui invente ses propres tests et un benchmark générique passent à côté des vrais cas difficiles."
  - id: refus
    prompt: "Pour une question hors du périmètre de l'assistant, quel comportement l'eval doit-il récompenser ?"
    answer: "Un refus clair plutôt qu'une réponse inventée"
    decoys:
      - "Une réponse longue et détaillée, qui montre la richesse des connaissances du modèle"
      - "Une réponse rapide, la latence étant alors le seul critère qui compte vraiment"
    why: "Le refus quand il faut refuser fait partie des critères de succès : inventer une réponse hors périmètre est une erreur, pas une qualité."
  - id: recuperation
    prompt: "Quelle question porte sur la récupération, et non sur la rédaction, dans l'évaluation d'un RAG ?"
    answer: "Les passages utiles ont-ils été retrouvés ?"
    decoys:
      - "La réponse est-elle rédigée dans un ton agréable pour l'utilisateur final ?"
      - "Le modèle a-t-il utilisé moins de tokens que lors du test précédent ?"
    why: "La récupération se juge sur les passages retrouvés. Le ton et la consommation de tokens concernent la génération, pas la recherche."
  - id: fidelite
    prompt: "Que mesure la fidélité aux sources d'une réponse de RAG ?"
    answer: "Que la réponse s'appuie sur les passages fournis, sans rien inventer"
    decoys:
      - "Que la réponse recopie mot pour mot les passages, sans aucune reformulation"
      - "Que la source citée est le document le plus récemment modifié de la base"
    why: "La fidélité compare la réponse aux passages donnés au modèle : une reformulation correcte est fidèle, une affirmation absente des passages ne l'est pas."
  - id: ci
    prompt: "À quel moment lancer le jeu d'évaluation dans le cycle de développement ?"
    answer: "À chaque modification de prompt ou de modèle, comme des tests"
    decoys:
      - "Une fois par an, lors de la revue de sécurité de l'application"
      - "Seulement après un incident signalé par un utilisateur en production"
    why: "Comme des tests automatisés, les evals servent à détecter une régression avant la livraison, par exemple depuis un pipeline d'intégration continue."
  - id: surveiller-prod
    prompt: "Un jeu de test bien construit dispense-t-il de surveiller l'application en production ?"
    answer: "Non : on suit aussi les retours des utilisateurs et des échantillons notés"
    decoys:
      - "Oui : un bon jeu de test prédit toutes les requêtes que les utilisateurs poseront"
      - "Oui : en production, les utilisateurs ne fournissent aucune information exploitable"
    why: "Le jeu ne couvre jamais toutes les requêtes réelles ; la production apporte de nouveaux cas, qu'on peut ajouter ensuite au jeu."
  - id: autres-criteres
    prompt: "Quels critères autres que le texte de la réponse peut-on mesurer dans un eval ?"
    answer: "La latence et le coût"
    decoys:
      - "La taille du dépôt de code et le nombre de commits"
      - "La version du navigateur et la langue du poste de l'utilisateur"
    why: "Les critères de succès incluent la latence et le coût à côté de l'exactitude, de la fidélité, du format ou du ton."
  - id: biais-juge
    prompt: "Quel type de problème peut affecter un LLM juge ?"
    answer: "Des biais, par exemple une préférence pour certaines formes de réponse"
    decoys:
      - "Il note toujours au hasard, car un LLM ne peut produire aucune note stable"
      - "Il ne comprend que les réponses rédigées en anglais, quel que soit le modèle choisi"
    why: "Un juge a des préférences qui ne reflètent pas forcément la qualité réelle, d'où le contrôle par sondage contre des notes humaines."
  - id: cas-limites
    prompt: "Pourquoi inclure des cas limites dans un jeu de test ?"
    answer: "Les échecs et les régressions apparaissent surtout sur ces cas-là"
    decoys:
      - "Pour gonfler le score moyen avec des cas que tous les modèles réussissent"
      - "Pour rendre le jeu plus rapide à exécuter"
    why: "Les cas faciles sont réussis par n'importe quelle version ; les cas difficiles et limites distinguent les versions."
  - id: prototype
    prompt: "Pour un tout premier prototype, faut-il un jeu d'évaluation complet ?"
    answer: "Pas encore : quelques essais à la main suffisent, le jeu vient avec le produit"
    decoys:
      - "Oui : sans jeu complet, un prototype de LLM ne peut pas être lancé du tout"
      - "Oui : avec plusieurs relecteurs humains mobilisés dès le premier jour du projet"
    why: "Au stade de l'exploration, on cherche seulement à savoir si l'idée tient. Le jeu de test se construit dès que le prototype devient un produit."
  - id: outil-evals
    prompt: "Lequel de ces outils propose des fonctions d'évaluation de LLM et garde les résultats de chaque version ?"
    answer: "MLflow"
    decoys:
      - "Apache Airflow"
      - "Sentry"
    why: "MLflow suit les expériences et propose des évaluations de LLM. Airflow orchestre des pipelines, Sentry remonte les erreurs d'application."
  - id: sur-ajustement
    prompt: "Pourquoi ne pas régler un prompt jusqu'à réussir tous les cas du jeu de test, sans autre contrôle ?"
    answer: "On risque de s'ajuster à ces cas et de mal généraliser aux vraies requêtes"
    decoys:
      - "Le jeu de test ne peut plus être exécuté une fois que tous ses cas sont réussis"
      - "Le fournisseur facture un supplément dès que le score atteint le maximum"
    why: "Un prompt optimisé sur quelques cas peut échouer sur d'autres : il faut un jeu représentatif et le renouveler avec les cas réels."
  - id: cout-humain
    prompt: "Pourquoi ne pas faire noter tous les cas par des relecteurs humains ?"
    answer: "C'est la méthode la plus lente et la plus chère"
    decoys:
      - "Les humains sont incapables de juger un critère subjectif comme le ton d'une réponse"
      - "Les humains ne peuvent évaluer que des réponses d'une phrase au maximum"
    why: "L'évaluation humaine est la plus fiable mais la moins économique : on la garde pour étalonner les autres méthodes et pour les cas ambigus."
  - id: critere-subjectif
    prompt: "Comment noter le ton d'une réponse quand le code ne peut pas le vérifier ?"
    answer: "Un LLM juge avec une grille précise, contrôlé par des notes humaines"
    decoys:
      - "Une correspondance exacte avec une phrase de référence rédigée à l'avance par l'équipe"
      - "Un comptage de mots positifs dans la réponse, qui suffit à mesurer le ton avec certitude"
    why: "Un critère subjectif se prête au LLM juge, à condition de lui donner une grille et de le confronter à des humains. Une égalité exacte ne convient pas à un texte libre."
  - id: variabilite
    prompt: "Un même prompt donne des réponses différentes d'une exécution à l'autre. Quelle conséquence pour les evals ?"
    answer: "On note des critères plutôt qu'une égalité stricte, sur un nombre suffisant de cas"
    decoys:
      - "Les evals deviennent impossibles, il faut renoncer à toute mesure de la qualité"
      - "Il suffit de relancer jusqu'à obtenir la réponse attendue et de retenir celle-là"
    why: "La variabilité est la raison d'être des evals : on évalue des critères sur beaucoup de cas, pas une sortie unique."
  - id: critere-mesurable
    prompt: "Lequel de ces critères de succès est directement mesurable ?"
    answer: "Le JSON renvoyé est valide dans tous les cas du jeu"
    decoys:
      - "Les utilisateurs devraient trouver l'assistant globalement agréable à utiliser"
      - "Le modèle doit rester aussi intelligent que possible dans toutes les situations"
    why: "Un bon critère est précis et se vérifie sur le jeu de test ; les formulations vagues ne permettent pas de comparer deux versions."
---
