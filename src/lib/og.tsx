import { ImageResponse } from 'next/og'

import { SITE_NAME } from '@/lib/content'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

/** ImageResponse needs plain values: CSS variables don't exist here. Colours match tokens.css. */
export function renderOgImage(title: string) {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        backgroundColor: '#16100c',
        color: '#e5d8c6',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: title.length > 40 ? 76 : 112,
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          textShadow: '3px 2px 0 #d5af41',
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex', fontSize: 34, color: '#d5af41' }}>{SITE_NAME}</div>
    </div>,
    OG_SIZE,
  )
}
