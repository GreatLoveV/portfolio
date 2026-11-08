import type { Metadata } from 'next'

import { SiteNav } from '@/components/site/SiteNav'
import { Atmosphere } from '@/components/ui/Atmosphere'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/layout'
import { Display, Text } from '@/components/ui/type'

import styles from './not-found.module.css'

export const metadata: Metadata = { title: 'Page not found' }

export default function NotFound() {
  return (
    <>
      <Atmosphere />
      <SiteNav />
      <main id="content">
        <Container className={styles.page}>
          <Display size="h1">This page doesn&rsquo;t exist.</Display>
          <Text size="lead" className={styles.text}>
            The link may be old or mistyped.
          </Text>
          <div className={styles.actions}>
            <Button href="/">Go to the home page</Button>
            <Button href="/projects" variant="secondary">
              See the projects
            </Button>
          </div>
        </Container>
      </main>
    </>
  )
}
