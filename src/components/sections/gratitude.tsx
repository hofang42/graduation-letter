'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, scaleInSlight, viewportOnce } from '@/lib/animations'
import { Heart, Users, GraduationCap } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

import Tilt from 'react-parallax-tilt'

const gratitudeCards = [
  {
    icon: Heart,
    titleVi: 'Gia Đình',
    titleEn: 'Family',
    messageVi: 'Con cảm ơn Ba Mẹ đã luôn bên cạnh, hy sinh và ủng hộ con suốt chặng đường dài. Thành quả này là của cả gia đình mình.',
    messageEn: 'Thank you for always being there, sacrificing and supporting me throughout this long journey. This achievement belongs to our whole family.',
    color: '#DCA543',
    gradient: 'linear-gradient(135deg, rgba(220,165,67,0.08), rgba(184,134,46,0.04))',
    borderColor: '#DCA543',
  },
  {
    icon: Users,
    titleVi: 'Bạn Bè',
    titleEn: 'Friends',
    messageVi: 'Cảm ơn những người bạn đã cùng tôi trải qua những đêm thức trắng, những lần thất bại, và cả những khoảnh khắc đáng nhớ nhất.',
    messageEn: 'Thank you for sharing the sleepless nights, the failures, and the most memorable moments of this journey with me.',
    color: '#E8C373',
    gradient: 'linear-gradient(135deg, rgba(232,195,115,0.08), rgba(220,165,67,0.04))',
    borderColor: '#E8C373',
  },
  {
    icon: GraduationCap,
    titleVi: 'Thầy Cô',
    titleEn: 'Mentors & Professors',
    messageVi: 'Cảm ơn các thầy cô đã truyền đạt kiến thức, kinh nghiệm và truyền cảm hứng để tôi vươn xa hơn trong sự nghiệp.',
    messageEn: 'Thank you for sharing your knowledge, experience, and inspiration that propelled me further in my career.',
    color: '#B8862E',
    gradient: 'linear-gradient(135deg, rgba(184,134,46,0.08), rgba(220,165,67,0.04))',
    borderColor: '#B8862E',
  },
]

export function Gratitude() {
  const { t } = useLanguage()

  return (
    <section id="gratitude" className="relative py-12 md:py-16 overflow-hidden snap-start min-h-[100dvh]">
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
            {t('Lời Tri Ân', 'Gratitude')}
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text-warm">
              {t('Gửi Đến Những Người Đặc Biệt', 'To Everyone Who Made This Possible')}
            </span>
          </h2>
          <div className="section-divider mt-6 mx-auto w-32" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {gratitudeCards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.div
                key={index}
                variants={scaleInSlight}
                className="relative group h-full"
              >
                <Tilt glareEnable={true} glareMaxOpacity={0.1} glareColor={card.color} glarePosition="all" scale={1.03} tiltMaxAngleX={10} tiltMaxAngleY={10} className="h-full">
                  <div
                    className="rounded-2xl p-8 h-full flex flex-col items-center text-center transition-all duration-500"
                    style={{
                      background: card.gradient,
                      backdropFilter: 'blur(24px)',
                      WebkitBackdropFilter: 'blur(24px)',
                      border: '1px solid rgba(220, 165, 67, 0.06)',
                      borderTop: `2px solid ${card.borderColor}30`,
                    }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                      style={{
                        background: `${card.color}10`,
                        border: `1px solid ${card.color}20`,
                      }}
                      whileHover={{
                        boxShadow: `0 0 30px ${card.color}30`,
                        transition: { duration: 0.3 },
                      }}
                    >
                      <Icon size={28} style={{ color: card.color }} />
                    </motion.div>

                    <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-white mb-4">
                      {t(card.titleVi, card.titleEn)}
                    </h3>

                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      {t(card.messageVi, card.messageEn)}
                    </p>
                  </div>
                </Tilt>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
