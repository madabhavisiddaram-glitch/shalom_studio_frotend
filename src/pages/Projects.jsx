import { useSearchParams } from 'react-router-dom'
import { Info } from 'lucide-react'
import Page from '../components/Page.jsx'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import ProjectGallery from '../components/ProjectGallery.jsx'
import FinalCta from '../components/FinalCta.jsx'
import { categories } from '../data/projects.js'

export default function Projects() {
  const [params] = useSearchParams()
  const initial = categories.some((c) => c.id === params.get('category')) ? params.get('category') : 'all'
  return (
    <Page>
      <Seo title="Interior Design Projects & Portfolio" description="Explore living rooms, bedrooms, modular kitchens and complete home interiors designed for Bangalore homes." />
      <PageHero eyebrow="Portfolio" title="Every Space Has a Story." text="Browse interiors by room or property type. Open any project to see the full gallery.">
        <p className="mt-8 inline-flex items-start gap-2 bg-champagne/60 px-4 py-3 text-sm text-stone-500">
          <Info size={16} className="mt-0.5 shrink-0 text-gold-dark" />
          The projects currently shown are sample 3D design renders with placeholder details.
        </p>
      </PageHero>
      <section className="container-site pb-24 sm:pb-32">
        <ProjectGallery initial={initial} />
      </section>
      <FinalCta id="projects-consultation" image="d-kitchen-3" />
    </Page>
  )
}
