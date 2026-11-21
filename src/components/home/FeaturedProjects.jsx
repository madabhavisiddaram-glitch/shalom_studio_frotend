import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionHeading from '../SectionHeading.jsx'
import ProjectGallery from '../ProjectGallery.jsx'
import Reveal from '../Reveal.jsx'

export default function FeaturedProjects() {
  return (
    <section className="bg-white py-24 sm:py-32 lg:py-40" aria-labelledby="projects-title">
      <div className="container-site">
        <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Featured Projects" title={<span id="projects-title">Every Space Has a Story.</span>} text="A selection of interiors across living rooms, bedrooms, kitchens and complete homes. The projects shown are sample design renders." />
        </div>
        <ProjectGallery limit={6} />
        <Reveal className="mt-20 flex justify-center">
          <Link to="/projects" className="btn-outline">View all projects <ArrowRight size={15} /></Link>
        </Reveal>
      </div>
    </section>
  )
}
