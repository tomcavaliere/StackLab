---
questions:
  - id: fondation
    prompt: "Quand et où les Verts sont-ils fondés ?"
    answer: "En janvier 1984, à Clichy"
    decoys:
      - "En mai 1974, lors de la campagne de René Dumont"
      - "En novembre 2010, aux Assises de Lyon"
      - "En juin 1981, après l'élection de François Mitterrand"
    why: "Les Verts naissent les 28 et 29 janvier 1984 à Clichy, de la fusion de deux organisations écologistes."

  - id: noms
    prompt: "Dans quel ordre le parti a-t-il porté ses trois noms ?"
    answer: "Les Verts, puis EELV, puis Les Écologistes"
    decoys:
      - "EELV, puis Les Verts, puis Les Écologistes"
      - "Les Écologistes, puis Les Verts, puis EELV"
      - "Génération écologie, puis Les Verts, puis EELV"
    why: "Les Verts (1984) deviennent Europe Écologie Les Verts en 2010, puis Les Écologistes en 2023."

  - id: nom-2023
    prompt: "Quand le parti adopte-t-il le nom « Les Écologistes » ?"
    answer: "Le 14 octobre 2023"
    decoys:
      - "Le 13 novembre 2010"
      - "Le 10 décembre 2022"
      - "Le 19 avril 2025"
    why: "Le nom Les Écologistes est adopté le 14 octobre 2023 ; EELV datait du 13 novembre 2010."

  - id: ni-ni
    prompt: "Quelle ligne les Verts défendent-ils sous Antoine Waechter, à partir de 1986 ?"
    answer: "Le « ni droite ni gauche »"
    decoys:
      - "L'alliance systématique avec le Parti socialiste"
      - "L'union de la gauche avec le Parti communiste"
      - "Le ralliement à la majorité de droite de Jacques Chirac"
    why: "Sous Waechter, « l'écologie politique n'est pas à marier » ; le « ni ni » est abandonné en 1994."

  - id: voynet-1997
    prompt: "Quel poste Dominique Voynet occupe-t-elle à partir de 1997 ?"
    answer: "Ministre de l'Environnement du gouvernement Jospin"
    decoys:
      - "Secrétaire d'État au Logement du gouvernement Ayrault"
      - "Présidente du groupe écologiste à l'Assemblée nationale"
      - "Tête de liste écologiste aux européennes de 1999"
    why: "Après les législatives de 1997, Dominique Voynet devient ministre de l'Environnement de la « gauche plurielle »."

  - id: europe-ecologie
    prompt: "Quel score obtiennent les listes Europe Écologie aux européennes de 2009 ?"
    answer: "16,28 %"
    decoys:
      - "13,48 %"
      - "9,72 %"
      - "5,50 %"
    why: "Europe Écologie obtient 16,28 % en 2009 ; 13,48 % est le score de 2019 et 5,50 % celui de 2024."

  - id: vague-verte
    prompt: "Quelles grandes villes les écologistes gagnent-ils lors de la « vague verte » des municipales de 2020 ?"
    answer: "Lyon, Bordeaux et Strasbourg"
    decoys:
      - "Paris, Marseille et Toulouse"
      - "Lille, Nantes et Rennes"
      - "Nice, Toulon et Perpignan"
    why: "En 2020, les écologistes gagnent Lyon, Bordeaux et Strasbourg, et gardent ou gagnent Grenoble, Besançon, Tours et Poitiers."

  - id: secretaire-nationale
    prompt: "Qui est secrétaire nationale des Écologistes depuis décembre 2022 ?"
    answer: "Marine Tondelier"
    decoys:
      - "Cyrielle Chatelain"
      - "Sandrine Rousseau"
      - "Marie Toussaint"
    why: "Marine Tondelier est élue secrétaire nationale le 10 décembre 2022."

  - id: nucleaire
    prompt: "Quelle est la position historique du parti sur le nucléaire ?"
    answer: "La sortie progressive, vers 100 % de renouvelables"
    decoys:
      - "La construction de six nouveaux réacteurs EPR"
      - "Le maintien du parc actuel sans nouveau réacteur ni fermeture"
      - "La relance d'un grand programme de petits réacteurs modulaires"
    why: "Héritiers du mouvement antinucléaire, Les Écologistes veulent sortir du nucléaire et viser 100 % de renouvelables."

  - id: europe
    prompt: "Quelle vision de l'Europe défendent Les Écologistes ?"
    answer: "Une Europe fédérale, avec une défense commune"
    decoys:
      - "Une sortie de l'Union européenne par référendum"
      - "Une Europe des nations, sans transfert de compétences"
      - "Un retour aux seuls accords de libre-échange"
    why: "Le parti est fédéraliste : Europe plus intégrée, défense commune, budget européen bien plus élevé."

  - id: programme-titre
    prompt: "Comment s'intitule le programme des Écologistes présenté en juillet 2026 ?"
    answer: "« Pour une prospérité écologique »"
    decoys:
      - "« L'Avenir en commun »"
      - "« La Nouvelle France »"
      - "« Demain, si tout va bien… »"
    why: "« Pour une prospérité écologique » est présenté le 13 juillet 2026 ; « Demain, si tout va bien… » est le livre de Marine Tondelier."

  - id: smic
    prompt: "Que propose le programme des Écologistes de 2026 pour le SMIC ?"
    answer: "2 000 € brut par mois dès 2027"
    decoys:
      - "1 600 € net par mois dès 2027"
      - "1 823 € brut, sans hausse au-delà de l'inflation"
      - "Sa suppression au profit d'un revenu universel"
    why: "Le programme propose un SMIC à 2 000 € brut dès 2027 ; LFI, qui demande 1 600 € net, le juge insuffisant."

  - id: retraite
    prompt: "Que propose le programme des Écologistes de 2026 sur l'âge de départ à la retraite ?"
    answer: "Revenir à 62 ans, avec 60 ans comme objectif à terme"
    decoys:
      - "Garder 64 ans en améliorant les carrières longues"
      - "Passer à 65 ans en échange d'une pension minimum"
      - "Revenir à 60 ans pour tous dès 2027"
    why: "Le programme abroge la réforme de 2023, revient à 62 ans et vise 60 ans à terme, notamment pour les carrières pénibles."

  - id: fiscalite
    prompt: "Quelle mesure fiscale figure dans le programme des Écologistes de 2026 ?"
    answer: "La taxe Zucman de 2 % au-delà de 100 millions de patrimoine"
    decoys:
      - "Une flat tax de 30 % sur tous les revenus du capital"
      - "La suppression de l'impôt sur la fortune immobilière"
      - "Un impôt sur le revenu à taux unique de 15 %"
    why: "Le programme reprend la taxe Zucman (2 % au-delà de 100 millions d'euros) et un « impôt sur la fortune vert »."

  - id: institutions
    prompt: "Que propose le programme des Écologistes pour les élections législatives ?"
    answer: "La proportionnelle intégrale"
    decoys:
      - "Le maintien du scrutin majoritaire à deux tours"
      - "Un scrutin majoritaire à un seul tour"
      - "Une dose de 10 % de proportionnelle"
    why: "Le programme propose la proportionnelle intégrale, la sortie de la Ve République par une constituante et la suppression du 49.3."

  - id: cannabis
    prompt: "Que propose le programme des Écologistes sur le cannabis ?"
    answer: "Sa légalisation encadrée"
    decoys:
      - "Le maintien de l'interdiction avec des amendes plus lourdes"
      - "Sa seule autorisation pour un usage médical"
      - "La dépénalisation sans vente légale"
    why: "Le programme propose la légalisation encadrée du cannabis, ainsi que l'aide active à mourir."

  - id: europeennes-2024
    prompt: "Quel score obtient la liste des Écologistes aux européennes de 2024 ?"
    answer: "5,50 %, 5 sièges"
    decoys:
      - "13,48 %, 13 sièges"
      - "9,89 %, 9 sièges"
      - "4,63 %, aucun siège"
    why: "La liste de Marie Toussaint obtient 5,50 % et 5 sièges ; 13,48 % était le score de Yannick Jadot en 2019."

  - id: municipales-2026
    prompt: "Quelles villes les écologistes conservent-ils aux municipales de 2026 ?"
    answer: "Lyon, Grenoble et Tours"
    decoys:
      - "Bordeaux, Strasbourg et Besançon"
      - "Poitiers, Annecy et Colombes"
      - "Paris, Lille et Nantes"
    why: "En 2026, les écologistes gardent Lyon, Grenoble et Tours, mais perdent Bordeaux, Strasbourg, Besançon, Poitiers et Annecy."

  - id: vote-decembre
    prompt: "Que décide le conseil fédéral des Écologistes le 21 septembre 2026 ?"
    answer: "De faire voter les adhérents en décembre sur la candidature"
    decoys:
      - "D'investir Yannick Jadot à la place de Marine Tondelier"
      - "De rallier immédiatement la candidature de Mélenchon"
      - "De participer à la primaire du PS du 11 octobre"
    why: "La motion adoptée à 69,44 % prévoit un vote des adhérents du 10 au 13 décembre 2026 sur le maintien d'une candidature écologiste."

  - id: meilleur-score
    prompt: "Quel est le meilleur score d'un candidat écologiste à une présidentielle ?"
    answer: "5,25 %, Noël Mamère en 2002"
    decoys:
      - "4,63 %, Yannick Jadot en 2022"
      - "3,88 %, Brice Lalonde en 1981"
      - "2,31 %, Eva Joly en 2012"
    why: "Noël Mamère obtient 5,25 % en 2002, le meilleur score écologiste à une présidentielle."
---
