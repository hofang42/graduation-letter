// Single source of truth for the page's chapters.
// Used by section eyebrows, the chapter rail, and the mobile action dock.

export interface Chapter {
  id: string
  num: string
  vi: string
  en: string
}

export const CHAPTERS: Chapter[] = [
  { id: 'hero', num: '01', vi: 'Thư Mời', en: 'Invitation' },
  { id: 'journey', num: '02', vi: 'Hành Trình', en: 'Journey' },
  { id: 'memories', num: '03', vi: 'Kỷ Niệm', en: 'Memories' },
  { id: 'gratitude', num: '04', vi: 'Tri Ân', en: 'Gratitude' },
  { id: 'celebration', num: '05', vi: 'Lịch Trình', en: 'Schedule' },
  { id: 'event-info', num: '06', vi: 'Thông Tin', en: 'Details' },
  { id: 'rsvp', num: '07', vi: 'Xác Nhận', en: 'RSVP' },
  { id: 'closing', num: '08', vi: 'Lời Kết', en: 'Farewell' },
]
