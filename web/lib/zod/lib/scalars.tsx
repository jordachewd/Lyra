import {z} from 'zod'

export const HrefSchema = z
  .string()
  .nullable()
  .transform((v) => {
    if (v == null) return null
    const s = v.trim()
    if (!s) return null
    if (s.startsWith('/')) return s
    if (/^mailto:/i.test(s)) return s
    if (/^https?:\/\//i.test(s)) return s
    if (/^[\w.-]+\.[a-z]{2,}([/:].*)?$/i.test(s)) return `https://${s}`
    return s
  })
