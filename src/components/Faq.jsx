import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { faqs } from '../data/content.js'

export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

export default function Faq({ items = faqs }) {
  const [open, setOpen] = useState(0)
  return (
    <ul className="border-t border-charcoal/15">
      {items.map((f, i) => {
        const isOpen = open === i
        return (
          <li key={f.q} className="border-b border-charcoal/15">
            <h3>
              <button
                className="group flex w-full items-start justify-between gap-6 py-7 text-left outline-none focus-visible:bg-champagne/40"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                id={`faq-btn-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className={`font-serif text-xl leading-snug transition-colors sm:text-2xl ${isOpen ? 'text-charcoal' : 'text-charcoal/75 group-hover:text-charcoal'}`}>{f.q}</span>
                <span className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${isOpen ? 'rotate-45 border-gold bg-gold text-white' : 'border-charcoal/20'}`}>
                  <Plus size={16} strokeWidth={1.4} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div id={`faq-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                  <p className="max-w-3xl pb-8 pr-12 text-[15px] leading-relaxed text-stone-500">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}
