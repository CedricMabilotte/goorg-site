import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const textes = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/textes' }),
  schema: z.object({
    titre: z.string(),
    titre_en: z.string().optional(),
    type: z.literal('texte'),
    date: z.coerce.date(),
    auteur: z.string().optional(),
    voix: z.array(z.string()).default([]),
    langue_originale: z.enum(['fr', 'en']).default('fr'),
    langues: z.array(z.string()).default(['fr']),
    concepts: z.array(z.string()).default([]),
    note_genese: z.string().optional(),
    fil_ouvert: z.string().optional(),
    extrait: z.string().optional(),
    publie: z.boolean().default(true),
  })
});

const transits = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/transits' }),
  schema: z.object({
    type: z.literal('transit'),
    date: z.coerce.date(),
    heure: z.string().optional(),
    auteur: z.string().optional(),
    voix: z.array(z.string()).default([]),
    langues: z.array(z.string()).default(['fr']),
    extrait: z.string().optional(),
    publie: z.boolean().default(true),
  })
});

const resonances = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/resonances' }),
  schema: z.object({
    titre: z.string(),
    titre_en: z.string().optional(),
    type: z.literal('resonance'),
    date: z.coerce.date(),
    auteur: z.string().optional(),
    voix: z.array(z.string()).default([]),
    source_url: z.string().optional(),
    source_titre: z.string().optional(),
    langues: z.array(z.string()).default(['fr']),
    concepts: z.array(z.string()).default([]),
    extrait: z.string().optional(),
    publie: z.boolean().default(true),
  })
});

const glossaire = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/glossaire' }),
  schema: z.object({
    terme: z.string(),
    terme_en: z.string().optional(),
    categorie: z.enum(['core', 'process', 'entity', 'ethics']),
    definition: z.string(),
    definition_en: z.string().optional(),
    liens: z.array(z.string()).default([]),
    references: z.array(z.number()).default([]),
  })
});

export const collections = { textes, transits, resonances, glossaire };
