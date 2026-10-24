---
questions:
  - id: article-20
    prompt: "Selon l'article 20, que fait le gouvernement ?"
    answer: "Il détermine et conduit la politique de la Nation"
    decoys:
      - "Il veille au respect de la Constitution"
      - "Il vote les lois et le budget"
      - "Il juge la conformité des lois"
    why: "L'article 20 confie au gouvernement la conduite de la politique de la Nation ; il dispose de l'administration et de la force armée."

  - id: article-21
    prompt: "Quel article dit que le Premier ministre dirige l'action du gouvernement ?"
    answer: "L'article 21"
    decoys:
      - "L'article 8"
      - "L'article 16"
      - "L'article 45"
    why: "L'article 21 ; l'article 8 porte sur sa nomination par le président."

  - id: nomination-pm
    prompt: "Qui nomme le Premier ministre ?"
    answer: "Le président de la République"
    decoys:
      - "L'Assemblée nationale, par un vote"
      - "Le parti arrivé en tête aux législatives"
      - "Le Sénat, sur proposition du président"
    why: "Le président nomme le Premier ministre, puis les ministres sur sa proposition."

  - id: investiture
    prompt: "Le Premier ministre doit-il obtenir un vote d'investiture de l'Assemblée ?"
    answer: "Non, il lui suffit de ne pas être renversé"
    decoys:
      - "Oui, dans les quinze jours suivant sa nomination"
      - "Oui, devant les deux chambres"
      - "Seulement en cas de cohabitation"
    why: "Aucune investiture n'est exigée ; le vote de confiance est une faculté."

  - id: pouvoir-reglementaire
    prompt: "Qui exerce le pouvoir réglementaire (les décrets) ?"
    answer: "Le Premier ministre"
    decoys:
      - "Le Parlement"
      - "Le Conseil constitutionnel"
      - "Le président du Sénat"
    why: "Le Premier ministre exerce le pouvoir réglementaire et dépose les projets de loi."

  - id: ordonnances
    prompt: "Quel article permet au gouvernement de légiférer par ordonnances, avec l'autorisation du Parlement ?"
    answer: "L'article 38"
    decoys:
      - "L'article 11"
      - "L'article 49"
      - "L'article 89"
    why: "L'article 38 ; le 11 porte sur le référendum, le 49 sur la responsabilité du gouvernement, le 89 sur la révision."

  - id: incompatibilite
    prompt: "Que se passe-t-il quand un député est nommé ministre ?"
    answer: "Son suppléant siège à sa place à l'Assemblée"
    decoys:
      - "Il garde son siège et vote les lois"
      - "Une élection partielle est organisée dans sa circonscription"
      - "Il siège au Sénat pendant son mandat de ministre"
    why: "L'article 23 rend les fonctions de ministre incompatibles avec un mandat parlementaire."

  - id: devant-qui
    prompt: "Devant quelle chambre le gouvernement est-il responsable ?"
    answer: "Devant l'Assemblée nationale seulement"
    decoys:
      - "Devant le Sénat seulement"
      - "Devant les deux chambres réunies en Congrès"
      - "Devant le Conseil constitutionnel"
    why: "Seule l'Assemblée peut renverser le gouvernement ; le Sénat ne le peut pas."

  - id: censure-depot
    prompt: "Combien de députés faut-il pour déposer une motion de censure ?"
    answer: "Un dixième des députés"
    decoys:
      - "La moitié des députés"
      - "Un président de groupe suffit"
      - "Soixante députés et soixante sénateurs"
    why: "La motion de censure (article 49, alinéa 2) doit être signée par au moins un dixième des députés."

  - id: censure-majorite
    prompt: "Combien de voix faut-il pour adopter une motion de censure ?"
    answer: "La majorité absolue des membres, soit 289 sur 577"
    decoys:
      - "La majorité des députés présents"
      - "Les trois cinquièmes des suffrages exprimés"
      - "La moitié des votants, abstentions comprises"
    why: "Il faut la majorité absolue des membres : seuls les votes pour la censure sont comptés."

  - id: abstention
    prompt: "Lors d'une motion de censure, comment comptent les abstentions ?"
    answer: "De fait, comme des soutiens au gouvernement"
    decoys:
      - "Comme des votes pour la censure"
      - "Elles annulent le scrutin"
      - "Elles sont réparties à parts égales"
    why: "Seuls les votes pour la censure comptent : s'abstenir revient à ne pas renverser le gouvernement."

  - id: confiance
    prompt: "Qu'est-ce que l'article 49, alinéa 1 ?"
    answer: "Le vote de confiance demandé par le Premier ministre"
    decoys:
      - "La motion de censure déposée par les députés"
      - "L'adoption d'un texte sans vote"
      - "La dissolution de l'Assemblée"
    why: "Le Premier ministre y engage la responsabilité du gouvernement sur son programme ou une déclaration de politique générale."

  - id: 49-3-limite
    prompt: "Depuis 2008, sur quels textes le 49.3 peut-il être utilisé ?"
    answer: "Les textes budgétaires, et un autre texte par session"
    decoys:
      - "Tous les textes, sans limite"
      - "Seulement les révisions de la Constitution, avec l'accord du Sénat"
      - "Seulement les textes votés par le Sénat"
    why: "La révision de 2008 a limité le 49.3 aux lois de finances et de financement de la Sécurité sociale, plus un texte par session."

  - id: demission
    prompt: "Que doit faire un gouvernement renversé ?"
    answer: "Remettre sa démission au président de la République"
    decoys:
      - "Dissoudre l'Assemblée nationale"
      - "Organiser un référendum"
      - "Attendre l'avis du Conseil constitutionnel"
    why: "L'article 50 oblige le Premier ministre à remettre la démission du gouvernement."

  - id: attal
    prompt: "Qui était Premier ministre de janvier à septembre 2024 ?"
    answer: "Gabriel Attal"
    decoys:
      - "Élisabeth Borne"
      - "Michel Barnier"
      - "Édouard Philippe"
    why: "Gabriel Attal précède Michel Barnier, nommé en septembre 2024."

  - id: barnier
    prompt: "Comment le gouvernement de Michel Barnier est-il tombé ?"
    answer: "Par une motion de censure, après un 49.3 sur le budget de la Sécurité sociale"
    decoys:
      - "En perdant un vote de confiance qu'il avait lui-même demandé sur sa politique budgétaire"
      - "Par la démission du président de la République"
      - "Par une décision du Conseil constitutionnel"
    why: "Le 4 décembre 2024, la censure est adoptée : une première depuis 1962."

  - id: bayrou
    prompt: "Quelle première de la Ve République la chute de François Bayrou représente-t-elle ?"
    answer: "Un gouvernement renversé par un vote de confiance perdu"
    decoys:
      - "Un gouvernement renversé par le Sénat"
      - "La première motion de censure adoptée depuis le début de la Ve République"
      - "Un gouvernement renversé par référendum"
    why: "Le 8 septembre 2025, l'Assemblée lui refuse la confiance qu'il avait demandée ; la première censure, elle, date de 1962."

  - id: lecornu
    prompt: "Qui est nommé Premier ministre le 9 septembre 2025 ?"
    answer: "Sébastien Lecornu"
    decoys:
      - "Gabriel Attal"
      - "Bruno Retailleau"
      - "Gérald Darmanin"
    why: "Sébastien Lecornu succède à François Bayrou ; son gouvernement « Lecornu II » est formé en octobre 2025."

  - id: majorite-2024
    prompt: "Quelle situation fragilise les gouvernements depuis 2024 ?"
    answer: "Aucun n'a de majorité absolue à l'Assemblée"
    decoys:
      - "Le Sénat peut désormais les renverser"
      - "Le 49.3 a été supprimé"
      - "Le président ne peut plus nommer le Premier ministre"
    why: "Depuis la dissolution de 2024, aucun bloc n'a de majorité absolue : chaque texte se négocie et la censure menace."

  - id: cohabitation-pm
    prompt: "En cohabitation, qui conduit la politique intérieure ?"
    answer: "Le Premier ministre"
    decoys:
      - "Le président de la République"
      - "Le président du Sénat"
      - "Le Conseil des ministres sans le Premier ministre"
    why: "Issu d'une majorité opposée au président, le Premier ministre devient le vrai chef de l'exécutif pour la politique intérieure."
---
