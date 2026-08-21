type MenuLinkType = 'internal' | 'custom' | 'none'

export function menuLinkType(linkType: MenuLinkType): string {
  const linkTypeTitles: Record<string, string> = {
    internal: 'Internal Page',
    custom: 'Custom Link',
    none: 'No Link',
  }

  return linkTypeTitles[linkType] || 'Unknown Link Type'
}
