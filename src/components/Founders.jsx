import { motion } from 'framer-motion'
import Img from './Img.jsx'
import { ease } from './Reveal.jsx'
import { founders } from '../data/founders.js'

/** Editorial founders section: two portrait cards, the second offset-free and aligned. */
export default function Founders({ compact = false }) {
  return (
    <div className={compact ? 'grid grid-cols-2 gap-5 sm:gap-8' : 'grid gap-10 sm:grid-cols-2 lg:gap-16'}>
      {founders.map((f, i) => (
        <motion.article
          key={f.image}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, delay: i * 0.18, ease }}
          className="group"
        >
          <div className="relative overflow-hidden">
            <Img name={f.image} alt={`${f.name}, ${f.title}`} className="aspect-[4/5]" sizes={compact ? '(min-width: 1024px) 20vw, 45vw' : '(min-width: 640px) 45vw, 100vw'} zoom />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-100" />
            <span className={`absolute left-4 top-3 font-serif italic text-ivory/90 ${compact ? 'text-3xl' : 'left-5 top-5 text-5xl'}`}>0{i + 1}</span>
            <span className="absolute inset-4 border border-ivory/0 transition-all duration-700 ease-lux group-hover:inset-3 group-hover:border-ivory/50" aria-hidden />
            <p className="absolute bottom-4 left-4 text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-gold-light">{i === 0 ? 'Founder' : 'Co-Founder'}</p>
          </div>
          <div className={compact ? 'mt-4 border-t border-charcoal/15 pt-4' : 'mt-7 border-t border-charcoal/15 pt-6'}>
            <h3 className={`font-serif ${compact ? 'text-lg sm:text-xl' : 'text-3xl'}`}>{f.name}</h3>
            <p className="mt-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-gold-dark">{f.title}</p>
            {!compact && <p className="mt-4 max-w-md text-[15px] leading-relaxed text-stone-400">{f.bio}</p>}
          </div>
        </motion.article>
      ))}
    </div>
  )
}

/** Compact founder row for the Home page About section */
export function FoundersMini() {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-6">
      {founders.map((f) => (
        <div key={f.image} className="flex items-center gap-3">
          <span className="h-14 w-14 overflow-hidden rounded-full ring-2 ring-gold/40 ring-offset-2 ring-offset-[#f1ebe2]">
            <Img name={f.image} alt={f.name} className="h-full w-full" sizes="56px" />
          </span>
          <span>
            <span className="block font-serif text-lg leading-tight">{f.name}</span>
            <span className="block text-[11px] uppercase tracking-[0.16em] text-stone-400">{f.title.replace(/^\[Title, e\.g\. /, '[').replace(/\]$/, ']')}</span>
          </span>
        </div>
      ))}
    </div>
  )
}
