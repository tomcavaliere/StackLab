---
questions:
  - id: etats
    prompt: "Combien d'États compte l'Union européenne ?"
    answer: "27"
    decoys:
      - "28"
      - "25"
      - "46"
    why: "27 États membres ; 46 est le nombre d'États du Conseil de l'Europe, une autre organisation."

  - id: fondateur
    prompt: "Quel traité de 1957 crée la Communauté économique européenne ?"
    answer: "Le traité de Rome"
    decoys:
      - "Le traité de Maastricht"
      - "Le traité de Lisbonne"
      - "Le traité de Paris"
    why: "Le traité de Rome (1957) ; la France avait signé la CECA en 1951."

  - id: commission-role
    prompt: "Quel est le rôle principal de la Commission européenne ?"
    answer: "Proposer les textes législatifs et veiller à l'application des traités"
    decoys:
      - "Voter les lois européennes"
      - "Fixer les taux d'intérêt de la zone euro"
      - "Juger les États qui ne respectent pas les droits de l'homme, depuis Strasbourg"
    why: "La Commission propose et fait appliquer ; le vote revient au Parlement et au Conseil de l'UE."

  - id: von-der-leyen
    prompt: "Qui préside la Commission européenne, dans un second mandat depuis décembre 2024 ?"
    answer: "Ursula von der Leyen"
    decoys:
      - "Christine Lagarde"
      - "Roberta Metsola"
      - "Jean-Claude Juncker"
    why: "Ursula von der Leyen a commencé son second mandat en décembre 2024."

  - id: pe-election
    prompt: "Depuis quand le Parlement européen est-il élu au suffrage universel direct ?"
    answer: "Depuis 1979"
    decoys:
      - "Depuis 1957"
      - "Depuis 1992"
      - "Depuis 2004"
    why: "Les premières élections européennes directes ont eu lieu en 1979."

  - id: pe-taille
    prompt: "Combien de députés compte le Parlement européen depuis 2024 ?"
    answer: "720"
    decoys:
      - "577"
      - "705"
      - "751"
    why: "720 députés depuis 2024."

  - id: france-81
    prompt: "Combien de députés européens sont élus en France ?"
    answer: "81"
    decoys:
      - "79"
      - "96"
      - "100"
    why: "81 eurodéputés sont élus en France depuis 2024."

  - id: colegislateurs
    prompt: "Quelles institutions votent les lois européennes ?"
    answer: "Le Parlement européen et le Conseil de l'UE"
    decoys:
      - "La Commission et le Conseil européen"
      - "La Commission seule"
      - "Le Conseil européen et la Cour de justice"
    why: "Ce sont les deux colégislateurs ; la Commission propose, le Conseil européen oriente."

  - id: conseil-ue
    prompt: "Qui siège au Conseil de l'Union européenne ?"
    answer: "Les ministres des 27, par domaine"
    decoys:
      - "Les chefs d'État ou de gouvernement"
      - "Les commissaires européens"
      - "Les présidents des parlements nationaux"
    why: "Le Conseil de l'UE réunit les ministres ; les chefs d'État ou de gouvernement forment le Conseil européen."

  - id: presidence-tournante
    prompt: "Tous les combien la présidence du Conseil de l'UE change-t-elle d'État ?"
    answer: "Tous les six mois"
    decoys:
      - "Tous les ans"
      - "Tous les cinq ans"
      - "Tous les deux ans et demi"
    why: "La présidence tourne entre les États tous les six mois."

  - id: conseil-europeen
    prompt: "Que fait le Conseil européen ?"
    answer: "Il fixe les grandes orientations, sans voter les lois"
    decoys:
      - "Il vote les lois et le budget de l'Union avec le Parlement européen"
      - "Il juge les litiges entre États"
      - "Il conduit la politique monétaire"
    why: "Il réunit les chefs d'État ou de gouvernement et donne le cap."

  - id: cjue-bce
    prompt: "Où siège la Banque centrale européenne ?"
    answer: "À Francfort"
    decoys:
      - "À Bruxelles"
      - "À Luxembourg"
      - "À Strasbourg"
    why: "La BCE est à Francfort ; la Cour de justice de l'UE est à Luxembourg."

  - id: maastricht
    prompt: "Que crée le traité de Maastricht ?"
    answer: "L'Union européenne, et il prévoit la monnaie unique"
    decoys:
      - "La CECA et le marché commun du charbon"
      - "Le Conseil de l'Europe"
      - "L'élection directe du Parlement européen"
    why: "Maastricht (1992) crée l'Union européenne et prévoit l'euro."

  - id: petit-oui
    prompt: "Pourquoi parle-t-on du « petit oui » de 1992 ?"
    answer: "Le référendum sur Maastricht n'a recueilli qu'un peu plus de 51 % de oui"
    decoys:
      - "Moins d'un tiers des électeurs inscrits se sont déplacés pour voter ce dimanche-là"
      - "Seul le Sénat a voté oui"
      - "Le oui l'a emporté dans une seule région"
    why: "Le 20 septembre 1992, le oui l'emporte de justesse, avec un peu plus de 51 %."

  - id: non-2005
    prompt: "Qu'ont voté les Français le 29 mai 2005 ?"
    answer: "Non au traité constitutionnel européen, avec près de 55 %"
    decoys:
      - "Oui au traité de Lisbonne"
      - "Oui au traité de Lisbonne, ratifié ensuite par le Parlement"
      - "Non à l'élargissement de l'UE"
    why: "Le traité constitutionnel est rejeté par référendum avec près de 55 % de non."

  - id: lisbonne
    prompt: "Comment la France a-t-elle ratifié le traité de Lisbonne ?"
    answer: "Par la voie parlementaire, en 2008"
    decoys:
      - "Par référendum, en 2005"
      - "Par décret du président"
      - "Elle ne l'a pas ratifié"
    why: "Lisbonne, qui reprend une grande partie du traité de 2005, est ratifié par le Parlement en 2008."

  - id: euro
    prompt: "Depuis quand l'euro circule-t-il en pièces et billets ?"
    answer: "Depuis 2002"
    decoys:
      - "Depuis 1992"
      - "Depuis 1999"
      - "Depuis 2007"
    why: "Les pièces et billets en euros circulent depuis 2002."

  - id: clivage
    prompt: "Pourquoi l'Europe est-elle un clivage particulier entre partis ?"
    answer: "Il traverse la gauche et la droite"
    decoys:
      - "Seule la gauche est divisée sur l'Europe"
      - "Seule la droite est divisée sur l'Europe"
      - "Tous les partis veulent sortir de l'UE"
    why: "En 1992 comme en 2005, le non a rassemblé des électeurs de gauche et de droite."

  - id: conseil-europe
    prompt: "Quelle différence entre le Conseil européen et le Conseil de l'Europe ?"
    answer: "Le Conseil de l'Europe est une autre organisation, hors de l'UE"
    decoys:
      - "Aucune, ce sont deux noms de la même institution"
      - "Le Conseil de l'Europe est le parlement de l'UE"
      - "Le Conseil de l'Europe réunit les ministres de l'UE"
    why: "Le Conseil de l'Europe (46 États) dont dépend la Cour européenne des droits de l'homme n'appartient pas à l'UE."

  - id: groupes
    prompt: "Comment siègent les députés européens ?"
    answer: "Par groupes politiques européens"
    decoys:
      - "Par nationalité"
      - "Par ordre alphabétique"
      - "Par ancienneté"
    why: "Ils siègent par groupes politiques, avec des élus d'autres pays."
---
