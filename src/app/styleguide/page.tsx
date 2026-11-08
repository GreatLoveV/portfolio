import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Atmosphere, LightLeak } from '@/components/ui/Atmosphere'
import { Button } from '@/components/ui/Button'
import { Duotone } from '@/components/ui/Duotone'
import { Field } from '@/components/ui/Field'
import { Cell, Container, Grid, Section } from '@/components/ui/layout'
import { Display, Heading, Meta, Text } from '@/components/ui/type'

import specimen from './specimen.png'
import styles from './styleguide.module.css'

export const metadata: Metadata = {
  title: 'Styleguide',
  robots: { index: false, follow: false },
}

const colours = [
  ['ground-sunken', '#0E0A07', 'Inputs, deepest layer'],
  ['ground', '#16100C', 'Page'],
  ['ground-raised', '#211A14', 'Raised surfaces'],
  ['ground-high', '#2E261E', 'Disabled, highest layer'],
  ['paper', '#E5D8C6', 'Text'],
  ['paper-muted', '#B8A692', 'Secondary text'],
  ['ink', '#D5AF41', 'Action, focus, print offset'],
  ['ink-deep', '#927232', 'Ochre shadow tone'],
  ['line', '#3A3026', 'Dividers'],
  ['line-control', '#7A6A58', 'Form controls'],
  ['error', '#E8957F', 'Form errors'],
  ['success', '#AEB886', 'Form success'],
]

const typeScale = [
  ['h1', 'var(--text-h1)', 'Case studies'],
  ['h2', 'var(--text-h2)', 'Selected work'],
  ['h3', 'var(--text-h3)', 'What the shop needed'],
  ['h4', 'var(--text-h4)', 'Stock that counts itself'],
]

const spacing = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

const motion = [
  ['fast', '200ms', 'Hover and focus'],
  ['base', '400ms', 'Small state changes'],
  ['slow', '800ms', 'Staggered text'],
  ['reveal', '1400ms', 'Image wipes'],
]

export default function StyleguidePage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <>
      <Atmosphere />
      <main className={styles.page}>
        <div className={styles.hero}>
          <LightLeak side="right" />
          <Container>
            <Display>Printed in two colours.</Display>
            <Grid className={styles.heroNote}>
              <Cell span={5} start={8}>
                <Text size="lead">
                  A warm dark ground, bone paper and one ochre ink. Large titles land
                  slightly out of register, the way a screenprint does.
                </Text>
                <Meta as="p" className={styles.note}>
                  Development only, hidden in production
                </Meta>
              </Cell>
            </Grid>
          </Container>
        </div>

        <Section>
          <Container>
            <Heading>Colour</Heading>
            <ul role="list" className={styles.swatches}>
              {colours.map(([name, hex, use]) => (
                <li key={name}>
                  <div
                    className={styles.swatch}
                    style={{ backgroundColor: `var(--color-${name})` }}
                  />
                  <p className={styles.swatchName}>{name}</p>
                  <Meta as="p">{hex}</Meta>
                  <Text size="small" muted>
                    {use}
                  </Text>
                </li>
              ))}
            </ul>
          </Container>
        </Section>

        <Section>
          <Container>
            <Heading>Type</Heading>
            <Grid className={styles.block}>
              <Cell span={9} start={4}>
                <Display as="p" size="h1" misregistered={false}>
                  Archivo, condensed and heavy.
                </Display>
              </Cell>
            </Grid>
            <dl className={styles.scale}>
              {typeScale.map(([token, size, sample]) => (
                <div key={token} className={styles.scaleRow}>
                  <dt>
                    <Meta>{token}</Meta>
                  </dt>
                  <dd
                    className={styles.scaleSample}
                    style={{ fontSize: size, lineHeight: 1 }}
                  >
                    {sample}
                  </dd>
                </div>
              ))}
            </dl>
            <Grid className={styles.block}>
              <Cell span={7}>
                <Text size="lead">
                  Lead text opens a page and says plainly what it is about.
                </Text>
                <Text className={styles.bodySample}>
                  Body text is Archivo at normal width, 17 pixels on a 1.6 line height,
                  and never runs wider than 65 characters. French accents are covered: un
                  développeur à Rabat-Salé, déjà prêt à travailler.{' '}
                  <a href="#type">Links are underlined</a> so they don&apos;t depend on
                  colour.
                </Text>
                <Text size="small" muted className={styles.bodySample}>
                  Small muted text carries supporting detail.
                </Text>
              </Cell>
              <Cell span={4} start={9}>
                <ul role="list" className={styles.metaList}>
                  <li>
                    <Meta>Next.js</Meta>
                  </li>
                  <li>
                    <Meta>PostgreSQL</Meta>
                  </li>
                  <li>
                    <Meta>2025 to 2027</Meta>
                  </li>
                  <li>
                    <Meta>IBM Plex Mono, for technical facts only</Meta>
                  </li>
                </ul>
              </Cell>
            </Grid>
          </Container>
        </Section>

        <Section>
          <Container>
            <Heading>Project covers</Heading>
            <Grid className={styles.block}>
              <Cell span={7}>
                <Duotone
                  src={specimen}
                  alt="An antlered figure in silhouette against cracked wood"
                  tone="ink"
                  ratio="5 / 4"
                  sizes="(min-width: 48rem) 58vw, 100vw"
                />
                <Meta as="p" className={styles.note}>
                  Ink tone, for one image per page
                </Meta>
              </Cell>
              <Cell span={4} start={9} className={styles.coverOffset}>
                <Duotone
                  src={specimen}
                  alt="The same figure printed in the paper tone"
                  tone="paper"
                  sizes="(min-width: 48rem) 33vw, 100vw"
                />
                <Meta as="p" className={styles.note}>
                  Paper tone, the default
                </Meta>
              </Cell>
            </Grid>
          </Container>
        </Section>

        <Section>
          <Container>
            <Heading>Controls</Heading>
            <Grid className={styles.block}>
              <Cell span={5}>
                <div className={styles.buttons}>
                  <Button>Send message</Button>
                  <Button variant="secondary">View the code</Button>
                  <Button disabled>Sending</Button>
                </div>
              </Cell>
              <Cell span={6} start={7}>
                <form className={styles.form}>
                  <Field
                    label="Your name"
                    name="name"
                    autoComplete="name"
                    defaultValue="Salma"
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    defaultValue="salma@example"
                    error="Enter a full email address, like name@example.com."
                  />
                  <Field
                    label="Project details"
                    name="body"
                    multiline
                    hint="A few lines is plenty."
                  />
                </form>
              </Cell>
            </Grid>
          </Container>
        </Section>

        <Section>
          <Container>
            <Heading>Space and motion</Heading>
            <Grid className={styles.block}>
              <Cell span={6}>
                <ul role="list" className={styles.spaces}>
                  {spacing.map((step) => (
                    <li key={step} className={styles.spaceRow}>
                      <Meta>{`space-${step}`}</Meta>
                      <span
                        className={styles.spaceBar}
                        style={{ width: `var(--space-${step})` }}
                      />
                    </li>
                  ))}
                </ul>
              </Cell>
              <Cell span={5} start={8}>
                <dl className={styles.motion}>
                  {motion.map(([name, value, use]) => (
                    <div key={name} className={styles.motionRow}>
                      <dt>
                        <Meta>{`${name}, ${value}`}</Meta>
                      </dt>
                      <dd>
                        <Text size="small" muted>
                          {use}
                        </Text>
                      </dd>
                    </div>
                  ))}
                </dl>
              </Cell>
            </Grid>
          </Container>
        </Section>
      </main>
    </>
  )
}
