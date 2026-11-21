import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react'
import { navLinks, site, telLink, mailLink } from '../data/site.js'
import { services } from '../data/services.js'
import { Instagram, Facebook, Pinterest, Youtube } from './Icons.jsx'

const socials = [
  { key: 'instagram', label: 'Instagram', Icon: Instagram },
  { key: 'facebook', label: 'Facebook', Icon: Facebook },
  { key: 'pinterest', label: 'Pinterest', Icon: Pinterest },
  { key: 'youtube', label: 'YouTube', Icon: Youtube },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-forest text-ivory/80">
      <div className="container-site grid gap-14 py-20 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-4">
          <img src="/brand/logo-full-light.svg" alt={`${site.name} — ${site.tagline}`} className="h-24 w-auto" loading="lazy" />
          <p className="mt-6 font-serif text-xl italic text-gold-light">{site.motto}</p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/65">
            {site.name} is an interior design and architecture studio in Bangalore, creating thoughtful homes and workspaces from first conversation to final reveal.
          </p>
          <ul className="mt-8 flex gap-3" aria-label="Social media">
            {socials.map(({ key, label, Icon }) => {
              const href = site.social[key]
              const cls = 'flex h-10 w-10 items-center justify-center border border-ivory/20 transition-colors duration-500'
              return (
                <li key={key}>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={`${cls} hover:border-gold hover:bg-gold hover:text-white`}>
                      <Icon />
                    </a>
                  ) : (
                    <span aria-label={`${label} (link coming soon)`} title={`${label} link coming soon`} className={`${cls} cursor-default opacity-50`}>
                      <Icon />
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h3 className="font-sans text-[11px] font-medium uppercase tracking-eyebrow text-gold-light">Explore</h3>
          <ul className="mt-6 space-y-3 text-sm">
            {navLinks.map((l) => (
              <li key={l.to}><Link className="transition-colors hover:text-white" to={l.to}>{l.label}</Link></li>
            ))}
            <li><Link className="transition-colors hover:text-white" to="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h3 className="font-sans text-[11px] font-medium uppercase tracking-eyebrow text-gold-light">Services</h3>
          <ul className="mt-6 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}><Link className="transition-colors hover:text-white" to={`/services/${s.slug}`}>{s.title}</Link></li>
            ))}
          </ul>
        </div>

        <address className="not-italic lg:col-span-3">
          <h3 className="font-sans text-[11px] font-medium uppercase tracking-eyebrow text-gold-light">Visit & Contact</h3>
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex gap-3"><MapPin size={16} className="mt-0.5 shrink-0 text-gold" /> <span>{site.address}</span></li>
            <li className="flex gap-3"><Phone size={16} className="mt-0.5 shrink-0 text-gold" />
              {telLink() ? <a href={telLink()} className="hover:text-white">{site.phone}</a> : <span>{site.phone}</span>}
            </li>
            <li className="flex gap-3"><Mail size={16} className="mt-0.5 shrink-0 text-gold" />
              {mailLink() ? <a href={mailLink()} className="hover:text-white">{site.email}</a> : <span>{site.email}</span>}
            </li>
          </ul>
          <Link to="/contact#enquiry" className="link-line mt-8 text-ivory">Book a free consultation <ArrowUpRight size={14} /></Link>
        </address>
      </div>
      <div className="border-t border-ivory/10">
        <div className="container-site flex flex-col gap-3 py-6 text-xs text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>Interior Designers in Bangalore, Karnataka · <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></p>
        </div>
      </div>
    </footer>
  )
}
