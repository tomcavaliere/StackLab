import { useEffect, useLayoutEffect, useMemo, useRef, useState, type DragEvent, type MouseEvent } from 'react';
import {
  BaseEdge,
  getBezierPath,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  type Edge,
  type EdgeProps,
  type Node,
  type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CONFIDENCES, KINDS, LAYERS, VERDICTS, type Kind, type Layer } from '../../lib/taxonomy';
import { scoreStack, type Card, type CardVerdict, type ScenarioRules, type ScoreResult } from '../../lib/scoring';
import { buildFlow, FLOW_LABELS, nodeId, SOURCES, USER, type FlowKind, type Step } from './flows';

export interface GameTech {
  id: string;
  name: string;
  kind: Kind;
  summary: string;
  layers: Layer[];
  tags: string[];
}

export interface CompanyStack {
  id: string;
  company: string;
  entries: {
    layer: Layer;
    techId: string;
    confidence: keyof typeof CONFIDENCES;
    sourceTitle: string;
    source: string;
    sourceDate: string;
  }[];
}

interface Props {
  scenarioId: string;
  rules: ScenarioRules;
  referenceStack: Partial<Record<Layer, string[]>>;
  techs: GameTech[];
  company?: CompanyStack;
}

const LAYER_IDS = Object.keys(LAYERS) as Layer[];
const DRAG_TYPE = 'application/x-stacklab-tech';

// Géométrie du diagramme (px) : une bande par couche, les cartes alignées dans leur bande.
// Le viewport React Flow est figé (zoom 1, pas de pan) : coordonnées du flow = coordonnées dans le plateau.
// Plateau étroit (téléphone) : le libellé de la couche passe au-dessus de ses cartes au lieu d'occuper une colonne.
const LABEL_W = 190;
const COMPACT_LABEL_H = 20;
const COMPACT_W = 640; // largeur du plateau sous laquelle il passe en compact
const CARD_W = 150;
const CARD_H = 46;
const GAP = 8;
const PER_ROW = 5; // au plus ; moins si le plateau est étroit
const EMPTY_H = 44;
const TOP = 60; // bande des acteurs (utilisateur, sources de données), départ des animations
const STEP_MS = 2400;

export const VERDICT_LABELS: Record<CardVerdict, string> = { ...VERDICTS, 'non-evalue': 'Non évalué' };
const CARD_STYLES: Record<CardVerdict, string> = {
  ideal: 'border-emerald-500 bg-emerald-50',
  acceptable: 'border-lime-500 bg-lime-50',
  surdimensionne: 'border-amber-500 bg-amber-50',
  inadapte: 'border-red-500 bg-red-50',
  'non-evalue': 'border-slate-400 bg-slate-100',
};
const BADGE_STYLES: Record<CardVerdict, string> = {
  ideal: 'bg-emerald-600',
  acceptable: 'bg-lime-600',
  surdimensionne: 'bg-amber-500',
  inadapte: 'bg-red-600',
  'non-evalue': 'bg-slate-400',
};

type Band = { layer: Layer; y: number; height: number; cards: Card[] };
type Geometry = { compact: boolean; labelW: number; labelH: number; perRow: number };

function geometry(width: number): Geometry {
  const compact = width > 0 && width < COMPACT_W;
  const labelW = compact ? GAP : LABEL_W;
  const fit = Math.floor((width - labelW - GAP) / (CARD_W + GAP));
  return { compact, labelW, labelH: compact ? COMPACT_LABEL_H : 0, perRow: width ? Math.max(1, Math.min(PER_ROW, fit)) : PER_ROW };
}

function layout(cards: Card[], g: Geometry) {
  let y = TOP;
  const bands: Band[] = LAYER_IDS.map((layer) => {
    const inLayer = cards.filter((c) => c.layer === layer);
    const rows = Math.ceil(inLayer.length / g.perRow);
    const band = { layer, y, height: rows ? g.labelH + rows * (CARD_H + GAP) + GAP : EMPTY_H, cards: inLayer };
    y += band.height;
    return band;
  });
  return { bands, height: y };
}

const cardPosition = (band: Band, i: number, g: Geometry) => ({
  x: g.labelW + (i % g.perRow) * (CARD_W + GAP),
  y: band.y + g.labelH + GAP + Math.floor(i / g.perRow) * (CARD_H + GAP),
});

type Glow = 'active' | 'visited' | undefined;
const GLOW_STYLES = { active: 'ring-4 ring-blue-400', visited: 'ring-2 ring-blue-200' };

// Poignées invisibles : une arête descend (b → t) ou remonte (ts → bt) selon la position relative des nœuds.
function Handles() {
  const hidden = '!h-1 !w-1 !min-w-0 !border-0 !bg-transparent';
  return (
    <>
      <Handle type="target" position={Position.Top} id="t" isConnectable={false} className={hidden} />
      <Handle type="source" position={Position.Top} id="ts" isConnectable={false} className={hidden} />
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={false} className={hidden} />
      <Handle type="target" position={Position.Bottom} id="bt" isConnectable={false} className={hidden} />
    </>
  );
}

type CardData = {
  name: string;
  summary: string;
  verdict?: CardVerdict;
  why?: string;
  onRemove?: () => void;
  glow?: Glow;
};
type CardNodeType = Node<CardData, 'card'>;
type ActorNodeType = Node<{ label: string; glow?: Glow }, 'actor'>;

function ActorNode({ data }: NodeProps<ActorNodeType>) {
  return (
    <div
      className={`flex h-[40px] w-[150px] items-center justify-center rounded-full border border-slate-300 bg-slate-50 text-sm text-slate-600 ${
        data.glow ? GLOW_STYLES[data.glow] : ''
      }`}
    >
      <Handles />
      {data.label}
    </div>
  );
}

function CardNode({ data }: NodeProps<CardNodeType>) {
  return (
    <div
      title={data.why ?? data.summary}
      className={`flex h-[46px] w-[150px] flex-col justify-center rounded border-2 px-2 text-sm shadow-sm transition-shadow ${
        data.verdict ? CARD_STYLES[data.verdict] : 'border-slate-300 bg-white'
      } ${data.glow ? GLOW_STYLES[data.glow] : ''}`}
    >
      <Handles />
      <span className="flex items-center justify-between gap-1">
        <span className="truncate font-medium">{data.name}</span>
        {data.onRemove && (
          <button type="button" onClick={data.onRemove} className="nodrag -mr-1 px-1 text-slate-400 hover:text-red-600" aria-label="Retirer">
            ×
          </button>
        )}
      </span>
      {data.verdict && (
        <span className={`self-start rounded px-1 text-[10px] text-white ${BADGE_STYLES[data.verdict]}`}>
          {VERDICT_LABELS[data.verdict]}
        </span>
      )}
    </div>
  );
}

type FlowEdgeType = Edge<{ active: boolean; dashed?: boolean }, 'flow'>;

// Arête d'animation : un point parcourt le chemin tant que l'étape est en cours.
function FlowEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data, markerEnd }: EdgeProps<FlowEdgeType>) {
  const [path] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        markerEnd={markerEnd}
        style={{
          stroke: data?.active ? '#2563eb' : '#93c5fd',
          strokeWidth: data?.active ? 3 : 2,
          strokeDasharray: data?.dashed ? '6 4' : undefined,
        }}
      />
      {data?.active && (
        <circle r="7" fill="#2563eb">
          <animateMotion dur="1.4s" repeatCount="indefinite" path={path} />
        </circle>
      )}
    </>
  );
}

const nodeTypes = { card: CardNode, actor: ActorNode };
const edgeTypes = { flow: FlowEdge };

const ACTORS = [
  { id: USER, label: '👤 Utilisateur', column: 0 },
  { id: SOURCES, label: '🗄 Sources de données', column: 1 },
];

export default function Game({ scenarioId, rules, referenceStack, techs, company }: Props) {
  const techById = useMemo(() => new Map(techs.map((t) => [t.id, t])), [techs]);
  const techLayers = useMemo(() => Object.fromEntries(techs.map((t) => [t.id, t.layers])), [techs]);
  const [cards, setCards] = useState<Card[]>([]);
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [saveStatus, setSaveStatus] = useState('');
  const [hover, setHover] = useState<Layer | null>(null);
  const [selected, setSelected] = useState<string | null>(null); // carte touchée dans la pioche, à poser d'un toucher sur une couche
  const board = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [flow, setFlow] = useState<{ kind: FlowKind; steps: Step[]; index: number } | null>(null);
  const locked = result !== null;
  const geo = geometry(width);
  const { bands, height } = layout(cards, geo);

  useLayoutEffect(() => {
    const el = board.current!;
    setWidth(el.clientWidth);
    const observer = new ResizeObserver(() => setWidth(el.clientWidth));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const flows = useMemo(
    () => ({ requete: buildFlow('requete', cards, techById), donnees: buildFlow('donnees', cards, techById) }),
    [cards, techById],
  );

  // L'animation avance d'une étape à intervalle régulier ; toute modification de la stack l'arrête.
  useEffect(() => setFlow(null), [cards]);
  useEffect(() => {
    if (!flow || flow.index >= flow.steps.length - 1) return;
    const timer = setTimeout(() => setFlow((f) => f && { ...f, index: f.index + 1 }), STEP_MS);
    return () => clearTimeout(timer);
  }, [flow]);

  const glowOf = (id: string): Glow => {
    if (!flow) return undefined;
    const touches = (s: Step) => s.from === id || s.to === id || !!s.highlight?.includes(id);
    if (touches(flow.steps[flow.index])) return 'active';
    return flow.steps.slice(0, flow.index).some(touches) ? 'visited' : undefined;
  };

  const layerAt = (clientY: number) => {
    const y = clientY - board.current!.getBoundingClientRect().top;
    return bands.find((b) => y >= b.y && y < b.y + b.height)?.layer ?? null;
  };

  function onDragOver(e: DragEvent) {
    if (locked || !e.dataTransfer.types.includes(DRAG_TYPE)) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setHover(layerAt(e.clientY));
  }

  function place(techId: string, layer: Layer | null) {
    if (locked || !techId || !layer) return;
    setCards((cs) => (cs.some((c) => c.techId === techId && c.layer === layer) ? cs : [...cs, { techId, layer }]));
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setHover(null);
    place(e.dataTransfer.getData(DRAG_TYPE), layerAt(e.clientY));
  }

  // Au toucher (ou au clic) : la carte sélectionnée dans la pioche va dans la couche touchée.
  function onBoardTap(e: MouseEvent) {
    if (!selected || (e.target as Element).closest('button')) return;
    const layer = layerAt(e.clientY);
    if (!layer) return;
    place(selected, layer);
    setSelected(null);
  }

  const showDebrief = (show: boolean) => document.getElementById('debrief')?.toggleAttribute('hidden', !show);

  async function validate() {
    const scored = scoreStack(rules, techLayers, cards);
    setResult(scored);
    setSelected(null);
    showDebrief(true);
    setSaveStatus('Enregistrement…');
    try {
      const res = await fetch('/api/attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId,
          score: scored.score,
          cards: scored.cards.map(({ techId, layer, verdict }) => ({ techId, layer, verdict })),
        }),
      });
      setSaveStatus(res.ok ? `Partie n°${(await res.json()).id} enregistrée` : `Échec de l'enregistrement : ${await res.text()}`);
    } catch (error) {
      setSaveStatus(`Échec de l'enregistrement : ${error}`);
    }
  }

  function edit() {
    setResult(null);
    setSaveStatus('');
    showDebrief(false);
  }

  const actorNodes: ActorNodeType[] = ACTORS.map((a) => ({
    id: a.id,
    type: 'actor' as const,
    position: { x: geo.labelW + a.column * (CARD_W + GAP), y: (TOP - 40) / 2 },
    draggable: false,
    selectable: false,
    data: { label: a.label, glow: glowOf(a.id) },
  }));
  const cardNodes: CardNodeType[] = bands.flatMap((band) =>
    band.cards.map((card, i) => {
      const tech = techById.get(card.techId)!;
      const judged = result?.cards.find((r) => r.techId === card.techId && r.layer === card.layer);
      return {
        id: nodeId(card),
        type: 'card' as const,
        position: cardPosition(band, i, geo),
        draggable: false,
        selectable: false,
        data: {
          name: tech.name,
          summary: tech.summary,
          verdict: judged?.verdict,
          why: judged?.why,
          onRemove: locked ? undefined : () => setCards((cs) => cs.filter((c) => c !== card)),
          glow: glowOf(nodeId(card)),
        },
      };
    }),
  );
  const nodes = [...actorNodes, ...cardNodes];

  const top = new Map(nodes.map((n) => [n.id, n.position.y]));
  const edges: FlowEdgeType[] = flow
    ? flow.steps.slice(0, flow.index + 1).flatMap((s, i) => {
        if (!s.from || !s.to) return [];
        const down = top.get(s.from)! < top.get(s.to)!;
        return [
          {
            id: `flow-${i}`,
            source: s.from,
            target: s.to,
            type: 'flow' as const,
            sourceHandle: down ? 'b' : 'ts',
            targetHandle: down ? 't' : 'bt',
            markerEnd: { type: MarkerType.ArrowClosed, color: '#2563eb' },
            zIndex: 10, // au-dessus des cartes : une arête peut traverser une colonne de cartes
            data: { active: i === flow.index, dashed: s.dashed },
          },
        ];
      })
    : [];

  const button = 'rounded px-4 py-2 font-medium disabled:opacity-40';

  return (
    <div className="flex items-start gap-4">
      <Deck techs={techs} disabled={locked} cards={cards} selected={selected} onSelect={setSelected} />

      <div className={`min-w-0 flex-1 ${locked ? '' : 'pb-16 md:pb-0'}`}>
        {selected && (
          <div className="sticky top-0 z-30 mb-2 flex items-center gap-3 rounded border border-blue-300 bg-blue-50 px-3 py-2 text-sm shadow-sm">
            <span>
              Touche une couche pour poser <b>{techById.get(selected)?.name}</b>
            </span>
            <button type="button" onClick={() => setSelected(null)} className="ml-auto px-2 text-slate-500" aria-label="Annuler">
              ✕
            </button>
          </div>
        )}
        <div
          ref={board}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onDragLeave={(e) => {
            if (!board.current!.contains(e.relatedTarget as globalThis.Node | null)) setHover(null);
          }}
          className="relative overflow-hidden rounded border border-slate-200 bg-white"
          style={{ height }}
        >
          <div
            className="absolute inset-x-0 top-0 flex items-center border-b border-slate-200 bg-slate-50 px-3 text-sm text-slate-400"
            style={{ height: TOP }}
          >
            {!geo.compact && 'Point de départ'}
          </div>
          {bands.map((band) => {
            const required = rules.requiredLayers.includes(band.layer);
            const missing = result?.missingLayers.includes(band.layer);
            return (
              <div
                key={band.layer}
                data-layer={band.layer}
                className={`absolute inset-x-0 flex border-b border-slate-100 px-3 ${
                  geo.compact && band.cards.length ? 'items-start pt-0.5' : 'items-center'
                } ${hover === band.layer ? 'bg-blue-100' : missing ? 'bg-red-50' : ''}`}
                style={{ top: band.y, height: band.height }}
              >
                <span
                  className={`flex shrink-0 items-center gap-1.5 font-medium text-slate-700 ${
                    geo.compact ? 'mr-3 text-xs' : 'w-[178px] text-sm'
                  }`}
                >
                  {LAYERS[band.layer]}
                  {required && (
                    <span className={`rounded px-1 text-[10px] text-white ${missing ? 'bg-red-600' : 'bg-slate-700'}`}>
                      requise
                    </span>
                  )}
                </span>
                {band.cards.length === 0 && (
                  <span className={`text-xs ${selected ? 'text-blue-500' : 'text-slate-300'}`}>
                    {selected ? 'toucher pour poser ici' : geo.compact ? '' : 'déposer une carte ici'}
                  </span>
                )}
              </div>
            );
          })}
          <div className="absolute inset-0">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              defaultViewport={{ x: 0, y: 0, zoom: 1 }}
              panOnDrag={false}
              panOnScroll={false}
              zoomOnScroll={false}
              zoomOnPinch={false}
              zoomOnDoubleClick={false}
              preventScrolling={false}
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable={false}
              onPaneClick={onBoardTap}
              onNodeClick={onBoardTap}
            />
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          {locked ? (
            <>
              <button type="button" onClick={edit} className={`${button} bg-slate-200 hover:bg-slate-300`}>
                Modifier ma stack
              </button>
              <button
                type="button"
                onClick={() => {
                  edit();
                  setCards([]);
                }}
                className={`${button} bg-slate-200 hover:bg-slate-300`}
              >
                Recommencer
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={validate}
              disabled={cards.length === 0}
              className={`${button} bg-blue-600 text-white hover:bg-blue-700`}
            >
              Valider ma stack
            </button>
          )}
          <span className="text-sm text-slate-500">
            {cards.length} carte{cards.length > 1 ? 's' : ''} posée{cards.length > 1 ? 's' : ''}
          </span>
          <span className="text-sm text-slate-500">{saveStatus}</span>
          <span className="flex flex-wrap items-center gap-2 md:ml-auto">
            {(Object.keys(FLOW_LABELS) as FlowKind[]).map((kind) => (
              <button
                key={kind}
                type="button"
                disabled={flows[kind].length === 0}
                title={flows[kind].length ? undefined : 'Pose des cartes dans les couches concernées pour animer ce flux'}
                onClick={() => setFlow({ kind, steps: flows[kind], index: 0 })}
                className={`${button} border border-blue-600 text-blue-700 hover:bg-blue-50`}
              >
                ▶ {FLOW_LABELS[kind]}
              </button>
            ))}
          </span>
        </div>

        {flow && (
          <div
            data-flow-caption
            className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[760px] -translate-x-1/2 rounded-lg border border-blue-200 bg-white px-4 py-3 shadow-xl md:px-5"
          >
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <span className="font-semibold text-blue-800">{FLOW_LABELS[flow.kind]}</span>
              <span>
                Étape {flow.index + 1} / {flow.steps.length}
              </span>
              <span className="ml-auto flex gap-1">
                <button
                  type="button"
                  disabled={flow.index === 0}
                  onClick={() => setFlow({ ...flow, index: flow.index - 1 })}
                  className="rounded px-2 hover:bg-slate-100 disabled:opacity-30"
                  aria-label="Étape précédente"
                >
                  ◀
                </button>
                <button
                  type="button"
                  disabled={flow.index === flow.steps.length - 1}
                  onClick={() => setFlow({ ...flow, index: flow.index + 1 })}
                  className="rounded px-2 hover:bg-slate-100 disabled:opacity-30"
                  aria-label="Étape suivante"
                >
                  ▶
                </button>
                <button type="button" onClick={() => setFlow(null)} className="rounded px-2 hover:bg-slate-100" aria-label="Fermer">
                  ✕
                </button>
              </span>
            </div>
            <p className="mt-1 text-slate-800">{flow.steps[flow.index].caption}</p>
          </div>
        )}

        {result && (
          <Results result={result} referenceStack={referenceStack} techById={techById} company={company} />
        )}
      </div>
    </div>
  );
}

// Ordi : colonne collante à gauche du plateau. Téléphone : tiroir fixé en bas de l'écran, replié dès qu'une carte est
// choisie pour libérer le plateau, masqué une fois la stack validée.
function Deck({
  techs,
  cards,
  disabled,
  selected,
  onSelect,
}: {
  techs: GameTech[];
  cards: Card[];
  disabled: boolean;
  selected: string | null;
  onSelect: (id: string | null) => void;
}) {
  const [query, setQuery] = useState('');
  const [layer, setLayer] = useState('');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (selected) setOpen(false);
  }, [selected]);
  const q = query.toLowerCase().trim();
  const shown = techs.filter(
    (t) =>
      (!q || `${t.name} ${t.id} ${t.summary}`.toLowerCase().includes(q)) &&
      (!layer || t.layers.includes(layer as Layer)),
  );
  const field = 'w-full rounded border border-slate-300 px-2 py-1 text-sm';
  const mobileOnlyWhenOpen = open ? '' : 'hidden md:block';

  return (
    <aside
      className={`fixed right-0 bottom-0 left-0 z-40 flex-col rounded-t-lg border-t border-slate-300 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.12)] md:sticky md:top-4 md:right-auto md:bottom-auto md:left-auto md:z-auto md:flex md:max-h-[calc(100vh-2rem)] md:w-72 md:shrink-0 md:rounded md:border md:border-slate-200 md:shadow-none ${
        disabled ? 'hidden' : 'flex'
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between px-4 py-3 text-sm font-semibold md:hidden"
      >
        Pioche · {shown.length} cartes
        <span className="text-slate-500">{open ? '▼' : '▲'}</span>
      </button>
      <div className={`space-y-2 border-b border-slate-200 p-3 ${mobileOnlyWhenOpen}`}>
        <div className="hidden text-sm font-semibold md:block">Pioche · {shown.length} cartes</div>
        <input type="search" placeholder="Rechercher…" value={query} onChange={(e) => setQuery(e.target.value)} className={field} />
        <select value={layer} onChange={(e) => setLayer(e.target.value)} className={field}>
          <option value="">Toutes les couches</option>
          {LAYER_IDS.map((l) => (
            <option key={l} value={l}>
              {LAYERS[l]}
            </option>
          ))}
        </select>
      </div>
      <ul className={`max-h-[45vh] flex-1 space-y-1.5 overflow-y-auto p-2 md:max-h-none ${mobileOnlyWhenOpen}`}>
        {shown.map((t) => {
          const placed = cards.filter((c) => c.techId === t.id).length;
          return (
            <li
              key={t.id}
              data-tech={t.id}
              draggable={!disabled}
              onDragStart={(e) => {
                e.dataTransfer.setData(DRAG_TYPE, t.id);
                e.dataTransfer.effectAllowed = 'copy';
              }}
              onClick={() => !disabled && onSelect(selected === t.id ? null : t.id)}
              className={`rounded border px-2 py-1.5 ${
                disabled ? 'opacity-50' : 'cursor-grab hover:border-blue-400'
              } ${selected === t.id ? 'border-blue-600 ring-2 ring-blue-400' : placed ? 'border-blue-300 bg-blue-50' : 'border-slate-200'}`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-medium">{t.name}</span>
                <a
                  href={`/fiches/${t.id}`}
                  target="_blank"
                  draggable={false}
                  onClick={(e) => e.stopPropagation()}
                  className="shrink-0 text-[10px] text-slate-500 hover:text-blue-700"
                  title="Ouvrir la fiche dans un nouvel onglet"
                >
                  {KINDS[t.kind]} ↗
                </a>
              </div>
              <p className="line-clamp-2 text-xs text-slate-500">{t.summary}</p>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

function Results({
  result,
  referenceStack,
  techById,
  company,
}: {
  result: ScoreResult;
  referenceStack: Partial<Record<Layer, string[]>>;
  techById: Map<string, GameTech>;
  company?: CompanyStack;
}) {
  const name = (id: string) => techById.get(id)?.name ?? id;
  const link = (id: string) => (
    <a href={`/fiches/${id}`} target="_blank" className="text-blue-700 underline">
      {name(id)}
    </a>
  );
  const tone = result.score >= 80 ? 'text-emerald-600' : result.score >= 50 ? 'text-amber-600' : 'text-red-600';
  const sorted = [...result.cards].sort((a, b) => LAYER_IDS.indexOf(a.layer) - LAYER_IDS.indexOf(b.layer));
  const threeYearsAgo = new Date();
  threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);

  return (
    <section className="mt-6 space-y-5">
      <div className="flex flex-wrap items-baseline gap-x-4 rounded bg-white px-5 py-4">
        <span className={`text-5xl font-bold ${tone}`}>{result.score}</span>
        <span className="text-slate-500">/ 100</span>
        <span className="text-sm text-slate-500">
          Moyenne des verdicts : {result.base}
          {result.missingLayers.length > 0 && ` · couches requises vides : −${20 * result.missingLayers.length}`}
          {result.antiPatterns.length > 0 && ` · anti-patterns : −${result.antiPatterns.reduce((s, a) => s + a.penalty, 0)}`}
        </span>
      </div>

      {result.missingLayers.length > 0 && (
        <p className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm">
          <strong>Couches requises vides (−20 chacune) :</strong> {result.missingLayers.map((l) => LAYERS[l]).join(', ')}
        </p>
      )}
      {result.antiPatterns.map((a) => (
        <p key={a.techs.join('+')} className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm">
          <strong>
            Anti-pattern (−{a.penalty}) : {a.techs.map(name).join(' + ')}.
          </strong>{' '}
          {a.why}
        </p>
      ))}

      <div className="overflow-x-auto">
        <table className="w-full overflow-hidden rounded bg-white text-sm">
          <thead className="bg-slate-100 text-left text-slate-600">
            <tr>
              <th className="px-3 py-2">Couche</th>
              <th className="px-3 py-2">Techno</th>
              <th className="px-3 py-2">Verdict</th>
              <th className="px-3 py-2">Pourquoi</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c) => (
              <tr key={`${c.layer}:${c.techId}`} className="border-t border-slate-100 align-top">
                <td className="px-3 py-2 whitespace-nowrap">{LAYERS[c.layer]}</td>
                <td className="px-3 py-2 whitespace-nowrap">{link(c.techId)}</td>
                <td className="px-3 py-2">
                  <span className={`rounded px-1.5 py-0.5 text-xs whitespace-nowrap text-white ${BADGE_STYLES[c.verdict]}`}>
                    {VERDICT_LABELS[c.verdict]}
                  </span>
                </td>
                <td className="px-3 py-2 text-slate-700">{c.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded bg-white px-5 py-4">
        <h2 className="text-lg font-semibold">Une stack de référence</h2>
        <p className="text-sm text-slate-500">Une réponse valide parmi d'autres, pas la seule.</p>
        <dl className="mt-2 grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-sm">
          {LAYER_IDS.filter((l) => referenceStack[l]?.length).map((l) => (
            <div key={l} className="contents">
              <dt className="text-slate-500">{LAYERS[l]}</dt>
              <dd>
                {referenceStack[l]!.map((id, i) => (
                  <span key={id}>
                    {i > 0 && ', '}
                    {link(id)}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {company && (
        <div className="rounded border border-violet-200 bg-white px-5 py-4">
          <h2 className="text-lg font-semibold">
            La vraie stack de{' '}
            <a href={`/entreprises/${company.id}`} className="text-violet-700 underline">
              {company.company}
            </a>
          </h2>
          <div className="overflow-x-auto">
            <table className="mt-2 w-full text-sm">
              <thead className="text-left text-slate-500">
                <tr>
                  <th className="py-1 pr-3">Couche</th>
                  <th className="py-1 pr-3">Techno</th>
                  <th className="py-1 pr-3">Confiance</th>
                  <th className="py-1">Source</th>
                </tr>
              </thead>
              <tbody>
                {[...company.entries]
                  .sort((a, b) => LAYER_IDS.indexOf(a.layer) - LAYER_IDS.indexOf(b.layer))
                  .map((e) => (
                    <tr key={`${e.layer}:${e.techId}`} className="border-t border-slate-100 align-top">
                      <td className="py-1 pr-3 whitespace-nowrap">{LAYERS[e.layer]}</td>
                      <td className="py-1 pr-3 whitespace-nowrap">{link(e.techId)}</td>
                      <td className="py-1 pr-3">{CONFIDENCES[e.confidence]}</td>
                      <td className="py-1">
                        <a href={e.source} target="_blank" className="text-blue-700 underline">
                          {e.sourceTitle}
                        </a>{' '}
                        <span className="text-slate-500">({e.sourceDate})</span>
                        {new Date(e.sourceDate) < threeYearsAgo && (
                          <span className="ml-1 rounded bg-amber-100 px-1 text-xs text-amber-800" title="Source de plus de 3 ans">
                            ⚠ + de 3 ans
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
