import {defineType, defineField} from 'sanity'
import {cmmSectionName} from '../../fields/common/cmmSectionName'

export const topHeroType = defineType({
  name: 'topHeroType',
  type: 'document',
  title: 'Hero',
  description: 'Top hero section with headline, subheadline, image, and CTAs',
  fields: [
    cmmSectionName,

    defineField({
      name: 'aboveHeadline',
      type: 'string',
      title: 'Above Eyebrow (optional)',
      description: 'Text to appear above the headline',
    }),

    defineField({
      name: 'headline',
      type: 'string',
      title: 'Headline',
      description: 'Main headline for the section',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'belowHeadline',
      type: 'string',
      title: 'Below Eyebrow (optional)',
      description: 'Text to appear below the headline',
    }),

    defineField({
      name: 'subheadline',
      type: 'blockContentMedi',
      title: 'Description (optional)',
      description: 'Short description or subheadline',
    }),

    defineField({
      name: 'image',
      type: 'imageNoMeta',
      title: 'Image',
      description: 'Main image for the section',
    }),

    defineField({
      name: 'eyebrowImage',
      type: 'imageNoMeta',
      title: 'Eyebrow Image',
      description: 'Image to appear above the headline',
    }),

    defineField({
      name: 'features',
      type: 'array',
      title: 'Features (optional)',
      description: 'List up to 6 key features or highlights',
      of: [{type: 'featureItem'}],
      validation: (r) => r.max(6),
    }),

    defineField({
      name: 'featDisplay',
      type: 'string',
      title: 'Features Display',
      description: 'Choose how the features are displayed',
      options: {
        list: [
          {title: 'Vertical (Default)', value: 'vertical'},
          {title: 'Horizontal', value: 'horizontal'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'vertical',
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
    select: {title: 'headline', name: 'sectionName', media: 'image.image.asset'},
    prepare({title, name, media}) {
      return {title, media, subtitle: `Hero · ${name}`}
    },
  },
})
