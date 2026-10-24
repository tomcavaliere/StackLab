---
questions:
  - id: probleme
    prompt: "Quel problème la réplication résout-elle ?"
    answer: "Une base sur un seul serveur tombe avec lui et finit par saturer en lectures"
    decoys:
      - "Une requête lente qui lit toute la table faute d'index sur la colonne filtrée, à chaque appel"
      - "Une suppression par erreur qu'on veut annuler en revenant à l'état de la veille"
    why: "La réplication tient des copies à jour sur d'autres serveurs. Revenir en arrière après une erreur, c'est le rôle des sauvegardes."
  - id: primaire
    prompt: "Dans le schéma le plus courant, quel serveur reçoit les écritures ?"
    answer: "Le primaire"
    decoys:
      - "Toutes les répliques à tour de rôle"
      - "La réplique la plus proche de l'utilisateur"
    why: "Le primaire reçoit toutes les écritures ; les répliques en reçoivent les modifications."
  - id: comment
    prompt: "Comment les répliques restent-elles à jour ?"
    answer: "Elles reçoivent en continu les modifications du primaire, en rejouant son journal"
    decoys:
      - "Elles recopient chaque nuit l'intégralité des fichiers du primaire, puis redémarrent"
      - "L'application écrit elle-même chaque donnée sur chaque serveur, l'un après l'autre"
    why: "Le journal de transactions est transmis et rejoué. PostgreSQL appelle cela la streaming replication, MySQL passe par son binlog."
  - id: failover
    prompt: "Qu'est-ce qu'une bascule (failover) ?"
    answer: "Promouvoir une réplique au rang de primaire quand le primaire tombe"
    decoys:
      - "Copier la base sur un disque externe avant une opération risquée, pour pouvoir revenir en arrière"
      - "Répartir les lectures entre toutes les répliques"
    why: "C'est ce qui donne la haute disponibilité : le service repart sur une autre machine."
  - id: lectures
    prompt: "Comment des répliques soulagent-elles le primaire ?"
    answer: "Elles servent les requêtes de lecture, comme les rapports et les pages consultées"
    decoys:
      - "Elles prennent une partie des écritures, chacune sur une partie des tables, pour diviser la charge"
      - "Elles compressent les données du primaire pour qu'il lise plus vite"
    why: "Les lectures partent sur les répliques ; les écritures restent sur le primaire."
  - id: proximite
    prompt: "Pourquoi placer une réplique dans une autre région ?"
    answer: "Être près des utilisateurs, ou survivre à la perte d'un datacenter"
    decoys:
      - "Payer moins cher le stockage, toujours moins coûteux dans une autre région du fournisseur"
      - "Écrire plus vite, puisque deux régions écrivent en parallèle"
    why: "La proximité réduit la latence des lectures ; une autre région protège d'un sinistre."
  - id: asynchrone
    prompt: "En réplication asynchrone, que se passe-t-il quand le primaire confirme une écriture ?"
    answer: "Il confirme sans attendre les répliques, qui ont un retard"
    decoys:
      - "Il attend que toutes les répliques aient écrit la donnée sur disque"
      - "Il refuse l'écriture tant qu'une réplique est en retard"
    why: "C'est rapide, mais les répliques suivent avec un décalage (le replication lag)."
  - id: asynchrone-perte
    prompt: "Quel risque fait courir la réplication asynchrone lors d'une bascule ?"
    answer: "Perdre les dernières transactions confirmées mais pas encore transmises"
    decoys:
      - "Perdre toutes les données du primaire depuis sa création"
      - "Dupliquer chaque transaction sur la nouvelle base primaire, qui les rejoue toutes deux fois"
    why: "Ce que les répliques n'avaient pas encore reçu disparaît avec le primaire."
  - id: synchrone
    prompt: "Qu'apporte la réplication synchrone, et à quel prix ?"
    answer: "Aucune perte à la bascule, mais des écritures plus lentes"
    decoys:
      - "Des écritures plus rapides, mais des pertes fréquentes à la bascule"
      - "Des lectures gratuites, sans aucun coût pour le primaire"
    why: "Le primaire attend qu'une réplique ait reçu l'écriture avant de confirmer."
  - id: synchrone-blocage
    prompt: "En réplication synchrone, que peut provoquer une réplique indisponible ?"
    answer: "Le blocage des écritures sur le primaire"
    decoys:
      - "La suppression des données de la réplique"
      - "Une bascule automatique vers cette réplique"
    why: "Si le primaire attend la confirmation d'une réplique qui ne répond plus, il ne peut plus valider."
  - id: lag
    prompt: "Un utilisateur modifie son profil puis recharge la page et voit l'ancienne version. Cause probable ?"
    answer: "La lecture a été servie par une réplique asynchrone en retard"
    decoys:
      - "Le primaire a annulé la transaction sans prévenir l'utilisateur"
      - "Le navigateur a gardé l'ancienne version en cache local"
    why: "C'est le piège du retard : la réplique n'a pas encore reçu l'écriture."
  - id: lag-solution
    prompt: "Comment éviter qu'un utilisateur ne voie pas ce qu'il vient d'écrire ?"
    answer: "Lire sur le primaire les données qui suivent une écriture"
    decoys:
      - "Ajouter un index sur la table du profil"
      - "Passer toutes les répliques en lecture seule, pour qu'elles se mettent à jour plus vite"
    why: "« Lire ce qu'on vient d'écrire » se sert depuis le primaire, qui a la donnée à jour."
  - id: pas-sauvegarde
    prompt: "Pourquoi la réplication n'est-elle pas une sauvegarde ?"
    answer: "Une suppression par erreur, une corruption ou une attaque se répliquent aussitôt"
    decoys:
      - "Parce que les répliques ne contiennent qu'une partie des tables du primaire"
      - "Parce que les répliques effacent leurs données à chaque redémarrage du serveur"
    why: "Toutes les copies reçoivent la même erreur. Seule une sauvegarde permet de revenir en arrière."
  - id: sharding
    prompt: "Quelle différence entre réplication et sharding ?"
    answer: "La réplication copie toutes les données sur chaque serveur ; le sharding les répartit"
    decoys:
      - "La réplication répartit les données entre serveurs ; le sharding les copie toutes"
      - "Aucune : ce sont deux noms pour la même technique"
    why: "Avec le sharding (partitionnement horizontal), chaque serveur n'a qu'une partie des données."
  - id: ecriture
    prompt: "Le primaire sature en écritures. Ajouter des répliques résout-il le problème ?"
    answer: "Non : les répliques ajoutent de la capacité de lecture, pas d'écriture"
    decoys:
      - "Oui : chaque réplique prend une part égale des écritures, ce qui divise la charge du primaire"
      - "Oui, à condition que les répliques soient synchrones"
    why: "Chaque réplique rejoue toutes les écritures. Il faut alléger la base, optimiser, ou partitionner."
  - id: multi-primaire
    prompt: "Quelle difficulté apporte une configuration multi-primaire ?"
    answer: "Deux serveurs peuvent modifier la même ligne en même temps : il faut résoudre les conflits"
    decoys:
      - "Les lectures deviennent impossibles tant que les deux primaires ne sont pas d'accord sur chaque ligne lue"
      - "Chaque primaire doit avoir exactement le même nombre de répliques que l'autre"
    why: "Accepter les écritures à plusieurs endroits impose une règle pour les conflits."
  - id: split-brain
    prompt: "Qu'est-ce que le split-brain ?"
    answer: "Une coupure réseau fait croire à deux serveurs qu'ils sont chacun le primaire"
    decoys:
      - "Une réplique qui contient deux versions de la même base, l'ancienne et la nouvelle, côte à côte"
      - "Un primaire qui écrit deux fois chaque transaction"
    why: "Les deux serveurs acceptent des écritures divergentes, qu'il faudra réconcilier."
  - id: postgresql
    prompt: "Comment s'appelle la réplication par le journal dans PostgreSQL ?"
    answer: "La streaming replication"
    decoys:
      - "Le binlog"
      - "Data Guard"
    why: "PostgreSQL propose aussi une réplication logique, table par table. Le binlog est celui de MySQL, Data Guard l'outil d'Oracle."
  - id: mysql
    prompt: "Sur quoi repose la réplication de MySQL ?"
    answer: "Le journal binaire (binlog)"
    decoys:
      - "Les groupes Always On"
      - "La streaming replication"
    why: "MySQL réplique via son binlog. Always On est l'outil de SQL Server."
  - id: logique
    prompt: "Que permet la réplication logique de PostgreSQL ?"
    answer: "Répliquer table par table"
    decoys:
      - "Répliquer sans aucun réseau"
      - "Répliquer vers une base NoSQL"
    why: "Contrairement à la streaming replication, qui copie toute l'instance, elle choisit les tables."
  - id: service-manage
    prompt: "Avec un service managé (Amazon RDS, Cloud SQL, Azure SQL), comment obtient-on des répliques ?"
    answer: "En quelques clics : réplique de secours et répliques en lecture"
    decoys:
      - "C'est impossible : il faut installer ses propres serveurs"
      - "En écrivant soi-même un script qui copie la base chaque heure"
    why: "Les services managés proposent la réplique de secours et les répliques en lecture comme des options."
  - id: quand
    prompt: "Dans quel cas la réplication est-elle utile ?"
    answer: "Une base de production dont l'indisponibilité coûte cher"
    decoys:
      - "Une base de test recréée chaque matin"
      - "Un prototype utilisé par une seule personne, sur son propre poste"
    why: "Une réplique prête à prendre le relais limite l'interruption."
  - id: lectures-nombreuses
    prompt: "Les lectures sont cent fois plus nombreuses que les écritures. Que proposer ?"
    answer: "Des répliques en lecture, qui absorbent cette charge"
    decoys:
      - "Un second primaire, qui prend la moitié des écritures"
      - "Désactiver le journal de transactions pour accélérer"
    why: "C'est le cas typique où les répliques en lecture soulagent le primaire."
  - id: analyse
    prompt: "Comment lancer de lourdes requêtes d'analyse sans charger la base de production ?"
    answer: "Les envoyer sur une réplique"
    decoys:
      - "Les envoyer sur le primaire la nuit"
      - "Désactiver les index pendant la requête"
    why: "Une réplique peut alimenter un autre système ou des analyses sans peser sur le primaire."
  - id: petite-appli
    prompt: "Une petite application interne sans exigence de disponibilité a-t-elle besoin de réplication ?"
    answer: "Souvent non : de bonnes sauvegardes testées suffisent"
    decoys:
      - "Oui, toujours, avec au moins trois répliques synchrones"
      - "Oui, car sans réplique la base ne peut pas démarrer"
    why: "La bascule ajoute une complexité qui ne se justifie pas sans besoin de disponibilité."
  - id: sql-server
    prompt: "Comment s'appelle la solution de réplication et de haute disponibilité de SQL Server ?"
    answer: "Les groupes de disponibilité Always On"
    decoys:
      - "La streaming replication"
      - "Le binlog"
    why: "Chaque moteur a ses outils : Always On pour SQL Server, Data Guard pour Oracle."
  - id: oracle
    prompt: "Quel outil d'Oracle tient une base de secours répliquée ?"
    answer: "Data Guard"
    decoys:
      - "PL/SQL"
      - "SSMS"
    why: "Data Guard maintient une base standby prête à basculer."
  - id: haute-dispo
    prompt: "Qu'entend-on par haute disponibilité, avec la réplication ?"
    answer: "Le service repart sur une réplique quand le primaire tombe"
    decoys:
      - "La base ne tombe jamais, quoi qu'il arrive au matériel ou au réseau"
      - "Les données sont conservées pour toujours"
    why: "La panne arrive quand même ; la bascule limite l'interruption."
  - id: multi-sans-besoin
    prompt: "Pourquoi éviter le multi-primaire sans besoin réel ?"
    answer: "Conflits et split-brain demandent une équipe qui maîtrise le sujet"
    decoys:
      - "Parce qu'il divise par deux la capacité de lecture de chaque primaire du groupe"
      - "Parce qu'il interdit les sauvegardes"
    why: "C'est puissant mais nettement plus délicat à exploiter qu'un primaire unique."
  - id: retard-nom
    prompt: "Comment appelle-t-on le décalage entre le primaire et une réplique asynchrone ?"
    answer: "Le replication lag"
    decoys:
      - "Le split-brain"
      - "Le failover"
    why: "Le retard de réplication est normal en asynchrone ; il faut le surveiller."
---
