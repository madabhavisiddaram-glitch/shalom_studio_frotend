/** True on phones/small tablets or when the visitor asked for reduced motion.
 *  Used to switch off heavy scroll effects that make phones lag. */
export const isLite = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(max-width: 767px), (prefers-reduced-motion: reduce)').matches
