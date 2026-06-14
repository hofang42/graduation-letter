'use client'

import { useLanguage } from '@/lib/language-context'
import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'

export function LanguageToggle() {
  const { lang, toggle } = useLanguage()

  return (
    <motion.button
      onClick={toggle}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed top-5 left-5 md:top-6 md:left-6 z-[110] flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-[0.12em] uppercase transition-all duration-300 hover:scale-105"
      style={{
        background: 'rgba(10, 10, 12, 0.7)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(220, 165, 67, 0.2)',
        color: '#DCA543',
      }}
      data-cursor="pointer"
      aria-label={lang === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
    >
      <Globe size={14} />
      <span>{lang === 'vi' ? 'EN' : 'VI'}</span>
    </motion.button>
  )
}
