import type { ElementType, ReactNode } from 'react'

import styles from './type.module.css'

type TypeProps = {
  as?: ElementType
  className?: string
  children: ReactNode
}

const cx = (...names: (string | undefined | false)[]) => names.filter(Boolean).join(' ')

type DisplayProps = TypeProps & {
  size?: 'display' | 'h1'
  /** Print the ochre layer slightly out of line. Keep it for one title per page. */
  misregistered?: boolean
}

export function Display({
  as: Tag = 'h1',
  size = 'display',
  misregistered = true,
  className,
  children,
}: DisplayProps) {
  return (
    <Tag
      className={cx(
        styles.display,
        styles[size],
        misregistered && styles.misregistered,
        className,
      )}
    >
      {children}
    </Tag>
  )
}

type HeadingProps = TypeProps & { size?: 'h2' | 'h3' | 'h4' }

export function Heading({ as, size = 'h2', className, children }: HeadingProps) {
  const Tag = as ?? size
  return <Tag className={cx(styles.heading, styles[size], className)}>{children}</Tag>
}

type TextProps = TypeProps & {
  size?: 'body' | 'lead' | 'small'
  muted?: boolean
}

export function Text({
  as: Tag = 'p',
  size = 'body',
  muted = false,
  className,
  children,
}: TextProps) {
  return (
    <Tag className={cx(styles.text, styles[size], muted && styles.muted, className)}>
      {children}
    </Tag>
  )
}

/** Monospace, for technical facts only: stack tags, dates and metadata. */
export function Meta({ as: Tag = 'span', className, children }: TypeProps) {
  return <Tag className={cx(styles.meta, className)}>{children}</Tag>
}
