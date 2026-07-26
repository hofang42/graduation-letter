// Single source of truth for the ceremony details.
// When the official date is announced, update EVENT here — every card,
// countdown, calendar file, and map link reads from this object.

export const EVENT = {
  // Provisional — the university has not announced the exact date yet.
  dateConfirmed: false,
  start: new Date('2026-08-15T09:00:00+07:00'),
  end: new Date('2026-08-15T12:00:00+07:00'),
  titleVi: 'Lễ Tốt Nghiệp — Phan Lê Thanh Hoàng',
  titleEn: 'Graduation Ceremony — Phan Le Thanh Hoang',
  venue: 'FPT University Da Nang',
  addressVi: 'Đại học FPT Đà Nẵng, Khu Công nghệ cao, Ngũ Hành Sơn, Đà Nẵng',
  addressEn: 'FPT University Da Nang, Khu Cong nghe cao, Ngu Hanh Son, Da Nang, Vietnam',
  mapsUrl: 'https://maps.google.com/?q=FPT+University+Da+Nang',
  coords: '15.9686° N · 108.2604° E',
}

function toICSDate(d: Date): string {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

export function buildICS(lang: 'vi' | 'en'): string {
  const title = lang === 'vi' ? EVENT.titleVi : EVENT.titleEn
  const address = lang === 'vi' ? EVENT.addressVi : EVENT.addressEn
  const note =
    lang === 'vi'
      ? 'Thời gian dự kiến — sẽ cập nhật khi có lịch chính thức.'
      : 'Provisional time — will be updated once the official schedule is announced.'

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//graduation//hoang//VN',
    'BEGIN:VEVENT',
    `UID:graduation-2026-hoang@${EVENT.start.getTime()}`,
    `DTSTAMP:${toICSDate(new Date(Date.now()))}`,
    `DTSTART:${toICSDate(EVENT.start)}`,
    `DTEND:${toICSDate(EVENT.end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${note}`,
    `LOCATION:${address.replace(/,/g, '\\,')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

export function downloadICS(lang: 'vi' | 'en') {
  const blob = new Blob([buildICS(lang)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'le-tot-nghiep-hoang-2026.ics'
  document.body.appendChild(a)
  a.click()
  // Deferred cleanup — Safari starts the blob fetch asynchronously and
  // a synchronous revoke silently kills the download.
  setTimeout(() => {
    a.remove()
    URL.revokeObjectURL(url)
  }, 1000)
}

export function googleCalendarUrl(lang: 'vi' | 'en'): string {
  const title = lang === 'vi' ? EVENT.titleVi : EVENT.titleEn
  const address = lang === 'vi' ? EVENT.addressVi : EVENT.addressEn
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${toICSDate(EVENT.start)}/${toICSDate(EVENT.end)}`,
    location: address,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
