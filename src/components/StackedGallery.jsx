import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import Img from './Img.jsx'

/**
 * Full-screen auto-playing gallery.
 * Each image covers the whole screen for `duration` seconds, then the next
 * image wipes up over it in the same place. Loops forever, pauses while the
 * section is off-screen, and the gold bar shows the time left on each image.
 *
 * items: [{ image, title, caption }]
 */
const ease = [0.22, 1, 0.36, 1]

export default function StackedGallery({ items, eyebrow = 'Inside the Spaces', duration = 5.5, id }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.4 })
  const [active, setActive] = useState(0)
  const [prev, setPrev] = useState(null)
  const n = items.length

  const goTo = (i) => {
    if (i === active) return
    setPrev(active)
    setActive(i)
  }

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => goTo((active + 1) % n), duration * 1000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, inView, n, duration])

  return (
    <section id={id} ref={ref} className="relative h-[100svh] min-h-[560px] overflow-hidden bg-charcoal" aria-roledescription="carousel" aria-label="Gallery of interiors">
      {/* previous image stays underneath while the new one wipes in */}
      {prev !== null && (
        <div className="absolute inset-0">
          <Img name={items[prev].image} alt="" className="h-full w-full" sizes="100vw" />
        </div>
      )}
      <motion.div
        key={active}
        className="absolute inset-0"
        initial={prev === null ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        transition={{ duration: 1.3, ease }}
      >
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.15 }}
          animate={{ scale: inView ? 1.02 : 1.15 }}
          transition={{ duration: duration + 1.3, ease: 'linear' }}
        >
          <Img name={items[active].image} alt={`${items[active].title} — sample render`} className="h-full w-full" sizes="100vw" eager={active === 0} />
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-charcoal/30" />

      <div className="container-site absolute inset-x-0 bottom-0 pb-24 text-ivory md:pb-16">
        <span className="eyebrow eyebrow-light">{eyebrow}</span>
        <div className="relative mt-5 h-[7.5rem] overflow-hidden sm:h-[8.5rem]" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.9, ease }}
            >
              <h2 className="font-serif text-4xl leading-tight sm:text-6xl">{items[active].title}</h2>
              <p className="mt-3 max-w-lg text-sm text-ivory/75 sm:text-base">{items[active].caption}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* clickable index */}
      <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-3 text-ivory md:flex lg:right-12">
        {items.map((it, i) => (
          <button
            key={it.title}
            onClick={() => goTo(i)}
            aria-label={`Show ${it.title}`}
            aria-current={i === active}
            className={`flex items-center gap-3 py-1 text-[11px] tracking-[0.2em] transition-all duration-500 ${i === active ? 'text-ivory' : 'text-ivory/40 hover:text-ivory/80'}`}
          >
            <span className={`h-px bg-current transition-all duration-500 ${i === active ? 'w-10' : 'w-4'}`} />
            {String(i + 1).padStart(2, '0')}
          </button>
        ))}
      </div>

      {/* timer bar */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-ivory/15 max-md:bottom-16">
        <motion.div
          key={`${active}-${inView}`}
          className="h-full bg-gold"
          initial={{ width: '0%' }}
          animate={{ width: inView ? '100%' : '0%' }}
          transition={{ duration: inView ? duration : 0, ease: 'linear' }}
        />
      </div>
    </section>
  )
}
