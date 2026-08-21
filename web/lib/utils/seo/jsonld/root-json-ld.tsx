import {SiteMetadata} from '@/lib/types/metadata-site'
import type {JsonLd} from '@/lib/types/seo'

export function buildRootLayoutJsonLd(ctx: SiteMetadata): JsonLd {
  const organization: JsonLd = {
    '@type': 'Organization',
    '@id': ctx.orgId,
    name: ctx.siteName,
    url: ctx.siteUrl,
    description: ctx.siteDesc,
    logo: ctx.siteImgUrl ? {'@type': 'ImageObject', url: ctx.siteImgUrl} : undefined,
    image: ctx.siteImgUrl,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'SE',
      addressLocality: 'Stockholm',
      addressRegion: 'Stockholm',
      postalCode: '111 51',
      streetAddress: 'Drottninggatan 33',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: ctx.siteEmail,
    },
    sameAs: ctx.linkedin ? [ctx.linkedin] : undefined,
  }

  const website: JsonLd = {
    '@type': 'WebSite',
    '@id': ctx.websiteId,
    url: ctx.siteUrl,
    name: ctx.siteName,
    description: ctx.siteDesc,
    publisher: {
      '@id': ctx.orgId,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${ctx.siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, website],
  }
}
