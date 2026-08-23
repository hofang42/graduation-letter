'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { scaleIn, viewportOnce } from '@/lib/animations'
import {
  Send, CheckCircle, User, Users, MessageSquare, Mail, Phone,
  Minus, Plus, CalendarPlus, MapPin,
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { useLanguage } from '@/lib/language-context'
import { SectionHeading } from '@/components/ui/section-heading'
import { useGuestName } from '@/lib/guest'
import { EVENT, downloadICS } from '@/lib/event'

const CONFETTI_COLORS = ['#DCA543', '#E8C373', '#B8862E', '#FFFFFF']

export function RSVP() {
  const { lang, t } = useLanguage()
  const guest = useGuestName()
  const prefersReduced = useReducedMotion()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: 1,
    attendance: 'attending',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Prefill the name for personalized ?guest= links. The guest value
  // resolves client-side after hydration, so this syncs once when it does.
  useEffect(() => {
    if (guest) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData((prev) => (prev.name ? prev : { ...prev, name: guest }))
    }
  }, [guest])

  const isAttending = formData.attendance === 'attending'

  const stepGuests = (delta: number) => {
    setFormData((prev) => ({
      ...prev,
      guests: Math.min(5, Math.max(1, prev.guests + delta)),
    }))
  }

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    const formBody = new URLSearchParams()
    formBody.append('name', formData.name)
    formBody.append('email', formData.email)
    formBody.append('guests', String(isAttending ? formData.guests : 0))
    formBody.append('attendance', formData.attendance)
    formBody.append('message', formData.message)
    formBody.append('submissionId', crypto.randomUUID())

    try {
      // The same-origin server route calls Apps Script and validates its JSON
      // response. The success card is shown only after Apps Script returns
      // result=success (including a successful MailApp.sendEmail call).
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: formBody.toString(),
      })
      const result = await response.json() as { result?: string; error?: string }

      if (!response.ok || result.result !== 'success') {
        throw new Error(result.error || 'RSVP service rejected the submission.')
      }

      setSubmitted(true)
      if (!prefersReduced) {
        confetti({
          particleCount: 70, spread: 70, startVelocity: 42,
          origin: { x: 0.2, y: 0.8 }, angle: 60, colors: CONFETTI_COLORS,
        })
        confetti({
          particleCount: 70, spread: 70, startVelocity: 42,
          origin: { x: 0.8, y: 0.8 }, angle: 120, colors: CONFETTI_COLORS,
        })
      }
    } catch (error) {
      console.error('[RSVP] Fetch failed:', error)
      setSubmitError(t(
        'Không gửi được, bạn kiểm tra kết nối mạng rồi thử lại nhé.',
        'Could not send — please check your connection and try again.'
      ))
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, isAttending, prefersReduced, t])

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder-white/45 focus:outline-none focus:border-[#DCA543]/40 focus:ring-1 focus:ring-[#DCA543]/20 transition-all duration-300'

  return (
    <section id="rsvp" className="relative py-12 md:py-16 overflow-hidden min-h-[100dvh]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #0A0A0C 0%, #0E0E11 50%, #0A0A0C 100%)',
        }}
      />

      <div className="relative z-10 max-w-[560px] mx-auto px-6 md:px-12">
        <SectionHeading
          chapterId="rsvp"
          title={t('Bạn Sẽ Đến Chứ?', 'Will You Be There?')}
          gradient="warm"
          subtitle={t('Sự hiện diện của bạn là niềm vui lớn nhất', "We'd love to celebrate with you")}
          className="mb-12"
        />

        <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-[#DCA543]/15 bg-[#DCA543]/[0.06] px-4 py-3.5 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#DCA543]/25 bg-[#DCA543]/10">
              <Phone size={16} className="text-[#E8C373]" />
            </div>
            <div className="min-w-0 text-left">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#A0A0A8]">
                {t('Nếu tôi không thể nghe máy', 'If I cannot answer')}
              </p>
              <p className="mt-1 truncate text-sm font-semibold text-white">Ánh Dương · 0856 118 852</p>
            </div>
          </div>
          <a
            href="tel:0856118852"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#E8C373]/45 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#E8C373] transition hover:border-[#E8C373] hover:bg-[#E8C373]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C373]"
            aria-label={t('Gọi cho Ánh Dương', 'Call Ánh Dương')}
          >
            <Phone size={14} />
            <span className="hidden sm:inline">{t('Gọi', 'Call')}</span>
          </a>
        </div>

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
                    className={inputClass}
                    placeholder={t('Nhập họ và tên...', 'Enter your full name...')}
                  />
                </div>

                <div>
                  <label htmlFor="rsvp-email" className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#A0A0A8' }}>
                    <Mail size={14} style={{ color: '#DCA543' }} />
                    <span>{t('Email', 'Email Address')}</span>
                  </label>
                  <input
                    id="rsvp-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass}
                    placeholder={t('Nhập địa chỉ email...', 'Enter your email...')}
                  />
                </div>

                <div>
                  <p className="text-sm font-medium mb-3" style={{ color: '#A0A0A8' }}>
                    {t('Tham dự', 'Attendance')}
                  </p>
                  <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label={t('Tham dự', 'Attendance')}>
                    <label
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[#DCA543] has-[:focus-visible]:outline-offset-2 ${
                        isAttending
                          ? 'bg-[#DCA543]/10 border-[#DCA543]/30 text-white'
                          : 'bg-white/5 border-white/8 text-white/50 hover:border-white/15'
                      }`}
                    >
                      <input
                        type="radio" name="attendance" value="attending"
                        checked={isAttending}
                        onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                        className="sr-only"
                      />
                      <span className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                        isAttending ? 'border-[#DCA543]' : 'border-white/25'
                      }`}>
                        {isAttending && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#DCA543]" />
                        )}
                      </span>
                      <span className="text-sm font-medium">{t('Tham dự', 'Attending')}</span>
                    </label>
                    <label
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[#DCA543] has-[:focus-visible]:outline-offset-2 ${
                        !isAttending
                          ? 'bg-[#A0A0A8]/10 border-[#A0A0A8]/30 text-white'
                          : 'bg-white/5 border-white/8 text-white/50 hover:border-white/15'
                      }`}
                    >
                      <input
                        type="radio" name="attendance" value="regrets"
                        checked={!isAttending}
                        onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                        className="sr-only"
                      />
                      <span className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                        !isAttending ? 'border-[#A0A0A8]' : 'border-white/25'
                      }`}>
                        {!isAttending && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#A0A0A8]" />
                        )}
                      </span>
                      <span className="text-sm font-medium">{t('Không thể', 'With regrets')}</span>
                    </label>
                  </div>
                </div>

                {/* Guests — only relevant when attending */}
                <AnimatePresence initial={false}>
                  {isAttending && (
                    <motion.div
                      key="guests"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#A0A0A8' }}>
                        <Users size={14} style={{ color: '#DCA543' }} />
                        <span>{t('Số khách (tối đa 5)', 'Number of guests (max 5)')}</span>
                      </p>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => stepGuests(-1)}
                          disabled={formData.guests <= 1}
                          aria-label={t('Giảm số khách', 'Fewer guests')}
                          className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/5 border border-white/8 text-white transition-all duration-200 hover:border-[#DCA543]/40 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Minus size={16} />
                        </button>
                        <span
                          className="flex-1 text-center font-mono text-lg text-white tabular-nums"
                          aria-live="polite"
                        >
                          {formData.guests}
                        </span>
                        <button
                          type="button"
                          onClick={() => stepGuests(1)}
                          disabled={formData.guests >= 5}
                          aria-label={t('Thêm khách', 'More guests')}
                          className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/5 border border-white/8 text-white transition-all duration-200 hover:border-[#DCA543]/40 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

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
                    className={`${inputClass} resize-none`}
                    placeholder={t('Viết lời nhắn...', 'Write a message...')}
                  />
                </div>

                {submitError && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                  >
                    {submitError}
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full text-[#0A0A0C] font-semibold text-base transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(135deg, #DCA543, #E8C373)',
                    boxShadow: '0 4px 30px rgba(220, 165, 67, 0.3)',
                  }}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02, boxShadow: '0 6px 40px rgba(220, 165, 67, 0.4)' }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-[#0A0A0C]/20 border-t-[#0A0A0C] rounded-full"
                    />
                  ) : (
                    <Send size={18} />
                  )}
                  <span>
                    {isAttending
                      ? t('Xác Nhận Tham Dự', 'Confirm Attendance')
                      : t('Gửi Lời Nhắn', 'Send RSVP')}
                  </span>
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                role="status"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                className="glass-heavy rounded-2xl p-10 md:p-12 text-center relative overflow-hidden"
                style={{
                  border: '1px solid rgba(220, 165, 67, 0.15)',
                  boxShadow: '0 8px 60px rgba(0, 0, 0, 0.4)',
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                  className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center relative z-10"
                  style={{ background: 'rgba(220, 165, 67, 0.1)', border: '2px solid rgba(220, 165, 67, 0.2)' }}
                >
                  <CheckCircle size={40} style={{ color: '#DCA543' }} />
                </motion.div>

                <p className="font-mono text-[11px] tracking-[0.15em] mb-3 text-[#DCA543]/70 relative z-10">
                  ✓ rsvp.sent — exit code 0
                </p>

                <h3
                  // Callback ref: with AnimatePresence mode="wait" the card
                  // mounts later than `submitted` flips, so an effect would
                  // fire too early to move focus here.
                  ref={(node: HTMLHeadingElement | null) => node?.focus()}
                  tabIndex={-1}
                  className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white mb-3 relative z-10 outline-none"
                >
                  {t(`Cảm ơn, ${formData.name || 'Bạn'}!`, `Thank You, ${formData.name || 'Friend'}!`)}
                </h3>
                <p className="relative z-10 mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {isAttending
                    ? t('Xác nhận của bạn đã được gửi. Hẹn gặp bạn tại lễ tốt nghiệp!', 'Your RSVP has been sent. See you at the ceremony!')
                    : t('Lời nhắn của bạn đã được gửi. Cảm ơn bạn đã báo tin!', 'Your reply has been sent. Thank you for letting us know!')}
                </p>

                {/* The moment guests are most willing to act — give them the tools */}
                {isAttending && (
                  <div className="relative z-10 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => downloadICS(lang)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                      style={{
                        background: 'rgba(220, 165, 67, 0.12)',
                        border: '1px solid rgba(220, 165, 67, 0.2)',
                        color: '#DCA543',
                      }}
                      data-cursor="pointer"
                    >
                      <CalendarPlus size={14} />
                      {t('Thêm vào lịch', 'Add to calendar')}
                    </button>
                    <a
                      href={EVENT.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                      style={{
                        border: '1px solid rgba(220, 165, 67, 0.2)',
                        color: '#A0A0A8',
                      }}
                      data-cursor="pointer"
                    >
                      <MapPin size={14} />
                      {t('Xem đường đi', 'Get directions')}
                    </a>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
