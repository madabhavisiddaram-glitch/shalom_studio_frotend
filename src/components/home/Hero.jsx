import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Pause, Play } from 'lucide-react'
import { ease } from '../Reveal.jsx'
import { site } from '../../data/site.js'

const lines = [['Spaces', 'That', 'Inspire.'], ['Designs', 'That', 'Belong.']]

export default function Hero() {
  const ref = useRef(null)
  const video = useRef(null)
  const [playing, setPlaying] = useState(true)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    const v = video.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { v.pause(); setPlaying(false) }
  }, [])

  // When the video finishes the first time, glide down to the About section
  // (only if the visitor is still at the top), then keep the video looping.
  const onEnded = () => {
    const v = video.current
    if (window.scrollY < 120) {
      const target = document.getElementById('about')
      if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 40, behavior: 'smooth' })
    }
    if (v) { v.loop = true; v.currentTime = 0; v.play().catch(() => {}) }
  }

  const toggle = () => {
    const v = video.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) } else { v.pause(); setPlaying(false) }
  }

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[620px] overflow-hidden bg-charcoal" aria-label="Introduction">
      <motion.div style={{ y }} className="absolute inset-0">
        <video
          ref={video}
          className="h-full w-full object-cover"
          autoPlay muted playsInline preload="auto"
          onEnded={onEnded}
          poster="/images/hero-poster-1600.webp"
          aria-label="A sunlit luxury living room being furnished"
        >
          <source src="/video/hero-720.mp4" type="video/mp4" media="(max-width: 900px)" />
          <source src="/video/hero-1080.mp4" type="video/mp4" />
        </video>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/20 to-charcoal/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/55 via-transparent to-transparent" />

      <motion.div style={{ opacity: fade }} className="container-site relative flex h-full flex-col justify-end pb-24 text-ivory sm:pb-28 lg:pb-32">
        <motion.span className="eyebrow eyebrow-light" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 1, ease }}>
          Interior Design Studio · Bangalore
        </motion.span>
        <h1 className="display mt-6 max-w-5xl max-sm:text-[2.15rem]">
          {lines.map((line, li) => (
            <span key={li} className="block">
              {line.map((w, wi) => {
                const i = li * 3 + wi
                return (
                  <span key={wi} className="mr-[0.22em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                    <motion.span
                      className={`inline-block ${wi === 2 ? 'italic text-gold-light' : ''}`}
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.6 + i * 0.09, duration: 1.1, ease }}
                    >
                      {w}
                    </motion.span>
                  </span>
                )
              })}
            </span>
          ))}
        </h1>
        <motion.p
          className="mt-5 flex items-center gap-4 font-serif text-lg italic text-gold-light sm:text-2xl"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 1, ease }}
        >
          <span className="h-px w-10 bg-gold-light/70" aria-hidden />
          {site.motto}
        </motion.p>
        <motion.p
          className="mt-6 max-w-xl text-[15px] leading-relaxed text-ivory/80 sm:text-lg"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35, duration: 1, ease }}
        >
          Thoughtfully designed interiors, crafted around your lifestyle. From contemporary apartments to elegant villas, we transform spaces into experiences that feel uniquely yours.
        </motion.p>
        <motion.div className="mt-10 flex flex-col gap-3 sm:flex-row" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.55, duration: 1, ease }}>
          <Link to="/projects" className="btn-light">Explore Our Projects <ArrowRight size={16} /></Link>
          <Link to="/contact#enquiry" className="btn-outline-light">Book a Free Consultation</Link>
        </motion.div>
      </motion.div>

      <motion.a
        href="#intro"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-ivory/70 md:flex"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        aria-label="Scroll to next section"
      >
        Scroll
        <span className="relative block h-12 w-px overflow-hidden bg-ivory/25">
          <motion.span className="absolute left-0 top-0 block h-1/2 w-full bg-ivory" animate={{ y: ['-100%', '200%'] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }} />
        </span>
      </motion.a>

      <button onClick={toggle} className="absolute bottom-8 right-24 hidden h-10 w-10 items-center justify-center rounded-full border border-ivory/30 text-ivory/80 transition-colors hover:border-ivory hover:text-white md:flex lg:right-28" aria-label={playing ? 'Pause background video' : 'Play background video'}>
        {playing ? <Pause size={14} /> : <Play size={14} />}
      </button>
    </section>
  )
}
