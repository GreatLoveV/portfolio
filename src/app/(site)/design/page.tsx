import Image from 'next/image'

import specimen from '@/app/styleguide/specimen.png'
import { Reveal } from '@/components/site/Reveal'
import { LightLeak } from '@/components/ui/Atmosphere'
import { Cell, Container, Grid } from '@/components/ui/layout'
import { Display, Meta, Text } from '@/components/ui/type'
import { pageMetadata } from '@/lib/content'

import styles from './design.module.css'

export const generateMetadata = () =>
  pageMetadata({
    title: 'Design',
    description: 'Graphic design work by Wael Ettazi.',
    path: '/design',
  })

export default function DesignPage() {
  return (
    <div className={styles.page}>
      <LightLeak side="left" />
      <Container>
        <Grid>
          <Cell span={5} className={styles.copy}>
            <Display size="h1">Design</Display>
            <Text size="lead" className={styles.intro}>
              Graphic design is the other half of how I build for the web. It&rsquo;s
              where I learned to care about grain, weight and what to leave out.
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
      </Container>
    </div>
  )
}
