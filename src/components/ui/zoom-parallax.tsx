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

// Every slot has its own lane. The mobile map uses three columns and three rows;
// the desktop map keeps the same reading order with larger, calmer frames.
const layoutClasses = [
  'left-[2vw] top-[4vh] w-[30vw] aspect-[2/3] md:left-[3vw] md:top-[8vh] md:w-[16vw]',
  'left-[35vw] top-[4vh] w-[30vw] aspect-[3/2] md:left-[23vw] md:top-[8vh] md:w-[32vw]',
  'left-[68vw] top-[4vh] w-[30vw] aspect-[2/3] md:left-[73vw] md:top-[8vh] md:w-[16vw]',
  'left-[2vw] top-[28vh] w-[30vw] aspect-[3/2] md:left-[3vw] md:top-[38vh] md:w-[28vw]',
  'left-[35vw] top-[28vh] w-[30vw] aspect-[2/3] md:left-[36vw] md:top-[38vh] md:w-[16vw]',
  'left-[68vw] top-[28vh] w-[30vw] aspect-[3/2] md:left-[60vw] md:top-[38vh] md:w-[28vw]',
  'left-[2vw] top-[52vh] w-[30vw] aspect-[2/3] md:left-[3vw] md:top-[69vh] md:w-[16vw]',
  'left-[35vw] top-[52vh] w-[30vw] aspect-[3/2] md:left-[25vw] md:top-[69vh] md:w-[28vw]',
  'left-[68vw] top-[52vh] w-[30vw] aspect-[3/2] md:left-[60vw] md:top-[69vh] md:w-[28vw]',
]

export function ZoomParallax({ images }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  // Keep the cinematic movement subtle enough that one image never expands over
  // the next lane and obscures its face or caption.
  const gentleZoom = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <div ref={container} className="relative h-[100dvh] motion-safe:h-[300vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-[#0A0A0C]">
        {images.map(({ src, alt }, index) => {
          const layout = layoutClasses[index % layoutClasses.length]

          return (
            <motion.div
              key={`${src}-${index}`}
              style={prefersReduced ? undefined : { scale: gentleZoom, zIndex: 10 + index }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className={`absolute ${layout}`}>
                <Image
                  src={src || '/placeholder.svg'}
                  alt={alt || `Parallax image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 30vw, 32vw"
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
