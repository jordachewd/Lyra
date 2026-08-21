import {ColorFormat, SanityColor} from '@/lib/types/color-format'

export function toCssColor(
  color?: SanityColor | null,
  format: ColorFormat = 'hex',
): string | undefined {
  if (!color) return undefined

  if (format === 'hex') {
    if (color.hex) {
      if (typeof color.alpha === 'number' && color.alpha >= 0 && color.alpha < 1) {
        const alpha255 = Math.round(color.alpha * 255)
        const hexA = alpha255.toString(16).padStart(2, '0')

        const hex6 = color.hex.replace('#', '').padStart(6, '0').slice(0, 6)
        return `#${hex6}${hexA}`
      }
      return color.hex
    }
  }

  if (format === 'rgba') {
    if (
      color.rgb &&
      typeof color.rgb.r === 'number' &&
      typeof color.rgb.g === 'number' &&
      typeof color.rgb.b === 'number'
    ) {
      const a =
        typeof color.rgb.a === 'number'
          ? color.rgb.a
          : typeof color.alpha === 'number'
            ? color.alpha
            : 1
      return `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${a})`
    }
  }

  return undefined
}
