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
import { LanguageProvider } from '@/lib/language-context'
import { LanguageToggle } from '@/components/ui/language-toggle'
import { ZoomParallax } from '@/components/ui/zoom-parallax'
import { BlindBagReveal } from '@/components/ui/blind-bag-reveal'
import Lenis from '@studio-freight/lenis'

import { useLanguage } from '@/lib/language-context'

function HomeContent({ isRevealed }: { isRevealed: boolean }) {
  const { t } = useLanguage()
  const prefersReduced = useReducedMotion()

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
      className="min-h-screen w-full"
      variants={containerVariants}
      initial="hidden"
      animate={isRevealed ? 'show' : 'hidden'}
    >
      <motion.div variants={blockVariants}>
        <LanguageToggle />
      </motion.div>

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
        <motion.h1
          variants={blockVariants}
          className="text-center text-4xl md:text-6xl lg:text-7xl font-light font-[family-name:var(--font-playfair)] uppercase tracking-[0.08em] mb-4 text-white leading-[1.1]"
        >
          Phan Lê<br />Thanh Hoàng
        </motion.h1>
        <motion.p
          variants={blockVariants}
          className="text-base md:text-xl font-medium font-[family-name:var(--font-playfair)] tracking-[0.1em] uppercase mb-2 text-center px-4"
          style={{ color: '#DCA543' }}
        >
          {t('Kỹ sư Công nghệ Thông tin', 'Software Engineer')}
        </motion.p>
        <motion.p
          variants={blockVariants}
          className="text-sm md:text-base tracking-[0.15em] uppercase text-center px-4"
          style={{ color: '#A0A0A8' }}
        >
          {t('Đại học FPT Đà Nẵng', 'FPT University Da Nang')}
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
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <LanguageProvider>
      <BlindBagReveal onReveal={() => setIsRevealed(true)} />
      <HomeContent isRevealed={isRevealed} />
    </LanguageProvider>
  )
}
