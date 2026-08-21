import {defineType, defineField} from 'sanity'
import {cmmSectionName} from '../../fields/common/cmmSectionName'
import {cmmSectionTitle} from '../../fields/common/cmmSectionTitle'
import {cmmSectionDescription} from '../../fields/common/cmmSectionDesc'

export const tableType = defineType({
  name: 'tableType',
  type: 'document',
  title: 'Table',
  fields: [
    cmmSectionName,

    defineField({
      name: 'aboveEyebrow',
      type: 'string',
      title: 'Above Eyebrow (optional)',
      description: 'Text to appear above the title',
    }),

    cmmSectionTitle,

    defineField({
      name: 'belowEyebrow',
      type: 'string',
      title: 'Below Eyebrow (optional)',
      description: 'Text to appear below the title',
    }),

    cmmSectionDescription,

    defineField({
      name: 'table',
      type: 'table',
      title: 'Table Content',
      description: 'Create and edit the table content',
      validation: (r) => r.required(),
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
      return {title, subtitle: `Table · ${name}`}
    },
  },
})
