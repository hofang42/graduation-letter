'use client'

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react'

type Language = 'vi' | 'en'

interface LanguageContextType {
  lang: Language
  toggle: () => void
  t: (vi: string, en: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'vi',
  toggle: () => {},
  t: (vi: string) => vi,
})

const STORAGE_KEY = 'graduation-lang'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('vi')

  // Restore a saved choice, or default English speakers to EN.
  // One-shot client init: localStorage is unavailable during SSR, so the
  // state has to be corrected after mount.
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'vi' || saved === 'en') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLang(saved)
    } else if (!navigator.language.toLowerCase().startsWith('vi')) {
      setLang('en')
    }
  }, [])

  // Keep <html lang> in sync so screen readers switch pronunciation.
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const toggle = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'vi' ? 'en' : 'vi'
      window.localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }, [])

  const t = useCallback(
    (vi: string, en: string) => (lang === 'vi' ? vi : en),
    [lang]
  )

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
