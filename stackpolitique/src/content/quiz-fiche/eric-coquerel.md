---
questions:
  - id: naissance
    prompt: "Où et quand est né Éric Coquerel ?"
    answer: "À Courbevoie, en 1958"
    decoys:
      - "À Tanger, en 1951"
      - "À Firminy, en 1986"
      - "À Paris, en 1992"
    why: "Éric Coquerel est né le 30 décembre 1958 à Courbevoie."

  - id: metier
    prompt: "Dans quel domaine Éric Coquerel travaille-t-il avant sa carrière politique ?"
    answer: "La communication, notamment pour le Vendée Globe"
    decoys:
      - "La recherche en mathématiques appliquées"
      - "Le plaidoyer pour une ONG fiscale"
      - "L'enseignement de l'histoire au lycée"
    why: "Après des études d'histoire, il travaille dans la communication, notamment pour la course à la voile du Vendée Globe."

  - id: lcr
    prompt: "À quelle organisation Éric Coquerel milite-t-il de 1983 à 1998 ?"
    answer: "La Ligue communiste révolutionnaire (LCR)"
    decoys:
      - "L'Organisation communiste internationaliste (OCI)"
      - "Le Parti communiste français (PCF)"
      - "Le Parti socialiste (PS)"
    why: "Il milite à la LCR, trotskiste, de 1983 à 1998 ; l'OCI était l'organisation de Mélenchon."

  - id: chevenement
    prompt: "Par quel parti Éric Coquerel passe-t-il après la LCR ?"
    answer: "Le Mouvement républicain et citoyen de Jean-Pierre Chevènement"
    decoys:
      - "Le Parti socialiste de François Hollande, alors premier secrétaire"
      - "Les Verts de Dominique Voynet"
      - "Le Nouveau Parti anticapitaliste d'Olivier Besancenot"
    why: "Il passe par le MRC de Jean-Pierre Chevènement, puis fonde en 2003 le mouvement MARS."

  - id: mars
    prompt: "Quel mouvement Éric Coquerel fonde-t-il en 2003 ?"
    answer: "MARS"
    decoys:
      - "Le Parti de gauche"
      - "L'Après"
      - "Debout !"
    why: "Il fonde le mouvement MARS en 2003, avant de cofonder le Parti de gauche en 2008."

  - id: parti-de-gauche
    prompt: "Quel parti Éric Coquerel cofonde-t-il en 2008 avec Jean-Luc Mélenchon ?"
    answer: "Le Parti de gauche"
    decoys:
      - "La France insoumise"
      - "Le Front de gauche"
      - "Le Mouvement républicain et citoyen"
    why: "Il cofonde le Parti de gauche avec Mélenchon en 2008 et en est le coordinateur de 2014 à 2021."

  - id: coordinateur-pg
    prompt: "Quand Éric Coquerel est-il coordinateur du Parti de gauche ?"
    answer: "De 2014 à 2021"
    decoys:
      - "De 2008 à 2012"
      - "De 2017 à 2019"
      - "Depuis 2022"
    why: "Il est coordinateur du Parti de gauche de 2014 à 2021."

  - id: conseiller-regional
    prompt: "Quel mandat Éric Coquerel exerce-t-il de 2010 à 2017 ?"
    answer: "Conseiller régional d'Île-de-France"
    decoys:
      - "Sénateur de Seine-Saint-Denis"
      - "Député européen"
      - "Maire de Saint-Denis"
    why: "Il est conseiller régional d'Île-de-France de 2010 à 2017, avant d'être député."

  - id: circonscription
    prompt: "De quelle circonscription Éric Coquerel est-il député ?"
    answer: "La 1re de Seine-Saint-Denis"
    decoys:
      - "La 4e des Bouches-du-Rhône"
      - "La 10e du Val-de-Marne"
      - "La 8e du Nord"
    why: "Il est député de la 1re circonscription de Seine-Saint-Denis depuis 2017, réélu en 2022 et 2024."

  - id: premiere-election
    prompt: "En quelle année Éric Coquerel est-il élu député pour la première fois ?"
    answer: "2017"
    decoys:
      - "2012"
      - "2022"
      - "2008"
    why: "Il est élu en 2017, puis réélu en 2022 et en 2024."

  - id: commission
    prompt: "Quelle commission de l'Assemblée Éric Coquerel préside-t-il depuis 2022 ?"
    answer: "La commission des finances"
    decoys:
      - "La commission des lois"
      - "La commission des affaires étrangères"
      - "La commission des affaires sociales"
    why: "Il préside la commission des finances depuis le 30 juin 2022."

  - id: date-election
    prompt: "Quand Éric Coquerel est-il élu président de la commission des finances ?"
    answer: "Le 30 juin 2022"
    decoys:
      - "Le 19 juillet 2024"
      - "Le 18 juin 2017"
      - "Le 2 octobre 2025"
    why: "Élu le 30 juin 2022, il est réélu le 20 juillet 2024 et le 2 octobre 2025."

  - id: opposition
    prompt: "Depuis 2008, à qui revient la présidence de la commission des finances ?"
    answer: "À un député de l'opposition"
    decoys:
      - "Au rapporteur général de la majorité"
      - "Au président du plus grand groupe"
      - "Au doyen d'âge de l'Assemblée"
    why: "Depuis 2008, la présidence de la commission des finances revient à un député de l'opposition."

  - id: reelections
    prompt: "Quand Éric Coquerel est-il reconduit à la tête de la commission des finances ?"
    answer: "Le 20 juillet 2024 et le 2 octobre 2025"
    decoys:
      - "Le 19 juillet 2024 et le 1er octobre 2025"
      - "Le 18 juin 2017 et le 30 juin 2022"
      - "Il n'a jamais été reconduit depuis 2022"
    why: "Élu en 2022, il est reconduit le 20 juillet 2024 et le 2 octobre 2025."

  - id: pouvoir-controle
    prompt: "Quel pouvoir particulier a le président de la commission des finances ?"
    answer: "Contrôler sur pièces et sur place l'administration fiscale"
    decoys:
      - "Bloquer seul l'adoption du budget de l'État"
      - "Nommer le ministre de l'Économie"
      - "Déclencher l'article 49.3 à la place du gouvernement"
    why: "Comme le rapporteur général du budget, il peut contrôler sur pièces et sur place l'administration fiscale."

  - id: plan-b
    prompt: "Quelle stratégie européenne Éric Coquerel a-t-il développée ?"
    answer: "Le « plan A / plan B » : renégocier les traités, sinon sortir des règles"
    decoys:
      - "Le « fédéralisme européen » : transformer l'Union en un État fédéral unique"
      - "Le « Frexit immédiat » : quitter l'Union sans négocier"
      - "Le « statu quo » : appliquer les traités sans les changer"
    why: "Il a développé le « plan A / plan B » : renégocier les traités, et en cas d'échec, envisager de sortir des règles de l'Union et de l'euro."

  - id: livre
    prompt: "Quel livre Éric Coquerel publie-t-il en 2021 ?"
    answer: "« Lâchez-nous la dette ! »"
    decoys:
      - "« Pour une politique de l'amitié »"
      - "« L'Ère du peuple »"
      - "« Faites mieux ! »"
    why: "Dans « Lâchez-nous la dette ! » (2021), il conteste l'idée que la dette imposerait l'austérité."

  - id: plainte-2022
    prompt: "Quelle suite le parquet donne-t-il en février 2023 à l'enquête ouverte en 2022 contre Éric Coquerel ?"
    answer: "Un classement sans suite"
    decoys:
      - "Un renvoi devant le tribunal correctionnel"
      - "Une condamnation à une amende"
      - "Une mise en examen"
    why: "L'enquête est classée sans suite en février 2023 ; la plaignante dépose une nouvelle plainte en 2024. Il conteste les accusations."

  - id: incident-2023
    prompt: "De quoi un policier accuse-t-il Éric Coquerel en 2023 ?"
    answer: "De l'avoir frappé lors d'un incident à Saint-Denis"
    decoys:
      - "D'avoir refusé un contrôle routier"
      - "D'avoir insulté des agents à l'Assemblée"
      - "D'avoir organisé une manifestation interdite"
    why: "En 2023, un policier l'accuse de l'avoir frappé lors d'un incident à Saint-Denis ; il conteste."

  - id: role
    prompt: "Quel rôle joue Éric Coquerel dans l'examen du budget ?"
    answer: "Un rôle central, comme président de la commission des finances"
    decoys:
      - "Aucun, le budget relève uniquement du Sénat"
      - "Il le rédige seul, à la place du gouvernement"
      - "Il le présente au Parlement comme ministre délégué chargé du Budget"
    why: "Président de la commission des finances, il joue un rôle central dans l'examen du budget."
---
