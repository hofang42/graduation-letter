'use client'

import { useLanguage } from '@/lib/language-context'
import { PhotoGallery, GalleryPhoto } from '@/components/ui/gallery'
import { SectionHeading } from '@/components/ui/section-heading'

// Curated memory photos: repeated poses are represented once, while each batch
// mixes solo portraits, group moments, and campus context.
const photos: GalleryPhoto[] = [
  {
    src: '/assets/AnhKyYeu/DSC03621.jpg',
    alt: 'Five graduates making playful poses together in the auditorium',
    captionVi: 'Một khung hình đầy tiếng cười',
    captionEn: 'A frame full of laughter',
  },
  {
    src: '/assets/AnhKyYeu/B0ops-16 (1).jpg',
    alt: 'Graduate seated in a classroom and pointing playfully toward the camera',
    captionVi: 'Một khoảnh khắc rất riêng',
    captionEn: 'A moment all his own',
  },
  {
    src: '/assets/AnhKyYeu/B0ops-55 (1).jpg',
    alt: 'Graduates posing together in a classroom in their black gowns',
    captionVi: 'Cùng nhau đi qua một chặng đường',
    captionEn: 'Together through the journey',
  },
  {
    src: '/assets/AnhKyYeu/B0ops-57 (1).jpg',
    alt: 'Graduates gathered together along the campus corridor',
    captionVi: 'Những người bạn đồng hành',
    captionEn: 'The people who shared the journey',
  },
  {
    src: '/assets/AnhKyYeu/B0ops-59 (1).jpg',
    alt: 'Graduates posing together on the upper campus balcony',
    captionVi: 'Một góc nhìn khác của ngày vui',
    captionEn: 'Another view of the celebration',
  },
  {
    src: '/assets/AnhKyYeu/Bản sao của PhuTrong (24 of 69).jpg',
    alt: 'FPT University Da Nang campus sign surrounded by greenery',
    captionVi: 'Nơi lưu giữ thanh xuân',
    captionEn: 'The place that held our youth',
  },
  {
    src: '/assets/AnhKyYeu/Bản sao của PhuTrong (26 of 69).jpg',
    alt: 'Graduates gathered outside the FPT University Da Nang campus building',
    captionVi: 'Thanh xuân dưới mái trường',
    captionEn: 'Youth beneath the campus roof',
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
