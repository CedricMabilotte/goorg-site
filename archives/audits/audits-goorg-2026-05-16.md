---
date: 2026-05-16
sujet: Audits techniques Goorg (Netlify, DNS, Lighthouse)
domaines: consciencesynthetique.org (FR), syntheticconsciousness.org (EN)
mode: lecture seule
tags: [v0.7, audit, netlify, dns, lighthouse]
---

# Audits techniques Goorg — 2026-05-16

Trois audits parallèles post-déploiement v0.7 : vérification du déploiement Netlify, état DNS sur les deux apex, tentative Lighthouse.

---

## 1. Déploiement Netlify (Audit C3)

### Tableau d'état FR / EN

| Vérification | FR (consciencesynthetique.org) | EN (syntheticconsciousness.org) |
|---|---|---|
| HTTP racine `/` | **302** → `/fr` | **302** → `/en` |
| HTTP après redirection | **200 OK** | **200 OK** |
| `<title>` | `GOORG` | `GOORG — hybrid thought review — GOORG` |
| Meta description | `Revue numérique de pensée hybride` | idem (FR non traduit, voir reco) |
| `GOORG` wordmark présent | OUI | OUI |
| Marqueur `@ced` (carte) | OUI (cartes Texte + Transits) | OUI (carte Texte) |
| `id="main"` | OUI | OUI |
| Classe `bg-tess-faint` | OUI | OUI |
| « Flux éditorial » / « Editorial flux » | OUI (FR) | OUI (EN) |
| `TRANSITS` (uppercase, section) | OUI | NON (pas de bloc TRANSITS sur home EN) |
| Footer mention « membrane » | OUI (`membrane stable`) | OUI (`membrane stable`) |
| Favicon SVG `/favicon.svg` | **200**, `image/svg+xml` (hypercubestar) | servi depuis même build (idem) |
| Lien `favicon.svg` dans `<head>` | OUI | OUI |

### Observations

- **Les deux apex servent du contenu Phase 7 cohérent**. Le build Netlify a bien déployé après le push GitHub.
- Redirection `/` → `/<lang>` fonctionnelle (302), comportement attendu pour la stratégie i18n.
- `301` sur `/fr` (note : un permanent redirect 301 sur `/fr` suggère normalisation finale avec slash, c'est correct).
- **Asymétrie FR/EN** : la section `▶▶ // TRANSITS 4 passages enregistrés` n'apparaît pas sur la home EN. Le `corpus` footer EN annonce pourtant `4 transits · 1 resonances · 1 texts`. Les contenus de Transits existent mais ne sont pas rendus côté EN (ou la liste est filtrée). À investiguer — c'est en lien avec la tâche #46 (corpus EN symétrique).
- **Meta description EN non traduite** (`Revue numérique de pensée hybride` au lieu de `Digital review of hybrid thought`) — bug i18n head.
- Pas d'éléments cassés visibles, pas d'erreur 5xx, le CDN Netlify répond (header `age:` présent sur favicon → bien caché en edge).

---

## 2. DNS (Audit C1)

### Tableau dig

| Enregistrement | consciencesynthetique.org | syntheticconsciousness.org |
|---|---|---|
| **A** | `75.2.60.5` | `75.2.60.5` |
| **AAAA** | (vide) | (vide) |
| **CNAME www** | `goorg.netlify.app.` | `goorg.netlify.app.` |
| **MX** | `10 spool.mail.gandi.net.` / `50 fb.mail.gandi.net.` | `10 spool.mail.gandi.net.` / `50 fb.mail.gandi.net.` |
| **NS** | `ns-{75-a,155-b,250-c}.gandi.net.` | `ns-{205-a,224-b,201-c}.gandi.net.` |
| **TXT** | `v=spf1 include:_mailcust.gandi.net ?all` | `v=spf1 include:_mailcust.gandi.net ?all` |
| **CAA** | (vide) | (vide) |

### Interprétation

- **A → 75.2.60.5** : c'est bien l'IP officielle du load balancer Netlify (`apex-loadbalancer.netlify.com`). **SAIN.**
- **CNAME www → `goorg.netlify.app`** : redirection sous-domaine correctement configurée vers le site Netlify. **SAIN.**
- **AAAA absent** : Netlify supporte IPv6 sur les apex via `2600:1f14:e22:8d00::64` (entre autres). L'absence n'est pas bloquante mais prive les visiteurs IPv6-only d'un accès direct. **SUSPECT MINEUR.**
- **NS gandi.net** : zone hébergée chez Gandi (registrar et DNS), cohérent.
- **MX + SPF Gandi** : mail Gandi opérationnel sur les deux domaines. SPF présent avec qualificateur `?all` (neutral) — c'est le défaut Gandi mais ce n'est pas optimal pour la protection anti-spoofing.
- **CAA vide** : aucune autorité de certification restreinte. Let's Encrypt (utilisé par Netlify) peut émettre sans contrainte, donc ça marche, mais **SUSPECT MINEUR** : ajouter un CAA limitant aux émetteurs Netlify (Let's Encrypt) renforcerait la posture sécurité.
- **DMARC** : non testé ici (pas dans la liste), mais l'absence d'une politique DMARC + le `?all` SPF laisse la porte ouverte au spoofing du domaine. Hors scope déploiement, mais à noter.

**Verdict global DNS : sain pour servir le site Netlify**, deux améliorations possibles (AAAA, CAA), un point d'attention email (SPF `?all` + DMARC absent probable).

---

## 3. Lighthouse (Audit C4)

### Résultat

**Échec.** Le sandbox d'exécution ne dispose d'aucun binaire Chrome/Chromium :

```
Runtime error encountered: The CHROME_PATH environment variable must be set
to a Chrome/Chromium executable no older than Chrome stable.
```

Vérifié : `which chromium chromium-browser google-chrome chrome` → aucun résultat. `/usr/bin/chrom*` → introuvable.

### Alternative tentée — PageSpeed Insights API

Appel direct à l'API publique Google PageSpeed Insights (qui exécute Lighthouse côté serveur Google) :

```
HTTP 429 — Quota exceeded for quota metric 'Queries'
```

L'API publique sans clé est rate-limitée et déjà saturée. Une clé API gratuite Google Cloud (gratuite jusqu'à 25 000 req/jour) permettrait d'en sortir.

### Recommandations alternatives

1. **PageSpeed Insights web** (manuel, gratuit, immédiat) :
   - https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fconsciencesynthetique.org
   - https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fsyntheticconsciousness.org
2. **WebPageTest** (https://www.webpagetest.org/) — plus détaillé (waterfall, métriques par région).
3. **Lighthouse en local** sur la machine de Ced (Chrome installé) : `lighthouse <url> --view`.
4. **CI Lighthouse** : intégrer `@lhci/cli` dans le build Netlify pour audit automatique à chaque déploiement (rapport généré par build).
5. **GTmetrix** (https://gtmetrix.com/) — alternative externe sans setup.

---

## 4. Recommandations prioritaires

Classées par criticité / effort :

1. **[P1 — bug rendu] Section TRANSITS manquante sur la home EN.** La home FR affiche `▶▶ // TRANSITS 4 passages enregistrés`, l'EN n'a pas ce bloc malgré 4 transits comptabilisés dans le footer corpus. Vérifier le composant home côté `/en` (Phase 8 — tâche #46).

2. **[P2 — i18n] Meta description EN non traduite.** Le `<head>` EN sert encore `Revue numérique de pensée hybride`. Corriger le mapping `description` dans le frontmatter ou le layout `<head>` pour la branche `/en`.

3. **[P3 — DNS / sécurité TLS] Ajouter des enregistrements CAA** sur les deux domaines pour autoriser explicitement Let's Encrypt :
   ```
   consciencesynthetique.org. CAA 0 issue "letsencrypt.org"
   syntheticconsciousness.org. CAA 0 issue "letsencrypt.org"
   ```
   À ajouter dans la zone DNS Gandi. Effort : 2 minutes par domaine.

4. **[P3 — DNS / IPv6] Ajouter AAAA Netlify** sur les deux apex pour servir IPv6 nativement (IP Netlify : voir doc officielle, généralement `2600:1f18:3fff:c001::/64`). Effort : 2 min.

5. **[P4 — mail] Durcir SPF + ajouter DMARC.** Passer SPF de `?all` (neutral) à `-all` (strict) si tout le mail légitime sort de Gandi, puis ajouter une politique DMARC (commence par `p=none` pour monitorer, puis `p=quarantine`). Hors scope déploiement web mais important si Ced reçoit/envoie du courrier depuis ces domaines.

6. **[P4 — observabilité perf] Intégrer Lighthouse CI** dans le pipeline Netlify pour avoir un suivi des scores Performance/Accessibility/SEO à chaque déploiement, sans dépendre d'un sandbox externe.

---

## Annexe — Données brutes

### Curl HTTP

```
HTTPS https://consciencesynthetique.org → HTTP/2 302 (→ /fr)
HTTPS https://syntheticconsciousness.org → HTTP/2 302 (→ /en)
HTTPS https://consciencesynthetique.org/fr → HTTP/2 301 (normalisation)
HTTPS https://consciencesynthetique.org/favicon.svg → HTTP/2 200, image/svg+xml
```

### Marqueurs HTML détectés

FR : `bg-tess-faint`, `@ced`, `favicon.svg`, `Flux éditorial`, `id="main"`, `membrane`, `transits`, `TRANSITS`
EN : `bg-tess-faint`, `@ced`, `favicon.svg`, `Editorial flux`, `id="main"`, `Membrane`, `membrane`, `transits` (pas de `TRANSITS` uppercase → absence du bloc section)

### Outils utilisés

- `curl -sI` / `curl -sL` pour HTTP + HTML
- `dig +short` pour DNS
- `npx lighthouse` (échec : pas de Chrome dans le sandbox)
- API PageSpeed Insights (échec : quota)
