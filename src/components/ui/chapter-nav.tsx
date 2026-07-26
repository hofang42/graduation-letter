'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { CalendarPlus, MapPin, Send } from 'lucide-react'
import { CHAPTERS } from '@/lib/sections'
import { scrollToId } from '@/lib/lenis'
import { useLanguage } from '@/lib/language-context'
import { downloadICS, EVENT } from '@/lib/event'

// Wayfinding for a very long one-pager:
// 1. hairline scroll-progress bar along the top edge
// 2. numbered chapter rail on the right (desktop)
// 3. thumb-zone action dock: RSVP / calendar / directions (mobile)
export function ChapterNav({ visible }: { visible: boolean }) {
  const { lang, t } = useLanguage()
  const prefersReduced = useReducedMotion()
  const [activeId, setActiveId] = useState<string | null>(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  useEffect(() => {
    if (!visible) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    for (const chapter of CHAPTERS) {
      const el = document.getElementById(chapter.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [visible])

  if (!visible) return null

  // Hidden on hero (CTAs are on screen), rsvp (would cover the submit
  // button) and closing (would cover the sign-off/colophon).
  const showDock =
    activeId !== null && activeId !== 'hero' && activeId !== 'rsvp' && activeId !== 'closing'

  return (
    <>
      {/* Scroll progress hairline */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-px origin-left z-[90] bg-gradient-to-r from-[#B8862E] via-[#DCA543] to-[#E8C373]"
        style={{ scaleX: progress }}
      />

      {/* Desktop chapter rail */}
      <nav
        aria-label={t('Điều hướng chương', 'Chapter navigation')}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-4"
      >
        {CHAPTERS.map((chapter) => {
          const isActive = chapter.id === activeId
          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => scrollToId(chapter.id)}
              aria-label={`${chapter.num} — ${t(chapter.vi, chapter.en)}`}
              aria-current={isActive ? 'true' : undefined}
              data-cursor="pointer"
              className="group flex items-center gap-2.5 py-0.5"
            >
              <span
                className={`font-mono text-[10px] tracking-[0.18em] uppercase rounded-full px-2 py-0.5 bg-[#0A0A0C]/80 backdrop-blur-sm transition-all duration-300 ${
                  isActive
                    ? 'text-[#DCA543] opacity-100 translate-x-0'
                    : 'text-[#A0A0A8] opacity-0 translate-x-2 group-hover:opacity-80 group-hover:translate-x-0'
                }`}
              >
                {t(chapter.vi, chapter.en)}
              </span>
              <span
                className={`font-mono text-[10px] transition-colors duration-300 ${
                  isActive ? 'text-[#DCA543]' : 'text-white/30 group-hover:text-white/60'
                }`}
              >
                {chapter.num}
              </span>
              <span
                className={`h-px transition-all duration-500 ${
                  isActive ? 'w-8 bg-[#DCA543]' : 'w-4 bg-white/20 group-hover:bg-white/40'
                }`}
              />
            </button>
          )
        })}
      </nav>

      {/* Mobile action dock */}
      <AnimatePresence>
        {showDock && (
          <motion.nav
            aria-label={t('Thao tác nhanh', 'Quick actions')}
            initial={{ y: prefersReduced ? 0 : 96, x: '-50%', opacity: 0 }}
            animate={{ y: 0, x: '-50%', opacity: 1 }}
            exit={{ y: prefersReduced ? 0 : 96, x: '-50%', opacity: 0 }}
            transition={{ duration: prefersReduced ? 0.15 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 z-40 md:hidden flex items-stretch gap-1 rounded-full px-1.5 py-1.5 border border-[rgba(220,165,67,0.18)] bg-[rgba(10,10,12,0.72)] backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
            style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
          >
            <button
              type="button"
              onClick={() => scrollToId('rsvp')}
              className="flex items-center gap-2 rounded-full px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0A0A0C]"
              style={{ background: 'linear-gradient(135deg, #DCA543, #E8C373)' }}
            >
              <Send size={13} />
              {t('Xác nhận', 'RSVP')}
            </button>
            <button
              type="button"
              onClick={() => downloadICS(lang)}
              className="flex items-center gap-1.5 rounded-full px-3.5 py-2.5 text-[11px] font-medium text-[#E8C373]"
              aria-label={t('Thêm vào lịch', 'Add to calendar')}
            >
              <CalendarPlus size={14} />
              {t('Lịch', 'Calendar')}
            </button>
            <a
              href={EVENT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full px-3.5 py-2.5 text-[11px] font-medium text-[#E8C373]"
              aria-label={t('Chỉ đường', 'Directions')}
            >
              <MapPin size={14} />
              {t('Bản đồ', 'Map')}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
