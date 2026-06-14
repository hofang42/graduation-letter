'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function FloatingElements() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  })

  // Slower movement for background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 500])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 400])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -600])

  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Top right glowing orb */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[10%] right-[5%] w-[400px] h-[400px] rounded-full opacity-[0.03] blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.05, 0.03],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full bg-[#DCA543] rounded-full" />
      </motion.div>

      {/* Middle left glowing orb */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[40%] left-[5%] w-[300px] h-[300px] rounded-full opacity-[0.02] blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full bg-white rounded-full" />
      </motion.div>

      {/* Bottom right geometric floating elements */}
      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-[20%] right-[15%] w-16 h-16 opacity-10"
        animate={{ 
          rotate: [0, 180, 360],
          y: [0, -20, 0]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="w-full h-full border border-[#DCA543] rotate-45" />
      </motion.div>

      {/* Scattered particles */}
      <motion.div
        style={{ y: y4 }}
        className="absolute top-[60%] right-[30%] w-2 h-2 rounded-full bg-[#DCA543] opacity-20"
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[20%] left-[20%] w-3 h-3 rounded-full bg-white opacity-10"
        animate={{ scale: [1, 2, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-[10%] left-[40%] w-1 h-1 rounded-full bg-[#DCA543] opacity-30"
        animate={{ scale: [1, 3, 1], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay: 2 }}
      />
    </div>
  )
}
