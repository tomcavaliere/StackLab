---
name: Memcached
kind: cache-queue
layers: [cache-messaging]
tags: [open-source, en-memoire, cle-valeur]
difficulty: 1
summary: "Cache distribué en mémoire, purement clé-valeur et volontairement minimal : stocker puis relire des valeurs pour soulager la base."
---

## Problème résolu

Memcached (Brad Fitzpatrick, 2003, pour LiveJournal) fait une seule chose : garder en mémoire des paires clé-valeur avec une durée de vie, et évincer les plus anciennes quand la mémoire est pleine. Le serveur est multithreadé et n'a ni persistance ni réplication. La répartition entre plusieurs serveurs est faite par les clients, qui choisissent le serveur d'une clé par hachage.

Cette simplicité en a fait un cache de très grands sites. Facebook a publié en 2013 un article de recherche sur sa façon de l'exploiter à grande échelle (« Scaling Memcache at Facebook »).

## Quand l'utiliser

- Cache de lecture devant une base, pour des objets sérialisés (résultats de requêtes, fragments de pages).
- Très gros caches où l'on veut le comportement le plus simple et prévisible possible.

## Quand l'éviter

- Besoin de structures de données (listes, compteurs, classements), de pub/sub ou de persistance : Redis les fournit.
- Données qu'on ne peut pas perdre : un redémarrage vide le cache.
- Petite application : un cache n'est utile qu'une fois le goulot d'étranglement mesuré.

## Pour aller plus loin

- [Documentation officielle](https://docs.memcached.org/)
- [Scaling Memcache at Facebook (NSDI 2013)](https://www.usenix.org/conference/nsdi13/technical-sessions/presentation/nishtala)
