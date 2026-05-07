import { MapPin } from 'lucide-react'
import { Eyebrow } from '../ui/Eyebrow.jsx'
import { Divider } from '../ui/Divider.jsx'
import { INSPIRATION } from '../../data/content.js'

function InspirationCard({ item }) {
  return (
    <article className="bg-white lift-on-hover fade-up snap-start shrink-0 w-[70%] sm:w-[48%] md:w-auto">
      <div className="h-1.5" style={{ background: item.bg }} />
      <div className="p-6 pt-7 text-center">
        <MapPin size={16} strokeWidth={1.5} className="text-bachleda-charcoal/40 mx-auto" />
        <div className="mt-4">
          <Eyebrow>{item.eyebrow}</Eyebrow>
        </div>
        <h3 className="font-serif-display text-[19px] mt-3 leading-[1.3]">{item.title}</h3>
        <div className="mt-3 text-[11px] tracking-[.2em] uppercase text-bachleda-charcoal/50">
          {item.meta}
        </div>
      </div>
    </article>
  )
}

export function Inspiration() {
  return (
    <section className="bg-bachleda-soft-gray">
      <div className="section-pad max-w-[1240px] mx-auto px-6 lg:px-10">
        <div className="text-center fade-up">
          <Eyebrow>Atrakcje w okolicy</Eyebrow>
          <h2 className="font-serif-display text-[34px] sm:text-[42px] md:text-[48px] leading-[1.05] mt-4 max-w-[640px] mx-auto">
            Co odwiedzić rowerem
          </h2>
          <Divider />
        </div>

        <div className="mt-12 -mx-6 lg:mx-0 lg:px-0">
          <div className="flex md:grid md:grid-cols-4 gap-4 lg:gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none px-6 lg:px-0 pb-4 md:pb-0 scrollbar-hide">
            {INSPIRATION.map((item) => (
              <InspirationCard key={item.title} item={item} />
            ))}
          </div>
          <div className="md:hidden text-center mt-3 text-[10px] tracking-[.25em] uppercase text-bachleda-charcoal/45">
            ← przesuń →
          </div>
        </div>
      </div>
    </section>
  )
}
