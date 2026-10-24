---
questions:
  - id: trois-acteurs
    prompt: "Qui classe les partis sur l'axe gauche-droite ?"
    answer: "Le ministère de l'Intérieur, les politistes et les partis eux-mêmes"
    decoys:
      - "Le Conseil constitutionnel seul, qui publie une liste officielle à chaque élection"
      - "La Commission nationale des comptes de campagne seule"
      - "Le président de la République, par décret"
    why: "Trois acteurs classent les partis, avec des mots qui ne coïncident pas toujours : l'administration, les chercheurs et les partis."

  - id: nuancier
    prompt: "Comment s'appelle la liste des étiquettes que le ministère de l'Intérieur peut attribuer aux candidats ?"
    answer: "Le nuancier"
    decoys:
      - "Le registre des partis"
      - "La liste d'émargement"
      - "Le tableau des parrainages"
    why: "Avant chaque élection, une circulaire aux préfets fixe le nuancier et le regroupement des nuances en blocs de clivage."

  - id: usage-nuances
    prompt: "À quoi servent les nuances politiques du ministère de l'Intérieur ?"
    answer: "À additionner les résultats et publier des synthèses par courant"
    decoys:
      - "À autoriser ou interdire une candidature"
      - "À répartir le temps de parole à la télévision"
      - "À fixer le montant du remboursement des campagnes"
    why: "Les nuances servent à agréger les résultats par grand courant ; elles n'ont pas d'effet sur le droit de se présenter."

  - id: blocs
    prompt: "Comment le ministère regroupe-t-il les nuances ?"
    answer: "En blocs de clivage, de l'extrême gauche à l'extrême droite"
    decoys:
      - "En familles régionales, par département"
      - "En partis de gouvernement et partis d'opposition"
      - "En petits, moyens et grands partis selon leurs adhérents"
    why: "La circulaire contient un tableau qui range les nuances en blocs de clivage sur l'axe gauche-droite."

  - id: communes-3500
    prompt: "Aux municipales, à quels candidats le ministère attribue-t-il une nuance ?"
    answer: "Dans les communes d'au moins 3 500 habitants et les chefs-lieux d'arrondissement"
    decoys:
      - "Dans toutes les communes de France, y compris les villages de moins de cent habitants"
      - "Seulement à Paris, Lyon et Marseille"
      - "Seulement aux maires sortants qui se représentent"
    why: "La fiche précise ce périmètre, confirmé par le Conseil d'État pour les municipales de 2026."

  - id: liberte-etiquette
    prompt: "Un candidat doit-il se présenter sous la nuance que lui attribue le ministère ?"
    answer: "Non, il reste libre de l'étiquette qu'il revendique"
    decoys:
      - "Oui, elle figure obligatoirement sur ses bulletins"
      - "Oui, sauf s'il obtient l'accord du préfet"
      - "Non, mais il perd alors son remboursement de campagne"
    why: "Les nuances sont un outil de l'administration ; chaque candidat choisit son étiquette."

  - id: gauche-radicale
    prompt: "Que désigne souvent « gauche radicale » chez les politistes ?"
    answer: "Une gauche qui veut rompre avec le système économique en passant par les élections"
    decoys:
      - "Les organisations révolutionnaires, trotskistes notamment, qui refusent le jeu électoral"
      - "L'aile gauche du centre, favorable au marché"
      - "Les partis de gauche qui refusent toute élection"
    why: "Les politistes réservent souvent « extrême gauche » aux organisations révolutionnaires, et parlent de gauche radicale pour une rupture par les urnes."

  - id: extreme-gauche-politistes
    prompt: "À quoi les politistes réservent-ils souvent l'expression « extrême gauche » ?"
    answer: "Aux organisations révolutionnaires, trotskistes par exemple"
    decoys:
      - "À tous les partis membres d'une alliance de gauche"
      - "Aux partis écologistes"
      - "Aux partis qui participent au gouvernement"
    why: "C'est la distinction courante entre gauche radicale (rupture par les élections) et extrême gauche (révolutionnaire)."

  - id: droite-labels
    prompt: "Quels termes les auteurs emploient-ils pour la droite la plus à droite ?"
    answer: "Extrême droite, droite radicale ou droite populiste, selon les auteurs"
    decoys:
      - "Uniquement « droite nationale », seul terme admis par les politistes comme par le ministère"
      - "Centre droit et droite modérée"
      - "Droite libérale et droite sociale"
    why: "Les politistes n'ont pas un seul mot : extrême droite, droite radicale, droite populiste."

  - id: enjeux
    prompt: "Pourquoi un classement « à l'extrême » compte-t-il pour un parti ?"
    answer: "Il pèse sur son image, ses alliances et le front républicain"
    decoys:
      - "Il lui retire son financement public"
      - "Il l'empêche de présenter un candidat à la présidentielle"
      - "Il lui interdit de former un groupe à l'Assemblée"
    why: "La fiche souligne que le classement n'est pas neutre : image, alliances possibles, appels à faire barrage."

  - id: front-republicain
    prompt: "Qu'est-ce que le « front républicain » ?"
    answer: "L'appel à faire barrage à un candidat jugé extrême"
    decoys:
      - "L'alliance permanente de tous les partis de gauche"
      - "Le groupe parlementaire du président de la République"
      - "La coalition des partis qui gouvernent ensemble"
    why: "La fiche le définit comme l'appel à faire barrage à un candidat, ce qui dépend du classement des partis."

  - id: ce-2024-date
    prompt: "Quand le Conseil d'État a-t-il rejeté le recours du RN contre son classement à l'extrême droite ?"
    answer: "Le 11 mars 2024"
    decoys:
      - "Le 9 juin 2024"
      - "Le 4 décembre 2024"
      - "Le 1er juillet 2026"
    why: "Décision du 11 mars 2024, sur la circulaire des élections sénatoriales de 2023."

  - id: ce-2024-scrutin
    prompt: "Quelle circulaire le RN contestait-il devant le Conseil d'État en 2024 ?"
    answer: "Celle des élections sénatoriales de 2023"
    decoys:
      - "Celle de la présidentielle de 2022"
      - "Celle des européennes de 2024"
      - "Celle des municipales de 2020"
    why: "La circulaire de 2023 sur les sénatoriales rangeait les candidats RN dans le bloc « extrême droite »."

  - id: erreur-manifeste
    prompt: "Qu'a jugé exactement le Conseil d'État sur le classement du RN ?"
    answer: "Que le choix du ministre n'était pas entaché d'une erreur manifeste"
    decoys:
      - "Que le RN est, en droit, un parti d'extrême droite, ce qui le prive de financement public"
      - "Que le ministre n'avait pas le droit de classer les partis"
      - "Que le RN devait être rangé à droite"
    why: "Le juge a exercé un contrôle léger ; il n'a pas défini lui-même le RN comme d'extrême droite."

  - id: lfi-2026
    prompt: "Pour quelles élections LFI a-t-elle été rangée dans le bloc « extrême gauche » ?"
    answer: "Les municipales de 2026"
    decoys:
      - "Les législatives de 2024"
      - "Les européennes de 2019"
      - "La présidentielle de 2022"
    why: "La circulaire de Laurent Nuñez pour les municipales de 2026 a fait passer LFI du bloc « gauche » au bloc « extrême gauche »."

  - id: nunez
    prompt: "Quel ministre de l'Intérieur a reclassé LFI à l'extrême gauche ?"
    answer: "Laurent Nuñez"
    decoys:
      - "Gérald Darmanin"
      - "Bruno Retailleau"
      - "Sébastien Lecornu"
    why: "C'est la circulaire de Laurent Nuñez pour les municipales de 2026."

  - id: motifs-lfi
    prompt: "Quels motifs le ministre a-t-il invoqués pour reclasser LFI ?"
    answer: "Sa remise en cause de l'autorité judiciaire et ses accusations contre la police"
    decoys:
      - "Son refus de participer aux élections"
      - "Son alliance électorale avec le Rassemblement national aux législatives anticipées de 2024"
      - "La baisse de son nombre d'adhérents"
    why: "Le ministre a cité la remise en cause très forte de l'autorité judiciaire et les accusations systématiques contre la police."

  - id: udr
    prompt: "Quel autre parti la même circulaire de 2026 a-t-elle rangé à l'extrême droite ?"
    answer: "L'UDR d'Éric Ciotti"
    decoys:
      - "Les Républicains"
      - "Horizons"
      - "Le MoDem"
    why: "La circulaire range l'UDR, le parti d'Éric Ciotti, dans le bloc « extrême droite »."

  - id: ce-2026
    prompt: "Comment le Conseil d'État a-t-il tranché les recours de LFI et de l'UDR en 2026 ?"
    answer: "Il les a rejetés : pas d'erreur manifeste d'appréciation"
    decoys:
      - "Il a annulé les deux classements"
      - "Il a annulé le classement de LFI mais maintenu celui de l'UDR à l'extrême droite"
      - "Il s'est déclaré incompétent"
    why: "Le Conseil d'État a jugé les deux classements sans erreur manifeste, vu la situation politique et les alliances observées."

  - id: classement-change
    prompt: "Avant la circulaire des municipales de 2026, dans quel bloc LFI était-elle rangée ?"
    answer: "Dans le bloc « gauche »"
    decoys:
      - "Dans le bloc « centre »"
      - "Dans le bloc « extrême gauche » depuis sa création"
      - "Dans aucun bloc"
    why: "Le classement peut changer d'une élection à l'autre : LFI est passée du bloc « gauche » au bloc « extrême gauche » en 2026."
---
