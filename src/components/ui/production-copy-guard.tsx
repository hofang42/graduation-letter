'use client'

import { useEffect } from 'react'

const COPY_KEYS = new Set(['c', 'x'])

export function ProductionCopyGuard() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return

    const preventCopyAction = (event: Event) => {
      event.preventDefault()
    }

    const preventShortcut = (event: KeyboardEvent) => {
      const modifier = event.ctrlKey || event.metaKey
      if (modifier && COPY_KEYS.has(event.key.toLowerCase())) {
        event.preventDefault()
      }
    }

    document.documentElement.classList.add('production-copy-protected')
    document.addEventListener('contextmenu', preventCopyAction)
    document.addEventListener('selectstart', preventCopyAction)
    document.addEventListener('copy', preventCopyAction)
    document.addEventListener('cut', preventCopyAction)
    document.addEventListener('dragstart', preventCopyAction)
    document.addEventListener('keydown', preventShortcut)

    return () => {
      document.documentElement.classList.remove('production-copy-protected')
      document.removeEventListener('contextmenu', preventCopyAction)
      document.removeEventListener('selectstart', preventCopyAction)
      document.removeEventListener('copy', preventCopyAction)
      document.removeEventListener('cut', preventCopyAction)
      document.removeEventListener('dragstart', preventCopyAction)
      document.removeEventListener('keydown', preventShortcut)
    }
  }, [])

  return null
}
