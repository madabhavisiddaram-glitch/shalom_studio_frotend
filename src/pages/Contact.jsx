import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import Page from '../components/Page.jsx'
import Seo, { businessJsonLd } from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import EnquiryForm from '../components/EnquiryForm.jsx'
import Reveal from '../components/Reveal.jsx'
import Img from '../components/Img.jsx'
import { WhatsApp } from '../components/Icons.jsx'
import { site, telLink, whatsappLink, mailLink } from '../data/site.js'

export default function Contact() {
  const rows = [
    { Icon: Phone, label: 'Call', value: site.phone, href: telLink() },
    { Icon: WhatsApp, label: 'WhatsApp', value: site.whatsapp, href: whatsappLink(), ext: true },
    { Icon: Mail, label: 'Email', value: site.email, href: mailLink() },
    { Icon: MapPin, label: 'Studio', value: site.address },
    { Icon: Clock, label: 'Hours', value: site.hours },
  ]
  return (
    <Page>
      <Seo title="Contact & Free Design Consultation" description="Book a free interior design consultation in Bangalore. Call, WhatsApp or send an enquiry for apartments, villas and commercial spaces." jsonLd={businessJsonLd()} />
      <PageHero eyebrow="Contact" title="Your Dream Space Begins With a Conversation." text="Have a space in mind? Let’s discuss your ideas and explore how we can bring them to life." />

      <section className="container-site grid gap-16 pb-24 sm:pb-32 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <ul className="border-t border-charcoal/10">
            {rows.map(({ Icon, label, value, href, ext }) => (
              <li key={label} className="border-b border-charcoal/10 py-6">
                <p className="field-label">{label}</p>
                {href ? (
                  <a href={href} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="mt-2 flex items-center gap-3 font-serif text-xl transition-colors hover:text-gold-dark">
                    <Icon width={18} height={18} size={18} className="text-gold" /> {value}
                  </a>
                ) : (
                  <p className="mt-2 flex items-start gap-3 font-serif text-xl"><Icon width={18} height={18} size={18} className="mt-1 shrink-0 text-gold" /> {value}</p>
                )}
              </li>
            ))}
          </ul>
          <Img name="v-dining-1" alt="Dining area with pendant lights and backlit art (sample render)" className="mt-10 hidden aspect-[4/3] lg:block" sizes="30vw" />
        </aside>

        <div id="enquiry" className="scroll-mt-28 lg:col-span-7 lg:col-start-6">
          <Reveal>
            <div className="bg-white p-6 shadow-[0_30px_80px_-40px_rgba(36,36,36,0.25)] sm:p-12">
              <span className="eyebrow">Enquiry Form</span>
              <h2 className="mt-5 font-serif text-4xl">Book Your Free Design Consultation</h2>
              <p className="mb-10 mt-3 text-sm text-stone-400">Fields marked * are required.</p>
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-label="Map" className="container-site pb-24">
        {site.mapEmbedUrl ? (
          <iframe title="Studio location map" src={site.mapEmbedUrl} className="h-[420px] w-full grayscale" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        ) : (
          <div className="flex h-[260px] items-center justify-center border border-dashed border-gold/60 bg-champagne/40 text-center text-sm text-stone-400">
            [Google Map of the studio location — add the embed URL in src/data/site.js]
          </div>
        )}
      </section>
    </Page>
  )
}
