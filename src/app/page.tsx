'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Hero } from '@/components/sections/hero'
import { Journey } from '@/components/sections/journey'
import { Memories } from '@/components/sections/memories'
import { Gratitude } from '@/components/sections/gratitude'
import { CelebrationTimeline } from '@/components/sections/celebration-timeline'
import { EventInfo } from '@/components/sections/event-info'
import { RSVP } from '@/components/sections/rsvp'
import { Closing } from '@/components/sections/closing'
import { LanguageProvider, useLanguage } from '@/lib/language-context'
import { LanguageToggle } from '@/components/ui/language-toggle'
import { ZoomParallax } from '@/components/ui/zoom-parallax'
import { BlindBagReveal } from '@/components/ui/blind-bag-reveal'
import { ChapterNav } from '@/components/ui/chapter-nav'
import { useGuestName } from '@/lib/guest'
import { setLenis } from '@/lib/lenis'
import Lenis from 'lenis'

function HomeContent({ isRevealed }: { isRevealed: boolean }) {
  const { t } = useLanguage()
  const prefersReduced = useReducedMotion()
  const guest = useGuestName()

  // When the intro overlay unmounts, hand keyboard focus to the page —
  // must run after the commit that removes `inert` from <main>.
  useEffect(() => {
    if (isRevealed) {
      document.getElementById('main-content')?.focus({ preventScroll: true })
    }
  }, [isRevealed])

  const parallaxImages = [
    {
      src: '/assets/AnhKyYeu/TaiAnh-07859.jpg',
      alt: 'Portrait of Phan Le Thanh Hoang holding graduation folders',
    },
    {
      src: '/assets/AnhKyYeu/DSC03617.jpg',
      alt: 'Five graduates sharing a joyful moment in the auditorium',
    },
    {
      src: '/assets/AnhKyYeu/TaiAnh-07897.jpg',
      alt: 'Graduate reaching toward a flying graduation cap',
    },
    {
      src: '/assets/AnhKyYeu/TaiAnh-07903.jpg',
      alt: 'Graduate smiling while holding a graduation folder',
    },
    {
      src: '/assets/AnhKyYeu/TaiAnh-07883.jpg',
      alt: 'Graduate smiling and pointing to his graduation folder',
    },
    {
      src: '/assets/AnhKyYeu/DSC03624.jpg',
      alt: 'Five graduates posing together among auditorium seats',
    },
    {
      src: '/assets/AnhKyYeu/DSC03629.jpg',
      alt: 'Wide-angle group portrait of five graduates in the auditorium',
    },
  ]

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        delayChildren: prefersReduced ? 0 : 0.2,
        staggerChildren: prefersReduced ? 0 : 0.14,
      },
    },
  }

  const groupVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.14,
      },
    },
  }

  const blockVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0.2 : 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  }

  return (
    <motion.main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen w-full outline-none"
      variants={containerVariants}
      initial="hidden"
      animate={isRevealed ? 'show' : 'hidden'}
      inert={!isRevealed || undefined}
    >
      <ChapterNav visible={isRevealed} />

      {/* Zoom Parallax Entrance */}
      <motion.div
        variants={groupVariants}
        className="relative flex h-[50vh] flex-col items-center justify-center pt-10 z-10"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full blur-[30px]"
          style={{ background: 'radial-gradient(ellipse at center, rgba(220, 165, 67, 0.15), transparent 50%)' }}
        />
        <motion.p
          variants={blockVariants}
          className="mb-5 text-xl md:text-2xl"
          style={{
            fontFamily: 'var(--font-dancing), cursive',
            color: 'rgba(232, 195, 115, 0.9)',
          }}
        >
          {guest
            ? t(`Thân gửi ${guest},`, `Dear ${guest},`)
            : t('Thân gửi bạn,', 'Dear friend,')}
        </motion.p>
        <motion.h1
          variants={blockVariants}
          className="text-center text-4xl md:text-6xl lg:text-7xl font-normal font-[family-name:var(--font-playfair)] uppercase tracking-[0.08em] mb-5 text-white leading-[1.1]"
        >
          Phan Lê<br />Thanh Hoàng
        </motion.h1>
        <motion.p
          variants={blockVariants}
          className="font-mono text-[11px] md:text-xs tracking-[0.22em] uppercase text-center px-4"
          style={{ color: '#DCA543' }}
        >
          software engineer
          <span className="text-white/30"> · </span>
          <span className="text-[#A0A0A8]">class of 2026</span>
        </motion.p>
      </motion.div>

      <motion.div variants={blockVariants}>
        <ZoomParallax images={parallaxImages} />
      </motion.div>

      <motion.div variants={blockVariants}><Hero /></motion.div>
      <motion.div variants={blockVariants}><Journey /></motion.div>
      <motion.div variants={blockVariants}><Memories /></motion.div>
      <motion.div variants={blockVariants}><Gratitude /></motion.div>
      <motion.div variants={blockVariants}><CelebrationTimeline /></motion.div>
      <motion.div variants={blockVariants}><EventInfo /></motion.div>
      <motion.div variants={blockVariants}><RSVP /></motion.div>
      <motion.div variants={blockVariants}><Closing /></motion.div>
    </motion.main>
  )
}

export default function Home() {
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const lenis = new Lenis()
    setLenis(lenis)

    let rafId = 0
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  // A greeting for the engineers who will inevitably open DevTools.
  useEffect(() => {
    console.log(
      '%c PHAN LÊ THANH HOÀNG %c Software Engineer · FPT University Da Nang · Class of 2026 %c\n> Bạn tìm ra console rồi đó. Hẹn gặp ở lễ tốt nghiệp! 🎓',
      'background:#DCA543;color:#0A0A0C;padding:4px 8px;font-weight:bold;border-radius:2px',
      'color:#E8C373;padding:4px',
      'color:#A0A0A8'
    )
  }, [])

  return (
    <LanguageProvider>
      {/* Outside <main> so it stays usable while the intro overlay is up */}
      <LanguageToggle />
      <BlindBagReveal onReveal={() => setIsRevealed(true)} />
      <HomeContent isRevealed={isRevealed} />
    </LanguageProvider>
  )
}
