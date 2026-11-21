import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { navLinks, site, telLink } from '../data/site.js'
import { ease } from './Reveal.jsx'

// Pages whose top section is a dark full-bleed image/video
const DARK_HERO = [/^\/$/, /^\/services\/.+/, /^\/projects\/.+/, /^\/about$/]

export default function Header() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const overHero = DARK_HERO.some((r) => r.test(pathname))
  const solid = scrolled || !overHero

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const light = !solid && !open
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-lux ${
        solid && !open ? 'bg-ivory/[0.97] shadow-[0_1px_0_rgba(36,36,36,0.08)] md:bg-ivory/90 md:backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className={`container-site flex items-center justify-between transition-all duration-700 ease-lux ${solid ? 'h-20' : 'h-24 lg:h-28'}`}>
        <Link to="/" className="relative z-10 flex items-center gap-3" aria-label={`${site.name} — home`}>
          <img src="/brand/logo-mark.svg" alt="" className={`w-auto transition-all duration-700 ${solid ? 'h-9' : 'h-11'}`} />
          <img
            src={light ? '/brand/wordmark-light.svg' : '/brand/wordmark-dark.svg'}
            alt={site.name}
            className={`w-auto transition-all duration-700 ${solid ? 'h-6' : 'h-7'} max-[360px]:hidden`}
          />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `group relative py-2 text-[12px] font-medium uppercase tracking-[0.22em] transition-colors ${
                      light ? 'text-ivory/85 hover:text-white' : 'text-charcoal/75 hover:text-charcoal'
                    } ${isActive ? (light ? '!text-white' : '!text-charcoal') : ''}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {l.label}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-500 ease-lux ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/contact#enquiry" className={`hidden md:inline-flex ${light ? 'btn-outline-light' : 'btn-dark'} !px-5 !py-3`}>
            Free Consultation
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className={`relative z-10 -mr-2 p-2 lg:hidden ${light ? 'text-white' : 'text-charcoal'}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X strokeWidth={1.3} /> : <Menu strokeWidth={1.3} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease }}
            className="fixed inset-0 -z-0 flex flex-col bg-ivory px-6 pb-10 pt-28 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex-1">
              <ul className="space-y-2">
                {navLinks.map((l, i) => (
                  <motion.li key={l.to} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease }}>
                    <NavLink
                      to={l.to}
                      end={l.to === '/'}
                      className={({ isActive }) => `flex items-baseline gap-4 py-2 font-serif text-4xl ${isActive ? 'text-gold-dark' : 'text-charcoal'}`}
                    >
                      <span className="font-sans text-[11px] tracking-[0.2em] text-stone-400">0{i + 1}</span>
                      {l.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="space-y-4 border-t border-charcoal/10 pt-6">
              <Link to="/contact#enquiry" className="btn-dark w-full">Book a Free Consultation</Link>
              {telLink() ? (
                <a href={telLink()} className="btn-outline w-full"><Phone size={15} /> {site.phone}</a>
              ) : (
                <p className="text-center text-sm text-stone-400">Phone: {site.phone}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
