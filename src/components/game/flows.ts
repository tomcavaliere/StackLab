// Étapes des animations de flux, construites à partir des cartes posées (fonction pure, sans UI).
// Une étape relie deux nœuds du diagramme (id `${layer}:${techId}`, ou un acteur) et porte une légende.
// Les légendes reprennent le `summary` des fiches : c'est lui qui explique le rôle de chaque brique.
import type { Card } from '../../lib/scoring';
import type { Layer } from '../../lib/taxonomy';

export type FlowKind = 'requete' | 'donnees';
export const FLOW_LABELS: Record<FlowKind, string> = { requete: 'Requête utilisateur', donnees: 'Flux de données' };

export const USER = 'actor:user';
export const SOURCES = 'actor:sources';

export interface Step {
  from?: string;
  to?: string;
  /** Nœuds mis en évidence en plus de from et to. */
  highlight?: string[];
  caption: string;
  dashed?: boolean;
}

interface TechInfo {
  name: string;
  summary: string;
  tags: string[];
}

const INFRA: Layer[] = ['cloud', 'conteneurs-infra', 'ci-cd', 'observabilite'];
export const nodeId = (c: Card) => `${c.layer}:${c.techId}`;

export function buildFlow(kind: FlowKind, cards: Card[], techs: Map<string, TechInfo>): Step[] {
  const steps = kind === 'requete' ? requestFlow(cards, techs) : dataFlow(cards, techs);
  if (!steps.some((s) => s.from && s.to)) return [];
  const infra = infraStep(cards, techs);
  return infra ? [...steps, infra] : steps;
}

function helpers(cards: Card[], techs: Map<string, TechInfo>) {
  const tech = (c: Card) => techs.get(c.techId)!;
  return {
    first: (layer: Layer) => cards.find((c) => c.layer === layer),
    all: (layer: Layer) => cards.filter((c) => c.layer === layer),
    isStream: (c: Card) => tech(c).tags.includes('streaming'),
    name: (c: Card) => tech(c).name,
    role: (c: Card) => `${tech(c).name} : ${tech(c).summary}`,
    about: (c: Card) => tech(c).summary,
  };
}

function requestFlow(cards: Card[], techs: Map<string, TechInfo>): Step[] {
  const { first, all, isStream, name, role } = helpers(cards, techs);
  const front = first('frontend') ?? first('mobile');
  const api = first('backend-api');
  const auth = first('auth');
  const cache = all('cache-messaging').find((c) => !isStream(c));
  const events = all('cache-messaging').find(isStream);
  const dbs = all('base-operationnelle');
  const steps: Step[] = [];

  let prev = USER;
  if (front) {
    steps.push({ from: USER, to: nodeId(front), caption: `L'utilisateur ouvre l'application. ${role(front)}` });
    prev = nodeId(front);
  }
  if (api) {
    const caption = !front
      ? `Une application cliente appelle l'API. ${role(api)}`
      : front.techId === api.techId
        ? `Le même ${name(api)} traite la requête côté serveur.`
        : `L'interface appelle l'API. ${role(api)}`;
    steps.push({ from: prev, to: nodeId(api), caption });
    prev = nodeId(api);
  }
  if (auth) {
    const caption =
      auth.techId === api?.techId
        ? `${name(auth)} vérifie lui-même la session de l'utilisateur.`
        : `Vérification de l'identité de l'utilisateur. ${role(auth)}`;
    steps.push({ from: prev, to: nodeId(auth), caption });
  }
  if (cache) steps.push({ from: prev, to: nodeId(cache), caption: `On cherche d'abord dans le cache, pour épargner la base. ${role(cache)}` });
  for (const db of dbs) steps.push({ from: prev, to: nodeId(db), caption: `Lecture ou écriture des données métier. ${role(db)}` });
  if (events) {
    steps.push({ from: prev, to: nodeId(events), caption: `Un événement est publié pour les autres services, qui le traiteront à leur rythme. ${role(events)}` });
  }
  if (prev !== USER) steps.push({ from: prev, to: front && prev !== nodeId(front) ? nodeId(front) : USER, caption: "La réponse remonte jusqu'à l'utilisateur." });
  if (front && prev !== nodeId(front)) steps.push({ from: nodeId(front), to: USER, caption: `${name(front)} affiche le résultat.` });
  return steps;
}

function dataFlow(cards: Card[], techs: Map<string, TechInfo>): Step[] {
  const { first, all, isStream, name, role, about } = helpers(cards, techs);
  const db = first('base-operationnelle');
  const stream = all('cache-messaging').find(isStream);
  const stores = all('stockage-analytique');
  const transforms = all('traitement-data');
  const orchestrator = first('orchestration');
  const ml = first('ml');
  const steps: Step[] = [];

  let prev = db ? nodeId(db) : SOURCES;
  steps.push(
    db
      ? { highlight: [nodeId(db)], caption: `Les données naissent dans la base de l'application. ${role(db)}` }
      : { highlight: [SOURCES], caption: 'Les données arrivent des systèmes sources (applications, caisses, fichiers, API…).' },
  );
  if (stream) {
    steps.push({ from: prev, to: nodeId(stream), caption: `Les changements sont publiés en continu sous forme d'événements. ${role(stream)}` });
    prev = nodeId(stream);
  }
  const landing = stores[0];
  if (landing) {
    const caption =
      stores.length > 1 ? `Les données brutes atterrissent dans ${name(landing)}. ${about(landing)}` : `Les données sont chargées dans ${name(landing)}. ${about(landing)}`;
    steps.push({ from: prev, to: nodeId(landing), caption });
    prev = nodeId(landing);
  }
  if (orchestrator) {
    const target = transforms[0] ?? landing;
    if (target) {
      steps.push({
        from: nodeId(orchestrator),
        to: nodeId(target),
        dashed: true,
        caption: `${name(orchestrator)} déclenche les étapes dans l'ordre, relance celles qui échouent et garde l'historique.`,
      });
    }
  }
  for (const t of transforms) {
    steps.push({ from: prev, to: nodeId(t), caption: `Transformation des données. ${role(t)}` });
    prev = nodeId(t);
  }
  const final = stores[stores.length - 1];
  if (transforms.length && final) {
    const caption =
      final === landing
        ? `Les résultats sont réécrits dans ${name(final)}, prêts à être interrogés.`
        : `Les tables finales sont chargées dans ${name(final)}, où les analystes les interrogent. ${about(final)}`;
    steps.push({ from: prev, to: nodeId(final), caption });
    prev = nodeId(final);
  }
  if (ml) steps.push({ from: prev, to: nodeId(ml), caption: `Les données préparées alimentent les modèles. ${role(ml)}` });
  return steps;
}

function infraStep(cards: Card[], techs: Map<string, TechInfo>): Step | undefined {
  const names = (layer: Layer) =>
    cards
      .filter((c) => c.layer === layer)
      .map((c) => techs.get(c.techId)!.name)
      .join(', ');
  const parts = [
    names('cloud') && `hébergé sur ${names('cloud')}`,
    names('conteneurs-infra') && `exécuté en conteneurs avec ${names('conteneurs-infra')}`,
    names('ci-cd') && `livré par ${names('ci-cd')}`,
    names('observabilite') && `surveillé par ${names('observabilite')}`,
  ].filter(Boolean);
  if (!parts.length) return undefined;
  return {
    highlight: cards.filter((c) => INFRA.includes(c.layer)).map(nodeId),
    caption: `Autour du flux, le tout est ${parts.join(', ')}.`,
  };
}
