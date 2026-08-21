export function stringToSlug(str: string): string {
  let s = str
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')

  if (!s) s = 'id'
  if (/^[^a-z]/.test(s)) s = `id-${s}`
  return s
}
