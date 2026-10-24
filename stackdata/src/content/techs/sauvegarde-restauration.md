---
name: Sauvegarde et restauration
kind: concept
layers: []
tags: [standard]
difficulty: 2
summary: "Pouvoir retrouver ses données après une erreur, une panne ou une attaque : sauvegardes logiques ou physiques, restauration à un instant précis, objectifs RPO et RTO, restaurations testées."
integratesWith:
  - tech: postgresql
    note: "pg_dump pour une sauvegarde logique, pg_basebackup et l'archivage du journal (WAL) pour une restauration à un instant précis."
  - tech: aws-s3
    note: "Stockage courant des sauvegardes, hors du serveur de base, avec versionnement et règles de conservation."
---

## Problème résolu

Un développeur lance un `DELETE` sans `WHERE` en production. Un disque meurt. Un rançongiciel chiffre le serveur. La réplication ne sauve pas de ces situations : l'erreur ou la corruption se recopient. Seule une **sauvegarde**, stockée ailleurs et **restaurable**, permet de revenir en arrière.

### Deux familles de sauvegardes

- **Logique** (un *dump*) : la base est exportée sous forme de commandes SQL ou d'un format propre à l'outil (`pg_dump` pour PostgreSQL, `mysqldump` pour MySQL). Portable d'une version à l'autre, on peut n'en restaurer qu'une table. Mais l'export et surtout la restauration sont lents sur une grosse base.
- **Physique** : une copie des fichiers de données de la base (`pg_basebackup` pour PostgreSQL, instantanés de disque). Bien plus rapide à restaurer sur de gros volumes, mais liée à la version du moteur et restaurée en bloc.

On distingue aussi la sauvegarde **complète** (tout) et la sauvegarde **incrémentale** (ce qui a changé depuis la dernière), plus rapide et moins volumineuse, mais qui demande toute la chaîne pour restaurer.

### Restaurer à un instant précis

Une sauvegarde de la nuit fait perdre tout ce qui a été écrit depuis. La **restauration à un instant précis** (*point-in-time recovery*, PITR) combine une sauvegarde physique et l'**archivage continu du journal** de transactions : on restaure la sauvegarde, puis on rejoue le journal jusqu'à la minute qui précède l'erreur. Les services managés (Amazon RDS, Cloud SQL, Azure SQL) le proposent sur une période de conservation.

### RPO et RTO : ce qu'on accepte de perdre

- **RPO** (*Recovery Point Objective*) : la quantité maximale de données qu'on accepte de perdre, exprimée en temps. Une sauvegarde par nuit, c'est jusqu'à une journée de perte ; l'archivage continu du journal réduit le RPO à quelques minutes ou moins.
- **RTO** (*Recovery Time Objective*) : la durée maximale d'interruption acceptable avant que le service soit rétabli. Restaurer un gros dump peut prendre des heures ; une réplique prête à basculer, quelques minutes.

Ces deux objectifs se fixent **avec le métier**, et ils déterminent la stratégie (et son coût).

### La règle 3-2-1

Une règle classique : **3** copies des données, sur **2** supports différents, dont **1** hors site. Contre les rançongiciels, on ajoute une copie **immuable** ou hors ligne, que l'attaquant ne peut ni chiffrer ni supprimer avec les accès du serveur.

## Quand l'utiliser

- Toujours, pour toute base qui contient des données qu'on ne peut pas recréer.
- Archivage du journal et PITR dès que perdre une journée de données est inacceptable.
- Avant une opération risquée (migration de schéma, montée de version) : une sauvegarde juste avant, dont on sait qu'elle se restaure.

## Quand l'éviter

Les sauvegardes ne s'évitent pas, mais certaines pratiques donnent une fausse sécurité :

- **Ne jamais tester la restauration** : une sauvegarde jamais restaurée est une hypothèse, pas une garantie (fichier corrompu, chaîne incomplète, procédure inconnue). On restaure régulièrement, sur un serveur de test, en mesurant le temps réel.
- **Garder la sauvegarde sur le même serveur ou le même compte** que la base : la panne ou l'attaque emporte les deux.
- **Compter sur la réplication** comme sauvegarde : l'erreur est répliquée.
- **Sauvegardes non chiffrées** contenant des données personnelles, ou conservées sans limite : elles posent les mêmes questions de sécurité et de conformité que la base.
- Des dumps logiques seuls sur une très grosse base qui doit redémarrer vite : le RTO ne sera pas tenu.

## Pour aller plus loin

- [Documentation de PostgreSQL : sauvegarde et restauration](https://www.postgresql.org/docs/current/backup.html)
- [Documentation de PostgreSQL : archivage continu et PITR](https://www.postgresql.org/docs/current/continuous-archiving.html)
- [Documentation de MySQL : sauvegarde et restauration](https://dev.mysql.com/doc/refman/8.4/en/backup-and-recovery.html)
