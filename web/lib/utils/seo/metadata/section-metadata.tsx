import {AnyImageField} from '@/lib/images/types'
import {clampChars} from '@/lib/utils/common/clamp-chars'
import {ptToPlainText} from '@/lib/utils/common/pt-to-plain-text'
import {getOgImage} from '@/lib/utils/seo/common/get-og-image'
import {SectionOf} from '@/lib/zod/website/content/page'
import {Section} from '@/lib/zod/website/layout/sections'

type CandidatesResult = {
  title: string | undefined
  description: string | undefined
}

type getMetaParams = {
  sections: Section[]
}

type getMetaResult = {
  title?: string
  description?: string
  image?: AnyImageField
}

function getCandidates(sections: Section[]): CandidatesResult {
  const hero = sections.find((s) => s.kind === 'hero') as SectionOf<'hero'>
  const textOnly = sections.find((s) => s.kind === 'text') as SectionOf<'text'>

  const textImage = sections.find((s) => s.kind === 'textImage') as SectionOf<'textImage'>

  const accordion = sections.find((s) => s.kind === 'accordion') as SectionOf<'accordion'>

  const title: string[] = [hero?.title, textOnly?.title, textImage?.title, accordion?.title].filter(
    Boolean,
  )

  const description: string[] = [
    ptToPlainText(hero?.subheadline),
    ptToPlainText(textImage?.description),
    ptToPlainText(textOnly?.content),
    ptToPlainText(accordion?.items?.[0]?.description),
  ].filter(Boolean)

  return {
    title: title.length ? clampChars(title[0], 60) : undefined,
    description: description.length ? clampChars(description[0], 160) : undefined,
  }
}

export function getSectionMetadata({sections}: getMetaParams): getMetaResult {
  const candidates = getCandidates(sections) as CandidatesResult

  const title = candidates.title
  const description = candidates.description
  const image = getOgImage(sections)

  const meta = {
    title,
    description,
    image,
  }

  return meta
}
