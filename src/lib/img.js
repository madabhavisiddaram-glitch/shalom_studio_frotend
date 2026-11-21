/** Every image ships as /images/<name>-800.webp and /images/<name>-1600.webp */
export const src = (name, w = 1600) => `/images/${name}-${w}.webp`
export const srcSet = (name) => `/images/${name}-800.webp 800w, /images/${name}-1600.webp 1600w`
// A few images only exist at 800px (texture crops)
export const SMALL_ONLY = new Set(['material-wood', 'material-marble'])
