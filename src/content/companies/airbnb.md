---
company: Airbnb
product: "Place de marché de locations de logements et d'expériences"
need: "Faire évoluer une plateforme mondiale modifiée par des centaines d'équipes, et exploiter massivement ses données (recherche, prix, confiance)."
scenario: devine-airbnb
lastResearched: 2026-10-10
stack:
  frontend:
    - tech: react
      source: https://airbnb.tech/infrastructure/accelerating-large-scale-test-migration-with-llms/
      sourceTitle: "Accelerating Large-Scale Test Migration with LLMs"
      sourceDate: 2025-04-01
      sourceType: blog-engineering
      confidence: confirme
      note: "Migration de près de 3 500 fichiers de tests de composants React d'Enzyme vers React Testing Library."
  backend-api:
    - tech: ruby-on-rails
      source: https://www.infoq.com/presentations/airbnb-soa-migration/
      sourceTitle: "The Great Migration: from Monolith to Service-Oriented (QCon San Francisco)"
      sourceDate: 2018-12-05
      sourceType: talk
      confidence: confirme
      note: "Monolithe Rails historique (« Monorail »), découpé en services à partir de 2017-2018. Un article de 2026 mentionne encore des applications Ruby (ActiveRecord)."
    - tech: java
      source: https://airbnb.tech/infrastructure/sitar-agent-building-a-reliable-dynamic-configuration-sidecar-at-scale/
      sourceTitle: "Sitar-agent: Building a reliable dynamic configuration sidecar at scale"
      sourceDate: 2026-06-04
      sourceType: blog-engineering
      confidence: confirme
      note: "Présenté comme le langage JVM principal d'Airbnb ; la flotte de services compte aussi Python, Go, TypeScript et Ruby."
  base-operationnelle:
    - tech: mysql
      source: https://airbnb.tech/infrastructure/beyond-synthetic-testing-capturing-and-replaying-real-database-workloads-at-airbnb/
      sourceTitle: "Beyond synthetic testing: Capturing and replaying real database workloads at Airbnb"
      sourceDate: 2026-10-06
      sourceType: blog-engineering
      confidence: confirme
      note: "Bases compatibles MySQL derrière ProxySQL, migration de MySQL 5.7 vers 8.0."
  cache-messaging:
    - tech: kafka
      source: https://airbnb.tech/infrastructure/building-a-next-generation-key-value-store-at-airbnb/
      sourceTitle: "Building a Next-Generation Key-Value Store at Airbnb"
      sourceDate: 2026-02-25
      sourceType: blog-engineering
      confidence: confirme
      note: "Kafka sert d'intermédiaire pour fiabiliser les écritures du key-value store. Page non datée : date de mise en ligne sur airbnb.tech, l'article d'origine peut être antérieur."
  stockage-analytique:
    - tech: aws-s3
      source: https://medium.com/airbnb-engineering/upgrading-data-warehouse-infrastructure-at-airbnb-a4e18f09b6d5
      sourceTitle: "Upgrading Data Warehouse Infrastructure at Airbnb"
      sourceDate: 2022-09-26
      sourceType: blog-engineering
      confidence: confirme
      note: "Entrepôt de données passé de HDFS à S3, avec un métastore Hive puis une migration vers Iceberg."
  traitement-data:
    - tech: spark
      source: https://medium.com/airbnb-engineering/upgrading-data-warehouse-infrastructure-at-airbnb-a4e18f09b6d5
      sourceTitle: "Upgrading Data Warehouse Infrastructure at Airbnb"
      sourceDate: 2022-09-26
      sourceType: blog-engineering
      confidence: confirme
      note: "Données lues via Spark, Trino et Hive ; migration de l'ingestion des événements vers Spark 3 et Iceberg."
  orchestration:
    - tech: airflow
      source: https://airbnb.tech/infrastructure/building-a-next-generation-key-value-store-at-airbnb/
      sourceTitle: "Building a Next-Generation Key-Value Store at Airbnb"
      sourceDate: 2026-02-25
      sourceType: blog-engineering
      confidence: confirme
      note: "Ingestion des données du key-value store pilotée par Airflow, créé chez Airbnb en 2014. Même réserve de date que pour Kafka."
  conteneurs-infra:
    - tech: kubernetes
      source: https://airbnb.tech/infrastructure/sitar-agent-building-a-reliable-dynamic-configuration-sidecar-at-scale/
      sourceTitle: "Sitar-agent: Building a reliable dynamic configuration sidecar at scale"
      sourceDate: 2026-06-04
      sourceType: blog-engineering
      confidence: confirme
      note: "L'agent de configuration tourne en sidecar à côté de chaque pod de service."
  cloud:
    - tech: aws
      source: https://airbnb.tech/infrastructure/monitoring-reliably-at-scale/
      sourceTitle: "Monitoring reliably at scale"
      sourceDate: 2026-05-07
      sourceType: blog-engineering
      confidence: confirme
      note: "Alertes de secours via AWS SNS et CloudWatch ; S3 sert aussi aux instantanés de configuration (article Sitar-agent)."
  observabilite:
    - tech: prometheus
      source: https://airbnb.tech/infrastructure/monitoring-reliably-at-scale/
      sourceTitle: "Monitoring reliably at scale"
      sourceDate: 2026-05-07
      sourceType: blog-engineering
      confidence: confirme
      note: "Instances Prometheus dédiées à la surveillance de la stack d'observabilité elle-même, avec Alertmanager."
---

## Pourquoi ces choix

**Un monolithe, puis des services.** Airbnb a démarré avec une application Ruby on Rails unique, surnommée « Monorail ». Au talk QCon San Francisco 2018, Jessica Tai explique que le nombre croissant d'ingénieurs rendait les déploiements lents et les changements risqués. L'entreprise a alors migré progressivement vers une architecture orientée services, où chaque service possède ses données et où les changements circulent par événements. Java est aujourd'hui présenté comme le langage JVM principal des services. Ruby n'a pas disparu : un article de 2026 cite encore des applications Ruby.

**Des bases MySQL et des événements Kafka.** Les données en ligne vivent dans des bases compatibles MySQL, derrière ProxySQL. Kafka sert d'intermédiaire entre services, par exemple pour fiabiliser les écritures du key-value store interne.

**Une plateforme Kubernetes sur AWS.** Les services tournent dans des pods Kubernetes, sur AWS. Les articles récents mentionnent aussi Istio comme service mesh et Envoy pour l'ingress ; ces deux outils n'ont pas de fiche dans StackLab. L'observabilité s'appuie sur Prometheus et Alertmanager.

**Un data lake sur S3.** L'entrepôt de données a quitté HDFS pour S3. Les données y sont lues par Spark, Trino et Hive, et une migration vers Spark 3 et le format de tables Iceberg est décrite en 2022. Airflow, créé chez Airbnb en 2014 puis confié à la fondation Apache, orchestre les traitements planifiés.

**Non retenu faute de fiche :** Trino, Hive, Iceberg, Istio, Envoy, ProxySQL, Chronon (plateforme de features ML d'Airbnb). **Non retenu faute de source récente :** React Native, abandonné par Airbnb en 2018.
