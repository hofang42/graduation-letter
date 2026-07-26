// Client-side singleton so navigation components can drive Lenis smooth
// scrolling without prop-drilling the instance out of page.tsx.

import type Lenis from 'lenis'

let instance: Lenis | null = null

export function setLenis(lenis: Lenis | null) {
  instance = lenis
}

export function scrollToId(id: string) {
  const target = `#${id}`
  if (instance) {
    instance.scrollTo(target, { duration: 1.4, offset: 0 })
    return
  }
  // Reduced-motion users always land here (Lenis is never created for
  // them) — a JS 'smooth' would override the CSS auto rule, so jump.
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.querySelector(target)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
}
