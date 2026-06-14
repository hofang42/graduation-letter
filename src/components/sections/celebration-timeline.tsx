'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '@/lib/animations'
import { GraduationCap, Camera, Utensils, PartyPopper, Car, Wine } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

const events = [
  {
    time: '09:00 AM',
    titleVi: 'Đón tiếp & Chào mừng',
    titleEn: 'Arrival & Welcome',
    descVi: 'Check-in và nhận chỗ ngồi',
    descEn: 'Check-in and find your seat',
    icon: Car,
    color: '#B8862E',
    active: false,
  },
  {
    time: '10:00 AM',
    titleVi: 'Lễ tốt nghiệp',
    titleEn: 'Graduation Ceremony',
    descVi: 'Nghi thức trao bằng chính thức',
    descEn: 'Official degree conferral ceremony',
    icon: GraduationCap,
    color: '#DCA543',
    active: true,
  },
  {
    time: '12:00 PM',
    titleVi: 'Chụp ảnh lưu niệm',
    titleEn: 'Photography Session',
    descVi: 'Lưu giữ khoảnh khắc đáng nhớ',
    descEn: 'Capture memorable moments',
    icon: Camera,
    color: '#E8C373',
    active: false,
  },
  {
    time: '01:30 PM',
    titleVi: 'Tiệc trưa & Giao lưu',
    titleEn: 'Lunch & Reception',
    descVi: 'Thưởng thức bữa trưa cùng mọi người',
    descEn: 'Enjoy lunch with family and friends',
    icon: Utensils,
    color: '#DCA543',
    active: false,
  },
  {
    time: '06:00 PM',
    titleVi: 'Tiệc mừng tối',
    titleEn: 'Celebration Dinner',
    descVi: 'Bữa tiệc ấm cúng buổi tối',
    descEn: 'An intimate evening celebration',
    icon: PartyPopper,
    color: '#B8862E',
    active: false,
  },
  {
    time: '08:30 PM',
    titleVi: 'Lời cảm ơn & Kết thúc',
    titleEn: 'Closing Toast',
    descVi: 'Nâng ly và khép lại một ngày đáng nhớ',
    descEn: 'Raise a glass to close an unforgettable day',
    icon: Wine,
    color: '#E8C373',
    active: false,
  },
]

export function CelebrationTimeline() {
  const { t } = useLanguage()

  return (
    <section id="celebration" className="relative py-12 md:py-16 overflow-hidden snap-start min-h-[100dvh]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #0A0A0C 0%, #0E0E11 50%, #0A0A0C 100%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span
            className="inline-block text-[11px] font-medium uppercase tracking-[0.25em] mb-4"
            style={{ color: '#DCA543' }}
          >
            {t('Lịch Trình', 'Schedule')}
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text-gold">{t('Chương Trình Ngày Lễ', "The Day's Events")}</span>
          </h2>
          <p className="text-base" style={{ color: '#A0A0A8' }}>
            {t('Hãy cùng chúng tôi trong từng khoảnh khắc', 'Join us for every moment')}
          </p>
          <div className="section-divider mt-6 mx-auto w-32" />
        </motion.div>

        {/* Desktop grid */}
        <motion.div
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {events.map((event, index) => {
            const Icon = event.icon
            return (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative"
              >
                <div
                  className="glass-card rounded-2xl p-6 h-full transition-all duration-300"
                  style={{
                    borderLeft: `3px solid ${event.color}`,
                    ...(event.active ? {
                      boxShadow: '0 0 30px rgba(220, 165, 67, 0.15), inset 0 0 30px rgba(220, 165, 67, 0.03)',
                      border: '1px solid rgba(220, 165, 67, 0.25)',
                      borderLeft: '3px solid #DCA543',
                    } : {}),
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: `${event.color}10`,
                        border: `1px solid ${event.color}18`,
                      }}
                    >
                      <Icon size={24} style={{ color: event.color }} />
                    </div>
                    <div>
                      <span className="text-sm font-bold tracking-wide tabular-nums" style={{ color: event.color }}>
                        {event.time}
                      </span>
                      <h3 className="font-[family-name:var(--font-playfair)] text-base font-semibold text-white mt-1">
                        {t(event.titleVi, event.titleEn)}
                      </h3>
                      <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>
                        {t(event.descVi, event.descEn)}
                      </p>
                    </div>
                  </div>
                  {event.active && (
                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                      style={{ background: 'rgba(220, 165, 67, 0.12)', color: '#DCA543' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DCA543] animate-pulse" />
                      {t('Sự kiện chính', 'Main Event')}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Mobile scroll */}
        <motion.div
          className="md:hidden overflow-x-auto pb-4 -mx-6 px-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          style={{ scrollbarWidth: 'none' }}
        >
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {events.map((event, index) => {
              const Icon = event.icon
              return (
                <motion.div key={index} variants={staggerItem} className="w-[260px] shrink-0">
                  <div
                    className="glass-card rounded-2xl p-5 h-full"
                    style={{
                      borderLeft: `3px solid ${event.color}`,
                      ...(event.active ? {
                        boxShadow: '0 0 25px rgba(220, 165, 67, 0.15)',
                        border: '1px solid rgba(220, 165, 67, 0.25)',
                        borderLeft: '3px solid #DCA543',
                      } : {}),
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: `${event.color}10`, border: `1px solid ${event.color}18` }}
                    >
                      <Icon size={20} style={{ color: event.color }} />
                    </div>
                    <span className="text-sm font-bold tracking-wide tabular-nums" style={{ color: event.color }}>
                      {event.time}
                    </span>
                    <h3 className="font-[family-name:var(--font-playfair)] text-base font-semibold text-white mt-1">
                      {t(event.titleVi, event.titleEn)}
                    </h3>
                    <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      {t(event.descVi, event.descEn)}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
