import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { styles } from '../../data/content.js'
import SectionHeading from '../SectionHeading.jsx'
import Img from '../Img.jsx'
import Reveal from '../Reveal.jsx'

export default function Styles() {
  const track = useRef(null)
  const scroll = (d) => track.current?.scrollBy({ left: d * track.current.clientWidth * 0.6, behavior: 'smooth' })
  return (
    <section className="overflow-hidden py-24 sm:py-32 lg:py-40" aria-labelledby="styles-title">
      <div className="container-site flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading eyebrow="Design Styles" title={<span id="styles-title">Find Your Signature Style.</span>} text="Every home has its own character. Explore the design languages we work with, or bring us a mix that is entirely yours." />
        <Reveal className="flex gap-3">
          <button onClick={() => scroll(-1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-charcoal/20 transition-colors hover:bg-charcoal hover:text-ivory" aria-label="Previous styles"><ArrowLeft size={18} strokeWidth={1.3} /></button>
          <button onClick={() => scroll(1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-charcoal/20 transition-colors hover:bg-charcoal hover:text-ivory" aria-label="Next styles"><ArrowRight size={18} strokeWidth={1.3} /></button>
        </Reveal>
      </div>
      <div
        ref={track}
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 sm:px-8 lg:px-[max(3rem,calc((100vw-88rem)/2+3rem))]"
        tabIndex={0}
        aria-label="Design styles, scroll horizontally"
      >
        {styles.map((s, i) => (
          <article key={s.name} className="group relative w-[78vw] shrink-0 snap-start overflow-hidden sm:w-[46vw] lg:w-[23rem]">
            <Img name={s.image} alt={`${s.name} interior style — sample image`} className="aspect-[3/4.2]" sizes="(min-width: 1024px) 23rem, 78vw" zoom />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-ivory">
              <p className="text-[11px] tracking-[0.2em] text-gold-light">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-2 font-serif text-[1.75rem] leading-tight">{s.name}</h3>
              <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-ivory/80 opacity-0 transition-all duration-700 ease-lux group-hover:max-h-24 group-hover:opacity-100 max-lg:max-h-24 max-lg:opacity-100">{s.text}</p>
            </div>
          </article>
        ))}
        <div className="w-1 shrink-0" aria-hidden />
      </div>
    </section>
  )
}
