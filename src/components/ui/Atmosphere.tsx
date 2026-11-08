import styles from './Atmosphere.module.css'

/** Page-wide film grain and vignette. Decorative, and never takes pointer events. */
export function Atmosphere() {
  return (
    <>
      <div className={styles.vignette} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
    </>
  )
}

type LightLeakProps = {
  side?: 'left' | 'right'
  className?: string
}

/** A burn of ochre along one edge of a positioned section. */
export function LightLeak({ side = 'right', className }: LightLeakProps) {
  return (
    <div
      className={[styles.leak, styles[side], className].filter(Boolean).join(' ')}
      aria-hidden="true"
    />
  )
}
