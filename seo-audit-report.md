# SEO AUDIT — Wypożyczalnia Rowerów u Bachledy
*Data audytu: 2026-05-08*
*Audyt przeciwko: `.claude/rules/on-page-seo.md`*

## Executive Summary

| | |
|---|---|
| **Framework** | React 19 + Vite 6 + Tailwind v4 + wouter |
| **Prerendering** | ✅ TAK — SSG przez `scripts/prerender.js` (wszystkie routes prerenderowane do dist/public/**/index.html) |
| **Krytyczne problemy** | 4 (brak sitemap.xml, brak robots.txt, duplicate H2 z BikeSplit, internal links bez trailing slash → 301 redirect chain) |
| **Quick Wins** | 8 (<30 min effort) |
| **Compliance on-page-seo.md** | ~62/80 punktów — fundament mocny, brak technical files i AI SEARCH features |

---

## 1. Technical Analysis

### Framework Detection
- **Type**: React SPA z SSG (prerender.js generuje statyczny HTML)
- **Prerendering**: TAK — 5 routes prerenderowanych: `/`, `/trasy/wokol-tatr/`, `/trasy/dolina-chocholowska/`, `/trasy/nowy-targ/`, `/trasy/petla-puscizn/`
- **Build output**: `dist/public/index.html` zawiera renderowany HTML z meta + JSON-LD ✅
- **Server**: nginx (rewrite `/trasy/<slug>` → `/trasy/<slug>/` z 301 permanent)

### ✅ Working Well

- Title tag dynamiczny per route (50-60 znaków, primary keyword na początku)
- Meta description per route (150-160 znaków)
- Canonical poprawny per route, z trailing slash
- Open Graph tags (`og:title`, `og:description`, `og:url`, `og:type`, `og:image`, `og:locale`)
- `<html lang="pl">`, `<meta charset="UTF-8">`, viewport — OK
- Wszystkie obrazki mają `alt` text (11/11)
- `loading="lazy"` na below-fold images
- BicycleStore JSON-LD na homepage z aggregateRating, openingHours, geo, areaServed, hasOfferCatalog
- BreadcrumbList JSON-LD na trail pages
- Dokładnie 1 `<h1>` per route (po wyłączeniu duplicate H2 issue niżej)
- Heading hierarchy logiczna H1 → H2 → H3 (no skips)
- Adres + coords zsynchronizowane z Google Places API authoritative source

### ❌ Critical Problems

**Problem #1: Brak `sitemap.xml`**
- Issue: Google nie ma listy URL do crawlowania. Trail pages nie mają jak być odkryte poza linkami z homepage.
- Impact: Wolniejsza indeksacja, ryzyko że trail pages nie pojawią się w Google.
- Fix: Utworzyć `public/sitemap.xml` z 5 URL (home + 4 trasy). Auto-generowane ze `scripts/prerender.js` (lista routes już istnieje w `getRoutes()`).
- Location: `public/sitemap.xml` (do utworzenia) + opcjonalnie generator w `scripts/prerender.js`

**Problem #2: Brak `robots.txt`**
- Issue: Brak instrukcji dla crawlerów + brak referencji do sitemap.
- Impact: Google domyślnie crawluje wszystko, ale brakuje sygnału lokalizacji sitemap.
- Fix: Utworzyć `public/robots.txt`:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://www.rowerybachleda.pl/sitemap.xml
  ```
- Location: `public/robots.txt` (do utworzenia)

**Problem #3: Duplicate H2 na homepage z `BikeSplit.jsx`**
- Issue: Komponent renderuje `titleBlock` dwukrotnie (raz w `md:hidden` mobile, raz w `hidden md:block` desktop). Tailwind tylko ukrywa wizualnie — Google widzi oba H2s w HTML.
- Impact: Każda sekcja produktu ma 2× to samo H2 ("Rowery klasyczne" ×2, "Rowery elektryczne — Podhale" ×2, "Riksza rodzinna" ×2). Rozcieńcza relevance signals.
- Fix: W [`src/components/sections/BikeSplit.jsx:16-24`](src/components/sections/BikeSplit.jsx#L16-L24) — render `titleBlock` tylko raz, użyj responsive ordering Flexbox/Grid zamiast duplikowania.
- Location: [src/components/sections/BikeSplit.jsx](src/components/sections/BikeSplit.jsx)

**Problem #4: Internal trail links bez trailing slash → 301 redirect**
- Issue: `Trails.jsx:9`, `Nav.jsx:33,132`, `Trail.jsx:179` linkują do `/trasy/<slug>` (bez `/`). nginx ma rewrite `^/trasy/([^/]+)$ /trasy/$1/ permanent` (301). Każdy klik = redirect.
- Impact: Crawl budget waste, link equity loss przez 301, Screaming Frog flagi 3XX.
- Fix: Dodać trailing slash do template literals:
  - [src/components/sections/Trails.jsx:9](src/components/sections/Trails.jsx#L9) → `` `/trasy/${trail.slug}/` ``
  - [src/components/Nav.jsx:33](src/components/Nav.jsx#L33) i [Nav.jsx:132](src/components/Nav.jsx#L132)
  - [src/pages/Trail.jsx:179](src/pages/Trail.jsx#L179)
- Location: 4 pliki, 4 zmiany jednolinijkowe

### ⚠️ Improvements Needed

**Issue #5: `twitter:title` i `twitter:description` nie aktualizują się per route**
- `scripts/prerender.js` aktualizuje tylko `<title>`, `<meta description>`, `og:title`, `og:description`, `og:url`, canonical. Pomija `twitter:*`.
- Wszystkie subroute mają twitter card homepage'a — niezgodność.
- Fix: rozszerzyć `updateMetaTags()` w [scripts/prerender.js:9-68](scripts/prerender.js#L9-L68) o `twitter:title`, `twitter:description` (replace + ten sam wzorzec co og).

**Issue #6: Keywords w trail pages mają duplikaty**
- `entry-server.jsx:23` generuje: `${t.title}, Szlak Wokół Tatr, ${t.mapsQuery}, wypożyczalnia rowerów Podczerwone` → dla `/trasy/wokol-tatr/` wychodzi `"Szlak Wokół Tatr, Szlak Wokół Tatr, Szlak Wokół Tatr Podczerwone, wypożyczalnia rowerów Podczerwone"`.
- Trzykrotne powtórzenie tego samego keyword = keyword stuffing flag. `meta keywords` nie ważą już dla Google, ale czysty kod to czysty kod.
- Fix: dedupe keywords lub usuń `meta keywords` w ogóle (Google ignoruje od 2009).

**Issue #7: Wszystkie obrazki produktowe to `/logo.png` jako placeholder**
- BikeSplit, Inspiration, Events sekcje używają `/logo.png` zamiast prawdziwych zdjęć rowerów / atrakcji / wydarzeń. ALT text mówi "Rowery klasyczne" / "Ognisko · zmierzch" / "Rzeka Czarny Dunajec" — semantic mismatch z faktycznym src.
- Impact: Google Image Search zero zasięg. Reverse image search wskaże logo, nie produkt. UX problem (klient widzi logo zamiast roweru).
- Fix: Klient musi dostarczyć zdjęcia (rower trekking, e-bike, riksza, ognisko, dmuchaniec, atrakcje). Po dostarczeniu — convert do WebP, max 200 KB, dodać width/height.

**Issue #8: Format obrazków — JPG/PNG zamiast WebP**
- `hero.jpg` + brak WebP fallback. PNG dla logo OK (transparent), ale photo content powinno być WebP.
- Fix: Konwersja do WebP po dostarczeniu zdjęć przez klienta. ~30-50% rozmiar.

**Issue #9: Brak width/height na `<img>`**
- Wszystkie 11 img bez `width`/`height` attributes — ryzyko Cumulative Layout Shift (CLS) Core Web Vital.
- Fix: Dodać width/height do każdego `<img>` w komponentach.

**Issue #10: Brak BreadcrumbList JSON-LD na homepage**
- Trail pages mają breadcrumb schema, homepage nie. Strona main nie potrzebuje breadcrumb (jest root), więc to OK — ale jeśli mamy planowane subpages serwisowe, to inny temat.

---

## 2. SPA/SSR Status

| Check | Status |
|---|---|
| Empty root div w dist | ❌ NO (HTML jest renderowany) |
| Dynamic meta tags per route | ✅ YES (title, description, canonical, og) |
| Twitter tags per route | ❌ NO (zawsze homepage values) |
| Correct canonicals per route | ✅ YES |
| Trailing slash consistency | ❌ NO (linki bez slash, server dodaje przez 301) |
| Implementation needed | ❌ N/A (SSG działa) |

**Werdykt**: SSG działa, ale jest leak przez internal links bez trailing slash.

---

## 3. H1 ↔ Title Alignment

| Route | `<title>` | `<h1>` | Status |
|-------|-----------|--------|--------|
| `/` | Wypożyczalnia rowerów Podhale — u Bachledy w Podczerwonem | Wypożyczalnia Rowerów Podhale | ✅ Aligned |
| `/trasy/wokol-tatr/` | Szlak Wokół Tatr — Wypożyczalnia Rowerów u Bachledy | Szlak Wokół Tatr | ✅ Aligned |
| `/trasy/dolina-chocholowska/` | Doliną Chochołowską przez Witów — Wypożyczalnia Rowerów u Bachledy | Doliną Chochołowską przez Witów | ✅ Aligned |
| `/trasy/nowy-targ/` | Trasą główną do Nowego Targu — Wypożyczalnia Rowerów u Bachledy | Trasą główną do Nowego Targu | ✅ Aligned |
| `/trasy/petla-puscizn/` | Pętla Puścizn Czarnodunajeckich — Wypożyczalnia Rowerów u Bachledy | Pętla Puścizn Czarnodunajeckich | ✅ Aligned |

**Summary**: ✅ 5 / 🟡 0 / ❌ 0. Brak wymaganych fixów alignment.

Drobnostka: H1 homepage ma "Rowerów" przez R, body H2 "rowerów" przez r — różnica casing między H1 a body. Świadoma (H1 = brand title-case), ale jeśli chcemy keyword 1:1 match z `wypożyczalnia rowerów Podhale` (lowercase), to H1 powinien też być lowercase. Marginalny impact — zostawiamy.

---

## 4. on-page-seo.md Compliance

### Page: `/` (homepage)

| Sekcja | Status | Failed items |
|---|---|---|
| HEAD/METADATA | ✅ | — |
| URL STRUCTURE | ✅ | root, OK |
| HEADINGS | ⚠️ | Duplicate H2 z BikeSplit (Problem #3) |
| COPY/BODY | ✅ | Primary keyword w pierwszym zdaniu Hero, krótkie akapity, strona czynna |
| FAQ | ❌ | Brak sekcji FAQ — przegapione AIO + FAQPage schema |
| IMAGES | ⚠️ | placeholder logo.png zamiast prawdziwych zdjęć (Issue #7), brak width/height (Issue #9), JPG/PNG zamiast WebP (Issue #8) |
| INTERNAL LINKS | ⚠️ | Trail links bez trailing slash → 301 (Problem #4); breadcrumb N/A na home |
| EXTERNAL LINKS | ❌ | Zero external links do autorytatywnych źródeł (szlakwokoltatr.eu, TPN, gmina-czarny-dunajec.pl) |
| SCHEMA | ⚠️ | BicycleStore z bogatym detail ✅; brak FAQPage (no FAQ section); brak Organization (można merge) |
| E-E-A-T | ❌ | Brak author byline, brak osoby Eli Bachleda jako persona schema |
| ACCESSIBILITY | ⚠️ | Need manual check (kontrast, focus indicators, skip-to-content) |
| MOBILE | ✅ | Tailwind responsive + viewport meta |
| SOCIAL PREVIEW | ⚠️ | og:image = `/photos/hero.jpg` (powinno być 1200×630, sprawdź wymiary) |
| CONVERSION | ✅ | Telefon click-to-call w Hero, multi-CTA, hours, address+map (Contact section) |
| LONG-FORM | N/A | Homepage to landing page, nie blog |
| AI SEARCH (CCV) | ❌ | H2 są stwierdzeniami, nie pytaniami z PAA. Brak "Ile kosztuje wypożyczenie roweru w Podhalu?", "Gdzie wypożyczyć rower elektryczny pod Tatrami?" |
| AI SEARCH (AIO) | ⚠️ | Hero subtitle to nie direct answer w 2-3 zdaniach. Brak TL;DR callout. |
| AI SEARCH (RAG) | ⚠️ | Sekcje BikeSplit/Trails/Pricing są self-contained ✅, ale H2 etykietowe nie pomagają w retrieval |
| AI SEARCH (Schema Coverage) | ⚠️ | Brak `speakable` schema dla voice search; brak `sameAs` linków do GBP profile |
| AI SEARCH (Quotable Claims) | ✅ | Konkretne liczby (50/200/60 PLN, 4.7/60 reviews, 250 km, 4 km, 17 km) — cytowalne |
| AI SEARCH (Citation-Friendly) | ❌ | Brak author + brak data publikacji/aktualizacji |
| AI SEARCH (Internal Graph) | ⚠️ | Linki do `/trasy/*` ✅, ale anchor text "Zobacz trasę" — generic. Powinno być nazwa trasy jako anchor |
| PL-specific (declension) | ✅ | "w Podczerwonem", "z Podczerwonego", "do Krakowa" — poprawne |
| PL-specific (Pan/Pani) | 🟡 | Mix Pan/Pani i Ty (świadoma decyzja klienta po linter revercie About.jsx + Trails.jsx) |
| PL-specific (banned phrases) | ✅ | Brak "kompleksowy", "innowacyjny", "najwyższa jakość" |

### Page: `/trasy/<slug>/` (trail pages)

| Sekcja | Status | Notes |
|---|---|---|
| HEAD/METADATA | ⚠️ | twitter:* nie aktualizowane (Issue #5); duplikat keyword (Issue #6) |
| URL STRUCTURE | ✅ | krótki slug, kebab-case, brak polskich znaków |
| HEADINGS | ✅ | 1× H1 per page |
| SCHEMA | ⚠️ | BreadcrumbList ✅, ale brak `Article` lub `TouristTrip` schema dla trasy |
| AI SEARCH | ⚠️ | Trail content jest opisowy, nie ma FAQ ani direct answers |

---

## 5. Sitemap & robots.txt

| Item | Status |
|---|---|
| `sitemap.xml` | ❌ MISSING (Critical Problem #1) |
| `robots.txt` | ❌ MISSING (Critical Problem #2) |
| Domain | https://www.rowerybachleda.pl/ (z entry-server.jsx) — **TODO weryfikacja czy faktycznie zaregistrowana** |

Sitemap zawierałby 5 URL:
- `https://www.rowerybachleda.pl/`
- `https://www.rowerybachleda.pl/trasy/wokol-tatr/`
- `https://www.rowerybachleda.pl/trasy/dolina-chocholowska/`
- `https://www.rowerybachleda.pl/trasy/nowy-targ/`
- `https://www.rowerybachleda.pl/trasy/petla-puscizn/`

---

## 6. Competitor Technical/Content Gaps

Analiza top 5 wypożyczalni rowerów na Szlaku Wokół Tatr (z `references/stats.md`):

| Competitor | Schema strength | Content depth | Gaps for us |
|---|---|---|---|
| velodunajec.pl | LocalBusiness + sieć 11 punktów | Każdy punkt = osobna landing page | Brak sieci punktów (jeden adres) — przewaga: "wsiadasz prosto z naszego parkingu" |
| startvelo.pl | LocalBusiness + Service per usługa | ~1500 słów per page | Mobilna wypożyczalnia z dowozem — gap: my nie mamy dowozu |
| rowerychocholowska.pl | LocalBusiness | ~800 słów | Jednolokalizacyjny, ale fokus tylko na Dolinę Chochołowską — gap: my obsługujemy wszystkie kierunki |
| bikeowo.pl (Łopuszna) | LocalBusiness | ~600 słów | Wschodni Podhale, my mamy zachodni → różny rynek |
| kosmalbike.pl (Czorsztyn) | LocalBusiness | ~500 słów | Czorsztyn — daleko od nas |

**Technical/Content gaps przeciwko top 3**:
- ❌ Brak FAQ section (większość konkurentów ma)
- ❌ Brak blog (zgodnie z decyzją klienta — single-page strategy)
- ❌ Brak galerii zdjęć rowerów (tylko logo.png placeholders)
- ❌ Brak "porównanie tras" / comparison table
- ✅ Mamy mocniejsze schema niż większość (aggregateRating, hasOfferCatalog)
- ✅ Mamy więcej tras opisanych niż większość konkurentów (4 dedykowane trail pages)

**Keywords gaps** → handed off do `/seed-client-seo` (out of scope tego skilla).

---

## 7. Quick Wins (top 10 po ROI)

| # | Issue | Effort | Impact | Action |
|---|---|---|---|---|
| 1 | Brak sitemap.xml | 15 min | 🔥🔥🔥 | Wygeneruj `public/sitemap.xml` ze `getRoutes()` w prerender.js |
| 2 | Brak robots.txt | 5 min | 🔥🔥🔥 | Utwórz `public/robots.txt` z sitemap reference |
| 3 | Internal links bez `/` → 301 chain | 10 min | 🔥🔥🔥 | Dodaj trailing slash w 4 plikach (Trails.jsx:9, Nav.jsx:33,132, Trail.jsx:179) |
| 4 | Duplicate H2 z BikeSplit | 20 min | 🔥🔥 | Refactor BikeSplit.jsx — render titleBlock raz, użyj order CSS |
| 5 | Trail pages — twitter tags nie per route | 15 min | 🔥🔥 | Rozszerz updateMetaTags() w prerender.js o twitter:title + twitter:description |
| 6 | Keywords duplikat na trail pages | 5 min | 🔥 | Dedupe w entry-server.jsx:23 (lub usuń meta keywords w ogóle) |
| 7 | Brak FAQ section + FAQPage schema | 60 min | 🔥🔥 | Dodaj sekcję FAQ na homepage (4-6 pytań z PAA: ceny, godziny, rezerwacja, kask, dzieci, parking) |
| 8 | Placeholder /logo.png na produktach | wymaga zdjęć od klienta | 🔥🔥🔥 | Klient dostarcza foto rowerów + atrakcji; my konwertujemy do WebP |
| 9 | Brak Hero direct-answer (AIO) | 15 min | 🔥 | Skróć Hero subtitle do 2-3 zdań które są kompletną odpowiedzią |
| 10 | H2 etykietowe zamiast pytań (CCV) | 30 min | 🔥 | Przeformułuj 2-3 H2 na pytania PAA ("Ile kosztuje?", "Co znajdę?") |

---

## 8. Hand-offs (next steps in pipeline)

- **Brak GBP audit / Maps Pack / citations** → użyj `/local-seo-optimizer` (krok 6 pipeline'u Tryb A)
- **Keywords gap (np. "wypożyczalnia rowerów elektrycznych Nowy Targ", "rower z dowozem Podhale")** → użyj `/seed-client-seo` żeby dodać do `seo/service_keywords.md` jako Proposed
- **FAQ content writing** → user może pisać manualnie lub odpalić `/write-blog-post` z keyword "ile kosztuje wypożyczenie roweru Podhale" i wziąć FAQ section jako insertion do homepage
- **Photos provisioning (Issue #7, #8)** → manual workflow: klient dostarcza foto, my konwertujemy

---

## 9. Compliance score

**~62/80 punktów** klasycznej listy on-page-seo.md.

Po fixach Quick Wins #1-#10 → ~75/80 (brakujące 5 punktów to: zdjęcia od klienta + accessibility manual audit + speakable schema + author/Person + galeria/comparison).
