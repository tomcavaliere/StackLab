---
questions:
  - id: probleme
    prompt: "Quel problème Docker résout-il d'abord ?"
    answer: "« Ça marche sur ma machine » : il emballe l'application et ses dépendances dans une image"
    decoys:
      - "La répartition de conteneurs sur un cluster de plusieurs machines, avec redémarrage automatique"
      - "La surveillance des erreurs applicatives en production"
    why: "L'image contient la version du langage, les bibliothèques et la configuration : elle s'exécute à l'identique partout. Répartir sur un cluster, c'est Kubernetes."
  - id: conteneur-vs-vm
    prompt: "Quelle différence entre un conteneur et une machine virtuelle ?"
    answer: "Le conteneur partage le noyau de l'hôte : il est bien plus léger"
    decoys:
      - "Le conteneur embarque son propre noyau, comme une machine virtuelle"
      - "Aucune : ce sont deux noms pour la même technique"
    why: "Un conteneur est un processus isolé qui partage le noyau de l'hôte. Une machine virtuelle émule une machine entière, avec son propre système."
  - id: dockerfile
    prompt: "Où décrit-on la construction d'une image ?"
    answer: "Dans un Dockerfile"
    decoys:
      - "Dans un fichier .github/workflows"
      - "Dans un manifeste YAML de Kubernetes"
    why: "Le Dockerfile décrit les étapes de construction de l'image. Un workflow GitHub Actions peut la construire, un manifeste Kubernetes la déployer."
  - id: compose
    prompt: "À quoi sert Docker Compose ?"
    answer: "Lancer ensemble plusieurs conteneurs, par exemple l'application, sa base et son cache"
    decoys:
      - "Répartir des conteneurs sur plusieurs machines en production, avec mise à l'échelle"
      - "Compresser les images pour les rendre plus légères"
    why: "Compose décrit un ensemble de conteneurs à démarrer ensemble, très pratique en local. La production multi-machines relève d'un orchestrateur."
  - id: oci
    prompt: "Pourquoi une image construite avec Docker tourne-t-elle aussi sur Kubernetes ?"
    answer: "Le format d'image est standardisé par l'OCI"
    decoys:
      - "Kubernetes embarque une copie complète de Docker Desktop"
      - "Kubernetes reconstruit l'image à partir du code source"
    why: "Le standard OCI rend les images portables vers Kubernetes et les services de conteneurs managés."
  - id: registre
    prompt: "Où publie-t-on les images ?"
    answer: "Dans un registre (Docker Hub, registres des clouds)"
    decoys:
      - "Dans une branche Git dédiée, à côté du code source"
      - "Dans le Dockerfile lui-même"
    why: "Les images sont versionnées et publiées dans un registre, d'où les plateformes les téléchargent."
  - id: mauvaise-pratique
    prompt: "Quelle mauvaise pratique la fiche signale-t-elle ?"
    answer: "Des images trop lourdes, exécutées en root, jamais mises à jour"
    decoys:
      - "Écrire un Dockerfile par service"
      - "Publier les images dans un registre privé plutôt que sur Docker Hub"
    why: "Une image lourde, en root et jamais mise à jour multiplie les failles. Un Dockerfile par service et un registre privé sont des pratiques normales."
  - id: isolation
    prompt: "Un conteneur isole-t-il aussi fortement qu'une machine virtuelle ?"
    answer: "Non : ce n'est pas une frontière de sécurité aussi forte"
    decoys:
      - "Oui : c'est la même isolation matérielle"
      - "Oui, dès qu'il est lancé avec Docker Compose, qui ajoute une machine virtuelle"
    why: "Partager le noyau de l'hôte rend le conteneur léger, mais aussi moins isolé qu'une machine virtuelle."
  - id: vercel
    prompt: "Une application Next.js hébergée sur Vercel a-t-elle besoin d'un Dockerfile ?"
    answer: "Non : la plateforme construit et exécute le code sans image"
    decoys:
      - "Oui : Vercel n'accepte que des images Docker"
      - "Oui, sinon les préversions par branche ne fonctionnent pas"
    why: "Certaines plateformes (Vercel, certains PaaS) construisent le code elles-mêmes : un Dockerfile n'y apporte rien."
  - id: licence
    prompt: "Quelle condition de licence la fiche rappelle-t-elle ?"
    answer: "Docker Desktop est payant pour les grandes entreprises"
    decoys:
      - "Le moteur Docker est payant pour toute utilisation en production"
      - "Chaque téléchargement d'image publique est facturé"
    why: "C'est Docker Desktop, l'application pour poste de travail, qui est payante pour les grandes entreprises : il faut vérifier les conditions."
  - id: couches
    prompt: "Comment une image Docker est-elle structurée ?"
    answer: "En couches empilées, chacune issue d'une instruction du Dockerfile et réutilisable en cache"
    decoys:
      - "En un seul fichier binaire compilé, régénéré entièrement à chaque construction de l'image"
      - "En une archive de machine virtuelle complète, noyau compris, démarrée par un hyperviseur"
    why: "Chaque instruction produit une couche ; les couches inchangées sont réutilisées. Une image ne contient pas de noyau : elle utilise celui de l'hôte."
  - id: ordre-du-cache
    prompt: "Dans un Dockerfile, pourquoi copier et installer les dépendances (package.json…) avant de copier le reste du code ?"
    answer: "Pour réutiliser la couche des dépendances en cache tant que ce fichier ne change pas"
    decoys:
      - "Parce que Docker refuse de copier plus d'un fichier par instruction COPY dans un Dockerfile"
      - "Pour que les dépendances soient installées sur l'hôte plutôt que dans l'image finale"
    why: "Une modification du code invalide seulement les couches suivantes : l'installation des dépendances, lente, reste en cache. COPY accepte plusieurs fichiers, et tout s'installe dans l'image."
  - id: multi-etapes
    prompt: "À quoi sert une construction multi-étapes (multi-stage build) ?"
    answer: "Compiler avec les outils dans une étape, puis copier le seul résultat dans une image finale légère"
    decoys:
      - "Publier la même image vers plusieurs registres de clouds différents, un registre par étape du build"
      - "Démarrer plusieurs conteneurs dans un ordre précis, par exemple la base avant l'application"
    why: "Les compilateurs et outils de build restent dans l'étape intermédiaire et n'alourdissent pas l'image finale. L'ordre de démarrage relève de Compose."
  - id: donnees-ephemeres
    prompt: "Que deviennent les fichiers écrits dans un conteneur quand on le supprime ?"
    answer: "Ils disparaissent avec lui, sauf s'ils ont été écrits dans un volume ou un montage"
    decoys:
      - "Ils sont automatiquement réintégrés dans l'image, prêts pour le prochain conteneur lancé"
      - "Ils sont envoyés au registre avec l'image, lors de la prochaine publication de celle-ci"
    why: "La couche inscriptible d'un conteneur meurt avec lui ; l'image reste inchangée. Les données à garder (une base, par exemple) vont dans un volume."
  - id: image-et-conteneur
    prompt: "Quelle relation y a-t-il entre une image et un conteneur ?"
    answer: "Le conteneur est une instance en cours d'exécution d'une image, qui reste en lecture seule"
    decoys:
      - "L'image est un conteneur arrêté, qu'on modifie directement chaque fois qu'on le relance"
      - "Ce sont deux noms pour le même objet, selon qu'on passe par la CLI Docker ou par Compose"
    why: "On lance autant de conteneurs qu'on veut à partir d'une même image ; chacun ajoute sa propre couche inscriptible par-dessus."
  - id: instruction-cmd
    prompt: "Quelle instruction du Dockerfile indique la commande lancée par défaut au démarrage du conteneur ?"
    answer: "CMD"
    decoys:
      - "RUN"
      - "FROM"
      - "COPY"
    why: "CMD s'exécute au démarrage du conteneur. RUN s'exécute pendant la construction de l'image, FROM choisit l'image de base, COPY ajoute des fichiers."
  - id: instruction-from
    prompt: "Par quelle instruction commence en général un Dockerfile ?"
    answer: "FROM, qui désigne l'image de base"
    decoys:
      - "RUN, qui installe le système d'exploitation"
      - "EXPOSE, qui ouvre le port de l'application"
    why: "On part toujours d'une image existante (une distribution, un runtime de langage) avec FROM. EXPOSE ne fait que documenter un port."
  - id: dockerignore
    prompt: "À quoi sert le fichier .dockerignore ?"
    answer: "Exclure des fichiers du contexte de construction : node_modules, .git, secrets…"
    decoys:
      - "Lister les images que Docker ne doit jamais télécharger depuis Docker Hub ni depuis un autre registre"
      - "Indiquer les conteneurs à ne pas redémarrer automatiquement après un redémarrage de l'hôte"
    why: "Le contexte envoyé à la construction est allégé, et l'on évite de copier par mégarde des fichiers lourds ou sensibles dans l'image."
  - id: tag-latest
    prompt: "Pourquoi éviter de déployer en production une image référencée par le tag latest ?"
    answer: "Ce tag est mobile : on ne sait plus quelle version tourne, ni vers laquelle revenir"
    decoys:
      - "Le tag latest désigne toujours une version bêta instable publiée par Docker Inc. elle-même"
      - "Les images taguées latest sont supprimées automatiquement du registre au bout de quelques jours"
    why: "latest est un simple tag par défaut, déplacé à chaque publication. Un tag de version (ou un digest) rend le déploiement reproductible."
  - id: publication-de-port
    prompt: "Que fait l'option -p 8080:80 de docker run ?"
    answer: "Elle publie le port 80 du conteneur sur le port 8080 de l'hôte"
    decoys:
      - "Elle publie le port 8080 du conteneur sur le port 80 de l'hôte"
      - "Elle limite le conteneur à 80 % d'un processeur et à 8080 Mo de mémoire"
    why: "La syntaxe est hôte:conteneur : une requête sur le port 8080 de la machine arrive sur le port 80 du conteneur."
  - id: secrets-dans-l-image
    prompt: "Pourquoi ne pas copier un fichier de secrets (clés, mots de passe) dans une image ?"
    answer: "Quiconque récupère l'image peut l'extraire, même s'il est supprimé dans une couche suivante"
    decoys:
      - "Docker chiffre automatiquement les fichiers copiés : l'application ne pourrait plus les lire au démarrage"
      - "Une image contenant des secrets est refusée par tous les registres au moment de la publication"
    why: "Supprimer un fichier dans une couche ultérieure le masque sans l'effacer des couches précédentes. Docker ne chiffre rien et les registres ne détectent pas forcément les secrets."
  - id: mecanismes-du-noyau
    prompt: "Sur quels mécanismes du noyau Linux reposent les conteneurs ?"
    answer: "Les namespaces (isolation) et les cgroups (limites de ressources)"
    decoys:
      - "La virtualisation matérielle (VT-x) et un hyperviseur dédié par conteneur"
      - "Le chiffrement du disque et les règles du pare-feu de l'hôte"
    why: "Les namespaces isolent ce que voit le processus (fichiers, réseau, processus), les cgroups limitent ce qu'il consomme. Pas d'hyperviseur : c'est la différence avec une machine virtuelle."
  - id: docker-desktop-vm
    prompt: "Comment Docker Desktop exécute-t-il des conteneurs Linux sur macOS ou Windows ?"
    answer: "Dans une machine virtuelle Linux légère, puisqu'il leur faut un noyau Linux"
    decoys:
      - "En traduisant les appels du noyau Linux vers ceux de macOS ou de Windows, sans machine virtuelle"
      - "Il ne le peut pas : les conteneurs Linux ne tournent que sur un ordinateur installé sous Linux"
    why: "Un conteneur partage le noyau de l'hôte ; sur macOS ou Windows, Docker Desktop fournit donc ce noyau Linux par une machine virtuelle."
  - id: format-compose
    prompt: "Dans quel format décrit-on les services de Docker Compose ?"
    answer: "Un fichier YAML (compose.yaml ou docker-compose.yml)"
    decoys:
      - "Un Dockerfile unique qui contient tous les services du projet"
      - "Un fichier HCL, comme les configurations de Terraform"
    why: "Le fichier Compose liste les services, leurs images ou Dockerfile, leurs ports, volumes et variables d'environnement."
  - id: reseau-compose
    prompt: "Dans un projet Compose, comment l'application joint-elle le conteneur de base de données dont le service s'appelle db ?"
    answer: "Par le nom du service, db, résolu sur le réseau que Compose crée pour le projet"
    decoys:
      - "Par localhost, puisque tous les services d'un projet partagent la même interface réseau"
      - "Par l'adresse IP de l'hôte, la seule qu'un conteneur puisse joindre depuis l'intérieur"
    why: "Compose place les services sur un réseau commun où chaque nom de service est résolu par DNS. Dans un conteneur, localhost désigne le conteneur lui-même."
  - id: instruction-user
    prompt: "Quelle instruction du Dockerfile évite que le processus tourne en root dans le conteneur ?"
    answer: "USER, qui choisit un utilisateur non privilégié"
    decoys:
      - "EXPOSE, qui retire les droits d'administration"
      - "WORKDIR, qui enferme le processus dans un dossier"
    why: "Par défaut, le processus tourne en root ; USER bascule vers un compte sans privilèges. WORKDIR ne fait que changer de répertoire courant."
  - id: image-de-base-minimale
    prompt: "Pourquoi choisir une image de base minimale (slim, Alpine, distroless) ?"
    answer: "Moins de paquets : une image plus légère et moins de failles à corriger"
    decoys:
      - "Elle exécute le code plus vite, car le noyau qu'elle contient est optimisé pour les conteneurs"
      - "C'est la seule sorte d'image acceptée par Kubernetes et les services de conteneurs managés"
    why: "Chaque paquet absent est une faille de moins à surveiller. Une image ne contient pas de noyau, et Kubernetes accepte toute image OCI."
  - id: origine
    prompt: "D'où vient Docker ?"
    answer: "De dotCloud, une société de PaaS, qui l'a rendu open source en 2013"
    decoys:
      - "De Google, qui l'a extrait de Borg en 2014 avant de le confier à la CNCF"
      - "D'Amazon, qui l'a conçu pour exécuter ses fonctions Lambda à la demande"
    why: "dotCloud a publié Docker en 2013 puis a pris le nom de Docker Inc. C'est Kubernetes que Google a créé en 2014, à partir de Borg."
  - id: un-role-par-conteneur
    prompt: "Quelle règle de conception recommande-t-on pour découper une application en conteneurs ?"
    answer: "Un seul rôle par conteneur : l'application, la base et le cache chacun dans le sien"
    decoys:
      - "Regrouper toute la stack dans un conteneur unique, pour n'avoir qu'une image à déployer"
      - "Un conteneur par utilisateur connecté, créé automatiquement à sa première requête"
    why: "Séparer les rôles permet de mettre à l'échelle, mettre à jour et redémarrer chaque partie indépendamment ; c'est ce que Compose orchestre en local."
  - id: arg-et-env
    prompt: "Quelle différence y a-t-il entre ARG et ENV dans un Dockerfile ?"
    answer: "ARG n'existe que pendant la construction ; ENV reste défini dans le conteneur à l'exécution"
    decoys:
      - "ENV n'existe que pendant la construction ; ARG reste défini dans le conteneur à l'exécution"
      - "Aucune : ARG est l'ancien nom d'ENV, conservé seulement pour la compatibilité"
    why: "ARG paramètre la construction (version d'un outil, par exemple) ; ENV définit une variable d'environnement visible par l'application."
---
