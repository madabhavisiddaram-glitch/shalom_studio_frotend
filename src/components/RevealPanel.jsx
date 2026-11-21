import { useRef } from 'react'
import { useInView } from 'framer-motion'

/**
 * Colour-panel image reveal (inspired by the reference video):
 *  - When the image scrolls into view, a solid brand-coloured panel showing
 *    the title slides UP and away, revealing the photograph.
 *  - On hover the panel slides back down over the image with the title,
 *    and a "Explore" cue.
 * Colour defaults to the brand's muted gold; pass tone="forest" or "charcoal".
 */
const tones = {
  gold: 'bg-gold text-white',
  forest: 'bg-forest text-ivory',
  charcoal: 'bg-charcoal text-ivory',
}

export default function RevealPanel({ children, title, cue = 'Explore', tone = 'gold', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -25% 0px' })
  return (
    <div ref={ref} className={`group relative overflow-hidden ${className}`}>
      {children}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-transform duration-[900ms] ease-lux ${tones[tone]} ${
          inView ? '-translate-y-full' : 'translate-y-0'
        } group-hover:translate-y-0 group-focus-within:translate-y-0`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
        <span className="mt-5 font-serif text-2xl leading-tight sm:text-3xl lg:text-4xl">{title}</span>
        <span className="mt-5 text-[11px] uppercase tracking-[0.24em] opacity-80">{cue} →</span>
      </div>
    </div>
  )
}
