import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import FloatingContact from './FloatingContact.jsx'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // wait for lazy page to render
      let tries = 0
      const t = setInterval(() => {
        const el = document.getElementById(hash.slice(1))
        if (el || ++tries > 20) {
          clearInterval(t)
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 80)
      return () => clearInterval(t)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

export default function Layout({ children }) {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-charcoal focus:px-4 focus:py-2 focus:text-ivory">
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      {children}
      <Footer />
      <FloatingContact />
      <div className="h-16 bg-forest md:hidden" aria-hidden />
    </>
  )
}
