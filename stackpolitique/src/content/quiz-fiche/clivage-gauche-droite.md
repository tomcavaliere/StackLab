---
questions:
  - id: origine-annee
    prompt: "En quelle année naît le partage entre la gauche et la droite en France ?"
    answer: "En 1789, à l'Assemblée constituante"
    decoys:
      - "En 1848, à la naissance de la IIe République"
      - "En 1905, avec la loi de séparation des Églises et de l'État"
      - "En 1958, avec la Constitution de la Ve République"
    why: "Le partage naît pendant la Révolution, à l'Assemblée constituante, à la fin de l'été 1789."

  - id: origine-debat
    prompt: "Quel débat de 1789 a fait naître la gauche et la droite ?"
    answer: "Le veto du roi sur les lois"
    decoys:
      - "L'abolition des privilèges de la noblesse"
      - "La nationalisation des biens du clergé"
      - "La déclaration de guerre à l'Autriche"
    why: "Les députés se sont répartis selon leur position sur le droit de veto du roi sur les lois votées par l'Assemblée."

  - id: cote-gauche-1789
    prompt: "En 1789, qui s'assoit à gauche du président de séance ?"
    answer: "Les adversaires du veto absolu du roi"
    decoys:
      - "Les partisans du veto absolu du roi"
      - "Les députés du clergé, regroupés par ordre"
      - "Les députés élus le plus récemment"
    why: "Les adversaires du veto absolu (Robespierre, Barnave, Pétion) se placent à gauche ; ses partisans, à droite."

  - id: robespierre
    prompt: "De quel côté de l'Assemblée Robespierre se place-t-il en 1789 ?"
    answer: "À gauche, avec les adversaires du veto absolu"
    decoys:
      - "À droite, avec les partisans du veto absolu"
      - "Au centre, entre les deux camps"
      - "Il ne siège pas : il n'est pas député"
    why: "La fiche cite Robespierre, Barnave et Pétion parmi les adversaires du veto absolu, assis à gauche."

  - id: abbe-maury
    prompt: "L'abbé Maury et Cazalès, en 1789, siègent…"
    answer: "à droite, en défenseurs du veto absolu"
    decoys:
      - "à gauche, en adversaires du veto absolu"
      - "au centre, en partisans d'un veto limité"
      - "dans les tribunes, comme simples spectateurs"
    why: "Les partisans du veto absolu, comme l'abbé Maury et Cazalès, se placent à droite du président."

  - id: dates-1789
    prompt: "Quelles dates les historiens retiennent-ils pour la naissance du partage gauche-droite ?"
    answer: "Le 28 août ou le 11 septembre 1789"
    decoys:
      - "Le 14 juillet ou le 4 août 1789"
      - "Le 5 mai ou le 20 juin 1789"
      - "Le 10 août ou le 21 septembre 1792"
    why: "La fiche indique qu'on date le partage de la fin de l'été 1789, en citant le 28 août ou le 11 septembre."

  - id: valeurs-gauche
    prompt: "De quoi la gauche se réclame-t-elle, à très gros traits ?"
    answer: "Du changement, de l'égalité et du progrès social"
    decoys:
      - "De l'ordre, de l'autorité et de la tradition"
      - "De la liberté économique et de la propriété"
      - "De la neutralité et du refus des partis"
    why: "La fiche résume la gauche par le changement, l'égalité et le progrès social ; l'ordre, l'autorité et la liberté économique sont associés à la droite."

  - id: valeurs-droite
    prompt: "De quoi la droite se réclame-t-elle, à très gros traits ?"
    answer: "De l'ordre, de l'autorité, de la tradition et de la liberté individuelle"
    decoys:
      - "Du changement, de l'égalité et des droits des travailleurs"
      - "De la lutte contre la monarchie et pour la laïcité"
      - "De l'abolition de la propriété privée"
    why: "La fiche associe la droite à l'ordre, à l'autorité, à la tradition et à la liberté individuelle, notamment économique."

  - id: evolution-contenu
    prompt: "Selon Michel Winock, sur quoi l'opposition gauche-droite s'est-elle d'abord construite ?"
    answer: "Sur des questions politico-religieuses"
    decoys:
      - "Sur des questions économiques et sociales"
      - "Sur la construction européenne"
      - "Sur l'immigration et la mondialisation"
    why: "Winock montre une opposition d'abord politico-religieuse (monarchie ou République, place de l'Église), puis économique et sociale."

  - id: evolution-ensuite
    prompt: "Après les questions de régime et de religion, sur quoi le clivage gauche-droite s'est-il surtout joué ?"
    answer: "Sur le rôle de l'État, la redistribution et la propriété"
    decoys:
      - "Sur le choix entre monarchie et empire"
      - "Sur la place du français face aux langues régionales"
      - "Sur le découpage des départements"
    why: "Selon Winock, l'opposition devient ensuite économique et sociale : rôle de l'État, redistribution, propriété."

  - id: trois-droites
    prompt: "Quelles sont les trois droites distinguées par René Rémond ?"
    answer: "Légitimiste, orléaniste, bonapartiste"
    decoys:
      - "Gaulliste, libérale, nationaliste"
      - "Catholique, laïque, royaliste"
      - "Conservatrice, centriste, populiste"
    why: "La typologie classique de René Rémond distingue les droites légitimiste, orléaniste et bonapartiste."

  - id: pluriel
    prompt: "Pourquoi parle-t-on volontiers « des gauches » et « des droites » ?"
    answer: "Parce que chaque camp réunit des positions différentes dès 1789"
    decoys:
      - "Parce qu'il existe deux Assemblées, chacune avec sa gauche et sa droite"
      - "Parce que la loi impose plusieurs partis de chaque côté"
      - "Parce que les deux camps ont fusionné en 2017"
    why: "Dès l'origine, chaque côté de l'Assemblée est divisé ; d'où le pluriel, et les trois droites de René Rémond."

  - id: bipolarisation
    prompt: "Sous la Ve République, qu'est-ce qui a poussé à la bipolarisation gauche contre droite ?"
    answer: "Le scrutin majoritaire à deux tours"
    decoys:
      - "La proportionnelle intégrale"
      - "L'interdiction des partis du centre"
      - "Le vote obligatoire"
    why: "Le scrutin majoritaire à deux tours a favorisé deux blocs, l'un de gauche, l'autre de droite, qui se sont alternés au pouvoir."

  - id: macron-2017
    prompt: "Comment Emmanuel Macron s'est-il présenté en 2017 face au clivage gauche-droite ?"
    answer: "Comme le dépassant : « et de droite et de gauche »"
    decoys:
      - "Comme le candidat de l'union de la gauche"
      - "Comme le candidat de l'union de la droite et du centre"
      - "Comme le candidat de l'extrême centre contre les deux camps"
    why: "Il s'est fait élire en se présentant comme dépassant le clivage, « et de droite et de gauche » ; pour Winock, cette élection fait éclater l'opposition traditionnelle."

  - id: tripartition-poles
    prompt: "Quels sont les trois pôles de la tripartition décrite après les législatives de 2024 ?"
    answer: "Une gauche, un bloc central, une droite radicale"
    decoys:
      - "Les communistes, les socialistes, les gaullistes"
      - "Les écologistes, les libéraux, les souverainistes de gauche"
      - "Le gouvernement, le Sénat, l'Assemblée"
    why: "Les analyses citées décrivent la gauche (Nouveau Front populaire), le bloc central (autour de Renaissance) et la droite radicale (RN et alliés)."

  - id: tripartition-date
    prompt: "Selon les analyses citées, quand la tripartition se cristallise-t-elle pleinement ?"
    answer: "Aux législatives de 2024"
    decoys:
      - "À la présidentielle de 2002"
      - "Aux européennes de 2014"
      - "Aux municipales de 2020"
    why: "Visible dès la présidentielle de 2022, elle se cristallise aux législatives de 2024."

  - id: tripartition-nouveaute
    prompt: "La tripartition actuelle est-elle une première dans l'histoire politique française ?"
    answer: "Non, d'autres formes ont existé au XIXe siècle"
    decoys:
      - "Oui, la France n'avait connu que deux camps depuis 1789"
      - "Oui, elle est née avec la Constitution de 1958"
      - "Non, elle existe sans interruption depuis 1789"
    why: "Les analyses rappellent des formes de tripartition au XIXe siècle, avant la bipolarisation du XXe."

  - id: deux-axes
    prompt: "Quels sont les deux axes qu'on superpose souvent au clivage gauche-droite ?"
    answer: "Un axe économique et un axe culturel"
    decoys:
      - "Un axe urbain et un axe rural"
      - "Un axe national et un axe local"
      - "Un axe jeune et un axe âgé"
    why: "On distingue souvent l'axe économique (État ou marché) et l'axe culturel (immigration, autorité, mœurs, Europe)."

  - id: etat-marche
    prompt: "Pourquoi « la gauche, c'est l'État ; la droite, c'est le marché » est-il trop simple ?"
    answer: "La droite gaulliste a pratiqué un État fort et planificateur"
    decoys:
      - "La gauche n'a jamais défendu l'intervention de l'État"
      - "Le marché n'existe pas dans le débat politique français"
      - "Les partis ne parlent plus d'économie depuis 1958"
    why: "La droite gaulliste a pratiqué un État fort, et des partis classés à droite défendent aujourd'hui des mesures sociales interventionnistes."

  - id: clivage-mort
    prompt: "Que répond la fiche à l'idée que « le clivage gauche-droite est mort » ?"
    answer: "Il est concurrencé, mais on parle plutôt de recomposition"
    decoys:
      - "C'est exact : plus aucun parti ne s'en réclame"
      - "C'est exact depuis la Constitution de 1958"
      - "Il n'a jamais existé en dehors de 1789"
    why: "Partis et électeurs continuent de s'y situer, et des alliances se nouent encore à gauche ou à droite (Nouveau Front populaire en 2024)."
---
