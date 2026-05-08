import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { CONTACT, PRICING_ROWS, PRICING_EXTRAS } from '../../data/content.js'

function PricingExtra({ extra }) {
  return (
    <div className="border-l border-black/15 pl-5 py-2">
      {extra.badgeType === 'green' ? (
        <div className="green-badge">{extra.badge}</div>
      ) : (
        <div className="eyebrow-label text-bachleda-charcoal/70">{extra.badge}</div>
      )}
      <p className="text-[13px] text-bachleda-charcoal/70 mt-3 leading-[1.6]">{extra.desc}</p>
    </div>
  )
}

export function Pricing() {
  return (
    <section className="bg-white">
      <div className="section-pad max-w-[860px] mx-auto px-6">
        <div className="fade-up">
          <SectionHeading
            eyebrow="Cennik · 2026"
            intro="Wypożyczalnia rowerów Podhale — bez ukrytych opłat. Płatność gotówką lub blikiem na miejscu. Kask zawsze w cenie."
          >
            Ile kosztuje wypożyczenie roweru w Podhalu?
          </SectionHeading>
        </div>

        <div className="mt-14">
          <div className="price-row head">
            <div>Pojazd</div>
            <div>1 godzina</div>
            <div>Cały dzień</div>
          </div>
          {PRICING_ROWS.map((row) => (
            <div key={row.vehicle} className="price-row">
              <div className="vehicle">{row.vehicle}</div>
              <div className="price">{row.perHour}</div>
              <div className="price">{row.perDay}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {PRICING_EXTRAS.map((extra) => (
            <PricingExtra key={extra.badge} extra={extra} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href={CONTACT.phoneTel} className="btn-primary">
            Zadzwoń
            <ArrowRight size={14} strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  )
}
