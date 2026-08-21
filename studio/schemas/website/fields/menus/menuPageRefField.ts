import {defineField} from 'sanity'
import {LinkParent} from '../../types/linkParentType'

export const menuPageRefField = defineField({
  name: 'pageRef',
  type: 'reference',
  title: 'Link to Page or Post',
  description: 'Select a page or post to link to',
  to: [{type: 'page'}, {type: 'post'}],
  options: {disableNew: true, filter: '!defined(archivedAt) && !(_id in path("drafts.**"))'},
  hidden: ({parent}: {parent?: LinkParent}) => parent?.linkType !== 'internal',
  validation: (Rule) =>
    Rule.custom((val, ctx) => {
      const linkType = (ctx.parent as LinkParent | undefined)?.linkType
      return linkType === 'internal' ? !!val || 'Pick a page' : true
    }),
})
