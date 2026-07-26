'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Ambient background layer. The glow orbs are static radial gradients —
// visually identical to animated blurred divs at 2-5% opacity, but free.
// Only the small particles animate, and none of it runs for
// reduced-motion users. The removal happens after mount: branching the
// server-rendered tree on useReducedMotion() would break hydration.
export function FloatingElements() {
  const prefersReduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const hideAnimated = mounted && prefersReduced

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Glow orbs — static */}
      <div
        className="absolute top-[10%] right-[5%] w-[400px] h-[400px]"
        style={{
          background: 'radial-gradient(circle, rgba(220,165,67,0.05), transparent 70%)',
        }}
      />
      <div
        className="absolute top-[40%] left-[5%] w-[300px] h-[300px]"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.025), transparent 70%)',
        }}
      />

      {hideAnimated ? null : (
        <>
          {/* Rotating geometric accent */}
          <motion.div
            className="absolute bottom-[20%] right-[15%] w-16 h-16 opacity-10"
            animate={{ rotate: [0, 180, 360] }}
            transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' } }}
          >
            <div className="w-full h-full border border-[#DCA543] rotate-45" />
          </motion.div>

          {/* Scattered particles */}
          <motion.div
            className="absolute top-[60%] right-[30%] w-2 h-2 rounded-full bg-[#DCA543] opacity-20"
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-[20%] left-[20%] w-3 h-3 rounded-full bg-white opacity-10"
            animate={{ scale: [1, 2, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute bottom-[10%] left-[40%] w-1 h-1 rounded-full bg-[#DCA543] opacity-30"
            animate={{ scale: [1, 3, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: 2 }}
          />
        </>
      )}
    </div>
  )
}
