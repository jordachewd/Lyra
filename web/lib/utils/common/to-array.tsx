export function toArray<T>(v?: T | T[] | null): T[] {
  if (!v) return []
  return Array.isArray(v) ? v : [v]
}
