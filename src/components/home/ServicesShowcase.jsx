import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { services } from '../../data/services.js'
import SectionHeading from '../SectionHeading.jsx'
import Img from '../Img.jsx'
import Reveal from '../Reveal.jsx'

export default function ServicesShowcase() {
  const [active, setActive] = useState(0)
  const s = services[active]
  return (
    <section className="py-24 sm:py-32 lg:py-40" aria-labelledby="services-title">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Our Services" title={<span id="services-title">Complete Interior Solutions, Thoughtfully Delivered.</span>} />
          <Reveal><Link to="/services" className="link-line shrink-0">View all services</Link></Reveal>
        </div>

        {/* Desktop: interactive list + sticky image */}
        <div className="mt-20 hidden gap-16 lg:grid lg:grid-cols-12">
          <ol className="lg:col-span-6" onMouseLeave={() => {}}>
            {services.map((sv, i) => (
              <li key={sv.slug} className="border-b border-charcoal/10 first:border-t">
                <Link
                  to={`/services/${sv.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex items-baseline gap-6 py-6"
                >
                  <span className={`w-8 text-[11px] tracking-[0.2em] transition-colors ${active === i ? 'text-gold-dark' : 'text-stone-400'}`}>{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex-1">
                    <span className={`block font-serif text-[1.9rem] leading-tight transition-all duration-500 ease-lux ${active === i ? 'translate-x-2 text-charcoal' : 'text-charcoal/45'}`}>{sv.title}</span>
                    <motion.span
                      initial={false}
                      animate={{ height: active === i ? 'auto' : 0, opacity: active === i ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="block overflow-hidden"
                    >
                      <span className="block max-w-md pl-2 pt-3 text-[15px] leading-relaxed text-stone-500">{sv.short}</span>
                      <span className="link-line mt-4 ml-2 text-gold-dark">Explore Service <ArrowUpRight size={14} /></span>
                    </motion.span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          <div className="lg:col-span-6">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden">
              <AnimatePresence initial={false}>
                <motion.div key={s.slug} className="absolute inset-0" initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
                  <Img name={s.image} alt={`${s.title} — sample interior render`} className="h-full w-full" sizes="45vw" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-0 left-0 bg-ivory px-6 py-4 text-[11px] uppercase tracking-[0.2em]">{s.title}</div>
            </div>
          </div>
        </div>

        {/* Mobile / tablet: stacked image cards */}
        <div className="mt-14 grid gap-14 sm:grid-cols-2 sm:gap-x-8 lg:hidden">
          {services.map((sv, i) => (
            <Reveal key={sv.slug} delay={(i % 2) * 0.08}>
              <Link to={`/services/${sv.slug}`} className="group block">
                <Img name={sv.image} alt={`${sv.title} — sample interior render`} className="aspect-[4/3]" sizes="(min-width: 640px) 50vw, 100vw" zoom />
                <p className="mt-5 text-[11px] tracking-[0.2em] text-gold-dark">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 font-serif text-2xl">{sv.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-stone-500">{sv.short}</p>
                <span className="link-line mt-5">Explore Service <ArrowUpRight size={14} /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
