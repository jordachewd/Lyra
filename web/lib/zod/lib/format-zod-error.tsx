export function formatZodError(err: unknown): string {
  const e = err as {
    issues?: {path: (string | number)[]; message: string}[]
  }

  if (!e?.issues?.length) return String(err)
  const first = e.issues[0]
  const loc = first.path.length ? ` @ ${first.path.join('.')}` : ''

  return (
    `Validation failed${loc}: ` +
    e.issues.map((i) => `${i.path.join('.') || '(root)'}: ${i.message}`).join(' | ')
  )
}
