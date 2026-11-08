import { count } from 'drizzle-orm'
import type { PgDatabase, PgQueryResultHKT } from 'drizzle-orm/pg-core'

import { experience, projects, siteSettings } from '../schema'
import { experienceSeeds, projectSeeds, settingsSeed } from './data'

/** Safe to re-run: only fills what is missing and never overwrites edits made in /admin. */
export async function seed(db: PgDatabase<PgQueryResultHKT>) {
  await db.insert(siteSettings).values(settingsSeed).onConflictDoNothing()
  await db.insert(projects).values(projectSeeds).onConflictDoNothing({
    target: projects.slug,
  })

  // experience has no natural unique key, so seed it only when the table is empty.
  const [{ value }] = await db.select({ value: count() }).from(experience)
  if (value === 0) await db.insert(experience).values(experienceSeeds)
}
