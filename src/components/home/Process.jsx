import { useRef, useState } from 'react'
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'
import { processSteps } from '../../data/content.js'
import SectionHeading from '../SectionHeading.jsx'

/**
 * Scroll-driven timeline: as the visitor scrolls through the section the gold
 * line fills, and each step's dot lights up and its text brightens in turn.
 */
export default function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 90%', 'end 35%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const [active, setActive] = useState(-1)
  const n = processSteps.length

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // step i activates once the line has reached its dot
    const idx = Math.min(n - 1, Math.floor(v * n * 1.02))
    setActive(v <= 0.01 ? -1 : idx)
  })

  return (
    <section className="bg-charcoal py-24 text-ivory sm:py-32 lg:py-40" aria-labelledby="process-title">
      <div className="container-site">
        <SectionHeading light eyebrow="Our Process" title={<span id="process-title">From First Conversation to Final Reveal.</span>} />
        <div ref={ref} className="relative mt-20">
          {/* horizontal track + fill (desktop) */}
          <div className="absolute left-0 right-0 top-[9px] hidden h-px bg-ivory/15 lg:block" aria-hidden>
            <motion.div className="h-full origin-left bg-gradient-to-r from-gold-dark via-gold to-gold-light" style={{ scaleX: progress }} />
          </div>
          {/* vertical track + fill (mobile/tablet) */}
          <div className="absolute bottom-0 left-[9px] top-0 w-px bg-ivory/15 lg:hidden" aria-hidden>
            <motion.div className="h-full w-full origin-top bg-gold" style={{ scaleY: progress }} />
          </div>

          <ol className="grid gap-12 lg:grid-cols-6 lg:gap-8">
            {processSteps.map((s, i) => {
              const on = i <= active
              const current = i === active
              return (
                <li key={s.n} className="relative pl-12 lg:pl-0 lg:pt-14">
                  <span
                    className={`absolute left-0 top-0 flex h-[19px] w-[19px] items-center justify-center rounded-full border transition-all duration-700 ${
                      on ? 'border-gold bg-gold shadow-[0_0_0_6px_rgba(180,154,114,0.18),0_0_24px_rgba(180,154,114,0.6)]' : 'border-ivory/30 bg-charcoal'
                    } ${current ? 'scale-125' : ''}`}
                    aria-hidden
                  >
                    <span className={`h-[7px] w-[7px] rounded-full transition-colors duration-700 ${on ? 'bg-charcoal' : 'bg-ivory/30'}`} />
                  </span>
                  <motion.div
                    animate={{ opacity: on ? 1 : 0.28, y: on ? 0 : 18 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className={`font-serif text-5xl italic transition-colors duration-700 ${on ? 'text-gold' : 'text-ivory/40'}`}>{s.n}</p>
                    <h3 className="mt-4 font-serif text-2xl">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ivory/65">{s.text}</p>
                  </motion.div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
