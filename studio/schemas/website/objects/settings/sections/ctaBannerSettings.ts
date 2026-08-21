import {defineType, defineField} from 'sanity'
import {brandColors} from '../../../../../consts/brand-colors'

type CtaBannerParent = {
  ctaGradient: string
}

export const ctaBannerSettings = defineType({
  name: 'ctaBannerSettings',
  type: 'object',
  title: 'CTA Banner Section Settings',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'innerPadding',
      type: 'string',
      title: 'Inner Padding',
      description: 'Choose the size of the inner padding for the banner content',
      options: {
        list: [
          {title: 'Max (Default)', value: 'normal'},
          {title: 'Medium', value: 'medium'},
          {title: 'Small', value: 'half'},
          {title: 'Tiny', value: 'small'},
          {title: 'None', value: 'none'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'normal',
    }),

    defineField({
      name: 'ctaGradient',
      type: 'string',
      title: 'Banner Background',
      description: 'Select a background style for the CTA banner section',
      initialValue: 'banner',
      options: {
        list: [
          {title: 'Arratech Banner (Default)', value: 'banner'},
          {title: 'Flare', value: 'flare'},
          {title: 'Lemon Twist', value: 'lemontwist'},
          {title: 'Lunada', value: 'lunada'},
          {title: 'Mojito', value: 'mojito'},
          {title: 'Ohhappiness', value: 'ohhappiness'},
          {title: 'Sulphur', value: 'sulphur'},
          {title: '• Custom Background Color', value: 'custom'},
          {title: '• Transparent Background', value: 'none'},
        ],
        layout: 'dropdown',
      },
    }),

    defineField({
      name: 'ctaBgColor',
      title: 'Custom Background Color',
      description: 'Select a custom background color for the section',
      type: 'color',
      options: brandColors,
      hidden: ({parent}: {parent?: CtaBannerParent}) => parent?.ctaGradient !== 'custom',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as CtaBannerParent | undefined
          if (parent?.ctaGradient === 'custom' && !value) {
            return 'Custom Background Color is required when Background is set to Custom'
          }
          return true
        }),
    }),
  ],
})
