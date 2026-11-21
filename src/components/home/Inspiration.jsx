import { motion } from 'framer-motion'
import { inspiration } from '../../data/content.js'
import SectionHeading from '../SectionHeading.jsx'
import Img from '../Img.jsx'
import { ease } from '../Reveal.jsx'

export default function Inspiration() {
  return (
    <section className="bg-champagne/45 py-24 sm:py-32 lg:py-40" aria-labelledby="insp-title">
      <div className="container-site">
        <SectionHeading align="center" eyebrow="Design Inspiration" title={<span id="insp-title">Little Details. Lasting Impressions.</span>} text="Texture, tone and light are what make a room feel finished. These are the details we obsess over." />
        {/* Uniform grid: every tile is exactly the same size (4 per row on desktop) */}
        <ul className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {inspiration.map((it, i) => (
            <motion.li
              key={it.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: (i % 4) * 0.1, ease }}
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <Img name={it.image} alt={`${it.title} — sample detail`} className="absolute inset-0 h-full w-full" sizes="(min-width: 1024px) 24vw, 50vw" zoom />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-ivory sm:p-6">
                <p className="text-[10px] tracking-[0.2em] text-gold-light">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-1 font-serif text-lg leading-tight sm:text-2xl">{it.title}</h3>
                <p className="mt-2 hidden text-sm leading-relaxed text-ivory/75 sm:block lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-all lg:duration-700 lg:ease-lux lg:group-hover:max-h-24 lg:group-hover:opacity-100">{it.text}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
