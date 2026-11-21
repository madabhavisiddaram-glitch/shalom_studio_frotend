import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import SectionHeading from '../SectionHeading.jsx'

/**
 * TESTIMONIALS — placeholders only.
 * Replace with genuine client testimonials (with the client's permission).
 * Example: { quote: '…', name: 'Client name', detail: '3BHK, Whitefield' }
 */
const testimonials = [
  { quote: '[Client testimonial to be added. Share a genuine review from a client, with their permission.]', name: '[Client Name]', detail: '[Property type, Location]' },
  { quote: '[Client testimonial to be added. Share a genuine review from a client, with their permission.]', name: '[Client Name]', detail: '[Property type, Location]' },
  { quote: '[Client testimonial to be added. Share a genuine review from a client, with their permission.]', name: '[Client Name]', detail: '[Property type, Location]' },
]

export default function Testimonials() {
  const [i, setI] = useState(0)
  const go = (d) => setI((x) => (x + d + testimonials.length) % testimonials.length)
  const t = testimonials[i]
  return (
    <section className="py-24 sm:py-32 lg:py-40" aria-labelledby="testi-title" aria-roledescription="carousel">
      <div className="container-site">
        <SectionHeading align="center" eyebrow="Client Stories" title={<span id="testi-title">Stories from the Homes We’ve Transformed.</span>} />
        <div className="relative mx-auto mt-16 max-w-4xl text-center">
          <Quote className="mx-auto text-gold" size={40} strokeWidth={1} aria-hidden />
          <div className="relative mt-8 min-h-[220px] sm:min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.figure key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.6 }} aria-live="polite">
                <blockquote className="font-serif text-2xl italic leading-snug text-charcoal/50 sm:text-[2rem]">“{t.quote}”</blockquote>
                <figcaption className="mt-8">
                  <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-charcoal/60">{t.name}</p>
                  <p className="mt-1 text-sm text-stone-400">{t.detail}</p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="mt-10 flex items-center justify-center gap-6">
            <button onClick={() => go(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/20 hover:bg-charcoal hover:text-ivory" aria-label="Previous testimonial"><ArrowLeft size={16} strokeWidth={1.3} /></button>
            <div className="flex gap-2">
              {testimonials.map((_, k) => (
                <button key={k} onClick={() => setI(k)} aria-label={`Testimonial ${k + 1}`} aria-current={k === i} className={`h-px transition-all duration-500 ${k === i ? 'w-10 bg-gold' : 'w-5 bg-charcoal/25'}`} />
              ))}
            </div>
            <button onClick={() => go(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/20 hover:bg-charcoal hover:text-ivory" aria-label="Next testimonial"><ArrowRight size={16} strokeWidth={1.3} /></button>
          </div>
          <p className="mt-8 text-xs uppercase tracking-[0.18em] text-stone-400">Placeholder · genuine client testimonials will be added here</p>
        </div>
      </div>
    </section>
  )
}
