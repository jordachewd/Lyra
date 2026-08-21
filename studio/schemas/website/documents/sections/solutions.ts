import {defineType, defineField, defineArrayMember} from 'sanity'
import {cmmSectionName} from '../../fields/common/cmmSectionName'
import {cmmSectionTitle} from '../../fields/common/cmmSectionTitle'
import {cmmSectionDescription} from '../../fields/common/cmmSectionDesc'

export const solutionsType = defineType({
  name: 'solutionsType',
  type: 'document',
  title: 'Solutions',
  description: 'Section showcasing solutions offered',
  fields: [
    cmmSectionName,
    cmmSectionTitle,
    cmmSectionDescription,

    defineField({
      name: 'cards',
      type: 'array',
      title: 'Cards',
      description: 'Add solution cards to this section',
      of: [defineArrayMember({type: 'solutionCard'})],
    }),

    defineField({
      name: 'display',
      type: 'string',
      title: 'Display Template',
      description: 'Choose how the solution cards are displayed',
      options: {list: ['horizontal', 'vertical'], layout: 'radio', direction: 'horizontal'},
      initialValue: 'horizontal',
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
    select: {title: 'title', name: 'sectionName', media: 'cards.0.image.image'},
    prepare({title, name, media}) {
      return {title, media, subtitle: `Solutions · ${name}`}
    },
  },
})
