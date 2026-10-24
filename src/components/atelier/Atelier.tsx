import { useRef, useState } from 'react';
import type { WebR } from 'webr';
import { normalize, runR, TIMEOUT_MS, WEBR_VERSION, type Lang, type RunResult } from './run';

// Îlot de l'atelier d'une fiche langage (ordi seulement, rien n'est enregistré).
// Sans playground : exécuté hors de la page (worker, ou celui de webR pour R) et comparé à la sortie attendue. Avec : copié, puis ouvert dans le bac à sable du langage.
export interface Exercise {
  id: string;
  title: string;
  prompt: string;
  setup?: string;
  starter: string;
  solution: string;
  expected?: string;
}

interface Props {
  lang?: Lang; // absent : langage non exécutable dans le navigateur
  playground?: string;
  playgroundLabel?: string;
  exercises: Exercise[];
}

// Un seul worker pour la page, recréé s'il dépasse le délai (boucle infinie) : on ne peut pas interrompre du code synchrone autrement.
let worker: Worker | null = null;
const getWorker = () => (worker ??= new Worker(new URL('./runner.worker.ts', import.meta.url), { type: 'module' }));

// R : webR (CDN officiel, ~12 Mo au premier lancement) tourne déjà dans son propre worker. On le pilote d'ici ;
// au-delà du délai, on le ferme et le prochain lancement en recrée un.
const WEBR = `https://webr.r-wasm.org/v${WEBR_VERSION}/`;
let webR: Promise<WebR> | null = null;

async function executeR(code: string): Promise<RunResult> {
  webR ??= import(/* @vite-ignore */ `${WEBR}webr.mjs`).then(async (m: typeof import('webr')) => {
    const r = new m.WebR({ baseUrl: WEBR, interactive: false });
    await r.init();
    return r;
  });
  let r: WebR;
  try {
    r = await webR;
  } catch (e) {
    webR = null;
    return { output: '', error: `Moteur indisponible : ${e}` };
  }
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      r.close();
      webR = null;
      resolve({ output: '', error: `Arrêté au bout de ${TIMEOUT_MS / 1000} s : boucle infinie ?` });
    }, TIMEOUT_MS);
    runR(r, code).then(
      (res) => (clearTimeout(timer), resolve(res)),
      (e) => (clearTimeout(timer), resolve({ output: '', error: String(e) })),
    );
  });
}

function execute(lang: Lang, code: string, setup?: string): Promise<RunResult> {
  if (lang === 'r') return executeR(code);
  const w = getWorker();
  // Python : le premier appel charge Pyodide, plus long que le délai d'exécution.
  const limit = lang === 'python' ? TIMEOUT_MS * 6 : TIMEOUT_MS;
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      w.terminate();
      worker = null;
      resolve({ output: '', error: `Arrêté au bout de ${limit / 1000} s : boucle infinie ?` });
    }, limit);
    w.onmessage = (e: MessageEvent<RunResult>) => {
      clearTimeout(timer);
      resolve(e.data);
    };
    w.postMessage({ lang, code, setup });
  });
}

const button = 'rounded px-3 py-1.5 text-sm font-medium disabled:opacity-40';

export default function Atelier({ lang, playground, playgroundLabel, exercises }: Props) {
  return (
    <div className="space-y-4">
      {exercises.map((x, i) => (
        <Card key={x.id} n={i + 1} exercise={x} lang={lang} playground={playground} playgroundLabel={playgroundLabel} />
      ))}
    </div>
  );
}

function Card({ n, exercise: x, lang, playground, playgroundLabel }: { n: number; exercise: Exercise } & Omit<Props, 'exercises'>) {
  const [code, setCode] = useState(x.starter);
  const [result, setResult] = useState<RunResult | null>(null);
  const [running, setRunning] = useState(false);
  const [solution, setSolution] = useState(false);
  const [copied, setCopied] = useState(false);
  const area = useRef<HTMLTextAreaElement>(null);
  const runnable = lang && !playground;
  const ok = result && !result.error && x.expected !== undefined && normalize(result.output) === normalize(x.expected);

  async function run() {
    if (!runnable || running) return;
    setRunning(true);
    setResult(null);
    setResult(await execute(lang, code, x.setup));
    setRunning(false);
  }

  async function openPlayground() {
    await navigator.clipboard.writeText(code).then(() => setCopied(true), () => setCopied(false));
    window.open(playground, '_blank', 'noopener');
  }

  // Tab insère deux espaces ; Ctrl/Cmd+Entrée exécute.
  function onKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      run();
    } else if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      const t = e.currentTarget;
      const { selectionStart: a, selectionEnd: b } = t;
      setCode(code.slice(0, a) + '  ' + code.slice(b));
      requestAnimationFrame(() => area.current?.setSelectionRange(a + 2, a + 2));
    }
  }

  return (
    <div className="rounded border border-slate-200 bg-white px-5 py-4">
      <h3 className="font-semibold">
        {n}. {x.title}
      </h3>
      <p className="mt-1 whitespace-pre-line text-slate-700">{x.prompt}</p>
      {x.setup && (
        <details className="mt-2 text-sm">
          <summary className="cursor-pointer text-slate-500">Tables de l'exercice</summary>
          <pre className="mt-1 overflow-x-auto rounded bg-slate-100 p-3 text-xs">{x.setup.trim()}</pre>
        </details>
      )}
      <textarea
        ref={area}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={onKey}
        spellCheck={false}
        rows={Math.max(4, code.split('\n').length + 1)}
        className="mt-3 w-full rounded border border-slate-300 bg-slate-900 p-3 font-mono text-sm text-slate-100"
      />
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {runnable ? (
          <button type="button" onClick={run} disabled={running} className={`${button} bg-blue-600 text-white hover:bg-blue-700`}>
            {running ? (lang === 'python' || lang === 'r' ? `Exécution (${lang === 'r' ? 'R' : 'Python'} se charge la première fois)…` : 'Exécution…') : 'Exécuter'}{' '}
            <span className="text-xs opacity-70">(Ctrl+Entrée)</span>
          </button>
        ) : (
          playground && (
            <button type="button" onClick={openPlayground} className={`${button} bg-blue-600 text-white hover:bg-blue-700`}>
              Copier le code et ouvrir {playgroundLabel ?? 'le playground'} ↗
            </button>
          )
        )}
        <button type="button" onClick={() => setCode(x.starter)} className={`${button} bg-slate-200 hover:bg-slate-300`}>
          Réinitialiser
        </button>
        <button type="button" onClick={() => setSolution(!solution)} className={`${button} bg-slate-200 hover:bg-slate-300`}>
          {solution ? 'Masquer la solution' : 'Voir la solution'}
        </button>
        {copied && <span className="text-sm text-slate-500">Code copié : colle-le dans le playground.</span>}
      </div>

      {result && (
        <div className={`mt-3 rounded border px-4 py-3 ${ok ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'}`}>
          <p className={`font-semibold ${ok ? 'text-emerald-700' : 'text-red-700'}`}>
            {ok ? '✓ Sortie attendue obtenue' : result.error ? '✗ Erreur' : '✗ Ce n’est pas la sortie attendue'}
          </p>
          {result.output && <pre className="mt-2 overflow-x-auto text-sm">{result.output}</pre>}
          {result.error && <pre className="mt-2 overflow-x-auto text-sm text-red-800">{result.error}</pre>}
          {!ok && x.expected !== undefined && (
            <>
              <p className="mt-2 text-sm text-slate-600">Attendu :</p>
              <pre className="overflow-x-auto text-sm">{x.expected.trim()}</pre>
            </>
          )}
        </div>
      )}
      {!runnable && x.expected && !solution && (
        <p className="mt-2 text-sm text-slate-600">
          Sortie attendue : <code className="rounded bg-slate-100 px-1 whitespace-pre-wrap">{x.expected.trim()}</code>
        </p>
      )}
      {solution && (
        <div className="mt-3">
          <pre className="overflow-x-auto rounded bg-slate-900 p-3 text-sm text-slate-100">{x.solution.trim()}</pre>
          {x.expected && (
            <pre className="mt-2 overflow-x-auto rounded bg-slate-100 p-3 text-sm">{x.expected.trim()}</pre>
          )}
        </div>
      )}
    </div>
  );
}
