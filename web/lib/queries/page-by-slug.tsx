import groq from 'groq'
import {SECTIONS_PROJECTION} from './fragments/sections.groq'
import {SEO_META_PROJECTION} from './fragments/seo-meta.groq'
import {PAGE_SETTINGS_QUERY} from './fragments/settings/page.groq'

export const PAGE_BY_SLUG_QUERY = groq`*[_type=="page" && slug.current==$slug && !defined(archivedAt)][0]{
  _id,
  _type,
  "slug": slug.current,
  title,
  "description": coalesce(description, []),
  "sections": ${SECTIONS_PROJECTION},
  "settings": ${PAGE_SETTINGS_QUERY},
  "seoMeta": ${SEO_META_PROJECTION}
}`
