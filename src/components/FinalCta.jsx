import { Phone, Mail } from 'lucide-react'
import Img from './Img.jsx'
import Reveal from './Reveal.jsx'
import EnquiryForm from './EnquiryForm.jsx'
import { site, telLink, whatsappLink, mailLink } from '../data/site.js'
import { WhatsApp } from './Icons.jsx'

export default function FinalCta({ id = 'consultation', image = 'v-living' }) {
  const tel = telLink()
  const wa = whatsappLink()
  const mail = mailLink()
  const item = 'flex items-center gap-4 border-b border-ivory/15 py-5 text-ivory/85 transition-colors'
  return (
    <section id={id} className="relative overflow-hidden bg-charcoal py-24 text-ivory sm:py-32 lg:py-40" aria-labelledby={`${id}-title`}>
      <Img name={image} alt="" className="absolute inset-0 h-full w-full opacity-25" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/70" />
      <div className="container-site relative grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal><span className="eyebrow eyebrow-light">Free Design Consultation</span></Reveal>
          <Reveal delay={0.08}><h2 id={`${id}-title`} className="h-section mt-6 text-balance">Your Dream Space Begins With a <em className="text-gold-light">Conversation.</em></h2></Reveal>
          <Reveal delay={0.16}><p className="mt-7 max-w-md text-lg leading-relaxed text-ivory/70">Have a space in mind? Let’s discuss your ideas and explore how we can bring them to life.</p></Reveal>
          <Reveal delay={0.24} className="mt-12 border-t border-ivory/15">
            {tel ? <a href={tel} className={`${item} hover:text-white`}><Phone size={18} className="text-gold" /> {site.phone}</a> : <p className={item}><Phone size={18} className="text-gold" /> {site.phone}</p>}
            {wa ? <a href={wa} target="_blank" rel="noopener noreferrer" className={`${item} hover:text-white`}><WhatsApp width={18} height={18} className="text-gold" /> {site.whatsapp}</a> : <p className={item}><WhatsApp width={18} height={18} className="text-gold" /> {site.whatsapp}</p>}
            {mail ? <a href={mail} className={`${item} hover:text-white`}><Mail size={18} className="text-gold" /> {site.email}</a> : <p className={item}><Mail size={18} className="text-gold" /> {site.email}</p>}
          </Reveal>
        </div>
        <Reveal delay={0.1} className="border border-ivory/10 bg-charcoal/60 p-6 backdrop-blur-sm sm:p-10 lg:col-span-7">
          <h3 className="font-serif text-3xl">Book Your Free Design Consultation</h3>
          <p className="mb-8 mt-2 text-sm text-ivory/55">Fields marked * are required.</p>
          <EnquiryForm dark compact />
        </Reveal>
      </div>
    </section>
  )
}
