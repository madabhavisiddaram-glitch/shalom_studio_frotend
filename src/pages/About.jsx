import { useState } from 'react'
import Page from '../components/Page.jsx'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Img from '../components/Img.jsx'
import Reveal from '../components/Reveal.jsx'
import Process from '../components/home/Process.jsx'
import FinalCta from '../components/FinalCta.jsx'
import PillarCards from '../components/PillarCard.jsx'
import Founders from '../components/Founders.jsx'
import RotatingCards from '../components/RotatingCards.jsx'
import { services } from '../data/services.js'

/**
 * ABOUT PAGE — About Us copy supplied by the studio.
 */

const ringItems = services.map((s) => ({ image: s.gallery[0], title: s.title, to: `/services/${s.slug}` }))

export default function About() {
  const [ringPhase, setRingPhase] = useState('idle')
  return (
    <Page>
      <Seo title="About the Studio" description="Inspired by the meaning of Shalom — peace, harmony and wholeness — Shalom Studio is an architecture and interior design practice in Bangalore transforming ideas into meaningful spaces." />
      <PageHero eyebrow="About the Studio" title="Creating Spaces. Building Experiences." image="v-dining-3" alt="Dining room with backlit niche and pendant light (sample render)" />

      <section className="container-site grid items-center gap-14 py-24 sm:py-32 lg:grid-cols-12">
        <div className={`lg:col-span-12 transition-opacity duration-700 ${ringPhase === 'intro' || ringPhase === 'returning' ? 'opacity-0' : 'opacity-100'}`}>
          <Reveal><span className="eyebrow">About Us</span></Reveal>
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal delay={0.08} className="lg:col-span-5">
              <p className="font-serif text-2xl leading-snug text-charcoal sm:text-[1.65rem]">
                At <em className="text-gold-dark">Shalom Studio</em>, we believe that architecture and interior design are more than the creation of beautiful spaces. They are about shaping experiences, enhancing everyday living, and creating environments that connect with the people who inhabit them.
              </p>
            </Reveal>
            <Reveal delay={0.16} className="lg:col-span-7">
              <div className="space-y-5 lead">
                <p>Inspired by the meaning of <em className="text-gold-dark">Shalom</em> — peace, harmony, and wholeness — our studio approaches every project with a thoughtful balance of creativity, functionality, aesthetics, and purpose.</p>
                <p>We are an architecture and interior design practice committed to transforming ideas into meaningful spaces. Through innovative concepts, intelligent space planning, carefully curated materials, and attention to detail, we strive to create designs that are distinctive, timeless, and personal.</p>
                <p>From architectural concepts to thoughtfully crafted interiors, every project begins with understanding our clients, their aspirations, and the way they envision their spaces.</p>
                <p>For us, design is not simply about how a space looks, but how it feels, functions, and becomes a part of someone&rsquo;s story.</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <blockquote className="relative mt-16 border-l-2 border-gold py-2 pl-8 sm:pl-12">
              <span aria-hidden className="absolute -top-10 left-6 font-serif text-7xl leading-none text-gold/30 sm:left-10">&ldquo;</span>
              <p className="max-w-4xl font-serif text-2xl italic leading-snug text-charcoal sm:text-3xl">
                At Shalom Studio, we don&rsquo;t just design spaces. We create experiences that bring people, purpose, and places together.
              </p>
            </blockquote>
          </Reveal>
        </div>
        <div className="lg:col-span-12">
          <RotatingCards items={ringItems} speed={7} scale={0.21} maxCard={290} intro onPhaseChange={setRingPhase} />
        </div>
      </section>

      <section className="container-site grid gap-16 py-24 sm:py-32 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-7">
          <Reveal><span className="eyebrow">Our Story</span></Reveal>
          <Reveal delay={0.08}><h2 className="h-section mt-6">Every Space Begins With a Story.</h2></Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 font-serif text-xl leading-snug text-charcoal sm:text-2xl">
              <em className="text-gold-dark">Shalom Studio</em> was envisioned with a simple belief: every space deserves thoughtful design and every design deserves a purpose.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-6 space-y-5 lead">
              <p>What inspires us is the opportunity to take an idea, understand the vision behind it, and transform it into a space that people can connect with. We see every project as a unique journey, built on collaboration, creativity, trust, and a shared vision.</p>
              <p>The name <em className="text-gold-dark">Shalom</em> reflects what we aspire to bring into every project — a sense of balance, harmony, and completeness.</p>
              <p>Our journey is driven by the belief that good design should not only stand out but should also stand the test of time.</p>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-5 lg:pt-2">
          <Reveal><span className="eyebrow">The Founders</span></Reveal>
          <div className="mt-8"><Founders compact /></div>
        </div>
      </section>

      <section className="bg-champagne/45 py-24 sm:py-32">
        <div className="container-site">
          <Reveal><span className="eyebrow">What Guides Us</span></Reveal>
          <Reveal delay={0.08}><h2 className="h-section mt-6">Our Design Philosophy</h2></Reveal>
          <div className="mt-12"><PillarCards /></div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest py-24 text-ivory sm:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal><span className="eyebrow eyebrow-light">Our Vision</span></Reveal>
            <Reveal delay={0.08}><h2 className="h-section mt-6 text-ivory">Creating a Better Experience Through Design.</h2></Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.12}>
              <p className="font-serif text-xl leading-snug text-ivory sm:text-2xl">
                Our vision is to establish <em className="text-gold-light">Shalom Studio</em> as a trusted name in architecture and interior design, recognised for thoughtful creativity, design excellence, and meaningful client relationships.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-ivory/70 sm:text-lg">
                <p>We aspire to create spaces that go beyond visual appeal — spaces that inspire, bring comfort, encourage connection, and enrich everyday experiences.</p>
                <p>We aim to approach every project with integrity, curiosity, and a commitment to delivering designs that are as meaningful as they are beautiful.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Process />
      <FinalCta id="about-consultation" image="d-bed-5" />
    </Page>
  )
}
