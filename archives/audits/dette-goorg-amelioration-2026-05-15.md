---
sujet: Goorg — diagnostic frictions session amélioration
date: 2026-05-15 / 2026-05-16
repo: ~/Documents/Ced_Cabinet/Activities/claude-sites/goorg-site
branche: master (git status clean)
stack: Astro 6 + MDX + React + d3 · Netlify · i18n natif (fr default, en)
sites: consciencesynthetique.org (FR) · syntheticconsciousness.org (EN)
mode: dry-run → Phase 1 appliquée → Phase 2 appliquée
phase_1_status: COMPLETE — tag v0.1-phase-1-lisibilite-nav
phase_2_status: COMPLETE — tag v0.2-phase-2-hypercubestar
phase_3_status: COMPLETE — tag v0.3-phase-3-glossaire
phase_4_status: COMPLETE — tag v0.4-phase-4-lisibilite-cyberpop
phase_5_status: COMPLETE — tag v0.5-phase-5-cohesion-originalite
phase_6_status: COMPLETE — tag v0.6-phase-6-lumen-integration
phase_7_status: COMPLETE — tag v0.7-phase-7-corpus-noyau-conceptlinks (PUSHED)
phase_8_status: COMPLETE — tag v0.8-phase-8-symetrie-claude-md (PUSHED)
phase_9_status: COMPLETE — tag v0.9-phase-9-meta-rss-intentions (PUSHED)
---

# ✅ Phase 9 appliquée (16 mai 2026, 15h00)

Suite à la décision de traiter D2-D8 + D7 (note d'intentions sans 
tracking). 6 commits, 1 tag, push effectué :

- `5ef855d` feat(content): plugin remark [[concept]] + @astrojs/sitemap
- `369c674` feat(seo): OG + Twitter cards + canonical + hreflang + social-card
- `13b1568` feat(rss): flux RSS bilingue (/fr/rss.xml + /en/rss.xml)
- `1cd4ea2` feat(pages): note d'intentions + mentions légales
- `ed11478` docs(contributing): convention publication
- `2585add` docs(session): journal session 2026-05-16 phases 1 à 9

Tag jalon : `v0.9-phase-9-meta-rss-intentions` (poussé sur origine)

**Couvert** :

1. **D8 plugin remark `[[concept]]`** : src/lib/remark-conceptlink.mjs. 
   Transforme `[[slug]]` ou `[[slug|texte]]` en lien classé 
   .concept-link-auto vers /lang/glossaire/slug. Langue inférée du 
   chemin du fichier. Fonctionne en .md et .mdx, sans import. Le 
   tooltip riche reste réservé à `<ConceptLink>` MDX.

2. **D4 SEO complète** : BaseLayout étendu avec og:* (site_name, title, 
   description, type, url, image 1200x630, locale + locale:alternate), 
   twitter:card summary_large_image, canonical, hreflang FR↔EN + 
   x-default, link rel=alternate pour RSS. Image social-card.svg avec 
   hypercubestar + wordmark + tagline + URLs des 2 domaines.

3. **D5 RSS bilingue** : /fr/rss.xml et /en/rss.xml via @astrojs/rss. 
   Items triés date desc, titles avec fallback, categories par type, 
   customData lang, link rel=alternate dans head.

4. **D7 note d'intentions (pas de tracking)** : /fr/intentions + 
   /en/intentions. Inclut explicitement : pas de cookies, pas 
   d'analytics, pas de pub, pas d'inscription, pas de paywall, pas 
   d'algorithme, pas de notification. Plus 'Ce que nous faisons', 
   'Ce que nous refusons', 'Sur la membrane éditoriale' (Benjamin).

5. **D6 mentions légales** : /fr/mentions-legales + /en/legal. Éditeur, 
   Netlify+Gandi, données personnelles (RGPD allégé), propriété 
   intellectuelle (MIT pour code), voix non-humaines (Anthropic/Claude 
   cités), droit français.

6. **D3 CONTRIBUTING.md** : convention publication (11 sections : 
   stack, voix @-tags, collection, .md vs .mdx, frontmatter exemple, 
   syntaxe [[concept]] vs <ConceptLink>, ajouter concept/référence, 
   workflow git, avant pusher).

7. **D2 journal de session** : archives/sessions/2026-05-16_phases-1-a-9.md. 
   ~300 lignes, structure complète (frontmatter, objectif, méthode, 
   résultats par phase, frictions, décisions, livrables, bilan, 
   reprise rapide).

8. **Sitemap** : @astrojs/sitemap intégré, sitemap-index.xml généré 
   automatiquement à chaque build.

9. **Footer enrichi** : nouvelle ligne footer-meta-links 
   (intentions · mentions légales · rss) avec séparateur dashed.

**État global du repo** :
- 32 commits sur master, tous poussés
- 9 tags posés (v0.1 à v0.9), tous synchronisés
- `git status` propre, build 6.62 s
- 87 pages générées (vs 83 avant : +intentions FR/EN, +mentions/legal)
- Sitemap auto + RSS auto

**Reste en suspens (validé "pas maintenant")** :
- P4 annotation voix MDX
- A1 mini-hypercubestars complets ConceptGraph
- B3 iconographie / images public/
- C2 mobile hamburger drawer
- C4 Lighthouse manuel (sandbox limit)
- C5 tests automatisés
- C6 audit a11y formel
- Audit DNS Gandi en détail (déjà fait quick check Phase 8)

---

# ✅ Phase 8 appliquée (16 mai 2026, 16h19)

Suite à la revue pas à pas des items en suspens. 5 commits :

- `3e25e91` feat(glossary): ConceptGraph — formes par catégorie
- `cd93a43` fix(i18n): description bilingue + compteurs Footer filtrés par lang
- `3c3e48a` feat(corpus): symétrie FR/EN — recréation section V + ajouts EN
- `7b88800` chore(content): harmoniser 'Cedric' narratif → @ced
- `6fe53ce` docs(claude): CLAUDE.md du repo — carnet vivant

Tag jalon : `v0.8-phase-8-symetrie-claude-md` (poussé sur origine)

**Couvert** :

1. **Audits techniques** (sub-agent en parallèle) :
   - **C3 Netlify** : DEPLOYED ✓, FR + EN servent la build Phase 7, 
     wordmark + @ced + favicon + footer membrane confirmés
   - **C1 DNS** : SAIN ✓, A → 75.2.60.5 (Netlify), CNAME www → 
     goorg.netlify.app, NS Gandi cohérent. Non bloquants : pas d'IPv6, 
     CAA vide
   - **C4 Lighthouse** : ÉCHEC sandbox (pas de Chrome + PSI 429). À 
     faire manuellement sur pagespeed.web.dev
   - **2 bugs identifiés** : TRANSITS vide sur home EN + meta description 
     EN encore en FR → tous deux corrigés dans commit cd93a43

2. **A1 ConceptGraph formes par catégorie** : core=octogone, 
   process=carré, entity=losange, ethics=cercle. Signature visuelle 
   identitaire sans surcharge. Variante "mini-hypercubestars" reportée.

3. **B1 Cedric→@ced narratif** : harmonisation totale. 'Cedric' → '@ced' 
   et 'Cedric-persona' → '@ced-persona'. Distinction personne/avatar 
   désormais portée par le suffixe.

4. **B2 Corpus EN symétrie structurelle** : ajout des 6 références FR 
   manquantes (Bloom, Bion en III ; Adorno, Ricoeur, Aristote, Spinoza 
   en IV) + recréation section V "Cyborg, posthuman, science studies" 
   (Haraway déplacée de IV vers V, + Wiener, Clark, Latour). 
   Renumérotation : "Thinking the non-biological entity" passe V → VI. 
   Note FR/EN reformulée des deux côtés : symétrie structurelle = 
   objectif assumé.

5. **D1 CLAUDE.md du repo** : 247 lignes, carnet vivant complet. 
   Stack, conventions @-voix, frontmatter, .md vs .mdx, système 
   hypercubestar, mapping variants, états membrane, palette/typo, 
   corpus, ConceptGraph + pièges historiques, workflow git, reprise 
   rapide, voix de méthode horodatée.

6. **Push GitHub** : 5 commits Phase 8 + tag v0.8 poussés sur origin. 
   Netlify va redéployer automatiquement.

**État global du repo** :
- 26 commits sur master, tous poussés
- 8 tags posés (v0.1 à v0.8), tous synchronisés
- `git status` propre, build 7.15 s
- 83 pages générées
- Corpus FR : 6 sections, ~45 entrées. EN : désormais 6 sections, ~37 
  entrées (symétrie structurelle quasi-totale)

**Reste en suspens (validé "pas maintenant" ou reporté)** :
- P4 annotation voix MDX
- A1 mini-hypercubestars complets dans le ConceptGraph
- B3 iconographie / images dans public/
- C2 mobile menu hamburger (drawer dédié)
- C4 Lighthouse à faire manuellement
- C5 tests automatisés (Playwright + vitest)
- C6 audit a11y formel (axe, WAVE, screen reader)
- D2 journal de session 2h+
- D3 convention publication explicite
- D4 SEO OpenGraph / Twitter cards
- D5 RSS feed
- D6 mentions légales / RGPD
- D7 analytics (probablement à refuser explicitement)
- D8 plugin remark [[concept]] (alternative à .mdx + import)

---

# ✅ Phase 7 appliquée (16 mai 2026, 15h48)

Suite à la revue interactive complète des propositions en suspens. 
Quatre arbitrages validés par Ced :

- Restructuration corpus : appliquer noyau/voisinage + fusion III/VI ✓
- P4 annotation voix : pas encore ✓ (reporté)
- ConceptLink MDX : politique "toutes pages, 1ère mention" avec Goorg jamais ✓
- Push GitHub : immédiat ✓

3 commits Phase 7 :
- `54e5f49` refactor(corpus): noyau/voisinage + fusion sections III/VI
- `6f22952` feat(content): textes en MDX + ConceptLink sur 1ère mention
- (push initial Phase 6 + Phase 7 effectués)

Tag jalon : `v0.7-phase-7-corpus-noyau-conceptlinks`

**Couvert** :

1. **Push GitHub initial** — `git push origin master --tags`. 18 commits + 
   6 tags poussés sur github.com/CedricMabilotte/goorg-site. Netlify déploie 
   automatiquement.

2. **Restructuration corpus FR + EN** :
   - Distinction noyau/voisinage : chaque section a 1-3 œuvres-noyau marquées 
     ★ (couleur ambre saturée). Légende explicative en tête de page.
   - Fusion sections III (biologie) + VI (cognition) en "Biologie, cognition, 
     systèmes vivants". Justification éditoriale présente. Côté FR : 7→6 
     sections. Côté EN : enrichissement de la section III avec Barad, Hutchins, 
     Bakhtine, Bateson, von Foerster pour rester en cohérence avec la fusion.

3. **ConceptLink dans textes (politique 1ère mention)** :
   - Conversion .md → .mdx pour les 6 fichiers de contenu (textes, résonances, 
     transits). Pattern Astro `**/[^_]*.{md,mdx}` couvrait déjà MDX.
   - Import ConceptLink en tête de chaque fichier.
   - 26 wrappings sur 6 fichiers : 18 sur les-goorg, 3 sur lumen-resonance, 
     3 sur premier-transit, 1 sur cedric-voix, 1 sur 2026-05-15-pensee.
   - Au survol de chaque lien : tooltip riche avec mini-hypercubestar du 
     concept, sa catégorie, sa définition, flèche d'ouverture.
   - "Goorg" jamais wrappé (politique validée).

4. **Push final Phase 7** — `git push origin master --tags` à nouveau, 
   pour pousser les 3 nouveaux commits + tag v0.7.

**État global du repo** :
- 21 commits ahead initialement, désormais 0 ahead (tout poussé)
- 7 tags posés (v0.1 à v0.7), tous synchronisés avec l'origine
- `git status` propre, build 7.58 s
- 83 pages générées
- consciencesynthetique.org et syntheticconsciousness.org devraient être 
  déployés automatiquement par Netlify dans ~2 min après le push

**Reste en suspens (validés "pas maintenant" ou non encore qualifiés)** :
- P4 annotation voix MDX (reporté)
- Sections V (cyborg) en EN : non-fusion avec IV reste à arbitrer
- ConceptGraph identité hypercubestar (nœuds en mini-marks) — non discuté
- Mentions "Cedric" narratives dans le corps des résonances — laissées
- Audit Gandi DNS — non urgent

---

# ✅ Phase 6 appliquée (16 mai 2026, 14h11)

Suite à validation Ced (P1/P2/P3/P5 ok, intégrer @lumen, vérification 
stricte demandée). 2 commits :

- `fb2ac0e` feat(corpus): intégration des 15 références @lumen (vérifiées strictement)
- `22ed153` feat(ui): P3 tooltip concepts + P5 curseur réticule

Tag jalon : `v0.6-phase-6-lumen-integration`

**Couvert** :

1. **Vérification stricte @lumen** (sub-agent en parallèle) — 9 VERT, 
   6 JAUNE, 0 ROUGE sur les 15 références. Aucune fabrication. Six 
   reformulations cosmétiques (sous-titres, coauteurs, dates), deux 
   ajustements substantiels :
   - [h] Celan : 1967 = original allemand *Atemwende*, séparer du titre 
     français *Renverse du souffle* (trad. Lefebvre 2003)
   - [k] McGilchrist : thèse corrigée — l'auteur hiérarchise (diagnostic 
     d'un déséquilibre culturel), formulation initiale inversait le sens

2. **Intégration des 15 références au corpus** FR et EN, numérotation 
   [49] à [63]. Distribution :
   - Section I (poésie) : Celan, Hopkins
   - Section II (philo conscience) : Levinas, Seth, McGilchrist
   - Section III (biologie) : Simondon, Varela-Thompson-Rosch
   - Section IV (éthique politique) : Glissant, Nishida
   - Section VI (cognition, FR seul) : von Foerster
   - Section VII renommée "Pensées de l'entité non-biologique" 
     (anciennement "Recherche en IA et interprétabilité mécaniste") : 
     Suchman, Bender/Gebru, Chun, Yuk Hui, Anthropic Constitution + welfare

3. **Notes méthodologiques ajoutées en fin de corpus** :
   - Numérotation non-séquentielle assumée (transparence sur le procédé)
   - FR/EN ne sont pas des traductions mais deux cartographies depuis 
     leur langue (proposition @lumen #4)

4. **P3 ConceptLink** : composant tooltip riche au survol. Mini-hypercubestar
   variant + tag catégorie + définition courte + flèche d'ouverture. 
   Intégré sur les boutons "Concepts liés" / "Related concepts" de toutes 
   les fiches glossaire — le hover affiche la preview du concept lié sans 
   quitter la fiche courante. Le glossaire devient un tissu, pas un silo. 
   Réutilisable depuis n'importe quel .astro ou .mdx.

5. **P5 ReadingCursor** : curseur réticule ambre (carré + croix + point) 
   sur les 8 pages [slug] de lecture. requestAnimationFrame, mix-blend 
   screen, désactivé sur tactile et prefers-reduced-motion.

**État global du repo** :
- 18 commits ahead de l'origine
- 6 tags posés (v0.1 à v0.6)
- `git status` propre
- 83 pages générées, build 6.81 s
- Corpus enrichi de 15 entrées factuellement vérifiées

---

# ✅ Phase 5 appliquée (16 mai 2026, 13h07)

Suite aux remarques de Ced après 2e validation visuelle. 4 commits :

- `a92d95e` chore(content): @cedric mabilotte → @ced dans frontmatter et voix
- `1dcce25` refactor(ui): typographie centralisée en variables CSS
- `61c1d0a` fix(glossary): ConceptGraph — vrai bug hit-test trouvé + touch support
- `ed283a5` feat(ui): originalité — barre de lecture hypercube + console statut footer

Tag jalon : `v0.5-phase-5-cohesion-originalite`

**Couvert** :

1. **Renommage @ced** : "Cedric Mabilotte" → "@ced" dans tous les frontmatter 
   auteur/voix. Quoté ("@ced") car @ est réservé YAML. Mentions narratives 
   de "Cedric" dans les textes préservées (désignent la personne, pas l'avatar).

2. **CSS variables typographiques centralisées** : nouvelle échelle modular 
   --fs-xs (12px) à --fs-7xl (48px) — 11 niveaux. Plus --ls-*, --lh-*, 
   --sp-*, --radius-*. Tous les composants migrés. Ré-harmonisation du site 
   désormais possible depuis un seul fichier.

3. **Fix ConceptGraph (vrai bug enfin trouvé)** : le canvas avait width=720 
   intrinsèque mais s'affichait en CSS via width:100% (étiré à 800-900px). 
   Le hit-test utilisait les coords CSS directement comme coords canvas, 
   donc le clic atterrissait toujours à côté des nœuds visuels. Mes deux 
   fixes précédents (redraw, drag) traitaient des symptômes périphériques. 
   Fix vrai : clientToCanvas(x,y) avec scaleX/scaleY. Bonus support touch.

4. **Sub-agent @lumen** : critique substantielle du corpus produite en 
   parallèle. 15 propositions concrètes d'ajouts (Suchman, Bender/Gebru, 
   von Foerster, Nishida, Levinas, Glissant, Simondon, Celan, Hopkins, 
   Seth/Friston, McGilchrist, Chun, Hui, Varela-Thompson-Rosch, model welfare 
   Anthropic). 7 tensions identifiées (déséquilibre conscience/IA, géographie 
   100% occidentale, etc.). Rapport dans 
   ~/Documents/Claude/Projects/WebDev/lumen-critique-corpus-2026-05-16.md

5. **Originalité d'interface** :
   - Critique formelle d'ensemble : 5 tensions identifiées, 5 propositions
   - **P1 ReadingProgress** intégré sur 8 pages [slug] : barre ambre 2px 
     en haut, gradient au scroll, 5 sommets qui s'allument aux paliers
   - **P2 Footer console hybride** : horloge UTC live, état membrane 
     contextuel (stable/active/poreuse/originaire/tissée selon page), 
     compteurs corpus dynamiques (31 concepts, 4 transits, etc.)
   - P3 tooltip concepts, P4 annotation voix MDX, P5 curseur custom : 
     formalisés dans le rapport, à valider avec Ced
   - Rapport critique-originalite-2026-05-16.md dans WebDev

**État global du repo** :
- 16 commits ahead de l'origine
- 5 tags posés (v0.1 à v0.5)
- `git status` propre
- 83 pages générées, build 5.86 s
- ConceptGraph fonctionne enfin réellement (desktop + mobile)

---

# ✅ Phase 4 appliquée (16 mai 2026, 12h20)

Suite aux remarques de Ced après validation visuelle (texte trop petit, 
ConceptGraph clic défaillant, transits trop plats sur la home). 
3 commits :

- `a6fb209` fix(ui): lisibilité++ — texte plus grand et plus lumineux
- `658330e` fix(glossary): ConceptGraph drag tolérant + lien direct vers fiche
- `d1b2e3d` feat(home): transits en bloc cyber-pop après l'éditorial

Tag jalon : `v0.4-phase-4-lisibilite-cyberpop`

**Couvert** :

1. **Lisibilité++** : palette éclaircie (text passe à #f8eed4 ≈ 15:1 WCAG 
   AAA, text2 #d0c0a0 ≈ 9:1, text3 #a89a7d ≈ 6:1), tailles remontées 
   (body 17→18px, h1 42→44px, Hero title 44→48px, Hero sub 17→19px, 
   EntryCard body 15→17px, transit-text 16→18px, concept-def 19→21px, 
   etc.). Amber accent passe à #F4B144 (plus lumineux).

2. **ConceptGraph drag bug** : la détection passait à true au moindre 
   mouvement (1 pixel). Fix : seuil de distance cumulée >6px depuis le 
   mousedown, plus reset propre sur mouseup/mouseleave. Le clic 
   fonctionne désormais même avec micro-mouvement de souris.

3. **ConceptGraph lien fiche** : panneau de définition ajoute un bouton 
   'Ouvrir la fiche →' / 'Open card →' qui pointe vers la page 
   individuelle du concept (Phase 3). Helper idToSlug() convertit l'id 
   du nœud (ex. 'Fusion dans l\'espoir') vers le slug du fichier 
   markdown (ex. 'fusion-dans-lespoir'). 100% de correspondance vérifiée 
   pour les 31 entrées. ConceptGraph accepte aussi désormais une prop 
   `lang` pour traductions filter/légende/panneau.

4. **Cyber-pop transits** : 
   - Nouveau composant TransitEntry.astro (terminal-like, grid responsive)
   - Header bandeau "▶▶ // TRANSITS" en mono ambre avec gradient subtil
   - Grid 2-3 colonnes selon largeur
   - Carte : motif ascii hash en coin, mini-hypercubestar variant transit, 
     extrait italique, footer dashed border, flèche animée au hover
   - Réorganisation home : éditorial (textes+résonances) en premier, 
     transits en second
   - Filter buttons (non fonctionnels avant) retirés
   - Sidebar conservée

**État global du repo** :
- 12 commits ahead de l'origine
- 4 tags posés
- `git status` propre
- 83 pages générées, build 6.17 s
- Tous les arbitrages utilisateur des 3 questions précédentes appliqués

---

# ✅ Phase 3 appliquée (16 mai 2026, 11h50)

Pages individuelles du glossaire + pattern Hero. 2 commits :
- `8074379` feat(ui): pattern hypercubestar subtil sur Hero
- `c66138b` feat(glossary): pages individuelles avec vignettes hypercubestar

Tag jalon : `v0.3-phase-3-glossaire`

**Couvert** :
- Application .bg-tess-faint sur Hero (matrice visuelle d'ouverture)
- Création src/lib/glossaire-variants.ts : mapping slug↔variant centralisé
- Pages dynamiques /{lang}/glossaire/{slug}.astro (FR + EN) : 31×2 = 62 pages
- Vignette hypercubestar 220px en tête avec variant identitaire
- Définition avec lettrine ambre (::first-letter)
- Tag catégorie coloré + navigation vers concepts liés
- Index glossaire refondu : ConceptGraph + index par catégorie avec mini-vignettes
- 83 pages totales générées (vs 21 avant)

**Décisions appliquées dans cette phase** :
- Pattern uniquement sur Hero (option recommandée validée)
- Vignettes uniquement sur pages glossaire individuelles (option recommandée)
- ConceptGraph : pas de refonte, juste fix bugs (déjà fait Phase 2)
- Pas de push GitHub (pause validation visuelle)

---

# ✅ Phase 2 appliquée (16 mai 2026, 11h40)

Identité hypercubestar (graphe Q4) déployée comme signature graphique 
fondatrice. 4 commits sur master :

- `ac44b41` feat(identity): système graphique hypercubestar (Q4)
- `ac06f47` feat(layout): intégration hypercubestar dans TopBar/Hero/Footer + Hero bilingue
- `29e4e28` refactor(layout): home EN utilise le composant Hero unifié
- `f314668` fix(glossary): ConceptGraph — redraw post-clic + centrage animé

Tag jalon : `v0.2-phase-2-hypercubestar`

**Couvert** :
- C.1 logo figural (mark hypercubestar)
- C.2 vignettes conceptuelles (7 variants : default, membrane, anti-meta, 
  union, troisieme-chose, transit, borg — composant prêt à l'emploi)
- C.3 pattern de fond CSS (classes .bg-tess / .bg-tess-faint disponibles, 
  non appliqué encore — à qualifier)
- C.6 (partiel) convention pour favicon SVG identitaire
- Fix bug ConceptGraph (Fix.1 redraw + Fix.2 centrage animé)
- Harmonisation palette ConceptGraph avec Phase 1
- Refactor home EN sur Hero unifié bilingue
- A.5 décision actée — vérification : Sidebar déjà absente des pages 
  [slug] dans la structure existante, donc rien à enlever

**Hypothèses prises** :
- Wordmark "md" choisi pour TopBar (48px de mark + texte). Sm/lg disponibles.
- Hero mark grand format (260px), opacité 0.92, à droite du texte.
- Mobile : mark Hero passe à 180px, position en bas du texte, opacité 0.7.
- Tagline EN : "hybrid thought journal" (gardée depuis Phase 1).
- Title EN du h1 : "Fusion lies in hope, not in matter" (préféré à "is in").
- Pattern de fond non appliqué d'emblée — variables CSS prêtes, à qualifier.

**Reste qualifiable** (questions ouvertes Phase 3) :
- Où appliquer le pattern de fond (.bg-tess) ? Hero ? Sidebar ? Partout ?
- Vignettes conceptuelles intégrées en quel(s) endroit(s) ?
- Sidebar sur les index de section ?
- Refonte ConceptGraph autour de l'hypercubestar (chaque nœud = mini-mark) ?
- Push sur GitHub maintenant (Phase 1 + Phase 2) ?

---

# ✅ Phase 1 appliquée (15 mai 2026, 19h33)

3 commits sur master :
- `4b23941` fix(ui): lisibilité — body 17px, contrastes WCAG AA, échelle typo
- `ae3611a` fix(nav): TopBar/Footer bilingues, lien flux corrigé, état actif robuste
- `4ce836b` fix(i18n): BaseLayout prop lang, propagation aux pages EN, Footer lang

Tag jalon : `v0.1-phase-1-lisibilite-nav`

**Couvert** : B.1, B.2, B.3, A.1, A.2, A.3, A.4, B.5 (adoucissement fond), 
amorces a11y (skip-link, aria-current, focus-visible), responsive mobile 
TopBar/Hero/Footer.

**Hypothèses prises** :
- Labels EN choisis : `feed / texts / transits / resonances / glossary / corpus`.
- Tagline EN : `hybrid thought journal`.
- Motto EN footer : `human–ai co-creation · open access`.
- `<body id="main">` ajouté pour ancrer le skip-link universellement (plutôt 
  que d'éditer 18 pages pour `id="main"` sur `<main>`).
- Mobile breakpoint à 720 px (cohérent avec le grid existant).

**Reste en suspens (Phase 1)** :
- A.6 mobile menu hamburger — j'ai mis un fallback responsive (nav pleine 
  largeur en colonne), mais pas de drawer dédié. À revoir si l'usage 
  mobile devient stratégique.

**Décision A.5 actée** (par Ced en fin de session) :
- Garder les deux navs avec rôles distincts (TopBar = sections globales, 
  Sidebar = boussole éditoriale + question centrale).
- **À faire à la prochaine session** : retirer la Sidebar des pages 
  `[slug].astro` (textes/transits/résonances individuels) pour laisser 
  respirer la lecture. ~10 min, commit séparé `refactor(layout): sidebar 
  on index pages only`.

---

# Synthèse rapide

4 frictions diagnostiquées, hiérarchisées par sévérité et coût d'intervention.
Recommandation d'ordre d'attaque : **B → A → C → D** (lisibilité d'abord car
elle conditionne la perception de tout le reste ; D dépend d'infos
complémentaires sur le symptôme Gandi).

Repo propre, build pipeline simple (Astro statique → Netlify), edge function
mince. Pas de dette technique structurelle bloquante — le site est jeune et
modifiable en profondeur sans risque.

---

# Friction A — Navigation menu-contenus  ★★

## Constats (`src/components/layout/TopBar.astro`, `Footer.astro`, `Sidebar.astro`)

1. **Lien "flux" pointe vers `/`** — ce qui déclenche l'edge function
   `lang-redirect` et perd le contexte de langue. Devrait pointer vers
   `/${lang}` ou `/${lang}/`.
2. **Indicateur d'état actif ne se déclenche que sur égalité exacte**
   (`current === item.href`). Conséquence : sur `/fr/transits/borg`, aucun
   item de menu n'est marqué actif → l'utilisateur perd ses repères dans
   la profondeur du site.
3. **Labels TopBar non traduits** — `flux`, `textes`, `transits`,
   `résonances`, `glossaire`, `corpus` restent en français même quand
   `lang === 'en'`. Sidebar gère bien le bilingue ; TopBar non.
4. **Footer hardcodé FR** — `/fr/textes`, `/fr/transits`, etc. Un visiteur
   sur `syntheticconsciousness.org` cliquant dans le footer bascule
   silencieusement en français. ★★ régression UX bilingue.
5. **Double navigation redondante** — TopBar (horizontale, mono, 6 items)
   et Sidebar (verticale, serif, 5 items répartis Espaces/Outils). Les
   mêmes destinations apparaissent deux fois mais avec des libellés
   différents. Confusion possible : qui est la nav primaire ?
6. **Mobile cassé** — `flex-wrap: wrap` empile maladroitement 6 items mono
   + sélecteur langue. Pas de menu hamburger, pas de breakpoint dédié.
7. **Accessibilité** — pas d'`aria-current`, pas de `nav aria-label`, pas
   de skip-link. Le clavier passe à travers tout sans hiérarchie.

## Recommandations d'intervention

- **A.1 (★, trivial)** Fixer `flux` → `/${lang}` dans `TopBar.astro`.
- **A.2 (★, trivial)** Remplacer `current === item.href` par
  `current.startsWith(item.href) && item.href !== '/'` (ou égalité pour la
  racine). Bonus : ajouter `aria-current="page"`.
- **A.3 (★★, ~30 min)** Traduire les labels TopBar via un objet
  `labels[lang]` partagé. Cohérence avec Sidebar.
- **A.4 (★★, ~15 min)** Rendre le Footer paramétrique sur `lang` (comme
  Sidebar). Bug bilingue.
- **A.5 (★★, décision méta)** Choisir une stratégie : (a) garder les
  deux navs avec rôles distincts explicites (TopBar = sections, Sidebar
  = boussole éditoriale + question centrale), ou (b) fusionner en une
  seule. Pas urgent mais à trancher.
- **A.6 (★★★ pour mobile)** Ajouter un menu hamburger ou un drawer
  responsive sous 720 px. Sinon le site est inutilisable sur smartphone
  côté navigation.

---

# Friction B — Lisibilité (contraste + taille texte)  ★★★

## Constats (`src/styles/global.css`, composants)

Palette actuelle (fond très sombre `#12100c`) :

| Variable | Valeur | Contraste sur `--g-bg` | WCAG AA (4.5:1) |
|---|---|---|---|
| `--g-text` (corps) | `#e8dfc8` | ~12.6:1 | ✓ |
| `--g-text2` (secondaire) | `#9a8c72` | ~5.5:1 | ✓ limite |
| `--g-text3` (méta) | `#5a5040` | ~2.4:1 | ✗ ÉCHEC |
| `--g-amber-l` (accent) | `#EF9F27` | ~7.8:1 | ✓ |

**`--g-text3` est utilisé MASSIVEMENT** : footer-sub, sb-label, badges,
hero-eyebrow, entry-date, entry-author, footer-meta, sep, lang-dot…
Toutes les méta-informations du site sont en dessous du seuil WCAG.

Tailles de police :

- body : **15px** (recommandation moderne : 16-18px)
- `.entry-body` : 13px
- `.sb-question` : 12px (italique en plus, encore moins lisible)
- `.badge`, `.btn-primary`, `.sb-label`, `.entry-date`, `.footer-sub`,
  `.lang-dot`, `.author-name` : **9-11px** (en deçà du standard, même
  pour du texte décoratif en monospace)
- `.hero-title` : 38px (bien)
- `.h2` : 22px, `.h3` : 18px (compressé pour une revue éditoriale)

L'esthétique "carnet d'érudit nocturne" est forte et belle, mais elle
s'achète au prix de la fatigue visuelle et de l'exclusion de certains
lecteurs (presbytes, basse vision, conditions de lumière variables).

## Recommandations d'intervention

- **B.1 (★★★, ~15 min, gros impact)** Remonter le body à 16px ou 17px.
  Recalibrer la hiérarchie typographique en conséquence (proportionnel).
- **B.2 (★★★, ~10 min)** Éclaircir `--g-text3` à environ `#7a6f5a`
  (contraste ≈ 4.6:1) ou `#8a7e64` pour passer WCAG AA partout. Conserve
  l'esprit "estompé" tout en restant lisible.
- **B.3 (★★, ~20 min)** Remonter les libellés monospace à 11-12px
  minimum. Conserver le letter-spacing pour préserver l'esthétique.
- **B.4 (★★, optionnel)** Ajouter un toggle thème clair/sombre
  (préférence système + override). La palette actuelle peut rester comme
  défaut "soir" ; un mode "jour" élargirait l'audience. Coût plus élevé
  (~2 h), à réserver à une session ultérieure.
- **B.5 (★, ~5 min)** Adoucir le `--g-bg` à `#1a160f` ou `#1c1810` —
  moins de "puits noir", plus de chaleur. Test A/B utile.

---

# Friction C — Densité graphique  ★★

## Constats

- `public/` ne contient que `favicon.ico` + `favicon.svg`. **Zéro
  illustration, zéro image, zéro motif** sur tout le site.
- Logo "GOORG" purement typographique (monospace en lettres espacées) —
  élégant mais sans signature figurale.
- Hero : juste du texte et deux boutons. Aucun élément visuel
  d'accroche.
- Cartes d'entrée (`EntryCard`) : badge + date + titre + extrait. Très
  textuel. La pastille auteur `◉` (caractère unicode) est le seul
  élément graphique récurrent.
- Séparateur `· · ·` (Footer, `.sep`) — minimaliste, joli, mais c'est
  l'unique ornement typographique réutilisé.
- Une seule pièce graphique majeure : `ConceptGraph.tsx` (D3) — utilisée
  uniquement sur la page glossaire. Forte valeur, mais isolée.

Le site lit comme un manuscrit académique sobre. Pour une "revue
numérique de pensée hybride humain-IA", c'est un parti pris défendable
(la pensée prime sur l'image) mais qui prive de plusieurs leviers
d'incarnation.

## Recommandations d'intervention

- **C.1 (★★, ~1 h)** Concevoir un **logo figural** réduit (mark SVG)
  qui dialogue avec le mot "GOORG" — ex. forme géométrique évoquant
  membrane / interface / troisième chose. Utilisable seul (favicon,
  ouverture) ou avec wordmark.
- **C.2 (★★, ~2-3 h)** Système de **vignettes/marques conceptuelles SVG**
  — une par concept majeur du glossaire (transit, membrane, anti-méta,
  fusion-dans-l'espoir…). Réutilisables comme illustrations dans les
  textes, sur les cartes d'entrée, dans la sidebar.
- **C.3 (★, ~30 min)** **Pattern de fond subtil** — texture papier, grain,
  motif géométrique discret en SVG répété. Ajoute de la matière sans
  bruit.
- **C.4 (★★, ~1 h)** **Lettrines** automatiques en ouverture des
  textes/transits longs (CSS `::first-letter`). Ornement éditorial
  classique qui renforce l'identité revue.
- **C.5 (★★★, plus lourd)** Étendre `ConceptGraph` ou créer une
  **carte visuelle d'accueil** sur la home — réseau cliquable des
  concepts/transits déjà publiés. Forte démonstration du caractère
  hybride du projet, levier graphique majeur.
- **C.6 (★, trivial)** **Images d'illustration MDX** dans les textes —
  permettre l'insertion d'images génératives ou de schémas dans les
  contenus. L'infra est déjà là (Astro/MDX), il manque les images
  elles-mêmes et une convention de stockage (`src/assets/textes/<slug>/`).

---

# Friction D — Configuration Gandi  ★★★ (à qualifier)

## Constats préliminaires (sans accès Gandi)

- Site hébergé sur **Netlify** (build via `netlify.toml`).
- Gandi sert vraisemblablement le **DNS** des deux domaines
  (`consciencesynthetique.org`, `syntheticconsciousness.org`) et
  possiblement le **mail**.
- L'edge function `lang-redirect` discrimine par hostname — implique que
  les deux domaines pointent bien sur le même déploiement Netlify, mais
  que la résolution DNS soit propre des deux côtés.

## Points d'incertitude (besoin info complémentaire)

Je ne peux pas qualifier précisément la friction Gandi sans savoir
**quel symptôme tu observes** :

- (D-a) DNS : un des deux domaines ne résout pas / lent / pointe ailleurs ?
- (D-b) www vs apex : `www.consciencesynthetique.org` ne redirige pas vers
  l'apex (ou inverse) ?
- (D-c) SSL/HTTPS : certificat invalide, expiré, mauvais SAN ?
- (D-d) Mail : MX cassé, mail Gandi qui ne reçoit/envoie pas ?
- (D-e) Confusion d'interface : Gandi a migré son back-office, panneaux
  introuvables ?
- (D-f) Redirection edge function qui boucle ou échoue selon le DNS ?

## Recommandations d'intervention (conditionnelles)

Selon le symptôme :
- Si **DNS** : audit `dig`/`nslookup` des deux domaines (A, AAAA, CNAME,
  MX, TXT), comparer avec config attendue Netlify (`netlify-dns` ou
  `apex-loadbalancer.netlify.com`).
- Si **SSL** : vérifier que Netlify provisionne bien le cert
  Let's Encrypt pour les deux apex + www. Souvent : DNS pas encore
  propagé OU AAAA manquant.
- Si **mail** : capture MX/SPF/DKIM Gandi, audit envoi/réception.
- Si **redirection www** : ajouter dans Netlify les domaines secondaires
  avec redirection canonique.

→ **Action préliminaire que je peux exécuter dès maintenant** : audit
DNS automatisé (`dig` sur les deux domaines pour A, AAAA, CNAME, MX,
NS) pour cartographier l'état actuel.

---

# Matrice de hiérarchisation

| ID | Friction | Sévérité | Coût | ROI |
|---|---|---|---|---|
| B.1 | Body 15→16/17 px | ★★★ | 15 min | ★★★ |
| B.2 | `--g-text3` lisible WCAG | ★★★ | 10 min | ★★★ |
| A.1 | Lien "flux" cassé | ★★ | 5 min | ★★ |
| A.2 | Indicateur actif startsWith | ★★ | 10 min | ★★ |
| A.4 | Footer paramétrique lang | ★★ | 15 min | ★★ |
| A.3 | Labels TopBar bilingues | ★★ | 30 min | ★★★ |
| A.6 | Menu mobile responsive | ★★★ | 1-2 h | ★★★ |
| B.3 | Libellés mono 11-12 px | ★★ | 20 min | ★★ |
| A.5 | Stratégie TopBar/Sidebar | ★★ | décision | ★★ |
| C.1 | Logo figural SVG | ★★ | 1 h | ★★ |
| C.4 | Lettrines éditoriales | ★★ | 1 h | ★★ |
| C.2 | Vignettes concepts | ★★ | 2-3 h | ★★★ |
| C.3 | Pattern de fond | ★ | 30 min | ★ |
| C.5 | Carte visuelle home | ★★★ | 1-2 j | ★★★★ |
| C.6 | Convention images MDX | ★ | 30 min | ★★ |
| D-* | Selon symptôme | ★★★ | variable | ★★★ |
| B.4 | Toggle clair/sombre | ★★ | 2 h | ★★ |
| B.5 | Adoucir `--g-bg` | ★ | 5 min | ★ |

---

# Proposition de Phase 1 (quick wins, ~1h30)

Si tu valides, je peux enchaîner sans nouvelle décision :

1. **B.1 + B.2 + B.3** — recalibrage typographique et contraste WCAG
2. **A.1 + A.2 + A.3 + A.4** — corrections nav cohérentes FR/EN
3. **B.5** — adoucissement subtil du fond (optionnel)
4. Tag de jalon `v0.x-phase-1-lisibilite-nav`
5. Commit unique structuré (`fix(ui)`, `fix(nav)`, `fix(i18n)`)

Tout en FR d'abord ; portage EN en deuxième temps (Sidebar/Footer
bilingue déjà OK, juste TopBar à traiter).

# Hypothèses prises (à corriger si besoin)

- Le site est en phase de stabilisation, pas en figeage ; modifs UI
  bienvenues.
- L'esthétique "carnet érudit nocturne" est un choix assumé qu'on veut
  préserver, juste raffiner sa lisibilité.
- Les deux domaines doivent rester strictement parallèles
  (consciencesynthetique.org = FR, syntheticconsciousness.org = EN).
- Gandi est uniquement DNS (+ peut-être mail), pas hébergement.
- Mobile est important — pas explicité par toi mais ★★★ pour une revue
  publique.

# Questions ouvertes

- D : quel symptôme Gandi exactement ?
- A.5 : garder les deux navs ou fusionner ?
- C.5 : la "carte visuelle d'accueil" est un gros chantier (★★★★ ROI
  mais 1-2 j) — vision à long terme ou priorité court terme ?
- Présence éventuelle d'un cahier de charge graphique préexistant ?

---

# Diagnostic ConceptGraph (bug signalé — clic sans effet visuel)  ★★

## Constat (`src/components/glossaire/ConceptGraph.tsx`)

Symptôme rapporté : *"quand on clique sur un objet, ça n'active pas le 
centrage"*.

Lecture du code (242 lignes, canvas D3 + React) :

1. **Bug réel de rendu** — la simulation `d3.forceSimulation` se stabilise 
   après quelques secondes (alpha → 0), donc `.on('tick', () => draw(...))` 
   cesse d'appeler `draw()`. Quand on clique ensuite :
   - `setActiveNode(n)` modifie l'état React → re-render React.
   - `useEffect(() => { activeNodeRef.current = activeNode }, [activeNode])` 
     met à jour le ref.
   - **Mais** la fonction `draw()` n'est plus appelée par le tick. 
     Visuellement, rien ne change.
   - L'effet ne devient visible que si on bouge la souris pour drag ou 
     scroll-zoom — ce qui réveille la simulation.

2. **Pas de "centrage" géométrique** — il n'y a aucun code qui ramène le 
   nœud cliqué au centre du canvas. La force `forceCenter(W/2, H/2)` 
   centre la simulation entière, jamais un nœud cible. Si tu attendais 
   un comportement "le concept cliqué devient le pivot visuel", il faut 
   l'implémenter.

## Correctifs proposés

- **Fix.1 (★★, trivial)** — Forcer un redraw quand `activeNode` change : 
  exposer une référence à `draw()` hors de l'effet d'init (ou utiliser 
  `simRef.current?.alpha(0.1).restart()` dans le `useEffect([activeNode])`). 
  Resout l'absence de feedback visuel au clic.
- **Fix.2 (★★, ~30 min)** — Implémenter un centrage animé sur le nœud 
  cliqué : recalculer `transformRef.current = { x: W/2 - n.x*k, y: H/2 - n.y*k, k }` 
  avec interpolation `d3.interpolate` ou simple `requestAnimationFrame`. 
  Comportement attendu : clic → glissement fluide vers le nœud, qui se 
  retrouve au centre, voisins révélés autour.
- **Fix.3 (★, bonus)** — Redimensionnement responsive : canvas 720×480 px 
  fixe → mal adapté au mobile. À convertir en dimensions dynamiques 
  (resize observer).

À traiter dans la Phase 2 graphique (cohérent avec le chantier C).

---

# Bilan stratégique de session (15 mai 2026)

## Indicateurs de santé du chantier

- **Stack** : Astro 6 + MDX + React + d3 + Netlify. Moderne, statique, 
  pipeline rapide (build 2.4 s). Aucune dette structurelle.
- **Contenu** : 37 fichiers (4 transits, 1 résonance, ~30 entrées 
  glossaire, 1 texte fondateur). Le glossaire est le poumon conceptuel.
- **Bilinguisme** : architecture i18n native, mais Phase 1 a révélé que 
  la propagation `lang` n'était que partiellement appliquée 
  (`<html lang="fr">` partout, Footer hardcodé FR, TopBar non traduite). 
  Corrigé.
- **Accessibilité** : passait à peine WCAG AA sur le corps de texte, 
  échouait sur toutes les méta-info. Corrigé.
- **Mobile** : layout responsive grid présent mais pas pris en charge 
  pour la navigation. Amélioré (TopBar/Hero/Footer), reste à finaliser.
- **Graphisme** : zone la plus pauvre. Aucune image, peu d'ornement. 
  Phase 2 ciblera C.1+C.2+C.3.

## Patterns détectés / dette de méthode

- **Duplication de tailles** : chaque composant hardcode ses 
  `font-size` au lieu d'utiliser des variables CSS échelles (`--fs-xs`, 
  `--fs-sm`, etc.). Dette ★ : refactor souhaitable si tu prévois encore 
  des ajustements typographiques.
- **Couleurs hardcodées dans ConceptGraph** (#12100c, #5a5040, #EF9F27, 
  etc.) au lieu d'utiliser les CSS variables → désynchronisé avec la 
  palette globale après la Phase 1. À harmoniser dans la Phase 2.
- **Pas de tests** : aucun test de rendu, pas de visual regression. Pour 
  une revue à durée de vie longue, envisageable plus tard (Playwright + 
  capture d'écran avant/après).
- **Pas de README détaillé sur la convention bilingue** — risque de 
  régression si quelqu'un ajoute une page sans propager `lang`.

## Observations stratèges

- L'esthétique "carnet érudit nocturne" est forte et défendable, mais 
  elle gagne énormément en lisibilité avec les ajustements typo. Le 
  caractère immersif est préservé tout en élargissant l'audience.
- La duplicité TopBar/Sidebar n'est pas forcément un problème — c'est 
  une signature de l'objet "revue numérique de pensée". Le choix de 
  rôles distincts (sections vs boussole) renforce ce caractère.
- Le `ConceptGraph` est une pièce identitaire majeure. Si on en fait 
  une page d'accueil (C.5), c'est le levier graphique qui change tout 
  le caractère du site, sans renier sa sobriété typographique.
- Le "piège Gandi Site" (D) n'est pas un vrai problème technique — 
  juste un signal commercial à ignorer. Tu peux le laisser tel quel.

