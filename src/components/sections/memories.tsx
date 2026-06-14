'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer, clipReveal, viewportOnce } from '@/lib/animations'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'
import { PhotoGallery } from '@/components/ui/gallery'


const photos = [
  {
    src: 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=600&h=800&fit=crop',
    alt: 'Graduation ceremony with students in caps and gowns celebrating their achievement',
    captionVi: 'Khoảnh khắc vinh danh',
    captionEn: 'Moment of glory',
    span: 'row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop',
    alt: 'Beautiful university campus with green trees and historic buildings',
    captionVi: 'Mái trường thân yêu',
    captionEn: 'Beloved campus',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
    alt: 'Diverse group of students studying together in a university library',
    captionVi: 'Những ngày học nhóm',
    captionEn: 'Study sessions',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=800&fit=crop',
    alt: 'Group of college friends laughing together on campus',
    captionVi: 'Bạn bè — gia đình thứ hai',
    captionEn: 'Friends — second family',
    span: 'row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop',
    alt: 'Student studying late at night with laptop and books',
    captionVi: 'Đêm thức trắng ôn bài',
    captionEn: 'Late night studying',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop',
    alt: 'Graduates tossing their caps in the air during graduation celebration',
    captionVi: 'Tung mũ tốt nghiệp',
    captionEn: 'Cap toss celebration',
    span: '',
  },
]

export function Memories() {
  const prefersReduced = useReducedMotion()
  const { t } = useLanguage()

  return (
    <section id="memories" className="relative py-12 md:py-16 overflow-hidden snap-start min-h-[100dvh]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #0A0A0C 0%, #0E0E11 50%, #0A0A0C 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
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
            {t('Kỷ Niệm', 'Memories')}
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text-gold">
              {t('Những Khoảnh Khắc Đáng Nhớ', 'Moments That Made It')}
            </span>
          </h2>
          <p className="text-base italic" style={{ color: '#A0A0A8' }}>
            {t('Qua từng kỳ thi, từng đêm thức, từng tiếng cười', 'Through every exam, every late night, every laugh')}
          </p>
          <div className="section-divider mt-6 mx-auto w-32" />
        </motion.div>

        <PhotoGallery />
      </div>
    </section>
  )
}
