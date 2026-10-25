---
questions:
  - id: naissance
    prompt: "Où et quand est née Élisabeth Borne ?"
    answer: "À Paris, en 1961"
    decoys:
      - "À Nancy, en 1970"
      - "À Caen, en 1965"
      - "À Lyon, en 1958"
    why: "Elle est née le 18 avril 1961 à Paris."
  - id: formation
    prompt: "Quelle formation Élisabeth Borne a-t-elle suivie ?"
    answer: "Polytechnique, puis les Ponts et chaussées"
    decoys:
      - "Sciences Po, puis l'ENA, promotion Senghor"
      - "Normale sup, puis l'agrégation d'histoire"
      - "HEC, puis une carrière dans la banque"
    why: "Elle est polytechnicienne et ingénieure des Ponts et chaussées."
  - id: jospin
    prompt: "Pour quel Premier ministre Élisabeth Borne est-elle conseillère à partir de 1997 ?"
    answer: "Lionel Jospin"
    decoys:
      - "Alain Juppé"
      - "Michel Rocard"
      - "Jean-Pierre Raffarin"
    why: "Longtemps proche du PS, elle est conseillère pour les transports de Lionel Jospin à Matignon."
  - id: prefete
    prompt: "Quel poste Élisabeth Borne occupe-t-elle en 2013-2014 ?"
    answer: "Préfète de la région Poitou-Charentes, la première femme à ce poste"
    decoys:
      - "PDG de la SNCF, la première femme à ce poste"
      - "Directrice de cabinet de Lionel Jospin à Matignon"
      - "Présidente de la région Poitou-Charentes"
    why: "Elle est la première femme préfète de la région Poitou-Charentes."
  - id: royal
    prompt: "De quelle ministre Élisabeth Borne dirige-t-elle le cabinet en 2014-2015 ?"
    answer: "Ségolène Royal"
    decoys:
      - "Marisol Touraine"
      - "Najat Vallaud-Belkacem"
      - "Christiane Taubira"
    why: "Elle est directrice de cabinet de Ségolène Royal, ministre de l'Écologie."
  - id: ratp
    prompt: "Quelle entreprise Élisabeth Borne dirige-t-elle de 2015 à 2017 ?"
    answer: "La RATP"
    decoys:
      - "La SNCF"
      - "EDF"
      - "Air France"
    why: "Elle est PDG de la RATP de 2015 à 2017."
  - id: sncf
    prompt: "Quelle réforme Élisabeth Borne porte-t-elle comme ministre des Transports ?"
    answer: "La réforme de la SNCF de 2018"
    decoys:
      - "La réforme des retraites de 2019"
      - "La privatisation d'Aéroports de Paris"
      - "La gratuité des autoroutes"
    why: "Elle porte la réforme de la SNCF de 2018, adoptée malgré une longue grève."
  - id: ministeres
    prompt: "Quels ministères Élisabeth Borne dirige-t-elle de 2019 à 2022 ?"
    answer: "La Transition écologique, puis le Travail"
    decoys:
      - "L'Intérieur, puis la Justice"
      - "Les Armées, puis les Outre-mer"
      - "L'Éducation nationale, puis la Santé"
    why: "Elle est à la Transition écologique (2019-2020) puis au Travail (2020-2022)."
  - id: premiere-ministre
    prompt: "Quand Élisabeth Borne est-elle Première ministre ?"
    answer: "Du 16 mai 2022 au 9 janvier 2024"
    decoys:
      - "Du 9 janvier au 5 septembre 2024"
      - "Du 6 juillet 2020 au 16 mai 2022"
      - "Du 13 décembre 2024 au 8 septembre 2025"
    why: "Elle est Première ministre du 16 mai 2022 au 9 janvier 2024 ; Gabriel Attal lui succède."
  - id: cresson
    prompt: "Quelle femme avait été Première ministre avant Élisabeth Borne ?"
    answer: "Édith Cresson"
    decoys:
      - "Simone Veil"
      - "Martine Aubry"
      - "Ségolène Royal"
    why: "Elle est la deuxième femme à Matignon, après Édith Cresson (1991-1992)."
  - id: quarante-neuf-trois
    prompt: "Combien de fois Élisabeth Borne engage-t-elle le 49.3 ?"
    answer: "23 fois"
    decoys:
      - "28 fois"
      - "11 fois"
      - "3 fois"
    why: "Elle l'engage 23 fois ; seul Michel Rocard l'a utilisé plus souvent (28 fois)."
  - id: rocard
    prompt: "Quel Premier ministre a utilisé le 49.3 plus souvent qu'Élisabeth Borne ?"
    answer: "Michel Rocard"
    decoys:
      - "Édouard Philippe"
      - "Lionel Jospin"
      - "Dominique de Villepin"
    why: "Michel Rocard l'a utilisé 28 fois, contre 23 pour Élisabeth Borne."
  - id: retraites
    prompt: "Quelle réforme Élisabeth Borne fait-elle adopter par le 49.3 en 2023 ?"
    answer: "La réforme des retraites"
    decoys:
      - "La loi immigration"
      - "La réforme de la SNCF"
      - "La réforme de l'assurance chômage"
    why: "La réforme des retraites de 2023 est adoptée par le 49.3."
  - id: circonscription
    prompt: "De quel département Élisabeth Borne est-elle députée ?"
    answer: "Le Calvados"
    decoys:
      - "Les Yvelines"
      - "Les Hauts-de-Seine"
      - "Le Nord"
    why: "Elle est députée de la 6e circonscription du Calvados depuis 2022."
  - id: education
    prompt: "Quel ministère Élisabeth Borne dirige-t-elle dans le gouvernement Bayrou ?"
    answer: "L'Éducation nationale, comme ministre d'État"
    decoys:
      - "La Justice, comme garde des Sceaux"
      - "Les Armées, comme ministre déléguée"
      - "L'Économie, comme ministre d'État"
    why: "Elle est ministre d'État, ministre de l'Éducation nationale, de décembre 2024 à octobre 2025."
  - id: conseil-national
    prompt: "Que fait Élisabeth Borne le 6 mai 2026 ?"
    answer: "Elle quitte la présidence du conseil national de Renaissance"
    decoys:
      - "Elle se déclare candidate à la présidentielle de 2027"
      - "Elle rejoint Horizons pour soutenir Édouard Philippe"
      - "Elle démissionne de son mandat de députée"
    why: "Elle quitte la présidence du conseil national et se retire du bureau exécutif, tout en restant « simple adhérente »."
  - id: ligne
    prompt: "Pourquoi Élisabeth Borne quitte-t-elle la direction de Renaissance ?"
    answer: "Elle ne se retrouve pas « complètement dans la ligne » de Gabriel Attal"
    decoys:
      - "Elle veut se consacrer à la mairie de Caen, conquise en 2026"
      - "Elle est nommée à la Commission européenne"
      - "Elle soutient Édouard Philippe depuis septembre 2024"
    why: "Elle cite notamment le respect du droit international, de l'État de droit et du Conseil constitutionnel."
  - id: mouvement
    prompt: "Quel mouvement Élisabeth Borne a-t-elle créé ?"
    answer: "Bâtissons ensemble"
    decoys:
      - "Populaires"
      - "Place publique"
      - "Territoires de progrès"
    why: "Elle se consacre à Bâtissons ensemble, présenté comme un espace ouvert au-delà des partis."
  - id: duel
    prompt: "Que ferait Élisabeth Borne en cas de second tour entre le RN et LFI ?"
    answer: "Elle ne voterait ni pour l'un ni pour l'autre"
    decoys:
      - "Elle voterait pour LFI pour faire barrage au RN"
      - "Elle voterait pour le RN pour faire barrage à LFI"
      - "Elle appellerait à boycotter le scrutin"
    why: "Le 10 juin 2026, elle dit qu'elle ne voterait ni pour l'un ni pour l'autre, un scénario « particulièrement grave »."
  - id: rassemblement
    prompt: "Quel rassemblement Élisabeth Borne défend-elle ?"
    answer: "Celui de la gauche réformiste et de la droite modérée"
    decoys:
      - "Celui de toute la gauche, LFI comprise"
      - "Celui de la droite, du RN à LR"
      - "Celui des écologistes et des socialistes"
    why: "Elle plaide pour un rassemblement de la gauche réformiste et de la droite modérée."
---
