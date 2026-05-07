import { Hero } from '../components/sections/Hero.jsx'
import { About } from '../components/sections/About.jsx'
import { BikeSplit } from '../components/sections/BikeSplit.jsx'
import { Trails } from '../components/sections/Trails.jsx'
import { Events } from '../components/sections/Events.jsx'
import { Inspiration } from '../components/sections/Inspiration.jsx'
import { Pricing } from '../components/sections/Pricing.jsx'
import { Contact } from '../components/sections/Contact.jsx'
import { useHeroAnim } from '../lib/useHeroAnim.js'

export function Home() {
  useHeroAnim()

  return (
    <main>
      <Hero />
      <About />
      <BikeSplit
        id="rowery"
        eyebrow="Model #01 · Klasyk, który nie zawodzi"
        title="Rowery klasyczne"
        description="Idealne na rodzinne pętle wokół Czarnego Dunajca i przez torfowiska. Od 50 zł cały dzień. Sprawdzone trzy razy przed każdym wypożyczeniem."
        hourlyPrice="12 zł / h"
        dailyNote="albo 50 zł / cały dzień"
        placeholderLabel="Rower klasyczny · ujęcie produktowe · cienie"
        placeholderBg="#e6e2d8"
        placeholderImage={`linear-gradient(45deg, rgba(0,0,0,.05) 0 1px, transparent 1px 12px),
          radial-gradient(ellipse at 50% 65%, rgba(31,58,43,.15), transparent 60%)`}
      />
      <BikeSplit
        reversed
        withTopBorder
        eyebrow="Model #02 · Tatry bez zmęczenia"
        title="Rowery elektryczne"
        description="Wjedź pod każde podejście bez zadyszki. Dobrej klasy modele, bateria na cały dzień, miękkie siodło. Idealne, gdy chcesz dotrzeć do Chochołowa albo Witowa i wrócić z uśmiechem."
        hourlyPrice="50 zł / h"
        dailyNote="albo 200 zł / cały dzień"
        placeholderLabel="Rower elektryczny · ujęcie produktowe · jasne tło"
        placeholderBg="#ece8df"
        placeholderImage={`linear-gradient(135deg, rgba(0,0,0,.04) 0 1px, transparent 1px 12px),
          radial-gradient(ellipse at 50% 60%, rgba(31,58,43,.18), transparent 60%)`}
      />
      <BikeSplit
        withTopBorder
        eyebrow="Model #03 · Ruszajcie razem"
        title="Riksza rodzinna"
        description="Idealna, gdy dziecko jeszcze za małe na samodzielną jazdę. Trzy miejsca, daszek, miejsce na termos. 60 zł cały dzień — wystarczy na trasę do Witowa i z powrotem."
        hourlyPrice="12 zł / h"
        dailyNote="albo 60 zł / cały dzień"
        placeholderLabel="Riksza rodzinna · trzy miejsca · widok z boku"
        placeholderBg="#dfd6c2"
        placeholderImage={`linear-gradient(135deg, rgba(0,0,0,.04) 0 1px, transparent 1px 12px),
          radial-gradient(ellipse at 50% 65%, rgba(199,107,74,.2), transparent 60%)`}
      />
      <Trails />
      <Events />
      <Inspiration />
      <Pricing />
      <Contact />
    </main>
  )
}
