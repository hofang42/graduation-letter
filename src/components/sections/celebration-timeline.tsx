'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations'
import { GraduationCap, Camera, Utensils, PartyPopper, Car, Wine } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { SectionHeading } from '@/components/ui/section-heading'

const events = [
  {
    time: '05:30',
    titleVi: 'Đón tiếp & Chào mừng',
    titleEn: 'Arrival & Welcome',
    descVi: 'Check-in và nhận chỗ ngồi',
    descEn: 'Check-in and find your seat',
    icon: Car,
    color: '#B8862E',
    active: false,
  },
  {
    time: '06:30',
    titleVi: 'Lễ tốt nghiệp',
    titleEn: 'Graduation Ceremony',
    descVi: 'Nghi thức trao bằng chính thức',
    descEn: 'Official degree conferral ceremony',
    icon: GraduationCap,
    color: '#DCA543',
    active: true,
  },
  {
    time: '08:30',
    titleVi: 'Chụp ảnh lưu niệm',
    titleEn: 'Photography Session',
    descVi: 'Lưu giữ khoảnh khắc đáng nhớ',
    descEn: 'Capture memorable moments',
    icon: Camera,
    color: '#E8C373',
    active: false,
  },
  {
    time: '10:00',
    titleVi: 'Tiệc trưa & Giao lưu',
    titleEn: 'Lunch & Reception',
    descVi: 'Thưởng thức bữa trưa cùng mọi người',
    descEn: 'Enjoy lunch with family and friends',
    icon: Utensils,
    color: '#DCA543',
    active: false,
  },
  {
    time: '14:30',
    titleVi: 'Tiệc mừng tối',
    titleEn: 'Celebration Dinner',
    descVi: 'Bữa tiệc ấm cúng buổi tối',
    descEn: 'An intimate evening celebration',
    icon: PartyPopper,
    color: '#B8862E',
    active: false,
  },
  {
    time: '17:00',
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
    <section id="celebration" className="relative py-12 md:py-16 overflow-hidden min-h-[100dvh]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #0A0A0C 0%, #0E0E11 50%, #0A0A0C 100%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <SectionHeading
          chapterId="celebration"
          title={t('Chương Trình Ngày Lễ', "The Day's Events")}
          subtitle={t('Hãy cùng chúng tôi trong từng khoảnh khắc', 'Join us for every moment')}
        />

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
                className="relative"
              >
                <div
                  className="glass-card rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:border-white/15"
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
                      <span className="font-mono text-sm font-medium tracking-wide tabular-nums" style={{ color: event.color }}>
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
                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] font-semibold uppercase tracking-wider"
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
        <div className="md:hidden relative">
          <motion.div
            className="overflow-x-auto pb-4 -mx-6 px-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            style={{ scrollbarWidth: 'none' }}
            tabIndex={0}
            role="region"
            aria-label={t('Lịch trình trong ngày — cuộn ngang để xem thêm', 'Event schedule — scroll sideways for more')}
          >
            <div className="flex gap-4" style={{ width: 'max-content' }}>
              {events.map((event, index) => {
                const Icon = event.icon
                return (
                  <motion.div key={index} variants={staggerItem} className="w-[240px] shrink-0">
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
                      <span className="font-mono text-sm font-medium tracking-wide tabular-nums" style={{ color: event.color }}>
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
          {/* Right-edge fade — hints that more cards are off-screen */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -right-6 w-12"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(10,10,12,0.9))' }}
          />
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#A0A0A8] text-center mt-1">
            {t('Vuốt ngang để xem tiếp', 'Swipe for more')}
          </p>
        </div>
      </div>
    </section>
  )
}
