---
questions:
  - id: fondation
    prompt: "Quand et où Emmanuel Macron lance-t-il En marche ?"
    answer: "Le 6 avril 2016, à Amiens"
    decoys:
      - "Le 1er décembre 2016, à Paris"
      - "Le 17 septembre 2022, à Paris"
      - "Le 30 août 2016, au Havre"
    why: "En marche naît le 6 avril 2016, lancé à Amiens par Emmanuel Macron, alors ministre de l'Économie."
  - id: noms
    prompt: "Dans quel ordre le parti d'Emmanuel Macron a-t-il changé de nom ?"
    answer: "En marche, La République en marche, Renaissance"
    decoys:
      - "La République en marche, En marche, Renaissance"
      - "En marche, Renaissance, Ensemble pour la République"
      - "Ensemble, La République en marche, Renaissance"
    why: "En marche (2016) devient La République en marche en 2017, puis Renaissance le 17 septembre 2022."
  - id: renaissance-2022
    prompt: "Quand La République en marche devient-elle Renaissance ?"
    answer: "Le 17 septembre 2022"
    decoys:
      - "Le 8 décembre 2024"
      - "Le 7 mai 2017"
      - "Le 9 juin 2024"
    why: "Le 17 septembre 2022, LREM devient Renaissance en absorbant Agir et Territoires de progrès."
  - id: fusion
    prompt: "Quels partis rejoignent La République en marche pour former Renaissance en 2022 ?"
    answer: "Agir et Territoires de progrès"
    decoys:
      - "Le MoDem et Horizons"
      - "L'UDI et le Parti radical"
      - "Horizons et Territoires de progrès"
    why: "Agir et Territoires de progrès rejoignent Renaissance ; le MoDem et Horizons restent des partis distincts."
  - id: legislatives-2017
    prompt: "Combien de sièges La République en marche obtient-elle seule aux législatives de 2017 ?"
    answer: "308, la majorité absolue"
    decoys:
      - "245, une majorité relative"
      - "289, juste la majorité absolue"
      - "170, une majorité relative"
    why: "En 2017, LREM obtient seule 308 sièges, avec 28,21 % au premier tour."
  - id: legislatives-2022
    prompt: "Que se passe-t-il pour le camp présidentiel aux législatives de 2022 ?"
    answer: "La coalition Ensemble n'a plus que 245 sièges, une majorité relative"
    decoys:
      - "Il garde la majorité absolue avec 308 sièges, comme en 2017"
      - "Il arrive troisième, derrière la NUPES et le Rassemblement national"
      - "Il obtient 289 sièges, la majorité absolue exacte"
    why: "En 2022, la coalition Ensemble obtient 245 sièges : la majorité n'est plus que relative."
  - id: europeennes-2019
    prompt: "Quel résultat obtient la liste de Nathalie Loiseau aux européennes de 2019 ?"
    answer: "22,42 %, deuxième derrière le RN"
    decoys:
      - "14,60 %, deuxième derrière le RN"
      - "31,37 %, première devant le RN"
      - "24,01 %, première devant le RN"
    why: "En 2019, la liste de Nathalie Loiseau arrive deuxième avec 22,42 %, juste derrière le RN."
  - id: europeennes-2024
    prompt: "Quel score obtient la liste de Valérie Hayer aux européennes de 2024 ?"
    answer: "14,60 %"
    decoys:
      - "22,42 %"
      - "31,37 %"
      - "13,83 %"
    why: "La liste de Valérie Hayer (avec le MoDem et Horizons) obtient 14,60 %, loin derrière le RN (31,37 %)."
  - id: attal-secretaire
    prompt: "Quand Gabriel Attal devient-il secrétaire général de Renaissance ?"
    answer: "Le 8 décembre 2024, avec 94,9 % des voix"
    decoys:
      - "Le 17 septembre 2022, avec 82 % des voix"
      - "Le 22 mai 2026, avec 91 % des voix"
      - "Le 13 juillet 2024, avec 84 voix sur 98"
    why: "Il est élu le 8 décembre 2024 avec 94,9 % des voix du conseil national ; selon Public Sénat, contre l'avis d'Emmanuel Macron."
  - id: sejourne-secretaire
    prompt: "Qui est secrétaire général de Renaissance de 2022 à 2024 ?"
    answer: "Stéphane Séjourné"
    decoys:
      - "Stanislas Guerini"
      - "Élisabeth Borne"
      - "Christophe Castaner"
    why: "Stéphane Séjourné devient secrétaire général en septembre 2022 ; Gabriel Attal lui succède en décembre 2024."
  - id: europe-groupe
    prompt: "Dans quel groupe du Parlement européen siègent les députés européens de Renaissance ?"
    answer: "Renew Europe"
    decoys:
      - "Le Parti populaire européen"
      - "Les Socialistes et démocrates"
      - "Les Patriotes pour l'Europe"
    why: "Ses députés européens siègent dans le groupe Renew Europe."
  - id: charte
    prompt: "Laquelle de ces valeurs figure dans la charte des valeurs de Renaissance ?"
    answer: "Le féminisme : « Renaissance est un parti féministe »"
    decoys:
      - "La décroissance : « Renaissance est un parti de la sobriété »"
      - "La souveraineté : « Renaissance est un parti souverainiste »"
      - "Le fédéralisme : « Renaissance veut des États-Unis d'Europe »"
    why: "Sa charte compte douze valeurs, dont le progrès, le travail, l'autorité de l'État, la laïcité, la Nation et le féminisme."
  - id: clivage
    prompt: "Quel clivage Emmanuel Macron veut-il substituer au clivage gauche-droite en 2017 ?"
    answer: "Progressistes contre conservateurs"
    decoys:
      - "Peuple contre élites"
      - "Souverainistes contre fédéralistes européens"
      - "Libéraux contre étatistes"
    why: "Il se présente comme « et de droite et de gauche » et propose une opposition entre « progressistes » et « conservateurs »."
  - id: candidat-2027
    prompt: "Quand Gabriel Attal se déclare-t-il candidat à la présidentielle de 2027 ?"
    answer: "Le 22 mai 2026, à Mur-de-Barrez (Aveyron)"
    decoys:
      - "Le 30 mai 2026, à la Porte de Versailles (Paris)"
      - "Le 10 octobre 2026, à la Cité internationale de Lyon"
      - "Le 8 décembre 2024, au conseil national du parti"
    why: "Il se déclare le 22 mai 2026 à Mur-de-Barrez, après un vote de plus de 90 % du conseil national en sa faveur."
  - id: concurrent
    prompt: "Qui est le principal concurrent de Gabriel Attal au centre pour 2027 ?"
    answer: "Édouard Philippe, candidat d'Horizons"
    decoys:
      - "François Bayrou, candidat du MoDem"
      - "Élisabeth Borne, candidate de Bâtissons ensemble"
      - "Gérald Darmanin, candidat de Populaires"
    why: "Édouard Philippe (Horizons) est candidat depuis septembre 2024 ; Gérald Darmanin le soutient depuis le 17 août 2026."
  - id: retraites
    prompt: "Que propose Gabriel Attal sur les retraites en 2026 ?"
    answer: "Supprimer l'âge légal, avec décotes, surcotes et une part de capitalisation"
    decoys:
      - "Revenir à 62 ans et 43 annuités, en abrogeant la réforme de 2023"
      - "Porter l'âge légal à 67 ans, comme le propose aussi Horizons"
      - "Garder l'âge de 64 ans fixé par la réforme de 2023, sans rien changer"
    why: "Sur RMC, le 1er mai 2026, il propose une pension selon la durée de cotisation, sans âge légal, avec une part de capitalisation."
  - id: immigration
    prompt: "Que propose Gabriel Attal sur l'immigration de travail ?"
    answer: "Des quotas votés par le Parlement selon les besoins définis par les partenaires sociaux"
    decoys:
      - "Un moratoire de cinq ans sur toute immigration de travail, voté par référendum"
      - "La régularisation de tous les travailleurs sans papiers dans les métiers en tension"
      - "La suppression des titres de séjour de travail au profit de visas saisonniers"
    why: "Il défend une « préférence travail » : le Parlement voterait des quotas d'immigration de travail."
  - id: economies
    prompt: "Combien d'économies Gabriel Attal propose-t-il sur le quinquennat (Lyon, octobre 2026) ?"
    answer: "150 milliards d'euros"
    decoys:
      - "54 milliards d'euros"
      - "40 milliards d'euros"
      - "500 milliards d'euros"
    why: "Il propose 150 milliards d'euros d'économies, dont 15 à 20 milliards dès le début, et l'équilibre budgétaire dans la Constitution."
  - id: municipales-2026
    prompt: "Quelles villes Renaissance gagne-t-il aux municipales de 2026 ?"
    answer: "Bordeaux et Annecy"
    decoys:
      - "Le Havre et Pau"
      - "Nice et Toulouse"
      - "Lyon et Grenoble"
    why: "Renaissance gagne Bordeaux (Thomas Cazenave) et Annecy (Antoine Armand), deux villes tenues par les écologistes, ainsi que Rodez."
  - id: groupe-epr
    prompt: "Combien de députés compte le groupe Ensemble pour la République en 2026 ?"
    answer: "90"
    decoys:
      - "308"
      - "68"
      - "245"
    why: "Le groupe EPR, présidé par Gabriel Attal, compte 90 députés : c'est le deuxième groupe de l'Assemblée."
---
