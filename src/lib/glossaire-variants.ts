/**
 * Mapping slug d'entrée de glossaire → variant Hypercubestar.
 * Les six concepts pivots ont chacun leur variant identitaire.
 * Tous les autres concepts utilisent la variant `default`.
 */
export const VARIANT_MAP: Record<string, string> = {
  'membrane':             'membrane',
  'anti-meta':            'anti-meta',
  'union-differenciante': 'union',
  'troisieme-chose':      'troisieme-chose',
  'transit':              'transit',
  'borg':                 'borg',
};

export type HypercubestarVariant =
  | 'default'
  | 'membrane'
  | 'anti-meta'
  | 'union'
  | 'troisieme-chose'
  | 'transit'
  | 'borg';

export function getVariant(slug: string): HypercubestarVariant {
  return (VARIANT_MAP[slug] ?? 'default') as HypercubestarVariant;
}

export const CATEGORIE_LABEL_FR: Record<string, string> = {
  core:    'noyau',
  process: 'processus',
  entity:  'entités',
  ethics:  'éthique',
};

export const CATEGORIE_LABEL_EN: Record<string, string> = {
  core:    'core',
  process: 'process',
  entity:  'entity',
  ethics:  'ethics',
};

export const CATEGORIE_COLOR: Record<string, string> = {
  core:    '#EF9F27',
  process: '#5DCAA5',
  entity:  '#AFA9EC',
  ethics:  '#b2a384',
};
