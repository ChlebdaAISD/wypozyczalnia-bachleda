# Voice — Wypożyczalnia Rowerów u Bachledy

> **NIE jest to samodzielny plik.** Bazą głosu dla każdej treści jest `.claude/rules/tone-of-voice.md` (master TOV). Ten plik zawiera **tylko dane specyficzne dla Wypożyczalni Rowerów u Bachledy** — autor, język, banned words klienta, ulubione zwroty.
>
> Każdy skill generujący treść (`write-blog-post`, `write-service-page`) czyta NAJPIERW master TOV, POTEM ten plik. Reguły craftu (rytm zdań, anti-AI checklist, banned phrases ogólne, frameworki AIDA/PAS/4C/FAB) są w master — nie powtarzamy tu.

---

## Kto pisze (Author byline)

**Ela Bachleda**
Właścicielka Wypożyczalni Rowerów u Bachledy w Podczerwonem.
TODO: lata doświadczenia / kiedy uruchomiła wypożyczalnię (uzupełnij po rozmowie z klientką).
Pracuje w Podczerwonem (gmina Czarny Dunajec, Małopolska) — bezpośrednio przy Szlaku Wokół Tatr.

**Bio (2-3 zdania na stopkę bloga):**
Ela Bachleda prowadzi wypożyczalnię rowerów w Podczerwonem, na granicy z Czarnym Dunajcem — dosłownie przy Szlaku Wokół Tatr. Z mężem i rodziną wita gości od rana do wieczora: rower, kask gratis, parking, domowe wypieki, ognisko dla rodzin. Zna każdą trasę w okolicy z pierwszej ręki, bo sama ją jeździła.

**Styl autora (jak rozmawia z gościem przy ladzie wypożyczalni):**
Ciepły, gospodarski, konkretny. Mówi po polsku formalnie (Pan/Pani), ale ze szczerym uśmiechem i regionalnym akcentem. Doradza jak komuś z rodziny — "Państwo z dziećmi? To proszę nie ten elektryk, na taką trasę spokojnie wystarczą klasyki, a riksza dla maluchów". Nie sprzedaje ile wlezie — czasem mówi "na tę trasę nie potrzebują Państwo elektrycznego, klasyk się sprawdzi".

> Ten styl jest tym, co odróżnia treści od konkurencji. Master TOV daje strukturę i jakość — ten plik daje **głos góralskiej gospodyni**, nie korporacji.

---

## Język

`language: pl-formal`

- Zawsze Pan/Pani/Państwo (master TOV § 3 reguła 7)
- "Prosimy o kontakt", "zachęcamy do rezerwacji", "zapraszamy"
- Wyjątek: cytowanie testimoniali — zostawiamy oryginalny styl klienta (mogą być na "Ty")

---

## Banned words klienta (uzupełniają master)

**Master TOV § 5 zawiera bazę banned phrases (dla wszystkich klientów).** Tutaj dodajemy specyficzne dla branży wynajmu rowerów / turystyki rowerowej:

- "ekstremalne" / "ekstremalnie" — nasze trasy są dla rodzin, nie dla profesjonalistów
- "tani", "najtaniej", "budżetowy" — pozycjonujemy się na jakość + lokalizację, nie cenę
- "mountainbike" / "MTB" jako rzeczownik o naszej ofercie — nie mamy MTB, mamy klasyczne trekingowe + elektryczne
- "rentownie", "biznesowo" — nie korporacyjny ton
- "innowacyjny system rezerwacji" itd. — rezerwacja to telefon, nie wymyślamy korpo-feature'ów

> Format: jedna linia per fraza.

---

## Ulubione zwroty / words we lean into

Frazy, które chętnie powtarzamy w treściach Wypożyczalni Rowerów u Bachledy:

- "kask zawsze w cenie" / "kask gratis dla każdego" — to nasz standardowy trust signal
- "wsiadasz prosto z parkingu na trasę" — unique selling point lokalizacji
- "po nasypie dawnej linii kolejowej" — opowiadamy historię trasy (Nowy Targ – Sucha Góra)
- "panorama Tatr, Gorców i Babiej Góry" — co widzimy z trasy
- "domowe wypieki", "regionalna kuchnia", "kiełbaska z grilla"
- "ognisko dla rodzin", "dmuchaniec dla dzieci"
- "Szlak Wokół Tatr — 250 km przez dwa kraje" — świetna kotwica edukacyjna
- "Państwo z dziećmi", "Państwo z rodziną" — domyślny target

---

## Specyficzne dla branży wynajem rowerów / turystyka (opcjonalne)

- **Sezonowość**: w treściach zaznaczamy "sezon kwiecień-październik" (TODO: doprecyzować z klientką), a poza sezonem zachęcamy do rezerwacji telefonicznej
- **Bezpieczeństwo**: zawsze podkreślamy kask gratis + sprawdzony serwis sprzętu
- **Pogoda**: trasa działa "cały rok" tylko jeśli ścieżka nie jest oblodzona — w tekstach zaznaczamy "od kwietnia, gdy ścieżka jest sucha"
- **Dystans w czasie, nie tylko w km**: dla początkujących "30 minut do Czarnego Dunajca" jest bardziej zrozumiałe niż "4 km"
- **Przestrzegamy regulacji TPN**: wjazd do Doliny Chochołowskiej tylko do schroniska + bilet 11 zł/os.
- **Nie obiecujemy czego nie mamy**: nie mamy MTB enduro, nie wozimy klientów, nie organizujemy serwisu rowerów własnych klientów (tylko swoich)

---

## Stories i opinions

Stories i opinions klienta są w osobnych plikach (jeśli klient ma):
- `stories.md` — **brak na ten moment** (klient nie podał anegdot — można dograć później)
- `opinions.md` — **brak na ten moment** (klient nie ma jeszcze sformułowanych mocnych opinii branżowych)
- `humour.md` — **istnieje** (ciepły, regionalny, gospodarski humor)

Skille generujące treść mają instrukcję: **w każdym blog postcie wpleść 1 testimonial z stats.md (mamy 4 prawdziwe z Google) + max 1 element regionalnego humoru z humour.md**.

---

## One-line summary (specyficzne dla Wypożyczalni Rowerów u Bachledy)

**Ela pisze tak, jak wita gościa przy ladzie: ciepło, konkretnie, z liczbą z `stats.md`, z lokalną wiedzą "byłam tam, jeżdżę tę trasę co tydzień", bez korpo-bełkotu. Master TOV daje craft, ten plik daje głos góralskiej gospodyni.**
