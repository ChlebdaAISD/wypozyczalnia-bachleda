import { Eyebrow } from '../ui/Eyebrow.jsx'
import { Divider } from '../ui/Divider.jsx'
import { OutlineButton } from '../ui/Button.jsx'
import { CONTACT } from '../../data/content.js'

export function BikeSplit({
  id,
  reversed = false,
  withTopBorder = false,
  eyebrow,
  title,
  description,
  hourlyPrice,
  dailyNote,
}) {
  const titleBlock = (
    <>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-serif-display text-[34px] md:text-[40px] leading-[1.1] mt-5">
        {title}
      </h2>
      <Divider />
    </>
  )

  return (
    <section id={id} className={`bg-bachleda-cream ${withTopBorder ? 'border-t border-black/10' : ''}`}>
      <div className="md:hidden pt-20 px-6 text-center fade-up">
        <div className="max-col">{titleBlock}</div>
      </div>

      <div className={`split items-stretch ${reversed ? 'reversed' : ''}`}>
        <div className="section-pad pt-10 md:pt-[120px] px-6 lg:px-16 flex items-center justify-center">
          <div className="w-full max-w-[360px] aspect-square bg-bachleda-soft-gray flex items-center justify-center p-10">
            <img
              src="/logo.png"
              alt={title}
              className="max-w-[55%] max-h-[55%] object-contain opacity-90"
            />
          </div>
        </div>
        <div className="section-pad pt-10 md:pt-[120px] px-6 lg:px-16 flex items-center justify-center">
          <div className="max-col text-center fade-up">
            <div className="hidden md:block">{titleBlock}</div>
            <p className="text-[15px] leading-[1.75] text-bachleda-charcoal/70">
              {description}
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <OutlineButton href={CONTACT.phoneTel}>{hourlyPrice}</OutlineButton>
              <span className="text-[12px] text-bachleda-charcoal/50 tracking-wide">
                {dailyNote}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
