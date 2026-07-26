'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Skip entirely on touch devices and for reduced-motion users —
    // no rAF loop, and the native cursor stays visible.
    const skip =
      window.matchMedia('(hover: none), (pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (skip) return

    // Native cursor is hidden only once this component is live.
    document.documentElement.classList.add('has-custom-cursor')

    const mousePos = { x: -100, y: -100 }
    const trailPos = { x: -100, y: -100 }
    let rafId = 0

    function animate() {
      // Smooth trail follow with lerp
      trailPos.x += (mousePos.x - trailPos.x) * 0.15
      trailPos.y += (mousePos.y - trailPos.y) * 0.15

      if (dotRef.current) {
        const isHovering = dotRef.current.classList.contains('hovering')
        const offset = isHovering ? 30 : 4
        dotRef.current.style.transform = `translate(${mousePos.x - offset}px, ${mousePos.y - offset}px)`
      }
      if (trailRef.current) {
        const isHovering = trailRef.current.classList.contains('hovering')
        const offset = isHovering ? 40 : 16
        trailRef.current.style.transform = `translate(${trailPos.x - offset}px, ${trailPos.y - offset}px)`
      }

      rafId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX
      mousePos.y = e.clientY
    }

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursor === 'pointer'
      ) {
        dotRef.current?.classList.add('hovering')
        trailRef.current?.classList.add('hovering')
      }
    }

    const handleMouseLeave = () => {
      dotRef.current?.classList.remove('hovering')
      trailRef.current?.classList.remove('hovering')
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseEnter)
    document.addEventListener('mouseout', handleMouseLeave)
    rafId = requestAnimationFrame(animate)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseEnter)
      document.removeEventListener('mouseout', handleMouseLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={trailRef} className="cursor-trail" aria-hidden="true" />
    </>
  )
}
