import Image from 'next/image'
import type { StaticImageData } from 'next/image'

import styles from './Duotone.module.css'

type DuotoneProps = {
  src: string | StaticImageData
  alt: string
  /** Paper reads quietly, ink is for the one image a page should remember. */
  tone?: 'paper' | 'ink'
  sizes: string
  /** CSS aspect ratio, for example "4 / 5". */
  ratio?: string
  priority?: boolean
  className?: string
}

/** Prints any image in two colours with grain, so a grid of covers reads as one set. */
export function Duotone({
  src,
  alt,
  tone = 'paper',
  sizes,
  ratio = '4 / 5',
  priority,
  className,
}: DuotoneProps) {
  return (
    <div
      className={[styles.frame, styles[tone], className].filter(Boolean).join(' ')}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={styles.image}
      />
    </div>
  )
}
