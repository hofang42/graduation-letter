"use client"

import { Ref, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Image, { ImageProps } from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Grid3X3, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"

export interface GalleryPhoto {
  src: string
  alt: string
  captionVi: string
  captionEn: string
  width?: number
  height?: number
}

type Direction = "left" | "right"

export const PhotoGallery = ({
  photos,
  teaserPhotos,
  animationDelay = 0.5,
}: {
  photos: GalleryPhoto[]
  teaserPhotos: GalleryPhoto[]
  animationDelay?: number
}) => {
  const { t } = useLanguage()
  const prefersReduced = useReducedMotion()
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isAlbumOpen, setIsAlbumOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [activeTeaserIndex, setActiveTeaserIndex] = useState(0)

  const albumPhotos = useMemo(
    () => Array.from(new Map(photos.map((photo) => [photo.src, photo])).values()),
    [photos]
  )

  const activeTeaser = teaserPhotos[activeTeaserIndex] ?? teaserPhotos[0]

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    const visibilityTimer = setTimeout(() => setIsVisible(true), animationDelay * 1000)
    const animationTimer = setTimeout(
      () => setIsLoaded(true),
      (animationDelay + 0.4) * 1000
    )
    return () => {
      clearTimeout(visibilityTimer)
      clearTimeout(animationTimer)
    }
  }, [animationDelay])

  useEffect(() => {
    if (!isAlbumOpen) return

    const scrollY = window.scrollY
    const html = document.documentElement
    const body = document.body
    const originalHtmlOverflow = html.style.overflow
    const originalBodyOverflow = body.style.overflow
    const originalBodyPosition = body.style.position
    const originalBodyTop = body.style.top
    const originalBodyWidth = body.style.width

    html.style.overflow = "hidden"
    body.style.position = "fixed"
    body.style.top = `-${scrollY}px`
    body.style.width = "100%"
    body.style.overflow = "hidden"

    return () => {
      html.style.overflow = originalHtmlOverflow
      body.style.overflow = originalBodyOverflow
      body.style.position = originalBodyPosition
      body.style.top = originalBodyTop
      body.style.width = originalBodyWidth
      window.scrollTo(0, scrollY)
    }
  }, [isAlbumOpen])

  const closeAlbum = useCallback(() => {
    setLightboxIndex(null)
    setIsAlbumOpen(false)
  }, [])

  const showNext = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null || albumPhotos.length === 0) return 0
      return (current + 1) % albumPhotos.length
    })
  }, [albumPhotos.length])

  const showPrevious = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null || albumPhotos.length === 0) return 0
      return (current - 1 + albumPhotos.length) % albumPhotos.length
    })
  }, [albumPhotos.length])

  useEffect(() => {
    if (!isAlbumOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (lightboxIndex !== null) setLightboxIndex(null)
        else closeAlbum()
      }
      if (lightboxIndex !== null && event.key === "ArrowRight") showNext()
      if (lightboxIndex !== null && event.key === "ArrowLeft") showPrevious()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [closeAlbum, isAlbumOpen, lightboxIndex, showNext, showPrevious])


  return (
    <div className="relative mt-16 md:mt-24">
      <motion.div
        className="mx-auto max-w-6xl"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isLoaded ? 0 : 18 }}
        transition={{ duration: prefersReduced ? 0 : 0.55, ease: "easeOut" }}
      >
        <div className="mb-6 flex items-end justify-between gap-4 px-1 sm:mb-8">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#A0A0A8]">
            {t("Một vài khung hình", "A few frames from the day")}
          </p>
          <span className="shrink-0 font-mono text-[10px] tracking-[0.22em] text-[#E8C373]">
            {String(activeTeaserIndex + 1).padStart(2, "0")} / {String(teaserPhotos.length).padStart(2, "0")}
          </span>
        </div>

        <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {teaserPhotos.map((photo, index) => {
            const isActive = index === activeTeaserIndex

            return (
              <motion.figure
                key={photo.src}
                className={cn("group min-w-0", index === 1 && "sm:translate-y-6 lg:translate-y-10")}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReduced ? 0 : 0.5,
                  delay: prefersReduced ? 0 : index * 0.1,
                  ease: "easeOut",
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveTeaserIndex(index)}
                  className={cn(
                    "block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C373] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0A0A0C]",
                    isActive ? "opacity-100" : "opacity-75 hover:opacity-100"
                  )}
                  aria-label={t(`Chọn ảnh: ${photo.captionVi}`, `Select photo: ${photo.captionEn}`)}
                  aria-pressed={isActive}
                >
                  <div
                    className={cn(
                      "relative overflow-hidden border bg-[#121215] transition-colors duration-300",
                      isActive ? "border-[#E8C373]/75" : "border-white/10 group-hover:border-white/35"
                    )}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={photo.width ?? 2500}
                      height={photo.height ?? 1667}
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="block h-auto w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-3 left-3 font-mono text-[10px] tracking-[0.2em] text-white/85">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <figcaption className="mt-3 pr-2 text-sm leading-6 text-[#F2EEE8]">
                    {t(photo.captionVi, photo.captionEn)}
                  </figcaption>
                </button>
              </motion.figure>
            )
          })}
        </div>

        <div className="mt-8 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-8">
          <AnimatePresence mode="wait">
            {activeTeaser && (
              <motion.p
                key={activeTeaser.src}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: prefersReduced ? 0 : 0.3 }}
                className="max-w-xl text-base italic leading-7 text-[#E8C373]"
              >
                {t(activeTeaser.captionVi, activeTeaser.captionEn)}
              </motion.p>
            )}
          </AnimatePresence>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#A0A0A8] sm:max-w-[18rem] sm:text-right">
            {t("Chạm vào ảnh để chọn một kỷ niệm", "Tap a photo to choose a memory")}
          </p>
        </div>
      </motion.div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={() => setIsAlbumOpen(true)}
          className="group inline-flex items-center gap-3 rounded-full border border-[#E8C373]/40 bg-[#E8C373]/10 px-6 py-3 text-xs uppercase tracking-[0.18em] text-[#E8C373] transition hover:border-[#E8C373] hover:bg-[#E8C373]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C373]"
        >
          <Grid3X3 size={16} strokeWidth={1.5} />
          {t("Mở album kỷ niệm", "Open memory album")}
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {isAlbumOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isAlbumOpen && (
              <motion.div
                className="fixed inset-0 z-[100] h-[100dvh] min-h-[100dvh] w-screen max-w-none overflow-y-auto overscroll-none bg-[#09090B] backdrop-blur-xl [isolation:isolate]"
                style={{ touchAction: "pan-y" }}
                role="dialog"
                aria-modal="true"
                aria-label={t("Album ảnh kỷ niệm", "Memory photo album")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {lightboxIndex === null ? (
                  <AlbumOverview
                    photos={albumPhotos}
                    t={t}
                    onClose={closeAlbum}
                    onOpenPhoto={setLightboxIndex}
                  />
                ) : (
                  <Lightbox
                    photos={albumPhotos}
                    index={lightboxIndex}
                    isMobile={isMobile}
                    t={t}
                    onClose={() => setLightboxIndex(null)}
                    onNext={showNext}
                    onPrevious={showPrevious}
                    onSelect={setLightboxIndex}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  )
}

const AlbumOverview = ({
  photos,
  t,
  onClose,
  onOpenPhoto,
}: {
  photos: GalleryPhoto[]
  t: (vi: string, en: string) => string
  onClose: () => void
  onOpenPhoto: (index: number) => void
}) => (
  <div className="mx-auto min-h-full max-w-7xl overscroll-y-contain px-5 py-6 pb-28 md:px-10 md:py-10 md:pb-32">
    <div className="sticky top-4 z-[120] mb-4 flex justify-end pointer-events-none md:top-6">
      <button
        type="button"
        onClick={onClose}
        className="pointer-events-auto rounded-full border border-white/15 bg-[#121215]/90 p-3 text-[#E8C373] shadow-lg backdrop-blur-md transition hover:border-[#E8C373] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C373]"
        aria-label={t("Đóng album", "Close album")}
      >
        <X size={20} />
      </button>
    </div>

    <header className="mb-8 flex items-start justify-between gap-6 border-b border-white/10 pb-6 md:mb-12">
      <div>
        <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-[#E8C373]">
          {t("Bộ sưu tập kỷ niệm", "Graduation memory collection")}
        </p>
        <h3 className="font-serif text-3xl text-[#F2EEE8] md:text-5xl">
          {t("Những ngày sẽ nhớ", "The days we will remember")}
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[#A0A0A8]">
          {t(
            "Một album được tuyển chọn để xem chậm hơn, gần hơn và trọn vẹn hơn.",
            "A curated album designed to be viewed slowly, closely, and completely."
          )}
        </p>
      </div>
    </header>

    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
      {photos.map((photo, index) => (
        <motion.figure
          key={photo.src}
          className="mb-3 break-inside-avoid md:mb-5"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: index * 0.06 }}
        >
          <button
            type="button"
            onClick={() => onOpenPhoto(index)}
            className="group relative block w-full overflow-hidden rounded-sm border border-white/10 bg-[#121215] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C373]"
            aria-label={t(`Mở ảnh: ${photo.captionVi}`, `Open photo: ${photo.captionEn}`)}
          >
            <div className="bg-[#121215]">
              <div className="p-1 md:p-2">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width ?? 3}
                  height={photo.height ?? 2}
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
                  className="block h-auto w-full"
                  loading={index < 4 ? "eager" : "lazy"}
                />
              </div>
              <span className="block border-t border-white/10 px-3 py-3 text-xs leading-5 text-white/90 md:px-4 md:py-4">
                {t(photo.captionVi, photo.captionEn)}
              </span>
            </div>
          </button>
        </motion.figure>
      ))}
    </div>

    <div className="mt-10 flex justify-center border-t border-white/10 pt-6">
      <p className="text-center text-[10px] uppercase tracking-[0.2em] text-[#A0A0A8]">
        {t("Chạm vào ảnh để xem toàn màn hình · Dùng phím ← → để duyệt", "Tap a photo for fullscreen · Use ← → to browse")}
      </p>
    </div>
  </div>
)

const Lightbox = ({
  photos,
  index,
  isMobile,
  t,
  onClose,
  onNext,
  onPrevious,
  onSelect,
}: {
  photos: GalleryPhoto[]
  index: number
  isMobile: boolean
  t: (vi: string, en: string) => string
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
  onSelect: (index: number) => void
}) => {
  const photo = photos[index]
  const touchStartX = useRef<number | null>(null)

  return (
    <div className="min-h-full overflow-y-auto px-4 py-5 pb-12 md:px-8 md:py-8">
      <header className="sticky top-0 z-[120] mx-auto flex max-w-7xl items-center justify-between gap-4 border-b border-white/10 bg-[#09090B]/95 py-3 backdrop-blur-xl">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#E8C373] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C373]"
        >
          <ArrowLeft size={16} />
          {t("Về album", "Back to album")}
        </button>
        <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-[#A0A0A8]">
          <span aria-live="polite">{String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/15 bg-[#121215]/90 p-2 text-white/80 shadow-lg backdrop-blur-md transition hover:border-[#E8C373] hover:text-[#E8C373] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C373]"
            aria-label={t("Đóng ảnh toàn màn hình", "Close fullscreen photo")}
          >
            <X size={18} />
          </button>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col items-center">
        <div
          className="relative flex h-[56dvh] w-full items-center justify-center md:h-[64dvh]"
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0]?.clientX ?? null
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current === null) return
            const delta = event.changedTouches[0]?.clientX - touchStartX.current
            if (delta > 50) onPrevious()
            if (delta < -50) onNext()
            touchStartX.current = null
          }}
        >
          <button
            type="button"
            onClick={onPrevious}
            className="absolute left-0 z-10 rounded-full border border-white/15 bg-black/30 p-3 text-white/80 backdrop-blur-sm transition hover:border-[#E8C373] hover:text-[#E8C373] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C373] md:left-4"
            aria-label={t("Ảnh trước", "Previous photo")}
          >
            <ChevronLeft size={22} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={photo.src}
              className="flex max-w-full items-center justify-center"
              initial={{ opacity: 0, scale: 0.97, x: 16 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.97, x: -16 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width ?? 3}
                height={photo.height ?? 2}
                priority
                sizes="(max-width: 767px) 92vw, 82vw"
                className={cn(
                  "block h-auto w-auto object-contain",
                  isMobile
                    ? "max-h-[58dvh] max-w-[92vw]"
                    : "max-h-[68dvh] max-w-[min(82vw,1200px)]"
                )}
              />
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={onNext}
            className="absolute right-0 z-10 rounded-full border border-white/15 bg-black/30 p-3 text-white/80 backdrop-blur-sm transition hover:border-[#E8C373] hover:text-[#E8C373] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C373] md:right-4"
            aria-label={t("Ảnh tiếp theo", "Next photo")}
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="w-full max-w-2xl text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-base italic text-[#E8C373]">{t(photo.captionVi, photo.captionEn)}</p>
              <p className="mt-2 text-xs leading-5 text-[#A0A0A8]">{photo.alt}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex w-full max-w-4xl gap-2 overflow-x-auto pb-2 [scrollbar-color:#E8C373_transparent]">
          {photos.map((thumbnail, thumbnailIndex) => (
            <button
              type="button"
              key={thumbnail.src}
              onClick={() => onSelect(thumbnailIndex)}
              className={cn(
                "relative h-14 w-14 shrink-0 overflow-hidden rounded-sm border transition md:h-16 md:w-16",
                thumbnailIndex === index
                  ? "border-[#E8C373] opacity-100 ring-1 ring-[#E8C373]/60"
                  : "border-white/15 opacity-50 hover:border-white/50 hover:opacity-100"
              )}
              aria-label={t(`Chọn ảnh ${thumbnailIndex + 1}`, `Select photo ${thumbnailIndex + 1}`)}
              aria-current={thumbnailIndex === index ? "true" : undefined}
            >
              <Image
                src={thumbnail.src}
                alt=""
                fill
                sizes="64px"
                className="bg-[#121215] object-contain"
              />
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}

const MotionImage = motion(
  forwardRef(function MotionImage(
    props: ImageProps,
    ref: Ref<HTMLImageElement>
  ) {
    return <Image ref={ref} {...props} />
  })
)

export const Photo = ({
  src,
  alt,
  className,
  direction,
  width,
  height,
  tilt = 2,
  onActivate,
  ...props
}: {
  src: string
  alt: string
  className?: string
  direction?: Direction
  width: number
  height: number
  tilt?: number
  onActivate?: () => void
}) => {
  const rotation = tilt * (direction === "left" ? -1 : 1)

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.12, zIndex: 9999 }}
      whileHover={{
        scale: 1.1,
        rotateZ: 2 * (direction === "left" ? -1 : 1),
        zIndex: 9999,
      }}
      whileDrag={{ scale: 1.1, zIndex: 9999 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      style={{
        width,
        height,
        perspective: 400,
        zIndex: 1,
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        touchAction: "pan-y",
      }}
      className={cn(
        className,
        "relative mx-auto shrink-0 cursor-grab border-[6px] border-white shadow-xl active:cursor-grabbing"
      )}
      onClick={onActivate}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onActivate?.()
        }
      }}
      role="button"
      aria-label={alt}
      draggable={false}
      tabIndex={0}
    >
      <div className="relative h-full w-full overflow-hidden bg-[#121215] shadow-sm">
        <MotionImage
          className="bg-[#121215] object-contain"
          fill
          src={src}
          {...props}
          alt=""
          draggable={false}
          sizes={`${width}px`}
        />
      </div>
    </motion.div>
  )
}
