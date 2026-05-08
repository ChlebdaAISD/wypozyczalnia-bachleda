import { Hero } from '../components/sections/Hero.jsx'
import { About } from '../components/sections/About.jsx'
import { BikeSplit } from '../components/sections/BikeSplit.jsx'
import { Trails } from '../components/sections/Trails.jsx'
import { Events } from '../components/sections/Events.jsx'
import { Inspiration } from '../components/sections/Inspiration.jsx'
import { Pricing } from '../components/sections/Pricing.jsx'
import { FAQ } from '../components/sections/FAQ.jsx'
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
        imageAlt="Rower trekkingowy — wypożyczalnia u Bachledy w Podczerwonem (TODO: dodać prawdziwe zdjęcie roweru klasycznego)"
      />
      <BikeSplit
        reversed
        withTopBorder
        eyebrow="Model #02 · Tatry bez zmęczenia"
        title="Rowery elektryczne — Podhale"
        description="Wypożyczalnia rowerów elektrycznych na Podhalu — wjedź pod każde podejście bez zadyszki. Dobrej klasy modele, bateria na cały dzień, miękkie siodło. Idealne, gdy chce Pan/Pani dotrzeć do Chochołowa albo Witowa i wrócić z uśmiechem."
        hourlyPrice="50 zł / h"
        dailyNote="albo 200 zł / cały dzień"
        imageAlt="Rower elektryczny e-bike — wypożyczalnia rowerów elektrycznych Podhale (TODO: dodać prawdziwe zdjęcie e-bike)"
      />
      <BikeSplit
        withTopBorder
        eyebrow="Model #03 · Ruszajcie razem"
        title="Riksza rodzinna"
        description="Idealna, gdy dziecko jeszcze za małe na samodzielną jazdę. Trzy miejsca, daszek, miejsce na termos. 60 zł cały dzień — wystarczy na trasę do Witowa i z powrotem."
        hourlyPrice="12 zł / h"
        dailyNote="albo 60 zł / cały dzień"
        imageAlt="Riksza rodzinna trzyosobowa — wypożyczalnia u Bachledy (TODO: dodać prawdziwe zdjęcie rikszy)"
      />
      <Trails />
      <Events />
      <Inspiration />
      <Pricing />
      <FAQ />
      <Contact />
    </main>
  )
}
