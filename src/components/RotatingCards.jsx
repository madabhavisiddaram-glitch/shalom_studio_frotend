import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { animate, motion, useAnimationFrame, useInView, useMotionValue, useTransform } from 'framer-motion'
import { Hand, Volume2, VolumeX } from 'lucide-react'
import { audioContext, createSpinSound, soundPref } from '../lib/spinSound.js'
import { src } from '../lib/img.js'

/**
 * Draggable 3D ring of cards that slowly auto-rotates.
 *
 * With `intro`, the first time the ring scrolls into view it plays a cinematic
 * intro: the ring appears large in the centre of the screen and spins fast for
 * `introSeconds`, then shrinks and flies back into its normal place, where it
 * keeps rotating slowly. Click, scroll, touch or any key skips the intro.
 * Plays once per page load and is skipped for reduced-motion users.
 *
 * items: [{ image, title, to? }]
 */

const radiusFor = (card, n) => Math.round((card / 2 + 14) / Math.tan(Math.PI / n))

function Ring({ items, rotation, card, interactive, dragRef }) {
  const n = items.length
  const step = 360 / n
  const radius = radiusFor(card, n)
  const h = card * 1.35
  const ringTransform = useTransform(rotation, (r) => `rotateX(-8deg) rotateY(${r}deg)`)
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ width: card, height: h, marginLeft: -card / 2, marginTop: -h / 2, transformStyle: 'preserve-3d', transform: ringTransform }}
    >
      {items.map((it, i) => {
        const face = (
          <figure className="h-full w-full overflow-hidden border border-white/60 bg-white p-1.5 shadow-[0_30px_60px_-30px_rgba(36,36,36,0.55)]">
            <img src={src(it.image, 800)} alt={`${it.title} — sample render`} draggable={false} loading="lazy" className="h-[82%] w-full object-cover" />
            <figcaption className="flex h-[18%] items-center justify-center px-2 text-center font-serif leading-tight text-charcoal" style={{ fontSize: Math.max(12, card * 0.075) }}>
              {it.title}
            </figcaption>
          </figure>
        )
        return (
          <div key={it.title} className="absolute inset-0" style={{ transform: `rotateY(${i * step}deg) translateZ(${radius}px)`, backfaceVisibility: 'hidden' }}>
            {interactive && it.to ? (
              <Link
                to={it.to}
                draggable={false}
                onClick={(e) => { if (dragRef.current.moved > 6) e.preventDefault() }}
                className="block h-full w-full transition-transform duration-500 hover:-translate-y-2"
                aria-label={it.title}
              >
                {face}
              </Link>
            ) : face}
          </div>
        )
      })}
    </motion.div>
  )
}

export default function RotatingCards({ items, speed = 9, className = '', scale = 0.27, maxCard = 220, intro = false, introSeconds = 5.5, onPhaseChange }) {
  const wrap = useRef(null)
  const rotation = useMotionValue(0)
  const spin = useRef(speed) // current auto-rotation speed, deg/s
  const [card, setCard] = useState(200)
  const drag = useRef({ active: false, lastX: 0, lastT: 0, velocity: 0, moved: 0 })
  const hovering = useRef(false)
  const reduce = useRef(false)
  const inView = useInView(wrap, { once: true, amount: 0.55 })

  // intro state: idle -> intro -> returning -> done
  const [phase, setPhase] = useState(intro ? 'idle' : 'done')
  const fly = { x: useMotionValue(0), y: useMotionValue(0), s: useMotionValue(1), bg: useMotionValue(0) }
  const n = items.length
  useEffect(() => { onPhaseChange?.(phase) }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  // sound
  const sound = useRef(null)
  const [soundOn, setSoundOn] = useState(true)
  const [audioReady, setAudioReady] = useState(false)
  useEffect(() => setSoundOn(soundPref.get()), [])

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce.current) setPhase('done')
    const el = wrap.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setCard(Math.max(130, Math.min(maxCard, e.contentRect.width * scale))))
    ro.observe(el)
    return () => ro.disconnect()
  }, [scale, maxCard])

  // big centred ring size for the intro
  const [bigCard, setBigCard] = useState(300)
  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth, vh = window.innerHeight
      const byWidth = (vw * 1.05) / (1 / Math.tan(Math.PI / n) + 1.2) // keep ring inside screen width
      setBigCard(Math.max(160, Math.min(420, byWidth, vh * 0.33)))
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [n])

  // start intro when first in view
  useEffect(() => {
    if (phase !== 'idle' || !inView) return
    fly.x.set(0); fly.y.set(0); fly.s.set(1)
    fly.bg.set(1)
    spin.current = 150
    setPhase('intro')
    const ac = audioContext()
    if (ac && soundPref.get()) {
      ac.resume?.().catch(() => {})
      sound.current = createSpinSound()
      sound.current?.setSpeed(150, n)
      sound.current?.fadeIn()
    }
    setAudioReady(ac?.state === 'running')
  }, [inView, phase]) // eslint-disable-line react-hooks/exhaustive-deps

  // end intro after N seconds or on skip
  useEffect(() => {
    if (phase !== 'intro') return
    const finish = (e) => {
      if (e?.target?.closest?.('[data-keep-intro]')) return
      setPhase('returning')
    }
    const t = setTimeout(finish, introSeconds * 1000)
    const evs = ['wheel', 'touchmove', 'keydown', 'pointerdown']
    evs.forEach((e) => window.addEventListener(e, finish, { passive: true }))
    return () => { clearTimeout(t); evs.forEach((e) => window.removeEventListener(e, finish)) }
  }, [phase, introSeconds])

  // fly back to the in-page position
  useEffect(() => {
    if (phase !== 'returning') return
    const r = wrap.current.getBoundingClientRect()
    const tx = r.left + r.width / 2 - window.innerWidth / 2
    const ty = r.top + r.height / 2 - 20 - window.innerHeight / 2
    const ease = [0.22, 1, 0.36, 1]
    const d = 1.1
    spin.current = speed
    sound.current?.stop(0.7)
    sound.current = null
    animate(fly.x, tx, { duration: d, ease })
    animate(fly.y, ty, { duration: d, ease })
    animate(fly.s, card / bigCard, { duration: d, ease })
    animate(fly.bg, 0, { duration: d * 0.9, ease: 'easeOut' })
    const t = setTimeout(() => setPhase('done'), d * 1000 + 20)
    return () => clearTimeout(t)
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  useAnimationFrame((_, delta) => {
    const d = drag.current
    if (d.active) return
    if (Math.abs(d.velocity) > 0.02) {
      rotation.set(rotation.get() + d.velocity * delta)
      d.velocity *= Math.pow(0.94, delta / 16)
      return
    }
    if (phase === 'done' && (hovering.current || reduce.current)) return
    rotation.set(rotation.get() - (spin.current * delta) / 1000)
  })

  const onDown = (e) => {
    drag.current = { active: true, lastX: e.clientX, lastT: performance.now(), velocity: 0, moved: 0 }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onMove = (e) => {
    const d = drag.current
    if (!d.active) return
    const dx = e.clientX - d.lastX
    const now = performance.now()
    const deg = dx * 0.35
    rotation.set(rotation.get() + deg)
    d.velocity = deg / Math.max(1, now - d.lastT)
    d.moved += Math.abs(dx)
    d.lastX = e.clientX
    d.lastT = now
  }
  const onUp = () => { drag.current.active = false }

  const h = card * 1.35
  const overlay = (phase === 'intro' || phase === 'returning') && typeof document !== 'undefined'
  const toggleSound = () => {
    const ac = audioContext()
    const next = !(soundOn && audioReady)
    setSoundOn(next)
    soundPref.set(next)
    if (next) {
      ac?.resume?.().then(() => setAudioReady(true)).catch(() => {})
      if (!sound.current && phase === 'intro') { sound.current = createSpinSound(); sound.current?.setSpeed(spin.current, n) }
      sound.current?.fadeIn(0.22, 0.3)
    } else {
      sound.current?.fadeOut(0.3)
    }
  }
  useEffect(() => () => sound.current?.stop(0.2), [])
  return (
    <>
      <div
        ref={wrap}
        className={`relative select-none ${className}`}
        style={{ height: h + 120, perspective: 1400 }}
        onPointerEnter={() => (hovering.current = true)}
        onPointerLeave={() => { hovering.current = false; onUp() }}
      >
        <div
          className="absolute inset-0 -top-10 cursor-grab touch-pan-y active:cursor-grabbing"
          style={{ visibility: phase === 'done' ? 'visible' : 'hidden', top: 0 }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <div className="absolute inset-0" style={{ transform: 'translateY(-20px)' }}>
            <Ring items={items} rotation={rotation} card={card} interactive dragRef={drag} />
          </div>
        </div>
        <p className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.22em] text-stone-400">
          <Hand size={13} strokeWidth={1.4} /> Drag to explore
        </p>
      </div>

      {overlay &&
        createPortal(
          <div className="fixed inset-0 z-[80]" onClick={() => setPhase('returning')}>
            <motion.div className="absolute inset-0 bg-[#f1ebe2]" style={{ opacity: fly.bg }} />
            <motion.div className="absolute inset-0" style={{ x: fly.x, y: fly.y, scale: fly.s, perspective: 1400 }}>
              <Ring items={items} rotation={rotation} card={bigCard} dragRef={drag} />
            </motion.div>
            <motion.p className="absolute inset-x-0 bottom-[4%] text-center text-[10px] uppercase tracking-[0.24em] text-stone-500" style={{ opacity: fly.bg }}>
              Tap or scroll to continue
            </motion.p>
            <motion.button
              type="button"
              data-keep-intro
              onClick={(e) => { e.stopPropagation(); toggleSound() }}
              style={{ opacity: fly.bg }}
              className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full border border-charcoal/15 bg-white/80 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-charcoal shadow-sm backdrop-blur hover:border-gold"
              aria-label={soundOn && audioReady ? 'Mute spin sound' : 'Play spin sound'}
            >
              {soundOn && audioReady ? <Volume2 size={14} /> : <VolumeX size={14} />}
              {soundOn && audioReady ? 'Sound on' : 'Tap for sound'}
            </motion.button>
          </div>,
          document.body,
        )}
    </>
  )
}
