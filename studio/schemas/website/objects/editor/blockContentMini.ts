import {defineType, defineArrayMember} from 'sanity'

export const blockContentMini = defineType({
  name: 'blockContentMini',
  title: 'Block Content Mini',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [],
      lists: [],
      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
          {title: 'Underline', value: 'underline'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) => Rule.uri({scheme: ['http', 'https', 'mailto']}),
              },
              {
                name: 'blank',
                type: 'boolean',
                title: 'Open in new tab',
                description: 'Whether to open the link in a new tab',
                initialValue: false,
              },
            ],
          },
        ],
      },
    }),
  ],
})
