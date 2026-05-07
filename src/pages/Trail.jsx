import { Link, useRoute } from 'wouter'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Container } from '../components/ui/Container.jsx'
import { Eyebrow } from '../components/ui/Eyebrow.jsx'
import { Divider } from '../components/ui/Divider.jsx'
import { TRAILS, CONTACT } from '../data/content.js'

function NotFound() {
  return (
    <main className="bg-bachleda-cream min-h-[60vh] flex items-center">
      <Container className="text-center py-32">
        <Eyebrow>Trasa nieznaleziona</Eyebrow>
        <h1 className="font-serif-display text-[40px] mt-6">Nie ma takiej trasy</h1>
        <Divider />
        <Link href="/" className="btn-primary mt-6">
          <ArrowLeft size={14} strokeWidth={2} />
          Wróć na stronę główną
        </Link>
      </Container>
    </main>
  )
}

export function Trail() {
  const [, params] = useRoute('/trasy/:slug')
  const trail = TRAILS.find((t) => t.slug === params?.slug)

  if (!trail) return <NotFound />

  const idx = TRAILS.findIndex((t) => t.slug === trail.slug)
  const next = TRAILS[(idx + 1) % TRAILS.length]
  const mapsSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    trail.mapsQuery
  )}&output=embed&z=12`

  return (
    <main className="bg-bachleda-cream">
      <section className="bg-bachleda-forest text-white">
        <Container className="py-16 md:py-24">
          <Link href="/" className="inline-flex items-center gap-2 text-[12px] tracking-[.2em] uppercase text-white/70 hover:text-white mb-10">
            <ArrowLeft size={14} strokeWidth={2} />
            Powrót
          </Link>
          <div className="grid md:grid-cols-[1fr_320px] gap-10 items-end">
            <div>
              <Eyebrow tone="light">{trail.eyebrow}</Eyebrow>
              <h1 className="font-serif-display text-[44px] sm:text-[56px] md:text-[68px] leading-[1.05] mt-6">
                {trail.title}
              </h1>
              <p className="mt-6 text-white/80 text-[16px] md:text-[18px] leading-[1.7] max-w-[640px]">
                {trail.short}
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-y-5 text-[12px] tracking-[.2em] uppercase">
              <div>
                <dt className="opacity-60 text-[10px]">Dystans</dt>
                <dd className="mt-1 font-semibold">{trail.distance}</dd>
              </div>
              <div>
                <dt className="opacity-60 text-[10px]">Czas</dt>
                <dd className="mt-1 font-semibold">{trail.time}</dd>
              </div>
              <div>
                <dt className="opacity-60 text-[10px]">Poziom</dt>
                <dd className="mt-1 font-semibold">{trail.level}</dd>
              </div>
              <div>
                <dt className="opacity-60 text-[10px]">Nawierzchnia</dt>
                <dd className="mt-1 font-semibold">{trail.surface}</dd>
              </div>
              <div className="col-span-2">
                <dt className="opacity-60 text-[10px]">Opłaty</dt>
                <dd className="mt-1 font-semibold">{trail.fee}</dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="prose-trail max-w-[560px]">
              <Eyebrow>O trasie</Eyebrow>
              <h2 className="font-serif-display text-[28px] md:text-[34px] leading-[1.15] mt-4">
                Co zobaczysz po drodze
              </h2>
              <Divider />
              <div className="space-y-5 text-[15px] md:text-[16px] leading-[1.8] text-bachleda-charcoal/80">
                {trail.long.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <a href={CONTACT.phoneTel} className="btn-primary mt-10">
                Rezerwuj rower
                <ArrowRight size={14} strokeWidth={2} />
              </a>
            </div>
            <div className="space-y-4">
              <div className="aspect-[4/5] overflow-hidden border border-black/10 bg-white">
                <iframe
                  title={`Mapa — ${trail.title}`}
                  src={mapsSrc}
                  className="w-full h-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <p className="text-[11px] tracking-[.2em] uppercase text-bachleda-charcoal/55 text-center">
                Zdjęcia trasy pokażemy w wypożyczalni
              </p>
            </div>
          </div>
        </Container>
      </section>

      {trail.stops && (
        <section className="bg-white border-t border-black/10">
          <Container className="py-20 md:py-28">
            <div className="text-center fade-up">
              <Eyebrow>Etapy do wyboru</Eyebrow>
              <h2 className="font-serif-display text-[28px] md:text-[36px] mt-4">
                Dojedź i wróć tym samym szlakiem
              </h2>
              <Divider />
              <p className="text-[14px] leading-[1.7] text-bachleda-charcoal/70 max-w-[560px] mx-auto">
                Każdy z punktów leży bezpośrednio na Szlaku Wokół Tatr. Wybierasz, jak daleko chcesz dojechać — i wracasz tą samą asfaltową ścieżką do wypożyczalni.
              </p>
            </div>

            <div className="mt-14 max-w-[920px] mx-auto border-t border-black/10">
              {trail.stops.map((stop) => (
                <div
                  key={stop.name}
                  className="grid grid-cols-[auto_1fr_auto] gap-5 md:gap-10 items-start py-6 border-b border-black/10"
                >
                  <div className="text-[11px] tracking-[.2em] uppercase font-medium text-bachleda-green pt-1 min-w-[40px]">
                    {stop.country}
                  </div>
                  <div>
                    <h3 className="font-serif-display text-[20px] md:text-[22px] leading-[1.2]">
                      {stop.name}
                    </h3>
                    <p className="mt-2 text-[13px] md:text-[14px] leading-[1.6] text-bachleda-charcoal/70">
                      {stop.desc}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-[18px] md:text-[20px] text-bachleda-charcoal">
                      {stop.roundTrip} km
                    </div>
                    <div className="text-[11px] tracking-[.15em] uppercase text-bachleda-charcoal/55 mt-1">
                      tam i z powrotem
                    </div>
                    <div className="text-[11px] text-bachleda-charcoal/45 mt-1">
                      {stop.oneWay} km w jedną · {stop.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="bg-bachleda-soft-gray border-t border-black/10">
        <Container className="py-20">
          <div className="text-center">
            <Eyebrow>Kolejna trasa</Eyebrow>
            <h2 className="font-serif-display text-[28px] md:text-[36px] mt-4">
              {next.title}
            </h2>
            <p className="mt-3 text-[14px] text-bachleda-charcoal/70 max-w-[480px] mx-auto">
              {next.short}
            </p>
            <Link
              href={`/trasy/${next.slug}`}
              className="inline-flex items-center gap-2 mt-8 text-[12px] tracking-[.2em] uppercase font-medium text-bachleda-charcoal hover:text-bachleda-green"
            >
              Zobacz trasę
              <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  )
}
