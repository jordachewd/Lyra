import {defineField, FileValue} from 'sanity'
import {LinkParent} from '../../types/linkParentType'

export const menuFileField = defineField({
  name: 'file',
  title: 'File Upload',
  type: 'file',
  description: 'Upload a file (PDF, DOCX, etc.) to link to',
  hidden: ({parent}: {parent?: LinkParent}) => parent?.linkType !== 'file',
  options: {
    storeOriginalFilename: true,
    accept: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.rar',
  },
  validation: (Rule) =>
    Rule.custom((val: FileValue | undefined, ctx) => {
      const linkType = (ctx.parent as LinkParent | undefined)?.linkType
      // Only validate when linkType is 'file'
      if (linkType !== 'file') return true

      // Check if file asset is provided
      if (!val || !val.asset || !val.asset._ref) {
        return 'Please upload a file'
      }

      return true
    }),
})
