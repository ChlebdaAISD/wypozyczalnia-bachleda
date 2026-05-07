export function Placeholder({ label, bg, bgImage, className = '', style = {} }) {
  const composedStyle = {
    backgroundColor: bg,
    ...(bgImage ? { backgroundImage: bgImage } : {}),
    ...style,
  }
  return (
    <div
      className={`photo-placeholder ${className}`}
      data-label={label}
      style={composedStyle}
    />
  )
}
