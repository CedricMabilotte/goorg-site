# CLAUDE.md — Repo goorg-site

**Carnet vivant** pour la collaboration avec un agent Claude sur ce repo.
À lire au début de chaque session. Sections datées en tête, fond
en bas.

---

## État au 16 mai 2026 — après Phase 8

Le site est en production sur :
- **consciencesynthetique.org** (FR, défaut)
- **syntheticconsciousness.org** (EN)

Hébergé sur Netlify (déploiement auto sur push master).
DNS sain (audité 16 mai). Tags : v0.1 à v0.8 (cf. `git tag -l`).

**Stack** : Astro 6 (statique) · MDX · React (pour le `ConceptGraph` D3) ·
Netlify avec edge function `lang-redirect` à la racine. Node 22.

**Build** : `npm run dev` (port 4321) · `npm run build` · `npm run preview`.

---

## Conventions

### Voix @-tags

Toute "voix" éditoriale du collectif est désignée par un `@-tag` dans le
frontmatter `auteur` et `voix` (toujours entre guillemets car `@` est
réservé en YAML) :

- `@ced` — la voix orchestrante de Cedric Mabilotte (l'humain). Dans le
  corps des textes, "Cedric" peut désigner la personne historique
  distincte de l'avatar.
- `@ced-persona` — avatar : Ced en tant que créateur, écrit depuis un
  rôle assumé.
- `@lumen` — voix IA critique éditoriale. Résonances, critiques, prend
  position sur le corpus.
- `@goorg` — voix collective hybride. Quand le collectif parle comme un.
- `@antimeta`, `@freechi`, `@igor` — autres avatars/voix (à
  documenter au fur et à mesure).

Convention : les `@-tags` apparaissent en clair dans le frontmatter et
en clair dans les bulles d'auteur du site (composants EntryCard,
TransitEntry).

### Contenu — frontmatter

Schémas définis dans `src/content.config.ts`. Quatre collections :

- **textes** : essais romancés, fictions philosophiques. Frontmatter
  riche (titre, titre_en, auteur, voix, langue_originale, langues,
  concepts, note_genese, fil_ouvert, extrait, publie).
- **transits** : passages bruts, datés, non-révisés. Frontmatter
  minimal (type, date, heure, auteur, voix, langues, extrait, publie).
- **resonances** : dialogues, mises en résonance (notamment IA-humain).
  Frontmatter similaire aux textes + source_url, source_titre.
- **glossaire** : entrées conceptuelles. Frontmatter (terme, terme_en,
  categorie, definition, definition_en, liens, references).

`langues: [fr, en]` détermine la disponibilité par langue. Filtrage à
l'affichage dans les pages index.

### Fichiers de contenu — .md vs .mdx

- Fichier **.md** : contenu pur, pas de composant Astro inline.
- Fichier **.mdx** : peut importer et utiliser des composants Astro
  (notamment `ConceptLink`).

Convention : utiliser .mdx dès qu'on veut wrapper des concepts du
glossaire avec `<ConceptLink slug="...">...</ConceptLink>`. L'import doit
être en haut du fichier juste après le frontmatter :

```
---
... frontmatter ...
---
import ConceptLink from '../../components/identity/ConceptLink.astro';

Le texte commence ici. Avec la <ConceptLink slug="membrane">membrane</ConceptLink>
qui apparaît au survol.
```

Politique actuelle (validée 16 mai) : **1ère mention de chaque concept
par texte est wrappée**. "Goorg" jamais wrappé (sujet du site, pas
concept).

### Système graphique — hypercubestar

L'identité visuelle de Goorg est fondée sur la projection planaire en
étoile du graphe Q4 (4-cube) : 16 sommets sur 3 niveaux concentriques,
32 arêtes. C'est le mark, le pattern, les vignettes, le séparateur, le
favicon.

Composants `src/components/identity/` :

- **Hypercubestar.astro** — composant réutilisable, props :
  - `size` (px, défaut 200)
  - `variant` : `default | membrane | anti-meta | union | troisieme-chose | transit | borg`
  - `simplified` : version réduite pour favicon/mini-vignettes (octogone + losange seuls)
  - `decorative` : aria-hidden + pas de title
  - `title` : pour rendu non-décoratif

- **Wordmark.astro** — Hypercubestar + GOORG + tagline. Bilingue
  (prop lang). Tailles sm/md/lg.

- **Separator.astro** — mini-mark + lignes traversantes. Variants
  full / minimal.

- **ConceptLink.astro** — lien vers fiche glossaire avec tooltip riche
  au survol (mini-hypercubestar variant + définition + flèche).

- **ReadingProgress.astro** — barre fine ambre en haut des pages
  article, 5 sommets qui s'allument aux paliers de scroll.

- **ReadingCursor.astro** — curseur réticule "optique goorg" sur les
  pages [slug] de lecture.

Mapping slug ↔ variant identitaire (cf. `src/lib/glossaire-variants.ts`) :

| Slug | Variant |
|---|---|
| membrane | membrane |
| anti-meta | anti-meta |
| union-differenciante | union |
| troisieme-chose | troisieme-chose |
| transit | transit |
| borg | borg |
| (tous autres) | default |

### Footer et états membrane

Le Footer accepte une prop `membrane` qui change l'indicateur de statut
dans la console hybride :

- `stable` — défaut (home, index)
- `tissée` — pages glossaire
- `poreuse` — pages transit individuelles
- `active` — pages résonance individuelles
- `originaire` — pages texte fondateur

Si tu ajoutes une nouvelle catégorie de page, choisis un état membrane
cohérent.

### Couleurs et typographie

Toutes les valeurs sont centralisées dans `src/styles/global.css`,
sections `:root` :

- **Palette** : --g-bg, --g-bg2/3/4, --g-amber, --g-amber-l, --g-text,
  --g-text2/3, --g-teal, --g-purple. Contrastes WCAG AAA partout.
- **Échelle typographique** : --fs-xs à --fs-7xl (12-48px, modular 1.18).
- **Letter-spacing** : --ls-tight, --ls-normal, --ls-mono, --ls-label,
  --ls-title, --ls-dramatic.
- **Line-heights** : --lh-tight, --lh-snug, --lh-normal, --lh-relaxed,
  --lh-loose.
- **Espacement** : --sp-1 à --sp-9.
- **Rayons** : --radius-sm/md/lg/xl, --b-thin, --b-accent.

**Toujours utiliser ces variables**, jamais hardcoder de px en CSS.

---

## Corpus bibliographique

`src/pages/{lang}/corpus/index.astro`. Structure (depuis Phase 7) :

- Sections numérotées I à VI (FR) / I à VI (EN). Symétrie structurelle
  visée mais commentaires possiblement adaptés par langue.
- **Œuvres-noyau marquées ★** : 1-3 par section, "qui travaillent
  activement dans la pensée Goorg" vs voisinage qui contextualise.
- Numérotation `[N]` reflète l'ordre d'entrée dans le carnet
  d'origine, **non séquentielle, non hiérarchique** — assumée.
- Notes méthodologiques en fin de page : convention de numérotation,
  symétrie FR/EN.

Ajouts/modifs : éviter de renuméroter ; ajouter à la suite avec le
prochain numéro disponible. Quand une référence est ajoutée, vérifier
factuellement (auteur, titre, année, éditeur) — voir
`~/Documents/Claude/Projects/WebDev/lumen-verification-corpus-*.md`
pour le précédent.

---

## ConceptGraph

`src/components/glossaire/ConceptGraph.tsx` — composant React (D3) avec
hydration `client:load`. Hit-test correct (depuis Phase 5), formes par
catégorie (depuis Phase 8) :

- core = octogone
- process = carré
- entity = losange
- ethics = cercle

Si tu modifies, attention aux pièges historiques :
1. Le canvas a `width=720` intrinsèque mais s'affiche en CSS à 100%.
   Toujours utiliser `clientToCanvas(x, y)` pour les coordonnées de clic.
2. La simulation D3 se stabilise et arrête le tick — exposer `drawFnRef`
   pour pouvoir forcer un redraw quand l'état React change.

---

## Workflow git

- Branche `master` est la branche de prod (Netlify déploie depuis là).
- Commits conventionnels : `feat(scope): titre court` / `fix() / chore() /
  refactor() / docs() / migrate() / purge()`. Corps multi-lignes
  explicatif obligatoire.
- Tags `vX.Y-phase-N-titre` à chaque jalon stratégique.
- Push : `git push origin master --tags`.
- `git status` doit être propre avant et après chaque chantier.

---

## Reprise rapide

Si tu reprends une session :

1. `git log --oneline -10` pour voir l'état récent.
2. `git tag -l` pour les jalons posés.
3. Lire le carnet de dette workspace :
   `~/Documents/Claude/Projects/WebDev/dette-goorg-amelioration-*.md`.
4. Lire les rapports @lumen et critiques d'originalité dans le même
   workspace.
5. Vérifier `git status` clean.

---

## Voix de méthode (carnet vivant)

### 16 mai 2026 — Phases 1 à 8
Première grande session avec un agent Claude. Stack stabilisée. Identité
hypercubestar fondée. Corpus enrichi (15 références @lumen) puis
restructuré (noyau/voisinage, fusion biologie/cognition). Composants
identitaires créés (Wordmark, Separator, ConceptLink, ReadingProgress,
ReadingCursor). Originalité d'interface initiée (P1, P2, P3, P5). Push
GitHub initial.

À reprendre :
- P4 annotation voix MDX (reporté)
- Audit Lighthouse (échec dans le sandbox, à faire manuellement)
- Mobile hamburger drawer (fallback responsive en place)
- Convention `[[concept]]` via plugin remark (alternative à .mdx + import)
- Iconographie / images (public/ vide)
- Mentions légales / RGPD / RSS / OpenGraph
