import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Img from './Img.jsx'
import { categories } from '../data/projects.js'

export default function ProjectCard({ project, aspect = 'aspect-[4/5]', sizes = '(min-width: 1024px) 40vw, 100vw' }) {
  const cat = categories.find((c) => c.id === project.category)?.label
  return (
    <Link to={`/projects/${project.slug}`} className="group block" aria-label={`${project.name} — view sample project`}>
      <div className="relative overflow-hidden shadow-[0_10px_30px_-24px_rgba(36,36,36,0.5)] transition-all duration-700 ease-lux group-hover:-translate-y-1.5 group-hover:shadow-[0_34px_60px_-30px_rgba(36,36,36,0.55)]">
        <Img name={project.cover} alt={`${project.name}, ${project.style.toLowerCase()} ${cat?.toLowerCase()} — sample 3D render`} className={aspect} sizes={sizes} zoom />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <span className="sample-tag absolute left-4 top-4">Sample project</span>
        <span className="absolute bottom-5 right-5 flex h-12 w-12 translate-y-3 items-center justify-center rounded-full bg-ivory text-charcoal opacity-0 transition-all duration-500 ease-lux group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={18} strokeWidth={1.4} />
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl transition-colors group-hover:text-gold-dark">{project.name}</h3>
          <p className="mt-1.5 text-[12px] uppercase tracking-[0.16em] text-stone-400">{cat} · {project.style}</p>
        </div>
        <p className="shrink-0 pt-1.5 text-xs text-stone-400">{project.location}</p>
      </div>
    </Link>
  )
}
