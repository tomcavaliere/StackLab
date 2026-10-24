---
name: Terraform
kind: outil-infra
layers: [conteneurs-infra]
tags: [source-available, iac, cloud-native]
difficulty: 2
summary: "Outil d'infrastructure as code : on déclare dans des fichiers les ressources cloud voulues, Terraform calcule les changements nécessaires et les applique."
integratesWith:
  - tech: aws
    note: "Le provider AWS couvre la plupart de ses services : réseaux, bases, clusters, droits IAM."
  - tech: github-actions
    note: "Schéma courant : un plan affiché sur chaque pull request, appliqué après la fusion."
---

## Problème résolu

Créer son infrastructure à la main dans la console d'un cloud fonctionne une fois, mais personne ne sait ensuite ce qui a été configuré, ni comment le recréer dans un autre environnement. Terraform (HashiCorp, 2014) décrit l'infrastructure dans des fichiers texte (langage HCL) versionnés avec le code : réseaux, bases managées, clusters, DNS, droits. La commande `plan` montre les créations, modifications et suppressions prévues ; `apply` les exécute.

Terraform garde un fichier d'état qui fait le lien entre les fichiers et les ressources réelles. Des providers le connectent à presque tout : AWS, Google Cloud, Azure, Kubernetes et de nombreux services SaaS. En 2023, HashiCorp a remplacé sa licence open-source par la Business Source License ; la communauté a créé le fork OpenTofu, sous l'égide de la Linux Foundation.

## Quand l'utiliser

- Infrastructure cloud avec de nombreuses ressources et plusieurs environnements (développement, préproduction, production) qui doivent rester identiques.
- Changements d'infrastructure revus en pull request, comme du code.
- Équipe plateforme qui gère des comptes cloud pour d'autres équipes.

## Quand l'éviter

- Une application sur un PaaS (Heroku, Vercel) : il n'y a presque rien à décrire.
- Configurer le logiciel à l'intérieur des machines : c'est le rôle d'outils comme Ansible, ou des images de conteneurs.
- Le fichier d'état contient des informations sensibles et ne supporte pas deux modifications simultanées : dès qu'on travaille à plusieurs, il faut le stocker à distance, chiffré et verrouillé.

## Pour aller plus loin

- [Documentation officielle](https://developer.hashicorp.com/terraform/docs)
- [OpenTofu](https://opentofu.org/)
