import {defineType, defineField} from 'sanity'

export const cmmLySettings = defineType({
  name: 'cmmLySettings',
  type: 'object',
  title: 'Layout Settings',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'pdDisplay',
      type: 'string',
      title: 'Padding Display',
      description: 'Choose how to show padding on the top or bottom of the section or hide it',
      options: {
        list: [
          {title: 'Top & Bottom (default)', value: 'both'},
          {title: 'Top Only', value: 'top'},
          {title: 'Bottom Only', value: 'bottom'},
          {title: 'None', value: 'none'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'both',
    }),

    defineField({
      name: 'pdTopBottom',
      type: 'string',
      title: 'Padding Size (Top / Bottom)',
      description: 'Choose the size of the padding for the top and bottom of the section',
      options: {
        list: [
          {title: 'Max', value: 'normal'},
          {title: 'Medium (Default)', value: 'medium'},
          {title: 'Small', value: 'half'},
          {title: 'Tiny', value: 'small'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'medium',
      hidden: ({parent}) => parent?.pdDisplay === 'none',
    }),

    defineField({
      name: 'template',
      type: 'string',
      title: 'Orientation',
      description: 'Choose the layout orientation for the section',
      options: {
        list: [
          {title: 'Normal (Default)', value: 'normal'},
          {title: 'Centered', value: 'centered'},
          {title: 'Reversed', value: 'reversed'},
          {title: 'Rev Centered', value: 'revCentered'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'normal',
    }),

    defineField({
      name: 'columns',
      type: 'string',
      title: 'Columns Layout',
      description: 'Choose the column layout for the section',
      options: {
        list: [
          {title: 'Normal (Default)', value: 'normal'},
          {title: 'First Bigger', value: 'firstBig'},
          {title: 'Last Bigger', value: 'lastBig'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'normal',
      hidden: ({parent}) => parent?.template === 'centered' || parent?.template === 'revCentered',
    }),

    defineField({
      name: 'width',
      type: 'string',
      title: 'Width',
      description: 'Choose the width of the section',
      options: {
        list: [
          {title: 'Site Width (Default)', value: 'normal'},
          {title: 'Full Width', value: 'full'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'normal',
    }),
  ],
})
