---
company: Instagram
product: "Réseau social de partage de photos et de vidéos (groupe Meta)"
need: "Servir le fil d'actualité, les likes et les commentaires de centaines de millions d'utilisateurs, avec une équipe qui veut rester productive en Python."
scenario: devine-instagram
lastResearched: 2026-10-10
stack:
  mobile:
    - tech: react-native
      source: https://web.archive.org/web/20210112133007/https://instagram-engineering.com/react-native-at-instagram-dd828a9a90c7
      sourceTitle: "React Native at Instagram"
      sourceDate: 2017-02-06
      sourceType: blog-engineering
      confidence: confirme
      note: "Adopté progressivement pour certains écrans (le premier : les réglages des notifications push), à côté du code natif. Blog d'origine inaccessible en octobre 2026 : lien vers l'archive."
  backend-api:
    - tech: django
      source: https://engineering.fb.com/2023/08/15/developer-tools/immortal-objects-for-python-instagram-meta/
      sourceTitle: "Introducing Immortal Objects for Python"
      sourceDate: 2023-08-15
      sourceType: blog-engineering
      confidence: confirme
      note: "« At Meta, we use Python (Django) for our frontend server within Instagram » : serveur multiprocessus, avec asyncio dans chaque processus."
  base-operationnelle:
    - tech: postgresql
      source: https://web.archive.org/web/20201230214620/https://instagram-engineering.com/instagration-pt-2-scaling-our-infrastructure-to-multiple-data-centers-5745cbad7834
      sourceTitle: "Instagration Pt. 2: Scaling our infrastructure to multiple data centers"
      sourceDate: 2015-11-11
      sourceType: blog-engineering
      confidence: confirme
      note: "« Instagram mainly uses two backend database systems: PostgreSQL and Cassandra ». État décrit en 2015, non confirmé depuis."
    - tech: cassandra
      source: https://web.archive.org/web/20221221164348/https://instagram-engineering.com/open-sourcing-a-10x-reduction-in-apache-cassandra-tail-latency-d64f86b43589
      sourceTitle: "Open-sourcing a 10x reduction in Apache Cassandra tail latency"
      sourceDate: 2018-03-05
      sourceType: blog-engineering
      confidence: confirme
      note: "« one of the world's largest deployments of the Apache Cassandra database »."
  cache-messaging:
    - tech: memcached
      source: https://web.archive.org/web/20201230214620/https://instagram-engineering.com/instagration-pt-2-scaling-our-infrastructure-to-multiple-data-centers-5745cbad7834
      sourceTitle: "Instagration Pt. 2: Scaling our infrastructure to multiple data centers"
      sourceDate: 2015-11-11
      sourceType: blog-engineering
      confidence: confirme
      note: "Cache memcache par région, invalidé à partir de la base pour rester cohérent entre datacenters."
---

## Pourquoi ces choix

**Python et Django, poussés très loin.** Instagram a choisi Django dès le départ et en exploite l'un des plus grands déploiements au monde. En 2023, Meta confirme que le serveur d'Instagram est toujours en Python (Django), en multiprocessus avec asyncio. Plutôt que de changer de langage, l'entreprise a investi dans l'optimisation : Cinder, son fork de CPython avec compilateur JIT, et les « Immortal Objects », qui réduisent la mémoire dupliquée entre processus. Threads, lancé en 2023, a réutilisé ce même back-end.

**Deux bases complémentaires.** En 2015, Instagram décrit deux systèmes principaux : PostgreSQL pour les données relationnelles et Cassandra, répliquée entre datacenters. En 2018, l'entreprise revendique l'un des plus grands déploiements de Cassandra au monde, et publie Rocksandra, un moteur de stockage destiné à réduire la latence des lectures.

**Le cache au cœur de la lecture.** Le fil et les profils sont relus en permanence. Memcache absorbe ces lectures, avec une invalidation pilotée par la base pour rester cohérent quand plusieurs régions écrivent.

**React Native par endroits.** L'application mobile est native. React Native y a été introduit écran par écran à partir de 2017.

**À lire avec prudence :** le blog Instagram Engineering a fermé et les publications ont rejoint Engineering at Meta. La plupart des sources ont donc plus de 3 ans. Instagram tourne sur l'infrastructure de Meta depuis sa migration hors d'AWS : il n'y a pas de couche cloud publique à indiquer.
