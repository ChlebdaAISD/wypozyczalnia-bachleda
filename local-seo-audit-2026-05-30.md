# LOCAL SEO AUDIT — Wypożyczalnia Rowerów u Bachledy

**Business**: Wypożyczalnia Rowerów u Bachledy
**Location**: Podczerwone, 34-470 Czarny Dunajec (woj. małopolskie)
**Primary keyword**: „wypożyczalnia rowerów Podhale"
**Website**: https://www.rowerybachleda.pl/ (live, SSG/Cloudflare Pages)
**GBP CID**: 2654526557874326085 · Place ID: ChIJ16OSW6jpFUcRRYrwENfF1iQ
**Date**: 2026-05-30
**Data source**: Google Places API (New) — live fetch, nie ręczne przeglądanie

---

## Executive Summary

**Pozycja w Maps Pack**: silna na zapytania proximity (Czarny Dunajec / Podczerwone / zachodnia pętla Szlaku Wokół Tatr), słaba na regionalne „Podhale" / „Nowy Targ" (przegrywa z klastrem nowotarskim).

**Najmocniejszy atut**: **57 opinii / 4.7** — to **więcej opinii niż którykolwiek konkurent NA samym szlaku** (Bike'owo 9, E-Bike Podhale 27). Plus unikalny pakiet: parking + grill bar + lokalizacja dosłownie na trasie.

**Główny problem**: profil GBP jest **niedopracowany** mimo dobrej bazy opinii — generyczna kategoria, puste atrybuty, brak opisu. To zostawia darmowy ranking na stole.

**Krytyczne (ten tydzień)**:
1. 🔴 Schema `reviewCount` = 60, a GBP ma realnie **57** → liczba zawyżona (niemożliwa), do poprawy
2. 🔴 Kategoria główna GBP prawdopodobnie generyczna („Services") → ustawić **„Wypożyczalnia rowerów"**
3. 🔴 Atrybuty GBP puste (parking, płatności, udogodnienia) → uzupełnić wszystkie

**Quick wins (ten tydzień)**: kategoria + atrybuty + opis GBP + odpowiedź na opinię 1★ = najtańszy boost relewancji w Maps Pack.

**Realistyczny timeline**: 4-8 tygodni do widocznej poprawy na proximity terms; „Podhale"/„Nowy Targ" — realnie nieosiągalne #1 wobec Decathlon (608 opinii) i Start Velo (379). **Strategia: zdominować zachodnie Podhale, nie walczyć o Nowy Targ.**

**Hand-offs**:
- Fix schema rating (kod) → trywialna edycja `index.html` (mogę zrobić od ręki) lub build-time fetch
- Brakujące keywordy proximity (Chochołów, Witów, Dolina Chochołowska, Czarny Dunajec) → `/seed-client-seo` (weryfikacja) → `/write-blog-post`
- Technical SEO (sitemap/SSR/canonical) → `/seo-analyzer` (poza zakresem tego audytu)

---

## 1. Google Business Profile — status

### ✅ Mocne strony
- **NAP zgodny** ze stroną: nazwa, telefon (+48 697 274 778), geo (0 m różnicy) — wszystko MATCH
- **57 opinii / 4.7** — najwięcej spośród wypożyczalni NA szlaku
- `businessStatus`: OPERATIONAL
- Godziny: komplet 7/7 dni (10:00–19:00), zgodne ze schema
- `websiteUri` wskazuje na właściwą domenę (rowerybachleda.pl), nie na Facebooka

### ❌ Krytyczne luki

**Issue #1 — Kategoria główna prawdopodobnie generyczna**
- API zwraca `primaryType: "service"` → display **„Services"**. Dla porównania Decathlon zwraca „Sporting Goods Store", Bike'owo „Sports Club" — czyli API potrafi oddać konkretną kategorię, gdy jest ustawiona.
- **Uwaga metodologiczna**: Places API czasem mapuje kategorię na generyczny top-level. Zanim zmienisz — **przyślij screen z panelu GBP** („Informacje o firmie" → Kategoria). Jeśli faktycznie jest generyczna:
- **Fix**: kategoria główna = **„Wypożyczalnia rowerów"** (Google: *Bicycle rental service*). To **najważniejszy pojedynczy sygnał relewancji** dla Maps Pack.
- Impact: WYSOKI

**Issue #2 — Atrybuty GBP puste**
- API nie zwrócił żadnych atrybutów (`parkingOptions`, `paymentOptions`, `accessibilityOptions`, `goodForChildren`, `restroom`). Strona reklamuje darmowy parking i foteliki dziecięce — w GBP tego nie ma.
- **Fix**: uzupełnić: bezpłatny parking, płatności (gotówka/karta/BLIK — potwierdź z Elą), udogodnienia dla rodzin z dziećmi, toaleta, jedzenie na miejscu.
- Impact: WYSOKI (atrybuty = filtry w Maps + sygnały relewancji)

**Issue #3 — Brak opisu firmy (`editorialSummary` puste)**
- **Fix**: opis ~750 znaków z naturalnymi keywordami: „wypożyczalnia rowerów Podhale", „Podczerwone", „Szlak Wokół Tatr", „rowery elektryczne". Wpleść grill bar + parking jako wyróżniki.
- Impact: ŚREDNI

### ⚠️ Do poprawy
- **Zdjęcia**: API zwraca 10 (to jego limit, nie realna liczba). Zweryfikuj w panelu — **cel 20+**, dokładaj 2-3/mies. Typy: front/szyld, wnętrze, rowery (klasyk + e-bike + riksza), grill bar + jedzenie, szlak, rodziny w akcji.
- **Posty GBP**: brak danych o aktywności → wrzucaj **2-4/mies.** (start sezonu rowerowego — promuj ogniska, grill, e-bike, krokusy w Dolinie Chochołowskiej wiosną).
- **Druga tożsamość = druga pula**: miejsce to wypożyczalnia **i** grill bar (opinie masowo chwalą jedzenie). Dodaj kategorie dodatkowe (patrz sekcja 8) — szansa na ranking w drugiej, słabo obstawionej kategorii na szlaku.

---

## 2. Analiza konkurencji (Maps Pack — dane z Places API, 2026-05-30)

| Firma | Lokalizacja | Kategoria (API) | Ocena | Opinie | Strona |
|---|---|---|---:|---:|---|
| **u Bachledy** | Podczerwone (Czarny Dunajec) | Services | 4.7 | **57** | ✓ rowerybachleda.pl |
| Bike'owo | Łopuszna (~25 km) | Sports Club | 5.0 | 9 | ✗ brak |
| E-Bike Podhale | Nowy Targ, Oleksówki (~17 km) | Services | 4.7 | 27 | ✓ ebikepodhale.pl |
| Lightbikes | Nowy Targ, Smrekowa | Services | 5.0 | 72 | ✓ lightbikes.pl |
| Start Velo | Harklowa | Services | 4.9 | 379 | ✓ startvelo.pl |
| Decathlon Rent | Nowy Targ, Szaflarska | Sporting Goods Store | 4.8 | 608 | ✓ |

### Wnioski strategiczne
- **Na szlaku (zachodnie Podhale) u Bachledy prowadzi opiniami** — Bike'owo (9) i E-Bike Podhale (27) są daleko z tyłu. To realny obszar dominacji.
- **Na „Podhale"/„Nowy Targ" u Bachledy jest outgunned** — Decathlon (608), Start Velo (379), Lightbikes (72) to inny ciężar wagowy, w dodatku bliżej centrum Nowego Targu (proximity gra przeciwko nam na te terminy).
- **Decathlon i Bike'owo mają poprawnie ustawione konkretne kategorie** — u Bachledy „Services" to przewaga, którą konkurent zostawił do wzięcia za darmo.
- **Bike'owo nie ma strony WWW** — u Bachledy ma stronę + 6× więcej opinii → na proximity terms w okolicy Łopusznej/Czarnego Dunajca powinno wygrywać.

### Jak konkurować
Nie wydawaj energii na „wypożyczalnia rowerów Podhale" (przegrana z Nowym Targiem). **Zdominuj**: Czarny Dunajec, Podczerwone, Chochołów, Witów, **zachodnią pętlę Szlaku Wokół Tatr** i **Dolinę Chochołowską** — tam proximity + 57 opinii + grill bar = realne #1.

---

## 3. Weryfikacja strony (GBP ↔ Website)

### 3a. Auto-diff (Places API ↔ live site)

**Summary**: Match 3 | Mismatch 1 | Partial 1 | Missing 0 | Top severity: **HIGH**

| Pole | GBP | Website (schema) | Status | Severity |
|---|---|---|---|---|
| name | Wypożyczalnia Rowerów u Bachledy | = | MATCH | OK |
| telephone | 697 274 778 | = | MATCH | OK |
| address | Podczerwone, 34-470 Czarny Dunajec | Podczerwone / 34-470 / Czarny Dunajec | PARTIAL | MEDIUM (tylko formatowanie) |
| **aggregateRating** | **4.7 / 57** | **4.7 / 60** | **MISMATCH** | **HIGH** |
| geo | 49.4151132, 19.836402 | = | MATCH (0 m) | OK |
| websiteUri_target | rowerybachleda.pl/ (homepage) | — | INFO | MEDIUM |

**Diff-driven fix**:
- 🔴 **`reviewCount` 60 → 57** w `index.html` (JSON-LD). Liczba 60 > 57 jest niemożliwa = sygnał stale/zawyżonej liczby (ryzyko utraty rich snippet w Google). **Lepiej**: build-time fetch z Places API (wzorzec `AI_Solutions_Design_v2/script/fetch-google-rating.ts`) — wtedy liczba nigdy nie zdrYfuje. Projekt nie ma jeszcze takiego skryptu.
- `websiteUri` → homepage jest OK (single-page site, nie ma dedykowanych landing).

### 3b. Checki semantyczne (manual)

| Element | Status | Uwagi |
|---|---|---|
| Embedded Google Map | ✓ | iframe w `Contact.jsx` (CONTACT.mapsEmbed) |
| Wzmianki o mieście (content.js) | ✓ mocne | Podczerwone ×12, Czarny Dunajec ×15, Nowy Targ ×8, Szlak Wokół Tatr ×5 |
| Landmarki w treści | ✓ | most kolejowy, stacja, rzeka, Dolina Chochołowska, Sanktuarium Ludźmierz |
| Odmiana nazw miejscowości | ✓ | „w Podczerwonem", „w Nowym Targu", „z Podczerwonego" — poprawnie |
| LocalBusiness JSON-LD | ✓ obecny | typ `LocalBusiness`, hours/geo/offerCatalog/areaServed kompletne |
| Service-area na stronie | ✓ | areaServed: Podczerwone, Czarny Dunajec, Podhale, Nowy Targ, Chochołów, Witów |

**On-site lokalnie jest bardzo dobre** — problem leży po stronie GBP, nie kodu.

### ⚠️ Issue: stara domena `rowery.bachleda.biz` wciąż żyje
- `index.html` (sameAs) + wyniki Google pokazują żywą starą stronę `http://rowery.bachleda.biz/` (z podstroną `/o-nas/`).
- Ryzyko: rozmycie autorytetu / podwójna encja dla tych samych keywordów.
- **Fix**: 301 redirect `bachleda.biz` → `rowerybachleda.pl`, albo usuń ze `sameAs` i upewnij się, że nigdzie nie linkuje konkurencyjnie. GBP już wskazuje na nową domenę ✓.

---

## 4. Opinie i reputacja

**Stan**: 57 opinii / 4.7 ★
**Cel realny**: 75+ opinii / utrzymać 4.7+ (na szlaku to nadal pozycja lidera)
**Benchmark**: lider na szlaku już teraz; do nowotarskiego klastra (Lightbikes 72, Start Velo 379) — gonienie wieloletnie, nie miesięczne.

### Plan zbierania opinii (30 dni)
- **Tydz. 1**: kod QR na ladzie/przy kasie/na rachunku z grill baru → bezpośredni link do opinii Google. Tabliczka „Zostaw opinię" przy wypożyczeniu.
- **Tydz. 2**: prośba ustna przy zwrocie roweru (najwyższa konwersja, dozwolone przez Google — NIE masowy mailing).
- **Tydz. 3**: odpowiedz na **wszystkie** dotychczasowe opinie (w tym **1★ sprzed 10 mies.** — profesjonalnie, z propozycją rozwiązania). Response rate → 100%.
- **Tydz. 4**: zachęć gości do wspominania konkretów: „wypożyczalnia rowerów", „Szlak Wokół Tatr", „e-bike" — keywordy w opiniach boostują relewancję.

### Protokół odpowiedzi
- Pozytywna: podziękuj + powtórz wspomnianą usługę („Cieszymy się, że smakowały domowe wypieki i rowery dowiozły na szlak…").
- Negatywna: empatia + konkret + zaproszenie do kontaktu offline. Bez defensywy.

---

## 5. Cytowania (NAP) i katalogi

### Wykryta obecność (do zweryfikowania/przejęcia)
- ✓ **szlakwokoltatr.eu/miejsce/11** — oficjalny katalog szlaku (NAJWAŻNIEJSZE branżowe cytowanie, super-relewantne)
- ✓ **czarny-dunajec.pl/wypozyczalnie-rowerow** — oficjalna lista gminy (mocny lokalny sygnał)
- ✓ **orlybranzyrowerowej.pl** — profil branżowy
- ✓ **it.nowytarg.pl** — informacja turystyczna Nowy Targ
- ✓ **Facebook**: facebook.com/roweryubachledy

### Niespójność NAP do poprawy
- **Facebook URL**: schema = `facebook.com/roweryubachledy`, content.js/stats = `fb.com/roweryubachledy`. Oba działają (redirect), ale ujednolić do pełnej formy `https://www.facebook.com/roweryubachledy` wszędzie.

### Priorytet (dołożyć)
1. **Panorama Firm** (panoramafirm.pl)
2. **Pkt.pl**
3. **Firmy.net**
4. **Apple Maps** (Apple Business Connect — coraz ważniejsze)
5. Weryfikuj 100% zgodności NAP na każdym (telefon w formacie `+48 697 274 778`, adres „Podczerwone, 34-470 Czarny Dunajec").

---

## 6. Backlinki lokalne (szansa)

**Immediate** (ten miesiąc):
1. **szlakwokoltatr.eu** — upewnij się, że wpis ma link do rowerybachleda.pl (oficjalny, tematyczny dofollow).
2. **Gmina Czarny Dunajec** (czarny-dunajec.pl) — link z listy wypożyczalni.
3. **Noclegi w okolicy** (domkiutopora.pl, Hotel Perła Dunajca, agroturystyki) — partnerstwo „polecamy wypożyczalnię na szlaku" ↔ „polecamy nocleg".

**Medium-term** (3-6 mies.):
- Blogi turystyczne o Szlaku Wokół Tatr / Dolinie Chochołowskiej (guest content / wzmianki).
- Lokalne portale (Podhale24, nowotarski) — notka o starcie sezonu / ogniskach.

---

## 7. Rozszerzenie zasięgu (service area)

Strategia projektu = **single-page SEO** (wszystko w Home.jsx), więc zamiast osobnych service pages → **blog posty** na keywordy proximity/trasowe (informacyjne, niska konkurencja, wspierają stronę główną linkami wewnętrznymi).

**Rekomendowane tematy (z proposed keywords)**:
- Dolina Chochołowska rowerem przez Witów (commercial+informational, sezonowy hit — krokusy)
- Szlak Wokół Tatr z Podczerwonego — przewodnik po etapach
- Wypożyczalnia rowerów elektrycznych na Podhalu — kiedy e-bike, kiedy klasyk
- Trasa do Nowego Targu nasypem kolejowym (rodzinna, łatwa)

### Hand-off
- Weryfikacja volume/KD tych keywordów → `/seed-client-seo`
- Generowanie treści → `/write-blog-post` (per temat)

---

## 8. Plan działania (priorytety)

### 🔴 PRIORYTET 1 — ten tydzień
1. **Schema reviewCount 60 → 57** (`index.html`). *Mogę zrobić od ręki.* Docelowo: build-time fetch.
2. **Kategoria główna GBP → „Wypożyczalnia rowerów"** (najpierw screen z panelu na potwierdzenie obecnej).
3. **Atrybuty GBP**: parking bezpłatny, płatności (gotówka/karta/BLIK), udogodnienia rodzinne, toaleta, jedzenie na miejscu.
4. **Odpowiedz na opinię 1★** + zacznij odpowiadać na wszystkie.

### 🟠 PRIORYTET 2 — ten miesiąc
5. **Kategorie dodatkowe GBP** (do 9): Bar, Restauracja/Grill, Wypożyczalnia rowerów elektrycznych, Atrakcja turystyczna.
6. **Opis GBP** (~750 zn.) z keywordami + grill bar + parking.
7. **Zdjęcia GBP → 20+** (rowery, grill/jedzenie, szlak, rodziny); harmonogram 2-3/mies.
8. **Posty GBP 2-4/mies.** (start sezonu, ogniska, e-bike, Dolina Chochołowska).
9. **System opinii** (QR + prośba przy zwrocie) → cel 75+.
10. **Cytowania**: Panorama Firm, Pkt.pl, Apple Maps; ujednolić Facebook URL.

### 🟡 PRIORYTET 3 — 3 miesiące
11. **301 redirect** `rowery.bachleda.biz` → `rowerybachleda.pl`.
12. **Blog posty** na keywordy trasowe/proximity (przez `/seed-client-seo` → `/write-blog-post`).
13. **Backlinki**: szlakwokoltatr.eu, gmina, partnerstwa noclegowe.

---

## 9. Oczekiwany timeline
- **2 tyg.**: zmiany GBP zaindeksowane, atrybuty/kategoria widoczne.
- **4-8 tyg.**: poprawa pozycji na proximity terms (Czarny Dunajec, Podczerwone, zachodni szlak).
- **3 mies.**: stabilne top 3 na zachodnim Podhalu + drugi pool (gastronomia na szlaku).
- **„Podhale"/„Nowy Targ"**: nierealne #1 wobec Decathlon/Start Velo — nie inwestuj tam.

### Metryki sukcesu
1. Pozycja Maps Pack na proximity terms (sprawdzaj z różnych lokacji).
2. GBP Insights: wyświetlenia, telefony, trasy, kliknięcia strony.
3. Liczba opinii + ocena.
4. Ruch z „near me" w GA4.

---

## Następny krok
1. **Fix schema rating** — powiedz „popraw rating", zrobię edycję `index.html` od ręki.
2. **Przyślij screen kategorii z panelu GBP** — potwierdzę czy faktycznie generyczna.
3. Keywordy trasowe → `/seed-client-seo`, potem `/write-blog-post`.
4. Re-audyt za 4-6 tygodni.
