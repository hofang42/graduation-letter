'use client'

import { motion, Variants } from 'framer-motion'

export function WavyText({ 
  text, 
  className = "",
  delay = 0 
}: { 
  text: string, 
  className?: string,
  delay?: number 
}) {
  const letters = Array.from(text)
  
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay },
    },
    hover: {
      transition: { staggerChildren: 0.02 },
    }
  }

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      z: 0,
      transition: { type: 'spring', damping: 12, stiffness: 200 },
    },
    hidden: {
      opacity: 0,
      y: 20,
      z: 0,
      transition: { type: 'spring', damping: 12, stiffness: 200 },
    },
    hover: {
      y: [0, -15, 0],
      color: ['inherit', '#DCA543', 'inherit'],
      transition: { duration: 0.6, ease: 'easeInOut' },
    }
  }

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: '-10px' }}
    >
      {letters.map((letter, index) => (
        <motion.span 
          key={index} 
          variants={child}
          className={`${letter === ' ' ? 'w-2 md:w-3' : 'inline-block'} cursor-default`}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  )
}
