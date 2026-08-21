import {defineType, defineField, defineArrayMember} from 'sanity'
import {cmmSectionName} from '../../fields/common/cmmSectionName'

export const contentBlocks = defineType({
  name: 'contentBlocks',
  type: 'document',
  title: 'Content Blocks',
  description: 'Section with multiple content blocks, each with its own headline and content',
  fields: [
    cmmSectionName,

    defineField({
      name: 'aboveEyebrow',
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
      name: 'belowEyebrow',
      type: 'string',
      title: 'Below Eyebrow (optional)',
      description: 'Text to appear below the headline',
    }),

    defineField({
      name: 'description',
      type: 'blockContentMini',
      title: 'Description (optional)',
      description: 'Short description of the section to appear below the headline',
    }),

    defineField({
      name: 'blocks',
      type: 'array',
      title: 'Content Blocks',
      description: 'Add up to 12 content blocks, each with its own headline and content',
      of: [defineArrayMember({type: 'contentBlock'})],
      validation: (r) => r.max(12).error('Maximum of 12 content blocks allowed'),
    }),

    defineField({
      name: 'titleDesc',
      type: 'cmmTtlDescSettings',
      title: 'Title & Description',
      description: 'Settings for the title and description display',
    }),

    defineField({
      name: 'blocksSettings',
      type: 'contentBlocksSettings',
      title: 'Blocks',
      description: 'Settings for the content blocks display',
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
    select: {title: 'headline', name: 'sectionName', media: 'blocks.0.icon.image'},
    prepare({title, media, name}) {
      return {title, media, subtitle: `Content Blocks · ${name}`}
    },
  },
})
