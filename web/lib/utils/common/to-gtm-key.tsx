type GtmKeyOptions = {
  maxLen?: number
  fallback?: string
}

function toGtmKey(input: string, opts: GtmKeyOptions = {}): string {
  const {maxLen = 64, fallback = 'unknown'} = opts
  if (!input || typeof input !== 'string') return fallback

  let s = input.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  s = s.toLowerCase()
  s = s.replace(/[^a-z0-9]+/g, '_')
  s = s.replace(/_+/g, '_')
  s = s.replace(/^_+|_+$/g, '')

  if (s.length > maxLen) s = s.slice(0, maxLen).replace(/_+$/g, '')
  return s || fallback
}

export const toGtmCtaName = (s: string) => toGtmKey(s, {maxLen: 64, fallback: 'cta'})

export const toGtmLocation = (s: string) => toGtmKey(s, {maxLen: 64, fallback: 'location'})
