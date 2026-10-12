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
---
