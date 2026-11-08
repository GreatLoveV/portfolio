'use server'

import { del } from '@vercel/blob'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { db } from '@/db'
import { projects } from '@/db/schema'
import {
  formValues,
  invalidState,
  isUniqueViolation,
  type FormState,
} from '@/lib/form-state'
import { requireAdmin } from '@/lib/guard'
import { idSchema, isBlobUrl, projectSchema, slugify } from '@/lib/validation'

const refreshSite = () => revalidatePath('/', 'layout')

export async function saveProject(
  id: string | null,
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin()

  const values = formValues(formData)
  const parsed = projectSchema.safeParse(values)
  if (!parsed.success) return invalidState(parsed.error, values)

  const { slug: givenSlug, ...data } = parsed.data
  const slug = givenSlug ? slugify(givenSlug) : slugify(data.title)
  if (!slug) {
    return {
      status: 'error',
      message: 'Fix the highlighted fields, then save.',
      errors: { slug: 'Enter a web address using letters or numbers.' },
      values,
    }
  }

  try {
    if (id) {
      const parsedId = idSchema.parse(id)
      const [existing] = await db
        .select({ publishedAt: projects.publishedAt })
        .from(projects)
        .where(eq(projects.id, parsedId))
      if (!existing) {
        return { status: 'error', message: 'This project no longer exists.', values }
      }

      await db
        .update(projects)
        .set({
          ...data,
          slug,
          publishedAt:
            data.status === 'published'
              ? (existing.publishedAt ?? new Date())
              : existing.publishedAt,
        })
        .where(eq(projects.id, parsedId))
    } else {
      await db.insert(projects).values({
        ...data,
        slug,
        publishedAt: data.status === 'published' ? new Date() : null,
      })
    }
  } catch (error) {
    if (isUniqueViolation(error)) {
      return {
        status: 'error',
        message: 'Fix the highlighted fields, then save.',
        errors: { slug: 'Another project already uses this web address.' },
        values,
      }
    }
    console.error('Saving project failed', error)
    return { status: 'error', message: 'The project was not saved. Try again.', values }
  }

  refreshSite()
  redirect('/admin/projects')
}

export async function toggleProjectStatus(id: string) {
  await requireAdmin()
  const parsedId = idSchema.parse(id)

  const [project] = await db
    .select({ status: projects.status, publishedAt: projects.publishedAt })
    .from(projects)
    .where(eq(projects.id, parsedId))
  if (!project) return

  const publish = project.status === 'draft'
  await db
    .update(projects)
    .set({
      status: publish ? 'published' : 'draft',
      publishedAt: publish ? (project.publishedAt ?? new Date()) : project.publishedAt,
    })
    .where(eq(projects.id, parsedId))

  refreshSite()
}

export async function saveProjectOrder(formData: FormData) {
  await requireAdmin()

  const updates = [...formData.entries()].flatMap(([key, value]) => {
    if (!key.startsWith('order:')) return []
    const id = idSchema.safeParse(key.slice('order:'.length))
    const sortOrder = Number(value)
    if (
      !id.success ||
      !Number.isInteger(sortOrder) ||
      sortOrder < 0 ||
      sortOrder > 9999
    ) {
      return []
    }
    return [db.update(projects).set({ sortOrder }).where(eq(projects.id, id.data))]
  })

  if (updates.length > 0) {
    await db.batch(updates as [(typeof updates)[0], ...typeof updates])
  }

  refreshSite()
}

export async function deleteProject(id: string) {
  await requireAdmin()
  const parsedId = idSchema.parse(id)

  const [deleted] = await db
    .delete(projects)
    .where(eq(projects.id, parsedId))
    .returning({ coverImage: projects.coverImage, gallery: projects.gallery })

  if (deleted) {
    const urls = [
      deleted.coverImage,
      ...deleted.gallery.map((image) => image.url),
    ].filter((url): url is string => Boolean(url) && isBlobUrl(url as string))
    // The project is already gone, so a storage hiccup shouldn't surface as a failure.
    if (urls.length > 0) await del(urls).catch(console.error)
  }

  refreshSite()
}
