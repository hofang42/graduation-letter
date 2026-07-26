'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { staggerContainer, slideInLeft, slideInRight, viewportOnce } from '@/lib/animations'
import { BookOpen, Briefcase, Trophy, FileText, GraduationCap, Rocket } from 'lucide-react'
import { useRef } from 'react'
import { useLanguage } from '@/lib/language-context'
import { SectionHeading } from '@/components/ui/section-heading'

// The four years told as a commit history — each milestone is a commit,
// graduation ships as v1.0.0.
const milestones = [
  {
    year: '2022',
    hash: 'a3f2c91',
    commit: 'init: enrolled @ fpt-university-danang',
    titleVi: 'Bắt đầu hành trình',
    titleEn: 'The Beginning',
    descVi: 'Ngày đầu tiên bước chân vào Đại học FPT Đà Nẵng, mở ra chương mới đầy háo hức.',
    descEn: 'First steps into FPT University Da Nang — a new chapter full of excitement and possibilities.',
    icon: BookOpen,
    color: '#DCA543',
  },
  {
    year: '2023',
    hash: 'b7d04e2',
    commit: 'feat: clubs, team projects & new passions',
    titleVi: 'Khám phá & Phát triển',
    titleEn: 'Exploration & Growth',
    descVi: 'Tham gia câu lạc bộ, dự án nhóm, và khám phá niềm đam mê với công nghệ.',
    descEn: 'Joined clubs, group projects, and discovered a true passion for technology.',
    icon: Rocket,
    color: '#E8C373',
  },
  {
    year: '2024',
    hash: 'c1e88a7',
    commit: 'feat(intern): first code shipped to production',
    titleVi: 'Thực tập chuyên nghiệp',
    titleEn: 'Professional Internship',
    descVi: 'Bước ra thế giới thực, áp dụng kiến thức vào môi trường doanh nghiệp.',
    descEn: 'Stepped into the professional world, applying knowledge in a real enterprise environment.',
    icon: Briefcase,
    color: '#B8862E',
  },
  {
    year: '2025',
    hash: 'd94f3b0',
    commit: 'perf: hackathons, contests & awards',
    titleVi: 'Cuộc thi & Giải thưởng',
    titleEn: 'Competitions & Awards',
    descVi: 'Tham gia các cuộc thi lập trình, hackathon và đạt thành tích đáng tự hào.',
    descEn: 'Competed in coding contests and hackathons, earning proud achievements.',
    icon: Trophy,
    color: '#DCA543',
  },
  {
    year: '2026',
    hash: 'e5c217d',
    commit: 'docs: thesis defended successfully',
    titleVi: 'Bảo vệ luận văn',
    titleEn: 'Thesis Defense',
    descVi: 'Hoàn thành và bảo vệ thành công luận văn tốt nghiệp — cột mốc quan trọng.',
    descEn: 'Successfully completed and defended the graduation thesis — a major milestone.',
    icon: FileText,
    color: '#E8C373',
  },
  {
    year: '08/2026',
    hash: 'f0a6e39',
    commit: 'release: graduation',
    tag: 'v1.0.0',
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
    <section id="journey" className="relative py-12 md:py-16 overflow-hidden min-h-[100dvh]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #0A0A0C 0%, #0F0F12 50%, #0A0A0C 100%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <SectionHeading
          chapterId="journey"
          title={t('Câu Chuyện Bốn Năm', 'A Story Four Years In The Making')}
          subtitle={
            <span className="font-mono text-xs text-[#DCA543]/75">
              $ git log --oneline --graph
            </span>
          }
          className="mb-16 md:mb-20"
        />

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 origin-top"
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
                    <div
                      className="rounded-xl p-6 transition-all duration-300 hover:border-[#DCA543]/25 hover:-translate-y-1"
                      style={{
                        background: 'rgba(18, 18, 21, 0.6)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid rgba(220, 165, 67, 0.1)',
                      }}
                    >
                      <div className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
                        <span
                          className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase font-mono"
                          style={{ background: `${milestone.color}15`, color: milestone.color }}
                        >
                          {milestone.year}
                        </span>
                        {milestone.tag && (
                          <span
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] tracking-wide"
                            style={{
                              border: '1px solid rgba(220, 165, 67, 0.4)',
                              color: '#E8C373',
                              boxShadow: '0 0 16px rgba(220, 165, 67, 0.15)',
                            }}
                          >
                            tag: {milestone.tag}
                          </span>
                        )}
                      </div>
                      <p className="font-mono text-[10px] leading-relaxed mb-2 text-[#A0A0A8]/80 break-words">
                        <span className="text-[#DCA543]/60">{milestone.hash}</span>
                        {' '}{milestone.commit}
                      </p>
                      <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-white mb-1">
                        {t(milestone.titleVi, milestone.titleEn)}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        {t(milestone.descVi, milestone.descEn)}
                      </p>
                    </div>
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
