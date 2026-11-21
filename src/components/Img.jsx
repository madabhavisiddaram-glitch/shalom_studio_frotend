import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import { src, srcSet, SMALL_ONLY } from '../lib/img.js'

/**
 * Responsive, lazy-loaded image with a soft fade-in and an error state.
 * `name` refers to /public/images/<name>-800.webp & -1600.webp
 */
export default function Img({ name, alt, className = '', imgClassName = '', sizes = '100vw', eager = false, zoom = false }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const small = SMALL_ONLY.has(name)
  return (
    <div className={`${/\b(absolute|fixed)\b/.test(className) ? '' : 'relative'} overflow-hidden bg-champagne ${className}`}>
      {failed ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-stone-400">
          <ImageOff size={22} strokeWidth={1.2} aria-hidden />
          <span className="text-[10px] uppercase tracking-[0.2em]">Image unavailable</span>
        </div>
      ) : (
        <img
          src={small ? src(name, 800) : src(name, 1600)}
          srcSet={small ? undefined : srcSet(name)}
          sizes={small ? undefined : sizes}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchpriority={eager ? 'high' : undefined}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover transition-[opacity,transform] duration-[1200ms] ease-lux ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${zoom ? 'group-hover:scale-[1.06]' : ''} ${imgClassName}`}
        />
      )}
    </div>
  )
}
