---
questions:
  - id: naissance
    prompt: "Où et quand est né Boris Vallaud ?"
    answer: "À Beyrouth (Liban), en 1975"
    decoys:
      - "À La Tronche (Isère), en 1968"
      - "À Toulouse (Haute-Garonne), en 1971"
      - "À Bordeaux (Gironde), en 1977"
    why: "Boris Vallaud est né le 25 juillet 1975 à Beyrouth."

  - id: ena
    prompt: "De quelle grande école Boris Vallaud est-il issu ?"
    answer: "L'ENA, promotion Senghor"
    decoys:
      - "L'École normale supérieure"
      - "Polytechnique, promotion 1995"
      - "HEC, puis l'ENA, promotion Voltaire"
    why: "Après Sciences Po, il entre à l'ENA (promotion Senghor, 2002-2004)."

  - id: landes-prefecture
    prompt: "Quel poste Boris Vallaud occupe-t-il de 2006 à 2008 ?"
    answer: "Secrétaire général de la préfecture des Landes"
    decoys:
      - "Maire d'une commune des Landes"
      - "Directeur de cabinet de François Hollande"
      - "Porte-parole du Parti socialiste"
    why: "Il est secrétaire général de la préfecture des Landes de 2006 à 2008."

  - id: montebourg
    prompt: "Auprès de qui Boris Vallaud travaille-t-il de 2008 à 2014 ?"
    answer: "Arnaud Montebourg"
    decoys:
      - "Laurent Fabius"
      - "Lionel Jospin"
      - "Manuel Valls"
    why: "Il dirige les services du conseil général de Saône-et-Loire, puis le cabinet de Montebourg au ministère."

  - id: elysee
    prompt: "Quel poste Boris Vallaud occupe-t-il à l'Élysée de 2014 à 2016 ?"
    answer: "Secrétaire général adjoint, auprès de François Hollande"
    decoys:
      - "Secrétaire général, auprès d'Emmanuel Macron"
      - "Conseiller diplomatique, auprès de Nicolas Sarkozy"
      - "Porte-parole, auprès de François Hollande"
    why: "Il est secrétaire général adjoint de l'Élysée de 2014 à 2016, puis conseiller de Hollande jusqu'en mai 2017."

  - id: circonscription
    prompt: "De quelle circonscription Boris Vallaud est-il député ?"
    answer: "La 3e des Landes"
    decoys:
      - "La 11e de Seine-et-Marne"
      - "La 1re de la Corrèze"
      - "La 2e de l'Isère"
    why: "Il est élu dans la 3e circonscription des Landes en 2017."

  - id: election-2017
    prompt: "Avec quel score Boris Vallaud est-il élu député en 2017 ?"
    answer: "50,75 %"
    decoys:
      - "59,93 %"
      - "63,22 %"
      - "56,65 %"
    why: "Il est élu en 2017 avec 50,75 %, réélu avec 59,93 % en 2022 et 56,65 % en 2024."

  - id: reelection-2024
    prompt: "Avec quel score Boris Vallaud est-il réélu député en 2024 ?"
    answer: "56,65 %"
    decoys:
      - "50,75 %"
      - "43,10 %"
      - "53,42 %"
    why: "Il est réélu le 7 juillet 2024 avec 56,65 % au second tour."

  - id: porte-parole
    prompt: "Quelle fonction Boris Vallaud occupe-t-il au PS de 2018 à 2023 ?"
    answer: "Porte-parole"
    decoys:
      - "Premier secrétaire"
      - "Trésorier"
      - "Premier secrétaire délégué"
    why: "Il est porte-parole du PS de 2018 à 2023."

  - id: epouse
    prompt: "Avec qui Boris Vallaud est-il marié ?"
    answer: "Najat Vallaud-Belkacem"
    decoys:
      - "Carole Delga"
      - "Anne Hidalgo"
      - "Johanna Rolland"
    why: "Il épouse Najat Vallaud-Belkacem en 2005."

  - id: president-groupe
    prompt: "Quand Boris Vallaud devient-il président du groupe socialiste à l'Assemblée ?"
    answer: "Le 23 juin 2022"
    decoys:
      - "Le 13 décembre 2016"
      - "Le 6 juin 2025"
      - "Le 18 juin 2017"
    why: "Il est élu président du groupe le 23 juin 2022, puis réélu à l'unanimité en juillet 2024."

  - id: reelection-groupe
    prompt: "Comment Boris Vallaud est-il réélu à la présidence du groupe en juillet 2024 ?"
    answer: "À l'unanimité"
    decoys:
      - "Avec 51 % des voix"
      - "Au tirage au sort"
      - "Après trois tours de scrutin"
    why: "En juillet 2024, il est réélu à l'unanimité."

  - id: effectif
    prompt: "Combien de députés compte le groupe Socialistes et apparentés en 2026 ?"
    answer: "68"
    decoys:
      - "38"
      - "289"
      - "30"
    why: "Le groupe présidé par Boris Vallaud compte 68 députés."

  - id: censure-bayrou
    prompt: "Pourquoi Boris Vallaud dépose-t-il une motion de censure contre François Bayrou, le 26 juin 2025 ?"
    answer: "Après l'échec du « conclave » sur les retraites"
    decoys:
      - "Après l'usage du 49.3 sur la loi immigration"
      - "Après la dissolution de l'Assemblée nationale"
      - "Après la suppression de l'impôt sur la fortune immobilière"
    why: "Il dépose la motion avec ses collègues socialistes après l'échec du conclave sur les retraites."

  - id: csg
    prompt: "Que propose le plan budgétaire des députés socialistes du 16 septembre 2026 ?"
    answer: "Une CSG progressive, à 0,55 % au niveau du SMIC"
    decoys:
      - "La suppression de la CSG pour tous les salariés"
      - "Une hausse de la TVA pour financer les retraites"
      - "Une baisse de l'impôt sur les sociétés"
    why: "Le contre-budget ramène la CSG de 9,2 % à 0,55 % au niveau du SMIC."

  - id: financement
    prompt: "Comment les députés socialistes veulent-ils financer leur plan de septembre 2026 ?"
    answer: "Taxe sur les grandes successions, taxe Zucman, taxe sur le numérique"
    decoys:
      - "Une hausse générale de l'impôt sur le revenu"
      - "La suppression des retraites complémentaires"
      - "Une hausse de la TVA sur les produits de base et sur l'énergie domestique"
    why: "Le plan est financé par une taxe sur les grandes successions, la taxe Zucman et une taxe sur les multinationales du numérique."

  - id: nancy
    prompt: "Quel score obtient le texte de Boris Vallaud au congrès de Nancy, en 2025 ?"
    answer: "17,4 %, troisième"
    decoys:
      - "51,15 %, premier"
      - "40,37 %, deuxième"
      - "33 %, deuxième"
    why: "Son texte arrive troisième avec 17,4 % ; il vote ensuite à titre personnel pour Olivier Faure."

  - id: nancy-vote
    prompt: "Pour qui Boris Vallaud vote-t-il au second tour du congrès de Nancy ?"
    answer: "Olivier Faure, à titre personnel"
    decoys:
      - "Nicolas Mayer-Rossignol, à titre personnel"
      - "Il appelle à voter blanc"
      - "Carole Delga, candidate surprise"
    why: "Après le premier tour, il annonce voter à titre personnel pour Olivier Faure."

  - id: mai-2026
    prompt: "Que fait Boris Vallaud le 8 mai 2026 ?"
    answer: "Il quitte la direction du PS et critique la « stratégie d'isolement » de Faure"
    decoys:
      - "Il se déclare candidat à la présidentielle de 2027, hors de toute primaire"
      - "Il quitte le PS pour rejoindre Place publique"
      - "Il démissionne de la présidence du groupe"
    why: "Le 8 mai 2026, il quitte la direction du PS en critiquant la stratégie d'Olivier Faure."

  - id: soutien
    prompt: "Qui Boris Vallaud soutient-il pour la présidentielle de 2027 ?"
    answer: "Raphaël Glucksmann, dès le 27 août 2026"
    decoys:
      - "Olivier Faure, dès le 30 août 2026"
      - "François Hollande, dès décembre 2026"
      - "Ségolène Royal, dès le 10 juillet 2026"
    why: "Il ne se présente pas à la primaire et soutient Glucksmann dès le 27 août 2026."
---
