---
questions:
  - id: naissance
    prompt: "Où et quand est né Éric Piolle ?"
    answer: "À Pau, en 1973"
    decoys:
      - "À Paris, en 1973"
      - "À Grenoble, en 1967"
      - "À Montbéliard, en 1987"
    why: "Éric Piolle est né le 6 janvier 1973 à Pau."

  - id: formation
    prompt: "Quelle formation Éric Piolle a-t-il suivie ?"
    answer: "Ingénieur, diplômé de Grenoble INP"
    decoys:
      - "Économiste, diplômé de Paris-Dauphine"
      - "Juriste, diplômé de Sciences Po Paris"
      - "Commercial, diplômé de l'ESC Rouen"
    why: "Il est diplômé de Grenoble INP en génie industriel (1996)."

  - id: hp
    prompt: "Dans quelle entreprise Éric Piolle est-il cadre dirigeant à Grenoble ?"
    answer: "Hewlett-Packard"
    decoys:
      - "Schneider Electric"
      - "STMicroelectronics"
      - "EDF"
    why: "Il est cadre dirigeant chez Hewlett-Packard à Grenoble."

  - id: licenciement
    prompt: "Pourquoi Éric Piolle est-il licencié par Hewlett-Packard en 2011 ?"
    answer: "Il refuse de mettre en œuvre un plan de délocalisation"
    decoys:
      - "Il se présente aux élections municipales"
      - "Il cofonde une entreprise concurrente"
      - "Il dénonce publiquement la direction"
    why: "Il est licencié en 2011 après avoir refusé de mettre en œuvre un plan de délocalisation."

  - id: region
    prompt: "Quel mandat Éric Piolle exerce-t-il de 2010 à 2014 ?"
    answer: "Conseiller régional de Rhône-Alpes"
    decoys:
      - "Député de l'Isère"
      - "Adjoint au maire de Grenoble"
      - "Député européen"
    why: "Il est conseiller régional Europe Écologie de Rhône-Alpes de 2010 à 2014."

  - id: election-2014
    prompt: "Quand Éric Piolle est-il élu maire de Grenoble ?"
    answer: "En 2014"
    decoys:
      - "En 2008"
      - "En 2020"
      - "En 2001"
    why: "Il est élu maire de Grenoble le 4 avril 2014."

  - id: score-2014
    prompt: "Avec quel score la liste d'Éric Piolle l'emporte-t-elle au second tour des municipales de 2014 ?"
    answer: "40 %"
    decoys:
      - "53,13 %"
      - "56,59 %"
      - "52,04 %"
    why: "En 2014, il l'emporte avec 40 % au second tour ; en 2020, il est réélu avec 53,13 %."

  - id: cent-mille
    prompt: "Qu'a de particulier l'élection d'Éric Piolle à Grenoble en 2014 ?"
    answer: "Il est le seul écologiste à diriger une ville de plus de 100 000 habitants"
    decoys:
      - "Il est le premier maire de Grenoble élu dès le premier tour"
      - "Il est le premier maire écologiste de l'histoire de France"
      - "Il est le plus jeune maire d'une ville de plus de 100 000 habitants"
    why: "En 2014, il devient le seul écologiste à diriger une ville de plus de 100 000 habitants, après Dominique Voynet à Montreuil en 2008."

  - id: voynet
    prompt: "Avant Éric Piolle, quelle écologiste avait dirigé une ville de plus de 100 000 habitants ?"
    answer: "Dominique Voynet, à Montreuil"
    decoys:
      - "Cécile Duflot, à Villeneuve-Saint-Georges"
      - "Eva Joly, à Paris"
      - "Marine Tondelier, à Hénin-Beaumont"
    why: "Dominique Voynet avait été élue maire de Montreuil en 2008."

  - id: reelection-2020
    prompt: "Avec quel score Éric Piolle est-il réélu maire de Grenoble en 2020 ?"
    answer: "53,13 % au second tour"
    decoys:
      - "40 % au second tour"
      - "46,67 % au premier tour"
      - "56,59 % au second tour"
    why: "En 2020, il est réélu avec 53,13 % au second tour."

  - id: primaire-2021
    prompt: "Quel résultat Éric Piolle obtient-il à la primaire écologiste de 2021 ?"
    answer: "Quatrième, avec 22,29 %"
    decoys:
      - "Deuxième, avec 25,14 %"
      - "Premier, avec 51,03 %"
      - "Troisième, avec 27,70 %"
    why: "Il arrive quatrième de la primaire écologiste de 2021, avec 22,29 %."

  - id: velo
    prompt: "Comment s'appelle le réseau cyclable développé à Grenoble sous Éric Piolle ?"
    answer: "Chronovélo"
    decoys:
      - "Vélo'v"
      - "Réseau express vélo"
      - "Vélib'"
    why: "Le réseau cyclable Chronovélo est développé sous son mandat."

  - id: cantines
    prompt: "Quelle part de bio atteignent les cantines de Grenoble sous Éric Piolle ?"
    answer: "60 %"
    decoys:
      - "100 %"
      - "20 %"
      - "40 %"
    why: "Les cantines de Grenoble passent à 60 % d'alimentation bio."

  - id: burkini
    prompt: "Qu'advient-il de l'autorisation du burkini dans les piscines de Grenoble votée en mai 2022 ?"
    answer: "Elle est suspendue par la justice, jusqu'au Conseil d'État"
    decoys:
      - "Elle est appliquée sans recours"
      - "Elle est étendue à toutes les villes de l'Isère"
      - "Elle est retirée par le conseil municipal lui-même"
    why: "Le tribunal administratif la suspend, et le Conseil d'État confirme la suspension le 21 juin 2022."

  - id: taxe-fonciere
    prompt: "Quelle mesure de 2023 provoque le départ de sept élus de la majorité d'Éric Piolle ?"
    answer: "Une hausse de 25 % de la taxe foncière"
    decoys:
      - "La fermeture de toutes les piscines municipales"
      - "La suppression du réseau de tramway"
      - "L'autorisation du burkini dans les piscines"
    why: "En 2023, une hausse de 25 % de la taxe foncière provoque le départ de sept élus de sa majorité."

  - id: favoritisme
    prompt: "Pour quoi Éric Piolle est-il condamné en appel le 6 septembre 2023 ?"
    answer: "Favoritisme, dans l'affaire de la Fête des Tuiles"
    decoys:
      - "Concussion, dans une affaire de partage de salaire"
      - "Diffamation, envers un élu d'opposition"
      - "Prise illégale d'intérêts, dans un marché de tramway"
    why: "Il est condamné en appel pour favoritisme (8 000 € d'amende avec sursis), après une relaxe en première instance."

  - id: concussion
    prompt: "Sur quoi porte l'enquête pour « concussion » ouverte en juin 2024 visant Éric Piolle ?"
    answer: "Un partage de salaire entre élus"
    decoys:
      - "L'attribution de la Fête des Tuiles"
      - "Le financement de sa campagne de 2021"
      - "La vente d'un terrain municipal"
    why: "En juin 2024, le parquet de Grenoble ouvre une enquête sur un partage de salaire entre élus."

  - id: porte-parole
    prompt: "Quelle fonction Éric Piolle obtient-il chez Les Écologistes en avril 2025 ?"
    answer: "Porte-parole, avec Aminata Niakaté"
    decoys:
      - "Secrétaire national adjoint"
      - "Président du conseil fédéral"
      - "Directeur de campagne de Marine Tondelier"
    why: "Il est élu porte-parole le 26 avril 2025 avec Aminata Niakaté, puis suspendu de ce mandat le 16 septembre 2025."

  - id: suspension
    prompt: "Pourquoi Éric Piolle est-il suspendu de son mandat de porte-parole en septembre 2025 ?"
    answer: "En raison d'une enquête judiciaire"
    decoys:
      - "Pour avoir soutenu Raphaël Glucksmann"
      - "Pour avoir appelé à soutenir Mélenchon"
      - "Pour avoir quitté le groupe au Sénat"
    why: "Il est suspendu le 16 septembre 2025 en raison de l'enquête judiciaire qui le vise."

  - id: succession
    prompt: "Qui succède à Éric Piolle à la mairie de Grenoble en 2026 ?"
    answer: "Laurence Ruffin"
    decoys:
      - "Catherine Trautmann"
      - "Emmanuel Denis"
      - "Léonore Moncond'huy"
    why: "Il ne se représente pas ; Laurence Ruffin, qu'il soutient, est élue avec 56,59 %."
---
