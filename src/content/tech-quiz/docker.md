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
---
