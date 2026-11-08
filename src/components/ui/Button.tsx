import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

import styles from './Button.module.css'

type Variant = 'primary' | 'secondary'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  href?: undefined
}

type LinkProps = {
  variant?: Variant
  href: string
  className?: string
  children: ReactNode
}

const classesFor = (variant: Variant = 'primary', className?: string) =>
  [styles.button, styles[variant], className].filter(Boolean).join(' ')

export function Button(props: ButtonProps | LinkProps) {
  if (props.href !== undefined) {
    const { variant, className, href, children } = props
    return (
      <Link href={href} className={classesFor(variant, className)}>
        {children}
      </Link>
    )
  }

  const { variant, className, type = 'button', ...rest } = props
  return <button type={type} className={classesFor(variant, className)} {...rest} />
}
