import { useState } from 'react'
import { Phone } from 'lucide-react'
import { Eyebrow } from '../ui/Eyebrow.jsx'
import { Divider } from '../ui/Divider.jsx'
import { Lightbox } from '../Lightbox.jsx'
import { CONTACT, EVENTS_GRID } from '../../data/content.js'

export function Events() {
  const [lbIndex, setLbIndex] = useState(null)

  return (
    <section id="imprezy" className="bg-bachleda-cream border-t border-black/10">
      <div className="section-pad max-w-[1240px] mx-auto px-6 lg:px-10">
        <div className="text-center max-w-[600px] mx-auto fade-up">
          <Eyebrow>Urodziny · Ogniska · Grill</Eyebrow>
          <h2 className="font-handwritten text-[60px] md:text-[84px] leading-[.95] mt-4">
            Świętuj u Bachledy
          </h2>
          <Divider />
          <p className="text-[15px] leading-[1.75] text-bachleda-charcoal/70">
            Po przejażdżce zostań na dłużej. Mamy zadaszone miejsce na ognisko, grill z kiełbaskami od miejscowego masarza i dmuchaniec dla najmłodszych. Organizujemy urodziny, wieczory firmowe i rodzinne pikniki.
          </p>
        </div>

        <div className="mt-16 -mx-6 lg:mx-0 lg:px-0">
          <div className="flex md:grid md:grid-cols-4 gap-3 md:gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none px-6 lg:px-0 pb-4 md:pb-0 scrollbar-hide max-w-[920px] mx-auto">
            {EVENTS_GRID.map((item, i) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setLbIndex(i)}
                aria-label={`Powiększ zdjęcie: ${item.label}`}
                className="lift-on-hover bg-bachleda-soft-gray flex items-center justify-center p-4 cursor-zoom-in overflow-hidden snap-start shrink-0 w-[55%] sm:w-[42%] md:w-auto aspect-square"
              >
                <img
                  src={item.image}
                  alt={item.label}
                  loading="lazy"
                  className="max-w-[60%] max-h-[60%] object-contain opacity-90"
                />
              </button>
            ))}
          </div>
          <div className="md:hidden text-center mt-2 text-[10px] tracking-[.25em] uppercase text-bachleda-charcoal/45">
            ← przesuń →
          </div>
        </div>

        <div className="mt-16 text-center">
          <a href={CONTACT.phoneTel} className="btn-primary">
            Zadzwoń — {CONTACT.phone}
            <Phone size={14} strokeWidth={2} />
          </a>
          <div className="mt-5 signature-accent">na grilla zapraszamy każdy weekend</div>
        </div>
      </div>

      <Lightbox
        images={EVENTS_GRID}
        openIndex={lbIndex}
        onClose={() => setLbIndex(null)}
        onNavigate={setLbIndex}
      />
    </section>
  )
}
