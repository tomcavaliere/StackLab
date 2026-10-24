---
questions:
  - id: date-constitution
    prompt: "De quand date la Constitution de la Ve République ?"
    answer: "Du 4 octobre 1958"
    decoys:
      - "Du 13 mai 1958"
      - "Du 27 octobre 1946"
      - "Du 28 octobre 1962"
    why: "La Constitution est du 4 octobre 1958, après le référendum du 28 septembre 1958."

  - id: adoption
    prompt: "Comment la Constitution de 1958 a-t-elle été adoptée ?"
    answer: "Par référendum, le 28 septembre 1958"
    decoys:
      - "Par un vote du Parlement réuni en Congrès"
      - "Par décret du général de Gaulle"
      - "Par une assemblée constituante élue"
    why: "Elle a été adoptée par référendum le 28 septembre 1958."

  - id: contexte
    prompt: "Quelle crise fait tomber la IVe République en 1958 ?"
    answer: "La guerre d'Algérie"
    decoys:
      - "La crise économique de 1929"
      - "Mai 68"
      - "La guerre d'Indochine"
    why: "En mai 1958, la guerre d'Algérie fait vaciller la IVe République, et le général de Gaulle est rappelé."

  - id: debre
    prompt: "Qui prépare notamment le texte de la Constitution sous l'autorité du général de Gaulle ?"
    answer: "Michel Debré"
    decoys:
      - "Georges Pompidou"
      - "René Coty"
      - "Pierre Mendès France"
    why: "Le texte est préparé sous l'autorité de De Gaulle, notamment par Michel Debré."

  - id: parlementarisme-rationalise
    prompt: "Comment appelle-t-on l'organisation qui laisse le gouvernement responsable devant l'Assemblée, tout en lui donnant des outils pour gouverner sans majorité solide ?"
    answer: "Le parlementarisme rationalisé"
    decoys:
      - "Le régime présidentiel"
      - "Le régime d'assemblée"
      - "La démocratie directe"
    why: "La Constitution de 1958 organise un parlementarisme rationalisé, en réaction à l'instabilité de la IVe République."

  - id: dissolution-article
    prompt: "Quel article permet au président de dissoudre l'Assemblée nationale ?"
    answer: "L'article 12"
    decoys:
      - "L'article 16"
      - "L'article 49"
      - "L'article 89"
    why: "La dissolution relève de l'article 12 ; le 16 donne des pouvoirs exceptionnels, le 49 organise la responsabilité du gouvernement, le 89 la révision."

  - id: article-16
    prompt: "Combien de fois l'article 16 (pouvoirs exceptionnels) a-t-il été utilisé ?"
    answer: "Une seule fois, en 1961"
    decoys:
      - "Jamais"
      - "Deux fois, en 1961 et en 2020"
      - "À chaque dissolution"
    why: "L'article 16 n'a été utilisé qu'une fois, en 1961."

  - id: article-20
    prompt: "Selon l'article 20, qui « détermine et conduit la politique de la Nation » ?"
    answer: "Le gouvernement"
    decoys:
      - "Le président de la République"
      - "L'Assemblée nationale"
      - "Le Conseil constitutionnel"
    why: "C'est le gouvernement, dirigé par le Premier ministre ; d'où le rôle central du Premier ministre en cohabitation."

  - id: senat-election
    prompt: "Comment le Sénat est-il élu ?"
    answer: "Au suffrage indirect"
    decoys:
      - "Au suffrage universel direct, comme l'Assemblée"
      - "Il est nommé par le président"
      - "Il est tiré au sort parmi les élus locaux"
    why: "Le Sénat est élu au suffrage indirect ; l'Assemblée nationale, au suffrage universel direct, a le dernier mot."

  - id: revision-1962
    prompt: "Qu'a changé la révision de 1962 ?"
    answer: "L'élection du président au suffrage universel direct"
    decoys:
      - "Le passage du septennat au quinquennat"
      - "La création de la question prioritaire de constitutionnalité"
      - "La limite de deux mandats présidentiels"
    why: "Le référendum de 1962 instaure l'élection directe du président ; la première a lieu en 1965."

  - id: premiere-election-directe
    prompt: "En quelle année a lieu la première élection présidentielle au suffrage universel direct ?"
    answer: "En 1965"
    decoys:
      - "En 1958"
      - "En 1962"
      - "En 1969"
    why: "La révision date de 1962, la première élection directe de 1965."

  - id: quinquennat
    prompt: "Quand le quinquennat a-t-il été adopté, et comment ?"
    answer: "En 2000, par référendum"
    decoys:
      - "En 1962, par référendum"
      - "En 2008, par le Congrès"
      - "En 1995, par une loi ordinaire"
    why: "Le quinquennat a été adopté par référendum en 2000 et s'applique à partir de 2002."

  - id: revision-2008
    prompt: "Laquelle de ces mesures vient de la révision de 2008 ?"
    answer: "La question prioritaire de constitutionnalité (QPC)"
    decoys:
      - "L'élection du président au suffrage universel direct"
      - "Le quinquennat"
      - "Le droit de dissolution"
    why: "2008 crée la QPC, limite à deux mandats consécutifs et encadre le 49.3 ; le suffrage direct date de 1962, le quinquennat de 2000."

  - id: qpc
    prompt: "À quoi sert la question prioritaire de constitutionnalité ?"
    answer: "À contester devant un juge une loi déjà en vigueur"
    decoys:
      - "À demander un référendum d'initiative citoyenne"
      - "À poser une question écrite au gouvernement"
      - "À contester le résultat d'une élection législative"
    why: "La QPC, créée en 2008, permet à un justiciable de contester une loi déjà en vigueur."

  - id: revision-2024
    prompt: "Quelle liberté a été inscrite dans la Constitution en 2024 ?"
    answer: "Celle de recourir à l'interruption volontaire de grossesse"
    decoys:
      - "Celle de manifester sans déclaration préalable"
      - "Le droit au logement opposable"
      - "Le droit de vote des étrangers aux élections locales"
    why: "La révision de 2024 inscrit la liberté de recourir à l'IVG dans la Constitution."

  - id: article-89
    prompt: "Comment révise-t-on la Constitution selon l'article 89 ?"
    answer: "Par le Congrès aux trois cinquièmes ou par référendum"
    decoys:
      - "Par l'Assemblée nationale seule, à la majorité simple"
      - "Par décision du Conseil constitutionnel"
      - "Par décret du président après avis du Sénat"
    why: "L'article 89 prévoit un vote du Parlement réuni en Congrès à la majorité des trois cinquièmes, ou un référendum."

  - id: cohabitations
    prompt: "Combien de cohabitations la Ve République a-t-elle connues ?"
    answer: "Trois : 1986-1988, 1993-1995 et 1997-2002"
    decoys:
      - "Deux : 1986-1988 et 1997-2002"
      - "Une seule : 1997-2002"
      - "Quatre, dont une depuis 2024"
    why: "Mitterrand et Chirac (1986-1988), Mitterrand et Balladur (1993-1995), Chirac et Jospin (1997-2002)."

  - id: article-49-3
    prompt: "Que se passe-t-il quand le Premier ministre engage le 49.3 sur un texte ?"
    answer: "Le texte est adopté sans vote, sauf si une motion de censure est votée"
    decoys:
      - "Le texte est soumis directement au référendum"
      - "Le Sénat tranche seul, sans l'Assemblée"
      - "Le président doit dissoudre l'Assemblée"
    why: "Le texte est considéré comme adopté, sauf si une motion de censure réunit la majorité absolue des députés."

  - id: censure-2024
    prompt: "Pourquoi la chute du gouvernement Barnier, le 4 décembre 2024, est-elle historique ?"
    answer: "Première motion de censure adoptée depuis 1962"
    decoys:
      - "Premier gouvernement renversé par le Sénat"
      - "Premier vote de confiance perdu sous la Ve République"
      - "Première utilisation de l'article 16 depuis 1961"
    why: "Aucune censure n'avait été adoptée depuis 1962 (gouvernement Pompidou) ; le vote de confiance perdu, c'est Bayrou en 2025."

  - id: bayrou-2025
    prompt: "Comment le gouvernement de François Bayrou est-il tombé, le 8 septembre 2025 ?"
    answer: "En perdant un vote de confiance qu'il avait lui-même demandé"
    decoys:
      - "Par une motion de censure déposée après un 49.3"
      - "Par une dissolution de l'Assemblée nationale"
      - "Par une décision du Conseil constitutionnel"
    why: "Bayrou a engagé la responsabilité du gouvernement (article 49.1) et perdu : une première sous la Ve République."
---
