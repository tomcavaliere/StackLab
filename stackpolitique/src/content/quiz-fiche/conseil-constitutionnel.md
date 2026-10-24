---
questions:
  - id: nombre-membres
    prompt: "Combien de membres nommés compte le Conseil constitutionnel ?"
    answer: "Neuf"
    decoys:
      - "Sept"
      - "Douze"
      - "Quinze"
    why: "Neuf membres nommés, auxquels s'ajoutent les anciens présidents de la République, membres de droit."

  - id: duree
    prompt: "Pour combien de temps les membres sont-ils nommés ?"
    answer: "Neuf ans, non renouvelables"
    decoys:
      - "Six ans, renouvelables une fois"
      - "Cinq ans, comme le président"
      - "À vie"
    why: "Le mandat dure neuf ans et n'est pas renouvelable."

  - id: renouvellement
    prompt: "Comment le Conseil est-il renouvelé ?"
    answer: "Par tiers tous les trois ans"
    decoys:
      - "Par moitié tous les trois ans"
      - "En entier tous les neuf ans"
      - "À chaque élection présidentielle"
    why: "Trois membres sont renouvelés tous les trois ans."

  - id: qui-nomme
    prompt: "Qui nomme les membres du Conseil constitutionnel ?"
    answer: "Le président de la République et les présidents des deux chambres, trois chacun"
    decoys:
      - "Le Parlement réuni en Congrès"
      - "Les magistrats de la Cour de cassation"
      - "Le Premier ministre, sur proposition du garde des Sceaux et après avis du Conseil d'État"
    why: "Trois par le président de la République, trois par le président de l'Assemblée, trois par le président du Sénat."

  - id: controle-2008
    prompt: "Depuis 2008, quel contrôle s'exerce sur ces nominations ?"
    answer: "Les commissions des lois peuvent s'y opposer aux trois cinquièmes"
    decoys:
      - "Le Conseil d'État doit les approuver après une audition publique des candidats"
      - "Un référendum les confirme"
      - "Aucun : elles sont libres"
    why: "Les nominations passent devant les commissions des lois, qui peuvent les bloquer à la majorité des trois cinquièmes des suffrages exprimés."

  - id: membres-droit
    prompt: "Qui est membre de droit du Conseil constitutionnel ?"
    answer: "Les anciens présidents de la République"
    decoys:
      - "Les anciens Premiers ministres"
      - "Les présidents des deux chambres"
      - "Le vice-président du Conseil d'État"
    why: "Les anciens présidents de la République en sont membres de droit."

  - id: president-cc
    prompt: "Qui préside le Conseil constitutionnel depuis mars 2025 ?"
    answer: "Richard Ferrand"
    decoys:
      - "Laurent Fabius"
      - "Jean-Louis Debré"
      - "Philippe Bas"
    why: "Richard Ferrand a succédé à Laurent Fabius en mars 2025."

  - id: ferrand-vote
    prompt: "Qu'a eu de particulier la nomination de Richard Ferrand ?"
    answer: "Elle n'a échappé au blocage des commissions qu'à une voix près"
    decoys:
      - "Elle a été votée à l'unanimité"
      - "Elle a été annulée par le Conseil d'État, puis rétablie par un décret du président"
      - "Elle a été décidée par référendum"
    why: "Il manquait une voix aux opposants pour atteindre le seuil de blocage des trois cinquièmes."

  - id: saisine-1974
    prompt: "Qu'a permis la réforme de 1974 ?"
    answer: "La saisine du Conseil par 60 députés ou 60 sénateurs"
    decoys:
      - "La question prioritaire de constitutionnalité"
      - "L'élection des membres du Conseil"
      - "Le contrôle des lois déjà en vigueur"
    why: "Depuis 1974, l'opposition parlementaire peut saisir le Conseil ; la QPC date de 2010."

  - id: qpc-date
    prompt: "Depuis quand la question prioritaire de constitutionnalité existe-t-elle ?"
    answer: "Depuis 2010"
    decoys:
      - "Depuis 1958"
      - "Depuis 1974"
      - "Depuis 2024"
    why: "Créée par la révision de 2008, la QPC est en place depuis 2010."

  - id: qpc-filtre
    prompt: "Qui filtre les QPC avant le Conseil constitutionnel ?"
    answer: "Le Conseil d'État ou la Cour de cassation"
    decoys:
      - "Le garde des Sceaux"
      - "Le président de l'Assemblée nationale"
      - "Le Défenseur des droits"
    why: "Le Conseil d'État (justice administrative) ou la Cour de cassation (justice judiciaire) transmettent ou non la question."

  - id: qpc-effet
    prompt: "Que peut faire le Conseil constitutionnel au terme d'une QPC ?"
    answer: "Abroger une loi déjà en vigueur"
    decoys:
      - "Condamner le gouvernement à une amende"
      - "Réécrire la loi à la place du Parlement"
      - "Dissoudre l'Assemblée nationale"
    why: "La QPC permet de faire tomber une loi en vigueur qui porte atteinte aux droits et libertés."

  - id: juge-electoral
    prompt: "Quel rôle le Conseil joue-t-il pour l'élection présidentielle ?"
    answer: "Il reçoit les parrainages et proclame les résultats"
    decoys:
      - "Il organise les débats télévisés"
      - "Il désigne les candidats des partis"
      - "Il fixe la date du scrutin"
    why: "Il veille à la régularité de la présidentielle : parrainages, contrôle du scrutin, proclamation."

  - id: decision-1971
    prompt: "Qu'a établi la décision du 16 juillet 1971 sur la liberté d'association ?"
    answer: "Que le préambule de la Constitution a valeur juridique"
    decoys:
      - "Que les lois votées avant 1958 échappent à tout contrôle de constitutionnalité"
      - "Que la QPC est ouverte à tous"
      - "Que la loi de 1905 est abrogée"
    why: "Elle fonde le bloc de constitutionnalité : Déclaration de 1789, préambule de 1946, Charte de l'environnement."

  - id: bloc
    prompt: "Lequel de ces textes fait partie du bloc de constitutionnalité ?"
    answer: "La Déclaration des droits de l'homme et du citoyen de 1789"
    decoys:
      - "Le Code civil de 1804"
      - "La loi de séparation de 1905"
      - "La loi de séparation des Églises et de l'État du 9 décembre 1905"
    why: "Le bloc comprend la Déclaration de 1789, le préambule de 1946 et la Charte de l'environnement."

  - id: retraites-2023
    prompt: "Qu'a décidé le Conseil en avril 2023 sur la réforme des retraites ?"
    answer: "Il en a validé l'essentiel, dont le recul de l'âge légal à 64 ans"
    decoys:
      - "Il l'a censurée en totalité, faute de vote de l'Assemblée sur le texte final"
      - "Il a imposé un référendum"
      - "Il a ramené l'âge légal à 62 ans"
    why: "Le Conseil a validé l'essentiel de la réforme, dont l'âge légal de 64 ans."

  - id: immigration-2024
    prompt: "Pourquoi le Conseil a-t-il censuré une large partie de la loi immigration en janvier 2024 ?"
    answer: "Souvent parce que des articles étaient des « cavaliers législatifs »"
    decoys:
      - "Parce que la loi avait été adoptée par 49.3, ce qui est interdit pour ce type de texte"
      - "Parce que le Sénat ne l'avait pas votée"
      - "Parce qu'elle n'avait pas été soumise au référendum"
    why: "Beaucoup d'articles n'avaient pas de lien suffisant avec le texte initial : des cavaliers législatifs."

  - id: saisine-facultative
    prompt: "Toutes les lois sont-elles examinées par le Conseil constitutionnel ?"
    answer: "Non, une loi ordinaire ne l'est que s'il est saisi"
    decoys:
      - "Oui, avant chaque promulgation"
      - "Oui, mais seulement après dix ans"
      - "Non, il n'examine que les lois de finances"
    why: "Seules les lois organiques et les règlements des assemblées lui sont obligatoirement soumis."

  - id: opportunite
    prompt: "Le Conseil constitutionnel juge-t-il si une loi est utile ?"
    answer: "Non, seulement si elle est conforme à la Constitution"
    decoys:
      - "Oui, il évalue son efficacité économique"
      - "Oui, si le gouvernement le demande"
      - "Oui, pour les lois votées par 49.3"
    why: "Il contrôle la conformité à la Constitution, pas l'opportunité ni l'efficacité."

  - id: cour-supreme
    prompt: "Quelles juridictions sont au sommet de la justice ordinaire ?"
    answer: "La Cour de cassation et le Conseil d'État"
    decoys:
      - "Le Conseil constitutionnel seul"
      - "La Haute Cour et le Sénat"
      - "La Cour des comptes et le Conseil constitutionnel"
    why: "La Cour de cassation (judiciaire) et le Conseil d'État (administratif) ; le Conseil constitutionnel n'est pas une cour suprême ordinaire."
---
