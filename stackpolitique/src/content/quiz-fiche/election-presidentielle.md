---
questions:
  - id: premiere-directe
    prompt: "En quelle année a eu lieu la première présidentielle au suffrage universel direct ?"
    answer: "1965"
    decoys:
      - "1958"
      - "1962"
      - "1969"
    why: "La révision date de 1962 ; la première élection directe, de 1965."

  - id: parrainages-nombre
    prompt: "Combien de parrainages d'élus faut-il pour être candidat ?"
    answer: "500"
    decoys:
      - "100"
      - "1 000"
      - "50"
    why: "500 parrainages ; 100 suffisaient lors des trois premières élections."

  - id: parrainages-repartition
    prompt: "Quelle règle de répartition s'applique aux 500 parrainages ?"
    answer: "Au moins 30 départements, et pas plus de 50 signatures d'un même département"
    decoys:
      - "Au moins un parrain dans chacune des 13 régions de métropole et d'outre-mer"
      - "Au moins 100 maires de communes de plus de 10 000 habitants, partout en France"
      - "Aucune règle : les 500 signatures peuvent venir d'un seul département"
    why: "Les signatures doivent venir d'au moins 30 départements ou collectivités d'outre-mer, et pas plus d'un dixième d'un même département."

  - id: parrains-qui
    prompt: "Qui peut parrainer un candidat à la présidentielle ?"
    answer: "Des élus : maires, parlementaires, conseillers départementaux et régionaux…"
    decoys:
      - "Tout citoyen inscrit sur les listes électorales, par une signature en ligne"
      - "Les adhérents des partis politiques, à raison d'une signature par parti"
      - "Les membres du Conseil constitutionnel et du Conseil d'État"
    why: "Les parrainages sont des signatures d'élus ; aucun parrainage citoyen n'est prévu aujourd'hui."

  - id: parrainages-qui-recoit
    prompt: "Qui reçoit et vérifie les parrainages ?"
    answer: "Le Conseil constitutionnel"
    decoys:
      - "Le ministère de l'Intérieur, par l'intermédiaire des préfectures"
      - "La Commission nationale des comptes de campagne"
      - "Le président du Sénat, en tant que représentant des élus locaux"
    why: "Le Conseil constitutionnel reçoit les parrainages, les vérifie et publie le nom des parrains."

  - id: parrains-publics
    prompt: "Depuis quand la liste complète des parrains est-elle publique ?"
    answer: "Depuis 2016"
    decoys:
      - "Depuis 1965"
      - "Depuis 1981"
      - "Elle n'est pas publique"
    why: "Le nom des parrains est entièrement publié depuis 2016."

  - id: seuil-releve
    prompt: "Pourquoi le seuil de parrainages est-il passé de 100 à 500 ?"
    answer: "Pour freiner la multiplication des candidatures"
    decoys:
      - "Parce que le nombre d'élus locaux avait été multiplié par cinq"
      - "Pour se conformer à une directive européenne"
      - "Parce que le Conseil constitutionnel l'avait exigé en 1971"
    why: "Le seuil a été relevé face à la hausse du nombre de candidats."

  - id: premier-tour
    prompt: "Que faut-il pour être élu dès le premier tour ?"
    answer: "La majorité absolue des suffrages exprimés"
    decoys:
      - "Arriver en tête avec au moins 25 % des inscrits"
      - "Obtenir au moins 40 % des voix et dix points d'avance sur le deuxième"
      - "Arriver en tête dans plus de la moitié des départements"
    why: "La majorité absolue des exprimés ; le seuil de 25 % des inscrits concerne les législatives."

  - id: jamais-premier-tour
    prompt: "Un président a-t-il déjà été élu dès le premier tour ?"
    answer: "Non, jamais"
    decoys:
      - "Oui, le général de Gaulle en 1965"
      - "Oui, Jacques Chirac en 2002"
      - "Oui, deux fois depuis 1965"
    why: "Il y a toujours eu un second tour, y compris pour de Gaulle en 1965."

  - id: second-tour
    prompt: "Qui peut se présenter au second tour ?"
    answer: "Les deux candidats arrivés en tête, après d'éventuels retraits"
    decoys:
      - "Tous ceux qui ont obtenu au moins 12,5 % des inscrits"
      - "Les trois premiers, s'ils ont tous plus de 15 % des voix"
      - "Le premier seul, si son avance dépasse dix points"
    why: "Seuls les deux premiers restent ; les triangulaires n'existent qu'aux législatives."

  - id: delai
    prompt: "Combien de temps sépare les deux tours ?"
    answer: "Deux semaines"
    decoys:
      - "Une semaine, comme aux législatives"
      - "Un mois"
      - "Trois jours"
    why: "Le second tour a lieu deux semaines après le premier."

  - id: campagne
    prompt: "Quelle règle encadre la campagne officielle dans les médias ?"
    answer: "L'égalité du temps de parole entre les candidats"
    decoys:
      - "Un temps de parole proportionnel au score de chaque parti aux législatives"
      - "L'interdiction de tout débat télévisé entre les deux tours"
      - "Un temps de parole réservé aux candidats qui ont un groupe à l'Assemblée"
    why: "Pendant la campagne officielle, le temps de parole est égal entre les candidats."

  - id: remboursement
    prompt: "Quel seuil change fortement le remboursement des dépenses de campagne ?"
    answer: "5 % des voix"
    decoys:
      - "12,5 % des inscrits"
      - "La qualification pour le second tour"
      - "500 parrainages supplémentaires"
    why: "Les candidats qui dépassent 5 % des voix sont remboursés d'une part bien plus importante de leurs dépenses."

  - id: 21-avril
    prompt: "Que s'est-il passé le 21 avril 2002 ?"
    answer: "Jean-Marie Le Pen s'est qualifié au second tour, éliminant Lionel Jospin"
    decoys:
      - "Lionel Jospin a battu Jacques Chirac au premier tour avec plus de 30 % des voix"
      - "Jacques Chirac a été réélu dès le premier tour, une première sous la Ve"
      - "La présidentielle a été annulée par le Conseil constitutionnel"
    why: "Le candidat du Front national élimine le Premier ministre socialiste : le « séisme » du 21 avril."

  - id: chirac-2002
    prompt: "Avec quel score Jacques Chirac est-il réélu le 5 mai 2002 ?"
    answer: "82,21 %"
    decoys:
      - "53,06 %"
      - "66,10 %"
      - "58,55 %"
    why: "Chirac l'emporte avec 82,21 % face à Jean-Marie Le Pen, porté par un large front républicain."

  - id: candidats-2002
    prompt: "Combien de candidats se sont présentés au premier tour de 2002 ?"
    answer: "Seize"
    decoys:
      - "Huit"
      - "Douze"
      - "Vingt"
    why: "Seize candidats en 2002, ce qui a nourri le débat sur la dispersion des voix."

  - id: macron-le-pen
    prompt: "Qu'ont en commun les présidentielles de 2017 et de 2022 ?"
    answer: "Un second tour Macron contre Marine Le Pen, sans PS ni LR"
    decoys:
      - "Un second tour entre un candidat PS et un candidat LR, comme avant 2002"
      - "Une victoire de Marine Le Pen au premier tour, puis une défaite au second"
      - "Un président élu dès le premier tour"
    why: "Les candidats du PS et de LR sont éliminés dès le premier tour, et Macron bat Marine Le Pen au second."

  - id: dates-2027
    prompt: "Quelles sont les dates de la présidentielle de 2027 ?"
    answer: "Le 18 avril et le 2 mai 2027"
    decoys:
      - "Le 11 et le 25 avril 2027"
      - "Le 25 avril et le 9 mai 2027"
      - "Le 4 et le 18 avril 2027"
    why: "Dates fixées en Conseil des ministres le 1er juillet 2026."

  - id: calendrier-regle
    prompt: "Quand l'élection doit-elle avoir lieu par rapport à la fin du mandat en cours ?"
    answer: "Entre 20 et 35 jours avant"
    decoys:
      - "Le jour même de la fin du mandat"
      - "Au moins trois mois avant"
      - "Dans les 15 jours qui suivent"
    why: "La Constitution impose un scrutin entre 20 et 35 jours avant la fin du mandat."

  - id: parrainage-soutien
    prompt: "Un parrainage vaut-il soutien politique au candidat ?"
    answer: "Pas forcément : un élu peut parrainer pour permettre une candidature"
    decoys:
      - "Oui : le parrain s'engage à faire campagne pour le candidat"
      - "Oui : le parrain doit voter pour lui, sous peine de sanction"
      - "Non, car les parrainages sont secrets et anonymes"
    why: "Un élu peut parrainer sans soutenir ; le débat revient parce que les noms des parrains sont publics."
---
