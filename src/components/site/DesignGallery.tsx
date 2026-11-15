'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

import { Meta } from '@/components/ui/type'

import styles from './DesignGallery.module.css'

export type DesignItem = {
  id: string
  title: string
  caption: string
  alt: string
  imageUrl: string
  width: number
  height: number
}

/** Pieces keep their own proportions, so square, wide and tall work sit side by side. */
export function DesignGallery({ items }: { items: DesignItem[] }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState<DesignItem | null>(null)

  function show(item: DesignItem) {
    setOpen(item)
    dialog.current?.showModal()
  }

  return (
    <>
      <ul className={styles.grid}>
        {items.map((item, index) => (
          <li key={item.id} className={styles.item}>
            <button
              type="button"
              className={styles.open}
              onClick={() => show(item)}
              aria-label={`View ${item.title} larger`}
            >
              <Image
                src={item.imageUrl}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw"
                priority={index < 2}
                className={styles.image}
              />
            </button>
            <Meta as="p" className={styles.title}>
              {item.title}
            </Meta>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-label={open?.title ?? 'Design'}
        onClose={() => setOpen(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close()
        }}
      >
        {open && (
          <figure className={styles.figure}>
            <Image
              src={open.imageUrl}
              alt={open.alt}
              width={open.width}
              height={open.height}
              sizes="100vw"
              className={styles.large}
            />
            <figcaption className={styles.caption}>
              <Meta as="span">{open.title}</Meta>
              {open.caption && <span>{open.caption}</span>}
            </figcaption>
          </figure>
        )}
        <button
          type="button"
          className={styles.close}
          onClick={() => dialog.current?.close()}
        >
          Close
        </button>
      </dialog>
    </>
  )
}
