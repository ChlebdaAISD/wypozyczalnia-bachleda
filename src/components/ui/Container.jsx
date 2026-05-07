export function Container({ as = 'div', className = '', children, ...rest }) {
  const Tag = as
  return (
    <Tag className={`max-w-[1320px] mx-auto px-6 lg:px-10 ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
