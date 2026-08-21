import {defineType, defineField} from 'sanity'
import {cmmBgColor} from '../../fields/common/cmmBgColor'
import {cmmTextColor} from '../../fields/common/cmmTextColor'

export const productCard = defineType({
  name: 'productCard',
  title: 'Product Card',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Name of the product',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'icon',
      type: 'imageIcon',
      title: 'Icon',
      description: 'Icon representing the product',
    }),

    defineField({
      name: 'description',
      type: 'blockContentMini',
      title: 'Description',
      description: 'Short description of the product',
    }),

    defineField({
      name: 'features',
      type: 'array',
      title: 'Key Features',
      description: 'List up to 6 key features of the product',
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
      name: 'addons',
      type: 'blockContentMedi',
      title: '"SHOW ADD-ONS" content',
      description: 'Content displayed when "SHOW ADD-ONS" is clicked (optional)',
    }),

    defineField({
      name: 'footer',
      type: 'cardFooter',
      title: 'Footer',
      description: 'Footer section with a call to action',
    }),

    cmmTextColor,
    cmmBgColor,
  ],
  preview: {
    select: {title: 'title', media: 'icon.image'},
    prepare({title, media}) {
      return {title, media, subtitle: 'Product Card'}
    },
  },
})
