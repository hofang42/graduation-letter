'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { EVENT } from '@/lib/event'
import { useLanguage } from '@/lib/language-context'

interface Remaining {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getRemaining(target: Date): Remaining | null {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  }
}

function RollingDigit({ digit, reduced }: { digit: string; reduced: boolean }) {
  return (
    <span className="relative inline-flex h-[1.15em] w-[0.62em] overflow-hidden justify-center">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={digit}
          className="block"
          initial={reduced ? { opacity: 0 } : { y: '100%' }}
          animate={reduced ? { opacity: 1 } : { y: 0 }}
          exit={reduced ? { opacity: 0 } : { y: '-100%' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Unit({ value, label, reduced }: { value: number; label: string; reduced: boolean }) {
  const text = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span
        className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-white leading-none"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {text.split('').map((d, i) => (
          <RollingDigit key={i} digit={d} reduced={reduced} />
        ))}
      </span>
      <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#A0A0A8]">
        {label}
      </span>
    </div>
  )
}

// Luxury countdown to the ceremony — thin gold rules, small-caps labels,
// digits that roll behind an overflow mask. Reads EVENT for the target.
export function Countdown({ className = '' }: { className?: string }) {
  const { t } = useLanguage()
  const prefersReduced = useReducedMotion()
  const [remaining, setRemaining] = useState<Remaining | null>(null)
  const [ended, setEnded] = useState(false)
  const [mounted, setMounted] = useState(false)

  // One-shot client init: live time can't be server-rendered without a
  // hydration mismatch, so the first tick happens after mount.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    const tick = () => {
      setRemaining(getRemaining(EVENT.start))
      setEnded(Date.now() > EVENT.end.getTime())
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  // Avoid a server/client hydration mismatch on live numbers. The
  // placeholder heights match the rendered block per breakpoint.
  if (!mounted) {
    return (
      <div
        className={`${EVENT.dateConfirmed ? 'h-[54px] md:h-[61px]' : 'h-[79px] md:h-[86px]'} ${className}`}
        aria-hidden="true"
      />
    )
  }

  // The ceremony is over — the countdown has nothing left to say.
  if (ended) {
    return null
  }

  if (!remaining) {
    return (
      <p
        className={`font-mono text-sm tracking-[0.2em] uppercase text-[#DCA543] ${className}`}
      >
        {t('Hôm nay là ngày trọng đại', 'Today is the day')}
      </p>
    )
  }

  const reduced = !!prefersReduced

  return (
    <div className={className}>
      <div
        className="inline-flex items-center gap-4 md:gap-6"
        role="timer"
        aria-label={t(
          `Còn ${remaining.days} ngày đến lễ tốt nghiệp`,
          `${remaining.days} days until the ceremony`
        )}
      >
        <Unit value={remaining.days} label={t('Ngày', 'Days')} reduced={reduced} />
        <span className="w-px h-9 bg-[rgba(220,165,67,0.25)]" aria-hidden="true" />
        <Unit value={remaining.hours} label={t('Giờ', 'Hours')} reduced={reduced} />
        <span className="w-px h-9 bg-[rgba(220,165,67,0.25)]" aria-hidden="true" />
        <Unit value={remaining.minutes} label={t('Phút', 'Min')} reduced={reduced} />
        <span className="w-px h-9 bg-[rgba(220,165,67,0.25)]" aria-hidden="true" />
        <Unit value={remaining.seconds} label={t('Giây', 'Sec')} reduced={reduced} />
      </div>
      {!EVENT.dateConfirmed && (
        <p className="mt-2.5 font-mono text-[10px] tracking-[0.15em] text-[#A0A0A8]">
          {t('// thời gian dự kiến — sẽ cập nhật', '// provisional — to be confirmed')}
        </p>
      )}
    </div>
  )
}
