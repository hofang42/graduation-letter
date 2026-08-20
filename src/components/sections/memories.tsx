'use client'

import { useLanguage } from '@/lib/language-context'
import { PhotoGallery, GalleryPhoto } from '@/components/ui/gallery'
import { SectionHeading } from '@/components/ui/section-heading'

// The teaser uses a separate set from the album so each photo appears only once on the page.
const teaserPhotos: GalleryPhoto[] = [
  {
    src: '/assets/AnhKyYeu/DSC03614.jpg',
    alt: 'Graduates gathered in the auditorium before the ceremony',
    captionVi: 'Trước giờ phút đáng nhớ',
    captionEn: 'Before the moment we will remember',
  },
  {
    src: '/assets/AnhKyYeu/DSC03619.jpg',
    alt: 'Graduates celebrating together in the auditorium',
    captionVi: 'Niềm vui được sẻ chia',
    captionEn: 'Joy is better when shared',
  },
  {
    src: '/assets/AnhKyYeu/DSC03611.jpg',
    alt: 'Graduates seated together during the graduation day',
    captionVi: 'Một ngày của chúng ta',
    captionEn: 'A day that belongs to us',
  },
]

// The album keeps one representative from repeated poses and never reuses a parallax photo.
const photos: GalleryPhoto[] = [
  {
    src: '/assets/AnhKyYeu/DSC03621.jpg',
    alt: 'Five graduates making playful poses together in the auditorium',
    captionVi: 'Một khung hình đầy tiếng cười',
    captionEn: 'A frame full of laughter',
    width: 2500,
    height: 1667,
  },
  {
    src: '/assets/AnhKyYeu/B0ops-16 (1).jpg',
    alt: 'Graduate seated in a classroom and pointing playfully toward the camera',
    captionVi: 'Một khoảnh khắc rất riêng',
    captionEn: 'A moment all his own',
    width: 5756,
    height: 3837,
  },
  {
    src: '/assets/AnhKyYeu/B0ops-55 (1).jpg',
    alt: 'Graduates posing together in a classroom in their black gowns',
    captionVi: 'Cùng nhau đi qua một chặng đường',
    captionEn: 'Together through the journey',
    width: 5456,
    height: 3637,
  },
  {
    src: '/assets/AnhKyYeu/B0ops-57 (1).jpg',
    alt: 'Graduates gathered together along the campus corridor',
    captionVi: 'Những người bạn đồng hành',
    captionEn: 'The people who shared the journey',
    width: 5487,
    height: 3658,
  },
  {
    src: '/assets/AnhKyYeu/B0ops-59 (1).jpg',
    alt: 'Graduates posing together on the upper campus balcony',
    captionVi: 'Một góc nhìn khác của ngày vui',
    captionEn: 'Another view of the celebration',
    width: 5898,
    height: 3932,
  },
  {
    src: '/assets/AnhKyYeu/Bản sao của PhuTrong (24 of 69).jpg',
    alt: 'FPT University Da Nang campus sign surrounded by greenery',
    captionVi: 'Nơi lưu giữ thanh xuân',
    captionEn: 'The place that held our youth',
    width: 5499,
    height: 3666,
  },
  {
    src: '/assets/AnhKyYeu/Bản sao của PhuTrong (26 of 69).jpg',
    alt: 'Graduates gathered outside the FPT University Da Nang campus building',
    captionVi: 'Thanh xuân dưới mái trường',
    captionEn: 'Youth beneath the campus roof',
    width: 3845,
    height: 5768,
  },
  {
    src: '/assets/AnhKyYeu/DSC03637.jpg',
    alt: 'Five graduates posing playfully together in the auditorium',
    captionVi: 'Một khoảnh khắc không thể đứng yên',
    captionEn: 'A moment that could not stay still',
    width: 1667,
    height: 2500,
  },
  {
    src: '/assets/AnhKyYeu/DSC03698.jpg',
    alt: 'Graduate seated among the auditorium seats in a thoughtful pose',
    captionVi: 'Một khoảng lặng giữa ngày vui',
    captionEn: 'A quiet pause inside a joyful day',
    width: 2500,
    height: 1667,
  },
  {
    src: '/assets/AnhKyYeu/DSC03701.jpg',
    alt: 'Graduate holding an open graduation certificate folder in the auditorium',
    captionVi: 'Khoảnh khắc cầm trên tay thành quả',
    captionEn: 'Holding the result of the journey',
    width: 2500,
    height: 1667,
  },
]

export function Memories() {
  const { t } = useLanguage()

  return (
    <section id="memories" className="relative min-h-[100dvh] overflow-hidden py-12 md:py-16">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #0A0A0C 0%, #0E0E11 50%, #0A0A0C 100%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <SectionHeading
          chapterId="memories"
          title={t('Những Khoảnh Khắc Đáng Nhớ', 'Moments That Made It')}
          subtitle={
            <em>{t('Qua từng kỳ thi, từng đêm thức, từng tiếng cười', 'Through every exam, every late night, every laugh')}</em>
          }
        />

        <PhotoGallery photos={photos} teaserPhotos={teaserPhotos} />
      </div>
    </section>
  )
}
