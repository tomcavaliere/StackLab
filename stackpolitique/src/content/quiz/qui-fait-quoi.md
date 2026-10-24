---
title: Qui fait quoi ?
description: "Président, gouvernement, Parlement, Conseil constitutionnel, Union européenne : à qui revient chaque pouvoir ?"
questions:
  - id: dissoudre-assemblee
    prompt: "Dissoudre l'Assemblée nationale"
    answer: president-de-la-republique
    decoy: gouvernement
    why: "La dissolution (article 12) est un pouvoir propre du président, sans contreseing du Premier ministre."

  - id: conduire-politique
    prompt: "Déterminer et conduire la politique de la Nation"
    answer: gouvernement
    decoy: president-de-la-republique
    why: "C'est l'article 20 ; le président veille au respect de la Constitution et arbitre (article 5)."

  - id: voter-loi
    prompt: "Voter la loi et contrôler l'action du gouvernement"
    answer: parlement
    decoy: gouvernement
    why: "Ce sont les missions de l'article 24 ; le gouvernement dépose des projets de loi mais ne les vote pas."

  - id: abroger-loi-qpc
    prompt: "Abroger une loi en vigueur, à la suite d'une question soulevée lors d'un procès"
    answer: conseil-constitutionnel
    decoy: parlement
    why: "C'est la question prioritaire de constitutionnalité, tranchée par le Conseil constitutionnel depuis 2010."

  - id: regles-marche-unique
    prompt: "Adopter des règles sur le marché unique qui priment sur la loi française"
    answer: union-europeenne
    decoy: parlement
    why: "Dans ses domaines de compétence, le droit européen prime sur la loi nationale."

  - id: decrets
    prompt: "Exercer le pouvoir réglementaire et prendre les décrets"
    answer: gouvernement
    decoy: president-de-la-republique
    why: "Le pouvoir réglementaire appartient au Premier ministre (article 21)."

  - id: chef-armees
    prompt: "Être le chef des armées"
    answer: president-de-la-republique
    decoy: gouvernement
    why: "Article 15 ; la défense fait aussi partie du « domaine réservé » par la pratique."

  - id: renverser
    prompt: "Renverser le gouvernement par une motion de censure"
    answer: parlement
    decoy: president-de-la-republique
    why: "Seule l'Assemblée nationale peut renverser le gouvernement ; le président ne le peut pas."

  - id: proclamer-resultats
    prompt: "Proclamer les résultats de l'élection présidentielle"
    answer: conseil-constitutionnel
    decoy: gouvernement
    why: "Le Conseil constitutionnel veille à la régularité de la présidentielle et en proclame les résultats."

  - id: congres
    prompt: "Réviser la Constitution en Congrès, à la majorité des trois cinquièmes"
    answer: parlement
    decoy: conseil-constitutionnel
    why: "Les deux chambres réunies à Versailles forment le Congrès."

  - id: nommer-pm
    prompt: "Nommer le Premier ministre"
    answer: president-de-la-republique
    decoy: parlement
    why: "L'article 8 en fait un pouvoir propre du président ; il n'y a pas de vote d'investiture."

  - id: ordonnances
    prompt: "Légiférer par ordonnances, avec l'autorisation du Parlement"
    answer: gouvernement
    decoy: parlement
    why: "L'article 38 permet au gouvernement de prendre des ordonnances dans le domaine de la loi."

  - id: monnaie
    prompt: "Conduire la politique monétaire de la zone euro"
    answer: union-europeenne
    decoy: gouvernement
    why: "C'est la Banque centrale européenne, à Francfort, qui conduit la politique monétaire de la zone euro."

  - id: parrainages
    prompt: "Recevoir et vérifier les 500 parrainages des candidats à la présidentielle"
    answer: conseil-constitutionnel
    decoy: president-de-la-republique
    why: "Le Conseil constitutionnel reçoit les parrainages et publie le nom des parrains."

  - id: referendum
    prompt: "Soumettre un projet de loi au référendum (article 11)"
    answer: president-de-la-republique
    decoy: parlement
    why: "Le président décide du référendum, sur proposition du gouvernement ou des deux assemblées."

  - id: collectivites
    prompt: "Représenter les collectivités territoriales"
    answer: parlement
    decoy: gouvernement
    why: "C'est le rôle du Sénat, l'une des deux chambres du Parlement (article 24)."
---
