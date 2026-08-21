import {defineType, defineField} from 'sanity'
import {cmmSectionName} from '../../fields/common/cmmSectionName'
import {cmmSectionTitle} from '../../fields/common/cmmSectionTitle'
import {cmmSectionDescription} from '../../fields/common/cmmSectionDesc'

export const stepperType = defineType({
  name: 'stepperType',
  type: 'document',
  title: 'Stepper Section',
  description: 'Section with steps to illustrate a process or workflow',
  fields: [
    cmmSectionName,

    defineField({
      name: 'eyebrow',
      type: 'string',
      title: 'Eyebrow (optional)',
      description: 'Text to appear above the title',
    }),

    cmmSectionTitle,
    cmmSectionDescription,

    defineField({
      name: 'steps',
      type: 'array',
      title: 'Steps',
      description: 'Add up to 10 steps to illustrate the process',
      of: [{type: 'stepperItem'}],
      validation: (r) => r.max(10).error('Maximum of 10 steps allowed'),
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
      name: 'disclaimer',
      type: 'string',
      title: 'Disclaimer (optional)',
      description: 'Text to appear at the bottom of the section.',
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
      return {title, subtitle: `Stepper · ${name}`}
    },
  },
})
