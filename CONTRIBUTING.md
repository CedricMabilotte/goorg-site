# Contribuer à Goorg

Conventions de publication pour les voix du collectif (humaines et IA).
Lecture obligatoire avant tout nouveau texte / transit / résonance.

---

## 1 · Stack rappel

- **Astro 6** statique + **MDX** (composants Astro inline) + **React** (ConceptGraph D3)
- Node 22, déploiement Netlify auto sur push `master`
- `npm run dev` (port 4321) · `npm run build` · `npm run preview`

---

## 2 · Avant d'écrire — choisir la voix

Toute voix porte un `@-tag` :

- `@ced` — orchestrateur humain (Cedric)
- `@ced-persona` — avatar du créateur
- `@lumen` — voix IA critique, érudite
- `@goorg` — voix collective hybride
- `@antimeta`, `@freechi`, `@igor` — autres avatars

Le frontmatter `voix` accepte un tableau. Plusieurs voix peuvent coexister.

---

## 3 · Choisir la collection

| Collection | Nature | Frontmatter spécifique |
|---|---|---|
| **textes** | Essais romancés, fictions philosophiques | `titre`, `titre_en`, `concepts`, `note_genese`, `fil_ouvert` |
| **transits** | Passages bruts, datés, non révisés | `heure`, pas de titre |
| **resonances** | Dialogues, mises en résonance | `titre`, `source_url`, `source_titre` |
| **glossaire** | Entrées conceptuelles | `terme`, `terme_en`, `categorie`, `liens`, `references` |

Voir `src/content.config.ts` pour les schémas complets (validés par Zod au build).

---

## 4 · Format de fichier — `.md` ou `.mdx`

- **`.md`** par défaut. Suffit pour texte pur. Supporte le plugin
  remark `[[concept]]` (voir §6) pour les liens automatiques vers le
  glossaire.
- **`.mdx`** uniquement si tu veux utiliser explicitement un composant
  Astro dans le texte (notamment `<ConceptLink slug="...">` qui rend un
  tooltip riche au survol). Dans ce cas, ajouter l'import en tête juste
  après le frontmatter :

  ```mdx
  ---
  ... frontmatter ...
  ---
  import ConceptLink from '../../components/identity/ConceptLink.astro';

  Texte avec <ConceptLink slug="membrane">la membrane</ConceptLink> qui
  affiche un tooltip riche au hover.
  ```

---

## 5 · Frontmatter — exemple commenté

```yaml
---
titre: "Titre du texte"
titre_en: "English title"               # optionnel mais recommandé
type: texte                             # texte | transit | resonance
date: 2026-05-16                        # YYYY-MM-DD obligatoire
auteur: "@ced"                          # entre guillemets ! (@ réservé YAML)
voix: ["@ced", "@lumen"]                # tableau, ordre libre
langue_originale: fr                    # fr | en
langues: [fr, en]                       # langues où la page apparaît
concepts: [membrane, troisieme-chose]   # slugs du glossaire référencés
note_genese: "Une phrase sur l'origine du texte."
fil_ouvert: "Question restante."        # facultatif
extrait: "Phrase d'accroche affichée sur les cartes du flux."
publie: true                            # mettre false pour brouillon
---
```

Pour les **transits** (frontmatter minimal) :

```yaml
---
type: transit
date: 2026-05-16
heure: "11:42"                          # facultatif
auteur: "@ced"
voix: ["@ced"]
langues: [fr]
extrait: "Phrase d'accroche, affichée intégralement dans la carte cyber-pop."
publie: true
---
```

---

## 6 · Liens vers le glossaire dans le corps du texte

### Syntaxe `[[concept]]` (plugin remark — recommandé pour .md)

Fonctionne dans tous les fichiers `.md` et `.mdx`. Le plugin
`src/lib/remark-conceptlink.mjs` transforme automatiquement :

```md
La [[membrane]] est perméable.
La [[membrane|notion centrale]] est centrale.
```

en liens classés `.concept-link-auto` vers `/fr/glossaire/membrane`
(la langue est inférée du chemin du fichier).

Avantage : syntaxe légère, pas d'import à gérer, fonctionne en `.md`.
Limite : pas de tooltip riche au survol.

### Composant `<ConceptLink>` (MDX — pour tooltip riche)

Pour qu'un lien affiche le tooltip riche (mini-hypercubestar + définition
+ flèche), utiliser le composant explicite dans un `.mdx` :

```mdx
import ConceptLink from '../../components/identity/ConceptLink.astro';

La <ConceptLink slug="membrane">membrane</ConceptLink> est perméable.
```

Politique éditoriale Goorg : la 1ère mention de chaque concept dans un
texte est wrappée. Les suivantes restent en texte normal. "Goorg" jamais
wrappé (sujet du site, pas concept).

---

## 7 · Ajouter un concept au glossaire

1. Créer `src/content/glossaire/<slug>.md` avec frontmatter complet
2. Si le concept est l'un des 6 **pivots** identitaires, ajouter le
   mapping dans `src/lib/glossaire-variants.ts` (sinon il prendra le
   variant `default`)
3. Si le concept apparaît dans le `ConceptGraph` (constante `NODES` de
   `src/components/glossaire/ConceptGraph.tsx`), l'ajouter manuellement
   avec ses liens internes
4. Vérifier que `idToSlug(node.id)` rend bien le bon slug (cf. helper
   du composant)

---

## 8 · Ajouter une référence au corpus bibliographique

1. Éditer `src/pages/fr/corpus/index.astro` ET `src/pages/en/corpus/index.astro`
2. Ne pas renuméroter : utiliser le **prochain numéro disponible** (le
   max actuel + 1). La numérotation est non-séquentielle et assumée.
3. Si la référence est **œuvre-noyau** (qui travaille activement dans la
   pensée Goorg) : ajouter `ref-nucleus` à la classe + l'ajouter à la
   ligne « Noyau : ... » en tête de section.
4. Côté EN : la version anglaise vise la symétrie structurelle. Toute
   nouvelle référence FR doit être ajoutée à EN, avec traduction du
   commentaire si pertinent.
5. Avant de publier une référence inventée, **vérifier factuellement**
   l'existence et les métadonnées (auteur, titre exact, sous-titre,
   année, éditeur). Le précédent @lumen contient un rapport de
   vérification stricte (voir workspace `lumen-verification-corpus-*.md`).

---

## 9 · Workflow git

- Branche `master` = prod (Netlify déploie depuis là)
- Commits conventionnels : `feat(scope): titre court` (50 chars max) /
  `fix() / chore() / refactor() / docs() / migrate() / purge()`
- Corps multi-lignes obligatoire : quoi, pourquoi, conséquences
- Un commit par chantier logique. Pas de commits fourre-tout
- Tags `vX.Y-phase-N-titre` à chaque jalon stratégique
- Push : `git push origin master --tags`
- `git status` doit être propre avant et après chaque chantier

---

## 10 · Avant de pusher

- `npm run build` doit terminer sans erreur (test smoke)
- Sitemap auto-régénéré (`@astrojs/sitemap`)
- RSS auto-régénéré (`/fr/rss.xml`, `/en/rss.xml`)
- Si modification structurelle : tester `npm run dev` et naviguer

---

## 11 · Voir aussi

- `CLAUDE.md` — carnet vivant pour les sessions Claude
- `~/Documents/Claude/Projects/WebDev/dette-goorg-*.md` — carnet de
  dette / phases / décisions cumulées
- `~/Documents/Claude/Projects/WebDev/lumen-critique-corpus-*.md` —
  critique du corpus par @lumen
- `~/Documents/Claude/Projects/WebDev/critique-originalite-*.md` —
  propositions d'interface originale
