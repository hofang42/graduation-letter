// Single source of truth for the ceremony details.
// Keep the official ceremony details in one place — every card,
// countdown, calendar file, and map link reads from this object.

export const EVENT = {
  dateConfirmed: true,
  start: new Date('2026-09-12T06:30:00+07:00'),
  end: new Date('2026-09-12T10:00:00+07:00'),
  dateVi: 'Ngày 12 tháng 9, 2026',
  dateEn: 'September 12, 2026',
  timeVi: '06:30 sáng',
  timeEn: '6:30 AM',
  titleVi: 'Lễ Tốt Nghiệp — Phan Lê Thanh Hoàng',
  titleEn: 'Graduation Ceremony — Phan Le Thanh Hoang',
  venue: 'Trường Đại học FPT Đà Nẵng',
  addressVi: 'Trường Đại học FPT Đà Nẵng, Khu Công nghệ cao, Ngũ Hành Sơn, Đà Nẵng',
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
      ? `Lễ tốt nghiệp diễn ra lúc ${EVENT.timeVi}, ngày ${EVENT.dateVi}.`
      : `The graduation ceremony begins at ${EVENT.timeEn} on ${EVENT.dateEn}.`

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
