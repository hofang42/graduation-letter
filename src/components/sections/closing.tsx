'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, fadeIn, viewportOnce } from '@/lib/animations'
import { Heart } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export function Closing() {
  const prefersReduced = useReducedMotion()
  const { t } = useLanguage()

  return (
    <section
      id="closing"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden snap-start"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0A0A0C 0%, #121215 50%, #0A0A0C 100%)',
          backgroundSize: '200% 200%',
        }}
        animate={prefersReduced ? {} : {
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #DCA543, transparent 70%)' }}
        />
      </div>

      <div className="film-grain" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center py-12 md:py-16">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-8"
        >
          <Heart size={28} className="mx-auto" style={{ color: '#DCA543' }} fill="rgba(220, 165, 67, 0.2)" />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-2 mb-8"
        >
          <h2
            className="font-[family-name:var(--font-playfair)] font-light uppercase leading-[1.2] text-white"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              letterSpacing: '0.05em',
            }}
          >
            {t('Cảm Ơn Bạn Đã Là Một Phần Câu Chuyện.', 'Thank You For Being Part Of This Story.')}
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-4"
        >
          <p className="text-sm md:text-base italic max-w-xl mx-auto leading-relaxed" style={{ color: '#A0A0A8' }}>
            {t(
              'Cảm ơn bạn đã dành thời gian chia sẻ khoảnh khắc đặc biệt này. Sự hiện diện của bạn là món quà ý nghĩa nhất.',
              'Thank you for taking the time to share this special moment. Your presence is the most meaningful gift.'
            )}
          </p>

          <div className="section-divider mx-auto w-24 my-6" />

          <p
            className="text-3xl md:text-5xl"
            style={{
              fontFamily: 'var(--font-dancing), cursive',
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            Phan Lê Thanh Hoàng
          </p>

          <p
            className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase"
            style={{ color: '#DCA543' }}
          >
            2026
          </p>
        </motion.div>

        <div className="flex justify-center gap-3 mt-16">
          {['#B8862E', '#DCA543', '#E8C373', '#DCA543', '#B8862E'].map((color, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: color, opacity: 0.4 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.4 }}
              transition={{ delay: 0.5 + i * 0.15 }}
              viewport={{ once: true }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
