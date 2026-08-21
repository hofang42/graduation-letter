'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

interface ParallaxImage {
  src: string
  mobileSrc?: string
  alt?: string
}

interface ZoomParallaxProps {
  /** Desktop composition. */
  images: ParallaxImage[]
  /** Mobile composition is supplied independently. */
  mobileImages?: ParallaxImage[]
}

// Desktop keeps the original full-viewport motion wrapper. These coordinates
// belong to the inner image, not to the transformed wrapper. The slots are
// deliberately separated at scale=1 so the collage starts cleanly.
const desktopSlotClasses = [
  '',
  '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]',
  '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]',
  '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]',
  '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]',
  '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]',
  '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]',
]

// This mapping is intentionally unchanged from the working mobile layout.
const mobileFrameClasses = [
  '',
  '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]',
  '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]',
  '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]',
  '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]',
  '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]',
  '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]',
]

export function ZoomParallax({ images, mobileImages = images }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement>(null)
  const prefersReducedSetting = useReducedMotion()
  const [isHydrated, setIsHydrated] = useState(false)
  const prefersReduced = isHydrated && prefersReducedSetting

  useEffect(() => {
    // Keep SSR and the first client render identical before applying reduced motion.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHydrated(true)
  }, [])

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  // Mobile uses the original continuous scale values without any change.
  const mobileScales = [
    useTransform(scrollYProgress, [0, 1], [1, 4]),
    useTransform(scrollYProgress, [0, 1], [1, 5]),
    useTransform(scrollYProgress, [0, 1], [1, 6]),
    useTransform(scrollYProgress, [0, 1], [1, 5]),
    useTransform(scrollYProgress, [0, 1], [1, 6]),
    useTransform(scrollYProgress, [0, 1], [1, 8]),
    useTransform(scrollYProgress, [0, 1], [1, 9]),
  ]

  // This is the original zoom model from the working 7-slot composition.
  // Every image participates in the same scroll progress; do not stagger or
  // clip these transforms because that changes the reference interaction.
  const desktopScales = [
    useTransform(scrollYProgress, [0, 1], [1, 4]),
    useTransform(scrollYProgress, [0, 1], [1, 5]),
    useTransform(scrollYProgress, [0, 1], [1, 6]),
    useTransform(scrollYProgress, [0, 1], [1, 5]),
    useTransform(scrollYProgress, [0, 1], [1, 6]),
    useTransform(scrollYProgress, [0, 1], [1, 8]),
    useTransform(scrollYProgress, [0, 1], [1, 9]),
  ]

  return (
    <div ref={container} className="relative h-[100dvh] motion-safe:h-[300vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <div className="absolute inset-0 hidden md:block" aria-label="Graduation memories">
          {images.map(({ src, alt }, index) => {
            const scale = desktopScales[index % desktopScales.length]

            return (
              <motion.div
                key={`desktop-${src}-${index}`}
                style={prefersReduced ? undefined : { scale }}
                className={`absolute top-0 flex h-full w-full items-center justify-center ${desktopSlotClasses[index] ?? ''}`}
              >
                <div className="relative h-[25vh] w-[25vw]">
                  <Image
                    src={src || '/placeholder.svg'}
                    alt={alt ?? `Parallax image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 90vw, 60vw"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    className="bg-[#121215] object-contain"
                  />
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="absolute inset-0 md:hidden">
          {mobileImages.map(({ src, mobileSrc, alt }, index) => {
            const scale = mobileScales[index % mobileScales.length]

            return (
              <motion.div
                key={`mobile-${src}-${index}`}
                style={prefersReduced ? undefined : { scale }}
                className={`absolute top-0 flex h-full w-full items-center justify-center ${mobileFrameClasses[index] ?? ''}`}
              >
                <div className="relative h-[25vh] w-[25vw]">
                  <Image
                    src={mobileSrc ?? src ?? '/placeholder.svg'}
                    alt={alt ?? `Graduation portrait ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 90vw, 60vw"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    className="bg-[#121215] object-contain"
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
