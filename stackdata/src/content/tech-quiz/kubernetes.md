---
questions:
  - id: declaratif
    prompt: "Quel est le modèle de fonctionnement de Kubernetes ?"
    answer: "Déclaratif : on décrit l'état voulu, des boucles de contrôle en rapprochent le cluster en permanence"
    decoys:
      - "Impératif : on lance chaque commande de déploiement à la main, dans l'ordre, sur chacune des machines"
      - "PaaS : on pousse le code source, et la plateforme construit l'application"
    why: "On déclare quelles images, combien d'instances, quelles ressources ; Kubernetes corrige sans cesse l'écart avec la réalité."
  - id: role
    prompt: "Que fait Kubernetes ?"
    answer: "Il place, redémarre et met à l'échelle des conteneurs sur un cluster"
    decoys:
      - "Il construit les images de conteneurs à partir d'un Dockerfile"
      - "Il capture les erreurs applicatives avec leur pile d'appels"
    why: "Kubernetes orchestre des conteneurs déjà construits (avec Docker, par exemple). Les erreurs applicatives relèvent de Sentry."
  - id: objets
    prompt: "Quels objets décrivent l'état voulu dans Kubernetes ?"
    answer: "Des Deployments, des Services… décrits en YAML"
    decoys:
      - "Des Dockerfile, un par service, lus par le cluster"
      - "Des DAG écrits en Python, planifiés par le cluster"
    why: "Deployments, Services et autres objets s'écrivent en YAML. Le Dockerfile construit l'image ; les DAG sont ceux d'Airflow."
  - id: borg
    prompt: "De quel système interne de Google Kubernetes s'inspire-t-il ?"
    answer: "Borg"
    decoys:
      - "Dremel"
      - "Bigtable"
    why: "Google a créé Kubernetes en 2014 à partir de son expérience avec Borg. Dremel a inspiré BigQuery."
  - id: offres-managees
    prompt: "Lesquelles sont des offres managées de Kubernetes ?"
    answer: "EKS, GKE et AKS"
    decoys:
      - "EC2, S3 et IAM"
      - "MWAA, MSK et EMR"
    why: "Chaque grand cloud a son Kubernetes managé : EKS (AWS), GKE (Google), AKS (Azure)."
  - id: mvp
    prompt: "MVP d'une petite équipe : Kubernetes est-il un bon choix ?"
    answer: "Non : sa complexité dépasse de loin le besoin ; un PaaS ou un service de conteneurs managé suffit"
    decoys:
      - "Oui : il devient indispensable dès le premier conteneur, sinon impossible de passer en production plus tard"
      - "Oui : il est plus simple à prendre en main qu'Heroku"
    why: "Réseau, stockage, sécurité, mises à jour du cluster : Kubernetes se justifie avec de nombreux services et une équipe plateforme."
  - id: monolithe
    prompt: "Une seule application monolithique : que conseille la fiche ?"
    answer: "Un PaaS ou quelques machines avec Docker suffisent"
    decoys:
      - "Kubernetes, qui découpe automatiquement le monolithe en microservices"
      - "Kubernetes, parce que Docker ne peut lancer qu'un seul conteneur"
    why: "Kubernetes ne découpe rien ; il sert à orchestrer beaucoup de conteneurs. Pour une seule application, c'est surdimensionné."
  - id: metriques
    prompt: "Quel outil est le standard de fait pour les métriques sur Kubernetes ?"
    answer: "Prometheus"
    decoys:
      - "Sentry"
      - "Airflow"
    why: "Prometheus découvre automatiquement les services du cluster et collecte leurs métriques."
  - id: helm
    prompt: "Qu'est-ce que Helm, dans l'écosystème Kubernetes ?"
    answer: "Un gestionnaire de paquets qui installe des applications sous forme de charts"
    decoys:
      - "Le planificateur interne qui place les conteneurs sur les nœuds"
      - "Un moteur de stockage distribué intégré au cluster, qui réplique les volumes entre les nœuds"
    why: "Helm empaquette et installe des applications Kubernetes (charts). Le placement des conteneurs est fait par le planificateur de Kubernetes lui-même."
  - id: interface-standard
    prompt: "Pourquoi une organisation choisit-elle Kubernetes pour tourner sur plusieurs clouds ?"
    answer: "C'est une interface d'infrastructure standard, disponible partout"
    decoys:
      - "Il synchronise automatiquement les données entre les clouds"
      - "Il réduit d'office la facture de chaque cloud"
    why: "Les mêmes descriptions YAML se déploient sur EKS, GKE, AKS ou ses propres serveurs."
  - id: sans-competences
    prompt: "Quel risque court une équipe sans compétences Kubernetes ?"
    answer: "Un cluster mal configuré est un risque de sécurité et de disponibilité"
    decoys:
      - "Kubernetes refuse de démarrer sans certification de l'équipe"
      - "Les conteneurs tournent nettement plus lentement que s'ils étaient lancés sans Kubernetes"
    why: "La fiche le range dans « Quand l'éviter » : un cluster mal tenu expose l'infrastructure."
  - id: pod
    prompt: "Quelle est la plus petite unité déployable dans Kubernetes ?"
    answer: "Le Pod, qui regroupe un ou plusieurs conteneurs partageant réseau et stockage"
    decoys:
      - "Le nœud, une machine entière réservée à un seul conteneur et à toutes ses répliques"
      - "Le namespace, qui contient toujours exactement un conteneur et son volume"
    why: "Kubernetes ne lance pas des conteneurs isolés mais des Pods. Un nœud est une machine du cluster ; un namespace découpe le cluster en espaces logiques."
  - id: deployment
    prompt: "Que garantit un Deployment ?"
    answer: "Qu'un nombre voulu de réplicas d'un Pod tourne, avec des mises à jour progressives"
    decoys:
      - "Que l'image est reconstruite depuis le code source à chaque modification du dépôt Git"
      - "Que les données d'un Pod sont sauvegardées chaque nuit dans un stockage objet externe"
    why: "Le Deployment maintient le nombre de réplicas et gère le passage d'une version à l'autre. Il ne construit pas d'image et ne sauvegarde rien."
  - id: service
    prompt: "À quoi sert un objet Service dans Kubernetes ?"
    answer: "Donner une adresse stable à un groupe de Pods éphémères et répartir le trafic entre eux"
    decoys:
      - "Planifier une tâche à heure fixe, comme une crontab partagée par l'ensemble du cluster"
      - "Stocker la configuration et les mots de passe que les Pods lisent au démarrage"
    why: "Les Pods naissent et meurent avec des adresses changeantes ; le Service les regroupe par étiquettes derrière un nom fixe. Les tâches planifiées sont des CronJobs, la configuration des ConfigMaps."
  - id: ingress
    prompt: "Quel objet expose des routes HTTP (domaine, chemin) vers des Services, depuis l'extérieur du cluster ?"
    answer: "Ingress"
    decoys:
      - "ConfigMap"
      - "DaemonSet"
      - "PersistentVolume"
    why: "Un Ingress décrit des règles de routage HTTP, appliquées par un contrôleur Ingress (souvent Nginx). Les autres objets gèrent la configuration, les agents par nœud et le stockage."
  - id: configmap-et-secret
    prompt: "Comment fournir de la configuration aux Pods sans la mettre dans l'image ?"
    answer: "Avec des ConfigMaps, et des Secrets pour les valeurs sensibles"
    decoys:
      - "En construisant une image par environnement, configuration copiée dedans"
      - "En éditant les fichiers dans chaque conteneur avec kubectl exec"
    why: "ConfigMaps et Secrets sont injectés en variables d'environnement ou en fichiers : la même image sert dans tous les environnements. Une modification à la main dans un conteneur disparaît au redémarrage."
  - id: secret-non-chiffre
    prompt: "Un Secret Kubernetes est-il chiffré par défaut ?"
    answer: "Non : il est seulement encodé en base64 ; le chiffrement au repos se configure à part"
    decoys:
      - "Oui : chaque Secret est chiffré avec une clé propre au Pod qui a le droit de le lire"
      - "Oui : etcd refuse par conception de stocker la moindre donnée qui ne serait pas chiffrée"
    why: "Le base64 n'est qu'un encodage. Il faut activer le chiffrement au repos et restreindre l'accès aux Secrets par les droits (RBAC)."
  - id: etcd
    prompt: "Où le plan de contrôle de Kubernetes stocke-t-il l'état du cluster ?"
    answer: "Dans etcd, une base clé-valeur distribuée"
    decoys:
      - "Dans une base PostgreSQL installée sur chaque nœud"
      - "Dans les fichiers YAML du dépôt Git, relus à chaque requête"
    why: "Tous les objets du cluster sont enregistrés dans etcd, via l'API server. Les fichiers YAML ne sont que ce qu'on envoie à l'API."
  - id: kubectl
    prompt: "Quel outil en ligne de commande sert à piloter un cluster Kubernetes (appliquer des manifestes, lister des Pods) ?"
    answer: "kubectl"
    decoys:
      - "docker compose"
      - "systemctl"
    why: "kubectl parle à l'API server du cluster. docker compose lance des conteneurs sur une seule machine, systemctl gère les services d'un système Linux."
  - id: kubelet
    prompt: "Quel agent tourne sur chaque nœud pour démarrer les conteneurs des Pods qui lui sont attribués ?"
    answer: "Le kubelet"
    decoys:
      - "L'API server"
      - "Le scheduler"
      - "etcd"
    why: "Le scheduler choisit le nœud, l'API server enregistre la décision dans etcd, et le kubelet du nœud lance les conteneurs via le runtime."
  - id: scheduler
    prompt: "Comment le scheduler de Kubernetes choisit-il le nœud d'un Pod ?"
    answer: "D'après les ressources demandées (requests) et les contraintes, parmi les nœuds qui ont la place"
    decoys:
      - "Au hasard, puis il déplace le Pod d'un nœud à l'autre chaque minute pour équilibrer la charge"
      - "Toujours sur le nœud depuis lequel l'administrateur a lancé la commande kubectl apply"
    why: "Le scheduler filtre les nœuds capables d'accueillir le Pod puis choisit le plus adapté. Il ne déplace pas un Pod déjà placé."
  - id: limite-memoire
    prompt: "Que se passe-t-il quand un conteneur dépasse sa limite de mémoire ?"
    answer: "Il est tué (OOMKilled), puis redémarré selon la politique du Pod"
    decoys:
      - "Il est ralenti, comme pour le processeur, sans jamais être arrêté"
      - "Kubernetes relève sa limite tout seul, jusqu'à la mémoire du nœud"
    why: "Le processeur peut être bridé, pas la mémoire : au-delà de la limite, le conteneur est arrêté. Kubernetes ne modifie pas les limites déclarées."
  - id: readiness-probe
    prompt: "À quoi sert une sonde de disponibilité (readiness probe) ?"
    answer: "Retirer un Pod du trafic de son Service tant qu'il n'est pas prêt à répondre"
    decoys:
      - "Redémarrer le conteneur dès qu'il ne répond plus, sans jamais le retirer du trafic"
      - "Mesurer le temps de réponse du Pod pour le facturer à l'usage"
    why: "La readiness probe décide si le Pod reçoit du trafic. Redémarrer un conteneur bloqué, c'est le rôle de la liveness probe."
  - id: hpa
    prompt: "Quel objet ajoute ou retire des réplicas selon la charge, par exemple l'usage du processeur ?"
    answer: "Le HorizontalPodAutoscaler"
    decoys:
      - "Le StatefulSet"
      - "L'Ingress"
      - "Le ConfigMap"
    why: "Le HorizontalPodAutoscaler ajuste le nombre de réplicas d'un Deployment d'après des métriques. Les autres objets ne changent pas ce nombre."
  - id: statefulset
    prompt: "Quel objet convient à une application avec état, comme une base répliquée, qui a besoin d'identités et de volumes stables ?"
    answer: "StatefulSet"
    decoys:
      - "Deployment"
      - "DaemonSet"
      - "Job"
    why: "Le StatefulSet donne à chaque Pod un nom stable et son propre volume persistant. Les Pods d'un Deployment sont interchangeables."
  - id: daemonset
    prompt: "Quel objet lance une copie d'un Pod sur chaque nœud, par exemple un agent de collecte des journaux ?"
    answer: "DaemonSet"
    decoys:
      - "StatefulSet"
      - "CronJob"
      - "Deployment"
    why: "Le DaemonSet suit les nœuds : un nœud ajouté reçoit automatiquement sa copie. Un Deployment place ses réplicas où il y a de la place."
  - id: namespaces
    prompt: "À quoi servent les namespaces Kubernetes ?"
    answer: "Découper un cluster en espaces logiques, par équipe ou environnement, avec droits et quotas"
    decoys:
      - "Isoler chaque Pod dans sa propre machine virtuelle, avec son propre noyau Linux dédié"
      - "Donner un nom de domaine public à chaque Service exposé sur Internet par le cluster"
    why: "Les namespaces regroupent des objets pour y appliquer droits (RBAC) et quotas. Ils n'ajoutent aucune isolation matérielle et ne publient aucun domaine."
  - id: mise-a-jour-progressive
    prompt: "Par défaut, comment un Deployment passe-t-il à une nouvelle version sans coupure ?"
    answer: "Par mise à jour progressive : de nouveaux Pods remplacent les anciens petit à petit"
    decoys:
      - "Il arrête tous les anciens Pods d'un coup, puis démarre tous les nouveaux ensemble"
      - "Il remplace les fichiers dans les conteneurs en place, sans aucun redémarrage de Pod"
    why: "La stratégie par défaut, RollingUpdate, garde l'application disponible pendant la transition. Tout arrêter puis tout relancer (Recreate) provoque une coupure."
  - id: cncf
    prompt: "À quelle fondation Google a-t-il confié Kubernetes ?"
    answer: "La CNCF (Cloud Native Computing Foundation)"
    decoys:
      - "La fondation Apache (Apache Software Foundation)"
      - "La fondation Eclipse (Eclipse Foundation)"
    why: "La CNCF a été créée en 2015 avec Kubernetes comme premier projet ; elle héberge aussi Prometheus."
  - id: operateur
    prompt: "Qu'est-ce qu'un opérateur Kubernetes ?"
    answer: "Un contrôleur qui automatise l'exploitation d'une application via des ressources personnalisées"
    decoys:
      - "Un membre de l'équipe plateforme habilité à exécuter kubectl sur le cluster de production"
      - "Un nœud spécial qui héberge le plan de contrôle et refuse tous les Pods des applications"
    why: "Un opérateur encode le savoir d'exploitation (installation, sauvegarde, bascule d'une base) dans une boucle de contrôle, sur le modèle déclaratif de Kubernetes."
---
