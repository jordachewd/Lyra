import {SiteMetadata} from '@/lib/types/metadata-site'
import {PageSeoInput, BreadcrumbItemInput, JsonLd} from '@/lib/types/seo'
import {buildBreadcrumbJsonLd} from './breadcrumb-json-ld'

export function buildPageJsonLd(
  page: PageSeoInput,
  ctx: SiteMetadata,
  options?: {
    pageType?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'FAQPage'
    breadcrumbs?: BreadcrumbItemInput[]
  },
): JsonLd {
  const webPage: JsonLd = {
    '@type': options?.pageType ?? 'WebPage',
    '@id': `${page.url}#webpage`,
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
    primaryImageOfPage: page.imageUrl
      ? {
          '@type': 'ImageObject',
          url: page.imageUrl,
        }
      : undefined,
  }

  const graph: JsonLd[] = [webPage]

  if (options?.breadcrumbs && options.breadcrumbs.length > 0) {
    graph.push(buildBreadcrumbJsonLd(page.url, options.breadcrumbs))
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}
