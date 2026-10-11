---
questions:
  - id: iac
    prompt: "En quoi consiste l'infrastructure as code avec Terraform ?"
    answer: "Décrire l'infrastructure dans des fichiers versionnés, puis appliquer les changements"
    decoys:
      - "Écrire l'application et l'infrastructure dans le même langage de programmation"
      - "Configurer les ressources à la main dans la console, puis les exporter"
    why: "On sait ce qui est configuré, et on peut le recréer à l'identique dans un autre environnement."
  - id: plan
    prompt: "Que fait la commande terraform plan ?"
    answer: "Elle montre les créations, modifications et suppressions prévues"
    decoys:
      - "Elle applique les changements"
      - "Elle détruit l'infrastructure existante pour la recréer proprement"
    why: "plan montre ; apply exécute."
  - id: apply
    prompt: "Quelle commande Terraform exécute les changements prévus ?"
    answer: "apply"
    decoys:
      - "plan"
      - "init"
    why: "plan les affiche, apply les exécute ; init prépare le répertoire de travail."
  - id: hcl
    prompt: "Dans quel langage décrit-on les ressources Terraform ?"
    answer: "HCL"
    decoys:
      - "Le YAML de Kubernetes"
      - "SQL"
    why: "HCL est le langage de configuration de HashiCorp."
  - id: fichier-d-etat
    prompt: "À quoi sert le fichier d'état de Terraform ?"
    answer: "Faire le lien entre les fichiers et les ressources réelles"
    decoys:
      - "Stocker les journaux de l'application"
      - "Garder les mots de passe des utilisateurs de l'application"
    why: "Terraform y retrouve quelles ressources réelles correspondent à quels blocs de configuration."
  - id: etat-distant
    prompt: "Pourquoi stocker l'état à distance, chiffré et verrouillé, dès qu'on travaille à plusieurs ?"
    answer: "Il contient des informations sensibles et ne supporte pas deux modifications simultanées"
    decoys:
      - "Terraform refuse de fonctionner avec un état stocké sur le poste d'un développeur"
      - "Pour que la commande plan s'exécute plus vite"
    why: "La fiche le range dans « Quand l'éviter » : sans ces précautions, l'état fuit ou se corrompt."
  - id: providers
    prompt: "Que sont les providers Terraform ?"
    answer: "Des connecteurs vers AWS, Google Cloud, Azure, Kubernetes, des services SaaS…"
    decoys:
      - "Des hébergeurs qui exécutent Terraform à votre place, facturés à la ressource créée"
      - "Des modules de facturation"
    why: "Les providers connectent Terraform à presque tout."
  - id: licence
    prompt: "Que s'est-il passé côté licence en 2023 ?"
    answer: "HashiCorp est passé à la Business Source License ; la communauté a créé le fork OpenTofu"
    decoys:
      - "Terraform a été racheté par AWS et n'est plus utilisable avec les autres clouds"
      - "Terraform est passé sous licence MIT, pour élargir sa communauté"
    why: "OpenTofu est placé sous l'égide de la Linux Foundation."
  - id: interieur-des-machines
    prompt: "Configurer le logiciel à l'intérieur des machines : est-ce le rôle de Terraform ?"
    answer: "Non : c'est plutôt celui d'Ansible, ou des images de conteneurs"
    decoys:
      - "Oui : c'est son rôle principal, avant la création des ressources"
      - "Oui, grâce au fichier d'état"
    why: "Terraform crée les ressources (réseaux, bases, clusters), pas ce qui s'exécute dedans."
  - id: paas
    prompt: "Une application seule sur un PaaS : Terraform est-il utile ?"
    answer: "Peu : il n'y a presque rien à décrire"
    decoys:
      - "Indispensable dès la première application"
      - "Terraform remplace le PaaS"
    why: "Terraform se justifie avec de nombreuses ressources et plusieurs environnements."
  - id: pull-request
    prompt: "Quel schéma courant associe Terraform et GitHub Actions ?"
    answer: "Un plan affiché sur chaque pull request, appliqué après la fusion"
    decoys:
      - "Un apply à chaque commit, sur n'importe quelle branche, sans revue préalable"
      - "Aucun : ils ne peuvent pas fonctionner ensemble"
    why: "Les changements d'infrastructure sont revus en pull request, comme du code."
---
