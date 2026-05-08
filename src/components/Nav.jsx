import { useState, useEffect } from 'react'
import { Link } from 'wouter'
import { ChevronDown, Phone, Menu, X } from 'lucide-react'
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
                href={`/trasy/${trail.slug}/`}
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
  const [mobileOpen, setMobileOpen] = useState(false)
  const close = () => setMobileOpen(false)

  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [mobileOpen])

  return (
    <>
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

          <div className="flex items-center gap-3">
            <a
              href={CONTACT.phoneTel}
              className="inline-flex items-center gap-2 bg-bachleda-terracotta hover:bg-bachleda-terracotta-dark text-white px-4 py-2.5 sm:px-5 text-[12px] tracking-[.18em] uppercase font-medium transition"
            >
              <Phone size={14} strokeWidth={2} />
              <span className="hidden sm:inline">{CONTACT.phone}</span>
              <span className="sm:hidden">Zadzwoń</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Otwórz menu"
              className="md:hidden w-10 h-10 flex items-center justify-center text-bachleda-charcoal"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </Container>
      </nav>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[100] bg-bachleda-cream flex flex-col">
          <div className="h-[72px] flex items-center justify-between px-6 border-b border-black/10 shrink-0">
            <Link
              href="/"
              onClick={close}
              className="brand-mark"
              aria-label="Wypożyczalnia Rowerów u Bachledy — strona główna"
            >
              <img src="/logo.png" alt="Logo Wypożyczalnia Rowerów u Bachledy" />
            </Link>
            <button
              type="button"
              onClick={close}
              aria-label="Zamknij menu"
              className="w-10 h-10 flex items-center justify-center text-bachleda-charcoal"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="flex flex-col gap-1">
              <AnchorLink to="#rowery" onClick={close} className="font-serif-display text-[28px] py-3 border-b border-black/10 block">
                Rowery
              </AnchorLink>

              <div className="py-3 border-b border-black/10">
                <div className="font-serif-display text-[28px]">Trasy</div>
                <div className="mt-2 flex flex-col">
                  {TRAILS.map((trail) => (
                    <Link
                      key={trail.slug}
                      href={`/trasy/${trail.slug}/`}
                      onClick={close}
                      className="block py-2 text-[15px] text-bachleda-charcoal/80"
                    >
                      {trail.title}
                    </Link>
                  ))}
                </div>
              </div>

              <AnchorLink to="#imprezy" onClick={close} className="font-serif-display text-[28px] py-3 border-b border-black/10 block">
                Imprezy
              </AnchorLink>
              <AnchorLink to="#o-nas" onClick={close} className="font-serif-display text-[28px] py-3 border-b border-black/10 block">
                O nas
              </AnchorLink>
              <AnchorLink to="#kontakt" onClick={close} className="font-serif-display text-[28px] py-3 border-b border-black/10 block">
                Kontakt
              </AnchorLink>
            </div>

            <a
              href={CONTACT.phoneTel}
              onClick={close}
              className="mt-10 w-full inline-flex items-center justify-center gap-2 bg-bachleda-terracotta hover:bg-bachleda-terracotta-dark transition text-white px-5 py-4 text-[13px] tracking-[.18em] uppercase font-medium"
            >
              <Phone size={16} strokeWidth={2} />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      )}
    </>
  )
}
