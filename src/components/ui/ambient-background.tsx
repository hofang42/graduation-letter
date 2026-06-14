'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useMemo } from 'react'

// Deterministic pseudo-random number generator (mulberry32)
// Ensures server and client produce identical particle values
function seededRandom(seed: number) {
  let s = seed | 0
  return () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function AmbientBackground() {
  const prefersReduced = useReducedMotion()

  const particles = useMemo(() => {
    const rand = seededRandom(42)
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      size: rand() * 3 + 1,
      duration: 8 + rand() * 12,
      delay: rand() * 5,
    }))
  }, [])

  if (prefersReduced) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Slow drifting radial gradients — warm gold tones */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, #DCA543, transparent 70%)',
          top: '20%',
          left: '10%',
        }}
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, #B8862E, transparent 70%)',
          bottom: '10%',
          right: '5%',
        }}
        animate={{
          x: [0, -60, 30, 0],
          y: [0, 50, -30, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.02]"
        style={{
          background: 'radial-gradient(circle, #E8C373, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          x: [0, 40, -60, 0],
          y: [0, -40, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: 0.1,
            background: '#DCA543',
          }}
          animate={{
            y: [0, -20, 5, -15, 0],
            x: [0, 8, -5, 3, 0],
            opacity: [0.06, 0.15, 0.08, 0.12, 0.06],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
