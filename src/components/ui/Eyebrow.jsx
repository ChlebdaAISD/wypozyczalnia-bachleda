export function Eyebrow({ tone = 'muted', className = '', children }) {
  const toneClass = {
    muted: 'text-bachleda-charcoal/70',
    light: 'text-white/65',
    faint: 'text-bachleda-charcoal/50',
  }[tone] || 'text-bachleda-charcoal/70'
  return (
    <div className={`eyebrow-label ${toneClass} ${className}`}>
      {children}
    </div>
  )
}
