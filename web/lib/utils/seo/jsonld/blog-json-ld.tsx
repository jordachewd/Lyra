import type {SiteMetadata} from '@/lib/types/metadata-site'
import type {PageSeoInput, BreadcrumbItemInput, JsonLd} from '@/lib/types/seo'
import {buildBreadcrumbJsonLd} from './breadcrumb-json-ld'

export function buildBlogPageJsonLd(
  page: PageSeoInput,
  ctx: SiteMetadata,
  breadcrumbs: BreadcrumbItemInput[],
): JsonLd {
  const collection: JsonLd = {
    '@type': 'Blog',
    '@id': `${page.url}#blog`,
    url: page.url,
    name: page.title,
    description: page.description,
    inLanguage: 'en',
    isPartOf: {
      '@id': ctx.websiteId,
    },
    about: {
      '@id': ctx.orgId,
    },
  }

  const breadcrumb = buildBreadcrumbJsonLd(page.url, breadcrumbs)

  return {
    '@context': 'https://schema.org',
    '@graph': [collection, breadcrumb],
  }
}
