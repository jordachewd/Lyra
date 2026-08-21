import {defineType, defineArrayMember, defineField} from 'sanity'
import {ImageIcon} from '@sanity/icons/Image'
import {LinkIcon} from '@sanity/icons/Link'
import {FeedbackIcon} from '@sanity/icons/Feedback'
import {EditorLinkStyle} from '../../types/editorLinkStyle'

export const blockContentMaxi = defineType({
  name: 'blockContentMaxi',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Paragraph (Default)', value: 'normal'},
        {title: 'Paragraph - Center', value: 'pCenter'},
        {title: 'Paragraph - Right', value: 'pRight'},
        {title: 'BlockQuote (Arratech Style)', value: 'blockquote'},
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
          {title: 'Strike', value: 'strike-through'},
          {title: 'Inline Quote', value: 'q', icon: FeedbackIcon},
          {title: 'Code', value: 'code'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            icon: LinkIcon,
            title: 'Link / Button',
            fields: [
              defineField({
                name: 'href',
                title: 'URL or path',
                type: 'url',
                description: 'Absolute URL (https://…) or internal path (/contact)',
                validation: (Rule) => Rule.uri({scheme: ['http', 'https', 'mailto']}),
              }),

              defineField({
                name: 'linkStyle',
                type: 'string',
                title: 'Link Style',
                description: 'Choose how to style this link',
                options: {
                  list: [
                    {title: 'Inline Link', value: 'inline'},
                    {title: 'Button', value: 'button'},
                  ],
                  layout: 'radio',
                  direction: 'horizontal',
                },
                initialValue: 'inline',
              }),

              defineField({
                name: 'btnAlign',
                type: 'string',
                title: 'Button Alignment',
                description: 'Choose how to align this button',
                options: {
                  list: [
                    {title: 'Left', value: 'left'},
                    {title: 'Center', value: 'center'},
                    {title: 'Right', value: 'right'},
                  ],
                  layout: 'radio',
                  direction: 'horizontal',
                },
                initialValue: 'center',
                hidden: ({parent}: {parent?: EditorLinkStyle}) => parent?.linkStyle !== 'button',
              }),

              defineField({
                name: 'btnSize',
                type: 'string',
                title: 'Button Size',
                description: 'Choose the size of the button',
                options: {
                  list: [
                    {title: 'Normal', value: 'normal'},
                    {title: 'Half Width', value: 'half'},
                    {title: 'Full Width', value: 'full'},
                  ],
                  layout: 'radio',
                  direction: 'horizontal',
                },
                initialValue: 'normal',
                hidden: ({parent}: {parent?: EditorLinkStyle}) => parent?.linkStyle !== 'button',
              }),

              defineField({
                name: 'highlighted',
                type: 'boolean',
                title: 'Highlighted Button',
                description: 'Whether to highlight the button.',
                initialValue: true,
                hidden: ({parent}: {parent?: EditorLinkStyle}) => parent?.linkStyle !== 'button',
              }),

              defineField({
                name: 'blank',
                type: 'boolean',
                title: 'Open in new tab',
                description: 'Whether to open the link in a new tab',
                initialValue: false,
              }),
            ],
          },
        ],
      },
    }),

    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.',
          validation: (r) => r.required(),
        }),

        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Appears below the image in smaller text',
        }),

        defineField({
          name: 'credit',
          type: 'string',
          title: 'Credit/Source (Optional)',
          description: 'Image source or credit',
        }),

        defineField({
          name: 'link',
          type: 'url',
          title: 'Link (URL or path)',
          description: 'Absolute URL only (https://…)',
        }),

        defineField({
          name: 'blank',
          type: 'boolean',
          title: 'Open in new tab',
          description: 'Whether to open the link in a new tab',
          initialValue: false,
        }),

        defineField({
          name: 'align',
          type: 'string',
          title: 'Align Image',
          description: 'Choose alignment for the image',
          options: {
            list: [
              {title: 'Left', value: 'left'},
              {title: 'Center (default)', value: 'center'},
              {title: 'Right', value: 'right'},
              {title: 'None', value: 'none'},
            ],
            layout: 'radio',
            direction: 'horizontal',
          },
          initialValue: 'center',
        }),

        defineField({
          name: 'widthSize',
          type: 'string',
          title: 'Dimensions',
          description: 'Choose dimension for the image. Default is Full Size.',
          options: {
            list: [
              {title: 'Full Size (100%)', value: 'normal'},
              {title: 'Medium (75%)', value: 'medium'},
              {title: 'Small (50%)', value: 'small'},
              {title: 'Tiny (25%)', value: 'tiny'},
            ],
            layout: 'radio',
            direction: 'horizontal',
          },
          initialValue: 'normal',
        }),
      ],
    }),

    defineArrayMember({type: 'table'}),
  ],
})
