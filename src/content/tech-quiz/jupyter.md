---
questions:
  - id: probleme
    prompt: "Quel problème le notebook Jupyter résout-il ?"
    answer: "Explorer pas à pas : on exécute le code cellule par cellule et chaque résultat reste affiché"
    decoys:
      - "Planifier chaque nuit des traitements de données, avec reprise automatique des tâches qui échouent"
      - "Héberger une API qui sert les prédictions d'un modèle à d'autres applications"
    why: "Un script se relance en entier et ses résultats disparaissent dans le terminal. Le notebook garde sous chaque cellule sa sortie. Planifier, c'est le rôle d'un orchestrateur."
  - id: origine
    prompt: "De quel projet Jupyter est-il issu ?"
    answer: "D'IPython, en 2014"
    decoys:
      - "De RStudio, en 2011"
      - "De pandas, en 2008"
    why: "Le projet Jupyter est né d'IPython en 2014. pandas date de 2008 mais c'est une bibliothèque de DataFrames."
  - id: nom
    prompt: "Qu'évoque le nom « Jupyter » ?"
    answer: "Trois langages : Julia, Python et R"
    decoys:
      - "La planète, en référence au calcul scientifique et à l'astronomie"
      - "Le nom de son créateur, suivi du suffixe py de Python"
    why: "Le nom évoque Julia, Python et R, les premiers langages visés par le projet."
  - id: cellule-code
    prompt: "Que se passe-t-il quand on exécute une cellule de code ?"
    answer: "Le code s'exécute et sa sortie s'affiche juste en dessous"
    decoys:
      - "Tout le notebook est relancé de haut en bas, puis la sortie finale s'affiche en bas du document"
      - "Le code est enregistré dans un fichier .py séparé, qu'il faut ensuite lancer depuis un terminal"
    why: "Chaque cellule s'exécute seule et garde sa sortie (tableau, graphique, erreur) sous elle."
  - id: cellule-markdown
    prompt: "À quoi servent les cellules Markdown d'un notebook ?"
    answer: "Écrire le texte qui explique l'analyse : titres, paragraphes, formules"
    decoys:
      - "Exécuter du code dans un autre langage que celui du noyau principal du notebook"
      - "Stocker les données brutes utilisées par les cellules de code suivantes"
    why: "Les cellules Markdown portent le texte explicatif. C'est ce qui permet de partager une analyse avec son raisonnement."
  - id: sorties
    prompt: "Quels types de sortie une cellule peut-elle afficher ?"
    answer: "Un tableau, un graphique ou un message d'erreur, sous la cellule"
    decoys:
      - "Uniquement du texte brut, comme dans un terminal"
      - "Uniquement des graphiques, les tableaux devant être exportés en CSV"
    why: "La sortie s'affiche sous la cellule, qu'il s'agisse d'un tableau, d'un graphique ou d'une erreur."
  - id: noyau
    prompt: "Qu'est-ce que le noyau (kernel) d'un notebook ?"
    answer: "Le processus qui exécute le code et garde les variables en mémoire"
    decoys:
      - "Le fichier .ipynb qui contient le code, le texte et les sorties du notebook"
      - "Le serveur web qui affiche le notebook dans le navigateur"
    why: "Le noyau exécute le code des cellules et conserve les variables d'une cellule à l'autre. Le .ipynb est le fichier, JupyterLab l'interface."
  - id: memoire
    prompt: "On a chargé un gros fichier dans une cellule. Faut-il le recharger dans les cellules suivantes ?"
    answer: "Non : le noyau garde la variable en mémoire entre deux cellules"
    decoys:
      - "Oui : chaque cellule s'exécute dans un processus neuf, sans les variables des autres"
      - "Oui, sauf si la cellule qui charge le fichier est placée juste au-dessus"
    why: "Le noyau garde les variables entre les cellules : une donnée chargée une fois reste disponible pour les suivantes."
  - id: autres-langages
    prompt: "Un notebook Jupyter ne peut-il exécuter que du Python ?"
    answer: "Non : il existe des noyaux pour d'autres langages, dont R et Julia"
    decoys:
      - "Oui : Jupyter est un outil réservé à Python, les autres langages ont leurs propres notebooks"
      - "Non, mais chaque cellule doit alors être traduite en Python avant d'être exécutée"
    why: "Le noyau le plus courant est celui de Python, mais un noyau existe pour de nombreux langages, dont R et Julia."
  - id: format
    prompt: "Dans quel format un notebook est-il enregistré ?"
    answer: "En JSON, dans un fichier .ipynb, avec le code, le texte et les sorties"
    decoys:
      - "En script Python .py, les sorties étant recalculées à chaque ouverture du fichier"
      - "En Markdown .md, où les blocs de code sont exécutés à l'affichage"
    why: "Le fichier .ipynb est du JSON qui contient aussi les sorties. C'est ce qui le rend difficile à versionner."
  - id: jupyterlab
    prompt: "Qu'est-ce que JupyterLab ?"
    answer: "L'interface de Jupyter dans le navigateur"
    decoys:
      - "Le service qui sert des notebooks à toute une équipe depuis un serveur partagé"
      - "Le format de fichier des notebooks"
    why: "JupyterLab est l'interface dans le navigateur. Servir des notebooks à une équipe, c'est JupyterHub."
  - id: jupyterhub
    prompt: "À quoi sert JupyterHub ?"
    answer: "Servir des notebooks à toute une équipe depuis un serveur partagé"
    decoys:
      - "Publier ses notebooks sur un site public, comme GitHub le fait pour le code"
      - "Exécuter un notebook chaque nuit, de façon planifiée"
    why: "JupyterHub donne à chaque membre d'une équipe son environnement de notebooks, sur un serveur commun."
  - id: ou-ouvrir
    prompt: "Où peut-on ouvrir un notebook Jupyter ?"
    answer: "Dans JupyterLab, dans un éditeur comme VS Code ou dans un service hébergé comme Google Colab"
    decoys:
      - "Seulement dans JupyterLab, installé sur son propre poste : le format est propre à cette interface"
      - "Seulement dans un service hébergé, car un notebook a besoin d'un serveur distant pour s'exécuter"
    why: "Le format .ipynb est lu par plusieurs outils : JupyterLab, VS Code, Google Colab."
  - id: etat-cache
    prompt: "Qu'est-ce que le piège de l'« état caché » d'un notebook ?"
    answer: "Le noyau garde tout ce qui a été exécuté, même une cellule modifiée ou supprimée depuis"
    decoys:
      - "Les cellules Markdown masquent du code qui s'exécute sans être affiché dans le notebook"
      - "Les sorties des cellules sont chiffrées dans le fichier et ne se lisent qu'avec le bon noyau"
    why: "Les cellules s'exécutent dans n'importe quel ordre et le noyau garde tout : le notebook peut afficher des résultats impossibles à reproduire."
  - id: ordre
    prompt: "Dans quel ordre les cellules d'un notebook peuvent-elles s'exécuter ?"
    answer: "Dans n'importe quel ordre, au choix de l'utilisateur"
    decoys:
      - "Toujours de haut en bas : Jupyter bloque une cellule tant que celles du dessus n'ont pas tourné"
      - "Dans l'ordre où elles ont été créées, quelle que soit leur position dans le document"
    why: "Rien n'impose l'ordre : c'est la source de l'état caché. D'où le réflexe de tout relancer dans l'ordre avant de partager."
  - id: reflexe
    prompt: "Quel réflexe adopter avant de partager un notebook ?"
    answer: "Redémarrer le noyau et tout exécuter dans l'ordre"
    decoys:
      - "Supprimer toutes les cellules Markdown pour alléger le fichier"
      - "Exécuter à nouveau uniquement la dernière cellule, qui contient le résultat"
    why: "Redémarrer le noyau efface l'état caché ; tout exécuter de haut en bas vérifie que le notebook se reproduit."
  - id: irreproductible
    prompt: "Un collègue relance votre notebook de haut en bas et obtient une erreur que vous n'aviez pas. Cause la plus probable ?"
    answer: "Une cellule dépendait d'une variable définie par une cellule depuis modifiée ou supprimée"
    decoys:
      - "Son navigateur n'est pas le même que le vôtre"
      - "Les cellules Markdown ont été lues comme du code"
    why: "C'est l'état caché : votre noyau gardait une variable qu'aucune cellule actuelle ne crée plus."
  - id: usage-exploration
    prompt: "Pour quel travail le notebook est-il le plus adapté ?"
    answer: "Explorer et nettoyer des données, faire une analyse ponctuelle, prototyper un modèle"
    decoys:
      - "Écrire une bibliothèque réutilisée par plusieurs équipes, avec ses tests et ses versions"
      - "Faire tourner un pipeline de données planifié chaque nuit en production"
    why: "Le notebook brille dans l'exploration et le prototypage. Le code de production va dans des modules testés, appelés par un orchestrateur."
  - id: usage-partage
    prompt: "Pourquoi un notebook est-il pratique pour partager une analyse ?"
    answer: "Le code, les graphiques et le texte qui les explique sont dans un même document"
    decoys:
      - "Il se convertit seul en application web que le lecteur peut utiliser sans rien installer"
      - "Il cache le code au lecteur pour ne montrer que les conclusions finales"
    why: "Cellules de code, sorties et cellules Markdown se suivent : le lecteur voit le raisonnement avec les résultats."
  - id: usage-apprendre
    prompt: "Pourquoi le notebook est-il apprécié pour apprendre un langage ou une bibliothèque ?"
    answer: "On voit le résultat de chaque étape, juste sous le code"
    decoys:
      - "Il corrige automatiquement les erreurs de syntaxe avant l'exécution"
      - "Il propose des exercices notés pour chaque bibliothèque installée"
    why: "Chaque cellule affiche sa sortie : on comprend l'effet de chaque instruction."
  - id: production
    prompt: "Pourquoi éviter de faire tourner du code de production dans un notebook ?"
    answer: "L'état caché, l'absence de structure et la difficulté à tester en font une mauvaise base"
    decoys:
      - "Un notebook ne peut pas lire de fichiers de plus de quelques mégaoctets"
      - "Le notebook s'exécute trop lentement, car chaque cellule est interprétée deux fois"
    why: "Une fois l'analyse stabilisée, on déplace le code dans des modules Python testés, appelés par un orchestrateur."
  - id: apres-analyse
    prompt: "L'analyse dans le notebook est stabilisée et doit tourner chaque jour. Que faire ?"
    answer: "Déplacer le code dans des modules testés, lancés par un orchestrateur"
    decoys:
      - "Laisser le notebook ouvert en permanence et relancer les cellules chaque matin"
      - "Copier le notebook sur JupyterHub pour qu'il s'exécute seul chaque jour"
    why: "Le notebook dépend d'un noyau ouvert dans une session. Un job planifié sur un orchestrateur est plus fiable. JupyterHub sert des notebooks, il ne les planifie pas."
  - id: travail-equipe
    prompt: "Pourquoi travailler à plusieurs sur le même notebook est-il pénible ?"
    answer: "Le JSON et ses sorties donnent des différences illisibles et des conflits durs à résoudre"
    decoys:
      - "Un notebook ne peut être ouvert que par une seule personne à la fois, sur un seul poste"
      - "Chaque personne doit utiliser exactement le même navigateur pour que le fichier reste lisible"
    why: "Dans Git, chaque exécution change les sorties et les métadonnées du JSON : les différences n'ont plus de sens."
  - id: git
    prompt: "Que faire avant de committer un notebook dans Git ?"
    answer: "Vider les sorties"
    decoys:
      - "Le convertir en PDF"
      - "Supprimer les cellules Markdown"
    why: "Les sorties changent à chaque exécution et rendent les différences illisibles. Sans elles, ne restent que le code et le texte."
  - id: traitements-longs
    prompt: "Pourquoi un traitement de plusieurs heures est-il risqué dans un notebook ?"
    answer: "Il dépend d'un noyau ouvert dans une session : si elle s'arrête, le travail est perdu"
    decoys:
      - "Jupyter arrête automatiquement toute cellule qui dépasse une minute d'exécution"
      - "Les sorties trop longues corrompent le fichier .ipynb à l'enregistrement"
    why: "Le noyau vit avec la session. Un job planifié sur un orchestrateur, avec reprise, est plus fiable."
  - id: pandas
    prompt: "Avec quelle bibliothèque Jupyter forme-t-il le duo classique de l'exploration de données ?"
    answer: "pandas"
    decoys:
      - "Airflow"
      - "Kafka"
    why: "On charge un DataFrame pandas, puis on le regarde et on le transforme cellule par cellule. Airflow orchestre, Kafka transporte des événements."
  - id: duckdb
    prompt: "Comment interroger un gros fichier en SQL depuis un notebook, sans serveur de base de données ?"
    answer: "Avec DuckDB, dont le résultat s'affiche dans la cellule"
    decoys:
      - "En installant PostgreSQL sur le poste et en y important d'abord le fichier"
      - "Ce n'est pas possible : un notebook n'exécute que du Python, jamais de SQL"
    why: "DuckDB lance des requêtes SQL sur des fichiers directement depuis Python, et le résultat s'affiche sous la cellule."
  - id: noyau-courant
    prompt: "Quel est le noyau Jupyter le plus courant ?"
    answer: "Celui de Python"
    decoys:
      - "Celui de R, dont Jupyter est issu"
      - "Celui de SQL, pour interroger les bases"
    why: "Le noyau Python est le plus répandu. Jupyter est issu d'IPython, pas de R, même si R a aussi son noyau."
  - id: vs-script
    prompt: "Quelle différence principale entre un notebook et un script Python ?"
    answer: "Le notebook s'exécute par morceaux et garde les résultats ; le script se relance en entier"
    decoys:
      - "Le script est plus lent, car le notebook compile le code avant de l'exécuter"
      - "Le notebook n'accepte pas les bibliothèques Python installées avec pip"
    why: "C'est tout l'intérêt du notebook pour explorer : on ne relance que la cellule modifiée, et les sorties restent visibles."
  - id: colab
    prompt: "Qu'est-ce que Google Colab, vis-à-vis de Jupyter ?"
    answer: "Un service hébergé qui ouvre et exécute des notebooks"
    decoys:
      - "Un langage concurrent de Python, conçu pour les notebooks"
      - "Le nom de la nouvelle version de JupyterLab, renommée par Google"
    why: "Google Colab est un service hébergé de notebooks, comme on peut aussi les ouvrir dans JupyterLab ou VS Code."
---
