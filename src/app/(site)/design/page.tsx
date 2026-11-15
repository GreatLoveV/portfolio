import Image from 'next/image'

import specimen from '@/app/styleguide/specimen.png'
import { Reveal } from '@/components/site/Reveal'
import { LightLeak } from '@/components/ui/Atmosphere'
import { Cell, Container, Grid } from '@/components/ui/layout'
import { Display, Meta, Text } from '@/components/ui/type'
import { DesignGallery } from '@/components/site/DesignGallery'
import { getPublishedDesigns, pageMetadata } from '@/lib/content'

import styles from './design.module.css'

export const generateMetadata = () =>
  pageMetadata({
    title: 'Design',
    description: 'Graphic design work by Wael Ettazi.',
    path: '/design',
  })

export const revalidate = 3600

export default async function DesignPage() {
  const designs = await getPublishedDesigns()

  return (
    <div className={styles.page}>
      <LightLeak side="left" />
      <Container>
        <Grid>
          <Cell span={5} className={styles.copy}>
            <Display size="h1">Design</Display>
            <Text size="lead" className={styles.intro}>
              Graphic design is how I think about the web: contrast, grain, and knowing
              what to leave out. This is the work I make for myself, outside any brief.
            </Text>
          </Cell>
          <Cell span={6} start={7}>
            <Reveal look="mask">
              <Image
                src={specimen}
                alt="An antlered figure on a background of cracked ochre wood."
                sizes="(min-width: 48rem) 50vw, 100vw"
                placeholder="blur"
                priority
                className={styles.image}
              />
            </Reveal>
            <Meta as="p" className={styles.caption}>
              Personal work
            </Meta>
          </Cell>
        </Grid>
        {designs.length > 0 && (
          <section className={styles.gallery} aria-label="Selected designs">
            <Reveal>
              <DesignGallery items={designs} />
            </Reveal>
          </section>
        )}
      </Container>
    </div>
  )
}
