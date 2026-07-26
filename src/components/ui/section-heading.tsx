'use client'

import { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, viewportOnce } from '@/lib/animations'
import { useLanguage } from '@/lib/language-context'
import { CHAPTERS } from '@/lib/sections'
import { cn } from '@/lib/utils'

// Numbered mono eyebrow ("02 / HÀNH TRÌNH") — single source of truth is
// CHAPTERS; reused by SectionHeading, the hero, and the closing.
export function ChapterEyebrow({
  chapterId,
  className = '',
}: {
  chapterId: string
  className?: string
}) {
  const { t } = useLanguage()
  const chapter = CHAPTERS.find((c) => c.id === chapterId)
  if (!chapter) return null
  return (
    <span
      className={cn(
        'inline-block font-mono text-xs md:text-sm font-medium uppercase tracking-[0.25em] text-[#DCA543]',
        className
      )}
    >
      {chapter.num}
      <span className="text-[#DCA543]/40"> / </span>
      {t(chapter.vi, chapter.en)}
    </span>
  )
}

interface SectionHeadingProps {
  chapterId: string
  title: ReactNode
  gradient?: 'gold' | 'warm'
  subtitle?: ReactNode
  className?: string
}

// Shared section header: numbered mono eyebrow, a line-masked title
// reveal, optional subtitle, hairline divider.
export function SectionHeading({
  chapterId,
  title,
  gradient = 'gold',
  subtitle,
  className = '',
}: SectionHeadingProps) {
  const prefersReduced = useReducedMotion()

  const maskVariants = {
    hidden: { y: prefersReduced ? 0 : '140%', opacity: prefersReduced ? 0 : 1 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  return (
    <motion.div
      className={cn('text-center mb-16', className)}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <ChapterEyebrow chapterId={chapterId} className="mb-4" />
      <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl font-bold mb-4">
        {/* The padding/negative-margin pairs give Vietnamese stacked
            diacritics (ascenders) and descenders room inside the mask.
            IMPORTANT: the masked span must NOT carry its own whileInView —
            while hidden it is fully clipped by the mask, so an observer on
            it never reports intersection and the title would never reveal.
            It inherits "visible" from the parent motion.div instead. */}
        <span className="block overflow-hidden pt-[0.2em] -mt-[0.2em] pb-[0.15em] -mb-[0.15em]">
          <motion.span
            className={`block ${gradient === 'gold' ? 'gradient-text-gold' : 'gradient-text-warm'}`}
            variants={maskVariants}
          >
            {title}
          </motion.span>
        </span>
      </h2>
      {subtitle && (
        <p className="text-base text-[#A0A0A8]">{subtitle}</p>
      )}
      <div className="section-divider mt-6 mx-auto w-32" />
    </motion.div>
  )
}
