---
questions:
  - id: naissance
    prompt: "Où et quand est né Nicolas Mayer-Rossignol ?"
    answer: "À Bordeaux, en 1977"
    decoys:
      - "À Rouen, en 1954"
      - "À La Tronche, en 1968"
      - "À Toulouse, en 1971"
    why: "Il est né le 8 avril 1977 à Bordeaux, sous le nom de Nicolas Rossignol."

  - id: nom
    prompt: "Sous quel nom Nicolas Mayer-Rossignol est-il né ?"
    answer: "Nicolas Rossignol"
    decoys:
      - "Nicolas Mayer"
      - "Nicolas Faure"
      - "Nicolas Fabius"
    why: "Il est né Nicolas Rossignol."

  - id: etudes
    prompt: "Quelle formation Nicolas Mayer-Rossignol a-t-il suivie ?"
    answer: "Normale sup, l'agrégation, puis le corps des Mines"
    decoys:
      - "Sciences Po, puis l'ENA, promotion Senghor"
      - "HEC, puis l'ENA, promotion Voltaire"
      - "Une école de commerce à Bordeaux, puis un MBA aux États-Unis"
    why: "Il entre à l'École normale supérieure en 1996, passe l'agrégation de SVT et devient ingénieur des Mines."

  - id: fabius
    prompt: "Auprès de quel ministre Nicolas Mayer-Rossignol est-il conseiller en 2012-2013 ?"
    answer: "Laurent Fabius, aux Affaires étrangères"
    decoys:
      - "Arnaud Montebourg, à l'Économie"
      - "Manuel Valls, à l'Intérieur"
      - "Jean-Marc Ayrault, à Matignon"
    why: "Recruté par Fabius à l'agglomération de Rouen en 2008, il le conseille au Quai d'Orsay."

  - id: haute-normandie
    prompt: "Quelle région Nicolas Mayer-Rossignol préside-t-il à partir de 2013 ?"
    answer: "La Haute-Normandie"
    decoys:
      - "L'Occitanie"
      - "La Bretagne"
      - "Les Hauts-de-France"
    why: "Il devient président de la Haute-Normandie en octobre 2013, à 36 ans."

  - id: age-region
    prompt: "À quel âge Nicolas Mayer-Rossignol devient-il président de région ?"
    answer: "36 ans"
    decoys:
      - "29 ans"
      - "45 ans"
      - "52 ans"
    why: "Il devient président de la Haute-Normandie à 36 ans, en 2013."

  - id: morin
    prompt: "Face à qui Nicolas Mayer-Rossignol perd-il la région Normandie en 2015 ?"
    answer: "Hervé Morin"
    decoys:
      - "Édouard Philippe"
      - "Xavier Bertrand"
      - "Bruno Le Maire"
    why: "Il perd de peu face à Hervé Morin : 36 % contre 36,4 %."

  - id: ecart-2015
    prompt: "Quel est l'écart entre Nicolas Mayer-Rossignol et Hervé Morin en 2015 ?"
    answer: "36 % contre 36,4 %"
    decoys:
      - "30 % contre 50 %"
      - "45 % contre 55 %"
      - "40 % contre 44 %"
    why: "Au second tour, la liste de Morin l'emporte avec 36,4 % contre 36 %."

  - id: rouen-2020
    prompt: "Avec quel score Nicolas Mayer-Rossignol est-il élu maire de Rouen en 2020 ?"
    answer: "67,1 %"
    decoys:
      - "48,14 %"
      - "50,52 %"
      - "45,13 %"
    why: "Il remporte le second tour à Rouen en 2020 avec 67,1 %."

  - id: metropole
    prompt: "Quelle autre fonction Nicolas Mayer-Rossignol exerce-t-il depuis 2020 ?"
    answer: "Président de la Métropole Rouen Normandie"
    decoys:
      - "Président de la région Normandie, élu en 2021"
      - "Député de la Seine-Maritime"
      - "Sénateur de la Seine-Maritime"
    why: "Il préside la Métropole Rouen Normandie depuis 2020, réélu en 2026."

  - id: rouen-2026
    prompt: "Avec quel score Nicolas Mayer-Rossignol est-il réélu maire de Rouen en 2026 ?"
    answer: "48,14 % au second tour"
    decoys:
      - "67,1 % au second tour"
      - "54,34 % au second tour"
      - "Dès le premier tour"
    why: "En mars 2026, il est réélu avec 48,14 % au second tour."

  - id: marseille
    prompt: "Que devient Nicolas Mayer-Rossignol après le congrès de Marseille, en 2023 ?"
    answer: "Premier secrétaire délégué du PS"
    decoys:
      - "Premier secrétaire du PS"
      - "Président du groupe socialiste"
      - "Porte-parole du gouvernement"
    why: "Battu de peu (48,91 %), il devient premier secrétaire délégué."

  - id: score-marseille
    prompt: "Avec quel score Nicolas Mayer-Rossignol perd-il le congrès de Marseille ?"
    answer: "48,91 %"
    decoys:
      - "40,37 %"
      - "17,4 %"
      - "30 %"
    why: "En 2023, il perd avec 48,91 %."

  - id: nancy-motion
    prompt: "Quel score obtient la motion de Nicolas Mayer-Rossignol au congrès de Nancy ?"
    answer: "40,37 %"
    decoys:
      - "51,15 %"
      - "17,4 %"
      - "66,17 %"
    why: "Sa motion obtient 40,37 %, derrière celle d'Olivier Faure."

  - id: nancy-final
    prompt: "Avec quel score Nicolas Mayer-Rossignol perd-il face à Olivier Faure en 2025 ?"
    answer: "48,85 %"
    decoys:
      - "51,15 %"
      - "36 %"
      - "55,5 %"
    why: "Au congrès de Nancy, il perd avec 48,85 % face à Faure (51,15 %)."

  - id: grand-parti
    prompt: "Que propose Nicolas Mayer-Rossignol pour 2027 ?"
    answer: "« Un grand parti » avec Glucksmann ou Cazeneuve"
    decoys:
      - "Une alliance avec LFI dès le premier tour"
      - "Une primaire avec Les Écologistes et le PCF"
      - "Le ralliement du PS à Renaissance"
    why: "Il plaide pour un grand parti rassemblant les socialistes et des personnalités comme Raphaël Glucksmann ou Bernard Cazeneuve."

  - id: ambiguite
    prompt: "Que reproche le camp de Nicolas Mayer-Rossignol à Olivier Faure ?"
    answer: "Son « ambiguïté » vis-à-vis de LFI"
    decoys:
      - "Son refus de toute alliance à gauche"
      - "Son soutien à Raphaël Glucksmann"
      - "Sa proximité avec Emmanuel Macron"
    why: "Son camp reproche à Faure son « ambiguïté » vis-à-vis de LFI."

  - id: retraites
    prompt: "Quelle est la position de Nicolas Mayer-Rossignol sur les retraites ?"
    answer: "Contre la réforme de 2023, mais 60 ans lui paraît irréaliste"
    decoys:
      - "Pour la réforme de 2023 et le départ à 64 ans"
      - "Pour un retour immédiat à 60 ans pour tous"
      - "Pour un système universel par points, sans aucun âge légal de départ"
    why: "Opposé à la réforme de 2023, il juge irréaliste un retour à 60 ans."

  - id: presidentielle-2022
    prompt: "Qui Nicolas Mayer-Rossignol soutient-il au second tour de la présidentielle de 2022 ?"
    answer: "Emmanuel Macron"
    decoys:
      - "Marine Le Pen"
      - "Personne, il vote blanc"
      - "Jean-Luc Mélenchon"
    why: "Il soutient Anne Hidalgo, puis Emmanuel Macron au second tour face à Marine Le Pen."

  - id: sante
    prompt: "Qu'annonce Nicolas Mayer-Rossignol en novembre 2024 ?"
    answer: "Qu'il est soigné pour un cancer depuis 2022"
    decoys:
      - "Qu'il quitte le Parti socialiste"
      - "Qu'il ne se représente pas à Rouen"
      - "Qu'il est candidat à la présidentielle"
    why: "Il annonce être soigné pour un cancer de la vessie depuis 2022 ; une récidive est annoncée en juin 2026."
---
