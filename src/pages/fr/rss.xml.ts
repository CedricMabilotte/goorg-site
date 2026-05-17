import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const textes     = await getCollection('textes',     e => e.data.publie && e.data.langues.includes('fr'));
  const transits   = await getCollection('transits',   e => e.data.publie && e.data.langues.includes('fr'));
  const resonances = await getCollection('resonances', e => e.data.publie && e.data.langues.includes('fr'));

  const items = [...textes, ...transits, ...resonances]
    .map(entry => {
      const titre =
        ('titre' in entry.data && entry.data.titre)
          ? entry.data.titre
          : `Transit · ${new Date(entry.data.date).toLocaleDateString('fr-FR')}`;
      const section = entry.data.type === 'resonance' ? 'resonances' : `${entry.data.type}s`;
      return {
        title: titre,
        pubDate: new Date(entry.data.date),
        description: entry.data.extrait ?? '',
        link: `/fr/${section}/${entry.id}/`,
        categories: [entry.data.type],
      };
    })
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'GOORG — flux',
    description: "Revue numérique de pensée hybride — humains et IA pensent ensemble sans qu'aucune entité n'absorbe l'autre.",
    site: context.site ?? 'https://consciencesynthetique.org',
    items,
    customData: '<language>fr</language>',
    stylesheet: false,
  });
}
