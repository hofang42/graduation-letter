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

function getLanguageFromUrl(): Language | null {
  const value = new URLSearchParams(window.location.search).get('lang')?.toLowerCase()
  return value === 'vi' || value === 'en' ? value : null
}

function setLanguageInUrl(lang: Language) {
  const url = new URL(window.location.href)
  url.searchParams.set('lang', lang)
  window.history.replaceState(window.history.state, '', url)
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('vi')

  // The URL is the source of truth for shared links. Explicit lang=vi or
  // lang=en wins; when lang is omitted, the invitation defaults to English.
  useEffect(() => {
    const next: Language = getLanguageFromUrl() ?? 'en'

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLang(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }, [])

  // Keep <html lang> in sync so screen readers switch pronunciation.
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const toggle = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'vi' ? 'en' : 'vi'
      window.localStorage.setItem(STORAGE_KEY, next)
      setLanguageInUrl(next)
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
