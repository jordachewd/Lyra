import {defineType, defineField, defineArrayMember} from 'sanity'
import {cmmSectionName} from '../../fields/common/cmmSectionName'
import {cmmSectionTitle} from '../../fields/common/cmmSectionTitle'
import {cmmSectionDescription} from '../../fields/common/cmmSectionDesc'

export const productsType = defineType({
  name: 'productsType',
  type: 'document',
  title: 'Products',
  description: 'Section showcasing product offerings',
  fields: [
    cmmSectionName,
    cmmSectionTitle,
    cmmSectionDescription,

    defineField({
      name: 'cards',
      type: 'array',
      title: 'Add Product Cards',
      description: 'Add an even number of product cards to display',
      of: [defineArrayMember({type: 'productCard'})],
      validation: (r) =>
        r.custom((val) => {
          if (!Array.isArray(val)) return true
          return val.length % 2 === 0 || 'Only an even number of cards is allowed'
        }),
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
    select: {title: 'title', name: 'sectionName', media: 'cards.0.icon.image'},
    prepare({title, name, media}) {
      return {title, media, subtitle: `Products · ${name}`}
    },
  },
})
