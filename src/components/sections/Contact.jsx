import { Facebook } from 'lucide-react'
import { Eyebrow } from '../ui/Eyebrow.jsx'
import { Divider } from '../ui/Divider.jsx'
import { CONTACT } from '../../data/content.js'

export function Contact() {
  return (
    <section id="kontakt" className="bg-white border-t border-black/10">
      <div className="split items-stretch">
        <div className="section-pad px-6 lg:px-16 flex items-center justify-center">
          <div className="max-w-[440px] fade-up">
            <Eyebrow>Odwiedź nas</Eyebrow>
            <h2 className="font-serif-display text-[34px] md:text-[42px] leading-[1.1] mt-5">
              Wypożyczalnia rowerów Podczerwone — przy Szlaku Wokół Tatr
            </h2>
            <Divider align="left" />
            <p className="text-[15px] leading-[1.75] text-bachleda-charcoal/70">
              Jesteśmy w Podczerwonem (gmina Czarny Dunajec), bezpośrednio przy Szlaku Wokół Tatr — obok zabytkowej stacji kolejowej i mostu kolejowego nad rzeką Czarny Dunajec. Z naszego parkingu wsiada Pan/Pani na rower i rusza prosto na trasę.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-y-6 gap-x-8 text-[14px]">
              <div>
                <Eyebrow tone="faint" className="mb-2">Adres</Eyebrow>
                <div>
                  {CONTACT.street}<br />
                  obok mostu kolejowego<br />
                  {CONTACT.cityLine}
                </div>
              </div>
              <div>
                <Eyebrow tone="faint" className="mb-2">Godziny</Eyebrow>
                <div>
                  Codziennie<br />
                  10:00 — 19:00
                </div>
              </div>
              <div className="col-span-2">
                <Eyebrow tone="faint" className="mb-2">Telefon</Eyebrow>
                <a href={CONTACT.phoneTel} className="font-serif-display text-[28px] tracking-tight">
                  {CONTACT.phone}
                </a>
              </div>
            </div>

            <div className="mt-8">
              <a
                href={CONTACT.facebook}
                className="text-bachleda-green hover:opacity-80 transition inline-flex items-center gap-2 text-[12px] tracking-[.18em] uppercase font-medium"
              >
                <Facebook size={16} strokeWidth={1.5} />
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="relative min-h-[480px] lg:min-h-full overflow-hidden">
          <iframe
            title="Mapa — Wypożyczalnia Rowerów u Bachledy, Podczerwone 71A"
            src={CONTACT.mapsEmbed}
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
