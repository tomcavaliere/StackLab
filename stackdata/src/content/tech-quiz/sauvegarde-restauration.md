---
questions:
  - id: probleme
    prompt: "Un DELETE sans WHERE vient de vider une table de production. Qu'est-ce qui permet de revenir en arrière ?"
    answer: "Une sauvegarde stockée ailleurs et restaurable"
    decoys:
      - "Une réplique synchrone, qui a gardé l'ancienne version des lignes"
      - "Un index sur la table, qui conserve les valeurs supprimées"
    why: "La réplication recopie l'erreur sur toutes les copies. Seule une sauvegarde permet de revenir avant."
  - id: logique
    prompt: "Qu'est-ce qu'une sauvegarde logique (un dump) ?"
    answer: "Un export de la base sous forme de commandes SQL ou d'un format propre à l'outil"
    decoys:
      - "Une copie des fichiers de données du serveur, telle qu'ils sont sur le disque"
      - "Un instantané du disque entier pris par le fournisseur cloud"
    why: "pg_dump ou mysqldump exportent le contenu. La copie des fichiers, c'est une sauvegarde physique."
  - id: logique-outils
    prompt: "Quels outils produisent une sauvegarde logique ?"
    answer: "pg_dump pour PostgreSQL, mysqldump pour MySQL"
    decoys:
      - "pg_basebackup pour PostgreSQL, instantanés de disque pour MySQL"
      - "EXPLAIN pour PostgreSQL, binlog pour MySQL"
    why: "pg_basebackup produit une sauvegarde physique."
  - id: logique-avantages
    prompt: "Quel est l'avantage d'une sauvegarde logique ?"
    answer: "Portable d'une version à l'autre, et on peut n'en restaurer qu'une table"
    decoys:
      - "La restauration la plus rapide possible, même sur une très grosse base"
      - "Elle n'a jamais besoin d'être testée, puisqu'elle est écrite en SQL lisible"
    why: "Le dump est souple, mais son export et surtout sa restauration sont lents sur un gros volume."
  - id: logique-limite
    prompt: "Quelle limite a un dump logique sur une très grosse base ?"
    answer: "L'export et surtout la restauration sont lents"
    decoys:
      - "Il ne peut contenir ni les index ni les contraintes des tables"
      - "Il ne fonctionne que sur des tables vides"
    why: "Recréer toutes les lignes et les index prend du temps : le RTO peut ne pas être tenu."
  - id: physique
    prompt: "Qu'est-ce qu'une sauvegarde physique ?"
    answer: "Une copie des fichiers de données de la base"
    decoys:
      - "Un export de la base en commandes SQL, table par table"
      - "Une impression papier des tables"
    why: "pg_basebackup ou un instantané de disque : rapide à restaurer, mais liée à la version du moteur."
  - id: physique-avantage
    prompt: "Pourquoi choisir une sauvegarde physique pour une grosse base ?"
    answer: "Elle se restaure bien plus vite qu'un dump logique"
    decoys:
      - "Elle permet de restaurer une seule ligne d'une table"
      - "Elle se restaure sur n'importe quelle version du moteur"
    why: "Recopier des fichiers va plus vite que rejouer des millions d'INSERT. En contrepartie, elle se restaure en bloc."
  - id: incrementale
    prompt: "Qu'est-ce qu'une sauvegarde incrémentale ?"
    answer: "Une sauvegarde de ce qui a changé depuis la précédente"
    decoys:
      - "Une sauvegarde complète faite plusieurs fois par jour"
      - "Une sauvegarde qui supprime l'ancienne à chaque passage"
    why: "Plus rapide et moins volumineuse, mais la restauration demande toute la chaîne depuis la dernière complète."
  - id: pitr
    prompt: "Qu'est-ce que la restauration à un instant précis (PITR) ?"
    answer: "Restaurer une sauvegarde physique puis rejouer le journal jusqu'à la minute choisie"
    decoys:
      - "Restaurer chaque soir la base de la veille sur un serveur de test, sans rejouer le journal"
      - "Choisir quelles tables restaurer dans un dump logique, en ignorant les autres"
    why: "On revient juste avant l'erreur, au lieu de perdre tout ce qui a été écrit depuis la dernière sauvegarde."
  - id: pitr-prerequis
    prompt: "De quoi a-t-on besoin pour restaurer à un instant précis ?"
    answer: "D'une sauvegarde physique et de l'archivage continu du journal"
    decoys:
      - "D'un dump logique par heure, conservé sur le même serveur"
      - "D'une réplique synchrone"
    why: "La sauvegarde donne le point de départ, le journal archivé permet d'avancer jusqu'à la minute voulue."
  - id: rpo
    prompt: "Que mesure le RPO (Recovery Point Objective) ?"
    answer: "La quantité maximale de données qu'on accepte de perdre, exprimée en temps"
    decoys:
      - "La durée maximale d'interruption acceptable avant que le service soit rétabli"
      - "Le nombre de copies de sauvegarde à conserver hors site"
    why: "La durée d'interruption acceptable, c'est le RTO."
  - id: rto
    prompt: "Que mesure le RTO (Recovery Time Objective) ?"
    answer: "La durée maximale d'interruption acceptable avant le rétablissement du service"
    decoys:
      - "La quantité maximale de données qu'on accepte de perdre, exprimée en temps"
      - "Le temps nécessaire pour faire une sauvegarde complète"
    why: "Restaurer un gros dump peut prendre des heures ; une réplique prête à basculer, quelques minutes."
  - id: rpo-nuit
    prompt: "Avec une seule sauvegarde par nuit, quel est le RPO ?"
    answer: "Jusqu'à une journée de données perdues"
    decoys:
      - "Aucune perte, puisque la sauvegarde est complète"
      - "Une minute de données perdues"
    why: "Tout ce qui est écrit entre deux sauvegardes peut être perdu. L'archivage continu du journal réduit le RPO à quelques minutes ou moins."
  - id: fixer-objectifs
    prompt: "Avec qui fixer le RPO et le RTO ?"
    answer: "Avec le métier, car ils déterminent la stratégie et son coût"
    decoys:
      - "Seul, en choisissant les valeurs par défaut de l'outil"
      - "Avec le fournisseur cloud, qui les impose dans son contrat de service"
    why: "Ce qu'on accepte de perdre et d'interrompre est une décision d'entreprise."
  - id: regle-321
    prompt: "Que dit la règle 3-2-1 ?"
    answer: "3 copies des données, sur 2 supports différents, dont 1 hors site"
    decoys:
      - "3 sauvegardes par jour, conservées 2 semaines, testées 1 fois par an"
      - "3 serveurs primaires, 2 répliques, 1 sauvegarde"
    why: "Une règle classique pour qu'aucun incident ne détruise toutes les copies à la fois."
  - id: rancongiciel
    prompt: "Comment protéger les sauvegardes contre un rançongiciel ?"
    answer: "Garder une copie immuable ou hors ligne, que l'attaquant ne peut ni chiffrer ni supprimer"
    decoys:
      - "Faire les sauvegardes plus souvent, sur le même serveur que la base"
      - "Chiffrer la base de production pour qu'elle ne puisse pas être chiffrée à nouveau"
    why: "Un attaquant qui a les accès du serveur peut détruire les sauvegardes accessibles avec ces mêmes accès."
  - id: tester
    prompt: "Pourquoi tester régulièrement la restauration ?"
    answer: "Une sauvegarde jamais restaurée est une hypothèse, pas une garantie"
    decoys:
      - "Parce que les sauvegardes s'effacent automatiquement si on ne les ouvre pas de temps en temps"
      - "Parce que tester restaure aussi la production"
    why: "Fichier corrompu, chaîne incomplète, procédure inconnue : on ne le découvre qu'en restaurant. On mesure aussi le temps réel."
  - id: meme-serveur
    prompt: "Pourquoi ne pas garder la sauvegarde sur le même serveur que la base ?"
    answer: "Une panne ou une attaque emporterait les deux"
    decoys:
      - "Parce que la base refuse de démarrer à côté d'une sauvegarde"
      - "Parce que la sauvegarde ralentit toutes les requêtes"
    why: "La sauvegarde doit vivre ailleurs : un autre serveur, un stockage objet, un autre compte."
  - id: replication
    prompt: "Une base a trois répliques. A-t-elle encore besoin de sauvegardes ?"
    answer: "Oui : une erreur ou une corruption se réplique sur toutes les copies"
    decoys:
      - "Non : trois copies à jour valent mieux qu'une sauvegarde"
      - "Non, si les répliques sont dans trois régions"
    why: "La réplication protège d'une panne de serveur, pas d'une erreur humaine ni d'une attaque."
  - id: chiffrement
    prompt: "Pourquoi chiffrer les sauvegardes qui contiennent des données personnelles ?"
    answer: "Elles posent les mêmes questions de sécurité et de conformité que la base"
    decoys:
      - "Pour qu'elles prennent moins de place sur le stockage et coûtent moins cher"
      - "Pour qu'elles se restaurent plus vite"
    why: "Une sauvegarde volée expose autant que la base elle-même ; la durée de conservation doit aussi être limitée."
  - id: avant-migration
    prompt: "Que faire juste avant une migration de schéma risquée ?"
    answer: "Une sauvegarde, dont on sait qu'elle se restaure"
    decoys:
      - "Supprimer les sauvegardes anciennes pour libérer de la place"
      - "Désactiver le journal de transactions"
    why: "Si la migration tourne mal, on revient à l'état d'avant."
  - id: s3
    prompt: "Où stocke-t-on couramment les sauvegardes, hors du serveur de base ?"
    answer: "Dans un stockage objet comme S3, avec versionnement et règles de conservation"
    decoys:
      - "Dans une table de la base elle-même, pour les retrouver facilement"
      - "Dans le cache Redis de l'application, plus rapide à relire"
    why: "Le stockage objet est durable, séparé du serveur, et garde plusieurs versions."
  - id: manage
    prompt: "Que proposent les services managés (Amazon RDS, Cloud SQL, Azure SQL) pour les sauvegardes ?"
    answer: "La restauration à un instant précis sur une période de conservation"
    decoys:
      - "Rien : les sauvegardes restent entièrement à la charge du client"
      - "Une seule sauvegarde à la création de la base, jamais mise à jour"
    why: "Ils automatisent sauvegardes et archivage du journal, ce qui permet le PITR."
  - id: quand
    prompt: "Quelles bases faut-il sauvegarder ?"
    answer: "Toute base qui contient des données qu'on ne peut pas recréer"
    decoys:
      - "Seulement les bases de plus d'un téraoctet, les autres se recréent vite"
      - "Seulement les bases sans réplique"
    why: "La taille ou la présence de répliques ne change rien : une donnée perdue l'est pour de bon."
  - id: pitr-quand
    prompt: "Quand l'archivage du journal et le PITR deviennent-ils nécessaires ?"
    answer: "Dès que perdre une journée de données est inacceptable"
    decoys:
      - "Uniquement pour les bases de test"
      - "Jamais : un dump nocturne suffit toujours, quelle que soit la base"
    why: "Le PITR ramène le RPO de la journée à quelques minutes ou moins."
  - id: dump-rto
    prompt: "Une très grosse base doit redémarrer en moins d'une heure après un incident. Des dumps logiques seuls suffisent-ils ?"
    answer: "Probablement non : leur restauration est trop lente pour tenir ce RTO"
    decoys:
      - "Oui : un dump se restaure toujours en quelques secondes"
      - "Oui, si le dump est compressé"
    why: "Sur un gros volume, il faut des sauvegardes physiques, voire une réplique prête à basculer."
  - id: restauration-partielle
    prompt: "On veut récupérer une seule table supprimée par erreur. Quelle sauvegarde est la plus pratique ?"
    answer: "Un dump logique, dont on peut n'extraire qu'une table"
    decoys:
      - "Une sauvegarde physique, qui se restaure toujours table par table"
      - "Une réplique, qui garde les tables supprimées"
    why: "La sauvegarde physique se restaure en bloc ; la réplique a reçu la suppression."
  - id: physique-version
    prompt: "Quelle contrainte a une sauvegarde physique ?"
    answer: "Elle est liée à la version du moteur et se restaure en bloc"
    decoys:
      - "Elle ne contient que la structure des tables, sans les données"
      - "Elle ne peut pas être stockée hors du serveur"
    why: "Ce sont des fichiers internes au moteur : pour changer de version majeure, un dump logique est plus souple."
  - id: mesurer
    prompt: "Lors d'un test de restauration, que faut-il mesurer en plus de la réussite ?"
    answer: "Le temps réel de restauration, à comparer au RTO"
    decoys:
      - "Le nombre de tables de la base"
      - "La vitesse du réseau de l'utilisateur qui lance la restauration"
    why: "Une restauration qui réussit en dix heures ne tient pas un RTO d'une heure."
  - id: conservation
    prompt: "Pourquoi limiter la durée de conservation des sauvegardes ?"
    answer: "Des données personnelles gardées sans limite posent un problème de conformité"
    decoys:
      - "Parce que les sauvegardes se corrompent après un mois"
      - "Parce que la loi interdit toute sauvegarde de plus d'une semaine, quelles que soient les données"
    why: "Les sauvegardes contiennent les mêmes données que la base : elles suivent les mêmes règles de conservation."
---
