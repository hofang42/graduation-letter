"use client"

import { useScroll, useTransform, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

interface ParallaxImage {
  src: string
  alt?: string
}

interface ZoomParallaxProps {
  /** Array of images displayed in the zoom collage. */
  images: ParallaxImage[]
}

const layoutClasses = [
  // Flying-cap hero: portrait frame centered above the collage.
  'left-1/2 top-[11vh] w-[30vw] aspect-[2/3] -translate-x-1/2 md:top-[12vh] md:w-[18vw]',
  // Main horizontal group: wide and centered at the top.
  'left-1/2 top-[2vh] w-[78vw] aspect-[3/2] -translate-x-1/2 md:top-[4vh] md:w-[38vw]',
  // Folder group portrait.
  'left-[3vw] top-[23vh] w-[34vw] aspect-[2/3] md:left-[8vw] md:top-[18vh] md:w-[19vw]',
  // Seated folder portrait.
  'right-[3vw] top-[23vh] w-[34vw] aspect-[2/3] md:right-[8vw] md:top-[19vh] md:w-[19vw]',
  // Standing folder portrait in the lower-left cluster.
  'left-[4vw] top-[58vh] w-[33vw] aspect-[2/3] md:left-[14vw] md:top-[55vh] md:w-[18vw]',
  // Existing lower horizontal group.
  'left-1/2 top-[58vh] w-[72vw] aspect-[3/2] -translate-x-1/2 md:top-[57vh] md:w-[32vw]',
  // Existing lower-right wide group.
  'right-[2vw] top-[63vh] w-[46vw] aspect-[3/2] md:right-[10vw] md:top-[59vh] md:w-[28vw]',
  // Added horizontal group to fill the middle-left gap.
  'left-[2vw] top-[48vh] w-[46vw] aspect-[3/2] md:left-[2vw] md:top-[39vh] md:w-[29vw]',
  // Added horizontal close-up to fill the middle-right gap.
  'right-[2vw] top-[48vh] w-[46vw] aspect-[3/2] md:right-[2vw] md:top-[39vh] md:w-[29vw]',
]

export function ZoomParallax({ images }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4])
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5])
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6])
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8])
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9])

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9, scale5, scale6]

  return (
    <div ref={container} className="relative h-[100dvh] motion-safe:h-[300vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-[#0A0A0C]">
        {images.map(({ src, alt }, index) => {
          const scale = scales[index % scales.length]
          const layout = layoutClasses[index % layoutClasses.length]

          return (
            <motion.div
              key={`${src}-${index}`}
              style={prefersReduced ? undefined : { scale }}
              className="absolute inset-0"
            >
              <div className={`absolute ${layout}`}>
                <Image
                  src={src || '/placeholder.svg'}
                  alt={alt || `Parallax image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 78vw, 40vw"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className="object-contain"
                />
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
