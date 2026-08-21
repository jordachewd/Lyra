import {ValidationContext} from 'sanity'
import {ptMaxCharsValidator} from './pt-max-chars-validator'
import {fetchReadingSettings} from './reading-settings'
import {STUDIO_API_VERSION} from '../consts/config/studio-api-version'

export async function validateExcerptLength(value: unknown[] | undefined, ctx: ValidationContext) {
  const client = ctx.getClient({apiVersion: STUDIO_API_VERSION})
  const rs = await fetchReadingSettings(client)
  const max = Number(rs?.excerptLength) || 360

  const result = ptMaxCharsValidator(max)(value)
  if (result === true) return true

  if (typeof result === 'string') {
    return `${result} (Check Reading Settings → Excerpt Length)`
  }

  if (result && typeof result === 'object' && 'message' in result) {
    const err = result as Record<string, unknown> & {message?: unknown}
    return {...err, message: `${String(err.message ?? '')} `}
  }

  return `Content exceeds the maximum length from Reading Settings (max ${max} characters).`
}
