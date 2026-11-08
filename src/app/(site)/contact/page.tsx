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
            Tell me about the role or the project. English or French is fine.
          </Text>
          {availability && (
            <Meta as="p" className={styles.fact}>
              {availability}
            </Meta>
          )}
          {socialLinks.email && (
            <p className={styles.fact}>
              <a href={`mailto:${socialLinks.email}`}>{socialLinks.email}</a>
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
