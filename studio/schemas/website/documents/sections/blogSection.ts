import {defineType, defineField} from 'sanity'
import {cmmSectionName} from '../../fields/common/cmmSectionName'
import {cmmSectionTitle} from '../../fields/common/cmmSectionTitle'
import {cmmSectionDescription} from '../../fields/common/cmmSectionDesc'

export const blogSection = defineType({
  name: 'blogSection',
  type: 'document',
  title: 'Blog Overview',
  description: 'Section displaying recent blog posts as cards',
  fields: [
    cmmSectionName,
    cmmSectionTitle,
    cmmSectionDescription,

    defineField({
      name: 'button',
      type: 'array',
      title: 'CTA Button',
      description: 'Call to action button for the blog overview section',
      of: [{type: 'ctaButton'}],
      validation: (r) => r.max(1).error('Only 1 button allowed'),
    }),

    defineField({
      name: 'blogOverviewSettings',
      type: 'blogOverviewSettings',
      title: 'Blog Overview Settings',
      description: 'Additional settings for the blog overview section',
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
    select: {name: 'sectionName', title: 'title'},
    prepare({name, title}) {
      return {title, subtitle: `Blog Overview · ${name}`}
    },
  },
})
