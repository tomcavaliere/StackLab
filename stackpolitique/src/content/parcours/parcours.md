---
# Les parcours. Le tronc commun ouvre les parcours des partis ; un parcours s'ouvre quand ses `requires` sont terminés.
# Chaque unité enchaîne ses leçons (fiche + quiz de la fiche), puis ses quiz de thème.
# Règles et contrôles du build : CLAUDE.md, section « Parcours ». En bref : chaque fiche et chaque thème figure dans au moins
# un parcours ; une fiche ne figure qu'une fois dans un parcours et ses parcours requis ; un thème ne cite que des fiches vues
# avant lui (dans le parcours ou ses parcours requis) ; un parcours de parti contient la fiche de son parti.
parcours:
  # ─── Tronc commun ───────────────────────────────────────────────────────────
  - id: tronc-commun
    kind: tronc
    title: Tronc commun
    intro: "Les notions et les institutions à connaître pour comprendre chaque parti. Une fois terminé, il ouvre les parcours des partis."
    units:
      - id: le-clivage
        title: Les clivages
        intro: "D'où viennent la gauche et la droite, comment on classe les partis (et pourquoi c'est contesté), et la laïcité, l'un des plus anciens terrains d'opposition."
        lessons: [clivage-gauche-droite, classification-des-partis, laicite]
      - id: les-institutions
        title: Les institutions
        intro: "Les règles du jeu : qui gouverne, qui vote les lois, qui les contrôle, comment un gouvernement peut tomber, et ce qui se décide à l'échelle européenne."
        lessons: [cinquieme-republique, president-de-la-republique, gouvernement, parlement, conseil-constitutionnel, union-europeenne]
        themes: [qui-fait-quoi]
      - id: les-elections
        title: Les élections
        intro: "Comment on élit le président, les députés et les eurodéputés : parrainages, seuils, second tour, proportionnelle, et les scrutins qui ont fait date."
        lessons: [election-presidentielle, elections-legislatives, elections-europeennes]
        themes: [quelle-election]
      - id: les-grands-courants
        title: Les grands courants
        intro: "Les familles d'idées dont les partis se réclament : socialisme, libéralisme, conservatisme, gaullisme, écologie, nationalisme et souverainisme, populisme."
        lessons: [socialisme, liberalisme, conservatisme, gaullisme, ecologie-politique, nationalisme-souverainisme, populisme]
        themes: [quel-courant]

  # ─── Partis ─────────────────────────────────────────────────────────────────
  - id: la-france-insoumise
    kind: parti
    party: la-france-insoumise
    title: La France insoumise
    intro: "Le mouvement fondé par Jean-Luc Mélenchon en 2016 : son histoire, son écosocialisme, son programme, ses alliances à gauche et ses figures."
    requires: [tronc-commun]
    units:
      - id: lfi-histoire-et-identite
        title: Histoire et identité
        intro: "D'où vient LFI, comment elle fonctionne, ce qu'elle propose, ses résultats et le débat sur son classement."
        lessons: [la-france-insoumise]
      - id: lfi-idees-et-programme
        title: Idées et programme
        intro: "L'écosocialisme, l'idéologie dont se réclame LFI, et le Nouveau Front populaire, l'alliance de gauche de 2024."
        lessons: [ecosocialisme, nouveau-front-populaire]
      - id: lfi-les-figures
        title: Les figures
        intro: "Le fondateur et candidat, la présidente du groupe, le coordinateur, la voix au Parlement européen, la plume du programme, le président de la commission des finances et le maire de Roubaix."
        lessons: [jean-luc-melenchon, mathilde-panot, manuel-bompard, manon-aubry, clemence-guette, eric-coquerel, david-guiraud]
        themes: [quel-insoumis]

  - id: les-ecologistes
    kind: parti
    party: les-ecologistes
    title: Les Écologistes
    intro: "Le parti né des Verts en 1984 : son histoire, de la « vague verte » de 2020 aux municipales de 2026, son programme pour 2027, ses débats sur les alliances et ses figures."
    requires: [tronc-commun]
    units:
      - id: eco-histoire-et-identite
        title: Histoire et identité
        intro: "Des Verts aux Écologistes : origines, idées, programme « Pour une prospérité écologique » et résultats."
        lessons: [les-ecologistes]
      - id: eco-idees-et-strategie
        title: Idées et stratégie
        intro: "La décroissance, un courant qui traverse le parti, et la primaire de la gauche de 2026, qui n'a pas eu lieu."
        lessons: [decroissance, primaire-de-la-gauche-2026]
      - id: eco-les-figures
        title: Les figures
        intro: "La secrétaire nationale et candidate, la présidente du groupe à l'Assemblée, l'écoféministe, l'ancien candidat rallié à Glucksmann, la juriste du climat et deux maires de grandes villes."
        lessons: [marine-tondelier, cyrielle-chatelain, sandrine-rousseau, yannick-jadot, marie-toussaint, eric-piolle, gregory-doucet]
        themes: [quel-ecologiste]

  - id: parti-socialiste
    kind: parti
    party: parti-socialiste
    title: Parti socialiste
    intro: "Le parti de Mitterrand, Jospin et Hollande : sa refondation à Épinay, ses années au pouvoir, son déclin après 2017, son projet « Vivre libres » et la primaire de 2026 qui désigne Raphaël Glucksmann."
    requires: [tronc-commun]
    units:
      - id: ps-histoire-et-identite
        title: Histoire et identité
        intro: "De la SFIO au PS : origines, idées, projet pour 2027 et résultats."
        lessons: [parti-socialiste]
      - id: ps-idees-et-strategie
        title: Idées et stratégie
        intro: "La social-démocratie, le courant dont se réclame le PS, et la primaire socialiste de 2026."
        lessons: [social-democratie, primaire-socialiste-2026]
      - id: ps-les-figures
        title: Les figures
        intro: "Le premier secrétaire, le président du groupe, le candidat venu de Place publique, l'ancien président, la présidente de l'Occitanie, le maire de Rouen et le refondateur d'Épinay."
        lessons: [olivier-faure, boris-vallaud, raphael-glucksmann, francois-hollande, carole-delga, nicolas-mayer-rossignol, francois-mitterrand]
        themes: [quel-socialiste]
---
