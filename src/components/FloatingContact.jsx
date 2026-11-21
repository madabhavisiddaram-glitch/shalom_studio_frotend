import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, CalendarDays } from 'lucide-react'
import { whatsappLink, telLink, site } from '../data/site.js'
import { WhatsApp } from './Icons.jsx'

/** Sticky WhatsApp button (desktop + mobile) and a mobile quick-action bar */
export default function FloatingContact() {
  const wa = whatsappLink()
  const tel = telLink()
  const waProps = wa
    ? { href: wa, target: '_blank', rel: 'noopener noreferrer' }
    : { href: '/contact#enquiry', title: 'WhatsApp number coming soon — use the enquiry form' }
  return (
    <>
      <motion.a
        {...waProps}
        aria-label="Chat with us on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.6, type: 'spring', stiffness: 200, damping: 18 }}
        className="group fixed bottom-24 right-5 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.35)] transition-transform hover:scale-105 md:bottom-8 md:right-8 md:flex"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" aria-hidden />
        <WhatsApp />
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap bg-charcoal px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-ivory opacity-0 transition-opacity group-hover:opacity-100 md:block">
          WhatsApp us
        </span>
      </motion.a>

      <nav aria-label="Quick contact" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-charcoal/10 bg-ivory/95 backdrop-blur md:hidden">
        {tel ? (
          <a href={tel} className="flex flex-col items-center gap-1 py-3 text-[10px] uppercase tracking-[0.16em]"><Phone size={17} strokeWidth={1.4} /> Call</a>
        ) : (
          <span className="flex flex-col items-center gap-1 py-3 text-[10px] uppercase tracking-[0.16em] text-stone-400" title={site.phone}><Phone size={17} strokeWidth={1.4} /> Call</span>
        )}
        <a {...waProps} className="flex flex-col items-center gap-1 border-x border-charcoal/10 py-3 text-[10px] uppercase tracking-[0.16em]">
          <WhatsApp width={17} height={17} /> WhatsApp
        </a>
        <Link to="/contact#enquiry" className="flex flex-col items-center gap-1 bg-charcoal py-3 text-[10px] uppercase tracking-[0.16em] text-ivory">
          <CalendarDays size={17} strokeWidth={1.4} /> Enquire
        </Link>
      </nav>
    </>
  )
}
