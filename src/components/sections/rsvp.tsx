'use client'

import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, scaleIn, viewportOnce } from '@/lib/animations'
import { Send, CheckCircle, User, Users, MessageSquare } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'


function ConfettiBurst() {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 500,
      y: -(Math.random() * 400 + 100),
      rotate: Math.random() * 720 - 360,
      scale: Math.random() * 0.6 + 0.4,
      color: ['#DCA543', '#E8C373', '#B8862E', '#FFFFFF', '#A0A0A8'][i % 5],
      delay: Math.random() * 0.3,
      width: Math.random() > 0.5 ? 8 : 12,
      height: Math.random() > 0.5 ? 8 : 4,
    }))
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute left-1/2 top-1/2 rounded-sm"
          style={{ width: p.width, height: p.height, background: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0 }}
          animate={{
            x: p.x, y: p.y,
            opacity: [1, 1, 0],
            rotate: p.rotate,
            scale: [0, p.scale, p.scale],
          }}
          transition={{ duration: 1.5, delay: p.delay, ease: [0.25, 0.4, 0.25, 1] }}
        />
      ))}
    </div>
  )
}

export function RSVP() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    guests: '1',
    attendance: 'attending',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }, [])

  return (
    <section id="rsvp" className="relative py-12 md:py-16 overflow-hidden snap-start min-h-[100dvh]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #0A0A0C 0%, #0E0E11 50%, #0A0A0C 100%)',
        }}
      />

      <div className="relative z-10 max-w-[560px] mx-auto px-6 md:px-12">
        <motion.div
          className="text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span
            className="inline-block text-[11px] font-medium uppercase tracking-[0.25em] mb-4"
            style={{ color: '#DCA543' }}
          >
            {t('Xác Nhận', 'RSVP')}
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text-warm">
              {t('Bạn Sẽ Đến Chứ?', 'Will You Be There?')}
            </span>
          </h2>
          <p className="text-base" style={{ color: '#A0A0A8' }}>
            {t('Sự hiện diện của bạn là niềm vui lớn nhất', "We'd love to celebrate with you")}
          </p>
          <div className="section-divider mt-6 mx-auto w-32" />
        </motion.div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="glass-heavy rounded-2xl p-8 md:p-10 space-y-6"
                style={{
                  border: '1px solid rgba(220, 165, 67, 0.1)',
                  boxShadow: '0 8px 60px rgba(0, 0, 0, 0.4)',
                }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div>
                  <label htmlFor="rsvp-name" className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#A0A0A8' }}>
                    <User size={14} style={{ color: '#DCA543' }} />
                    <span>{t('Họ và tên', 'Full Name')}</span>
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder-white/25 focus:outline-none focus:border-[#DCA543]/40 focus:ring-1 focus:ring-[#DCA543]/20 transition-all duration-300"
                    placeholder={t('Nhập họ và tên...', 'Enter your full name...')}
                  />
                </div>

                <div>
                  <label htmlFor="rsvp-guests" className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#A0A0A8' }}>
                    <Users size={14} style={{ color: '#DCA543' }} />
                    <span>{t('Số khách', 'Number of Guests')}</span>
                  </label>
                  <input
                    id="rsvp-guests"
                    type="number"
                    min={1}
                    max={5}
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white focus:outline-none focus:border-[#DCA543]/40 focus:ring-1 focus:ring-[#DCA543]/20 transition-all duration-300"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium mb-3" style={{ color: '#A0A0A8' }}>
                    {t('Tham dự', 'Attendance')}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-300 ${
                        formData.attendance === 'attending'
                          ? 'bg-[#DCA543]/10 border-[#DCA543]/30 text-white'
                          : 'bg-white/5 border-white/8 text-white/50 hover:border-white/15'
                      }`}
                    >
                      <input
                        type="radio" name="attendance" value="attending"
                        checked={formData.attendance === 'attending'}
                        onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                        className="sr-only"
                      />
                      <span className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                        formData.attendance === 'attending' ? 'border-[#DCA543]' : 'border-white/25'
                      }`}>
                        {formData.attendance === 'attending' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#DCA543]" />
                        )}
                      </span>
                      <span className="text-sm font-medium">{t('Tham dự', 'Attending')}</span>
                    </label>
                    <label
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-300 ${
                        formData.attendance === 'regrets'
                          ? 'bg-[#A0A0A8]/10 border-[#A0A0A8]/30 text-white'
                          : 'bg-white/5 border-white/8 text-white/50 hover:border-white/15'
                      }`}
                    >
                      <input
                        type="radio" name="attendance" value="regrets"
                        checked={formData.attendance === 'regrets'}
                        onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                        className="sr-only"
                      />
                      <span className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                        formData.attendance === 'regrets' ? 'border-[#A0A0A8]' : 'border-white/25'
                      }`}>
                        {formData.attendance === 'regrets' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#A0A0A8]" />
                        )}
                      </span>
                      <span className="text-sm font-medium">{t('Không thể', 'With regrets')}</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="rsvp-message" className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#A0A0A8' }}>
                    <MessageSquare size={14} style={{ color: '#DCA543' }} />
                    <span>{t('Lời nhắn (tuỳ chọn)', 'A message (optional)')}</span>
                  </label>
                  <textarea
                    id="rsvp-message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder-white/25 focus:outline-none focus:border-[#DCA543]/40 focus:ring-1 focus:ring-[#DCA543]/20 transition-all duration-300 resize-none"
                    placeholder={t('Viết lời nhắn...', 'Write a message...')}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full text-[#0A0A0C] font-semibold text-base transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #DCA543, #E8C373)',
                    boxShadow: '0 4px 30px rgba(220, 165, 67, 0.3)',
                  }}
                  whileHover={{ scale: 1.02, boxShadow: '0 6px 40px rgba(220, 165, 67, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={18} />
                  <span>{t('Xác Nhận Tham Dự', 'Confirm Attendance')}</span>
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                className="glass-heavy rounded-2xl p-12 text-center relative overflow-hidden"
                style={{
                  border: '1px solid rgba(220, 165, 67, 0.15)',
                  boxShadow: '0 8px 60px rgba(0, 0, 0, 0.4)',
                }}
              >
                <ConfettiBurst />

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                  className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center relative z-10"
                  style={{ background: 'rgba(220, 165, 67, 0.1)', border: '2px solid rgba(220, 165, 67, 0.2)' }}
                >
                  <CheckCircle size={40} style={{ color: '#DCA543' }} />
                </motion.div>

                <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white mb-3 relative z-10">
                  {t(`Cảm ơn, ${formData.name || 'Bạn'}!`, `Thank You, ${formData.name || 'Friend'}!`)}
                </h3>
                <p className="relative z-10 mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {t(
                    'Xác nhận của bạn đã được ghi nhận. Hẹn gặp bạn tại lễ tốt nghiệp!',
                    'Your RSVP has been received. See you at the ceremony!'
                  )}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
