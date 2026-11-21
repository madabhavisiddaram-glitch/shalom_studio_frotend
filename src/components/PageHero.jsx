import { motion } from 'framer-motion'
import Img from './Img.jsx'
import { ease } from './Reveal.jsx'

/** Inner-page hero. With `image` it is a dark full-bleed banner; without, a light editorial header. */
export default function PageHero({ eyebrow, title, text, image, alt = '', children, compact = false }) {
  if (!image) {
    return (
      <section className="container-site pb-14 pt-36 sm:pt-44 lg:pb-20">
        <motion.span className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>{eyebrow}</motion.span>
        <motion.h1 className={`display mt-6 ${compact ? 'max-w-none lg:!text-[4.25rem] xl:!text-[4.6rem]' : 'max-w-5xl text-balance'}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1, ease }}>{title}</motion.h1>
        {text && <motion.p className="lead mt-8 max-w-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.25, ease }}>{text}</motion.p>}
        {children}
      </section>
    )
  }
  return (
    <section className="relative flex min-h-[78svh] items-end overflow-hidden bg-charcoal">
      <motion.div className="absolute inset-0" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease }}>
        <Img name={image} alt={alt} className="h-full w-full" eager />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-charcoal/40" />
      <div className="container-site relative pb-16 pt-40 text-ivory lg:pb-24">
        <motion.span className="eyebrow eyebrow-light" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}>{eyebrow}</motion.span>
        <motion.h1 className="display mt-6 max-w-5xl text-balance" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.5, ease }}>{title}</motion.h1>
        {text && <motion.p className="mt-7 max-w-2xl text-base leading-relaxed text-ivory/75 sm:text-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.7, ease }}>{text}</motion.p>}
        {children}
      </div>
    </section>
  )
}
