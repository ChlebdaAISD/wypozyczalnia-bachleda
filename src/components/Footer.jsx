import { Facebook, Instagram } from 'lucide-react'
import { Link } from 'wouter'
import { Eyebrow } from './ui/Eyebrow.jsx'
import { AnchorLink } from './ui/AnchorLink.jsx'
import { CONTACT, FOOTER_LINKS } from '../data/content.js'

export function Footer() {
  return (
    <footer className="bg-white border-t border-black/15">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <div>
            <Link href="/" className="inline-block" aria-label="Wypożyczalnia Rowerów u Bachledy — strona główna">
              <img src="/logo.webp" alt="Logo Wypożyczalnia Rowerów u Bachledy" width={600} height={316} loading="lazy" className="h-20 w-auto" />
            </Link>
            <h3 className="font-serif-display text-[20px] leading-[1.25] mt-5">
              Wypożyczalnia Rowerów u Bachledy
            </h3>
            <p className="text-[13px] leading-[1.7] text-bachleda-charcoal/70 mt-3 max-w-[320px]">
              Podczerwone, obok mostu kolejowego — bezpośrednio przy Szlaku Wokół Tatr. Czekamy na Ciebie codziennie od 10:00 do 19:00.
            </p>
          </div>

          <div>
            <Eyebrow className="mb-5">Dowiedz się więcej</Eyebrow>
            {FOOTER_LINKS.map((link) => (
              <AnchorLink key={link.href} to={link.href} className="footer-link">
                {link.label}
              </AnchorLink>
            ))}
          </div>

          <div>
            <Eyebrow className="mb-5">Jesteśmy dla Ciebie</Eyebrow>
            <a href={CONTACT.phoneTel} className="font-serif-display text-[26px] block leading-[1.1]">
              {CONTACT.phone}
            </a>
            <p className="text-[13px] text-bachleda-charcoal/70 mt-2">codziennie 10:00 – 19:00</p>
            <div className="mt-5 flex items-center gap-4">
              <a
                href={CONTACT.facebook}
                aria-label="Facebook"
                className="text-bachleda-green hover:opacity-80"
              >
                <Facebook size={20} strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="Instagram" className="text-bachleda-green hover:opacity-80">
                <Instagram size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-black/15 flex flex-col md:flex-row gap-5 items-center justify-between text-[12px] text-bachleda-charcoal/70">
          <div>© 2026 Wypożyczalnia Rowerów u Bachledy</div>
          <a
            href="https://www.aisolutions.design/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[11px] tracking-[.18em] uppercase text-bachleda-charcoal/70 hover:text-bachleda-charcoal transition"
          >
            <span>Design i wykonanie</span>
            <img src="/aisd.png" alt="AI Solutions Design" width={352} height={360} loading="lazy" className="h-4 w-auto" />
            <span className="font-medium">AI Solutions Design</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
