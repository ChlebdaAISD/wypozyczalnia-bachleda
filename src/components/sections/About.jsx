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
            Oferujemy rowery dobrej klasy, parking i punkt gastronomiczny. Jesteśmy zlokalizowani na granicy Podczerwonego i Czarnego Dunajca, tuż obok malowniczej ścieżki rowerowej — Szlaku Wokół Tatr, przebiegającego przez polskie i słowackie miejscowości.
          </p>

          <p className="mt-5 text-[15px] leading-[1.75] text-bachleda-charcoal/80">
            U nas możesz zostawić samochód, wypożyczyć rower i aktywnie spędzić czas, podziwiając przyrodę, torfowiska, lasy oraz panoramę Tatr, Gorców i Babiej Góry.
          </p>

          <p className="mt-5 text-[15px] leading-[1.75] text-bachleda-charcoal/80">
            Organizujemy też imprezy okolicznościowe dla dzieci i dorosłych — urodziny, ogniska, grilla. Na najmłodszych czeka dmuchaniec.
          </p>

          <div className="mt-8 signature-accent text-bachleda-charcoal/70">
            Kask zawsze gratis ✦ parking dla wypożyczających
          </div>
        </div>
      </div>
    </section>
  )
}
