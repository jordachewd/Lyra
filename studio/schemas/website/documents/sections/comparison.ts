import {defineType, defineField} from 'sanity'
import {cmmSectionName} from '../../fields/common/cmmSectionName'
import {cmmSectionTitle} from '../../fields/common/cmmSectionTitle'
import {cmmSectionDescription} from '../../fields/common/cmmSectionDesc'

export const comparisonType = defineType({
  name: 'comparisonType',
  type: 'document',
  title: 'Comparison',
  description: 'Section to compare multiple items side by side',
  fields: [
    cmmSectionName,
    cmmSectionTitle,
    cmmSectionDescription,

    defineField({
      name: 'steps',
      type: 'array',
      title: 'Comparison Items',
      description: 'Add up to 12 comparison items to display side by side',
      of: [{type: 'comparisonItem'}],
      validation: (r) => r.max(12).error('Maximum of 12 items allowed'),
    }),

    defineField({
      name: 'buttons',
      type: 'array',
      title: 'CTA Buttons',
      description: 'Add up to 2 call-to-action buttons',
      of: [{type: 'ctaButton'}],
      validation: (r) => r.max(2).error('Maximum of 2 buttons allowed'),
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
      title: 'Section Layout',
      description: 'Settings for the section layout',
    }),

    defineField({
      name: 'background',
      type: 'cmmBgSettings',
      title: 'Section Background',
      description: 'Settings for the section background',
    }),
  ],
  preview: {
    select: {title: 'title', name: 'sectionName'},
    prepare({title, name}) {
      return {title, subtitle: `Comparison · ${name}`}
    },
  },
})
