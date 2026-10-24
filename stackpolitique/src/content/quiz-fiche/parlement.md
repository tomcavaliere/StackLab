---
questions:
  - id: missions
    prompt: "Selon l'article 24, quelles sont les missions du Parlement ?"
    answer: "Voter la loi, contrôler le gouvernement, évaluer les politiques publiques"
    decoys:
      - "Nommer le Premier ministre et les ministres"
      - "Nommer le Premier ministre, renverser le président et juger la conformité des lois"
      - "Conduire la politique de la Nation"
    why: "Ce sont les trois missions de l'article 24 ; nommer le Premier ministre revient au président."

  - id: nombre-deputes
    prompt: "Combien y a-t-il de députés ?"
    answer: "577"
    decoys:
      - "348"
      - "720"
      - "925"
    why: "577 députés à l'Assemblée ; 348 est le nombre de sénateurs, 720 celui des députés européens."

  - id: mandat-depute
    prompt: "Pour combien de temps un député est-il élu ?"
    answer: "Cinq ans, sauf dissolution"
    decoys:
      - "Six ans"
      - "Sept ans"
      - "Trois ans"
    why: "Les députés sont élus pour cinq ans ; une dissolution abrège leur mandat."

  - id: majorite-absolue
    prompt: "Combien de sièges faut-il pour la majorité absolue à l'Assemblée ?"
    answer: "289"
    decoys:
      - "250"
      - "300"
      - "175"
    why: "289, la moitié de 577 plus un."

  - id: nombre-senateurs
    prompt: "Combien y a-t-il de sénateurs ?"
    answer: "348"
    decoys:
      - "577"
      - "300"
      - "400"
    why: "348 sénateurs, renouvelés par moitié tous les trois ans."

  - id: mandat-senateur
    prompt: "Comment le Sénat est-il renouvelé ?"
    answer: "Par moitié tous les trois ans, pour des mandats de six ans"
    decoys:
      - "En entier tous les cinq ans, le même dimanche que les élections législatives"
      - "Par tiers tous les trois ans, pour neuf ans"
      - "En entier à chaque élection présidentielle"
    why: "Mandat de six ans, deux séries renouvelées alternativement tous les trois ans ; le renouvellement par tiers pour neuf ans est celui du Conseil constitutionnel."

  - id: grands-electeurs
    prompt: "Qui élit les sénateurs ?"
    answer: "Des grands électeurs, surtout des délégués des conseils municipaux"
    decoys:
      - "Tous les citoyens inscrits sur les listes électorales, au suffrage universel direct"
      - "Les députés seuls"
      - "Les présidents de région et de département seuls"
    why: "Un collège d'environ 162 000 grands électeurs, dont environ 95 % de délégués municipaux."

  - id: vote-obligatoire
    prompt: "Pour qui le vote est-il obligatoire aux élections sénatoriales ?"
    answer: "Pour les grands électeurs"
    decoys:
      - "Pour tous les citoyens"
      - "Pour personne"
      - "Seulement pour les maires des grandes villes"
    why: "Le vote est obligatoire pour les grands électeurs."

  - id: senat-represente
    prompt: "Que représente le Sénat selon la Constitution ?"
    answer: "Les collectivités territoriales"
    decoys:
      - "Les partis politiques"
      - "Les Français de plus de 40 ans"
      - "Les syndicats et le patronat"
    why: "L'article 24 dit que le Sénat assure la représentation des collectivités territoriales."

  - id: dissolution-senat
    prompt: "Le président peut-il dissoudre le Sénat ?"
    answer: "Non, seulement l'Assemblée nationale"
    decoys:
      - "Oui, après avis du Premier ministre"
      - "Oui, une fois par mandat"
      - "Oui, si le Sénat rejette le budget"
    why: "La dissolution ne vise que l'Assemblée ; en retour, le Sénat ne peut pas renverser le gouvernement."

  - id: projet-proposition
    prompt: "Quelle différence entre un projet de loi et une proposition de loi ?"
    answer: "Le projet vient du gouvernement, la proposition d'un parlementaire"
    decoys:
      - "Le projet est voté, la proposition est seulement débattue"
      - "La proposition vient du Sénat, le projet de l'Assemblée"
      - "Il n'y a aucune différence"
    why: "Projet : initiative du gouvernement ; proposition : initiative d'un député ou d'un sénateur."

  - id: navette
    prompt: "Comment s'appelle le va-et-vient d'un texte entre les deux chambres ?"
    answer: "La navette"
    decoys:
      - "Le Congrès"
      - "La seconde lecture définitive"
      - "Le contreseing"
    why: "Le texte passe d'une chambre à l'autre : c'est la navette."

  - id: cmp
    prompt: "En cas de désaccord entre les chambres, qui cherche un texte commun ?"
    answer: "Une commission mixte paritaire de 7 députés et 7 sénateurs"
    decoys:
      - "Le Conseil constitutionnel"
      - "Le président de la République"
      - "Le Conseil constitutionnel, qui rédige lui-même un texte de compromis"
    why: "La commission mixte paritaire réunit 7 députés et 7 sénateurs."

  - id: dernier-mot
    prompt: "Si le désaccord persiste, qui a le dernier mot ?"
    answer: "L'Assemblée nationale, à la demande du gouvernement"
    decoys:
      - "Le Sénat, parce qu'il représente les collectivités territoriales"
      - "Le Conseil constitutionnel"
      - "Le peuple, par référendum automatique"
    why: "L'article 45 permet au gouvernement de demander à l'Assemblée de statuer définitivement."

  - id: exception-dernier-mot
    prompt: "Pour quels textes l'Assemblée n'a-t-elle pas le dernier mot ?"
    answer: "Les révisions de la Constitution, par exemple"
    decoys:
      - "Les lois de finances"
      - "Les projets de loi du gouvernement"
      - "Toutes les lois votées en procédure accélérée"
    why: "Une révision de la Constitution exige l'accord des deux chambres, comme certaines lois organiques relatives au Sénat."

  - id: congres
    prompt: "Qu'est-ce que le Congrès ?"
    answer: "Les deux chambres réunies à Versailles, notamment pour réviser la Constitution"
    decoys:
      - "La réunion annuelle des partis de la majorité"
      - "L'assemblée des maires de France"
      - "La réunion annuelle des parlementaires de la majorité autour du président, à l'Élysée"
    why: "Le Parlement réuni en Congrès vote les révisions à la majorité des trois cinquièmes."

  - id: questions-gouvernement
    prompt: "Quel outil permet chaque semaine aux parlementaires d'interroger les ministres ?"
    answer: "Les questions au gouvernement"
    decoys:
      - "La motion de censure"
      - "La question prioritaire de constitutionnalité"
      - "Le 49.3"
    why: "Les questions au gouvernement sont un outil de contrôle hebdomadaire ; la QPC relève du Conseil constitutionnel."

  - id: groupe-15
    prompt: "Combien de députés faut-il au moins pour former un groupe à l'Assemblée ?"
    answer: "15"
    decoys:
      - "5"
      - "30"
      - "58"
    why: "Un groupe à l'Assemblée réunit au moins 15 députés."

  - id: senat-orientation
    prompt: "Pourquoi le Sénat change-t-il plus lentement de majorité que l'Assemblée ?"
    answer: "Il est élu par des élus locaux et renouvelé par moitié"
    decoys:
      - "Ses membres sont nommés à vie"
      - "Il n'est jamais renouvelé avant une présidentielle"
      - "Il est élu à la proportionnelle nationale"
    why: "Élu au suffrage indirect et renouvelé par moitié, il a longtemps été dominé par la droite et le centre."

  - id: depuis-2024
    prompt: "Quelle est la situation de l'Assemblée depuis 2024 ?"
    answer: "Aucun bloc n'atteint la majorité absolue de 289 sièges"
    decoys:
      - "Le Rassemblement national a la majorité absolue"
      - "Le camp présidentiel a la majorité absolue"
      - "Le Nouveau Front populaire a la majorité absolue"
    why: "Depuis la dissolution de 2024, chaque texte se négocie faute de majorité absolue."
---
