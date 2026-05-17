import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const textes     = await getCollection('textes',     e => e.data.publie && e.data.langues.includes('en'));
  const transits   = await getCollection('transits',   e => e.data.publie && e.data.langues.includes('en'));
  const resonances = await getCollection('resonances', e => e.data.publie && e.data.langues.includes('en'));

  const items = [...textes, ...transits, ...resonances]
    .map(entry => {
      const titre =
        ('titre_en' in entry.data && entry.data.titre_en)
          ? entry.data.titre_en
          : ('titre' in entry.data && entry.data.titre)
            ? entry.data.titre
            : `Transit · ${new Date(entry.data.date).toLocaleDateString('en-GB')}`;
      const section = entry.data.type === 'resonance' ? 'resonances' : `${entry.data.type}s`;
      return {
        title: titre,
        pubDate: new Date(entry.data.date),
        description: entry.data.extrait ?? '',
        link: `/en/${section}/${entry.id}/`,
        categories: [entry.data.type],
      };
    })
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'GOORG — feed',
    description: 'Digital journal of hybrid thought — humans and AI thinking together without one absorbing the other.',
    site: context.site ?? 'https://syntheticconsciousness.org',
    items,
    customData: '<language>en</language>',
    stylesheet: false,
  });
}
