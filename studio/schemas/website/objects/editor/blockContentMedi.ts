import {defineType, defineArrayMember} from 'sanity'

export const blockContentMedi = defineType({
  name: 'blockContentMedi',
  title: 'Block Content Medi',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Paragraph (Default)', value: 'normal'},
        {title: 'Paragraph - Center', value: 'pCenter'},
        {title: 'Paragraph - Right', value: 'pRight'},
        {title: 'BlockQuote (Normal)', value: 'quotenormal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'H5', value: 'h5'},
        {title: 'H6', value: 'h6'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
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
