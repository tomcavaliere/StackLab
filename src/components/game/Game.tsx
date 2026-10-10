import { useMemo, useRef, useState, type DragEvent } from 'react';
import { ReactFlow, type Node, type NodeProps } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CONFIDENCES, KINDS, LAYERS, VERDICTS, type Kind, type Layer } from '../../lib/taxonomy';
import { scoreStack, type Card, type CardVerdict, type ScenarioRules, type ScoreResult } from '../../lib/scoring';

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
const LABEL_W = 190;
const CARD_W = 150;
const CARD_H = 46;
const GAP = 8;
const PER_ROW = 5;
const EMPTY_H = 44;

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

function layout(cards: Card[]) {
  let y = 0;
  const bands: Band[] = LAYER_IDS.map((layer) => {
    const inLayer = cards.filter((c) => c.layer === layer);
    const rows = Math.ceil(inLayer.length / PER_ROW);
    const band = { layer, y, height: rows ? rows * (CARD_H + GAP) + GAP : EMPTY_H, cards: inLayer };
    y += band.height;
    return band;
  });
  return { bands, height: y };
}

const cardPosition = (band: Band, i: number) => ({
  x: LABEL_W + (i % PER_ROW) * (CARD_W + GAP),
  y: band.y + GAP + Math.floor(i / PER_ROW) * (CARD_H + GAP),
});

type CardData = { name: string; summary: string; verdict?: CardVerdict; why?: string; onRemove?: () => void };
type CardNodeType = Node<CardData, 'card'>;

function CardNode({ data }: NodeProps<CardNodeType>) {
  return (
    <div
      title={data.why ?? data.summary}
      className={`flex h-[46px] w-[150px] flex-col justify-center rounded border-2 px-2 text-sm shadow-sm ${
        data.verdict ? CARD_STYLES[data.verdict] : 'border-slate-300 bg-white'
      }`}
    >
      <span className="flex items-center justify-between gap-1">
        <span className="truncate font-medium">{data.name}</span>
        {data.onRemove && (
          <button type="button" onClick={data.onRemove} className="nodrag text-slate-400 hover:text-red-600" aria-label="Retirer">
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

const nodeTypes = { card: CardNode };

export default function Game({ scenarioId, rules, referenceStack, techs, company }: Props) {
  const techById = useMemo(() => new Map(techs.map((t) => [t.id, t])), [techs]);
  const techLayers = useMemo(() => Object.fromEntries(techs.map((t) => [t.id, t.layers])), [techs]);
  const [cards, setCards] = useState<Card[]>([]);
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [saveStatus, setSaveStatus] = useState('');
  const [hover, setHover] = useState<Layer | null>(null);
  const board = useRef<HTMLDivElement>(null);
  const locked = result !== null;
  const { bands, height } = layout(cards);

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

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setHover(null);
    const techId = e.dataTransfer.getData(DRAG_TYPE);
    const layer = layerAt(e.clientY);
    if (locked || !techId || !layer) return;
    setCards((cs) => (cs.some((c) => c.techId === techId && c.layer === layer) ? cs : [...cs, { techId, layer }]));
  }

  const showDebrief = (show: boolean) => document.getElementById('debrief')?.toggleAttribute('hidden', !show);

  async function validate() {
    const scored = scoreStack(rules, techLayers, cards);
    setResult(scored);
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

  const nodes: CardNodeType[] = bands.flatMap((band) =>
    band.cards.map((card, i) => {
      const tech = techById.get(card.techId)!;
      const judged = result?.cards.find((r) => r.techId === card.techId && r.layer === card.layer);
      return {
        id: `${card.layer}:${card.techId}`,
        type: 'card' as const,
        position: cardPosition(band, i),
        draggable: false,
        selectable: false,
        data: {
          name: tech.name,
          summary: tech.summary,
          verdict: judged?.verdict,
          why: judged?.why,
          onRemove: locked ? undefined : () => setCards((cs) => cs.filter((c) => c !== card)),
        },
      };
    }),
  );

  const button = 'rounded px-4 py-2 font-medium disabled:opacity-40';

  return (
    <div className="flex items-start gap-4">
      <Deck techs={techs} disabled={locked} cards={cards} />

      <div className="min-w-0 flex-1">
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
          {bands.map((band) => {
            const required = rules.requiredLayers.includes(band.layer);
            const missing = result?.missingLayers.includes(band.layer);
            return (
              <div
                key={band.layer}
                data-layer={band.layer}
                className={`absolute inset-x-0 flex items-center border-b border-slate-100 px-3 ${
                  hover === band.layer ? 'bg-blue-100' : missing ? 'bg-red-50' : ''
                }`}
                style={{ top: band.y, height: band.height }}
              >
                <span className="flex w-[178px] shrink-0 items-center gap-1.5 text-sm font-medium text-slate-700">
                  {LAYERS[band.layer]}
                  {required && (
                    <span className={`rounded px-1 text-[10px] text-white ${missing ? 'bg-red-600' : 'bg-slate-700'}`}>
                      requise
                    </span>
                  )}
                </span>
                {band.cards.length === 0 && <span className="text-xs text-slate-300">déposer une carte ici</span>}
              </div>
            );
          })}
          <div className="absolute inset-0">
            <ReactFlow
              nodes={nodes}
              edges={[]}
              nodeTypes={nodeTypes}
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
            />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
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
        </div>

        {result && (
          <Results result={result} referenceStack={referenceStack} techById={techById} company={company} />
        )}
      </div>
    </div>
  );
}

function Deck({ techs, cards, disabled }: { techs: GameTech[]; cards: Card[]; disabled: boolean }) {
  const [query, setQuery] = useState('');
  const [layer, setLayer] = useState('');
  const q = query.toLowerCase().trim();
  const shown = techs.filter(
    (t) =>
      (!q || `${t.name} ${t.id} ${t.summary}`.toLowerCase().includes(q)) &&
      (!layer || t.layers.includes(layer as Layer)),
  );
  const field = 'w-full rounded border border-slate-300 px-2 py-1 text-sm';

  return (
    <aside className="sticky top-4 flex max-h-[calc(100vh-2rem)] w-72 shrink-0 flex-col rounded border border-slate-200 bg-white">
      <div className="space-y-2 border-b border-slate-200 p-3">
        <div className="text-sm font-semibold">Pioche · {shown.length} cartes</div>
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
      <ul className="flex-1 space-y-1.5 overflow-y-auto p-2">
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
              className={`rounded border px-2 py-1.5 ${
                disabled ? 'opacity-50' : 'cursor-grab hover:border-blue-400'
              } ${placed ? 'border-blue-300 bg-blue-50' : 'border-slate-200'}`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-medium">{t.name}</span>
                <a
                  href={`/fiches/${t.id}`}
                  target="_blank"
                  draggable={false}
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
      <div className="flex items-baseline gap-4 rounded bg-white px-5 py-4">
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
      )}
    </section>
  );
}
