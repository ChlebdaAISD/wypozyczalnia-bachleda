import { useState } from 'react'
import { Link } from 'wouter'
import { ChevronDown } from 'lucide-react'
import { Container } from './ui/Container.jsx'
import { AnchorLink } from './ui/AnchorLink.jsx'
import { CONTACT, TRAILS } from '../data/content.js'

function TrailsDropdown() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="nav-link inline-flex items-center gap-1"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        Trasy
        <ChevronDown size={14} strokeWidth={2} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50">
          <div className="bg-white border border-black/10 shadow-lg min-w-[280px] py-2">
            {TRAILS.map((trail) => (
              <Link
                key={trail.slug}
                href={`/trasy/${trail.slug}`}
                onClick={close}
                className="block px-5 py-3 text-[13px] hover:bg-bachleda-cream"
              >
                <div className="eyebrow-label text-bachleda-charcoal/50 text-[10px]">{trail.eyebrow}</div>
                <div className="mt-1 font-medium">{trail.title}</div>
                <div className="text-[11px] text-bachleda-charcoal/60 mt-0.5">
                  {trail.distance} · {trail.time}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-black/5">
      <Container className="h-[72px] flex items-center justify-between">
        <Link href="/" className="brand-mark" aria-label="Wypożyczalnia Rowerów u Bachledy">
          <img src="/logo.png" alt="Logo Wypożyczalnia Rowerów u Bachledy" />
        </Link>
        <div className="hidden md:flex items-center gap-10">
          <AnchorLink to="#rowery" className="nav-link">Rowery</AnchorLink>
          <TrailsDropdown />
          <AnchorLink to="#imprezy" className="nav-link">Imprezy</AnchorLink>
          <AnchorLink to="#kontakt" className="nav-link">Kontakt</AnchorLink>
        </div>
        <a
          href={CONTACT.phoneTel}
          className="hidden sm:flex items-center gap-2 text-[12px] tracking-[.18em] uppercase font-medium"
        >
          <span className="phone-tick" />
          <span>{CONTACT.phone}</span>
        </a>
        <a
          href={CONTACT.phoneTel}
          className="sm:hidden text-[11px] tracking-[.18em] uppercase font-medium"
        >
          {CONTACT.phone}
        </a>
      </Container>
    </nav>
  )
}
