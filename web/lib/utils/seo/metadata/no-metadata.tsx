import type {SiteMetadata} from '@/lib/types/metadata-site'
import type {Metadata} from 'next'
import {getSiteMeta} from './site-metadata'
import {noIndexRobots} from '../const/robots'

type NoMetadataArgs = {
  title?: string
  noIndex?: boolean
}

export async function arrNoMetadata(args: NoMetadataArgs = {}): Promise<Metadata> {
  const meta = (await getSiteMeta()) as SiteMetadata

  const baseUrl = meta.siteUrl!
  const title = args.title ?? meta.siteTitle
  const noIndex = args.noIndex ?? false

  const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: {default: title, template: `%s · Arratech AB`},
    description: undefined,
    applicationName: undefined,
    authors: undefined,
    generator: undefined,
    keywords: undefined,
    creator: undefined,
    publisher: undefined,
    robots: noIndex ? noIndexRobots : undefined,
    alternates: undefined,
    icons: undefined,
    manifest: undefined,
    openGraph: undefined,
    twitter: undefined,
    verification: undefined,
    formatDetection: undefined,
    category: undefined,
    classification: undefined,
    other: {
      'geo.region': '',
      'geo.placename': '',
      'geo.position': '',
      ICBM: '',
    },
  }

  return metadata
}
