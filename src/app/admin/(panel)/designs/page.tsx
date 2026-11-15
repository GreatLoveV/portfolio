import { asc } from 'drizzle-orm'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { deleteDesign } from '@/app/admin/actions/designs'
import styles from '@/components/admin/admin.module.css'
import { ConfirmButton } from '@/components/admin/ConfirmButton'
import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/type'
import { db } from '@/db'
import { designs } from '@/db/schema'
import { requireAdmin } from '@/lib/guard'

export const metadata: Metadata = { title: 'Designs' }

export default async function DesignsAdminPage() {
  await requireAdmin()
  const rows = await db.select().from(designs).orderBy(asc(designs.sortOrder))

  return (
    <>
      <header className={styles.header}>
        <Heading as="h1" size="h3">
          Designs
        </Heading>
        <Button href="/admin/designs/new">Add design</Button>
      </header>

      {rows.length === 0 ? (
        <p className={styles.empty}>No designs yet. Add your first piece.</p>
      ) : (
        <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Designs">
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Order</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((design) => (
                <tr key={design.id}>
                  <td>
                    <Image
                      src={design.imageUrl}
                      alt=""
                      width={96}
                      height={96}
                      className={styles.thumb}
                    />
                  </td>
                  <td>
                    <Link href={`/admin/designs/${design.id}`}>{design.title}</Link>
                    <span className={styles.hint}>
                      {' '}
                      {design.width} × {design.height}
                    </span>
                  </td>
                  <td>{design.sortOrder}</td>
                  <td>{design.published ? 'Published' : 'Hidden'}</td>
                  <td>
                    <form action={deleteDesign.bind(null, design.id)}>
                      <ConfirmButton
                        question={`Delete "${design.title}"? This can't be undone.`}
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
