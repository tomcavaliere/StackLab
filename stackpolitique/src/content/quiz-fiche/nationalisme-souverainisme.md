---
questions:
  - id: definition-nationalisme
    prompt: "Que fait le nationalisme de la nation ?"
    answer: "La référence politique première"
    decoys:
      - "Une simple division administrative de l'Europe"
      - "Un obstacle à supprimer au profit d'une citoyenneté mondiale"
      - "Une notion sans importance politique"
    why: "Pour le nationalisme, unité, identité et puissance de la nation passent avant le reste."

  - id: nation-xixe
    prompt: "Au début du XIXe siècle, de quel camp est l'idée de nation en France ?"
    answer: "Révolutionnaire et républicain"
    decoys:
      - "Monarchiste et contre-révolutionnaire"
      - "Exclusivement catholique"
      - "Libéral et européen"
    why: "C'est d'abord la nation souveraine contre le roi ; le nationalisme ne passe à droite qu'à la fin du siècle."

  - id: dreyfus
    prompt: "Autour de quel événement naît un nationalisme de droite en France ?"
    answer: "L'affaire Dreyfus"
    decoys:
      - "La Révolution française"
      - "La guerre d'Algérie"
      - "Le traité de Maastricht"
    why: "À la fin du XIXe siècle, autour de l'affaire Dreyfus."

  - id: barres
    prompt: "Qui popularise le mot « nationalisme » et enracine la nation dans « la terre et les morts » ?"
    answer: "Maurice Barrès"
    decoys:
      - "Charles Maurras"
      - "Michel Winock"
      - "Philippe Séguin"
    why: "Maurice Barrès ; Maurras théorise ensuite le nationalisme intégral."

  - id: maurras
    prompt: "Que défend Charles Maurras avec l'Action française ?"
    answer: "Un « nationalisme intégral », monarchiste et antiparlementaire"
    decoys:
      - "Un nationalisme républicain, héritier de la Révolution"
      - "Un souverainisme de gauche opposé à l'Europe"
      - "Une Europe fédérale des peuples"
    why: "Maurras mêle tradition contre-révolutionnaire et nationalisme."

  - id: winock
    prompt: "Quels deux nationalismes l'historien Michel Winock distingue-t-il ?"
    answer: "Un nationalisme ouvert et un nationalisme fermé"
    decoys:
      - "Un nationalisme urbain et un nationalisme rural"
      - "Un nationalisme de droite et un nationalisme européen"
      - "Un nationalisme économique et un nationalisme militaire"
    why: "Ouvert, hérité de la Révolution ; fermé, défensif."

  - id: ouvert
    prompt: "Comment le nationalisme ouvert voit-il la nation ?"
    answer: "Comme une communauté de citoyens porteuse de valeurs universelles"
    decoys:
      - "Comme une communauté menacée par l'étranger et la décadence, qu'il faut protéger"
      - "Comme une famille fondée sur le sang et l'hérédité"
      - "Comme une région destinée à se fondre dans l'Europe"
    why: "Le nationalisme ouvert est hérité de la Révolution ; la vision menacée est celle du nationalisme fermé."

  - id: ferme
    prompt: "Comment le nationalisme fermé voit-il la nation ?"
    answer: "Menacée par l'étranger et la décadence"
    decoys:
      - "Ouverte à tous ceux qui partagent ses valeurs universelles"
      - "Comme une étape vers un gouvernement mondial"
      - "Comme une simple communauté de consommateurs"
    why: "C'est un nationalisme défensif, selon Winock."

  - id: souverainisme
    prompt: "Que défend le souverainisme ?"
    answer: "La souveraineté de l'État et du peuple face aux institutions supranationales"
    decoys:
      - "La supériorité d'une nation sur toutes les autres, y compris par la force si nécessaire"
      - "Le retour de la monarchie en France"
      - "Le transfert de toutes les compétences à l'Union européenne"
    why: "Il vise d'abord l'Union européenne ; il ne se confond pas avec le nationalisme."

  - id: maastricht
    prompt: "Contre quel traité le souverainisme s'affirme-t-il en 1992 ?"
    answer: "Le traité de Maastricht"
    decoys:
      - "Le traité de Rome"
      - "Le traité de Lisbonne"
      - "Le traité de Versailles"
    why: "La campagne du non à Maastricht, en 1992, structure le souverainisme."

  - id: seguin
    prompt: "Quel gaulliste mène la campagne du non à Maastricht contre une grande partie de son camp ?"
    answer: "Philippe Séguin"
    decoys:
      - "Jacques Chirac"
      - "Alain Juppé"
      - "Édouard Balladur"
    why: "Philippe Séguin, au nom de l'héritage gaulliste."

  - id: chevenement
    prompt: "Quelle figure de gauche défend un souverainisme républicain ?"
    answer: "Jean-Pierre Chevènement"
    decoys:
      - "Lionel Jospin"
      - "Jacques Delors"
      - "Michel Rocard"
    why: "Chevènement incarne le souverainisme de gauche."

  - id: villiers
    prompt: "Quelle autre figure de droite la fiche associe-t-elle au souverainisme ?"
    answer: "Philippe de Villiers"
    decoys:
      - "Valéry Giscard d'Estaing"
      - "François Bayrou"
      - "Simone Veil"
    why: "Philippe de Villiers incarne aussi ce courant à droite."

  - id: fn
    prompt: "Quand le Front national est-il fondé ?"
    answer: "En 1972"
    decoys:
      - "En 1958"
      - "En 1984"
      - "En 2018"
    why: "Fondé en 1972, il devient le Rassemblement national en 2018."

  - id: rn-2018
    prompt: "Quand le Front national devient-il le Rassemblement national ?"
    answer: "En 2018"
    decoys:
      - "En 2002"
      - "En 2011"
      - "En 2022"
    why: "Le changement de nom date de 2018."

  - id: rn-se-dit
    prompt: "Comment le RN se présente-t-il aujourd'hui ?"
    answer: "Comme « patriote » et souverainiste plutôt que nationaliste"
    decoys:
      - "Comme un parti fédéraliste européen"
      - "Comme l'héritier officiel de l'Action française"
      - "Comme un parti libéral sans position sur l'Europe"
    why: "Le RN, comme Reconquête, se place dans la tradition nationaliste, mais se dit patriote et souverainiste."

  - id: pas-que-extreme-droite
    prompt: "Le souverainisme est-il réservé à l'extrême droite ?"
    answer: "Non : on le trouve chez des gaullistes et à gauche"
    decoys:
      - "Oui, il a été fondé par le Front national"
      - "Oui, depuis le traité de Lisbonne"
      - "Non, mais il n'existe qu'au centre"
    why: "Séguin, Chevènement et une partie des électeurs du non en 1992 et 2005 en témoignent."

  - id: patriotisme
    prompt: "Quelle différence entre patriotisme et nationalisme ?"
    answer: "Le patriotisme est un attachement ; le nationalisme en fait un principe qui prime sur le reste"
    decoys:
      - "Aucune : ce sont deux mots pour la même idée, employés indifféremment par les historiens et les partis"
      - "Le patriotisme est de gauche, le nationalisme du centre"
      - "Le patriotisme vise l'Europe, le nationalisme la région"
    why: "Le nationalisme fait de la nation un principe politique premier, souvent contre d'autres nations."

  - id: clivage-europe
    prompt: "Quel clivage le rapport à la nation et à l'Europe crée-t-il ?"
    answer: "Entre partisans d'une intégration plus poussée et partisans d'un retour de pouvoirs aux États"
    decoys:
      - "Entre partisans d'un retour de la monarchie et défenseurs de la République, comme au XIXe siècle"
      - "Entre partisans du nucléaire et partisans des renouvelables"
      - "Entre partisans du Sénat et partisans de l'Assemblée"
    why: "C'est un clivage majeur, qui va jusqu'à la désobéissance à certaines règles européennes."

  - id: toujours-droite
    prompt: "Le nationalisme a-t-il toujours été de droite en France ?"
    answer: "Non, il ne passe à droite qu'à la fin du XIXe siècle"
    decoys:
      - "Oui, depuis la Révolution française"
      - "Oui, depuis la fondation du Front national"
      - "Non, il a toujours été d'extrême gauche"
    why: "L'idée nationale est d'abord révolutionnaire et républicaine."
---
