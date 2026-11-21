import { reasons } from '../../data/content.js'
import SectionHeading from '../SectionHeading.jsx'
import Img from '../Img.jsx'
import Reveal, { Unveil } from '../Reveal.jsx'

export default function WhyUs() {
  return (
    <section className="py-24 sm:py-32 lg:py-40" aria-labelledby="why-title">
      <div className="container-site grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading eyebrow="Why Choose Us" title={<span id="why-title">Thoughtful Design. Trusted Execution.</span>} />
            <Unveil className="mt-12">
              <Img name="v-living-kitchen" alt="Living area with TV unit, wash basin counter and open kitchen beyond (sample render)" className="aspect-[4/3]" sizes="(min-width: 1024px) 38vw, 100vw" />
            </Unveil>
          </div>
        </div>
        <div className="grid gap-x-12 sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:pt-4">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={(i % 2) * 0.1} className="group border-t border-charcoal/15 py-10">
              <span className="block h-px w-0 -translate-y-10 bg-gold transition-all duration-700 ease-lux group-hover:w-full" aria-hidden />
              <p className="text-[11px] tracking-[0.2em] text-gold-dark">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-4 font-serif text-[1.65rem] leading-snug">{r.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-stone-500">{r.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
