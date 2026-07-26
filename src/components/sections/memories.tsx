'use client'

import { useLanguage } from '@/lib/language-context'
import { PhotoGallery, GalleryPhoto } from '@/components/ui/gallery'
import { SectionHeading } from '@/components/ui/section-heading'

// Single source of truth for the memory photos — the gallery renders
// these with their captions. Swap in real photos here.
const photos: GalleryPhoto[] = [
  {
    src: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=600&h=800&fit=crop',
    alt: 'Graduation ceremony with students in caps and gowns celebrating their achievement',
    captionVi: 'Khoảnh khắc vinh danh',
    captionEn: 'Moment of glory',
  },
  {
    src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop',
    alt: 'Beautiful university campus with green trees and historic buildings',
    captionVi: 'Mái trường thân yêu',
    captionEn: 'Beloved campus',
  },
  {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
    alt: 'Diverse group of students studying together in a university library',
    captionVi: 'Những ngày học nhóm',
    captionEn: 'Study sessions',
  },
  {
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=800&fit=crop',
    alt: 'Group of college friends laughing together on campus',
    captionVi: 'Bạn bè — gia đình thứ hai',
    captionEn: 'Friends — second family',
  },
  {
    src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop',
    alt: 'Graduates tossing their caps in the air during graduation celebration',
    captionVi: 'Tung mũ tốt nghiệp',
    captionEn: 'Cap toss celebration',
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
