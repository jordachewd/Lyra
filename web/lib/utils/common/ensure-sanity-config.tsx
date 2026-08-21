export const ensureSanityConfig = (value: string | undefined, name: string): string => {
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Missing required Sanity config: ${name}`)
  }
  return value
}
