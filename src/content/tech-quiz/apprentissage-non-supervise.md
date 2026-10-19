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
  - id: dbscan
    prompt: "Quelle méthode de clustering trouve seule le nombre de groupes et isole les points écartés ?"
    answer: "DBSCAN"
    decoys:
      - "k-means, dont le nombre de groupes est fixé à l'avance"
      - "L'ACP, qui résume les colonnes en quelques axes"
    why: "DBSCAN déduit lui-même le nombre de groupes et laisse à part les points isolés. k-means exige ce nombre, et l'ACP ne forme aucun groupe."
  - id: silhouette
    prompt: "Que mesure le score de silhouette ?"
    answer: "Si les groupes sont compacts et bien séparés"
    decoys:
      - "Le pourcentage de points rangés dans leur vrai groupe, connu d'avance par les analystes"
      - "L'intérêt métier de chaque segment pour l'équipe marketing qui devra l'exploiter"
    why: "La silhouette est un indicateur interne : il juge la forme des groupes, sans bonne réponse à comparer. L'intérêt métier reste à juger par les équipes."
  - id: isolation-forest
    prompt: "À quoi sert Isolation Forest ?"
    answer: "À repérer des anomalies, sans exemples d'anomalies"
    decoys:
      - "À prédire une catégorie à partir d'exemples dont on connaît la bonne réponse"
      - "À résumer de nombreuses colonnes en quelques axes pour les afficher"
    why: "Isolation Forest est une méthode courante de détection d'anomalies. Prédire une catégorie relève du supervisé, résumer des colonnes de l'ACP."
  - id: reduction-avant-modele
    prompt: "Pourquoi réduire le nombre de colonnes avant d'entraîner un autre modèle ?"
    answer: "Pour alléger les données en gardant l'essentiel de l'information"
    decoys:
      - "Pour obtenir les étiquettes manquantes, que la réduction déduit des colonnes restantes"
      - "Pour que le modèle ne voie plus jamais les mêmes lignes qu'à l'entraînement"
    why: "La réduction de dimension, par exemple par ACP, résume beaucoup de colonnes en peu. Elle ne fabrique aucune étiquette."
  - id: nommer-les-groupes
    prompt: "Un clustering a fait ressortir des groupes de clients. Qui leur donne un sens, comme « petits acheteurs fréquents » ?"
    answer: "Le métier, en interprétant les groupes après coup"
    decoys:
      - "L'algorithme, qui déduit les noms des étiquettes présentes dans les données"
      - "Le score de silhouette, qui associe à chaque groupe une description"
    why: "Le clustering ne produit que des groupes numérotés. Les nommer et décider quoi en faire revient au marketing ou au métier."
  - id: segmentation-exploitable
    prompt: "Quels critères rendent une segmentation client exploitable ?"
    answer: "Des segments interprétables, stables d'une période à l'autre et actionnables"
    decoys:
      - "Le plus grand nombre possible de segments, pour coller au plus près de chaque client"
      - "Des segments de taille strictement égale, quel que soit le comportement des clients"
    why: "Le juge final est le métier : des segments qu'on comprend, qui durent et qu'on sait cibler. Multiplier les groupes ou les égaliser n'apporte rien en soi."
  - id: choix-humains
    prompt: "De quoi le résultat d'un clustering dépend-il, au-delà de l'algorithme ?"
    answer: "Des colonnes retenues, de leur mise à l'échelle et du nombre de groupes"
    decoys:
      - "Uniquement du nombre de lignes : l'algorithme est objectif et ses choix, neutres"
      - "Uniquement de la machine utilisée pour le calcul et de sa quantité de mémoire disponible"
    why: "Ces choix humains changent les groupes obtenus : il n'y a pas de résultat unique à retrouver. D'où l'importance de juger le résultat avec le métier."
  - id: resilier-ou-non
    prompt: "Le métier veut savoir quels clients vont résilier. Le non supervisé répond-il à cette question ?"
    answer: "Non : des groupes ne répondent pas à une question précise et vérifiable"
    decoys:
      - "Oui : un clustering fait directement ressortir le groupe des clients qui vont résilier"
      - "Oui : l'ACP calcule pour chaque client une probabilité de résiliation"
    why: "Prédire une réponse précise, qu'on pourra vérifier, relève du supervisé. Un clustering décrit des ressemblances, l'ACP résume des colonnes."
  - id: categories-connues
    prompt: "Les catégories de clients existent déjà et sont stables. Faut-il lancer un clustering pour les retrouver ?"
    answer: "Non : une règle ou un simple filtre suffit"
    decoys:
      - "Oui : le clustering confirme toujours les catégories existantes en les redécouvrant"
      - "Oui : sans clustering, il est impossible d'affecter un client à une catégorie"
    why: "Le non supervisé sert à découvrir ce qu'on ne connaît pas. Des catégories connues s'appliquent par une règle."
  - id: anomalies-non-etiquetees
    prompt: "Pourquoi la détection d'anomalies relève-t-elle du non supervisé ?"
    answer: "Les anomalies sont rares, variées ou jamais étiquetées"
    decoys:
      - "Parce qu'elle utilise uniquement des données synthétiques créées pour l'occasion"
      - "Parce qu'un modèle supervisé ne sait pas traiter les données issues de capteurs"
    why: "Sans exemples d'anomalies, on ne peut que repérer ce qui s'écarte du comportement habituel. Un modèle supervisé gère très bien des données de capteurs, s'il a des étiquettes."
  - id: explorer
    prompt: "Pourquoi appliquer du non supervisé à un jeu de données qu'on connaît mal ?"
    answer: "Pour l'explorer et décider ensuite quoi en faire"
    decoys:
      - "Pour mesurer directement son taux d'erreur sur un jeu de test"
      - "Pour remplacer l'étape d'étiquetage par une prédiction automatique des réponses"
    why: "Le non supervisé fait émerger groupes, axes et cas atypiques qui orientent la suite. Il ne mesure pas d'erreur, faute de bonne réponse."
  - id: variable-segment
    prompt: "Comment un clustering peut-il aider un modèle supervisé ?"
    answer: "En créant une variable « segment » ajoutée aux données"
    decoys:
      - "En fournissant les étiquettes manquantes, supposées exactes, du jeu d'entraînement"
      - "En remplaçant le jeu de test par les groupes obtenus"
    why: "Le segment obtenu devient une colonne de plus, que le modèle peut exploiter. Les groupes ne sont pas des étiquettes fiables et ne remplacent pas un jeu de test."
  - id: k-means-centre
    prompt: "Comment k-means décide-t-il à quel groupe appartient un point ?"
    answer: "Le groupe dont le centre est le plus proche"
    decoys:
      - "Le groupe qui compte le plus de points identiques à celui-ci"
      - "Le groupe désigné par l'étiquette la plus fréquente parmi ses voisins connus"
    why: "k-means s'appuie sur des distances aux centres des groupes. Voter selon des étiquettes de voisins demande des étiquettes, donc du supervisé."
  - id: dbscan-points-isoles
    prompt: "Que fait DBSCAN d'un point très éloigné de tous les autres ?"
    answer: "Il le laisse isolé, sans le forcer dans un groupe"
    decoys:
      - "Il le rattache de force au groupe le plus proche, quelle que soit la distance"
      - "Il le supprime du jeu de données avant de commencer le regroupement"
    why: "DBSCAN isole les points isolés au lieu de les ranger. k-means, lui, place chaque point dans un groupe."
  - id: bibliotheque
    prompt: "Quelle bibliothèque Python fournit k-means, DBSCAN, ACP et Isolation Forest avec la même interface que les modèles supervisés ?"
    answer: "scikit-learn"
    decoys:
      - "Ray, qui répartit du code Python sur un cluster"
      - "MLflow, qui suit les expériences et versionne les modèles"
    why: "scikit-learn regroupe ces méthodes classiques. Ray distribue du calcul et MLflow suit les expériences : aucun ne fournit d'algorithmes de clustering."
  - id: types-reels
    prompt: "Un clustering propose 4 groupes de clients. Prouve-t-il qu'il existe 4 types réels de clients ?"
    answer: "Non : c'est une structure proposée, qui dépend des choix faits"
    decoys:
      - "Oui : l'algorithme révèle le nombre exact de types réels présents dans les données"
      - "Oui, si le score de silhouette est positif, quel que soit le nombre de groupes"
    why: "Les groupes dépendent des colonnes, de leur échelle et du nombre demandé. Ils sont à valider avec le métier, pas à prendre pour une vérité."
  - id: logs-sans-incidents
    prompt: "Des millions de lignes de logs, sans liste des incidents passés. Quelle approche tenter ?"
    answer: "Chercher des comportements inhabituels par détection d'anomalies"
    decoys:
      - "Entraîner un classifieur d'incidents, en prenant tous les logs comme exemples d'incident"
      - "Faire une régression pour prédire le nombre d'incidents de chaque journée"
    why: "Sans étiquettes, on ne peut pas entraîner de classifieur. La détection d'anomalies signale ce qui s'écarte de l'ordinaire."
  - id: trois-usages
    prompt: "Quels sont les trois grands usages de l'apprentissage non supervisé ?"
    answer: "Le clustering, la réduction de dimension et la détection d'anomalies"
    decoys:
      - "La classification, la régression et la prévision de séries temporelles"
      - "Le clustering, la classification et la génération de texte"
    why: "Ces trois usages cherchent une structure sans réponse connue. Classification et régression sont supervisées."
  - id: groupes-inexploitables
    prompt: "Personne ne saura interpréter ni exploiter les groupes obtenus. Que conclure ?"
    answer: "Le résultat restera une curiosité : mieux vaut éviter ce travail"
    decoys:
      - "Aucun souci : un bon score de silhouette suffit à valider les groupes"
      - "Il faut relancer avec davantage de groupes, jusqu'à ce qu'ils deviennent lisibles"
    why: "Un clustering vaut par ce que le métier en fait. Le score de silhouette ne dit pas si les groupes sont utiles."
  - id: lignes-ou-colonnes
    prompt: "Quelle différence entre le clustering et la réduction de dimension ?"
    answer: "Le clustering regroupe des lignes, la réduction de dimension résume des colonnes"
    decoys:
      - "Le clustering résume des colonnes en axes, la réduction de dimension regroupe des lignes"
      - "Les deux regroupent des lignes, la seconde étant simplement plus rapide"
    why: "Clustering : segments de lignes (clients, documents). Réduction de dimension, comme l'ACP : moins de colonnes pour le même contenu."
---
