import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1]

export default function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </M>
  )
}

/** Image that unveils with a clip-path wipe when scrolled into view.
 *  The observed wrapper is never clipped, so IntersectionObserver always fires. */
export function Unveil({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })
  return (
    <div ref={ref} className={className}>
      <motion.div
        className="h-full"
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={inView ? { clipPath: 'inset(0 0 0% 0)' } : undefined}
        transition={{ duration: 1.3, delay, ease }}
      >
        {children}
      </motion.div>
    </div>
  )
}
