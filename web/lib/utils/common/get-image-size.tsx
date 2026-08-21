export function getImgSize(
  widthSize: 'normal' | 'medium' | 'small' | 'tiny',
  baseSize = 640,
): number {
  const medium = Math.round(baseSize * 0.75)
  const small = Math.round(baseSize * 0.5)
  const tiny = Math.round(baseSize * 0.25)

  switch (widthSize) {
    case 'medium':
      return medium
    case 'small':
      return small
    case 'tiny':
      return tiny
    default:
      return baseSize
  }
}
