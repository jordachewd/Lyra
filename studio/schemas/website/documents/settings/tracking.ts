import {defineField, defineType} from 'sanity'

export const trackingSettings = defineType({
  name: 'trackingSettings',
  type: 'document',
  title: 'Tracking & Analytics',
  description: 'Settings for website tracking and analytics integration',
  fields: [
    defineField({
      name: 'google',
      title: 'Google',
      description: 'Settings for Google Tag Manager integration',
      type: 'googleTracking',
    }),

    defineField({
      name: 'hubspot',
      title: 'HubSpot',
      description: 'Settings for HubSpot tracking integration',
      type: 'hubspotTracking',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Tracking & Analytics Settings'}
    },
  },
})
