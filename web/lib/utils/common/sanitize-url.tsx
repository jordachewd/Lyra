export function sanitizeAbsoluteUrl(url: string | undefined, base?: string): string | undefined {
  if (!url) return undefined
  try {
    const u = new URL(url, base)
    return u.toString()
  } catch {
    return undefined
  }
}
