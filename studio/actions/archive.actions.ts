import {useDocumentOperation, type DocumentActionComponent} from 'sanity'
import {ArchiveIcon} from '@sanity/icons/Archive'
import {UnarchiveIcon} from '@sanity/icons/Unarchive'

type MaybeArchived = {
  archivedAt?: string | null
}

function isArchived(draft?: MaybeArchived, published?: MaybeArchived): boolean {
  return Boolean(draft?.archivedAt || published?.archivedAt)
}

export const ArchiveAction: DocumentActionComponent = (props) => {
  const {patch} = useDocumentOperation(props.id, props.type)
  const alreadyArchived = isArchived(
    props.draft as MaybeArchived | undefined,
    props.published as MaybeArchived | undefined,
  )

  if (alreadyArchived) return null

  return {
    name: 'archive',
    label: 'Archive',
    title: 'Set archive flag',
    icon: ArchiveIcon,
    disabled: alreadyArchived,
    onHandle: () => {
      patch.execute([{set: {archivedAt: new Date().toISOString()}}])
      props.onComplete?.()
    },
  }
}

export const UnarchiveAction: DocumentActionComponent = (props) => {
  const {patch} = useDocumentOperation(props.id, props.type)
  const archived = isArchived(
    props.draft as MaybeArchived | undefined,
    props.published as MaybeArchived | undefined,
  )

  if (!archived) return null

  return {
    name: 'unarchive',
    label: 'Unarchive',
    title: 'Clear archive flag',
    icon: UnarchiveIcon,
    disabled: !archived,
    onHandle: () => {
      patch.execute([{unset: ['archivedAt']}])
      props.onComplete?.()
    },
  }
}
