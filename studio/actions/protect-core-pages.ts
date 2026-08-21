import type {
  DocumentActionComponent,
  DocumentActionDescription,
  DocumentActionProps,
  SanityDocument,
} from 'sanity'
import {PROTECTED_PAGE_SLUGS} from '../consts/config/protected-page-slugs'

type MaybeWithSlug = Partial<SanityDocument> & {
  slug?: {current?: string | null}
}

const getSlug = (doc: unknown) => {
  const s = (doc as MaybeWithSlug | undefined)?.slug?.current
  return typeof s === 'string' ? s.toLowerCase().trim() : undefined
}

export function wrapDeleteOrUnpublish(original: DocumentActionComponent): DocumentActionComponent {
  return (props: DocumentActionProps): DocumentActionDescription | null => {
    const desc = original(props)
    if (!desc) return desc

    const doc = (props.draft ?? props.published) as MaybeWithSlug | undefined
    const slug = getSlug(doc)
    const isProtected = props.type === 'page' && !!slug && PROTECTED_PAGE_SLUGS.has(slug)

    if (isProtected) {
      return {
        ...desc,
        disabled: true, // or hidden: true
        title: 'Core pages (home, blog) cannot be deleted, unpublished, or archived.',
      }
    }

    return desc
  }
}
