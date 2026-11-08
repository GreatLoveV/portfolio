'use client'

import Link from 'next/link'
import { useState } from 'react'

import { Heading, Meta, Text } from '@/components/ui/type'
import type { Project } from '@/lib/content'

import { ProjectCover } from './ProjectCover'
import { Reveal } from './Reveal'
import styles from './ProjectIndex.module.css'

export function ProjectIndex({ projects }: { projects: Project[] }) {
  const [tag, setTag] = useState<string | null>(null)
  const tags = [...new Set(projects.flatMap((project) => project.stack))].sort((a, b) =>
    a.localeCompare(b),
  )
  const shown = tag ? projects.filter((project) => project.stack.includes(tag)) : projects

  const filter = (value: string | null, label: string) => (
    <li key={label}>
      <button
        type="button"
        className={styles.tag}
        aria-pressed={tag === value}
        onClick={() => setTag(value)}
      >
        {label}
      </button>
    </li>
  )

  return (
    <>
      <div className={styles.filters}>
        <ul role="list" className={styles.tags} aria-label="Filter by technology">
          {filter(null, 'All')}
          {tags.map((value) => filter(value, value))}
        </ul>
        <p className="sr-only" role="status">
          {shown.length === 1 ? '1 project shown' : `${shown.length} projects shown`}
        </p>
      </div>

      <ol role="list" className={styles.list}>
        {shown.map((project) => (
          <li key={project.id} className={styles.item}>
            <Reveal>
              <Link href={`/projects/${project.slug}`} className={styles.row}>
                <Meta className={styles.year}>
                  {project.publishedAt?.getUTCFullYear()}
                </Meta>
                <div className={styles.copy}>
                  <Heading as="h2" size="h3" className={styles.title}>
                    {project.title}
                  </Heading>
                  <Text muted className={styles.summary}>
                    {project.summary}
                  </Text>
                  <Meta as="p">{project.stack.join(', ')}</Meta>
                </div>
                <div className={styles.cover}>
                  <ProjectCover
                    project={project}
                    sizes="(min-width: 48rem) 25vw, 100vw"
                    ratio="3 / 2"
                  />
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ol>
    </>
  )
}
