export function toRecaptchaAction(raw: string): string {
  let s = raw.trim()
  s = s.toLowerCase()
  s = s.replace(/[^a-z0-9/_]/g, '_')

  if (!s) return 'form_submit'

  return s.slice(0, 100)
}
