# SEO Improvement Plan — Wypożyczalnia Rowerów u Bachledy
*Plan based on: [seo-audit-report.md](seo-audit-report.md)*
*Data: 2026-05-08*

## FAZA 1 — Critical fixes (Day 1)

### Ścieżka A: Utworzenie sitemap.xml
**Cel**: Google odkrywa wszystkie 5 routes (homepage + 4 trasy).
**Files**: `public/sitemap.xml` (do utworzenia), opcjonalnie `scripts/prerender.js` (auto-gen)
**Action**:
- Utwórz `public/sitemap.xml` z 5 URL (lastmod = data publikacji, changefreq=monthly, priority odpowiednio 1.0 dla home, 0.8 dla trail pages)
- Opcjonalnie: rozszerz `scripts/prerender.js` żeby generował sitemap.xml na bazie `getRoutes()` — wtedy nigdy nie wyjdzie out of sync
**Time**: 15 min
**Verification**: `curl https://www.rowerybachleda.pl/sitemap.xml` zwraca 5 URL z trailing slash

### Ścieżka B: Utworzenie robots.txt
**File**: `public/robots.txt`
**Action**:
```
User-agent: *
Allow: /

Sitemap: https://www.rowerybachleda.pl/sitemap.xml
```
**Time**: 5 min
**Verification**: `curl https://www.rowerybachleda.pl/robots.txt` zwraca powyższe

### Ścieżka C: Trailing slash na internal links
**Pages**: 4 pliki, 4 zmiany
**Action**: dodaj `/` na końcu template literali:
- [src/components/sections/Trails.jsx:9](src/components/sections/Trails.jsx#L9): `` href={`/trasy/${trail.slug}/`} ``
- [src/components/Nav.jsx:33](src/components/Nav.jsx#L33): same
- [src/components/Nav.jsx:132](src/components/Nav.jsx#L132): same
- [src/pages/Trail.jsx:179](src/pages/Trail.jsx#L179): same
**Time**: 10 min
**Verification**: Po `npm run build` — `grep 'href="/trasy/' dist/public/index.html` pokazuje wszystkie z `/` na końcu

### Ścieżka D: Fix duplicate H2 w BikeSplit
**File**: [src/components/sections/BikeSplit.jsx](src/components/sections/BikeSplit.jsx)
**Action**: Refactor żeby `titleBlock` renderował się raz, a layout responsywny używał Flexbox `order` lub Grid `grid-template-areas` zamiast duplikowania DOM.
**Time**: 20 min
**Verification**: `grep -c '<h2' dist/public/index.html` zwraca 7 zamiast 10 (3 BikeSplit titles tylko raz każdy)

## FAZA 2 — Per-route meta + content (Day 1-2)

### 2.1 Twitter tags per route
**File**: [scripts/prerender.js:9-68](scripts/prerender.js#L9-L68) (`updateMetaTags`)
**Action**: Dodaj dwa replace patterns dla `<meta name="twitter:title">` i `<meta name="twitter:description">` analogicznie jak `og:title`/`og:description`.
**Time**: 15 min

### 2.2 Dedupe keywords w trail pages
**File**: [src/entry-server.jsx:23](src/entry-server.jsx#L23)
**Action**:
- Albo dedupe (`Array.from(new Set([...]))`),
- Albo (rekomendowane) usuń `meta keywords` w ogóle — Google ignoruje od 2009.
**Time**: 5 min

### 2.3 FAQ section + FAQPage schema na homepage
**Cel**: AIO + Voice Search + cytowalność w ChatGPT/Perplexity.
**File**: nowy `src/components/sections/FAQ.jsx` + import w `src/pages/Home.jsx`
**Action**: 5-7 pytań z PAA Google na "wypożyczalnia rowerów Podhale" + content z `references/stats.md`. Sugestie:
- Ile kosztuje wypożyczenie roweru w Podhalu?
- Czy potrzebna jest rezerwacja?
- Czy kask jest w cenie?
- Gdzie dokładnie jesteście?
- Czy mogę wypożyczyć rower dla dziecka?
- Jakie są godziny otwarcia?
- Czy macie rowery elektryczne?

Każda odpowiedź 2-4 zdania, konkret, z liczbami. Dodać `FAQPage` JSON-LD do schema.
**Time**: 60-90 min

### 2.4 Hero direct-answer (AIO)
**File**: [src/components/sections/Hero.jsx](src/components/sections/Hero.jsx)
**Action**: Skróć subtitle do 2-3 zdań zawierających: lokalizację (Podczerwone, gmina Czarny Dunajec) + co (rowery klasyczne i elektryczne) + USP (przy Szlaku Wokół Tatr, kask gratis, parking). Tak żeby AI Overview wyciął te 2-3 zdania jako kompletną odpowiedź.
**Time**: 15 min

## FAZA 3 — Images (wymaga input klienta)

### 3.1 Photos provisioning
**Blocker**: klient musi dostarczyć:
- 3-4 zdjęcia rowerów (treking + e-bike + riksza)
- 3-4 zdjęcia atrakcji wokół wypożyczalni (rzeka, las, ognisko, dmuchaniec)
- 1-2 zdjęcia obsługi / klientów (z zgodą RODO)

**Action po dostarczeniu**:
- Konwersja do WebP (cel <200 KB każdy)
- Wymiary 1200×800 dla content + 1200×630 dla og:image
- Save w `public/photos/` z opisowymi filenames (np. `rower-trekking-bachleda.webp`, `e-bike-podhale.webp`, `riksza-rodzinna.webp`)
- Replace `/logo.png` na te ścieżki w komponentach BikeSplit, Inspiration, Events

**Time**: po dostarczeniu — 30-60 min konwersji

### 3.2 Width/height attributes na obrazki
**Files**: wszystkie komponenty z `<img>` (BikeSplit, Inspiration, Events, Hero, Nav, Footer)
**Action**: dodaj `width` i `height` attribute zgodnie z faktycznymi wymiarami WebP
**Time**: 20 min (po dostarczeniu obrazków)

## FAZA 4 — AI SEARCH optimization (Week 1)

### 4.1 H2 jako pytania (CCV)
**Files**: różne sekcje
**Action**: Przepisz 2-3 H2 z etykiet na pytania:
- "Cennik wypożyczenia — wszystko w jednym miejscu" → "Ile kosztuje wypożyczenie roweru w Podhalu?"
- "Świętuj u Bachledy" → "Co możesz świętować u nas? Urodziny, ognisko, grill"
- "Co odwiedzić rowerem" → "Co odwiedzić rowerem z Podczerwonego?"

**Time**: 30 min

### 4.2 Internal anchor text — zamień "Zobacz trasę" na nazwy tras
**File**: [src/components/sections/Trails.jsx:35-37](src/components/sections/Trails.jsx#L35-L37)
**Action**: Anchor text powinien być `{trail.title}` zamiast "Zobacz trasę". Internal Graph signal — anchor = entity name.
**Time**: 5 min

### 4.3 Speakable schema dla voice search
**File**: [index.html](index.html) (BicycleStore JSON-LD)
**Action**: Dodać `speakable` property do BicycleStore schema wskazujący na hero subtitle + opening hours:
```json
"speakable": {
  "@type": "SpeakableSpecification",
  "cssSelector": [".hero-subtitle", ".hours-display"]
}
```
**Time**: 10 min

### 4.4 Author / Person schema (E-E-A-T)
**Cel**: Atrybucja contentu do Eli Bachledy — wzmacnia E-E-A-T.
**File**: `index.html` lub osobny inline script
**Action**: Dodaj `Person` schema z `sameAs` do GBP profile. Linkuj BicycleStore.founder/employee do tej osoby.
**Time**: 15 min

## FAZA 5 — Schema enrichment + external links (Week 2)

### 5.1 External links do autorytatywnych źródeł
**File**: [src/components/sections/Trails.jsx](src/components/sections/Trails.jsx) lub Trail.jsx
**Action**: Dodaj 2-3 zewnętrzne linki:
- `szlakwokoltatr.eu` (oficjalny szlak)
- `tpn.pl` (Tatrzański Park Narodowy — dla Doliny Chochołowskiej)
- `gminaczarnydunajec.pl` (urząd gminy)

Otwierają się w nowej karcie z `rel="noopener nofollow"` jeśli nie polecane oficjalnie.
**Time**: 15 min

### 5.2 Organization schema (site-wide)
**File**: [index.html](index.html)
**Action**: Dodaj `Organization` schema z logo, adresem, kontaktem. Można merge z BicycleStore (BicycleStore extends LocalBusiness extends Organization), ale duplikacja Organization schema zwiększa entity recognition w Google KG.
**Time**: 15 min

### 5.3 TouristTrip / TouristAttraction schema na trail pages
**File**: [src/entry-server.jsx](src/entry-server.jsx) (lub osobny module dla schema)
**Action**: Dla każdej trasy dodaj `TouristTrip` lub `TouristAttraction` schema z dystans, czas, level. Pomaga w SERP Rich Results dla query typu "trasa rowerowa Podczerwone".
**Time**: 30 min

## FAZA 6 — Long-tail + monitoring (Month 1+)

### 6.1 GBP optimization
→ Hand-off do `/local-seo-optimizer`

### 6.2 Polish citations
→ Hand-off do `/local-seo-optimizer` (Panorama Firm, Pkt.pl, Cylex)

### 6.3 Reviews strategy
→ Hand-off do `/local-seo-optimizer`

### 6.4 Google Search Console + Google Analytics
**Action**:
- Zarejestruj domenę `https://www.rowerybachleda.pl/` w GSC
- Wyślij sitemap.xml
- Połącz GBP z GSC
- Zainstaluj GA4 (consent mode v2 dla EU)
**Time**: 30 min

---

## Podsumowanie

| Faza | Czas | Wpływ | Status |
|------|------|-------|--------|
| Faza 1 — Critical (sitemap, robots, trailing slash, H2 dedup) | 1 dzień | 🔥🔥🔥 Natychmiastowy | `[ ]` |
| Faza 2 — Per-route meta + FAQ | 1-2 dni | 🔥🔥 Wysoki | `[ ]` |
| Faza 3 — Images (po dostarczeniu) | 1 dzień + zależy od klienta | 🔥🔥🔥 Brand + UX | `[ ]` |
| Faza 4 — AI SEARCH | 1-2 dni | 🔥🔥 Średni-wysoki | `[ ]` |
| Faza 5 — Schema enrichment | 1 dzień | 🔥 Średni | `[ ]` |
| Faza 6 — Local SEO + monitoring | hand-off | 🔥🔥🔥 Local critical | `[ ]` |

**Estimated total work (poza Faza 6)**: 6-9 godzin core dev work + ~3h zależne od klienta (foto).

**Next pipeline step**: `/local-seo-optimizer` — GBP audit, Polish citations (Panorama Firm, Pkt.pl, branżowe katalogi rowerowe), reviews strategy.

Pełny pipeline: `.claude/rules/seo-pipeline-overview.md`.
