import {defineField, defineType} from 'sanity'
import {previewTitleFromPT} from '../../../../utils/preview-from-pt'

export const featureItem = defineType({
  name: 'featureItem',
  type: 'object',
  title: 'Feature Item',
  description: 'Individual feature or highlight item',
  fields: [
    defineField({
      name: 'eyebrow',
      type: 'string',
      title: 'Eyebrow (optional)',
      description: 'Text to appear above the title',
    }),

    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Title of the feature',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'icon',
      type: 'imageIcon',
      title: 'Icon (optional)',
      description: 'Icon representing the feature',
    }),

    defineField({
      name: 'description',
      type: 'string',
      title: 'Description (optional)',
      description: 'Description of the feature',
    }),

    defineField({
      name: 'ttlSize',
      type: 'string',
      title: 'Title Size',
      description: 'Select the size of the title',
      options: {
        list: [
          {title: 'Small (Default)', value: 'small'},
          {title: 'Medium', value: 'medium'},
          {title: 'Large', value: 'large'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'small',
    }),

    defineField({
      name: 'layout',
      type: 'string',
      title: 'Layout',
      description: 'Choose how the feature item is displayed',
      options: {
        list: [
          {title: 'Text (Default)', value: 'text'},
          {title: 'Card', value: 'card'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'text',
    }),
  ],
  preview: {
    select: {title: 'title', media: 'icon.image'},
    prepare({title, media}) {
      return {
        title: previewTitleFromPT(title, {fallback: 'Feature Item', maxLength: 50}),
        media,
        subtitle: 'Feature Item',
      }
    },
  },
})
