import {defineType, defineField} from 'sanity'

export const accreditationItem = defineType({
  name: 'accreditationItem',
  type: 'object',
  title: 'Accreditation Item',
  description: 'An accreditation or certification item with logo and details',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Name of the accreditation or certification',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'tag',
      type: 'string',
      title: 'Tag',
      description: 'Short tag or label for the accreditation (e.g., "ISO 9001")',
    }),

    defineField({
      name: 'image',
      type: 'imageNoMeta',
      title: 'Image',
      description: 'Logo or image representing the accreditation or certification. Recommended size: 384x196px',
    }),

    defineField({
      name: 'link',
      type: 'linkField',
      title: 'Link/URL',
      description: 'Configure a link for this item',
    }),
  ],
  preview: {
    select: {title: 'title', media: 'image.image', tag: 'tag'},
    prepare({title, media, tag}) {
      const subtitle = tag ? `Accreditation Item | ${tag}` : 'Accreditation Item'
      return {title, media, subtitle: subtitle}
    },
  },
})
