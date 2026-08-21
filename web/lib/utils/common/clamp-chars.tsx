export function clampChars(s: string, max = 160): string {
  if (s.length <= max) return s

  const cut = s.slice(0, max)
  const pivot = Math.max(cut.lastIndexOf('.'), cut.lastIndexOf(' '), 120)
  return cut.slice(0, pivot).trim() + '…'
}
