export function Button({
  variant = 'primary',
  as,
  href,
  onClick,
  type,
  className = '',
  children,
  ...rest
}) {
  const Tag = as || (href ? 'a' : 'button')
  const variantClass = variant === 'outline' ? 'btn-outline' : 'btn-primary'
  const cls = [variantClass, className].filter(Boolean).join(' ')

  const props = { className: cls, onClick, ...rest }
  if (Tag === 'a') props.href = href
  else props.type = type || 'button'

  return <Tag {...props}>{children}</Tag>
}

export function OutlineButton({ href, children, label = 'Zadzwoń', as, onClick, className = '', ...rest }) {
  const Tag = as || (href ? 'a' : 'button')
  const props = { className: `btn-outline ${className}`.trim(), onClick, ...rest }
  if (Tag === 'a') props.href = href
  else props.type = 'button'
  return (
    <Tag {...props}>
      <span>{label}</span>
      <span>{children}</span>
    </Tag>
  )
}
