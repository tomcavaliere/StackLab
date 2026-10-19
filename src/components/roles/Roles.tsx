import { useMemo, useState, type ReactNode } from 'react';

export interface RoleTech {
  id: string;
  why: string;
  essential: boolean;
}
export interface RoleStep {
  step: string;
  intro: string;
  techs: RoleTech[];
}
export interface Role {
  id: string;
  name: string;
  family: string; // clé de ROLE_FAMILIES
  familyLabel: string;
  summary: string;
  mission: string;
  steps: RoleStep[];
}
export interface TechInfo {
  name: string;
  kind: string;
}

interface Props {
  roles: Role[];
  techs: Record<string, TechInfo>;
}

// Classes écrites en entier pour que Tailwind les détecte.
const COLORS: Record<string, { bubble: string; selected: string; venn: string; dot: string }> = {
  dev: { bubble: 'border-blue-300 bg-blue-50 text-blue-900', selected: 'border-blue-700 bg-blue-600 text-white', venn: 'border-blue-500 bg-blue-400/30', dot: 'bg-blue-500' },
  data: { bubble: 'border-emerald-300 bg-emerald-50 text-emerald-900', selected: 'border-emerald-700 bg-emerald-600 text-white', venn: 'border-emerald-500 bg-emerald-400/30', dot: 'bg-emerald-500' },
  ia: { bubble: 'border-violet-300 bg-violet-50 text-violet-900', selected: 'border-violet-700 bg-violet-600 text-white', venn: 'border-violet-500 bg-violet-400/30', dot: 'bg-violet-500' },
  infra: { bubble: 'border-amber-300 bg-amber-50 text-amber-900', selected: 'border-amber-700 bg-amber-600 text-white', venn: 'border-amber-500 bg-amber-400/30', dot: 'bg-amber-500' },
};

type Indexed = Role & { byTech: Map<string, RoleTech> };

const plural = (n: number, word: string) => `${n} ${word}${n > 1 ? 's' : ''}`;

export default function Roles({ roles, techs }: Props) {
  // ?m=data-engineer,data-analyst ouvre la page avec ces métiers sélectionnés.
  const [sel, setSel] = useState<string[]>(() =>
    (new URLSearchParams(location.search).get('m') ?? '')
      .split(',')
      .filter((id) => roles.some((r) => r.id === id))
      .slice(0, 2),
  );

  const indexed = useMemo<Indexed[]>(
    () => roles.map((r) => ({ ...r, byTech: new Map(r.steps.flatMap((s) => s.techs).map((t) => [t.id, t])) })),
    [roles],
  );
  const byId = useMemo(() => new Map(indexed.map((r) => [r.id, r])), [indexed]);
  const common = (a: Indexed, b: Indexed) => [...a.byTech.keys()].filter((id) => b.byTech.has(id));

  // Un clic sélectionne ; un second métier passe en comparaison ; un troisième remplace le second.
  const toggle = (id: string) =>
    setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : s.length < 2 ? [...s, id] : [s[0], id]));
  const compareWith = (a: string, b: string) => setSel([a, b]);

  const a = sel[0] ? byId.get(sel[0]) : undefined;
  const b = sel[1] ? byId.get(sel[1]) : undefined;

  const families = [...new Map(indexed.map((r) => [r.family, r.familyLabel]))];

  const hint = !a
    ? 'Clique sur un métier pour voir les technos qu’il utilise, étape par étape.'
    : !b
      ? `Le nombre sous chaque bulle = technos partagées avec ${a.name}. Clique sur un second métier pour comparer.`
      : 'Clique sur un métier sélectionné pour le retirer, ou sur un autre pour remplacer le second.';

  return (
    <div>
      <p className="text-sm text-slate-600">{hint}</p>

      <div className="mt-4 flex flex-wrap items-end gap-x-12 gap-y-8">
        {families.map(([family, label]) => (
          <section key={family}>
            <h2 className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
              <span className={`inline-block h-2 w-2 rounded-full ${COLORS[family].dot}`} />
              {label}
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              {indexed
                .filter((r) => r.family === family)
                .map((r) => {
                  const picked = sel.includes(r.id);
                  const size = Math.round(96 + 2.4 * r.byTech.size);
                  const shared = a && a.id !== r.id ? common(a, r).length : null;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => toggle(r.id)}
                      style={{ width: size, height: size }}
                      className={`flex cursor-pointer flex-col items-center justify-center rounded-full border-2 p-3 text-center shadow-sm transition hover:shadow-md ${
                        picked ? `${COLORS[family].selected} ring-4 ring-slate-300` : COLORS[family].bubble
                      }`}
                    >
                      <span className="text-sm leading-tight font-semibold">{r.name}</span>
                      <span className={`mt-1 text-xs ${picked ? 'opacity-90' : 'opacity-70'}`}>
                        {shared === null ? plural(r.byTech.size, 'techno') : `${shared} en commun`}
                      </span>
                    </button>
                  );
                })}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-8">
        {a && b ? (
          <Compare a={a} b={b} techs={techs} />
        ) : a ? (
          <Detail role={a} all={indexed} techs={techs} onCompare={(id) => compareWith(a.id, id)} />
        ) : (
          <Overview all={indexed} techs={techs} onPick={toggle} />
        )}
      </div>
    </div>
  );
}

function TechLink({ id, techs }: { id: string; techs: Record<string, TechInfo> }) {
  return (
    <a href={`/fiches/${id}`} className="font-semibold text-blue-700 hover:underline">
      {techs[id]?.name ?? id}
    </a>
  );
}

/** Pas de sélection : comment lire la page, et les technos qui reviennent dans le plus de métiers. */
function Overview({ all, techs, onPick }: { all: Indexed[]; techs: Record<string, TechInfo>; onPick: (id: string) => void }) {
  const crossing = useMemo(() => {
    const users = new Map<string, Indexed[]>();
    for (const r of all) for (const id of r.byTech.keys()) users.set(id, [...(users.get(id) ?? []), r]);
    return [...users]
      .filter(([, rs]) => rs.length >= 3)
      .sort((x, y) => y[1].length - x[1].length || (techs[x[0]]?.name ?? '').localeCompare(techs[y[0]]?.name ?? '', 'fr'));
  }, [all, techs]);

  return (
    <div className="grid grid-cols-[1fr_1.4fr] items-start gap-6">
      <div className="rounded border border-slate-200 bg-white p-5">
        <h2 className="font-semibold">Comment lire cette page</h2>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>
            <b>Une bulle = un métier.</b> Sa taille reflète le nombre de technos qu’il croise ; la couleur, sa famille.
          </li>
          <li>
            <b>Clique sur une bulle</b> : sa pile apparaît dans l’ordre de son travail, avec pour chaque techno ce qu’elle sert à faire pour ce métier.
          </li>
          <li>
            <b>Clique sur une seconde bulle</b> : le croisement montre ce que les deux métiers partagent et ce qui les distingue.
          </li>
          <li>
            Une techno marquée <b>Essentiel</b> est à apprendre avant les autres du même rang.
          </li>
        </ol>
      </div>
      <div className="rounded border border-slate-200 bg-white p-5">
        <h2 className="font-semibold">Les technos qui traversent le plus de métiers</h2>
        <p className="mt-1 text-sm text-slate-600">
          Le socle commun : les apprendre rapporte quel que soit le métier visé.
        </p>
        <ul className="mt-3 space-y-2">
          {crossing.map(([id, rs]) => (
            <li key={id} className="flex flex-wrap items-center gap-2 text-sm">
              <span className="w-28 shrink-0">
                <TechLink id={id} techs={techs} />
              </span>
              <span className="text-xs text-slate-500">{rs.length} métiers</span>
              {rs.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => onPick(r.id)}
                  className="cursor-pointer rounded bg-slate-100 px-1.5 py-0.5 text-xs hover:bg-slate-200"
                >
                  {r.name}
                </button>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Un métier : sa mission, puis sa pile découpée en étapes. */
function Detail({ role, all, techs, onCompare }: { role: Indexed; all: Indexed[]; techs: Record<string, TechInfo>; onCompare: (id: string) => void }) {
  const total = role.byTech.size;
  const essential = [...role.byTech.values()].filter((t) => t.essential).length;
  const usedElsewhere = [...role.byTech.keys()].filter((id) => all.some((r) => r.id !== role.id && r.byTech.has(id))).length;

  return (
    <article>
      <header className="rounded border border-slate-200 bg-white p-5">
        <div className="flex items-baseline gap-3">
          <h2 className="text-2xl font-bold">{role.name}</h2>
          <span className="text-sm text-slate-500">{role.familyLabel}</span>
        </div>
        <p className="mt-1 text-lg text-slate-700">{role.summary}</p>
        <p className="mt-3 max-w-3xl text-sm text-slate-600">{role.mission}</p>
        <p className="mt-3 text-sm text-slate-500">
          {plural(total, 'techno')} · {essential} à maîtriser d’abord · {usedElsewhere} partagée{usedElsewhere > 1 ? 's' : ''} avec d’autres métiers,{' '}
          {total - usedElsewhere} propre{total - usedElsewhere > 1 ? 's' : ''} à celui-ci
        </p>
      </header>

      <ol className="mt-4 space-y-5">
        {role.steps.map((s, i) => (
          <li key={s.step} className="grid grid-cols-[2rem_1fr] gap-x-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-white">{i + 1}</span>
            <div>
              <h3 className="text-lg font-semibold">{s.step}</h3>
              <p className="max-w-3xl text-sm text-slate-600">{s.intro}</p>
              <ul className="mt-3 grid grid-cols-3 gap-3">
                {s.techs.map((t) => {
                  const others = all.filter((r) => r.id !== role.id && r.byTech.has(t.id));
                  return (
                    <li key={t.id} className={`rounded border bg-white p-3 ${t.essential ? 'border-slate-400' : 'border-slate-200'}`}>
                      <div className="flex items-baseline justify-between gap-2">
                        <TechLink id={t.id} techs={techs} />
                        <span className="text-xs text-slate-500">{techs[t.id]?.kind}</span>
                      </div>
                      {t.essential && (
                        <span className="mt-1 inline-block rounded bg-slate-800 px-1.5 py-0.5 text-[11px] font-medium text-white">Essentiel</span>
                      )}
                      <p className="mt-1 text-sm text-slate-700">{t.why}</p>
                      {others.length > 0 && (
                        <p className="mt-2 flex flex-wrap items-center gap-1 text-xs text-slate-500">
                          Aussi :
                          {others.map((r) => (
                            <button
                              key={r.id}
                              type="button"
                              title={`Comparer avec ${r.name}`}
                              onClick={() => onCompare(r.id)}
                              className="cursor-pointer rounded bg-slate-100 px-1.5 py-0.5 hover:bg-slate-200"
                            >
                              {r.name}
                            </button>
                          ))}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}

/** Deux métiers : un diagramme de Venn, puis les technos propres à chacun et celles qu'ils partagent. */
function Compare({ a, b, techs }: { a: Indexed; b: Indexed; techs: Record<string, TechInfo> }) {
  const sort = (ids: string[], r: Indexed) =>
    [...ids].sort(
      (x, y) =>
        Number(r.byTech.get(y)!.essential) - Number(r.byTech.get(x)!.essential) ||
        (techs[x]?.name ?? x).localeCompare(techs[y]?.name ?? y, 'fr'),
    );
  const both = [...a.byTech.keys()].filter((id) => b.byTech.has(id));
  const onlyA = sort([...a.byTech.keys()].filter((id) => !b.byTech.has(id)), a);
  const onlyB = sort([...b.byTech.keys()].filter((id) => !a.byTech.has(id)), b);
  both.sort(
    (x, y) =>
      Number(a.byTech.get(y)!.essential) + Number(b.byTech.get(y)!.essential) -
        (Number(a.byTech.get(x)!.essential) + Number(b.byTech.get(x)!.essential)) ||
      (techs[x]?.name ?? x).localeCompare(techs[y]?.name ?? y, 'fr'),
  );

  const union = onlyA.length + onlyB.length + both.length;
  const pct = Math.round((100 * both.length) / union);

  const zone = (left: string, n: number, label: string) => (
    <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-center" style={{ left }}>
      <div className="text-3xl font-bold">{n}</div>
      <div className="text-xs text-slate-700">{label}</div>
    </div>
  );

  return (
    <article>
      <h2 className="text-2xl font-bold">
        {a.name} <span className="text-slate-400">×</span> {b.name}
      </h2>
      <p className="mt-1 max-w-3xl text-slate-700">
        {both.length > 0
          ? `Ces deux métiers partagent ${plural(both.length, 'techno')} sur ${union} (${pct} %). Pour chacune, c’est la même fiche mais pas forcément le même usage : compare les deux lignes.`
          : 'Aucune techno en commun : leurs piles sont distinctes. Ce qui les relie se situe plutôt dans la manière de travailler que dans les outils.'}
      </p>

      <div className="mx-auto mt-6 w-[22rem]">
        <div className="flex justify-between gap-4 text-sm font-semibold">
          <span className="w-40">{a.name}</span>
          <span className="w-40 text-right">{b.name}</span>
        </div>
        <div className="relative mt-2 h-56">
          <div className={`absolute top-0 left-0 h-56 w-56 rounded-full border-2 ${COLORS[a.family].venn}`} />
          <div className={`absolute top-0 right-0 h-56 w-56 rounded-full border-2 ${COLORS[b.family].venn}`} />
          {zone('4rem', onlyA.length, 'seulement')}
          {zone('11rem', both.length, 'en commun')}
          {zone('18rem', onlyB.length, 'seulement')}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-[1fr_1.5fr_1fr] gap-5">
        <Column title={`Seulement ${a.name}`} empty="Tout ce que ce métier utilise est aussi chez l’autre.">
          {onlyA.map((id) => (
            <Row key={id} id={id} techs={techs} lines={[[null, a.byTech.get(id)!]]} />
          ))}
        </Column>
        <Column title="En commun" highlight empty="Rien en commun.">
          {both.map((id) => (
            <Row key={id} id={id} techs={techs} lines={[[a.name, a.byTech.get(id)!], [b.name, b.byTech.get(id)!]]} />
          ))}
        </Column>
        <Column title={`Seulement ${b.name}`} empty="Tout ce que ce métier utilise est aussi chez l’autre.">
          {onlyB.map((id) => (
            <Row key={id} id={id} techs={techs} lines={[[null, b.byTech.get(id)!]]} />
          ))}
        </Column>
      </div>
    </article>
  );
}

function Column({ title, highlight, empty, children }: { title: string; highlight?: boolean; empty: string; children: ReactNode[] }) {
  return (
    <section className={`rounded border p-4 ${highlight ? 'border-slate-400 bg-white' : 'border-slate-200 bg-slate-100/60'}`}>
      <h3 className="font-semibold">
        {title} <span className="font-normal text-slate-500">({children.length})</span>
      </h3>
      {children.length ? <ul className="mt-3 space-y-3">{children}</ul> : <p className="mt-3 text-sm text-slate-500">{empty}</p>}
    </section>
  );
}

function Row({ id, techs, lines }: { id: string; techs: Record<string, TechInfo>; lines: [string | null, RoleTech][] }) {
  return (
    <li className="text-sm">
      <div className="flex items-baseline justify-between gap-2">
        <span>
          <TechLink id={id} techs={techs} />
          {lines.some(([, t]) => t.essential) && <span className="ml-2 text-[11px] font-medium text-slate-500">Essentiel</span>}
        </span>
        <span className="text-xs text-slate-500">{techs[id]?.kind}</span>
      </div>
      {lines.map(([who, t]) => (
        <p key={who ?? 'one'} className="mt-0.5 text-slate-700">
          {who && <b className="font-medium text-slate-900">{who} : </b>}
          {t.why}
        </p>
      ))}
    </li>
  );
}
