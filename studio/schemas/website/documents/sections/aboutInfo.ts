import {defineType, defineField, defineArrayMember} from 'sanity'
import {cmmSectionName} from '../../fields/common/cmmSectionName'
import {cmmSectionTitle} from '../../fields/common/cmmSectionTitle'
import {cmmSectionDescription} from '../../fields/common/cmmSectionDesc'

export const aboutInfoType = defineType({
  name: 'aboutInfoType',
  type: 'document',
  title: 'About Info',
  description: 'Section to display information about the company with collapsible cards',
  fields: [
    cmmSectionName,
    cmmSectionTitle,
    cmmSectionDescription,

    defineField({
      name: 'buttons',
      type: 'array',
      title: 'CTA Buttons',
      description: 'Add, remove, and reorder call to action buttons in the section',
      of: [{type: 'ctaButton'}],
      validation: (r) => r.max(2).error('Maximum of 2 buttons allowed'),
    }),

    defineField({
      name: 'collapsibles',
      type: 'array',
      title: 'Collapsible Cards',
      description: 'Add up to 6 cards to display',
      of: [defineArrayMember({type: 'aboutInfoCard'})],
      validation: (r) => r.max(6),
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
    select: {name: 'sectionName', title: 'title', media: 'collapsibles.0.icon.image'},
    prepare({name, title, media}) {
      return {title, subtitle: `About Info · ${name}`, media}
    },
  },
})
