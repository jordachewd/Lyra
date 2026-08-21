import {defineType, defineField} from 'sanity'
import {cmmSectionName} from '../../fields/common/cmmSectionName'

export const ctaBannerType = defineType({
  name: 'ctaBannerType',
  type: 'document',
  title: 'CTA Banner',
  description: 'Call-to-action banner section with headline, image, and buttons',
  fields: [
    cmmSectionName,

    defineField({
      name: 'eyebrow',
      type: 'string',
      title: 'Eyebrow (optional)',
      description: 'Text to appear above the headline',
    }),

    defineField({
      name: 'headline',
      type: 'string',
      title: 'Headline',
      description: 'Main headline for the CTA banner',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'tagline',
      type: 'string',
      title: 'Tagline (optional)',
      description: 'Text to appear below the headline',
    }),

    defineField({
      name: 'subheadline',
      type: 'blockContentMini',
      title: 'Description (optional)',
      description: 'Subheadline or description for the CTA banner',
    }),

    defineField({
      name: 'image',
      type: 'imageIcon',
      title: 'Image',
      description: 'Image to display in the CTA banner',
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
      name: 'ctaSettings',
      type: 'ctaBannerSettings',
      title: 'Banner Settings',
      description: 'Customize the appearance and layout of the banner',
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
    select: {title: 'headline', name: 'sectionName', media: 'image.image.asset'},
    prepare({title, name, media}) {
      return {title, media, subtitle: `CTA Banner · ${name}`}
    },
  },
})
