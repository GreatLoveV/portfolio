import { Duotone } from '@/components/ui/Duotone'
import type { Project } from '@/lib/content'

import styles from './site.module.css'

type ProjectCoverProps = {
  project: Project
  sizes: string
  tone?: 'paper' | 'ink'
  ratio?: string
  priority?: boolean
}

/** The project's image in duotone or, until one is uploaded, its title printed as a block. */
export function ProjectCover({
  project,
  sizes,
  tone = 'paper',
  ratio = '4 / 3',
  priority,
}: ProjectCoverProps) {
  if (project.coverImage) {
    return (
      <Duotone
        src={project.coverImage}
        alt={`Cover image for ${project.title}`}
        sizes={sizes}
        tone={tone}
        ratio={ratio}
        priority={priority}
      />
    )
  }

  return (
    <div
      className={[styles.block, tone === 'ink' && styles.blockInk]
        .filter(Boolean)
        .join(' ')}
      style={{ aspectRatio: ratio }}
      aria-hidden="true"
    >
      <span className={styles.blockTitle}>{project.title}</span>
    </div>
  )
}
