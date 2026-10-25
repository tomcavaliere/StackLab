---
questions:
  - id: naissance
    prompt: "Où et quand est né Emmanuel Macron ?"
    answer: "À Amiens, en 1977"
    decoys:
      - "À Rouen, en 1974"
      - "À Clamart, en 1979"
      - "À Versailles, en 1981"
    why: "Il est né le 21 décembre 1977 à Amiens (Somme)."
  - id: ena
    prompt: "De quelle promotion de l'ENA Emmanuel Macron est-il issu ?"
    answer: "La promotion Senghor (2002-2004)"
    decoys:
      - "La promotion Voltaire (1978-1980)"
      - "La promotion Marc-Bloch (1995-1997)"
      - "La promotion Jean-Monnet (2008-2010)"
    why: "Il sort de l'ENA, promotion Léopold-Sédar-Senghor (2002-2004)."
  - id: banque
    prompt: "Quelle banque Emmanuel Macron rejoint-il en 2008 ?"
    answer: "Rothschild & Cie"
    decoys:
      - "BNP Paribas"
      - "La Société générale"
      - "Lazard Frères"
    why: "Inspecteur des finances, il entre chez Rothschild & Cie en 2008 et en devient associé-gérant fin 2010."
  - id: elysee-adjoint
    prompt: "Quel poste Emmanuel Macron occupe-t-il à l'Élysée de 2012 à 2014 ?"
    answer: "Secrétaire général adjoint, auprès de François Hollande"
    decoys:
      - "Porte-parole, auprès de François Hollande"
      - "Conseiller diplomatique, auprès de Nicolas Sarkozy"
      - "Directeur de cabinet, auprès de Jean-Marc Ayrault"
    why: "Il est secrétaire général adjoint de l'Élysée du 15 mai 2012 au 15 juillet 2014."
  - id: ministre
    prompt: "De quel ministère Emmanuel Macron a-t-il la charge de 2014 à 2016 ?"
    answer: "L'Économie, l'Industrie et le Numérique"
    decoys:
      - "Les Finances et les Comptes publics"
      - "Le Travail, l'Emploi et le Dialogue social"
      - "L'Europe et les Affaires étrangères"
    why: "Il est ministre de l'Économie du 26 août 2014 au 30 août 2016 ; la « loi Macron » est adoptée en 2015."
  - id: en-marche
    prompt: "Quand Emmanuel Macron fonde-t-il En marche ?"
    answer: "Le 6 avril 2016"
    decoys:
      - "Le 30 août 2016"
      - "Le 24 novembre 2016"
      - "Le 17 septembre 2022"
    why: "Il fonde En marche le 6 avril 2016, puis quitte le gouvernement en août."
  - id: election-2017
    prompt: "Avec quel score Emmanuel Macron est-il élu en 2017 ?"
    answer: "66,10 % au second tour"
    decoys:
      - "58,55 % au second tour"
      - "51,76 % au second tour"
      - "54,02 % au second tour"
    why: "Le 7 mai 2017, il bat Marine Le Pen avec 66,10 %."
  - id: reelection
    prompt: "Avec quel score Emmanuel Macron est-il réélu en 2022 ?"
    answer: "58,55 %"
    decoys:
      - "66,10 %"
      - "51,64 %"
      - "62,40 %"
    why: "Le 24 avril 2022, il est réélu avec 58,55 %, de nouveau face à Marine Le Pen."
  - id: gilets-jaunes
    prompt: "Qu'annonce Emmanuel Macron face aux gilets jaunes ?"
    answer: "Une hausse de 100 euros par mois au niveau du SMIC"
    decoys:
      - "Le rétablissement de l'impôt sur la fortune"
      - "Une baisse de 10 centimes du prix de l'essence"
      - "La dissolution de l'Assemblée nationale"
    why: "Il annonce une hausse de 100 euros par mois au niveau du SMIC pour 2019 et lance le Grand débat national."
  - id: grand-debat
    prompt: "Que lance Emmanuel Macron en décembre 2018, en réponse aux gilets jaunes ?"
    answer: "Le Grand débat national"
    decoys:
      - "La Convention citoyenne pour le climat"
      - "Un référendum sur les institutions"
      - "Un nouveau gouvernement dirigé par la gauche"
    why: "Le Grand débat national est lancé en décembre 2018 ; il en tire les conclusions le 25 avril 2019."
  - id: isf
    prompt: "Quelle réforme fiscale marque le début du premier quinquennat ?"
    answer: "Le remplacement de l'ISF par un impôt sur la fortune immobilière"
    decoys:
      - "La création d'une taxe sur les très hautes successions"
      - "La suppression de la CSG pour tous les retraités"
      - "Le rétablissement de la tranche d'impôt à 75 %"
    why: "L'ISF est remplacé par l'IFI, qui ne porte plus que sur l'immobilier."
  - id: covid
    prompt: "Quelle formule résume la politique d'aides publiques d'Emmanuel Macron pendant le Covid-19 ?"
    answer: "« Quoi qu'il en coûte »"
    decoys:
      - "« En même temps »"
      - "« Travailler plus pour gagner plus »"
      - "« Le changement, c'est maintenant »"
    why: "Le « quoi qu'il en coûte » devient le principe des aides massives pendant la pandémie."
  - id: retraites
    prompt: "Que prévoit la réforme des retraites de 2023 ?"
    answer: "Le report de l'âge de départ de 62 à 64 ans"
    decoys:
      - "Le retour de la retraite à 60 ans pour tous"
      - "Un système universel par points, sans âge légal"
      - "Le report de l'âge de départ de 64 à 67 ans"
    why: "La réforme de 2023 porte l'âge de départ de 62 à 64 ans ; elle est adoptée par le 49.3."
  - id: loi-immigration
    prompt: "Avec quelles voix la loi immigration de décembre 2023 est-elle adoptée ?"
    answer: "Celles du camp présidentiel, de LR et du RN"
    decoys:
      - "Celles du camp présidentiel et de la gauche"
      - "Celles du seul camp présidentiel, sans aucun autre groupe"
      - "Elle est adoptée par référendum, sans vote du Parlement"
    why: "La loi immigration est votée en décembre 2023 avec les voix de LR et du RN."
  - id: dissolution
    prompt: "Quand Emmanuel Macron dissout-il l'Assemblée nationale ?"
    answer: "Le 9 juin 2024, après les européennes"
    decoys:
      - "Le 24 avril 2022, après sa réélection"
      - "Le 16 mars 2023, après le 49.3 sur les retraites"
      - "Le 4 décembre 2024, après la censure de Barnier"
    why: "Le 9 juin 2024, après la victoire du RN aux européennes, il dissout l'Assemblée."
  - id: palestine
    prompt: "Que fait Emmanuel Macron le 22 septembre 2025 à l'ONU ?"
    answer: "Il reconnaît l'État de Palestine"
    decoys:
      - "Il annonce l'envoi de troupes en Ukraine"
      - "Il propose l'entrée de l'Ukraine dans l'OTAN"
      - "Il annonce la sortie de la France du commandement intégré de l'OTAN"
    why: "Il reconnaît l'État de Palestine, une première pour un pays du G7."
  - id: premiers-ministres
    prompt: "Quels Premiers ministres se succèdent après la dissolution de 2024 ?"
    answer: "Michel Barnier, François Bayrou, Sébastien Lecornu"
    decoys:
      - "Élisabeth Borne, Gabriel Attal, Michel Barnier"
      - "Édouard Philippe, Jean Castex, Élisabeth Borne"
      - "Michel Barnier, Gérald Darmanin, Sébastien Lecornu"
    why: "Depuis 2024, il gouverne sans majorité avec Michel Barnier, François Bayrou puis Sébastien Lecornu."
  - id: confiance
    prompt: "À combien tombe la cote de confiance d'Emmanuel Macron fin octobre 2025 ?"
    answer: "11 %"
    decoys:
      - "24 %"
      - "33 %"
      - "4 %"
    why: "Fin octobre 2025, elle tombe à 11 %, au niveau le plus bas de François Hollande."
  - id: renaissance-role
    prompt: "Quel titre Emmanuel Macron a-t-il dans Renaissance depuis 2022 ?"
    answer: "Président d'honneur"
    decoys:
      - "Secrétaire général"
      - "Président du conseil national"
      - "Aucun : il a quitté le parti en 2022"
    why: "Il est président d'honneur de Renaissance ; le secrétaire général est Gabriel Attal depuis décembre 2024."
  - id: candidat-2027
    prompt: "Pourquoi Emmanuel Macron n'est-il pas candidat en 2027 ?"
    answer: "La Constitution interdit plus de deux mandats consécutifs"
    decoys:
      - "Il a annoncé en 2024 qu'il quittait la vie politique"
      - "Renaissance a préféré organiser une primaire interne"
      - "Il a été désigné à la tête de la Commission européenne"
    why: "Élu en 2017 et réélu en 2022, il ne peut pas se représenter en 2027."
---
