import { useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export function Lightbox({ images, openIndex, onClose, onNavigate }) {
  const isOpen = openIndex !== null && openIndex !== undefined

  const goPrev = useCallback(() => {
    onNavigate((openIndex - 1 + images.length) % images.length)
  }, [openIndex, images.length, onNavigate])

  const goNext = useCallback(() => {
    onNavigate((openIndex + 1) % images.length)
  }, [openIndex, images.length, onNavigate])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'ArrowRight') goNext()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, onClose, goPrev, goNext])

  if (!isOpen) return null

  const current = images[openIndex]

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Zamknij"
        className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center text-white/80 hover:text-white"
      >
        <X size={28} strokeWidth={1.5} />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            aria-label="Poprzednie zdjęcie"
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/80 hover:text-white"
          >
            <ChevronLeft size={36} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goNext() }}
            aria-label="Następne zdjęcie"
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/80 hover:text-white"
          >
            <ChevronRight size={36} strokeWidth={1.5} />
          </button>
        </>
      )}

      <div
        className="max-w-[92vw] max-h-[88vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={current.image}
          alt={current.label || ''}
          className="max-w-full max-h-[80vh] object-contain"
        />
        {current.label && (
          <div className="mt-4 text-white/70 text-[12px] tracking-[.2em] uppercase">
            {current.label}
          </div>
        )}
      </div>
    </div>
  )
}
