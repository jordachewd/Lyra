import {AnyImageField} from '@/lib/images/types'

export type SiteMetadata = {
  siteName: string
  siteTitle: string
  siteDesc?: string
  siteImage?: AnyImageField
  siteImgUrl?: string
  siteUrl: string
  orgId: string
  websiteId: string
  siteEmail?: string
  category?: string
  classification?: string
  keywords?: string | string[]
  twitter?: string
  linkedin?: string
  robots?: NonNullable<import('next').Metadata['robots']>
  verification?: {
    google?: string
  }
}
