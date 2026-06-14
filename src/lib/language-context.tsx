'use client'

import { createContext, useContext, useState, ReactNode, useCallback } from 'react'

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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('vi')

  const toggle = useCallback(() => {
    setLang((prev) => (prev === 'vi' ? 'en' : 'vi'))
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
