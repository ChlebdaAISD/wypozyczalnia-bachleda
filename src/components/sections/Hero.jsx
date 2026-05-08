import { ArrowRight } from 'lucide-react'
import { Container } from '../ui/Container.jsx'
import { CONTACT } from '../../data/content.js'

export function Hero() {
  return (
    <section id="top" className="relative h-[640px] md:h-[720px] overflow-hidden">
      <div className="hero-img-wrap" id="heroImg">
        <img
          src="/photos/hero.jpg"
          alt="Panorama Tatr ze Szlaku Wokół Tatr — wypożyczalnia rowerów u Bachledy w Podczerwonem"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 hero-overlay" />

      <Container className="relative h-full flex flex-col justify-center text-white">
        <div className="max-w-[640px] hero-text" id="heroContent">
          <div className="eyebrow-label text-white/85 mb-6">Szlak Wokół Tatr · Podhale</div>
          <h1 className="font-handwritten leading-[.95] text-[44px] sm:text-[64px] md:text-[80px] mb-5">
            Wypożyczalnia Rowerów Podhale
          </h1>
          <p className="hero-subtitle text-white/90 text-[16px] md:text-[18px] leading-[1.7] max-w-[480px] mb-10 font-light">
            Wypożyczalnia rowerów u Bachledy — Podczerwone, gmina Czarny Dunajec. Rowery klasyczne od 50 zł / dzień, elektryczne od 200 zł / dzień, riksze rodzinne. Kask i parking gratis, wsiadasz prosto na Szlak Wokół Tatr (250 km asfaltu).
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <a href={CONTACT.phoneTel} className="btn-primary">
              Zadzwoń
              <ArrowRight size={14} strokeWidth={2} />
            </a>
            <span className="signature-accent ml-2 hidden md:inline">otwarte 10–19</span>
          </div>
        </div>
      </Container>

      <div className="absolute bottom-8 left-6 lg:left-10 text-white/70 text-[10px] tracking-[.3em] uppercase z-10">
        <span className="opacity-70">N&nbsp;49°24′54″</span>
        <span className="mx-3 opacity-30">·</span>
        <span className="opacity-70">E&nbsp;19°50′11″</span>
        <span className="mx-3 opacity-30">·</span>
        <span>Podczerwone</span>
      </div>
    </section>
  )
}
