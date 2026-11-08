import type { experience, projects, siteSettings } from '../schema'

/** Placeholder content. Everything here is meant to be replaced from /admin. */

export const settingsSeed: typeof siteSettings.$inferInsert = {
  id: 1,
  heroTitle: 'Web software, built with care from schema to screen.',
  heroSubtitle:
    'Full-stack developer in Rabat-Salé, working in English and French with teams and clients anywhere.',
  aboutBody: `I'm Wael Ettazi, a second-year Développement Digital student at OFPPT, working through Full Stack Open on the side.

I like the unglamorous parts of a product: data models that hold up, forms that explain themselves, pages that load quickly on a bad connection. Graphic design is the other half of how I think, and it shows up in the details.`,
  availability: 'Open to work',
  cvUrl: null,
  socialLinks: {
    github: 'https://github.com/your-username',
    linkedin: 'https://www.linkedin.com/in/your-username',
    instagram: 'https://www.instagram.com/your-username',
    email: 'you@example.com',
  },
  seoTitle: 'Wael Ettazi, full-stack web developer',
  seoDescription:
    'Portfolio of Wael Ettazi, a full-stack web developer based in Rabat-Salé, Morocco. Available for a first role and freelance projects.',
  seoImage: null,
}

const caseStudy = (problem: string, process: string, outcome: string) =>
  `## Problem\n\n${problem}\n\n## Process\n\n${process}\n\n## Outcome\n\n${outcome}\n`

const outcomeTodo = 'Replace this with a real result: what changed, and how you know.'

export const projectSeeds: (typeof projects.$inferInsert)[] = [
  {
    title: 'Souk Ledger',
    slug: 'souk-ledger',
    summary: 'Placeholder: stock and sales tracking for a small family shop.',
    body: caseStudy(
      'Stock lived in a paper notebook, so the shop only found out an item had run out when a customer asked for it.',
      'Started from the data model, then built the sales entry screen around one-handed use on a phone behind the counter.',
      outcomeTodo,
    ),
    role: 'Design and full-stack development',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Drizzle'],
    repoUrl: 'https://github.com/your-username/souk-ledger',
    liveUrl: null,
    featured: true,
    sortOrder: 1,
    status: 'published',
    publishedAt: new Date('2026-06-12T09:00:00Z'),
  },
  {
    title: 'Darija Flashcards',
    slug: 'darija-flashcards',
    summary: 'Placeholder: a spaced-repetition app for learning Moroccan Arabic.',
    body: caseStudy(
      'Most language apps skip Darija, and learners end up with scattered word lists.',
      'Implemented a small scheduling algorithm on the server and kept the review screen fast and offline-tolerant.',
      outcomeTodo,
    ),
    role: 'Solo developer',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    repoUrl: 'https://github.com/your-username/darija-flashcards',
    liveUrl: null,
    featured: true,
    sortOrder: 2,
    status: 'published',
    publishedAt: new Date('2026-03-02T09:00:00Z'),
  },
  {
    title: 'Atelier Booking',
    slug: 'atelier-booking',
    summary: 'Placeholder: appointment booking for a Salé tailoring workshop.',
    body: caseStudy(
      'Bookings arrived through three messaging apps and regularly collided.',
      'Modelled availability as rules plus exceptions, and sent every confirmation through one channel.',
      outcomeTodo,
    ),
    role: 'Full-stack development',
    stack: ['Laravel', 'MySQL', 'JavaScript'],
    repoUrl: null,
    liveUrl: 'https://example.com',
    featured: true,
    sortOrder: 3,
    status: 'published',
    publishedAt: new Date('2025-12-15T09:00:00Z'),
  },
  {
    title: 'Phonebook API',
    slug: 'phonebook-api',
    summary: 'Placeholder: a Full Stack Open exercise taken further, with tests and CI.',
    body: caseStudy(
      'The course exercise stops at a working API. I wanted one I could trust when changing it.',
      'Added integration tests against a real database and a CI pipeline that runs them on every push.',
      outcomeTodo,
    ),
    role: 'Solo developer',
    stack: ['Node.js', 'Express', 'MongoDB', 'GitHub Actions'],
    repoUrl: 'https://github.com/your-username/phonebook-api',
    liveUrl: null,
    featured: false,
    sortOrder: 4,
    status: 'published',
    publishedAt: new Date('2025-10-20T09:00:00Z'),
  },
  {
    title: 'Unfinished idea',
    slug: 'unfinished-idea',
    summary: 'A draft, to confirm that unpublished work stays off the public site.',
    role: '',
    stack: ['TypeScript'],
    sortOrder: 5,
    status: 'draft',
  },
]

export const experienceSeeds: (typeof experience.$inferInsert)[] = [
  {
    type: 'education',
    title: 'Technicien Spécialisé, Développement Digital',
    organisation: 'OFPPT',
    location: 'Rabat-Salé, Morocco',
    startDate: '2025-09-01',
    endDate: null,
    description: 'Bac+2 programme in web development. Placeholder dates, please confirm.',
    sortOrder: 1,
  },
  {
    type: 'course',
    title: 'Full Stack Open',
    organisation: 'University of Helsinki',
    location: 'Online',
    startDate: '2026-01-15',
    endDate: null,
    description:
      'React, Node.js, testing, GraphQL and TypeScript, self-paced. Placeholder dates, please confirm.',
    sortOrder: 2,
  },
  {
    type: 'work',
    title: 'Freelance web developer',
    organisation: 'Independent',
    location: 'Remote',
    startDate: '2026-02-01',
    endDate: null,
    description: 'Placeholder entry. Replace it with real client work, or delete it.',
    sortOrder: 3,
  },
]
