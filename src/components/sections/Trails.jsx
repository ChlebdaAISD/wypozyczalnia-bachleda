import { Link } from 'wouter'
import { ArrowRight, Mountain } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { TRAILS } from '../../data/content.js'

function TrailCard({ trail }) {
  return (
    <Link
      href={`/trasy/${trail.slug}`}
      className="trail-card lift-on-hover fade-up bg-white block group snap-start shrink-0 w-[78%] sm:w-[55%] md:w-auto"
    >
      <div className="h-1.5" style={{ background: trail.bg }} />
      <div className="p-6 pt-7 flex flex-col h-full">
        <div className="flex items-center justify-between mb-3">
          <div className="eyebrow-label text-bachleda-charcoal/70 text-[10px]">{trail.eyebrow}</div>
          <Mountain size={14} strokeWidth={1.5} className="text-bachleda-charcoal/40" />
        </div>
        <h3 className="font-serif-display text-[20px] leading-[1.2] min-h-[48px]">{trail.title}</h3>
        {trail.short && (
          <p className="mt-3 text-[12px] leading-[1.55] text-bachleda-charcoal/65 line-clamp-2">
            {trail.short}
          </p>
        )}
        <div className="mt-auto pt-5 border-t border-black/10 grid grid-cols-2 gap-y-3 text-[11px] tracking-wider uppercase text-bachleda-charcoal/70">
          <div>
            <div className="opacity-60 text-[9px]">Dystans</div>
            <div className="mt-0.5 font-semibold">{trail.distance}</div>
          </div>
          <div>
            <div className="opacity-60 text-[9px]">Czas</div>
            <div className="mt-0.5 font-semibold">{trail.time}</div>
          </div>
        </div>
        <div className="mt-5 inline-flex items-center gap-2 text-[11px] tracking-[.2em] uppercase font-medium text-bachleda-green group-hover:gap-3 transition-all">
          Zobacz trasę
          <ArrowRight size={12} strokeWidth={2} />
        </div>
      </div>
    </Link>
  )
}

export function Trails() {
  return (
    <section id="trasy" className="bg-bachleda-forest text-white relative overflow-hidden">
      <div className="section-pad max-w-[1240px] mx-auto px-6 lg:px-10">
        <div className="fade-up">
          <SectionHeading
            eyebrow="Szlak #1 w Polsce"
            light
            intro="Szlak Wokół Tatr opasuje całe pasmo — z Polski do Słowacji i z powrotem. Asfaltowe ścieżki, pełna infrastruktura, panorama Tatr przez 70% trasy. Wsiadasz prosto z naszego parkingu, bez przepakowywania."
          >
            250 km przygody przez dwa kraje
          </SectionHeading>
        </div>

        <div className="mt-14 -mx-6 lg:mx-0 lg:px-0">
          <div className="flex md:grid md:grid-cols-4 gap-4 lg:gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none px-6 lg:px-0 pb-4 md:pb-0 scrollbar-hide">
            {TRAILS.map((trail) => (
              <TrailCard key={trail.title} trail={trail} />
            ))}
          </div>
          <div className="md:hidden text-center mt-3 text-[10px] tracking-[.25em] uppercase text-white/45">
            ← przesuń →
          </div>
        </div>
      </div>
    </section>
  )
}
