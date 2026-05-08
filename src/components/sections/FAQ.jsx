import { SectionHeading } from '../ui/SectionHeading.jsx'

export const FAQ_ITEMS = [
  {
    q: 'Ile kosztuje wypożyczenie roweru na Podhalu?',
    a: 'Rower klasyczny (treking): 12 zł za godzinę albo 50 zł za cały dzień. Rower elektryczny (e-bike): 50 zł za godzinę albo 200 zł za cały dzień. Riksza rodzinna na trzy osoby: 12 zł za godzinę albo 60 zł za cały dzień. Kask gratis. Płatność gotówką lub blikiem na miejscu.',
  },
  {
    q: 'Czy potrzebna jest rezerwacja?',
    a: 'Nie, nie rezerwujemy rowerów z wyprzedzeniem.',
  },
  {
    q: 'Czy kask jest w cenie?',
    a: 'Tak, kask zawsze w cenie — dla każdego wypożyczającego, dorosłego i dziecka. Nie sprzedajemy kasków oddzielnie i nie liczymy ich na rachunku.',
  },
  {
    q: 'Czy mogę wypożyczyć rower dla dziecka?',
    a: 'Tak. Mamy siodełka dziecięce dla dzieci od 5 do 22 kg za 10 zł jednorazowo (montowane na rowerze rodzica). Riksza rodzinna mieści dziecko + dwóch dorosłych — idealna gdy dziecko jeszcze za małe na własny rower.',
  },
  {
    q: 'Gdzie dokładnie się znajdujecie?',
    a: 'Podczerwone, gmina Czarny Dunajec — bezpośrednio przy Szlaku Wokół Tatr, obok dawnej stacji kolejowej i mostu kolejowego nad rzeką Czarny Dunajec. Z naszego parkingu wsiada Pan/Pani na rower i rusza prosto na asfaltową trasę po dawnym nasypie kolejowym.',
  },
  {
    q: 'Czy jest parking dla samochodów?',
    a: 'Tak. Dla wypożyczających darmowy. Dla osób bez wynajmu — 10 zł za cały dzień. Parking jest na terenie wypożyczalni, nie trzeba szukać miejsca na drodze.',
  },
  {
    q: 'Jakie są godziny otwarcia?',
    a: 'Codziennie 10:00 — 19:00 w sezonie. Poza sezonem prosimy o wcześniejszy telefon: 697 274 778.',
  },
  {
    q: 'Dokąd dojadę rowerem z Podczerwonego?',
    a: 'Szlak Wokół Tatr to 250 km asfaltu przez Polskę i Słowację. Z naszego parkingu: Czarny Dunajec 4 km (30 min), Sucha Hora — granica PL-SK 4 km, Ludźmierz 14 km, Nowy Targ 17 km, Trstená (Słowacja) 28 km. Doliną Chochołowską przez Witów: pętla 40 km (3-4 h, wjazd do TPN 11 zł od osoby).',
  },
]

export function FAQ() {
  return (
    <section id="faq" className="bg-bachleda-cream border-t border-black/10">
      <div className="section-pad max-w-[860px] mx-auto px-6">
        <div className="fade-up">
          <SectionHeading
            eyebrow="Najczęstsze pytania"
            intro="Zanim Pan/Pani zadzwoni — najpierw to, o co pyta nas większość gości."
          >
            Najczęstsze pytania o wypożyczalnię rowerów na Podhalu
          </SectionHeading>
        </div>

        <div className="mt-14 divide-y divide-black/10">
          {FAQ_ITEMS.map((item) => (
            <div key={item.q} className="py-6 fade-up">
              <h3 className="font-serif-display text-[20px] md:text-[22px] leading-[1.3]">
                {item.q}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.75] text-bachleda-charcoal/75">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
