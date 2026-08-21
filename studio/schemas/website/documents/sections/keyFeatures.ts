import {defineType, defineField, defineArrayMember} from 'sanity'
import {cmmSectionName} from '../../fields/common/cmmSectionName'
import {cmmSectionDescription} from '../../fields/common/cmmSectionDesc'

export const keyFeaturesType = defineType({
  name: 'keyFeaturesType',
  type: 'document',
  title: 'Key Features',
  description: 'Section highlighting key features',
  fields: [
    cmmSectionName,

    defineField({
      name: 'topHeadline',
      type: 'string',
      title: 'Top Headline',
      description: 'Headline at the top of the section',
      validation: (r) => r.required(),
    }),

    cmmSectionDescription,

    defineField({
      name: 'bottomHeadline',
      type: 'string',
      title: 'Bottom Headline',
      description: 'Headline at the bottom of the section',
    }),

    defineField({
      name: 'cards',
      type: 'array',
      title: 'Add Features',
      description: 'Maximum of 6 feature cards',
      of: [defineArrayMember({type: 'featureCard'})],
      validation: (r) => r.max(6).error('Maximum of 6 cards allowed').required(),
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
    select: {
      title: 'topHeadline',
      name: 'sectionName',
      media: 'cards.0.icon.image',
    },
    prepare(selection) {
      const {title, name, media} = selection
      return {title, subtitle: `Key Features · ${name}`, media}
    },
  },
})
