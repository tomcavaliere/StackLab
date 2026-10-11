import { existsSync } from 'node:fs';
import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CONFIDENCES, KINDS, LAYERS, SCENARIO_TYPES, SOURCE_TYPES, VERDICTS, ids, type Layer } from './lib/taxonomy';

// reference() d'Astro 7 ne vérifie pas que l'id existe : il le transforme seulement en { id, collection }.
// ref() ajoute ce contrôle, si bien qu'un id sans fichier correspondant fait échouer le build.
// L'id d'une entrée est le nom de son fichier (kebab-case, sans extension).
const ref = (collection: 'techs' | 'scenarios') =>
  z
    .string()
    .refine((id) => existsSync(`src/content/${collection}/${id}.md`), {
      error: (issue) =>
        `id inconnu "${issue.input}" : le fichier src/content/${collection}/${issue.input}.md n'existe pas`,
    })
    .pipe(reference(collection));

const layer = z.enum(ids(LAYERS));
const linkedTech = z.strictObject({ tech: ref('techs'), note: z.string() });

const techs = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/techs' }),
  schema: z.strictObject({
    name: z.string(),
    kind: z.enum(ids(KINDS)),
    layers: z.array(layer), // vide pour un langage : il n'est pas jouable comme carte
    languages: z.array(ref('techs')).default([]), // langages dans lesquels on écrit du code avec cette techno
    tags: z.array(z.string()).default([]),
    difficulty: z.literal([1, 2, 3]),
    summary: z.string(),
    alternatives: z.array(linkedTech).default([]),
    integratesWith: z.array(linkedTech).default([]),
  }),
});

const scenarios = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/scenarios' }),
  schema: z.strictObject({
    title: z.string(),
    type: z.enum(ids(SCENARIO_TYPES)),
    brief: z.string(),
    constraints: z.strictObject({
      team: z.string(),
      budget: z.string(),
      volume: z.string(),
      latency: z.string(),
      timeToMarket: z.string(),
    }),
    requiredLayers: z.array(layer).min(1),
    optionalLayers: z.array(layer).default([]),
    verdicts: z.partialRecord(
      layer,
      z.array(z.strictObject({ tech: ref('techs'), verdict: z.enum(ids(VERDICTS)), why: z.string() })),
    ),
    antiPatterns: z
      .array(z.strictObject({ techs: z.array(ref('techs')).min(2), penalty: z.number().int().positive(), why: z.string() }))
      .default([]),
    referenceStack: z.partialRecord(layer, z.array(ref('techs'))),
  })
    .superRefine((s, ctx) => {
      // La stack de référence doit être une réponse valide : couches requises remplies,
      // et chaque tech avec un verdict ideal ou acceptable dans sa couche.
      for (const l of s.requiredLayers) {
        if (!s.referenceStack[l]?.length) {
          ctx.addIssue({ code: 'custom', path: ['referenceStack'], message: `couche requise "${l}" absente` });
        }
      }
      for (const [l, techs] of Object.entries(s.referenceStack) as [Layer, { id: string }[]][]) {
        for (const tech of techs) {
          const verdict = s.verdicts[l]?.find((v) => v.tech.id === tech.id)?.verdict;
          if (verdict !== 'ideal' && verdict !== 'acceptable') {
            ctx.addIssue({
              code: 'custom',
              path: ['referenceStack', l],
              message: `"${tech.id}" n'a pas de verdict ideal ou acceptable dans verdicts.${l}`,
            });
          }
        }
      }
    }),
});

const companies = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/companies' }),
  schema: z.strictObject({
    company: z.string(),
    product: z.string(),
    need: z.string(),
    scenario: ref('scenarios').optional(), // scénario du mode « devine la stack »
    lastResearched: z.coerce.date(),
    stack: z.partialRecord(
      layer,
      z.array(
        z
          .strictObject({
            tech: ref('techs'),
            source: z.url(),
            sourceTitle: z.string(),
            sourceDate: z.coerce.date(),
            sourceType: z.enum(ids(SOURCE_TYPES)),
            confidence: z.enum(ids(CONFIDENCES)),
            note: z.string().optional(),
          })
          .refine((e) => e.sourceType !== 'offre-emploi' || e.confidence === 'indice', {
            error: "une offre d'emploi seule ne peut donner que la confiance 'indice'",
            path: ['confidence'],
          }),
      ),
    ),
  }),
});

// L'id d'une question identifie son historique en base : ne jamais le renommer.
const questionId = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, { error: 'id de question en kebab-case ASCII minuscule' });

function checkUniqueIds(questions: { id: string }[], ctx: z.RefinementCtx) {
  const seen = new Set<string>();
  questions.forEach((q, i) => {
    if (seen.has(q.id)) {
      ctx.addIssue({ code: 'custom', path: ['questions', i, 'id'], message: `id de question "${q.id}" en double` });
    }
    seen.add(q.id);
  });
}

// Un thème de quiz : des questions courtes, chacune avec 2 technos dont une seule est la bonne.
const quiz = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/quiz' }),
  schema: z
    .strictObject({
      title: z.string(),
      description: z.string(),
      questions: z
        .array(
          z.strictObject({
            id: questionId,
            prompt: z.string(),
            answer: ref('techs'),
            decoy: ref('techs'),
            why: z.string(),
          }),
        )
        .min(5),
    })
    .superRefine((t, ctx) => {
      checkUniqueIds(t.questions, ctx);
      t.questions.forEach((q, i) => {
        if (q.answer.id === q.decoy.id) {
          ctx.addIssue({ code: 'custom', path: ['questions', i, 'decoy'], message: `"decoy" identique à "answer" (${q.answer.id})` });
        }
      });
    }),
});

// Le quiz d'une techno : src/content/tech-quiz/<id de la fiche>.md (l'existence de la fiche est vérifiée par
// scripts/check-content.mjs). QCM sur la techno elle-même : une bonne réponse et 1 à 3 leurres, en texte libre.
const techQuiz = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/tech-quiz' }),
  schema: z
    .strictObject({
      questions: z
        .array(
          z.strictObject({
            id: questionId,
            prompt: z.string(),
            answer: z.string(),
            decoys: z.array(z.string()).min(1).max(3),
            why: z.string(),
          }),
        )
        .min(5),
    })
    .superRefine((t, ctx) => {
      checkUniqueIds(t.questions, ctx);
      t.questions.forEach((q, i) => {
        if (new Set([q.answer, ...q.decoys]).size !== q.decoys.length + 1) {
          ctx.addIssue({ code: 'custom', path: ['questions', i, 'decoys'], message: 'options en double (leurre identique à la réponse ou à un autre leurre)' });
        }
      });
    }),
});

export const collections = { techs, scenarios, companies, quiz, techQuiz };
