---
questions:
  - id: principe
    prompt: "Qu'est-ce qui caractérise l'apprentissage non supervisé ?"
    answer: "Il cherche une structure dans des données sans réponse connue"
    decoys:
      - "Il prédit une réponse connue à partir d'exemples étiquetés"
      - "Il apprend sans aucune donnée, uniquement à partir de règles"
    why: "Sans étiquettes, l'algorithme ne peut pas apprendre une bonne réponse : il fait émerger des groupes, des axes ou des cas atypiques dans les données elles-mêmes."
  - id: segmentation-client
    prompt: "Le marketing veut découvrir des types de clients, sans catégories définies à l'avance. Quelle technique utiliser ?"
    answer: "Le clustering"
    decoys:
      - "Une régression"
      - "Une classification"
    why: "Le clustering regroupe les clients qui se ressemblent ; le métier nomme ensuite les groupes. Classification et régression demandent une réponse connue pour chaque client."
  - id: k-means-parametre
    prompt: "Que faut-il fournir à k-means avant de le lancer ?"
    answer: "Le nombre de groupes à former"
    decoys:
      - "Le groupe attendu de chaque point"
      - "La liste des anomalies déjà connues"
    why: "k-means place chaque point dans le groupe dont le centre est le plus proche, pour un nombre de groupes fixé à l'avance. D'autres méthodes, comme DBSCAN, le trouvent seules."
  - id: role-acp
    prompt: "À quoi sert l'ACP (analyse en composantes principales) ?"
    answer: "Résumer de nombreuses colonnes en quelques axes qui gardent l'essentiel"
    decoys:
      - "Regrouper les lignes en un nombre fixé de segments de clients"
      - "Prédire une colonne cible à partir des autres colonnes du tableau"
    why: "L'ACP est une méthode de réduction de dimension : elle ramène par exemple 50 indicateurs à 2 axes, pour visualiser les données ou alléger un autre modèle."
  - id: detection-anomalies
    prompt: "Repérer une machine dont les capteurs dérivent, sans exemples de pannes passées : de quel usage s'agit-il ?"
    answer: "La détection d'anomalies"
    decoys:
      - "La réduction de dimension"
      - "La classification supervisée"
    why: "La détection d'anomalies signale ce qui s'écarte du comportement habituel, sans exemples étiquetés. Une classification supposerait un historique de pannes identifiées."
  - id: difficulte-evaluation
    prompt: "Pourquoi évaluer un clustering est-il délicat ?"
    answer: "Sans bonne réponse, aucune erreur ne peut être mesurée directement"
    decoys:
      - "Les algorithmes de clustering ne fonctionnent pas sur plus de quelques milliers de lignes"
      - "Le score de silhouette est toujours identique, quels que soient les groupes"
    why: "Sans étiquettes, pas d'erreur à calculer. Les indicateurs internes comme la silhouette jugent la forme des groupes, pas leur utilité : le métier reste le juge final."
  - id: juge-final
    prompt: "Qui juge en dernier ressort si une segmentation client est bonne ?"
    answer: "Le métier : les segments sont-ils interprétables et exploitables ?"
    decoys:
      - "Le score de silhouette, qui suffit à lui seul à valider les segments"
      - "Le jeu de test, comparé aux étiquettes réelles des clients"
    why: "Des groupes bien séparés peuvent rester inutiles. Il n'y a pas d'étiquettes réelles pour un jeu de test : c'est leur intérêt pour le métier qui compte."
  - id: mise-a-echelle
    prompt: "Un clustering mélange une colonne en euros (de 0 à 50 000) et une colonne en pourcentage. Quel risque ?"
    answer: "La colonne en euros domine les distances si on ne normalise pas"
    decoys:
      - "Aucun : les algorithmes de clustering ignorent les unités des colonnes"
      - "L'algorithme refuse de mélanger des colonnes d'unités différentes"
    why: "k-means s'appuie sur des distances : de grands écarts en euros écrasent ceux en pourcentage. Il faut mettre les colonnes à la même échelle avant le clustering."
  - id: quand-eviter
    prompt: "Dans quel cas préférer l'apprentissage supervisé au non supervisé ?"
    answer: "On dispose d'étiquettes pour la question posée"
    decoys:
      - "On veut explorer un jeu de données qu'on connaît mal, avant de décider quoi en faire"
      - "On cherche des comportements inhabituels jamais observés ni étiquetés auparavant"
    why: "Avec des étiquettes, un modèle supervisé répond directement à la question et se mesure. Explorer et détecter l'inédit sont justement les usages du non supervisé."
  - id: clustering-textes
    prompt: "Comment regrouper par sujet des milliers de textes libres ?"
    answer: "Calculer leurs embeddings, puis appliquer un clustering"
    decoys:
      - "Appliquer k-means directement aux caractères bruts des textes"
      - "Entraîner un classifieur sur des textes sans aucune étiquette"
    why: "Les embeddings transforment chaque texte en vecteur qui capture son sens : des textes proches donnent des vecteurs proches, que le clustering regroupe. Un classifieur, lui, exige des étiquettes."
---
