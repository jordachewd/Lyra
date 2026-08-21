import {isStaging, isProduction, siteUrl as defaultUrl} from '@/lib/const/env'
import {getGlobals} from '@/lib/data/globals'
import {urlFor} from '@/lib/utils/sanity/image'
import type {GeneralSettings} from '@/lib/zod/website/settings/general'
import type {SeoSettings} from '@/lib/zod/website/settings/seo'
import type {SiteMetadata} from '@/lib/types/metadata-site'
import {noIndexRobots, indexRobots} from '../const/robots'
import {SEO_DEFAULTS} from '../const/defaults'
import type {AnyImageField} from '@/lib/images/types'

export async function getSiteMeta(): Promise<SiteMetadata> {
  const globals = await getGlobals()
  const gen = globals?.settings?.general as GeneralSettings | null
  const seo = globals?.settings?.seo as SeoSettings | null

  // From General Settings + defaults
  const siteName = gen?.siteName ?? SEO_DEFAULTS.name
  const siteTitle = gen?.siteTitle ?? SEO_DEFAULTS.title
  const siteDesc = gen?.siteDescription ?? SEO_DEFAULTS.description

  const siteImage = gen?.siteImage?.image as AnyImageField | undefined
  const siteImgUrl = siteImage ? urlFor(siteImage).url() : SEO_DEFAULTS.orgImage

  const siteUrl = (gen?.siteUrl ?? defaultUrl).replace(/\/+$/, '')
  const siteEmail = gen?.siteEmail ?? SEO_DEFAULTS.email

  // From SEO Settings + defaults
  const category = seo?.category ?? SEO_DEFAULTS.category
  const classification = seo?.classification ?? SEO_DEFAULTS.classification

  const siteKeyds = seo?.keywords !== undefined && seo?.keywords !== ''
  const keywords = siteKeyds
    ? seo?.keywords?.split(/[,\n\r]+/).join(', ')
    : SEO_DEFAULTS.keywords?.join(', ')

  const twitter = seo?.twitterHandle ?? undefined
  const linkedin = seo?.linkedinHandle ?? undefined

  const robots = isStaging ? noIndexRobots : indexRobots
  const gSiteVf = seo?.gSiteVerification ?? undefined
  const verification = {
    google: isProduction && gSiteVf ? gSiteVf : undefined,
  }

  const orgId = `${siteUrl}#organization`
  const websiteId = `${siteUrl}#website`

  return {
    siteName,
    siteTitle,
    siteDesc,
    siteImage,
    siteUrl,
    siteImgUrl,
    siteEmail,
    orgId,
    websiteId,
    category,
    classification,
    keywords,
    twitter,
    linkedin,
    robots,
    verification,
  }
}
