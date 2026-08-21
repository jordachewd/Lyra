import type {Metadata} from 'next'
import type {NestedImageField} from '../../../images/types'
import type {MetadataArgs} from '@/lib/types/metadata-args'
import type {SiteMetadata} from '@/lib/types/metadata-site'
import {getSiteMeta} from './site-metadata'
import {toNestedImageField} from '../../../images/normalize'
import {toArray} from '@/lib/utils/common/to-array'
import {resolveOgImages} from '@/lib/utils/seo/common/og-images'

export async function lyraBuildMetadata(args: MetadataArgs = {}): Promise<Metadata> {
  const meta = (await getSiteMeta()) as SiteMetadata

  const baseUrl = meta.siteUrl!
  const title = args.title ?? meta.siteTitle
  const description = args.description ?? meta.siteDesc
  const keywords = args.keywords ?? meta.keywords

  const canonical =
    args.pathname && baseUrl
      ? new URL(args.pathname.replace(/\/+$/, ''), baseUrl).toString()
      : undefined

  const image = args.image || meta.siteImage
  const images = toArray(image).map(toNestedImageField).filter(Boolean) as NestedImageField[]

  const ogImages = resolveOgImages(baseUrl, images)

  const ogBase: NonNullable<Metadata['openGraph']> =
    args.ogType === 'article'
      ? {
          type: 'article',
          siteName: meta.siteName,
          url: canonical,
          title,
          description,
          images: ogImages,
          locale: args.locale || 'en_US',
          publishedTime: args.article?.publishedTime,
          modifiedTime: args.article?.modifiedTime,
          authors: args.article?.authors,
          section: args.article?.section,
          tags: args.article?.tags,
        }
      : {
          type: args.ogType ?? 'website',
          siteName: meta.siteName,
          url: canonical,
          title,
          description,
          images: ogImages,
          locale: args.locale || 'en_US',
        }

  const twitterBase: NonNullable<Metadata['twitter']> = {
    card: 'summary_large_image',
    title,
    description,
    images: ogImages,
    site: meta.twitter || undefined,
    creator: args.twitterCreator ?? meta.twitter,
  }

  const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    // Page-level titles arrive fully suffixed; mark them absolute so the root
    // layout's template does not append the site name a second time.
    title: args.title ? {absolute: args.title} : {default: title, template: `%s · ${meta.siteName}`},
    description,
    applicationName: meta.siteName,
    authors: [{name: meta.siteName, url: baseUrl}],
    keywords,
    creator: meta.siteName,
    publisher: meta.siteName,
    robots: args.robots ?? meta.robots,
    alternates: {
      canonical,
      languages: {
        'en-US': baseUrl,
      },
    },
    // No `icons` here on purpose. Next generates the icon tags from
    // `app/favicon.ico` / `app/icon.*` / `app/apple-icon.*`, so dropping brand
    // files into `app/` is all that is needed — no config to keep in sync.
    manifest: '/manifest.webmanifest',
    openGraph: ogBase,
    twitter: twitterBase,
    verification: meta.verification,
    formatDetection: {email: false, address: false, telephone: false},
    category: meta.category,
    classification: meta.classification,
    other: {
      'geo.region': 'SE',
      'geo.placename': 'Stockholm',
      'geo.position': '59.3293;18.0686',
      ICBM: '59.3293, 18.0686',
    },
  }

  return metadata
}
