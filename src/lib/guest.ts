'use client'

import { useSyncExternalStore } from 'react'

// Per-guest personalization: share links like ?guest=Minh%20Anh and the
// invitation greets that guest by name and prefills the RSVP form.

export function sanitizeGuestName(raw: string | null): string | null {
  if (!raw) return null
  const cleaned = raw.replace(/[<>"'`&]/g, '').trim().slice(0, 40)
  return cleaned.length >= 2 ? cleaned : null
}

// The URL never changes during the visit, so read it once and cache.
let cachedGuest: string | null | undefined

function getGuestSnapshot(): string | null {
  if (cachedGuest === undefined) {
    const params = new URLSearchParams(window.location.search)
    cachedGuest = sanitizeGuestName(params.get('guest'))
  }
  return cachedGuest
}

const subscribeNever = () => () => {}

export function useGuestName(): string | null {
  // Server snapshot is null; the client value fills in after hydration
  // without a mismatch warning.
  return useSyncExternalStore(subscribeNever, getGuestSnapshot, () => null)
}
