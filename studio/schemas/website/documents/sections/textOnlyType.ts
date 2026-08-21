import {defineType, defineField} from 'sanity'
import {cmmSectionName} from '../../fields/common/cmmSectionName'
import {cmmSectionTitle} from '../../fields/common/cmmSectionTitle'

export const textOnlyType = defineType({
  name: 'textOnlyType',
  type: 'document',
  title: 'Text Only',
  description: 'Section with text content only',
  fields: [
    cmmSectionName,

    defineField({
      name: 'aboveTitle',
      type: 'string',
      title: 'Above Title (optional)',
      description: 'Text to appear above the title',
    }),

    cmmSectionTitle,

    defineField({
      name: 'belowTitle',
      type: 'string',
      title: 'Below Title (optional)',
      description: 'Text to appear below the headline',
    }),

    defineField({
      name: 'content',
      type: 'blockContentMaxi',
      title: 'Content',
      description: 'Main text content for the section',
    }),

    defineField({
      name: 'titleDesc',
      type: 'cmmTtlDescSettings',
      title: 'Title & Description',
      description: 'Settings for the title and description display',
    }),

    defineField({
      name: 'layout',
      type: 'cmmLySettings',
      title: 'Layout',
      description: 'Settings for the layout display',
    }),

    defineField({
      name: 'background',
      type: 'cmmBgSettings',
      title: 'Background',
      description: 'Settings for the background display',
    }),
  ],
  preview: {
    select: {title: 'title', name: 'sectionName'},
    prepare({title, name}) {
      return {title, subtitle: `Text Only · ${name}`}
    },
  },
})
