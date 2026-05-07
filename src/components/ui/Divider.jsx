export function Divider({ light = false, align = 'center', className = '' }) {
  const styles = align === 'left' ? { marginLeft: 0 } : undefined
  return (
    <span
      className={`divider-thin ${light ? 'divider-thin-light' : ''} ${className}`}
      style={styles}
    />
  )
}
