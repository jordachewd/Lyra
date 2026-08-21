import {defineType, defineField} from 'sanity'
import {cmmBgColor} from '../../fields/common/cmmBgColor'
import {cmmTextColor} from '../../fields/common/cmmTextColor'

export const teamMember = defineType({
  name: 'teamMember',
  type: 'object',
  title: 'Team Member',
  description: 'A team member with name, position, photo, and bio',

  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      description: 'Full name of the team member',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'position',
      type: 'string',
      title: 'Position/Role',
      description: 'Job title or role of the team member',
    }),

    defineField({
      name: 'image',
      title: 'Image',
      description: 'Photo of the team member',
      type: 'imageNoMeta',
    }),

    defineField({
      name: 'bio',
      type: 'blockContentMini',
      title: 'Bio',
      description: 'Short biography or description of the team member',
    }),

    cmmTextColor,
    cmmBgColor,
  ],
  preview: {
    select: {title: 'name', subtitle: 'position', media: 'image.image'},
    prepare({title, subtitle, media}) {
      return {title, subtitle, media}
    },
  },
})
