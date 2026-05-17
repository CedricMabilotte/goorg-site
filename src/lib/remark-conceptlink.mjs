/**
 * remark-conceptlink — transforme [[slug]] et [[slug|texte affiché]]
 * en liens automatiques vers la fiche du concept dans le glossaire.
 *
 * Syntaxe :
 *   [[membrane]]            → <a href="/fr/glossaire/membrane">membrane</a>
 *   [[membrane|la membrane]] → <a href="/fr/glossaire/membrane">la membrane</a>
 *
 * La langue est inférée depuis le chemin du fichier (.../{lang}/...) ou
 * à défaut depuis frontmatter.langues, ou 'fr' par défaut.
 *
 * Différence avec <ConceptLink> :
 *  - <ConceptLink> est un composant Astro qui rend un tooltip riche au hover
 *    (mini-hypercubestar + définition + flèche). Réservé aux fichiers MDX
 *    avec import explicite.
 *  - [[concept]] produit un lien simple (sans tooltip), fonctionne dans
 *    n'importe quel .md ou .mdx, syntaxe légère pour le tissage spontané.
 *
 * Classe CSS appliquée : .concept-link-auto (à styler dans global.css).
 */
import { visit } from 'unist-util-visit';

const PATTERN = /\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g;

export default function remarkConceptLink(opts = {}) {
  const defaultLang = opts.defaultLang ?? 'fr';

  return (tree, file) => {
    // Infère la langue depuis le chemin du fichier si possible
    const filePath = file?.path ?? '';
    const langMatch = filePath.match(/\/(fr|en)\//);
    const lang = langMatch ? langMatch[1] : defaultLang;

    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index === null || index === undefined) return;
      const value = node.value;
      if (!value || !value.includes('[[')) return;

      const parts = [];
      let lastIndex = 0;
      let match;
      PATTERN.lastIndex = 0;
      while ((match = PATTERN.exec(value)) !== null) {
        const [full, slug, label] = match;
        const before = value.slice(lastIndex, match.index);
        if (before) parts.push({ type: 'text', value: before });
        parts.push({
          type: 'link',
          url: `/${lang}/glossaire/${slug}`,
          data: {
            hProperties: { className: ['concept-link-auto'] },
          },
          children: [{ type: 'text', value: label ?? slug }],
        });
        lastIndex = match.index + full.length;
      }
      if (lastIndex === 0) return;
      const tail = value.slice(lastIndex);
      if (tail) parts.push({ type: 'text', value: tail });
      parent.children.splice(index, 1, ...parts);
      return [visit.SKIP, index + parts.length];
    });
  };
}
