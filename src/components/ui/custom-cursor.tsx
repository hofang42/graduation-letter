'use client'

import { useEffect, useRef, useCallback } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: -100, y: -100 })
  const trailPos = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)
  const isTouch = useRef(false)

  const animate = useCallback(() => {
    // Smooth trail follow with lerp
    trailPos.current.x += (mousePos.current.x - trailPos.current.x) * 0.15
    trailPos.current.y += (mousePos.current.y - trailPos.current.y) * 0.15

    if (dotRef.current) {
      const isHovering = dotRef.current.classList.contains('hovering')
      const offset = isHovering ? 30 : 4
      dotRef.current.style.transform = `translate(${mousePos.current.x - offset}px, ${mousePos.current.y - offset}px)`
    }
    if (trailRef.current) {
      const isHovering = trailRef.current.classList.contains('hovering')
      const offset = isHovering ? 40 : 16
      trailRef.current.style.transform = `translate(${trailPos.current.x - offset}px, ${trailPos.current.y - offset}px)`
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => { isTouch.current = true }
    window.addEventListener('touchstart', checkTouch, { once: true })

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouch.current) return
      mousePos.current = { x: e.clientX, y: e.clientY }
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
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseEnter)
      document.removeEventListener('mouseout', handleMouseLeave)
      window.removeEventListener('touchstart', checkTouch)
      cancelAnimationFrame(rafRef.current)
    }
  }, [animate])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={trailRef} className="cursor-trail" aria-hidden="true" />
    </>
  )
}
