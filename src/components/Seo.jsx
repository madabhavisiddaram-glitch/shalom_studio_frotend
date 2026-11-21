import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { site, isSet } from '../data/site.js'

export default function Seo({ title, description, image = '/images/og-image.jpg', jsonLd, noindex = false }) {
  const { pathname } = useLocation()
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | ${site.motto} Interior Designers in Bangalore`
  const url = `${site.url}${pathname}`
  const img = image.startsWith('http') ? image : `${site.url}${image}`
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:locale" content="en_IN" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      <meta name="geo.region" content="IN-KA" />
      <meta name="geo.placename" content="Bangalore" />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}

export const businessJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'InteriorDesigner',
  name: site.name,
  slogan: site.motto,
  description: `${site.name} — ${site.tagline}. Turnkey interior design for apartments, villas and commercial spaces in Bangalore.`,
  url: site.url,
  logo: `${site.url}/brand/logo-full-dark.svg`,
  image: `${site.url}/images/og-image.jpg`,
  ...(site.phoneHref ? { telephone: `+${site.phoneHref}` } : {}),
  ...(isSet(site.email) ? { email: site.email } : {}),
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bangalore',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  areaServed: { '@type': 'City', name: 'Bangalore' },
  sameAs: Object.values(site.social).filter(Boolean),
})
