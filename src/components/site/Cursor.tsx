'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

import styles from './site.module.css'

const follow = { stiffness: 320, damping: 36, mass: 0.6 }

/** A small ochre ring trailing the real cursor. Mouse users without reduced motion only. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [overLink, setOverLink] = useState(false)
  const pointerX = useMotionValue(-100)
  const pointerY = useMotionValue(-100)
  const x = useSpring(pointerX, follow)
  const y = useSpring(pointerY, follow)

  useEffect(() => {
    const wanted = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    )
    if (!wanted.matches) return

    const move = (event: PointerEvent) => {
      pointerX.set(event.clientX)
      pointerY.set(event.clientY)
      setEnabled(true)
      const target = event.target as Element | null
      setOverLink(Boolean(target?.closest('a, button')))
    }

    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [pointerX, pointerY])

  if (!enabled) return null

  return (
    <motion.div
      className={styles.cursor}
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      animate={{ scale: overLink ? 2.4 : 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    />
  )
}
