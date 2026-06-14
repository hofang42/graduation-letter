'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '@/lib/animations'
import { MapPin, Calendar, Clock, Shirt, Car } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import Tilt from 'react-parallax-tilt'
import { WavyText } from '@/components/ui/wavy-text'

const infoItems = [
  {
    icon: MapPin,
    titleVi: 'Địa điểm',
    titleEn: 'Venue',
    valueVi: 'FPTU Da Nang Campus',
    valueEn: 'FPT University Da Nang, Khu công nghệ cao, Ngũ Hành Sơn, Đà Nẵng',
    color: '#DCA543',
  },
  {
    icon: Calendar,
    titleVi: 'Ngày',
    titleEn: 'Date',
    valueVi: 'Tháng 8, 2026',
    valueEn: 'August 2026 (exact date TBA)',
    color: '#E8C373',
  },
  {
    icon: Clock,
    titleVi: 'Thời gian',
    titleEn: 'Time',
    valueVi: 'Mở cửa lúc 09:00 AM',
    valueEn: 'Doors open at 9:00 AM',
    color: '#DCA543',
  },
  {
    icon: Shirt,
    titleVi: 'Trang phục',
    titleEn: 'Dress Code',
    valueVi: 'Trang phục lịch sự / Formal',
    valueEn: 'Smart Casual / Formal attire',
    color: '#B8862E',
  },
  {
    icon: Car,
    titleVi: 'Đỗ xe',
    titleEn: 'Parking',
    valueVi: 'Bãi đỗ xe miễn phí tại khuôn viên trường',
    valueEn: 'Free parking available on campus',
    color: '#E8C373',
  },
]

export function EventInfo() {
  const { t } = useLanguage()

  return (
    <section id="event-info" className="relative py-12 md:py-16 overflow-hidden snap-start min-h-[100dvh]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #0A0A0C 0%, #0F0F12 50%, #0A0A0C 100%)',
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
            {t('Thông Tin', 'Details')}
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text-gold">
              <WavyText text={t('MỌI THỨ', 'EVERYTHING')} />{' '}
              <WavyText text={t('BẠN CẦN BIẾT', 'YOU NEED TO KNOW')} delay={0.2} />
            </span>
          </h2>
          <div className="section-divider mt-6 mx-auto w-32" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            className="space-y-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {infoItems.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                >
                  <Tilt glareEnable={true} glareMaxOpacity={0.1} glareColor="#DCA543" glarePosition="all" scale={1.02}>
                    <div
                      className="glass-card rounded-xl p-5 transition-all duration-300 hover:border-white/10 h-full"
                      style={{ borderLeft: `3px solid ${item.color}` }}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: `${item.color}10` }}
                        >
                          <Icon size={18} style={{ color: item.color }} />
                        </div>
                        <div>
                          <h3 className="font-[family-name:var(--font-playfair)] text-sm font-semibold text-white mb-1">
                            {t(item.titleVi, item.titleEn)}
                          </h3>
                          <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>
                            {t(item.valueVi, item.valueEn)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex items-stretch"
          >
            <Tilt 
              glareEnable={true} 
              glareMaxOpacity={0.15} 
              glareColor="#DCA543" 
              glarePosition="all" 
              tiltMaxAngleX={5} 
              tiltMaxAngleY={5}
              className="w-full flex"
            >
              <div
                className="w-full rounded-2xl overflow-hidden relative min-h-[400px] flex flex-col items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(220, 165, 67, 0.06), rgba(184, 134, 46, 0.03))',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(220, 165, 67, 0.1)',
                }}
              >
                <div className="absolute inset-0 opacity-[0.03]" style={{
                  backgroundImage: `
                    linear-gradient(rgba(220,165,67,1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(220,165,67,1) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px',
                }} />

                <motion.div
                  className="relative z-10 mb-6"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(220, 165, 67, 0.1)',
                      border: '2px solid rgba(220, 165, 67, 0.2)',
                      boxShadow: '0 0 40px rgba(220, 165, 67, 0.1)',
                    }}
                  >
                    <MapPin size={32} style={{ color: '#DCA543' }} />
                  </div>
                </motion.div>

                <div className="relative z-10 text-center px-8">
                  <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-white mb-2">
                    FPT University Da Nang
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#A0A0A8' }}>
                    Khu Công nghệ cao, Ngũ Hành Sơn,
                    <br />
                    Đà Nẵng, Việt Nam
                  </p>
                  <a
                    href="https://maps.google.com/?q=FPT+University+Da+Nang"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'rgba(220, 165, 67, 0.12)',
                      border: '1px solid rgba(220, 165, 67, 0.2)',
                      color: '#DCA543',
                    }}
                    data-cursor="pointer"
                  >
                    <MapPin size={14} />
                    {t('Mở trong Google Maps', 'Open in Google Maps')}
                  </a>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="w-[200px] h-[200px] rounded-full border border-[#DCA543]/8 animate-ping" style={{ animationDuration: '3s' }} />
                </div>
              </div>
            </Tilt>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
