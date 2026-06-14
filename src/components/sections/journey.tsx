'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer, slideInLeft, slideInRight, viewportOnce } from '@/lib/animations'
import { BookOpen, Briefcase, Trophy, FileText, GraduationCap, Rocket } from 'lucide-react'
import { useRef } from 'react'
import { useLanguage } from '@/lib/language-context'
import { WavyText } from '@/components/ui/wavy-text'
import Tilt from 'react-parallax-tilt'

const milestones = [
  {
    year: '2022',
    titleVi: 'Bắt đầu hành trình',
    titleEn: 'The Beginning',
    descVi: 'Ngày đầu tiên bước chân vào Đại học FPT Đà Nẵng, mở ra chương mới đầy háo hức.',
    descEn: 'First steps into FPT University Da Nang — a new chapter full of excitement and possibilities.',
    icon: BookOpen,
    color: '#DCA543',
  },
  {
    year: '2023',
    titleVi: 'Khám phá & Phát triển',
    titleEn: 'Exploration & Growth',
    descVi: 'Tham gia câu lạc bộ, dự án nhóm, và khám phá niềm đam mê với công nghệ.',
    descEn: 'Joined clubs, group projects, and discovered a true passion for technology.',
    icon: Rocket,
    color: '#E8C373',
  },
  {
    year: '2024',
    titleVi: 'Thực tập chuyên nghiệp',
    titleEn: 'Professional Internship',
    descVi: 'Bước ra thế giới thực, áp dụng kiến thức vào môi trường doanh nghiệp.',
    descEn: 'Stepped into the professional world, applying knowledge in a real enterprise environment.',
    icon: Briefcase,
    color: '#B8862E',
  },
  {
    year: '2025',
    titleVi: 'Cuộc thi & Giải thưởng',
    titleEn: 'Competitions & Awards',
    descVi: 'Tham gia các cuộc thi lập trình, hackathon và đạt thành tích đáng tự hào.',
    descEn: 'Competed in coding contests and hackathons, earning proud achievements.',
    icon: Trophy,
    color: '#DCA543',
  },
  {
    year: '2026',
    titleVi: 'Bảo vệ luận văn',
    titleEn: 'Thesis Defense',
    descVi: 'Hoàn thành và bảo vệ thành công luận văn tốt nghiệp — cột mốc quan trọng.',
    descEn: 'Successfully completed and defended the graduation thesis — a major milestone.',
    icon: FileText,
    color: '#E8C373',
  },
  {
    year: '08/2026',
    titleVi: 'Tốt nghiệp',
    titleEn: 'Graduation',
    descVi: 'Chính thức trở thành Kỹ sư Công nghệ Thông tin — điểm kết thúc của một hành trình tuyệt vời.',
    descEn: 'Officially becoming an Engineer in Information Technology — the culmination of an incredible journey.',
    icon: GraduationCap,
    color: '#DCA543',
  },
]

export function Journey() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { t } = useLanguage()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  })

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="journey" className="relative py-12 md:py-16 overflow-hidden snap-start min-h-[100dvh]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #0A0A0C 0%, #0F0F12 50%, #0A0A0C 100%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span
            className="inline-block text-[11px] font-medium uppercase tracking-[0.25em] mb-4"
            style={{ color: '#DCA543' }}
          >
            {t('Hành Trình', 'The Journey')}
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text-gold">
              <WavyText text={t('Câu Chuyện Bốn Năm', 'A Story Four Years In The Making')} />
            </span>
          </h2>
          <p className="text-base" style={{ color: '#A0A0A8' }}>
            {t('Hành trình bốn năm đáng nhớ', 'A memorable four-year journey')}
          </p>
          <div className="section-divider mt-6 mx-auto w-32" />
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          <motion.div
            className="absolute left-[1.1rem] md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-[1px] origin-top"
            style={{
              background: 'linear-gradient(180deg, #121215 0%, #B8862E 25%, #DCA543 50%, #E8C373 75%, #DCA543 100%)',
              scaleY: prefersReduced ? 1 : pathLength,
            }}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-12 md:space-y-16"
          >
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon
              const isLeft = index % 2 === 0
              const slideVariant = isLeft ? slideInLeft : slideInRight

              return (
                <motion.div
                  key={index}
                  variants={slideVariant}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      className="w-10 h-10 rounded-full flex items-center justify-center border-2"
                      style={{
                        borderColor: milestone.color,
                        background: '#0A0A0C',
                        boxShadow: `0 0 20px ${milestone.color}30`,
                      }}
                      whileInView={prefersReduced ? {} : { scale: [0.5, 1.1, 1] }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Icon size={16} style={{ color: milestone.color }} />
                    </motion.div>
                  </div>

                  <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                    <Tilt glareEnable={true} glareMaxOpacity={0.1} glareColor="#DCA543" glarePosition="all" scale={1.02} tiltMaxAngleX={5} tiltMaxAngleY={5}>
                      <div
                        className="rounded-xl p-6 transition-all duration-300 hover:border-white/10"
                        style={{
                          background: 'rgba(18, 18, 21, 0.6)',
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                          border: '1px solid rgba(220, 165, 67, 0.1)',
                        }}
                      >
                        <span
                          className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 tracking-wider uppercase"
                          style={{ background: `${milestone.color}15`, color: milestone.color }}
                        >
                          {milestone.year}
                        </span>
                        <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-white mb-1">
                          {t(milestone.titleVi, milestone.titleEn)}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                          {t(milestone.descVi, milestone.descEn)}
                        </p>
                      </div>
                    </Tilt>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
