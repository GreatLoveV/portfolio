import { deleteMessage, toggleMessageRead } from '@/app/admin/actions/messages'
import { Meta } from '@/components/ui/type'
import type { messages } from '@/db/schema'

import styles from './admin.module.css'
import { ConfirmButton } from './ConfirmButton'

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'Africa/Casablanca',
})

export function MessageItem({ message }: { message: typeof messages.$inferSelect }) {
  return (
    <article className={styles.message}>
      <div className={styles.messageHead}>
        <p className={styles.messageFrom}>
          {message.name}{' '}
          <a href={`mailto:${encodeURIComponent(message.email)}`}>{message.email}</a>
          {!message.read && <span className={styles.messageUnread}> Unread</span>}
        </p>
        <Meta>{dateFormat.format(message.createdAt)}</Meta>
      </div>
      <p className={styles.messageBody}>{message.body}</p>
      <div className={styles.rowActions}>
        <form action={toggleMessageRead.bind(null, message.id)}>
          <button type="submit" className={styles.textButton}>
            {message.read ? 'Mark unread' : 'Mark read'}
          </button>
        </form>
        <form action={deleteMessage.bind(null, message.id)}>
          <ConfirmButton question="Delete this message? This can't be undone.">
            Delete
          </ConfirmButton>
        </form>
      </div>
    </article>
  )
}
