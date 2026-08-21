import type {SiteMetadata} from '@/lib/types/metadata-site'
import type {BlogPostSeoInput, BreadcrumbItemInput, JsonLd} from '@/lib/types/seo'
import {buildBreadcrumbJsonLd} from './breadcrumb-json-ld'

export function buildBlogPostJsonLd(
  post: BlogPostSeoInput,
  ctx: SiteMetadata,
  breadcrumbs: BreadcrumbItemInput[],
): JsonLd {
  const article: JsonLd = {
    '@type': 'BlogPosting',
    '@id': `${post.url}#article`,
    headline: post.title,
    description: post.description,
    url: post.url,
    mainEntityOfPage: post.url,
    image: post.imageUrl ? [post.imageUrl] : undefined,
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    author: post.authorNames.map((name) => ({
      '@type': 'Person',
      name,
    })),
    publisher: {
      '@id': ctx.orgId,
    },
    inLanguage: 'en',
    keywords: post.tags && post.tags.length > 0 ? post.tags : undefined,
  }

  const breadcrumb = buildBreadcrumbJsonLd(post.url, breadcrumbs)

  return {
    '@context': 'https://schema.org',
    '@graph': [article, breadcrumb],
  }
}
