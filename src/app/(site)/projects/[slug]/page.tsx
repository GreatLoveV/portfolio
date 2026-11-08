import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Markdown } from '@/components/Markdown'
import { ProjectCover } from '@/components/site/ProjectCover'
import { Reveal } from '@/components/site/Reveal'
import { Duotone } from '@/components/ui/Duotone'
import { Cell, Container, Grid, Section } from '@/components/ui/layout'
import { Display, Heading, Meta } from '@/components/ui/type'
import {
  getPublishedProject,
  getPublishedProjects,
  pageMetadata,
  SITE_NAME,
} from '@/lib/content'

import styles from './case-study.module.css'

export const revalidate = 3600

type PageProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const projects = await getPublishedProjects()
  return projects.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const project = await getPublishedProject(slug)
  if (!project) return { title: 'Project not found' }

  const path = `/projects/${project.slug}`
  const metadata = await pageMetadata({
    title: project.title,
    description: project.summary,
    path,
  })
  // The opengraph-image file beside this page supplies the picture
  return {
    ...metadata,
    openGraph: {
      title: `${project.title} | ${SITE_NAME}`,
      description: project.summary,
      url: path,
      siteName: SITE_NAME,
      type: 'article',
    },
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const [project, projects] = await Promise.all([
    getPublishedProject(slug),
    getPublishedProjects(),
  ])
  if (!project) notFound()

  const index = projects.findIndex(({ id }) => id === project.id)
  const next = projects.length > 1 ? projects[(index + 1) % projects.length] : null

  return (
    <article>
      <Container className={styles.head}>
        <Display size="h1" className={styles.title}>
          {project.title}
        </Display>
        <p className={styles.summary}>{project.summary}</p>
      </Container>

      {project.coverImage && (
        <Container>
          <div className={styles.cover}>
            <ProjectCover
              project={project}
              sizes="100vw"
              ratio="16 / 8"
              tone="ink"
              priority
            />
          </div>
        </Container>
      )}

      <Section>
        <Container>
          <Grid>
            <Cell span={4} className={styles.factsCell}>
              <dl className={styles.facts}>
                {project.role && (
                  <div>
                    <dt>Role</dt>
                    <dd>{project.role}</dd>
                  </div>
                )}
                {project.stack.length > 0 && (
                  <div>
                    <dt>Stack</dt>
                    <dd>
                      <Meta>{project.stack.join(', ')}</Meta>
                    </dd>
                  </div>
                )}
                {project.publishedAt && (
                  <div>
                    <dt>Year</dt>
                    <dd>
                      <Meta>{project.publishedAt.getUTCFullYear()}</Meta>
                    </dd>
                  </div>
                )}
                {(project.liveUrl || project.repoUrl) && (
                  <div>
                    <dt>Links</dt>
                    <dd className={styles.links}>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live site
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Source code
                        </a>
                      )}
                    </dd>
                  </div>
                )}
              </dl>
            </Cell>
            <Cell span={7} start={6}>
              {project.body.trim() && <Markdown>{project.body}</Markdown>}
            </Cell>
          </Grid>
        </Container>
      </Section>

      {project.gallery.length > 0 && (
        <Container>
          <div className={styles.gallery}>
            {project.gallery.map((image) => (
              <Reveal look="mask" key={image.url} className={styles.galleryItem}>
                <Duotone
                  src={image.url}
                  alt={image.alt}
                  sizes="(min-width: 48rem) 66vw, 100vw"
                  ratio="16 / 10"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      )}

      {next && (
        <Section>
          <Container>
            <Link href={`/projects/${next.slug}`} className={styles.next}>
              <Meta as="p">Next project</Meta>
              <Heading as="p" size="h2" className={styles.nextTitle}>
                {next.title}
              </Heading>
            </Link>
          </Container>
        </Section>
      )}
    </article>
  )
}
