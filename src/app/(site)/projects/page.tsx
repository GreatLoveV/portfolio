import { ProjectIndex } from '@/components/site/ProjectIndex'
import { Container, Section } from '@/components/ui/layout'
import { Display, Text } from '@/components/ui/type'
import { getPublishedProjects, pageMetadata } from '@/lib/content'

import styles from './projects.module.css'

export const revalidate = 3600

export const generateMetadata = () =>
  pageMetadata({
    title: 'Projects',
    description:
      'Web projects by Wael Ettazi, with the problem, process and result of each.',
    path: '/projects',
  })

export default async function ProjectsPage() {
  const projects = await getPublishedProjects()

  return (
    <Container>
      <Section className={styles.page}>
        <Display size="h1" className={styles.title}>
          Projects
        </Display>
        {projects.length > 0 ? (
          <ProjectIndex projects={projects} />
        ) : (
          <Text size="lead" muted>
            Projects are being written up. Check back soon.
          </Text>
        )}
      </Section>
    </Container>
  )
}
