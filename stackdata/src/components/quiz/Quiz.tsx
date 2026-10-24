import { useEffect, useRef, useState } from 'react';
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
import { passes, PASS } from '../../lib/path';

// Deux formats : thème (answer et decoys sont des ids de techno, un seul leurre) ou quiz d'une techno (QCM en texte).
// En révision, les questions viennent de plusieurs quiz : chacune porte son quizId (et son techId si c'est un quiz de techno).
export interface QuizQuestion {
  id: string;
  prompt: string;
  answer: string;
  decoys: string[];
  why: string;
  quizId?: string;
  techId?: string;
}

interface Props {
  themeId?: string; // id du thème, ou techQuizId(id de la fiche) ; absent en révision (quizId de chaque question)
  questions: QuizQuestion[];
  techNames: Record<string, string>; // noms des technos citées ; une option absente de la table s'affiche telle quelle
  techId?: string; // quiz d'une techno : options en texte, feedback qui renvoie vers sa fiche
  review?: boolean; // révision : questions dans l'ordre reçu, une erreur repasse une fois en fin de session
  reinforce?: boolean; // renforcement : la page ne passe que les questions jamais vues d'une étape validée
}

/** Réponse de POST /api/quiz. */
interface SaveResult {
  xp: number;
  xpGained: number;
  level: Level;
  levelUp: boolean;
  newBadges: { id: string; icon: string; label: string; description: string }[];
  next: { label: string; href: string } | null; // prochaine étape du parcours
}

type Phase = 'loading' | 'question' | 'feedback' | 'done';
type Round = { q: QuizQuestion; options: string[]; retry?: boolean };

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

const keyHint = (i: number, count: number) => (count === 2 ? ['← ou 1', '→ ou 2'][i] : String(i + 1));
const button = 'rounded px-4 py-2 font-medium disabled:opacity-40';

export default function Quiz({ themeId, questions, techNames, techId, review = false, reinforce = false }: Props) {
  const [phase, setPhase] = useState<Phase>('loading');
  const [stats, setStats] = useState<Record<string, QuestionStat>>({});
  const [rounds, setRounds] = useState<Round[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [combo, setCombo] = useState(0);
  const [xp, setXp] = useState(0);
  const [saved, setSaved] = useState<SaveResult | null>(null);
  const [error, setError] = useState('');
  const feedback = useRef<HTMLDivElement>(null);

  const name = (id: string) => techNames[id] ?? id;
  const round = rounds[index];
  const last = answers[index];

  // Nouvelle session : questions ratées et jamais vues d'abord (pickQuestions), ordre des questions et des options tiré au hasard.
  // En révision, la page a déjà choisi et ordonné les questions.
  async function start() {
    setPhase('loading');
    setError('');
    try {
      let s: Record<string, QuestionStat> = {};
      if (!review) {
        const res = await fetch(`/api/quiz?theme=${encodeURIComponent(themeId!)}`);
        if (!res.ok) throw new Error(await res.text());
        s = await res.json();
      }
      const picked = review ? questions : shuffle(pickQuestions(shuffle(questions), s, SESSION_SIZE));
      setStats(s);
      setRounds(picked.map((q) => ({ q, options: shuffle([q.answer, ...q.decoys]) })));
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

  function choose(option: number) {
    const chosen = round.options[option];
    const correct = chosen === round.q.answer;
    const nextCombo = correct ? combo + 1 : 0;
    setAnswers([...answers, { questionId: round.q.id, chosenTech: chosen, correctTech: round.q.answer }]);
    // Révision : une erreur repasse une fois en fin de session, comme « À revoir » dans Anki.
    if (review && !correct && !round.retry) setRounds([...rounds, { q: round.q, options: shuffle(round.options), retry: true }]);
    setCombo(nextCombo);
    if (correct) setXp(xp + answerXp(nextCombo));
    setPhase('feedback');
  }

  // Une session par quiz : en révision, les réponses sont regroupées par quizId, dans l'ordre où elles ont été données.
  function bySession() {
    const groups = new Map<string, QuizAnswer[]>();
    answers.forEach((a, i) => {
      const id = rounds[i].q.quizId ?? themeId!;
      groups.set(id, [...(groups.get(id) ?? []), a]);
    });
    return [...groups].map(([id, list]) => ({ themeId: id, answers: list }));
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
        body: JSON.stringify({ sessions: bySession() }),
      });
      if (!res.ok) throw new Error(await res.text());
      setSaved(await res.json());
      window.dispatchEvent(new Event('stackdata:progress')); // rafraîchit le widget de la nav
    } catch (e) {
      setError(`Échec de l'enregistrement : ${e}`);
    }
  }

  // Sur téléphone, l'explication apparaît sous le pli : la faire défiler dans la vue.
  useEffect(() => {
    if (phase === 'feedback') feedback.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [phase, index]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (phase === 'question') {
        const n = round.options.length;
        const key = Number(e.key);
        if (Number.isInteger(key) && key >= 1 && key <= n) choose(key - 1);
        if (n === 2 && e.key === 'ArrowLeft') choose(0);
        if (n === 2 && e.key === 'ArrowRight') choose(1);
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
  if (phase === 'done') {
    const remaining = questions.length - rounds.length; // renforcement : questions encore jamais vues
    return <Summary {...{ rounds, answers, saved, error, name, start, review, reinforce, remaining }} />;
  }

  const qTech = round.q.techId ?? techId; // quiz de techno : options en texte
  const fiches = qTech ? [qTech] : [round.q.answer, ...round.q.decoys];

  const st = review ? { label: round.retry ? 'À revoir' : 'Révision', style: 'bg-violet-100 text-violet-800' } : status(stats[round.q.id]);
  const optionStyle = (option: string) => {
    if (phase === 'question') return 'border-slate-300 bg-white hover:border-blue-500 hover:bg-blue-50 cursor-pointer';
    if (option === round.q.answer) return 'border-emerald-500 bg-emerald-50';
    if (option === last.chosenTech) return 'border-red-500 bg-red-50';
    return 'border-slate-200 bg-white opacity-50';
  };

  return (
    <div className="max-w-3xl">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
        <span>
          Question {index + 1} / {rounds.length}
        </span>
        <span className="flex gap-1">
          {rounds.map((r, i) => (
            <span
              key={i}
              className={`h-2 w-5 rounded-full ${
                i >= answers.length ? (i === index ? 'bg-blue-400' : 'bg-slate-200') : isCorrect(answers[i]) ? 'bg-emerald-500' : 'bg-red-500'
              }`}
            />
          ))}
        </span>
        <span className={`font-medium ${combo >= 2 ? 'text-orange-600' : 'text-slate-400'}`}>Combo ×{combo}</span>
        <span className="ml-auto font-semibold text-blue-700">{xp} XP</span>
      </div>

      <div className="mt-4 rounded border border-slate-200 bg-white px-4 py-4 md:px-6 md:py-5">
        <span className={`rounded px-1.5 py-0.5 text-xs ${st.style}`}>{st.label}</span>
        <p className="mt-3 text-xl leading-snug font-semibold md:text-2xl">{round.q.prompt}</p>
        {review && qTech && <p className="mt-1 text-sm text-slate-500">Quiz {name(qTech)}</p>}
        {!qTech && <p className="mt-1 text-sm text-slate-500">Quelle techno choisir ?</p>}
      </div>

      <div className={qTech ? 'mt-4 space-y-3' : 'mt-4 grid grid-cols-2 gap-4'}>
        {round.options.map((option, i) =>
          qTech ? (
            <button
              key={option}
              type="button"
              disabled={phase !== 'question'}
              onClick={() => choose(i)}
              className={`flex w-full items-center gap-3 rounded-lg border-2 px-4 py-3 text-left transition-colors md:gap-4 md:px-5 md:py-4 md:text-lg ${optionStyle(option)}`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-slate-100 text-sm font-semibold text-slate-500">
                {i + 1}
              </span>
              {option}
            </button>
          ) : (
            <button
              key={option}
              type="button"
              disabled={phase !== 'question'}
              onClick={() => choose(i)}
              className={`flex h-24 flex-col items-center justify-center rounded-lg border-2 px-2 text-lg font-semibold transition-colors md:h-28 md:text-xl ${optionStyle(option)}`}
            >
              {name(option)}
              {phase === 'question' && (
                <span className="mt-1 hidden text-xs font-normal text-slate-400 md:inline">{keyHint(i, round.options.length)}</span>
              )}
            </button>
          ),
        )}
      </div>

      {phase === 'feedback' && (
        <div
          ref={feedback}
          className={`mt-4 scroll-mb-4 rounded border px-4 py-4 md:px-5 ${
            isCorrect(last) ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'
          }`}
        >
          <p className="flex flex-wrap items-baseline gap-x-3 font-semibold">
            {isCorrect(last) ? (
              <>
                <span className="text-emerald-700">✓ Bonne réponse</span>
                <span key={index} className="xp-pop text-blue-700">
                  +{answerXp(combo)} XP
                </span>
                {combo >= 3 && <span className="text-orange-600">🔥 {combo} d'affilée</span>}
              </>
            ) : (
              <span className="text-red-700">{qTech ? '✗ Raté : la bonne réponse est en vert' : `✗ C'était ${name(round.q.answer)}`}</span>
            )}
          </p>
          <p className="mt-2 text-slate-800">{round.q.why}</p>
          <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            {fiches.map((id) => (
              <a key={id} href={`/fiches/${id}`} target="_blank" className="text-blue-700 underline">
                Fiche {name(id)} ↗
              </a>
            ))}
            <button type="button" onClick={next} className={`${button} ml-auto bg-blue-600 text-white hover:bg-blue-700`}>
              {index + 1 < rounds.length ? 'Suivante' : 'Voir le bilan'} <span className="hidden text-xs opacity-70 md:inline">(Entrée)</span>
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
  review,
  reinforce,
  remaining,
}: {
  rounds: Round[];
  answers: QuizAnswer[];
  saved: SaveResult | null;
  error: string;
  name: (id: string) => string;
  start: () => void;
  review: boolean;
  reinforce: boolean;
  remaining: number;
}) {
  const good = answers.filter(isCorrect).length;
  const perfect = good === answers.length && answers.length >= XP.perfectMin;
  const tone = good / answers.length >= 0.8 ? 'text-emerald-600' : good / answers.length >= 0.5 ? 'text-amber-600' : 'text-red-600';
  const mistakes = rounds.map((r, i) => ({ r, a: answers[i] })).filter(({ a, r }) => !isCorrect(a) && !r.retry);
  const passed = passes(answers);
  const level = saved?.level;
  const width = saved && saved.level.next ? (100 * (saved.xp - saved.level.floor)) / (saved.level.next - saved.level.floor) : 100;

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex flex-wrap items-baseline gap-x-4 rounded bg-white px-5 py-4">
        <span className={`text-5xl font-bold ${tone}`}>{good}</span>
        <span className="text-slate-500">/ {answers.length} bonnes réponses</span>
        {saved && <span className="xp-pop ml-auto text-2xl font-bold text-blue-700">+{saved.xpGained} XP</span>}
      </div>
      {perfect && (
        <p className="rounded border border-emerald-200 bg-emerald-50 px-4 py-3 font-medium text-emerald-800">
          🎯 Sans faute : +{XP.perfect} XP de bonus
        </p>
      )}
      {reinforce && (
        <p className="rounded border border-violet-200 bg-violet-50 px-4 py-3 text-violet-900">
          Ces {answers.length} questions entrent dans tes révisions.{' '}
          {remaining > 0 ? `Il en reste ${remaining} jamais vue${remaining > 1 ? 's' : ''}.` : 'Tout le quiz est vu.'}
        </p>
      )}
      {!review &&
        !reinforce &&
        (passed ? (
          <p className="rounded border border-emerald-200 bg-emerald-50 px-4 py-3 font-medium text-emerald-800">✓ Étape validée</p>
        ) : (
          <p className="rounded border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
            Il faut au moins {Math.ceil(PASS.ratio * answers.length)} bonnes réponses sur {answers.length} pour valider l'étape. Les
            questions ratées reviendront en premier.
          </p>
        ))}
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
          <h2 className="font-semibold">À revoir : elles reviendront dans les révisions</h2>
          <ul className="mt-2 space-y-3 text-sm">
            {mistakes.map(({ r, a }) => (
              <li key={r.q.id}>
                <p className="font-medium">{r.q.prompt}</p>
                <p className="text-emerald-700">✓ {name(r.q.answer)}</p>
                <p className="text-red-700">✗ {name(a.chosenTech)}</p>
                <p className="text-slate-600">{r.q.why}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {reinforce && remaining > 0 && (
          <button type="button" onClick={() => location.reload()} className={`${button} bg-blue-600 text-white hover:bg-blue-700`}>
            Continuer le renforcement ({remaining} restante{remaining > 1 ? 's' : ''})
          </button>
        )}
        {reinforce && (
          <a href="/renforcement" className={`${button} ${remaining > 0 ? 'bg-slate-200 hover:bg-slate-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
            Renforcement
          </a>
        )}
        {!reinforce && (passed || review) && saved?.next && (
          <a href={saved.next.href} className={`${button} bg-blue-600 text-white hover:bg-blue-700`}>
            Suite : {saved.next.label} →
          </a>
        )}
        {!review && !reinforce && (
          <button
            type="button"
            onClick={start}
            className={`${button} ${passed ? 'bg-slate-200 hover:bg-slate-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            Rejouer
          </button>
        )}
        <a href="/" className={`${button} bg-slate-200 hover:bg-slate-300`}>
          Parcours
        </a>
      </div>
    </div>
  );
}
