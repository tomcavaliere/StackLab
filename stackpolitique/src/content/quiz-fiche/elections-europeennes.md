---
questions:
  - id: frequence
    prompt: "Tous les combien les élections européennes ont-elles lieu ?"
    answer: "Tous les cinq ans"
    decoys:
      - "Tous les quatre ans"
      - "Tous les six ans"
      - "Tous les sept ans"
    why: "Le Parlement européen est élu tous les cinq ans."

  - id: sieges-france
    prompt: "Combien de députés européens la France élit-elle ?"
    answer: "81"
    decoys:
      - "577"
      - "720"
      - "60"
    why: "81 depuis 2024 ; 720 est le total du Parlement européen."

  - id: scrutin
    prompt: "Quel est le mode de scrutin des européennes en France ?"
    answer: "Proportionnel de liste à un tour"
    decoys:
      - "Uninominal majoritaire à deux tours, par circonscription"
      - "Majoritaire de liste à deux tours, comme aux municipales"
      - "Indirect, par les députés nationaux"
    why: "Chaque parti présente une liste ; les sièges sont répartis selon la part des voix."

  - id: seuil
    prompt: "Quel seuil faut-il atteindre pour avoir des élus ?"
    answer: "5 % des suffrages exprimés"
    decoys:
      - "12,5 % des électeurs inscrits"
      - "3 % des suffrages exprimés"
      - "10 % des suffrages exprimés"
    why: "Une liste sous 5 % des exprimés n'a aucun élu ; 12,5 % des inscrits est le seuil des législatives."

  - id: circonscription
    prompt: "Depuis 2019, comment la France est-elle découpée pour les européennes ?"
    answer: "En une circonscription nationale unique"
    decoys:
      - "En huit grandes circonscriptions régionales"
      - "En 101 circonscriptions départementales"
      - "En 577 circonscriptions, comme pour les législatives"
    why: "La circonscription est unique depuis 2019 ; de 2004 à 2014, il y en avait huit."

  - id: avant-2019
    prompt: "Comment la France était-elle découpée de 2004 à 2014 ?"
    answer: "En huit grandes circonscriptions"
    decoys:
      - "En une circonscription nationale unique"
      - "En 13 circonscriptions, une par région"
      - "En 27 circonscriptions, une par État membre"
    why: "Huit grandes circonscriptions de 2004 à 2014, puis une circonscription unique depuis 2019."

  - id: liste
    prompt: "Aux européennes, pour quoi vote-t-on ?"
    answer: "Pour une liste nationale entière"
    decoys:
      - "Pour un candidat de sa circonscription"
      - "Pour un parti européen, sans liste nationale"
      - "Pour la présidente de la Commission"
    why: "On vote pour une liste nationale, pas pour une personne."

  - id: proportionnelle-seule
    prompt: "Qu'a de particulier cette élection parmi les élections nationales ?"
    answer: "C'est la seule à la proportionnelle"
    decoys:
      - "C'est la seule où le vote est obligatoire"
      - "C'est la seule à deux tours"
      - "C'est la seule où les étrangers non européens votent"
    why: "La proportionnelle donne une photographie plus fidèle du poids des partis."

  - id: test-national
    prompt: "Pourquoi dit-on que les européennes servent de test national ?"
    answer: "Le vote sert aussi à sanctionner ou soutenir le pouvoir en place"
    decoys:
      - "Parce que le gouvernement doit démissionner si sa liste perd"
      - "Parce que les eurodéputés élisent le président de la République"
      - "Parce que le résultat fixe la composition du Sénat"
    why: "Avec une participation souvent faible, l'élection sert aussi de vote sur la politique nationale."

  - id: rn-2019
    prompt: "Quelle liste est arrivée en tête en 2019 ?"
    answer: "Celle du RN"
    decoys:
      - "Celle du camp présidentiel"
      - "Celle des Écologistes"
      - "Celle des Républicains"
    why: "La liste du RN est arrivée en tête en 2019, puis de nouveau en 2024."

  - id: date-2024
    prompt: "Quand ont eu lieu les européennes de 2024 en France ?"
    answer: "Le 9 juin 2024"
    decoys:
      - "Le 30 juin 2024"
      - "Le 26 mai 2024"
      - "Le 7 juillet 2024"
    why: "Le 9 juin 2024 ; le 30 juin et le 7 juillet sont les deux tours des législatives anticipées."

  - id: bardella-score
    prompt: "Quel score obtient la liste RN de Jordan Bardella en 2024 ?"
    answer: "31,37 %"
    decoys:
      - "23,34 %"
      - "14,60 %"
      - "41,45 %"
    why: "31,37 %, soit 30 sièges."

  - id: deuxieme-2024
    prompt: "Quelle liste arrive deuxième en 2024 ?"
    answer: "Celle du camp présidentiel menée par Valérie Hayer"
    decoys:
      - "Celle de PS-Place publique menée par Raphaël Glucksmann"
      - "Celle de La France insoumise menée par Manon Aubry"
      - "Celle des Républicains menée par François-Xavier Bellamy"
    why: "Ensemble (Hayer) obtient 14,60 %, juste devant PS-Place publique (Glucksmann, 13,83 %)."

  - id: glucksmann
    prompt: "Quel score obtient la liste PS-Place publique de Raphaël Glucksmann ?"
    answer: "13,83 %"
    decoys:
      - "9,89 %"
      - "5,50 %"
      - "7,25 %"
    why: "13,83 %, troisième ; 9,89 % est le score de LFI, 7,25 % celui de LR, 5,50 % celui des Écologistes."

  - id: seuil-2024
    prompt: "Lesquelles de ces listes ont eu des élus en 2024 ?"
    answer: "Les Écologistes (5,50 %) et Reconquête (5,47 %)"
    decoys:
      - "Aucune liste sous 10 % n'a eu d'élus"
      - "Seulement les trois premières listes"
      - "Toutes les listes, même sous 1 %"
    why: "Ces deux listes passent de peu le seuil de 5 % et ont des élus."

  - id: participation-2024
    prompt: "Quelle a été la participation aux européennes de 2024 ?"
    answer: "Environ 51,5 %"
    decoys:
      - "Environ 35 %"
      - "Environ 72 %"
      - "Environ 85 %"
    why: "Une participation d'environ 51,5 % des inscrits."

  - id: consequence-2024
    prompt: "Quelle conséquence immédiate a eu le résultat de 2024 ?"
    answer: "La dissolution de l'Assemblée nationale, annoncée le soir même"
    decoys:
      - "La démission du président de la République"
      - "Un référendum sur l'appartenance à l'Union européenne"
      - "La démission de la présidente de la Commission européenne"
    why: "Le soir du 9 juin 2024, Emmanuel Macron annonce la dissolution."

  - id: groupes
    prompt: "Comment les eurodéputés français siègent-ils au Parlement européen ?"
    answer: "Dans des groupes européens, avec des élus d'autres pays"
    decoys:
      - "Dans une délégation française qui vote toujours d'un seul bloc"
      - "Par ordre de leur score aux élections nationales"
      - "Dans le groupe du parti arrivé en tête en France"
    why: "Leur poids dépend aussi des alliances au sein des groupes européens."

  - id: tete-de-liste
    prompt: "Qui mène la campagne d'une liste nationale ?"
    answer: "Sa tête de liste"
    decoys:
      - "Le président du groupe européen auquel la liste adhère"
      - "Le Premier ministre, pour toutes les listes de la majorité"
      - "Le dernier de la liste, par tradition"
    why: "Avec une circonscription nationale unique, la tête de liste mène la campagne."

  - id: lfi-2024
    prompt: "Quel score obtient La France insoumise aux européennes de 2024 ?"
    answer: "9,89 %"
    decoys:
      - "13,83 %"
      - "5,47 %"
      - "31,37 %"
    why: "LFI obtient 9,89 %."
---
