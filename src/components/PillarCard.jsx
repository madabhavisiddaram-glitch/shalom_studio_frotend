import { motion } from 'framer-motion'
import { Compass, Palette, LayoutGrid, Fingerprint } from 'lucide-react'
import { ease } from './Reveal.jsx'

/** Our Design Philosophy — client-supplied copy (shown on the About page only). */
export const pillars = [
  { title: 'Purposeful Design', Icon: Compass, text: 'Every design decision begins with a purpose, creating spaces that are practical, thoughtful, and meaningful' },
  { title: 'Aesthetic Harmony', Icon: Palette, text: 'Balancing materials, textures, colours, and proportions to create cohesive and timeless environments.' },
  { title: 'Functional Living', Icon: LayoutGrid, text: 'Making the best use of every space through intelligent planning and thoughtful detailing.' },
  { title: 'Personal Expression', Icon: Fingerprint, text: 'Creating spaces that reflect the individuality, lifestyle, and aspirations of the people who experience them.' },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const item = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }

/** Grid of animated pillar cards: staggered reveal on scroll, lift + gold rule on hover. */
export default function PillarCards({ items = pillars, className = 'sm:grid-cols-2 lg:grid-cols-4', compact = false }) {
  return (
    <motion.ul
      className={`grid gap-5 ${className}`}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      {items.map(({ title, Icon, text }, i) => (
        <motion.li
          key={title}
          variants={item}
          whileHover={{ y: -8 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className={`group relative flex h-full flex-col overflow-hidden border border-charcoal/[0.07] bg-white shadow-[0_2px_10px_-6px_rgba(36,36,36,0.15)] transition-shadow duration-500 hover:shadow-[0_28px_60px_-30px_rgba(36,36,36,0.45)] ${compact ? 'p-6' : 'p-8 lg:p-9'}`}
        >
          <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gold transition-transform duration-700 ease-lux group-hover:scale-x-100" aria-hidden />
          <div className="flex items-start justify-between">
            <span className={`flex items-center justify-center rounded-full border border-gold/40 text-gold-dark transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-white ${compact ? 'h-11 w-11' : 'h-14 w-14'}`}>
              <Icon size={compact ? 18 : 22} strokeWidth={1.3} />
            </span>
            <span className="font-serif text-3xl italic text-champagne transition-colors duration-500 group-hover:text-gold-light">0{i + 1}</span>
          </div>
          <h3 className={`font-serif leading-snug ${compact ? 'mt-6 text-xl' : 'mt-8 text-2xl'}`}>{title}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-stone-500">{text}</p>
        </motion.li>
      ))}
    </motion.ul>
  )
}
