import { Markdown } from '@/components/Markdown'
import { Reveal } from '@/components/site/Reveal'
import { LightLeak } from '@/components/ui/Atmosphere'
import { Cell, Container, Grid, Section } from '@/components/ui/layout'
import { Display, Heading, Meta, Text } from '@/components/ui/type'
import {
  getExperience,
  getPublishedProjects,
  getSettings,
  pageMetadata,
  SITE_NAME,
} from '@/lib/content'

import styles from './about.module.css'

export const revalidate = 3600

export const generateMetadata = () =>
  pageMetadata({
    title: 'About',
    description:
      'Background, experience and skills of Wael Ettazi, full-stack web developer.',
    path: '/about',
  })

const month = new Intl.DateTimeFormat('en-GB', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

const formatRange = (start: string, end: string | null) =>
  `${month.format(new Date(start))} to ${end ? month.format(new Date(end)) : 'present'}`

export default async function AboutPage() {
  const [settings, entries, projects] = await Promise.all([
    getSettings(),
    getExperience(),
    getPublishedProjects(),
  ])
  const skills = [...new Set(projects.flatMap(({ stack }) => stack))].sort((a, b) =>
    a.localeCompare(b),
  )

  return (
    <>
      <Container className={styles.head}>
        <Display size="h1">{SITE_NAME}</Display>
      </Container>

      <Section className={styles.intro}>
        <LightLeak />
        <Container>
          <Grid>
            <Cell span={4} className={styles.side}>
              {settings.availability && <Meta as="p">{settings.availability}</Meta>}
              {settings.cvUrl && (
                <a href={settings.cvUrl} className={styles.cv} download>
                  Download my CV (PDF)
                </a>
              )}
            </Cell>
            <Cell span={7} start={6}>
              <Markdown>{settings.aboutBody}</Markdown>
            </Cell>
          </Grid>
        </Container>
      </Section>

      {entries.length > 0 && (
        <Section className={styles.compact}>
          <Container>
            <Heading className={styles.sectionTitle}>Experience</Heading>
            <ol role="list">
              {entries.map((entry) => (
                <li key={entry.id} className={styles.entry}>
                  <Reveal className={styles.entryRow}>
                    <Meta as="p" className={styles.dates}>
                      {formatRange(entry.startDate, entry.endDate)}
                    </Meta>
                    <div className={styles.entryBody}>
                      <Heading as="h3" size="h4">
                        {entry.title}
                      </Heading>
                      <Text className={styles.org}>
                        {[entry.organisation, entry.location].filter(Boolean).join(', ')}
                      </Text>
                      {entry.description && (
                        <Text muted className={styles.description}>
                          {entry.description}
                        </Text>
                      )}
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </Container>
        </Section>
      )}

      {skills.length > 0 && (
        <Section className={styles.compact}>
          <Container>
            <Grid>
              <Cell span={4}>
                <Heading size="h3" as="h2">
                  Skills
                </Heading>
              </Cell>
              <Cell span={7} start={6}>
                <ul role="list" className={styles.skills}>
                  {skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </Cell>
            </Grid>
          </Container>
        </Section>
      )}
    </>
  )
}
