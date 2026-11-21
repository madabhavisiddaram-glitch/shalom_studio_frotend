import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

/**
 * Types its text out letter by letter when scrolled into view.
 * `lines` is an array of strings; each renders on its own line.
 * Screen readers get the full text immediately.
 */
export default function Typewriter({ lines, speed = 55, startDelay = 250, className = '', as: Tag = 'h2', id }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const full = lines.join('\n')
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setCount(full.length); return }
    let i = 0
    let timer
    const tick = () => {
      i += 1
      setCount(i)
      if (i < full.length) timer = setTimeout(tick, full[i - 1] === '\n' ? speed * 4 : speed)
    }
    timer = setTimeout(tick, startDelay)
    return () => clearTimeout(timer)
  }, [inView, full, speed, startDelay])

  const typed = full.slice(0, count).split('\n')
  const done = count >= full.length
  return (
    <Tag ref={ref} id={id} className={className} aria-label={lines.join(' ')}>
      {lines.map((line, i) => (
        <span key={i} className="relative block" aria-hidden>
          {/* invisible full line reserves space so layout never jumps */}
          <span className="invisible">{line || ' '}</span>
          <span className="absolute inset-0">
            {typed[i] ?? ''}
            {(i === typed.length - 1 || (done && i === lines.length - 1)) && (
              <span className={`ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.08em] bg-gold ${done ? 'animate-[blink_1s_step-end_infinite]' : ''}`} />
            )}
          </span>
        </span>
      ))}
    </Tag>
  )
}
