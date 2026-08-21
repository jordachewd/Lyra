type SlugClassOptions = {
  blogBase?: string
  pagePrefix?: string
  postPrefix?: string
}

const normClass = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export function getBodyClasses(
  pathname: string,
  {blogBase = 'blog', pagePrefix = 'page', postPrefix = 'post'}: SlugClassOptions = {},
): string {
  const pathOnly = (pathname || '/').split(/[?#]/, 1)[0] || '/'
  const segs = pathOnly.split('/').filter(Boolean)

  if (segs.length === 0) return `${pagePrefix} homepage`

  if (segs[0].toLowerCase() === blogBase.toLowerCase() && segs.length >= 2) {
    const postSlug = normClass(segs[1]) || 'post'
    return `${postPrefix} ${postSlug}`
  }

  const last = normClass(segs[segs.length - 1]) || 'page'
  return `${pagePrefix} ${last}`
}
