'use client'

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

interface ParallaxImage {
  src: string
  alt?: string
}

interface ZoomParallaxProps {
  /** Array of images displayed in the zoom collage. The first image is the focal image. */
  images: ParallaxImage[]
}

type Slot = {
  className: string
  driftX: number
  driftY: number
  depth: number
  focal?: boolean
}

const slots: Slot[] = [
  {
    className:
      'left-1/2 top-1/2 h-[62vh] w-[54vw] -translate-x-1/2 -translate-y-1/2 md:h-[72vh] md:w-[27vw]',
    driftX: 0,
    driftY: -8,
    depth: 30,
    focal: true,
  },
  {
    className:
      'left-[5vw] top-[10vh] h-[22vh] w-[31vw] md:left-[7vw] md:top-[14vh] md:h-[25vh] md:w-[25vw]',
    driftX: -7,
    driftY: -16,
    depth: 12,
  },
  {
    className:
      'right-[5vw] top-[11vh] h-[23vh] w-[27vw] md:right-[8vw] md:top-[15vh] md:h-[27vh] md:w-[20vw]',
    driftX: 8,
    driftY: -12,
    depth: 13,
  },
  {
    className:
      'left-[4vw] bottom-[10vh] h-[24vh] w-[28vw] md:left-[9vw] md:bottom-[13vh] md:h-[27vh] md:w-[21vw]',
    driftX: -10,
    driftY: 14,
    depth: 11,
  },
  {
    className:
      'right-[4vw] bottom-[9vh] h-[25vh] w-[30vw] md:right-[8vw] md:bottom-[12vh] md:h-[28vh] md:w-[24vw]',
    driftX: 10,
    driftY: 15,
    depth: 10,
  },
  {
    className:
      'left-[17vw] top-[40vh] h-[18vh] w-[26vw] md:left-[18vw] md:top-[43vh] md:h-[21vh] md:w-[20vw]',
    driftX: -13,
    driftY: 4,
    depth: 8,
  },
  {
    className:
      'right-[17vw] top-[42vh] h-[18vh] w-[26vw] md:right-[18vw] md:top-[44vh] md:h-[21vh] md:w-[20vw]',
    driftX: 13,
    driftY: 5,
    depth: 9,
  },
]

interface ParallaxLayerProps {
  image: ParallaxImage
  index: number
  slot: Slot
  progress: MotionValue<number>
  prefersReduced: boolean | null
}

function ParallaxLayer({ image, index, slot, progress, prefersReduced }: ParallaxLayerProps) {
  const supportOpacity = useTransform(progress, [0, 0.42, 0.8, 1], [0.96, 0.92, 0.58, 0.1])
  const supportScale = useTransform(progress, [0, 1], [1, 1.045])
  const x = useTransform(progress, [0, 1], [0, slot.driftX])
  const y = useTransform(progress, [0, 1], [0, slot.driftY])
  const focalScale = useTransform(progress, [0, 0.45, 1], [1, 1.16, 1.32])
  const focalY = useTransform(progress, [0, 1], [0, slot.driftY])
  const focalOpacity = useTransform(progress, [0, 0.86, 1], [1, 1, 0.94])
  const blur = useTransform(progress, [0, 0.72, 1], ['blur(0px)', 'blur(0px)', 'blur(1.5px)'])

  return (
    <motion.div
      style={
        prefersReduced
          ? { zIndex: slot.depth }
          : slot.focal
            ? { scale: focalScale, y: focalY, opacity: focalOpacity, zIndex: slot.depth }
            : { x, y, scale: supportScale, opacity: supportOpacity, filter: blur, zIndex: slot.depth }
      }
      className="pointer-events-none absolute"
    >
      <div className={`relative overflow-visible ${slot.className}`}>
        <Image
          src={image.src || '/placeholder.svg'}
          alt={image.alt || `Graduation memory ${index + 1}`}
          fill
          sizes={slot.focal ? '(max-width: 768px) 54vw, 27vw' : '(max-width: 768px) 31vw, 25vw'}
          priority={index < 3}
          className="object-contain drop-shadow-[0_18px_42px_rgba(0,0,0,0.42)]"
        />
      </div>
    </motion.div>
  )
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  const handoffOpacity = useTransform(scrollYProgress, [0.68, 1], [0, 1])

  return (
    <section
      ref={container}
      aria-label="Graduation photo parallax"
      className="relative h-[175vh] md:h-[235vh]"
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-[#0A0A0C]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background:
              'radial-gradient(circle at 50% 48%, rgba(220,165,67,0.13), transparent 32%), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.035), transparent 62%)',
          }}
        />

        <div className="absolute inset-x-0 top-[7vh] z-[40] text-center md:top-[9vh]">
          <p className="font-mono text-[9px] uppercase tracking-[0.34em] text-[#DCA543]/75 md:text-[10px]">
            scroll to relive the moment
          </p>
        </div>

        {images.slice(0, slots.length).map((image, index) => (
          <ParallaxLayer
            key={`${image.src}-${index}`}
            image={image}
            index={index}
            slot={slots[index]}
            progress={scrollYProgress}
            prefersReduced={prefersReduced}
          />
        ))}

        <motion.div
          style={prefersReduced ? undefined : { opacity: handoffOpacity }}
          className="absolute inset-x-0 bottom-[7vh] z-[45] flex justify-center"
        >
          <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.25em] text-white/45 backdrop-blur-sm">
            keep scrolling
          </span>
        </motion.div>
      </div>
    </section>
  )
}
