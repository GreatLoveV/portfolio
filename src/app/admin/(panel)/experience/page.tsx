import { asc } from 'drizzle-orm'
import type { Metadata } from 'next'
import Link from 'next/link'

import { deleteExperience } from '@/app/admin/actions/experience'
import styles from '@/components/admin/admin.module.css'
import { ConfirmButton } from '@/components/admin/ConfirmButton'
import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/type'
import { db } from '@/db'
import { experience } from '@/db/schema'
import { requireAdmin } from '@/lib/guard'

export const metadata: Metadata = { title: 'Experience' }

const typeLabels = { education: 'Education', work: 'Work', course: 'Course' }

export default async function ExperienceAdminPage() {
  await requireAdmin()
  const rows = await db.select().from(experience).orderBy(asc(experience.sortOrder))

  return (
    <>
      <header className={styles.header}>
        <Heading as="h1" size="h3">
          Experience
        </Heading>
        <Button href="/admin/experience/new">Add entry</Button>
      </header>

      {rows.length === 0 ? (
        <p className={styles.empty}>
          No entries yet. Add your education or work history.
        </p>
      ) : (
        <div
          className={styles.tableWrap}
          tabIndex={0}
          role="region"
          aria-label="Experience entries"
        >
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Order</th>
                <th scope="col">Title</th>
                <th scope="col">Type</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.sortOrder}</td>
                  <td>
                    <Link href={`/admin/experience/${entry.id}`}>{entry.title}</Link>
                    <span className={styles.hint}> at {entry.organisation}</span>
                  </td>
                  <td>{typeLabels[entry.type]}</td>
                  <td>
                    <form action={deleteExperience.bind(null, entry.id)}>
                      <ConfirmButton
                        question={`Delete "${entry.title}"? This can't be undone.`}
                      >
                        Delete
                      </ConfirmButton>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
