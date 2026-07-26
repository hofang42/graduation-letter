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
      src: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1280',
      alt: 'Graduation cap and diploma',
    },
    {
      src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1280&h=720&fit=crop',
      alt: 'University building',
    },
    {
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=800&fit=crop',
      alt: 'Students studying together',
    },
    {
      src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1280&h=720&fit=crop',
      alt: 'Friends laughing on campus',
    },
    {
      src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=800&fit=crop',
      alt: 'Late night studying',
    },
    {
      src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1280&h=720&fit=crop',
      alt: 'Cap toss',
    },
    {
      src: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=1280&h=720&fit=crop',
      alt: 'Celebration',
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
