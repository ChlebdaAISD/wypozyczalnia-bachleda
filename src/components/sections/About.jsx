import { Eyebrow } from '../ui/Eyebrow.jsx'
import { Divider } from '../ui/Divider.jsx'

export function About() {
  return (
    <section id="o-nas" className="bg-bachleda-cream border-t border-black/10">
      <div className="section-pad max-w-[760px] mx-auto px-6 lg:px-10">
        <div className="text-center fade-up">
          <Eyebrow>O nas</Eyebrow>
          <h2 className="font-serif-display text-[34px] md:text-[42px] leading-[1.1] mt-5">
            Wypożyczalnia Rowerów u Bachledy
          </h2>
          <Divider />

          <p className="text-[15px] leading-[1.75] text-bachleda-charcoal/80">
            Wypożyczalnia Rowerów u Bachledy leży u podnóża Tatr w malowniczej miejscowości Podczerwone, w Kotlinie Orawsko-Nowotarskiej. Oferujemy rowery dobrej klasy, parking i punkt gastronomiczny. Jesteśmy bezpośrednio przy Szlaku Wokół Tatr — ścieżce rowerowej prowadzącej przez polskie i słowackie miejscowości — obok zabytkowej stacji kolejowej w Podczerwonem.
          </p>

          <p className="mt-5 text-[15px] leading-[1.75] text-bachleda-charcoal/80">
            Podczerwone to znakomita baza wypadowa do wycieczek rowerowych po Podhalu i na Słowację. U nas zostawisz samochód, wypożyczysz rower i aktywnie spędzisz czas, podziwiając przyrodę, torfowiska, lasy oraz panoramę Tatr, Gorców i Babiej Góry.
          </p>

          <p className="mt-5 text-[15px] leading-[1.75] text-bachleda-charcoal/80">
            W naszym punkcie gastronomicznym smacznie zjesz regionalnych przysmaków — kaszankę, swojską kiełbasę, oscypka z żurawiną — albo napijesz się dobrej kawy w towarzystwie pysznej szarlotki czy sernika.
          </p>

          <p className="mt-5 text-[15px] leading-[1.75] text-bachleda-charcoal/80">
            Organizujemy też imprezy okolicznościowe dla dzieci i dorosłych — urodziny, ogniska, grilla. Na najmłodszych czeka dmuchaniec.
          </p>

          <div className="mt-8 signature-accent text-bachleda-charcoal/70">
            Parking dla wypożyczających ✦ zostaw auto, ruszaj rowerem
          </div>
        </div>
      </div>
    </section>
  )
}
