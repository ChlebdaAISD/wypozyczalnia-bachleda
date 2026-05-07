import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useHeroAnim() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.fade-up').forEach((el) => {
        el.style.opacity = 1
        el.style.transform = 'none'
      })
      return
    }

    const ctx = gsap.context(() => {
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
      document.querySelectorAll('.fade-up').forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })
    })

    return () => ctx.revert()
  }, [])
}
