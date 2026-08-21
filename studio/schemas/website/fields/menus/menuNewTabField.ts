import {defineField} from 'sanity'
import {LinkParent} from '../../types/linkParentType'

export const menuNewTabField = defineField({
  name: 'newTab',
  type: 'boolean',
  title: 'Open in new tab',
  description: 'Should this link open in a new tab?',
  initialValue: false,
  hidden: ({parent}: {parent?: LinkParent}) => parent?.linkType === 'none',
})
