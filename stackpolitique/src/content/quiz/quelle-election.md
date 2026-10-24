---
title: Quelle élection ?
description: "Présidentielle, législatives ou européennes : à quelle élection correspond chaque règle ou chaque événement ?"
questions:
  - id: proportionnelle-5
    prompt: "Proportionnelle de liste, avec un seuil de 5 % des suffrages exprimés"
    answer: elections-europeennes
    decoy: elections-legislatives
    why: "Les européennes se jouent à la proportionnelle ; les législatives au scrutin majoritaire par circonscription."

  - id: seuil-12-5
    prompt: "Il faut 12,5 % des inscrits pour se maintenir au second tour"
    answer: elections-legislatives
    decoy: election-presidentielle
    why: "À la présidentielle, seuls les deux premiers restent, quel que soit leur score."

  - id: parrainages
    prompt: "Il faut 500 parrainages d'élus pour être candidat"
    answer: election-presidentielle
    decoy: elections-legislatives
    why: "Les parrainages sont le filtre propre à la présidentielle."

  - id: triangulaires
    prompt: "Trois candidats peuvent s'affronter au second tour"
    answer: elections-legislatives
    decoy: election-presidentielle
    why: "Les triangulaires n'existent qu'aux législatives ; la présidentielle n'en a jamais."

  - id: deux-premiers
    prompt: "Seuls les deux candidats arrivés en tête restent au second tour"
    answer: election-presidentielle
    decoy: elections-legislatives
    why: "Aux législatives, tous ceux qui ont 12,5 % des inscrits peuvent se maintenir."

  - id: circonscription-unique
    prompt: "Une circonscription nationale unique, depuis 2019"
    answer: elections-europeennes
    decoy: election-presidentielle
    why: "Le choix d'une circonscription unique en 2019 concerne les européennes, élection de listes ; la présidentielle a toujours été un scrutin national pour une personne."

  - id: suppleant
    prompt: "Chaque candidat se présente avec un suppléant"
    answer: elections-legislatives
    decoy: elections-europeennes
    why: "Le suppléant remplace le député s'il devient ministre ; aux européennes, on vote pour une liste."

  - id: un-tour
    prompt: "Un seul tour de scrutin"
    answer: elections-europeennes
    decoy: elections-legislatives
    why: "Les européennes sont à un tour ; les législatives et la présidentielle à deux."

  - id: dissolution-soir
    prompt: "En 2024, son résultat a conduit à la dissolution de l'Assemblée le soir même"
    answer: elections-europeennes
    decoy: elections-legislatives
    why: "Le 9 juin 2024, au soir des européennes ; les législatives anticipées en ont été la conséquence."

  - id: 25-inscrits
    prompt: "Élu dès le premier tour avec plus de 50 % des exprimés et au moins 25 % des inscrits"
    answer: elections-legislatives
    decoy: election-presidentielle
    why: "À la présidentielle, la majorité absolue des exprimés suffit au premier tour ; aux législatives, il faut aussi 25 % des inscrits."

  - id: 21-avril
    prompt: "Le « 21 avril » 2002 et la qualification de Jean-Marie Le Pen"
    answer: election-presidentielle
    decoy: elections-europeennes
    why: "Le 21 avril 2002 est le premier tour de la présidentielle."

  - id: front-republicain-2024
    prompt: "Les désistements massifs de l'été 2024 pour faire barrage au RN"
    answer: elections-legislatives
    decoy: election-presidentielle
    why: "Entre les deux tours des législatives anticipées, les candidats arrivés troisièmes se sont retirés en masse."

  - id: seule-proportionnelle
    prompt: "La seule élection nationale à la proportionnelle"
    answer: elections-europeennes
    decoy: elections-legislatives
    why: "Les législatives n'ont été à la proportionnelle qu'une fois, en 1986."

  - id: calendrier-mandat
    prompt: "Elle doit avoir lieu entre 20 et 35 jours avant la fin du mandat en cours"
    answer: election-presidentielle
    decoy: elections-legislatives
    why: "C'est la règle constitutionnelle pour l'élection du président ; en 2027, les 18 avril et 2 mai."
---
