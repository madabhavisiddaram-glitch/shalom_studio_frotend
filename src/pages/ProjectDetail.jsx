import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Expand } from 'lucide-react'
import Page from '../components/Page.jsx'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Img from '../components/Img.jsx'
import Reveal, { Unveil } from '../components/Reveal.jsx'
import Lightbox from '../components/Lightbox.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import FinalCta from '../components/FinalCta.jsx'
import { projects, getProject, categories } from '../data/projects.js'
import NotFound from './NotFound.jsx'

// Repeating editorial layout for gallery images
const pattern = ['md:col-span-12 aspect-[16/9]', 'md:col-span-7 aspect-[4/3]', 'md:col-span-5 aspect-[4/5] md:aspect-auto', 'md:col-span-5 aspect-[4/5] md:aspect-auto', 'md:col-span-7 aspect-[4/3]']

export default function ProjectDetail() {
  const { slug } = useParams()
  const p = getProject(slug)
  const [lb, setLb] = useState(null)
  if (!p) return <NotFound />
  const cat = categories.find((c) => c.id === p.category)?.label
  const idx = projects.indexOf(p)
  const next = projects[(idx + 1) % projects.length]
  const related = projects.filter((x) => x.slug !== p.slug && x.category === p.category).slice(0, 2)
  const more = related.length ? related : projects.filter((x) => x.slug !== p.slug).slice(0, 2)
  const facts = [
    ['Category', cat],
    ['Property Type', p.propertyType],
    ['Location', p.location],
    ['Interior Style', p.style],
  ]
  return (
    <Page>
      <Seo title={`${p.name} — Sample Project`} description={`${p.style} ${cat?.toLowerCase()} interior — sample design project.`} image={`/images/${p.cover}-1600.webp`} />
      <PageHero eyebrow={`Sample Project · ${cat}`} title={p.name} image={p.cover} alt={`${p.name} — sample 3D render`} />

      <section className="container-site grid gap-12 py-20 sm:py-28 lg:grid-cols-12">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-8 lg:col-span-5 lg:grid-cols-2">
          {facts.map(([k, v]) => (
            <div key={k} className="border-t border-charcoal/15 pt-4">
              <dt className="field-label">{k}</dt>
              <dd className="mt-1 font-serif text-xl">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal><p className="font-serif text-2xl leading-snug sm:text-[1.75rem]">{p.summary}</p></Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 border-l-2 border-gold pl-4 text-sm text-stone-500">
              This is a sample project created with 3D design renders. Project name and details are placeholders and will be replaced with real project information.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-site grid auto-rows-auto gap-4 pb-24 md:grid-cols-12 md:gap-5" aria-label="Project gallery">
        {p.images.map((im, i) => (
          <Unveil key={im} className={`relative ${pattern[i % pattern.length]}`} delay={(i % 2) * 0.1}>
            <button onClick={() => setLb(i)} className="group block h-full w-full" aria-label={`Open image ${i + 1} of ${p.images.length} in full screen`}>
              <Img name={im} alt={`${p.name} — sample render ${i + 1}`} className="h-full w-full" sizes="(min-width: 768px) 60vw, 100vw" zoom />
              <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/90 opacity-0 transition-opacity duration-500 group-hover:opacity-100"><Expand size={15} /></span>
            </button>
          </Unveil>
        ))}
      </section>

      <Lightbox images={p.images} index={lb} onIndex={setLb} onClose={() => setLb(null)} title={p.name} />

      <section className="bg-white py-24 sm:py-32">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="h-section">More Projects</h2>
            <Link to="/projects" className="link-line"><ArrowLeft size={14} /> All projects</Link>
          </div>
          <div className="mt-14 grid gap-12 sm:grid-cols-2">
            {more.map((x) => <ProjectCard key={x.slug} project={x} aspect="aspect-[4/3]" sizes="(min-width: 640px) 50vw, 100vw" />)}
          </div>
          <Link to={`/projects/${next.slug}`} className="group mt-20 flex items-center justify-between border-t border-charcoal/15 pt-10">
            <span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-stone-400">Next project</span>
              <span className="mt-2 block font-serif text-3xl transition-colors group-hover:text-gold-dark sm:text-5xl">{next.name}</span>
            </span>
            <ArrowRight className="shrink-0 transition-transform duration-500 group-hover:translate-x-2" strokeWidth={1.2} size={36} />
          </Link>
        </div>
      </section>
      <FinalCta id="project-consultation" image={p.images[1] || p.cover} />
    </Page>
  )
}
