import { useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { src } from '../lib/img.js'

export default function Lightbox({ images, index, onClose, onIndex, title }) {
  const open = index !== null && index !== undefined
  const go = useCallback((d) => onIndex((index + d + images.length) % images.length), [index, images.length, onIndex])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, go, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col bg-charcoal/97 text-ivory"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          role="dialog" aria-modal="true" aria-label={`${title} gallery`}
        >
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <p className="text-[11px] uppercase tracking-[0.22em] text-ivory/60">
              {title} <span className="ml-3 text-gold-light">{index + 1} / {images.length}</span>
            </p>
            <button onClick={onClose} className="p-2 hover:text-gold-light" aria-label="Close gallery" autoFocus><X strokeWidth={1.3} /></button>
          </div>
          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-6 sm:px-20">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={images[index]}
                src={src(images[index], 1600)}
                alt={`${title} — image ${index + 1} (sample render)`}
                className="max-h-full max-w-full select-none object-contain"
                initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.4}
                onDragEnd={(_, i) => { if (i.offset.x < -60) go(1); else if (i.offset.x > 60) go(-1) }}
              />
            </AnimatePresence>
            <button onClick={() => go(-1)} className="absolute left-2 top-1/2 hidden -translate-y-1/2 p-3 hover:text-gold-light sm:block" aria-label="Previous image"><ChevronLeft size={34} strokeWidth={1} /></button>
            <button onClick={() => go(1)} className="absolute right-2 top-1/2 hidden -translate-y-1/2 p-3 hover:text-gold-light sm:block" aria-label="Next image"><ChevronRight size={34} strokeWidth={1} /></button>
          </div>
          <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-5 sm:justify-center">
            {images.map((im, i) => (
              <button key={im} onClick={() => onIndex(i)} aria-label={`View image ${i + 1}`} className={`h-14 w-20 shrink-0 overflow-hidden transition-opacity ${i === index ? 'opacity-100 ring-1 ring-gold' : 'opacity-40 hover:opacity-80'}`}>
                <img src={src(im, 800)} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
