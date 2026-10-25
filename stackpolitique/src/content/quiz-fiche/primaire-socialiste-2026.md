---
questions:
  - id: organisateurs
    prompt: "Quels partis organisent la primaire socialiste de 2026 ?"
    answer: "Le PS, Place publique et la Gauche républicaine et socialiste"
    decoys:
      - "Le PS, Les Écologistes et La France insoumise"
      - "Le PS, le PCF et Génération.s"
      - "Le PS seul, avec un vote réservé à ses adhérents à jour de cotisation"
    why: "Le PS organise la primaire avec Place publique, puis la GRS à partir du 26 août 2026."

  - id: origine
    prompt: "Pourquoi le PS organise-t-il sa propre primaire en 2026 ?"
    answer: "Ses adhérents ont rejeté la primaire de toute la gauche le 9 juillet"
    decoys:
      - "LFI a demandé au PS de désigner un candidat commun"
      - "Le Conseil constitutionnel impose une primaire à chaque parti"
      - "Olivier Faure voulait une primaire limitée aux socialistes"
    why: "Le 9 juillet 2026, les adhérents rejettent à 55,5 % la primaire ouverte défendue par Olivier Faure."

  - id: score-juillet
    prompt: "Avec quel score les adhérents du PS rejettent-ils la primaire de toute la gauche ?"
    answer: "55,5 %"
    decoys:
      - "51,15 %"
      - "66,17 %"
      - "83 %"
    why: "Le 9 juillet 2026, 55,5 % des votants choisissent une primaire réservée au « pôle socialiste »."

  - id: grs
    prompt: "Quand la Gauche républicaine et socialiste rejoint-elle la primaire ?"
    answer: "Le 26 août 2026"
    decoys:
      - "Le 9 juillet 2026"
      - "Le 11 octobre 2026"
      - "Le 15 novembre 2025"
    why: "La GRS rejoint la primaire le 26 août 2026 ; son candidat est Emmanuel Maurel."

  - id: qui-vote
    prompt: "Qui peut voter à la primaire socialiste de 2026 ?"
    answer: "Les adhérents des trois partis et les donateurs d'au moins 15 €"
    decoys:
      - "Tous les électeurs inscrits sur les listes, gratuitement"
      - "Les seuls adhérents du PS, à jour de cotisation"
      - "Les seuls parlementaires et élus locaux de gauche"
    why: "Votent les adhérents du PS, de Place publique et de la GRS, et ceux qui ont donné au moins 15 € (10 € au tarif social)."

  - id: tarif
    prompt: "Quel montant Olivier Faure, Ségolène Royal et Philippe Brun auraient-ils préféré pour voter ?"
    answer: "2 €"
    decoys:
      - "15 €"
      - "10 €"
      - "1 €"
    why: "Ils contestent le don de 15 € et auraient préféré 2 €."

  - id: mode
    prompt: "Comment vote-t-on à la primaire socialiste de 2026 ?"
    answer: "Par vote électronique"
    decoys:
      - "Dans des bureaux de vote"
      - "Par courrier"
      - "À main levée en congrès"
    why: "La primaire se fait par vote électronique, en deux tours."

  - id: glucksmann-declaration
    prompt: "Quand Raphaël Glucksmann se déclare-t-il candidat ?"
    answer: "Le 23 août 2026"
    decoys:
      - "Le 30 août 2026"
      - "Le 10 juillet 2026"
      - "Le 9 octobre 2026"
    why: "Il est candidat depuis le 23 août ; Olivier Faure depuis le 30 août."

  - id: maurel
    prompt: "Quel candidat représente la Gauche républicaine et socialiste ?"
    answer: "Emmanuel Maurel"
    decoys:
      - "Jérôme Guedj"
      - "Philippe Brun"
      - "Bernard Cazeneuve"
    why: "Emmanuel Maurel (GRS) obtient 5,92 %."

  - id: absents
    prompt: "Lequel de ces responsables ne se présente pas à la primaire et soutient Raphaël Glucksmann ?"
    answer: "Boris Vallaud"
    decoys:
      - "Ségolène Royal"
      - "Jérôme Guedj"
      - "Olivier Faure"
    why: "Anne Hidalgo, Carole Delga et Boris Vallaud ne se présentent pas et soutiennent Glucksmann."

  - id: hors-primaire
    prompt: "Quel ancien président envisage une candidature hors de la primaire ?"
    answer: "François Hollande"
    decoys:
      - "Lionel Jospin"
      - "Emmanuel Macron"
      - "Nicolas Sarkozy"
    why: "François Hollande et Bernard Cazeneuve restent en dehors de la primaire."

  - id: brun
    prompt: "Pourquoi le député Philippe Brun ne peut-il pas concourir ?"
    answer: "Il est suspendu du PS après des accusations d'une militante"
    decoys:
      - "Il n'obtient pas le nombre de parrainages requis"
      - "Il soutient finalement François Hollande"
      - "Il refuse de signer la charte de rassemblement"
    why: "Il est suspendu du PS le 16 septembre 2026, à titre conservatoire."

  - id: cyberattaque
    prompt: "Quel incident perturbe le vote, le 9 octobre 2026 ?"
    answer: "Une cyberattaque qui ralentit la plateforme de vote"
    decoys:
      - "Une panne d'électricité dans les bureaux de vote"
      - "Le retrait d'Olivier Faure la veille du scrutin"
      - "Une grève des organisateurs du vote"
    why: "Une attaque par déni de service ralentit la plateforme ; le parquet de Paris ouvre une enquête."

  - id: prolongation
    prompt: "Jusqu'à quand le vote est-il prolongé après la cyberattaque ?"
    answer: "Jusqu'au dimanche 11 octobre"
    decoys:
      - "Jusqu'au samedi 17 octobre"
      - "Jusqu'au lundi 12 octobre"
      - "Jusqu'au vendredi 16 octobre"
    why: "Le vote est prolongé jusqu'au 11 octobre à 18 heures."

  - id: vainqueur
    prompt: "Qui remporte la primaire socialiste de 2026 ?"
    answer: "Raphaël Glucksmann"
    decoys:
      - "Olivier Faure"
      - "Ségolène Royal"
      - "Jérôme Guedj"
    why: "Raphaël Glucksmann l'emporte dès le premier tour, le 11 octobre 2026."

  - id: score
    prompt: "Avec quel score Raphaël Glucksmann remporte-t-il la primaire ?"
    answer: "66,17 %"
    decoys:
      - "51,15 %"
      - "55,5 %"
      - "48,85 %"
    why: "Il obtient 66,17 % (79 613 voix) dès le premier tour."

  - id: faure-score
    prompt: "Quel score obtient Olivier Faure à la primaire ?"
    answer: "14,46 %, deuxième"
    decoys:
      - "33,8 %, deuxième"
      - "7,62 %, troisième"
      - "5,83 %, cinquième"
    why: "Olivier Faure arrive deuxième avec 14,46 %, devant Ségolène Royal (7,62 %)."

  - id: second-tour
    prompt: "Pourquoi le second tour prévu les 16 et 17 octobre n'a-t-il pas lieu ?"
    answer: "Raphaël Glucksmann a plus de la moitié des voix au premier tour"
    decoys:
      - "Olivier Faure se retire entre les deux tours"
      - "La justice annule le scrutin après la cyberattaque"
      - "Les trois partis décident de désigner leur candidat lors d'un congrès commun"
    why: "Avec 66,17 %, Glucksmann est élu dès le premier tour."

  - id: premiere-1965
    prompt: "Qu'a d'inédit la désignation de Raphaël Glucksmann pour le PS ?"
    answer: "Le PS n'a pas de candidat issu de ses rangs, une première depuis 1965"
    decoys:
      - "C'est la première primaire jamais organisée par le PS"
      - "Il est le premier candidat du PS désigné par un congrès"
      - "C'est la première fois que le PS soutient un candidat issu des Écologistes"
    why: "C'est la sixième primaire du PS depuis 1995 ; mais pour la première fois depuis 1965, le candidat n'est pas socialiste."

  - id: tondelier
    prompt: "Que reproche Marine Tondelier à Raphaël Glucksmann après sa victoire ?"
    answer: "De « faire le choix du repli » en refusant une alliance large"
    decoys:
      - "D'avoir triché lors du vote électronique"
      - "De s'être allié à La France insoumise"
      - "D'avoir abandonné la défense de l'Ukraine face à la Russie de Poutine"
    why: "La secrétaire nationale des Écologistes lui reproche de « faire le choix du repli »."
---
