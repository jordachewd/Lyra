import type {SanityClient} from 'sanity'
import {STUDIO_API_VERSION} from '../consts/config/studio-api-version'

const READING_QUERY = `*[_id=="readingSettings"][0].blogSettings{ excerptLength, perPage }`

type ReadingSettings = {
  perPage?: number
  excerptLength?: number
}

let cache: {data?: ReadingSettings; ts: number} = {ts: 0}

export async function fetchReadingSettings(client: SanityClient): Promise<ReadingSettings> {
  const now = Date.now()
  if (cache.data && now - cache.ts < 1000) return cache.data
  const data = (await client.fetch(READING_QUERY)) || {}
  cache = {data, ts: now}
  return data
}

export function maxFromReadingSettings(key: 'perPage' | 'excerptLength', fallback: number) {
  return async (value: unknown, ctx: any) => {
    if (value == null) return true
    if (typeof value !== 'number' || Number.isNaN(value)) return 'Provide a number'

    const client: SanityClient = ctx.getClient({apiVersion: STUDIO_API_VERSION})
    const rs = await fetchReadingSettings(client)
    const max = Number(rs?.[key]) || fallback

    if (value < 1) return 'Must be at least 1'
    if (value > max) return `Must be ≤ ${max} (from Reading Settings → ${key})`
    return true
  }
}
