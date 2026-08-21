import {AnyImageField} from '@/lib/images/types'
import {Metadata} from 'next'

export type MetadataArgs = {
  pathname?: string
  title?: string
  description?: string | null
  keywords?: string | string[]
  image?: AnyImageField | AnyImageField[] | null
  imageUrl?: string | string[] | null
  imageAlt?: string | null
  robots?: Metadata['robots']
  ogType?: 'website' | 'article' | 'profile'
  locale?: string
  localeAlternate?: string[]
  article?: {
    publishedTime?: string
    modifiedTime?: string
    authors?: string[]
    section?: string
    tags?: string[]
  }
  twitterCreator?: string
}
