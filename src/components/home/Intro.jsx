import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Img from '../Img.jsx'
import Reveal, { Unveil } from '../Reveal.jsx'

export default function Intro() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  return (
    <section id="intro" ref={ref} className="container-site grid items-center gap-12 py-24 sm:py-32 lg:grid-cols-12 lg:gap-0 lg:py-40">
      <div className="lg:col-span-5 lg:pr-16">
        <Reveal><span className="eyebrow">Our Approach</span></Reveal>
        <Reveal delay={0.08}>
          <h2 className="h-section mt-6 text-balance">Where Your Vision Meets <em className="text-gold-dark">Thoughtful</em> Design</h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="lead mt-8">
            Your home is more than just a space. It is a reflection of your personality, aspirations and everyday life. We bring together thoughtful planning, timeless aesthetics and functional design to create interiors that feel beautiful, comfortable and distinctly yours.
          </p>
        </Reveal>
        <Reveal delay={0.24} className="mt-10 flex flex-wrap gap-8">
          <Link to="/services" className="link-line">Our services</Link>
          <Link to="/contact#enquiry" className="link-line text-gold-dark">Start a conversation</Link>
        </Reveal>
      </div>
      <div className="relative lg:col-span-7">
        <Unveil className="overflow-hidden">
          <motion.div style={{ y }} className="scale-110">
            <Img name="d-living-6" alt="Open-plan living room with a sculpted TV wall, round coffee table and dining area beyond (sample render)" className="aspect-[4/3] lg:aspect-[7/6]" sizes="(min-width: 1024px) 58vw, 100vw" />
          </motion.div>
        </Unveil>
        <div className="absolute -bottom-6 -left-4 hidden bg-ivory px-6 py-5 sm:block lg:-left-16">
          <p className="font-serif text-lg italic text-charcoal">“Designed around the way you live.”</p>
        </div>
      </div>
    </section>
  )
}
