---
questions:
  - id: date-loi
    prompt: "De quand date la loi de séparation des Églises et de l'État ?"
    answer: "Du 9 décembre 1905"
    decoys:
      - "Du 4 octobre 1958"
      - "Du 15 juillet 1801"
      - "Du 26 août 1789"
    why: "La laïcité repose sur la loi du 9 décembre 1905."

  - id: article-2
    prompt: "Que dit l'article 2 de la loi de 1905 ?"
    answer: "La République ne reconnaît, ne salarie ni ne subventionne aucun culte"
    decoys:
      - "La République reconnaît quatre cultes officiels"
      - "La République paie les ministres de tous les cultes"
      - "La République interdit toute religion dans l'espace public"
    why: "C'est la formule de l'article 2 ; les dépenses des cultes disparaissent des budgets publics."

  - id: article-1
    prompt: "Que garantit l'article 1er de la loi de 1905 ?"
    answer: "La liberté de conscience et le libre exercice des cultes"
    decoys:
      - "La neutralité religieuse de tous les citoyens"
      - "L'interdiction des processions religieuses"
      - "Le financement public des écoles religieuses"
    why: "L'article 1er assure la liberté de conscience et garantit le libre exercice des cultes, sous les restrictions de l'ordre public."

  - id: concordat
    prompt: "Quel régime la loi de 1905 a-t-elle remplacé ?"
    answer: "Le Concordat de 1801"
    decoys:
      - "L'édit de Nantes"
      - "La Constitution civile du clergé"
      - "Le Code civil de 1804"
    why: "Le Concordat signé par Napoléon Bonaparte avec le pape faisait payer les prêtres par l'État."

  - id: concordat-signataires
    prompt: "Qui a signé le Concordat de 1801 ?"
    answer: "Napoléon Bonaparte et le pape"
    decoys:
      - "Louis XIV et le pape"
      - "Jules Ferry et les évêques"
      - "Le général de Gaulle et le Vatican"
    why: "Le Concordat de 1801 est un accord entre Bonaparte et le pape."

  - id: contexte-1905
    prompt: "Dans quel contexte la loi de 1905 est-elle adoptée ?"
    answer: "Après des années de conflit entre républicains et catholiques, notamment sur l'école"
    decoys:
      - "Au lendemain de la Seconde Guerre mondiale"
      - "Pour répondre à une demande unanime de l'Église catholique, qui souhaitait son indépendance"
      - "Pendant la guerre d'Algérie"
    why: "La loi arrive après une longue opposition entre républicains et catholiques, en particulier autour de l'école."

  - id: constitution
    prompt: "Où la laïcité est-elle inscrite dans la Constitution de 1958 ?"
    answer: "À l'article 1er : une République indivisible, laïque, démocratique et sociale"
    decoys:
      - "Dans le préambule seulement, parmi les principes qui n'ont pas de valeur juridique"
      - "À l'article 49, avec la responsabilité du gouvernement"
      - "Nulle part : elle n'est que dans la loi de 1905"
    why: "L'article 1er de la Constitution qualifie la République de laïque."

  - id: mot-laicite
    prompt: "Le mot « laïcité » figure-t-il dans la loi de 1905 ?"
    answer: "Non : la loi parle de séparation, la Constitution parle de République laïque"
    decoys:
      - "Oui : le titre officiel de la loi est « loi relative à la laïcité de la République »"
      - "Oui, à l'article 1er"
      - "Non, le mot n'existe dans aucun texte juridique"
    why: "La loi de 1905 parle de séparation des Églises et de l'État ; ce sont les Constitutions de 1946 et 1958 qui disent la République laïque."

  - id: neutralite-agents
    prompt: "À qui la laïcité impose-t-elle la neutralité religieuse ?"
    answer: "À l'État et à ses agents"
    decoys:
      - "À tous les citoyens, partout"
      - "Aux seuls élus locaux"
      - "Aux seuls ministres du culte"
    why: "L'État et ses agents doivent être neutres ; les citoyens restent libres de manifester leur religion dans les limites de la loi."

  - id: fonctionnaire
    prompt: "Un fonctionnaire peut-il manifester sa religion dans son service ?"
    answer: "Non, il doit être neutre"
    decoys:
      - "Oui, comme n'importe quel citoyen"
      - "Oui, s'il travaille dans une collectivité locale"
      - "Oui, sauf à l'école"
    why: "La neutralité s'impose aux agents publics dans leur service."

  - id: alsace-moselle
    prompt: "Pourquoi la loi de 1905 ne s'applique-t-elle pas en Alsace-Moselle ?"
    answer: "Ces territoires étaient allemands en 1905 et la loi n'y a pas été étendue ensuite"
    decoys:
      - "Parce qu'un référendum local l'a rejetée en 1946"
      - "Parce que le Conseil constitutionnel l'a annulée en 2013"
      - "Parce que l'Alsace-Moselle a son propre Parlement"
    why: "Redevenus français après la Première Guerre mondiale, ces départements ont gardé le régime concordataire."

  - id: alsace-ministres
    prompt: "Quelle particularité garde l'Alsace-Moselle ?"
    answer: "Certains ministres du culte y sont payés par l'État"
    decoys:
      - "La religion y est obligatoire à l'école"
      - "Les fonctionnaires peuvent y porter des signes religieux"
      - "La loi de 1905 s'y applique deux fois plus strictement"
    why: "Le régime concordataire y est resté en vigueur : certains ministres du culte sont rémunérés par l'État."

  - id: qpc-2013
    prompt: "Qu'a décidé le Conseil constitutionnel en 2013 sur l'Alsace-Moselle ?"
    answer: "Que le maintien du Concordat est conforme à la Constitution"
    decoys:
      - "Que le Concordat doit être abrogé avant 2020"
      - "Que la loi de 1905 doit s'y appliquer immédiatement"
      - "Qu'il ne pouvait pas se prononcer sur la question"
    why: "Saisi par une QPC, le Conseil constitutionnel a jugé ce maintien conforme à la Constitution."

  - id: loi-2004
    prompt: "Qu'a interdit la loi de 2004 ?"
    answer: "Les signes religieux ostensibles des élèves dans les écoles publiques"
    decoys:
      - "La dissimulation du visage dans l'espace public"
      - "Le financement public des lieux de culte"
      - "Les aumôneries dans les hôpitaux"
    why: "2004 vise les élèves des écoles, collèges et lycées publics ; la dissimulation du visage relève de la loi de 2010."

  - id: loi-2010
    prompt: "Quelle loi interdit la dissimulation du visage dans l'espace public ?"
    answer: "La loi de 2010"
    decoys:
      - "La loi de 1905"
      - "La loi de 2004"
      - "La loi de 2021"
    why: "La loi de 2010 interdit de dissimuler son visage dans l'espace public."

  - id: loi-2021
    prompt: "Comment la loi de 2021 a-t-elle été présentée ?"
    answer: "Comme une réponse au « séparatisme »"
    decoys:
      - "Comme une abrogation de la loi de 1905"
      - "Comme l'extension du Concordat à toute la France"
      - "Comme une loi sur l'école privée"
    why: "La loi « confortant le respect des principes de la République » a été présentée comme une réponse au séparatisme."

  - id: loi-2021-contenu
    prompt: "Que fait notamment la loi de 2021 ?"
    answer: "Elle renforce le contrôle des associations et la neutralité des organismes chargés d'un service public"
    decoys:
      - "Elle interdit tout signe religieux dans la rue"
      - "Elle rétablit le financement public des cultes"
      - "Elle supprime le régime concordataire de l'Alsace-Moselle, qui doit appliquer la loi de 1905 dès l'année suivante"
    why: "Elle renforce le contrôle des associations et étend l'obligation de neutralité aux organismes chargés d'un service public."

  - id: debat-partis
    prompt: "Sur la laïcité, en quoi les partis divergent-ils ?"
    answer: "Sur la neutralité de l'État ou une laïcité plus exigeante dans l'espace public"
    decoys:
      - "Certains partis rejettent ouvertement la laïcité et demandent l'abrogation pure et simple de la loi de 1905"
      - "Ils divergent seulement sur la date de la loi"
      - "Ils sont unanimes sur tous les sujets"
    why: "Tous s'en réclament, mais avec des lectures différentes (signes religieux, financement des cultes, Alsace-Moselle)."

  - id: espace-public
    prompt: "La laïcité interdit-elle la religion dans l'espace public ?"
    answer: "Non : les restrictions pour les citoyens viennent de lois précises"
    decoys:
      - "Oui, depuis 1905"
      - "Oui, depuis la Constitution de 1958"
      - "Oui, la loi de 1905 interdit toute manifestation religieuse hors des lieux de culte"
    why: "La neutralité s'impose à l'État ; les limites pour les citoyens viennent de lois ciblées (2004, 2010)."

  - id: hostile
    prompt: "La laïcité est-elle hostile aux religions ?"
    answer: "Non : elle garantit aussi le libre exercice des cultes"
    decoys:
      - "Oui : elle vise à faire disparaître les cultes"
      - "Oui : elle interdit de construire des lieux de culte"
      - "Non, car elle reconnaît une religion d'État"
    why: "Par son article 1er, la loi de 1905 protège la liberté des croyants autant que celle des non-croyants."
---
