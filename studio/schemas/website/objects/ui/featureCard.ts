import {defineType, defineField} from 'sanity'
import {previewTitleFromPT} from '../../../../utils/preview-from-pt'

export const featureCard = defineType({
  name: 'featureCard',
  title: 'Feature Card',
  type: 'object',
  fields: [
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
      title: 'Icon',
      description: 'Icon to represent the feature',
    }),

    defineField({
      name: 'description',
      type: 'blockContentMini',
      title: 'Description',
      description: 'Brief description of the feature',
      validation: (r) => r.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      description: 'description',
      showTitle: 'showTitle',
      media: 'icon.image',
    },
    prepare({title, description, showTitle, media}) {
      const desc = previewTitleFromPT(description, {fallback: 'Feature Card', maxLength: 60})

      return {
        title: showTitle === true ? title : desc,
        subtitle: 'Feature Card',
        media,
      }
    },
  },
})
