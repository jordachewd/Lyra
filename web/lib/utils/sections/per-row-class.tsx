export function perRowToClass(perRow: number): string {
  switch (perRow) {
    case 2:
      return 'twoPerRow'
    case 3:
      return 'threePerRow'
    case 4:
      return 'fourPerRow'
    default:
      return 'onePerRow'
  }
}
