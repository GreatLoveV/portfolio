import { z } from 'zod'

const parseUrl = (value: string) => {
  try {
    return new URL(value)
  } catch {
    return null
  }
}

const isHttpUrl = (value: string) => {
  const url = parseUrl(value)
  return url?.protocol === 'https:' || url?.protocol === 'http:'
}

export const isBlobUrl = (value: string) => {
  const url = parseUrl(value)
  return (
    url?.protocol === 'https:' && url.hostname.endsWith('.public.blob.vercel-storage.com')
  )
}

const emptyToNull = (value: string) => value.trim() || null

const optionalLink = z
  .string()
  .max(2048, 'That link is too long.')
  .transform(emptyToNull)
  .refine((value) => value === null || isHttpUrl(value), {
    error: 'Enter a full link starting with https://',
  })

const optionalUpload = z
  .string()
  .max(2048)
  .transform(emptyToNull)
  .refine((value) => value === null || isBlobUrl(value), {
    error: 'Upload the file again.',
  })

export function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

const gallerySchema = z.array(
  z.object({
    url: z.string().refine(isBlobUrl, { error: 'Upload the image again.' }),
    alt: z.string().trim().min(1, 'Describe every gallery image.').max(300),
  }),
)

export const idSchema = z.uuid()

export const projectSchema = z.object({
  title: z.string().trim().min(1, 'Enter a title.').max(120),
  slug: z
    .string()
    .trim()
    .max(80)
    .regex(/^[a-z0-9-]*$/, 'Use lowercase letters, numbers and hyphens only.'),
  summary: z.string().trim().min(1, 'Enter a short summary.').max(300),
  body: z.string().max(50_000, 'The case study is too long.'),
  role: z.string().trim().max(120),
  stack: z
    .string()
    .max(500)
    .transform((value) => [
      ...new Set(
        value
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
      ),
    ])
    .refine((tags) => tags.length <= 20, { error: 'Use 20 tags at most.' }),
  repoUrl: optionalLink,
  liveUrl: optionalLink,
  coverImage: optionalUpload,
  gallery: z
    .string()
    .max(20_000)
    .transform((value, ctx) => {
      try {
        return JSON.parse(value || '[]') as unknown
      } catch {
        ctx.addIssue({ code: 'custom', message: 'The gallery could not be read.' })
        return z.NEVER
      }
    })
    .pipe(gallerySchema),
  featured: z
    .literal('on')
    .optional()
    .transform((value) => value === 'on'),
  sortOrder: z.coerce
    .number({ error: 'Enter a whole number.' })
    .int('Enter a whole number.')
    .min(0, 'Use 0 or higher.')
    .max(9999),
  status: z.enum(['draft', 'published']),
})

export const experienceSchema = z
  .object({
    type: z.enum(['education', 'work', 'course']),
    title: z.string().trim().min(1, 'Enter a title.').max(160),
    organisation: z.string().trim().min(1, 'Enter an organisation.').max(160),
    location: z.string().max(160).transform(emptyToNull),
    startDate: z.iso.date('Choose a start date.'),
    endDate: z
      .string()
      .transform(emptyToNull)
      .pipe(z.iso.date('Choose a valid end date.').nullable()),
    description: z.string().trim().max(2000),
    sortOrder: z.coerce
      .number({ error: 'Enter a whole number.' })
      .int('Enter a whole number.')
      .min(0, 'Use 0 or higher.')
      .max(9999),
  })
  .refine((value) => !value.endDate || value.endDate >= value.startDate, {
    path: ['endDate'],
    error: 'The end date must be after the start date.',
  })

export const designSchema = z.object({
  title: z.string().trim().min(1, 'Enter a title.').max(120),
  caption: z.string().trim().max(300),
  alt: z
    .string()
    .trim()
    .min(1, 'Describe the image for people who cannot see it.')
    .max(300),
  imageUrl: z.string().refine(isBlobUrl, { error: 'Upload an image first.' }),
  width: z.coerce.number().int().min(1).max(20_000),
  height: z.coerce.number().int().min(1).max(20_000),
  sortOrder: z.coerce
    .number({ error: 'Enter a whole number.' })
    .int('Enter a whole number.')
    .min(0, 'Use 0 or higher.')
    .max(9999),
  published: z
    .literal('on')
    .optional()
    .transform((value) => value === 'on'),
})

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Enter your name.').max(120, 'That name is too long.'),
  email: z.email('Enter a full email address, like name@example.com.').max(254),
  body: z
    .string()
    .trim()
    .min(10, 'Write at least a sentence so I know how to help.')
    .max(5000, 'Keep your message under 5000 characters.'),
})

export const settingsSchema = z.object({
  heroTitle: z.string().trim().min(1, 'Enter a hero title.').max(200),
  heroSubtitle: z.string().trim().min(1, 'Enter a hero subtitle.').max(400),
  aboutBody: z.string().max(20_000, 'The about text is too long.'),
  availability: z.string().trim().max(80),
  cvUrl: optionalUpload,
  github: optionalLink,
  linkedin: optionalLink,
  instagram: optionalLink,
  email: z
    .string()
    .max(254)
    .transform(emptyToNull)
    .refine((value) => value === null || z.email().safeParse(value).success, {
      error: 'Enter a full email address, like name@example.com.',
    }),
  seoTitle: z.string().trim().max(120),
  seoDescription: z.string().trim().max(300),
  seoImage: optionalUpload,
})
