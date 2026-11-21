/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION — edit this one file to update brand and
 *  contact details everywhere on the website.
 *  Anything in [SQUARE BRACKETS] is a placeholder to replace.
 * ─────────────────────────────────────────────────────────────
 */
export const site = {
  name: 'Shalom Studio',
  motto: 'Designed for Peace. Crafted for Life.',
  tagline: 'Interiors and Architecture', // from the logo pack; replace with [TAGLINE] if you prefer another
  city: 'Bangalore',
  region: 'Karnataka',
  country: 'India',
  url: 'https://www.example.com', // [WEBSITE URL] — also update public/sitemap.xml and public/robots.txt

  phone: '+91 91803 70969', // display format, e.g. +91 98765 43210
  phoneHref: '919180370969', // digits only with country code, e.g. 919876543210 — leave empty until real
  whatsapp: '+91 91803 70969',
  whatsappHref: '919180370969', // digits only with country code, e.g. 919876543210 — leave empty until real
  email: 'md@shalomstudio.com',
  address: '[OFFICE ADDRESS], Bangalore, Karnataka',
  hours: '[WORKING HOURS]',
  mapEmbedUrl: '', // paste a Google Maps embed URL here to show a map on the Contact page

  social: {
    instagram: '', // full profile URLs — empty links show as disabled
    facebook: '',
    pinterest: '',
    youtube: '',
  },

  whatsappMessage: 'Hello! I would like to discuss interiors for my home.',
}

export const isSet = (value) => Boolean(value) && !/^\[.*\]$/.test(value)

export const telLink = () => (site.phoneHref ? `tel:+${site.phoneHref}` : null)
export const mailLink = () => (isSet(site.email) ? `mailto:${site.email}` : null)
export const whatsappLink = (text = site.whatsappMessage) =>
  site.whatsappHref ? `https://wa.me/${site.whatsappHref}?text=${encodeURIComponent(text)}` : null

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]
