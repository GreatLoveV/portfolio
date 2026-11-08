import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/neon-http'

import { seed } from './seed'

async function main() {
  config({ path: '.env.local' })

  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is not set. Add it to .env.local first.')

  await seed(drizzle({ client: neon(url) }))
  console.log('Seed complete.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
