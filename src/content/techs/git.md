---
name: Git
kind: outil-infra
layers: []
tags: [open-source, standard]
difficulty: 1
summary: "Gestionnaire de versions distribué : garde l'historique de chaque modification du code et permet de travailler à plusieurs sur des branches, puis de les fusionner."
integratesWith:
  - tech: github-actions
    note: "Chaque push ou pull request sur un dépôt GitHub peut déclencher un workflow : tests, build, déploiement."
  - tech: terraform
    note: "Le code d'infrastructure se versionne et se relit dans Git comme le code applicatif."
---

## Problème résolu

Sans outil, on ne sait plus quelle version d'un fichier est la bonne, qui a changé quoi, ni comment revenir en arrière. À plusieurs, on écrase le travail des autres. Git (créé en 2005 par Linus Torvalds pour le noyau Linux) enregistre l'historique complet d'un projet et permet de travailler en parallèle sans se gêner.

### Le modèle

- **Dépôt** (*repository*) : le projet et tout son historique, dans le dossier caché `.git`.
- **Commit** : une photo de l'état des fichiers à un instant, avec un message, un auteur et un identifiant unique (un *hash*). Chaque commit pointe vers son parent : l'historique est une chaîne de commits.
- **Zone de préparation** (*staging area* ou *index*) : on y choisit, avec `git add`, ce qui entrera dans le prochain commit. On peut ainsi ne valider qu'une partie de ses modifications.
- **Branche** : un simple pointeur vers un commit, qui avance à chaque nouveau commit. Créer une branche ne copie rien : c'est instantané. On développe une fonctionnalité sur sa branche, puis on la fusionne dans la branche principale (souvent `main`).
- **Distribué** : chaque copie du dépôt (*clone*) contient tout l'historique. On travaille hors ligne, puis on échange ses commits avec un dépôt distant (*remote*, souvent appelé `origin`).

### Les commandes du quotidien

```bash
git clone <url>                 # copier un dépôt distant, avec son historique
git status                      # ce qui a changé, ce qui est préparé
git add fichier.py              # préparer une modification pour le prochain commit
git commit -m "Corrige le calcul de la TVA"   # enregistrer ce qui est préparé
git log --oneline               # l'historique, un commit par ligne
git switch -c ma-fonction       # créer une branche et s'y placer
git merge ma-fonction           # fusionner cette branche dans la branche courante
git pull                        # récupérer les commits du distant et les intégrer
git push                        # envoyer ses commits vers le distant
```

`git fetch` récupère les commits du distant sans toucher à la branche courante ; `git pull` fait un `fetch` puis les intègre. Le fichier `.gitignore` liste ce que Git doit ignorer : dépendances installées, fichiers générés, fichiers de configuration locaux.

### Fusionner : merge ou rebase

- **merge** réunit deux branches par un commit de fusion. L'historique garde la trace des branches telles qu'elles ont existé.
- **rebase** rejoue les commits d'une branche au-dessus d'une autre. L'historique devient linéaire, mais les commits sont réécrits (ils changent d'identifiant).
- Quand les deux branches ont modifié les mêmes lignes, Git ne peut pas choisir : c'est un **conflit**, à résoudre à la main avant de terminer la fusion.

Règle de prudence : ne pas réécrire (rebase, `push --force`) des commits déjà partagés avec d'autres, car leur copie ne correspond plus.

### Git n'est pas GitHub

Git est l'outil, installé sur chaque poste. GitHub, GitLab ou Bitbucket sont des services qui hébergent des dépôts et ajoutent la collaboration : *pull requests* (ou *merge requests*) pour faire relire une branche avant de la fusionner, gestion des tickets, CI/CD.

## Quand l'utiliser

- Pour tout code, dès le premier fichier, même seul : l'historique et le retour en arrière servent toujours.
- Pour tout ce qui est texte et évolue : configuration, infrastructure en code, documentation, requêtes SQL, modèles dbt.
- Pour travailler à plusieurs : une branche par fonctionnalité, relue dans une pull request avant fusion.

## Quand l'éviter

- **Secrets** (mots de passe, clés d'API) : ne jamais les committer. Même supprimés ensuite, ils restent dans l'historique. Les mettre dans des variables d'environnement ou un gestionnaire de secrets, et le fichier qui les contient dans `.gitignore`.
- **Gros fichiers binaires** (vidéos, jeux de données, modèles entraînés) : chaque version alourdit le dépôt pour toujours. Git LFS les stocke à part ; pour les données, un stockage objet ou un outil dédié convient mieux.
- **Notebooks avec leurs sorties** : le format est du JSON où sorties et métadonnées changent à chaque exécution, ce qui rend les différences illisibles. Vider les sorties avant de committer.

## Pour aller plus loin

- [Documentation officielle](https://git-scm.com/doc)
- [Le livre Pro Git, en français](https://git-scm.com/book/fr/v2)
