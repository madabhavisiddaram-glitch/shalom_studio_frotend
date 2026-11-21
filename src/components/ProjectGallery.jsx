import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { categories, projects } from '../data/projects.js'
import ProjectCard from './ProjectCard.jsx'

export default function ProjectGallery({ limit, initial = 'all' }) {
  const [cat, setCat] = useState(initial)
  const list = useMemo(() => {
    const l = cat === 'all' ? projects : projects.filter((p) => p.category === cat)
    return limit ? l.slice(0, limit) : l
  }, [cat, limit])

  return (
    <div>
      <div role="tablist" aria-label="Filter projects by category" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
        {categories.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={cat === c.id}
            onClick={() => setCat(c.id)}
            className={`relative shrink-0 px-4 py-2.5 outline-none focus-visible:ring-1 focus-visible:ring-gold text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
              cat === c.id ? 'text-ivory' : 'text-charcoal/60 hover:text-charcoal'
            }`}
          >
            {cat === c.id && <motion.span layoutId={`pill-${limit ?? 'all'}`} className="absolute inset-0 bg-charcoal" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />}
            <span className="relative">{c.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={cat}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14"
        >
          {list.length === 0 && (
            <div className="col-span-full border border-dashed border-charcoal/20 px-6 py-20 text-center">
              <p className="font-serif text-3xl">Projects coming soon</p>
              <p className="mx-auto mt-4 max-w-md text-stone-500">We are preparing this collection. Planning a {categories.find((c) => c.id === cat)?.label.toLowerCase().replace(/s$/, '')}? We would love to hear about it.</p>
              <Link to="/contact#enquiry" className="btn-dark mt-8">Discuss your project</Link>
            </div>
          )}
          {list.map((p, i) => {
            return (
              <motion.div
                key={p.slug}
                className="h-full"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={p} aspect="aspect-[4/3]" sizes="(min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw" />
              </motion.div>
            )
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
