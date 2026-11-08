'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

const settle = [0.16, 1, 0.3, 1] as const
const sweep = [0.76, 0, 0.24, 1] as const

const looks = {
  rise: {
    hidden: { opacity: 0, y: 24 },
    shown: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: settle },
  },
  mask: {
    hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
    shown: { clipPath: 'inset(0% 0% 0% 0%)' },
    transition: { duration: 1.2, ease: sweep },
  },
}

type RevealProps = {
  children: ReactNode
  look?: keyof typeof looks
  /** Seconds, for staggering neighbours. */
  delay?: number
  className?: string
}

/**
 * Plays once when scrolled into view. `data-reveal` lets CSS show the content
 * straight away for reduced motion and when JavaScript is off.
 */
export function Reveal({ children, look = 'rise', delay = 0, className }: RevealProps) {
  const { hidden, shown, transition } = looks[look]
  // Watch an unclipped wrapper: a fully masked element never counts as in view
  const wrapper = useRef<HTMLDivElement>(null)
  const inView = useInView(wrapper, { once: true, amount: 0.15 })

  return (
    <div ref={wrapper}>
      <motion.div
        data-reveal=""
        className={className}
        initial={hidden}
        animate={inView ? shown : hidden}
        transition={{ ...transition, delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}
