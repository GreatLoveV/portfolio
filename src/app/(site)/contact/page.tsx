import { ContactForm } from '@/components/site/ContactForm'
import { Cell, Container, Grid } from '@/components/ui/layout'
import { Display, Meta, Text } from '@/components/ui/type'
import { getSettings, pageMetadata } from '@/lib/content'

import { sendMessage } from './actions'
import styles from './contact.module.css'

export const revalidate = 3600

export const generateMetadata = () =>
  pageMetadata({
    title: 'Contact',
    description: 'Get in touch with Wael Ettazi about a role or a freelance project.',
    path: '/contact',
  })

export default async function ContactPage() {
  const { availability, socialLinks } = await getSettings()

  return (
    <Container className={styles.page}>
      <Grid>
        <Cell span={5}>
          <Display size="h1">Contact</Display>
          <Text size="lead" className={styles.intro}>
            Hiring an intern or a junior developer, or have a small site to build? Tell me
            about it, in English, Arabic or French, and I&rsquo;ll get back to you.
          </Text>
          {availability && (
            <Meta as="p" className={styles.fact}>
              {availability}
            </Meta>
          )}
          {socialLinks.email && (
            <p className={styles.fact}>
              <a href={`mailto:${socialLinks.email}`} className="ink-link ink-link-text">
                {socialLinks.email}
              </a>
            </p>
          )}
        </Cell>
        <Cell span={6} start={7}>
          <ContactForm action={sendMessage} />
        </Cell>
      </Grid>
    </Container>
  )
}
