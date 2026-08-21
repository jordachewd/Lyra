import {defineType, defineField} from 'sanity'
import {cmmSectionName} from '../../fields/common/cmmSectionName'
import {cmmSectionTitle} from '../../fields/common/cmmSectionTitle'

export const textImageType = defineType({
  name: 'textImageType',
  type: 'document',
  title: 'Text & Image',
  description: 'Section with text and an image',
  fields: [
    cmmSectionName,

    defineField({
      name: 'aboveTitle',
      type: 'string',
      title: 'Above Title (Optional)',
      description: 'Text to appear above the title',
    }),

    cmmSectionTitle,

    defineField({
      name: 'belowTitle',
      type: 'string',
      title: 'Below Title (Optional)',
      description: 'Text to appear below the headline',
    }),

    defineField({
      name: 'description',
      type: 'blockContentMedi',
      title: 'Description (Optional)',
      description: 'Short description for the section',
    }),

    defineField({
      name: 'image',
      type: 'imageWithMeta',
      title: 'Image',
      description: 'Image to display alongside the text',
    }),

    defineField({
      name: 'chips',
      type: 'array',
      title: 'Chips (Optional)',
      description: 'Small highlight texts',
      of: [{type: 'string'}],
      validation: (r) => r.max(5).error('Only 5 chips allowed'),
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
    select: {title: 'title', name: 'sectionName', media: 'image.image'},
    prepare({title, name, media}) {
      return {title, subtitle: `Text & Image · ${name}`, media}
    },
  },
})
