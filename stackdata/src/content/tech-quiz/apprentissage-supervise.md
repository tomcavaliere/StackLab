---
questions:
  - id: principe
    prompt: "Qu'est-ce qui caractérise l'apprentissage supervisé ?"
    answer: "Le modèle apprend à partir d'exemples dont on connaît la bonne réponse"
    decoys:
      - "Le modèle découvre seul des groupes dans des données sans réponse connue"
      - "Un expert écrit les règles de décision, que le modèle se contente d'appliquer"
    why: "Supervisé veut dire guidé par des étiquettes : des cas passés avec leur bonne réponse. Découvrir des groupes sans réponse, c'est le non supervisé ; écrire les règles à la main, c'est un système de règles."
  - id: classification-ou-regression
    prompt: "Prédire le prix de vente d'un appartement d'après sa surface et son quartier, c'est un problème de…"
    answer: "Régression : la réponse est un nombre"
    decoys:
      - "Classification : la réponse est une catégorie"
      - "Clustering : on regroupe des appartements proches"
    why: "La cible (le prix) est une valeur numérique continue : c'est une régression. La classification prédit une catégorie, le clustering ne prédit rien de connu."
  - id: role-jeu-de-test
    prompt: "À quoi sert le jeu de test, mis de côté dès le départ ?"
    answer: "À estimer une seule fois, à la fin, la performance sur des données jamais vues"
    decoys:
      - "À comparer les modèles entre eux et régler leurs paramètres au fil des essais"
      - "À compléter l'entraînement quand le jeu d'entraînement ne suffit pas"
    why: "Comparer et régler, c'est le rôle du jeu de validation. Si on consulte le test à chaque essai, on finit par s'adapter à lui et l'estimation devient trop optimiste."
  - id: surapprentissage
    prompt: "Un modèle obtient un excellent score sur l'entraînement, mais un score médiocre sur la validation. Que se passe-t-il ?"
    answer: "Il surapprend"
    decoys:
      - "Il sous-apprend : il est trop simple pour le problème"
      - "Les classes sont déséquilibrées"
    why: "Le modèle a mémorisé les exemples, bruit compris, au lieu d'apprendre une règle générale. Un modèle qui sous-apprend serait mauvais aussi sur l'entraînement."
  - id: fuite-de-donnees
    prompt: "Pour prédire la résiliation d'un client, on utilise la colonne « date de clôture du compte ». Quel est le problème ?"
    answer: "Une fuite de données : la colonne n'est connue qu'après la résiliation"
    decoys:
      - "Un sous-apprentissage : une date n'apporte pas assez d'information au modèle"
      - "Un déséquilibre de classes : trop de clients n'ont pas de date de clôture"
    why: "Cette colonne contient la réponse et n'existe pas au moment où l'on veut prédire. Le score sera excellent en test, puis s'effondrera en production."
  - id: exactitude-trompeuse
    prompt: "1 transaction sur 1 000 est frauduleuse. Un modèle affiche 99,9 % d'exactitude. Que faut-il en penser ?"
    answer: "Rien de bon a priori : répondre toujours « pas fraude » donne déjà ce score"
    decoys:
      - "C'est un excellent modèle, prêt à être déployé tel quel en production"
      - "Le modèle surapprend forcément, puisque son score dépasse 99 %"
    why: "Avec des classes déséquilibrées, l'exactitude est dominée par la classe majoritaire. Il faut regarder le rappel et la précision sur la classe rare, ici la fraude."
  - id: rappel
    prompt: "Que mesure le rappel d'un détecteur de fraude ?"
    answer: "La part des vraies fraudes que le modèle détecte"
    decoys:
      - "La part des alertes du modèle qui sont de vraies fraudes"
      - "La part de toutes les transactions classées correctement"
    why: "Le rappel part des vraies fraudes : combien en a-t-on attrapé ? La part d'alertes justes, c'est la précision ; la part de transactions bien classées, c'est l'exactitude."
  - id: metrique-regression
    prompt: "Quelle métrique exprime l'erreur moyenne d'une régression dans l'unité de la cible, par exemple en euros ?"
    answer: "La MAE (erreur absolue moyenne)"
    decoys:
      - "L'AUC"
      - "Le F1"
      - "Le rappel"
    why: "La MAE se lit directement : « on se trompe de tant d'euros en moyenne ». L'AUC, le F1 et le rappel sont des métriques de classification."
  - id: baseline
    prompt: "Pourquoi mesurer une baseline simple avant d'entraîner un modèle complexe ?"
    answer: "Pour vérifier que le modèle fait nettement mieux qu'une règle triviale"
    decoys:
      - "Parce que les bibliothèques de machine learning exigent un premier modèle simple"
      - "Pour obtenir les étiquettes qui manquent au jeu de données de départ"
    why: "Prédire la classe majoritaire, la moyenne ou appliquer une règle métier donne un point de comparaison. Un modèle qui ne fait pas nettement mieux ne justifie pas sa complexité."
  - id: quand-eviter
    prompt: "Dans quel cas l'apprentissage supervisé est-il le moins adapté ?"
    answer: "Une règle métier simple et lisible suffit à décider"
    decoys:
      - "On dispose d'un long historique de cas avec leur bonne réponse"
      - "La réponse dépend de nombreux indices difficiles à combiner à la main"
    why: "Une règle simple est plus facile à auditer et à corriger qu'un modèle. Un historique étiqueté et des indices nombreux sont au contraire le terrain idéal du supervisé."
  - id: validation-croisee
    prompt: "À quoi sert la validation croisée ?"
    answer: "Faire tourner le rôle de validation entre plusieurs morceaux des données, utile quand elles sont peu nombreuses"
    decoys:
      - "Dupliquer les lignes existantes pour obtenir assez d'exemples d'entraînement quand les données sont peu nombreuses"
      - "Entraîner plusieurs modèles différents puis moyenner leurs prédictions pour gagner en précision sur le jeu de test"
    why: "Chaque morceau sert tour à tour de validation pendant que les autres entraînent : on exploite mieux de petites données. Dupliquer des lignes ou moyenner des modèles sont d'autres techniques, sans rapport."
  - id: precision
    prompt: "Que mesure la précision d'un détecteur de fraude ?"
    answer: "La part des alertes du modèle qui sont de vraies fraudes"
    decoys:
      - "La part des vraies fraudes existantes que le modèle parvient à détecter dans l'ensemble des transactions"
      - "La part de toutes les transactions, fraudes ou non, que le modèle a classées correctement dans l'ensemble"
    why: "La précision part des alertes : combien sont justifiées ? Le rappel part des vraies fraudes, l'exactitude de toutes les transactions."
  - id: f1
    prompt: "Que combine le F1 ?"
    answer: "La précision et le rappel"
    decoys:
      - "L'exactitude et l'AUC, pour juger le modèle quel que soit le seuil de décision choisi"
      - "La MAE et la RMSE, pour mesurer l'erreur moyenne d'une régression et ses grosses erreurs"
    why: "Le F1 résume en une valeur la précision et le rappel d'une classe. L'AUC, la MAE et la RMSE sont d'autres métriques, de classement ou de régression."
  - id: auc
    prompt: "Que mesure l'AUC ?"
    answer: "La capacité à classer les cas positifs au-dessus des négatifs, quel que soit le seuil"
    decoys:
      - "L'erreur moyenne du modèle, exprimée dans l'unité de la cible que l'on cherche à prédire"
      - "La part des prédictions correctes obtenues avec un seuil de décision fixé au départ"
    why: "L'AUC juge le classement des cas, indépendamment du seuil retenu. L'erreur dans l'unité de la cible est la MAE ; la part de prédictions correctes est l'exactitude."
  - id: rmse
    prompt: "Quelle métrique de régression pénalise plus fortement les grosses erreurs ?"
    answer: "La RMSE"
    decoys:
      - "La MAE, qui met toutes les erreurs sur le même plan"
      - "Le rappel, qui mesure les cas positifs détectés"
    why: "La RMSE donne plus de poids aux grosses erreurs. La MAE les traite à égalité ; le rappel est une métrique de classification."
  - id: cible-et-features
    prompt: "Pour prédire si un client va résilier d'après son ancienneté et ses achats, quelle est la cible ?"
    answer: "Le fait que le client résilie ou non"
    decoys:
      - "L'ancienneté du client, l'un des indices fournis au modèle pour apprendre"
      - "Les achats du client, qui forment les variables d'entrée de ce modèle"
    why: "La cible est la réponse à prédire. L'ancienneté et les achats sont des features, les indices donnés au modèle."
  - id: sous-apprentissage
    prompt: "Un modèle est mauvais à la fois sur l'entraînement et sur la validation. Quel est le diagnostic le plus probable ?"
    answer: "Il sous-apprend : il est trop simple pour capter le lien"
    decoys:
      - "Il surapprend : il a mémorisé le bruit des exemples d'entraînement en plus de la règle"
      - "Il y a une fuite de données entre le jeu d'entraînement et le jeu de validation"
    why: "Un mauvais score partout signale un modèle trop simple. Le surapprentissage donnerait un excellent score à l'entraînement, et une fuite de données un score trop beau."
  - id: normalisation-avant-decoupage
    prompt: "Pourquoi est-ce un piège de normaliser toutes les données avant de les découper en entraînement et test ?"
    answer: "Des informations du jeu de test passent dans l'entraînement : c'est une fuite de données"
    decoys:
      - "La normalisation ne fonctionne que sur un petit jeu de données, ce qui fausserait les calculs sur l'ensemble"
      - "Toutes les valeurs seraient ramenées à la même échelle, ce qui ferait surapprendre le modèle sur le bruit"
    why: "Les statistiques calculées sur toutes les données contiennent déjà des informations sur le test. La normalisation se calcule sur l'entraînement seul, puis s'applique au reste."
  - id: test-reutilise
    prompt: "On consulte le jeu de test après chaque essai et l'on garde le meilleur modèle. Quel est le risque ?"
    answer: "S'adapter au jeu de test : l'estimation finale devient trop optimiste"
    decoys:
      - "Un sous-apprentissage, car le modèle ne voit jamais le jeu de test pendant son entraînement"
      - "Un jeu de test qui rétrécit à chaque consultation jusqu'à devenir trop petit pour mesurer"
    why: "À force de choisir d'après le test, on finit par s'ajuster à lui et la performance annoncée dépasse la performance réelle. Le test se consulte une seule fois, à la fin."
  - id: rappel-prioritaire
    prompt: "Rater une vraie fraude coûte bien plus cher qu'une fausse alerte. Quelle métrique de la classe fraude surveiller en priorité ?"
    answer: "Le rappel"
    decoys:
      - "La précision, qui compte les alertes justifiées parmi toutes celles émises"
      - "L'exactitude globale, qui compte toutes les transactions bien classées"
    why: "Le rappel dit combien de vraies fraudes sont attrapées. La précision protège des fausses alertes, et l'exactitude est trompeuse sur des classes déséquilibrées."
  - id: seuil-de-decision
    prompt: "Un classifieur renvoie une probabilité de fraude. Comment obtenir plus de rappel ?"
    answer: "Abaisser le seuil de décision, au prix de plus de fausses alertes"
    decoys:
      - "Relever le seuil de décision, au prix d'un peu moins de fausses alertes"
      - "Réentraîner sans jeu de validation pour que le modèle voie davantage de cas"
    why: "Un seuil plus bas déclare « fraude » plus souvent : on attrape plus de vraies fraudes, mais on se trompe plus souvent. Relever le seuil a l'effet inverse."
  - id: explicabilite
    prompt: "Chaque décision doit être justifiée au cas par cas. Quel type de modèle privilégier ?"
    answer: "Un modèle simple, comme une régression logistique ou un arbre de décision"
    decoys:
      - "Le modèle le plus complexe possible, puisqu'il est plus performant et donc plus facile à justifier"
      - "Aucun : l'apprentissage supervisé est impossible dès qu'une décision doit être expliquée"
    why: "Un modèle simple se lit : on voit quels indices ont pesé. Le supervisé reste possible, mais un modèle opaque se justifie mal."
  - id: gradient-boosting
    prompt: "Quelle famille de modèles est souvent la plus performante sur des données tabulaires (lignes et colonnes) ?"
    answer: "Le gradient boosting, comme XGBoost"
    decoys:
      - "Un réseau de neurones profond entraîné sur GPU, quelle que soit la taille des données"
      - "Le clustering k-means, qui regroupe les lignes proches"
    why: "XGBoost est souvent le meilleur choix sur des tableaux. Le clustering ne prédit aucune réponse connue, et un réseau profond n'a pas cet avantage sur du tabulaire."
  - id: scikit-learn
    prompt: "Quel rôle joue scikit-learn dans un projet d'apprentissage supervisé ?"
    answer: "La boîte à outils Python : découpage des données, modèles classiques, validation croisée, métriques"
    decoys:
      - "Un service managé qui héberge les modèles et les expose derrière une API"
      - "Un framework d'apprentissage profond conçu pour entraîner des réseaux sur GPU"
    why: "scikit-learn fournit l'outillage classique du supervisé en Python. L'hébergement et l'API relèvent d'une plateforme, le GPU d'un framework de deep learning."
  - id: changement-du-monde
    prompt: "Un nouveau produit change le comportement des clients. Quel risque pour un modèle entraîné sur l'ancien historique ?"
    answer: "Il applique des régularités qui n'existent plus"
    decoys:
      - "Aucun : un modèle entraîné une fois reste valable tant que son code ne change pas"
      - "Il s'améliore : plus l'historique est ancien, plus ses prédictions sont fiables"
    why: "Le modèle a appris le passé : si le passé ne ressemble plus à l'avenir, ses prédictions se dégradent."
  - id: sans-etiquettes
    prompt: "On n'a pas d'étiquettes et en obtenir coûterait cher. Que faire en premier ?"
    answer: "Étiqueter un échantillon, ou regarder l'apprentissage non supervisé"
    decoys:
      - "Générer des étiquettes au hasard pour que le modèle ait quelque chose à apprendre"
      - "Passer en régression, qui n'a pas besoin d'étiquettes pour apprendre"
    why: "Le supervisé exige des réponses connues : on en obtient en étiquetant un échantillon, ou l'on change d'approche. Des étiquettes aléatoires apprendraient du bruit, et la régression est aussi supervisée."
  - id: exemple-classification
    prompt: "Lequel de ces problèmes est un problème de classification ?"
    answer: "Dire si un e-mail est du spam ou non"
    decoys:
      - "Prévoir le nombre de ventes de la semaine prochaine"
      - "Estimer le prix d'un appartement d'après sa surface"
    why: "Spam ou pas spam est une catégorie. Un nombre de ventes ou un prix sont des valeurs numériques : des régressions."
  - id: exemple-baseline
    prompt: "Quelle est une baseline raisonnable pour un modèle de classification ?"
    answer: "Prédire toujours la classe majoritaire"
    decoys:
      - "Le modèle le plus complexe possible, pour fixer le plafond de performance à atteindre"
      - "Le score obtenu par le modèle final sur son propre jeu d'entraînement"
    why: "Une baseline est une référence simple que le vrai modèle doit battre nettement. Un modèle complexe ou un score d'entraînement ne servent pas de point de comparaison honnête."
  - id: ecart-entrainement-validation
    prompt: "Quel signal permet de repérer un surapprentissage ?"
    answer: "L'écart entre le score d'entraînement et le score de validation"
    decoys:
      - "Un temps d'entraînement plus long que celui du modèle précédent"
      - "Un nombre de colonnes supérieur au nombre de lignes dans le jeu de données"
    why: "Un score excellent à l'entraînement et médiocre en validation montre un modèle qui a mémorisé. La durée d'entraînement ne dit rien de sa capacité à généraliser."
  - id: lecture-mae
    prompt: "Un modèle de prix d'appartements a une MAE de 12 000 €. Que cela signifie-t-il ?"
    answer: "En moyenne, la prédiction s'écarte du vrai prix de 12 000 €, en valeur absolue"
    decoys:
      - "12 000 appartements du jeu de données sont mal estimés par le modèle"
      - "Le modèle se trompe de 12 % sur chaque prix, quelle que soit la valeur de l'appartement"
    why: "La MAE est une erreur moyenne dans l'unité de la cible, ici l'euro. Elle ne compte pas d'appartements et n'exprime pas un pourcentage."
---
