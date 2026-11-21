import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Img from './Img.jsx'

/**
 * Scroll-linked image reveals. Three variants:
 *  - "doors":    two panels swing open like doors as you scroll
 *  - "iris":     the image opens from a small centre window to full frame
 *  - "parallax": the frame slides up while the photo drifts up and down inside it
 */
export default function ScrollMedia({ name, alt, variant = 'doors', label, className = 'aspect-[16/10]', sizes = '100vw' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center 55%'] })
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })
  const { scrollYProgress: through } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  // doors
  const leftDoor = useTransform(p, [0, 1], [0, -105])
  const rightDoor = useTransform(p, [0, 1], [0, 105])
  const doorShade = useTransform(p, [0, 0.8], [0.3, 0])
  const doorScale = useTransform(p, [0, 1], [1.15, 1])
  // iris
  const iris = useTransform(p, [0, 1], ['inset(32% 38% 32% 38%)', 'inset(0% 0% 0% 0%)'])
  const irisScale = useTransform(p, [0, 1], [1.35, 1])
  // parallax
  const frameY = useTransform(p, [0, 1], [90, 0])
  const frameOpacity = useTransform(p, [0, 0.5], [0, 1])
  const imgY = useTransform(through, [0, 1], ['-12%', '12%'])

  const tag = label && (
    <span className="absolute bottom-0 left-0 z-20 bg-ivory px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-charcoal transition-colors duration-500 group-hover:bg-gold group-hover:text-white">
      {label}
    </span>
  )

  if (variant === 'iris') {
    return (
      <div ref={ref} className={`group relative overflow-hidden bg-champagne/60 ${className}`}>
        <motion.div className="absolute inset-0" style={{ clipPath: iris }}>
          <motion.div className="h-full w-full" style={{ scale: irisScale }}>
            <Img name={name} alt={alt} className="h-full w-full" sizes={sizes} zoom />
          </motion.div>
        </motion.div>
        {tag}
      </div>
    )
  }

  if (variant === 'parallax') {
    return (
      <motion.div ref={ref} style={{ y: frameY, opacity: frameOpacity }} className={`group relative overflow-hidden ${className}`}>
        <motion.div className="absolute inset-x-0 -top-[14%] h-[128%]" style={{ y: imgY }}>
          <Img name={name} alt={alt} className="h-full w-full" sizes={sizes} />
        </motion.div>
        {tag}
      </motion.div>
    )
  }

  // doors
  return (
    <div ref={ref} className={`group relative overflow-hidden ${className}`} style={{ perspective: 1600 }}>
      <motion.div className="absolute inset-0" style={{ scale: doorScale }}>
        <Img name={name} alt={alt} className="h-full w-full" sizes={sizes} zoom />
      </motion.div>
      <motion.div className="pointer-events-none absolute inset-0 bg-ivory" style={{ opacity: doorShade }} />
      {[['left', leftDoor], ['right', rightDoor]].map(([side, rot]) => (
        <motion.div
          key={side}
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 z-10 w-1/2 bg-champagne ${side === 'left' ? 'left-0 origin-left border-r' : 'right-0 origin-right border-l'} border-gold/70 shadow-[inset_0_0_60px_rgba(180,154,114,0.25)]`}
          style={{ rotateY: rot, backfaceVisibility: 'hidden' }}
        >
          <span className={`absolute top-1/2 h-14 w-1 -translate-y-1/2 rounded-full bg-gold shadow-[0_2px_6px_rgba(36,36,36,0.25)] ${side === 'left' ? 'right-4' : 'left-4'}`} />
          <span className="absolute inset-6 border border-gold/50" />
          <span className="absolute inset-10 border border-gold/20" />
        </motion.div>
      ))}
      {tag}
    </div>
  )
}
