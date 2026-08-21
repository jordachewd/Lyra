import {defineType, defineField, defineArrayMember} from 'sanity'
import {cmmSectionName} from '../../fields/common/cmmSectionName'
import {cmmSectionTitle} from '../../fields/common/cmmSectionTitle'
import {cmmSectionDescription} from '../../fields/common/cmmSectionDesc'

export const accreditationType = defineType({
  name: 'accreditationType',
  type: 'document',
  title: 'Accreditations',
  fields: [
    cmmSectionName,
    cmmSectionTitle,
    cmmSectionDescription,

    defineField({
      name: 'items',
      type: 'array',
      title: 'Accreditations',
      description: 'Add accreditation or certification items to display',
      of: [defineArrayMember({type: 'accreditationItem'})],
    }),

    defineField({
      name: 'accrSettings',
      type: 'accreditationSettings',
      title: 'Accreditations Settings',
      description: 'Settings for the accreditation section',
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
    select: {name: 'sectionName', title: 'title', media: 'items.0.image.image'},
    prepare({name, title, media}) {
      return {title, subtitle: `Accreditations · ${name}`, media}
    },
  },
})
