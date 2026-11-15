'use server'

import { randomUUID } from 'node:crypto'

import { put } from '@vercel/blob'
import sharp from 'sharp'

import { requireAdmin } from '@/lib/guard'

export type UploadResult = { url: string } | { error: string }

const MAX_BYTES = 3.5 * 1024 * 1024

type Detected = { ext: string; contentType: string }

/** Identifies a file from its bytes. The browser's name and type are not trusted. */
function detect(bytes: Uint8Array): Detected | null {
  const hex = (start: number, end: number) =>
    Buffer.from(bytes.subarray(start, end)).toString('hex')
  const ascii = (start: number, end: number) =>
    Buffer.from(bytes.subarray(start, end)).toString('latin1')

  if (hex(0, 3) === 'ffd8ff') return { ext: 'jpg', contentType: 'image/jpeg' }
  if (hex(0, 8) === '89504e470d0a1a0a') return { ext: 'png', contentType: 'image/png' }
  if (ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP') {
    return { ext: 'webp', contentType: 'image/webp' }
  }
  if (ascii(0, 5) === '%PDF-') return { ext: 'pdf', contentType: 'application/pdf' }
  return null
}

export async function uploadFile(
  kind: 'image' | 'pdf',
  formData: FormData,
): Promise<UploadResult> {
  await requireAdmin()

  const file = formData.get('file')
  if (!(file instanceof File) || file.size === 0) return { error: 'Choose a file first.' }
  if (file.size > MAX_BYTES) return { error: 'Choose a file under 3.5 MB.' }

  const bytes = new Uint8Array(await file.arrayBuffer())
  const detected = detect(bytes)
  const allowed = kind === 'pdf' ? detected?.ext === 'pdf' : detected?.ext !== 'pdf'

  if (!detected || !allowed) {
    return {
      error: kind === 'pdf' ? 'Choose a PDF file.' : 'Choose a JPEG, PNG or WebP image.',
    }
  }

  try {
    const blob = await put(
      `uploads/${randomUUID()}.${detected.ext}`,
      Buffer.from(bytes),
      {
        access: 'public',
        contentType: detected.contentType,
      },
    )
    return { url: blob.url }
  } catch (error) {
    console.error('Upload failed', error)
    return { error: 'The upload failed. Try again.' }
  }
}

export type DesignUploadResult =
  { url: string; width: number; height: number } | { error: string }

/** Uploads a design image and reads its pixel size, so the gallery keeps its proportions. */
export async function uploadDesignImage(formData: FormData): Promise<DesignUploadResult> {
  const uploaded = await uploadFile('image', formData)
  if ('error' in uploaded) return uploaded

  try {
    const file = formData.get('file') as File
    const { width, height, pages } = await sharp(await file.arrayBuffer()).metadata()
    // Animated WebP reports every frame stacked, so take one frame's height.
    const frameHeight = height && pages ? Math.round(height / pages) : height
    if (!width || !frameHeight) throw new Error('No dimensions')
    return { url: uploaded.url, width, height: frameHeight }
  } catch (error) {
    console.error('Reading image size failed', error)
    return { error: 'That image could not be read. Try another file.' }
  }
}
