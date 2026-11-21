import Reveal from './Reveal.jsx'

export default function SectionHeading({ eyebrow, title, text, light = false, align = 'left', className = '', as = 'h2' }) {
  const H = as
  const center = align === 'center'
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && (
        <Reveal>
          <span className={`eyebrow ${light ? 'eyebrow-light' : ''} ${center ? 'justify-center' : ''}`}>{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <H className={`h-section mt-5 text-balance ${light ? 'text-ivory' : 'text-charcoal'}`}>{title}</H>
      </Reveal>
      {text && (
        <Reveal delay={0.16}>
          <p className={`lead mt-6 ${light ? '!text-ivory/70' : ''} ${center ? 'mx-auto' : ''} max-w-2xl`}>{text}</p>
        </Reveal>
      )}
    </div>
  )
}
