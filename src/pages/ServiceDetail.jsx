import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Page from '../components/Page.jsx'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Img from '../components/Img.jsx'
import Reveal from '../components/Reveal.jsx'
import FinalCta from '../components/FinalCta.jsx'
import ScrollMedia from '../components/ScrollMedia.jsx'
import Faq from '../components/Faq.jsx'
import { services, getService } from '../data/services.js'
import { faqs } from '../data/content.js'
import NotFound from './NotFound.jsx'
import { site } from '../data/site.js'

export default function ServiceDetail() {
  const { slug } = useParams()
  const s = getService(slug)
  if (!s) return <NotFound />
  const idx = services.indexOf(s)
  const next = services[(idx + 1) % services.length]
  const prev = services[(idx - 1 + services.length) % services.length]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${s.title} in Bangalore`,
    serviceType: s.title,
    description: s.short,
    areaServed: { '@type': 'City', name: 'Bangalore' },
    provider: { '@type': 'InteriorDesigner', name: site.name, url: site.url },
  }
  return (
    <Page>
      <Seo title={`${s.title} in Bangalore`} description={`${s.short} ${site.name} — interior designers in Bangalore.`} image={`/images/${s.image}-1600.webp`} jsonLd={jsonLd} />
      <PageHero eyebrow={`Service ${String(idx + 1).padStart(2, '0')}`} title={s.title} text={s.short} image={s.image} alt={`${s.title} — sample interior render`}>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link to="/contact#enquiry" className="btn-light">Book a Free Consultation <ArrowRight size={16} /></Link>
        </div>
      </PageHero>

      <section className="container-site grid gap-14 py-24 sm:py-32 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal><span className="eyebrow">Overview</span></Reveal>
          <Reveal delay={0.08}><p className="mt-8 font-serif text-2xl leading-snug sm:text-[2rem]">{s.intro}</p></Reveal>
          <Reveal delay={0.16} className="mt-12">
            <p className="field-label">Ideal for</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {s.idealFor.map((x) => <span key={x} className="border border-charcoal/15 px-3.5 py-2 text-[13px]">{x}</span>)}
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal><span className="eyebrow">What’s Included</span></Reveal>
          <ul className="mt-8 border-t border-charcoal/10">
            {s.scope.map((x, i) => (
              <Reveal as="li" key={x} delay={i * 0.05} className="flex gap-5 border-b border-charcoal/10 py-5">
                <span className="text-[11px] tracking-[0.2em] text-gold-dark">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[15px]">{x}</span>
              </Reveal>
            ))}
          </ul>
          <p className="mt-6 text-xs text-stone-400">Final scope is agreed with you after the consultation and site visit.</p>
        </div>
      </section>

      <section className="container-site grid gap-4 pb-24 sm:grid-cols-3 sm:pb-32">
        {s.gallery.map((g, i) => (
          <ScrollMedia key={g} name={g} alt={`${s.title} idea — sample render ${i + 1}`} variant="doors" className="aspect-[4/5]" sizes="(min-width: 640px) 33vw, 100vw" />
        ))}
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><span className="eyebrow">Common Questions</span><h2 className="h-section mt-6">Good to Know</h2></div>
          <div className="lg:col-span-8"><Faq items={faqs.slice(0, 5)} /></div>
        </div>
      </section>

      <nav className="container-site grid grid-cols-2 border-t border-charcoal/10" aria-label="Other services">
        <Link to={`/services/${prev.slug}`} className="group flex flex-col gap-2 py-10 pr-4">
          <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-stone-400"><ArrowLeft size={14} /> Previous</span>
          <span className="font-serif text-xl transition-colors group-hover:text-gold-dark sm:text-3xl">{prev.title}</span>
        </Link>
        <Link to={`/services/${next.slug}`} className="group flex flex-col items-end gap-2 border-l border-charcoal/10 py-10 pl-4 text-right">
          <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-stone-400">Next <ArrowRight size={14} /></span>
          <span className="font-serif text-xl transition-colors group-hover:text-gold-dark sm:text-3xl">{next.title}</span>
        </Link>
      </nav>
      <FinalCta id="service-consultation" image={s.gallery[0]} />
    </Page>
  )
}
