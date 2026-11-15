import Image from 'next/image'
import Link from 'next/link'

import specimen from '@/app/styleguide/specimen.png'
import type { Design } from '@/lib/content'

import { Reveal } from './Reveal'
import styles from './SideArt.module.css'

type SideArtProps = {
  /** A design piece. Falls back to the specimen artwork when there are none yet. */
  design?: Design
  /** CSS aspect ratio of the crop, for example "4 / 5". */
  ratio?: string
  /** Keeps the picture in view beside a long column of text. */
  sticky?: boolean
  /** Stretches the picture to fill the height of the column it sits in. */
  fill?: boolean
}

/** Desktop-only artwork that fills a side column which would otherwise sit empty. */
export function SideArt({ design, ratio = '4 / 5', sticky, fill }: SideArtProps) {
  return (
    <div
      className={[styles.wrap, sticky && styles.sticky, fill && styles.fill]
        .filter(Boolean)
        .join(' ')}
    >
      <Reveal look="mask">
        <Link
          href="/design"
          className={styles.link}
          style={fill ? undefined : { aspectRatio: ratio }}
        >
          <Image
            src={design?.imageUrl ?? specimen}
            alt={design?.alt ?? 'See my design work'}
            fill
            sizes="30vw"
            className={styles.image}
          />
        </Link>
      </Reveal>
    </div>
  )
}
