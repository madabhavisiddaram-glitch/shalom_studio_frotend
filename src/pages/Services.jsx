import { Link } from 'react-router-dom'
import { ArrowUpRight, Building2, Sofa, Ruler, KeyRound } from 'lucide-react'
import PillarCards from '../components/PillarCard.jsx'
import Page from '../components/Page.jsx'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import ScrollMedia from '../components/ScrollMedia.jsx'
import FinalCta from '../components/FinalCta.jsx'
import Process from '../components/home/Process.jsx'
import { services } from '../data/services.js'

/** What We Do — Our Expertise (client-supplied copy, shown on the Services page only). */
const expertise = [
  { title: 'Architecture', Icon: Building2, text: 'Conceptualising and designing architectural spaces that bring together form, function, context, and character.' },
  { title: 'Interior Design', Icon: Sofa, text: 'Crafting thoughtfully designed interiors that balance aesthetics, comfort, and functionality.' },
  { title: 'Space Planning & Design Development', Icon: Ruler, text: 'Optimising spaces through intelligent layouts, circulation planning, and detailed design development.' },
  { title: 'Turnkey Interior Solutions', Icon: KeyRound, text: 'Bringing designs to life through material selection, coordination, detailing, and execution, where a complete project solution is required.' },
]

export default function Services() {
  return (
    <Page>
      <Seo
        title="Interior Design Services in Bangalore"
        description="Residential interiors, modular kitchens, living rooms, bedrooms, wardrobes, false ceilings and lighting, custom furniture and turnkey interior solutions in Bangalore."
      />
      <PageHero
        eyebrow="Our Services"
        image="v-living-kitchen"
        alt="Open living and kitchen interior with warm lighting (sample render)"
        title={<>Complete Interior Solutions,<br className="hidden lg:block" /> Thoughtfully Delivered.</>}
        text="From a single room to a complete home, every service is designed and coordinated with the same attention to detail."
      />
      <section className="container-site py-20 sm:py-28">
        <Reveal><span className="eyebrow">What We Do</span></Reveal>
        <Reveal delay={0.08}><h2 className="h-section mt-6">Our Expertise</h2></Reveal>
        <div className="mt-12"><PillarCards items={expertise} /></div>
      </section>

      <section className="container-site pb-24 sm:pb-32">
        <Reveal><span className="eyebrow">Our Services</span></Reveal>
        <div className="mt-10" />
        {services.map((s, i) => {
          const flip = i % 2 === 1
          return (
            <article key={s.slug} className="grid items-center gap-10 border-t border-charcoal/10 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
              <div className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
                <Link to={`/services/${s.slug}`} className="block" aria-label={`Explore ${s.title}`}>
                  <ScrollMedia
                    name={s.image}
                    alt={`${s.title} — sample interior render`}
                    variant="doors"
                    label={s.title}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                  />
                </Link>
              </div>
              <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
                <Reveal><p className="text-[11px] tracking-[0.2em] text-gold-dark">{String(i + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}</p></Reveal>
                <Reveal delay={0.08}><h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">{s.title}</h2></Reveal>
                <Reveal delay={0.14}><p className="lead mt-6">{s.short}</p></Reveal>
                <Reveal delay={0.2}>
                  <ul className="mt-8 space-y-2 text-[15px] text-stone-500">
                    {s.scope.slice(0, 3).map((x) => <li key={x} className="flex gap-3"><span className="mt-[0.7em] h-px w-4 shrink-0 bg-gold" />{x}</li>)}
                  </ul>
                </Reveal>
                <Reveal delay={0.26}>
                  <Link to={`/services/${s.slug}`} className="btn-outline mt-10">Explore Service <ArrowUpRight size={15} /></Link>
                </Reveal>
              </div>
            </article>
          )
        })}
      </section>
      <Process />
      <FinalCta id="services-consultation" image="d-living-3" />
    </Page>
  )
}
