---
questions:
  - id: mode-election
    prompt: "Depuis quand le président est-il élu au suffrage universel direct ?"
    answer: "Depuis la révision de 1962"
    decoys:
      - "Depuis la Constitution de 1958"
      - "Depuis le quinquennat de 2000"
      - "Depuis la révision de 2008"
    why: "La révision de 1962 instaure l'élection directe ; la Constitution de 1958 prévoyait un collège d'élus."

  - id: duree-mandat
    prompt: "Pour combien de temps le président est-il élu depuis 2002 ?"
    answer: "Cinq ans"
    decoys:
      - "Sept ans"
      - "Quatre ans"
      - "Six ans"
    why: "Le quinquennat s'applique depuis 2002."

  - id: limite-mandats
    prompt: "Combien de mandats consécutifs un président peut-il exercer ?"
    answer: "Deux au plus, depuis 2008"
    decoys:
      - "Un seul, depuis 2000"
      - "Trois au plus, depuis 1962"
      - "Aucune limite"
    why: "La révision de 2008 limite à deux mandats consécutifs."

  - id: article-5
    prompt: "Selon l'article 5, quel est le rôle du président ?"
    answer: "Veiller au respect de la Constitution et assurer par son arbitrage le fonctionnement des pouvoirs publics"
    decoys:
      - "Déterminer et conduire la politique de la Nation"
      - "Voter les lois et contrôler le gouvernement"
      - "Juger la conformité des lois à la Constitution"
    why: "L'article 5 fait du président un arbitre et un garant ; conduire la politique de la Nation revient au gouvernement (article 20)."

  - id: contreseing
    prompt: "Qu'est-ce que le contreseing ?"
    answer: "La signature d'un ministre sur un acte du président"
    decoys:
      - "Le vote de l'Assemblée qui confirme le Premier ministre"
      - "L'avis du Conseil constitutionnel sur une loi"
      - "La signature du président sur un décret ministériel"
    why: "Les pouvoirs partagés exigent le contreseing du Premier ministre et, le cas échéant, des ministres."

  - id: article-19
    prompt: "Quel article fixe la liste des pouvoirs propres du président ?"
    answer: "L'article 19"
    decoys:
      - "L'article 5"
      - "L'article 20"
      - "L'article 49"
    why: "L'article 19 énumère les actes dispensés de contreseing."

  - id: pouvoir-propre
    prompt: "Lequel de ces actes est un pouvoir propre du président ?"
    answer: "Dissoudre l'Assemblée nationale"
    decoys:
      - "Nommer les ministres"
      - "Signer les décrets délibérés en Conseil des ministres"
      - "Nommer aux hauts emplois civils et militaires"
    why: "La dissolution (article 12) est un pouvoir propre ; les trois autres exigent le contreseing."

  - id: pouvoir-partage
    prompt: "Lequel de ces actes exige le contreseing du Premier ministre ?"
    answer: "Nommer les ministres"
    decoys:
      - "Nommer le Premier ministre"
      - "Recourir à l'article 16"
      - "Soumettre un projet de loi au référendum"
    why: "Les ministres sont nommés sur proposition du Premier ministre, avec contreseing ; nommer le Premier ministre est un pouvoir propre."

  - id: referendum
    prompt: "Sur proposition de qui le président peut-il soumettre un projet de loi au référendum (article 11) ?"
    answer: "Du gouvernement ou du Parlement"
    decoys:
      - "Du Conseil constitutionnel"
      - "D'un million de citoyens"
      - "Du Conseil européen"
    why: "L'article 11 prévoit une proposition du gouvernement ou des deux assemblées."

  - id: chef-armees
    prompt: "Quel article fait du président le chef des armées ?"
    answer: "L'article 15"
    decoys:
      - "L'article 12"
      - "L'article 21"
      - "L'article 68"
    why: "L'article 15 fait du président le chef des armées."

  - id: conseil-ministres
    prompt: "Qui préside le Conseil des ministres ?"
    answer: "Le président de la République"
    decoys:
      - "Le Premier ministre"
      - "Le président de l'Assemblée nationale"
      - "Le ministre le plus ancien"
    why: "L'article 9 confie la présidence du Conseil des ministres au chef de l'État."

  - id: domaine-reserve
    prompt: "Qu'est-ce que le « domaine réservé » ?"
    answer: "Une pratique qui laisse la défense et la politique étrangère au président"
    decoys:
      - "Un article de la Constitution sur les pouvoirs du président"
      - "Les sujets que le Parlement ne peut pas examiner"
      - "Les nominations réservées au Premier ministre"
    why: "L'expression, employée dès 1959 par Chaban-Delmas, désigne une pratique, pas une règle écrite."

  - id: chaban
    prompt: "Qui a employé dès 1959 l'expression « domaine réservé » ?"
    answer: "Jacques Chaban-Delmas"
    decoys:
      - "Michel Debré"
      - "Charles de Gaulle"
      - "Georges Pompidou"
    why: "L'expression est attribuée à Jacques Chaban-Delmas, en 1959."

  - id: fait-majoritaire
    prompt: "De quoi dépend surtout le poids du président sur la politique intérieure ?"
    answer: "D'avoir ou non une majorité à l'Assemblée"
    decoys:
      - "Du nombre de ses mandats précédents"
      - "De l'accord du Conseil constitutionnel"
      - "Du résultat des élections européennes"
    why: "Avec une majorité, il inspire la politique du gouvernement ; en cohabitation ou sans majorité, son influence se réduit."

  - id: responsabilite
    prompt: "L'Assemblée nationale peut-elle renverser le président ?"
    answer: "Non, il n'est pas responsable politiquement devant le Parlement"
    decoys:
      - "Oui, par une motion de censure"
      - "Oui, par un vote de défiance à la majorité simple"
      - "Oui, si le Sénat est d'accord"
    why: "La censure vise le gouvernement ; le président ne peut être que destitué par la Haute Cour."

  - id: destitution
    prompt: "Depuis 2007, comment le président peut-il être destitué ?"
    answer: "Par le Parlement réuni en Haute Cour, pour un manquement grave à ses devoirs"
    decoys:
      - "Par le Conseil constitutionnel, à la demande du gouvernement"
      - "Par un référendum révocatoire"
      - "Par la Cour de cassation, après un procès"
    why: "L'article 68 prévoit la destitution par la Haute Cour pour un manquement manifestement incompatible avec son mandat."

  - id: interim
    prompt: "Qui assure l'intérim en cas de vacance de la présidence ?"
    answer: "Le président du Sénat"
    decoys:
      - "Le Premier ministre"
      - "Le président de l'Assemblée nationale"
      - "Le président du Conseil constitutionnel"
    why: "L'article 7 confie l'intérim au président du Sénat, comme Alain Poher en 1969 et en 1974."

  - id: poher
    prompt: "Qui a assuré l'intérim de la présidence en 1969 et en 1974 ?"
    answer: "Alain Poher"
    decoys:
      - "Jacques Chaban-Delmas"
      - "Gaston Monnerville"
      - "Valéry Giscard d'Estaing"
    why: "Alain Poher, président du Sénat, a assuré l'intérim après le départ de De Gaulle (1969) et la mort de Pompidou (1974)."

  - id: ordre-presidents
    prompt: "Quel président a précédé Emmanuel Macron ?"
    answer: "François Hollande"
    decoys:
      - "Nicolas Sarkozy"
      - "Jacques Chirac"
      - "François Mitterrand"
    why: "L'ordre est de Gaulle, Pompidou, Giscard d'Estaing, Mitterrand, Chirac, Sarkozy, Hollande, Macron."

  - id: macron-2027
    prompt: "Pourquoi Emmanuel Macron ne peut-il pas se représenter en 2027 ?"
    answer: "Il a déjà fait deux mandats consécutifs"
    decoys:
      - "Il a dépassé l'âge limite fixé par la Constitution"
      - "Le Conseil constitutionnel l'a déclaré inéligible"
      - "Le quinquennat interdit toute réélection"
    why: "Élu en 2017 et réélu en 2022, il atteint la limite de deux mandats consécutifs fixée en 2008."
---
