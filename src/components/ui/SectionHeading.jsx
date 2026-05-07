import { Eyebrow } from './Eyebrow.jsx'
import { Divider } from './Divider.jsx'

export function SectionHeading({
  eyebrow,
  children,
  intro,
  align = 'center',
  light = false,
  variant = 'serif',
  className = '',
}) {
  const alignCls = align === 'center' ? 'text-center' : 'text-left'
  const titleClass = variant === 'handwritten'
    ? 'font-handwritten text-[60px] md:text-[84px] leading-[.95] mt-4'
    : 'font-serif-display text-[36px] md:text-[44px] leading-[1.1] mt-5'
  const titleColor = light ? 'text-white' : ''
  const introColor = light ? 'text-white/75' : 'text-bachleda-charcoal/70'

  return (
    <div className={`${alignCls} ${className}`}>
      {eyebrow && (
        <Eyebrow tone={light ? 'light' : 'muted'}>{eyebrow}</Eyebrow>
      )}
      <h2 className={`${titleClass} ${titleColor}`}>{children}</h2>
      <Divider light={light} align={align === 'left' ? 'left' : 'center'} />
      {intro && (
        <p className={`text-[15px] leading-[1.75] ${introColor} ${align === 'center' ? 'max-w-[640px] mx-auto' : ''}`}>
          {intro}
        </p>
      )}
    </div>
  )
}
