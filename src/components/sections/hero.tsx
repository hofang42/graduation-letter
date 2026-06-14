'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '@/lib/animations'
import { Calendar, Clock, ChevronDown } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { Magnetic } from '@/components/ui/magnetic'


export function Hero() {
  const prefersReduced = useReducedMotion()
  const { t } = useLanguage()

  return (
    <section
      id="hero"
      className="relative w-full py-16 md:py-24 overflow-hidden snap-start min-h-[100dvh] flex flex-col justify-center"
      style={{ background: '#0A0A0C' }}
    >
      {/* Film grain */}
      <div className="film-grain" />

      {/* Subtle gold glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{
            background: 'radial-gradient(circle, #DCA543, transparent 70%)',
          }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {/* Logo */}
        <motion.div variants={staggerItem} className="flex justify-center mb-8">
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full p-1 shadow-[0_0_30px_rgba(220,165,67,0.2)]" style={{ background: 'linear-gradient(135deg, rgba(220,165,67,0.4), transparent)' }}>
            <div className="w-full h-full rounded-full overflow-hidden bg-[#0A0A0C] border-2 border-[rgba(220,165,67,0.3)]">
              <img src="/assets/logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
          </div>
        </motion.div>

        {/* Eyebrow */}
        <motion.div variants={staggerItem} className="mb-4">
          <span
            className="inline-block text-[11px] font-medium uppercase tracking-[0.25em]"
            style={{ color: '#DCA543' }}
          >
            {t('01. Thư Mời', '01. Invitation')}
          </span>
        </motion.div>

        {/* Decorative line */}
        <motion.div variants={staggerItem} className="flex justify-center mb-6">
          <div className="w-16 h-px" style={{ background: 'rgba(220, 165, 67, 0.4)' }} />
        </motion.div>

        {/* Invitation text */}
        <motion.p
          variants={staggerItem}
          className="text-sm md:text-base tracking-[0.15em] uppercase mb-2"
          style={{ color: '#A0A0A8' }}
        >
          {t('Trân trọng kính mời', 'We cordially invite')}
          {' '}
          <span style={{ color: '#DCA543' }}>{t('Bạn', 'You')}</span>
        </motion.p>

        <motion.p
          variants={staggerItem}
          className="text-sm md:text-base mb-6"
          style={{ color: '#A0A0A8' }}
        >
          {t('đến tham dự lễ tốt nghiệp của', 'to the graduation ceremony of')}
        </motion.p>

        {/* Graduate name — massive display */}
        <motion.h1
          variants={fadeUp}
          className="font-[family-name:var(--font-playfair)] font-light uppercase leading-[1.1] mb-4"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            letterSpacing: '0.08em',
            color: '#FFFFFF',
          }}
        >
          PHAN LÊ<br />
          THANH HOÀNG
        </motion.h1>

        {/* Degree */}
        <motion.p
          variants={staggerItem}
          className="text-base md:text-lg font-medium mb-2 font-[family-name:var(--font-playfair)]"
          style={{ color: '#DCA543' }}
        >
          {t('Kỹ sư Công nghệ Thông tin', 'Engineer in Information Technology')}
        </motion.p>

        {/* University */}
        <motion.p
          variants={staggerItem}
          className="text-sm mb-6"
          style={{ color: '#A0A0A8' }}
        >
          {t('Đại học FPT Đà Nẵng', 'FPT University Da Nang')}
        </motion.p>

        {/* Decorative line */}
        <motion.div variants={staggerItem} className="flex justify-center mb-6">
          <div className="w-24 h-px" style={{ background: 'rgba(220, 165, 67, 0.25)' }} />
        </motion.div>

        {/* Poetic line */}
        <motion.p
          variants={staggerItem}
          className="text-lg md:text-xl mb-8 italic"
          style={{
            fontFamily: 'var(--font-dancing), cursive',
            color: 'rgba(220, 165, 67, 0.7)',
          }}
        >
          {t(
            '\u201CBốn năm. Một hành trình. Khoảnh khắc thay đổi mọi thứ.\u201D',
            '\u201CFour years. One journey. A moment that changes everything.\u201D'
          )}
        </motion.p>

        {/* Date & Time cards */}
        <motion.div
          variants={staggerItem}
          className="flex flex-wrap gap-4 mb-8 justify-center"
        >
          <div
            className="flex items-center gap-3 rounded-xl px-5 py-3"
            style={{
              background: 'rgba(220, 165, 67, 0.08)',
              border: '1px solid rgba(220, 165, 67, 0.15)',
            }}
          >
            <Calendar size={16} style={{ color: '#DCA543' }} />
            <div>
              <p className="text-xs uppercase tracking-widest" style={{ color: '#A0A0A8' }}>{t('Ngày', 'Date')}</p>
              <p className="text-sm font-medium text-white">{t('Tháng 8, 2026', 'August 2026')}</p>
            </div>
          </div>
          <div
            className="flex items-center gap-3 rounded-xl px-5 py-3"
            style={{
              background: 'rgba(220, 165, 67, 0.08)',
              border: '1px solid rgba(220, 165, 67, 0.15)',
            }}
          >
            <Clock size={16} style={{ color: '#DCA543' }} />
            <div>
              <p className="text-xs uppercase tracking-widest" style={{ color: '#A0A0A8' }}>{t('Giờ', 'Time')}</p>
              <p className="text-sm font-medium text-white">9:00 AM</p>
            </div>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div variants={staggerItem} className="flex flex-wrap gap-4 justify-center">
          <Magnetic strength={40}>
            <a
              href="#rsvp"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[#0A0A0C] font-semibold text-base transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #DCA543, #E8C373)',
                boxShadow: '0 4px 30px rgba(220, 165, 67, 0.3)',
              }}
              data-cursor="pointer"
            >
              {t('Xác Nhận Tham Dự', 'RSVP Now')}
            </a>
          </Magnetic>
          <Magnetic strength={20}>
            <a
              href="#journey"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-medium text-base transition-all duration-300 hover:text-white"
              style={{
                color: '#A0A0A8',
                border: '1px solid rgba(220, 165, 67, 0.2)',
              }}
              data-cursor="pointer"
            >
              {t('Xem Chi Tiết', 'View Details')}
              <ChevronDown size={16} />
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  )
}
