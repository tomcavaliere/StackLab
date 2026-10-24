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
        title: Le clivage
        intro: "D'où viennent la gauche et la droite, ce qu'elles recouvrent, et pourquoi on parle aujourd'hui de trois blocs."
        lessons: [clivage-gauche-droite]
      - id: les-institutions
        title: Les institutions
        intro: "Les règles du jeu : qui gouverne, qui vote les lois, et comment un gouvernement peut tomber."
        lessons: [cinquieme-republique]
---
