---
name: DevOps / SRE
family: infra
summary: "Fait tourner les applications des autres de façon fiable, reproductible et surveillée."
mission: "Construit la chaîne qui mène du code d'un développeur à la production, décrit l'infrastructure en code, puis surveille que tout tient. Il réduit le travail manuel, les surprises au déploiement et le temps de réaction aux pannes."
stack:
  - step: Automatiser par le code
    intro: "On écrit des scripts et des outils plutôt que de cliquer dans des consoles : ce qui est écrit se relit, se versionne et se rejoue."
    techs:
      - { tech: python, why: "Le langage des scripts d'automatisation et de la glue entre outils." }
      - { tech: go, why: "Compilé en un seul binaire : adapté aux outils d'infrastructure, et beaucoup (Kubernetes, Terraform, Prometheus) en sont écrits." }
  - step: Conteneuriser
    intro: "Un conteneur emballe une application avec ses dépendances : elle tourne pareil sur un laptop et en production."
    techs:
      - { tech: docker, essential: true, why: "Le standard pour construire et exécuter des conteneurs." }
      - { tech: kubernetes, essential: true, why: "Orchestre les conteneurs sur un cluster : placement, redémarrage et mise à l'échelle." }
      - { tech: nginx, why: "Reverse proxy et répartiteur de charge devant les applications." }
  - step: Décrire l'infrastructure en code
    intro: "Quand l'infrastructure est un fichier versionné, la recréer ou la copier devient une commande et non un week-end."
    techs:
      - { tech: terraform, essential: true, why: "Déclare serveurs, réseaux et services cloud dans des fichiers, puis applique les différences." }
  - step: Choisir où héberger
    intro: "Du plus manuel au plus délégué : un cloud complet, un service managé, une plateforme qui cache l'infrastructure."
    techs:
      - { tech: aws, essential: true, why: "Le plus grand catalogue de services cloud : le terrain de jeu le plus courant du métier." }
      - { tech: aws-lambda, why: "Exécute du code à la demande sans serveur à gérer." }
      - { tech: aws-s3, why: "Stockage objet utilisé presque partout : sauvegardes, artefacts, fichiers." }
      - { tech: heroku, why: "Plateforme qui déploie en poussant le code : pratique, mais moins de contrôle." }
      - { tech: vercel, why: "Plateforme de déploiement orientée frontend, avec prévisualisation par branche." }
  - step: Livrer en continu
    intro: "Chaque changement passe par la même chaîne automatique : tests, build, déploiement. C'est ce qui rend les mises en production banales."
    techs:
      - { tech: github-actions, essential: true, why: "Définit la chaîne CI/CD dans le dépôt, déclenchée à chaque push." }
  - step: Observer
    intro: "On ne dépanne que ce qu'on voit : métriques, logs et erreurs donnent l'état du système avant que les utilisateurs ne s'en plaignent."
    techs:
      - { tech: prometheus, essential: true, why: "Collecte des métriques et déclenche des alertes." }
      - { tech: grafana, essential: true, why: "Affiche les métriques en tableaux de bord." }
      - { tech: elasticsearch, why: "Indexe et recherche des logs volumineux." }
      - { tech: sentry, why: "Capture les erreurs applicatives avec leur contexte." }
---
