import {defineType, defineField, defineArrayMember} from 'sanity'
import {cmmSectionName} from '../../fields/common/cmmSectionName'
import {cmmSectionTitle} from '../../fields/common/cmmSectionTitle'
import {cmmSectionSubtitle} from '../../fields/common/cmmSectionSubtitle'
import {cmmSectionDescription} from '../../fields/common/cmmSectionDesc'

export const teamOverviewType = defineType({
  name: 'teamOverviewType',
  type: 'document',
  title: 'Team Overview',
  description: 'Section showcasing team members',
  fields: [
    cmmSectionName,
    cmmSectionTitle,
    cmmSectionSubtitle,
    cmmSectionDescription,

    defineField({
      name: 'members',
      type: 'array',
      title: 'Team Members',
      description: 'Add team members to display',
      of: [defineArrayMember({type: 'teamMember'})],
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
      title: 'title',
      name: 'sectionName',
      members: 'members',
    },
    prepare({title, name, members}) {
      const count = members?.length
        ? ` · ${members.length} member${members.length > 1 ? 's' : ''}`
        : ''
      const subtitle = `Team Overview · ${name}${count}`
      const media = members?.[0]?.image.image
      return {title, media, subtitle}
    },
  },
})
