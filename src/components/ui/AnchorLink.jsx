import { useLocation } from 'wouter'

export function AnchorLink({ to, className = '', children, onClick }) {
  const [location, navigate] = useLocation()
  const handleClick = (e) => {
    e.preventDefault()
    if (onClick) onClick()
    const scroll = () => {
      const el = document.querySelector(to)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    if (location === '/') {
      scroll()
    } else {
      navigate('/')
      setTimeout(scroll, 80)
    }
  }
  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
