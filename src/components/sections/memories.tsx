'use client'

import { useLanguage } from '@/lib/language-context'
import { PhotoGallery, GalleryPhoto } from '@/components/ui/gallery'
import { SectionHeading } from '@/components/ui/section-heading'

// Single source of truth for the memory photos — the gallery renders
// these with their captions. Swap in real photos here.
const photos: GalleryPhoto[] = [
  {
    src: '/assets/AnhKyYeu/TaiAnh-07883.jpg',
    alt: 'Phan Le Thanh Hoang smiling in his graduation gown while holding a folder',
    captionVi: 'Nụ cười ngày tốt nghiệp',
    captionEn: 'A graduation-day smile',
  },
  {
    src: '/assets/AnhKyYeu/DSC03617.jpg',
    alt: 'Five graduates laughing together in the auditorium',
    captionVi: 'Bạn bè cùng một khung hình',
    captionEn: 'Friends in one frame',
  },
  {
    src: '/assets/AnhKyYeu/TaiAnh-07903.jpg',
    alt: 'Graduate seated and smiling behind an orange graduation folder',
    captionVi: 'Một chương mới bắt đầu',
    captionEn: 'A new chapter begins',
  },
  {
    src: '/assets/AnhKyYeu/DSC03624.jpg',
    alt: 'Five graduates posing together among the auditorium seats',
    captionVi: 'Khoảnh khắc của cả nhóm',
    captionEn: 'The whole crew',
  },
  {
    src: '/assets/AnhKyYeu/DSC03611.jpg',
    alt: 'Five graduates relaxing together in the auditorium',
    captionVi: 'Những ngày tháng đáng nhớ',
    captionEn: 'The days to remember',
  },
]

export function Memories() {
  const { t } = useLanguage()

  return (
    <section id="memories" className="relative py-12 md:py-16 overflow-hidden min-h-[100dvh]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #0A0A0C 0%, #0E0E11 50%, #0A0A0C 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading
          chapterId="memories"
          title={t('Những Khoảnh Khắc Đáng Nhớ', 'Moments That Made It')}
          subtitle={
            <em>{t('Qua từng kỳ thi, từng đêm thức, từng tiếng cười', 'Through every exam, every late night, every laugh')}</em>
          }
        />

        <PhotoGallery photos={photos} />
      </div>
    </section>
  )
}
