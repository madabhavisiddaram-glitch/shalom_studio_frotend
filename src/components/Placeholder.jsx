import { PenLine } from 'lucide-react'

/** Clearly marked placeholder for content the client will provide later */
export default function Placeholder({ label = 'Content to be provided', children, className = '' }) {
  return (
    <div className={`placeholder-block ${className}`}>
      <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-gold-dark">
        <PenLine size={13} /> {label}
      </p>
      {children && <div className="mt-2 leading-relaxed">{children}</div>}
    </div>
  )
}
