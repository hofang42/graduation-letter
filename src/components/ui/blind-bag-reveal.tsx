'use client'

import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import confetti from 'canvas-confetti'
import { ArrowRight, Calendar, Clock, MapPin, Sparkles, Ticket } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'

const confettiColors = ['#DCA543', '#E8C373', '#FFFFFF', '#A0A0A8']

const revealAccents = [
  { top: '14%', left: '6%', width: '6.5rem', rotate: '-14deg', delay: 0 },
  { top: '22%', right: '7%', width: '4.75rem', rotate: '18deg', delay: 0.15 },
  { bottom: '20%', left: '9%', width: '4.5rem', rotate: '12deg', delay: 0.3 },
  { bottom: '12%', right: '11%', width: '6rem', rotate: '-10deg', delay: 0.45 },
]

const bagTexture = {
  backgroundImage: `
    linear-gradient(135deg, rgba(255,255,255,0.08), transparent 28%, rgba(220,165,67,0.08) 70%, transparent),
    repeating-linear-gradient(45deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 10px)
  `,
}

interface BlindBagRevealProps {
  onReveal?: () => void
}

export function BlindBagReveal({ onReveal }: BlindBagRevealProps = {}) {
  const [isOpened, setIsOpened] = useState(false)
  const [isEntering, setIsEntering] = useState(false)
  const [isCompletelyDone, setIsCompletelyDone] = useState(false)
  const [isVeilGone, setIsVeilGone] = useState(false)
  const { t } = useLanguage()
  const prefersReducedMotion = useReducedMotion()
  const bagRef = useRef<HTMLDivElement>(null)
  const enterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const veilTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [bagWidth, setBagWidth] = useState(300)
  const dragLimit = Math.max(bagWidth - 44, 1)

  const inviteHighlights = [
    {
      icon: Calendar,
      label: t('Ngày', 'Date'),
      value: t('08/2026', 'Aug 2026'),
    },
    {
      icon: Clock,
      label: t('Giờ', 'Time'),
      value: '09:00',
    },
    {
      icon: MapPin,
      label: t('Địa điểm', 'Venue'),
      value: 'FPTU DN',
    },
  ]

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

  useEffect(() => {
    return () => {
      if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current)
    }
  }, [])

  const tearX = useMotionValue(0)
  const tearMaskWidth = useTransform(tearX, [0, dragLimit], ['100%', '0%'])

  useEffect(() => {
    if (!isCompletelyDone) {
      document.body.style.overflow = 'hidden'
      const preventDefault = (event: Event) => event.preventDefault()
      document.addEventListener('touchmove', preventDefault, { passive: false })

      return () => {
        document.body.style.overflow = ''
        document.removeEventListener('touchmove', preventDefault)
      }
    }
  }, [isCompletelyDone])

  const completeReveal = () => {
    if (isEntering || isCompletelyDone) return

    setIsEntering(true)

    if (!prefersReducedMotion) {
      confetti({
        particleCount: 90,
        spread: 110,
        startVelocity: 38,
        origin: { y: 0.55 },
        colors: confettiColors,
        scalar: 1.1,
      })
    }

    enterTimeoutRef.current = setTimeout(
      () => {
        setIsCompletelyDone(true)
        onReveal?.()
      },
      prefersReducedMotion ? 350 : 1350
    )
  }

  const handleOpen = () => {
    if (isOpened) return

    setIsOpened(true)

    if (!prefersReducedMotion) {
      const duration = 2600
      const end = Date.now() + duration

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 58,
          origin: { x: 0 },
          colors: confettiColors,
        })
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 58,
          origin: { x: 1 },
          colors: confettiColors,
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }

      frame()
    }
  }

  return (
    <AnimatePresence>
      {!isCompletelyDone && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#070708] px-3 py-4 sm:px-6"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
          transition={{ duration: 0.2 }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(145deg, rgba(220,165,67,0.14), transparent 32%, rgba(125,211,252,0.08) 58%, rgba(10,10,12,0.9)), linear-gradient(180deg, rgba(255,255,255,0.03), transparent 42%)',
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(220,165,67,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(220,165,67,0.7) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
              maskImage: 'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)',
            }}
          />
          <div aria-hidden="true" className="film-grain opacity-[0.05]" />

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-[60] h-[40vmin] w-[40vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(255,244,214,0.95) 0%, rgba(232,195,115,0.55) 35%, rgba(220,165,67,0) 70%)',
              filter: 'blur(6px)',
            }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={
              isEntering
                ? { opacity: [0, 1, 0], scale: [0.4, 6, 9] }
                : { opacity: 0, scale: 0.4 }
            }
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], times: [0, 0.45, 1] }}
          />

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[65] bg-white"
            initial={{ opacity: 0 }}
            animate={isEntering ? { opacity: [0, 0.85, 0] } : { opacity: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut', times: [0, 0.5, 1], delay: 0.35 }}
          />

          {revealAccents.map((accent, index) => (
            <motion.span
              key={index}
              aria-hidden="true"
              className="absolute h-px rounded-full bg-gradient-to-r from-transparent via-[#E8C373] to-transparent"
              style={{
                ...accent,
                transform: `rotate(${accent.rotate})`,
              }}
              initial={{ opacity: 0, scaleX: 0.3 }}
              animate={
                isOpened
                  ? { opacity: [0, 0.85, 0], scaleX: [0.3, 1, 0.75] }
                  : { opacity: 0, scaleX: 0.3 }
              }
              transition={{ duration: 1.8, delay: accent.delay, ease: 'easeOut' }}
            />
          ))}

          <div
            ref={bagRef}
            className="relative aspect-[3/4] [perspective:1200px]"
            style={{ width: 'min(80vw, calc(78dvh * 0.72), 20rem)' }}
          >
            <motion.div
              className="absolute left-1/2 top-1/2 z-10 flex max-h-[92dvh] flex-col"
              style={{
                width: 'min(92vw, 26rem)',
                pointerEvents: isOpened && !isEntering ? 'auto' : 'none',
              }}
              initial={{
                opacity: 0,
                x: '-50%',
                y: '-42%',
                scale: prefersReducedMotion ? 1 : 0.86,
                rotateX: prefersReducedMotion ? 0 : -18,
              }}
              animate={
                isEntering
                  ? {
                      opacity: 0,
                      x: '-50%',
                      y: '-58%',
                      scale: prefersReducedMotion ? 1 : 1.18,
                      rotateX: 0,
                      filter: 'brightness(1.6)',
                    }
                  : isOpened
                  ? {
                      opacity: 1,
                      x: '-50%',
                      y: '-50%',
                      scale: 1,
                      rotateX: 0,
                      filter: 'brightness(1)',
                    }
                  : {
                      opacity: 0,
                      x: '-50%',
                      y: '-42%',
                      scale: prefersReducedMotion ? 1 : 0.86,
                      rotateX: prefersReducedMotion ? 0 : -18,
                      filter: 'brightness(1)',
                    }
              }
              transition={
                isEntering
                  ? { duration: 0.95, ease: [0.22, 1, 0.36, 1] }
                  : { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.18 }
              }
            >
              <div
                className="relative overflow-hidden rounded-[18px] border border-white/10 text-white backdrop-blur-2xl"
                style={{
                  background:
                    'linear-gradient(145deg, rgba(18,18,21,0.96), rgba(9,9,11,0.92) 48%, rgba(31,24,13,0.9))',
                  boxShadow:
                    '0 30px 90px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.12), 0 0 0 1px rgba(220,165,67,0.08)',
                }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-[#E8C373]/55"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-[#E8C373]/55"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-[#E8C373]/55"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-[#E8C373]/55"
                />

                <motion.div
                  aria-hidden="true"
                  className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                  animate={isOpened && !prefersReducedMotion ? { x: ['0%', '340%'] } : undefined}
                  transition={{ duration: 1.4, delay: 0.55, ease: 'easeInOut' }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 22% 18%, rgba(232,195,115,0.9), transparent 16%), linear-gradient(115deg, transparent 0 42%, rgba(255,255,255,0.16) 50%, transparent 58%)',
                  }}
                />

                <div className="relative z-10 flex flex-col gap-4 px-5 pb-5 pt-5 sm:gap-5 sm:px-7 sm:pb-6 sm:pt-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                      <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[#DCA543]/35 bg-[#0A0A0C] p-[3px] shadow-[0_0_24px_rgba(220,165,67,0.25)] sm:h-12 sm:w-12">
                        <Image
                          src="/assets/logo.png"
                          alt="Logo"
                          width={48}
                          height={48}
                          className="h-full w-full rounded-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#BFEAF5] sm:text-[10px]">
                          <Ticket size={12} className="shrink-0" />
                          <span className="truncate">{t('Vé mời danh dự', 'Guest pass')}</span>
                        </div>
                        <p className="mt-0.5 truncate text-[10px] uppercase tracking-[0.16em] text-white/45 sm:text-[11px]">
                          {t('Mã', 'No.')} 2026-HOANG
                        </p>
                      </div>
                    </div>
                    <Sparkles className="mt-0.5 shrink-0 text-[#E8C373]" size={18} />
                  </div>

                  <div className="text-center">
                    <motion.p
                      className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#DCA543] sm:text-[11px]"
                      initial={{ opacity: 0, y: 8 }}
                      animate={isOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                      transition={{ duration: 0.5, delay: 0.45 }}
                    >
                      {t('Thân mời bạn đến dự', "You're invited to")}
                    </motion.p>

                    <motion.div
                      className="mx-auto mt-2 flex items-center justify-center gap-2"
                      initial={{ opacity: 0, scaleX: 0.4 }}
                      animate={isOpened ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.4 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#DCA543]/60" />
                      <span className="h-1 w-1 rotate-45 bg-[#E8C373]" />
                      <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#DCA543]/60" />
                    </motion.div>

                    <motion.h1
                      className="mt-3 font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,7.5vw,3.25rem)] font-light uppercase leading-[1.04] tracking-[0.06em]"
                      initial={{ opacity: 0, y: 16 }}
                      animate={isOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                      transition={{ duration: 0.65, delay: 0.58, ease: 'easeOut' }}
                    >
                      <span className="gradient-text-light">
                        {t('Lễ tốt nghiệp', 'Graduation')}
                      </span>
                      <br />
                      <span className="gradient-text-gold">
                        {t('của', 'Ceremony')}
                      </span>
                    </motion.h1>

                    <motion.p
                      className="mt-3 font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,6.5vw,2.75rem)] uppercase leading-[1.04] tracking-[0.05em] text-white"
                      initial={{ opacity: 0, y: 18 }}
                      animate={isOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                      transition={{ duration: 0.65, delay: 0.72, ease: 'easeOut' }}
                    >
                      Phan Lê
                      <br />
                      Thanh Hoàng
                    </motion.p>
                  </div>

                  <motion.div
                    className="relative"
                    initial={{ opacity: 0 }}
                    animate={isOpened ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.85 }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -left-7 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[#070708] sm:-left-9"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute -right-7 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[#070708] sm:-right-9"
                    />
                    <div className="border-t border-dashed border-white/15" />
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-3 gap-2"
                    initial={{ opacity: 0, y: 16 }}
                    animate={isOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    transition={{ duration: 0.55, delay: 0.95 }}
                  >
                    {inviteHighlights.map((item) => {
                      const Icon = item.icon

                      return (
                        <div
                          key={item.label}
                          className="flex flex-col items-center gap-1.5 rounded-md border border-white/5 bg-white/[0.02] py-2.5 text-center"
                        >
                          <Icon className="text-[#E8C373]" size={14} />
                          <p className="text-[8.5px] uppercase tracking-[0.18em] text-white/45 sm:text-[9.5px]">
                            {item.label}
                          </p>
                          <p className="text-[11px] font-semibold leading-tight text-white/90 sm:text-[12.5px]">
                            {item.value}
                          </p>
                        </div>
                      )
                    })}
                  </motion.div>

                  <motion.div
                    className="flex items-center justify-between gap-3"
                    initial={{ opacity: 0, y: 14 }}
                    animate={isOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                    transition={{ duration: 0.55, delay: 1.05 }}
                  >
                    <p
                      className="min-w-0 text-left text-[14px] leading-tight text-[#E8C373]/85 sm:text-[15px]"
                      style={{ fontFamily: 'var(--font-dancing), cursive' }}
                    >
                      {t('Một dấu mốc, một hành trình mới.', 'One milestone, a new journey.')}
                    </p>
                    <button
                      type="button"
                      onClick={completeReveal}
                      className="group inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#E8C373] to-[#DCA543] px-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0A0A0C] shadow-[0_12px_35px_rgba(220,165,67,0.28)] transition-transform duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8C373] sm:h-11 sm:px-5 sm:text-xs"
                      data-cursor="pointer"
                    >
                      {t('Vào thư', 'Enter')}
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute left-0 right-0 top-0 z-20 h-[20%] overflow-hidden rounded-t-lg border border-white/10 bg-[#121215] shadow-2xl"
              style={bagTexture}
              initial={{ y: 0, rotateX: 0 }}
              animate={isOpened ? { y: '-60vh', opacity: 0, rotateX: 45 } : undefined}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-x-8 bottom-4 h-px bg-gradient-to-r from-transparent via-[#DCA543]/55 to-transparent" />
            </motion.div>

            <motion.div
              className="absolute left-0 right-0 top-[20%] z-30 flex h-10 items-center"
              initial={{ opacity: 1 }}
              animate={isOpened ? { opacity: 0 } : undefined}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 border-y border-white/5 bg-[#0A0A0C]" />

              <motion.div
                className="absolute inset-0 flex items-center border-y border-dashed border-white/20 bg-[#1A1A1E]"
                style={{ width: tearMaskWidth, ...bagTexture }}
              >
                <span className="ml-16 text-[10px] uppercase tracking-[0.3em] text-white/40">
                  {t('Xé ở đây', 'Tear here')}
                </span>
              </motion.div>

              <motion.div
                role="button"
                tabIndex={isOpened ? -1 : 0}
                aria-label={t('Kéo để mở thiệp', 'Drag to open invitation')}
                className="absolute left-0 z-40 ml-[-10px] flex h-12 w-12 cursor-grab items-center justify-center rounded-full border-2 border-[#121215] bg-gradient-to-br from-[#E8C373] to-[#B8862E] shadow-[0_0_22px_rgba(220,165,67,0.52)] active:cursor-grabbing"
                drag={!isOpened ? 'x' : false}
                dragConstraints={{ left: 0, right: dragLimit }}
                dragElastic={0}
                dragMomentum={false}
                style={{ x: tearX }}
                onDrag={() => {
                  if (tearX.get() > dragLimit * 0.72 && !isOpened) {
                    handleOpen()
                  }
                }}
                onKeyDown={(event) => {
                  if ((event.key === 'Enter' || event.key === ' ') && !isOpened) {
                    event.preventDefault()
                    handleOpen()
                  }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRight size={24} strokeWidth={2.4} className="text-[#121215]" />
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute bottom-0 left-0 right-0 top-[20%] z-20 mt-10 overflow-hidden rounded-b-lg border border-white/10 bg-[#121215] shadow-2xl"
              style={bagTexture}
              initial={{ y: 0, rotateX: 0 }}
              animate={isOpened ? { y: '60vh', opacity: 0, rotateX: -45 } : undefined}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-x-6 top-8 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border-2 border-[#DCA543] opacity-30 shadow-[0_0_24px_rgba(220,165,67,0.3)]">
                <Image
                  src="/assets/logo.png"
                  alt="Logo"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute bottom-8 left-1/2 flex h-10 w-28 -translate-x-1/2 items-center justify-center rounded-full border border-[#DCA543]/40 bg-[#DCA543]/5">
                <span className="font-[family-name:var(--font-playfair)] text-[13px] uppercase tracking-[0.32em] text-[#E8C373]">
                  hofang
                </span>
              </div>
            </motion.div>

            <motion.div
              className="pointer-events-none absolute -bottom-12 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap text-center sm:-bottom-16"
              animate={isOpened ? { opacity: 0 } : { opacity: [0.45, 1, 0.45] }}
              transition={
                isOpened
                  ? { duration: 0.3, ease: 'easeOut' }
                  : { repeat: Infinity, duration: 2 }
              }
            >
              <span className="text-[10px] font-light uppercase tracking-[0.22em] text-[#A0A0A8] sm:text-xs md:text-sm">
                {t('Kéo nút vàng sang phải để xé', 'Drag the gold tab right to tear')}
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
