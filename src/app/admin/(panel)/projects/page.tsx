import { asc } from 'drizzle-orm'
import type { Metadata } from 'next'
import Link from 'next/link'

import {
  deleteProject,
  saveProjectOrder,
  toggleProjectStatus,
} from '@/app/admin/actions/projects'
import styles from '@/components/admin/admin.module.css'
import { ConfirmButton } from '@/components/admin/ConfirmButton'
import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/type'
import { db } from '@/db'
import { projects } from '@/db/schema'
import { requireAdmin } from '@/lib/guard'

export const metadata: Metadata = { title: 'Projects' }

export default async function ProjectsAdminPage() {
  await requireAdmin()
  const rows = await db.select().from(projects).orderBy(asc(projects.sortOrder))

  return (
    <>
      <header className={styles.header}>
        <Heading as="h1" size="h3">
          Projects
        </Heading>
        <Button href="/admin/projects/new">Add project</Button>
      </header>

      {rows.length === 0 ? (
        <p className={styles.empty}>
          No projects yet. Add your first one to show it on the site.
        </p>
      ) : (
        <>
          <form id="project-order" action={saveProjectOrder} />
          <div
            className={styles.tableWrap}
            tabIndex={0}
            role="region"
            aria-label="Projects"
          >
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Order</th>
                  <th scope="col">Title</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((project) => (
                  <tr key={project.id}>
                    <td>
                      <input
                        form="project-order"
                        type="number"
                        name={`order:${project.id}`}
                        defaultValue={project.sortOrder}
                        min={0}
                        max={9999}
                        className={styles.orderInput}
                        aria-label={`Order for ${project.title}`}
                      />
                    </td>
                    <td>
                      <Link href={`/admin/projects/${project.id}`}>{project.title}</Link>
                      {project.featured && (
                        <span className={styles.hint}> (featured)</span>
                      )}
                    </td>
                    <td>
                      <span
                        className={`${styles.status} ${project.status === 'published' ? styles.statusLive : ''}`}
                      >
                        {project.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td>
                      <div className={styles.rowActions}>
                        <form action={toggleProjectStatus.bind(null, project.id)}>
                          <button type="submit" className={styles.textButton}>
                            {project.status === 'published' ? 'Unpublish' : 'Publish'}
                          </button>
                        </form>
                        <form action={deleteProject.bind(null, project.id)}>
                          <ConfirmButton
                            question={`Delete "${project.title}"? This can't be undone.`}
                          >
                            Delete
                          </ConfirmButton>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.tableFoot}>
            <Button type="submit" variant="secondary" form="project-order">
              Save order
            </Button>
          </div>
        </>
      )}
    </>
  )
}
