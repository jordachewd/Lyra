import type {DocumentActionComponent, DocumentActionsResolver} from 'sanity'
import {wrapDeleteOrUnpublish} from './protect-core-pages'
import {singletonTypes} from '../consts/config/singleton-types'
import {singletonAllowed} from '../consts/config/singleton-allowed'
import {ArchiveAction, UnarchiveAction} from './archive.actions'

export const documentActions: DocumentActionsResolver = (prev, ctx) => {
  if (singletonTypes.has(ctx.schemaType)) {
    return prev.filter((A: DocumentActionComponent) => {
      const name = A?.action as string | undefined
      return !!name && singletonAllowed.has(name)
    })
  }

  if (ctx.schemaType === 'page' || ctx.schemaType === 'post' || ctx.schemaType === 'webinarPage') {
    const next = prev.map((A: DocumentActionComponent) => {
      const name = A?.action as string | undefined

      if (name === 'delete' || name === 'archive' || name === 'unpublish')
        return wrapDeleteOrUnpublish(A)
      return A
    })

    const protectedArchive = wrapDeleteOrUnpublish(ArchiveAction)
    return [...next, protectedArchive, UnarchiveAction]
  }

  return prev
}
