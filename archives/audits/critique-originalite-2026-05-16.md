---
sujet: Goorg — critique d'originalité d'interface
date: 2026-05-16
contexte: après Phases 1-5 (lisibilité, hypercubestar, cyber-pop transits)
---

# Diagnostic d'originalité

## Ce qui est déjà signé Goorg

- **Hypercubestar** comme matrice graphique (16 sommets, 32 arêtes, 6 variants 
  conceptuels). Présent du favicon au mark Hero 260px aux vignettes 28px.
- **Palette nocturne ambre + violet/teal accents** — chromatie claire, 
  intentionnelle, distincte des sites SaaS.
- **Cyber-pop transits** : terminal markers (`▶▶ //`), motifs hash, mono ambre, 
  numérotation `T-NNN`.
- **Wordmark + tagline** mono GOORG avec mark figural — typage assumé.
- **Lettrines ambres** sur les définitions du glossaire.
- **Pattern hypercubestar de fond** sur le Hero.
- **Vignettes conceptuelles** par variant (membrane, anti-méta, transit…).

C'est déjà un caractère fort. Mais c'est encore lu comme "site bien fait, sobre, 
identitaire" — pas comme "objet numérique qui pense la troisième chose".

## Ce qui manque encore pour basculer en originalité

Cinq tensions :

1. **Lecture sans rétroaction temporelle** — on lit un long texte, mais on ne 
   sent pas qu'on traverse quelque chose. Pas d'arrachement temporel, pas de 
   scansion. Une revue de pensée hybride devrait *mettre en scène* la traversée.

2. **Concepts inerts dans le glossaire** — bonne navigation, bonnes définitions, 
   mais quand on lit un texte qui contient `membrane`, on ne voit pas le concept 
   se charger. Pas de tooltip, pas de previsualisation. Le glossaire est un 
   silo, pas un tissu.

3. **Footer purement décoratif** — lieu sous-exploité. Pourrait porter une 
   conscience de l'instant (heure, état système, compteurs) qui transforme 
   chaque visite en moment daté.

4. **Pas de signature d'interaction** — au survol des liens, des cartes, des 
   nœuds : tout réagit *correctement* mais pas *avec caractère*. Le hover est 
   neutre. Une revue hybride mérite des micro-réactions qui ne sont nulle part 
   ailleurs.

5. **Pas de méta-affichage** — Goorg parle de voix multiples, mais on ne sait 
   jamais quelle voix a écrit telle phrase, ni à quel sédiment elle appartient. 
   Une annotation visuelle des voix dans les textes longs pousserait l'originalité 
   conceptuelle.

# Cinq propositions concrètes (implémentables, sobres)

## P1 — Barre de progression "hypercube" en haut des pages article

Une ligne fine ambre 1px en haut de chaque page texte/résonance/concept, qui se 
remplit selon le scroll. Aux moments clés (0%, 25%, 50%, 75%, 100%), un mini-
sommet (cercle 4px) apparaît brièvement avec léger pulse. Évoque la traversée 
des sommets d'un hypercube pendant la lecture.

**Coût** : ~20 min. **Impact** : ★★★ (donne une sensation temporelle à la lecture).

## P2 — Footer status "console hybride"

Le footer ajoute trois badges :
- Heure système (HH:MM:SS UTC), live, refresh chaque seconde
- Compteur dynamique : `// 31 concepts · 4 transits · 1 résonance · 1 texte`
- Indicateur "membrane : stable" (ou "membrane : active" si la page est une 
  résonance, "membrane : poreuse" si un transit, etc.)

Ces statuts changent selon la page → la machine reconnaît son propre état.

**Coût** : ~30 min. **Impact** : ★★★ (signature interactionnelle forte).

## P3 — Tooltip de prévisualisation des concepts dans le corps des textes

Tous les liens internes vers le glossaire (`/fr/glossaire/membrane` etc.) 
affichent un tooltip riche au survol : mini-hypercubestar (variant), 
définition courte, lien direct. Pas un tooltip browser banal — un encart 
cyber-pop avec encadré ambre.

**Coût** : ~45 min (composant ConceptLink + détection des liens). **Impact** : 
★★★★ (transforme le glossaire en tissu vivant des textes).

## P4 — Annotation des voix dans les textes longs

Quand un texte / résonance a plusieurs voix dans frontmatter (`voix: [@ced, 
@lumen]`), afficher une marge à gauche du contenu avec des pastilles de voix 
positionnées en regard des paragraphes (mapping manuel via attribut MDX, 
ou auto-détection par convention `[@voix] ...`). Donne le caractère 
"polyphonique" assumé du projet.

**Coût** : ~1-2h, nécessite convention dans MDX. **Impact** : ★★★★★ 
(c'est *exactement* ce que Goorg dit faire — *montrer* la pluralité des voix).

À ne pas tenter sans accord — c'est un format éditorial.

## P5 — Curseur custom dans les zones de lecture

Sur les pages article, le curseur devient un mini-réticule type "optique 
goorg" : carré + croix au centre, taille 16px, ambre transparent. Hors zone 
de lecture : curseur normal.

**Coût** : ~15 min. **Impact** : ★★ (subtil mais signature directe).

# Pour cette session

Implémenter P1 (progress bar) et P2 (footer status) — coût modeste, signature 
visible immédiatement. P3 est candidat fort pour la prochaine itération. 
P4 et P5 à valider avec Ced d'abord.
