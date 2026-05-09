import { useEffect } from 'react'

export function useHeroAnim() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false
    let ctx

    ;(async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const heroImg = document.querySelector('#heroImg')
        if (heroImg) {
          gsap.to('#heroImg', {
            yPercent: 18,
            ease: 'none',
            scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: true },
          })
        }
        const heroChildren = document.querySelectorAll('#heroContent > *')
        if (heroChildren.length) {
          gsap.from('#heroContent > *', {
            y: 24,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            stagger: 0.12,
            delay: 0.15,
          })
        }
      })
    })()

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [])
}
