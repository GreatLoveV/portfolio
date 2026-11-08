import Link from 'next/link'

import { Markdown } from '@/components/Markdown'
import { ProjectCover } from '@/components/site/ProjectCover'
import { Reveal } from '@/components/site/Reveal'
import { LightLeak } from '@/components/ui/Atmosphere'
import { Button } from '@/components/ui/Button'
import { Cell, Container, Grid, Section } from '@/components/ui/layout'
import { Display, Heading, Meta, Text } from '@/components/ui/type'
import { getPublishedProjects, getSettings, pageMetadata } from '@/lib/content'

import styles from './home.module.css'

export const revalidate = 3600

export const generateMetadata = () => pageMetadata({ path: '/' })

const placements = [
  { span: 7, start: 1, className: undefined, sizes: '(min-width: 48rem) 58vw, 100vw' },
  {
    span: 4,
    start: 9,
    className: styles.dropped,
    sizes: '(min-width: 48rem) 33vw, 100vw',
  },
  {
    span: 6,
    start: 3,
    className: styles.lifted,
    sizes: '(min-width: 48rem) 50vw, 100vw',
  },
]

export default async function HomePage() {
  const [settings, projects] = await Promise.all([getSettings(), getPublishedProjects()])
  const featured = projects.filter((project) => project.featured).slice(0, 3)
  const teaser = settings.aboutBody.split(/\n\s*\n/)[0]

  return (
    <>
      <Container className={styles.hero}>
        <Display size="h1" className={styles.title}>
          {settings.heroTitle}
        </Display>
        <div className={styles.heroFoot}>
          {settings.availability && (
            <p className={styles.availability}>
              <span className={styles.mark} aria-hidden="true" />
              {settings.availability}
            </p>
          )}
          <Text size="lead">{settings.heroSubtitle}</Text>
          <div className={styles.actions}>
            <Button href="/projects">See the projects</Button>
            <Button href="/contact" variant="secondary">
              Get in touch
            </Button>
          </div>
        </div>
      </Container>

      {featured.length > 0 && (
        <Section>
          <Container>
            <Heading className={styles.workTitle}>Selected projects</Heading>
            <Grid>
              {featured.map((project, index) => {
                const place = placements[index]
                return (
                  <Cell
                    key={project.id}
                    span={place.span}
                    start={place.start}
                    className={place.className}
                  >
                    <Link href={`/projects/${project.slug}`} className={styles.project}>
                      <Reveal look="mask">
                        <ProjectCover
                          project={project}
                          sizes={place.sizes}
                          tone={index === 0 ? 'ink' : 'paper'}
                        />
                      </Reveal>
                      <Reveal delay={0.15}>
                        <Heading as="h3" size="h3" className={styles.projectTitle}>
                          {project.title}
                        </Heading>
                        <Text muted className={styles.projectSummary}>
                          {project.summary}
                        </Text>
                        <Meta as="p">{project.stack.join(', ')}</Meta>
                      </Reveal>
                    </Link>
                  </Cell>
                )
              })}
            </Grid>
            <Link href="/projects" className={styles.allLink}>
              All projects
            </Link>
          </Container>
        </Section>
      )}

      {teaser && (
        <Section className={styles.about}>
          <LightLeak side="left" />
          <Container>
            <Grid>
              <Cell span={7} start={6}>
                <Reveal>
                  <div className={styles.teaser}>
                    <Markdown>{teaser}</Markdown>
                  </div>
                  <Link href="/about">More about me</Link>
                </Reveal>
              </Cell>
            </Grid>
          </Container>
        </Section>
      )}

      <Section>
        <Container>
          <Reveal>
            <Heading className={styles.ctaTitle}>
              Hiring, or have a site to build?
            </Heading>
            <Button href="/contact">Send me a message</Button>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
