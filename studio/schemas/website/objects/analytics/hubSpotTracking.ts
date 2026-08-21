import {defineType, defineField} from 'sanity'

export const hubspotTracking = defineType({
  name: 'hubspotTracking',
  title: 'HubSpot Tracking Settings',
  type: 'object',
  options: {
    collapsible: true,
  },
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enable HubSpot Tracking',
      description: 'Toggle to enable or disable HubSpot tracking site-wide',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'portalId',
      title: 'HubSpot Portal ID',
      type: 'string',
      description: 'e.g. 12345678 (the numeric ID for your HubSpot account)',
      hidden: ({parent}) => !parent?.enabled,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const enabled = (context as any)?.parent?.enabled
          if (enabled && !value) {
            return 'Portal ID is required when tracking is enabled'
          }
          if (value && !/^\d+$/.test(value)) {
            return 'Portal ID must be numeric'
          }
          return true
        }),
    }),
  ],
})
