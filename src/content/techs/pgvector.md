---
name: pgvector
kind: base-de-donnees
layers: [ml]
languages: [sql]
tags: [open-source, vectoriel]
difficulty: 2
summary: "Extension PostgreSQL qui ajoute un type vecteur et la recherche par similarité : les embeddings vivent dans la même base que les données métier."
alternatives:
  - tech: qdrant
    note: "Base vectorielle dédiée : filtrage riche sur les métadonnées, recherche hybride et quantification intégrées, au prix d'une brique de plus à opérer et à synchroniser."
  - tech: pinecone
    note: "Base vectorielle entièrement managée : rien à opérer, mais un fournisseur de plus et des données hors de votre base."
integratesWith:
  - tech: postgresql
    note: "C'est une extension : on l'active par CREATE EXTENSION vector dans une base PostgreSQL existante."
  - tech: supabase
    note: "Supabase propose l'extension sur ses bases : recherche vectorielle sans service supplémentaire."
  - tech: embeddings
    note: "pgvector stocke et compare les vecteurs ; un modèle d'embeddings, appelé à part, les calcule."
  - tech: rag
    note: "Brique de recherche d'un RAG simple : retrouver les passages les plus proches de la question."
---

## Problème résolu

Une application d'IA (recherche sémantique, RAG, recommandation) doit retrouver les éléments dont l'embedding est le plus proche d'un vecteur donné. pgvector ajoute à PostgreSQL un type `vector` (et des variantes : demi-précision `halfvec`, creux `sparsevec`, binaire `bit`) et des opérateurs de distance : euclidienne (L2), cosinus, produit scalaire (négatif), L1.

Sans index, la recherche est exacte : PostgreSQL compare le vecteur à toutes les lignes. Pour aller plus vite, on crée un index approximatif, HNSW (un graphe de voisinage) ou IVFFlat (des listes de vecteurs regroupés autour de centres, à créer une fois la table remplie) : on gagne en vitesse ce qu'on perd un peu en rappel (quelques vrais voisins peuvent manquer).

Le gros avantage : les vecteurs sont des colonnes comme les autres. On filtre, on joint et on applique les droits d'accès en SQL, dans la même transaction que les données métier, sans deuxième base à synchroniser.

## Quand l'utiliser

- L'application a déjà PostgreSQL : ajouter la recherche vectorielle coûte une extension, pas une brique d'infrastructure.
- RAG, recherche sémantique ou « éléments similaires » sur un volume modeste à moyen, avec des filtres métier (client, langue, date) exprimés en SQL.
- Petite équipe qui veut une seule base à sauvegarder, surveiller et sécuriser.

## Quand l'éviter

- Très gros volumes de vecteurs ou forte charge de requêtes vectorielles : la recherche partage les ressources de la base transactionnelle, alors qu'une base dédiée se dimensionne à part. Aucun seuil fiable n'est donné ici : il dépend du matériel, de la dimension des vecteurs et des réglages d'index.
- Filtres très sélectifs combinés à un index approximatif : le filtre s'applique après le parcours de l'index, ce qui peut renvoyer moins de résultats que demandé. Les parcours itératifs (depuis la version 0.8.0), les index partiels ou le partitionnement atténuent le problème, mais il faut le savoir.
- Besoin de recherche hybride (mots-clés + sémantique) clé en main : c'est faisable avec la recherche plein texte de PostgreSQL, mais à assembler soi-même.

## Pour aller plus loin

- [Dépôt et documentation officielle](https://github.com/pgvector/pgvector)
- [Extension pgvector sur Supabase](https://supabase.com/docs/guides/database/extensions/pgvector)
