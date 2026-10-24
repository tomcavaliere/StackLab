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
  - id: init
    prompt: "Que fait la commande terraform init ?"
    answer: "Elle prépare le répertoire : télécharge providers et modules, configure le backend d'état"
    decoys:
      - "Elle crée toutes les ressources décrites dans les fichiers, sans afficher de plan au préalable"
      - "Elle génère les fichiers HCL à partir des ressources déjà créées à la main dans la console"
    why: "init est la première commande à lancer dans un répertoire. Créer les ressources, c'est apply ; init ne génère aucune configuration."
  - id: destroy
    prompt: "Quelle commande supprime toutes les ressources gérées par une configuration Terraform ?"
    answer: "terraform destroy"
    decoys:
      - "terraform validate"
      - "terraform fmt"
    why: "destroy montre puis supprime tout ce que l'état référence. validate vérifie la configuration, fmt la met en forme."
  - id: fmt-et-validate
    prompt: "Que font terraform fmt et terraform validate ?"
    answer: "fmt met en forme les fichiers ; validate vérifie la syntaxe et la cohérence de la configuration"
    decoys:
      - "fmt formate les disques des machines ; validate teste une à une les ressources réelles du cloud"
      - "fmt convertit le HCL en JSON ; validate applique les changements après confirmation de l'utilisateur"
    why: "Deux vérifications locales, rapides, souvent lancées en CI avant le plan. Ni l'une ni l'autre ne touche à l'infrastructure."
  - id: declaratif
    prompt: "Terraform est-il déclaratif ou impératif ?"
    answer: "Déclaratif : on décrit l'état final, Terraform calcule les étapes pour y arriver"
    decoys:
      - "Impératif : on écrit la liste ordonnée des appels d'API à exécuter auprès du cloud"
      - "Impératif : chaque apply rejoue l'historique complet des commandes depuis le premier"
    why: "Terraform compare l'état voulu, l'état enregistré et la réalité, puis en déduit les créations, modifications et suppressions."
  - id: graphe-de-dependances
    prompt: "Comment Terraform décide-t-il de l'ordre de création des ressources ?"
    answer: "Il construit un graphe de dépendances à partir des références entre ressources"
    decoys:
      - "Il suit l'ordre d'écriture des blocs dans les fichiers, du haut vers le bas, fichier par fichier"
      - "Il crée tout en parallèle, puis réessaie en boucle les créations qui ont échoué"
    why: "Si une machine référence l'identifiant d'un réseau, le réseau est créé d'abord ; les ressources indépendantes sont créées en parallèle. L'ordre des blocs n'a pas d'importance."
  - id: derive
    prompt: "Quelqu'un modifie à la main dans la console une ressource gérée par Terraform : que montre le plan suivant ?"
    answer: "Un écart (dérive) que Terraform propose de corriger pour revenir à la configuration"
    decoys:
      - "Rien : Terraform ne compare que les fichiers entre deux commits du dépôt Git"
      - "Une erreur bloquante : la ressource est désormais exclue de la gestion par Terraform"
    why: "Le plan interroge les ressources réelles et les compare à la configuration : les modifications manuelles sont détectées et annulées à l'apply suivant."
  - id: variables
    prompt: "Comment paramétrer une même configuration Terraform pour plusieurs environnements ?"
    answer: "Avec des variables d'entrée, renseignées par exemple dans des fichiers .tfvars"
    decoys:
      - "En copiant tous les fichiers dans un dépôt Git par environnement, sans aucun paramètre"
      - "Avec des blocs output, qui injectent une valeur différente dans chaque ressource"
    why: "Les blocs variable déclarent les paramètres (taille des machines, nom de l'environnement) ; un fichier .tfvars par environnement les renseigne. Les outputs exposent des valeurs, ils n'en injectent pas."
  - id: outputs
    prompt: "À quoi servent les blocs output dans Terraform ?"
    answer: "Exposer des valeurs après l'apply, comme l'adresse d'une base créée"
    decoys:
      - "Rediriger les journaux d'exécution de Terraform vers un fichier"
      - "Déclarer les ressources à supprimer au prochain apply de la configuration"
    why: "Un output affiche une valeur calculée et peut être lu par une autre configuration ou un script. Il ne journalise ni ne supprime rien."
  - id: modules
    prompt: "Qu'est-ce qu'un module Terraform ?"
    answer: "Un ensemble de ressources réutilisable, appelé avec ses propres variables"
    decoys:
      - "Un provider écrit en HCL par l'équipe elle-même, à la place du Go habituel"
      - "Un fichier d'état partiel, propre à chacun des développeurs de l'équipe"
    why: "Un module regroupe par exemple un réseau complet ou un cluster ; on l'appelle plusieurs fois avec des paramètres différents. Les providers sont des programmes compilés."
  - id: bloc-data
    prompt: "À quoi sert un bloc data dans Terraform ?"
    answer: "Lire une ressource existante, gérée ailleurs, pour en utiliser les attributs"
    decoys:
      - "Créer une base de données managée chez le provider cloud choisi par l'équipe"
      - "Stocker les données métier de l'application dans le fichier d'état de Terraform"
    why: "Une data source lit sans rien créer (une image de machine, un réseau existant). Créer une ressource se fait avec un bloc resource."
  - id: import
    prompt: "Une ressource a été créée à la main dans la console : comment la placer sous la gestion de Terraform ?"
    answer: "L'importer dans l'état (commande ou bloc import), puis la décrire en HCL"
    decoys:
      - "La supprimer et la recréer : Terraform ne gère que ce qu'il a créé lui-même"
      - "Ajouter son identifiant dans un commentaire du fichier HCL qui la concerne"
    why: "L'import relie la ressource réelle à un bloc de configuration dans le fichier d'état ; Terraform la gère ensuite comme les autres."
  - id: backend-s3
    prompt: "Quel backend d'état distant est courant sur AWS ?"
    answer: "Un bucket S3, avec un verrou (historiquement une table DynamoDB)"
    decoys:
      - "Un dépôt Git, avec un commit du fichier d'état à chaque apply"
      - "Un volume EBS attaché à la machine de chaque développeur"
    why: "S3 stocke l'état chiffré et partagé ; le verrou empêche deux apply simultanés. Versionner l'état dans Git expose ses secrets et ne verrouille rien."
  - id: langage-des-providers
    prompt: "Dans quel langage écrit-on généralement un provider Terraform ?"
    answer: "Go"
    decoys:
      - "HCL"
      - "Python"
    why: "Les providers sont des plugins compilés écrits en Go, comme Terraform lui-même. HCL sert à décrire les ressources, pas à écrire les providers."
  - id: count-et-for-each
    prompt: "Comment créer plusieurs instances similaires d'une ressource sans dupliquer le bloc ?"
    answer: "Avec les méta-arguments count ou for_each"
    decoys:
      - "Avec l'option terraform apply -repeat=N"
      - "En lançant apply plusieurs fois de suite"
    why: "count crée N copies numérotées, for_each une copie par élément d'une liste ou d'une map. Relancer apply ne crée rien de plus : l'état est déjà atteint."
  - id: prevent-destroy
    prompt: "À quoi sert prevent_destroy dans un bloc lifecycle ?"
    answer: "Faire échouer tout plan qui détruirait la ressource, comme une base de production"
    decoys:
      - "Sauvegarder la ressource avant chaque destruction, puis la restaurer automatiquement"
      - "Empêcher les modifications manuelles de la ressource dans la console du cloud"
    why: "C'est un garde-fou côté Terraform uniquement : il bloque le plan, mais ne sauvegarde rien et n'empêche pas d'agir dans la console."
  - id: remplacement
    prompt: "Pourquoi relire attentivement un plan qui annonce qu'une ressource « must be replaced » ?"
    answer: "Terraform va la détruire puis la recréer : une base peut y perdre ses données"
    decoys:
      - "La ressource sera seulement renommée chez le provider, sans aucune interruption"
      - "Le provider doit d'abord être mis à jour, sinon l'apply échouera à coup sûr"
    why: "Certains attributs ne se modifient pas en place : changer l'un d'eux impose un remplacement, à repérer avant d'appliquer."
  - id: sensitive
    prompt: "Un mot de passe marqué sensitive dans Terraform est-il absent du fichier d'état ?"
    answer: "Non : sensitive le masque dans l'affichage, mais il reste en clair dans l'état"
    decoys:
      - "Oui : sensitive l'exclut totalement du fichier d'état et de l'affichage du plan"
      - "Oui : il est chiffré dans l'état avec une clé fournie par le provider du cloud"
    why: "D'où la règle de la fiche : l'état contient des informations sensibles et doit être stocké à distance, chiffré, avec un accès restreint."
  - id: portabilite-entre-clouds
    prompt: "Une configuration Terraform écrite pour AWS se déploie-t-elle telle quelle sur Azure ?"
    answer: "Non : les ressources sont propres à chaque provider ; seuls l'outil et le langage sont communs"
    decoys:
      - "Oui : Terraform traduit automatiquement chaque ressource d'un cloud vers son équivalent"
      - "Oui, à condition de changer la région et les identifiants de connexion du provider"
    why: "Une ressource aws_instance n'a pas de sens pour Azure : il faut réécrire la configuration avec les ressources du provider azurerm."
  - id: fichier-de-verrouillage
    prompt: "À quoi sert le fichier .terraform.lock.hcl ?"
    answer: "Figer les versions des providers choisies, pour que toute l'équipe utilise les mêmes"
    decoys:
      - "Verrouiller l'état pendant un apply, pour empêcher deux modifications simultanées"
      - "Lister les ressources que Terraform n'a pas le droit de modifier ni de supprimer"
    why: "Ce fichier, créé par init et versionné avec le code, fixe les versions des providers. Le verrou pendant un apply, lui, est porté par le backend d'état."
---
