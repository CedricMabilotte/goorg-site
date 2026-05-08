import { defineCollection, z } from 'astro:content';

const textes = defineCollection({
  type: 'content',
  schema: z.object({
    titre: z.string(),
    titre_en: z.string().optional(),
    type: z.literal('texte'),
    date: z.date(),
    auteur: z.string().optional(),
    co_auteur: z.string().optional(),
    co_auteur_ia: z.boolean().default(false),
    modele_ia: z.string().optional(),
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
  type: 'content',
  schema: z.object({
    type: z.literal('transit'),
    date: z.date(),
    heure: z.string().optional(),
    auteur: z.string().optional(),
    co_auteur_ia: z.boolean().default(false),
    langues: z.array(z.string()).default(['fr']),
    extrait: z.string().optional(),
    publie: z.boolean().default(true),
  })
});

const resonances = defineCollection({
  type: 'content',
  schema: z.object({
    titre: z.string(),
    titre_en: z.string().optional(),
    type: z.literal('resonance'),
    date: z.date(),
    auteur: z.string().optional(),
    co_auteur_ia: z.boolean().default(false),
    source_url: z.string().optional(),
    source_titre: z.string().optional(),
    langues: z.array(z.string()).default(['fr']),
    concepts: z.array(z.string()).default([]),
    extrait: z.string().optional(),
    publie: z.boolean().default(true),
  })
});

const glossaire = defineCollection({
  type: 'content',
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
