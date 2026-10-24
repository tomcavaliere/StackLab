---
questions:
  - id: nombre-circonscriptions
    prompt: "Combien de circonscriptions compte l'élection des députés ?"
    answer: "577"
    decoys:
      - "101"
      - "348"
      - "81"
    why: "Une circonscription par député, soit 577."

  - id: etranger
    prompt: "Combien de circonscriptions sont réservées aux Français établis à l'étranger ?"
    answer: "11"
    decoys:
      - "1"
      - "5"
      - "27"
    why: "11 circonscriptions pour les Français de l'étranger."

  - id: suppleant
    prompt: "Quel est le rôle du suppléant d'un député ?"
    answer: "Le remplacer s'il devient ministre ou quitte son siège"
    decoys:
      - "Voter à sa place lorsqu'il est absent de la séance"
      - "Le représenter dans les réunions du conseil municipal"
      - "Siéger au Sénat pendant la durée de son mandat"
    why: "Chaque candidat se présente avec un suppléant qui prend le siège en cas de départ (par exemple pour un ministère)."

  - id: scrutin
    prompt: "Quel est le mode de scrutin des législatives ?"
    answer: "Uninominal majoritaire à deux tours"
    decoys:
      - "Proportionnel de liste à un tour, avec un seuil de 5 %"
      - "Majoritaire à un seul tour, comme au Royaume-Uni"
      - "Indirect, par un collège de grands électeurs"
    why: "Un député par circonscription, élu au scrutin majoritaire à deux tours ; la proportionnelle de liste est celle des européennes."

  - id: premier-tour
    prompt: "Que faut-il pour être élu député dès le premier tour ?"
    answer: "Plus de 50 % des exprimés et au moins 25 % des inscrits"
    decoys:
      - "Arriver en tête avec plus de 12,5 % des inscrits"
      - "Plus de 50 % des inscrits, abstentionnistes compris"
      - "Plus de 40 % des exprimés et dix points d'avance"
    why: "Les deux conditions sont cumulatives : majorité absolue des exprimés et 25 % des inscrits."

  - id: seuil-second-tour
    prompt: "Quel seuil faut-il atteindre pour se qualifier au second tour ?"
    answer: "12,5 % des électeurs inscrits"
    decoys:
      - "12,5 % des suffrages exprimés"
      - "5 % des suffrages exprimés, comme aux européennes"
      - "25 % des électeurs inscrits"
    why: "Le seuil se calcule en inscrits, pas en suffrages exprimés."

  - id: deux-premiers
    prompt: "Que se passe-t-il si un seul candidat, ou aucun, atteint 12,5 % des inscrits ?"
    answer: "Les deux premiers peuvent se maintenir"
    decoys:
      - "Le premier est élu sans second tour"
      - "L'élection est annulée et organisée de nouveau un mois plus tard"
      - "Le préfet désigne les candidats du second tour"
    why: "Il y a toujours au moins deux candidats possibles au second tour."

  - id: second-tour-majorite
    prompt: "Quelle majorité faut-il pour être élu au second tour ?"
    answer: "La majorité relative : arriver en tête"
    decoys:
      - "La majorité absolue des suffrages exprimés"
      - "Au moins 25 % des inscrits, comme au premier tour"
      - "La majorité absolue des inscrits"
    why: "Au second tour, le premier est élu ; c'est ce qui rend les triangulaires décisives."

  - id: triangulaire
    prompt: "Qu'est-ce qu'une triangulaire ?"
    answer: "Un second tour avec trois candidats"
    decoys:
      - "Une alliance de trois partis pour un même candidat"
      - "Un premier tour où trois candidats sont à égalité"
      - "Une élection partielle organisée dans trois circonscriptions"
    why: "Trois candidats qualifiés au second tour ; avec quatre, c'est une quadrangulaire."

  - id: participation
    prompt: "Pourquoi une forte participation multiplie-t-elle les triangulaires ?"
    answer: "Le seuil est en inscrits : il est plus facile à atteindre en part des voix"
    decoys:
      - "Parce que la loi abaisse le seuil quand la participation dépasse 60 %"
      - "Parce que les électeurs votent alors pour plus de trois candidats"
      - "Parce que les préfets qualifient d'office un troisième candidat"
    why: "Plus il y a de votants, plus 12,5 % des inscrits représente une petite part des suffrages exprimés."

  - id: desistement
    prompt: "Qu'est-ce qu'un désistement ?"
    answer: "Le retrait d'un candidat qualifié, souvent pour ne pas diviser les voix"
    decoys:
      - "L'annulation d'une élection par le Conseil constitutionnel"
      - "La démission d'un député en cours de mandat"
      - "Le refus d'un parti d'investir un candidat sortant"
    why: "Un candidat qualifié peut se retirer, souvent face à un adversaire commun."

  - id: calendrier
    prompt: "De 2002 à 2022, quand avaient lieu les législatives ?"
    answer: "Quelques semaines après la présidentielle"
    decoys:
      - "Deux ans et demi après la présidentielle, à mi-mandat"
      - "Le même jour que la présidentielle"
      - "Un an avant la présidentielle"
    why: "Depuis l'inversion du calendrier, elles suivaient la présidentielle, jusqu'à la dissolution de 2024."

  - id: majorite-2022
    prompt: "Qu'a eu de particulier le résultat de 2022 ?"
    answer: "Le camp présidentiel n'a eu qu'une majorité relative, une première depuis 1988"
    decoys:
      - "Le RN a obtenu la majorité absolue pour la première fois"
      - "La gauche unie a obtenu la majorité absolue"
      - "Aucun député du camp présidentiel n'a été élu au premier tour"
    why: "En 2022, Ensemble arrive en tête sans majorité absolue, ce qui n'était pas arrivé depuis 1988."

  - id: amplification
    prompt: "Quel effet a le scrutin majoritaire sur la répartition des sièges ?"
    answer: "Il amplifie les écarts et pousse aux alliances"
    decoys:
      - "Il donne à chaque parti une part des sièges égale à sa part des voix"
      - "Il favorise les petits partis isolés"
      - "Il garantit la majorité absolue au parti arrivé en tête"
    why: "Un parti en tête dans beaucoup de circonscriptions gagne bien plus de sièges que sa part des voix."

  - id: proportionnelle-1986
    prompt: "Quand la France a-t-elle élu ses députés à la proportionnelle sous la Ve République ?"
    answer: "Une seule fois, en 1986"
    decoys:
      - "À chaque élection jusqu'en 1981"
      - "Jamais, la Constitution l'interdit"
      - "En 1986 et en 2024"
    why: "La proportionnelle n'a été utilisée qu'en 1986 ; le débat sur son retour revient régulièrement."

  - id: dissolution-2024
    prompt: "Quand le président a-t-il dissous l'Assemblée en 2024 ?"
    answer: "Le 9 juin 2024, après les européennes"
    decoys:
      - "Le 7 juillet 2024, au soir du second tour"
      - "Le 4 décembre 2024, après la censure du gouvernement Barnier"
      - "Le 14 juillet 2024, lors de la fête nationale"
    why: "La dissolution est annoncée le 9 juin 2024, au soir des européennes."

  - id: premier-tour-2024
    prompt: "Qui arrive en tête des voix au premier tour des législatives de 2024 ?"
    answer: "Le RN et ses alliés"
    decoys:
      - "Le Nouveau Front populaire"
      - "Le camp présidentiel (Ensemble)"
      - "Les Républicains"
    why: "Le RN et ses alliés arrivent en tête des voix le 30 juin 2024."

  - id: front-republicain-2024
    prompt: "Qui s'est désisté entre les deux tours de 2024 pour faire barrage au RN ?"
    answer: "Presque tous les candidats de gauche arrivés troisièmes, et beaucoup du camp présidentiel"
    decoys:
      - "Uniquement les candidats du camp présidentiel, la gauche ayant refusé"
      - "Les candidats du RN arrivés troisièmes, au profit de LR"
      - "Aucun candidat : les triangulaires ont toutes eu lieu"
    why: "Les désistements de gauche ont été presque systématiques, ceux du camp présidentiel nombreux."

  - id: resultat-2024
    prompt: "Quel bloc arrive en tête en sièges au second tour de 2024 ?"
    answer: "Le Nouveau Front populaire, sans majorité absolue"
    decoys:
      - "Le RN et ses alliés, avec la majorité absolue"
      - "Le camp présidentiel, avec la majorité absolue"
      - "Les Républicains, grâce aux désistements"
    why: "Le NFP arrive en tête, devant Ensemble puis le RN et ses alliés ; aucun bloc n'a la majorité absolue."

  - id: rn-2022
    prompt: "Combien de députés le RN avait-il en 2022 ?"
    answer: "89"
    decoys:
      - "8"
      - "143"
      - "289"
    why: "Le RN avait 89 députés en 2022 et progresse fortement en 2024."
---
