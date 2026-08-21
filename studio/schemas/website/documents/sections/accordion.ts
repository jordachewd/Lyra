import {defineType, defineField, defineArrayMember} from 'sanity'
import {cmmSectionName} from '../../fields/common/cmmSectionName'
import {cmmSectionTitle} from '../../fields/common/cmmSectionTitle'
import {cmmSectionDescription} from '../../fields/common/cmmSectionDesc'
import {cmmSectionSubtitle} from '../../fields/common/cmmSectionSubtitle'

export const accordionType = defineType({
  name: 'accordionType',
  type: 'document',
  title: 'Accordion',
  description: 'Section displaying accordion items',
  fields: [
    cmmSectionName,

    defineField({
      name: 'eyebrow',
      type: 'string',
      title: 'Eyebrow (optional)',
      description: 'Text to appear above the headline',
    }),

    cmmSectionTitle,
    cmmSectionSubtitle,
    cmmSectionDescription,

    defineField({
      name: 'image',
      type: 'imageNoMeta',
      title: 'Image',
      description: 'Image to display in the section',
    }),

    defineField({
      name: 'items',
      title: 'Items',
      description: 'Accordion items to display',
      type: 'array',
      of: [defineArrayMember({type: 'accordionItem'})],
    }),

    defineField({
      name: 'settings',
      type: 'accordionSettings',
      title: 'Accordion Settings',
      description: 'Settings for the accordion behavior and appearance',
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
    select: {name: 'sectionName', title: 'title', media: 'image.image.asset'},
    prepare({name, title, media}) {
      return {title, subtitle: `Accordion · ${name}`, media}
    },
  },
})
