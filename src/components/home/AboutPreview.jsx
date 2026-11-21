import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Reveal from '../Reveal.jsx'
import RotatingCards from '../RotatingCards.jsx'
import { services } from '../../data/services.js'
import { FoundersMini } from '../Founders.jsx'

const ringItems = services.map((s) => ({ image: s.image, title: s.title, to: `/services/${s.slug}` }))
export default function AboutPreview() {
  const [ringPhase, setRingPhase] = useState('idle')
  const showText = ringPhase === 'done'
  return (
    <section id="about" className="scroll-mt-10 bg-champagne/45 py-24 sm:py-32 lg:py-40" aria-labelledby="about-title">
      <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Draggable 3D ring of service images */}
        <div className="lg:col-span-6">
          <RotatingCards items={ringItems} intro onPhaseChange={setRingPhase} />
        </div>

        <motion.div className="lg:col-span-6" initial={false} animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 30 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <Reveal><span className="eyebrow">About Us</span></Reveal>
          <Reveal delay={0.08}><h2 id="about-title" className="h-section mt-6 text-balance">Creating Spaces. Building Experiences.</h2></Reveal>
          <Reveal delay={0.16}>
            <p className="lead mt-8">
              We believe exceptional interiors begin with understanding the people who live and work in them. Every project is approached with attention to detail, thoughtful material selection and a commitment to creating spaces that balance aesthetics with everyday functionality.
            </p>
          </Reveal>
          <Reveal delay={0.22}><FoundersMini /></Reveal>
        </motion.div>
      </div>
      <div className="container-site mt-16 lg:mt-20">
        <Reveal delay={0.1} className="flex justify-center">
          <Link to="/about" className="btn-outline">More about the studio <ArrowRight size={15} /></Link>
        </Reveal>
      </div>
    </section>
  )
}
