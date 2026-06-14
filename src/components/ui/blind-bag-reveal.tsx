'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useLanguage } from '@/lib/language-context'

export function BlindBagReveal() {
  const [isOpened, setIsOpened] = useState(false)
  const [isCompletelyDone, setIsCompletelyDone] = useState(false)
  const { t } = useLanguage()
  const bagRef = useRef<HTMLDivElement>(null)
  const [bagWidth, setBagWidth] = useState(300)

  // Measure the bag width to know how far to drag
  useEffect(() => {
    if (bagRef.current) {
      setBagWidth(bagRef.current.offsetWidth)
    }
    const handleResize = () => {
      if (bagRef.current) setBagWidth(bagRef.current.offsetWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Drag logic for the tear strip
  const tearX = useMotionValue(0)
  // Mask the tear strip as it's dragged to simulate tearing paper
  const tearMaskWidth = useTransform(tearX, [0, bagWidth], ['100%', '0%'])

  // Prevent scrolling while the bag is not fully gone
  useEffect(() => {
    if (!isCompletelyDone) {
      document.body.style.overflow = 'hidden'
      const preventDefault = (e: Event) => e.preventDefault()
      document.addEventListener('touchmove', preventDefault, { passive: false })
      return () => {
        document.body.style.overflow = ''
        document.removeEventListener('touchmove', preventDefault)
      }
    }
  }, [isCompletelyDone])

  const handleOpen = () => {
    if (isOpened) return
    
    setIsOpened(true)

    // Fire confetti
    const duration = 3000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#DCA543', '#FFFFFF', '#A0A0A8']
      })
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#DCA543', '#FFFFFF', '#A0A0A8']
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()

    // Complete the entire overlay removal after a delay
    setTimeout(() => {
      setIsCompletelyDone(true)
    }, 4000)
  }

  if (isCompletelyDone) return null

  return (
    <AnimatePresence>
      {!isCompletelyDone && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0A0C]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: isOpened ? 0 : 1 }}
          transition={{ duration: 1, delay: 3 }} // Fade out the entire overlay after 3s
        >
          {/* Subtle background glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vmin] h-[80vmin] rounded-full blur-[80px] opacity-20"
            style={{ background: 'radial-gradient(circle, #DCA543, transparent)' }}
          />

          <div 
            ref={bagRef}
            className="relative w-[90%] max-w-sm aspect-[3/4] perspective-1000"
          >
            
            {/* The Text Revealed inside the bag */}
            <motion.div 
              className="absolute inset-0 flex flex-col items-center justify-center z-10"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={isOpened ? { scale: 1.2, opacity: 1 } : { scale: 0.5, opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            >
              <h2 className="text-xl md:text-2xl font-light font-[family-name:var(--font-playfair)] tracking-widest uppercase mb-4 text-[#A0A0A8]">
                {t('Thân mời bạn đến dự', "You're invited to")}
              </h2>
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-center font-light font-[family-name:var(--font-playfair)] uppercase tracking-[0.08em] leading-[1.1]">
                <span className="gradient-text-gold">Lễ Tốt Nghiệp<br/>của</span><br/>
                <span className="text-white mt-4 block">Phan Lê<br/>Thanh Hoàng</span>
              </h1>
            </motion.div>

            {/* The Bag Top Half (Flies up after tearing) */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[20%] bg-[#121215] border border-white/10 rounded-t-2xl shadow-2xl z-20 overflow-hidden"
              initial={{ y: 0, rotateX: 0 }}
              animate={isOpened ? { y: '-60vh', opacity: 0, rotateX: 45 } : undefined}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none" />
            </motion.div>

            {/* The Tear Strip Area (Perforated line) */}
            <motion.div
              className="absolute top-[20%] left-0 right-0 h-10 z-30 flex items-center"
              initial={{ opacity: 1 }}
              animate={isOpened ? { opacity: 0 } : undefined}
              transition={{ duration: 0.3 }}
            >
              {/* Background of the tear area (shows dark inside of bag) */}
              <div className="absolute inset-0 bg-[#0A0A0C] border-y border-white/5" />
              
              {/* The actual strip being torn away */}
              <motion.div 
                className="absolute inset-0 bg-[#1A1A1E] border-y border-dashed border-white/20 flex items-center"
                style={{ width: tearMaskWidth }}
              >
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none" />
                <span className="ml-16 text-[10px] text-white/40 tracking-[0.3em] uppercase">Tear Here</span>
              </motion.div>

              {/* The Draggable Tear Tab */}
              <motion.div
                className="absolute left-0 w-12 h-12 ml-[-10px] bg-gradient-to-br from-[#E8C373] to-[#B8862E] rounded-full shadow-[0_0_15px_rgba(220,165,67,0.5)] flex items-center justify-center cursor-grab active:cursor-grabbing z-40 border-2 border-[#121215]"
                drag={!isOpened ? "x" : false}
                dragConstraints={{ left: 0, right: bagWidth - 20 }}
                dragElastic={0}
                dragMomentum={false}
                style={{ x: tearX }}
                onDrag={(e, info) => {
                  if (tearX.get() > bagWidth * 0.7 && !isOpened) {
                    handleOpen()
                  }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#121215" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </motion.div>
            </motion.div>

            {/* The Bag Bottom Half (Drops down after tearing) */}
            <motion.div
              className="absolute top-[20%] mt-10 bottom-0 left-0 right-0 bg-[#121215] border border-white/10 rounded-b-2xl shadow-2xl z-20 overflow-hidden"
              initial={{ y: 0, rotateX: 0 }}
              animate={isOpened ? { y: '60vh', opacity: 0, rotateX: -45 } : undefined}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none" />
              
              {/* Premium Gold Logo/Stamp in the center of the bottom bag */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-20 border border-[#DCA543] rounded-full flex items-center justify-center pointer-events-none">
                <span className="text-[#DCA543] font-[family-name:var(--font-playfair)] text-4xl">H</span>
              </div>
            </motion.div>

            {/* Tap instruction */}
            <motion.div
              className="absolute -bottom-16 left-0 right-0 text-center z-30 pointer-events-none"
              animate={isOpened ? { opacity: 0 } : { opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span className="text-xs md:text-sm font-light tracking-widest text-[#A0A0A8] uppercase">
                {t('Kéo nút vàng sang phải để xé túi mù', 'Drag the gold tab right to tear')}
              </span>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
