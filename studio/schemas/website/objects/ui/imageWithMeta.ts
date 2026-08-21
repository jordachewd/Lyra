import {defineType, defineField} from 'sanity'

export const imageWithMeta = defineType({
  name: 'imageWithMeta',
  title: 'Image',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image File',
      description: 'Choose an image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Useful for SEO and accessibility.',
      placeholder: 'Short description of the image',
    }),

    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption (Optional)',
      description: 'Short title of the image',
    }),

    defineField({
      name: 'captionSub',
      type: 'string',
      title: 'Subtitle Caption (Optional)',
      description: 'Additional information for the caption',
    }),

    defineField({
      name: 'credit',
      type: 'string',
      title: 'Credit/Source (Optional)',
      description: 'Image source or credit',
    }),

    defineField({
      name: 'widthSize',
      type: 'string',
      title: 'Size',
      description: 'Choose the width size for the image.',
      options: {
        list: [
          {title: 'Default (100%)', value: 'normal'},
          {title: 'Medium (75%)', value: 'medium'},
          {title: 'Small (50%)', value: 'small'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'normal',
    }),

    defineField({
      name: 'shape',
      type: 'string',
      title: 'Corners',
      description: 'Choose the corner style for the image.',
      options: {
        list: [
          {title: 'Rounded (Default)', value: 'rounded'},
          {title: 'Squared', value: 'squared'},
          {title: 'Full Rounded', value: 'disc'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'rounded',
    }),
  ],
  preview: {
    select: {media: 'image', title: 'alt', subtitle: 'caption'},
  },
})
