---
name: Elasticsearch
kind: base-de-donnees
layers: [base-operationnelle, observabilite]
tags: [distribue, nosql, recherche, offre-managee]
difficulty: 3
summary: "Moteur de recherche distribué : recherche plein texte classée par pertinence, filtres et agrégations sur de gros volumes de documents JSON, journaux compris."
alternatives:
  - tech: postgresql
    note: "Sa recherche plein texte intégrée suffit souvent pour un besoin simple, sans second système à opérer ni à synchroniser."
integratesWith:
  - tech: grafana
    note: "Grafana peut construire des tableaux de bord à partir d'un index Elasticsearch, par exemple de journaux."
---

## Problème résolu

Chercher « chaussure rouge » dans un catalogue avec un `LIKE '%…%'` est lent, ignore les fautes de frappe et les pluriels, et ne classe pas les résultats. Elasticsearch (Shay Banon, 2010), bâti sur la bibliothèque Apache Lucene, construit un index inversé : pour chaque mot, la liste des documents qui le contiennent. Il analyse le texte selon la langue (racines, accents, synonymes), classe les résultats par pertinence, tolère les fautes et calcule des agrégations, comme les compteurs des filtres à facettes.

Les données sont des documents JSON, répartis en shards sur un cluster et répliqués. Il sert aussi à centraliser et fouiller des journaux : c'est le « E » de la pile ELK (Elasticsearch, Logstash, Kibana). Côté licence, Elastic a quitté la licence Apache en 2021, ce qui a conduit AWS à créer le fork OpenSearch, puis a ajouté l'AGPL comme option en 2024.

## Quand l'utiliser

- Recherche au cœur du produit : catalogue e-commerce, petites annonces, documentation, avec pertinence, fautes de frappe et facettes.
- Centraliser et interroger les journaux de nombreux services.
- En complément de la base principale, alimenté à partir d'elle.

## Quand l'éviter

- Comme base principale : pas de transactions entre documents, et un document indexé n'apparaît dans la recherche qu'après un court délai de rafraîchissement. La base de référence reste transactionnelle ; Elasticsearch en est une copie à synchroniser.
- Recherche simple sur un volume modeste : la recherche plein texte de PostgreSQL évite un second système.
- Petite équipe sans compétences d'exploitation : un cluster demande de la mémoire, un mapping réfléchi et de la surveillance. Les offres managées (Elastic Cloud, Amazon OpenSearch Service) allègent cette charge.

## Pour aller plus loin

- [Documentation officielle](https://www.elastic.co/docs)
- [OpenSearch, le fork open-source](https://opensearch.org/)
