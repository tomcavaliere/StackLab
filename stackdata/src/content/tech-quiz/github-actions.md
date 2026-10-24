---
questions:
  - id: fichier
    prompt: "Où décrit-on un workflow GitHub Actions ?"
    answer: "Dans un fichier YAML, sous .github/workflows"
    decoys:
      - "Dans un Dockerfile à la racine du dépôt"
      - "Dans l'interface web uniquement, sans fichier versionné"
    why: "Le workflow est un fichier YAML versionné avec le code : il évolue et se relit comme le reste du dépôt."
  - id: organisation
    prompt: "Comment un workflow est-il organisé ?"
    answer: "En jobs, eux-mêmes composés d'étapes"
    decoys:
      - "En assets reliés par leur lignée"
      - "En Deployments et Services"
    why: "Un workflow décrit des jobs et leurs étapes. Les assets sont un concept de Dagster, Deployments et Services de Kubernetes."
  - id: declencheurs
    prompt: "Qu'est-ce qui peut déclencher un workflow ?"
    answer: "Un push, une pull request, une étiquette ou un planning"
    decoys:
      - "Uniquement un clic manuel dans l'interface"
      - "Uniquement un push sur la branche principale du dépôt"
    why: "Les workflows réagissent aux événements du dépôt, et aussi à un planning."
  - id: runners
    prompt: "Où tournent les jobs ?"
    answer: "Sur des machines hébergées par GitHub (Linux, Windows, macOS) ou sur ses propres serveurs"
    decoys:
      - "Uniquement sur des machines Linux hébergées par GitHub, sans possibilité d'utiliser les siennes"
      - "Sur le poste du développeur qui a poussé le code"
    why: "GitHub fournit des runners sur trois systèmes, et l'on peut brancher ses propres runners auto-hébergés."
  - id: marketplace
    prompt: "À quoi sert la place de marché de GitHub Actions ?"
    answer: "Fournir des actions réutilisables : installer un langage, publier une image Docker, déployer"
    decoys:
      - "Acheter des minutes de calcul supplémentaires quand le quota gratuit est épuisé, à prix réduit"
      - "Vendre l'accès à ses dépôts privés"
    why: "Une action réutilisable évite de réécrire les mêmes étapes dans chaque workflow."
  - id: epingler
    prompt: "Pourquoi épingler une action tierce à un hash de commit ?"
    answer: "Elle s'exécute avec les secrets du dépôt : on évite qu'une nouvelle version malveillante soit utilisée"
    decoys:
      - "Pour qu'elle se télécharge plus vite à chaque exécution"
      - "Parce que GitHub refuse les références par numéro de version dans les workflows publics du dépôt"
    why: "Une étiquette de version peut être déplacée ; un hash de commit, non. C'est la recommandation de sécurité de la fiche."
  - id: gitlab
    prompt: "Le code est hébergé sur GitLab. GitHub Actions est-il le choix naturel ?"
    answer: "Non : la CI intégrée de GitLab est plus naturelle"
    decoys:
      - "Oui : GitHub Actions est obligatoire pour toute CI"
      - "Oui : il lit les dépôts GitLab sans configuration"
    why: "GitHub Actions est d'autant plus simple qu'il est intégré au dépôt GitHub. Ailleurs, la CI de la plateforme d'hébergement s'impose."
  - id: minutes
    prompt: "Builds très longs et très fréquents : qu'est-ce qui devient intéressant ?"
    answer: "Des runners auto-hébergés, car les minutes facturées s'accumulent"
    decoys:
      - "Désactiver les tests sur les pull requests pour gagner du temps"
      - "Réécrire les workflows en JSON"
    why: "Sur machines hébergées, les minutes se paient : à gros volume, faire tourner ses propres runners peut revenir moins cher."
  - id: ci
    prompt: "Qu'est-ce qu'une CI ?"
    answer: "L'exécution automatique du build et des tests (voire du déploiement) à chaque changement"
    decoys:
      - "Une revue de code manuelle, obligatoire et signée, avant chaque fusion dans la branche principale"
      - "Un registre où l'on publie les images Docker"
    why: "La CI évite d'oublier une étape : chaque changement est construit et testé automatiquement."
  - id: usage
    prompt: "Quel est un usage typique de GitHub Actions ?"
    answer: "Lancer les tests sur chaque pull request et déployer automatiquement à la fusion"
    decoys:
      - "Héberger l'application en production, avec un domaine fourni par GitHub"
      - "Stocker les métriques de l'application"
    why: "GitHub Actions exécute des workflows ; il n'héberge pas l'application et ne stocke pas de métriques."
  - id: cle-on
    prompt: "Dans un workflow GitHub Actions, quelle clé de premier niveau déclare les événements qui le déclenchent ?"
    answer: "on"
    decoys:
      - "trigger"
      - "when"
      - "events"
    why: "La clé on liste les événements (push, pull_request, schedule…). Les autres noms n'existent pas dans la syntaxe des workflows."
  - id: runs-on
    prompt: "Quelle clé d'un job GitHub Actions choisit la machine sur laquelle il s'exécute ?"
    answer: "runs-on, par exemple ubuntu-latest"
    decoys:
      - "image, par exemple ubuntu:22.04"
      - "machine, par exemple linux-large"
      - "platform, par exemple x86_64-linux"
    why: "runs-on désigne un runner hébergé (ubuntu-latest, windows-latest, macos-latest) ou des étiquettes de runner auto-hébergé."
  - id: uses-run
    prompt: "Dans une étape GitHub Actions, quelle différence entre uses et run ?"
    answer: "uses appelle une action réutilisable, run exécute une commande shell"
    decoys:
      - "uses exécute une commande shell, run appelle une action réutilisable"
      - "uses déclare une dépendance entre jobs, run lance le job sur un runner"
      - "Aucune : ce sont deux synonymes acceptés pour la même instruction"
    why: "uses: actions/checkout@… invoque une action ; run: npm test lance une commande dans le shell du runner. L'ordre entre jobs se déclare avec needs."
  - id: needs
    prompt: "Par défaut, les jobs d'un même workflow s'exécutent en parallèle. Comment faire attendre un job qu'un autre réussisse ?"
    answer: "Avec la clé needs, qui liste les jobs dont il dépend"
    decoys:
      - "En les écrivant dans l'ordre voulu, ce qui suffit à les enchaîner"
      - "Avec la clé after, qui fixe un délai d'attente en secondes"
    why: "needs crée une dépendance : le job ne démarre qu'après le succès des jobs listés. L'ordre d'écriture ne change rien au parallélisme."
  - id: checkout
    prompt: "Pourquoi la plupart des workflows commencent-ils par l'action actions/checkout ?"
    answer: "Le runner démarre sans le code : il faut d'abord récupérer le dépôt"
    decoys:
      - "Elle vérifie que la pull request a été approuvée par un relecteur"
      - "Elle valide la syntaxe du fichier YAML avant de lancer les étapes du job"
    why: "Un job démarre sur une machine vierge ; actions/checkout clone le dépôt dans l'espace de travail pour que les étapes suivantes y accèdent."
  - id: artefacts
    prompt: "Comment transmettre des fichiers produits par un job à un autre job du même workflow ?"
    answer: "En les publiant comme artefacts, puis en les téléchargeant dans l'autre job"
    decoys:
      - "Rien à faire : tous les jobs d'un workflow partagent le même disque"
      - "En les plaçant dans une variable d'environnement définie au niveau du workflow"
    why: "Chaque job tourne sur son propre runner. Les étapes d'un même job partagent un disque, pas les jobs entre eux : on passe par les artefacts."
  - id: matrice
    prompt: "Tester une bibliothèque sur trois versions de Node et deux systèmes sans dupliquer le job : quel mécanisme utiliser ?"
    answer: "Une matrice (strategy.matrix)"
    decoys:
      - "Un workflow réutilisable par version (workflow_call)"
      - "Un groupe de concurrence (concurrency) par version"
      - "Une action composite qui boucle sur les versions"
    why: "La matrice génère un job par combinaison de valeurs, ici six. Un workflow réutilisable factorise du code, la concurrence limite les exécutions simultanées."
  - id: secrets
    prompt: "Où ranger un jeton de déploiement utilisé par un workflow ?"
    answer: "Dans les secrets du dépôt ou de l'environnement, lus via le contexte secrets"
    decoys:
      - "Dans le fichier YAML du workflow, puisque le dépôt est déjà protégé par ses droits d'accès"
      - "Dans un fichier .env commité à la racine, lu automatiquement par le runner"
    why: "Les secrets sont chiffrés et masqués dans les journaux. Un jeton écrit dans un fichier versionné est lisible par quiconque lit le dépôt."
  - id: github-token
    prompt: "Qu'est-ce que le GITHUB_TOKEN dans GitHub Actions ?"
    answer: "Un jeton créé automatiquement pour chaque exécution, aux droits réglables via permissions"
    decoys:
      - "Le jeton personnel du développeur qui a poussé, transmis à chaque exécution"
      - "Un jeton permanent à créer soi-même dans les paramètres du compte, valable pour tous les dépôts"
    why: "GitHub génère ce jeton pour l'exécution et l'expire ensuite ; la clé permissions restreint ses droits au strict nécessaire."
  - id: workflow-dispatch
    prompt: "Quel événement permet de lancer un workflow à la main depuis l'interface ou l'API ?"
    answer: "workflow_dispatch"
    decoys:
      - "manual_trigger"
      - "repository_run"
      - "workflow_manual"
    why: "workflow_dispatch ajoute un bouton « Run workflow » et accepte des paramètres d'entrée. Les autres noms n'existent pas."
  - id: schedule-cron
    prompt: "Comment exprime-t-on le planning d'un workflow déclenché par schedule ?"
    answer: "Avec une expression cron, interprétée en UTC"
    decoys:
      - "Avec une durée ISO 8601, interprétée dans le fuseau du dépôt"
      - "Avec une liste d'heures, interprétées dans le fuseau du propriétaire"
    why: "schedule prend une ou plusieurs expressions cron, évaluées en UTC, d'où des décalages si l'on raisonne en heure locale."
  - id: fork-secrets
    prompt: "Une pull request venue d'un fork déclenche un workflow sur l'événement pull_request. A-t-il accès aux secrets du dépôt ?"
    answer: "Non : les secrets ne lui sont pas transmis"
    decoys:
      - "Oui : tous les secrets sont transmis, comme pour une branche interne"
      - "Oui, mais seulement ceux dont le nom commence par PUBLIC_"
    why: "Sinon, n'importe qui pourrait ouvrir une pull request qui exfiltre les secrets ; le GITHUB_TOKEN y est aussi limité en lecture."
  - id: injection-script
    prompt: "Pourquoi est-il dangereux d'insérer le titre d'une issue directement dans une commande run via une expression ?"
    answer: "Le titre est contrôlé par un tiers : il peut injecter des commandes shell"
    decoys:
      - "Le titre peut dépasser la longueur maximale d'une ligne de commande"
      - "Les expressions sont évaluées après le shell, donc le titre reste toujours vide"
    why: "L'expression est remplacée par son texte avant l'exécution du shell. Mieux vaut passer la valeur par une variable d'environnement."
  - id: cache
    prompt: "Comment éviter de retélécharger toutes les dépendances à chaque exécution ?"
    answer: "Mettre en cache le répertoire des dépendances, avec une clé dérivée du fichier de verrouillage"
    decoys:
      - "Rien à faire : les runners hébergés par GitHub gardent leur disque d'une exécution à l'autre"
      - "Commiter le dossier node_modules pour qu'actions/checkout le récupère"
    why: "Les runners hébergés sont neufs à chaque job ; un cache (actions/cache ou l'option cache des actions setup-*) restaure les dépendances tant que la clé ne change pas."
  - id: if-condition
    prompt: "Comment n'exécuter une étape de déploiement que sur la branche main ?"
    answer: "Avec une condition if sur la référence Git (github.ref)"
    decoys:
      - "Avec la clé branch: main placée sur l'étape de déploiement"
      - "Avec la clé only: main, placée sur le job qui contient l'étape"
    why: "if accepte une expression évaluée à l'exécution, par exemple sur github.ref. branch et only ne sont pas des clés d'étape GitHub Actions."
  - id: workflow-reutilisable
    prompt: "Plusieurs dépôts répètent le même pipeline. Quel mécanisme permet d'appeler un workflow complet depuis un autre ?"
    answer: "Un workflow réutilisable, déclenché par workflow_call"
    decoys:
      - "Une matrice, déclarée dans strategy.matrix"
      - "Un webhook, déclenché par repository_dispatch"
    why: "workflow_call rend un workflow appelable avec uses au niveau d'un job. Une matrice démultiplie un job ; repository_dispatch déclenche un workflow par l'API, sans le partager."
  - id: environnements
    prompt: "Exiger l'approbation d'une personne avant chaque déploiement en production : quel mécanisme utiliser ?"
    answer: "Un environnement avec des relecteurs obligatoires"
    decoys:
      - "Une branche protégée avec un statut requis"
      - "Un groupe de concurrence limité à un job"
      - "Un secret chiffré lu au moment du déploiement"
    why: "Les règles de protection d'un environnement suspendent le job jusqu'à l'approbation. Une branche protégée encadre les fusions, pas les déploiements."
  - id: oidc
    prompt: "Quel est l'intérêt de l'authentification OIDC entre GitHub Actions et un fournisseur cloud ?"
    answer: "Obtenir des identifiants temporaires sans stocker de clé longue durée"
    decoys:
      - "Accélérer le démarrage des runners hébergés en les plaçant chez le fournisseur"
      - "Chiffrer les journaux d'exécution avec une clé gérée par le fournisseur"
    why: "Le workflow présente un jeton signé par GitHub, que le cloud échange contre des identifiants de courte durée : plus de secret permanent à faire fuiter."
  - id: concurrency
    prompt: "Plusieurs pushes rapprochés sur une branche lancent des exécutions en double. Quelle clé permet d'annuler l'exécution en cours au profit de la plus récente ?"
    answer: "concurrency, avec cancel-in-progress"
    decoys:
      - "timeout-minutes, avec une valeur courte"
      - "strategy, avec fail-fast activé"
      - "needs, avec le job précédent du workflow"
    why: "concurrency regroupe les exécutions sous une même clé et peut annuler celle en cours. timeout-minutes coupe un job trop long, fail-fast arrête une matrice au premier échec."
  - id: types-actions
    prompt: "Sous quelles formes peut-on écrire une action GitHub Actions ?"
    answer: "En JavaScript, en conteneur Docker ou en action composite"
    decoys:
      - "Uniquement en JavaScript, exécuté par le Node du runner"
      - "Uniquement en script Bash, placé dans un dossier actions/"
    why: "Une action peut être un programme JavaScript, une image Docker, ou une composition d'étapes (composite)."
---
