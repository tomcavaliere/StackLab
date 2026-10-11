import { useEffect, useState } from 'react';
import {
  answerXp,
  isCorrect,
  isMastered,
  pickQuestions,
  SESSION_SIZE,
  XP,
  type Level,
  type QuestionStat,
  type QuizAnswer,
} from '../../lib/rewards';

export interface QuizQuestion {
  id: string;
  prompt: string;
  answer: string;
  decoy: string;
  why: string;
}

interface Props {
  themeId: string;
  questions: QuizQuestion[];
  techNames: Record<string, string>;
}

/** Réponse de POST /api/quiz. */
interface SaveResult {
  xp: number;
  xpGained: number;
  level: Level;
  levelUp: boolean;
  newBadges: { id: string; icon: string; label: string; description: string }[];
}

type Phase = 'loading' | 'question' | 'feedback' | 'done';
type Round = { q: QuizQuestion; options: [string, string] };

function shuffle<T>(items: T[]) {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function status(s: QuestionStat | undefined) {
  if (!s) return { label: 'Nouvelle', style: 'bg-blue-100 text-blue-800' };
  if (s.streak === 0) return { label: 'Ratée la dernière fois', style: 'bg-red-100 text-red-800' };
  if (isMastered(s)) return { label: 'Maîtrisée', style: 'bg-emerald-100 text-emerald-800' };
  return { label: 'En cours', style: 'bg-amber-100 text-amber-800' };
}

const KEYS = ['← ou 1', '→ ou 2'];
const button = 'rounded px-4 py-2 font-medium disabled:opacity-40';

export default function Quiz({ themeId, questions, techNames }: Props) {
  const [phase, setPhase] = useState<Phase>('loading');
  const [stats, setStats] = useState<Record<string, QuestionStat>>({});
  const [rounds, setRounds] = useState<Round[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [combo, setCombo] = useState(0);
  const [xp, setXp] = useState(0);
  const [saved, setSaved] = useState<SaveResult | null>(null);
  const [error, setError] = useState('');

  const name = (id: string) => techNames[id] ?? id;
  const round = rounds[index];
  const last = answers[index];

  // Nouvelle session : questions ratées et jamais vues d'abord (pickQuestions), ordre et côtés tirés au hasard.
  async function start() {
    setPhase('loading');
    setError('');
    try {
      const res = await fetch(`/api/quiz?theme=${themeId}`);
      if (!res.ok) throw new Error(await res.text());
      const s: Record<string, QuestionStat> = await res.json();
      const picked = shuffle(pickQuestions(shuffle(questions), s, SESSION_SIZE));
      setStats(s);
      setRounds(
        picked.map((q) => ({ q, options: Math.random() < 0.5 ? [q.answer, q.decoy] : [q.decoy, q.answer] })),
      );
      setIndex(0);
      setAnswers([]);
      setCombo(0);
      setXp(0);
      setSaved(null);
      setPhase('question');
    } catch (e) {
      setError(`Impossible de charger l'historique : ${e}`);
    }
  }

  useEffect(() => {
    start();
  }, []);

  function choose(option: 0 | 1) {
    const chosen = round.options[option];
    const correct = chosen === round.q.answer;
    const nextCombo = correct ? combo + 1 : 0;
    setAnswers([...answers, { questionId: round.q.id, chosenTech: chosen, correctTech: round.q.answer }]);
    setCombo(nextCombo);
    if (correct) setXp(xp + answerXp(nextCombo));
    setPhase('feedback');
  }

  async function next() {
    if (index + 1 < rounds.length) {
      setIndex(index + 1);
      setPhase('question');
      return;
    }
    setPhase('done');
    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ themeId, answers }),
      });
      if (!res.ok) throw new Error(await res.text());
      setSaved(await res.json());
      window.dispatchEvent(new Event('stacklab:progress')); // rafraîchit le widget de la nav
    } catch (e) {
      setError(`Échec de l'enregistrement : ${e}`);
    }
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (phase === 'question') {
        if (e.key === 'ArrowLeft' || e.key === '1') choose(0);
        if (e.key === 'ArrowRight' || e.key === '2') choose(1);
      } else if (phase === 'feedback' && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        next();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (error && phase !== 'done') return <p className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm">{error}</p>;
  if (phase === 'loading') return <p className="text-slate-500">Chargement…</p>;
  if (phase === 'done') return <Summary {...{ rounds, answers, saved, error, name, start }} />;

  const st = status(stats[round.q.id]);
  const optionStyle = (tech: string) => {
    if (phase === 'question') return 'border-slate-300 bg-white hover:border-blue-500 hover:bg-blue-50 cursor-pointer';
    if (tech === round.q.answer) return 'border-emerald-500 bg-emerald-50';
    if (tech === last.chosenTech) return 'border-red-500 bg-red-50';
    return 'border-slate-200 bg-white opacity-50';
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 text-sm text-slate-600">
        <span>
          Question {index + 1} / {rounds.length}
        </span>
        <span className="flex gap-1">
          {rounds.map((r, i) => (
            <span
              key={r.q.id}
              className={`h-2 w-5 rounded-full ${
                i >= answers.length ? (i === index ? 'bg-blue-400' : 'bg-slate-200') : isCorrect(answers[i]) ? 'bg-emerald-500' : 'bg-red-500'
              }`}
            />
          ))}
        </span>
        <span className={`font-medium ${combo >= 2 ? 'text-orange-600' : 'text-slate-400'}`}>Combo ×{combo}</span>
        <span className="ml-auto font-semibold text-blue-700">{xp} XP</span>
      </div>

      <div className="mt-4 rounded border border-slate-200 bg-white px-6 py-5">
        <span className={`rounded px-1.5 py-0.5 text-xs ${st.style}`}>{st.label}</span>
        <p className="mt-3 text-2xl leading-snug font-semibold">{round.q.prompt}</p>
        <p className="mt-1 text-sm text-slate-500">Quelle techno choisir ?</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {round.options.map((tech, i) => (
          <button
            key={tech}
            type="button"
            disabled={phase !== 'question'}
            onClick={() => choose(i as 0 | 1)}
            className={`flex h-28 flex-col items-center justify-center rounded-lg border-2 text-xl font-semibold transition-colors ${optionStyle(tech)}`}
          >
            {name(tech)}
            {phase === 'question' && <span className="mt-1 text-xs font-normal text-slate-400">{KEYS[i]}</span>}
          </button>
        ))}
      </div>

      {phase === 'feedback' && (
        <div
          className={`mt-4 rounded border px-5 py-4 ${
            isCorrect(last) ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'
          }`}
        >
          <p className="flex items-baseline gap-3 font-semibold">
            {isCorrect(last) ? (
              <>
                <span className="text-emerald-700">✓ Bonne réponse</span>
                <span key={index} className="xp-pop text-blue-700">
                  +{answerXp(combo)} XP
                </span>
                {combo >= 3 && <span className="text-orange-600">🔥 {combo} d'affilée</span>}
              </>
            ) : (
              <span className="text-red-700">✗ C'était {name(round.q.answer)}</span>
            )}
          </p>
          <p className="mt-2 text-slate-800">{round.q.why}</p>
          <p className="mt-2 flex items-center gap-4 text-sm">
            {[round.q.answer, round.q.decoy].map((id) => (
              <a key={id} href={`/fiches/${id}`} target="_blank" className="text-blue-700 underline">
                Fiche {name(id)} ↗
              </a>
            ))}
            <button type="button" onClick={next} className={`${button} ml-auto bg-blue-600 text-white hover:bg-blue-700`}>
              {index + 1 < rounds.length ? 'Suivante' : 'Voir le bilan'} <span className="text-xs opacity-70">(Entrée)</span>
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

function Summary({
  rounds,
  answers,
  saved,
  error,
  name,
  start,
}: {
  rounds: Round[];
  answers: QuizAnswer[];
  saved: SaveResult | null;
  error: string;
  name: (id: string) => string;
  start: () => void;
}) {
  const good = answers.filter(isCorrect).length;
  const perfect = good === answers.length && answers.length >= XP.perfectMin;
  const tone = good / answers.length >= 0.8 ? 'text-emerald-600' : good / answers.length >= 0.5 ? 'text-amber-600' : 'text-red-600';
  const mistakes = rounds.filter((r, i) => !isCorrect(answers[i]));
  const level = saved?.level;
  const width = saved && saved.level.next ? (100 * (saved.xp - saved.level.floor)) / (saved.level.next - saved.level.floor) : 100;

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-baseline gap-4 rounded bg-white px-5 py-4">
        <span className={`text-5xl font-bold ${tone}`}>{good}</span>
        <span className="text-slate-500">/ {answers.length} bonnes réponses</span>
        {saved && <span className="xp-pop ml-auto text-2xl font-bold text-blue-700">+{saved.xpGained} XP</span>}
      </div>
      {perfect && (
        <p className="rounded border border-emerald-200 bg-emerald-50 px-4 py-3 font-medium text-emerald-800">
          🎯 Sans faute : +{XP.perfect} XP de bonus
        </p>
      )}
      {error && <p className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm">{error}</p>}
      {!saved && !error && <p className="text-sm text-slate-500">Enregistrement…</p>}

      {saved && level && (
        <div className="rounded bg-white px-5 py-4">
          {saved.levelUp && <p className="xp-pop mb-2 text-lg font-bold text-violet-700">🎉 Niveau supérieur : {level.name} !</p>}
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-semibold">
              Niv. {level.number} · {level.name}
            </span>
            <span className="text-slate-500">{level.next ? `${saved.xp} / ${level.next} XP` : `${saved.xp} XP · niveau max`}</span>
          </div>
          <div className="mt-1 h-3 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-blue-600 transition-all duration-700" style={{ width: `${width}%` }} />
          </div>
        </div>
      )}

      {saved && saved.newBadges.length > 0 && (
        <div className="rounded border border-violet-200 bg-white px-5 py-4">
          <h2 className="font-semibold text-violet-800">Badge{saved.newBadges.length > 1 ? 's' : ''} débloqué{saved.newBadges.length > 1 ? 's' : ''}</h2>
          <ul className="mt-2 flex flex-wrap gap-3">
            {saved.newBadges.map((b) => (
              <li key={b.id} className="xp-pop flex items-center gap-2 rounded border border-violet-200 bg-violet-50 px-3 py-2">
                <span className="text-2xl">{b.icon}</span>
                <span>
                  <span className="block font-medium">{b.label}</span>
                  <span className="block text-xs text-slate-600">{b.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {mistakes.length > 0 && (
        <div className="rounded bg-white px-5 py-4">
          <h2 className="font-semibold">À revoir : elles seront reposées en priorité à la prochaine session</h2>
          <ul className="mt-2 space-y-3 text-sm">
            {mistakes.map((r) => (
              <li key={r.q.id}>
                <p className="font-medium">{r.q.prompt}</p>
                <p>
                  <span className="text-emerald-700">{name(r.q.answer)}</span>, pas{' '}
                  <span className="text-red-700">{name(r.q.decoy)}</span>. <span className="text-slate-600">{r.q.why}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-3">
        <button type="button" onClick={start} className={`${button} bg-blue-600 text-white hover:bg-blue-700`}>
          Rejouer
        </button>
        <a href="/quiz" className={`${button} bg-slate-200 hover:bg-slate-300`}>
          Autres thèmes
        </a>
        <a href="/progression" className={`${button} bg-slate-200 hover:bg-slate-300`}>
          Ma progression
        </a>
      </div>
    </div>
  );
}
