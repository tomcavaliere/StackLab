---
questions:
  - id: probleme
    prompt: "Quel problème Git résout-il d'abord ?"
    answer: "Garder l'historique de chaque modification et permettre de travailler à plusieurs sans s'écraser"
    decoys:
      - "Déployer automatiquement le code sur un serveur à chaque modification"
      - "Emballer l'application et toutes ses dépendances dans une image, pour qu'elle tourne à l'identique partout"
    why: "Git versionne le code et organise le travail en parallèle. Déployer à chaque modification, c'est la CI/CD ; emballer l'application, c'est Docker."
  - id: origine
    prompt: "Pour quel projet Git a-t-il été créé, en 2005 ?"
    answer: "Le noyau Linux, par Linus Torvalds"
    decoys:
      - "Le site GitHub, par ses fondateurs"
      - "Le langage Python, par son créateur"
    why: "Linus Torvalds a écrit Git en 2005 pour gérer le développement du noyau Linux. GitHub est un service venu après, qui héberge des dépôts Git."
  - id: depot
    prompt: "Où Git range-t-il l'historique d'un projet sur le poste ?"
    answer: "Dans le dossier caché .git, à la racine du dépôt"
    decoys:
      - "Uniquement sur le serveur GitHub, le poste n'a que les fichiers actuels"
      - "Dans le fichier .gitignore, qui liste les versions"
    why: "Le dépôt contient tout l'historique dans .git. Le .gitignore liste les fichiers à ignorer, pas les versions."
  - id: commit
    prompt: "Qu'est-ce qu'un commit ?"
    answer: "Une photo de l'état des fichiers, avec un message, un auteur et un identifiant unique"
    decoys:
      - "L'envoi des modifications vers le dépôt distant"
      - "Une copie complète du dépôt et de son historique, faite sur le poste pour pouvoir travailler hors ligne"
    why: "Un commit enregistre un état du projet, identifié par un hash. L'envoi vers le distant, c'est push ; la copie complète du dépôt, c'est un clone."
  - id: hash
    prompt: "Comment Git identifie-t-il un commit ?"
    answer: "Par un identifiant unique, un hash"
    decoys:
      - "Par un numéro qui s'incrémente à chaque commit sur le serveur"
      - "Par la date et l'heure à laquelle il a été créé"
    why: "Chaque commit a un identifiant unique, un hash. C'est aussi pour cela qu'un commit réécrit par un rebase change d'identifiant."
  - id: historique-chaine
    prompt: "Comment l'historique d'un dépôt est-il organisé ?"
    answer: "En chaîne : chaque commit pointe vers son parent"
    decoys:
      - "En dossiers datés : Git garde une copie complète du projet par jour"
      - "En une liste de différences rangées par fichier"
    why: "Chaque commit pointe vers son parent : l'historique est une chaîne de commits, dont les branches marquent des extrémités."
  - id: staging
    prompt: "À quoi sert la zone de préparation (staging area) ?"
    answer: "Choisir, avec git add, ce qui entrera dans le prochain commit"
    decoys:
      - "Tester le code sur un serveur de préproduction avant la mise en ligne"
      - "Garder une copie de secours des fichiers supprimés par erreur"
    why: "git add place une modification dans la zone de préparation ; le commit enregistre ce qui y est. On peut ainsi ne valider qu'une partie de ses modifications."
  - id: branche
    prompt: "Qu'est-ce qu'une branche dans Git ?"
    answer: "Un pointeur vers un commit, qui avance à chaque nouveau commit"
    decoys:
      - "Une copie complète des fichiers du projet dans un autre dossier"
      - "Un dépôt séparé, hébergé sur un autre serveur"
    why: "Une branche n'est qu'un pointeur : la créer ne copie aucun fichier, c'est instantané."
  - id: branche-cout
    prompt: "Pourquoi créer une branche est-il instantané, même sur un gros projet ?"
    answer: "Rien n'est copié : Git crée seulement un nouveau pointeur vers un commit"
    decoys:
      - "Git copie les fichiers en arrière-plan, sans bloquer le terminal"
      - "Seuls les fichiers modifiés depuis le dernier commit sont dupliqués"
    why: "Une branche est un simple pointeur vers un commit. Il n'y a aucune copie de fichiers, d'où la rapidité."
  - id: distribue
    prompt: "Que veut dire « Git est distribué » ?"
    answer: "Chaque clone contient tout l'historique : on peut travailler hors ligne"
    decoys:
      - "Le dépôt est réparti sur plusieurs serveurs pour résister aux pannes"
      - "Chaque développeur ne reçoit que les fichiers dont il a besoin"
    why: "Chaque copie du dépôt a l'historique complet. On commite hors ligne, puis on échange ses commits avec un dépôt distant."
  - id: remote
    prompt: "Qu'est-ce que origin, dans un dépôt cloné ?"
    answer: "Le nom habituel du dépôt distant d'où l'on a cloné"
    decoys:
      - "Le tout premier commit du projet"
      - "La branche principale du projet, sur laquelle on fusionne les autres"
    why: "Un dépôt distant (remote) s'appelle souvent origin. La branche principale s'appelle souvent main."
  - id: clone
    prompt: "Que fait git clone <url> ?"
    answer: "Copie un dépôt distant sur le poste, avec tout son historique"
    decoys:
      - "Duplique la branche courante sous un autre nom"
      - "Télécharge uniquement la dernière version des fichiers, sans historique"
    why: "git clone récupère le dépôt entier, historique compris : c'est ce qui permet de travailler hors ligne."
  - id: status
    prompt: "Quelle commande montre ce qui a changé et ce qui est déjà préparé pour le commit ?"
    answer: "git status"
    decoys:
      - "git log"
      - "git fetch"
    why: "git status décrit l'état courant. git log affiche l'historique des commits, git fetch récupère les commits du distant."
  - id: log
    prompt: "Quelle commande affiche l'historique des commits, un par ligne ?"
    answer: "git log --oneline"
    decoys:
      - "git status --short"
      - "git show --all"
    why: "git log liste l'historique ; --oneline le résume à une ligne par commit."
  - id: switch
    prompt: "Que fait git switch -c ma-fonction ?"
    answer: "Crée la branche ma-fonction et s'y place"
    decoys:
      - "Fusionne la branche ma-fonction dans la branche courante"
      - "Supprime la branche ma-fonction une fois fusionnée"
    why: "switch change de branche ; -c la crée d'abord. La fusion se fait avec git merge."
  - id: push
    prompt: "Que fait git push ?"
    answer: "Envoie ses commits locaux vers le dépôt distant"
    decoys:
      - "Enregistre les modifications préparées dans un nouveau commit"
      - "Récupère les commits du distant et les intègre à la branche courante"
    why: "push envoie, pull récupère. Enregistrer un commit, c'est git commit."
  - id: fetch-pull
    prompt: "Quelle différence entre git fetch et git pull ?"
    answer: "fetch récupère les commits du distant sans toucher à la branche ; pull les récupère puis les intègre"
    decoys:
      - "fetch envoie les commits vers le distant ; pull les récupère depuis le distant"
      - "fetch ne récupère que la branche courante ; pull récupère toutes les branches du distant et les fusionne d'un coup"
    why: "git pull fait un fetch, puis intègre les commits récupérés à la branche courante. fetch seul ne modifie pas la branche."
  - id: gitignore
    prompt: "À quoi sert le fichier .gitignore ?"
    answer: "Lister ce que Git doit ignorer : dépendances installées, fichiers générés, configuration locale"
    decoys:
      - "Lister les commits à masquer dans l'historique affiché par git log"
      - "Lister les personnes et les branches qui n'ont pas le droit de pousser sur le dépôt distant partagé"
    why: "Les fichiers listés dans .gitignore ne sont jamais proposés au commit. C'est là qu'on met aussi le fichier qui contient les secrets."
  - id: merge
    prompt: "Que fait un merge ?"
    answer: "Réunit deux branches par un commit de fusion, en gardant la trace des deux"
    decoys:
      - "Rejoue les commits d'une branche au-dessus d'une autre, en les réécrivant"
      - "Supprime la branche fusionnée et tout son historique"
    why: "Le merge crée un commit de fusion : l'historique garde les branches telles qu'elles ont existé. Rejouer les commits, c'est le rebase."
  - id: rebase
    prompt: "Que fait un rebase ?"
    answer: "Rejoue les commits d'une branche au-dessus d'une autre : l'historique devient linéaire"
    decoys:
      - "Crée un commit de fusion qui réunit les deux branches"
      - "Ramène la branche à un commit antérieur en effaçant tous les commits suivants de l'historique"
    why: "Le rebase rejoue les commits, qui sont réécrits et changent d'identifiant. Le commit de fusion, c'est le merge."
  - id: rebase-partage
    prompt: "Pourquoi éviter de faire un rebase sur des commits déjà poussés et partagés ?"
    answer: "Les commits sont réécrits : la copie des autres ne correspond plus"
    decoys:
      - "Git refuse toujours un rebase dès qu'un commit a été poussé"
      - "Le rebase supprime les commits des autres développeurs du serveur"
    why: "Un rebase change l'identifiant des commits. Ceux qui avaient récupéré les anciens se retrouvent avec un historique qui diverge. Même règle pour push --force."
  - id: conflit
    prompt: "Quand survient un conflit de fusion ?"
    answer: "Quand les deux branches ont modifié les mêmes lignes : il faut choisir à la main"
    decoys:
      - "Dès que les deux branches ont modifié le même fichier, quelles que soient les lignes"
      - "Quand deux personnes poussent sur le dépôt distant à la même seconde"
    why: "Git fusionne seul les modifications de lignes différentes. Quand les mêmes lignes ont changé des deux côtés, il ne peut pas choisir : on résout le conflit à la main."
  - id: github
    prompt: "Quel est le lien entre Git et GitHub ?"
    answer: "Git est l'outil installé sur le poste ; GitHub héberge des dépôts et ajoute la collaboration"
    decoys:
      - "Ce sont deux noms pour le même logiciel"
      - "GitHub est la version payante de Git, qui ajoute les branches et le travail hors ligne au logiciel de base"
    why: "Git fonctionne sans aucun service. GitHub, GitLab ou Bitbucket hébergent des dépôts et ajoutent pull requests, tickets et CI/CD."
  - id: pull-request
    prompt: "À quoi sert une pull request (ou merge request) ?"
    answer: "Faire relire une branche avant de la fusionner dans la branche principale"
    decoys:
      - "Récupérer les derniers commits du dépôt distant sur son poste"
      - "Demander l'accès en écriture à un dépôt hébergé"
    why: "La pull request est une fonction des services d'hébergement : on y discute et relit une branche avant de la fusionner. Récupérer les commits, c'est git pull."
  - id: secrets
    prompt: "Un mot de passe a été commité, puis supprimé dans le commit suivant. Est-il en sécurité ?"
    answer: "Non : il reste dans l'historique, il faut le considérer comme exposé"
    decoys:
      - "Oui : le commit suivant l'a effacé de toutes les copies du dépôt"
      - "Oui, à condition que le commit qui le supprime ait été poussé"
    why: "Chaque commit reste dans l'historique : le secret est lisible dans l'ancien commit. On ne commite jamais de secret ; on les met dans des variables d'environnement ou un gestionnaire de secrets."
  - id: binaires
    prompt: "Pourquoi éviter de versionner de gros fichiers binaires (vidéos, jeux de données) dans Git ?"
    answer: "Chaque version alourdit le dépôt pour toujours, chez tous ceux qui le clonent"
    decoys:
      - "Git refuse tout fichier qui n'est pas du texte"
      - "Git compresse mal le texte du dépôt dès que des fichiers binaires y sont présents, même petits"
    why: "Le clone contient tout l'historique, donc chaque version de chaque gros fichier. Git LFS les stocke à part ; pour les données, un stockage objet convient mieux."
  - id: lfs
    prompt: "Que propose Git LFS ?"
    answer: "Stocker les gros fichiers à part, pour qu'ils n'alourdissent pas le dépôt"
    decoys:
      - "Compresser tout l'historique pour accélérer les clones"
      - "Héberger des dépôts Git sur son propre serveur, sans passer par GitHub ni GitLab"
    why: "Git LFS sort les gros fichiers du dépôt pour qu'ils n'alourdissent pas chaque clone."
  - id: notebooks
    prompt: "Pourquoi un notebook Jupyter avec ses sorties se versionne-t-il mal dans Git ?"
    answer: "C'est du JSON dont les sorties changent à chaque exécution : les différences deviennent illisibles"
    decoys:
      - "Git ne sait pas lire les fichiers .ipynb : il les ignore par défaut, sans le dire, même sans .gitignore"
      - "Le noyau du notebook verrouille le fichier tant qu'il tourne"
    why: "Le .ipynb est du JSON qui contient aussi les sorties et des métadonnées. Le réflexe : vider les sorties avant de committer."
  - id: quand
    prompt: "À partir de quand versionner un projet avec Git ?"
    answer: "Dès le premier fichier, même en travaillant seul"
    decoys:
      - "Quand une deuxième personne rejoint le projet et doit partager le code"
      - "Au moment de la première mise en production"
    why: "L'historique et le retour en arrière servent toujours, seul ou à plusieurs."
  - id: quoi-versionner
    prompt: "Lequel de ces contenus a sa place dans un dépôt Git ?"
    answer: "Le code d'infrastructure (Terraform) et les modèles dbt"
    decoys:
      - "Le fichier .env qui contient les clés d'API de production"
      - "Les exports mensuels de la base de données, en fichiers de plusieurs gigaoctets"
    why: "Tout ce qui est texte et évolue se versionne : code, configuration, infrastructure, SQL. Les secrets et les gros fichiers de données, non."
---
