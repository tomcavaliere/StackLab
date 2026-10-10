---
name: Spring Boot
kind: framework
layers: [backend-api]
languages: [java]
tags: [open-source, jvm, api]
difficulty: 3
summary: "Framework Java qui configure automatiquement une application Spring prête pour la production : serveur web embarqué, réglages par défaut, métriques."
integratesWith:
  - tech: kafka
    note: "Spring for Apache Kafka fournit producteurs, consommateurs et configuration intégrés."
  - tech: postgresql
    note: "Via Spring Data JPA ou JDBC, configuré automatiquement à partir des dépendances."
---

## Problème résolu

Le framework Spring (2003) apporte l'injection de dépendances et un très large écosystème (accès aux données, sécurité, messagerie), mais il était réputé lourd à configurer. Spring Boot (2014) applique l'auto-configuration : à partir des dépendances présentes, il configure ce qu'il faut, embarque le serveur web (Tomcat par défaut) et produit un JAR exécutable.

L'Actuator expose de quoi exploiter l'application en production : santé, métriques, informations de build. Spring Security, Spring Data et Spring for Apache Kafka couvrent les besoins courants d'un back-end d'entreprise.

## Quand l'utiliser

- Back-end ou API à fort trafic et longue durée de vie, avec une équipe Java ou Kotlin.
- Environnement d'entreprise : intégrations nombreuses (messagerie, annuaires, bases variées), exigences de sécurité.
- Microservices sur la JVM, avec un outillage d'observabilité intégré.

## Quand l'éviter

- MVP à livrer vite par une petite équipe sans expérience de la JVM : la courbe d'apprentissage de Spring est réelle.
- Fonctions serverless à démarrage fréquent : le démarrage et la mémoire de la JVM pèsent, sauf compilation native avec GraalVM.
- L'auto-configuration peut masquer ce qui se passe : déboguer demande de comprendre Spring en profondeur.

## Pour aller plus loin

- [Documentation officielle](https://docs.spring.io/spring-boot/index.html)
- [Guides Spring](https://spring.io/guides)
