import type { CSSProperties, ElementType, ReactNode } from 'react'

import styles from './layout.module.css'

type BaseProps = {
  as?: ElementType
  className?: string
  children: ReactNode
}

const cx = (...names: (string | undefined | false)[]) => names.filter(Boolean).join(' ')

/** Page-width wrapper with the site gutter. */
export function Container({ as: Tag = 'div', className, children }: BaseProps) {
  return <Tag className={cx(styles.container, className)}>{children}</Tag>
}

/** Vertical section rhythm. */
export function Section({ as: Tag = 'section', className, children }: BaseProps) {
  return <Tag className={cx(styles.section, className)}>{children}</Tag>
}

/** 12-column grid from the tablet breakpoint up, a single column below it. */
export function Grid({ as: Tag = 'div', className, children }: BaseProps) {
  return <Tag className={cx(styles.grid, className)}>{children}</Tag>
}

type CellProps = BaseProps & {
  /** Columns to occupy, 1 to 12. */
  span?: number
  /** Column to start on, 1 to 12. Use it to leave deliberate empty space. */
  start?: number
}

export function Cell({
  as: Tag = 'div',
  span = 12,
  start,
  className,
  children,
}: CellProps) {
  const style = {
    '--cell-span': span,
    '--cell-start': start ?? 'auto',
  } as CSSProperties

  return (
    <Tag className={cx(styles.cell, className)} style={style}>
      {children}
    </Tag>
  )
}
