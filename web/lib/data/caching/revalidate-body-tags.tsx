import {GLOBAL_DOC_TYPES_SET, type GLOBAL_DOC_TYPES} from '@/lib/const/revalidate/global-docs'
import {SECTION_DOC_TYPES_SET, type SECTION_DOC_TYPES} from '@/lib/const/revalidate/section-docs'

import {RevalidateBody} from '@/lib/zod/lib/revalidate'
import {getHomeSlug} from '../utils/get-home-slug'

const pathFor = async (tag: string, slug?: string | null) => {
  if (!slug) return null
  if (tag === 'page') {
    const homeslug = await getHomeSlug()
    return slug === homeslug ? '/' : `/${slug}`
  }
  if (tag === 'post') return `/blog/${slug}`
  return null
}

type RevalidateBodyTagsResp = {
  tags: string[]
  paths: string[]
}

export async function revalidateBodyTags(doc: RevalidateBody): Promise<RevalidateBodyTagsResp> {
  const {_type, slug} = doc
  const tags = new Set<string>()
  const paths = new Set<string>()

  const isGlobalType = GLOBAL_DOC_TYPES_SET.has(_type as (typeof GLOBAL_DOC_TYPES)[number])
  const isSectionType = SECTION_DOC_TYPES_SET.has(_type as (typeof SECTION_DOC_TYPES)[number])

  // Globals (Site Header/Footer, Settings)
  if (isGlobalType) {
    tags.add('site:globals')
  }

  // Pages
  if (_type === 'page') {
    if (slug) {
      tags.add(`page:${slug}`)
    } else {
      tags.add('page:list')
    }
    const p = await pathFor('page', slug ?? undefined)
    if (p) paths.add(p)
  }

  // Posts
  if (_type === 'post') {
    if (slug) {
      tags.add(`post:${slug}`)
    } else {
      tags.add('post:list')
    }
    const p = await pathFor('post', slug ?? undefined)
    if (p) paths.add(p)
  }

  // Sections
  if (isSectionType) {
    tags.add('page:list')
    tags.add('post:list')
  }

  return {tags: Array.from(tags), paths: Array.from(paths)}
}
