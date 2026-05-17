import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkConceptLink from './src/lib/remark-conceptlink.mjs';

export default defineConfig({
  site: 'https://consciencesynthetique.org',
  integrations: [react(), mdx(), sitemap()],
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: { prefixDefaultLocale: true }
  },
  markdown: {
    shikiConfig: { theme: 'css-variables' },
    remarkPlugins: [remarkConceptLink],
  }
});
