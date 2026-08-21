import {defineType, defineField} from 'sanity'
import {brandColors} from '../../../../../consts/brand-colors'
import {BackgroundType} from '../../../types/bgTypes'

export const cmmBgSettings = defineType({
  name: 'cmmBgSettings',
  type: 'object',
  title: 'Background Settings',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      description: 'Select the type of background to use for the section',
      options: {
        list: [
          {title: 'None (Default)', value: 'none'},
          {title: 'Color', value: 'color'},
          {title: 'Image', value: 'image'},
          {title: 'Gradient', value: 'gradient'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'none',
    }),

    defineField({
      name: 'color',
      type: 'color',
      title: 'Color',
      description: 'Choose a background color for the section',
      options: brandColors,
      hidden: ({parent}) => parent?.type !== 'color',
      validation: (Rule) =>
        Rule.custom((value, context) =>
          (context.parent as {type?: BackgroundType})?.type === 'color' && !value
            ? 'Background color is required when type is set to Color'
            : true,
        ),
    }),

    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      description: 'Upload a background image for the section',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.type !== 'image',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if ((context.parent as {type?: BackgroundType})?.type === 'image' && !value) {
            return 'Background image is required when type is set to Image'
          }
          return true
        }),
    }),

    defineField({
      name: 'ovlColor',
      type: 'color',
      title: 'Overlay Color (Optional)',
      description: 'Choose a color for the overlay on top of the background image',
      options: brandColors,
      hidden: ({parent}) => parent?.type !== 'image',
    }),

    defineField({
      name: 'ovlBlend',
      type: 'string',
      title: 'Overlay Blend Mode',
      description: 'Select the blend mode for the overlay color on top of the background image',
      options: {
        list: [
          {title: 'Normal', value: 'normal'},
          {title: 'Darken', value: 'darken'},
          {title: 'Multiply', value: 'multiply'},
          {title: 'Color Burn', value: 'color-burn'},
          {title: 'Lighten', value: 'lighten'},
          {title: 'Screen', value: 'screen'},
          {title: 'Color Dodge', value: 'color-dodge'},
          {title: 'Overlay (Default)', value: 'overlay'},
          {title: 'Soft Light', value: 'soft-light'},
          {title: 'Hard Light', value: 'hard-light'},
          {title: 'Difference', value: 'difference'},
          {title: 'Exclusion', value: 'exclusion'},
          {title: 'Hue', value: 'hue'},
          {title: 'Saturation', value: 'saturation'},
          {title: 'Color', value: 'color'},
          {title: 'Luminosity', value: 'luminosity'},
        ],
        layout: 'dropdown',
      },
      hidden: ({parent}) => parent?.type !== 'image',
      initialValue: 'overlay',
    }),

    defineField({
      name: 'ovlOpacity',
      type: 'number',
      title: 'Overlay Color Opacity',
      description: 'Set the opacity for the overlay color (0-100). Default is 50.',
      initialValue: 50,
      placeholder: '50',
      hidden: ({parent}) => parent?.type !== 'image',
      validation: (Rule) =>
        Rule.integer()
          .min(0)
          .max(100)
          .error('Overlay color opacity must be an integer between 0 and 100.'),
    }),

    defineField({
      name: 'gradient',
      type: 'string',
      title: 'Gradient',
      description: 'Select a gradient background for the section',
      initialValue: 'none',
      options: {
        list: [
          {title: 'None (Default)', value: 'none'},
          {title: 'Arratech Banner', value: 'banner'},
          {title: 'Flare', value: 'flare'},
          {title: 'Lemon Twist', value: 'lemontwist'},
          {title: 'Lunada', value: 'lunada'},
          {title: 'Mojito', value: 'mojito'},
          {title: 'OhHappiness', value: 'ohhappiness'},
          {title: 'Sulphur', value: 'sulphur'},
          {title: 'Dark Blue', value: 'darkblue'},
        ],
        layout: 'dropdown',
      },
      hidden: ({parent}) => parent?.type !== 'gradient',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if ((context.parent as {type?: BackgroundType})?.type === 'gradient' && !value) {
            return 'Gradient selection is required when type is set to Gradient'
          }
          return true
        }),
    }),
  ],
})
