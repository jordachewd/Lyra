import type {BreadcrumbItemInput, JsonLd} from '@/lib/types/seo'

export function buildBreadcrumbJsonLd(
  currentPageUrl: string,
  items: BreadcrumbItemInput[],
): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${currentPageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
