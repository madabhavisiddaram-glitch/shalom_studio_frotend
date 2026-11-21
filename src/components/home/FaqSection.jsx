import Typewriter from '../Typewriter.jsx'
import Faq from '../Faq.jsx'
import Reveal from '../Reveal.jsx'
import { Link } from 'react-router-dom'

export default function FaqSection() {
  return (
    <section className="bg-white py-24 sm:py-32 lg:py-40" aria-labelledby="faq-title">
      <div className="container-site grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal><span className="eyebrow">FAQ</span></Reveal>
          <Typewriter id="faq-title" lines={['Questions,', 'Answered.']} className="h-section mt-5" />
          <Reveal delay={0.2}><p className="lead mt-6 max-w-sm">Everything you might want to know before starting your interior project in Bangalore.</p></Reveal>
          <Reveal delay={0.2}><Link to="/contact#enquiry" className="link-line mt-10 text-gold-dark">Ask us anything else</Link></Reveal>
        </div>
        <div className="lg:col-span-8">
          <Faq />
        </div>
      </div>
    </section>
  )
}
